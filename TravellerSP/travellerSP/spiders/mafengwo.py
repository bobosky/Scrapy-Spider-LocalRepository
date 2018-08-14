# -*- coding: utf-8 -*-
import scrapy,json,re
from urllib.parse import urlencode
from scrapy.http import Request
from lxml import etree
from travellerSP.pipelines import TravellerspPipeline
from travellerSP.items import TravellerspItem
import travellerSP.helper as help

class MafangwoSpider(scrapy.Spider):
    name = 'mafangwo'

    id_map = {
        '6327040':'南通濠河景区',
        '5430520': '南通狼山风景名胜区',
        '6325267': '南通如皋水绘园景区',
        '5426931': '南通海底世界旅游',
        '3721876': '张謇纪念馆',
        '5503589': '南通博物苑景区',
        # 'qidong': '南通启东吕四渔港',
        '5503589': '南通园艺博览园',
        '5429244': '南通啬园景区',
        '7052809': '南通方特探险王国'
    }

    par = {
        'params': '{"poi_id":"6327040","page":2,"just_comment":1}',
    }

    def __init__(self):
        self.pipline = TravellerspPipeline()

    def start_requests(self):
        for i in self.id_map.keys():
            self.par['params'] = '{"poi_id":"'+str(i)+'","page":'+'1'+',"just_comment":1}'
            url = 'http://pagelet.mafengwo.cn/poi/pagelet/poiCommentListApi?{}'.format(urlencode(self.par))
            yield Request(url=url,callback=self.loop_request,meta={'curpage':1,'curid':i})

    def loop_request(self, response):
        body = json.loads(response.text)

        if re.findall(r'暂无内容',body['data']['html']):
            print('暂无内容。。。。。。。。。')
            return
        else:
            self.analysis(jsonBy=body, url=response.url, meta=response.meta)
            print('翻页')
            page = response.meta['curpage'] + 1
            curid = response.meta['curid']
            self.par['params'] = '{"poi_id":"'+str(curid)+'","page":'+str(page)+',"just_comment":1}'
            loop_url = 'http://pagelet.mafengwo.cn/poi/pagelet/poiCommentListApi?{}'.format(urlencode(self.par))
            return Request(url=loop_url, callback=self.loop_request,meta={'curpage':page,'curid':curid})

    def analysis(self, jsonBy, url, meta):
        print('进入分析。。。。。。。。。。。。。。。。。。。。。')
        itemspipline = TravellerspItem()
        selector = etree.HTML(jsonBy['data']['html'])
        list = selector.xpath('//div[@class="rev-list"]/ul/li[@class="rev-item comment-item clearfix"]')
        for i in list:
            id = i.xpath('./a[@class="useful"]/@data-id')
            name = i.xpath('./a[@class="name"]/text()')
            authorID = i.xpath('./div[@class="user"]/a[@class="avatar"]/@href')
            content = i.xpath('./p[@class="rev-txt"]/text()')
            time = i.xpath('./div[@class="info clearfix"]/span[@class="time"]/text()')
            like = i.xpath('./a[@class="useful"]/span[@class="useful-num"]/text()')

            itemspipline['id'] = id[0] if id else ''
            itemspipline['url'] = url
            itemspipline['platform'] = '马蜂窝'
            itemspipline['viewType'] = '问答'
            itemspipline['searchWord'] = self.id_map[meta['curid']]
            itemspipline['title'] = self.id_map[meta['curid']]
            itemspipline['crawlTime'] = help.get_locationtime()
            itemspipline['publishTime'] = time[0] if time else ''
            itemspipline['level'] = 1
            itemspipline['like'] = like[0] if like else ''
            itemspipline['authorName'] = name[0] if name else ''
            itemspipline['authorID'] = authorID[0] if authorID else ''
            itemspipline['content'] = content[0] if content else ''
            print(itemspipline)
            self.pipline.process_item(item=itemspipline, spider=None)
        return



