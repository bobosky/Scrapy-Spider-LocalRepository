#-*- encoding: utf-8 -*-

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from lxml import etree
from io import BytesIO
from PIL import Image
import requests

if __name__ == '__main__':
    options = webdriver.ChromeOptions()
    options.add_argument('--headless')
    options.add_argument('--disable-gpu')
    chrome = webdriver.Chrome(chrome_options=options,executable_path='/Users/Ming/Documents/pycharm-projects/chromedriver')
    wait = WebDriverWait(chrome,10)

    # chrome.get('https://xueqiu.com/hq#exchange=HK&firstName=2&secondName=2_0&page=1')

    header = {
        'Accept': '*/*',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': '72',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.170 Safari/537.36',
        'Referer': 'https://ala.zoosnet.net/LR/minichat_PC.aspx?id=ALA67177678&cid=1526456708680401859019&lng=cn&sid=1526456708680401859019&msg=&p=http%3A//www.dreamh5.com/Case/0_1.html%23program0&r=http%3A//www.dreamh5.com/Case/0_31.html',
    }
    data = {
        'id': 67177678,
        'sid': 1526456708680401859019,
        'maxid': 22812,
        '_text':'',
        'lng': 'cn',
        'pp': '1a9a'
    }
    f = open('newinfo.txt','a+')
    for i in range(1,32):
        chrome.get('http://www.dreamh5.com/Case/0_{i}.html#program0'.format(i=i))

        wait.until(EC.presence_of_element_located((By.ID,"case")))

        # print(chrome.page_source)
        # with open('page-new-source{i}'.format(i=i),'a+') as f:
        #     f.write(chrome.page_source)

        # chrome.implicitly_wait(10)

        # chrome.find_element_by_xpath('//*[@class="next"]/a/span').click()
        # try:
        #     element=chrome.find_element_by_class_name("next")
        # except WebDriverException:
        #     print('WebDriverException')
        # chrome.execute_script('arguments[0].click();',element)
        # wait.until(EC.visibility_of_element_located((By.CLASS_NAME,"pager")))
        selector = etree.HTML(chrome.page_source)
        items=selector.xpath('//*[@class ="cx_ul_li cx_mulu"]/ul/li')
        # print(type(items),items)
        for item in items:
            url = item.xpath('./@data-url')[0]
            title = item.xpath('./label[contains(@class,"cx_label")]/a[1]/text()')[0]
            image = item.xpath('./p/img/@src')[0]
            print(url,title,image)
            # f.write('标题:'+title+'\n'+'链接:'+url+'\n'+"图片:"+image+'\n\n')

            # imge_binary = requests.get(image, headers=header,data=data)
            # print(imge_binary.status_code)
            # image=Image.open(BytesIO(imge_binary.content)) #BytesIO从内存而不是文件读取imge_binary
            # image.save('./photo/{id}.png'.format(id=title))
            # image.seek(0)
            # image.verify()  # verify()可以判断.png图片时候损坏，损坏会报错。

            print('--------------Finish!!!!-----------------------')


    f.close()
    chrome.close()
    chrome.quit()




