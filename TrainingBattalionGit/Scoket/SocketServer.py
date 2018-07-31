#-*- encoding: utf-8 -*-

import optparse,socket,os,sys,pickle

# dataStc={
#     'filename':'',
#     'binaryBody':''
# }

def parseArgs():
    usage='''
    ------------------------------------------------------------------------
    |                 This is Zhu Zhiming's Server                       |
    |                      hahahahahhaahahaha                              |                              
    ------------------------------------------------------------------------
    '''
    parse = optparse.OptionParser(usage=usage)

    helpstr='This is argurment for port setting'
    parse.add_option('--port',type='int',help=helpstr)

    helpstr='This is argurment for host setting'
    parse.add_option('--host',default='127.0.0.1',help=helpstr)

    helpstr='This is length of reading file bytes setting'
    parse.add_option('--len',default=10,help=helpstr)

    options,args=parse.parse_args()

    if not args:
        # parse.error('command need the poetrypath!please input correctly')
        sys.stderr.write('command need the poetryName!please input correctly\n')
        sys.exit(0)

    filepath=args[0]
    if not os.path.exists(filepath):
        sys.stderr.write("the file doesn't exists\n")
        sys.exit(0)

    return options,filepath

def severing(listing_sock,filepath,len):
    while True:
        conn_sock,cli_addr=listing_sock.accept()
        print('Someone address:{cli_addr} want the poetry!'.format(cli_addr=cli_addr))
        sendmsg(conn_sock=conn_sock,filepath=filepath,len=len)
        conn_sock.close


def sendmsg(conn_sock,filepath,len):
    with open(filepath) as f:
        f.seek(0)
        dataDic = {'filename': None, 'binaryBody': None}
        dataDic['filename'] = filepath.strip().split('/')[-1]
        while True:
            dataDic['binaryBody']=f.read(len).encode('utf-8')
            print(dataDic)
            # bdata=pickle.dump(dataDic)
            bdata=pickle.dumps(dataDic)

            if not bdata:
                conn_sock.close()
                break
            else:
                print('Sentting the msg')
                try:
                    conn_sock.sendall(bdata)
                except socket.error:
                    conn_sock.close
                    break

if __name__=='__main__':

    opts,filepath=parseArgs()
    sock = socket.socket(family=socket.AF_INET,type=socket.SOCK_STREAM)

    sock.bind((opts.host,opts.port or 0)) #opts->{'port': 12345, 'host': '127.0.0.1', 'len': 10}

    sock.listen(5)
    print('Serving at host:{host}  port: {port}'.format(host=sock.getsockname()[0],port=sock.getsockname()[1])) #getsockname()->('127.0.0.1', 12345)
    severing(sock,filepath,opts.len)





