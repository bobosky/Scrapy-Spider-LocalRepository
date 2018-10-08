# -*- coding: utf-8 -*-

# Define here the models for your spider middleware
#
# See documentation in:
# https://doc.scrapy.org/en/latest/topics/spider-middleware.html

from scrapy import log
from io import BytesIO
from scrapy.http import HtmlResponse
from travellerSP.helper import conv2list
from pycurl import error
import pycurl,requests,certifi,time,re,random

class GetDownloadMiddleware(object):

    @classmethod
    def from_crawler(cls, crawler):
        s = cls(crawler)
        return s

    def __init__(self, crawler):
        super(GetDownloadMiddleware, self).__init__()
        self.crawler = crawler

    def process_request(self, request, spider):
        curlDownloader = pycurl.Curl()
        bio = BytesIO()

        if 'wait' in request.meta.keys():
            if not request.meta['wait'] == 0:
                time.sleep(request.meta['wait'])

        if 'cookfilpath' in request.meta.keys():
            curlDownloader.setopt(pycurl.COOKIEFILE, request.meta['cookfilpath'])

        if 'hd' in request.meta.keys():
            headers = request.meta['hd']
            if isinstance(headers,dict):
                headers = conv2list(headers)
            curlDownloader.setopt(pycurl.HTTPHEADER, headers)

        #设置下载超时
        if 'dto' in request.meta.keys():
            curlDownloader.setopt(pycurl.TIMEOUT, request.meta['dto'])

        #设置连接超时
        if 'cto' in request.meta.keys():
            curlDownloader.setopt(pycurl.CONNECTTIMEOUT, request.meta['cto'])

        if 'ua' in request.meta.keys():
            curlDownloader.setopt(pycurl.USERAGENT, request.meta['ua'])

        if 'post' in request.meta.keys():
            curlDownloader.setopt(pycurl.POSTFIELDS, request.meta['post'])

        curlDownloader.setopt(pycurl.URL, request.url)
        curlDownloader.setopt(pycurl.ENCODING, 'gzip, deflate')
        curlDownloader.setopt(pycurl.WRITEFUNCTION, bio.write)
        curlDownloader.setopt(pycurl.CAINFO, certifi.where())

        curlDownloader.perform()

        response = HtmlResponse(url=curlDownloader.getinfo(pycurl.EFFECTIVE_URL), body=bio.getvalue(),request=request,status=curlDownloader.getinfo(pycurl.RESPONSE_CODE),encoding='utf-8')
        if not curlDownloader.getinfo(pycurl.RESPONSE_CODE) in [200, 201, 204, 206, 302]:
            request.dont_filter = True
            return request

        curlDownloader.close()
        bio.close()
        return response

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
            if not self.proxies: self.update_proxies()
            proxy = random.choice(self.proxies)

            curlDownloader = pycurl.Curl()
            bio = BytesIO()

            if 'wait' in request.meta.keys():
                if not request.meta['wait'] == 0:
                    time.sleep(request.meta['wait'])

            if 'cookfilpath' in request.meta.keys():
                curlDownloader.setopt(pycurl.COOKIEFILE, request.meta['cookfilpath'])

            if 'hd' in request.meta.keys():
                headers = request.meta['hd']
                if isinstance(headers, dict):
                    headers = conv2list(headers)
                curlDownloader.setopt(pycurl.HTTPHEADER, headers)

            # 设置下载超时
            if 'dto' in request.meta.keys():
                curlDownloader.setopt(pycurl.TIMEOUT, request.meta['dto'])

            # 设置连接超时
            if 'cto' in request.meta.keys():
                curlDownloader.setopt(pycurl.CONNECTTIMEOUT, request.meta['cto'])

            if 'ua' in request.meta.keys():
                curlDownloader.setopt(pycurl.USERAGENT, request.meta['ua'])

            if 'post' in request.meta.keys():
                curlDownloader.setopt(pycurl.POSTFIELDS, request.meta['post'])

            curlDownloader.setopt(pycurl.PROXY, 'http://{}'.format(proxy))
            curlDownloader.setopt(pycurl.ENCODING, 'gzip, deflate')
            curlDownloader.setopt(pycurl.URL, request.url)
            curlDownloader.setopt(pycurl.WRITEFUNCTION, bio.write)
            curlDownloader.setopt(pycurl.CAINFO, certifi.where())

            curlDownloader.perform()

            if not curlDownloader.getinfo(pycurl.RESPONSE_CODE) in [200, 201, 204, 206, 302]:
                request.dont_filter = True
                self.verify_proxy(proxy)
                return request

            response = HtmlResponse(url=curlDownloader.getinfo(pycurl.EFFECTIVE_URL), body=bio.getvalue(),
                                    request=request, status=curlDownloader.getinfo(pycurl.RESPONSE_CODE))
            curlDownloader.close()
            bio.close()
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
                for i in range(0, 5):
                    tmp = ips[i].split(':')
                    ips[i] = '{ip}:{port}'.format(ip=tmp[0], port=tmp[1])
                break
            print('更新代理池完毕', ips)
            self.proxies = ips

        def verify_proxy(self, ip):
            print('验证ip中：' + ip)
            test_url = 'https://www.baidu.com'
            proxy = {'http': ip}
            try:
                response = requests.get(url=test_url, proxies=proxy, timeout=5)
                if response.status_code == 200:
                    print(ip, ' 仍然有效')
                    return
                print(ip, ' 已经无效')
                self.proxies.remove(ip)
                if not self.proxies:self.update_proxies()
            except Exception as e:
                print(e, ip, ' 已经无效')
                self.proxies.remove(ip)
                if not self.proxies:self.update_proxies()

            return


