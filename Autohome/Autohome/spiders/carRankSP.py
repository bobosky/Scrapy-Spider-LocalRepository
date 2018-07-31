# coding:utf-8

from scrapy.conf import settings
from scrapy.http import Request
from Autohome.items import AutohomeItem
import scrapy
import time
import re

class CarRankSP(scrapy.Spider):
    name = 'carrankSP'
    allowed_domains = ['autohome.com.cn']

    def get_localtime(self):
        return time.strftime('%Y-%m-%d',time.localtime())

    def start_requests(self):
        for car in settings.get('CARS'):
            for cityid in settings.get('CITYID'):
                url = 'https://www.autohome.com.cn/{carid}/{city}'.format(carid=car['CARID'],city=cityid)
                yield Request(url=url,callback=self.parse,meta={'cityid':cityid,'carid':car['CARID'],'lid':car['LEVELID'],'tr':None})

    def parse(self, response):
        items = AutohomeItem()
        items['title_rank']=response.meta['tr']
        items['city']=response.css('.subnav-title-rank span')[0].xpath('text()').extract_first()
        items['title_name']=response.css('.subnav-title-name a').xpath('string(.)').extract_first()
        items['font_score']=response.css('.font-score').xpath('text()').extract_first()
        items['crawl_date']=self.get_localtime()
        items['rival_rank']=None
        items['screen_shot']=response.meta['ss']
        i=1
        for link in response.css('table.table-rival .rival-car small a').xpath('@href').extract():
            if re.findall('cn/(\d*)/',link)[0] == response.meta['carid']:
                items['rival_rank'] = i
                break
            i = i +1

        return items


