/**
 * Created by s_ on 15/11/29.
 */
var edit;       //当前选择的文本编辑区域对象
var RangeType;  //对象类别
function start() //开始初始化编辑器-编辑区域是Iframe
{
    var myTextArea = document.getElementById('myTextArea');
    Editor.document.designMode = "ON";
    Editor.document.open();
    Editor.document.write(myTextArea.value);
    Editor.document.close();
    fnInit()
}
function setFocus() {
    Editor.focus();  //编辑器或去焦点
}
function selectRange() {
    edit = Editor.document.selection.createRange();  //编辑器的文本选择区域
    RangeType = Editor.document.selection.type;
}
//包装文本选定区域的执行命令
function execCommand(command, para) {
    setFocus();
    selectRange();
    if (para == "")   //没有参数的情况
        edit.execCommand(command)
    else
        edit.execCommand(command, false, arguments[1]);
    Editor.focus();
    if (RangeType != "Control") edit.select();
}
//获取或设置文本的格式-字体、字号
function doSelectC(str, el) {


    var Index = el.selectedIndex;
    if (Index != 0) {
        el.selectedIndex = 0;
        execCommand(str, el.options[Index].text);
    }
}
//获取或设置当前选定块的格式化标签
function doSelectCl(str, el) {
    var Index = el.selectedIndex;
    if (Index != 0) {
        el.selectedIndex = 0;
        execCommand(str, "<" + el.options[Index].value + ">");
    }
}
//初始化
function fnInit() {
    for (i = 0; i < document.all.length; i++)
        document.all(i).unselectable = "off";  //指定不选中任何元素
    getSystemFonts();
}
//获取系统字体的方法
function getSystemFonts() {
//    var a = dlgHelper.fonts.count;
//    var fArray = new Array();
//    var oOption = document.createElement("OPTION");
//    oOption.text = "字体";
//    oOption.value = "0";
//    selectFontName.add(oOption);
////使用DOM方法createElement将字体依次添加到复选列表中
//    for (i = 1; i < dlgHelper.fonts.count; i++) {
//        fArray[i] = dlgHelper.fonts(i);
//        var oOption = document.createElement("OPTION");
//        oOption.text = fArray[i];
//        oOption.Value = i;
//        selectFontName.add(oOption);
//    }
}
//格式化，保全script、textarea、xmp、pre和style内容
function formatfor(va) {
    var t = va.replace(/\r/g, '');
    t = t.replace(/(<(script|textarea|xmp|pre|style).*?>)([^\r]*?)(<\/\2>)/img,
        function () {
            return arguments[1] + arguments[3].replace(/\n/g, "\r") + arguments[4]
        });
    t = t.replace(/\n/g, "");
    return t
}
var SE = function(){};
SE.getSelection = function(obj){
    obj = obj?obj:window;

    var selectTxt;
    if(obj.getSelection){
        //标准浏览器支持的方法
        selectTxt=obj.getSelection();
    }else if(obj.document.selection){
        //IE浏览器支持的方法
        selectTxt=obj.document.selection.createRange().text;
    }
    return selectTxt;
};
function fontsize(el){
    //改变字体的方法
    var Index = el.selectedIndex
    var addpre = "<font size=" + el.options[Index].value + ">"
    if (Index > 7)addpre = "<font style='font-size:" + el.options[Index].value + "pt'>"
    //Editor.getSelection().getRangeAt(0).toString();
    var Selection = SE.getSelection(Editor);

    //var oSel = Selection.createRange();
    //var sBookmark = oSel.getBookmark();
    //var oSelhtml = oSel.htmlText;
    if (oSelhtml != "") {
//定位选中内容
        var conts = oSelhtml;
        var textLength = Editor.document.body.innerText.length;
        oSel.moveStart("character", -1 * textLength);
        var contp = formatfor(oSel.htmlText);
        var conta = formatfor(Editor.document.body.innerHTML);
        var contpa = '';
        var partC = "";
        var partB = "";
        var partA = "";
        var m = 0;
        m = conta.indexOf(contp.substr(0, 3));
        var f = contp.length;
        for (; f > 0; f--) {
            if (conta.substr(m, f) == contp.substr(0, f)) {
                contpa = contp.substr(0, f);
                partC = conta.substr(m + f);
                break;
            }
        }
        var ko = contp.substr(f);
        var kol = ko.length
        var ty = conta.substr(m + f, kol)
        var hu = ""
        for (var b = 1; b < kol; b++)if (ko.substr(b) == ty.substr(0, kol - b)) {
            hu = ko.substr(b);
            contpa += hu;
            partC = partC.substr(kol - b);
            break
        }
        var k = contpa.length
        cont = conts.replace(/\n/g, "")
        var u = cont.length
        if (cont == contpa.substr(k - u)) {
            partB = cont;
            partA = contpa.substr(0, k - u)
        } else {
            for (u = cont.length; u > 0; u--) {
                if (cont.lastIndexOf(contpa.substr(k - u)) != -1) {
                    partB0 = contpa.substr(k - u);
                    partA0 = contpa.substr(0, k - u);
                    break
                }
            }
            contt = formatfor(conts)
            if (hu != "")if (contt.substr(contt.length - kol) == ko)contt = contt.substr(0, contt.length - kol) + hu
            u = contt.length
            var youm = contpa.lastIndexOf(contt)
            if (youm != -1) {
                partB = contt;
                partA = contpa.substr(0, youm);
                partC = contpa.substr(youm + u) + partC
            } else {
                for (; u > 0; u--) {
                    if (contt.lastIndexOf(contpa.substr(k - u)) != -1) {
                        partB1 = contpa.substr(k - u);
                        partA1 = contpa.substr(0, k - u);
                        break
                    }
                }
                if (partB1.length > partB0.length) {
                    partB = partB1;
                    partA = partA1
                } else {
                    partB = partB0;
                    partA = partA0
                }
            }
        }
        if (partB.substr(partB.length - 1) == "<") {
            partB = partB.substr(0, partB.length - 1);
            partC = "<" + partC
        }
        if (partB.substr(partB.length - 2) == "</") {
            partB = partB.substr(0, partB.length - 2);
            partC = "</" + partC
        }
        //保护textarea、xmp、script和style的内容不被改变
        var cook = [];
        partA = partA.replace(/(<(script|textarea|xmp|style).*?>)[\s\S]*?<\/\2>/ig,
            function () {
                co = cook.length
                cook[co] = arguments[0];
                return "<cook" + co + ">"
            });
        var ook = "";
        partA = partA.replace(/(<(script|textarea|xmp|style).*?>)[\s\S]*?/i, function () {
            co = cook.lengthook = arguments[2]
            cook[co] = arguments[0];
            return "<cook" + co + ">";
        })
        if (ook != "")fd = "([sS]∗?<\/" + ook + ">)";
        jk = newRegExp(fd, ["i"]);
        if (jk.test(partB))jk.exec(partB);
        co = cook.lengthcook[co] = RegExp.$1partB = partB.replace(jk, "<cook" + co + ">");
        partB = partB.replace(/(<(script|textarea|xmp|style).∗?>)[\s§]∗?<\/\2>/ig, function () {
            co = cook.lengthcook[co] = arguments[0];
            return "<cook" + co + ">"
        });
        ook = "";
        partB = partB.replace(/(<(script|textarea|xmp|style).∗?>)[\s§]∗?/i,
            function () {
                co = cook.length
                ook = arguments[2]
                cook[co] = arguments[0];
                return "<cook" + co + ">"
            });
        if (ook != "") {
            fd = "(^[\\s\\S]*?<\/" + ook + ">)"
            jk = new RegExp(fd, ["i"])
            if (jk.test(partC)) {
                jk.exec(partC);
                co = cook.length;
                cook[co] = RegExp.$1;
                partC = partC.replace(jk, "<cook" + co + ">");
            }
        }
        partC = partC.replace(/(<(script|textarea|xmp|style).*?>)[\s\S]*?<\/\2>/ig,
            function () {
                co = cook.length;
                cook[co] = arguments[0];
                return "<cook" + co + ">";
            });

//处理字体
        var dol = [];
        var dos = [];
        var lon = [];
        fd = "<FONT([^>]*?)>";
        jk = new RegExp(fd, ["im"]);
        while (jk.test(partB)) {
            ce = dol.length;
            jk.exec(partB);
            dol[ce] = RegExp;
//                    .1
            partB = partB.replace(jk, "<site" + ce + ">");
        }
        ce = dol.length - 1;
        for (; ce > -1; ce--) {
            kjc = "<site" + ce + ">";
            fd = kjc + '(.*?)<\/font>';
            jk = new RegExp(fd, ["im"]);
            if (jk.test(partB)) {
                dos[dos.length] = ce;
                jk.exec(partB);
                ko3 = kjc + RegExp;
                .1 + "</site" + ce + ">";
                partB = partB.replace(jk, ko3)
            } else {
                lon[lon.length] = ce
            }
        }
        partB = partB.replace(/<\/font>/img, "<lonf>")
        for (var c = dos.length - 1; c > -1; c--) {
            uts = dol[dos[c]]
            if ("" == (uts.replace(/size=[0-7+]+/i, "").replace(/style=("|')FONT-SIZE: [0-9.]+.*;*("|')/im, "").replace(/[\s\n\r]+/mg, ""))) {
                partB = partB.replace("<site" + dos[c] + ">", "")
                partB = partB.replace("</site" + dos[c] + ">", "")
            } else {
                partB = partB.replace("<site" + dos[c] + ">", "<font" + uts.replace(/ size=[0-7+]+/im, "").replace(/FONT-SIZE: [0-9.]+pt/im, "").replace(/ style=("|');*("|')/im, "") + ">")
                partB = partB.replace("</site" + dos[c] + ">", "</font>")
            }
        }
//处理其他标签
        var addend = ""
        var mio = []
        partB = partB.replace(/<([^<> ]*?) [^<>]*?style=[^<>]*?FONT-SIZE: [0-9.]+[^<>]*?>/img,
            function () {
                notv = "|select|input|option|object|"
                if (notv.indexOf("|" + arguments[1].toLowerCase() + "|") == -1) {
                    op = mio.length
                    mio[op] = arguments[0]
                    return "<opis" + op + ">"
                } else {
                    return arguments[0]
                }
            })
        kba = ["h1", "h2", "h3", "h4", "h5", "h6", "pre", "button", "listing", "big", "small", "tt", "code", "kbd", "samp", "td", "\/td", "caption", "\/caption", "th", "\/th", "tr", "\/tr", "table", "\/table", "thead", "\/thead", "tbody", "\/tbody", "tfoot", "\/tfoot"]
        for (b in kba) {
            fd = "<(" + kba[b] + ")[^<>]*?>"
            jk = new RegExp(fd, ["img"])
            partB = partB.replace(jk,
                function () {
                    op = mio.length
                    mio[op] = arguments[0]
                    return "<opis" + op + ">"
                })
        }
//收尾工作
        liming = []
        partB = partB.replace(/<(opis|site|lonf)([0-9]*)>/g,
            function () {
                var op = liming.length
                if (arguments[1] == "opis") {
                    liming[op] = mio[parseInt(arguments[2])]
                }
                if (arguments[1] == "site") {
                    liming[op] = "<font" + dol[parseInt(arguments[2])] + ">"
                }
                if (arguments[1] == "lonf") {
                    liming[op] = "</font>"
                }
                return "<duan" + op + ">"
            })
        if (liming.length > 0) {
            partB = partB.replace(/^(.+?)(<duan0>)/m, function () {
                if ("" != arguments[1]) {
                    return addpre + arguments[1] + "</font>" + arguments[2]
                }
                else {
                    return arguments[0]
                }
            })
            var op = liming.length - 1
            for (var kc = 0; kc < op; kc++) {
                fd = "(<duan" + kc + ">)(.+?)(<duan" + (kc + 1) + ">)"
                jk = new RegExp(fd, ["m"])
                partB = partB.replace(jk,
                    function () {
                        if ("" != arguments[2]) {
                            return arguments[1] + addpre + arguments[2] + "</font>" + arguments[3]
                        }
                        else {
                            return arguments[0]
                        }
                    })
            }
            fd = "(<duan" + op + ">)(.+?)$"
            jk = new RegExp(fd, ["m"])
            partB = partB.replace(jk, function () {
                if ("" != arguments[2]) {
                    return arguments[1] + addpre + arguments[2] + "</font>"
                }
                else {
                    return arguments[0]
                }
            })
        }
        else {
            partB = addpre + partB + "</font>"
        }
        partB = partB.replace(/<duan([0-9]+)>/g, function () {
            return liming[parseInt(arguments[1])]
        })
        var endtemp = partA + partB + partC
        for (vof in cook)endtemp = endtemp.replace("<cook" + vof + ">", cook[vof])
        Editor.document.body.innerHTML = endtemp
        var vrvd = Editor.document.selection.createRange()
        vrvd.moveToBookmark(sBookmark)
        vrvd.select()
    }
    else {
        Editor.document.selection.createRange().pasteHTML(addpre + "</font>")
    }
    Editor.focus()
    el.blur()
    el.selectedIndex = 0
}