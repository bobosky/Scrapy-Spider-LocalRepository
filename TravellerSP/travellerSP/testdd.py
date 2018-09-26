import json,re,requests
from travellerSP.helper import getUrlWithPars
from urllib.parse import urlencode
from lxml import etree
from travellerSP.helper import getUrlWithPars



par = {
    'productId': 5483375,
'pagenationVO.currentPage': 60,
# 'pagenationVO.preCurrentPage': 2,
'pagenationVO.rownumperpage': 10,
# 'filter.commentFlag': 0,
# 'filter.sortType': 5,
# 'callback': 'comment_handler_success'
}

headers = {
    # 'authority':'item.yhd.com',
    'method':'GET',
    # 'path':'/squ/comment/getCommentDetail.do?productId=770104&pagenationVO.currentPage=2&pagenationVO.preCurrentPage=1&pagenationVO.rownumperpage=10&filter.commentFlag=0&filter.sortType=5&callback=comment_handler_success',
    # 'scheme':'https',
    'accept':'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript, */*; q=0.01',
    'accept-encoding':'gzip, deflate, br',
    'accept-language':'zh-CN,zh;q=0.9',
    # 'cookie':'provinceId=2; cityId=2817; yhd_location=2_2817_51973_0; __jdv=259140492|p.gouwuke.com|t_1000405356_983928|tuiguang|b22dbe2c70e64da99a35231903055b5f|1537925863174; cart_num=0; cart_cookie_uuid=0201a013-52f4-41a2-b078-d325bdfe9ca2; JSESSIONID=AB3D146A34F5049DE850B10E492FE657.s1; __jda=218172059.1537925863173238682329.1537925863.1537925863.1537925863.1; __jdb=218172059.7.1537925863173238682329|1.1537925863; __jdc=218172059',
    # 'if-modified-since':'Wed, 26 Sep 2018 01:49:54 GMT',
    'referer':'https://item.yhd.com/7701040104.html',
    'user-agent':'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36',
    'x-requested-with':'XMLHttpRequest'
}

url = 'https://item.yhd.com/squ/comment/getCommentDetail.do?{}'.format(getUrlWithPars(par))
# url = 'https://search.yhd.com/searchPage/c0-0/mbname%E8%8E%AB%E6%96%AF%E5%88%A9%E5%AE%89%20%E5%8F%8C%E5%8F%91%E9%85%B5%E9%85%B8%E4%B9%B3-b/a-s2-v4-p1-price-d0-f0b-m1-rt0-pid-mid0-color-size-k%E8%8E%AB%E6%96%AF%E5%88%A9%E5%AE%89%20%E5%8F%8C%E5%8F%91%E9%85%B5%E9%85%B8%E4%B9%B3/?&isGetMoreProducts=1&moreProductsFashionCateType=2&fashionCateType=2'
print(url)
html = requests.get(url=url,headers=headers)
print(len(html.text))
print(html.text)