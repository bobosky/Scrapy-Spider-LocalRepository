#-*- encoding: utf-8 -*-

import requests
from urllib.parse import urlencode
import enum

urlparam ={
    'offset':0,
    'format':'json',
    'keyword': '街拍',
    'autoload': 'true',
    'count': 20,
    'cur_tab': 1,
    'from': 'search_tab'
}

def getpage():
    for i in range(1,5):
        url = 'https://www.toutiao.com/search_content/?'+urlencode(urlparam)
        urlparam['offset']=i*20
        print(url)
        try:
            resopnse=requests.get(url)
            if resopnse.status_code == 200:
                print(resopnse.text)
                print('--------------------------------------------------------------')
                print(resopnse.content)
                print('--------------------------------------------------------------')
                print(resopnse.headers)
                print('--------------------------------------------------------------')
                print(resopnse.request)
                print('--------------------------------------------------------------')
                print(resopnse.cookies)
                print('--------------------------------------------------------------')
                print(resopnse.json())
                print('--------------------------------------------------------------')
        except requests.ConnectionError:
            print('ConnectionError')
            continue
        except requests.ConnectTimeout:
            print('Timeout')
            continue



def getComment():
    url='http://music.163.com/weapi/v1/resource/comments/R_SO_4_28481103?csrf_token='
    try:
        response=requests(url)
        print(response.text)
    except requests.ConnectTimeout:
        return None

if __name__ == '__main__':
    # getpage()
    getComment()




def callfunc(func):
    return func

