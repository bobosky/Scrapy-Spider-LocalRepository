from scrapy.cmdline import execute

# execute('scrapy crawl qunar'.split())
# execute('scrapy crawl yilong'.split())
# execute('scrapy crawl mafangwo'.split())
# execute('scrapy crawl xiecheng_v2'.split())
# execute('scrapy crawl xuexiao'.split())
# execute('scrapy crawl xuexiaohuangye -s JOBDIR=JobDir/xuexiaohuangye'.split())
# execute('scrapy crawl 51sxue'.split())
# execute('scrapy crawl gdedu'.split())
execute('scrapy crawl weixinArticle -s JOBDIR=JobDir/Weixin'.split())

