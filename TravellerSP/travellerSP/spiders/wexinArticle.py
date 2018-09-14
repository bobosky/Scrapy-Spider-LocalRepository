# encoding: utf-8

import scrapy,json,re
from urllib.parse import urlencode
from scrapy.http import Request
from lxml import etree
from travellerSP.pipelines import TravellerspPipeline
from travellerSP.items import TravellerspItem
import travellerSP.helper as help

class WeixinSpider(scrapy.Spider):
    name = 'weixinArticle'
    allowed_domains = ['weixin.qq.com']

    __biz = {
        'MzA5OTEzNDkxNw==':'广汽传祺',
        'MzA5NzMxODMxNg==':'别克',
        'MjM5MDkyMzU5MQ==':'上汽集团MG名爵',
        'MjM5Mjk1MzM0MQ==':'长安汽车',
        'MjM5MzcwNzIyMA==':'荣威ROEWE',
        'MzA3MDA0OTQwMw==':'雪佛兰官方'
    }

    def start_requests(self):

