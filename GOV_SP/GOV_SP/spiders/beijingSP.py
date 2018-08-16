# -*- coding: utf-8 -*-
import scrapy,time,re
from GOV_SP import helper
from scrapy.http import Request
from GOV_SP.items import GOVItem

class BidingspSpider(scrapy.Spider):
    name = 'beijingSP'
    allowed_domains = ['bgpc.gov.cn']

    def start_requests(self):
        url = 'http://www.bgpc.gov.cn/defaults/news/news/page/1%2Ftid%2F2'
        yield Request(url=url, callback=self.parse)

    def parse(self, response):
        items = response.css('.content-list .content-right-content .content-right-content-center li')
        for item in items:
            href = item.xpath('./a/@href').extract_first()
            url = 'http://www.bgpc.gov.cn/{}'.format(href)
            yield Request(url=url, callback=self.detail_parse)

    def detail_parse(self, response):
        body = response.css('.details-content .content-right-details-content').xpath('string(.)').extract_first()
        details_top = response.css('.details-content .content-right-details-top')
        itempipline = GOVItem()

        product = re.findall('采购项目性质或用途：(\w*)',body)
        tenderee_cor = re.findall('采购人名称：(\w*)',body)
        publishTime = re.findall('发布时间：(\d*-\d*-\d*)',details_top.css('p').extract_first())
        deadTime = re.findall('投标截止时间、开标时间：(\w*)',body)
        submitTime = re.findall('采购项目性质或用途：(\w*)',body)
        address = re.findall('采购人地址：(\w*)',body)
        sum = re.findall('预算资金：(\w*.\w*)',body)
        tenderee_contacter = re.findall('联系人：(\w*)',body)
        tenderee_phoneNum = re.findall('联系电话：(\d*-\d*)',body)
        winbider = re.findall('成交人名称：(\w*)',body)
        winbiderAddr = re.findall('成交人地址：(\w*)',body)
        winbider_contacter = re.findall('项目负责人：(\w*)',body)
        winbider_phoneNum = re.findall('联系电话：(\d*-\d*)',body)

        itempipline['crawlTime'] = helper.get_localtime()
        itempipline['platform'] = '北京政府采购中心'
        itempipline['search_column'] = '最新'
        itempipline['product'] = product[0] if product else ''
        itempipline['tenderee_cor'] = tenderee_cor[0] if tenderee_cor else ''
        itempipline['publishTime'] = publishTime[0] if publishTime else ''
        itempipline['deadTime'] = deadTime[0] if deadTime else ''
        itempipline['submitTime'] = submitTime[0] if submitTime else ''
        itempipline['address'] = address[0] if address else ''
        itempipline['projectName'] = details_top.css('span').extract_first()
        itempipline['sum'] = sum[0] if sum else ''
        itempipline['url'] = response.url
        itempipline['winbider'] = winbider[0] if winbider else ''
        itempipline['winbiderAddr'] = winbiderAddr[0] if winbiderAddr else ''
        itempipline['winbider_contacter'] = winbider_contacter[0] if winbider_contacter else ''
        itempipline['winbider_phoneNum'] = winbider_phoneNum[0] if winbider_phoneNum else ''
        itempipline['tenderee_contacter'] = tenderee_contacter[0] if tenderee_contacter else ''
        itempipline['tenderee_phoneNum'] = tenderee_phoneNum[0] if tenderee_phoneNum else ''

        print(itempipline)

