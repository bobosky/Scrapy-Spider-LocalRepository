# -*- coding: utf-8 -*-
import scrapy,re
from urllib.parse import urlencode
from GOV_SP import helper
from scrapy.http import Request
from GOV_SP.items import GOVItem

class TianjingSpider(scrapy.Spider):
    name = 'tianjingSP'
    par = {
        'fkWebInfoclassId':'W001_001_001',
        'page': 1,
        'pagesize': 30
    }

    def start_requests(self):
        url = 'http://www.tjgpc.gov.cn/webInfo/getWebInfoListForwebInfoClass.do?{}'.format(urlencode(self.par))
        return Request(url=url,callback=self.list_parse)

    def list_parse(self, response):
        list = response.css('.list_right .cur table tr')
        for item in list:
            # type = item.xpath('./td[2]/a[1]/text()').extract()
            url = item.xpath('./td[2]/a[2]/@href').extract_first()
            yield Request(url=url,callback=self.detail_parse)

    def detail_parse(self, response):
        itempipline = GOVItem()
        itempipline['crawlTime'] = helper.get_localtime()
        itempipline['platform'] = '天津市政府采购中心'

        projectName = response.css('.xx_title').xpath('text()').extract()
        publishTime = response.css('.xx_right').xpath('center/table/tr[2]/td/text()').extract()

        aeticle_body = response.css('.xx_right').xpath('center/table/tr[3]/td[@class="xx"]/p').extract()



        itempipline['search_column'] = '最新'
        itempipline['product'] = product[0] if product else ''
        itempipline['tenderee_cor'] = tenderee_cor[0] if tenderee_cor else ''
        itempipline['publishTime'] = publishTime[0] if publishTime else ''
        itempipline['deadTime'] = deadTime[0] if deadTime else ''
        itempipline['submitTime'] = submitTime[0] if submitTime else ''
        itempipline['address'] = address[0] if address else ''
        itempipline['projectName'] = projectName[0] if projectName else ''
        itempipline['sum'] = sum[0] if sum else ''
        itempipline['url'] = response.url
        itempipline['winbider'] = winbider[0] if winbider else ''
        itempipline['winbiderAddr'] = winbiderAddr[0] if winbiderAddr else ''
        itempipline['winbider_contacter'] = winbider_contacter[0] if winbider_contacter else ''
        itempipline['winbider_phoneNum'] = winbider_phoneNum[0] if winbider_phoneNum else ''
        itempipline['tenderee_contacter'] = tenderee_contacter[0] if tenderee_contacter else ''
        itempipline['tenderee_phoneNum'] = tenderee_phoneNum[0] if tenderee_phoneNum else ''



