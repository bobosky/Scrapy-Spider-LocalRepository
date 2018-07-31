#-*- encoding: utf-8 -*-

import requests
from fake_useragent import UserAgent
import time
from PIL import Image
from io import BytesIO
import urllib.request
from PIL import Image
from multiprocessing.dummy import Pool as ThreadingPool

url_port='http://www.beetobees.com/Case/Index.html'
# os.mkdir('/Users/Ming/PycharmProjects/tesseract/photo')
ua=UserAgent()
header={
    'Accept':'application/json, text/javascript, */*; q=0.01',
    'Accept-Encoding':'gzip, deflate',
    'Accept-Language':'zh-CN,zh;q=0.9',
    'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
    'Content-Length':'49',
    'User-Agent':'',
    'Referer': 'http://www.beetobees.com/Case/Index.html',
}

file = open('info.txt','a+')
io = BytesIO()
# urllib.request.urlretrieve(url='http://image.baidu.com/search/detail?ct=503316480&z=0&ipn=false&word=%E5%88%98%E4%BA%A6%E8%8F%B2&step_word=&hs=0&pn=4&spn=0&di=149658493930&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&istype=0&ie=utf-8&oe=utf-8&in=&cl=2&lm=-1&st=undefined&cs=3921123908%2C3798729096&os=4130465387%2C4292903135&simid=4185572318%2C846060878&adpicid=0&lpn=0&ln=3962&fr=&fmq=1526444524599_R&fm=&ic=undefined&s=undefined&se=&sme=&tab=0&width=&height=&face=undefined&ist=&jit=&cg=star&bdtype=0&oriquery=&objurl=http%3A%2F%2Fimg5q.duitang.com%2Fuploads%2Fitem%2F201505%2F02%2F20150502182518_dV8ez.jpeg&fromurl=ippr_z2C%24qAzdH3FAzdH3Fooo_z%26e3B17tpwg2_z%26e3Bv54AzdH3Frj5rsjAzdH3F4ks52AzdH3Fncbdc0b8lAzdH3F1jpwtsAzdH3F&gsm=0&rpstart=0&rpnum=0&islist=&querylist=',filename='test')

for p in range(1,30):
    data={
        'name':'',
        'p':p,
        'list_row':10,
        'catId':1,
        'subCatId':0,
        'keyword':''
    }
    header['User-Agent']=ua.random
    rjson = requests.post(url=url_port,data=data,headers=header).json()
    print(data)
    items = rjson['info']['list']
    for item in items:
        title = item.get('title')
        icon = 'http://www.beetobees.com/'+item.get('icon')
        description = item.get('desc')
        appid = 'icon_'+item.get('appid')
        codeurl = item.get('codeurl')
        # header['User-Agent'] = ua.random
        # try:
        #     imge_binary = requests.get(icon,headers=header,data=data).content
        #     print(icon)
        #     image=Image.open(BytesIO(imge_binary)) #BytesIO从内存而不是文件读取imge_binary
        #     image.save('./photo/icon_{id}.png'.format(id=appid))
        #     image.seek(0)
        #     image.verify() #verify()可以判断.png图片时候损坏，损坏会报错。
        # except:
        #     pass
        file.write('title:'+title+'  '+'description:'+description+'   '+'appid'+appid+'codeurl:'+codeurl+'\n')
    time.sleep(1)

file.close()
