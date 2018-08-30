import time,requests,re,json


def get_locationtime():
    return time.strftime('%Y-%m-%d', time.localtime())

def get_createtime(secs):
    return time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(int(secs)))

class Redis_proxy:
    # def __init__(self):
    #     self.pool = redis.ConnectionPool(max_connections=5,host='13.230.98.46',port=6379)
    #     self.rescli = redis.Redis(connection_pool=self.pool)

    def run(self):
        # self.rescli.ltrim('queue:ippool',1,0) #清空key,ltrim key start end 中的start要比end大即可，数值且都为正数。
        print('更新代理池中。。。。。。。。。。')
        while True:
            response = requests.get(url='http://s.zdaye.com/?api=201803081111195429&px=1').text
            if re.findall('<bad>', response):
                time.sleep(5)
                continue
            if re.findall('<html>', response):
                time.sleep(5)
                continue

            ips = response.splitlines()
            for i in range(0, 5):
                tmp = ips[i].split(':')
                ips[i] = '{ip}:{port}'.format(ip=tmp[0], port=tmp[1])
            break
        print('更新代理池完毕', ips)
        return ips