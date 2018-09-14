# encoding: utf-8
import requests,json


#offset 起始 count 长度
      #https://mp.weixin.qq.com/mp/profile_ext?action=getmsg&__biz=MzA5OTEzNDkxNw==&f=json&offset=30&count=10&is_ok=1&scene=126&uin=777&key=777&pass_ticket=3AwXj3Cz%2BLj7ZUfuUNkaovkLsCmCobRSNZV6yLQxT11xA02nq87py4k2VIk7kvjm&wxtoken=&appmsg_token=973_dfgnD%252BM0PhbYX%252FzcySTCd9OZOjLDwuEmPHNu9w~~&x5=0&f=json
      #https://mp.weixin.qq.com/mp/profile_ext?action=getmsg&__biz=MzA5OTEzNDkxNw==&f=json&offset=20&count=10&is_ok=1&scene=126&uin=777&key=777&pass_ticket=3AwXj3Cz%2BLj7ZUfuUNkaovkLsCmCobRSNZV6yLQxT11xA02nq87py4k2VIk7kvjm&wxtoken=&appmsg_token=973_dfgnD%252BM0PhbYX%252FzcySTCd9OZOjLDwuEmPHNu9w~~&x5=0&f=json
      #https://mp.weixin.qq.com/mp/profile_ext?action=getmsg&__biz=MzA5OTEzNDkxNw==&f=json&offset=10&count=10&is_ok=1&scene=126&uin=777&key=777&pass_ticket=3AwXj3Cz%2BLj7ZUfuUNkaovkLsCmCobRSNZV6yLQxT11xA02nq87py4k2VIk7kvjm&wxtoken=&appmsg_token=973_dfgnD%252BM0PhbYX%252FzcySTCd9OZOjLDwuEmPHNu9w~~&x5=0&f=json
#https://mp.weixin.qq.com/mp/profile_ext?action=home  &__biz=MzA5OTEzNDkxNw==&scene=126&devicetype=android-19&version=2607023a&lang=zh_CN&nettype=WIFI&a8scene=3&pass_ticket=3AwXj3Cz%2BLj7ZUfuUNkaovkLsCmCobRSNZV6yLQxT11xA02nq87py4k2VIk7kvjm&wx_header=1

def geturl(dict):
    str = []
    for i in dict.keys():
        tmp = '{key}={val}'.format(key=i,val=dict[i])
        str.append(tmp)
    return '&'.join(str)

headers = {
    'Accept':'*/*',
    'Accept-Encoding':'gzip,deflate',
    'Accept-Language':'zh-CN,zh;q=0.8,en-us;q=0.6,en;q=0.5;q=0.4',
    # 'User-Agent':'Mozilla/5.0 (Linux; Android 4.4.4; MI 3C Build/KTU84P) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/33.0.0.0 Mobile Safari/537.36 MicroMessenger/6.7.2.1340(0x2607023A) NetType/WIFI Language/zh_CN',
    'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36 MicroMessenger/6.5.2.501 NetType/WIFI WindowsWechat QBCore/3.43.691.400 QQBrowser/9.0.2524.400'
}

