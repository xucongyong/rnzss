var puppeteer = require('puppeteer');
var sleep = require('sleep');
var UA = require('./chrome.json');
var request = require("request")
var serverurl = 'http://127.0.0.1:7001/crawler'
//browser

// 引入模块
var COS = require('cos-nodejs-sdk-v5');
var fs = require('fs');
var path = require('path');
// 创建实例

var SecretId = 'AKIDBC0aw3vZx6zcFeyhKiqocB0auynNimfJ'; // 替换为用户的 SecretId
var SecretKey = 'YruhEVWIVVFiwta1C7nDOJyPaU8YicLp';    // 替换为用户的 SecretKey
var Bucket = 'shiyong-1251434521';                        // 替换为用户操作的 Bucket
var Region = 'ap-shanghai';                           // 替换为用户操作的 Region
var cos = new COS({SecretId: SecretId, SecretKey: SecretKey});

async function GetTbCookie(){
    var countDownDate = 1
    while(countDownDate == 1){
        console.log('new loop'+countDownDate)
        var browser = await puppeteer.launch({
            headless: false,//false
            executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
        });
        var page = await browser.newPage();
        var UAtb = UA[getRandomInt(UA.length)]['ua']
        console.log(UAtb)
        page.setUserAgent(UAtb)
        await page.goto('https://auth.alipay.com/login/index.htm');
        //console.log('element and screenshot')
        let element = await page.$('div[id=J-qrcode-img]');
        await element.screenshot({path: 'alipay.png'});
        //console.log('element and screenshot')
        cos.putObject({
            Bucket: Bucket,
            Region: Region,
            Key: 'alipay.png',
            Body: fs.readFileSync(path.resolve(__dirname, 'alipay.png'))
        }, function (err, data) {
            console.log(err || data);
        });
        //if 登录
        var countDownDate = new Date().getTime();
        var cookiestb = await page.cookies();
        console.log(cookiestb.length)
        while(new Date().getTime() - countDownDate < 120000){
            sleep.sleep(1);
            try{
                var pageurl = await page.title()
                //var pageurl = await page.url()
            }catch(e){
                var pageurl = 'catch'
            }
            // console.log(cookiestb.length)
            // console.log(gettbcookiex.length)
            if(pageurl.includes("我的支付宝")){
                console.log('in to cookie')
                var pagehtml = await page.evaluate(() => document.body.innerHTML);
                if(pagehtml.includes('花呗额度明细')){
                    var MainId=1
                }else{
                    var MainId=0
                }
                console.log('page2 newPage')
                var page2 = await browser.newPage();
                await page2.goto('https://custweb.alipay.com/certify/v3/personal/channel/entrance'); //查看账号:你的名下共有4个帐户
                var page2html = await page2.evaluate(() => document.body.innerHTML);
                AlipayCertName = /<span class="cert-name">(.+?)<\/span>/.exec(page2html)[1]
                AlipayCertStatus = /cert-pass">(.+?)<\/span>/.exec(page2html)[1]=='已实名' ? 1 : 0
                AlipayCertType = /<span class="cert-type">证件类型:(.+?)<\/span>/.exec(page2html)[1]
                AlipayCertNo = /<span class="cert-no">证件号码:(.+?)<\/span>/.exec(page2html)[1]
                AlipayAccountCount = /你的名下共有<span class="account-count">(.+?)<\/span>/.exec(page2html)[1]
                console.log('page3 newPage')
                var page3 = await browser.newPage();
                await page3.goto('https://custweb.alipay.com/account/index.htm'); //真实姓名\邮箱\淘宝会员名\注册时间\
                var page3html = await page3.evaluate(() => document.body.innerHTML);
                page3html = page3html.replace(/[ | ]*\n/g, '\n'); //去除行尾空白
                page3html = page3html.replace(/\n[\s| | ]*\r/g, '\n'); //去除多余空行
                page3html = page3html.replace(/ /ig, '');//去掉
                page3html = page3html.replace(/^[\s　]+|[\s　]+$/g, "");//去掉全角半角空格
                page3html = page3html.replace(/[\r\n]/g, "");//去掉回车换行
                page3html = page3html.replace(/&nbsp;/ig, '');
                alipayUsername = /淘宝会员名<\/th><td>(.+?)<\/td/.exec(page3html)[1]
                alipayRegTime = /<th>注册时间<\/th><td>(.+?)<\/td/.exec(page3html)[1]
                alipayEmail = /<th>邮箱<\/th><td><spanclass="text-muted">(.+?)<\/span><\/td/.exec(page3html)[1]
                alipayPhone = /<th>手机<\/th><td><spanclass="text-muted">(.+?)<\/span><\/td/.exec(page3html)[1]
                var cookiestb = await page.cookies();
                // 点击查看我的淘宝
                // const linkHandlers = await page3.$x("//a[contains(text(), '查看我的淘宝')]");
                // if (linkHandlers.length > 0) {
                //       await linkHandlers[0].click();
                //     }
                // console.log('open taobao')
                // //点击查看我的淘宝
                // await page.goto('https://trade.1688.com/order/buyer_order_list.htm'); //查看账号:你的名下共有4个帐户
                // var cookiestb = await page.cookies();
                // var cookiestb2 = await page2.cookies();
                // var cookiestb3 = await page3.cookies();
                //post刷新
                request.post(serverurl, {form:{
                        paltform:'tb',
                        cookies:cookiestb,
                        ua:UAtb,
                        MainId:MainId,
                        AlipayCertName:AlipayCertName,
                        AlipayCertStatus:AlipayCertStatus,
                        AlipayCertType:AlipayCertType,
                        AlipayCertNo:AlipayCertNo,
                        AlipayAccountCount:AlipayAccountCount,
                        alipayUsername:alipayUsername,
                        alipayRegTime:alipayRegTime,
                        alipayEmail:alipayEmail,
                        alipayPhone:alipayPhone,
                        }})
                countDownDate = 1
                browser.close()
            }else if(pageurl.includes("服务器")){
                countDownDate = 1
                browser.close()
            }
        }
        browser.close()
        countDownDate = 1
    }
}

