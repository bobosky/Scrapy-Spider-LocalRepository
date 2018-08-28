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
        url = 'http://www.tjgpc.gov.cn/webInfo/getWebInfoList1.do?{}'.format(urlencode(self.par))
        yield Request(url=url,callback=self.list_parse)

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

        article_body = response.css('.xx').xpath('string(.)').extract_first()
        deadTime = re.search('投标截止时间：(\w*:\d*)', article_body)
        address = re.search('采购人地址：(\w*)', article_body)
        submitTime = re.search('网上应答时间(\w*)',article_body)
        tenderee_cor = re.search('采购人名称：(\w*)',article_body)
        tenderee_contacter = re.search('采购人联系人：(\w*)',article_body)
        tenderee_phoneNum = re.search('采购人联系电话：(\d*-\d*)',article_body)
        bidingProxy = re.search('采购代理机构名称：(\w*)',article_body)
        bidingProxyAddr = re.search('采购代理机构地址：(\w*)',article_body)
        bidingProxy_contacter = re.search('联系人：(\w*)',article_body)
        bidingProxy_phoneNum = re.search('联系电话：(\d*-\d*)',article_body)
        detail = re.findall('第一包：(\w*)',article_body)


        itempipline['search_column'] = '最新'
        itempipline['product'] = detail[0] if detail else ''
        itempipline['tenderee_cor'] = tenderee_cor.group(1) if tenderee_cor else ''
        itempipline['publishTime'] = publishTime[0] if publishTime else ''
        itempipline['deadTime'] = deadTime.group(1) if deadTime else ''
        itempipline['submitTime'] = submitTime[0] if submitTime else ''
        itempipline['address'] = address.group(1) if address else ''
        itempipline['projectName'] = projectName[0] if projectName else ''
        itempipline['sum'] = detail[1] if detail else ''
        itempipline['detail'] = detail[0] if detail else ''
        itempipline['url'] = response.url
        # itempipline['winbider'] = winbider[0] if winbider else ''
        # itempipline['winbiderAddr'] = winbiderAddr[0] if winbiderAddr else ''
        # itempipline['winbider_contacter'] = winbider_contacter[0] if winbider_contacter else ''
        # itempipline['winbider_phoneNum'] = winbider_phoneNum[0] if winbider_phoneNum else ''

        itempipline['tenderee_contacter'] = tenderee_contacter.group(1) if tenderee_contacter else ''
        itempipline['tenderee_phoneNum'] = tenderee_phoneNum.group(1) if tenderee_phoneNum else ''
        itempipline['bidingProxy'] = bidingProxy.group(1) if bidingProxy else ''
        itempipline['bidingProxyAddr'] = bidingProxyAddr.group(1) if bidingProxyAddr else ''
        itempipline['bidingProxy_contacter'] = bidingProxy_contacter.group(1) if bidingProxy_contacter else ''
        itempipline['bidingProxy_phoneNum'] = bidingProxy_phoneNum.group(1) if bidingProxy_phoneNum else ''
        return itempipline
