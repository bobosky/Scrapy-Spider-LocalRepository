# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://doc.scrapy.org/en/latest/topics/item-pipeline.html
import pandas
from scrapy.conf import settings
from scrapy import signals
from scrapy.xlib.pydispatch import dispatcher

class TravellerspPipeline(object):
    buffer_list = None
    filename = None

    def __init__(self):
        dispatcher.connect(receiver=self.close_spider, signal=signals.spider_closed)#建立信号
        self.buffer_list = []
        self.filename = 0

    def close_spider(self, spider):
        if self.buffer_list:
            with open(r'{path}{cfn}'.format(cfn='store.txt', path=settings.get('STORE_PATH')),'a+',encoding='utf-8') as f:
                f.writelines(self.buffer_list)
                self.buffer_list.clear()

    def process_item(self, item, spider):
        # str = '《Root》《S0》{id}《/S0》《S1》{url}《/S1》《S2》{pf}《/S2》《S3a》{vt}《/S3a》《S3b》{sw}《S3b》《S4》{title}《/S4》《S5》{ct}《/S5》《S6》{pt}《/S6》《S9》{level}《/S9》《S13》{like}《/S13》《G1》{an}《/G1》《G0》{aid}《/G0》《Q1》{content}《/Q1》《/Root》\n'.format(
        #     id=item.setdefault('id', ''), url=item.setdefault('url', ''), pf=item.setdefault('platform', ''),
        #     vt=item.setdefault('viewType', ''), sw=item.setdefault('searchWord', ''),
        #     title=item.setdefault('title', ''), ct=item.setdefault('crawlTime', ''),
        #     pt=item.setdefault('publishTime', ''), level=item.setdefault('level', ''),like=item.setdefault('like', ''),
        #     an=item.setdefault('authorName', ''),aid=item.setdefault('authorID', ''), content=item.setdefault('content', ''))
        str = '《Root》《city》{ci}《/city》《level》{le}《\level》《name》{na}《/name》《address》{ad}《/address》《phone》{ph}《/phone》《code》{co}《/code》《web》{we}《/web》《/Root》\n'.format(
            na=item.setdefault('name', ''),le=item.setdefault('level', ''), ci=item.setdefault('city', ''),ad=item.setdefault('address', ''),ph=item.setdefault('phone', ''),co=item.setdefault('code', ''),we=item.setdefault('web', ''))

        if len(self.buffer_list) <= settings.get('BUFFER_LEN'):
            self.buffer_list.append(str)
        else:
            with open(r'{path}{cfn}'.format(cfn=r'store.txt', path=settings.get('STORE_PATH')),'a+',encoding='utf-8') as f:
                f.writelines(self.buffer_list)
                self.buffer_list.clear()

            self.buffer_list.append(str)
        return item

class saveExcelPipeline(object):
    store_dict = None
    cur_rowindex = None

    def __init__(self):
        dispatcher.connect(receiver=self.spider_close,signal=signals.spider_closed)
        self.cur_rowindex = 1
        self.store_dict = {'学校名称':{},'学校地址':{},'电话号码':{},'邮编':{},'网页':{}}

    def spider_close(self):
        with pandas.ExcelWriter('output.xlsx') as writer:
            df = pandas.DataFrame(data=self.store_dict)
            df.to_excel(writer,'Sheet1')
            writer.save()
        self.store_dict.clear()

    def process_item(self, item, spider):
        self.store_dict['学校名称'][self.cur_rowindex] = item['name']
        self.store_dict['学校地址'][self.cur_rowindex] = item['address']
        self.store_dict['电话号码'][self.cur_rowindex] = item['phone']
        self.store_dict['邮编'][self.cur_rowindex] = item['code']
        self.store_dict['网页'][self.cur_rowindex] = item['web']

        self.cur_rowindex = self.cur_rowindex + 1
        print(item)
