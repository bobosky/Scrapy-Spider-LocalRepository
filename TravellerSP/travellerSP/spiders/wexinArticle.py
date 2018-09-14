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

    def geturl(dict):
        str = []
        for i in dict.keys():
            tmp = '{key}={val}'.format(key=i, val=dict[i])
            str.append(tmp)
        return '&'.join(str)

    cookies = {
        'rewardsn': '',
        'wxtokenkey': '777',
        'wxuin': dict['wxuin'],
        'devicetype': 'Windows 7',
        'version': '6206021b',
        'lang': 'zh_CN',
        'pass_ticket': dict['pass_ticket'],  # ****
        'wap_sid2': dict['wap_sid2']  # ****
    }

    list_pars = {
        'action': 'getmsg',
        '__biz': None,              # (公众号代号)        #与文章的__biz一致
        'offset': None,             # *10
        'is_ok': '1',
        'appmsg_token': dict['appmsg_token'],  # ****
        'f': 'json'
    }

    __biz = {
        'MzA5OTEzNDkxNw==':'广汽传祺',
        'MzA5NzMxODMxNg==':'别克',
        'MjM5MDkyMzU5MQ==':'上汽集团MG名爵',
        'MjM5Mjk1MzM0MQ==':'长安汽车',
        'MjM5MzcwNzIyMA==':'荣威ROEWE',
        'MzA3MDA0OTQwMw==':'雪佛兰官方'
    }

    dict = {
        'pass_ticket': 'vgPFmts1bZCHFRuXFAYrtq3RC8XGtsz45tlBG4veq3bpZzByb7ezDh6ih+rDGKQb',
        'wap_sid2': 'CLKz0K8FEnBYaUdrUXZkdFpZOVpzQ0ZUV3RpSHp2WG1QcmhydWw2OFgwV2NxcE5ISjBvekNMMzJaMXNhUDloRGZjcW9weHV2aEFaZmp4UTN5ZjJPdjJDRXlkWUF3YkNEaVNKUThCOHctVGV5NkFMSmk4X09Bd0FBMNCr7twFOA1AlU4=',
        'appmsg_token': '974_LRCAbvBRpNUBqjqLW1RDPstdMx-B2BeZRf04lw~~',
        'wxuin': '1442060722'
    }

    def start_requests(self):
        for ico in self.__biz:
            for j in range(0,100):
                self.list_pars['__biz'] = ico
                self.list_pars['offset'] = j*10
                listurl = 'https://mp.weixin.qq.com/mp/profile_ext?{}'.format(self.geturl(self.list_pars))
                yield Request(url=listurl, callback=self.list_parse, meta={'cookies':self.cookies})

    def list_parse(self, response):
        jb = json.loads(response.text)
        str = jb['general_msg_list'].replace('\\','')
        list = json.loads(str)
        for i in list:
            url = i['app_msg_ext_info']['content_url']
            yield Request(url=url,callback=self)



