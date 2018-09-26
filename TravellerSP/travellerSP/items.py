# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# https://doc.scrapy.org/en/latest/topics/items.html

import scrapy


class TravellerspItem(scrapy.Item):
    # define the fields for your item here like:
    # name = scrapy.Field()
    id = scrapy.Field() #《SO》for level 1
    url = scrapy.Field() #《S1》评论连接 eg: https://www.zhihu.com/question/46800886/answer/102936625
    platform = scrapy.Field() # 《S2》eg: 知乎
    viewType = scrapy.Field() # 《S3a》eg: 问答 or 文章
    searchWord = scrapy.Field() # 《S3b》eg:锐界
    title = scrapy.Field() # 《S4》eg:为什么有人41万买锐界？
    crawlTime = scrapy.Field() # 《S5》
    publishTime = scrapy.Field() # 《S6》
    level = scrapy.Field() # 《S9》 1 or 2
    like = scrapy.Field() # 《S13》
    authorName = scrapy.Field() # 《G1》eg:盖子
    authorID = scrapy.Field() # 《G0》
    content = scrapy.Field() # 《Q1》


class SchoolInfoItem(scrapy.Item):
    city = scrapy.Field()
    level = scrapy.Field()
    name = scrapy.Field()
    address = scrapy.Field()
    phone = scrapy.Field()
    code = scrapy.Field()
    web = scrapy.Field()


class WeixinItem(scrapy.Item):
    name = scrapy.Field()
    title = scrapy.Field()
    content = scrapy.Field()
    publish_time = scrapy.Field()
    crawlTime = scrapy.Field()

class Yihaodian(scrapy.Item):
    name =scrapy.Field()
    userid = scrapy.Field()
    star = scrapy.Field()
    date = scrapy.Field()
    crawlTime = scrapy.Field()
    content = scrapy.Field()