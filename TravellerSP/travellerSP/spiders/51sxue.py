# -*- coding: utf-8 -*-
import json,re,requests,scrapy,time
from urllib.parse import urlencode
from scrapy.http import Request
from lxml import etree
from travellerSP.pipelines import TravellerspPipeline
from travellerSP.items import SchoolInfoItem
import travellerSP.helper as help

class sxue(scrapy.Spider):
    name = '51sxue'

    # params = {
    #     't' : None,   #2-小学  3-中学
    #     'page' : None
    # }


    #http://xuexiao.51sxue.com/slist/?o=&t=3&areaCodeS=12&level=&sp=&score=&order=&areaS=%CC%EC%BD%F2%CA%D0&searchKey=
    def start_requests(self):
        map = {2:1161,3:1334}
        for i in map.keys():
            for j in range(1,map[i]+1):
                url = 'http://xuexiao.51sxue.com/slist/?t={t}&page={p}'.format(t=i,p=j)
                yield Request(url=url,callback=self.parse)

    def parse(self, response):
        list = response.css('.school_main .reply_box')
        for i in list:
            pipeline = SchoolInfoItem()
            pipeline['name'] = i.css('#dsadas').xpath('@title').extract_first()
            pipeline['city'] = i.xpath('./div[@class="school_t_con"]/div[2]/li[2]/b/text()').extract_first()
            pipeline['level'] = i.xpath('./div[@class="school_t_con"]/div[2]/li[4]/ol[2]/b/text()').extract_first()
            pipeline['address'] = i.css('.school_dz').xpath('b/text()').extract_first()
            pipeline['phone'] = i.css('.school_telephone').xpath('b/text()').extract_first()
            pipeline['code'] = ''
            pipeline['web'] = ''
            yield pipeline






