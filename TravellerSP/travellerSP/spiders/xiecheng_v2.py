# -*- coding: utf-8 -*-
import scrapy,json,re
from urllib.parse import urlencode
from scrapy.http import Request
from lxml import etree
from scrapy import log
from travellerSP.pipelines import TravellerspPipeline
from travellerSP.items import TravellerspItem
import travellerSP.helper as help

class XiechengSpider(scrapy.Spider):
    name = 'xiecheng_v2'
    allowed_domains = ['ctrip.com']
    # start_urls = ['http://ctrip.com/']
    param = {
        'poiID': None,
        'districtId': 85,
        'districtEName': 'Nantong',
        'pagenow': None,
        'order': '3.0',
        'star': '0.0',
        'tourist': '0.0',
        'resourcetype': 2
    }

    poiId_list = {
        '76177':'南通濠河景区',
        '96090':'南通狼山风景名胜区',
        '76178':'南通如皋水绘园景区',
        '87809':'张謇纪念馆',
        '76180':'南通博物苑景区',
        '87835':'南通启东吕四渔港',
        '92329':'南通园艺博览园',
        '76256':'南通啬园',
        '101266':'南通方特探险王国'
    }

    def __init__(self):
        self.pipline = TravellerspPipeline()

    def start_requests(self):
        for i in self.poiId_list.keys():
            self.param['poiID'] = i
            self.param['pagenow'] = 1
            url = 'http://you.ctrip.com/destinationsite/TTDSecond/SharedView/AsynCommentView'
            # yield Request(url=url,callback=self.loop_request,meta={'data':self.param,'curpage':1,'curid':i},dont_filter=True)

            log.msg('发出 {name} 第1页请求'.format(name=self.poiId_list[i]),log.INFO)
            yield Request(url=url,callback=self.first_parse,meta={'data':self.param,'curid':i},dont_filter=True)

    def first_parse(self, response):
        curid = response.meta['curid']
        name = self.poiId_list[curid]
        self.analysis(response=response)

        ttd_pager = response.xpath('//div[@class="ttd_pager cf"]').extract()
        if ttd_pager:
            numpage = response.css('.numpage').xpath('text()').extract_first()
            log.msg('{n}有{p}页'.format(n=name,p=numpage),log.INFO)

            for i in range(2,int(numpage)+1):
                # self.param['poiID'] = curid
                # self.param['pagenow'] = i
                loop_url = 'http://you.ctrip.com/destinationsite/TTDSecond/SharedView/AsynCommentView'
                yield Request(url=loop_url, callback=self.analysis, meta={'data':{  'poiID': curid,
                                                                                    'districtId': 85,
                                                                                    'districtEName': 'Nantong',
                                                                                    'pagenow': i,
                                                                                    'order': '3.0',
                                                                                    'star': '0.0',
                                                                                    'tourist': '0.0',
                                                                                    'resourcetype': 2
                                                                                 },'curpage':i,'curid':curid}, dont_filter=True)

        else:
            log.msg('{name} 只有一页,结束'.format(name=name), log.INFO)
            return

    # def loop_request(self, response):
    #     if not response.css('.comment_single').extract():
    #         print('no content')
    #         return
    #     else:
    #         print('翻页')
    #         self.analysis(response=response)
    #         curid = response.meta['curid']
    #         curpage = response.meta['curpage'] + 1
    #         self.param['poiID'] = curid
    #         self.param['pagenow'] = curpage
    #         loop_url = 'http://you.ctrip.com/destinationsite/TTDSecond/SharedView/AsynCommentView'
    #         return Request(url=loop_url, callback=self.loop_request,meta={'data': self.param, 'curpage': curpage, 'curid': curid}, dont_filter=True)

    def analysis(self, response):
        name = self.poiId_list[response.meta['curid']]
        status = response.xpath('//div[@class="ttd_pager cf"]/p/text()').extract()
        # log.msg('目前分析 {name}:{status}'.format(name=name,status=status[0] if status else '无status'), log.INFO)

        itemspipline = TravellerspItem()
        items = response.css('.comment_ctrip .comment_single')
        for item in items:
            log.msg('{name}:{status}'.format(name=name,status=status[0] if status else '无status'), log.INFO)

            id = item.css('.useful a').xpath('@data-id').extract()
            publishTime = item.css('.time_line').xpath('string(.)').extract()
            like = item.css('.useful em').xpath('string(.)').extract()
            authorName = item.css('.userimg .ellipsis a').xpath('string(.)').extract()
            authorID = item.xpath('./div[@class="userimg"]/span[@class="ellipsis"]/a[@itemprop="author"]/@href').extract()
            content = item.css('.main_con .heightbox').xpath('string(.)').extract()

            # itemspipline['id'] = '{name}:{status}'.format(name=name,status=status[0] if status else '无status')
            itemspipline['id'] = id[0] if id else ''
            itemspipline['url'] = response.url
            itemspipline['platform'] = '携程'
            itemspipline['viewType'] = '评论'
            itemspipline['searchWord'] = name
            itemspipline['title'] = name
            itemspipline['crawlTime'] = help.get_locationtime()
            itemspipline['publishTime'] = publishTime[0] if publishTime else ''
            itemspipline['level'] = 1
            itemspipline['like'] = like[0] if like else ''
            itemspipline['authorName'] = authorName[0] if authorName else ''
            itemspipline['authorID'] = authorID[0] if authorID else ''
            itemspipline['content'] = content[0] if content else ''
            print(itemspipline,'\n')
            self.pipline.process_item(item=itemspipline, spider=None)
        return
