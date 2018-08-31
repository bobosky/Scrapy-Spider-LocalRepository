# -*- coding: utf-8 -*-

# Define here the models for your spider middleware
#
# See documentation in:
# https://doc.scrapy.org/en/latest/topics/spider-middleware.html

from scrapy import signals
from scrapy.http import HtmlResponse
from scrapy import log
from requests.exceptions import ProxyError,ConnectTimeout,ConnectionError,ReadTimeout
import requests, random, time, re

class PostDownloadMiddleware(object):

    #请求头是必须的
    headers = {
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'accept-encoding': 'gzip',         #只要gzip的压缩格式
        'accept-language': 'zh-CN,zh;q=0.9',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.79 Safari/537.36'
    }

    def __init__(self):
        super(PostDownloadMiddleware, self).__init__()

    def process_request(self, request, spider):
        log.msg(request.meta['data'],log.INFO)
        htmlsorce = requests.post(url=request.url,headers=self.headers,data=request.meta['data'])
        return HtmlResponse(url=htmlsorce.url,body=htmlsorce.content,headers=htmlsorce.headers,request=request,status=htmlsorce.status_code)

class GetDownloadMiddleware(object):

    #请求头是必须的
    headers = {
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'accept-encoding': 'gzip',         #只要gzip的压缩格式
        'accept-language': 'zh-CN,zh;q=0.9',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.79 Safari/537.36'
    }

    def __init__(self):
        super(GetDownloadMiddleware, self).__init__()

    def process_request(self, request, spider):
        # proxies = {
        #             'http':'http://{}'.format(request.meta['proxy']),
        #             'https':'https://{}'.format(request.meta['proxy'])
        #           }
        htmlsorce = None
        try:
            htmlsorce = requests.get(url=request.url,headers=self.headers, timeout=10)
            status = htmlsorce.status_code
        except (ProxyError,ConnectTimeout,ConnectionError,ReadTimeout) as e:
            print("请求器位置发生报错",e)
            status = 404
        return HtmlResponse(url=htmlsorce.url, body=htmlsorce.content, headers=htmlsorce.headers, request=request, status=status)

class ProxyMiddleWare(object):
    proxies = []

    # 请求头是必须的
    headers = {
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'accept-encoding': 'gzip',  # 只要gzip的压缩格式
        'accept-language': 'zh-CN,zh;q=0.9',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.79 Safari/537.36'
    }
    
    def __init__(self):
        super(ProxyMiddleWare, self).__init__()
    
    def process_request(self, request, spider):
        if not self.proxies:self.update_proxies()
        proxy = random.choice(self.proxies)
        # if not self.verify_proxy(proxy):
        #     self.proxies.remove(proxy)
        #     print('更新代理池'+self.proxies)
        #     return Request(url=request.url,callback=request.callback,request=request,meta=request.meta)
        # else:
        request.meta['proxy'] = proxy
        return None

    def process_response(self,request, response, spider):
        if not self.proxies:self.update_proxies()
        if not response.status in [200,201,204,206]:
            self.proxies.remove(response.meta['proxy'])
            if not self.proxies:self.update_proxies()
            retryRq = request.copy()
            retryRq.meta['proxy'] = random.choice(self.proxies)
            retryRq.dont_filter = True
            return retryRq
        return response

    def update_proxies(self):
        print('更新代理池中。。。。。。。。。。')
        while True:
            response = requests.get(url='http://s.zdaye.com/?api=201803081111195429&px=1').text
            if re.findall('<bad>', response):
                time.sleep(5)
                continue
            if re.findall('<html>', response):
                time.sleep(5)
                continue

            ips = response.splitlines()
            for i in range(0,5):
                tmp = ips[i].split(':')
                ips[i] = '{ip}:{port}'.format(ip=tmp[0],port=tmp[1])
            break
        print('更新代理池完毕',ips)
        self.proxies = ips

    def verify_proxy(self,ip):
        print('验证ip中：'+ip)
        test_url = 'https://www.baidu.com'
        proxy = {'http': ip}
        try:
            response = requests.get(url=test_url, headers = self.headers, proxies=proxy, timeout=5)
            if response.status_code == 200:
                print('有效ip '+ip)
                return True
            print('无效ip ' + ip)
            return False
        except Exception as e:
            print(e)
            print('无效ip ' + ip)
            return False


class TravellerspSpiderMiddleware(object):
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


class TravellerspDownloaderMiddleware(object):
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
