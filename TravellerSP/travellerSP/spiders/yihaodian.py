import scrapy,json,re,requests,urllib
from scrapy.http import Request
from lxml import etree
from travellerSP.pipelines import TravellerspPipeline
from travellerSP.items import Yihaodian
from travellerSP.helper import getUrlWithPars,get_locationtime

class YiHaoDianSpider(scrapy.Spider):
    name = 'YiHaoDian'
    cur_page = None
    productPage = {
        '莫斯利安%20酸奶':1,
        '莫斯利安%20酸牛奶':1,
        '%20乳粉':1,
        '光明%20奶粉':1,
        '光明%20牛奶饮品':1,
        '光明%20酸牛奶':1,
        '光明%20酸奶':1,
        '光明%20乳酸菌饮品':1,
        '光明%20纯牛奶':1,
        '光明%20优+':1,
        '莫斯利安%20双发酵酸乳':6,
        '莫斯利安%20两果三蔬':6,
    }

    headers2 = {
        'accept-encoding': "gzip, deflate, br",
        'accept-language': "en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7",
        'user-agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36",
        'accept': "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript, */*; q=0.01",
        'referer': "https://item.yhd.com/{}.html",
        'authority': "item.yhd.com",
        'x-requested-with': "XMLHttpRequest",
        'Cache-Control': "no-cache"
    }

    headers = {
        'method':'GET',
        'accept':'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript, */*; q=0.01',
        'accept-encoding':'gzip, deflate, br',
        'accept-language':'zh-CN,zh;q=0.9',
        'referer':None,
        'user-agent':'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36',
        'x-requested-with':'XMLHttpRequest'
    }

    pars = {
        'productId': None,
        'pagenationVO.currentPage': None,
        'pagenationVO.rownumperpage': 10,
    }

    def __init__(self):
        self.pipline = TravellerspPipeline()

    def start_requests(self):
        for a in self.productPage.keys():
            for p in range(1,self.productPage[a]+1):
                homePge_tmp = [
                    "https://search.yhd.com/c0-0/mbname{k1}-b/a-s2-v4-p{p}-price-d0-f0b-m1-rt0-pid-mid0-color-size-k{k2}/".format(k1=a,k2=a,p=p),
                    "https://search.yhd.com/searchPage/c0-0/mbname{k1}-b/a-s2-v4-p{p}-price-d0-f0b-m1-rt0-pid-mid0-color-size-k{k2}/?&isGetMoreProducts=1&moreProductsFashionCateType=2&fashionCateType=2".format(k1=a,k2=a,p=p)
                ]
                self.headers['referer'] = "https://search.yhd.com/c0-0/mbname{}-b/a-s2-v4-p1-price-d0-f0b-m1-rt0-pid-mid0-color-size-k{}/"
                for url in homePge_tmp:
                    if homePge_tmp.index(url) == 1:
                        tmpheads = self.headers
                        type = 1
                    else:
                        tmpheads = None
                        type = 0
                    yield Request(url=url,callback=self.prodPage_parse,dont_filter=True,meta={'headers':tmpheads,'type':type,'wait':4})

    def prodPage_parse(self, response):
        if response.meta['type'] == 1:
            sele = etree.HTML(json.loads(response.text)['value'])
            items = sele.xpath('//div[@class="mod_search_pro"]/div')
            for each in items:
                comment_count = each.xpath('./p[@class="proPrice"]/span[@class="comment"]/a/@experiencecount')[0]
                if int(comment_count) > 0:
                    product_id = each.xpath('./@comproid')[0]
                    self.headers['referer'] = 'https://item.yhd.com/{}.html'.format(product_id)
                    self.pars['productId'] = product_id
                    self.pars['pagenationVO.currentPage'] = 1
                    self.cur_page = 1
                    url = 'https://item.yhd.com/squ/comment/getCommentDetail.do?{}'.format(getUrlWithPars(self.pars))
                    yield Request(url=url, callback=self.loop_ParsAndRequest, meta={'headers': self.headers,'pid':product_id,'wait':4})
        else:
            items = response.css('.mod_search_pro')
            for each in items:
                comment_count = each.css('.comment a').xpath('@experiencecount').extract_first()
                if int(comment_count) > 0:
                    product_id = each.css('.itemBox').xpath('@comproid').extract_first()
                    self.headers['referer'] = 'https://item.yhd.com/{}.html'.format(product_id)
                    self.pars['productId'] = product_id
                    self.pars['pagenationVO.currentPage'] = 1
                    self.cur_page = 1
                    url = 'https://item.yhd.com/squ/comment/getCommentDetail.do?{}'.format(getUrlWithPars(self.pars))
                    yield Request(url=url, callback=self.loop_ParsAndRequest, meta={'headers': self.headers,'pid':product_id,'wait':4})


    def loop_ParsAndRequest(self,response):
        if len(response.text) < 5000:
            return
        else:
            self.analysis(response)
            self.cur_page = self.cur_page + 1
            self.headers = response.headers
            self.pars['productId'] = response.meta['pid']
            self.pars['pagenationVO.currentPage'] = self.cur_page
            url = 'https://item.yhd.com/squ/comment/getCommentDetail.do?{}'.format(getUrlWithPars(self.pars))
            yield Request(url=url, callback=self.loop_ParsAndRequest, meta={'headers': self.headers, 'pid': response.meta['pid'],'wait':4})

    def analysis(self,response):
        print('目前頁面',self.cur_page)
        html = json.loads(response.text)['value']
        selector = etree.HTML(html)
        items = selector.xpath('//div[@class="item good-comment"]')
        for each in items:
            piplineItem = Yihaodian()
            piplineItem['content'] = each.xpath('./dl/dd[@class="clearfix"]/span[@class="text comment_content_text"]/text()')[0]
            piplineItem['name'] = each.xpath('./div[@class="nameBox"]/span[@class="name"]/@username')[0]
            tmp = each.xpath('./div[@class="nameBox"]/span[@class="name"]/@id')[0]
            piplineItem['userid'] = re.search('userName(\d+)', tmp).group(1)
            piplineItem['star'] = each.xpath('./dl/dt[@class="user_info"]/span[2]/@class')[0]  # 星评
            tmp2 = each.xpath('./dl/dd[@class="replyBtn_con clearfix"]/span[@class="date"]/text()')[0]
            piplineItem['date'] = re.search('\d+\-\d+\-\d+\s+\d+\:\d+\:\d+', tmp2).group(0)
            piplineItem['crawlTime'] = get_locationtime()

            self.pipline.process_item(item=piplineItem,spider=None)
            print(piplineItem)






