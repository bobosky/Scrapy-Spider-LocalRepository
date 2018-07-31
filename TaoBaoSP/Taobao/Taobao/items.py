# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# https://doc.scrapy.org/en/latest/topics/items.html

import scrapy

class TaobaoItem(scrapy.Item):

    id = scrapy.Field()  # 《SO》for level 1
    url = scrapy.Field()  # 《S1》评论连接 eg: https://www.zhihu.com/question/46800886/answer/102936625
    platform = scrapy.Field()  # 《S2》eg: 知乎
    viewType = scrapy.Field()  # 《S3a》eg: 问答 or 文章
    searchWord = scrapy.Field()  # 《S3b》eg:锐界
    crawlTime = scrapy.Field()  # 《S5》
    publishTime = scrapy.Field()  # 《S6》
    level = scrapy.Field()  # 《S9》 1 or 2
    authorName = scrapy.Field()  # 《G1》eg:盖子
    content = scrapy.Field()  # 《Q1》