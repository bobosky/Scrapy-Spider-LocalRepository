# -*- coding: utf-8 -*-

# Define here the models for your spider middleware
#
# See documentation in:
# https://doc.scrapy.org/en/latest/topics/spider-middleware.html
from scrapy import signals
from scrapy.xlib.pydispatch import dispatcher
from scrapy.conf import settings
from selenium import webdriver
from scrapy.http import HtmlResponse
import time
import requests

#cookie的结构
# [{'domain': '.autohome.com.cn', 'expiry': 1547722844.940963, 'httpOnly': False, 'name': 'ref', 'path': '/', 'secure': False, 'value': '0%7C0%7C0%7C0%7C2018-07-21+19%3A00%3A44.859%7C2018-07-21+19%3A00%3A41.706'},
#  {'domain': 'www.autohome.com.cn', 'httpOnly': True, 'name': 'ASP.NET_SessionId', 'path': '/', 'secure': False, 'value': 'd2rq2tyuhpiezhumc0qq4nbu'},
#  {'domain': '.autohome.com.cn', 'expiry': 1534762844, 'httpOnly': False, 'name': 'ahsids', 'path': '/', 'secure': False, 'value': '3615'},
#  {'domain': '.autohome.com.cn', 'expiry': 1534762841.789255, 'httpOnly': False, 'name': 'ahpau', 'path': '/', 'secure': False, 'value': '1'},
#  {'domain': '.autohome.com.cn', 'expiry': 1847530844.941043, 'httpOnly': False, 'name': 'area', 'path': '/', 'secure': False, 'value': '440699'},
#  {'domain': '.autohome.com.cn', 'expiry': 1532172644.941009, 'httpOnly': False, 'name': 'sessionvid', 'path': '/', 'secure': False, 'value': '4C033B52-5AC8-4128-8A3D-98D684233214'},
#  {'domain': '.autohome.com.cn', 'expiry': 1843210841.789033, 'httpOnly': False, 'name': 'sessionid', 'path': '/', 'secure': False, 'value': '42BA199B-017B-4968-B9FE-390262F37E4B%7C%7C2018-07-21+19%3A00%3A41.706%7C%7C0'},
#  {'domain': '.autohome.com.cn', 'expiry': 1847530841.788962, 'httpOnly': False, 'name': 'sessionip', 'path': '/', 'secure': False, 'value': '116.5.29.153'},
#  {'domain': '.autohome.com.cn', 'expiry': 1847530841, 'httpOnly': False, 'name': 'fvlid', 'path': '/', 'secure': False, 'value': '1532170841584BcvvgLMfrA'},
#  {'domain': '.autohome.com.cn', 'expiry': 1594378841, 'httpOnly': False, 'name': 'sessionuid', 'path': '/', 'secure': False, 'value': 'f6a356a2-11c5-4bac-9697-6a4a9a256bbf'},
#  {'domain': '.autohome.com.cn', 'expiry': 1847530841, 'httpOnly': False, 'name': '__ah_uuid', 'path': '/', 'secure': False, 'value': 'F7AF42F5-CF22-42F4-B6D5-EFB06ED4DB00'},
#  {'domain': '.autohome.com.cn', 'expiry': 1532257241, 'httpOnly': False, 'name': 'ahpvno', 'path': '/', 'secure': False, 'value': '1'}]

class SeleniumSpiderMiddleware(object):

    cookieCityId = {
        'domain': '.autohome.com.cn', 'expiry': None,
        'httpOnly': False, 'name': 'cookieCityId', 'path': '/',
        'secure': False, 'value': None
    }

    def __init__(self):
        options = webdriver.ChromeOptions()
        options.add_argument('--headless')
        options.add_argument('--disable-gpu')
        self.chrome_browser = webdriver.Chrome(executable_path=settings.get('DRIVER_EXECUTABLE_PATH'),chrome_options=options)
        self.chrome_browser.set_window_size(1024, 768)
        dispatcher.connect(receiver=self.spider_close,signal=signals.spider_closed)
        super(SeleniumSpiderMiddleware, self).__init__()

    def spider_close(self):
        print('spider_close called')
        # self.chrome_browser.close() #关闭当前一个页面标签
        self.chrome_browser.quit()  # 关闭所有页面标签
        self.chrome_browser.service.stop()  # 退出浏览器，关闭进程

    def process_request(self, request, spider):
        self.chrome_browser.get(request.url)  #第一次获取，拿到该网站的具体cookies，让驱动知道这个cookies在去哪里的

        self.cookieCityId['value'] = request.meta['cityid']
        for i in self.chrome_browser.get_cookies():
            if i['name'] == 'ahpvno':
                self.cookieCityId['expiry'] = i['expiry']  #赋值以ahpvno的生命期
        self.chrome_browser.add_cookie(self.cookieCityId)  #在原有组数格式cookies，添加一条参数的字典

        self.chrome_browser.get(request.url)

        self.chrome_browser.execute_script('window.scrollBy(0, 240)')

        time.sleep(2)

        part_screenshot = self.chrome_browser.get_screenshot_as_png() #生成图片数据

        return HtmlResponse(url=request.url,body=self.chrome_browser.page_source,request=request,encoding='utf-8',status=200,meta={'ss':part_screenshot})

