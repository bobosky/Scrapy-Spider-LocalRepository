#-*- encoding: utf-8 -*-

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from lxml import etree

options = webdriver.ChromeOptions()
options.add_argument('--headless')
options.add_argument('--disable-gpu')
chrome_browser = webdriver.Chrome(chrome_options=options,executable_path='/Users/Ming/Documents/pycharm-projects/chromedriver')
wait=WebDriverWait(chrome_browser,10)

chrome_browser.get('http://music.163.com/#/song?id=307952')
f = open('tffdd.txt','a+')
for i in range(1,30):
    # js = "var q=document.documentElement.scrollTop=10000"
    # browser.execute_script(js)

    # wait.until(EC.presence_of_element_located((By.XPATH,'//*[@class="cmmts j-flag"]')))

    selector = etree.HTML(chrome_browser.page_source)
    f.write(chrome_browser.page_source)
    # items = selector.xpath('//*[@class="cmmts j-flag"]/div')
    # for item in items:
    #     commenter = item.xpath('./div[@class="cntwrap"]/div[1]/div/a/text()')[0]
    #     content = item.xpath('./div[@class="cntwrap"]/div[1]/div/text()')[0]
    #     time = item.xpath('./div[@class="cntwrap"]/div[2]/div/text()')[0]
    #     print(commenter,time,content)

    # if browser.find_element(By.XPATH,'//*[@class="m-cmmt"]/div[3]/div/a[-1]'):
    #     print('successful!!')

f.close()