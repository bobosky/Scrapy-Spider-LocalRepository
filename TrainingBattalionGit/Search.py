#-*- encoding: utf-8 -*-
import datetime
from Sorting import BubbleSorting

#顺序检索-无序
def SequenceSearch(list,value):
    for position in range(0,len(list)):
        if list[position]==value:
            print('SequenceSearch---->>{value}:{position}'.format(value=value,position=position))
            return
    print('there is not value match.')

#二分查找-有序-普通版
def BinarySearch_Normal(list,value):
    left=0
    right=len(list)-1
    while left<=right:        #区间存在，即使只有一个元素
        mid=(left+right)//2   # // 取整除 - 返回商的整数部分
        if value>list[mid]:
            left=mid+1
        if value<list[mid]:
            right=mid-1
        if value==list[mid]:
            print('BinarySearch_Normal---->>{value}:{position}'.format(value=value, position=mid))
            return



testlist = [50056,12,34,55,44555,2355,77,33,4,10004,6,8,2,43,32,3,5.6,100,30,666,4343,4546,234,445500606]

print(testlist)
SequenceSearch(testlist,10004)
BinarySearch_Normal(BubbleSorting(testlist),4546)


