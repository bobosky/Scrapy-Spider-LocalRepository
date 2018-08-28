# -*- coding: utf-8 -*-
import scrapy,re,json
from lxml import etree
from urllib.parse import quote
from urllib.parse import urlencode
from GOV_SP import helper
from scrapy.http import Request
from GOV_SP.items import GOVItem

class ChongQingSpider(scrapy.Spider):
    name = 'chongqingSP'

    # https://www.cqgp.gov.cn/gwebsite/api/v1/notices/stable?
    par = {
        'pi':1,
        'projectPurchaseWay':100,
        'ps':30,                       #pagesize
    }

    # https://www.cqgp.gov.cn/notices/detail/606544077072371712?

    def start_requests(self):
        url = 'https://www.cqgp.gov.cn/gwebsite/api/v1/notices/stable?{}'.format(urlencode(self.par))
        yield Request(url=url,callback=self.parse)

    def parse(self, response):
        json_body = json.loads(response.text)['notices']
        for i in json_body:
            detail_url = 'https://www.cqgp.gov.cn/gwebsite/api/v1/notices/stable/{id}'.format(id=i['id'])
            yield Request(url=detail_url, callback=self.detail_parse)

    def detail_parse(self, response):
        json_body = json.loads(response.text)['notice']

        pipline = GOVItem()
        pipline['crawlTime'] = helper.get_localtime()
        pipline['platform'] = '重庆政府采购网'
        pipline['search_column'] = '最新'
        pipline['product'] = json_body['projectDirectoryName']
        pipline['publishTime'] = json_body['issueTime']
        pipline['deadTime'] = json_body['bidEndTime'] if 'bidEndTime' in json_body.keys() else ''
        pipline['submitTime'] = json_body['bidBeginTime']
        pipline['projectName'] = json_body['title']
        pipline['sum'] = json_body['projectBudget']
        pipline['detail'] = ''
        pipline['url'] = response.url
        pipline['tenderee_cor'] = json_body['buyerName']
        pipline['bidingProxy'] = json_body['agentName']

        html = json_body['html']
        body = etree.HTML(html).xpath('string(.)')
        pipline['detail'] = body

        # body = response.css('div.wrap-post').xpath('string(.)').extract_first()
        # address = re.search('采购人地址：(\w*)',body)
        # tenderee_contacter = re.search('采购经办人：(\w*)',body)
        # tenderee_phoneNum = re.search('采购人电话：(\d*)',body)
        # bidingProxyAddr = re.search('代理机构地址：(\w*)',body)
        # bidingProxy_contacter = re.search('代理机构经办人：(\w*)',body)
        # bidingProxy_phoneNum = re.search('代理机构电话：(\d*)',body)
        #
        # pipline['address'] = address.group(1) if address.group() else ''
        # pipline['tenderee_contacter'] = tenderee_contacter.group(1) if tenderee_contacter.group() else ''
        # pipline['tenderee_phoneNum'] = tenderee_phoneNum.group(1) if tenderee_phoneNum.group() else ''
        # pipline['bidingProxyAddr'] = bidingProxyAddr.group(1) if bidingProxyAddr.group() else ''
        # pipline['bidingProxy_contacter'] = bidingProxy_contacter.group(1) if bidingProxy_contacter.group() else ''
        # pipline['bidingProxy_phoneNum'] = bidingProxy_phoneNum.group(1) if bidingProxy_phoneNum.group() else ''

        return pipline