class Title_RankTakeDownloadMiddleware(object):
    # 请求头是必须的
    headers = {
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'accept-encoding': 'gzip',  # 只要gzip的压缩格式
        'accept-language': 'zh-CN,zh;q=0.9',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.79 Safari/537.36'
    }

    def __init__(self):
        super(Title_RankTakeDownloadMiddleware, self).__init__()

    def process_request(self, request, spider):
        url = 'https://www.autohome.com.cn/ashx/dsj/AjaxSeriesRank.ashx?levelId={lid}&cityId={cityid}&seriesId={sid}'.format(lid=request.meta['lid'],cityid=request.meta['cityid'],sid=request.meta['carid'])
        htmlsource = requests.get(url=url,headers=self.headers).text
        request.meta['tr']=htmlsource
        return None

class AutohomeSpiderMiddleware(object):
    # Not all methods need to be defined. If a method is not defined,
    # scrapy acts as if the spider middleware does not modify the
    # passed objects.

    @classmethod
    def from_crawler(cls, crawler):
        # This method is used by Scrapy to create your spiders.
        s = cls()
        crawler.signals.connect(s.spider_opened, signal=signals.spider_opened)
        return s

    def process_spider_input(self, response, spider):
        # Called for each response that goes through the spider
        # middleware and into the spider.

        # Should return None or raise an exception.
        return None

    def process_spider_output(self, response, result, spider):
        # Called with the results returned from the Spider, after
        # it has processed the response.

        # Must return an iterable of Request, dict or Item objects.
        for i in result:
            yield i

    def process_spider_exception(self, response, exception, spider):
        # Called when a spider or process_spider_input() method
        # (from other spider middleware) raises an exception.

        # Should return either None or an iterable of Response, dict
        # or Item objects.
        pass

    def process_start_requests(self, start_requests, spider):
        # Called with the start requests of the spider, and works
        # similarly to the process_spider_output() method, except
        # that it doesn’t have a response associated.

        # Must return only requests (not items).
        for r in start_requests:
            yield r

    def spider_opened(self, spider):
        spider.logger.info('Spider opened: %s' % spider.name)


class AutohomeDownloaderMiddleware(object):
    # Not all methods need to be defined. If a method is not defined,
    # scrapy acts as if the downloader middleware does not modify the
    # passed objects.

    @classmethod
    def from_crawler(cls, crawler):
        # This method is used by Scrapy to create your spiders.
        s = cls()
        crawler.signals.connect(s.spider_opened, signal=signals.spider_opened)
        return s

    def process_request(self, request, spider):
        # Called for each request that goes through the downloader
        # middleware.

        # Must either:
        # - return None: continue processing this request
        # - or return a Response object
        # - or return a Request object
        # - or raise IgnoreRequest: process_exception() methods of
        #   installed downloader middleware will be called
        return None

    def process_response(self, request, response, spider):
        # Called with the response returned from the downloader.

        # Must either;
        # - return a Response object
        # - return a Request object
        # - or raise IgnoreRequest
        return response

    def process_exception(self, request, exception, spider):
        # Called when a download handler or a process_request()
        # (from other downloader middleware) raises an exception.

        # Must either:
        # - return None: continue processing this exception
        # - return a Response object: stops process_exception() chain
        # - return a Request object: stops process_exception() chain
        pass

    def spider_opened(self, spider):
        spider.logger.info('Spider opened: %s' % spider.name)
