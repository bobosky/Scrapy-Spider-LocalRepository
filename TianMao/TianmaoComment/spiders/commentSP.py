# encoding: utf-8

from scrapy.conf import settings
from scrapy.http import Request
from urllib.parse import urlencode
from TianmaoComment.items import TianmaocommentItem
import json
import re
import time
import scrapy


class commentSP(scrapy.Spider):
    name = 'commentSP'
    allowed_domains = ['tmall.com']

    def get_localtime(self):
        return time.strftime('%Y-%m-%d',time.localtime())

    def get_createtime(self,sec):
        return time.strftime('%Y-%m-%d',time.localtime(sec))

    # https://list.tmall.com/search_product.htm?
    list_params = {
        's': None,
        'q': None,
        'sort': 's',
        'style': 'g',
        'suggest': '0_1',
        'smAreaId': '440100',
        'type': 'pc'
    }

    # https://rate.tmall.com/list_detail_rate.htm?
    rate_params = {
        'itemId': None,  # data-id
        'sellerId': None,  # user_id
        'order': '3',
        'currentPage': None,
        'append': '0',
        'content': '1',
        'tagId': '',
        'posi': '',
        'picture': '',
        # 'callback':'jsonp'
    }

    def start_requests(self):
        for i in settings.get('SEARCH_WORD'):
            for j in range(0,settings.get('LIST_PAGE')):
                self.list_params['s'] = j*60
                self.list_params['q'] = i
                url = 'https://list.tmall.com/search_product.htm?{}'.format(urlencode(self.list_params))
                yield Request(url=url,callback=self.list_page_parse,meta={'sw':i})

    def list_page_parse(self, response):
        items = response.css('#J_ItemList div.product')
        if not items:
            print('此页为空页，在此停止向下遍历')
            return

        for item in items:
            self.rate_params['itemId'] = item.xpath('@data-id').extract_first()
            tmp = item.css('div.productImg-wrap a').xpath('@href').extract_first()
            self.rate_params['sellerId'] = re.findall('user_id=(\d*)',tmp)[0]
            self.rate_params['currentPage'] = 1
            #发出第一页请求
            url = 'https://rate.tmall.com/list_detail_rate.htm?{}'.format(urlencode(self.rate_params))
            yield Request(url=url,callback=self.paginator_parse,meta={'sw':response.meta['sw'],'itm':self.rate_params['itemId'],'sid':self.rate_params['sellerId']})

    def paginator_parse(self, response):
        body= '{'+re.findall('\\r\\n(.*)',response.text)[0]+r'}'
        jsonBy = json.loads(body)
        if 'rateDetail' in jsonBy.keys():
            pages = jsonBy['rateDetail']['paginator']['lastPage']
            items = jsonBy['rateDetail']['paginator']['items']
            # print(items,pages,jsonBy)
            if items == 0:
                return
            else:
                self.rateList_parse(response=response)
                for i in range(1,pages+1):
                    self.rate_params['currentPage']=i
                    self.rate_params['itemId'] = response.meta['itm']
                    self.rate_params['sellerId'] = response.meta['sid']
                    url = 'https://rate.tmall.com/list_detail_rate.htm?{}'.format(urlencode(self.rate_params))
                    # print('page总数：',pages,url)
                    yield Request(url=url,callback=self.rateList_parse,meta={'sw':response.meta['sw']})

    def rateList_parse(self, response):
        body= '{'+re.findall('\\r\\n(.*)',response.text)[0]+r'}'
        jsonBy = json.loads(body)
        print(response.url,jsonBy)
        items = TianmaocommentItem()
        if 'rateDetail' in jsonBy.keys():
            rateList = jsonBy['rateDetail']['rateList']
            for item in rateList:
                items['id'] = item['id']
                items['url'] = response.url
                items['platform'] = item['cmsSource']
                items['viewType'] = '问答'
                items['searchWord'] = response.meta['sw']
                items['crawlTime'] = self.get_localtime()
                items['publishTime'] = item['rateDate']
                items['level'] = 1
                items['authorName'] = item['displayUserNick']
                items['content'] = item['rateContent']
                yield items
        else:
            pass
