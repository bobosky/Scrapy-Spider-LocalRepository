# encoding: utf-8

#-----------------------------------------------------------------------------------------------------------------------------------------------------------

import pycurl,certifi
from io import BytesIO

str = BytesIO()

list_head = [
    'Accept: */*',
    'User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36 MicroMessenger/6.5.2.501 NetType/WIFI WindowsWechat QBCore/3.43.691.400 QQBrowser/9.0.2524.400'
    'X-Requested-With: XMLHttpRequest',
    # 'Referer: https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzA5OTEzNDkxNw==&scene=124&uin=MTQ0MjA2MDcyMg%3D%3D&key=6d882f3a688ff228c0d62ae7f70433f03aa8ab9870f95f3bb4e7809d55edc7bc2ef60c28ff0c83511f4a1c579a827cd457a640a80b2cb3269b75b30a30de8355ee73b00c6b1a3bdafc67f529a9f6f5bc&devicetype=Windows+7&version=6206021b&lang=zh_CN&a8scene=7&pass_ticket=qkd7lrsCKIkITWLSbXTo22foIjH10JCTcBfvnGIJQfnRHhg7uVXKGSVpJ57SRGcd&winzoom=1',
    'Accept-Encoding: gzip, deflate',
    'Accept-Language: zh-CN,zh;q=0.8,en-us;q=0.6,en;q=0.5;q=0.4',
    'Cookie: rewardsn=; wxtokenkey=777; wxuin=1442060722; devicetype=Windows7; version=6206021b; lang=zh_CN; pass_ticket=qkd7lrsCKIkITWLSbXTo22foIjH10JCTcBfvnGIJQfnRHhg7uVXKGSVpJ57SRGcd; wap_sid2=CLKz0K8FElx0aXFodFBkRmthcUIyak5EeUthclhXWkRyLVlhTW5mX1IxV2JXVjFCLWdPUDI3ZS1JU3NGdjBxaEJyX096U1N1UTJxd1ZEU1BsZk5WYk9lQ1N4RHgyTkFEQUFBfjDag7LdBTgNQAE='
]

postfields = 'r=0.6866572804283351&__biz=MzA5OTEzNDkxNw%3D%3D&appmsg_type=9&mid=2652172289&sn=aacabd39c35587c237366a776b81d259&idx=2&scene=38&title=%25E5%25B8%2588%25E6%2581%25A9%25E9%259A%25BE%25E5%25BF%2598%25EF%25BC%258C%25E6%2584%259F%25E8%25B0%25A2%25E6%258C%2587%25E5%25BC%2595%25E5%2589%258D%25E8%25A1%258C%25E7%259A%2584%25E6%2582%25A8&ct=1536591292&abtest_cookie=&devicetype=Windows%207&version=6206021b&is_need_ticket=0&is_need_ad=0&comment_id=452968419168681984&is_need_reward=0&both_ad=0&reward_uin_count=0&send_time=&msg_daily_idx=1&is_original=0&is_only_read=1&req_id=2717AUvZQVDkCI022y0tkIEe&pass_ticket=qkd7lrsCKIkITWLSbXTo22foIjH10JCTcBfvnGIJQfnRHhg7uVXKGSVpJ57SRGcd&is_temp_url=0&item_show_type=undefined&tmp_version=1'
# url = 'https://mp.weixin.qq.com/mp/appmsg_comment?action=getcomment&scene=0&__biz=MzA5OTEzNDkxNw==&appmsgid=2652172289&idx=2&comment_id=452968419168681984&offset=0&limit=100&uin=MTQ0MjA2MDcyMg%253D%253D&key=bd90134f48e7cdcf3a4948cd8783c250b255ac197e735b20573c7693526260ebd913defbbca92d2c1c6ead07582d88f091f7c10db70c1ac3396035bddf05fbec290676aa37117dac8c86c4e7cf4cdcc5&pass_ticket=qkd7lrsCKIkITWLSbXTo22foIjH10JCTcBfvnGIJQfnRHhg7uVXKGSVpJ57SRGcd&wxtoken=777&devicetype=Windows%26nbsp%3B7&clientversion=6206021b&appmsg_token=976_YVZCIiDTrLQkl%252BOlsEV_nnCxjKLXIicmk6nweJkSIyYVRfHOqang8yo3RgNTU7IHgloLFpXdEHOyrEPs&x5=0&f=json'
cobj = pycurl.Curl()

url = [
    'https://www.baidu.com/',
    'http://t.cn/aKln8T',
    'https://blog.csdn.net/cityzenoldwang/article/details/78621337'
]

for i in url:
    cobj.setopt(pycurl.URL,i)
    cobj.setopt(pycurl.CAINFO,certifi.where())
    cobj.setopt(pycurl.CONNECTTIMEOUT,10)
    cobj.setopt(pycurl.WRITEFUNCTION,str.write)
    # cobj.setopt(pycurl.VERBOSE, 1)
    # cobj.setopt(pycurl.POSTFIELDS,postfields)
    # cobj.setopt(pycurl.NOPROGRESS,0)
    # cobj.setopt(pycurl.HTTPHEADER, list_head)

    cobj.perform()

    print(str.getvalue())                   #获取内容
    print(cobj.getinfo(pycurl.HTTP_CODE),'\n',
          cobj.getinfo(pycurl.RESPONSE_CODE),'\n',
          cobj.getinfo(pycurl.EFFECTIVE_URL),'\n',
          # cobj.getinfo(pycurl.URL), '\n',
          # cobj.getinfo(pycurl.HTTPHEADER, list_head),'\n',
          # len(str.getvalue())
          )


str.close()
cobj.close()