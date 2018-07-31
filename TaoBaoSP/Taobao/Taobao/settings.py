# -*- coding: utf-8 -*-

# Scrapy settings for Taobao project
#
# For simplicity, this file contains only settings considered important or
# commonly used. You can find more settings consulting the documentation:
#
#     https://doc.scrapy.org/en/latest/topics/settings.html
#     https://doc.scrapy.org/en/latest/topics/downloader-middleware.html
#     https://doc.scrapy.org/en/latest/topics/spider-middleware.html

BOT_NAME = 'Taobao'

SPIDER_MODULES = ['Taobao.spiders']
NEWSPIDER_MODULE = 'Taobao.spiders'

# Crawl responsibly by identifying yourself (and your website) on the user-agent
#USER_AGENT = 'Taobao (+http://www.yourdomain.com)'

# Obey robots.txt rules
ROBOTSTXT_OBEY = False

LIST_PAGE = 3

COMPRESSION_ENABLED = False

SEARCH_WORD='战马功能能饮料'

#Store INFO
STORE_PATH = r'/Users/Ming/Documents/pycharm-projects/TaoBao/ResultPackage'
FILE_SIZE = 1677

# MANUAL COOKIES
MANUAL_COOKIES = {
'miid':'836589868469321454',
'hng':'CN%7Czh-CN%7CCNY%7C156',
't':'18e0d43f69cbe51f28f605f29cedee64',
'cna':'k8OkE6sguxwCAXkgfxAnSZHO',
'tg':'0',
'thw':'cn',
'enc':'5G8mRUvrEVDGU2iJu4it12GjJ1ELW7SahohelRS1sz2T7jTiheSXPMQv%2F2y9JozXy3QVGNPokM2jj2T0%2FtXDwg%3D%3D',
'tk_trace':'oTRxOWSBNwn9dPyorMJE%2FoPdY8zfvmw%2Fq5hiXApkcUSadkqE9xnZCEUslbZWgtVzS6SpBgOrq6dlR6PK5fH4h8U222LUV5d3AlVQnmBtZqc4oySpCdhOdZkoUhCBqM6z1YlV5Cc15K6bmWPCwuf2fTd1qxB4bqgbssW6RMwaN9MXVIvBtlh5NKpv%2FYoWEFv5uTULDeF%2ByBZtWQ%2BoupPE%2BcD2SJi3FVQrsA9w27tuPslgwKXoc%2Bw8wCx%2FYIwWMpsVdzD5KpDRNJdCxe6ej7p2%2FiiYeE0%3D',
'cookie2':'168e7a1602aff5b8f336caa3865580df',
'_tb_token_':'e1fa33ebe137b',
'v':'0',
'unb':'1831113508',
'sg':'%E5%A4%A78f',
'_l_g_':'Ug%3D%3D',
'skt':'3118ac1cb0777eb5',
'cookie1':'BYMWB8MC57xP6mh19VUiR66sGSuOPs%2FwrupGVRtfsDI%3D',
'csg':'9ce2ae98',
'uc3':'vt3=F8dBzrmR%2B7fOZHQ%2Flik%3D&id2=UonYsJWRT6o1Dg%3D%3D&nk2=rLhmvbsJ5YgbN43J&lg2=U%2BGCWk%2F75gdr5Q%3D%3D',
'existShop':'MTUzMjkxNjY2MA%3D%3D',
'tracknick':'%5Cu559C%5Cu7231%5Cu7684%5Cu9A84%5Cu50B2%5Cu5927',
'lgc':'%5Cu559C%5Cu7231%5Cu7684%5Cu9A84%5Cu50B2%5Cu5927',
'_cc_':'Vq8l%2BKCLiw%3D%3D',
'dnk':'%5Cu559C%5Cu7231%5Cu7684%5Cu9A84%5Cu50B2%5Cu5927',
'_nk_':'%5Cu559C%5Cu7231%5Cu7684%5Cu9A84%5Cu50B2%5Cu5927',
'cookie17':'UonYsJWRT6o1Dg%3D%3D',
'uc1':'cookie16=W5iHLLyFPlMGbLDwA%2BdvAGZqLg%3D%3D&cookie21=Vq8l%2BKCLjhS4UhJVbCU7&cookie15=U%2BGCWk%2F75gdr5Q%3D%3D&existShop=false&pas=0&cookie14=UoTfKf4boJPGzA%3D%3D&tag=8&lng=zh_CN',
'mt':'ci=32_1',
'alitrackid':'www.taobao.com',
'lastalitrackid':'www.taobao.com',
'JSESSIONID':'5F75457D2B41026DA1A5C04A814637CA',
'isg':'BJmZtT1aJlaUI_qB_fYc3luuqIOzjo29BQxcbrtOHEA_wrlUA3adqAdQwMYR-iUQ'
}

# Configure maximum concurrent requests performed by Scrapy (default: 16)
#CONCURRENT_REQUESTS = 32

# Configure a delay for requests for the same website (default: 0)
# See https://doc.scrapy.org/en/latest/topics/settings.html#download-delay
# See also autothrottle settings and docs
#DOWNLOAD_DELAY = 3
# The download delay setting will honor only one of:
#CONCURRENT_REQUESTS_PER_DOMAIN = 16
#CONCURRENT_REQUESTS_PER_IP = 16

# Disable cookies (enabled by default)
#COOKIES_ENABLED = False

# Disable Telnet Console (enabled by default)
#TELNETCONSOLE_ENABLED = False

# Override the default request headers:
#DEFAULT_REQUEST_HEADERS = {
#   'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
#   'Accept-Language': 'en',
#}

# Enable or disable spider middlewares
# See https://doc.scrapy.org/en/latest/topics/spider-middleware.html
#SPIDER_MIDDLEWARES = {
#    'Taobao.middlewares.TaobaoSpiderMiddleware': 543,
#}

# Enable or disable downloader middlewares
# See https://doc.scrapy.org/en/latest/topics/downloader-middleware.html
DOWNLOADER_MIDDLEWARES = {
   'Taobao.middlewares.RequestByRequestsDownloadMiddleware': 901,
}

# Enable or disable extensions
# See https://doc.scrapy.org/en/latest/topics/extensions.html
#EXTENSIONS = {
#    'scrapy.extensions.telnet.TelnetConsole': None,
#}

# Configure item pipelines
# See https://doc.scrapy.org/en/latest/topics/item-pipeline.html
ITEM_PIPELINES = {
   'Taobao.pipelines.TaobaoPipeline': 300,
}

# Enable and configure the AutoThrottle extension (disabled by default)
# See https://doc.scrapy.org/en/latest/topics/autothrottle.html
#AUTOTHROTTLE_ENABLED = True
# The initial download delay
#AUTOTHROTTLE_START_DELAY = 5
# The maximum download delay to be set in case of high latencies
#AUTOTHROTTLE_MAX_DELAY = 60
# The average number of requests Scrapy should be sending in parallel to
# each remote server
#AUTOTHROTTLE_TARGET_CONCURRENCY = 1.0
# Enable showing throttling stats for every response received:
#AUTOTHROTTLE_DEBUG = False

# Enable and configure HTTP caching (disabled by default)
# See https://doc.scrapy.org/en/latest/topics/downloader-middleware.html#httpcache-middleware-settings
#HTTPCACHE_ENABLED = True
#HTTPCACHE_EXPIRATION_SECS = 0
#HTTPCACHE_DIR = 'httpcache'
#HTTPCACHE_IGNORE_HTTP_CODES = []
#HTTPCACHE_STORAGE = 'scrapy.extensions.httpcache.FilesystemCacheStorage'
