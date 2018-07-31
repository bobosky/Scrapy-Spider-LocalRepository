#-*- encoding: utf-8 -*-

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from lxml import etree
import requests
from urllib.parse import urlencode
# options = webdriver.ChromeOptions()
# options.add_argument('--headless')
# options.add_argument('--disable-gpu')
# chrome_browser = webdriver.Chrome(chrome_options=options,executable_path='/Users/Ming/Documents/pycharm-projects/chromedriver')
# wait=WebDriverWait(chrome_browser,10)
#
# f = open('tff.txt','a+')
# for i in range(1,2):
#     url = 'https://xueqiu.com/hq#exchange=HK&firstName=2&secondName=2_0&page={i}'.format(i=i)
#     chrome_browser.get(url=url)
#     # wait.until(EC.presence_of_element_located((By.XPATH,'//*[@class="tableContainer new-portfolio"]')))
#
#     # selector = etree.HTML(chrome_browser.page_source)
#     f.write(chrome_browser.page_source)
#
# f.close()
data={
    'page': 6,
    'size': 90,
    'order': 'desc',
    'orderby': 'percent',
    'type': 30,
    'isdelay': 1
}

header={
    'Accept': 'application/json, text/javascript, */*; q=0.01',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'zh-CN zh q=0.9',
    'cache-control': 'no-cache',
    'Connection': 'keep-alive',
    'Cookie': 'device_id=100f5f0a3a84d5b15e16f1a5bf008404; s=f911nont1r; aliyungf_tc=AQAAAMSLhE4uWg4A6YZJ34qWiojHpgI3; xq_a_token=7023b46a2c20d7b0530b4e9725f7f869c8d16e7d; xq_a_token.sig=ENETvzFNvxxbtpbc1TfjQpBjoaE; xq_r_token=19bf36bc92fc764fb5cc550744d7fe922069fd14; xq_r_token.sig=dRocG0wcTXQQLq8b3AmLY9RYqyk; u=841526521139357; Hm_lvt_1db88642e346389874251b5a1eded6e3=1526376492,1526389779,1526470076,1526521139; Hm_lpvt_1db88642e346389874251b5a1eded6e3=1526521142',
    'Host': 'xueqiu.com',
    'Referer': 'https://xueqiu.com/hq',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36'
}

for i in range(1,32):
    data['page']=i
    api='https://xueqiu.com/stock/cata/stocklist.json?'+urlencode(data)
    source = requests.get(url=api,headers=header).json()
    print(source)
    items = source['stocks']
    for item in items:
        code=item['code']
        name=item['name']
        current=item['current']
        change=item['change']
        percent=item['percent']
        marketcapital=item['marketcapital']
        amount=item['amount']
        print(code,name,current,change,percent,marketcapital,amount)
