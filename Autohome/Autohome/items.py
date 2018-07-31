# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# https://doc.scrapy.org/en/latest/topics/items.html

import scrapy


class AutohomeItem(scrapy.Item):
    # define the fields for your item here like:
    crawl_date = scrapy.Field()
    city = scrapy.Field()
    font_score = scrapy.Field()
    title_name = scrapy.Field()
    title_rank = scrapy.Field()
    rival_rank = scrapy.Field()
    screen_shot = scrapy.Field()
    pass
