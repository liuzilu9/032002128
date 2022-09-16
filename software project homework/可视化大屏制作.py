from flask import Flask
from flask import render_template
from flask import jsonify
import requests
import time
from lxml import etree
import re
#导入flask框架
app = Flask(__name__)
dic = {}

#加载网页
@app.route('/')
def hello():
    return render_template('index.html')

#ajax传参
@app.route('/data')
def get_data():
    return jsonify(dic)

if __name__ == "__main__":

    # UA伪装
    headers = {
        "Accept": "image/avif,image/webp,*/*",
        "Accept-Encoding": "gzip, deflate",
        "Accept-Language": "zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2",
        "Connection": "keep-alive",
        "Referer": "http://www.nhc.gov.cn/",
        "Cookie": "yfx_c_g_u_id_10006654=_ck22090517092711557123132504572; yfx_f_l_v_t_10006654=f_t_1662368967158__r_t_1662514638127__v_t_1662514638127__r_c_2; yfx_mr_10006654=%3A%3Amarket_type_free_search%3A%3A%3A%3Abaidu%3A%3A%3A%3A%3A%3A%3A%3Awww.baidu.com%3A%3A%3A%3Apmf_from_free_search; yfx_mr_f_10006654=%3A%3Amarket_type_free_search%3A%3A%3A%3Abaidu%3A%3A%3A%3A%3A%3A%3A%3Awww.baidu.com%3A%3A%3A%3Apmf_from_free_search; yfx_key_10006654=; sVoELocvxVW0S=57yh5eHi6BlWwbYuOEUHFMNXf_2SF8UL5VWS1759zdOiiImwtyLuvBL1rWffIpGlLnMEMoxnpQBHoAej5Qug.gG; security_session_verify=fc465e4f1828940ec0438b63374ada0a; sVoELocvxVW0T=53SI0.DWUeQ7qqqDkmRH3_AToYARjKiHRH568jKOM4B.OPNB2axXw5kqAtweBhHBYQOYh3hRO8OaMl8SZuRBb4HDDy8wWx_H9KnDMJfOHJhLKqwvylr_gmnhMbVf7Xl1INInmRUZl8aTrrguv1MWZmyUOXCgg2aOx6_4J72Gm.uCLEdwxtjF7hWLGGpO..CyBUuKFNGN8o.f7i5cTf3DueMgKy959yMbnxH14vnDsH.wVdK4nQbz4PLAMqYCxYgwjT4eY2xujVIScYsPVxnC5uNL45UyizBvMCagu5cjSPGfoWPa5mHqCrzryZOZ96c0axMDYQTxAdJ7LeVECT_l6vDQTiBIU5G26AzdTJ07AoQza; insert_cookie=91349450",
        "Hosts": "www.nhc.gov.cn",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:104.0) Gecko/20100101 Firefox/104.0"
    }
    #卫健委疫情通报主页
    home_url = "http://www.nhc.gov.cn/xcs/yqtb/list_gzbd.shtml"
    #获取页面
    response = requests.get(url=home_url, headers=headers)
    time.sleep(0.5)
    page_text = response.text
    for length in range(1, 2):
        url = format("http://www.nhc.gov.cn/xcs/yqtb/list_gzbd_%d.shtml" % length)
        if (length == 1):
            url = home_url
        #获取最新一页的数据
        response = requests.get(url=url, headers=headers)
        time.sleep(0.5)
        page_text = response.text
        tree = etree.HTML(page_text)
        #找到每日详情链接
        li_list = tree.xpath('//div[@class="w1024 mb50"]/div[@class="list"]/ul/li')
        length = len(li_list)
        new_url = []
        for i in range(1, 2):
            str1 = format('//div[@class="w1024 mb50"]/div[@class="list"]/ul/li[%d]/a/@href' % i)
            #拼接得到每日详情链接
            new_url.append("http://www.nhc.gov.cn" + tree.xpath(str1)[0])
        for i in new_url:
            #获取详情页网页
            response = requests.get(url=i, headers=headers)
            time.sleep(0.5)
            page_text = response.text
            tree = etree.HTML(page_text)
            #获取详情页文本
            text_list = tree.xpath(
                './body/div[@class="w1024 mb50"]/div[@class="list"]/div[@id="xw_box"][@class="con"]/p//text()')
            text = "".join(text_list)
            #正则表达式匹配
            ex1 = "(?<=新增确诊病例)\d+(?=例)"
            ex2 = "(?<=新增无症状感染者)\d+(?=例)"
            new = re.findall(ex1, text, re.S)
            asymptomatic = re.findall(ex2, text, re.S)
            if not new:
                new = ""
            else:
                new = int(new[0])
            if not asymptomatic:
                asymptomatic = 0
            else:
                asymptomatic = int(asymptomatic[0])
            #将需要的数字写入字典
            dic['confirm'] = new
            dic['asymptomatic'] = asymptomatic
        #运行flask框架
        app.run()