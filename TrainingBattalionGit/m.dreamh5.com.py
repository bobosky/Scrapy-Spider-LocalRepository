import requests
from PIL import Image
from urllib.parse import urlencode
from io import BytesIO

# import socket
# socket.gethostbyname("")

header={
    'Accept': '*/*',
    'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'zh-CN,zh;q=0.9',
    'Host': 'www.flyh5.cn',
    'Origin': 'http://m.dreamh5.com',
    'Proxy-Connection': 'keep-alive',
    'Referer': 'http://m.dreamh5.com/',
    'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Mobile Safari/537.36'
}
param={
    'cid': 54,
    'page': 1
}
map={
    54:'互联网',
    55:'汽车',
    56:'游戏',
    57:'地产',
    58:'手机&快消品',
    60:'金融',
    61:'娱乐'
}

f = open('haha2.txt','a+')
for j in [54,55,56,57,58,60,61]:
    for i in range(1,8):
        param['page']=i
        param['cid']=j
        url='http://www.flyh5.cn/anlie/index.php?'+urlencode(param)
        print(url)
        json = requests.get(url=url,headers=header).json()
        print(json)
        if json:
            items = json['case']
            for item in items:
                post_title = item['post_title']
                post_excerpt=item['post_excerpt']
                photourl='http://www.flyh5.cn'+item['img']
                # source = requests.get(url=photourl,headers=header).content
                # image = Image.open(BytesIO(source))
                # rgb=image.convert('RGB')
                # rgb.save('./photo/{post_title}.jpg'.format(post_title=post_title))
                # rgb.seek(0)
                # rgb.verify()
                f.write('名称：'+post_title+'\n'+'分类：'+map[j]+'\n'+'说明:'+post_excerpt+'\n'+'封面：'+photourl+'\n\n')
        else:
            continue

f.close()