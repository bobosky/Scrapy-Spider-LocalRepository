# -*- coding: utf-8 -*-
import json,re,requests,scrapy,time
from urllib.parse import urlencode
from scrapy.http import Request
from lxml import etree
from travellerSP.pipelines import TravellerspPipeline
from travellerSP.items import SchoolInfoItem
import travellerSP.helper as help

class sxue(scrapy.Spider):
    name = 'gdedu'

    def start_requests(self):
        map = {21:655,31:144,34:44}
        for i in map.keys():
            for j in range(1, map[i] + 1):
                url = 'http://xxpt.gdedu.gov.cn/tj/wbfw/wbfw_visitor.do?action=index&xxxlb_m={t}&page={p}'.format(t=i, p=j)
                yield Request(url=url,callback=self.parse)

    def parse(self, response):
        list = response.xpath('//div[@id="content"]/div[@class="contetn_right"]/table/tbody/tr')
        for i in list[1:]:
            pipeline = SchoolInfoItem()
            tmp = i.xpath('td[2]/text()').extract_first()
            city = re.search('\w{2}省\w+市',tmp)

            pipeline['city'] = city.group() if city else ''
            pipeline['name'] = i.xpath('td[1]/text()').extract_first()
            pipeline['address'] = i.xpath('td[2]/text()').extract_first()
            pipeline['phone'] = i.xpath('td[3]/text()').extract_first()
            pipeline['level'] = i.xpath('td[4]/text()').extract_first()
            pipeline['code'] = ''
            pipeline['web'] = ''
            yield pipeline