async function GetJbCookie() {
    var countDownDate = 2
    while(countDownDate == 2){
        console.log('jd new loop'+countDownDate)
        var browser = await puppeteer.launch({
            headless: false,//false
            executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
        });
        var page = await browser.newPage();
        var UAtb = UA[getRandomInt(UA.length)]['ua']
        console.log(UAtb)
        page.setUserAgent(UAtb)
        await page.goto('https://passport.jd.com/new/login.aspx');
        //console.log('element and screenshot')
        let element = await page.$('div[class=qrcode-img]');
        await element.screenshot({path: 'jd.png'});
        //console.log('element and screenshot')
        cos.putObject({
            Bucket: Bucket,
            Region: Region,
            Key: 'jd.png',
            Body: fs.readFileSync(path.resolve(__dirname, 'jd.png'))
        }, function (err, data) {
            console.log(err || data);
        });
        //if 登录
        var countDownDate = new Date().getTime();
        var cookiestb = await page.cookies();
        console.log(cookiestb.length)
        while(new Date().getTime() - countDownDate < 120000){
            sleep.sleep(1);
            try{
                var pageurl = await page.title()
                //var pageurl = await page.url()
            }catch(e){
                var pageurl = 'catch'
            }
            // console.log(cookiestb.length)
            // console.log(gettbcookiex.length)
            // 暂未开通白条
            // https://home.jd.com/
            // https://authpay.jd.com/account/home.action
            // https://authpay.jd.com/auth/toAuthPage.action
            // https://safe.jd.com/user/paymentpassword/showLoginHistory.action 用户登录记录
            if(pageurl.includes("京东(JD.COM)")){
                console.log('in to jdcookie')
                await page.goto('https://home.jd.com/')
                var pagehtml = await page.evaluate(() => document.body.innerHTML);
                if(pagehtml.includes('暂未开通白条')){
                    var MainId=0
                }else{
                    var MainId=1
                }
                console.log('page2 newPage')
                var page2 = await browser.newPage();
                await page2.goto('https://i.jd.com/user/info'); //获取用户名
                var page3 = await browser.newPage();
                await page3.goto('https://authpay.jd.com/auth/toAuthSuccessPage.action'); //真实姓名\邮箱\淘宝会员名\注册时间\
                var page4 = await browser.newPage();
                await page4.goto('https://safe.jd.com/user/paymentpassword/safetyCenter.action'); //获取用户名
                var page2html = await page2.evaluate(() => document.body.innerHTML);
                page2html = page2html.replace(/[ | ]*\n/g, '\n'); //去除行尾空白
                page2html = page2html.replace(/\n[\s| | ]*\r/g, '\n'); //去除多余空行
                page2html = page2html.replace(/ /ig, '');//去掉
                page2html = page2html.replace(/^[\s　]+|[\s　]+$/g, "");//去掉全角半角空格
                page2html = page2html.replace(/[\r\n]/g, "");//去掉回车换行
                page2html = page2html.replace(/&nbsp;/ig, '');
                alipayUsername = /用户名：<\/span><divclass="fl"><div><strong>(.+?)<\/strong>/.exec(page2html)[1]
                console.log('page3 newPage')

                var page3html = await page3.evaluate(() => document.body.innerHTML);
                page3html = page3html.replace(/[ | ]*\n/g, '\n'); //去除行尾空白
                page3html = page3html.replace(/\n[\s{0,}| | ]*\r/g, '\n'); //去除多余空行
                page3html = page3html.replace(/ /ig, '');//去掉
                page3html = page3html.replace(/\r|\n|\\s/, '');//去掉
                page3html = page3html.replace(/^[\\s{0,}　]+|[\s{0,}　]+$/g, "");//去掉全角半角空格
                page3html = page3html.replace(/[\r\n]/g, "");//去掉回车换行
                page3html = page3html.replace(/&nbsp;/ig, '');
                page3html = page3html.replace(/\s{0,}/, '');//去掉
                if(page3html.includes('认证时间：')){
                    AlipayCertStatus = 1
                    alipayRegTime = /认证时间：.+?<span>(.+?)<\/span>/.exec(page3html)[1]
                }else{
                    AlipayCertStatus = null
                    alipayRegTime = null
                }

                var page4html = await page4.evaluate(() => document.body.innerHTML);
                page4html = page4html.replace(/[ | ]*\n/g, '\n'); //去除行尾空白
                page4html = page4html.replace(/\n[\s| | ]*\r/g, '\n'); //去除多余空行
                page4html = page4html.replace(/ /ig, '');//去掉
                page4html = page4html.replace(/\r|\n|\\s/, '');//去掉
                page4html = page4html.replace(/^[\s　]+|[\s　]+$/g, "");//去掉全角半角空格
                page4html = page4html.replace(/[\r\n]/g, "");//去掉回车换行
                page4html = page4html.replace(/&nbsp;/ig, '');
                if (page4html.includes('您验证的手机：')){
                    alipayPhone = /您验证的手机：.+?ftx-06">(.+?)<\/strong>/.exec(page4html)[1]
                }else{
                    alipayPhone = 0
                }
                if (page4html.includes('您认证的实名信息')){
                    AlipayCertName = /您认证的实名信息：<\/span>.+?tx-06">(.+?)<\/strong>/.exec(page4html)[1]
                    AlipayCertType = '身份证'
                    AlipayCertNo = /您认证的实名信息：.+?ftx-06">(.+?)<\/strong>/.exec(page4html)[1]
                }else{
                    AlipayCertName = 0
                    AlipayCertType = 0
                    AlipayCertNo = 0
                }
                alipayEmail = 0
                AlipayAccountCount = 0

                var cookiestb = await page.cookies();
                // 点击查看我的淘宝
                // const linkHandlers = await page3.$x("//a[contains(text(), '查看我的淘宝')]");
                // if (linkHandlers.length > 0) {
                //       await linkHandlers[0].click();
                //     }
                // console.log('open taobao')
                // //点击查看我的淘宝
                // await page.goto('https://trade.1688.com/order/buyer_order_list.htm'); //查看账号:你的名下共有4个帐户
                // var cookiestb = await page.cookies();
                // var cookiestb2 = await page2.cookies();
                // var cookiestb3 = await page3.cookies();
                //post刷新
                request.post(serverurl, {form:{
                        paltform:'jd',
                        cookies:cookiestb,
                        ua:UAtb,
                        MainId:MainId,
                        AlipayCertName:AlipayCertName,
                        AlipayCertStatus:AlipayCertStatus,
                        AlipayCertType:AlipayCertType,
                        AlipayCertNo:AlipayCertNo,
                        AlipayAccountCount:AlipayAccountCount,
                        alipayUsername:alipayUsername,
                        alipayRegTime:alipayRegTime,
                        alipayEmail:alipayEmail,
                        alipayPhone:alipayPhone,
                        }})
                countDownDate = 2
                browser.close()
            }else if(pageurl.includes("服务器")){
                countDownDate = 2
                browser.close()
            }
        }
        browser.close()
        countDownDate = 2
    }
}

