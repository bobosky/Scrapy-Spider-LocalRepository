url = 'http://vacations.ctrip.com/tour/restapi/online/12447/getScenicSpotCommentInfoList'

data3={"ChannelCode":0,
"PlatfromId":4,
"Version":"71100",
"head":{"ctok":"",
        "cver":"1.0",
        "lang":"01",
        "sid":"8888",
        "syscode":"09",
        "auth":"",
        "extension":[]},
"PageIndex":1,
"PageSize":10,
"PoiId":97345,
"contentType":"json"}

data2 = {"ChannelCode":'0',
"PlatfromId":'4',
"Version":"71100",
"head":{"ctok":"",
        "cver":"1.0",
        "lang":"01",
        "sid":"8888",
        "syscode":"09",
        "auth":"",
        "extension":[]},
"PageIndex":'2',
"PageSize":'10',
"PoiId":'97345',
"contentType":"json"}

data = {"ChannelCode":0,
"PlatfromId":4,
"Version":"71100",
"head":{"ctok":"",
        "cver":"1.0",
        "lang":"01",
        "sid":"8888",
        "syscode":"09",
        "auth":"",
        "extension":[]},
"PageIndex":2,
"PageSize":10,
"PoiId":10558849,
"contentType":"json"}

ee={"ChannelCode":0,"PlatfromId":4,"Version":"71100","head":{"ctok":"","cver":"1.0","lang":"01","sid":"8888","syscode":"09","auth":"","extension":[]},"PageIndex":5,"PageSize":10,"PoiId":10758286,"contentType":"json"}

headers = {
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    'accept-encoding': 'gzip, deflate',  # 只要gzip的压缩格式
    'accept-language': 'zh-CN,zh;q=0.9',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.79 Safari/537.36'
}

cookies = {
'_abtest_userid':'9cc0e329-d7e6-4425-8e0f-4c8022cede74',
' Union':'SID=155952&AllianceID=4897&OUID=baidu81|index|||',
' Session':'SmartLinkCode=U155952&SmartLinkKeyWord=&SmartLinkQuary=&SmartLinkHost=&SmartLinkLanguage=zh',
' adscityen':'Guangzhou',
' _RSG':'cDqeJ8kvdS2PDkem32LTWA',
' _RDG':'2848675337e76629433861b497e9452d7e',
' _RGUID':'2727e6e2-13a3-4366-a81d-5420f0a2e359',
' traceExt':'campaign=CHNbaidu81&adid=index',
' MKT_Pagesource':'PC',
' _ga':'GA1.2.1490080800.1533795358',
' _gid':'GA1.2.1678548548.1533795358',
' appFloatCnt':'1',
' manualclose':'1',
' _RF1':'121.32.13.31',
' StartCity_SH':'SHStartCity=32',
' _gat':'1',
' _jzqco':'%7C%7C%7C%7C1533795353805%7C1.2107161015.1533795353698.1533796819899.1533796884026.1533796819899.1533796884026.undefined.0.0.12.12',
' __zpspc':'9.1.1533795353.1533796884.12%231%7Cbaidu%7Ccpc%7Cbaidu81%7C%25E6%2590%25BA%25E7%25A8%258B%25E5%25AE%2598%25E7%25BD%2591%25E9%25A6%2596%25E9%25A1%25B5%7C%23',
' _bfa':'1.1533795350731.3qxcbn.1.1533795350731.1533795350731.1.17',
' _bfs':'1.17',
' Mkt_UnionRecord':'%5B%7B%22aid%22%3A%224897%22%2C%22timestamp%22%3A1533796903104%7D%5D',
' _bfi':'p1%3D103706%26p2%3D283007%26v1%3D17%26v2%3D16'
}

#http://travel.qunar.com/place/api/html/comments/poi/708974?
par = {
        'poiList':'true',
        'sortField':'1',
        'rank':'0',
        'pageSize':'40',
        'page':'1'
       }

import requests

# data = {
#     'a': 1,
#     'b': 2,
# }
# # 1
# requests.post(url, data=json.dumps(data))
# # 2-json参数会自动将字典类型的对象转换为json格式
# requests.post(url, json=data)
from urllib.parse import urlencode
import json,re

