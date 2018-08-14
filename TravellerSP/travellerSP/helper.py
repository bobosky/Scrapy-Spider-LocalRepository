import time


def get_locationtime():
    return time.strftime('%Y-%m-%d', time.localtime())

def get_createtime(secs):
    return time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(int(secs)))