dictf = {
    'pass_ticket':'J37qRTyh9BgWRexEgpjr7xCdHCqvrl/goG5siudeUY4hBoVjS8NeawDmrUQi//BX',
    'wap_sid2':'CLKz0K8FElxPVFpSVnI1djBHWUFjOGpsR3NJN1VhUGJIY05tU2hXcUxRQUxwT1p0ZkZTWnhOWkR6dnFqbWhGdjBQbHd5c0R3TE5FM1FCR2k0cWI2QS00YkhyQVlpczREQUFBfjC5uu3cBTgNQJVO',
    # 'wap_sid2': 'CLKz0K8FElxxbEY0aUY2SmkwWXI3Z1VIazJRby14YmQxWGJ3aWJlWXY4Y1oyR19yZGtBSFNhdll5cTZwSmZJU2UwSzBZdnpfZ3BoN1k4dlplb2NheDF5Vlg2djlVTTREQUFBfjDUuejcBTgNQAE=',
    'read-comment':'CLKz0K8FElxxbEY0aUY2SmkwWXI3Z1VIazJRby01TlNtX1ZnOVhoc29JWFYtVi1ESWxrVlI3Uk1DR25aYTNsdEpaZzhqNnVFdjNhaWkzcDJQN1ViYkZxREVUT3FhODREQUFBfjDQouncBTgNQAE=',
    'appmsg_token':'974_LRCAbvBRpNUBqjqLW1RDPstdMx-B2BeZRf04lw~~',
    'wxuin':'1442060722',
    '__biz':'MzA3MDA0OTQwMw==',                                                              # (公众号代号)
    'uin': 'MTQ0MjA2MDcyMg==',
    'key':'8db9fc3d3842e0482878996fa864570398eb381434ff479d6fbe97ce00a90e69bc45ea270721991f5400dcb2d69bbfcf506443e55dcf18fee50929e401b7b27cc4ef124d06bb9eac77f2ef25129b5b3e'
}

cook = {
    'rewardsn':'',
    'wxtokenkey':'777',
    'wxuin':dictf['wxuin'],
    'devicetype':'Windows 7',
    'version':'6206021b',
    'lang':'zh_CN',
    'pass_ticket':dictf['pass_ticket'],
    'wap_sid2':dictf['wap_sid2']
}

pars = {
    'action':'getmsg',
    '__biz':dictf['__biz'], #(公众号代号)        #与文章的__biz一致
    'offset':0,
    'is_ok':'1',
    # 'uin':'777',
    # 'key':'777',
    # 'scene':126,
    #手动输入
    'appmsg_token':dictf['appmsg_token'],
    'f':'json'
}

# --------------------------------------------------------------------------------文章内容--------------------------------------------------------------------------------------------------------------------
# url = 'https://mp.weixin.qq.com/s?__biz=MzA5OTEzNDkxNw==&mid=2652171690&idx=1&sn=b8a1c00659c15d5ed14c403b5e27cc7b&chksm=8b66b100bc1138166da075efc30ae79b7135e90f4860d18e6e305e81a56c8ba74683d5c9daee&scene=4&subscene=126&ascene=0&devicetype=android-19&version=2607023a&nettype=WIFI&abtest_cookie=BAABAAoACwASABMABAAjlx4ATJkeAFKZHgBgmR4AAAA%3D&lang=zh_CN&pass_ticket=3AwXj3Cz%2BLj7ZUfuUNkaovkLsCmCobRSNZV6yLQxT11xA02nq87py4k2VIk7kvjm&wx_header=1'
parsarticle = {
    '__biz':dictf['__biz'],                                             #与列表的__biz一致
    'mid':'2652172444',                                                 #文章标识
    'idx':'2',                                                          #文章标识
    'sn':'85383a603664a294e44af023751eeeac',                            #文章标识
    # 'chksm':'8b66ac36bc112520610bb0ad78d0a2b3b31b5d768033c3c3c61f3e4d2933587378b80adbf416',
    # 'scene':'38',
    # 'key':'84e8da670b9ce4c2c7f0711863311c6a540160cd9b7624ffdb233a93431ad8eb4bbcf8a8ee7a1ffb094becce9d6e55a5bc39134fb1852cf680e56dbaba2f291f47cb2d4f7c1a9fd79988b26f0888297d',
    # 'ascene':'7',
    # 'uin':dictf['uin'],
    # 'devicetype':'Windows 7',
    # 'version':'6206021b',
    # 'lang':'zh_CN',
    # 'pass_ticket':dictf['pass_ticket'],
    # 'winzoom':'1'
}

