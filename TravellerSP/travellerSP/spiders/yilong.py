# -*- coding: utf-8 -*-
import scrapy,json,re,requests
from urllib.parse import urlencode
from scrapy.http import Request
from lxml import etree
from travellerSP.pipelines import TravellerspPipeline
from travellerSP.items import TravellerspItem
import travellerSP.helper as help

class YilongSpider(scrapy.Spider):
    name = 'yilong'
    # allowed_domains = ['qunar.com.com']

    headers = {
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'accept-encoding': 'gzip',  # 只要gzip的压缩格式
        'accept-language': 'zh-CN,zh;q=0.9',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.79 Safari/537.36'
    }

    name_map = {
        'haohefengjingqu':'南通濠河景区',
        'nantonglangshan':'南通狼山风景名胜区',
        'shuihuiyuan':'南通如皋水绘园景区',
        'nantonghaidishijie':'南通海底世界旅游',
        'zhangjianjinianguan':'张謇纪念馆',
        'nantongbowuyuan':'南通博物苑景区',
        'qidong':'南通启东吕四渔港',
        'ntyybly':'南通园艺博览园',
        'seyuan':'南通啬园景区',
        'ntfttxwg':'南通方特探险王国',
    }

    def start_requests(self):
        for i in self.name_map.keys():
            url = 'http://trip.elong.com/{place}/tour/list-0-{index}.html'.format(place=i,index=1)
            yield Request(url=url,callback=self.loop_request,meta={'curpage':1,'curname':i})

    def __init__(self):
        self.pipline = TravellerspPipeline()

    def loop_request(self, response):
        body = json.loads(response.text)
        print(body)
        if body['errno'] != 0:
            print('errno != 0')
            return
        else:
            print('翻页')
            for item in self.analysis_list(jsonBy=body,meta=response.meta):
                self.throw_request(item=item)
            page = response.meta['curpage']+1
            name = response.meta['curname']
            url = 'http://trip.elong.com/{place}/tour/list-0-{index}.html'.format(place=name,index=page)
            return Request(url=url,callback=self.loop_request,meta={'curpage':page,'curname':name})

    def throw_request(self,item):
        source = requests.get(url=item['url'],headers=self.headers)
        self.analysis_article(source.text,item)

    def analysis_article(self,source,item):
        selector = etree.HTML(source)
        content = selector.xpath('string(//div[@class="article_center"])')
        item['content'] = content
        self.pipline.process_item(item,None)

    def analysis_list(self, jsonBy, meta):
        print('进入分析。。。。。。。。。。。。。。。。。。。。。')
        itemspipline = TravellerspItem()

        for i in jsonBy['data']['notes_list']:
            itemspipline['id'] = i['nid']
            itemspipline['url'] = i['share_url']
            itemspipline['platform'] = '艺龙'
            itemspipline['viewType'] = '文章'
            itemspipline['searchWord'] = self.name_map[meta['curname']]
            itemspipline['title'] = i['title']
            itemspipline['crawlTime'] = help.get_locationtime()
            itemspipline['publishTime'] = i['create_time']
            itemspipline['level'] = 1
            itemspipline['like'] = ''
            itemspipline['authorName'] = i['author']['name']
            itemspipline['authorID'] = i['author']['url']
            itemspipline['content'] = ''
            yield itemspipline
