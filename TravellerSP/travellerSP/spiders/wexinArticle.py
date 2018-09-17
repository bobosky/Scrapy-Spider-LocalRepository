# encoding: utf-8

import scrapy,json,re
# from urllib.parse import urlencode
from scrapy.http import Request
# from lxml import etree
# from travellerSP.pipelines import TravellerspPipeline
from travellerSP.items import WeixinItem
import travellerSP.helper as help

class WeixinSpider(scrapy.Spider):
    name = 'weixinArticle'
    allowed_domains = ['weixin.qq.com']

    def geturl(self,dict):
        str = []
        for i in dict.keys():
            tmp = '{key}={val}'.format(key=i, val=dict[i])
            str.append(tmp)
        return '&'.join(str)

    dict = {
        #式用 所有 公众号
        'pass_ticket': 'w5vSzCjsANcqLx/bnjCtGdasYgH+a582Oic3iEpu3Xjb4vU5y9A7BTLlHIZKAkED',
        #适用 当前 公众号
        'wap_sid2': 'CLKz0K8FEnBfY01RUUZEM3NuV2pOVTlXS3V6SkFHRDdtTVFYMjh4MWRSU0J5SzlEV2hDLWdUMkpRSGhwZ21IbHFaWE1WdHhfXy1DSUJJMUhYZ2hka1RUZWxSM0h1ck1fR2ZTU0RDUXM1YVpicWoxbldhVE9Bd0FBMJmI9NwFOA1AlU4=',
        #适用 当前 公众号
        'appmsg_token': '974_6QbmkJilF7RgZLsXe0olnDxkHTteHk9r0DNNfQ~~',
        'wxuin': '1442060722',
        # 适用 当前 公众号
        '__biz':'MzA3MDA0OTQwMw==',                                                              # (公众号代号)
    }

    map = {
        'MzA5OTEzNDkxNw==':'广汽传祺',
        'MzA5NzMxODMxNg==':'别克',
        'MjM5MDkyMzU5MQ==':'上汽集团MG名爵',
        'MjM5Mjk1MzM0MQ==':'长安汽车',
        'MjM5MzcwNzIyMA==':'荣威ROEWE',
        'MzA3MDA0OTQwMw==':'雪佛兰官方'
    }

    cookies = {
        'rewardsn': '',
        'wxtokenkey': '777',
        'wxuin': dict['wxuin'],
        'devicetype': 'Windows 7',
        'version': '6206021b',
        'lang': 'zh_CN',
        'pass_ticket': dict['pass_ticket'],  # ****
        'wap_sid2': dict['wap_sid2']         # ****
    }

    list_pars = {
        'action': 'getmsg',
        '__biz': dict['__biz'],              # (公众号代号)        #与文章的__biz一致
        'offset': None,             # *10
        'is_ok': '1',
        'appmsg_token': dict['appmsg_token'],  # ****
        'f': 'json'
    }

    def start_requests(self):
        for j in range(0,17):
            self.list_pars['offset'] = j*10
            listurl = 'https://mp.weixin.qq.com/mp/profile_ext?{}'.format(self.geturl(self.list_pars))
            yield Request(url=listurl, callback=self.list_parse, meta={'cookies':self.cookies,'level':1})

    def list_parse(self, response):
        print(response.text)
        jb = json.loads(response.text)
        print(jb['msg_count'])
        if not jb['msg_count'] == 0:
            str = jb['general_msg_list'].replace('\\','')
            list = json.loads(str)['list']
            for i in list:
                url = i['app_msg_ext_info']['content_url']
                yield Request(url=url,callback=self.article_parse,meta={'level':2})
        else:
            pass

    def article_parse(self, response):
        piplineitem = WeixinItem()
        piplineitem['name'] = self.map[self.dict['__biz']]
        piplineitem['title'] = response.xpath('//h2[@id="activity-name"]/text()').extract_first().strip()
        piplineitem['content'] = response.css('#js_content').xpath('string(.)').extract_first().strip()
        piplineitem['publish_time'] = re.search('var\s+publish_time\s+=\s*\"(\S*)\"',response.text).group(1)
        piplineitem['crawlTime'] = help.get_locationtime()
        return piplineitem





