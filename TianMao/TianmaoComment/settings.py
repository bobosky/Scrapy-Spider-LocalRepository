# -*- coding: utf-8 -*-

# Scrapy settings for TianmaoComment project
#
# For simplicity, this file contains only settings considered important or
# commonly used. You can find more settings consulting the documentation:
#
#     https://doc.scrapy.org/en/latest/topics/settings.html
#     https://doc.scrapy.org/en/latest/topics/downloader-middleware.html
#     https://doc.scrapy.org/en/latest/topics/spider-middleware.html

BOT_NAME = 'TianmaoComment'

SPIDER_MODULES = ['TianmaoComment.spiders']
NEWSPIDER_MODULE = 'TianmaoComment.spiders'


# Crawl responsibly by identifying yourself (and your website) on the user-agent
#USER_AGENT = 'TianmaoComment (+http://www.yourdomain.com)'

# Obey robots.txt rules
ROBOTSTXT_OBEY = False

SEARCH_WORD=['红牛功能饮料']

COMPRESSION_ENABLED = False

LIST_PAGE=2

FILE_SIZE = 1677

STORE_PATH = r'/Users/Ming/Documents/pycharm-projects/TianMao/ResultPackage'

# MANUAL COOKIES
MANUAL_COOKIES = {
'cna':'k8OkE6sguxwCAXkgfxAnSZHO',
'hng':'CN%7Czh-CN%7CCNY%7C156',
'_med':'dw:1280&dh:800&pw:2560&ph:1600&ist:0',
'lid':'%E5%96%9C%E7%88%B1%E7%9A%84%E9%AA%84%E5%82%B2%E5%A4%A7',
'enc':'jLnJTZi27%2FjNmuVogAdHAUW%2BmHQAhT%2FzHBGijeFcuz3qpQJzy3AGX7SlEEAeR5yl9fdbnVwIutAbC45U2M1Slg%3D%3D',
'tk_trace':'1',
't':'18e0d43f69cbe51f28f605f29cedee64',
'_tb_token_':'366771e83b765',
'cookie2':'13099c3358fccd2a6e9b8b9fa09bece4',
'sm4':'440100',
'cq':'ccp%3D0',
'_m_h5_tk':'86a63264a5aa40a08c104139c238ec32_1532594699983',
'_m_h5_tk_enc':'1b6a3f7390981a03f8308895edfde356',
'uc1':'cookie16=W5iHLLyFPlMGbLDwA%2BdvAGZqLg%3D%3D&cookie21=VFC%2FuZ9aiKCaj7AzMpJs&cookie15=Vq8l%2BKCLz3%2F65A%3D%3D&existShop=false&pas=0&cookie14=UoTfKfJ3DClIdA%3D%3D&tag=8&lng=zh_CN',
'uc3':'vt3=F8dBzrmVm%2BlgBYk7Mn8%3D&id2=UonYsJWRT6o1Dg%3D%3D&nk2=rLhmvbsJ5YgbN43J&lg2=Vq8l%2BKCLz3%2F65A%3D%3D',
'tracknick':'%5Cu559C%5Cu7231%5Cu7684%5Cu9A84%5Cu50B2%5Cu5927',
'_l_g_':'Ug%3D%3D',
'ck1':'',
'unb':'1831113508',
'lgc':'%5Cu559C%5Cu7231%5Cu7684%5Cu9A84%5Cu50B2%5Cu5927',
'cookie1':'BYMWB8MC57xP6mh19VUiR66sGSuOPs%2FwrupGVRtfsDI%3D',
'login':'true',
'cookie17':'UonYsJWRT6o1Dg%3D%3D',
'_nk_':'%5Cu559C%5Cu7231%5Cu7684%5Cu9A84%5Cu50B2%5Cu5927',
'uss':'""',
'csg':'2c282dd3',
'skt':'7a27d309074b3203',
'tt':'tmall-main',
'res':'scroll%3A1224*5350-client%3A1224*680-offset%3A1224*5350-screen%3A1280*800',
'pnm_cku822':'098%23E1hvTvvUvbpvUpCkvvvvvjiPPsqZtj38PsdU6j3mPmPvljE8PLqOgjnvn2qwtjtUPTwCvvBvpvpZRphvChCvvvvPvpvhvv2MMTyCvv3vpvoBTD4iKIyCvvXmp99WVtKtvpvIphvvcvvvpVDvpCCNvvCmTyCvHvvvvhnFphvZvvvvp6ivpCCNvvC2o9yCvh1hjnUvIt36LFEc6aZtn0vHVA5WaXTAVA368fmxdX3AbzlwD76XeB618BoxfX9XjoE1pr2OV3lgLzXh%2BnezrmphwhKn3feAOHHlLGexvphvCyCCvvvvvv%3D%3D',
'isg':'BI-P1RX6CN_pbgxnRF_Ku_gFHiVZHOOzDx4KyKGcZP4FcK9yqYRzJo3iduDrCLtO'
}

# Configure maximum concurrent requests performed by Scrapy (default: 16)
#CONCURRENT_REQUESTS = 32

# Configure a delay for requests for the same website (default: 0)
# See https://doc.scrapy.org/en/latest/topics/settings.html#download-delay
# See also autothrottle settings and docs
DOWNLOAD_DELAY = 10
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
#    'TianmaoComment.middlewares.TianmaocommentSpiderMiddleware': 543,
#}

# Enable or disable downloader middlewares
# See https://doc.scrapy.org/en/latest/topics/downloader-middleware.html
DOWNLOADER_MIDDLEWARES = {
   'TianmaoComment.middlewares.RequestByRequestsDownloadMiddleware': 901,
}

# Enable or disable extensions
# See https://doc.scrapy.org/en/latest/topics/extensions.html
#EXTENSIONS = {
#    'scrapy.extensions.telnet.TelnetConsole': None,
#}

# Configure item pipelines
# See https://doc.scrapy.org/en/latest/topics/item-pipeline.html
ITEM_PIPELINES = {
   'TianmaoComment.pipelines.TianmaocommentPipeline': 300,
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
