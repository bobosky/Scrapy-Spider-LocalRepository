import socket,optparse,sys,pickle,datetime

# dataStc={
#     'filename':'',
#     'binaryBody':''
# }

def optionparse():
    usage = '''
    ---------------------------------------------------------------------
    |                 This is Zhu Zhiming's Client                      |
    |                      hahahahahhaahahaha                           |                              
    ---------------------------------------------------------------------
    '''
    oparse=optparse.OptionParser(usage=usage)

    helpstr='This is the port connect to server'
    oparse.add_option('--port',type='int',help=helpstr)

    helpstr='This is the host connect to server.default is 127.0.0.1'
    oparse.add_option('--host',default='localhost',help=helpstr)

    helpstr='setting the max lenght times for recving'
    oparse.add_option('--lenght',type='int',default=1,help=helpstr)


    opts,args=oparse.parse_args()

    # if not opts.port:
    #     sys.stderr.write("Please confirm the server's host\n")
    #     sys.exit(0)

    if not args:
        sys.stderr.write("Lost the host:port to connect\n")
        sys.exit(0)

    # elif not os.path.isdir(args[0]):
    #     os.mkdir(args[0])
    return opts,args

def getdata(sock,lenght):
    while True:
        jsondata = sock.recv(1024*lenght)
        data = pickle.loads(jsondata)

        if not data['binaryBody']:
            sock.close()
            break

        info=sock.getsockname()
        print('got {len} bytes from {host}:{port}'.format(len=len(data),host=info[0],port=info[1]))
        # filename = data['filename']
        # content = data['binaryBody']
        # with open(str(dirpath+'/'+filename),'a+') as f:
        #     f.write(content)

def format(addrs):
    list=[]
    for addr in addrs:
        if ':' not in addr:
            dic={'host':None,'port':None}
            dic['host']='127.0.0.1'
            dic['port']=int(addr)
            list.append(dic)
    return list

if __name__=='__main__':
    options,args=optionparse()
    addrs=format(args)
    for addr in addrs:
        cli_sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        start = datetime.datetime.now()
        try:
            cli_sock.connect((addr['host'],addr['port'])) #成功返回0，失败返回errno的值。
            print('Connected server {host}:{port}'.format(host=addr['host'],port=addr['port']))
            getdata(sock=cli_sock,lenght=options.lenght)
        except socket.error:
            sys.stderr.write('Connection error\n')
            cli_sock.close()

        elapsed = datetime.datetime.now()-start
        print('cost the time:'+str(elapsed))







