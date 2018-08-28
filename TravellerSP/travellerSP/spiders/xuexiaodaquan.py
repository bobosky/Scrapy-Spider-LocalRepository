# -*- coding: utf-8 -*-
import json,re,requests,scrapy
from urllib.parse import urlencode
from scrapy.http import Request
from lxml import etree
from travellerSP.pipelines import TravellerspPipeline
from travellerSP.items import SchoolInfoItem
import travellerSP.helper as help

class XuexiaoSpider(scrapy.Spider):
    name = 'xuexiao'

    def start_requests(self):
        url = 'http://www.xuexiaodaquan.com'
        yield Request(url=url,callback=self.city_parse)

    def city_parse(self, response):
        list = response.css('.city-all dl dd a')
        for i in list[1:4]:
            href = i.xpath('@href').extract_first()
            if not href == '#':
                yield Request(url=href, callback=self.school_parse)
            else:
                continue

    def school_parse(self, response):
        list = response.css('#nav-drop .drop-title a').xpath('@href').extract()
        for i in list[1:4]:
            yield Request(url=i, callback=self.datil_parse)

    def datil_parse(self, response):
        urllist = response.xpath('//div[@class="list-xx clearfix"]/dl/dt/a/@href').extract()
        for i in urllist:
            yield Request(url=i, callback=self.parse)

    def parse(self, response):
        pipline = SchoolInfoItem()
        pipline['name'] = response.xpath('//div[@class="crumbs"]/strong/text()').extract_first()
        info = response.css('#jibenxinxi li i')
        pipline['address'] = info[0].xpath('text()').extract_first()
        pipline['phone'] = info[1].xpath('text()').extract_first()
        pipline['code'] = info[2].xpath('text()').extract_first()
        pipline['web'] = info[3].xpath('text()').extract_first()
        print(pipline)

