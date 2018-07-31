# -*- coding: utf-8 -*-
import scrapy
from scrapy.conf import settings
from scrapy.http import Request
from urllib.parse import urlencode
from Taobao.items import TaobaoItem
import time
import json
import re

class TbinfospiderSpider(scrapy.Spider):
    name = 'tbInfospider'
    allowed_domains = ['taobao.com']
    # start_urls = ['http://taobao.com/']

    def get_localtime(self):
        return time.strftime('%Y-%m-%d', time.localtime())

    def get_createtime(self, sec):
        return time.strftime('%Y-%m-%d', time.localtime(sec))

    # https://s.taobao.com/search?
    list_params = {
        'data-key':None,  #首页s,ps
        'data-value':None,  #首页0,1
        'ajax':'true',
        'q':None
    }

    #https://rate.taobao.com/feedRateList.htm?
    rate_parmas = {
        'auctionNumId': None, #nid
        'userNumId': None,  #user_id
        'currentPageNum': None,
        'pageSize': '20'
    }

    def start_requests(self):
        for i in range(0,settings.get('LIST_PAGE')):
            if i == 0:
                self.list_params['data-key'] = 's,ps'
                self.list_params['data-value'] = '0,1'
            else:
                self.list_params['data-key'] = 's'
                self.list_params['data-value'] = i*44
            self.list_params['q'] = settings.get('SEARCH_WORD')
            url = 'https://s.taobao.com/search?{}'.format(urlencode(self.list_params))
            yield Request(url=url,callback=self.list_parse,meta={'sw':settings.get('SEARCH_WORD')})

    def list_parse(self, response):
        try:
            body = json.loads(response.text)['mods']['itemlist']['data']['auctions']
        except:
            return
        for item in body:
            self.rate_parmas['userNumId'] = item['user_id']
            self.rate_parmas['auctionNumId'] = item['nid']
            self.rate_parmas['currentPageNum'] = 1
            url = 'https://rate.taobao.com/feedRateList.htm?{}'.format(urlencode(self.rate_parmas))
            yield Request(url=url,callback=self.rate_first_parse,meta={'uid':item['user_id'],'nid':item['nid'],'sw':response.meta['sw']})

    def rate_first_parse(self, response):
        body = json.loads(re.findall('\((.*)\)', response.text)[0])
        maxpage = body['maxPage']
        self.loop_rate_parse(response=response)
        if maxpage == 1:
            return
        else:
            for i in range(2,maxpage+1):
                self.rate_parmas['userNumId'] = response.meta['uid']
                self.rate_parmas['auctionNumId'] = response.meta['nid']
                self.rate_parmas['currentPageNum'] = i
                url = 'https://rate.taobao.com/feedRateList.htm?{}'.format(urlencode(self.rate_parmas))
                yield Request(url=url, callback=self.loop_rate_parse,meta={'ma':maxpage,'sw':response.meta['sw']})

    def loop_rate_parse(self, response):
        body = json.loads(re.findall('\((.*)\)', response.text)[0])
        items = TaobaoItem()
        for item in body['comments']:
            items['id'] = item['rateId']
            items['url'] = response.url
            items['platform'] = '淘宝'
            items['viewType'] = '问答'
            items['searchWord'] = response.meta['sw']
            items['crawlTime'] = self.get_localtime()
            items['publishTime'] = item['date']
            items['level'] = 1
            items['authorName'] = item['user']['nick']
            items['content'] = item['content']
            print(items)