# --------------------------------------------------------------------------------阅读数，点赞数--------------------------------------------------------------------------------------------------------------------
# readurl = 'https://mp.weixin.qq.com/mp/getappmsgext?f=json&mock=&uin=777&key=777&pass_ticket=UKLKZhGZhrKXkiX0fbSKwCivwNDM2%25252FRA7MrquYz7mhHcp0nKuCm%25252FkvLxJ4a776%25252Fl&wxtoken=777&devicetype=android-19&clientversion=2607023a&appmsg_token=974_oLkmnmwY31t18%252FoTsgTuRGbmZf_Sjj977dTlTiywEYcfCjI22VxYdHoVmV0QDXJqaDwrbnCLEwh-H44b&x5=0&f=json '

parsread = {
    'f':'json',
    'mock':'',
    'uin':dictf['uin'],
    'key':dictf['key'],
    'pass_ticket':dictf['pass_ticket'],
    'wxtoken':'777',
    'devicetype':'Windows 7',
    'clientversion':'6206021b',
    'appmsg_token':dictf['appmsg_token'],  #***这是来自文章的response中的Set-Cookie: wap_sid2***
    'x5':'0',
}


# --------------------------------------------------------------------------------评论--------------------------------------------------------------------------------------------------------------------
# url = 'https://mp.weixin.qq.com/mp/appmsg_comment?action=getcomment&scene=0&__biz=MzA5OTEzNDkxNw==&appmsgid=2652171690&idx=1&comment_id=431164191211323395&offset=0&limit=100&uin=777&key=777&pass_ticket=3AwXj3Cz%25252BLj7ZUfuUNkaovkLsCmCobRSNZV6yLQxT11xA02nq87py4k2VIk7kvjm&wxtoken=777&devicetype=android-19&clientversion=2607023a&appmsg_token=974_rWwqyA4Wdr1Xop9WwdmWIEiuWbPFiR6bWr0S0d9qkPIXwpb_Efnqv5iO2-x_zV_0w3cLqruEbHSzFoe2&x5=0&f=json'
parsconm = {
    'action':'getcomment',
    'scene':'0',
    '__biz':'MzA5OTEzNDkxNw==',
    'appmsgid':'2652171690',                    #来自文章的mid
    'idx':'1',
    'comment_id':'431164191211323395',
    'offset':'0',
    'limit':'100',
    'uin':'777',
    'key':'777',
    'pass_ticket':'3AwXj3Cz%25252BLj7ZUfuUNkaovkLsCmCobRSNZV6yLQxT11xA02nq87py4k2VIk7kvjm',   #***这是来自文章的response中的Set-Cookie: pass_ticket***
    'wxtoken':'777',
    'devicetype':'android-19',
    'clientversion':'2607023a',
    'appmsg_token':'974_rWwqyA4Wdr1Xop9WwdmWIEiuWbPFiR6bWr0S0d9qkPIXwpb_Efnqv5iO2-x_zV_0w3cLqruEbHSzFoe2',  #***这是来自文章的response中的Set-Cookie: wap_sid2***
    'x5':'0',
    'f':'json'
}

listurl = 'https://mp.weixin.qq.com/mp/profile_ext?{}'.format(geturl(pars))
articleurl = 'https://mp.weixin.qq.com/s?{}'.format(geturl(parsarticle))
readurl = 'https://mp.weixin.qq.com/mp/getappmsgext?{}'.format(geturl(parsread))
# commenturl = 'https://mp.weixin.qq.com/mp/appmsg_comment?{}'.format(geturl(parsconm))


print(listurl)
html = requests.get(url=listurl,headers=headers,cookies=cook,verify=False)
print(html.text)

# print(articleurl)
# html = requests.get(url=articleurl,headers=headers,cookies=cook,verify=False)
# print(html.text)
# print(html.cookies.get_dict())
# print(len(html.text),html.status_code)

# print(readurl)
# cook['wap_sid2'] = html.cookies.get_dict()['wap_sid2']
# htmlp = requests.post(url=readurl,headers=headers,cookies=cook,verify=False)
# print(htmlp.text)