async function GetTbInfo() {
    var browser = await puppeteer.launch({
        headless: false,
        executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
    });
    var page = await browser.newPage();
    page.setUserAgent(UA[getRandomInt(UA.length)])
}

async function GetJbInfo() {
    var browser = await puppeteer.launch({
        headless: false,
        executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
    });
    var page = await browser.newPage();
    //page.setUserAgent(UA[getRandomInt(UA.length)])
    await page.goto('https://auth.alipay.com/login/index.htm');
    var cookiestb = await page.cookies();
    //if 登录
    await page.goto('https://custweb.alipay.com/account/index.htm'); //真实姓名\邮箱\淘宝会员名	\注册时间\
    await page.goto('https://custweb.alipay.com/certify/v3/personal/channel/entrance'); //查看账号:你的名下共有4个帐户
    //post刷新
}





async function Browser() {
    var browser = await puppeteer.launch({
        headless: false,
        executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
    });
    //inbox
    //user-agent 自动切换
    //two code 3分钟过期
    //登录时记录cookies的ip，利用cookie流量页面，淘宝不做记录（因流量过大）
    //可用cookie搜索所有用户的订单数据并采集
    //一个浏览器采集cookie和一个浏览器用cookie读取数据
    //https://my.alipay.com/portal/i.htm 用户首页
    //https://custweb.alipay.com/account/index.htm 真实姓名\邮箱\淘宝会员名	\注册时间\
    //https://custweb.alipay.com/certify/v3/personal/channel/entrance 查看账号:你的名下共有4个帐户
    //浏览器A、用cookie做任务
    //浏览器B如果读到cookie，淘宝账号名与支付宝，保存，换adsl
    //滚动useragent
    //数据库：1. 二维码地址 2. 读取次数if=1,name账户属于用户A，else： 3. 让用户输入淘宝账号。完成

    var page = await browser.newPage();
    var page1 = await browser.newPage();
    var page2 = await browser.newPage();
    var page3 = await browser.newPage();
    var page4 = await browser.newPage();
    page.setUserAgent(UA[getRandomInt(UA.length)])

    console.log('goto')
    page.goto('https://login.taobao.com');
    //await page.goto('https://auth.alipay.com/login/index.htm');
    page1.goto('https://passport.jd.com/uc/login');
    page2.goto('https://www.jd.com/n');
    page3.goto('https://www.youtube.com');
    page4.goto('https://www.google.com');

    console.log('goto')
    let html = await page.evaluate(() => document.body.innerHTML);
    var cookies = await page.cookies();
    console.log(cookies)
    var cookies1 = await page.cookies();
    console.log(cookies1)
    await browser.close()
    var browser = await puppeteer.launch({
        headless: false,
        executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
    });
    var page = await browser.newPage();
    for (n=0; n>cookies1.length; n++){
        console.log(n)
    }
    await page.setCookie(
        cookies1[0],
        cookies1[1],
        cookies1[2],
        cookies1[3],
        cookies1[4],
        cookies1[5],
        cookies1[6],
        cookies1[7],
        cookies1[8],
        cookies1[9],
        cookies1[10],
        cookies1[11],
        cookies1[12],
        cookies1[13],
        cookies1[14],
        cookies1[15],
        cookies1[16],
        cookies1[17],
        cookies1[18],
        cookies1[19],
        cookies1[20],
        cookies1[21],
        cookies1[22],
        cookies1[23],
        cookies1[24],
        cookies1[25],
        cookies1[26],
        cookies1[27],
        cookies1[28],
        cookies1[29]
    )
    await page.goto('https://buyertrade.taobao.com/trade/itemlist/list_bought_items.htm'); //用户首页
    await page.goto('https://my.alipay.com/portal/i.htm'); //用户首页
    await page.goto('https://custweb.alipay.com/account/index.htm'); //真实姓名\邮箱\淘宝会员名	\注册时间\
    await page.goto('https://custweb.alipay.com/certify/v3/personal/channel/entrance'); //查看账号:你的名下共有4个帐户

    var cookies3 = await page.cookies();

    let html1 = await page1.evaluate(() => document.body.innerHTML);

    await page.goto('https://www.baidu.com');
    await page1.goto('https://passport.jd.com/uc/login');
    //await browser.close()
};
//browser

//radomInt 获取随机整数
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}


//GetTbCookie()
GetJbCookie()

//打开浏览器
//1. 淘宝
//2. JD
//3. 任务cookie、
//3.1获取订单用输入数字点击翻页。
//3.2是否利用账号批量追评？
//3.3设定一个值，如果值=1，那么点翻页






