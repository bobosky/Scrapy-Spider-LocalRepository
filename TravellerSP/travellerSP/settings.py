# -*- coding: utf-8 -*-

# Scrapy settings for travellerSP project
#
# For simplicity, this file contains only settings considered important or
# commonly used. You can find more settings consulting the documentation:
#
#     https://doc.scrapy.org/en/latest/topics/settings.html
#     https://doc.scrapy.org/en/latest/topics/downloader-middleware.html
#     https://doc.scrapy.org/en/latest/topics/spider-middleware.html
import platform

BOT_NAME = 'travellerSP'

SPIDER_MODULES = ['travellerSP.spiders']
NEWSPIDER_MODULE = 'travellerSP.spiders'

import platform
# Crawl responsibly by identifying yourself (and your website) on the user-agent
#USER_AGENT = 'travellerSP (+http://www.yourdomain.com)'

# Obey robots.txt rules
ROBOTSTXT_OBEY = False
COMPRESSION_ENABLED = False
STORE_PATH_DICT = {
   'Darwin':'/Users/Ming/PycharmProjects/Scrapy-Spider_LocalRepository/TravellerSP/ResultPackage/',
   'Windows': 'C:\\Users\\Administrator\\Desktop\\code\\Scrapy-Spider-LocalRepository\\TravellerSP\\Result\\'
}
STORE_PATH = STORE_PATH_DICT.get(platform.system())
# FILE_SIZE = 2000
BUFFER_LEN = 50

# Configure maximum concurrent requests performed by Scrapy (default: 16)
CONCURRENT_REQUESTS = 20

JOBDIR='JobDir/xuexiaohuangye'

LOG_ENABLED = True

RETRY_ENABLED = True
# RETRY_HTTP_CODES = [500]
RETRY_TIMES = 20

# Configure a delay for requests for the same website (default: 0)
# See https://doc.scrapy.org/en/latest/topics/settings.html#download-delay
# See also autothrottle settings and docs
# DOWNLOAD_DELAY = 10
# The download delay setting will honor only one of:
#CONCURRENT_REQUESTS_PER_DOMAIN = 16
CONCURRENT_REQUESTS_PER_IP = 10

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
#    'travellerSP.middlewares.TravellerspSpiderMiddleware': 543,
#}

# Enable or disable downloader middlewares
# See https://doc.scrapy.org/en/latest/topics/downloader-middleware.html
DOWNLOADER_MIDDLEWARES = {
   # 'scrapy.contrib.downloadermiddleware.httpproxy.HttpProxyMiddleware': None,
   # 'travellerSP.middlewares.ProxyMiddleWare': 750,
   'travellerSP.middlewaresUrllib.GetDownloadMiddleware': 901
   # 'travellerSP.middlewares.PostDownloadMiddleware': 901,
}
# Enable or disable extensions
# See https://doc.scrapy.org/en/latest/topics/extensions.html
#EXTENSIONS = {
#    'scrapy.extensions.telnet.TelnetConsole': None,
#}

# Configure item pipelines
# See https://doc.scrapy.org/en/latest/topics/item-pipeline.html
ITEM_PIPELINES = {
   # 'travellerSP.pipelines.saveExcelPipeline': 300,
   'travellerSP.pipelines.TravellerspPipeline': 300
}

# Enable and configure the AutoThrottle extension (disabled by default)
# See https://doc.scrapy.org/en/latest/topics/autothrottle.html
# AUTOTHROTTLE_ENABLED = True
# The initial download delay
# AUTOTHROTTLE_START_DELAY = 5
# The maximum download delay to be set in case of high latencies
#AUTOTHROTTLE_MAX_DELAY = 60
# The average number of requests Scrapy should be sending in parallel to
# each remote server
# AUTOTHROTTLE_TARGET_CONCURRENCY = 1.0
# Enable showing throttling stats for every response received:
# AUTOTHROTTLE_DEBUG = True

# Enable and configure HTTP caching (disabled by default)
# See https://doc.scrapy.org/en/latest/topics/downloader-middleware.html#httpcache-middleware-settings
#HTTPCACHE_ENABLED = True
#HTTPCACHE_EXPIRATION_SECS = 0
#HTTPCACHE_DIR = 'httpcache'
#HTTPCACHE_IGNORE_HTTP_CODES = []
#HTTPCACHE_STORAGE = 'scrapy.extensions.httpcache.FilesystemCacheStorage'
