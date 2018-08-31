# -*- coding: utf-8 -*-
import json,re,requests,scrapy,time
from urllib.parse import urlencode
from scrapy.http import Request
from lxml import etree
from travellerSP.pipelines import saveExcelPipeline,TravellerspPipeline
from travellerSP.items import SchoolInfoItem
import travellerSP.helper as help

class XuexiaoSpider(scrapy.Spider):
    name = 'xuexiao'
    pip = None

    def __init__(self):
        # self.pip = saveExcelPipeline()
        self.txt = TravellerspPipeline()

    def start_requests(self):
        url = 'http://www.xuexiaodaquan.com'
        yield Request(url=url,callback=self.city_parse)

    def city_parse(self, response):
        list = response.css('.city-all dl dd a')
        # list = ['http://guangzhou.xuexiaodaquan.com/',
        #         #'http://beijing.xuexiaodaquan.com/',
        #         'http://shenzhen.xuexiaodaquan.com/',
        #         #'http://fushan.xuexiaodaquan.com/',
        #         #'http://shanghai.xuexiaodaquan.com/',
        #         #'http://hangzhou.xuexiaodaquan.com/',
        #         ]
        for i in list:
            href = i.xpath('@href').extract_first()
            if not href == '#':
                yield Request(url=href, callback=self.level_parse)
            else:
                continue

    def level_parse(self, response):
        list = response.css('#nav-drop .drop-title a').xpath('@href').extract()
        for i in list[1:4]:
            yield Request(url=i, callback=self.first_page)

    def first_page(self, response):
        lastpage = response.css('#mypage a').xpath('@href')
        if not lastpage:
            print(response.url,' 只有一页')
            return
        lastnum = re.search('\/pn(\d+).html', lastpage[-1].extract()).group(1)
        print(response.url,'最后一页是',lastnum)

        for i in range(1, int(lastnum) + 1):
            url = '{h}pn{p}.html'.format(h=response.url,p=i)
            if i == 1:
                url = response.url
            print('申请当页：',url)
            yield Request(url=url, callback=self.analysis,dont_filter=True)

    # def list_parse(self, response):
    #     print(response.url)
    #     urllist = response.xpath('//div[@class="list-xx clearfix"]/dl/dt/a/@href').extract()
    #     for i in urllist:
    #         print('正在申请detail页面 ',i)
    #         yield Request(url=i, callback=self.analysis)

    def analysis(self, response):
        # print(response.url)
        infolist = response.xpath('//div[@class="list-xx clearfix"]/dl/dd')

        for i in infolist:
            pipline = SchoolInfoItem()
            pipline['name'] = i.xpath('./p/a/@title').extract_first()
            # info = response.css('#jibenxinxi ul li i')
            pipline['address'] = i.xpath('./ul/li[1]/span/text()').extract_first()
            pipline['phone'] = i.xpath('./ul/li[2]/span/text()').extract_first()
            pipline['web'] = i.xpath('./ul/li[3]/span/text()').extract_first()
            # pipline['web'] = info[3].xpath('text()').extract_first()
            print(pipline,'\n')
            self.txt.process_item(item=pipline,spider=None)
        # self.pip.process_item(item=pipline,spider=None)

        return