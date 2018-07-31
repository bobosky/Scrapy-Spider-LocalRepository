#-*- encoding: utf-8 -*-

from twisted.internet import reactor
import traceback

def helloTwisted():
    print('hello Twisted')
    reactor.stop()
    # traceback.print_stack()

class fff():
    count = 5
    def counter(self):
        if self.count==0:
            reactor.stop()
        else:
            self.count-=1
            print(self.count)
            reactor.callLater(1,self.counter)

def raiseException():
    raise Exception('fall down')

def falldown():
    raise Exception('I fall down.')

def upagain():
    print('But I get up again.')
    reactor.stop()

#默认使用selectReactor
# reactor.callWhenRunning(fff().counter)
# reactor.callWhenRunning(raiseException())
reactor.callWhenRunning(falldown)
reactor.callWhenRunning(upagain)

print('Start running reactor')
reactor.run()
