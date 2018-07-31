#-*- encoding: utf-8 -*-
import socket,datetime,optparse,sys,select,pickle

def optionparse():
    usage = '''
    ---------------------------------------------------------------------
    |                 This is Zhu Zhiming's Client                      |
    |                      hahahahahhaahahaha                           |                              
    ---------------------------------------------------------------------
    '''

    oparse=optparse.OptionParser(usage=usage)

    helpstr='setting the max lenght times for recving'
    oparse.add_option('--lenght',type='int',default=1,help=helpstr)

    opts,args=oparse.parse_args()

    if not args:
        sys.stderr.write("Lost the host:port to connect\n")
        sys.exit(0)

    return opts,args

def connection(address):
    cli_socket=socket.socket(family=socket.AF_INET,type=socket.SOCK_STREAM)
    try:
        cli_socket.connect((address['host'],address['port'])) #参数是一个元组
        cli_socket.setblocking(0) #设置插座连接模式为非阻塞式
    except socket.error:
        print('Connection error {host}:{port}'.format(host=address['host'],port=address['port']))
    return cli_socket

def format(addrs):
    list=[]
    for addr in addrs:
        if ':' not in addr:
            dic={'host':None,'port':None}
            dic['host']='127.0.0.1'
            dic['port']=int(addr)
            list.append(dic)
    return list

def getdata(sockets,l):
    #每读完一个socket,就从sockets列表剔除
    while sockets:
        readale_socks,_,_ = select.select(sockets,[],[])

        for sk in readale_socks:
            while True:
                try:
                    addr=sk.getsockname()
                    msg=pickle.loads(sk.recv(1024*l))

                    if not msg['binaryBody']:
                        sockets.remove(sk)
                        sk.close
                        print('finish: '+str(addr))
                        break
                    print('got the {len} bytes from {host}:{port}'.format(len=len(msg['binaryBody']),host=addr[0],port=addr[1]))
                    print(msg['binaryBody'])
                except:
                    print('get data error')
                    sockets.remove(sk)
                    sk.close()
                    break


if __name__=='__main__':
    opts,args=optionparse()
    addresses=format(args)  #{'host': '127.0.0.1', 'port': 34443}
    cli_socks=map(connection,addresses)

    getdata(sockets=list(cli_socks),l=opts.lenght)