id_map = {'715145': '濠河风景名胜区',
          '716397': '南通狼山风景区',
          '702813': '南通水绘园',
          '7646591': '南通海底世界',
          '702642': '张謇纪念馆',
          '714698': '南通博物苑',
          '3725044': '南通园艺博览园',
          '708135': '南通啬园',
          '7470994': '南通方特探险王国'
          }

# id_list= ['715145','716397','702813','7646591','702642','714698','3725044','708135','7470994']
# for id in id_list:
#     url3 = 'http://travel.qunar.com/place/api/html/comments/poi/{id}?{para}'.format(id=id,para=urlencode(par))
#     html2 = requests.get(url=url3, headers=headers)
#     print( html2.status_code, html2.url,html2.text)

# url2 = 'http://vacations.ctrip.com/tour/restapi/online/12447/getScenicSpotCommentInfoList?{}'.format(urlencode(data))
# html = requests.post(url=url, json=ee, headers=headers, cookies=cookies)

# print(html.text,html.status_code,html.url)

# url3 = 'http://travel.qunar.com/place/api/html/comments/poi/{id}?{para}'.format(id='715145',para=urlencode(par))
# html2 = requests.get(url=url3, headers=headers)
# print(html2.url)
# http://travel.qunar.com/place/api/html/comments/poi/715145?poiList=true&sortField=1&rank=0&pageSize=10&page=5

#http://pagelet.mafengwo.cn/poi/pagelet/poiCommentListApi?
# par = {
#     # 'callback':'jQuery18108134439034117025_1534049589066',
#     'params':'{"poi_id":"5426931","page":1,"just_comment":1}',
#     # 'params': '{"poi_id":"6327040","page":2,"just_comment":1}',
#
#     # '_':'1534049642338'
# }
# urll = 'http://pagelet.mafengwo.cn/poi/pagelet/poiCommentListApi?{}'.format(urlencode(par))
# s = requests.get(url=urll, headers=headers)
# print(type(par['params']))
# print(s.url)
# print(s.text)

# %7B%22poi_id%22%3A%225503589%22%2C%22page%22%3A2%2C%22just_comment%22%3A1%7D

# http://you.ctrip.com/destinationsite/TTDSecond/SharedView/AsynCommentView
param = {
    'poiID':'76177',
    'districtId':'85',
    'districtEName':'Nantong',
    'pagenow':'4',
    'order':'3.0',
    'star':'0.0',
    'tourist':'0.0',
    'resourceId':'3813',
    'resourcetype':'2'
}
param2 = {
    'poiID':'96090',
    'districtId':'85',
    'districtEName':'Nantong',
    'pagenow':'1',
    'order':'3.0',
    'star':'0.0',
    'tourist':'0.0',
    # 'resourceId':'134178',
    'resourcetype':'2'
}

param22 = {
        'poiID': 76177, #24650510 96090 76177
        'districtId': 85,
        'districtEName': 'Nantong',
        'pagenow': 138,
        'order': '3.0',
        'star': '0.0',
        'tourist': '0.0',
        'resourcetype': 2
    }

# url = 'http://you.ctrip.com/destinationsite/TTDSecond/SharedView/AsynCommentView'
# html = requests.post(url=url,data=param22,headers=headers)
# print(html.text)
#
# import pandas as pd
# f = pd.ExcelWriter('output.xlsx')
# df = pd.DataFrame(data={'test':{3:'zhuzhi',"rrr":'dddf'},'ffff':{3:'dddf','rrr':'3fff'}})
# df.to_excel(f,'Sheet1')
# f.save()


from travellerSP.helper import Redis_proxy
import random
from lxml import etree
p = Redis_proxy()
ip = random.choice(p.run())


proxy = {'https':'https://'+ip,'http':'http://'+ip}
print(proxy)
# html = requests.get(url='http://www.ip38.com/',headers=headers,proxies = proxy).text
html = requests.get(url='http://www.ip38.com/',headers=headers).text

print(html)