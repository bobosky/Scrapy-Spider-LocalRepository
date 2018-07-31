# -*- coding: utf-8 -*-
from scrapy.conf import settings
from scrapy.http import Request
from urllib import parse
from TencentVideo.pipelines import TencentvideoPipeline
from TencentVideo.items import TencentvideoItem
import requests
import scrapy
import json
import time
import re

sw_id_map={
    '亲爱的客栈':68802,
    # '向往的生活第二季':79217, #芒果TV
    '中餐厅':80344
}

class TvcommentspSpider(scrapy.Spider):
    name = 'tvcommentSP'
    allowed_domains = ['qq.com']
    mark = None
    currn_lastid = None

    headers = {
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'accept-encoding': 'gzip',  # 只要gzip的压缩格式
        'accept-language': 'zh-CN,zh;q=0.9',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.79 Safari/537.36'
    }

    def __init__(self):
        self.pipeline = TencentvideoPipeline()

    #eg:https://s.video.qq.com/get_playsource?id=68802&plat=2&type=4&data_type=3&video_type=10&plname=qq&range=1-12&otype=json&uid=30b019c3-4c95-4e71-a565-e9c7b41e9372
    #http://s.video.qq.com/get_playsource?
    playsource_params = {
        'id': None,
        'plat': 2,
        'type': 4,
        'data_type': 3,
        'video_type': 10,
        'plname': 'qq',
        'range': None,
        'otype': 'json',
        'uid': '30b019c3 - 4c95 - 4e71 - a565 - e9c7b41e9372',
    }

    #https://ncgi.video.qq.com/fcgi-bin/video_comment_id?
    video_comment_id_params = {
        'otype' : 'json',
           'op' : 3,
          'cid' : None
    }

    first_article = {
        'orinum': 30,
        'oriorder': 'o',
        'pageflag': 1,
        'cursor': 0,
        'scorecursor': 0,
        'orirepnum': 0,
        'reporder': 'o',
        'reppageflag': 1,
        'source': 1
    }
    
    loop_article = {
        'orinum': 30,
        'oriorder': 'o',
        'pageflag': 1,
        'cursor': None,
        'scorecursor': 0,
        'orirepnum': 2,
        'reporder': 'o',
        'reppageflag': 1,
        'source': 1
    }

    #https://video.coral.qq.com/vcomment/6407560092309764045/reply/v2?
    comment_params = {
        'targetid' : None,
        'reqnum' : 30,
        'pageflag' : 2,
        'source' : 1
    }

    def get_locationtime(self):
        return time.strftime('%Y-%m-%d', time.localtime())

    def get_createtime(self,secs):
        return time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(int(secs)))

    def start_requests(self):
        if settings.get('SEARCH_WORDS') in sw_id_map.keys():
            self.playsource_params['id'] = sw_id_map[settings.get('SEARCH_WORDS')]
        else:
            print(settings.get('SEARCH_WORDS'),' not in sw_id_map')
            return

        self.playsource_params['range'] = settings.get('RANGE')
        url = 'http://s.video.qq.com/get_playsource?'+parse.urlencode(self.playsource_params)
        yield Request(url=url,callback=self.playsource_parse)

    def playsource_parse(self, response):
        jsonOj = json.loads(re.findall("QZOutputJson=(.*?);",response.text)[0])
        for item in jsonOj['PlaylistItem']['videoPlayList']:
            self.video_comment_id_params['cid'] = item['id']
            url = 'https://ncgi.video.qq.com/fcgi-bin/video_comment_id?'+parse.urlencode(self.video_comment_id_params)
            yield Request(url=url,callback=self.first_article_parse)

    def first_article_parse(self, response):
        jsonOj = json.loads(re.findall("QZOutputJson=(.*?);",response.text)[0])
        url = 'http://coral.qq.com/article/{}/comment/v2?'.format(jsonOj['comment_id']) + parse.urlencode(self.first_article)
        return Request(url=url, callback=self.loop_article_parse)
    
    #本爬虫核心，1.发出article -->next_article的request，回调自身处理response 2.发出article-->comment的request
    def loop_article_parse(self, response):
        jsonOj = json.loads(response.text)
        self.currn_lastid = jsonOj['data']['last'] if jsonOj['data']['oriretnum'] == 30 else self.currn_lastid
        self.comment_params['targetid'] = jsonOj['data']['targetid']

        #分析comment(article)部分，发出该article-->comment请求
        for item in jsonOj['data']['oriCommList']:
            self.article_analysis(jsonBody=item,url=response.url)
            url_comment = 'http://coral.qq.com/comment/{}/reply/v2?'.format(item['id']) + parse.urlencode(self.comment_params)
            #发出article-->comment的request
            self.throw_comment_request(url=url_comment,id=item['id'])
            time.sleep(3)

        if not self.currn_lastid == self.mark:
            self.mark = self.currn_lastid
            self.loop_article['cursor'] = self.currn_lastid
            url_loop = 'http://coral.qq.com/article/{}/comment/v2?'.format(jsonOj['data']['targetid'])+parse.urlencode(self.loop_article)
            #发出article -->next_article的request，回调自身处理response
            print('发出({id})article-->next_article的request:{re}'.format(id=self.currn_lastid, re=url_loop))
            return Request(url=url_loop, callback=self.loop_article_parse)
        else:
            print('本视频的article已爬取完毕')
            return

    #只发出article-->comment的request，不处理response(使用requests)
    def throw_comment_request(self,url,id):
        print('发出({id})article-->comment的request:{re}'.format(id=id,re=url))
        htmlsorce = requests.get(url=url, headers=self.headers)
        print(id,htmlsorce.text)
        jsonOj = json.loads(htmlsorce.text)
        for item in jsonOj['data']['repCommList']:
            self.comment_analysis(jsonBody=item,url=url)
        return

    def article_analysis(self, jsonBody, url):
        items = TencentvideoItem()
        items['id'] = jsonBody['id'] if jsonBody['id'] else ''
        items['url'] = url
        items['platform'] = '腾讯视频'
        items['viewType'] = '问答'
        items['searchWord'] = settings.get('SEARCH_WORDS')
        items['crawlTime'] = self.get_locationtime()
        items['publishTime'] = self.get_createtime(jsonBody['time']) if jsonBody['time'] else ''
        items['level'] = 2
        items['commentID'] = 1
        items['comment_count'] = jsonBody['repnum'] if jsonBody['repnum'] else ''
        items['like'] = jsonBody['up'] if jsonBody['up'] else ''
        items['authorID'] = jsonBody['userid'] if jsonBody['userid'] else ''
        items['content'] = jsonBody['content'] if jsonBody['content'] else ''
        items['puserid'] = jsonBody['puserid'] if jsonBody['puserid'] else ''
        self.pipeline.process_item(item=items)
        return

    def comment_analysis(self, jsonBody, url):
        items = TencentvideoItem()
        items['id'] = jsonBody['parent']
        items['url'] = url
        items['platform'] = '腾讯视频'
        items['viewType'] = '问答'
        items['searchWord'] = settings.get('SEARCH_WORDS')
        items['crawlTime'] = self.get_locationtime()
        items['publishTime'] = self.get_createtime(jsonBody['time']) if jsonBody['time'] else ''
        items['level'] = 3
        items['commentID'] = jsonBody['id'] if jsonBody['id'] else ''
        items['comment_count'] = jsonBody['repnum'] if jsonBody['repnum'] else ''
        items['like'] = jsonBody['up'] if jsonBody['up'] else ''
        items['authorID'] = jsonBody['userid'] if jsonBody['userid'] else ''
        items['content'] = jsonBody['content'] if jsonBody['content'] else ''
        self.pipeline.process_item(item=items)
        return


