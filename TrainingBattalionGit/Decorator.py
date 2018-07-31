#-*- encoding: utf-8 -*-
import Ajax
import time

# def test(func):
#     return func
#
# x = [2,4,54,54,32,8,66]
# def llll():
#     for u in enumerate(x):
#         print(u)
#     return
#
# Ajax.callfunc(llll())

def use_logging(func):
    def warpper():
        func()
        print('use_logging is running')
    return warpper

def iii(func):
    def warpper():
        func()
        print('iii is running')
    return warpper

@use_logging
@iii
def test():
    print('i am test function!!')

test()


#当一个生成器函数调用yield，生成器函数的“状态”会被冻结，
# 所有的变量的值会被保留下来，下一行要执行的代码的位置也会被记录，
# 直到再次调用next()。一旦next()再次被调用，生成器函数会从它上次离开的地方开始。
# 如果永远不调用next()，yield保存的状态就被无视了。
def count(n):
    print('count:')
    while n>0:
        n-=1
        yield n

generator_n = count(10)
try:
    while True:
        print(generator_n.__next__()) #generator_n.__next__()启动生成器
except StopIteration:
    generator_n.close()
    print('StopIteration')

#————————————————————————————————————————————————————————————————————————————————————————————————————————————

def generator_send(n):
    while n>0:
       m = yield n
       n = n-m
generator_s = generator_send(10)
try:
    print(generator_s.send(None)) #用send()启动生成器，获得第一个生成值,使用send()启动生成器必须传入空值
    # print(generator_s.__next__()) #用__next__()启动生成器，获得第一个生成值
    while True:
        print(generator_s.send(3))#每次调用send()的时候，生成器先执行yield n抛出结果，然后执行m = yield获取send()参数
except StopIteration:
    generator_s.close()
    print('StopIteration send()')

s=set([2,34,54,3,5])
s.add(2000) #只能添加一个元素
s.update([45,66,334,555]) #添加多项
print(s)