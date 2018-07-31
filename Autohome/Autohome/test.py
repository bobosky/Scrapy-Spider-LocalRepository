import time
from selenium import webdriver
from scrapy.conf import settings


# class SeleniumSpiderMiddleware(object):
#     cookieCityId = {
#         'domain': '.autohome.com.cn', 'expiry': None,
#         'httpOnly': False, 'name': 'cookieCityId', 'path': '/',
#         'secure': False, 'value': '230800'
#     }
#
#     def __init__(self):
#         options = webdriver.ChromeOptions()
#         options.add_argument('--headless')
#         options.add_argument('--disable-gpu')
#         self.chrome_browser = webdriver.Chrome(executable_path=settings.get('DRIVER_EXECUTABLE_PATH'),chrome_options=options)
#         super(SeleniumSpiderMiddleware, self).__init__()
#
#     def __del__(self):
#         print('del called')
#         # self.chrome_browser.close() #关闭当前一个页面标签
#         self.chrome_browser.quit() #关闭所有页面标签
#         self.chrome_browser.service.stop() #退出浏览器，关闭进程
#
#     def process_request(self, url):
#         self.chrome_browser.get(url)  #第一次获取，拿到该网站的具体cookies，让驱动知道这个cookies在去哪里的
#         for i in self.chrome_browser.get_cookies():
#             if i['name'] == 'ahpvno':
#                 self.cookieCityId['expiry'] = i['expiry']
#         self.chrome_browser.add_cookie(self.cookieCityId)  #在原有组数格式cookies，添加一条参数的字典
#         self.chrome_browser.get(url)
#         self.chrome_browser.set_window_size(1024, 768)
#         self.chrome_browser.execute_script('window.scrollBy(0, 240)')
#
#         # screenshot = self.chrome_browser.get_screenshot_as_png()
#         self.chrome_browser.get_screenshot_as_file('screenshot9.png')


print(time.strftime('%Y-%m-%d %H:%M:%S',time.localtime(1532172620.507073)))
# oj = SeleniumSpiderMiddleware()
# oj.process_request('https://www.autohome.com.cn/135')
import requests
headers = {
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'accept-encoding': 'gzip',  # 只要gzip的压缩格式
        'accept-language': 'zh-CN,zh;q=0.9',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.79 Safari/537.36'
    }
url = 'https://www.autohome.com.cn/ashx/dsj/AjaxSeriesRank.ashx?levelId=3&cityId=340700&seriesId=135'
htmlsource = requests.get(url=url,headers=headers).text
print(htmlsource)
