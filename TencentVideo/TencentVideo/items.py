# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# https://doc.scrapy.org/en/latest/topics/items.html

import scrapy


class TencentvideoItem(scrapy.Item):
    # define the fields for your item here like:
    # name = scrapy.Field()
    id = scrapy.Field()  # 《SO》 for level 1
    url = scrapy.Field()  # 《S1》    评论连接 eg: https://www.zhihu.com/question/46800886/answer/102936625
    platform = scrapy.Field()  # 《S2》   eg: 腾讯视频
    viewType = scrapy.Field()  # 《S3a》  eg: 问答
    searchWord = scrapy.Field()  # 《S3b》    eg:亲爱的客栈
    crawlTime = scrapy.Field()  # 《S5》
    publishTime = scrapy.Field()  # 《S6》
    level = scrapy.Field()  # 《S9》 2 or 3
    commentID = scrapy.Field()  # 《ID》for level 2 or "1"
    comment_count = scrapy.Field()  # 《12》回复数
    like = scrapy.Field()  # 《S13》
    authorID = scrapy.Field()  # 《G0》
    content = scrapy.Field()  # 《Q1》
    puserid = scrapy.Field() # 《H1》
    pass
