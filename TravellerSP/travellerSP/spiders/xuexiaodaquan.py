# -*- coding: utf-8 -*-
import json,re,requests,scrapy,time
from urllib.parse import urlencode
from scrapy.http import Request
from lxml import etree
from travellerSP.pipelines import saveExcelPipeline
from travellerSP.items import SchoolInfoItem
import travellerSP.helper as help

class XuexiaoSpider(scrapy.Spider):
    name = 'xuexiao'

    def start_requests(self):
        url = 'http://www.xuexiaodaquan.com'
        yield Request(url=url,callback=self.city_parse)

    def city_parse(self, response):
        list = response.css('.city-all dl dd a')
        for i in list:
            href = i.xpath('@href').extract_first()
            if not href == '#':
                yield Request(url=href, callback=self.level_parse)
                time.sleep(6)
            else:
                continue

    def level_parse(self, response):
        list = response.css('#nav-drop .drop-title a').xpath('@href').extract()
        for i in list[1:4]:
            yield Request(url=i, callback=self.first_page, meta={'url':i})
            time.sleep(6)

    def first_page(self, response):
        lastpage = response.css('#mypage a').xpath('@href')[-1].extract()
        lastnum = re.search('\/pn(\d+).html', lastpage).group(1)
        self.analysis(response)
        for i in range(2, int(lastnum) + 1):
            url = '{h}pn{p}.html'.format(h=response.meta['url'],p=i)
            yield Request(url=url, callback=self.analysis)


    def analysis(self, response):
        print(response.url)
        pipline = SchoolInfoItem()
        pipline['name'] = response.xpath('//div[@class="crumbs"]/strong/text()').extract_first()
        info = response.css('#jibenxinxi li i')
        pipline['address'] = info[0].xpath('text()').extract_first()
        pipline['phone'] = info[1].xpath('text()').extract_first()
        pipline['code'] = info[2].xpath('text()').extract_first()
        pipline['web'] = info[3].xpath('text()').extract_first()
        print(pipline,'\n')
        saveExcelPipeline.process_item(item=pipline,spider=None)

        return