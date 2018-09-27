# -*- coding: utf-8 -*-

# Define here the models for your spider middleware
#
# See documentation in:
# https://doc.scrapy.org/en/latest/topics/spider-middleware.html

from scrapy import log
from io import BytesIO
from scrapy.http import HtmlResponse
import pycurl.error
import pycurl, random, time, re

#请求头是必须的
headers = {
    'Accept':'*/*',
    'Accept-Encoding':'gzip,deflate',
    'Accept-Language':'zh-CN,zh;q=0.8,en-us;q=0.6,en;q=0.5;q=0.4',
    'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36 MicroMessenger/6.5.2.501 NetType/WIFI WindowsWechat QBCore/3.43.691.400 QQBrowser/9.0.2524.400'
}

class GetDownloadMiddleware(object):

    @classmethod
    def from_crawler(cls, crawler):
        s = cls(crawler)
        return s

    def __init__(self, crawler):
        super(GetDownloadMiddleware, self).__init__()
        self.curlDownloader = pycurl.Curl()
        self.bio = BytesIO()
        self.crawler = crawler

    def __del__(self):
        self.curlDownloader.close()
        self.bio.close()

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
