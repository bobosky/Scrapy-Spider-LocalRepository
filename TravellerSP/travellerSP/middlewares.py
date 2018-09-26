# -*- coding: utf-8 -*-

# Define here the models for your spider middleware
#
# See documentation in:
# https://doc.scrapy.org/en/latest/topics/spider-middleware.html

from scrapy import signals, log
from scrapy.http import HtmlResponse
from requests.exceptions import ProxyError,ConnectTimeout,ConnectionError,ReadTimeout
from urllib3.exceptions import NewConnectionError,MaxRetryError
import requests, random, time, re

#请求头是必须的
headers = {
    'Accept':'*/*',
    'Accept-Encoding':'gzip,deflate',
    'Accept-Language':'zh-CN,zh;q=0.8,en-us;q=0.6,en;q=0.5;q=0.4',
    'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36 MicroMessenger/6.5.2.501 NetType/WIFI WindowsWechat QBCore/3.43.691.400 QQBrowser/9.0.2524.400'
}

class PostDownloadMiddleware(object):

    def __init__(self, crawler):
        super(PostDownloadMiddleware, self).__init__()
        self.crawler = crawler

    @classmethod
    def from_crawler(cls, crawler):
        s = cls(crawler)
        return s

    def process_request(self, request, spider):
        log.msg(request.meta['data'],log.INFO)
        htmlsorce = requests.post(url=request.url,headers=headers,data=request.meta['data'])
        return HtmlResponse(url=htmlsorce.url,body=htmlsorce.content,headers=htmlsorce.headers,request=request,status=htmlsorce.status_code)

class GetDownloadMiddleware(object):

    def __init__(self, crawler):
        super(GetDownloadMiddleware, self).__init__()
        self.crawler = crawler

    @classmethod
    def from_crawler(cls, crawler):
        s = cls(crawler)
        return s

    def process_request(self, request, spider):
        if 'wait' in request.meta.keys():
            if not request.meta['wait'] == 0:
                time.sleep(request.meta['wait'])

        if 'cookies' in request.meta.keys():
            cookies = request.meta['cookies']
        else:
            cookies = None

        if 'headers' in request.meta.keys():
            headers = request.meta['headers']
        else:
            headers = None

        if 'timeout' in request.meta.keys():
            timeout = request.meta['timeout']
        else:
            timeout = None

        htmlsorce = None
        try:
            htmlsorce = requests.get(url=request.url, headers=headers, cookies=cookies, verify=False, timeout=timeout)
        except (ReadTimeout,ConnectTimeout) as e:
            print("请求器位置发生报错: ",e)
            return request
        except (NewConnectionError,ConnectionError) as e:
            print("请求器位置发生报错: ",e)
            # 触发爬虫关闭
            self.crawler.engine.close_spider(spider, '>>>>网络失去连接<<<<')
        return HtmlResponse(url=htmlsorce.url, body=htmlsorce.content, headers=htmlsorce.headers, request=request, status=htmlsorce.status_code)

class ProxyMiddleWare(object):
    proxies = []

    def __init__(self, crawler):
        super(ProxyMiddleWare, self).__init__()
        self.crawler = crawler

    @classmethod
    def from_crawler(cls, crawler):
        s = cls(crawler)
        return s
    
    def process_request(self, request, spider):
        if not self.proxies:self.update_proxies()
        proxy = random.choice(self.proxies)
        proxies = {'http':'http://{}'.format(proxy), 'https':'https://{}'.format(proxy)}

        if 'wait' in request.meta.keys():
            if not requests.meta['wait'] == 0:
                time.sleep(requests.meta['wait'])

        if 'cookies' in request.meta.keys():
            cookies = request.meta['cookies']
        else:
            cookies = None

        if 'headers' in request.meta.keys():
            headers = request.meta['headers']
        else:
            headers = None

        if 'timeout' in request.meta.keys():
            timeout = request.meta['timeout']
        else:
            timeout = None

        htmlsorce = None
        try:
            htmlsorce = requests.get(url=request.url, headers=headers, proxies=proxies, cookies=cookies, verify=False, timeout=timeout)
        except (ProxyError, MaxRetryError) as e:
            print("请求器位置发生报错: ", e)
            if self.verify_proxy(proxy):
                pass
            else:
                self.proxies.remove(proxy)
            request.dont_filter = True
            return request
        except (ReadTimeout, ConnectTimeout) as e:
            print("请求器位置发生报错: ", e)
            request.dont_filter = True
            return request
        except (NewConnectionError, ConnectionError) as e:
            print("请求器位置发生报错: ", e)
            # 主动触发爬虫关闭
            self.crawler.engine.close_spider(spider, '>>>>网络失去连接<<<<')

        if not htmlsorce.status_code in [200,201,204,206]:
            request.dont_filter = True
            return request
        return HtmlResponse(url=htmlsorce.url, body=htmlsorce.content, headers=htmlsorce.headers, request=request, status=htmlsorce.status_code)

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
            response = requests.get(url=test_url, headers = headers, proxies=proxy, timeout=5)
            if response.status_code == 200:
                print(ip,' 仍然有效')
                return True
            print(ip, ' 已经无效')
            return False
        except Exception as e:
            print(e,ip, ' 已经无效')
            return False

