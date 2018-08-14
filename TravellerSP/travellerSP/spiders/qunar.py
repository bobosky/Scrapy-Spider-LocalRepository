# -*- coding: utf-8 -*-
import scrapy,json,re
from urllib.parse import urlencode
from scrapy.http import Request
from lxml import etree
from travellerSP.pipelines import TravellerspPipeline
from travellerSP.items import TravellerspItem
import travellerSP.helper as help

class QunarSpider(scrapy.Spider):
    name = 'qunar'
    # allowed_domains = ['qunar.com.com']
    # start_urls = ['http://ctrip.com/']
    id_map = {
          '715145':'濠河风景名胜区',
          '716397':'南通狼山风景区',
          '702813':'南通水绘园',
          '7646591':'南通海底世界',
          '702642':'张謇纪念馆',
          '714698':'南通博物苑',
          '3725044':'南通园艺博览园',
          '708135':'南通啬园',
          '7470994':'南通方特探险王国'
        }

    # http://travel.qunar.com/place/api/html/comments/poi/708974?
    par = {
           'poiList': 'true',
           'sortField': 1,
           'rank': 0,
           'pageSize': 30,
           'page': None
          }

    def __init__(self):
        self.pipline = TravellerspPipeline()

    def start_requests(self):
        self.par['page'] = 1
        for id in self.id_map.keys():
            url = 'http://travel.qunar.com/place/api/html/comments/poi/{id}?{para}'.format(id=id,para=urlencode(self.par))
            yield Request(url=url,callback=self.loop_request,meta={'sw':self.id_map[id],'curpage':1,'curid':id})

    def loop_request(self, response):
        body = json.loads(response.text)

        if re.findall(r'no_comment_data',body['data']):
            print('出现了no_comment_data')
            return
        else:
            self.analysis(jsonBy=body, url=response.url, meta=response.meta)
            print('翻页')
            self.par['page'] = response.meta['curpage']+1
            curid = response.meta['curid']
            loop_url = 'http://travel.qunar.com/place/api/html/comments/poi/{id}?{para}'.format(id=curid,para=urlencode(self.par))
            return Request(url=loop_url,callback=self.loop_request,meta={'sw':self.id_map[curid],'curpage':self.par['page'],'curid':curid})

    def analysis(self, jsonBy, url, meta):
        print('进入分析。。。。。。。。。。。。。。。。。。。。。')
        itemspipline = TravellerspItem()
        selector = etree.HTML(jsonBy['data'])
        list = selector.xpath('//li[@class="e_comment_item clrfix"]')
        for i in list:
            itemspipline['id'] = i.xpath('./@id')[0]
            itemspipline['url'] = url
            itemspipline['platform'] = '去哪儿'
            itemspipline['viewType'] = '文章'
            itemspipline['searchWord'] = meta['sw']
            title = i.xpath('./div[@class="e_comment_main"]/div[1]/div[@class="e_comment_title"]/a/text()')
            itemspipline['title'] = title[0] if title else ''
            itemspipline['crawlTime'] = help.get_locationtime()
            itemspipline['publishTime'] = i.xpath('./div[1]/div/div[@class="e_comment_add_info"]/ul/li[1]/text()')[0]
            itemspipline['level'] = 1
            like = i.xpath('./div[1]/div/div[@class="e_comment_add_info"]/ul/li[2]/a/span/em/i/text()')
            itemspipline['like'] = like[0] if like else 0
            itemspipline['authorName'] = i.xpath('./div[2]/div[2]/a/text()')[0]
            href = i.xpath('./div[2]/div[2]/a/@href')[0]
            itemspipline['authorID'] = re.findall(r'(\d*)@',href)[0]
            itemspipline['content'] = i.xpath('string(./div[@class="e_comment_main"]/div[1]/div[@class="e_comment_content"]/p)')
            print(itemspipline)
            self.pipline.process_item(item=itemspipline, spider=None)
        return

