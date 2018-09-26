//dtype  = a 今日头条 b百度 c搜狗 d一点资讯 z文章 t今日头条文章 -B百度入口
//东南;三菱;V3菱悦;V5菱致;V6菱仕;得利卡;东南DX7;东南DX3;风迪思;蓝瑟;戈蓝;翼神
function return_cell() {
	this.error = "";
	this.warn = "";
	this.urllinks = "";
	this.content = "";
	this.strs4 = "";
	this.schreg = /东南汽车|dx[37]|东南三菱|V3菱悦|V5菱致|V6菱仕|翼神|蓝瑟|三菱君阁|君阁[\S]*车|戈蓝/i;
	this.maxstep = 5; 
	this.delhref = /\.amazon\.|\.zhihu\.com\/question|\.51job\.|baike\.sogou\.|\.somode\.|\.xinjiaoyuw\.|eecdui\.|chi\.rnbh\.|zj201999\.|gamo168\.|gusdf\.|h5117\.|jscwsh\.|etaxyl\.|xxxvkn\.|kunming0778|price\/series|\/list\/|(db|db\.m)\.auto\.sohu|(price|koubei)\.16888|16888\.com[\S]*\/youhao\/|(db|usedcar)\.auto\.sina|(dealer|newcar)\.xcar\.com|data\.auto\.qq/;
}

function getdate(time) {
	var date = new Date(); //获取当前时间
	var month = date.getMonth() + 1;
	var day = date.getDate(); //今天
	var day2 = date.getDate() - 1; //昨天
	var hours = date.getHours();
	var min = date.getMinutes();
	var second = date.getSeconds();
	var date2 = date.getFullYear() + "-" + month + "-" + day2 + ' ' + hours + ':' + min + ':' + second;
	date = date.getFullYear() + "-" + month + "-" + day + ' ' + hours + ':' + min + ':' + second;

	timebeg = Date.parse((date2).replace(/-/g, '/')) / 1000;
	timeend = Date.parse((date).replace(/-/g, '/')) / 1000;
	time = new Array(timebeg, timeend);
	return time;
}


