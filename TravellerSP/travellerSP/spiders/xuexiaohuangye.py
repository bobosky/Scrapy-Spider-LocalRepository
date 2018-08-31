# -*- coding: utf-8 -*-
import json,re,requests,scrapy,time
from urllib.parse import urlencode
from scrapy.http import Request
from lxml import etree
from travellerSP.pipelines import TravellerspPipeline
from travellerSP.items import SchoolInfoItem
import travellerSP.helper as help

class Xuexiaohuangye(scrapy.Spider):
    name = 'xuexiaohuangye'

    params = {
        'cengci':None,
        'page':None,
        'local1':None,      #省份
        # 'local2':None       #城市
    }

    local = {
        "北京":['北京市'],"上海":['上海市'],"天津":['天津市'],"四川":['成都市'],"安徽":['合肥市','芜湖市','蚌埠市','淮南市','马鞍山市','淮北市','铜陵市','安庆市','黄山市','滁州市','阜阳市','宿州市','巢湖市','六安市','亳州市','池州市','宣城市'],
        "江苏":['南京市','无锡市','徐州市','常州市','苏州市','南通市','连云港市','淮安市','盐城市','扬州市','镇江市','泰州市','宿迁市'],"浙江":['杭州市','宁波市','温州市','嘉兴市','湖州市','绍兴市','金华市','衢州市','舟山市','台州市','丽水市'],
        "辽宁":['沈阳市','大连市','鞍山市','抚顺市','本溪市','丹东市','锦州市','营口市','阜新市','辽阳市','盘锦市','铁岭市','朝阳市','葫芦岛市'],"山西":['太原市','大同市','阳泉市','长治市','晋城市','朔州市','晋中市','运城市','忻州市','临汾市','吕梁市'],
        "福建":['福州市','厦门市','莆田市','三明市','泉州市','漳州市','南平市','龙岩市','宁德市'],"广东":['深圳市','广州市'],"海南":['海口市'],"河南":['郑州市','开封市','洛阳市','平顶山市','安阳市','鹤壁市','新乡市','焦作市','濮阳市','许昌市','漯河市','三门峡市','南阳市','商丘市','信阳市','周口市','驻马店市'],
        "湖南":['长沙市'],"陕西":['西安市','渭南市'],"湖北":['武汉市','宜昌市','荆门市'],"江西":['南昌市','景德镇市','萍乡市','九江市','新余市','鹰潭市','赣州市','吉安市','宜春市','抚州市','上饶市',''],"河北":['石家庄市','唐山市','秦皇岛市','邯郸市','邢台市','保定市','张家界市','承德市','沧州市','廊坊市','衡水市',''],
        "山东":['济南市','青岛市','淄博市','枣庄市','东营市','烟台市','潍坊市','济宁市','泰安市','威海市','日照市','莱芜市','临沂市','德州市','聊城市','滨州市','菏泽市',''],"重庆":['重庆市'],"吉林":['长春市','吉林市','四平市','辽源市','通化市','白山市','松原市','白城市','延边朝鲜族自治州'],
        "云南":['昆明市'],"贵州":['贵阳市'],"甘肃":['兰州市'],"宁夏":['银川市'],"内蒙古":['呼和浩特市','包头市','乌海市','赤峰市','通辽市','鄂尔多斯市','呼伦贝尔市','巴彦淖尔市','乌兰察布市','兴安盟','锡林郭勒盟','阿拉善盟'],
        "黑龙江":['哈尔滨市','齐齐哈尔市','鸡西市','鹤岗市','双鸭山市','大庆市','伊春市','佳木斯市','七台河市','牡丹江市','黑河市','绥化市','大兴安岭地区']
    }

    local1 = ['北京_local1','上海_local1','天津_local1','四川_local1','安徽_local1','江苏_local1','浙江_local1','辽宁_local1','山西_local1','福建_local1','广东_local1','广西_local1','海南_local1','河南_local1','湖南_local1','陕西_local1','湖北_local1','江西_local1','河北_local1','山东_local1','重庆_local1','青海_local1','吉林_local1','云南_local1','贵州_local1','甘肃_local1','宁夏_local1','新疆_local1','西藏_local1','内蒙古_local1','黑龙江_local1']

    cengci = ['小学_cengci','初中_cengci','高中_cengci']

    def start_requests(self):
        for i in self.local1:
            for j in self.cengci:
                self.params['local1'] = i
                self.params['cengci'] = j
                self.params['page'] = 1
                url = 'http://xuexiao.eol.cn/?{}'.format(urlencode(self.params))
                yield Request(url=url,callback=self.loop_parse)

    def loop_parse(self, response):
        pagebar = response.css('.page p').xpath('string(.)').extract_first()
        lastpage = re.search('共(\d+)页',pagebar).group(1)
        for i in range(1,int(lastpage)+1):
            url = response.url+'&page={}'.format(i)
            yield Request(url=url,callback=self.analysis)

    def analysis(self, response):
        list = response.css('.red_border .right_box')
        for i in list:
            pipeline = SchoolInfoItem()
            pipeline['name'] = i.xpath('div[1]/h2/a/text()').extract_first().split()[0]
            h3 = i.xpath('h3').extract_first()
            pipeline['address'] = re.search('地址：\s*(\S+)\s+',h3).group(1)
            pipeline['code'] = re.search('邮编：\s*(\d+)\s*',h3).group(1)
            pipeline['phone'] = re.search('电话：\s*(\S+)\s*',h3).group(1)
            yield pipeline