//https://www.toutiao.com/search_content/?offset=20&format=json&keyword=%E4%B8%9C%E5%8D%97%E6%B1%BD%E8%BD%A6&autoload=true&count=20&cur_tab=1&from=search_tab
function addlinktoutiao(rval, schword, timebeg, timeend, dtype, schdeep) { //a 今日头条
    if (!schdeep) schdeep = 0;
    if (dtype.indexOf("a") >= 0) return rval; 
    rval.urllinks += '<a href="https://www.toutiao.com/search_content/?offset=0&format=json&keyword=' + schword + '&autoload=true&count=20&cur_tab=1&from=search_tab" set="notescape">abcd(' + schdeep + ')#' + schword + '</a>';
	return rval;
}
function addlinkbaidu(rval, schword, timebeg, timeend, dtype, schdeep) { //b 百度
    if (!schdeep) schdeep = 0;
    if (dtype.indexOf("b") >= 0) return rval;
	rval.urllinks += '<a href="https://www.baidu.com/s?wd=' + schword + '&pn=0&oq=' + schword + '&tn=SE_PSStatistics_p1d9m0nf&ie=utf-8&rsv_pq=f644d0e600036362&rsv_t=3e9fKizGHRJkrxdVXwNn3GXaBwZWsDI%2FfkpbPJGLsRyRNCdQXFVN9F%2FGMJQrtCsNBeVGLuludzEK6JhTe%2Fef&gpc=stf%3D' + timebeg + '%2C' + timeend + '%7Cstftype%3D1&tfflag=1">b1acd(' + schdeep + ')#' + schword + '</a>'; //百度搜索一天内网页链接
	rval.urllinks += '<a href="http://news.baidu.com/ns?word=' + schword + '&bs=' + schword + '&sr=0&cl=2&rn=20&tn=news&ct=0&clk=sortbytime">b2acd(' + schdeep + ')#' + schword + '</a>'; //百度搜索新闻链接按时间排序
	return rval;
}
function addlinksogou(rval, schword, timebeg, timeend, dtype, schdeep) { //c 搜狗 //2018-05-17 搜狗增加限制，必须标题符合 关键字才再次搜索
    if (!schdeep) schdeep = 0;
    if (dtype.indexOf("c") >= 0 || schword.search(rval.schreg) < 0) return rval;
	rval.urllinks += '<a href="https://www.sogou.com/web?query=' + schword + '&sugtime=' + timebeg + '&s_from=result_up&ie=utf8&sst0=' + timeend + '&cid=&sourceid=inttime_day&tsn=1">c1abd(' + schdeep + ')#' + schword + '</a>'; // 搜狗搜索网页一天内链接
	rval.urllinks += '<a href="http://news.sogou.com/news?query=' + schword + '&_ast=' + timebeg + '&_asf=news.sogou.com&time=0&sort=1&mode=1&manual=&dp=1">c2abd(' + schdeep + ')#' + schword + '</a>'; //搜狗搜索新闻链接按时间排序
	return rval;
}
//https://www.toutiao.com/search_content/?offset=20&format=json&keyword=%E4%B8%9C%E5%8D%97%E6%B1%BD%E8%BD%A6&autoload=true&count=20&cur_tab=1&from=search_tab
function addlinkyidian(rval, schword, timebeg, timeend, dtype, schdeep) { //d 一点资讯
    if (!schdeep) schdeep = 0;
	if (dtype.indexOf("d") >= 0)return rval;
	rval.urllinks += '<a href="http://www.yidianzixun.com/home/q/news_list_for_keyword?display=' + schword + '&cstart=0&cend=10&word_type=token&multi=5&appid=web_yidian" set="notescape">dabc(' + schdeep + ')#' + schword + '</a>';
	return rval;
}
function addlinks(rval, schword, timebeg, timeend, dtype) {
    var schdeep = 0;
    var scsdeepmath = dtype.match(/\(\d+?\)/);
    if (scsdeepmath != null && scsdeepmath[0].length > 2) schdeep = parseint(scsdeepmath[0].substring(1, scsdeepmath[0].length - 1));
    if (schdeep > rval.maxstep) return false;
    ++schdeep;
    schword = schword.replace(/\"|\'/g, " ");
    var schwordsplits = schword.split(/:|：|-|_|—|《|》|\||【|】|[|]|\\|\/|;|,|，|。| |#|@|&/);
    for (var si = 0; si < schwordsplits.length; ++si) {
        var schwordsplit = schwordsplits[si];
        if (schwordsplit.length > 1) {
            rval = addlinktoutiao(rval, schwordsplit, timebeg, timeend, "", schdeep);
            rval = addlinkbaidu(rval, schwordsplit, timebeg, timeend, "", schdeep);
            rval = addlinksogou(rval, schwordsplit, timebeg, timeend, "", schdeep);
            rval = addlinkyidian(rval, schwordsplit, timebeg, timeend, "", schdeep);
        }
    }
	return true;
}

//百度搜索结果网页
//https://www.baidu.com/s?ie=utf-8&f=3&rsv_bp=0&rsv_idx=1&tn=baidu&wd=%E4%B8%89%E8%8F%B1%E6%B1%BD%E8%BD%A6&rsv_pq=df685a240002be95&rsv_t=42d0Do7c5gvjbu7IwVJY%2BCIn3d6icgKEcZ6PzKFEZDNlqb42e3GepYrmHPo&rqlang=cn&rsv_enter=1&rsv_sug3=4&rsv_sug1=4&rsv_sug7=100&rsv_sug2=0&prefixsug=sanl&rsp=2&inputT=3569&rsv_sug4=3569&rsv_sug=1
//https://www.baidu.com/s?ie=utf-8&f=3&rsv_bp=0&rsv_idx=1&tn=baidu&wd=%E4%B8%89%E8%8F%B1%E6%B1%BD%E8%BD%A6
function getlinkbaidubegin(urlname, urltitle, content, rval, timebeg, timeend) {
    if (urltitle.charAt(0) != 'B') return rval;
    var strword = getstrinser(urlname, "&wd=", "&");
    if (strword.length == 0) strword = getstrinser(urlname, "&wd=", "");
	if (strword.length > 0){
		rval = addlinks(rval, strword, timebeg, timeend, "");
	}
	return rval;
}
//今日头条
//今日头条文章初始连接:https://www.toutiao.com/api/pc/feed/?category=news_car&utm_source=toutiao&widen=1&max_behot_time=0&max_behot_time_tmp=0&tadrequire=true&as=A1D58AF2D41DFBE&cp=5A24ED8F0B1E8E1&_signature=chbSXQAAKDT91XYsPQ1BlXIW0k
//搜索东南汽车起始链接: https://www.toutiao.com/search_content/?offset=20&format=json&keyword=%E4%B8%9C%E5%8D%97%E6%B1%BD%E8%BD%A6&autoload=true&count=20&cur_tab=1&from=search_tab
//                      https://www.toutiao.com/search_content/?offset=100&format=json&keyword=2018%E6%88%90%E9%83%BD%E7%A7%9F%E4%B8%89%E8%8F%B1%E5%B8%95%E6%9D%B0%E7%BD%97%E8%87%AA%E9%A9%BE%E5%B7%9D%E8%97%8F%E7%BA%BF%E4%BB%B7%E6%A0%BC%E5%A4%A7%E6%A6%82%E6%98%AF%E5%A4%9A%E5%B0%91&autoload=true&count=20&cur_tab=1&from=search_tab
function getlinktoutiao(urlname, urltitle, content, rval, limittime) {
    if (urltitle.substr(0, 1) != 'a') return rval;
    if (content.indexOf("<title>504 Gateway Time-out</title>") > 0) {
        rval.error = "download 504 err";
        return rval;
    }
    var dtype = getstrinser(urltitle, "", "#");
    //var jsonobj = eval("(" + content + ")");
    var jsonobj = JSON.parse(content.replace(/([^\\])":[\s]*([0-9]+)[\s]*(,|]|})/g, '$1":"$2"$3'));
    var nextOne = false;
    var min_behot_time = "";
    for (var obji = 0; obji < jsonobj.data.length; ++obji) {
        var curcomment = jsonobj.data[obji];
        //最新回复时间 提取评论链接
        //http://isub.snssdk.com/article/v1/tab_comments/?group_id=6547467034068779528&item_id=6547467034068779528&aggr_type=1&count=20&offset=0&tab_index=1&iid=30450224889
        var ispinglun = false;
        if (curcomment.behot_time != null) {
            min_behot_time = curcomment.behot_time;
            if (isneedgeturl_stdtime(min_behot_time, limittime, 86400)) {
                nextOne = true;
                ispinglun = true;
                var strtitle = "c";
                if (curcomment.publish_time != null) strtitle += "《S6a》" + timetrtostdstr(curcomment.publish_time) + "《/S6a》";
                strtitle += "#^";
                if (curcomment.share_info != null && curcomment.share_info.title != null) strtitle += curcomment.share_info.title;
                else if (curcomment.title != null) strtitle += curcomment.title;
                if (curcomment.comment_count != null && curcomment.comment_count != "0" && curcomment.group_id != null) {
                    var intoffset = 0;//Math.floor((parseInt(curcomment.comment_count) - 1) / 20) * 20
                    //rval.urllinks += '<a href="http://isub.snssdk.com/article/v1/tab_comments/?group_id=' + curcomment.group_id + '&item_id=' + curcomment.group_id + '&aggr_type=1&count=20&offset=' + intoffset + '&tab_index=1&iid=30450224889&device_id=50971784000&aid=13&app_name=news_article" set="notescape">' + strtitle + '</a>';
                }
            }
        }
        //发表时间 提取文章内容
        //http://a3.pstatp.com/article/content/11/1/6548582278858015240/6548582278858015240/1/?iid=30450224889
        if (curcomment.publish_time != null) {
            if (ispinglun || isneedgeturl_stdtime(curcomment.publish_time, limittime, 86400)) {
                nextOne = true;
                var strtitle = "";
                if (curcomment.has_video != null && curcomment.has_video) strtitle += "《S3a》文章视频《/S3a》";
                else strtitle += "《S3a》文章《/S3a》";
                if (curcomment.read_count != null) strtitle += "《S11》" + curcomment.read_count + "《/S11》";
                if (curcomment.comment_count != null) strtitle += "《S12》" + curcomment.comment_count + "《/S12》";
                if (curcomment.digg_count != null) strtitle += "《S13》" + curcomment.digg_count + "《/S13》";
                if (curcomment.user_info != null) {
                    if (curcomment.user_info.user_id != null) strtitle += "《G0》" + curcomment.user_info.user_id + "《/G0》";
                    if (curcomment.user_info.name != null) strtitle += "《G1》" + curcomment.user_info.name + "《/G1》";
                }
                strtitle += "#^";
                if (curcomment.share_info != null && curcomment.share_info.title != null) strtitle += curcomment.share_info.title;
                else if (curcomment.title != null) strtitle += curcomment.title;
                if (curcomment.group_id != null) {
                    rval.urllinks += '<a href="http://a3.pstatp.com/article/content/11/1/' + curcomment.group_id + '/' + curcomment.group_id + '/1/?iid=30450224889" set="notescape|dumphistory">t' + strtitle + '</a>';
                }
            }
        }
    }
    if (nextOne && min_behot_time.length > 0) {
        var nexturl = getstrouter(urlname, "", "max_behot_time=");
        if (nexturl.length > 0) rval.urllinks += '<a href="' + nexturl + min_behot_time + '" set="notescape">' + urltitle + '</a>';
    }
    return rval;

    //rval.content += "\r\na" ;
    //rval.warn += "\r\n";
    //for (var key in jsonobj) {
    //    rval.warn += key + ":" + jsonobj[key].length + "\r\n";
    //}
    //return rval;
    //if (urlname.indexOf("/search_content/") < 0) return rval;
    var jsondata = jsonobj.data;
    if (jsondata.length == 0) return rval;
    var needtonextpage = false;
    for (var urli = 0; urli < jsondata.length; urli++) {
        var curdata = jsondata[urli];

        //rval.content += "\r\na" + urli;
        //rval.warn += "\r\n";
        //for (var key in curdata) {
        //    rval.warn += key + ":" + curdata[key] + "\r\n";
        //}
		if (curdata.group_id == undefined || curdata.title == undefined) continue;
        var istarget = false;
        if (!istarget && curdata.media_name != undefined && curdata.media_name.search(rval.schreg) != -1) istarget = true;
        if (!istarget && curdata.abstract != undefined && curdata.abstract.search(rval.schreg) != -1) istarget = true;
        if (!istarget && curdata.keywords != undefined && curdata.keywords.search(rval.schreg) != -1) istarget = true;
        if (!istarget && curdata.title != undefined && curdata.title.search(rval.schreg) != -1) istarget = true;
        if (!istarget && curdata.source != undefined && curdata.source.search(rval.schreg) != -1) istarget = true;
        //if (istarget){
        //    if (curdata.create_time != undefined && curdata.create_time.length > 0){
		//		if (!isneedgeturl_stdtime(curdata.create_time, limittime)) istarget = false;
		//	}
        //    else if (curdata.datetime != undefined && curdata.datetime.length > 0 && !isneedgeturl_stdtime(curdata.datetime, limittime)) istarget = false;
        //}
        if (!istarget) continue;
        var strs6 = "";
        if (curdata.create_time != undefined) strs6 = timetrtostdstr(curdata.create_time.toString());
        else if (curdata.datetime != undefined) strs6 = timetrtostdstr(curdata.datetime);
        else if (curdata.behot_time != undefined) strs6 = timetrtostdstr(curdata.behot_time.toString());
        if (strs6.length == 0 || !isneedgeturl_stdtime(strs6, limittime, 86400)) continue;
        needtonextpage = true;
        if ((curdata.has_video == undefined || !curdata.has_video) && curdata.title.length > 0 && countzhchar(curdata.title) > 3) {//非视频
            //if (curdata.url.indexOf("toutiao.com") < 0 && curdata.share_url != undefined && curdata.share_url.indexOf("toutiao.com") >= 0) rval.urllinks += '<a href="' + curdata.share_url + '">t#' + curdata.title + '</a>';
            //else rval.urllinks += '<a href="' + curdata.url + '" set="dumphistory">t' + dtype + '#' + curdata.title + '</a>';
            rval.urllinks += '<a href="https://www.toutiao.com/a' + curdata.group_id + '/" set="dumphistory">t' + dtype + '#' + curdata.title + '</a>';
        }
        else {
            var strcomtotal = "《Root》";
            if (curdata.group_id != undefined) strcomtotal += "《S0》" + curdata.group_id + "《/S0》";
            else if (curdata.item_id != undefined) strcomtotal += "《S0》" + curdata.item_id + "《/S0》";

            //if (curdata.url.indexOf("http:") < 0) curdata.url = "https://www.toutiao.com" + curdata.url;
            strcomtotal += "《S1》https://www.toutiao.com/a" + curdata.group_id + "《/S1》《S2》今日头条《/S2》《S3a》视频《/S3a》《S5》" + datetostdstr(new Date()) + "《/S5》";
            if (curdata.keywords != undefined && curdata.keywords.length > 0) {
                strcomtotal += "《S3c》" + curdata.keywords + "《/S3c》";
            }
            if (curdata.title != undefined) strcomtotal += "《S4》" + curdata.title + "《/S4》";
            if (strs6.length > 0) strcomtotal += "《S6》" + strs6 + "《/S6》";
            strcomtotal += "《S9》1《/S9》《ID》1《/ID》";
            if (curdata.play_effective_count != undefined) strcomtotal += "《S11》" + curdata.play_effective_count + "《/S11》";
            if (curdata.comments_count != undefined) strcomtotal += "《S12》" + curdata.comments_count + "《/S12》";
            if (curdata.abstract != undefined) strcomtotal += "《Q1》" + curdata.abstract + "《/Q1》";
            if (curdata.source != undefined) strcomtotal += "《G1》" + curdata.source + "《/G1》";
            else strcomtotal += "《G1》匿名《/G1》";
            rval.content += strcomtotal + "《/Root》";
        }
    }
    var nextPage = getstrinser(urlname, '?offset=', '&format');
    if (needtonextpage || nextPage == "0") {
        var pageTitle = getstrinser(urlname, 'keyword=', '&autoload');
        if (!isNaN(parseInt(nextPage))) {
            nextPage = parseInt(nextPage) + 20;
            rval.urllinks += '<a href="https://www.toutiao.com/search_content/?offset=' + nextPage + '&format=json&keyword=' + pageTitle + '&autoload=true&count=20&cur_tab=1&from=search_tab" set="notescape">' + urltitle + '</a>';
        }
    }
    return rval;
}

//一点资讯
//一点资讯文章起始链接:http://www.yidianzixun.com/home/q/news_list_for_channel?channel_id=c11&cstart=0&cend=10&infinite=true&refresh=1&multi=5&appid=web_yidia
//搜索东南汽车起始链接: http://www.yidianzixun.com/home/q/news_list_for_keyword?display=%E4%B8%9C%E5%8D%97%E6%B1%BD%E8%BD%A6&cstart=0&cend=10&word_type=token&multi=5&appid=web_yidian
function getlinkyidian(urlname, urltitle, content, rval, limittime, timebeg, timeend) {
    if (urltitle.substr(0, 1) != 'd') return rval;
    var dtype = getstrinser(urltitle, "", "#");
    //var jsonobj = eval("(" + content + ")");
	var jsonobj = JSON.parse(content);

    //if (urlname.indexOf("/search_content/") < 0) return rval;
	var jsondata = jsonobj.result;

	if (jsondata.length == 0) return rval;
	var needtonextpage = false;
	for (var urli = 0; urli < jsondata.length; urli++) {
	    var curdata = jsondata[urli];

	    //rval.content += "\r\na" + urli;
	    //rval.warn += "\r\na" + urli;
	    //for (var key in curdata) {
	    //    rval.warn += key + ":" + curdata[key] + "\r\n";
	    //}

	    var strurl = "";
	    if (curdata.docid != undefined) strurl = "http://www.yidianzixun.com/article/" + curdata.docid;
	    if (strurl.length == 0 && curdata.url != undefined) strurl = curdata.url;

	    if (strurl.length == 0 || curdata.title == undefined) continue;
	    var strs6 = "";
	    if (curdata.date != undefined) strs6 = curdata.date;
	    if (strs6.length == 0 || !isneedgeturl_stdtime(strs6, limittime)) continue;
	    var istarget = false;
	    if (!istarget && curdata.title != undefined && curdata.title.search(rval.schreg) != -1) istarget = true;
	    if (!istarget && curdata.pageid != undefined && curdata.pageid.search(rval.schreg) != -1) istarget = true;
	    if (!istarget && curdata.summary != undefined && curdata.summary.search(rval.schreg) != -1) istarget = true;
	    if (!istarget && curdata.source != undefined && curdata.source.search(rval.schreg) != -1) istarget = true;
	    if (!istarget && curdata.category != undefined && curdata.category.search(rval.schreg) != -1) istarget = true;
	    //if (!istarget && curdata.vsct != undefined && curdata.vsct.search(rval.schreg) != -1) istarget = true;
	    if (istarget) {
	        if (curdata.date != undefined && curdata.date.length > 0 && !isneedgeturl_stdtime(curdata.date, limittime)) istarget = false;
	    }

	    if (!istarget) continue;
	    needtonextpage = true;
	    if ((curdata.video_url == undefined || curdata.video_url.length == 0) && curdata.title.length > 3 && countzhchar(curdata.title) > 3) {//非视频
	        //if (curdata.url.indexOf("toutiao.com") < 0 && curdata.share_url != undefined && curdata.share_url.indexOf("toutiao.com") >= 0) rval.urllinks += '<a href="' + curdata.share_url + '">t#' + curdata.title + '</a>';
	        //else
	        rval.urllinks += '<a href="' + strurl + '">z' + dtype + '#' + curdata.title + '</a>';
	    }
	    else {
	        var strcomtotal = "《Root》";
	        if (curdata.docid != undefined) strcomtotal += "《S0》" + curdata.docid + "《/S0》";
	        else strcomtotal += "《S0》" + getstrinser(strs6, "content?id=||article/", "") + "《/S0》";
	        if (strurl.indexOf("http:") < 0) strurl = "https://www.yidianzixun.com" + curdata.url;
	        strcomtotal += "《S1》" + strurl + "《/S1》《S2》一点资讯《/S2》《S3a》视频《/S3a》《S5》" + datetostdstr(new Date()) + "《/S5》";
	        //if (curdata.keywords != undefined && curdata.keywords.length > 0) {
	            //var strs3c = "";
	            //for (var s3ci = 0; s3ci < curdata.labels.keywords; ++s3ci) {
	            //    strs3c += curdata.labels[s3ci];
	            //}
	            //if (strs3c.length > 0) strcomtotal += "《S3c》" + curdata.strs3c + "《/S3c》";
	            //strcomtotal += "《S3c》" + curdata.keywords + "《/S3c》";
	        //}
	        if (curdata.title != undefined) strcomtotal += "《S4》" + curdata.title + "《/S4》";
	        if (strs6.length > 0) strcomtotal += "《S6》" + strs6 + "《/S6》";
	        strcomtotal += "《S9》1《/S9》《ID》1《/ID》";
	        if (curdata.comments_count != undefined) strcomtotal += "《S12》" + curdata.comments_count + "《/S12》";
	        if (curdata.summary != undefined) strcomtotal += "《Q1》" + curdata.summary + "《/Q1》";
	        if (curdata.source != undefined) strcomtotal += "《G1》" + curdata.source + "《/G1》";
	        else strcomtotal += "《G1》匿名《/G1》";
	        rval.content += strcomtotal + "《/Root》";
	    }

	}
	if (needtonextpage == true) {
	    var cstart = parseint(getstrinser(urlname, 'cstart=', '&')) + 10;
	    var cend = parseint(getstrinser(urlname, 'cend=', '&')) + 10;
	    if (cstart > 0 && cend > 0 && urlname.indexOf('news_list_for_channel') > 0) {
	        var channel = getstrinser(urlname, 'channel_id=', '&');
	        rval.urllinks += '<a href="http://www.yidianzixun.com/home/q/news_list_for_channel?channel_id=' + channel + '&cstart=' + cstart + '&cend=' + cend + '&infinite=true&refresh=1&multi=5&appid=yidian" set="notescape">' + urltitle + '</a>';
	    }
	    if (cstart > 0 && cend > 0 && urlname.indexOf('news_list_for_keyword?display=') > 0) {
	        var title = getstrinser(urlname, '?display=', '&cstart');
	        rval.urllinks += '<a href="http://www.yidianzixun.com/home/q/news_list_for_keyword?display=' + title + '&cstart=' + cstart + '&cend=' + cend + '&word_type=token&multi=5&appid=web_yidian" set="notescape">' + urltitle + '</a>';
	    }
	}
	return rval;
	var urltagbeg = '"result":';
	var urltagend = '"disable_op":';
	//var urltagsplit = '"extra"';
	var nextpage = false;
	var urlstrsub = getstrinser(content, urltagbeg, urltagend);
	if (content.indexOf(urltagsplit) < 0)return rval;
	if (urlstrsub.length > 0) {
	    var urlstrs = urlstrsub.split(/{[\"a-z:\[\],]*"date":"/i);
		for (var urli = 1; urli < urlstrs.length; urli++) {
			var urlstr = urlstrs[urli];
			var strarttime = getstrinser(urlstr, '', '",');
			if (strarttime.length == 0)rval.error += 'getlink0 无时间点,';
			if(strarttime.length > 0 && !isneedgeturl_stdtime(strarttime, limittime)) continue;
            nextpage=true;
			var urlhref = getstrinser(urlstr, '"url":"', '",');
			var title = getstrinser(urlstr, '"title":"', '",');
			// title = title.replace(/\?/g,'');
			if (urlhref.length > 0 && title.length > 0 && countzhchar(title) > 3) {
			    rval.urllinks += '<a href="' + urlhref + '" set="dumphistory">z' + dtype + '#' + title + '</a>';
			}
		}

		if (urlstrs.length == urli && nextpage == true) {
		    var cstart = parseint(getstrinser(urlname, 'cstart=', '&')) + 10;
		    var cend = parseint(getstrinser(urlname, 'cend=', '&')) + 10;
		    var channel = getstrinser(urlname, 'channel_id=', '&');
		    if (cstart > 0 && cend > 0 && urlname.indexOf('news_list_for_channel') > 0) {
		        rval.urllinks += '<a href="http://www.yidianzixun.com/home/q/news_list_for_channel?channel_id=' + channel + '&cstart=' + cstart + '&cend=' + cend + '&infinite=true&refresh=1&multi=5&appid=yidian" set="notescape">' + urltitle + '</a>';
		    }
		    if (cstart > 0 && cend > 0 && urlname.indexOf('news_list_for_keyword?display=') > 0) {
		        var title = getstrinser(urlname, '?display=', '&cstart');
		        rval.urllinks += '<a href="http://www.yidianzixun.com/home/q/news_list_for_keyword?display=' + title + '&cstart=' + cstart + '&cend=' + cend + '&word_type=token&multi=5&appid=web_yidian" set="notescape">' + urltitle + '</a>';
		    }
		}
	}
	return rval;
}

//百度搜索结果网页
function getlinkbaidu1(urlname, urltitle, content, rval, limittime, timebeg, timeend) {
	if (urltitle.substr(0, 2) != 'b1')return rval;
	var dtype = getstrinser(urltitle, "", "#");

	var schdeep = 0;
    var scsdeepmath = dtype.match(/\(\d+?\)/);
    if (scsdeepmath != null && scsdeepmath[0].length > 2) schdeep = parseint(scsdeepmath[0].substring(1, scsdeepmath[0].length - 1));

	var urltagbeg = 'id="content_left"';
	var urltagend = '<div id="content_bottom">';
	var urltagsplit = '<div class="result c-container';
    var urlstrsub = getstrinser(content, urltagbeg, urltagend);
    if (urlstrsub.length == 0) urlstrsub = getstrinser(content, urltagbeg, "");
	if (urlstrsub.length > 0) {
	    var urlstrs = urlstrsub.split(urltagsplit);
	    var neednextpage = false;
		for (var urli = 1; urli < urlstrs.length; urli++) {
		    var urlstr = urlstrs[urli];
		    var urlmsg = getstrinser(urlstr, '', '<div class="f13">');
		    if (urlmsg.length == 0) urlmsg = urlstr;
		    if (urlmsg.length > 0 && urlmsg.search(rval.schreg) == -1) continue;
		    var strs6 = getstrinser(urlstr, "newTimeFactor_before_abs&&>", "</span>");
		    if (strs6.length > 0 && !isneedgeturl_stdtime(strs6, limittime)) continue;

			var urlhref = getstrinser(urlstr, '<div class="f13">&&target="_blank"&&href="', '"');
			var title = getstrinser(urlstr, '<div class="c-tools"&&data-tools=&&title":"', '"');
			if (urlhref.length > 0 && title.length > 0 && countzhchar(title) > 3 && urlhref.search(rval.delhref) < 0) {
			    neednextpage = true;
			    rval.urllinks += '<a href="' + urlhref + '" set="dumphistory">z' + dtype + '#' + title + '</a>';
			}
		}

		if (schdeep > rval.maxstep) return rval;
		++schdeep;
		var deepurltitle = urltitle.replace(scsdeepmath[0], "(" + schdeep + ")");
		if (neednextpage) {
			var pageRange = getstrinser(content, 'id="page"', '下一页');
			var nextPage = getlaststrinser(pageRange, '<a&&href="', '"');
			if (nextPage.length > 0)
				rval.urllinks += '<a href="https://www.baidu.com' + nextPage + '">' + deepurltitle + '</a>';
		}
	}
	return rval;
}
//百度搜索结果新闻页
function getlinkbaidu2(urlname, urltitle, content, rval, limittime, timebeg, timeend) {
	if (urltitle.substr(0, 2) != 'b2')return rval;
	var dtype = getstrinser(urltitle, "", "#");

	var schdeep = 0;
    var scsdeepmath = dtype.match(/\(\d+?\)/);
    if (scsdeepmath != null && scsdeepmath[0].length > 2) schdeep = parseint(scsdeepmath[0].substring(1, scsdeepmath[0].length - 1));

	var urltagbeg = 'id="content_left"';
	var urltagend = '<div id="gotoPage">';
	var urltagsplit = '<div class="result';
	var urlstrsub = getstrinser(content, urltagbeg, urltagend);
	if (urlstrsub.length == 0) urlstrsub = getstrinser(content, urltagbeg, "");
	if (urlstrsub.length > 0) {
	    var urlstrs = urlstrsub.split(urltagsplit);
	    var neednextpage = false;
		for (var urli = 1; urli < urlstrs.length; urli++) {
		    var urlstr = urlstrs[urli];
		    var strs6 = getstrinser(urlstr, '<p class="c-author">', "</p>");
		    if (strs6.length > 0 && !isneedgeturl_stdtime(strs6, limittime)) continue;
		    var urlmsg = getstrinser(urlstr, '', '<span class="c-info">');
		    if (urlmsg.length == 0) urlmsg = urlstr;
		    if (urlmsg.length > 0 && urlmsg.search(rval.schreg) == -1) continue;
			//var strarttime = getstrinser(urlstr, 'class="c-author">&&  ', '</p>'); //得到文章发表时间
			//if (strarttime.length == 0 || !isneedgeturl_stdtime(strarttime, limittime)) continue; //文章有更新
			var urlhref = getstrinser(urlstr, 'class="c-title">&&<a&&href="', '"');
			var title = getstrinser(urlstr,'class="c-title">&&<a&&>','</h3>');
			if (urlhref.length > 0 && title.length > 0 && countzhchar(title) > 3 && urlhref.search(rval.delhref) < 0) {
			    neednextpage = true;
			    rval.urllinks += '<a href="' + urlhref + '" set="dumphistory">z' + dtype + '#' + title + '</a>';
			}
			var moreurl = getstrinser(urlstr, '<span class="c-info">', "</a>");
			if (moreurl.length > 0 && moreurl.indexOf('查看更多相关新闻') > 0) {
			    moreurl = getstrinser(moreurl, 'href="', '"');
			    if (moreurl.length > 0) {
			        if (moreurl.charAt(0) == "?") rval.urllinks += "<a href='http://news.sogou.com/news" + moreurl + "' set='dumphistory'>" + urltitle + '</a>';
			        else rval.urllinks += "<a href='" + moreurl + "' set='dumphistory'>" + urltitle + '</a>';
			    }
			}
		}

		if (schdeep > rval.maxstep) return rval;
		++schdeep;
		var deepurltitle = urltitle.replace(scsdeepmath[0], "(" + schdeep + ")");
		if (neednextpage) {
			var pageRange = getstrinser(content, 'id="page"', '下一页');
			var nextPage = getlaststrinser(pageRange, '<a&&href="', '"');
			if (nextPage.length > 0)
				rval.urllinks += '<a href="https://news.baidu.com' + nextPage + '">' + deepurltitle + '</a>';
		}
	}
	return rval;
}
//搜狗搜索结果网页
function getlinksougou1(urlname, urltitle, content, rval, limittime, timebeg, timeend) {
	if (urltitle.substr(0, 2) != 'c1')return rval;
	var dtype = getstrinser(urltitle, "", "#");

	var schdeep = 0;
    var scsdeepmath = dtype.match(/\(\d+?\)/);
    if (scsdeepmath != null && scsdeepmath[0].length > 2) schdeep = parseint(scsdeepmath[0].substring(1, scsdeepmath[0].length - 1));

	var urltagbeg = '<div class="results"';
	var urltagend = '<div class="sponsored"';
	var urltagsplit = '<!-- a -->';
	var urlstrsub = getstrinser(content, urltagbeg, urltagend);
	if (urlstrsub.length == 0) urlstrsub = getstrinser(content, urltagbeg, "");
	if (urlstrsub.length > 0) {
	    var urlstrs = urlstrsub.split(urltagsplit);
	    var neednextpage = false;
		for (var urli = 1; urli < urlstrs.length; urli++) {
		    var urlstr = urlstrs[urli];
		    var strs6 = getstrouter(urlstr, "<cite", "</cite>");
		    if (strs6.length > 0) {
		        strs6 = getstrinser(strs6, ">", "<");
		        var strsign = strs6.lastIndexOf("-");
		        if (strsign > 0) strs6 = strs6.substr(strsign + 1);
		        if (strs6.length > 0 && !isneedgeturl_stdtime(strs6, limittime)) continue;
		    }
		    var urlmsg = getstrinser(urlstr, '', '<div class="fb">');
		    if (urlmsg.length > 0 && urlmsg.search(rval.schreg) == -1) continue;
			var urlhref = getstrinser(urlstr, '<a&&href="', '"');
			var title = getstrinser(urlstr,'<a&&href="&&>','</a>');
			if (urlhref.length > 0 && title.length > 0 && countzhchar(title) > 3 && urlhref.search(rval.delhref) < 0) {
			    neednextpage = true;
			    rval.urllinks += '<a href="' + urlhref + '" set="dumphistory">z' + dtype + '#' + title + '</a>';
			    //if (title.length > 30) title = title.substr(0, 30);
			    //rval = addlinks(rval, title, timebeg, timeend, "")
			}
		}

		if (schdeep > rval.maxstep) return rval;
		++schdeep;
		var deepurltitle = urltitle.replace(scsdeepmath[0], "(" + schdeep + ")");
		if (neednextpage) {
			var pageRange = getstrinser(content, 'id="pagebar_container">', '下一页');
			var nextPage = getstrinser(pageRange, 'id="sogou_next"&& href="', '"');
			var dd = nextPage.replace("&tsn=1", "&tsn=1&interation=&");
			if (nextPage.length > 0)
				rval.urllinks += '<a href="https://www.sogou.com/web' + dd + '">' + deepurltitle + '</a>';
		}
	}
	return rval;
}
//搜狗搜索结果新闻页
function getlinksougou2(urlname, urltitle, content, rval, limittime, timebeg, timeend) {
    if (urltitle.substr(0, 2) != 'c2') return rval;
    var dtype = getstrinser(urltitle, "", "#");;

	var schdeep = 0;
    var scsdeepmath = dtype.match(/\(\d+?\)/);
    if (scsdeepmath != null && scsdeepmath[0].length > 2) schdeep = parseint(scsdeepmath[0].substring(1, scsdeepmath[0].length - 1));
	if (schdeep > rval.maxstep) return rval;
	++schdeep;
	var deepurltitle = urltitle.replace(scsdeepmath[0], "(" + schdeep + ")");


    var urltagbeg = '<div class="results"';
    var urltagend = '<div id="right"';
    var urltagsplit = 'class="vrTitle"';
    var urlstrsub = getstrinser(content, urltagbeg, urltagend);
    if (urlstrsub.length == 0) urlstrsub = getstrinser(content, urltagbeg, "");
    if (urlstrsub.length > 0) {
        var urlstrs = urlstrsub.split(urltagsplit);
        var neednextpage = false;
        for (var urli = 1; urli < urlstrs.length; urli++) {
            var urlstr = urlstrs[urli];
            var strs6 = getstrinser(urlstr, '<p class="news-from">', "</p>");
            if (strs6.length > 0 && !isneedgeturl_stdtime(strs6, limittime)) continue;

            var urlmsg = getstrinser(urlstr, '', '<div class="fb">');
            if (urlmsg.length > 0 && urlmsg.search(rval.schreg) == -1) continue;
            if (urlstr.search(rval.schreg) == -1) continue;
            //var strarttime = getstrinser(urlstr, 'resultinfodate:', '--></p>'); //得到文章发表时间
            //if (strarttime.length == 0 || !isneedgeturl_stdtime(strarttime, limittime)) continue; //文章有更新
            var urla = getstrouter(urlstr, '<a', '</h3>');
            var urlherf = "";
            if (urla.length > 0) {
                var title = getstrouter(urla, ">", "</a>");
                urlhref = getstrinser(urla, 'href="', '"');
                if (urlhref.length == 0) urlhref = getstrinser(urla, "href='", "'");
                if (urlhref.length > 0 && title.length > 0 && countzhchar(title) > 3 && urlhref.search(rval.delhref) < 0) {
                    neednextpage = true;
                    rval.urllinks += "<a href='" + urlhref + "' set='dumphistory'>z" + dtype + "#" + title + '</a>';
                }
            }
            if (schdeep < rval.maxstep) {//更多相关内容
                var moreurl = getstrouter(urlstr, '<a id="news_similar"', '</a>');
                if (moreurl.length > 0) {
                    moreurl = getstrinser(moreurl, 'href="', '"');
                    if (moreurl.length > 0) {
                        if (moreurl.charAt(0) == "?") rval.urllinks += "<a href='http://news.sogou.com/news" + moreurl + "' set='dumphistory'>" + deepurltitle + '</a>';
                        else rval.urllinks += "<a href='" + moreurl + "' set='dumphistory'>" + urltitle + '</a>';
                    }
                }
            }
        }

        if (neednextpage) {
            var pageRange = getstrinser(content, 'id="pagebar_container">', '下一页');
            var nextPage = getstrinser(pageRange, 'id="sogou_next"&&href="', '"');
            if (nextPage.length > 0)
                rval.urllinks += '<a href="https://news.sogou.com/news' + nextPage + '">' + deepurltitle + '</a>';
        }
    }
    return rval;
}

//重定向原网页
function getrelocation(urlname, urltitle, content, rval) {
    var redirectURl = getstrinser(content, 'window.location.replace("', '"');
    if (redirectURl.length > 0)
        rval.urllinks += '<a href="' + redirectURl + '">' + urltitle + '</a>';
    return true;
}

//匹配文章内容
function doall(urlname, urltitle, content, rval) {
    var doc = new documentCLASS();

    //doc.parse('<div class="title3">        <h1>颜值真的是它的全部？ 东南DX3：才不是！</h1><br/>        <i ></i>        <p></p>      </div>');

    //rval.content = "a";
    //rval.warn = doc.createnode('<br/>', 0).check();
    //return rval;


    doc.parse(content);
    //rval.content = "av";
    //rval.warn += doc.check();
    //rval.warn = doc.parse(content).check();
    //return rval;
    var htmlnode = doc.getnodebytagname("html");
    if (htmlnode == null) {
        rval.warn += "not html node";
        return false;
    }
    //doc.parse(htmlnode.newouter());
    var nodearray = new Array();
    //rval.warn += doc.fathernode.getnodearraybyattsearch(/display[\s]*:[\s]*none/i)[0].check() + "aaaaaaaaa\r\n";
    //rval.warn += doc.trytitlenode(nodearray) + "a" + nodearray.length;
    //rval.content = "b";
    //return rval;
    //rval.content = "a";
    //rval.warn += doc.check();
    //return rval;

    //rval.warn += doc.trytitlenode(nodearray);
    //rval.content = "a";
    //return rval;
    if (doc.trytitlenode(nodearray) && nodearray.length >= 3) {
        var strcomtotal = "";
        var titlenode = nodearray[0];
        var msgnode = nodearray[1];
        var bodynode = nodearray[2];
        var childss = msgnode.getnodearray
        //if (titlenode.outer().search(rval.schreg) < 0 && msgnode.outer().search(rval.schreg) < 0) return rval;

        var strs6 = "";
        var strs6node = null;
        var strg1 = "";
        var g1node = null;
        //var timereg = /(((199|200|201|0|9|1)[0-9](年|-|\/|\\| |　|\.)?(0?[0-9]|1[0-2])(月|-|\/|\\| |　|\.)?([012]?[0-9]|3[01])(日)?[\s]*|(([01][0-9]|2[0-4])(：|:)[0-5][0-9])((：|:)[0-5][0-9])*|今天|今日[\s\'\"\\\/<]|昨天|昨日|前天|前日|天前|时前|分钟前|秒前))+/;
        //var timereg = /((((199|200|201|0|9|1)[0-9](年|-|\/|\\| |　|\.))?((0?[0-9]|1[0-2])(月|-|\/|\\| |　|\.))?(([012]?[0-9]|3[01])(日))?[\s]*|(([01][0-9]|2[0-4])(：|:)[0-5][0-9])((：|:)[0-5][0-9])*|今天|今日[\s\'\"\\\/<]|昨天|昨日|前天|前日|天前|时前|分钟前|秒前))+/;
        var timereg = /(([01][0-9]|2[0-4])[：:][0-5][0-9]([：:][0-5][0-9])?|(([0-9]{2,4}年|(0[0-9]|1[0-2]|[0-9])月|([0-2][0-9]|3[0-1]|[0-9])日){2,3}|20[0-1][0-9](-|\/|\\|\.| |　)(0[0-9]|1[0-2]|[0-9])(-|\/|\\|\.| |　)([0-2][0-9]|3[0-1]|[0-9])|20[0-1][0-9](-|\/|\\|\.| |　)(0[0-9]|1[0-2]|[0-9])|(0[0-9]|1[0-2]|[0-9])(-|\/|\\|\.| |　)([0-2][0-9]|3[0-1]|[0-9])|今天|今日|昨天|昨日|前天|前日|[0-9]+天前|时前|[0-9]+分钟前|[0-9]+秒前)[\s]*)+/;
        if (msgnode.outer().search(/>只看该作者<|>电梯直达<|>楼主</) >= 0) { //论坛，
            var tdnode = msgnode.getnodearraybytagname("td");
            if (tdnode != null && tdnode.length > 1) {
                g1node = tdnode[0];
                strg1 = g1node.getnextnearnode().text(false);
                strs6node = tdnode[1].getnodebytxtsearch(timereg);
            }
        }
        //rval.warn += msgnode.checkmsgnode() + "a" + msgnode.check();
        //if (msgnode.tagmatch(/ul|li/i) || msgnode.countchildtagmatch(/ul|li/i) > 0.8) return rval; //ul 与 li节点 胡烈
        var strs4 = titlenode.text(false);
        rval.strs4 = strs4;
        //S6
        if (strs6node == null) strs6node = titlenode.getnextnearnode(msgnode.nodeindexend);
        var strs6nodetmp = null;
        while (strs6node != null) {
            if (strs6node.nodetext.search(timereg) >= 0) {
                break;
                if (strs6node.nodetext.length <= 30) break;
                else if (strs6nodetmp == null || strs6nodetmp.length > strs6node.length) strs6nodetmp = strs6node;
            }
            strs6node = strs6node.getnextnearnode(msgnode.nodeindexend);
        }
        if (strs6node == null && strs6nodetmp != null) strs6node = strs6nodetmp;
        if (strs6node == null) {
            strs6node = titlenode.getprenearnode(bodynode.nodeindexbeg);
            while (strs6node != null && strs6node.nodetext.search(timereg) < 0) strs6node = strs6node.getprenearnode(bodynode.nodeindexbeg);
        }
        if (strs6node != null) {//时间为双节点 合并节点
            var strs6nodebeg = strs6node;
            while (strs6nodebeg.prenode != null && strs6nodebeg.prenode.nodeindexbeg >= titlenode.nodeindexend && strs6nodebeg.prenode.nodetext.search(timereg) >= 0) {
                strs6nodebeg = strs6nodebeg.prenode;
                strs6node.prenode = strs6nodebeg.prenode;
                if (strs6node.prenode != null) strs6node.prenode.nextnode = strs6node;
                strs6node.nodetext = strs6nodebeg.nodetext + " " + strs6node.nodetext;
                strs6node.nodeindexbeg = strs6nodebeg.nodeindexbeg;
            }
            if (strs6node.prenode == null) strs6node.fathernode.childnode = strs6node;
            var strs6nodeend = strs6node;
            var timeregonly = /((([01][0-9]|2[0-4])(：|:| )[0-5][0-9])|今天|今日|昨天|昨日|前天|前日|天前|时前|分钟前|秒前)/;
            while (strs6nodeend.nextnode != null && strs6nodeend.nextnode.nodetext.search(timeregonly) >= 0) {
                strs6nodeend = strs6nodeend.nextnode;
                strs6node.nextnode = strs6nodeend.nextnode;
                if (strs6node.nextnode != null) strs6node.nextnode.prenode = strs6node;
                strs6node.nodetext = strs6node.nodetext + " " + strs6nodeend.nodetext;
                strs6node.nodeindexend = strs6nodeend.nodeindexend;
            }
        }
        if (strs6node == null)
            strs6node = msgnode.getnodebytxtsearch(/class[\s]*?=[\s\S]*?time[\s\S]*?([\s][\S]*?[\s]*?=|>)/i);

        if (strs6node == null) {
            var s6match = urlname.match(/20[01][0-9][ -/]*(0[0-9]|1[0-2])[ -/]*([0-2][0-9]|3[01])/);
            if (s6match != null && s6match.length > 0)
                strs6 = s6match[0];
        }
        else {
            strs6 = strs6node.text();
        }
        //var strs6origianl = strs6;
        if (strs6.length > 0) strs6 = timetrtostdstr(strs6);
        var strs0 = strs4 + strs6;
        if (strs0.length == 0) strs0 = getlaststrinser(urlname, "/", "/");
        if (strs0.length > 0 && strs0.length < 10) {
            var strsoindex = urlname.indexOf("/" + strs0 + "/");
            var strs0a = urlname.substr(strsoindex + strs0.length + 2);
            if (strs0a.length > strs0) strs0 = strs0a;
        }
        if (strs0.length == 0)
            strs0 = strs4;
        strcomtotal += "《S0》" + strs0 + "《/S0》《S1》" + urlname + "《/S1》";
        var strs2 = ""
        if (urlname.indexOf("weixin.qq.com") > 0)
            strs2 = "微信";
        else {
            var strtitles = doc.gettextbytagname("title").split(/\[|\]|【|】|-|_|\||—|–| |，/);
            if (strtitles.length > 1) {
                var s2index = strtitles.lastIndexOf(strtitles) - 1;
                if (s2index > 1 && strtitles.substr(s2index - 1, 1).search(/-|_|—|–| /) == 0)
                    strs2 = strtitles[strtitles.length - 1];
            }
            if (strs2.length == 0) {
                var strs2 = getstrinser(urlname, "://", "/");
                if (strs2.length == 0)
                    strs2 = getstrinser(urlname, "://", "");
            }
        }
        if (strs2.length > 0)
            strcomtotal += "《S2》" + strs2 + "《/S2》《S3a》文章《/S3a》";

        //s3b
        var strs3b = "";
        var s3bnode = msgnode;
        if (s3bnode.nodeindexbeg >= titlenode.nodeindexend) s3bnode = titlenode;
        while (s3bnode.prenode == null && s3bnode.fathernode != null)
            s3bnode = s3bnode.fathernode;
        strs3b = s3bnode.getlefttext();
        if (strs3b == strs4)
            strs3b = "";
        while (strs3b.length == 0 && s3bnode.prenode != null) {
            strs3b = strtrimall(s3bnode.prenode.getlefttext(false));
            s3bnode = s3bnode.prenode;
            //rval.warn = s3bnode.prenode.outer();
        }
        while (strs3b.length == 0 && s3bnode.fathernode != null) {
            //if (s3bnode.fathernode.nodeindexend < msgnode.nodeindexbeg) strs3b = s3bnode.fathernode.text(false);
            //else
                strs3b = s3bnode.fathernode.getlefttext();
            if (strs3b == strs4 || strs3b.length < 5)
                strs3b = "";
            s3bnode = s3bnode.fathernode;
        }
        //rval.warn = strs3b;
        if (strs3b.length == 0 && s3bnode.fathernode != null && s3bnode.fathernode.prenode != null) {
            strs3b = s3bnode.fathernode.prenode.getlefttext();
        }
        if (strs3b.length == 0)
            strs3b = doc.gettextbytagname("title");
        if (strs3b.length > 0)
            strcomtotal += "《S3b》" + strs3b + "《/S3b》";

        //S3c 文章标签： 文章关键词：
        var strs3c = bodynode.gettextbytxtsearch(/文章(标签|关键词)/, 10, 150);
        if (strs3c.length > 0)
            strcomtotal += "《S3c》" + strs3c + "《/S3c》";

        //S3d 导航条
        var strs3d = "";
        var regexps3d = /社区导航|当前位置|>|》|&gt|\?|\//g;
        var s3dnodet = titlenode.getprenearnode();
        var limintnum = 0;
        while (s3dnodet != null) {
            if (s3dnodet.nodetext.search(regexps3d) >= 0) {
                strs3d = s3dnodet.fathernode.text(false);
                var limit = 100
                if (strs3d.indexOf(strs4) >= 0) limit += strs4.length;
                if (strs3d.length > limit) strs3d = "";
                if (strs3d.search(/社区导航|当前位置|首页/) >= 0) break;
                var m2 = strs3d.match(/>|》|&gt|\/|\\/g);
                if (strs3d.indexOf(strs4) >= 0) break;
                if (m2 != null && m2.length >= 2) {
                    break;
                }
                else strs3d = "";
            }
            ++limintnum;
            s3dnodet = s3dnodet.getprenearnode();
        }
        //var s3dnode = bodynode.getnodebytxtsearch(regexps3d);
        //while (s3dnode != null) {
        //    var strs3dtmp = s3dnode.text(false);
        //    if (strs3dtmp.length < 6) strs3dtmp = s3dnode.fathernode.text(false);
        //    if (strs3d.length == 0 || strs3dtmp.search(/当前位置|首页/) >= 0 && strs3d.search(/当前位置|首页/) < 0) {
        //        //if (strs3dtmp.length < 8 && s3dnode.fathernode != null)
        //       //     strs3d = s3dnode.fathernode.text(false);
        //        //else

        //        strs3d = strs3dtmp;
        //        var m2 = strs3d.match(regexps3d);
        //        if (m2 != null && m2.length >= 3) break;
        //    } else {
        //        var m1 = strs3dtmp.match(regexps3d);
        //        var m2 = strs3d.match(regexps3d);
        //        if (m1 != null && m1.length >= 3) {
        //            strs3d = strs3dtmp;
        //            break;
        //        }
        //        if (m2 == null || m1 != null && m1.length > m2.length)
        //            strs3d = strs3dtmp;
        //    }
        //    if (strs3d.search(/当前位置/) >= 0)
        //        break;
        //    s3dnode = bodynode.getnodebytxtsearch(regexps3d, s3dnode.nodeindexend);
        //}
        //rval.warn += s3dnode.check();
        //if (strs3d.length == 0) strs3d = bodynode.gettextbytxtsearch(/当前位置|>|》|&gt/, 10, 100);
        if (strs3d.length > 0)
            strcomtotal += "《S3d》" + strs3d + "《/S3d》";
        if (strs4.length > 0) {
            //标题无中文< 2
            //if (countzhchar(strs4) < 2) return rval;
            strcomtotal += "《S4》" + strs4 + "《/S4》";
        }

        strcomtotal += "《S5》" + datetostdstr(new Date()) + "《/S5》"

        if (strs6.length > 0)
            strcomtotal += "《S6》" + strs6 + "《/S6》";

        //S7
        var strs7 = getstrinser(urltitle, '#', '$$$');
        if (strs7.length > 0)
            strcomtotal += strs7;

        //S8
        var strs8 = msgnode.gettextbytxtsearch(/地址[：: ]/);
        if (strs8.length > 0)
            strcomtotal += "《S8》" + strs8 + "《/S8》";
        else strcomtotal += "《S8》《/S8》";
        strcomtotal += "《S9》1《/S9》《ID》1《ID》";
        //s11 阅读数
        var strs11 = "";
        var s11regexp = /阅读|点击|浏览数/;
        var numregexp = /([0-9.]|万)+/;
        var strs11 = msgnode.getregmatchbytxtsearch(s11regexp, numregexp);
        if (strs11 == null)
            msgnode.getregmatchbyattsearch(/title[\s]*=[\s]*\"播放数\"/, numregexp);
        if (strs11 != null) {
            strs11 = strs11[0];
            if (parseint(strs11) > 0)
                strcomtotal += "《S11》" + strs11 + "《/S11》";
        }
        //s12 评论数
        var strs12 = "";
        var s12regexp = /评论|回复/;
        var s12node = msgnode.getnodebytxtsearch(s12regexp);
        if (s12node != null) {
            while (s12node != null && s12node.textsize > 5)
                s12node = msgnode.getnodebytxtsearch(s12regexp, s12node.nodeindexend);
            if (s12node == null)
                s12node = msgnode.getnodebytxtsearch(s12regexp);
            if (s12node.fathernode != null)
                strs12 = s12node.fathernode.text(false);
            else
                strs12 = s12node.text(false);
        }
        if (strs12.length > 0) {
            strs12 = strs12.match(/[0-9]+/);
            if (strs12 == null)
                strs12 = "";
            else
                strs12 = strs12[0];
            if (strs12.length > 0 && Number(strs12[0]) > 0)
                strcomtotal += "《S12》" + strs12[0] + "《/S12》";
        }

        var strq1 = msgnode.getmaintext();
        //G1 作者 编辑 记者
        if (g1node == null) {
            g1node = msgnode;
            while (g1node.nodeindexbeg > titlenode.nodeindexend && g1node.fathernode != null) g1node = g1node.fathernode;
        }
        if (strg1.length == 0) {
            if (g1node != null) {
                if (urlname.search(/tieba.baidu.com/) > 0) {
                    var g1nodet = g1node.getnodebyattsearch(/<li class="d_name"/);
                    if (g1nodet != null) strg1 = g1nodet.text(false);
                }
                else if (urlname.search(/www.sohu.com/) > 0) {
                    var g1nodet = htmlnode.getnodebyattindexof('<div class="user-info" id="user-info">');
                    if (g1nodet != null) strg1 = g1nodet.getnextnearnode().text(false);
                }
                if (strg1.length == 0) {
                    var g1regexp = /(作者|经销商|经销商名称|编辑|记者|商家名称)( |　|：|:|<|\s)+|（记者/;
                    //return rval;
                    var g1nodet = g1node.getnodebytxtsearch(g1regexp);
                    //rval.content = "a";
                    //rval.warn += titlenode.check() + "aaaaaaaaaaaag1\r\n";
                    //rval.warn += g1node.check() + g1nodet.text() + "aaaaaaaaaaaamsg\r\n";
                    //rval.warn += msgnode.check() + "aaaaaaaaaaaa\r\n";
                    //return rval;
                    if (g1nodet != null) {
                        strg1 = g1nodet.nodetext;
                        var g1regexpbef = /[\S\s]*((作者|经销商|经销商名称|编辑|记者|商家名称)( |　|：|:|<|\s)+|（记者)/;
                        strg1 = strg1.replace(g1regexpbef, "");
                        if (strg1.length == 0) {
                            g1nodet = g1nodet.getnextnearnode();

                            //rval.content = "a";
                            //rval.warn += g1nodet.fathernode.check();
                            //return rval;
                            while (g1nodet != null && g1nodet.nodetext.length < 2) g1nodet = g1nodet.getnextnearnode();
                            strg1 = g1nodet.nodetext;
                            if (strg1.length > 10 && strg1.search(/公司|经营部|4S店/) < 0 || strg1.search(/：|:/) > 0) strg1 = "";
                        }
                        else {
                            var strg1endindex = strg1.search(/）|\)|（|\(|<|\'|\"|‘|“|＇|＂/);
                            if (strg1endindex > 2) strg1 = strg1.substr(0, strg1endindex);

                        }
                    }
                }
            }
        }
        //var strg1 = g1node.gettextbytxtsearch(/(作者|经销商|经销商名称|编辑|记者|商家名称)( |　|：|:|<)+/, 5, 20);
        //if (strg1.length > 0) {
        //    var strg1match = strg1.match(/(作者|经销商|经销商名称|编辑|记者|商家名称)( |　|：|:|)+/);
        //    if (strg1match == null) strg1 = "";
        //    else {
        //        strg1 = strg1.substr(strg1.indexOf(strg1match[0]) + strg1match[0].length)
        //        if (strg1.charAt(0) != "<") {
        //            strg1match = strg1.match(/([\S]+)(?=　|：|:| |<)/);
        //            if (strg1match != null) strg1 = strg1match[0];
        //        }
        //    }
        //}
        //else {
        //    strg1 = g1node.fathernode.gettextbyattsearch(/(class|id)[\s]*?=[\s\S]*?(post-user|author|writer|name|source)[\s\S]*?([\s][\S]*?[\s]*?=|>)/i, 5, 30);
        //    if (strs6node != null && strg1.length > 0) {
        //        var strg1finds6 = strg1.indexOf(strs6node.outer());
        //        if (strg1finds6 > 2) strg1 = strg1.substr(0, strg1finds6);
        //        else {
        //            var strs6contentindex = content.indexOf(strs6node.outer());
        //            var strg1contentindex = content.indexOf(strg1);
        //            if (Math.abs(strs6contentindex - strg1contentindex) > 200) strg1 = "";
        //        }
        //    }
        //}
        if (strg1.length == 0 && strs6node != null) {
            var strs6text = strs6node.text(false);
            var s6match = strs6text.match(timereg);
            //var s6match = strs6text.match(/(([01][0-9]|2[0-4])(：|:)[0-5][0-9])((：|:)[0-5][0-9])*/);
            if (s6match != null) {
		//rval.warn += strs6text + 'a' + s6match;
                var s6index = strs6text.indexOf(s6match[0]);
                strg1 = strtrim(strs6text.substr(0, s6index));
                if (strg1.length == 0) {
                    strg1 = strtrim(strs6text.substr(s6index + s6match[0].length));
                    if (strg1.length > 0) {
                        var signindex = strg1.search(/\s|：|:/)
                        if (signindex > 0) {
                            strg1 = strtrim(strg1.substr(signindex + 1));
                        }
                    }
                }
            }
        }
        if (strg1.length == 0 && strs6node != null) {
            var limitindex = strs6node.str.length;
            var titlenodetmp = titlenode;
            if (strs6node.nodeindexbeg >= titlenode.nodeindexend) limitindex = strs6node.nodeindexbeg;
            if (titlenodetmp.childnode != null) titlenodetmp = titlenodetmp.getlastgrandchildnode();
            strgenode = titlenodetmp.getnextnearnode(limitindex);
            while (strgenode != null) {
                strg1 = strgenode.nodetext;
                var signindex = strg1.search(/\s|：|:/)
                if (signindex > 0) {
                    strg1 = strg1.substr(signindex + 1);
                }
                if (strg1.length > 0) break;
                strgenode = strgenode.getnextnearnode(limitindex);
            }
            if (strg1.length == 0) {
                limitindex = 0;
                if (strs6node.nodeindexbeg >= titlenode.nodeindexend) limitindex = titlenode.nodeindexend;
                var strgenode = strs6node.getprenearnode(limitindex);
                while (strgenode != null && strgenode.nodetext.length < 2) strgenode = strgenode.getprenearnode(limitindex);
                if (strgenode != null) strg1 = strgenode.nodetext;
            }
            //rval.warn +=titlenode.fathernode.check() + strgenode.check() + "a" + limitindex;
            if (strg1.length == 0) {
                limitindex = strs6node.str.length;
                if (strs6node.nodeindexend <= titlenode.nodeindexbeg) limitindex = titlenode.nodeindexbeg;
                strgenode = strs6node.getnextnearnode(limitindex);
                while (strgenode != null) {
                    if (strgenode.nodetext.length >= 2) {
                        strg1 = strgenode.nodetext;
                        var signindex = strg1.search(/\s|：|:/)
                        if (signindex > 0) {
                            strg1 = strg1.substr(signindex + 1);
                        }
                        if (strg1.length > 0) break;
                    }
                    strgenode = strgenode.getnextnearnode(limitindex);
                }

            }
            //rval.warn += "a" + strg1 + "a";

            //if (strs6node.prenode != null){
            //    var nodei = strs6node.prenode;
            //    while (nodei != null && nodei.nodetext.length == 0 && nodei.textsize == 0) nodei = nodei.prenode;
            //    if (nodei != null && nodei.nodeindexbeg >= titlenode.nodeindexend) strg1 = nodei.text();
            //}
            //if (strg1.length == 0){
            //    var nodei = strs6node.getprenearnode();
            //    while (nodei != null && nodei.nodetext.length == 0) {
            //        nodei = strs6node.getprenearnode();
            //        if (nodei.nodeindexbeg <= titlenode.nodeindexbeg) nodei = null;
            //        else if (nodei.prenode == null) nodei = nodei.fathernode;
            //        else if (nodei.prenode.nodeindexbeg < titlenode.nodeindexend) nodei = null;
            //        else break;
            //    }
            //    if (nodei != null) strg1 = nodei.text();
            //}
            //if (strg1.length == 0 && strs6node.childnode != null) {
            //    var nodei = strs6node.childnode;
            //    while (nodei != null && nodei.nodetext.length == 0 && nodei.textsize == 0) nodei = nodei.nextnode;
            //    if (nodei != null) strg1 = nodei.text();
            //}
            //if (strg1.length == 0 && strs6node.nextnode != null) {
            //    var nodei = strs6node.nextnode;
            //    while (nodei != null && nodei.nodetext.length == 0 && nodei.textsize == 0) nodei = nodei.nextnode;
            //    if (nodei != null) strg1 = nodei.text();
            //}
            //var strs4origianl = titlenode.fathernode.outer();
            //strg1 = getstrouter(content, strs4origianl, strs6node.outer());
            //strs4origianl = titlenode.outer();
            //strg1 = strtrimall(getstrinser(strg1, strs4origianl, strs6origianl));
            //if (strg1.length == 0) {

            //}
        }
        if (strg1.length > 0) // && strg1 != '责任编辑：'
            strcomtotal += "《G1》" + strg1 + "《/G1》";

        //G1a 来源
        var strg1anode = g1node.getnodebytxtsearch(/(来源|来自)(\s| |　|：|:|<)+/);
        var strg1a = '';
        //rval.warn += strg1anode.check();
        if (strg1anode != null) {
            //strg1a = strg1anode.text(false);
            strg1a = strg1anode.nodetext;
            strg1a = strg1a.replace(/[\s\S]*(来源|来自)(\s| |　|：|:|<)+/, "");
            if (strg1a.length == 0) strg1a = strg1anode.getnextnearnode().nodetext;
            var strg1endindex = strg1a.search(/）|\)|（|\(|<|\'|\"|‘|“|＇|＂/);
            if (strg1endindex > 2) strg1a = strg1a.substr(0, strg1endindex);
            if (strg1a.length > 0) strcomtotal += "《G1a》" + strg1a + "《/G1a》";
            //if (strg1amatch != null) {
            //    if (strg1a.length - 2 < strg1amatch[0].length) {
            //        while (strg1anode.nextnode == null && strg1anode.fathernode != null) strg1anode = strg1anode.fathernode;
            //        strg1a = strg1anode.nextnode.getlefttext(false);
            //    } else {
            //        strg1a = strg1a.substr(strg1a.indexOf(strg1amatch[0]) + strg1amatch[0].length);
            //    }
            //    strcomtotal += "《G1a》" + strg1a + "《/G1a》";
            //}

        }

        //Q1
        if (strq1.length > 0) {
            strcomtotal += "《Q1》" + strq1 + "《/Q1》";
        }

        if (strcomtotal.length > 0) {
            if (urltitle.charAt(0) == "b") {
                var strs7 = getstrinser(urltitle, "#", "$$$");
                if (strs7.length > 0)
                    strcomtotal += strs7;
            }

        }
        rval.content += "《Root》" + strcomtotal + "《/Root》\r\n";
    }
    return true;
}
//今日头条文章内容
function getdatatoutiao(urlname, urltitle, content, rval, timebeg, timeend) {
    if (urltitle.charAt(0) != 't') return false;
    if (urlname.indexOf('a3.pstatp.com/article/content') < 0) return false;
    var jsonobj = JSON.parse(content.replace(/([^\\])":[\s]*([0-9]+)[\s]*(,|]|})/g, '$1":"$2"$3'));
    if (jsonobj.message == null || jsonobj.message != "success" || jsonobj.data == null) {
        rval.error += '链接加载数据异常，重新加载,';
        return false;
    }
    if (jsonobj.data.h5_extra == null || jsonobj.data.h5_extra.publish_stamp == null) {
        rval.warn += "not h5_extra data;"
        return false;
    }
    var strcomtotal = "《S0》" + jsonobj.data.group_id + "《/S0》《S1》" + urlname + "《/S1》《S2》今日头条《/S2》《S5》" + datetostdstr(new Date()) + "《/S5》";
    strcomtotal += getstrinser(urltitle, "b", "#^");
    //var str__ptags = getstrouter(content, "__ptags", "[];");
    //if (str__ptags.length > 0) {
    //    eval("var " + str__ptags);
    //    if (__ptags != null && __ptags.length > 0) {
    //        strcom = "";
    //        for (var i = 0; i < __ptags.length; ++i) {
    //            if (__ptags[i].name != null) strcom += __ptags[i].name + "》";
    //        }
    //        if (strcom.length > 1) strcomtotal += "《S3c》" + strcom.substr(0, strcom.length - 1) + "《/S3c》";
    //    }
    //}
    if (jsonobj.data.h5_extra.title == null) {
        rval.strs4 = getstrinser(urltitle, "#^", "");
        strcomtotal += "《S4》" + rval.strs4 + "《/S4》";
    }
    else {
        rval.strs4 = jsonobj.data.h5_extra.title;
        strcomtotal += "《S4》" + jsonobj.data.h5_extra.title + "《/S4》";
    }
    strcom = timetrtostdstr(jsonobj.data.h5_extra.publish_stamp);
    strcomtotal += "《S6》" + strcom + "《/S6》《S6a》" + strcom + "《/S6a》《S9》1《/S9》《ID》1《/ID》";
    strcomtotal += "《Q1》" + escape2Html(jsonobj.data.content) + "《/Q1》";
    rval.content += "《Root》" + strcomtotal + "《/Root》\r\n";
    if (rval.content.search(rval.schreg) != -1) {
        var dtype = getstrinser(urltitle, "", "#");
        return addlinks(rval, rval.strs4, timebeg, timeend, dtype);
    }
    return true;

}
function getdatatoutiao2(urlname, urltitle, content, rval) {
    if (urlname.indexOf('toutiao.') < 0) return false;

    var strerr = "";
    var strcom = "";
    var strcomtotal = "";
    var strcomtip = "";
    var contentstr = "";
    var strq1 = "";
    var strs4 = "";
    var dtype = getstrinser(urltitle, "", "#");
    content = content.replace(/\\/g, '');
    var contentstrsub = getstrinser(content, "content: '", "'");
    if (contentstrsub.length == 0) {
        contentstrsub = getstrinser(content, '"sub_abstracts":[', '],"sub_titles"');
    }
    contentstrsub = contentstrsub.replace(/《/g, "<");
    contentstrsub = contentstrsub.replace(/》/g, ">");

    var checkout = getstrinser(content, "chineseTag: '", "'");
    if (checkout == '问答') {
        var strcomtotal2 = "";
        contentstrsub = getstrinser(content, '__question = [{', '__answer = [{');
        if (contentstrsub.length == 0) contentstrsub = getstrinser(content, '__question = [{', ']}]');
        if (contentstrsub.length == 0) contentstrsub = getstrinser(content, '"question":[{', ']}]');
        if (contentstrsub.length > 0) {
            strcom = getstrinser(urlname, '/a', '');
            if (strcom.length == 0) strerr += "S0,";
            else strcomtotal2 += "《S0》" + strcom + "《/S0》";
            strcomtotal2 += "《S1》" + urlname + "《/S1》《S2》今日头条《/S2》《S3a》文章《/S3a》《S5》" + datetostdstr(new Date()) + "《/S5》";

            strcom = getstrinser(contentstrsub, '"concern_tags":[', ']');
            var contentstr = strcom.split('"concern_id"');
            var strcomtip = "";
            for (var stri = 1; stri < contentstr.length; stri++) {
                strcomtip += getstrinser(contentstr[stri], '"name":"', '"') + ',';
            }
            if (strcomtip.length > 0) strcomtotal2 += "《S3c》" + strcomtip + "《/S3c》";

            strcom = getstrinser(contentstrsub, '"title":"', '"');
            if (strcom.length == 0) strcom = getstrinser(content, '"title":"', '"');
            if (strcom.length == 0) strerr += "标题,";
            else strcomtotal2 += printstr(strcom, 'S4');
            strs4 = strcom;
            //if(urltitle.substr(urltitle.length-1)=='2'){
            //strcom+='3';
            //rval = addlinks(rval, strcom, timebeg, timeend, dtype, "");
            //}
            //if(urltitle.substr(urltitle.length-1)!='3' && urltitle.substr(urltitle.length-1)!='2'){
            //strcom+='2';
            //    rval = addlinks(rval, strcom, timebeg, timeend, dtype, "");
            // }
            strcom = getstrinser(contentstrsub, '"show_time":"', '"');
            if (strcom.length == 0) strerr += "TIME,";
            else strcomtotal2 += printstr(timetrtostdstr(strcom), 'S6');
            strcomtotal += printstr('1', 'S9');
            strcomtotal += printstr('1', 'ID');
            strcom = getstrinser_all(contentstrsub, '<p>', '</p>');
            if (strcom.length == 0) strcom = getstrinser(contentstrsub, '"text":"', '",');
            if (strcom.length == 0) strcomtotal2 += "《Q1》问答《/Q1》";
            else strcomtotal2 += "《Q1》" + strcom + "《/Q1》";
            strq1 = strcom;
            strcomtotal2 += "《G1》匿名《/G1》"
        }
        contenttagbeg = '__answer = [{';
        contenttagend = 'shareInfo';
        contenttagsplit = '"status":';
        contentstrsub = getstrinser(content, contenttagbeg, contenttagend);
        if (contentstrsub.length == 0) contentstrsub = getstrinser(content, '"ans_list":[', '}]}');
        contentstrsub = contentstrsub.replace(/\\/g, '');
        if (contentstrsub.length > 0 && content.indexOf(contenttagsplit) > 0) {
            var contentstr = contentstrsub.split(contenttagsplit);
            for (var strli = 1; strli < contentstr.length; strli++) {
                var constr = contentstr[strli];
                strcomtotal = strcomtotal2;
                strcom = getstrinser(constr, '"user_id":', ',');
                if (strcom.length == 0) strerr += "用户id,";
                else strcomtotal += printstr(strcom, 'H1');
                strcom = getstrinser(constr, '"show_time":"', ',');
                if (strcom.length == 0) strerr += "回复TIME,";
                else strcomtotal += printstr(timetrtostdstr(strcom), 'H2');

                strcom = getstrinser(constr, '"text":', '"is_bury"');
                strcom = getstrinser_all(constr, '<p>', '</p>')
                if (strcom.length == 0) strerr += "H3,";
                else strcomtotal += "《H3》" + strcom + "《/H3》";

                strcom = getstrinser(constr, '"digg_count":', ',');
                if (strcom.length == 0) strerr += "点赞数,";
                else strcomtotal += printstr(strcom, 'S13');
                rval.content += "《Root》" + strcomtotal + "《/Root》\n";
                strcomtotal = "";
            }
            if (strerr.length > 0) rval.warn += "data1 ERROR:" + strerr;
            strerr = "";
        } else {
            rval.content += "《Root》" + strcomtotal2 + "《/Root》\n";
            if (strerr.length > 0) rval.warn += "data1 ERROR:" + strerr;
            strerr = "";
        }
        return true;
    }
    else if (checkout == '视频' || urlname.indexOf('ixigua') > 0) {
        strcom = getstrinser(urlname, '/a', '');
        if (urlname.indexOf('ixigua') > 0) strcom = getstrinser(urlname, '/a', '/?');
        if (strcom.length == 0) strerr += "S0,";
        else strcomtotal += "《S0》" + strcom + "《/S0》";
        strcomtotal += "《S1》" + urlname + "《/S1》《S2》今日头条《/S2》《S3a》文章《/S3a》《S5》" + datetostdstr(new Date()) + "《/S5》";
        strcom = getstrinser(content, "abstract: '", "',");
        if (strcom.length == 0) strcom = getstrinser(content, "title: '", "'");
        if (strcom.length == 0) strcom = getstrinser(content, '"title":"', '"');
        if (strcom.indexOf('.replace(/') > 0) strcom = getstrinser(content, '<title>', '</title>');
        if (strcom.length == 0) strerr += "标题,";
        else strcomtotal += printstr(strcom, 'S4');
        strs4 = strcom;
        strcomtotal += "《S9》1《/S9》《ID》1《/ID》";
        strcom = getstrinser(content, 'comments_count: ', ',');
        if (strcom.length > 0) strcomtotal += "《S12》" + strcom + "《/S12》";
        if (contentstrsub.length > 0) {
            strcom = getstrinser(content, '__ptags = [{', '] || [];');
            if (strcom.length == 0) {
                strcom = getstrinser(content, '"labels":[', '],');
                strcomtip += strcom.replace(/"/g, '');
            }
            if (content.indexOf('__ptags = [{') > 0) {
                contentstr = strcom.split('"name"');
                for (var stri = 1; stri < contentstr.length; stri++) {
                    strcomtip += getstrinser(contentstr[stri], ':"', '"') + ',';
                }
            }
            if (strcomtip.length > 0) strcomtotal += "《S3c》" + strcomtip + "《/S3c》";
            strcom = getstrinser(content, "time: '", "'");
            if (strcom.length == 0) strcom = getlaststrinser(content, '"create_time":', ',"normal_ans_count"');
            if (strcom.length == 0) strerr += "TIME,";
            else strcomtotal += printstr(timetrtostdstr(strcom), 'S6');
            strcom = getstrinser_all(contentstrsub, '《p》', '《/p》');
            strcom = delstrouter_all(strcom, '《a&&》', '《/a》');
            strcom = delstrouter_all(strcom, '《img', '》');
            if (strcom.length == 0) strcom = getstrinser_all(contentstrsub, '"', '"');
            if (strcom.length == 0) strerr += "Q1,";
            else strcomtotal += "《Q1》" + strcom + "《/Q1》";
            strq1 = strcom;
            strcom = getstrinser(content, "source: '", "'");
            if (strcom.length == 0) strcom = getstrinser(content, "mediaInfo: {&&name: '", "'");
            if (strcom.length == 0) strerr += "来源,";
            else strcomtotal += printstr(strcom, 'G1');
            if (content.indexOf('mediaInfo: {') > 0) {
                strcom = getstrinser(content, "user_id:", ",");
                if (strcom.length == 0) strcom = getstrinser(content, "uid:", ",");
                if (strcom.length == 0) strerr += "ID,";
                else strcomtotal += printstr(strcom, 'G0');
            }
        } else {
            strcomtotal += "《Q1》视频《/Q1》";
            strcomtotal += "《G1》匿名《/G1》";
        }
        // if(strq1.search(/东南dx3|东南DX3/)!=-1 || strs4.search(/东南dx3|东南DX3/)!=-1){
        // if(urltitle.substr(urltitle.length-1)=='2'){
        // var name = strs4+'3';
        // rval = addlinks(rval, time, dtype, name);
        // }
        // if(urltitle.substr(urltitle.length-1)!='3' && urltitle.substr(urltitle.length-1)!='2'){
        // var name = strs4+'2';
        // rval = addlinks(rval, time, dtype, name);
        // }
        // }

        if (strerr.length > 0) rval.warn += "data1 ERROR:" + strerr;
        rval.content += "《Root》" + strcomtotal + "《/Root》\n";
        strcomtotal = "";
        strerr = "";
    }
    else if (contentstrsub.length > 0 && checkout != '问答' && checkout.length > 0 && checkout != '视频') {
        strcom = getstrinser(content, "groupId: '", "'");
        if (strcom.length == 0) strerr += "S0,";
        else strcomtotal += "《S0》" + strcom + "《/S0》";
        strcomtotal += "《S1》" + urlname + "《/S1》《S2》今日头条《/S2》《S3a》文章《/S3a》《S5》" + datetostdstr(new Date()) + "《/S5》";

        strcom = getstrinser(content, '__ptags = [{', '] || [];');
        if (strcom.length == 0) {
            strcom = getstrinser(content, '"labels":[', '],');
            strcomtip += strcom.replace(/"/g, '');
        }
        if (content.indexOf('__ptags = [{') > 0) {
            contentstr = strcom.split('"name"');
            for (var stri = 1; stri < contentstr.length; stri++) {
                strcomtip += getstrinser(contentstr[stri], ':"', '"') + ',';
            }
        }
        if (strcomtip.length > 0) strcomtotal += "《S3c》" + strcomtip + "《/S3c》";

        strcom = getstrinser(content, "title: '", "',");
        if (strcom.length == 0) strcom = getstrinser(content, '"title":"', '"');
        if (strcom.length == 0) strerr += "标题,";
        else strcomtotal += printstr(strcom, 'S4');
        var strs4 = strcom;
        strcom = getstrinser(content, "time: '", "'");
        if (strcom.length == 0) strcom = getlaststrinser(content, '"create_time":', ',"normal_ans_count"');
        if (strcom.length == 0) strerr += "TIME,";
        if (content.indexOf("time: '") > 0) strcomtotal += printstr(strcom, 'S6');
        else strcomtotal += printstr(timetrtostdstr(strcom), 'S6');

        strcomtotal += printstr('1', 'S9');
        strcomtotal += printstr('1', 'ID');
        strcom = getstrinser(content, 'comments_count: ', ',');
        if (strcom.length > 0) strcomtotal += "《S12》" + strcom + "《/S12》";
        //if ( checkout != '问答'){
        strcom = getstrinser(content, "source: '", "'");
        if (strcom.length == 0) strcom = getstrinser(content, "mediaInfo: {&&name: '", "'");
        if (strcom.length == 0) strerr += "来源,";
        else strcomtotal += printstr(strcom, 'G1');
        if (content.indexOf('mediaInfo: {') > 0) {
            strcom = getstrinser(content, "user_id:", ",");
            if (strcom.length == 0) strcom = getstrinser(content, "uid: '", "'");
            if (strcom.length == 0) strerr += "ID,";
            else strcomtotal += printstr(strcom, 'G0');
        }

        //strcom = getstrinser_all(contentstrsub, '《p》', '《/p》');
        //strcom = delstrouter_all(strcom,'《a&&》','《/a》');
        //strcom = delstrouter_all(strcom,'《img','》');
        //strcom = delstrouter_all(strcom,'《style》','《/style》');
        //strcom = delstrouter_all(strcom,'《div','》');
        //strcom = delstrouter_all(strcom,'《/div','》');
        //strcom = delstrouter_all(strcom,'《br','》');
        //if (strcom.length == 0) strcom = getstrinser_all(contentstrsub,'"','"');
        if (contentstrsub.length == 0) strerr += "Q1,";
        else strcomtotal += "《Q1》" + contentstrsub + "《/Q1》";
        var strq1 = contentstrsub
        //}
        if (strerr.length > 0) rval.warn += "data1 ERROR:" + strerr;
        rval.content += "《Root》" + strcomtotal + "《/Root》\n";
        strcomtotal = "";
        strerr = "";
    }
    else if (checkout != '') {
        //if (checkout.length == 0) {
        var strcomtotal2 = "";
        strcom = getstrinser(urlname, '/a', '');
        if (strcom.length == 0) strerr += "S0,";
        else strcomtotal2 += "《S0》" + strcom + "《/S0》";
        strcomtotal2 += "《S1》" + urlname + "《/S1》《S2》今日头条《/S2》《S3a》文章《/S3a》《S5》" + datetostdstr(new Date()) + "《/S5》";

        strcom = getstrinser(content, '<div class="question-tags">', '<h1 itemprop="name" class="question-name">');
        var contentstr = strcom.split('<a');
        var strcomtip = "";
        for (var stri = 1; stri < contentstr.length; stri++) {
            strcomtip += getstrinser(contentstr[stri], 'class="tag">', '</a>') + ',';
        }
        if (strcomtip.length > 0) strcomtotal2 += "《S3c》" + strcomtip + "《/S3c》";

        strcom = getstrinser(content, '<h1 itemprop="name" class="question-name">', '</h1>');
        if (strcom.length == 0) strcom = getstrinser(content, "title: '", "',");
        if (strcom.length == 0) strcom = getstrinser(content, '"title":"', '"');
        if (strcom.length == 0) strerr += "标题,";
        else strcomtotal2 += printstr(strcom, 'S4');
        var strs4 = strcom;
        /* strcom = getstrinser(content, '"show_time":"','"');
		if (strcom.length == 0) strerr += "TIME,";
		else strcomtotal2 += printstr(timetrtostdstr(strcom), 'S6'); */
        strcomtotal += printstr('1', 'S9');
        strcomtotal += printstr('1', 'ID');
        var strq1 = contentstrsub;
        if (contentstrsub.length > 0) {
            strcomtotal2 += "《Q1》" + contentstrsub + "《/Q1》";
        } else {
            strcomtotal2 += "《Q1》问答《/Q1》";
        }
        strcomtotal2 += "《G1》匿名《/G1》"
        contenttagbeg = '<div class="answer-items">';
        contenttagend = '<div class="answer-normal-bottom">';
        contenttagsplit = '<div data-node="answer-item"';
        contentstrsub = getstrinser(content, contenttagbeg, contenttagend);
        contentstrsub = contentstrsub.replace(/\\/g, '');
        if (contentstrsub.length > 0 && content.indexOf(contenttagsplit) > 0) {
            var contentstr = contentstrsub.split(contenttagsplit);
            for (var strli = 1; strli < contentstr.length; strli++) {
                var constr = contentstr[strli];
                strcomtotal = strcomtotal2;
                strcom = getstrinser(constr, 'class="answer-user-name">', ' class="answer-user-tag"');
                if (strcom.length == 0) strerr += "用户,";
                else strcomtotal += printstr(strcom, 'H1');
                strcom = getlaststrinser(constr, '>', '</a> <a data-log=');
                if (strcom.length == 0) strerr += "回复TIME,";
                else strcomtotal += printstr(timetrtostdstr(strcom), 'H2');

                /* strcom = getstrinser(constr, '"text":', '"is_bury"'); */
                strcom = getstrinser_all(constr, '<p>', '</p>')
                if (strcom.length == 0) strerr += "Q1,";
                else strcomtotal += "《H3》" + strcom + "《/H3》";

                strcom = getstrinser(constr, '<span data-node="like-count">', '</span>');
                if (strcom.length == 0) strerr += "点赞数,";
                else strcomtotal += printstr(strcom, 'S13');
                rval.content += "《Root》" + strcomtotal + "《/Root》\n";
                strcomtotal = "";
            }
            if (strerr.length > 0) rval.warn += "data1 ERROR:" + strerr;
            strerr = "";
        } else {
            rval.content += "《Root》" + strcomtotal2 + "《/Root》\n";
            if (strerr.length > 0) rval.warn += "data1 ERROR:" + strerr;
            strerr = "";

        }
    }
    else {
        strcomtotal = "《S1》" + urlname + "《/S1》《S2》今日头条《/S2》《S3a》文章《/S3a》《S5》" + datetostdstr(new Date()) + "《/S5》";
    }
    return true;
    
}
//autohome.com.cn
function getdataautohome(urlname, urltitle, content, rval) {
    if (urlname.indexOf('.autohome.com') < 0) return false;
    if (urlname.indexOf('.htm') < 0) return true;
    if (urlname.search(/(mall\.m|buy|club|sou)\.autohome\.com|\/(config|photolist|pic|price|shuyu|video|dutu|list|wiki)\/|(Section|price|index)\.htm|\?[\d]+\/[\d]+\.html/) > 0) return true;
    if (urlname.indexOf('chejiahao.autohome') > 0) {
        var strs0 = getstrinser(urlname + " ", 'info/', '/|| ');
        if (strs0 == "") return false;
        var strtotal = printstr(strs0, 'S0') + printstr(urlname, 'S1') + printstr('汽车之家', 'S2') + printstr('文章-车家号', 'S3a');
        var strs4 = getstrinser(content, '<div class="title">', '</');
        if (strs4 == '') return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');
        var strs6 = getstrinser(content, '<div class="articleTag">&&<span>&&<span>&&<span>', '</span');
        if (strs6 == '') return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7');
        var strq1 = getstrinser(content, 'id="gallery-selector"&&>', '<div id="gallery-pswp"||<div class="carType">||<div class="tagBot">');
        if (strq1 == '') return false;
        strtotal += printstr(strq1, 'Q1');
        strtotal += printstr(getstrinser(content, '<div class="carType">', '</div').replace('车型：', ''), 'S3b'); //车型
        //strtotal += printstr(getstrinser(content, 't-cur&&>', '<div'), 'S3d'); //导航条
        strtotal += printstr(getstrinser(content, '<div class="tagBot">', '</div').replace('标签：', ''), 'S3c'); //关键词 标签
        strtotal += printstr(getstrinser(content, '<div class="articleTag">&&<span>', '</span'), 'G1');
        //strtotal += printstr(getstrinser(content, '<h1>&&<p class="clearfix">&&</a>&&>', '</'), 'G1a');
        strtotal += printstr(getstrinser(content, '<div class="articleTag">&&<span>&&<span>', '</span'), 'S11'); //浏览数
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
    if (urlname.search(/dealer\.autohome\.com\.cn\/[\d]+\/news/) > 0) {
        var strs0 = getstrinser(urlname + " ", 'news_', '.|| ');
        if (strs0 == "") return false;
        var strtotal = printstr(strs0, 'S0') + printstr(urlname, 'S1') + printstr('汽车之家', 'S2') + printstr('文章-经销商', 'S3a');
        var strs4 = getstrinser(content, '<h1&&>', '</h');
        if (strs4 == '') return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');
        var strs6 = getstrinser(content, '<h1&&<span>', '</span');
        if (strs6 == '') return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7');
        var strq1 = getstrinser(content, '<div id="div_news_content">||<div class="stencil-title">||<h1>', '<div class="disclaimer">||<div class="posted">||<!-- end 模版文章 -->');
        if (strq1 == '') return false;
        strtotal += printstr(strq1, 'Q1');
        //strtotal += printstr(getstrinser(content, '<div class="carType">', '</div').replace('车型：', ''), 'S3b'); //车型
        //strtotal += printstr(getstrinser(content, 't-cur&&>', '<div'), 'S3d'); //导航条
        //strtotal += printstr(getstrinser(content, '<<div class="tagBot">', '</div').replace('标签：', ''), 'S3c'); //关键词 标签
        strtotal += printstr(getstrinser(content, '<em class="mark mark-orange">&&</em>||<h1&&<p>', '<'), 'G1');
        //strtotal += printstr(getstrinser(content, '<h1>&&<p class="clearfix">&&</a>&&>', '</'), 'G1a');
        //strtotal += printstr(getstrinser(content, '<div class="articleTag">&&<span>&&<span>', '</span'), 'S11'); //浏览数
        strtotal += printstr(getstrinser(content, '商家地址：</span>', '</'), 'S8');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
    if (urlname.indexOf('/dealer/') > 0) {
        var strs0 = getlaststrinser(urlname, '/', '.');
        if (strs0 == "") return false;
        var strtotal = printstr(strs0, 'S0') + printstr(urlname, 'S1') + printstr('汽车之家', 'S2') + printstr('文章-经销商', 'S3a');
        var strs4 = getstrinser(content, '<h1&&>', '</h');
        if (strs4 == '') return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');
        var strs6 = getstrinser(content, '<div class="article-info">&&<span>', '</span');
        if (strs6 == '') return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6');
        var strq1 = getstrinser(content, '<div class="dealermain">||<div class="article-text">||<h1>', '<div class="seller-explain">||<!--文章内容区域结束-->||<div class="tab tab02">');
        if (strq1 == '') return false;
        strtotal += printstr(strq1, 'Q1');
        //strtotal += printstr(getstrinser(content, '<div class="carType">', '</div').replace('车型：', ''), 'S3b'); //车型
        //strtotal += printstr(getstrinser(content, 't-cur&&>', '<div'), 'S3d'); //导航条
        //strtotal += printstr(getstrinser(content, '<<div class="tagBot">', '</div').replace('标签：', ''), 'S3c'); //关键词 标签
        strtotal += printstr(getstrinser(content, '<div>商家名称：', '</div'), 'G1');
        strtotal += printstr(getstrinser(content, '<span>来源：', '</'), 'G1a');
        //strtotal += printstr(getstrinser(content, '<div class="articleTag">&&<span>&&<span>', '</span'), 'S11'); //浏览数
        strtotal += printstr(getstrinser(content, '<div>店面地址：', '</div'), 'S8');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
    if (urlname.search(/\/(drive|info|market|news|tech|use|culture)\//) > 0) {
        var strs0 = getlaststrinser(urlname, '/', '.');
        if (strs0 == "") return false;
        strs0 = getlaststrinser(strs0 + " ", '', '-||_|| ');
        var strtotal = printstr(strs0, 'S0') + printstr(urlname, 'S1') + printstr('汽车之家', 'S2') + printstr('文章', 'S3a');
        var strs4 = getstrinser(content, '<h1&&>', '</h');
        if (strs4 == '') return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');
        var strs6 = getstrinser(content, '<span class="time">', '</span');
        if (strs6 == '') return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6');
        var strq1 = getstrinser(content, '<div class="details" id="articleContent">||<!-- 文章正文 start -->||<h1>', '<!-- 文章评价 start -->||<div class="athm-page">||<div class="recommend-read"');
        if (strq1 == '') return false;
        strtotal += printstr(strq1, 'Q1');
        strtotal += printstr(getstrinser(content, '<div class="athm-sub-nav__car__name">', '</div'), 'S3b'); //车型
        strtotal += printstr(getstrinser(content, '<span>当前位置：</span>', '<span>正文</span>||</div'), 'S3d'); //导航条
        strtotal += printstr(getstrinser(content, '文章标签：||<div class="marks">', '</div'), 'S3c'); //关键词 标签
        strtotal += printstr(getstrinser(content, ' <div class="name">', '</div'), 'G1');
        strtotal += printstr(getstrinser(content, '<span class="source">来源：', '</'), 'G1a');
        //strtotal += printstr(getstrinser(content, '<div class="articleTag">&&<span>&&<span>', '</span'), 'S11'); //浏览数
        strtotal += printstr(getstrinser(content, '<strong>经销商地址：</strong>', '<br'), 'S8');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
    return false;
}
//.sohu.com
function getdatasohu(urlname, urltitle, content, rval) {
    if (urlname.indexOf('.sohu.com') < 0) return false;
    if (urlname.search(/2sc\.sohu|\/\/db\.|dealer\.|v\.|caipiao\.|difangzhan\/|sports\./i) > 0) return true;
    if (urlname.search(/m\.sohu\.com\/(news\/)?a\//) > 0) {
        var strs0 = getstrinser(urlname + ' ', '/a/', '.|| ');
        if (strs0 == "") return false;
        var strtotal = printstr(strs0, 'S0') + printstr(urlname, 'S1') + printstr('搜狐', 'S2') + printstr('文章', 'S3a');
        var strs4 = getstrinser(content, '<h2 class="title-info">', '</h');
        if (strs4 == '') return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');
        var strs6 = getstrinser(content, '<footer class="time">', '</footer');
        if (strs6 == '') return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6');
        var strq1 = getstrinser(content, '<div class="display-content">||<section id="articleContent" class="article-content">||<article>', '<footer class="article-tags">||<section class="statement">||</article>||<section id="shareArea">');
        if (strq1 == '') return false;
        strtotal += printstr(strq1, 'Q1');
        //strtotal += printstr(getstrinser(content, '<div class="theLogo">&&<div class="theCurrent&&<a&&>', '</div'), 'S3d'); //导航条
        //strtotal += printstr(getstrinser(content, '<div class="alst">', '</div'), 'S3c');
        //strtotal += printstr(getstrinser(content, '<span class="source js-source">', '</'), 'G1');
        strtotal += printstr(getstrinser(content, '<header class="name">', '</'), 'G1a');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
    if (urlname.indexOf('/a/') > 0) {
        var strs0 = getstrinser(urlname + " ", '/a/', '.|| ');
        if (strs0 == "") return false;
        var strtotal = printstr(strs0, 'S0') + printstr(urlname, 'S1') + printstr('搜狐', 'S2') + printstr('文章', 'S3a');
        var strs4 = getstrinser(content, '<h1&&>', '</h');
        if (strs4 == '') return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');
        var strs6 = getstrinser(content, 'id="news-time" data-val="', '"');
        if (strs6 == '') return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6');
        var strq1 = getstrinser(content, '<article class="article"&&>||<div class="text-title">||<div class="text">', '<div class="statement">||<div class="article-oper">||<div class="user-god clear" id="user-post">||<div class="sidebar right"');
        if (strq1 == '') return false;
        strtotal += printstr(strq1, 'Q1');
        //strtotal += printstr(getstrinser(content, '<div class="theLogo">&&<div class="theCurrent&&<a&&>', '</div'), 'S3d'); //导航条
        //strtotal += printstr(getstrinser(content, '<div class="alst">', '</div'), 'S3c');
        strtotal += printstr(getstrinser(content, 'id="user-info">&&<h4>&&>', '</'), 'G1');
        //strtotal += printstr(getstrinser(content, '<header class="name">', '</'), 'G1a');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
    if (urlname.indexOf('auto.sohu.com') > 0) {
        var strs0 = getlaststrinser(urlname, '/', '.');
        if (strs0 == "") return false;
        strs0 = getlaststrinser(strs0 + ' ', '', '-||_|| ');
        var strtotal = printstr(strs0, 'S0') + printstr(urlname, 'S1') + printstr('搜狐', 'S2') + printstr('文章', 'S3a');
        var strs4 = getstrinser(content, '<h1&&>', '</h');
        if (strs4 == '') return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');
        var strs6 = getstrinser(content, 'id="pubtime_baidu"&&>||<div class="time">', '</');
        if (strs6 == '') return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6');
        var strq1 = getstrinser(content, 'id="contentText"&&>||<!-- 正文 -->||<div class="news-info clear">||<div class="content-wrapper">', '<!-- seo标签描述 -->||<!-- 正文 end -->||<div class="report" id="report">||<div class="big-share clear" id="big-share"||</div>');
        if (strq1 == '') return false;
        strtotal += printstr(strq1, 'Q1');
        strtotal += printstr(getstrinser(content, '<div id="location"&&>||', '<!-- 当前位置 end -->||</span||</div'), 'S3d'); //导航条
        strtotal += printstr(getstrinser(content, '<span class="tag">', '</span'), 'S3c');
        strtotal += printstr(getstrinser(content, '<span class="writer">|| 作者：', '</'), 'G1');
        strtotal += printstr(getstrinser(content, '<span class="sc">来源：', '</'), 'G1a');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
    return false;
}
//一点资讯
function getyidianzixun(urlname, urltitle, content, rval) {
    if (urlname.indexOf('.yidianzixun.') == -1) return false;
    var strs0 = getlaststrinser(urlname, '/', '');
    if (strs0 == "") return false;
    var strtotal = printstr(strs0, "S0") + printstr(urlname, "S1") + printstr("一点资讯", "S2") + printstr("文章", "S3a") + printstr(datetostdstr(new Date()), 'S5');
    var strs4 = getstrinser(content, '<h2>', '</h2>');
    if (strs4 != "") strtotal += printstr(strs4, 'S4');
    else return false;
    var strs6 = getstrinser(content, '<div class="meta">&&</&&>&&>', '</');
    if (strs6 != "") {
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6');
    }
    else return false;
    var strcom = getstrinser(content, '"id":"', '"');
    if (strcom == "") strtotal += printstr(strs4 + strs6, 'S0');
    else printstr(strcom, 'S0');

    strtotal += printstr(getstrinser(content, '<div class="left-wrapper">', '<div class="interact">||<div class="comments">||<div class="right-wrapper">'), 'Q1');
    strcom = getstrinser(content, '<div class="meta">&&>', '</');
    if (strcom != "") {
        if (strcom.indexOf('来源：') == 0) {
            strcom = strcom.replace('来源：', "");
            strtotal += printstr(strcom, 'G1a')
        }
        else {
            strtotal += printstr(getstrinser(content, '<p>来源：', '</p'), 'G1a')
        }
        strtotal += printstr(strcom, 'G1')
    }
    rval.content += printstr(strtotal, "Root");
    return true;
}
//16888
function getdata16888(urlname, urltitle, content, rval) {
    if (urlname.indexOf('.16888.com') < 0) return false;
    if (getstrinser(urlname, '.16888.com/', '') == "") return true;
    if (urlname.search(/(buy|dealer|koubei|price|www)\.16888\.|\/c\/|\.16888\.com\/(price|about)\//i) > 0) return true;
    if (urlname.indexOf('.4s.16888.com') > 0) {
        var strs0 = getstrinser(urlname, '/detail/', '');
        if (strs0 == "") return true;
        var strtotal = printstr(strs0, 'S0') + printstr(urlname, 'S1') + printstr('车主之家', 'S2') + printstr('文章经销商', 'S3a');
        var strs4 = getstrinser(content, '<div class="news_title">', '</div');
        if (strs4 == '') return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');
        var strs6 = getstrinser(content, '<div class="news_admin">&&<span>', '</span');
        if (strs6 == '') return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6');
        var strq1 = getstrinser(content, '<div class="news_con_box table-one">||<div class="newsdetails-text">||<div class="newsdetails-box">', '<div class="mod-dealer g-mt10">||<div class="n_usercon"||<div class="cars-share clearfix"||<!-- 询问最低价 [[-->');
        if (strq1 == '') return false;
        strtotal += printstr(strq1, 'Q1');
        strtotal += printstr(getstrinser(content, '<div class="crumb-box">', '</div'), 'S3d'); //导航条
        //strtotal += printstr(getstrinser(content, '<div class="alst">', '</div'), 'S3c');
        strtotal += printstr(getstrinser(content, '<span>店面地址：</span>', '</span'), 'S8');
        strtotal += printstr(getstrinser(content, '<span>经销商：', '</'), 'G1');
        strtotal += printstr(getstrinser(content, '<span>商家名称：</span>', '</span'), 'G1a');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
    if (urlname.indexOf('m.16888.com/dealer/') > 0) {
        var strs0 = getstrinser(urlname, '/newsDetail/', '');
        if (strs0 == "") return true;
        var strtotal = printstr(strs0, 'S0') + printstr(urlname, 'S1') + printstr('车主之家', 'S2') + printstr('文章经销商', 'S3a');
        var strs4 = getstrinser(content, '<h1&&>', '</h');
        if (strs4 == '') return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');
        var strs6 = getstrinser(content, '<h1&&<span>', '</span');
        if (strs6 == '') return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6');
        var strq1 = getstrinser(content, '<div class="macket-detail">||<div class="mod-newsdetail">', '<div class="mod-consultation mod-met g-mt10">||<div class="mod-benefit mod-met g-mt10">||<div class="mod-fastbar clearfix">||<p class="p-info">');
        if (strq1 == '') return false;
        strtotal += printstr(strq1, 'Q1');
        //strtotal += printstr(getstrinser(content, '<div class="crumb-box">', '</div'), 'S3d'); //导航条
        //strtotal += printstr(getstrinser(content, '<div class="alst">', '</div'), 'S3c');
        strtotal += printstr(getstrinser(content, '<span>地址：</span>', '</'), 'S8');
        strtotal += printstr(getstrinser(content, '<span>来源：', '</'), 'G1');
        strtotal += printstr(getstrinser(content, '<div class="enroll-bottom g-mt10">&&<h3>', '</'), 'G1a');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
    if (urlname.indexOf('m.16888.com') > 0) {
        var strs0 = getlaststrinser(urlname, '/', '.');
        if (strs0 == "") return false;
        var strtotal = printstr(strs0, 'S0') + printstr(urlname, 'S1') + printstr('车主之家', 'S2') + printstr('文章', 'S3a');
        var strs4 = getstrinser(content, '<h1&&>', '</h');
        if (strs4 == '') return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');
        var strs6 = getstrinser(content, '<h1&&<span>&&<span>&&<span>', '</span');
        if (strs6 == '') return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6');
        var strq1 = getstrinser(content, '<div class="quotation-box g-mt10">||<div class="mod-quotation">||<div class="mod-newsdetail">', '<div class="quotation-box-bottom g-mt10">||<div class="quotation-box-link g-mt10">||<div class="mod-relationcar clearfix">||<div class="mod-relevant g-mt10">');
        if (strq1 == '') return false;
        strtotal += printstr(strq1, 'Q1');
        //strtotal += printstr(getstrinser(content, '<div class="crumb-box">', '</div'), 'S3d'); //导航条
        //strtotal += printstr(getstrinser(content, '<div class="alst">', '</div'), 'S3c');
        //strtotal += printstr(getstrinser(content, '<span>地址：</span>', '</'), 'S8');
        strtotal += printstr(getstrinser(content, '<h1&&<span>&&<span>', '</'), 'G1');
        strtotal += printstr(getstrinser(content, '<h1&&<span>', '</'), 'G1a');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
    if (urlname.indexOf('news.16888.com/a/') > 0) {
        var strs0 = getlaststrinser(urlname, '/', '.');
        if (strs0 == "") return false;
        var strtotal = printstr(strs0, 'S0') + printstr(urlname, 'S1') + printstr('车主之家', 'S2') + printstr('文章', 'S3a');
        var strs4 = getstrinser(content, '<div class="news_title">', '</div');
        if (strs4 == '') return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');
        var strs6 = getstrinser(content, '<div class="news_admin">&&<span>', '</span');
        if (strs6 == '') return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6');
        var strq1 = getstrinser(content, '<div class="market-content-cx">||<div class="news_macket">||<div id="news_content" class="">||<!-- 新闻正文 [[-->', '<iframe id="J_MainOrderIfrema"||<div class="n_usercon"||<div class="cars-share clr J_newsShare"||<div class="new_related">||<!--]] 新闻正文 -->');
        if (strq1 == '') return false;
        strtotal += printstr(strq1, 'Q1');
        strtotal += printstr(getstrinser(content, '<div class="web_site">&&当前位置：', '</div'), 'S3d'); //导航条
        //strtotal += printstr(getstrinser(content, '<div class="alst">', '</div'), 'S3c');
        strtotal += printstr(getstrinser(content, '<span>店面地址：</span>', '</span'), 'S8');
        strtotal += printstr(getstrinser(content, '<span>经销商：||<span>商家名称：</span>', '</'), 'G1');
        strtotal += printstr(getstrinser(content, '<div class="news_admin">&&来源：', '</'), 'G1a');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
    return false;
}
//.bitauto.com
function getdatabitauto(urlname, urltitle, content, rval) {
    if (urlname.indexOf('.bitauto.com') < 0) return false;
    if (urlname.search(/(advisor|ask|baa|car|chezhan|mai|jiangjia|koubei|photo|price|\/v|jiangjia)\.bitauto\.com|\/(cheshi|price_detail|daogou|zhuanti)\//i) > 0) return true;
    if (urlname.indexOf('dealer.bitauto.com') > 0) {
        if (urlname.indexOf('/news/') < 0) return true;
        var strs0 = getlaststrinser(urlname, '/', '.');
        if (strs0 == "") return false;
        strs0 = getstrinser(strs0 + ' ', "", '_|-| ');
        var strtotal = printstr(strs0, 'S0') + printstr(urlname, 'S1') + printstr('易车网', 'S2') + printstr('文章经销商', 'S3a');
        var strs4 = getstrinser(content, '<h1 class="ad">', '</h');
        if (strs4 == '') return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');
        var strs6 = getstrinser(content, '> 发布时间：', '</span');
        if (strs6 == '') return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6');
        var strq1 = getstrinser(content, '<div class="article">||<div class="subinfo">||<h1 class="ad">', '<div class="mapbox"||<div class="common-disclaimer">||<div class="ycshare"');
        if (strq1 == '') return false;
        strtotal += printstr(strq1, 'Q1');
        strtotal += printstr(getstrinser(content, '<div class="brand">', '</div'), 'S3d'); //导航条
        //strtotal += printstr(getstrinser(content, '<div class="alst">', '</div'), 'S3c');
        strtotal += printstr(getstrinser(content, '<p class="nomart">&&地址：', '</'), 'S8');
        strtotal += printstr(getstrinser(content, '<div class="brand">', '</'), 'G1');
        //strtotal += printstr(getstrinser(content, '<span>商家名称：</span>', '</span'), 'G1a');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
    if (urlname.search(/(news|admin)\.bitauto\.com/) > 0) {
        var strs0 = getstrinser(content, "newsId = '", "'");
        if (strs0 == "") return false;
        var strtotal = printstr(strs0, 'S0') + printstr(urlname, 'S1') + printstr('易车网', 'S2') + printstr('文章', 'S3a');
        var strs4 = getstrinser(content, "title = '", "'");
        if (strs4 == '') return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');
        var strs6 = getstrinser(content, "createtime: '", "'");
        if (strs6 == '') return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6');
        var strq1 = getstrinser(content, 'id="openimg_articlecontent">||<!-- 新闻内容 start -->||<h1 class="tit-h1">', '<article>||<!-- article end -->||<div class="v-s-box clearfix">');
        if (strq1 == '') return false;
        strtotal += printstr(strq1, 'Q1');
        strtotal += printstr(getstrinser(content, '<div class="brand-info">', '</h1'), 'S3b');
        strtotal += printstr(getstrinser(content, ' 关键字： ||<!-- 关键字 start -->', '<!-- 关键字 end -->||</div'), 'S3c');
        strtotal += printstr(getstrinser(content, '<span>当前位置：</span>', '</div'), 'S3d'); //导航条
        strtotal += printstr(getstrinser(content, '<p class="nomart">&&地址：', '</'), 'S8');
        strtotal += printstr(getstrinser(content, '<p class="p-n">||<span>作者：', '</'), 'G1');
        strtotal += printstr(getstrinser(content, '<span>来自</span>||<span>来源：', '</'), 'G1a');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
    return false;
}
//auto.sina.com.cn
function getdatasina_detail(urlname, urltitle, content, rval) {
    if (urlname.indexOf('auto.sina.com.cn') < 0) return false;
    if (urlname.search(/\/(news|bdcs|csdt|xcpc|cshh)\/\d+-\d+-\d+\//) > 0) {
        var strcom = getstrinser(urlname, '/', '.shtml');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('新浪汽车', 'S2') + printstr('文章', 'S3a');
        strtotal += printstr(getstrinser(content, 'subHead">', '</div'), 'S3d')
        var strq1 = getstrinser(content, 'id="zwmain">', '<div class="content_shareto||<div class="tool">');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');
        var strs4 = getstrinser(strq1, '<h1>', '</h1>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');
        var strs6 = getstrinser(content, '<span class="pub_date">', '</');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        var strg1 = getstrinser(content, '<span class="media_name">', '<');
        if (strg1 == "") return false;
        strtotal += printstr(strg1, 'G1')
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
    if (urlname.search(/\/(autonews|j_kandian|newcar|info|review|news)/) > 0) {
		var strcom = getstrinser(urlname, '/detail-','.shtml');
		if (strcom == "") strcom = getstrinser(urlname, 'docid=', '&subch');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('新浪汽车', 'S2') + printstr('文章', 'S3a');
        strtotal += printstr(getstrinser(content, '"cnav_breadcrumbs_p">', '</div>'), 'S3d')
        var strq1 = getstrinser(content, 'id="artibody">', '<div class="article-bottom');
		if (strq1 == "") return false;
        var strs4 = getstrinser(content, '"main-title">', '</h1>');
        if (strs4 == "") return false;
        strtotal += printstr(strq1, 'Q1') + printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');
        var strs6 = getstrinser(content, '<span class="data">', '</span>');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        var strg1 = getstrinser(content, '<div class="show_author">', '</div>');
        if (strg1 == "") return false;
        strtotal += printstr(strg1, 'G1')
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
	}
	if (urlname.search(/\/mp\/w\/.+\/detail-/) > 0) {
        var strcom = getstrinser(urlname, '/detail-','.shtml');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('新浪汽车', 'S2') + printstr('文章', 'S3a');
        strtotal += printstr(getstrinser(content, 'article-bread">', '</div>'), 'S3d')
        var strq1 = getstrinser(content, 'id="articleContent">', '<div class="spacer');
        if (strq1 == "") return false;
        var strs4 = getstrinser(content, '<meta name="keywords" content="', '">');
        if (strs4 == "") return false;
        strtotal += printstr(strq1, 'Q1') + printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');
        var strs6 = getstrinser(content, '<span class="time-source">', '<span');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        var strg1 = getstrinser(content, '<span class="article-user">', '</span>');
        if (strg1 == "") return false;
        strtotal += printstr(strg1, 'G1')
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
	}

    return false;
}
//pcauto.com.cn
function getdatapcauto(urlname, urltitle, content, rval) {
    if (urlname.indexOf('pcauto.com.cn') < 0) return false;
    if (urlname.search('/\.html/i') < 0) return true;
    if (urlname.search('/\/comment\/|price\.html/i') > 0) return true;
    if (urlname.search(/\/(qcbj|beijing|teach|news|pocket)\/\d{4}\//) > 0) {
        var strcom = getstrinser(urlname, '/','.html');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('太平洋汽车网', 'S2') + printstr('文章', 'S3a');
        strtotal += printstr(getstrinser(content, '<div class="pos-mark">', '</div>'), 'S3d');
        var strq1 = getstrinser(content, 'id="js_content" lang="="en"">', '</div>');
        if (strq1 == "") return false;
        var strs4 = getstrinser(content, '<span class="tit">', '</span>');
        if (strs4 == "") return false;
        strtotal += printstr(strq1, 'Q1') + printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');
        var strs6 = getstrinser(content, 'id="pubtime_baidu">', '</span>');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        var strg1 = getstrinser(content, '<span class="editor">', '</span>');
        if (strg1 == "") return false;
        strtotal += printstr(strg1, 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
	}
	if (urlname.search(/m\.pcauto\.com\.cn\/x\/\d{4}/) > 0) {
        var strcom = getstrinser(urlname, 'xmip/','.html');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('太平洋汽车网', 'S2') + printstr('文章', 'S3a');
        strtotal += printstr(getstrinser(content, '<span class="crumb">', '</span>'), 'S3d');
        var strq1 = getstrinser(content, 'id="JartCon">', '<script');
        if (strq1 == "") return false;
        var strs4 = getstrinser(content, '<h1 class="m-art-title">', '</h1>');
        if (strs4 == "") return false;
        strtotal += printstr(strq1, 'Q1') + printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');
        var strs6 = getstrinser(content, '<span class="sInfo-2">', '</span>');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        var strg1 = getstrinser(content, 'id="Jauthor">', '</span>');
        if (strg1 == "") return false;
        strtotal += printstr(strg1, 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
	}
	if (urlname.search(/price\.\S+news_detail/) > 0) {
        var strcom = getstrinser(urlname, '/news_detail','.html');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('太平洋汽车网', 'S2') + printstr('文章', 'S3a');
        strtotal += printstr(getstrinser(content, 'class="topmto topmtocx clearfix inner">', '</div>'), 'S3d');
        var strq1 = getstrinser(content, '<span class="zwcxzx">', '</span>');
        if (strq1 == "") return false;
        var strs4 = getstrinser(content, '<p class="tit">', '</p>');
        if (strs4 == "") return false;
        strtotal += printstr(strq1, 'Q1') + printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');
        // var strs6 = getstrinser(content, '<span class="sInfo-2">', '</span>');
        var strs6 = " ";
        // strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        // var strg1 = getstrinser(content, 'id="Jauthor">', '</span>');
        strg1 = " ";
        strtotal += printstr(strg1, 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true
	}
	if (urlname.search(/\/article\/\d+\./) > 0) {
        var strcom = getstrinser(urlname, 'article/','.html');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('太平洋汽车网', 'S2') + printstr('文章', 'S3a');
        strtotal += printstr(' ', 'S3d');
        var strq1 = getstrinser(content, '<div class="content">', '</div>');
        if (strq1 == "") return false;
        var strs4 = getstrinser(content, '<h1 class="title">', '</h1>');
        if (strs4 == "") return false;
        strtotal += printstr(strq1, 'Q1') + printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');
        var strs6 = getstrinser(content, '<span class="muted update">', '</span>');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        // var strg1 = getstrinser(content, 'id="Jauthor">', '</span>');
        strg1 = " ";
        strtotal += printstr(strg1, 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
	}
    if (urlname.search(/bbs\.\S+\/topic-/) > 0) {
        var strcom = getstrinser(urlname, 'topic-','.html');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('太平洋汽车网', 'S2') + printstr('文章', 'S3a');
        strtotal += printstr(getstrinser(content, '<div class="com-crumb">', '</div>'), 'S3d');
        var strq1 = getstrinser(content, '<div class="post_msg replyBody">', '<div class="best-hight');
        if (strq1 == "") return false;
        var strs4 = getstrinser(content, '<i id="subjectTitle">', '</i>');
        if (strs4 == "") return false;
        strtotal += printstr(strq1, 'Q1') + printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');
        var strs6 = getstrinser(content, '<div class="post_time">', '</div>');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        // var strg1 = getstrinser(content, 'id="Jauthor">', '</span>');
        strg1 = " ";
        strtotal += printstr(strg1, 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
    if (urlname.search(/hj\.\S+\/article/) > 0) {
        var strcom = getstrinser(urlname, 'article/','.html');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('太平洋汽车网', 'S2') + printstr('文章', 'S3a');
        strtotal += printstr('', 'S3d');
        var strq1 = getstrinser(content, '<div class="content">', '</div>');
        if (strq1 == "") return false;
        var strs4 = getstrinser(content, '<h1 class="title">', '</h1>');
        if (strs4 == "") return false;
        strtotal += printstr(strq1, 'Q1') + printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');
        var strs6 = getstrinser(content, '<span class="muted update">', '</span>');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        // var strg1 = getstrinser(content, 'id="Jauthor">', '</span>');
        strg1 = " ";
        strtotal += printstr(strg1, 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
    if (urlname.search(/m\.pcauto\.com\.cn\/\d{4}/) > 0) {
        var strcom = getstrinser(urlname, 'cn/','.html');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('太平洋汽车网', 'S2') + printstr('文章', 'S3a');
        strtotal += printstr(getstrinser(content, '<div class="nav">', '</div>'), 'S3d');
        var strq1 = getstrinser(content, '<div class="extTxtp">', '</div>');
        if (strq1 == "") return false;
        var strs4 = getstrinser(content, '<div class="dTitle">', '</div>');
        if (strs4 == "") return false;
        strtotal += printstr(strq1, 'Q1') + printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');
        var strs6 = getstrinser(content, '<span class="dDate">', '</span>');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        // var strg1 = getstrinser(content, 'id="Jauthor">', '</span>');
        strg1 = " ";
        strtotal += printstr(strg1, 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
    if (urlname.search(/(nd|www)\.pcauto\.com\.cn\/(wenhua|teach|qcbj|\d{4})/) > 0) {
        var strcom = getstrinser(urlname, 'cn/','.html');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('太平洋汽车网', 'S2') + printstr('文章', 'S3a');
        strtotal += printstr(getstrinser(content, '<div class="pos-mark">', '</div>'), 'S3d');
        var strq1 = getstrinser(content, '<div class="artText clearfix">', '<div id="J_box_ivy">');
        if (strq1 == "") return false;
        var strs4 = getstrinser(content, '<span class="tit">', '</span>');
        if (strs4 == "") return false;
        strtotal += printstr(strq1, 'Q1') + printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');
        var strs6 = getstrinser(content, '<span class="pubTime">', '</span>');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        var strg1 = getstrinser(content, '<span class="editor">', '</span>');
        strtotal += printstr(strg1, 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }


    return false;
}
//ifeng
function getdataifeng(urlname, urltitle, content, rval) {
    if (urlname.indexOf('.ifeng.com') < 0) return false;
    if (urlname.charAt(urlname.length - 1) == '/') return true;
    if (urlname.search(/\/(series|pic)\/|mblog\./) > 0) return true;

    if (urlname.indexOf('wemedia.ifeng.com') > 0) {
        var strs0 = getstrinser(urlname, '.com/', '/');
        if (strs0 == "") strs0 = getstrinser(urlname, '.com/', '.');
        if (strs0 == "") return false;
        var strtotal = printstr(strs0, 'S0') + printstr(urlname, 'S1') + printstr('凤凰汽车', 'S2') + printstr('文章', 'S3a');
        var strs4 = getstrinser(content, '<h1>', '</');
        if (strs4 == '') return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');
        var strs6 = getstrinser(content, '<h1>&&<span>', '</');
        if (strs6 == '') return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6');
        var strq1 = getstrinser(content, '<div class="yc_con_l">', '<p>编辑推荐阅读：</p>||本文来自大风号，仅代表大风号自媒体观点||<!-- 正文end -->||<div class="txt_share_box">');
        if (strq1 == '') return false;
        strtotal += printstr(strq1, 'Q1');
        //strtotal += printstr(getstrinser(content, 't-cur&&>', '<div'), 'S3d'); //导航条
        //strtotal += printstr(getstrinser(content, '<div class="alst">', '</div'), 'S3c');
        strtotal += printstr("大风号", 'G1');
        strtotal += printstr(getstrinser(content, '<h1>&&<p class="clearfix">&&</a>&&>', '</'), 'G1a');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
    if (urlname.search('/auto\.ifeng\.com\/\D+/') > 0) {
        var strs0 = getlaststrinser(urlname, '/', '.shtml');
        if (strs0 == "") return false;
        var strtotal = printstr(strs0, 'S0') + printstr(urlname, 'S1') + printstr('凤凰汽车', 'S2') + printstr('文章', 'S3a');
        var strs4 = getstrinser(content, '<div class="arl-cont">&&<h3&&>', '</h');
        if (strs4 == '') return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');
        var strs6 = getstrinser(content, 'id="pubtime_baidu">', '</');
        if (strs6 == '') return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6');
        var strq1 = getstrinser(content, '<!--文章内容 begin-->||<div class="arl-c-txt">', '<!--文章内容 end-->||<div id="articlexpend">||<div class="arl-label">');
        if (strq1 == '') return false;
        strtotal += printstr(strq1, 'Q1');
        //strtotal += printstr(getstrinser(content, 't-cur&&>', '<div'), 'S3d'); //导航条
        //strtotal += printstr(getstrinser(content, '<div class="alst">', '</div'), 'S3c');
        //strtotal += printstr("大风号", 'G1');
        strtotal += printstr(getstrinser(content, 'id="source_baidu">来源：', '</span'), 'G1a');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
    if (urlname.indexOf('/video_') > 0) {
        var strs0 = getlaststrinser(urlname, '/video_', '.');
        if (strs0 == "") return false;
        var strtotal = printstr(strs0, 'S0') + printstr(urlname, 'S1') + printstr('凤凰汽车', 'S2') + printstr('视频', 'S3a');
        var strs4 = getstrinser(content, '<h2>', '</h');
        if (strs4 == '') return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');
        var strs6 = getstrinser(content, '<span class="data">', '</');
        if (strs6 == '') return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6');
        //var strq1 = getstrinser(content, '<!--文章内容 begin-->||<div class="arl-c-txt">', '<!--文章内容 end-->||<div id="articlexpend">||<div class="arl-label">');
        //if (strq1 == '') return false;
        //strtotal += printstr(strq1, 'Q1');
        //strtotal += printstr(getstrinser(content, 't-cur&&>', '<div'), 'S3d'); //导航条
        //strtotal += printstr(getstrinser(content, '<div class="alst">', '</div'), 'S3c');
        //strtotal += printstr("大风号", 'G1');
        //strtotal += printstr(getstrinser(content, 'id="source_baidu">来源：', '</span'), 'G1a');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
    if (urlname.indexOf('ifeng.com/news/quanmeiti/') > 0) {
        var strs0 = getlaststrinser(urlname, '/', '.');
        if (strs0 == "") return false;
        var strtotal = printstr(strs0, 'S0') + printstr(urlname, 'S1') + printstr('凤凰汽车', 'S2') + printstr('文章', 'S3a');
        var strs4 = getstrinser(content, '<h1>', '</h');
        if (strs4 == '') return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');
        var strs6 = getstrinser(content, '<h1>&<span>', '</div');
        if (strs6 == '') return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6');
        var strq1 = getstrinser(content, 'id="whole_content">', '</div||a end-->');
        if (strq1 == '') return false;
        strtotal += printstr(strq1, 'Q1');
        //strtotal += printstr(getstrinser(content, 't-cur&&>', '<div'), 'S3d'); //导航条
        //strtotal += printstr(getstrinser(content, '<div class="alst">', '</div'), 'S3c');
        strtotal += printstr(getstrinser(content, '<h1>&&title="">', '</'), 'G1');
        //strtotal += printstr(getstrinser(content, 'id="source_baidu">来源：', '</span'), 'G1a');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
    if (urlname.indexOf('dealer.auto.ifeng.com') > 0) {
        var strs0 = getlaststrinser(urlname, '_', '.');
        if (strs0 == "") return false;
        var strtotal = printstr(strs0, 'S0') + printstr(urlname, 'S1') + printstr('凤凰汽车', 'S2') + printstr('文章', 'S3a');
        var strs4 = getstrinser(content, '<h2>', '</h');
        if (strs4 == '') return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');
        var strs6 = getstrinser(content, '<div class="dl_cont_det_info">&&<em>&&<em>', '</');
        if (strs6 == '') return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6');
        var strq1 = getstrinser(content, 'id="whole_content">', '</div||a end-->');
        if (strq1 == '') return false;
        strtotal += printstr(strq1, 'Q1');
        //strtotal += printstr(getstrinser(content, 't-cur&&>', '<div'), 'S3d'); //导航条
        //strtotal += printstr(getstrinser(content, '<div class="alst">', '</div'), 'S3c');
        strtotal += printstr(getstrinser(content, '<div class="dl_cont_det_info">&&<em>', '</'), 'G1');
        strtotal += printstr(getstrinser(content, '<label> 文章来源: </label>', '</'), 'G1a');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
    if (urlname.search('/(news|tech|jx)\.ifeng\.com\/a/') > 0) {
        var strs0 = getlaststrinser(urlname, '/', '_');
        if (strs0 == "") strs0 = getlaststrinser(urlname, 'a/', '.shtml');
        if (strs0 == "") return false;
        var strtotal = printstr(strs0, 'S0') + printstr(urlname, 'S1') + printstr('凤凰汽车', 'S2') + printstr('文章', 'S3a');
        var strs4 = getstrinser(content, 'id="artical_topic">', '</');
        if (strs4 == '') return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');
        var strs6 = getstrinser(content, 'itemprop="datePublished"&&>', '</');
        if (strs6 == '') return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6');
        var strq1 = getstrinser(content, '<!--mainContent begin-->||<div id="main_content"&&>', '<!--mainContent end-->||<!--相关新闻-->||<div class="relateNews||</div');
        if (strq1 == '') return false;
        strtotal += printstr(strq1, 'Q1');
        strtotal += printstr(getstrinser(content, '<div class="theLogo">&&<div class="theCurrent&&<a&&>', '</div'), 'S3d'); //导航条
        //strtotal += printstr(getstrinser(content, '<div class="alst">', '</div'), 'S3c');
        //strtotal += printstr(getstrinser(content, '<div class="dl_cont_det_info">&&<em>', '</'), 'G1');
        //strtotal += printstr(getstrinser(content, '<label> 文章来源: </label>', '</'), 'G1a');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
    if (urlname.indexOf('h5.ifeng.com') > 0) {
        var strs0 = getlaststrinser(urlname, '_', '.');
        if (strs0 == "") return false;
        var strtotal = printstr(strs0, 'S0') + printstr(urlname, 'S1') + printstr('凤凰汽车', 'S2') + printstr('文章', 'S3a');
        var strs4 = getstrinser(content, '<h3>', '</');
        if (strs4 == '') return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');
        var strs6 = getstrinser(content, '<h3>&&<p>', '</');
        if (strs6 == '') return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6');
        var strq1 = getstrinser(content, '<div class="main_text"&&>', '<div class="nexttit">||<div class="yicha_seach">||<div class="btm_tg">');
        if (strq1 == '') return false;
        strtotal += printstr(strq1, 'Q1');
        //strtotal += printstr(getstrinser(content, '<div class="theLogo">&&<div class="theCurrent&&<a&&>', '</div'), 'S3d'); //导航条
        //strtotal += printstr(getstrinser(content, '<div class="alst">', '</div'), 'S3c');
        strtotal += printstr(getstrinser(content, '<h3>&&:&& ', '<'), 'G1');
        //strtotal += printstr(getstrinser(content, '<label> 文章来源: </label>', '</'), 'G1a');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
    if (urlname.indexOf('i.ifeng.com/auto') > 0) {
        var strs0 = getstrinser(urlname, 'aid=', '');
        if (strs0 == "") return false;
        var strtotal = printstr(strs0, 'S0') + printstr(urlname, 'S1') + printstr('凤凰汽车', 'S2') + printstr('文章', 'S3a');
        var strs4 = getstrinser(content, '<div class="tpl_header_title">', '</');
        if (strs4 == '') return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');
        var strs6 = getstrinser(content, '<div class="tpl_header_date">', '</');
        if (strs6 == '') return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6');
        var strq1 = getstrinser(content, '<div id="content">||<div id="main_content"&&>', '<div id="article_bottom"||</div');
        if (strq1 == '') return false;
        strtotal += printstr(strq1, 'Q1');
        //strtotal += printstr(getstrinser(content, '<div class="theLogo">&&<div class="theCurrent&&<a&&>', '</div'), 'S3d'); //导航条
        //strtotal += printstr(getstrinser(content, '<div class="alst">', '</div'), 'S3c');
        strtotal += printstr(getstrinser(content, '<div class="tpl_header_author">', '</'), 'G1');
        //strtotal += printstr(getstrinser(content, '<label> 文章来源: </label>', '</'), 'G1a');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    } 
    if (urlname.indexOf('api.3g.ifeng.com') > 0) {
        var strs0 = getstrinser(urlname, 'aid=', '&');
        if (strs0 == "") strs0 = getstrinser(urlname, 'aid=', '');
        if (strs0 == "") return false;
        var strtotal = printstr(strs0, 'S0') + printstr(urlname, 'S1') + printstr('凤凰汽车', 'S2') + printstr('文章', 'S3a');
        var strs4 = getstrinser(content, '<p class="titin">', '</');
        if (strs4 == '') return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');
        var strs6 = getstrinser(content, '<p class="titcc">', '</');
        if (strs6 == '') return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6');
        var strq1 = getstrinser(content, '<div class="zwword">', '<div class="pnpage||<div class="tijiaopl">||<div class="yicha_seach">||</div');
        if (strq1 == '') return false;
        strtotal += printstr(strq1, 'Q1');
        //strtotal += printstr(getstrinser(content, '<div class="theLogo">&&<div class="theCurrent&&<a&&>', '</div'), 'S3d'); //导航条
        //strtotal += printstr(getstrinser(content, '<div class="alst">', '</div'), 'S3c');
        //strtotal += printstr(getstrinser(content, '<div class="tpl_header_author">', '</'), 'G1');
        strtotal += printstr(getstrinser(content, '<p class="titcc">&&来源:', ' ||<'), 'G1a');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
    if (urlname.search('/share\.iclient\.ifeng\.com\/\S+\/shareNews?/') > 0) {
        var strcom = getstrinser(urlname, 'aid=', '&');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('凤凰汽车', 'S2') + printstr('文章', 'S3a');
        strtotal += printstr(' ', 'S3d')
        var strq1 = getstrinser(content, '<div class="n-words">', '<div class="n-editor"');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');
        var strs4 = getstrinser(strq1, '<h3 class="n-title">', '</h3>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');
        var strs6 = getstrinser(content, '<p class="n-i-time">', '</p>');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        var strg1 = getstrinser(content, '<p class="n-i-source">', '</p>');
        if (strg1 == "") return false;
        strtotal += printstr(strg1, 'G1')
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
	}
    return false;
}
//chexun
function getdatachexun(urlname, urltitle, content, rval) {
    if (urlname.indexOf('.chexun.com') < 0) return false;
    if (urlname.indexOf('/qctupian/') > 0) return true;

    var strs0 = getstrinser(urlname, '.com/&&/', '.');
    if (strs0 == "") strs0 = getstrinser(urlname, '.com/', '');
    if (strs0 == "") return false;
    var strtotal = printstr(strs0, 'S0') + printstr(urlname, 'S1') + printstr('车讯网', 'S2') + printstr('文章', 'S3a');
    var strs4 = getstrinser(content, '<h1 class="news-title">', '</');
    if (strs4 == '') return false;
    strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');
    var strs6 = getstrinser(content, '<span class="time">', '</');
    if (strs6 == '') return false;
    strs6 = timetrtostdstr(strs6);
    strtotal += printstr(strs6, 'S6');
    var strq1 = getstrinser(content, '<div class="news-box">', '<div class="prompt"||<div class="clearfix mt20 share-sc">||<div class="news-share clearfix">||<div class="relevance-car"');
    if (strq1 == '') return false;
    strtotal += printstr(strq1, 'Q1');
    strtotal += printstr(getstrinser(content, '<span>当前位置：</span>', '</div'), 'S3d'); //导航条
    //strtotal += printstr(getstrinser(content, '<div class="alst">', '</div'), 'S3c'); //关键词
    strtotal += printstr(getstrinser(content, '<address>', '</address'), 'S8'); //导航条
    strtotal += printstr(getstrinser(content, '<i>作者:', '</'), 'G1');
    strtotal += printstr(getstrinser(content, '<em>来源：', '</'), 'G1a');
    rval.content += printstr(strtotal, 'Root') + '\r\n';
    return true;

}
//auto.163.com
function getdata163(urlname, urltitle, content, rval) {
    if (urlname.indexOf('auto.163.com') < 0) return false;
    if (urlname.search(/\.html/i) < 0) return true;
    if (urlname.search(/(price|xunjia|about|index)\.html|keywords|photoview|(music|v|cosmetic\.lady|discover\.news|caipiao|quan|sports|\/v)\.163\.com|(product|show|dealers|product|show)\.auto\.163\.com/i) > 0) return true;
    if (urlname.indexOf('3g.163.com') > 0) {
        var strs0 = getlaststrinser(urlname, '/', '.');
        if (strs0 == "") return false;
        var strtotal = printstr(strs0, 'S0') + printstr(urlname, 'S1') + printstr('网易汽车', 'S2') + printstr('文章', 'S3a');
        var strs4 = getstrinser(content, '<h1 class="title">', '</h');
        if (strs4 == '') return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');
        var strs6 = getstrinser(content, '<span class="time js-time">', '</');
        if (strs6 == '') return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6');
        var strq1 = getstrinser(content, '<div class="content">', '<div class="footer">||</article>');
        if (strq1 == '') return false;
        strtotal += printstr(strq1, 'Q1');
        //strtotal += printstr(getstrinser(content, '<div class="theLogo">&&<div class="theCurrent&&<a&&>', '</div'), 'S3d'); //导航条
        //strtotal += printstr(getstrinser(content, '<div class="alst">', '</div'), 'S3c');
        strtotal += printstr(getstrinser(content, '<span class="source js-source">', '</'), 'G1');
        //strtotal += printstr(getstrinser(content, '<span class="source js-source">;, ' ||<'), 'G1a');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
    if (urlname.indexOf('auto.163.com') > 0) {
        var strs0 = getlaststrinser(urlname, '/', '.');
        if (strs0 == "") return false;
        var strtotal = printstr(strs0, 'S0') + printstr(urlname, 'S1') + printstr('网易汽车', 'S2') + printstr('文章', 'S3a');
        var strs4 = getstrinser(content, '<h1&&>', '</h');
        if (strs4 == '') return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');
        var strs6 = getstrinser(content, '<div class="post_time_source">', '<');
        if (strs6 == '') return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6');
        var strq1 = getstrinser(content, '<div class="post_time_source">', '<div class="footer">||</article>||<p class="page_tips">');
        if (strq1 == '') return false;
        strtotal += printstr(strq1, 'Q1');
        strtotal += printstr(getstrinser(content, '<div class="post_crumb">', '</div'), 'S3d'); //导航条
        //strtotal += printstr(getstrinser(content, '<div class="alst">', '</div'), 'S3c');
        strtotal += printstr(getstrinser(content, '经销商：</span>&&<span>', '</'), 'G1');
        strtotal += printstr(getstrinser(content, '<a id="ne_article_source"', ' ||<'), 'G1a');
        strtotal += printstr(getstrinser(content, '地址：</label>&&<span>', '<'), 'G1a');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
    if (urlname.indexOf('c.m.163.com') > 0) {
        var strs0 = getlaststrinser(urlname, '/', '.');
        if (strs0 == "") return false;
        var strtotal = printstr(strs0, 'S0') + printstr(urlname, 'S1') + printstr('网易汽车', 'S2') + printstr('文章', 'S3a');
        var strs4 = getstrinser(content, '<h1&&>', '</h');
        if (strs4 == '') return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');
        var strs6 = getstrinser(content, '<div class="g-subtitle">&&<span>', '</');
        if (strs6 == '') return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6');
        var strq1 = getstrinser(content, '<main>||<article class="g-main-content||<div class="g-subtitle">||<div class="js-article-inner">', '</main>||<footer>||<div class="show-more-wrap">||</section>');
        if (strq1 == '') return false;
        strtotal += printstr(strq1, 'Q1');
        //strtotal += printstr(getstrinser(content, '<div class="post_crumb">', '</div'), 'S3d'); //导航条
        //strtotal += printstr(getstrinser(content, '<div class="alst">', '</div'), 'S3c');
        strtotal += printstr(getstrinser(content, '<div class="g-subtitle">&&<b>', '</b>'), 'G1');
        //strtotal += printstr(getstrinser(content, '<div class="g-subtitle">', ' ||<'), 'G1a');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
    if (urlname.indexOf('dy.163.com') > 0) {
        var strs0 = getlaststrinser(urlname, '/', '.');
        if (strs0 == "") return false;
        var strtotal = printstr(strs0, 'S0') + printstr(urlname, 'S1') + printstr('网易汽车', 'S2') + printstr('文章网易号', 'S3a');
        var strs4 = getstrinser(content, '<h2&&>', '</h');
        if (strs4 == '') return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');
        var strs6 = getstrinser(content, '<p class="time">&&<span>', '</');
        if (strs6 == '') return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6');
        var strq1 = getstrinser(content, '<div class="content"&&>||<div class="article_title">', '<div class="statement">||<div class="tie-areas post_comment">||<div class="next">||<div class="N-nav-bottom">||</div>');
        if (strq1 == '') return false;
        strtotal += printstr(strq1, 'Q1');
        //strtotal += printstr(getstrinser(content, '<div class="post_crumb">', '</div'), 'S3d'); //导航条
        //strtotal += printstr(getstrinser(content, '<div class="alst">', '</div'), 'S3c');
        var strg1 = getstrinser(content, '<span class="point">&&<span>', '</');
        if (strg1 == "") strg1 = getstrinser(content, '<p class="time">&&<span>&&<span>', '</');
        if (strg1 != "") strtotal += printstr(strg1, 'G1');
        //strtotal += printstr(getstrinser(content, '<div class="g-subtitle">', ' ||<'), 'G1a');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
    if (urlname.indexOf('/composite/') > 0) {
        var strs0 = getstrinser(urlname, 'com/', '.');
        if (strs0 == "") return false;
        var strtotal = printstr(strs0, 'S0') + printstr(urlname, 'S1') + printstr('网易汽车', 'S2') + printstr('文章', 'S3a');
        var strs4 = getstrinser(content, '<h1&&>', '</h');
        if (strs4 == '') return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');
        var strs6 = getstrinser(content, '<div class="post_time_source">', '</');
        if (strs6 == '') return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6');
        var strq1 = getstrinser(content, '<div class="post_desc">||<div class="post_body">||<div class="post_content_main"&&>', '<div class="ep-pages">||<!--广告位 star-->||<div class="post_content_side"||<div class="N-nav-bottom">||</div>');
        if (strq1 == '') return false;
        strtotal += printstr(strq1, 'Q1');
        //strtotal += printstr(getstrinser(content, '<div class="post_crumb">', '</div'), 'S3d'); //导航条
        //strtotal += printstr(getstrinser(content, '<div class="alst">', '</div'), 'S3c');
        var strg1 = getstrinser(content, '<div class="post_time_source">', '</');
        if (strg1 != "") {
            var strg1a = getstrinser(strg1, '来源：', '');
            if (strg1a == "") strg1a = getstrinser(strg1, ':&& ', '');
            if (strg1a == "") strg1a = strg1;
            strtotal += printstr(strg1a, 'G1a');
        }
        //strtotal += printstr(getstrinser(content, '<div class="g-subtitle">', ' ||<'), 'G1a');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
    return false;
}
//cheshi
function getdatacheshi(urlname, urltitle, content, rval) {
    if (urlname.indexOf('.cheshi.com') < 0) return false;
    if (urlname.search(/.htm/i) < 0) return true;
    if (urlname.search(/(pic|bbs|price|product|search)\.cheshi\.com/i) > 0) return true;
    if (urlname.indexOf('a.cheshi.com') > 0) {
        var strs0 = getlaststrinser(urlname, '/', '.');
        if (strs0 == "") return false;
        var strtotal = printstr(strs0, 'S0') + printstr(urlname, 'S1') + printstr('网上车市', 'S2') + printstr('文章', 'S3a');
        var strs4 = getstrinser(content, '<h1&&>', '</h');
        if (strs4 == '') return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');
        var strs6 = getstrinser(content, '<h1&&<span>&&<span>', '</span');
        if (strs6 == '') return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6');
        var strq1 = getstrinser(content, '<div class="cs_arc"&&>||<section class="content">||<!-- 正文 -->', '</section>||<!-- 相关文章 -->||<div class="ne_word">');
        if (strq1 == '') return false;
        strtotal += printstr(strq1, 'Q1');
        //strtotal += printstr(getstrinser(content, '<div class="crumb-box">', '</div'), 'S3d'); //导航条
        //strtotal += printstr(getstrinser(content, '<div class="alst">', '</div'), 'S3c');
        //strtotal += printstr(getstrinser(content, '<span>店面地址：</span>', '</span'), 'S8');
        strtotal += printstr(getstrinser(content, '<h1&&<span>', '</span'), 'G1');
        //strtotal += printstr(getstrinser(content, '<span>商家名称：</span>', '</span'), 'G1a');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
    if (urlname.indexOf('news.cheshi.com') > 0) {
        var strs0 = getlaststrinser(urlname, '/', '.');
        if (strs0 == "") return false;
        var strtotal = printstr(strs0, 'S0') + printstr(urlname, 'S1') + printstr('网上车市', 'S2') + printstr('文章', 'S3a');
        var strs4 = getstrinser(content, '<h2>', '</h');
        if (strs4 == '') return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');
        var strs6 = getstrinser(content, '<span class="fr">', '</span');
        if (strs6 == '') return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6');
        var strq1 = getstrinser(content, '<!--正文-->||<div class="border-box">||<div class="border-box-tz">', '<div class="ad_670">||<!--阅读-->||<div class="article_a clearfix">');
        if (strq1 == '') return false;
        strtotal += printstr(strq1, 'Q1');
        strtotal += printstr(getstrinser(content, '<div class="breadcrumb">', '</div'), 'S3d'); //导航条
        strtotal += printstr(getstrinser(content, '<h2 class="fl">', '</h'), 'S3c');
        //strtotal += printstr(getstrinser(content, '<span>店面地址：</span>', '</span'), 'S8');
        var strg1 = getstrinser(content, '<span>作者:', '</');
        if (strg1 == '') strg1 = getstrinser(content, '<span>责编:', '</');
        strtotal += printstr(strg1, 'G1');
        strtotal += printstr(getstrinser(content, '<span>来源：', '</span'), 'G1a');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
    if (urlname.indexOf('seller.cheshi.com') > 0) {
        var strs0 = getlaststrinser(urlname, '/', '.');
        if (strs0 == "") return false;
        var strtotal = printstr(strs0, 'S0') + printstr(urlname, 'S1') + printstr('网上车市', 'S2') + printstr('文章经销商', 'S3a');
        var strs4 = getstrinser(content, '<h2 class="gray3 no_border">', '</h');
        if (strs4 == '') return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');
        var strs6 = getstrinser(content, 'class="s_p01 gray6">', '</');
        if (strs6 == '') return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6');
        var strq1 = getstrinser(content, '<div class="textall">||<div class="cont hd line mb">||<div class="wrapsl l">', '<p class="indent mt10">||<div class="mshares clearfix nob">||<!--[if !IE]>content结束<![endif]-->');
        if (strq1 == '') return false;
        strtotal += printstr(strq1, 'Q1');
        //strtotal += printstr(getstrinser(content, '<div class="breadcrumb">', '</div'), 'S3d'); //导航条
        //strtotal += printstr(getstrinser(content, '<h2 class="fl">', '</h'), 'S3c');
        strtotal += printstr(getstrinser(content, '<dt class="l">公司地址：</dt>&&>', '</'), 'S8');
        strtotal += printstr(getstrinser(content, '<span>经销商：', '</'), 'G1');
        //strtotal += printstr(getstrinser(content, '<span>来源：', '</span'), 'G1a');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
    if (urlname.indexOf('cheshizh.com/news') > 0) {
        var strcom = getstrinser(urlname, 'news/', '.html');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('网上车市', 'S2') + printstr('文章', 'S3a');
        strtotal += printstr(getstrinser(content, '<div class="info">&&<span>', '</span>'), 'S3d')
        var strq1 = getstrinser(content, 'id="con">', '<div class="ruguoPager_red"');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');
        var strs4 = getstrinser(strq1, '<h1 class="h1">', '</h1>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');
        var strs6 = getstrinser(content, '<div class="info">&&<span>&&<span>&&<span>', '</span>');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        var strg1 = getstrinser(content, '<div class="info">&&<span>&&<span>', '</span>');
        if (strg1 == "") return false;
        strtotal += printstr(strg1, 'G1')
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
	}
	if (urlname.indexOf('auto.cnfol.com') > 0) {
        var strcom = getstrinser(urlname, 'cheshidongtai/', '.shtml');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('网上车市', 'S2') + printstr('文章', 'S3a');
        strtotal += printstr(getstrinser(content, '<div class="LocalUl">', '</div>'), 'S3d')
        var strq1 = getstrinser(content, 'class="Article">', '</div>');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');
        var strs4 = getstrinser(strq1, '<h3 class="artTitle">', '</h3>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');
        var strs6 = getstrinser(content, '<div class="artDes">&&<span>', '</span>');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        var strg1 = getstrinser(content, '<div class="artDes">&&<span>&&<span>&&<span>', '</span>');
        if (strg1 == "") return false;
        strtotal += printstr(strg1, 'G1')
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
	}

    return false;
}
//58che.com
function getdata58che(urlname, urltitle, content, rval) {
    if (urlname.indexOf('.58che.com') < 0) return false;
    if (urlname.search(/.htm/i) < 0) return true;
    if (urlname.search(/(price|product)\.58che\.com|\/compare\/|\/tag\/|\/xinche\//i) > 0) return true;
    if (urlname.indexOf('news.58che.com/news') >0) {
        var strcom = getstrinser(urlname, 'news/', '.html');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('58车', 'S2') + printstr('文章', 'S3a');
        strtotal += printstr(getstrinser(content, 'head-mbx l">', '</div'), 'S3d')
        var strq1 = getstrinser(content, 'class="c_tcon clearfix">', '<div class="car_div clearfix">');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');
        var strs4 = getstrinser(content, '<h1 class="h_title">', '</h1>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');
        var strs6 = getstrinser(content, '<div class="a_t l">&&<span>', '</span>');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        var strg1 = getstrinser(content, '<span class="a_t l">&&<span>&&<span>&&<span>', '</span>');
        if (strg1 == "") return false;
        strtotal += printstr(strg1, 'G1')
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
	}
	if (urlname.indexOf('news.58che.com.zxyw.eu') > 0) {
        var strcom = getstrinser(urlname, 'eu/', '.html');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('58车', 'S2') + printstr('文章', 'S3a');
        strtotal += printstr(getstrinser(content, 'head-mbx l">', '</div'), 'S3d')
        var strq1 = getstrinser(content, 'class="c_tcon clearfix bodytxt">', '<div class="article_tags clearfix">');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');
        var strs4 = getstrinser(content, '<h1 class="h_title">', '</h1>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');
        var strs6 = getstrinser(content, '<div class="a_t l">&&<span>', '</span>');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        var strg1 = getstrinser(content, '<span class="a_t l">&&<span>&&<span>&&<span>', '</span>');
        if (strg1 == "") return false;
        strtotal += printstr(strg1, 'G1')
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
	}
    if (urlname.indexOf('dealer.58che.com') > 0) {
        var strcom = getstrinser(urlname, '/market_', '.html');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('58车', 'S2') + printstr('文章', 'S3a');
        strtotal += printstr(getstrinser(content, '<p class="mbs">', '</p>'), 'S3d')
        var strq1 = getstrinser(content, '<div class="art_cont">', '<div class="com_xin">');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');
        var strs4 = getstrinser(content, '<div class="title_0">&&<h1>', '</h1>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');
        var strs6 = getstrinser(content, '<span>日期：', '</span>');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        var strg1 = getstrinser(content, '<span><em class="blue">', '</em></span>');
        if (strg1 == "") return false;
        strtotal += printstr(strg1, 'G1')
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
    return false;
}
//12365auto.com
function getdata12365auto(urlname, urltitle, content, rval) {
	if (urlname.indexOf('12365auto.com') < 0) return false;
	if (urlname.search(/12365auto\.com\/[a-z]{4}\//) > 0) {
        var strcom = getstrinser(urlname, 'com/', '.shtml');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('车质网', 'S2') + printstr('文章', 'S3a');
        strtotal += printstr(getstrinser(content, '<div class="dq_l">', '</div>'), 'S3d')
        var strq1 = getstrinser(content, '<div class="show">', '</div>');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');
        var strs4 = getstrinser(content, '<h1 id="newstitle">', '</h1>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');
        var strs6 = getstrinser(content, '<div class="lef">', '</div>');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        var strg1 = getstrinser(content, '<div class="lef">', '</div>');
        if (strg1 == "") return false;
        strtotal += printstr(strg1, 'G1')
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
	}
	if (urlname.indexOf('bbs.12365auto.com/postcontent') > 0) {
        var strcom = getstrinser(urlname, 'com/', '.shtml');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('车质网', 'S2') + printstr('文章', 'S3a');
        strtotal += printstr(getstrinser(content, '<div class="dqwz">', '</div>'), 'S3d')
        var strq1 = getstrinser(content, '<div class="neirong"', '</div>');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');
        var strs4 = getstrinser(content, '<p class="contitle">', '</p>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');
        var strs6 = getstrinser(content, '<p class="fbsj">', '</p>');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        var strg1 = "";
        // if (strg1 == "") return false;
        strtotal += printstr(strg1, 'G1')
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
	}
    if (urlname.indexOf('m.12365auto.com') > 0) {
        var strcom = getstrinser(urlname, 'com/', '.shtml');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('车质网', 'S2') + printstr('文章', 'S3a');
        strtotal += printstr(getstrinser(content, '<div class="nav_show">', '</div>'), 'S3d')
        var strq1 = getstrinser(content, '<div class="content_show_cen_nr">', '</div>');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');
        var strs4 = getstrinser(content, '<h1 id="content_show_tit content_show_tit_news">&&<div><hi>', '</h1>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');
        var strs6 = getstrinser(content, '<p class="p_time">&&<span>', '</span>');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        var strg1 = getstrinser(content, '<p class="p_time">&&<span>&&<span>', '</span>');
        if (strg1 == "") return false;
        strtotal += printstr(strg1, 'G1')
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
    return false;
}
//qctsw.com
function getdataqctsw(urlname, urltitle, content, rval) {
	if (urlname.indexOf('qctsw.com') < 0) return false;
	if (urlname.search(/qctsw\.com\/(tousu|article|qctsw|newtsw)\//) > 0) {
        var strcom = getstrinser(urlname, 'com/', '.html');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('汽车投诉网', 'S2') + printstr('文章', 'S3a');
        strtotal += printstr("", 'S3d')
        var strq1 = getstrinser(content, '<div class="articleContent">', '<div class="end">');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');
        var strs4 = getstrinser(content, '<h3 class="articleTit">', '</h3>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');
        var strs6 = getstrinser(content, '<div class="titleNav fix">&&<p class="f1">&&<p class="f1">&&<em>', '</em>');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        // var strg1 = getstrinser(content, '<div class="lef">', '</div>');
        // if (strg1 == "") return false;
        strtotal += printstr("", 'G1')
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
	}
	return false;

}
//maiche.com
function getdatamaiche(urlname, urltitle, content, rval) {
	if (urlname.indexOf('maiche.com') < 0) return false;
	else {
        var strcom = getstrinser(urlname, 'detail/', '.html');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('买车网汽车', 'S2') + printstr('文章', 'S3a');
        strtotal += printstr(getstrinser(content, '<div class="crumb-nav-container" data-sp="0.3.3.2">', '</div>'), 'S3d')
        var strq1 = getstrinser(content, 'key="detail" skip="true">', '</div>');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');
        var strs4 = getstrinser(content, '<h1 id="title">', '</h1>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');
        var strs6 = getstrinser(content, '<div class="date">', '</div>');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        var strg1 = getstrinser(content, '<div>来源：', '</div>');
        if (strg1 == "") return false;
        strtotal += printstr(strg1, 'G1')
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
	}
}
//gxmaiche.com
function getdatagxmaiche(urlname, urltitle, content, rval) {
    if (urlname.indexOf('gxmaiche.cn') > 0) {
        var strcom = getstrinser(urlname, 'news/', '.html');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('广西买车网汽车', 'S2') + printstr('文章', 'S3a');
        strtotal += printstr(getstrinser(content, '<div class="crumb">', '</div>'), 'S3d')
        var strq1 = getstrinser(content, '<div class="act-content">', '</div>');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');
        var strs4 = getstrinser(content, '<h1 style="text-after:center">', '</h1>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');
        var strs6 = getstrinser(content, '<span class="ai-date d">', '</div>');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        var strg1 = getstrinser(content, 'id="source_baidu">来源：', '</span>');
        if (strg1 == "") return false;
        strtotal += printstr(strg1, 'G1')
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
    return false;
}
//orz520.com
function getdataorz520(urlname, urltitle, content, rval) {
	if (urlname.indexOf('orz520.com/a/') < 0) return false;
	else {
        var strcom = getstrinser(urlname, 'a/', '.html');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('千寻生活', 'S2') + printstr('文章', 'S3a');
        strtotal += printstr(getstrinser(content, '<div class="curpos">', '<div class="gameicon">'), 'S3d')
        var strq1 = getstrinser(content, '<div class="article-content">', '</div>');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');
        var strs4 = getstrinser(content, '<h1 class="title">', '</h1>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');
        var strs6 = getstrinser(content, '<span class="time">', '</span>');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        // var strg1 = getstrinser(content, '<div>来源：', '</div>');
        // if (strg1 == "") return false;
        strtotal += printstr('', 'G1')
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
	}
}
//gasgoo.com
function getdatagasgoo(urlname, urltitle, content, rval) {
    if (urlname.indexOf('gasgoo.com') < 0) return false;
    else {
        var strcom = getstrinser(urlname, 'News/', '.shtml');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('盖世汽车资讯', 'S2') + printstr('文章', 'S3a');
        strtotal += printstr(getstrinser(content, '<div class="crumb">', '</div>'), 'S3d')
        var strq1 = getstrinser(content, 'class="contentDetailed article_18">', '</div>');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');
        var strs4 = getstrinser(content, 'class="detailed">', '</h1>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');
        var strs6 = getstrinser(content, '<span class="timeSource">', '</span>');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        var strg1 = getstrinser(content, '<span class="timeSource">&&<span>', '</span>');
        if (strg1 == "") return false;
        strtotal += printstr(strg1, 'G1')
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
}
//xcar.com.cn
function getdataxcar(urlname, urltitle, content, rval) {
    if (urlname.indexOf('xcar.com.cn') < 0) return false;
    if (urlname.indexOf('club.xcar.com.cn') > 0) {
        var strcom = getstrinser(urlname, 'cn/', '.html');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('爱卡汽车', 'S2') + printstr('文章', 'S3a');
        strtotal += printstr(getstrinser(content, '<div class="zym_bread_crumbs">', '</div>'), 'S3d')
        var strq1 = getstrinser(content, 'class="padding_left_right hjh_ul">', '</div>');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');
        var strs4 = getstrinser(content, 'class="topic_fouse_title">', '</div>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');
        var strs6 = getstrinser(content, '<span class="time"', '</span>');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        var strg1 = getstrinser(content, 'id="userid" class="name">', '</a>');
        if (strg1 == "") return false;
        strtotal += printstr(strg1, 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
	if (urlname.search(/[a-z]+\.xcar\.com\.cn\/\S+news_/) > 0) {
        var strcom = getstrinser(urlname, 'news_', '_1.html');
		var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('爱卡汽车', 'S2') + printstr('文章', 'S3a');
		strtotal += printstr(getstrinser(content, '<div class="p1">', '<div'), 'S3d');
		var strq1 = getstrinser(content, 'id="newsbody">', '</div>');
		if (strq1 == "") return false;
		strtotal += printstr(strq1, 'Q1');
		var strs4 = getstrinser(content, 'class="article_title">', '</div>');
		if (strs4 == "") return false;
		strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');
		var strs6 = getstrinser(content, 'id="pubtime_baidu">', '</span>');
		if (strs6 == "") return false;
		strs6 = timetrtostdstr(strs6);
		strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
		var strg1 = getstrinser(content, 'id="author_baidu>"', '</a>');
		if (strg1 == "") return false;
		strtotal += printstr(strg1, 'G1');
		rval.content += printstr(strtotal, 'Root') + '\r\n';
		return true;
	}
	if (urlname.indexOf('newcar.xcar.com.cn') > 0) {
        var strcom = getstrinser(urlname, 'news_', '_1.html');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('爱卡汽车', 'S2') + printstr('文章', 'S3a');
        strtotal += printstr(getstrinser(content, 'class="xcar_logo"></a><p>', '</p>'), 'S3d');
        var strq1 = getstrinser(content, 'id="newsbody">', '</div>');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');
        var strs4 = getstrinser(content, 'class="article_title">', '</div>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');
        var strs6 = getstrinser(content, 'id="pubtime_baidu">', '</span>');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        var strg1 = getstrinser(content, 'id="author_baidu>"', '</a>');
        if (strg1 == "") return false;
        strtotal += printstr(strg1, 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
	}
	return false;
}
//dayoo.com
function getdatadayoo(urlname, urltitle, content, rval) {
	if (urlname.indexOf('life.dayoo.com') < 0) return false;
    if (urlname.indexOf('life.dayoo.com') > 0) {
        var strcom = getstrinser(urlname, 'auto/', '.htm');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('广州日报大洋网汽车', 'S2') + printstr('文章', 'S3a');
        strtotal += printstr(getstrinser(content, '<div class="crumbs">', '</div>'), 'S3d')
        var strq1 = getstrinser(content, '<div id="text_content">', '</div>');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');
        var strs4 = getstrinser(content, 'class="article-hd">', '<div');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');
        var strs6 = getstrinser(content, '<span class="time">', '</span>');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        var strg1 = getstrinser(content, '<div class="editor">', '</div>');
        if (strg1 == "") return false;
        strtotal += printstr(strg1, 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
}
//qctt.cn/news
function getdataqctt(urlname, urltitle, content, rval) {
    if (urlname.indexOf('qctt.cn/news') < 0) return false;
    if (urlname.indexOf('qctt.cn/news') > 0) {
        var strcom = getstrinser(urlname, 'news/', '');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('汽车头条', 'S2') + printstr('文章', 'S3a');
        strtotal += printstr('', 'S3d')
        var strq1 = getstrinser(content, '<div class="y_text2">', '</div>');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');
        var strs4 = getstrinser(content, 'class="title">', '</div>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');
        var strs6 = getstrinser(content, '<div class="part2">&&<span>', '</span>');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        var strg1 = getstrinser(content, '<div class="part2"><a', '</a>');
        if (strg1 == "") return false;
        strtotal += printstr(strg1, 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
}
//eastday.com
function getdataeastday(urlname, urltitle, content, rval) {
    if (urlname.indexOf('eastday.com') < 0) return false;
    if (urlname.indexOf('auto.eastday.com') > 0) {
        var strcom = getstrinser(urlname, 'a/', '.html');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('东方网汽车', 'S2') + printstr('文章', 'S3a');
        strtotal += printstr('', 'S3d')
        var strq1 = getstrinser(content, '<div class="detail-r fr">', '<div class="read-next">');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');
        var strs4 = getstrinser(content, '<h1 class="title">', '</h1>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');
        var strs6 = getstrinser(content, '<div class="subtitle">', '来源');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        var strg1 = getstrinser(content, '来源:', '</div>');
        if (strg1 == "") return false;
        strtotal += printstr(strg1, 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
    if (urlname.search(/(mini|xinwen)\.eastday\.com/) > 0) {
        var strcom = getstrinser(urlname, 'a/', '.html');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('东方网汽车', 'S2') + printstr('文章', 'S3a');
        strtotal += printstr(getstrinser(content, '<div class="detail_position">', '</div>'), 'S3d')
        var strq1 = getstrinser(content, 'id="J-contain_detail_cnt">', '<div class="article_tags"');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');
        var strs4 = getstrinser(content, '<div class="J-title_detail title_detail"><h1><span>', '</h1></span>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');
        var strs6 = getstrinser(content, '<div class="fl"><i>', '</i>');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        // var strg1 = getstrinser(content, '来源:', '</div>');
        // if (strg1 == "") return false;
        strtotal += printstr('', 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
}
//mop.com
function getdatamop(urlname, urltitle, content, rval) {
    if (urlname.indexOf('mop.com') < 0) return false;
    if (urlname.indexOf('auto.mop.com') > 0) {
        var strcom = getstrinser(urlname, 'a/', '.html');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('猫扑汽车', 'S2') + printstr('文章', 'S3a');
        strtotal += printstr('', 'S3d')
        var strq1 = getstrinser(content, '<div class="article">', '<div sysle="margin-left>');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');
        var strs4 = getstrinser(content, '<h1 class="article-title">', '</h1>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');
        var strs6 = getstrinser(content, '<div class="subtitle gray">', '来源');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        var strg1 = getstrinser(content, '来源:', '</div>');
        if (strg1 == "") return false;
        strtotal += printstr(strg1, 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
}
//diandong.com
function getdatadiandong(urlname, urltitle, content, rval) {
    if (urlname.indexOf('diandong.com') < 0) return false;
    if (urlname.indexOf('diandong.com/zixun') > 0) {
        var strcom = getstrinser(urlname, 'zixun/', '.shtml');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('电动邦汽车', 'S2') + printstr('文章', 'S3a');
        strtotal += printstr(getstrinser(content, 'class="news-breadcrumb">', '</nav>'), 'S3d');
        var strq1 = getstrinser(content, '<section class="news-article-text">', '</section>');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');
        var strs4 = getstrinser(content, '<h1 class="news-article-title">', '</h1>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');
        var strs6 = getstrinser(content, '<span class="article-info-time fn-left">', '</span>');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        // var strg1 = getstrinser(content, '来源:', '</div>');
        // if (strg1 == "") return false;
        strtotal += printstr('', 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
    if (urlname.indexOf('diandong.com/news') > 0) {
        var strcom = getstrinser(urlname, 'news/', '.html');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('电动邦汽车', 'S2') + printstr('文章', 'S3a');
        strtotal += printstr(getstrinser(content, 'class="detail-header">', '</div>'), 'S3d')
        var strq1 = getstrinser(content, '<div class="detail-article-content">', '</div>');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');
        var strs4 = getstrinser(content, '<div class="detail-left-header">&&<h1>', '</h1>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');
        var strs6 = getstrinser(content, '<p class="detail-info-time fn-left">', '</p>');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        var strg1 = getstrinser(content, '<p class="detail-info-author fn-left">', '</p>');
        if (strg1 == "") return false;
        strtotal += printstr(strg1, 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
}
//chinacar.com.cn
function getdatachinacar(urlname, urltitle, content, rval) {
    if (urlname.indexOf('chinacar.com.cn') < 0) return false;
    if (urlname.indexOf('chinacar.com.cn/newsview') > 0) {
        var strcom = getstrinser(urlname, 'newsview', '.html');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('中国汽车网', 'S2') + printstr('文章', 'S3a');
        strtotal += printstr(getstrinser(content, 'class="current_position">', '</b>'), 'S3d')
        var strq1 = getstrinser(content, '<div class="article-contents">', '</div>');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');
        var strs4 = getstrinser(content, '<h1 class="con" style="line-height: 36px;">', '</h1>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');
        var strs6 = getstrinser(content, '<span class="time-article">', '</span>');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        // var strg1 = getstrinser(content, '<p class="detail-info-author fn-left">', '</p>');
        // if (strg1 == "") return false;
        strtotal += printstr('', 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
}
//myzaker.com
function getdatamyzaker(urlname, urltitle, content, rval) {
    if (urlname.indexOf('myzaker.com') < 0) return false;
    if (urlname.indexOf('myzaker.com/article') > 0) {
        var strcom = getstrinser(urlname, 'article/', '');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('zaker', 'S2') + printstr('文章', 'S3a');
        strtotal += printstr(getstrinser(content, 'class="breadcrumb hidden-phone">', '</ol>'), 'S3d')
        var strq1 = getstrinser(content, '<div id="content">', '<div id="recommend_bottom"');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');
        var strs4 = getstrinser(content, '<div class="article_header">', '</h1>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');
        var strs6 = getstrinser(content, '<span class="time">', '</span>');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        var strg1 = getstrinser(content, '<span class="auther">', '</span>');
        if (strg1 == "") return false;
        strtotal += printstr(strg1, 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
}
//jiemian.com
function getdatajiemian(urlname, urltitle, content, rval) {
    if (urlname.indexOf('jiemian.com') < 0) return false;
    if (urlname.indexOf('jiemian.com/article') > 0) {
        var strcom = getstrinser(urlname, 'article/', '.html');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('界面汽车', 'S2') + printstr('文章', 'S3a');
        strtotal += printstr(getstrinser(content, 'class="main-mate">', '</div>'), 'S3d')
        var strq1 = getstrinser(content, '<div class="article-content"', '</div>');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');
        var strs4 = getstrinser(content, '<div class="article_header">', '</div>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');
        var strs6 = getstrinser(content, '<span>20', '</span>');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        var strg1 = getstrinser(content, '<span class="auther">', '</span>');
        if (strg1 == "") return false;
        strtotal += printstr(strg1, 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
}
//igeek.com.cn
function getdataigeek(urlname, urltitle, content, rval) {
    if (urlname.indexOf('igeek.com.cn') < 0) return false;
    if (urlname.indexOf('igeek.com.cn/article') > 0) {
        var strcom = getstrinser(urlname, 'article-', '.html');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('爱极客汽车', 'S2') + printstr('文章', 'S3a');
        var tmps3d = getstrinser(content, '<div class="tit2">', '</div>');
        strtotal += printstr(getstrinser(tmps3d, '<em>', '</em>'), 'S3d')
        var strq1 = getstrinser(content, '<div class="main lazyload">', '<div style');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');
        var strs4 = getstrinser(content, '<div class="title3">', '</h1>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');

        var tmps6g1 = getstrinser(content, '<div class="touxiang">','</div>');
        var strs6 = getstrinser(tmps6g1, '</em>', '</p>');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        // var strg1 = getstrinser(content, '<span class="auther">', '</span>');
        // if (strg1 == "") return false;
        strtotal += printstr('', 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
}
//taizhou.com.cn
function getdatataizhou(urlname, urltitle, content, rval) {
    if (urlname.indexOf('taizhou.com.cn') < 0) return false;
    if (urlname.indexOf('taizhou.com.cn/auto') > 0) {
        var strcom = getstrinser(urlname, 'content_', '.htm');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('中国台州', 'S2') + printstr('文章', 'S3a');
        // var tmps3d = getstrinser(content, '<div class="tit2">', '</div>');
        strtotal += printstr(getstrinser(content, '<div class="head-track">', '</div>'), 'S3d')
        var strq1 = getstrinser(content, '<div class="article-content">', '</div>');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');
        var strs4 = getstrinser(content, '<h1 class="black30 title">', '</h1>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');

        // var tmps6g1 = getstrinser(content, '<div class="touxiang">','</div>');
        var strs6 = getstrinser(content, '<span id="pubtime_baidu">', '</span>');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        var strg1 = getstrinser(content, '<span id="author_baidu">', '</span>');
        if (strg1 == "") return false;
        strtotal += printstr(strg1, 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
}
//baidu.com
function getdatabaidu(urlname, urltitle, content, rval) {
    if (urlname.indexOf('baidu.com') < 0) return false;
    if (urlname.indexOf('baijiahao.baidu.com') > 0) {
        var strcom = getstrinser(urlname, 'id=', '&');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('百度百家号', 'S2') + printstr('文章', 'S3a');
        // var tmps3d = getstrinser(content, '<div class="tit2">', '</div>');
        strtotal += printstr('', 'S3d')
        var strq1 = getstrinser(content, '<div class="article-content">', '<div class="notice">');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');
        var strs4 = getstrinser(content, '<div class="article-title">', '</div>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');

        // var tmps6g1 = getstrinser(content, '<div class="touxiang">','</div>');
        var strs6 = getstrinser(content, '<span class="date">', '</span>');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        var strg1 = getstrinser(content, '<span class="source">', '</span>');
        if (strg1 == "") return false;
        strtotal += printstr(strg1, 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
    if (urlname.indexOf('tieba.baidu.com/p/') > 0) {
        var strcom = getstrinser(urlname, 'p/', '');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('百度贴吧', 'S2') + printstr('文章', 'S3a');
        // var tmps3d = getstrinser(content, '<div class="tit2">', '</div>');
        strtotal += printstr('', 'S3d')
        var strq1 = getstrinser(content, 'class="d_post_content j_d_post_content  clearfix">', '</div>');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');
        var strs4tmp = getstrinser(content, '<h1 class="core_title_txt', '</h1>');
        var strs4 = getstrinser(strs4tmp, 'title="', '"');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');

        var tmps6 = getstrinser(content, '<ul class="p_tail">', '</ul>');
        var strs6 = getstrinser(tmps6, '</li>', '</li>');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        // var strg1 = getstrinser(content, '<span class="source">', '</span>');
        // if (strg1 == "") return false;
        strtotal += printstr('', 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
    if (urlname.indexOf('tieba.baidu.com/p/') > 0) {

    }
}
//yiche.com
function getdatayiche(urlname, urltitle, content, rval) {
    if (urlname.indexOf('yiche.com') < 0) return false;
    if (urlname.indexOf('news.m.yiche.com/zonghexinwen') > 0) {
        var strcom = getstrinser(urlname, 'zonghexinwen', '.html');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('易车网', 'S2') + printstr('文章', 'S3a');
        // var tmps3d = getstrinser(content, '<div class="tit2">', '</div>');
        strtotal += printstr('', 'S3d')
        var strq1 = getstrinser(content, 'id="NewsContent">', '</div>');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');
        var strs4 = getstrinser(content, '<div class="m-detail-top">', '</div>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');

        var tmps6 = getstrinser(content, '<dd>', '</dd>');
        var strs6 = getstrinser(tmps6, '<span>', '</span>');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        // var strg1 = getstrinser(content, '<span class="source">', '</span>');
        // if (strg1 == "") return false;
        strtotal += printstr('', 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
}
//funyqq.com
function getdatafunyqq(urlname, urltitle, content, rval) {
    if (urlname.indexOf('funyqq.com') < 0) return false;
    if (urlname.indexOf('funyqq.com/ask') > 0) {
        var strcom = getstrinser(urlname, 'ask/', '.html');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('奇趣网', 'S2') + printstr('文章', 'S3a');
        // var tmps3d = getstrinser(content, '<div class="tit2">', '</div>');
        strtotal += printstr(getstrinser(content, '<div class="position">', '</div>'), 'S3d')
        var strq1 = getstrinser(content, '<span class="content-intro">', '</span>');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');
        var strs4 = getstrinser(content, '<div class="article-body-main">', '</h1>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');

        // var tmps6 = getstrinser(content, '<dd>', '</dd>');
        var strs6 = getstrinser(content, '<div class="article-time">', '编辑');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        var strg1 = getstrinser(content, '编辑：', '</div>');
        if (strg1 == "") return false;
        strtotal += printstr(strg1, 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
}
//qq.com
function getdataqq(urlname, urltitle, content, rval) {
    if (urlname.indexOf('qq.com') < 0) return false;
    if (urlname.indexOf('auto.qq.com') > 0) {
        var strcom = getstrinser(urlname, 'a/', '.htm');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('腾讯汽车', 'S2') + printstr('文章', 'S3a');
        // var tmps3d = getstrinser(content, '<div class="tit2">', '</div>');
        strtotal += printstr('', 'S3d')
        var strq1 = getstrinser(content, 'bosszone="content"', '</div>');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');
        var strs4 = getstrinser(content, '<div class="hd">', '</h1>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');

        // var tmps6 = getstrinser(content, '<dd>', '</dd>');
        var strs6 = getstrinser(content, '<span class="a-time">', '</span>');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        var strg1 = getstrinser(content, '<span class="a-author">', '</span>');
        if (strg1 == "") return false;
        strtotal += printstr(strg1, 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
    if (urlname.indexOf('news.qq.com') > 0) {
        var strcom = getstrinser(urlname, 'a/', '.htm');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('腾讯汽车', 'S2') + printstr('文章', 'S3a');
        // var tmps3d = getstrinser(content, '<div class="tit2">', '</div>');
        strtotal += printstr('', 'S3d')
        var strq1 = getstrinser(content, 'id="contTxt">', '</div>');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');
        var strs4 = getstrinser(content, '<div class="hd">', '</h1>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');

        // var tmps6 = getstrinser(content, '<dd>', '</dd>');
        var strs6 = getstrinser(content, '<span class="article-time">', '</span>');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        var strg1 = getstrinser(content, 'bosszone="jgname">', '</span>');
        if (strg1 == "") return false;
        strtotal += printstr(strg1, 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
    if (urlname.indexOf('new.qq.com') > 0) {
        var strcom = getstrinser(urlname, 'omn/', '.htm');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('腾讯汽车', 'S2') + printstr('文章', 'S3a');
        // var tmps3d = getstrinser(content, '<div class="tit2">', '</div>');
        strtotal += printstr('', 'S3d')
        var strq1 = getstrinser(content, 'class="content-article">', '</div>');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');
        var strs4 = getstrinser(content, '<div class="LEFT">', '</h1>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');

        // var tmps6 = getstrinser(content, '<dd>', '</dd>');
        // var strs6 = getstrinser(content, '<span class="article-time">', '</span>');
        // if (strs6 == "") return false;
        // strs6 = timetrtostdstr(strs6);
        strtotal += printstr('', 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        var strg1 = getstrinser(strg1, '作者：', '</span>');
        if (strg1 == "") return false;
        strtotal += printstr(strg1, 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
    if (urlname.indexOf('weixin.qq.com') > 0) {
        var strcom = getstrinser(urlname, 's/', '');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('腾讯汽车', 'S2') + printstr('文章', 'S3a');
        // var tmps3d = getstrinser(content, '<div class="tit2">', '</div>');
        strtotal += printstr('', 'S3d')
        var strq1 = getstrinser(content, 'id="js_content">', '</div>');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');
        var strs4 = getstrinser(content, 'id="activity-name">', '</h2>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');

        // var tmps6 = getstrinser(content, '<dd>', '</dd>');
        // var strs6 = getstrinser(content, '<span class="article-time">', '</span>');
        // if (strs6 == "") return false;
        // strs6 = timetrtostdstr(strs6);
        strtotal += printstr('', 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        var strg1 = getstrinser(content, 'rich_media_meta_text">', '</span>');
        if (strg1 == "") return false;
        strtotal += printstr(strg1, 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
    if (urlname.indexOf('html5.qq.com') > 0) {
        var strcom = getstrinser(urlname, 'share/', '?');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('腾讯汽车', 'S2') + printstr('文章', 'S3a');
        // var tmps3d = getstrinser(content, '<div class="tit2">', '</div>');
        strtotal += printstr('', 'S3d')
        var strq1 = getstrinser(content, '<article', '</article>');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');
        var strs4 = getstrinser(content, '<h1', '</h1>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');

        // var tmps6 = getstrinser(content, '<dd>', '</dd>');
        var strs6 = getstrinser(content, '<span class="date">', '</span>');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        var strg1 = getstrinser(content, '<span class="media">', '</span>');
        if (strg1 == "") return false;
        strtotal += printstr(strg1, 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
    if (urlname.indexOf('html5.qq.com') > 0) {
        var strcom = getstrinser(urlname, 'share/', '?');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('腾讯汽车', 'S2') + printstr('文章', 'S3a');
        // var tmps3d = getstrinser(content, '<div class="tit2">', '</div>');
        strtotal += printstr('', 'S3d')
        var strq1 = getstrinser(content, '<div class="content-box">', '<div id="showMore"');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');
        var strs4 = getstrinser(content, '<p class="title">', '</p>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');

        // var tmps6 = getstrinser(content, '<dd>', '</dd>');
        var strs6 = getstrinser(content, '<span class="time">', '</span>');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        var strg1 = getstrinser(content, '<span class="author">', '</span>');
        if (strg1 == "") return false;
        strtotal += printstr(strg1, 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
}
//dianping.com
function getdatadianping(urlname, urltitle, content, rval) {
    if (urlname.indexOf('dainping.com') < 0) return false;
    if (urlname.search(/s\.dianping\.com\/topic/) > 0) {
        var strcom = getstrinser(urlname, 'topic/', '');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('点评网汽车', 'S2') + printstr('文章', 'S3a');
        // var tmps3d = getstrinser(content, '<div class="tit2">', '</div>');
        strtotal += printstr(getstrinser(content, '<div class="crumbs">', '</div>'), 'S3d')
        var strq1 = getstrinser(content, '<div class="paragraph">', '<div id="message');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');
        var strs4 = getstrinser(content, '<h1 class="note-title">', '</h1>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');

        // var tmps6 = getstrinser(content, '<dd>', '</dd>');
        var strs6 = getstrinser(content, '<div class="publish-time">', '</div>');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        // var strg1 = content.search(/<a.*class="user-name".*>(\S*)<\/a>/).;
        // if (strg1 == "") return false;
        strtotal += printstr('', 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
}
//hc360.com
function getdatahc360(urlname, urltitle, content, rval) {
    if (urlname.indexOf('hc360.com') < 0) return false;
    if (urlname.search(/info\.(auto-a|auto|carec|chem|clean|coatings|ec|finance|machine|qipei|service)\.hc360\.com/) > 0) {
        var strcom = getstrinser(urlname, 'com/', '.shtml');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('慧聪网汽车', 'S2') + printstr('文章', 'S3a');
        // var tmps3d = getstrinser(content, '<div class="tit2">', '</div>');
        strtotal += printstr('', 'S3d')
        var strq1 = getstrinser(content, '<div id="article">', '<input type');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');
        var strs4 = getstrinser(content, '<div id="title">', '</h1>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');

        // var tmps6 = getstrinser(content, '<dd>', '</dd>');
        var strs6 = getstrinser(content, '<span id="endDate">', '</span>');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        var strg1 = getstrinser(content, '<span id="endSource">', '</span>');
        if (strg1 == "") strg1 = " ";
        strtotal += printstr(strg1, 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
}
//hexun.com
function getdatahexun(urlname, urltitle, content, rval) {
    if (urlname.indexOf('hexun.com') < 0) return false;
    if (urlname.search(/(auto|forex|gold|house|news|iof|pe|stock|tech|trust|xianhuo)\.hexun\.com/) > 0) {
        var strcom = getstrinser(urlname, 'com/', '.html');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('和讯汽车', 'S2') + printstr('文章', 'S3a');
        // var tmps3d = getstrinser(content, '<div class="tit2">', '</div>');
        strtotal += printstr(getstrinser(content, '<div class="links">', '</div>'), 'S3d')
        var strq1 = getstrinser(content, '<div class="art_contextBox"', '</div');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');
        var strs4 = getstrinser(content, '<div class="layout mg articleName">', '</h1>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');

        // var tmps6 = getstrinser(content, '<dd>', '</dd>');
        var strs6 = getstrinser(content, '<span class="pr20">', '</span>');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        // var strg1 = getstrinser(content, '<span id="endSource">', '</span>');
        // if (strg1 == "") strg1 = " ";
        strtotal += printstr('', 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
    if (urlname.search(/copy\.hexun\.com/) > 0) {
        var strcom = getstrinser(urlname, 'com/', '.html');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('和讯汽车', 'S2') + printstr('文章', 'S3a');
        // var tmps3d = getstrinser(content, '<div class="tit2">', '</div>');
        strtotal += printstr(getstrinser(content, 'id="lo_links">', '</div>'), 'S3d')
        var strq1 = getstrinser(content, 'id="artibody"', '<div');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');
        artibodyTitle = getstrinser(content, 'id="artibodyTitle">', '<div class="concent"')
        var strs4 = getstrinser(artibodyTitle, '<h1>', '</h1>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');

        // var tmps6 = getstrinser(content, '<dd>', '</dd>');
        var strs6 = getstrinser(artibodyTitle, '<div class="b">&&<span class="gray">', '</span>');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        var strg1 = getstrinser(artibodyTitle, '<div class="b">&&<span class="gray">&&<span class="blue">&&<span class="blue">', '</span>');
        if (strg1 == "") return false;
        strtotal += printstr(strg1, 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
    if (urlname.search(/che\.hexun\.com\/news\/storys/) > 0) {
        var strcom = getstrinser(urlname, 'storys_', '.html');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('和讯汽车', 'S2') + printstr('文章', 'S3a');
        // var tmps3d = getstrinser(content, '<div class="tit2">', '</div>');
        strtotal += printstr(getstrinser(content, '<div class="ina_place">', '</p>'), 'S3d')
        var strq1 = getstrinser(content, '<div class="ina_content"', '</div>');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');
        var strs4 = getstrinser(content, '<h1>', '</h1>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');

        // var tmps6 = getstrinser(content, '<dd>', '</dd>');
        var strs6 = getstrinser(content, '<span class="ina_data">', '</span>');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        // var strg1 = getstrinser(content, '<span id="endSource">', '</span>');
        // if (strg1 == "") strg1 = " ";
        strtotal += printstr('', 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
}
//anhuinews.com
function getdataanhuinews(urlname, urltitle, content, rval) {
    if (urlname.indexOf('anhuinews.com') < 0) return false;
    if (urlname.search(/(ah|auto|chz|edu)\.anhuinews\.com\/system/) > 0) {
        var strcom = getstrinser(urlname, 'system/', '.shtml');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('中安新闻网', 'S2') + printstr('文章', 'S3a');
        // var tmps3d = getstrinser(content, '<div class="tit2">', '</div>');
        strtotal += printstr(getstrinser(content, '<div class="position">', '</div>'), 'S3d')
        var strq1 = getstrinser(content, '<div class="info"', '</div');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');
        var strs4 = getstrinser(content, '<h1>', '</h1>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');

        // var tmps6 = getstrinser(content, '<dd>', '</dd>');
        var strs6 = getstrinser(content, '<div class="f1">', '</div>');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        // var strg1 = getstrinser(content, '<span id="endSource">', '</span>');
        // if (strg1 == "") strg1 = " ";
        strtotal += printstr('', 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
}
//people.com.cn
function getdatapeople(urlname, urltitle, content, rval) {
    if (urlname.indexOf('people.com.cn') < 0) return false;
    if (urlname.search(/auto\.people\.com\.cn\/n1/) > 0) {
        var strcom = getstrinser(urlname, 'n1/', '.html');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('人民网汽车', 'S2') + printstr('文章', 'S3a');
        // var tmps3d = getstrinser(content, '<div class="tit2">', '</div>');
        strtotal += printstr(getstrinser(content, '<span id="rwb_navpath">', '</span>'), 'S3d')
        var strq1 = getstrinser(content, 'id="rwb_zw"', '<div class="zdfy clearfix">');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');
        var strs4 = getstrinser(content, '<div class="otitle">', '</div>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');

        // var tmps6 = getstrinser(content, '<dd>', '</dd>');
        var strs6 = getstrinser(content, '<div class="f1">', '</div>');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        // var strg1 = getstrinser(content, '<span id="endSource">', '</span>');
        // if (strg1 == "") strg1 = " ";
        strtotal += printstr('', 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
}
//china.com.cn 中国网
function getdatachinacn(urlname, urltitle, content, rval) {
    if (urlname.indexOf('people.com.cn') < 0) return false;
    if (urlname.search(/auto\.people\.com\.cn\/n1/) > 0) {
        var strcom = getstrinser(urlname, 'n1/', '.html');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('中国网', 'S2') + printstr('文章', 'S3a');
        // var tmps3d = getstrinser(content, '<div class="tit2">', '</div>');
        strtotal += printstr(getstrinser(content, '<span class="cxz c f1">', '</span>'), 'S3d')
        var strq1 = getstrinser(content, 'id="fontzoom">', '</div">');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');
        var strs4 = getstrinser(content, '<h1 class="toph1">', '</h1>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');

        // var tmps6 = getstrinser(content, '<dd>', '</dd>');
        var strs6 = getstrinser(content, '<div class="f1 time2">', '</div>');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        // var strg1 = getstrinser(content, '<span id="endSource">', '</span>');
        // if (strg1 == "") strg1 = " ";
        strtotal += printstr('', 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
}
//cn2che.com
function getdatacn2che(urlname, urltitle, content, rval) {
    if (urlname.indexOf('cn2che.com') < 0) return false;
    if (urlname.search(/news\.cn2che\.com/) > 0) {
        var strcom = getstrinser(urlname, 'news/', '.html');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('二手车', 'S2') + printstr('文章', 'S3a');
        // var tmps3d = getstrinser(content, '<div class="tit2">', '</div>');
        strtotal += printstr(getstrinser(content, '<h1 class="position">', '</h1>'), 'S3d')
        var strq1 = getstrinser(content, '<div class="article">', '</div">');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');
        var strs4 = getstrinser(content, '<div class="newstitle">', '</h1>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');

        // var tmps6 = getstrinser(content, '<dd>', '</dd>');
        var strs6 = getstrinser(content, '<h3><span>', '</span>');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        var strg1 = getstrinser(content, '责任编辑：', '</span>');
        if (strg1 == "") return false;
        strtotal += printstr(strg1, 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
}
//zjrxz.com
function getzjrxz(urlname, urltitle, content, rval) {
    if (urlname.indexOf('zjrxz.com') < 0) return false;
    if (urlname.search(/zjrxz\.com\.com/) > 0) {
        var strcom = getstrinser(urlname, 'html/', '.html');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('浙江在线', 'S2') + printstr('文章', 'S3a');
        // var tmps3d = getstrinser(content, '<div class="tit2">', '</div>');
        strtotal += printstr(getstrinser(content, '<div class="crumb">', '</div>'), 'S3d')
        var strq1 = getstrinser(content, '<div class="article-content fontSizeSmall">', '<script>');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');
        var strs4 = getstrinser(content, '<h1 class="article-title">', '</h1>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');

        // var tmps6 = getstrinser(content, '<dd>', '</dd>');
        var strs6 = getstrinser(content, '<span class="date">', '</span>');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        // var strg1 = getstrinser(content, '责任编辑：', '</span>');
        // if (strg1 == "") return false;
        strtotal += printstr('', 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
}
//chinanews.com
function getdatachinanews(urlname, urltitle, content, rval) {
    if (urlname.indexOf('chinanews.com') < 0) return false;
    if (urlname.search(/chinanews\.com\/auto\/\d{4}/) > 0) {
        var strcom = getstrinser(urlname, 'auto/', '.shtml');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('中国新闻网', 'S2') + printstr('文章', 'S3a');
        // var tmps3d = getstrinser(content, '<div class="tit2">', '</div>');
        strtotal += printstr(getstrinser(content, '<div id="nav">', '</div>'), 'S3d')
        var strq1 = getstrinser(content, '<div class="left_zw" style="position:relative">', '<table');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');
        var strs4 = getstrinser(content, 'position:relative; text-align:center; clear:both">', '</h1>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');

        // var tmps6 = getstrinser(content, '<dd>', '</dd>');
        var strs6 = getstrinser(content, '<div class="left-t" style="padding-left:6px;">', '<a');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        // var strg1 = getstrinser(content, '责任编辑：', '</span>');
        // if (strg1 == "") return false;
        strtotal += printstr('中国新闻网', 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
    if (urlname.search(/chinanews\.com\/news\/\d{4}/) > 0) {
        var strcom = getstrinser(urlname, 'news/', '.shtml');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('中国新闻网', 'S2') + printstr('文章', 'S3a');
        strtotal += printstr('', 'S3d')
        var strq1 = getstrinser(content, '<div class=" branch_con_text">', '<div class="bianji">');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');
        var tmptitle = getstrinser(content, 'branch_con_title">', '</div>')
        var strs4 = getstrinser(tmptitle, '<h1>', '</h1>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');

        var strs6 = getstrinser(tmptitle, '<span>', '来源');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        var strg1 = getstrinser(tmptitle, '来源：', '</span>');
        if (strg1 == "") return false;
        strtotal += printstr(strg1, 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
}
//auto.cri.cn
function getdatacri(urlname, urltitle, content, rval) {
    if (urlname.indexOf('auto.cri.cn') < 0) return false;
    if (urlname.search(/auto\.cri\.cn\/\d{8}/) > 0) {
        var strcom = getstrinser(urlname, 'cn/', '.html');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('国际在线汽车', 'S2') + printstr('文章', 'S3a');
        // var tmps3d = getstrinser(content, '<div class="tit2">', '</div>');
        strtotal += printstr('', 'S3d')
        var strq1 = getstrinser(content, '<div id="abody" class="abody" pagedata="">', '</div>');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');
        var strs4 = getstrinser(content, 'class="atitle">', '</h1>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');

        // var tmps6 = getstrinser(content, '<dd>', '</dd>');
        var strs6 = getstrinser(content, 'class="apublishtime">', '</span>');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        var strg1 = getstrinser(content, 'class="asource">', '</span>');
        if (strg1 == "") return false;
        strtotal += printstr(strg1, 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
}
//auto.gxnews.com.cn
function getdatagxnews(urlname, urltitle, content, rval) {
    if (urlname.indexOf('auto.gxnews.com.cn') < 0) return false;
    if (urlname.search(/auto\.gxnews\.com\.cn/) > 0) {
        var strcom = getstrinser(urlname, 'newgx', '.shtml');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('广西新闻网', 'S2') + printstr('文章', 'S3a');
        // var tmps3d = getstrinser(content, '<div class="tit2">', '</div>');
        strtotal += printstr(getstrinser(content, '您当前的位置：</strong>', '</span>'),'S3d')
        var strq1 = getstrinser(content, '<div class="article-content">', '</div>');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');
        var title = getstrinser(content, '<div class="article">', '<div class="article-info">')
        var strs4 = getstrinser(title, '<h1>', '</h1>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');

        var tmps6 = getstrinser(content, '<div class="article-info">', '</div>');
        var strs6 = getstrinser(tmps6, '<span>', '来源');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        var strg1 = getstrinser(tmps6, '来源：', '</span>');
        if (strg1 == "") return false;
        strtotal += printstr(strg1, 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
}
//xinhuanet.com
function getdataxinhuanet(urlname, urltitle, content, rval) {
    if (urlname.indexOf('xinhuanet.com') < 0) return false;
    if (urlname.search(/xinhuanet\.com\/auto/) > 0) {
        var strcom = getstrinser(urlname, 'c_', '.html');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('新华汽车', 'S2') + printstr('文章', 'S3a');
        // var tmps3d = getstrinser(content, '<div class="tit2">', '</div>');
        strtotal += printstr(getstrinser(content, '<div class="news-position">', '</div>'),'S3d')
        var strq1 = getstrinser(content, '<div id="p-detail">', '<div class="l-ad-1">');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');
        // var title = getstrinser(content, '<div class="article">', '<div class="article-info">')
        var strs4 = getstrinser(content, '<div class="h-title">', '</div>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');

        var strs6 = getstrinser(content, '<span class="h-time">', '</span>');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        var strg1 = getstrinser(content, '<em id="source">', '</em>');
        if (strg1 == "") return false;
        strtotal += printstr(strg1, 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
    if (urlname.search(/xinhuanet\.com\/info/) > 0) {
        var strcom = getstrinser(urlname, 'c_', '.html');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('新华汽车', 'S2') + printstr('文章', 'S3a');
        // var tmps3d = getstrinser(content, '<div class="tit2">', '</div>');
        strtotal += printstr(getstrinser(content, '<span class="curDiv clearfix">', '<div class="search">'),'S3d')
        var strq1 = getstrinser(content, '<div class="article">', '<div id="articleEdit">');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');
        // var title = getstrinser(content, '<div class="article">', '<div class="article-info">')
        var strs4 = getstrinser(content, '<h1 id="title">', '</h1>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');

        var strs6 = getstrinser(content, '<span class="time">', '</span>');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        var strg1 = getstrinser(content, '<em id="source">', '</em>');
        if (strg1 == "") return false;
        strtotal += printstr(strg1, 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
}
//qx162.com
function getdataqx162(urlname, urltitle, content, rval) {
    if (urlname.indexOf('qx162.com') < 0) return false;
    if (urlname.search(/news\.qx162\.com\/qc/) > 0) {
        var strcom = getstrinser(urlname, 'qc/', '.shtml');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('黔讯网汽车', 'S2') + printstr('文章', 'S3a');
        // var tmps3d = getstrinser(content, '<div class="tit2">', '</div>');
        strtotal += printstr(getstrinser(content, '<div class="position">', '</div>'),'S3d')
        var strq1 = getstrinser(content, '<span id="zoom">', '</span>');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');
        // var title = getstrinser(content, '<div class="article">', '<div class="article-info">')
        var strs4 = getstrinser(content, '<title>', '</title>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');

        var strs6 = getstrinser(content, '<div class="lei"><div class="zuoze">', '</span>');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        var strg1 = getstrinser(content, '来源：', '<');
        if (strg1 == "") return false;
        strtotal += printstr(strg1, 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
}
//zuinow.com
function getdatazuinow(urlname, urltitle, content, rval) {
    if (urlname.indexOf('zuinow.com') < 0) return false;
    if (urlname.search(/zuinow\.com/) > 0) {
        var strcom = getstrinser(urlname, 'com/n', '.html');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('最新网汽车', 'S2') + printstr('文章', 'S3a');
        // var tmps3d = getstrinser(content, '<div class="tit2">', '</div>');
        strtotal += printstr('','S3d')
        var strq1 = getstrinser(content, '<div itemprop="articleBody">', '</div>');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');
        // var title = getstrinser(content, '<div class="article">', '<div class="article-info">')
        var strs4 = getstrinser(content, '原标题：', '</');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');

        var strs6 = getstrinser(content, '时间：', '</');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        var strg1 = getstrinser(content, '来源：', '</');
        if (strg1 == "") return false;
        strtotal += printstr(strg1, 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
}
//chextx.com
function getdatachextx(urlname, urltitle, content, rval) {
    if (urlname.indexOf('chextx.com') < 0) return false;
    if (urlname.search(/chextx\.com\/News\/news\/aid/) > 0) {
        var strcom = getstrinser(urlname, 'aid/', '.html');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('车行天下', 'S2') + printstr('文章', 'S3a');
        // var tmps3d = getstrinser(content, '<div class="tit2">', '</div>');
        strtotal += printstr(getstrinser(content, '<div class="breadnav left">', '</div>'),'S3d');
        var strq1 = getstrinser(content, '<div class="content">', '</div>');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');
        // var title = getstrinser(content, '<div class="article">', '<div class="article-info">')
        var tmps6 = getstrinser(content, '<div class="title">', '</div>');
        var strs4 = getstrinser(tmps6, '<h2>', '</h2>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');

        var strs = getstrinser(tmps6, '<p>', '<span>来源');
        var strs6 = getstrinser(strs, '<span>', '</span>');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        var strg1 = getstrinser(content, '来源：', '</');
        if (strg1 == "") return false;
        strtotal += printstr(strg1, 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
}
//china.com 中华网
function getdatachina(urlname, urltitle, content, rval) {
    if (urlname.indexOf('china.com') < 0) return false;
    if (urlname.search(/auto\.china\.com\/\w+\/\w+\//) > 0) {
        var strcom = getstrinser(urlname, 'com/', '.html');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('中华网汽车', 'S2') + printstr('文章', 'S3a');
        // var tmps3d = getstrinser(content, '<div class="tit2">', '</div>');
        strtotal += printstr(getstrinser(content, '<div id="chan_breadcrumbs">', '</div>'),'S3d');
        var strq1 = getstrinser(content, '<div id="chan_newsDetail">', '</div>');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');
        // var title = getstrinser(content, '<div class="article">', '<div class="article-info">')
        var strs4 = getstrinser(content, '<h1 id="chan_newsTitle">', '</h1>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');

        var tmps6 = getstrinser(content, '<div id="chan_newsInfo">', '<span class="chan_newsInfo_comment">');

        var strs6 = getstrinser(tmps6, '</div>', '<a>');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        var strg1 = getstrinser(tmps6, 'target="_blank">', '</');
        if (strg1 == "") return false;
        strtotal += printstr(strg1, 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
}
//e23.cn
function getdatae23cn(urlname, urltitle, content, rval) {
    if (urlname.indexOf('e23.cn') < 0) return false;
    if (urlname.search(/car\.e23\.cn\/content/) > 0) {
        var strcom = getstrinser(urlname, 'content/', '.html');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('舜网汽车', 'S2') + printstr('文章', 'S3a');
        // var tmps3d = getstrinser(content, '<div class="tit2">', '</div>');
        strtotal += printstr(getstrinser(content, '<div class="t_left h12">', '</div>'),'S3d');
        var strq1 = getstrinser(content, '<div class="h16">', '</div>');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');
        // var title = getstrinser(content, '<div class="article">', '<div class="article-info">')
        var strs4 = getstrinser(content, '<div id="endSummary">', '</div>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');

        var tmps6 = getstrinser(content, '<div class="artInfo h12">', '</div>');

        var strs6 = getstrinser(tmps6, '</span><span>', '</span><span>');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        // var strg1 = getstrinser(tmps6, 'target="_blank">', '</');
        // if (strg1 == "") return false;
        strtotal += printstr('http://www.e23.cn', 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
}
//ce.cn
function getdatacecn(urlname, urltitle, content, rval) {
    if (urlname.indexOf('ce.cn') < 0) return false;
    if (urlname.search(/auto\.ce\.cn\/\w+\//) > 0) {
        var strcom = getstrinser(urlname, '/t', '.shtml');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('中国经济网汽车', 'S2') + printstr('文章', 'S3a');
        // var tmps3d = getstrinser(content, '<div class="tit2">', '</div>');
        strtotal += printstr(getstrinser(content, '<td bgcolor="#FFFFFF">', '</td>'),'S3d');
        var strq1 = getstrinser(content, '<div class="Custom_UnionStyle">', '</div>');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');
        // var title = getstrinser(content, '<div class="article">', '<div class="article-info">')
        var strs4 = getstrinser(content, '<h1 id="articleTitle">', '</h1>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');

        var strs6 = getstrinser(content, '<span id="articleTime">', '</span>');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        var strg1 = getstrinser(content, '<span id="articleSource">', '</span>');
        if (strg1 == "") return false;
        strtotal += printstr(strg1, 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
}
//hyqcw.con
function getdatahyqcw(urlname, urltitle, content, rval) {
    if (urlname.indexOf('hyqcw.com') < 0) return false;
    if (urlname.search(/(www|car)\.hyqcw\.com\/(car|qiche)\//) > 0) {
        var strcom = getstrinser(urlname, 'car/', '.html');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('投资中国汽车', 'S2') + printstr('文章', 'S3a');
        // var tmps3d = getstrinser(content, '<div class="tit2">', '</div>');
        strtotal += printstr(getstrinser(content, '<div class="n-text">', '</div>'),'S3d');
        var strq1 = getstrinser(content, '<div class="content showp"', '</div>');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');
        var title = getstrinser(content, '<div class="title">', '</div>');
        var strs4 = getstrinser(title, '<h1>', '</h1>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');

        var strs6 = getstrinser(content, '<small>时间:</small>', '</span>');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        var strg1 = getstrinser(content, '<small>来源:</small>', '</span>');
        if (strg1 == "") return false;
        strtotal += printstr(strg1, 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
}
//cnfol.com
function getdatacnfol(urlname, urltitle, content, rval) {
    if (urlname.indexOf('cnfol.com') < 0) return false;
    if (urlname.search(/(auto|news)\.cnfol\.com\//) > 0) {
        var strcom = getstrinser(urlname, 'com/', '.html');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('中金在线汽车', 'S2') + printstr('文章', 'S3a');
        // var tmps3d = getstrinser(content, '<div class="tit2">', '</div>');
        strtotal += printstr(getstrinser(content, '<div class="LocalUl">', '</div>'),'S3d');
        var strq1 = getstrinser(content, '<div class="Article">', '</div>');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');
        var strs4 = getstrinser(content, '<h3 class="artTitle">', '</h3>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');
        var tmp = getstrinser(content, '<div class="artDes">', '</div>');
        var strs = getstrinser(tmp, '</a>', '</span>来源:');
        var strs6 = getstrinser(strs, '<span>', '</span>');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        var strg1 = getstrinser(content, '<span>来源:', '</span>');
        if (strg1 == "") return false;
        strtotal += printstr(strg1, 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
}
//3158.cn
function getdata3158(urlname, urltitle, content, rval) {
    if (urlname.indexOf('3158.cn') < 0) return false;
    if (urlname.search(/zhanhui\.3158\.cn\//) > 0) {
        var strcom = getstrinser(urlname, 'zhxx/', '.html');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('3158招商加盟网', 'S2') + printstr('文章', 'S3a');
        // var tmps3d = getstrinser(content, '<div class="tit2">', '</div>');
        strtotal += printstr(getstrinser(content, '<div class="breadcrumb">', '</div>'),'S3d');
        var strq1 = getstrinser(content, '<div class="content_bd">', '</div>');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');
        var strs4 = getstrinser(content, '<h2 class="tit">', '</h2>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');
        // var tmp = getstrinser(content, '<div class="artDes">', '</div>');
        // var strs = getstrinser(tmp, '</a>', '</span>来源:');
        var strs6 = getstrinser(strs, '展会日期 :', '</');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        // var strg1 = getstrinser(content, '<span>来源:', '</span>');
        // if (strg1 == "") return false;
        strtotal += printstr('3158招商加盟网', 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
}
//southcn.com
function getdatasouthcn(urlname, urltitle, content, rval) {
    if (urlname.indexOf('southcn.com') < 0) return false;
    if (urlname.search(/(cz|car|tech)\.southcn\.com\//) > 0) {
        var strcom = getstrinser(urlname, 'content_', '.htm');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('南方网汽车', 'S2') + printstr('文章', 'S3a');
        // var tmps3d = getstrinser(content, '<div class="tit2">', '</div>');
        strtotal += printstr(getstrinser(content, '<div class="m-crm g-wp">', '</div>'), 'S3d');
        var strq1 = getstrinser(content, 'id="content">', '</div>');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');
        var strs4 = getstrinser(content, '<h2 id="article_title">', '</h2>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');
        // var tmp = getstrinser(content, '<div class="artDes">', '</div>');
        // var strs = getstrinser(tmp, '</a>', '</span>来源:');
        var strs6 = getstrinser(strs, 'id="pubtime_baidu">', '</');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        var strg1 = getstrinser(content, 'id="source_baidu">来源：', '</');
        if (strg1 == "") return false;
        strtotal += printstr(strg1, 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
}
//hgitv.com
function getdatahgitv(urlname, urltitle, content, rval) {
    if (urlname.indexOf('hgitv.com') < 0) return false;
    if (urlname.search(/hgitv\.com\/car/) > 0) {
        var strcom = getstrinser(urlname, 'car/', '.html');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('黄冈新视窗', 'S2') + printstr('文章', 'S3a');
        // var tmps3d = getstrinser(content, '<div class="tit2">', '</div>');
        strtotal += printstr(getstrinser(content, '<p class="list_left_dh">', '</p>'), 'S3d');
        var strq1 = getstrinser(content, '<div class="content_text_main">', '<div class');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');
        var tmps4 = getstrinser(content, '<div class="content">', '<p class="content_p1">')
        var strs4 = getstrinser(tmps4, '<h1>', '</h1>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');
        // var tmp = getstrinser(content, '<div class="artDes">', '</div>');
        // var strs = getstrinser(tmp, '</a>', '</span>来源:');
        var strs6 = getstrinser(strs, '时间：', '文章已被浏览');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        var strg1 = getstrinser(content, '编辑：', '时间');
        if (strg1 == "") return false;
        strtotal += printstr(strg1, 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
}
//hinews.cn
function getdatahinews(urlname, urltitle, content, rval) {
    if (urlname.indexOf('hinews.cn') < 0) return false;
    if (urlname.search(/auto\.hinews\.cn/) > 0) {
        var strcom = getstrinser(urlname, 'xuh=', '');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('南海网汽车', 'S2') + printstr('文章', 'S3a');
        strtotal += printstr(getstrinser(content, '<h5>', '</h5>'), 'S3d');
        var tmpq1 = getstrinser(content, '<div class="item">', '</div>')
        var strq1 = getstrinser(tmpq1, '</h6>', '</div>');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');
        var strs4 = getstrinser(tmpq1, '<h1>', '</h1>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');
        var strs6 = getstrinser(tmpq1, '<h6>', '</h6>');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        // var strg1 = getstrinser(content, '编辑：', '时间');
        // if (strg1 == "") return false;
        strtotal += printstr('', 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
}
//0752qc.com
function getdata0752qc(urlname, urltitle, content, rval) {
    if (urlname.indexOf('0752qc.com') < 0) return false;
    if (urlname.search(/news\.0752qc\.com/) > 0) {
        var strcom = getstrinser(urlname, 'news-', '.html');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('惠州汽车网', 'S2') + printstr('文章', 'S3a');
        strtotal += printstr(getstrinser(content, '<div class="NewsLocation black12">', '</div>'), 'S3d');
        // var tmpq1 = getstrinser(content, '<div class="item">', '</div>')
        var strq1 = getstrinser(content, '<div class="newscon">', '</div>');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');

        var tmps4 = getstrinser(content, '<div class="info">', '<p class="newstime">')
        var strs4 = getstrinser(tmps4, '<h1>', '</h1>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');

        var tmps6 = getstrinser(content, '<p class="newstime">', '</p>')
        var strs6 = getstrinser(tmps6, '</a>', '来源');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        var strg1 = getstrinser(tmps6, 'target="_blank">', '</a>');
        if (strg1 == "") return false;
        strtotal += printstr(strg1, 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
}
//tuxi.com.cn
function getdatatuxi(urlname, urltitle, content, rval) {
    if (urlname.indexOf('tuxi.com.cn') < 0) return false;
    if (urlname.search(/news\.tuxi\.com\.cn\/(viewtt|news)/) > 0) {
        var strcom = getstrinser(urlname, 'cn/', '.html');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('突袭资讯汽车', 'S2') + printstr('文章', 'S3a');
        strtotal += printstr(getstrinser(content, '当前位置 : ', '</span>'), 'S3d');
        // var tmpq1 = getstrinser(content, '<div class="item">', '</div>')
        var strq1 = getstrinser(content, 'id="post-txt">', '<div class="clearfix">');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');

        var tmps4 = getstrinser(content, '<div class="post-main fl o">', '<div class="post-meta clearfix">')
        var strs4 = getstrinser(tmps4, '<h2>', '</h2>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');

        // var tmps6 = getstrinser(content, '<p class="newstime">', '</p>')
        // var strs6 = getstrinser(tmps6, '</a>', '来源');
        // if (strs6 == "") return false;
        // strs6 = timetrtostdstr(strs6);
        strtotal += printstr('', 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        var strg1 = getstrinser(content, 'class="author">', '</a>');
        if (strg1 == "") return false;
        strtotal += printstr(strg1, 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
    if (urlname.search(/yingyu\.tuxi\.com\.cn\/ttviewt/) > 0) {
        var strcom = getstrinser(urlname, 'ttviewt/', '.html');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('突袭资讯汽车', 'S2') + printstr('文章', 'S3a');
        strtotal += printstr(getstrinser(content, '<div class="path fl">', '</div>'), 'S3d');
        // var tmpq1 = getstrinser(content, '<div class="item">', '</div>')
        var strq1 = getstrinser(content, '<div class="artical">', '<div');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');

        var tmps4 = getstrinser(content, '<div class="main_news_l fl">', '<div class="detail">')
        var strs4 = getstrinser(tmps4, '<h1>', '</h1>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');

        // var tmps6 = getstrinser(content, '<p class="newstime">', '</p>')
        // var strs6 = getstrinser(tmps6, '</a>', '来源');
        // if (strs6 == "") return false;
        // strs6 = timetrtostdstr(strs6);
        strtotal += printstr('', 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        var strg1 = getstrinser(content, '<em class="editor">责任编辑：', '</em>');
        if (strg1 == "") return false;
        strtotal += printstr(strg1, 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
    if (urlname.search(/tuxi\.com\.cn\/html/) > 0) {
        var strcom = getstrinser(urlname, 'html/', '.html');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('突袭资讯汽车', 'S2') + printstr('文章', 'S3a');
        strtotal += printstr(getstrinser(content, '<div class="con_posi_tag">', '</div>'), 'S3d');
        // var tmpq1 = getstrinser(content, '<div class="item">', '</div>')
        var strq1 = getstrinser(content, 'class="article-content">', '</div');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');

        var tmps4 = getstrinser(content, '<div class="articlewrap">', '<div class="article-info">')
        var strs4 = getstrinser(tmps4, '<h1>', '</h1>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');

        // var tmps6 = getstrinser(content, '<p class="newstime">', '</p>')
        // var strs6 = getstrinser(tmps6, '</a>', '来源');
        // if (strs6 == "") return false;
        // strs6 = timetrtostdstr(strs6);
        strtotal += printstr('', 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        tmpg1 = getstrinser(content, '<div class="article-info">', '</div>')
        var strg1 = getstrinser(tmpg1, '<em class="blue">', '</em>');
        if (strg1 == "") return false;
        strtotal += printstr(strg1, 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
}
//315che.com
function getdata315che(urlname, urltitle, content, rval) {
    if (urlname.indexOf('315che.com') < 0) return false;
    if (urlname.search(/inf\.315che\.com/) > 0) {
        var strcom = getstrinser(urlname, 'n/', '');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('中国汽车消费网', 'S2') + printstr('文章', 'S3a');
        strtotal += printstr(getstrinser(content, '您现在的位置：', '</p>'), 'S3d');
        // var tmpq1 = getstrinser(content, '<div class="item">', '</div>')
        var strq1 = getstrinser(content, '<div class="article-content">', '<div');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');

        // var tmps4 = getstrinser(content, '<div class="info">', '<p class="newstime">')
        var strs4 = getstrinser(content, '<h1 class="article-title">', '</h1>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');

        // var tmps6 = getstrinser(content, '<p class="newstime">', '</p>')
        var strs6 = getstrinser(content, '<span class="fcgray post-time">', '</span>');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        var strg1 = getstrinser(tmps6, '<span class="fcgray">责任编辑：', '</');
        if (strg1 == "") return false;
        strtotal += printstr(strg1, 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
}
//qc188.com
function getdataqc188(urlname, urltitle, content, rval) {
    if (urlname.indexOf('qc188.com') < 0) return false;
    if (urlname.search(/club\.qc188\.com/) > 0) {
        var strcom = getstrinser(urlname, 'thread-', '.html');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('汽车江湖网', 'S2') + printstr('文章', 'S3a');
        strtotal += printstr(getstrinser(content, '<div class="z">', '</div>'), 'S3d');
        // var tmpq1 = getstrinser(content, '<div class="item">', '</div>')
        var strq1 = getstrinser(content, '<td class="t_f" id="postmessage', '</td>');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');

        // var tmps4 = getstrinser(content, '<div class="info">', '<p class="newstime">')
        var strs4 = getstrinser(content, 'id="thread_subject">', '</a>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');

        // var tmps6 = getstrinser(content, '<p class="newstime">', '</p>')
        var strs6 = getstrinser(content, '>发表于 ', '</em>');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        // var strg1 = getstrinser(tmps6, '<span class="fcgray">责任编辑：', '</');
        // if (strg1 == "") return false;
        strtotal += printstr('', 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
    if (urlname.search(/qc188\.com\/(ztdg|qczs|dbdg|pcsj|news|cwcs)/) > 0) {
        var strcom = getstrinser(urlname, 'com/', '.html');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('汽车江湖网', 'S2') + printstr('文章', 'S3a');
        strtotal += printstr(getstrinser(content, '<div class="nav">', '</div>'), 'S3d');
        // var tmpq1 = getstrinser(content, '<div class="item">', '</div>')
        var strq1 = getstrinser(content, '<div class="info">', '</div>');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');

        var tmps4 = getstrinser(content, '<div class="content">', '<p class="txt">')
        var strs4 = getstrinser(tmps4, '<h1>', '</h1>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');

        var tmps6 = getstrinser(content, '<div class="txt">', '</div>')
        var strs6 = getstrinser(tmps6, '纠错</a>', '<span id="Author">');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        var strg1 = getstrinser(content, '作者：', '</');
        if (strg1 == "") return false;
        strtotal += printstr('', 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
    if (urlname.search(/qc188\.com\/xiangjie/) > 0) {
        var strcom = getstrinser(urlname, 'xiangjie/', '.html');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('汽车江湖网', 'S2') + printstr('文章', 'S3a');
        strtotal += printstr(getstrinser(content, '您现在的位置：', '</div>'), 'S3d');
        // var tmpq1 = getstrinser(content, '<div class="item">', '</div>')
        var strq1 = getstrinser(content, '<div class="news">', '</div>');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');

        var tmps4 = getstrinser(content, '<div class="news_title">', '</div>')
        var strs4 = getstrinser(tmps4, '<h1>', '</h1>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');

        // var tmps6 = getstrinser(content, '<div class="txt">', '</div>')
        // var strs6 = getstrinser(tmps6, '纠错</a>', '<span id="Author">');
        // if (strs6 == "") return false;
        // strs6 = timetrtostdstr(strs6);
        strtotal += printstr('', 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        // var strg1 = getstrinser(content, '作者：', '</');
        // if (strg1 == "") return false;
        strtotal += printstr('', 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
}
//365jia.cn
function getdata365jia(urlname, urltitle, content, rval) {
    if (urlname.indexOf('365jia.cn') < 0) return false;
    if (urlname.search(/auto\.365jia\.cn\/news/) > 0) {
        var strcom = getstrinser(urlname, 'news/', '.html');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('万家汽车网', 'S2') + printstr('文章', 'S3a');
        strtotal += printstr(getstrinser(content, '<span class="fz14 di vb">', '</span>'), 'S3d');
        // var tmpq1 = getstrinser(content, '<div class="item">', '</div>')
        var strq1 = getstrinser(content, '<div class="newscon">', '</div>');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');

        var tmps4 = getstrinser(content, '<div class="info">', '<p class="newstime">')
        var strs4 = getstrinser(tmps4, '<h1>', '</h1>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');

        var strs6 = getstrinser(content, 'class="mr10">', '</')
        strs6 += getstrinser(content, 'class="mr15">', '</');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        var strg1 = getstrinser(content, '来源：', '</');
        if (strg1 == "") return false;
        strtotal += printstr(strg1, 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
}
//dzwww.com
function getdatadzwww(urlname, urltitle, content, rval) {
    if (urlname.indexOf('dzwww.com') < 0) return false;
    if (urlname.search(/dzwww\.com\/(news|cw|dg)/) > 0) {
        var strcom = getstrinser(urlname, 'news/', '.htm');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('大众网汽车', 'S2') + printstr('文章', 'S3a');
        strtotal += printstr(getstrinser(content, '<div class="add">', '</div>'), 'S3d');
        // var tmpq1 = getstrinser(content, '<div class="item">', '</div>')
        var strq1 = getstrinser(content, '<div class="TRS_Editor">', '</div>');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');

        var tmps4 = getstrinser(content, '<div class="layout">', '<div class="right">')
        var strs4 = getstrinser(tmps4, '<h2>', '</h2>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');

        var strs6 = getstrinser(tmps4, 'class="left">', '来源')
        // strs6 += getstrinser(content, 'class="mr15">', '</');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        var strg1 = getstrinser(tmps4, '来源：', '作者');
        if (strg1 == "") return false;
        strtotal += printstr(strg1, 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
    if (urlname.search(/auto\.dzwww\.com\/data\/news/) > 0) {
        var strcom = getstrinser(urlname, 'storys_', '.htm');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('大众网汽车', 'S2') + printstr('文章', 'S3a');
        strtotal += printstr(getstrinser(content, '当前位置：', '</p>'), 'S3d');
        // var tmpq1 = getstrinser(content, '<div class="item">', '</div>')
        var strq1 = getstrinser(content, '<div class="ina_content">', '</div>');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');

        var tmps4 = getstrinser(content, '<div class="ina_news_text">', '<div class="ina_author">')
        var strs4 = getstrinser(tmps4, '<h1>', '</h1>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');

        var strs6 = getstrinser(tmps4, 'class="ina_data">', '</')
        // strs6 += getstrinser(content, 'class="mr15">', '</');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        var tmpg1 = getstrinser(tmps4, '<span class="ina_source">', '</span>');
        var strg1 = getstrinser(tmpg1, '">', '</')
        if (strg1 == "") return false;
        strtotal += printstr(strg1, 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
    if (urlname.search(/\w+\.dzwww\.com\/(qcsx|qc)/) > 0) {
        var strcom = getstrinser(urlname, '/t', '.htm');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('大众网汽车', 'S2') + printstr('文章', 'S3a');
        strtotal += printstr(getstrinser(content, '<div class="add">', '</div>'), 'S3d');
        // var tmpq1 = getstrinser(content, '<div class="item">', '</div>')
        var strq1 = getstrinser(content, '<div class="TRS_Editor">', '</div>');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');

        var tmps4 = getstrinser(content, '<div class="top">', '<p>')
        var strs4 = getstrinser(tmps4, '<h1>', '</h1>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');

        var strs6 = getstrinser(content, 'fabutime-->', '<')
        // strs6 += getstrinser(content, 'class="mr15">', '</');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        // var tmpg1 = getstrinser(tmps4, '<span class="ina_source">', '</span>');
        var strg1 = getstrinser(tmpg1, 'laiyuan-->', '<')
        if (strg1 == "") return false;
        strtotal += printstr(strg1, 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
    if (urlname.search(/\w+\.dzwww\.com\/auto/) > 0) {
        var strcom = getstrinser(urlname, '/t', '.htm');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('大众网汽车', 'S2') + printstr('文章', 'S3a');
        strtotal += printstr(getstrinser(content, '<div class="f12">', '</div>'), 'S3d');
        var strq1 = getstrinser(content, '<div class="TRS_Editor">', '</div>');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');

        var strs4 = getstrinser(tmps4, '<title>', '</title>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');

        var strs6 = getstrinser(content, '<span id="pubtime_baidu">', '</')
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";

        var strg1 = getstrinser(tmpg1, '<span id="source_baidu">来源：', '</')
        if (strg1 == "") return false;
        strtotal += printstr(strg1, 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
}
//qi-che.cn
function getdataqi_che(urlname, urltitle, content, rval) {
    if (urlname.indexOf('qi-che.com') < 0) return false;
    if (urlname.search(/new\.qi-che\.com\/(news|auto)/) > 0) {
        var strcom = getstrinser(urlname, 'com/', '.html');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('汽车中国网', 'S2') + printstr('文章', 'S3a');
        strtotal += printstr(getstrinser(content, '<div class="pos">', '</div>'), 'S3d');
        var strq1 = getstrinser(content, '<div class="content">', '</div>');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');

        var tmps4 = getstrinser(content, '<div class="arc_l">', '<p class="intr">')
        var strs4 = getstrinser(tmps4, '<h1>', '</h1>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');

        var strs6 = getstrinser(content, '发布时间：', '<a')
        // strs6 += getstrinser(content, 'class="mr15">', '</');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        // var strg1 = getstrinser(content, '来源：', '</');
        // if (strg1 == "") return false;
        strtotal += printstr('', 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
    if (urlname.search(/www\.qi-che\.com\/(daogou|guoneicheshi|pingce|qichezixun|rp)/) > 0) {
        var strcom = getstrinser(urlname, 'com/', '.html');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('汽车中国网', 'S2') + printstr('文章', 'S3a');
        strtotal += printstr(getstrinser(content, '<div class="pos">', '</div>'), 'S3d');
        var strq1 = getstrinser(content, '<table class="yxsj">', '</table>');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');

        var tmps4 = getstrinser(content, '<div class="arc_l">', '<p class="intr">')
        var strs4 = getstrinser(tmps4, '<h1>', '</h1>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');

        var strs6 = getstrinser(content, '发布时间：', '<a')
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        // var strg1 = getstrinser(content, '来源：', '</');
        // if (strg1 == "") return false;
        strtotal += printstr('', 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
}
//news18a.com
function getdatanews18a(urlname, urltitle, content, rval) {
    if (urlname.indexOf('news18a.com') < 0) return false;
    if (urlname.search(/(auto|v)\.news18a\.com\/news\/storys/) > 0) {
        var strcom = getstrinser(urlname, 'storys_', '.html');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('网通社汽车', 'S2') + printstr('文章', 'S3a');
        strtotal += printstr(getstrinser(content, '当前位置：', '</p>'), 'S3d');
        var strq1 = getstrinser(content, '<div class="ina_content ">', '</div>');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');

        // var tmps4 = getstrinser(content, '<title>', '</title>')
        var strs4 = getstrinser(content, '<title>', '</title>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');

        var strs6 = getstrinser(content, '<span class="ina_data">', '</')
        // strs6 += getstrinser(content, 'class="mr15">', '</');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        var tmpg1 = getstrinser(content, '<span class="ina_source">', '</span>')
        var strg1 = getstrinser(content, '>', '</a');
        if (strg1 == "") return false;
        strtotal += printstr('', 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
}
//pconline.com.cn 太平洋汽车科技
function getdatapconline(urlname, urltitle, content, rval) {
    if (urlname.indexOf('pconline.com.cn') < 0) return false;
    if (urlname.search(/pconline\.com\.cn\/autotech/) > 0) {
        var strcom = getstrinser(urlname, 'autotech/', '.html');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('太平洋汽车科技', 'S2') + printstr('文章', 'S3a');
        strtotal += printstr(getstrinser(content, '<div class="crumb">', '</div>'), 'S3d');
        var strq1 = getstrinser(content, '<div class="content-cont">', '<div class="art-tools"');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');

        // var tmps4 = getstrinser(content, '<title>', '</title>')
        var strs4 = getstrinser(content, '<p class="content-tit-1">', '</');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');

        var strs6 = getstrinser(content, '<span class="pubtime">', '</')
        // strs6 += getstrinser(content, 'class="mr15">', '</');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        // var tmpg1 = getstrinser(content, '<span class="ina_source">', '</span>')
        var strg1 = getstrinser(content, '<span class="source">出处：', '</');
        if (strg1 == "") return false;
        strtotal += printstr('', 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
    if (urlname.search(/\w+\.com\.cn\/\d{4}\//) > 0) {
        var strcom = getstrinser(urlname, 'cn/', '.html');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('太平洋汽车科技', 'S2') + printstr('文章', 'S3a');
        strtotal += printstr(getstrinser(content, '<div class="crumb">', '</div>'), 'S3d');
        var strq1 = getstrinser(content, '--文章内容--', '--文章内容end--');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');

        var tmps4 = getstrinser(content, '<div class="art_hd">', '<div class="art_bd">');
        var strs4 = getstrinser(content, '<h1>', '</h1>')
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');

        var strs6 = getstrinser(tmps4, '<p>', '出处')
        // strs6 += getstrinser(content, 'class="mr15">', '</');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        // var tmpg1 = getstrinser(content, '<span class="ina_source">', '</span>')
        var strg1 = getstrinser(content, 'class="bAuthor">', '</');
        if (strg1 == "") return false;
        strtotal += printstr(strg1, 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
    if (urlname.search(/itbbs\.pconline\.com\.cn\/\tv/) > 0) {
        var strcom = getstrinser(urlname, 'tv/', '.html');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('太平洋汽车科技', 'S2') + printstr('文章', 'S3a');
        strtotal += printstr(getstrinser(content, '<div class="crumb">', '</div>'), 'S3d');
        var strq1 = getstrinser(content, '<div class="topiccontent">', '</div>');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');

        var tmps4 = getstrinser(content, '<div class="tit">', '</div>');
        var strs4 = getstrinser(tmps4, 'title="', '“>')
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');

        var strs6 = getstrinser(content, '<span class="date">', '</span>')
        // strs6 += getstrinser(content, 'class="mr15">', '</');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        // var tmpg1 = getstrinser(content, '<span class="ina_source">', '</span>')
        // var strg1 = getstrinser(content, 'class="topiccontent">', '</div');
        // if (strg1 == "") return false;
        strtotal += printstr('', 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
    if (urlname.search(/g\.pconline\.com\.cn\/xmip/) > 0) {
        var strcom = getstrinser(urlname, 'xmip/', '.html');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('太平洋汽车科技', 'S2') + printstr('文章', 'S3a');
        strtotal += printstr('', 'S3d');
        var strq1 = getstrinser(content, 'id="JlazyImg">', '</div>');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');

        var strs4 = getstrinser(content, '<h1 class="art-title">', '</h1>');
        // var strs4 = getstrinser(tmps4, 'title="', '“>')
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');

        var strs6 = getstrinser(content, '<span class="date">', '</span>')
        // strs6 += getstrinser(content, 'class="mr15">', '</');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        var tmpg1 = getstrinser(content, 'class="author">', '</span')
        var strg1 = getstrinser(tmpg1, 'target="_blank">', '</');
        if (strg1 == "") return false;
        strtotal += printstr(strg1, 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
}
//autotimes.com.cn
function getdataautotimes(urlname, urltitle, content, rval) {
    if (urlname.indexOf('autotimes.com.cn') < 0) return false;
    if (urlname.search(/m\.autotimes\.com\.cn\/news/) > 0) {
        var strcom = getstrinser(urlname, 'news/', '.html');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('汽车时代网', 'S2') + printstr('文章', 'S3a');
        strtotal += printstr('', 'S3d');
        var strq1 = getstrinser(content, '<div class="m_auto_17">', '</div>');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');

        // var tmps4 = getstrinser(content, '<title>', '</title>')
        var strs4 = getstrinser(content, '<div class=" m_auto_15">', '</div>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');

        var tmps6 = getstrinser(content, '<div class=" m_auto_16"', 'div>')
        strs6 += getstrinser(tmps6, '</span>', '</');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        // var tmpg1 = getstrinser(tmps6, '<span class="ina_source">', '</span>')
        var strg1 = getstrinser(tmps6, '>', '<span');
        if (strg1 == "") return false;
        strtotal += printstr(strg1, 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
    if (urlname.search(/autotimes\.com\.cn\/(news|dealer|market|v5lingzhi)/) > 0) {
        var strcom = getstrinser(urlname, '/20', '.html');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('汽车时代网', 'S2') + printstr('文章', 'S3a');
        strtotal += printstr(getstrinser(content, 'class="auto_sjl_3">', '</div'), 'S3d');
        var strq1 = getstrinser(content, '<div class="auto_wz_40">', '</div>');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');

        // var tmps4 = getstrinser(content, '<title>', '</title>')
        var strs4 = getstrinser(content, '<div class="auto_wz_39">', '</div>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');

        var tmps6 = getstrinser(content, 'class="auto_wz_11"', 'div>')
        strs6 += getstrinser(tmps6, '>', '</');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        // var tmpg1 = getstrinser(tmps6, '<span class="ina_source">', '</span>')
        // var strg1 = getstrinser(tmps6, '>', '<span');
        // if (strg1 == "") return false;
        strtotal += printstr('', 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
}
//enorth.com.cn
function getdataenorth(urlname, urltitle, content, rval) {
    if (urlname.indexOf('enorth.com.cn') < 0) return false;
    if (urlname.search(/(news|auto|economy|it|sports)\.enorth\.com\.cn\/system/) > 0) {
        var strcom = getstrinser(urlname, 'system', '.shtml');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('北方网', 'S2') + printstr('文章', 'S3a');
        strtotal += printstr(getstrinser(content, '<div class="brumb">', '</div>'), 'S3d');
        var strq1 = getstrinser(content, '<div class="content">', '</div>');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');

        // var tmps4 = getstrinser(content, '<title>', '</title>')
        var strs4 = getstrinser(content, '<h2 class="col-sm-12">', '<span');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');

        var tmps6 = getstrinser(content, '编辑：', '</p')
        var strs6 = getstrinser(tmps6, '<span>', '</span>');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        var strg1 = getstrinser(tmps6, '来源：', '</');
        if (strg1 == "") return false;
        strtotal += printstr('', 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
}
//mydrivers.com
function getdatamydrivers(urlname, urltitle, content, rval) {
    if (urlname.indexOf('mydrivers.com') < 0) return false;
    if (urlname.search(/news\.mydrivers\.com/) > 0) {
        var strcom = getstrinser(urlname, 'com/', '.html');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('驱动之家', 'S2') + printstr('文章', 'S3a');
        strtotal += printstr(getstrinser(content, ' 首页 > ', '</li>'), 'S3d');
        var strq1 = getstrinser(content, 'class="news_info"', 'class="weixin"');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');

        // var tmps4 = getstrinser(content, '<title>', '</title>')
        var strs4 = getstrinser(content, 'id="thread_subject">', '</');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');

        var tmps6 = getstrinser(content, '编辑：', '</p')
        var strs6 = getstrinser(tmps6, '<div class="news_bt1_left" style="width:570px;overflow:hidden;">', '出处');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        var strg1 = getstrinser(tmps6, 'rel="nofollow" style="color:#999;text-decoration:underline;">', '</a');
        if (strg1 == "") return false;
        strtotal += printstr(strg1, 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
}
//gai001.com
function getdatagai001(urlname, urltitle, content, rval) {
    if (urlname.indexOf('gai001.com') < 0) return false;
    if (urlname.search(/gai001\.com\/article/) > 0) {
        var strcom = getstrinser(urlname, 'article-', '.html');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('第一改装网', 'S2') + printstr('文章', 'S3a');
        strtotal += printstr(getstrinser(content, '<div class="z">', '</div>'), 'S3d');
        var strq1 = getstrinser(content, '<td id="article_content">', '</td>');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');

        // var tmps4 = getstrinser(content, '<title>', '</title>')
        var strs4 = getstrinser(content, '<h1 class="ph">', '</h1>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');

        // var tmps6 = getstrinser(content, '编辑：', '</p')
        var strs6 = getstrinser(tmps6, 'class="xg1">', '<');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        var strg1 = getstrinser(tmps6, '来自:', '</');
        if (strg1 == "") return false;
        strtotal += printstr(strg1, 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
}
//xxcmw.com
function getdataxxcmw(urlname, urltitle, content, rval) {
    if (urlname.indexOf('xxcmw.com') < 0) return false;
    if (urlname.search(/xxcmw\.com\/news/) > 0) {
        var strcom = getstrinser(urlname, 'news/', '.html');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('新新网汽车', 'S2') + printstr('文章', 'S3a');
        strtotal += printstr(getstrinser(content, '<div class="PositionNav">', '</div>'), 'S3d');
        var strq1 = getstrinser(content, '<div class="txt-wrap">', '<div class="NV_NewsEditor">');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');

        // var tmps4 = getstrinser(content, '<title>', '</title>')
        var strs4 = getstrinser(content, '<h1 class="h2">', '</h1>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');

        // var tmps6 = getstrinser(content, '编辑：', '</p')
        var strs6 = getstrinser(tmps6, '<span class="txt">', '来源');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        var strg1 = getstrinser(tmps6, '来源：', '记者');
        if (strg1 == "") return false;
        strtotal += printstr(strg1, 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
}
//mycar168.com
function getdatamycar168(urlname, urltitle, content, rval) {
    if (urlname.indexOf('mycar168.com') < 0) return false;
    if (urlname.search(/news\.\w+\.mycar168\.com/) > 0) {
        var strcom = getstrinser(urlname, 'com/', '.html');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('汽车大世界', 'S2') + printstr('文章', 'S3a');
        // var tmp = getstrinser(content, '<div id="position">', '')
        strtotal += printstr(getstrinser(content, '您的位置：', '</div>'), 'S3d');
        var strq1 = getstrinser(content, '<div class="article">', '<div class="bdsharebuttonbox');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');

        // var tmps4 = getstrinser(content, '<title>', '</title>')
        var strs4 = getstrinser(content, '<h1 id="title">', '</h1>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');

        var strs6 = getstrinser(tmps6, '</a>', '责任编辑');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        var strg1 = getstrinser(tmps6, 'class="copyfrom">', '</');
        if (strg1 == "") return false;
        strtotal += printstr(strg1, 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
}
//mnw.cn
function getdatamnw(urlname, urltitle, content, rval) {
    if (urlname.indexOf('mnw.cn') < 0) return false;
    if (urlname.search(/(www|auto)\.mnw\.cn\/\w+/) > 0) {
        var strcom = getstrinser(urlname, 'cn/', '.html');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('闽南网', 'S2') + printstr('文章', 'S3a');
        strtotal += printstr(getstrinser(content, '<div class="p">', '</div>'), 'S3d');
        var strq1 = getstrinser(content, '<div class="icontent">', '</div');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');

        var strs4 = getstrinser(content, '<title>', '</title>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');

        var tmps6 = getstrinser(content, '来源:', '<a')
        var strs6 = getstrinser(tmps6, '<span>', '</span>');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        var strg1 = getstrinser(tmps6, '来源:', '</');
        if (strg1 == "") return false;
        strtotal += printstr(strg1, 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
}
//xiaozhu2.com
function getdataxiaozhu2(urlname, urltitle, content, rval) {
    if (urlname.indexOf('xiaozhu2.com') < 0) return false;
    if (urlname.search(/m\.xiaozhu2\.com\/news/) > 0) {
        var strcom = getstrinser(urlname, 'news/', '.html');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('小猪二手车', 'S2') + printstr('文章', 'S3a');
        strtotal += printstr('', 'S3d');
        var strq1 = getstrinser(content, '<div class="article-detail">', '</div');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');

        var strs4 = getstrinser(content, '<h1 class="article-title">', '</h1>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');

        var tmps6 = getstrinser(content, '<div class="article-meta"><p>', '来源')
        var strs6 = getstrinser(tmps6, '<span>', '</span>');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        // var strg1 = getstrinser(tmps6, '来源:', '</');
        // if (strg1 == "") return false;
        strtotal += printstr('小猪二手车', 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
    if (urlname.search(/www\.xiaozhu2\.com\/news/) > 0) {
        var strcom = getstrinser(urlname, 'news/', '.html');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('小猪二手车', 'S2') + printstr('文章', 'S3a');
        strtotal += printstr(getstrinser(content, 'class="esc-artical-crumbs">', '</div>'), 'S3d');
        var strq1 = getstrinser(content, '<div class="artical-main-content article-detail artical-main-content-toutiao">', '</div');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');

        var strs4 = getstrinser(content, 'ref="title">', '</h1>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');

        var tmps6 = getstrinser(content, 'class="artical-main-info">', '来源')
        var strs6 = getstrinser(tmps6, '<span>', '</span>');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        var strg1 = getstrinser(tmps6, '来源:', '</');
        if (strg1 == "") return false;
        strtotal += printstr(strg1, 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
}
//fanshouji.com
function getdatafanshouji(urlname, urltitle, content, rval) {
    if (urlname.indexOf('fanshouji.com') < 0) return false;
    if (urlname.search(/fanshouji\.com\/html\/a/) > 0) {
        var strcom = getstrinser(urlname, 'a/', '.html');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('微精选', 'S2') + printstr('文章', 'S3a');
        strtotal += printstr(getstrinser(content, '<div class="weizhi">', '</div>'), 'S3d');
        var strq1 = getstrinser(content, '<div class="con">', '</div');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');

        var tmps4 = getstrinser(content, 'class="g_con"', 'class="info"')
        var strs4 = getstrinser(tmps4, '<h1>', '</h1>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');

        var strs6 = getstrinser(content, '时间:', '</')
        // var strs6 = getstrinser(tmps6, '<span>', '</span>');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        var strg1 = getstrinser(tmps6, '来源:', '</');
        if (strg1 == "") return false;
        strtotal += printstr(strg1, 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
}
//hatdot.com
function getdatahatdot(urlname, urltitle, content, rval) {
    if (urlname.indexOf('hatdot.com') < 0) return false;
    if (urlname.search(/hatdot\.com\/(caijing|guoji|keji|lishi|meishi|qiche|shehui|shishang|tiyu|youxi|yule|)/) > 0) {
        var strcom = getstrinser(urlname, 'com/', '.html');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('今日看点', 'S2') + printstr('文章', 'S3a');
        strtotal += printstr(getstrinser(content, '<div class="listview1">', '</div>'), 'S3d');
        var strq1 = getstrinser(content, '<div class="article-content">', '</div');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');

        var tmps4 = getstrinser(content, 'class="listltitle"', '<p>')
        var strs4 = getstrinser(tmps4, '<h1>', '</h1>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');

        var strs6 = getstrinser(content, '<span class="spanimg3">', '</span>')
        // var strs6 = getstrinser(tmps6, '<span>', '</span>');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        // var strg1 = getstrinser(tmps6, '来源:', '</');
        // if (strg1 == "") return false;
        strtotal += printstr('', 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
}
//0car0.com  check
function getdata0car0(urlname, urltitle, content, rval) {
    if (urlname.indexOf('0car0.com') < 0) return false;
    if (urlname.search(/0car0\.com\/(xnynews|xnycar|News|Infos|NewEnergyData)/) > 0) {
        var strcom = getstrinser(urlname, 'com/', '.html');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('零排放汽车网', 'S2') + printstr('文章', 'S3a');
        strtotal += printstr(getstrinser(content, '<div id="position_0car0">', '</div>'), 'S3d');
        var strq1 = getstrinser(content, '<div id="endtext_0car0">', '</div');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');

        var tmps4 = getstrinser(content, '文章标题-->', '-基本属性--')
        var strs4 = getstrinser(tmps4, '<h1>', '</h1>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');

        var tmps6 = getstrinser(content, '<h2>', '</h2>')
        var strs6 = getstrinser(tmps6, '<span>', '</span>')
        // var strs6 = getstrinser(tmps6, '<span>', '</span>');
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        // var strg1 = getstrinser(tmps6, '来源:', '</');
        // if (strg1 == "") return false;
        strtotal += printstr('', 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
}
//huanqiu.com
function getdatahuanqiu(urlname, urltitle, content, rval) {
    if (urlname.indexOf('huanqiu.com') < 0) return false;
    if (urlname.search(/(auto|world|oversea|tech|bigdata|opinion)\.huanqiu\.com\/\w+/) > 0) {
        var strcom = getstrinser(urlname, 'com/', '.html');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('环球网', 'S2') + printstr('文章', 'S3a');
        strtotal += printstr(getstrinser(content, '<div class="nav_left">', '</div>'), 'S3d');
        var strq1 = getstrinser(content, '<div class="la_con">', '</div');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');

        var strs4 = getstrinser(content, 'class="tle">', '</');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');

        var strs6 = getstrinser(content, 'class="la_t_a">', '</')
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        var strg1 = getstrinser(tmps6, 'class="la_t_b">', '</');
        if (strg1 == "") return false;
        strtotal += printstr(strg1, 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
}
//3car.cn
function getdata3car(urlname, urltitle, content, rval) {
    if (urlname.indexOf('3car.cn') < 0) return false;
    if (urlname.search(/www\.3car\.cn/) > 0) {
        var strcom = getstrinser(urlname, 'cn/', '.html');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('每日车网', 'S2') + printstr('文章', 'S3a');
        strtotal += printstr('每日车网 > 正文', 'S3d');
        var strq1 = getstrinser(content, '<div class="main-new-content">', '</div');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');

        var strs4 = getstrinser(content, '<h1>', '</h1>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');

        var strs6 = getstrinser(content, 'class="main-new-info">', '来源')
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        // var strg1 = getstrinser(tmps6, 'class="la_t_b">', '</');
        // if (strg1 == "") return false;
        strtotal += printstr('每日车网', 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
}
//sdnews.com.cn
function getdatasdnews(urlname, urltitle, content, rval) {
    if (urlname.indexOf('sdnews.com.cn') < 0) return false;
    if (urlname.search(/\w+\.sdnews\.com\.cn\/qc/) > 0) {
        var strcom = getstrinser(urlname, '/t', '.htm');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('鲁网汽车', 'S2') + printstr('文章', 'S3a');
        strtotal += printstr(getstrinser(content, '<div class="bread">', '</div>'), 'S3d');
        var strq1 = getstrinser(content, '<div class="TRS_Editor">', '</div');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');

        var strs4 = getstrinser(content, '<h1>', '</h1>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');

        var tmps6 = getstrinser(content, 'class="bb info">' ,'</span>')
        var strs6 = getstrinser(tmps6, '<span>', '来源')
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        var strg1 = getstrinser(content, '来源:', '</');
        if (strg1 == "") return false;
        strtotal += printstr(strg1, 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
}
//cs.com.cn
function getdatacscom(urlname, urltitle, content, rval) {
    if (urlname.indexOf('cs.com.cn') < 0) return false;
    if (urlname.search(/cs\.com\.cn\/\w+/) > 0) {
        var strcom = getstrinser(urlname, '/t', '.htm');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('中证网', 'S2') + printstr('文章', 'S3a');
        strtotal += printstr(getstrinser(content, '<div class="current">', '</div>'), 'S3d');
        var strq1 = getstrinser(content, '<div class="article-t hidden">', '</div');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');

        var strs4 = getstrinser(content, '<h1>', '</h1>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');

        var tmps6 = getstrinser(content, 'class="info">' ,'</div>')
        var strs6 = getstrinser(tmps6, '<em>', '</em>')
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        var strg1 = getstrinser(content, '来源：', '</');
        if (strg1 == "") return false;
        strtotal += printstr(strg1, 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
}
//car136.com
function getdatacar136(urlname, urltitle, content, rval) {
    if (urlname.indexOf('car136.com') < 0) return false;
    if (urlname.search(/car136\.com\/news/) > 0) {
        var strcom = getstrinser(urlname, 'news/', '.htm');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('汽车殿堂', 'S2') + printstr('文章', 'S3a');
        strtotal += printstr(getstrinser(content, '<div class="t_nav">', '</div>'), 'S3d');
        var strq1 = getstrinser(content, '<div id="dp_nr">', '<div class="next"');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');

        var strs4 = getstrinser(content, '<h1>', '</h1>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');

        // var tmps6 = getstrinser(content, 'class="info">' ,'</div>')
        var strs6 = getstrinser(content, 'Time:', '</')
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        // var strg1 = getstrinser(content, '来源：', '</');
        // if (strg1 == "") return false;
        strtotal += printstr('', 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
}
//scol.com.cn
function getdatascol(urlname, urltitle, content, rval) {
    if (urlname.indexOf('scol.com.cn') < 0) return false;
    if (urlname.search(/car\.scol\.com\.cn\/news/) > 0) {
        var strcom = getstrinser(urlname, 'storys_', '.html');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('四川在线汽车', 'S2') + printstr('文章', 'S3a');
        strtotal += printstr(getstrinser(content, '当前位置：', '</p>'), 'S3d');
        var strq1 = getstrinser(content, '<div class="ina_content ">', '</div>');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');

        var strs4 = getstrinser(content, '<h1>', '</h1>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');

        // var tmps6 = getstrinser(content, 'class="info">' ,'</div>')
        var strs6 = getstrinser(content, 'Time:', '</')
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        var tmpg1 = getstrinser(content, '来源：', '</span>');
        var strg1 = getstrinser(tmpg1, '>', '</')
        if (strg1 == "") return false;
        strtotal += printstr(strg1, 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
    if (urlname.search(/cbgc\.scol\.com\.cn\/news/) > 0) {
        var strcom = getstrinser(urlname, 'news/', '.html');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('四川在线汽车', 'S2') + printstr('文章', 'S3a');
        strtotal += printstr('', 'S3d');
        var strq1 = getstrinser(content, 'class="main-content">', '</div>');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');

        var strs4 = getstrinser(content, '<h1 class="rwArticleTit">', '</h1>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');

        // var tmps6 = getstrinser(content, 'class="info">' ,'</div>')
        var strs6 = getstrinser(content, 'class="articleTime">', '</')
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        // var tmpg1 = getstrinser(content, '来源：', '</span>');
        var strg1 = getstrinser(content, '来源：', '</')
        if (strg1 == "") return false;
        strtotal += printstr(strg1, 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
    if (urlname.search(/(auto|women|sichuan|house|focus|ent|sports)\.scol\.com\.cn\/news/) > 0) {
        var strcom = getstrinser(urlname, 'cn/', '.html');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('四川在线汽车', 'S2') + printstr('文章', 'S3a');
        strtotal += printstr(getstrinser(content, '您的位置：', '</li>'), 'S3d');
        var strq1 = getstrinser(content, '<div id="scol_txt">', '</div>');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');

        var strs4 = getstrinser(content, '<h1>', '</h1>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');

        // var tmps6 = getstrinser(content, 'class="info">' ,'</div>')
        var strs6 = getstrinser(content, 'id="pubtime_baidu">', '</')
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        var tmpg1 = getstrinser(content, '来源：', '</span>');
        var strg1 = getstrinser(tmpg1, '>', '</')
        if (strg1 == "") return false;
        strtotal += printstr(strg1, 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
}
//shangc.net
function getdatashangc(urlname, urltitle, content, rval) {
    if (urlname.indexOf('shangc.net') < 0) return false;
    if (urlname.search(/shangc\.net\/auto/) > 0) {
        var strcom = getstrinser(urlname, 'auto/', '.html');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('尚之潮网', 'S2') + printstr('文章', 'S3a');
        strtotal += printstr(getstrinser(content, '<div class="subnav f13">', '</div>'), 'S3d');
        var strq1 = getstrinser(content, '<div class="detail-content mb20">', '</div');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');

        var strs4 = getstrinser(content, '<h1 class="detail-title">', '</h1>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');

        // var tmps6 = getstrinser(content, 'class="info">' ,'</div>')
        var strs6 = getstrinser(content, 'class="time fl spacer-2">', '</')
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        var tmpg1 = getstrinser(content, '来源：', '</span');
        var strg1 = getstrinser(tmpg1, '>','</')
        if (strg1 == "") return false;
        strtotal += printstr(strg1, 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
    if (urlname.search(/fensi\.shangc\.net\/p/) > 0) {
        var strcom = getstrinser(urlname, 'p/', '');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('尚之潮网', 'S2') + printstr('文章', 'S3a');
        strtotal += printstr('', 'S3d');
        var strq1 = getstrinser(content, '<div class="detail-content">', '</div');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');

        var strs4 = getstrinser(content, '<h1 class="detail-title">', '</h1>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');

        // var tmps6 = getstrinser(content, 'class="info">' ,'</div>')
        // var strs6 = getstrinser(content, 'class="time fl spacer-2">', '</')
        // if (strs6 == "") return false;
        // strs6 = timetrtostdstr(strs6);
        strtotal += printstr('', 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        // var tmpg1 = getstrinser(content, '来源：', '</span');
        // var strg1 = getstrinser(content, '>','</')
        // if (strg1 == "") return false;
        strtotal += printstr('', 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
}
//henan100.com
function getdatahenan100(urlname, urltitle, content, rval) {
    if (urlname.indexOf('henan100.com') < 0) return false;
    if (urlname.search(/henan100\.com\/(jiaozuo|kaifeng|xinyang)/) > 0) {
        var strcom = getstrinser(urlname, 'com/', '.shtm');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('河南一百度', 'S2') + printstr('文章', 'S3a');
        var tmps3d = getstrinser(content, 'class="city_content_position margintop20"', '</div>')
        strtotal += printstr(getstrinser(tmps3d, '<p>', '</p>'), 'S3d');
        var strq1 = getstrinser(content, 'class="zhengwen">', '<span class="bianji">');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');

        var strs4 = getstrinser(content, '<h1>', '</h1>');
        // var strs4 = getstrinser(tmps4, '>','</')
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');

        // var tmps6 = getstrinser(content, 'class="info">' ,'</div>')
        var strs6 = getstrinser(content, '发布时间：', '<')
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        var strg1 = getstrinser(content, '来源：', '</');
        if (strg1 == "") return false;
        strtotal += printstr(strg1, 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
    if (urlname.search(/auto\.henan100\.com\//) > 0) {
        var strcom = getstrinser(urlname, 'com/', '.shtm');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('河南一百度', 'S2') + printstr('文章', 'S3a');
        strtotal += printstr(getstrinser(content, 'class="breadcrumb">', '</div>'), 'S3d');
        var strq1 = getstrinser(content, 'class="zhengwen">', '<span class="bianji">');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');

        var tmps4 = getstrinser(content, '<h1>', '</h1>');
        var strs4 = getstrinser(tmps4, '>','</')
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');

        // var tmps6 = getstrinser(content, 'class="info">' ,'</div>')
        var strs6 = getstrinser(content, '发布时间：', '</')
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        var strg1 = getstrinser(content, '来源：', '</');
        if (strg1 == "") return false;
        strtotal += printstr(strg1, 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
    if (urlname.search(/henan100\.com\/(auto|edu|news)/) > 0) {
        var strcom = getstrinser(urlname, 'com/', '.shtm');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('河南一百度', 'S2') + printstr('文章', 'S3a');
        strtotal += printstr(getstrinser(content, 'class="breadcrumb">', '</div>'), 'S3d');
        var strq1 = getstrinser(content, 'class="zhengwen">', '<span class="bianji">');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');

        var tmps4 = getstrinser(content, '<h1>', '</h1>');
        var strs4 = getstrinser(tmps4, '>','</')
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');

        // var tmps6 = getstrinser(content, 'class="info">' ,'</div>')
        var strs6 = getstrinser(content, '发布时间：', '</')
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        var strg1 = getstrinser(content, '来源：', '</');
        if (strg1 == "") return false;
        strtotal += printstr(strg1, 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
}
//anjuke.com
function getdataanjuke(urlname, urltitle, content, rval) {
    if (urlname.indexOf('anjuke.com') < 0) return false;
    if (urlname.search(/\w+\.news\.anjuke\.com/) > 0) {
        var strcom = getstrinser(urlname, 'com/', '.html');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('安居客', 'S2') + printstr('文章', 'S3a');
        strtotal += printstr('', 'S3d');
        var strq1 = getstrinser(content, '<div class="lp2">', '<div class="keywords"');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');

        var strs4 = getstrinser(content, '<h1 class="news-title">', '</h1>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');

        var tmps6 = getstrinser(content, '<div class="title-bar">', '</div>')
        var strs6 = getstrinser(tmps6, '>', '</')
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        // var strg1 = getstrinser(tmps6, '来源:', '</');
        // if (strg1 == "") return false;
        strtotal += printstr('', 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
}
//qingdaonews.com
function getdataqingdaonews(urlname, urltitle, content, rval) {
    if (urlname.indexOf('qingdaonews.com') < 0) return false;
    if (urlname.search(/auto\.qingdaonews\.com\/content/) > 0) {
        var strcom = getstrinser(urlname, 'content_', '.htm');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('青岛新闻网', 'S2') + printstr('文章', 'S3a');
        strtotal += printstr(getstrinser(content, '<div class="m-crm">', '</div'), 'S3d');
        var strq1 = getstrinser(content, '<div class="m-ct mb80">', '</div');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');

        var strs4 = getstrinser(content, '<h1 class="m-tt-1">', '</h1>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');

        var tmps6 = getstrinser(content, '<div class="m-msg-1">', '<div')
        var strs6 = getstrinser(tmps6, '<span>', '</span>')
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        var tmpg1 = getstrinser(content, '来源：', '</span>')
        var strg1 = getstrinser(tmpg1, '>', '</');
        if (strg1 == "") return false;
        strtotal += printstr(strg1, 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
}
//ecar168.cn
function getdataecar168(urlname, urltitle, content, rval) {
    if (urlname.indexOf('ecar168.cn') < 0) return false;
    if (urlname.search(/news\.ecar168\.cn\/\w+/) > 0) {
        var strcom = getstrinser(urlname, 'cn', '.htm');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('购车网', 'S2') + printstr('文章', 'S3a');
        strtotal += printstr(getstrinser(content, 'class="lujing">', '</span'), 'S3d');
        var strq1 = getstrinser(content, 'neirong', '<div');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');

        var tmps4 = getstrinser(content, 'biaoti', '</div>')
        var strs4 = getstrinser(tmps4, '<h1', '</h1>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');

        // var tmps6 = getstrinser(content, '<div class="m-msg-1">', '<div')
        var strs6 = getstrinser(content, '时间：', '来源')
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        var strg1 = getstrinser(content, '来源：', '</')
        // var strg1 = getstrinser(tmpg1, '>', '</');
        if (strg1 == "") return false;
        strtotal += printstr(strg1, 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
}
//chinayet.com
function getdatachinayet(urlname, urltitle, content, rval) {
    if (urlname.indexOf('chinayet.com') < 0) return false;
    if (urlname.search(/news\.ecar168\.cn\/\w+/) > 0) {
        var strcom = getstrinser(urlname, 'com', '.htm');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('华中在线', 'S2') + printstr('文章', 'S3a');
        strtotal += printstr(getstrinser(content, 'class="bname">', '</div'), 'S3d');
        var strq1 = getstrinser(content, '<div class="article_content">', '<div');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');

        var tmps4 = getstrinser(content, 'class="article_title"', '</div>')
        var strs4 = getstrinser(tmps4, '<h1', '</h1>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');

        var tmps6 = getstrinser(content, 'class="article_title"', '</div')
        var strs6 = getstrinser(tmps6, '<p>', '来源')
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        var strg1 = getstrinser(content, '来源：', '作者')
        if (strg1 == "") return false;
        strtotal += printstr(strg1, 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
}
//lanzhou.cn
function getdatalanzhou(urlname, urltitle, content, rval) {
    if (urlname.indexOf('lanzhou.cn') < 0) return false;
    if (urlname.search(/(auto|economy|house|lz|wz)\.lanzhou\.cn\/system/) > 0) {
        var strcom = getstrinser(urlname, 'system', '.shtm');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('中国兰州网', 'S2') + printstr('文章', 'S3a');
        strtotal += printstr(getstrinser(content, 'class="duiqi">', '</p'), 'S3d');
        var strq1 = getstrinser(content, 'id="Zoom">', '</td');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');

        var strs4 = getstrinser(tmps4, '<h1', '</h1>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');

        var strs6 = getstrinser(content, '发布时间：','【')
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        var strg1 = getstrinser(content, '稿源：', '编辑')
        if (strg1 == "") return false;
        strtotal += printstr(strg1, 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
}
//360che.com
function getdata360che(urlname, urltitle, content, rval) {
    if (urlname.indexOf('360che.com') < 0) return false;
    if (urlname.search(/360che\.com\/(news|tech|market)/) > 0) {
        var strcom = getstrinser(urlname, 'com/', '.html');
        var strtotal = printstr(strcom, 'S0') + printstr(urlname, 'S1') + printstr('卡车之家', 'S2') + printstr('文章', 'S3a');
        strtotal += printstr(getstrinser(content, 'class="mapdz">', '</div'), 'S3d');
        var strq1 = getstrinser(content, 'class="new-article">', '</div');
        if (strq1 == "") return false;
        strtotal += printstr(strq1, 'Q1');

        var strs4 = getstrinser(tmps4, '<h1', '</h1>');
        if (strs4 == "") return false;
        strtotal += printstr(strs4, 'S4') + printstr(datetostdstr(new Date()), 'S5');

        var tmps6 = getstrinser(content, 'class="article_info">', '</div')
        var strs6 = getstrinser(tmps6, '<span>','</span>')
        if (strs6 == "") return false;
        strs6 = timetrtostdstr(strs6);
        strtotal += printstr(strs6, 'S6') + printstr('PC', 'S7') + "《S9》1《/S9》《ID》1《/ID》";
        var strg1 = getstrinser(content, '来源：', '</span')
        if (strg1 == "") return false;
        strtotal += printstr(strg1, 'G1');
        rval.content += printstr(strtotal, 'Root') + '\r\n';
        return true;
    }
}









function parsecontent(urlname, urltitle, content, rval, timebeg, timeend) {
    if (content.indexOf('window.location.replace') >= 0) return getrelocation(urlname, urltitle, content, rval);
    if (urltitle.charAt(0) != 'z') return false;
    //if (content.search(rval.schreg) == -1) return false;
    if (getdataautohome(urlname, urltitle, content, rval) ||
        getdatasohu(urlname, urltitle, content, rval) ||
        getyidianzixun(urlname, urltitle, content, rval) ||
        getdata16888(urlname, urltitle, content, rval) ||
        getdatabitauto(urlname, urltitle, content, rval) ||
        getdatasina_detail(urlname, urltitle, content, rval) ||
        getdatapcauto(urlname, urltitle, content, rval) ||
        getdataifeng(urlname, urltitle, content, rval) ||
        getdatachexun(urlname, urltitle, content, rval) ||
        getdata163(urlname, urltitle, content, rval) ||
        getdatacheshi(urlname, urltitle, content, rval) ||
        doall(urlname, urltitle, content, rval)) {
        var dtype = getstrinser(urltitle, "", "#");
        if (rval.content.search(rval.schreg) != -1) return addlinks(rval, rval.strs4, timebeg, timeend, dtype);
    }
    else return false;

}

function LIMR_Document(urlname, urltitle, content, limittime) {
	try {
	    var rval = new return_cell();
		if (content.length == 0) {
			rval.error += '正文长度为0,报错重跑!';
			return rval;
		}
		if (urltitle.substr(0, 1) == 'a') {
			if (content.indexOf('data') < 0)rval.error += 'getlinktoutiao() not: data';

		}
    if (urltitle.substr(0, 1) == 'd') {
			if (content.indexOf('"result":') < 0) rval.error += 'getlinkyidian() not: "result":';
			if (content.indexOf('"disable_op":') < 0) rval.error += 'getlinkyidian() not: "disable_op":';
		}
		if (urltitle.substr(0, 2) == 'b1') {
			if (content.indexOf('id="container"') < 0)rval.error += 'getlinkbaidu1() not: id="container"';
		}
		if (urltitle.substr(0, 2) == 'b2') {
			if (content.indexOf('id="wrapper"') < 0)rval.error += 'getlinkbaidu2() not: id="wrapper"';

		}
		if (urltitle.substr(0, 2) == 'c1') {
			if (content.indexOf('<div class="results"') < 0){
				if (content.indexOf("title>搜狗搜索</title>") < 0) rval.error += 'getlinksougou1() not: <div class="results"';
			}
		}
		if (urltitle.substr(0, 2) == 'c2') {
			if (content.indexOf('<div class="results"') < 0)rval.error += 'getlinksougou2() not: <div class="results"';
			if (content.indexOf('class="searchnav"') < 0)rval.error += 'getlinksougou2() not: class="searchnav"';
		}
		var datelimit = new Date();
		datelimit.setMinutes(0);
		datelimit.setSeconds(0);
		datelimit.setMilliseconds(0);
		if (datelimit.getHours() > 12) datelimit.setHours(24);
		else datelimit.setHours(12);
		var timelong = datelimit.getTime() / 1000;
		var strlimittimebeg = (timelong - 86400).toString();
		var strlimittimeend = timelong.toString();
		limittime = timetrtostdstr((timelong - 86400 * 3).toString());

		// var limitdate = strtodate(limittime);
		// limitdate.setDate(limitdate.getDate() - 3);
		// limittime = datetostdstr(limitdate);
		getlinkbaidubegin(urlname, urltitle, content, rval, strlimittimebeg, strlimittimeend);
		getlinktoutiao(urlname, urltitle, content, rval, limittime, strlimittimebeg, strlimittimeend);
		getlinkyidian(urlname, urltitle, content, rval, limittime, strlimittimebeg, strlimittimeend);

		getlinkbaidu1(urlname, urltitle, content, rval, limittime, strlimittimebeg, strlimittimeend);
		getlinkbaidu2(urlname, urltitle, content, rval, limittime, strlimittimebeg, strlimittimeend);
		getlinksougou1(urlname, urltitle, content, rval, limittime, strlimittimebeg, strlimittimeend);
		getlinksougou2(urlname, urltitle, content, rval, limittime, strlimittimebeg, strlimittimeend);

		//rval = getrelocation(urlname, urltitle, content, rval);
		if (!parsecontent(urlname, urltitle, content, rval, strlimittimebeg, strlimittimeend))
		    getdatatoutiao(urlname, urltitle, content, rval, strlimittimebeg, strlimittimeend);

		if (rval.error.length > 0) {
			rval.urllinks = "";
			rval.content = "";
		}
	} catch (e) {
		rval.error = "LIMR_Document ERROR: " + urlname + ", line: " + e.lineNumber + ", " + e.name + ": " + e.message;
		rval.urllinks = "";
		rval.content = "";
	}
	return rval;
}
