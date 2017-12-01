/* ----------------------------------------------------------------------------------

START OF eHealth CUSTOM CODE v3.0.2

------------------------------------------------------------------------------------*/
/* This file belongs to v3.1.0 of MPage Custom Components package */

Date.prototype.setCustISO8601=function(b){var c="([0-9]{4})(-([0-9]{2})(-([0-9]{2})(T([0-9]{2}):([0-9]{2})(:([0-9]{2})(.([0-9]+))?)?(Z|(([-+])([0-9]{2}):([0-9]{2})))?)?)?)?";var f=b.match(new RegExp(c));var e=0;var a=new Date(f[1],0,1);if(f[3]){a.setMonth(f[3]-1)}if(f[5]){a.setDate(f[5])}if(f[7]){a.setHours(f[7])}if(f[8]){a.setMinutes(f[8])}if(f[10]){a.setSeconds(f[10])}if(f[12]){a.setMilliseconds(Number("0."+f[12])*1000)}if(f[14]){e=(Number(f[16])*60)+Number(f[17]);e*=((f[15]=="-")?1:-1)}e-=a.getTimezoneOffset();time=(Number(a)+(e*60*1000));this.setTime(Number(time));return this};Date.prototype.formatString=function(s){var b="%dd/%MM/%yy %HH:%mm",a="%dd/%MM/%yy",m="%dd/%MM/%yyyy %HH:%mm",t="%dd/%MM/%yyyy";var w=s;switch(w){case"shortdatetime":w=b;break;case"shortdate":w=a;break;case"longdatetime":w=m;break;case"longdate":w=t;break;default:break}var q=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];var c=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];var u=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];var p=["January","February","March","April","May","June","July","August","September","October","November","December"];var f=((this.getMonth()+1)<10)?"0"+(this.getMonth()+1):""+(this.getMonth()+1);var o=(this.getDate()<10)?"0"+this.getDate():""+this.getDate();var j=(this.getYear()+"").slice(2);var n=(this.getHours()>=1&&this.getHours()<=12)?this.getHours():(this.getHours()%12);n=(n==0)?12:n;var r=(n<10)?"0"+n:""+n;var d=(this.getHours()<10)?"0"+this.getHours():""+this.getHours();var g=(this.getMinutes()<10)?"0"+this.getMinutes():""+this.getMinutes();var e=(this.getSeconds()<10)?"0"+this.getSeconds():""+this.getSeconds();var h=(this.getHours()>=12)?"pm":"am";var v=w.replace(/%MM/,f).replace(/%M/,(this.getMonth()+1)).replace(/%dd/,o).replace(/%d/,this.getDate()).replace(/%yyyy/,this.getFullYear()).replace(/%yy/,j).replace(/%HH/,d).replace(/%H/,this.getHours()).replace(/%hh/,r).replace(/%h/,n).replace(/%mm/,g).replace(/%m/,this.getMinutes()).replace(/%ss/,e).replace(/%s/,this.getSeconds()).replace(/%p/,h).replace(/%P/,h.toUpperCase()).replace(/%b/,u[this.getMonth()]).replace(/%B/,p[this.getMonth()]).replace(/%F/,c[this.getDay()]).replace(/%f/,q[this.getDay()]);return(isNaN(this.getTime()))?"Invalid Date":v};(function(a){a.extend({TTIPHELPERARR:[],InitHelperArr:function(){a.TTIPHELPERARR=[]},tId:null,TooltipObject:function(){this.index=0;this.title="";this.body="";this.url="";this.scrolling="";this.toggle=false;this.track=true;this.maxWidth="auto";this.delay=200;this.fade=false;this.tOpacity=1;this.blocked=false;this.showURL=false;this.extraClass="";this.callback=null;this.callbackCnt=0;this.top=15;this.left=15;this.id="tooltip";this.domObject=null;this.ttipObject=null;this.setIndex=function(b){this.index=b;return this};this.setURL=function(b){this.url=b;return this};this.setBody=function(b){this.body=b;return this};this.setDomObject=function(b){this.domObject=b;return this};this.setTtipObject=function(b){this.ttipObject=b;return this};this.setBlocked=function(b){this.blocked=b;return this};this.hide=function(c){var d=this.ttipObject;if(a.tId){clearTimeout(a.tId);a.tId=null}function b(){d.hideTooltip()}if(this.fade){if(d.is(":animated")){d.stop().fadeTo(this.fade,0,b)}else{d.fadeOut(this.fade,b)}}else{b()}return this};this.display=function(d){var f=this,e=this.ttipObject,c=this.domObject;if(c.tooltipBlocked()){return f}e.attr("class",["ttip",f.extraClass].join(" ")).children("h3,.body,.url").hide().each(function(){var g=a(this);if(g.is("h3")&&f.title!=""){g.show().html(f.title)}if(g.is(".body")&&f.body!=""){g.show().html(f.body)}if(g.is(".url")&&f.showURL&&f.url!=""){g.show().html(f.url)}});if(!this.toggle){a(document).click(a.HideTooltips)}else{a(document).unbind("click")}e.css({position:"absolute",top:"10px",left:"-2000px",zIndex:10000});if(a.tId){clearTimeout(a.tId);a.tId=null}function b(){e.showTooltip();if(f.tOpacity==1&&a.browser.msie){e.get(0).style.removeAttribute("filter")}function g(){e.children("h3,.body,.url").hide().each(function(){var j=a(this);if(j.is("h3")&&f.title!=""){j.show().html(f.title)}if(j.is(".body")&&f.body!=""){j.show().html(f.body)}if(j.is(".url")&&f.showURL&&f.url!=""){j.show().html(f.url)}});var h=a("[handletoggle='true']",e).attr("arrIdx",f.index).css({cursor:"pointer"}).click(function(j){a.TTIPHELPERARR[parseInt(a(this).attr("arrIdx"),10)].hide(j)});if(h.length>0){e.unbind("click");a(document).unbind("click")}e.trigger("bodyChange").checkBoundries(f.left,f.top)}if(f.callbackCnt===null||f.callbackCnt>0){f.callback(f,g);if(f.callbackCnt!==null){f.callbackCnt--}}else{g()}}if(f.fade){if(e.is(":animated")){e.stop().fadeTo(f.fade,f.tOpacity,b)}else{e.fadeTo(f.fade,f.tOpacity,b)}}else{if(f.delay&&!a.tId){a.tId=setTimeout(b,f.delay)}else{if(!f.delay){b()}}}return f.update(d)};this.update=function(d){var e=this.ttipObject,c=this.domObject;if(c.is("option")){return}e.removeClass("viewport-right").removeClass("viewport-bottom");var h=e.offset(),g=h.left,f=h.top;if(d){g=d.pageX+this.left;f=d.pageY+this.top;var b="auto";if(this.positionLeft){b=a(window).width()-g;g="auto"}e.css({left:g,right:b,top:f})}e.trigger("bodyChange").checkBoundries(this.left,this.top);return this};this.toggleFunc=function(c){var d=this.ttipObject,b=this.domObject;if(d.is(":hidden")){this.display(c)}else{this.hide(c)}return this}},HideTooltips:function(c){for(var b=a.TTIPHELPERARR.length;b--;){a.TTIPHELPERARR[b].hide(c)}},GetTooltipObject:function(b){return a.TTIPHELPERARR[parseInt(a(b).attr("arrIdx"),10)]},SetTooltipProperty:function(b,d,c){a.GetTooltipObject(b)[d]=c},GetTooltipProperty:function(b,c){return a.GetTooltipObject(b)[c]}});a.fn.extend({viewport:function(){var b=[];a(this).each(function(){var c=this,d=a(this);b.push({l:d.position().left,t:d.position().top,x:a(window).scrollLeft(),y:a(window).scrollTop(),cx:a(window).width(),cy:a(window).height(),width:c.offsetWidth,left:c.offsetLeft,height:c.offsetHeight,top:c.offsetTop})});return b},checkBoundries:function(b,c){a(this).each(function(){var d=this,f=a(this),e=f.viewport()[0];if(e.x+e.cx<e.left+e.width&&e.width<=e.cx){e.l-=e.width+(b*2);f.css({left:e.l+"px"}).addClass("viewport-right")}if(e.y+e.cy<e.top+e.height&&e.height<=e.cy){e.t-=e.height+(c*2);f.css({top:e.t+"px"}).addClass("viewport-bottom")}})},hideTooltip:function(){return a(this).hide()},showTooltip:function(){return a(this).show()},blockTooltip:function(){a.SetTooltipProperty(this,"blocked",true);return a(this)},unblockTooltip:function(){a.SetTooltipProperty(this,"blocked",false);return a(this)},setTooltipBody:function(b){return a(this).filter("[arrIdx]").each(function(){a.SetTooltipProperty(this,"body",b)})},setTooltipTitle:function(b){return a(this).filter("[arrIdx]").each(function(){a.SetTooltipProperty(this,"title",b)})},tooltipBlocked:function(){var b=a.GetTooltipObject(this);b.domObject.each(function(){var c=a(this);if(b.blocked){c.attr("title",b.body)}else{c.removeAttr("title")}});return b.blocked},tooltip:function(d){var b=a.browser.msie&&parseInt(a.browser.version,10)<=7;function e(){if(b){var h=a(this).css({width:"auto"}),g=0,f=a("table,img,hr,input,button,select,textarea,fieldset,legend,iframe,embed,object,applet",h).each(function(){g=Math.max(g,parseInt(a(this).attr("offsetWidth"),10))});if(g>0){h.css({width:[g,"px"].join("")})}}}function c(f){var g=(f.attr("href")||f.attr("src"));if(g&&g!=""){return g.replace("http://","").replace("https://","")}else{return g}}return a(this).filter("[title!='']").each(function(){var p=this,n=a(p),g=a.extend({},new a.TooltipObject(),d);if(!a.isFunction(g.callback)){g.callbackCnt=0;g.callback=null}if(g.tOpacity>1){g.tOpacity=1}else{if(g.tOpacity<0){g.tOpacity=0}}var f=a(["#",g.id].join("")),o=(f.length===0);if(o){f=a(['<div class="ttip" id="',g.id,'"><h3></h3><div class="body"></div><div class="url"></div></div>'].join("")).insertBefore("body > *:first").bind("bodyChange",e).hideTooltip();if(a.fn.bgiframe){f.bgiframe()}}var j=a.TTIPHELPERARR.length,m=g.body!=""?g.body:n.attr("title"),h=g.url!=""?g.url:c(n);if(n.not("[arrIdx]")||parseInt(n.attr("arrIdx"),10)>j){a.TTIPHELPERARR.push(g.setIndex(j).setBody(m).setURL(h).setDomObject(n).setTtipObject(f));n.attr("arrIdx",j)}else{var q=parseInt(n.attr("arrIdx"),10);a.TTIPHELPERARR[q]=g.setIndex(q).setBody(m).setURL(h).setDomObject(n).setTtipObject(f)}n.unbind("click").unbind("mouseover").unbind("mouseout").unbind("mousemove").removeAttr("title").removeAttr("alt");if(g.toggle){n.click(function(r){a.GetTooltipObject(this).toggleFunc(r)})}else{n.mouseover(function(r){a.GetTooltipObject(this).display(r)}).mouseout(function(r){a.GetTooltipObject(this).hide(r)}).click(function(r){a.GetTooltipObject(this).hide(r)});if(g.track){n.mousemove(function(r){a.GetTooltipObject(this).update(r)})}}})}})})(jQuery);(function(a){a.extend({CernerSubSecDefault:{title:"Header",subTitle:"",content:"",isExpand:true,className:""}});a.fn.extend({initSubSecToggle:function(){var c=a(this),b=a(".sub-sec-hd-tgl",c);b.click(function(){var d=a(this).parent().parent();if(d.hasClass("closed")){d.removeClass("closed")}else{d.addClass("closed")}})},cernerSubHeader:function(b){return a(this).append(["<div class='sub-title-disp' style='margin:-6px -6px 6px -6px;border-left:none;border-right:none;'>",b,"</div>"].join(""))},cernerSubSection:function(){var f=arguments.length,e=[];for(var d=0;d<f;d++){var c=(typeof(arguments[d])=="object")?a.extend({},a.CernerSubSecDefault,arguments[d]):a.CernerSubSecDefault;var b=(c.className&&c.className!="")?c.className+" ":"";e.push("<div class='",b,"sub-sec",(!c.isExpand?" closed":""),"'>","<div class='sub-sec-hd'>","<span class='sub-sec-hd-tgl'></span>","<span class='sub-sec-title'>","<span class='comp-header-name'>",c.title," </span>","<span class='sub-sec-total'>",c.subTitle,"</span>","</span>","</div>","<div class='sub-sec-content'><div class='content-body'>",c.content,"</div></div>","</div>")}return a(this).append(e.join("")).initSubSecToggle()}})})(jQuery);(function(d){if(d.fn.inputmask===undefined){function o(q){var s=document.createElement("input"),q="on"+q,r=(q in s);if(!r){s.setAttribute(q,"return;");r=typeof s[q]=="function"}s=null;return r}function f(r,s,t){var q=t.aliases[r];if(q){if(q.alias){f(q.alias,undefined,t)}d.extend(true,t,q);d.extend(true,t,s);return true}return false}function b(u,v){var q=[];function t(M){var G=/(?:[?*+]|\{[0-9\+\*]+(?:,[0-9\+\*]*)?\})\??|[^.?*+^${[]()|\\]+|./g,D=false;function z(U,S,T,R){this.matches=[];this.isGroup=U||false;this.isOptional=S||false;this.isQuantifier=T||false;this.isAlternator=R||false;this.quantifier={min:1,max:1}}function w(Z,U,W){var S=u.definitions[U];var T=Z.matches.length==0;W=W!=undefined?W:Z.matches.length;if(S&&!D){var Y=S.prevalidator,ab=Y?Y.length:0;for(var V=1;V<S.cardinality;V++){var aa=ab>=V?Y[V-1]:[],R=aa.validator,X=aa.cardinality;Z.matches.splice(W++,0,{fn:R?typeof R=="string"?new RegExp(R):new function(){this.test=R}:new RegExp("."),cardinality:X?X:1,optionality:Z.isOptional,newBlockMarker:T,casing:S.casing,def:S.definitionSymbol||U,placeholder:S.placeholder,mask:U})}Z.matches.splice(W++,0,{fn:S.validator?typeof S.validator=="string"?new RegExp(S.validator):new function(){this.test=S.validator}:new RegExp("."),cardinality:S.cardinality,optionality:Z.isOptional,newBlockMarker:T,casing:S.casing,def:S.definitionSymbol||U,placeholder:S.placeholder,mask:U})}else{Z.matches.splice(W++,0,{fn:null,cardinality:0,optionality:Z.isOptional,newBlockMarker:T,casing:null,def:U,placeholder:undefined,mask:U});D=false}}var y=new z(),E,I,Q=[],B=[],C;while(E=G.exec(M)){I=E[0];switch(I.charAt(0)){case u.optionalmarker.end:case u.groupmarker.end:C=Q.pop();if(Q.length>0){Q[Q.length-1]["matches"].push(C)}else{y.matches.push(C)}break;case u.optionalmarker.start:Q.push(new z(false,true));break;case u.groupmarker.start:Q.push(new z(true));break;case u.quantifiermarker.start:var H=new z(false,false,true);I=I.replace(/[{}]/g,"");var J=I.split(","),L=isNaN(J[0])?J[0]:parseInt(J[0]),K=J.length==1?L:(isNaN(J[1])?J[1]:parseInt(J[1]));if(K=="*"||K=="+"){L=K=="*"?0:1}H.quantifier={min:L,max:K};if(Q.length>0){var x=Q[Q.length-1]["matches"];E=x.pop();if(!E.isGroup){var A=new z(true);A.matches.push(E);E=A}x.push(E);x.push(H)}else{E=y.matches.pop();if(!E.isGroup){var A=new z(true);A.matches.push(E);E=A}y.matches.push(E);y.matches.push(H)}break;case u.escapeChar:D=true;break;case u.alternatormarker:var P=new z(false,false,false,true);if(Q.length>0){var x=Q[Q.length-1]["matches"];E=x.pop();P.matches.push(E);Q.push(P)}else{E=y.matches.pop();P.matches.push(E);Q.push(P)}break;default:if(Q.length>0){w(Q[Q.length-1],I);var N=Q[Q.length-1];if(N.isAlternator){C=Q.pop();for(var F=0;F<C.matches.length;F++){C.matches[F].isGroup=false}if(Q.length>0){Q[Q.length-1]["matches"].push(C)}else{y.matches.push(C)}}}else{if(y.matches.length>0){var O=y.matches[y.matches.length-1];if(O.isGroup){O.isGroup=false;w(O,u.groupmarker.start,0);w(O,u.groupmarker.end)}}w(y,I)}}}if(Q.length>0){var N=Q[Q.length-1];if(N.isAlternator){for(var F=0;F<N.matches.length;F++){N.matches[F].isGroup=false}}y.matches=y.matches.concat(Q)}if(y.matches.length>0){var O=y.matches[y.matches.length-1];if(O.isGroup){O.isGroup=false;w(O,u.groupmarker.start,0);w(O,u.groupmarker.end)}B.push(y)}return B}function s(w,y){if(u.numericInput&&u.multi!==true){w=w.split("").reverse();for(var x=0;x<w.length;x++){if(w[x]==u.optionalmarker.start){w[x]=u.optionalmarker.end}else{if(w[x]==u.optionalmarker.end){w[x]=u.optionalmarker.start}else{if(w[x]==u.groupmarker.start){w[x]=u.groupmarker.end}else{if(w[x]==u.groupmarker.end){w[x]=u.groupmarker.start}}}}}w=w.join("")}if(w==undefined||w==""){return undefined}else{if(u.repeat>0||u.repeat=="*"||u.repeat=="+"){var z=u.repeat=="*"?0:(u.repeat=="+"?1:u.repeat);w=u.groupmarker.start+w+u.groupmarker.end+u.quantifiermarker.start+z+","+u.repeat+u.quantifiermarker.end}if(d.inputmask.masksCache[w]==undefined){d.inputmask.masksCache[w]={mask:w,maskToken:t(w),validPositions:{},_buffer:undefined,buffer:undefined,tests:{},metadata:y}}return d.extend(true,{},d.inputmask.masksCache[w])}}if(d.isFunction(u.mask)){u.mask=u.mask.call(this,u)}if(d.isArray(u.mask)){if(v){d.each(u.mask,function(w,x){if(x.mask!=undefined){q.push(s(x.mask.toString(),x))}else{q.push(s(x.toString()))}})}else{var r="("+u.mask.join(")|(")+")";q=s(r)}}else{if(u.mask.length==1&&u.greedy==false&&u.repeat!=0){u.placeholder=""}if(u.mask.mask!=undefined){q=s(u.mask.mask.toString(),u.mask)}else{q=s(u.mask.toString())}}return q}var j=typeof ScriptEngineMajorVersion==="function"?ScriptEngineMajorVersion():new Function("/*@cc_on return @_jscript_version; @*/")()>=10,a=navigator.userAgent,n=a.match(new RegExp("iphone","i"))!==null,c=a.match(new RegExp("android.*safari.*","i"))!==null,h=a.match(new RegExp("android.*chrome.*","i"))!==null,p=a.match(new RegExp("android.*firefox.*","i"))!==null,m=/Kindle/i.test(a)||/Silk/i.test(a)||/KFTT/i.test(a)||/KFOT/i.test(a)||/KFJWA/i.test(a)||/KFJWI/i.test(a)||/KFSOWI/i.test(a)||/KFTHWA/i.test(a)||/KFTHWI/i.test(a)||/KFAPWA/i.test(a)||/KFAPWI/i.test(a),g=o("paste")?"paste":o("input")?"input":"propertychange";function e(y,F,Q){var ai=false,V,ag,ac=false,x=false,H=false,z;function ap(aG,aF,az){aF=aF||0;var aA=[],aB,aE=0,aD,aC;do{if(aG===true&&L()["validPositions"][aE]){var ay=L()["validPositions"][aE];aD=ay.match;aB=ay.locator.slice();aA.push(aD.fn==null?aD.def:(az===true?ay.input:aD.placeholder||Q.placeholder.charAt(aE%Q.placeholder.length)))}else{if(aF>aE){var ax=D(aE,aB,aE-1);aC=ax[0]}else{aC=E(aE,aB,aE-1)}aD=aC.match;aB=aC.locator.slice();aA.push(aD.fn==null?aD.def:aD.placeholder||Q.placeholder.charAt(aE%Q.placeholder.length))}aE++}while((z==undefined||aE-1<z)&&aD.fn!=null||(aD.fn==null&&aD.def!="")||aF>=aE);aA.pop();return aA}function L(){return F}function N(ax){var ay=L();ay.buffer=undefined;ay.tests={};if(ax!==true){ay._buffer=undefined;ay.validPositions={};ay.p=-1}}function u(ay){var aE=L(),aB=-1,az=aE.validPositions;if(ay==undefined){ay=-1}var aC=aB,aD=aB;for(var ax in az){var aA=parseInt(ax);if(ay==-1||az[aA]["match"].fn!=null){if(aA<ay){aC=aA}if(aA>=ay){aD=aA}}}aB=(ay-aC)>1||aD<ay?aC:aD;return aB}function B(aC,aD,aA){if(Q.insertMode&&L()["validPositions"][aC]!=undefined&&aA==undefined){var aE=d.extend(true,{},L()["validPositions"]),aB=u(),az;for(az=aC;az<=aB;az++){delete L()["validPositions"][az]}L()["validPositions"][aC]=aD;var ax=true;for(az=aC;az<=aB;az++){var aF=aE[az];if(aF!=undefined){var ay=aF.match.fn==null?az+1:s(az);if(al(ay,aF.match.def)){ax=ax&&w(ay,aF.input,true,true)!==false}else{ax=false}}if(!ax){break}}if(!ax){L()["validPositions"]=d.extend(true,{},aE);return false}}else{L()["validPositions"][aC]=aD}return true}function U(aD,ax){var aA,ay=aD,aC;for(aA=aD;aA<ax;aA++){delete L()["validPositions"][aA]}for(aA=ax;aA<=u();){var az=L()["validPositions"][aA];var aB=L()["validPositions"][ay];if(az!=undefined&&aB==undefined){if(al(ay,az.match.def)&&w(ay,az.input,true)!==false){delete L()["validPositions"][aA];aA++}ay++}else{aA++}}aC=u();while(aC>0&&(L()["validPositions"][aC]==undefined||L()["validPositions"][aC].match.fn==null)){delete L()["validPositions"][aC];aC--}N(true)}function E(aC,aB,aA){var ay=D(aC,aB,aA),az;for(var ax=0;ax<ay.length;ax++){az=ay[ax];if(Q.greedy||(az.match&&(az.match.optionality===false||az.match.newBlockMarker===false)&&az.match.optionalQuantifier!==true)){break}}return az}function ab(ax){if(L()["validPositions"][ax]){return L()["validPositions"][ax]["match"]}return D(ax)[0]["match"]}function al(aB,aA){var az=false,ax=D(aB);for(var ay=0;ay<ax.length;ay++){if(ax[ay]["match"]&&ax[ay]["match"].def==aA){az=true;break}}return az}function D(aG,aA,az){var ax=L()["maskToken"],aD=aA?az:0,aJ=aA||[0],aC=[],aI=false;function aH(aP,aM,aO,aK){function aQ(a0,a8,a7){if(aD==aG&&a0.matches==undefined){aC.push({match:a0,locator:a8.reverse()});return true}else{if(a0.matches!=undefined){if(a0.isGroup&&a7!==true){a0=aQ(aP.matches[aN+1],a8);if(a0){return true}}else{if(a0.isOptional){var a1=a0;a0=aH(a0,aM,a8,a7);if(a0){var aR=aC[aC.length-1]["match"];var a4=d.inArray(aR,a1.matches)==0;if(a4){aI=true}aD=aG}}else{if(a0.isAlternator){var aT=a0;var aU=aC.slice(),a6,a5,aW=a8.length;var aX=aM.length>0?aM.shift():-1;if(aX==-1){var a9=aD;aC=[];a0=aH(aT.matches[0],aM.slice(),[0].concat(a8),a7);a6=aC.slice();aD=a9;aC=[];a0=aH(aT.matches[1],aM,[1].concat(a8),a7);a5=aC.slice();aC=[];for(var a3=0;a3<a6.length;a3++){var aZ=a6[a3];aU.push(aZ);for(var a2=0;a2<a5.length;a2++){var aS=a5[a2];if(aZ.match.mask==aS.match.mask){a5.splice(a2,1);aZ.locator[aW]=-1;break}}}aC=aU.concat(a5)}else{a0=aQ(aT.matches[aX],[aX].concat(a8),a7)}if(a0){return true}}else{if(a0.isQuantifier&&a7!==true){var ba=a0;Q.greedy=Q.greedy&&isFinite(ba.quantifier.max);for(var aV=(aM.length>0&&a7!==true)?aM.shift():0;(aV<(isNaN(ba.quantifier.max)?aV+1:ba.quantifier.max))&&aD<=aG;aV++){var aY=aP.matches[d.inArray(ba,aP.matches)-1];a0=aQ(aY,[aV].concat(a8),true);if(a0){var aR=aC[aC.length-1]["match"];aR.optionalQuantifier=aV>ba.quantifier.min-1;var a4=d.inArray(aR,aY.matches)==0;if(a4){if(aV>ba.quantifier.min-1){aI=true;aD=aG;break}else{return true}}else{return true}}}}else{a0=aH(a0,aM,a8,a7);if(a0){return true}}}}}}else{aD++}}}for(var aN=(aM.length>0?aM.shift():0);aN<aP.matches.length;aN++){if(aP.matches[aN]["isQuantifier"]!==true){var aL=aQ(aP.matches[aN],[aN].concat(aO),aK);if(aL&&aD==aG){return aL}else{if(aD>aG){break}}}}}if(aA==undefined){var aF=aG-1,aE;while((aE=L()["validPositions"][aF])==undefined&&aF>-1){aF--}if(aE!=undefined&&aF>-1){aD=aF;aJ=aE.locator.slice()}else{aF=aG-1;while((aE=L()["tests"][aF])==undefined&&aF>-1){aF--}if(aE!=undefined&&aF>-1){aD=aF;aJ=aE[0]["locator"].slice()}}}for(var ay=aJ.shift();ay<ax.length;ay++){var aB=aH(ax[ay],aJ,[ay]);if((aB&&aD==aG)||aD>aG){break}}if(aC.length==0||aI){aC.push({match:{fn:null,cardinality:0,optionality:true,casing:null,def:""},locator:[]})}L()["tests"][aG]=aC;return aC}function aw(){if(L()["_buffer"]==undefined){L()["_buffer"]=ap(false,1)}return L()["_buffer"]}function r(){if(L()["buffer"]==undefined){L()["buffer"]=ap(true,u(),true)}return L()["buffer"]}function W(aA,ay){var ax=r().slice();if(aA===true){N();aA=0;ay=ax.length}else{for(var az=aA;az<ay;az++){delete L()["validPositions"][az];delete L()["tests"][az]}}for(var az=aA;az<ay;az++){if(ax[az]!=Q.skipOptionalPartCharacter){w(az,ax[az],true,true)}}}function T(ax,ay){switch(ay.casing){case"upper":ax=ax.toUpperCase();break;case"lower":ax=ax.toLowerCase();break}return ax}function w(aF,aD,aH,aC){aH=aH===true;function aA(aK,aN,aM,aJ){var aL=false;d.each(D(aK),function(aX,aQ){var aW=aQ.match;var aR=aN?1:0,aP="",aT=r();for(var aU=aW.cardinality;aU>aR;aU--){aP+=P(aK-(aU-1))}if(aN){aP+=aN}aL=aW.fn!=null?aW.fn.test(aP,L(),aK,aM,Q):(aN==aW.def||aN==Q.skipOptionalPartCharacter)&&aW.def!=""?{c:aW.def,pos:aK}:false;if(aL!==false){var aS=aL.c!=undefined?aL.c:aN;aS=(aS==Q.skipOptionalPartCharacter&&aW.fn===null)?aW.def:aS;var aO=aK;if(aL.remove!=undefined){U(aL.remove,aL.remove+1)}if(aL.refreshFromBuffer){var aV=aL.refreshFromBuffer;aM=true;W(aV===true?aV:aV.start,aV.end);if(aL.pos==undefined&&aL.c==undefined){aL.pos=u();return false}aO=aL.pos!=undefined?aL.pos:aK;if(aO!=aK){aL=d.extend(aL,w(aO,aS,true));return false}}else{if(aL!==true&&aL.pos!=undefined&&aL.pos!=aK){aO=aL.pos;W(aK,aO);if(aO!=aK){aL=d.extend(aL,w(aO,aS,true));return false}}}if(aL!=true&&aL.pos==undefined&&aL.c==undefined){return false}if(aX>0){N(true)}if(!B(aO,d.extend({},aQ,{input:T(aS,aW)}),aJ)){aL=false}return false}});return aL}var aB=r();for(var aE=aF-1;aE>-1;aE--){if(L()["validPositions"][aE]&&L()["validPositions"][aE].fn==null){break}else{if((!M(aE)||aB[aE]!=av(aE))&&D(aE).length>1){aA(aE,aB[aE],true);break}}}var aG=aF;if(aG>=ad()){return false}var aI=aA(aG,aD,aH,aC);if(!aH&&aI===false){var ax=L()["validPositions"][aG];if(ax&&ax.match.fn==null&&(ax.match.def==aD||aD==Q.skipOptionalPartCharacter)){aI={caret:s(aG)}}else{if((Q.insertMode||L()["validPositions"][s(aG)]==undefined)&&!M(aG)){for(var az=aG+1,ay=s(aG);az<=ay;az++){aI=aA(az,aD,aH,aC);if(aI!==false){aG=az;break}}}}}if(aI===true){aI={pos:aG}}return aI}function M(ay){var ax=ab(ay);return ax.fn!=null?ax.fn:false}function ad(){var aB;z=ag.prop("maxLength");if(z==-1){z=undefined}if(Q.greedy==false){var aA,az=u(),ax=L()["validPositions"][az],ay=ax!=undefined?ax.locator.slice():undefined;for(aA=az+1;ax==undefined||(ax.match["fn"]!=null||(ax.match["fn"]==null&&ax.match["def"]!=""));aA++){ax=E(aA,ay,aA-1);ay=ax.locator.slice()}aB=aA}else{aB=r().length}return(z==undefined||aB<z)?aB:z}function s(az){var ay=ad();if(az>=ay){return ay}var ax=az;while(++ax<ay&&!M(ax)&&(Q.nojumps!==true||Q.nojumpsThreshold>ax)){}return ax}function an(ay){var ax=ay;if(ax<=0){return 0}while(--ax>0&&!M(ax)){}return ax}function P(ax){return L()["validPositions"][ax]==undefined?av(ax):L()["validPositions"][ax]["input"]}function Y(ay,ax,az){ay._valueSet(ax.join(""));if(az!=undefined){I(ay,az)}}function av(ay,ax){ax=ax||ab(ay);return ax.placeholder||(ax.fn==null?ax.def:Q.placeholder.charAt(ay%Q.placeholder.length))}function A(aA,aC,az,aD,aB){var ax=aD!=undefined?aD.slice():Z(aA._valueGet()).split("");N();if(aC){aA._valueSet("")}d.each(ax,function(aF,aE){if(aB===true){var aG=L()["p"],aI=aG==-1?aG:an(aG),aH=aI==-1?aF:s(aI);if(d.inArray(aE,aw().slice(aI+1,aH))==-1){K.call(aA,undefined,true,aE.charCodeAt(0),false,az,aF)}}else{K.call(aA,undefined,true,aE.charCodeAt(0),false,az,aF);az=az||(aF>0&&aF>L()["p"])}});if(aC){var ay=Q.onKeyPress.call(this,undefined,r(),0,Q);ar(aA,ay);Y(aA,r(),d(aA).is(":focus")?s(u(0)):undefined)}}function v(ax){return d.inputmask.escapeRegex.call(this,ax)}function Z(ax){return ax.replace(new RegExp("("+v(aw().join(""))+")*$"),"")}function q(aC){if(aC.data("_inputmask")&&!aC.hasClass("hasDatepicker")){var az=[],aB=L()["validPositions"];for(var aA in aB){if(aB[aA]["match"]&&aB[aA]["match"].fn!=null){az.push(aB[aA]["input"])}}var ax=(ai?az.reverse():az).join("");var ay=(ai?r().reverse():r()).join("");if(d.isFunction(Q.onUnMask)){ax=Q.onUnMask.call(aC,ay,ax,Q)}return ax}else{return aC[0]._valueGet()}}function ak(ay){if(ai&&typeof ay=="number"&&(!Q.greedy||Q.placeholder!="")){var ax=r().length;ay=ax-ay}return ay}function I(az,aA,ax){var aC=az.jquery&&az.length>0?az[0]:az,ay;if(typeof aA=="number"){aA=ak(aA);ax=ak(ax);ax=(typeof ax=="number")?ax:aA;var aB=d(aC).data("_inputmask")||{};aB.caret={begin:aA,end:ax};d(aC).data("_inputmask",aB);if(!d(aC).is(":visible")){return}aC.scrollLeft=aC.scrollWidth;if(Q.insertMode==false&&aA==ax){ax++}if(aC.setSelectionRange){aC.selectionStart=aA;aC.selectionEnd=ax}else{if(aC.createTextRange){ay=aC.createTextRange();ay.collapse(true);ay.moveEnd("character",ax);ay.moveStart("character",aA);ay.select()}}}else{var aB=d(aC).data("_inputmask");if(!d(aC).is(":visible")&&aB&&aB.caret!=undefined){aA=aB.caret["begin"];ax=aB.caret["end"]}else{if(aC.setSelectionRange){aA=aC.selectionStart;ax=aC.selectionEnd}else{if(document.selection&&document.selection.createRange){ay=document.selection.createRange();aA=0-ay.duplicate().moveStart("character",-100000);ax=aA+ay.text.length}}}aA=ak(aA);ax=ak(ax);return{begin:aA,end:ax}}}function C(az){var ay=r(),aE=ay.length,aD,aC=u(),ax={},aB=L()["validPositions"][aC]!=undefined?L()["validPositions"][aC]["locator"].slice():undefined,aA;for(aD=aC+1;aD<ay.length;aD++){aA=E(aD,aB,aD-1);aB=aA.locator.slice();ax[aD]=d.extend(true,{},aA)}for(aD=aE-1;aD>aC;aD--){aA=ax[aD]["match"];if((aA.optionality||aA.optionalQuantifier)&&ay[aD]==av(aD,aA)){aE--}else{break}}return az?{l:aE,def:ax[aE]?ax[aE]["match"]:undefined}:aE}function ao(ay){var ax=r(),aA=ax.slice();var az=C();aA.length=az;Y(ay,aA)}function X(az){if(d.isFunction(Q.isComplete)){return Q.isComplete.call(ag,az,Q)}if(Q.repeat=="*"){return undefined}var ay=false,aA=C(true),aC=an(aA.l),aD=u();if(aD==aC){if(aA.def==undefined||aA.def.newBlockMarker||aA.def.optionalQuantifier){ay=true;for(var aB=0;aB<=aC;aB++){var ax=M(aB);if((ax&&(az[aB]==undefined||az[aB]==av(aB)))||(!ax&&az[aB]!=av(aB))){ay=false;break}}}}return ay}function J(ay,ax){return ai?(ay-ax)>1||((ay-ax)==1&&Q.insertMode):(ax-ay)>1||((ax-ay)==1&&Q.insertMode)}function G(ay){var ax=d._data(ay).events;d.each(ax,function(az,aA){d.each(aA,function(aB,aC){if(aC.namespace=="inputmask"){if(aC.type!="setvalue"){var aD=aC.handler;aC.handler=function(aE){if(this.readOnly||this.disabled){aE.preventDefault}else{return aD.apply(this,arguments)}}}}})})}function ah(aB){function ay(aE){if(d.valHooks[aE]==undefined||d.valHooks[aE].inputmaskpatch!=true){var aD=d.valHooks[aE]&&d.valHooks[aE].get?d.valHooks[aE].get:function(aF){return aF.value};var aC=d.valHooks[aE]&&d.valHooks[aE].set?d.valHooks[aE].set:function(aF,aG){aF.value=aG;return aF};d.valHooks[aE]={get:function(aI){var aG=d(aI);if(aG.data("_inputmask")){if(aG.data("_inputmask")["opts"].autoUnmask){return aG.inputmask("unmaskedvalue")}else{var aF=aD(aI),aJ=aG.data("_inputmask"),aK=aJ.maskset,aH=aK._buffer;aH=aH?aH.join(""):"";return aF!=aH?aF:""}}else{return aD(aI)}},set:function(aH,aJ){var aG=d(aH),aI=aG.data("_inputmask"),aF;if(aI){aF=aC(aH,d.isFunction(aI.opts.onBeforeMask)?aI.opts.onBeforeMask.call(aq,aJ,aI.opts):aJ);aG.triggerHandler("setvalue.inputmask")}else{aF=aC(aH,aJ)}return aF},inputmaskpatch:true}}}var az;if(Object.getOwnPropertyDescriptor){az=Object.getOwnPropertyDescriptor(aB,"value")}if(az&&az.get){if(!aB._valueGet){var aA=az.get;var ax=az.set;aB._valueGet=function(){return ai?aA.call(this).split("").reverse().join(""):aA.call(this)};aB._valueSet=function(aC){ax.call(this,ai?aC.split("").reverse().join(""):aC)};Object.defineProperty(aB,"value",{get:function(){var aD=d(this),aC=d(this).data("_inputmask");if(aC){return aC.opts.autoUnmask?aD.inputmask("unmaskedvalue"):(aA.call(this)!=aw().join("")?aA.call(this):"")}else{return aA.call(this)}},set:function(aD){var aC=d(this).data("_inputmask");if(aC){ax.call(this,d.isFunction(aC.opts.onBeforeMask)?aC.opts.onBeforeMask.call(aq,aD,aC.opts):aD);d(this).triggerHandler("setvalue.inputmask")}else{ax.call(this,aD)}}})}}else{if(document.__lookupGetter__&&aB.__lookupGetter__("value")){if(!aB._valueGet){var aA=aB.__lookupGetter__("value");var ax=aB.__lookupSetter__("value");aB._valueGet=function(){return ai?aA.call(this).split("").reverse().join(""):aA.call(this)};aB._valueSet=function(aC){ax.call(this,ai?aC.split("").reverse().join(""):aC)};aB.__defineGetter__("value",function(){var aD=d(this),aC=d(this).data("_inputmask");if(aC){return aC.opts.autoUnmask?aD.inputmask("unmaskedvalue"):(aA.call(this)!=aw().join("")?aA.call(this):"")}else{return aA.call(this)}});aB.__defineSetter__("value",function(aD){var aC=d(this).data("_inputmask");if(aC){ax.call(this,d.isFunction(aC.opts.onBeforeMask)?aC.opts.onBeforeMask.call(aq,aD,aC.opts):aD);d(this).triggerHandler("setvalue.inputmask")}else{ax.call(this,aD)}})}}else{if(!aB._valueGet){aB._valueGet=function(){return ai?this.value.split("").reverse().join(""):this.value};aB._valueSet=function(aC){this.value=ai?aC.split("").reverse().join(""):aC}}ay(aB.type)}}}function R(az,ay,aB){if(Q.numericInput||ai){if(ay==Q.keyCode.BACKSPACE){ay=Q.keyCode.DELETE}else{if(ay==Q.keyCode.DELETE){ay=Q.keyCode.BACKSPACE}}if(ai){var aA=aB.end;aB.end=aB.begin;aB.begin=aA}}if(ay==Q.keyCode.BACKSPACE&&aB.end-aB.begin<=1){aB.begin=an(aB.begin)}else{if(ay==Q.keyCode.DELETE&&aB.begin==aB.end){aB.end++}}U(aB.begin,aB.end);var ax=u(aB.begin);if(ax<aB.begin){L()["p"]=s(ax)}else{L()["p"]=aB.begin}}function ar(ax,aA,ay){if(aA&&aA.refreshFromBuffer){var az=aA.refreshFromBuffer;W(az===true?az:az.start,az.end);N(true);if(ay!=undefined){Y(ax,r());I(ax,aA.caret||ay.begin,aA.caret||ay.end)}}}function au(aB){ac=false;var az=this,aD=d(az),ay=aB.keyCode,aC=I(az);if(ay==Q.keyCode.BACKSPACE||ay==Q.keyCode.DELETE||(n&&ay==127)||aB.ctrlKey&&ay==88){aB.preventDefault();if(ay==88){V=r().join("")}R(az,ay,aC);Y(az,r(),L()["p"]);if(az._valueGet()==aw().join("")){aD.trigger("cleared")}if(Q.showTooltip){aD.prop("title",L()["mask"])}}else{if(ay==Q.keyCode.END||ay==Q.keyCode.PAGE_DOWN){setTimeout(function(){var aE=s(u());if(!Q.insertMode&&aE==ad()&&!aB.shiftKey){aE--}I(az,aB.shiftKey?aC.begin:aE,aE)},0)}else{if((ay==Q.keyCode.HOME&&!aB.shiftKey)||ay==Q.keyCode.PAGE_UP){I(az,0,aB.shiftKey?aC.begin:0)}else{if(ay==Q.keyCode.ESCAPE||(ay==90&&aB.ctrlKey)){A(az,true,false,V.split(""));aD.click()}else{if(ay==Q.keyCode.INSERT&&!(aB.shiftKey||aB.ctrlKey)){Q.insertMode=!Q.insertMode;I(az,!Q.insertMode&&aC.begin==ad()?aC.begin-1:aC.begin)}else{if(Q.insertMode==false&&!aB.shiftKey){if(ay==Q.keyCode.RIGHT){setTimeout(function(){var aE=I(az);I(az,aE.begin)},0)}else{if(ay==Q.keyCode.LEFT){setTimeout(function(){var aE=I(az);I(az,ai?aE.begin+1:aE.begin-1)},0)}}}}}}}}var ax=I(az);var aA=Q.onKeyDown.call(this,aB,r(),ax.begin,Q);ar(az,aA,ax);H=d.inArray(ay,Q.ignorables)!=-1}function K(aM,aB,aK,ax,aS,aF){if(aK==undefined&&ac){return false}ac=true;var aG=this,ay=d(aG);aM=aM||window.event;var aK=aB?aK:(aM.which||aM.charCode||aM.keyCode);if(aB!==true&&(!(aM.ctrlKey&&aM.altKey)&&(aM.ctrlKey||aM.metaKey||H))){return true}else{if(aK){if(aB!==true&&aK==46&&aM.shiftKey==false&&Q.radixPoint==","){aK=44}var aE,aC,aP=String.fromCharCode(aK);if(aB){var aD=aS?aF:u()+1;aE={begin:aD,end:aD}}else{aE=I(aG)}var az=J(aE.begin,aE.end);if(az){L()["undoPositions"]=d.extend(true,{},L()["validPositions"]);R(aG,Q.keyCode.DELETE,aE);if(!Q.insertMode){Q.insertMode=!Q.insertMode;B(aE.begin,aS);Q.insertMode=!Q.insertMode}az=!Q.multi}L()["writeOutBuffer"]=true;var aI=ai&&!az?aE.end:aE.begin;var aA=w(aI,aP,aS);if(aA!==false){if(aA!==true){aI=aA.pos!=undefined?aA.pos:aI;aP=aA.c!=undefined?aA.c:aP}N(true);if(aA.caret!=undefined){aC=aA.caret}else{var aR=L()["validPositions"];if(aR[aI+1]!=undefined&&D(aI+1,aR[aI].locator.slice(),aI).length>1){aC=aI+1}else{aC=s(aI)}}L()["p"]=aC}if(ax!==false){var aH=this;setTimeout(function(){Q.onKeyValidation.call(aH,aA,Q)},0);if(L()["writeOutBuffer"]&&aA!==false){var aJ=r();Y(aG,aJ,aB?undefined:Q.numericInput?an(aC):aC);if(aB!==true){setTimeout(function(){if(X(aJ)===true){ay.trigger("complete")}x=true;ay.trigger("input")},0)}}else{if(az){L()["buffer"]=undefined;L()["validPositions"]=L()["undoPositions"]}}}else{if(az){L()["buffer"]=undefined;L()["validPositions"]=L()["undoPositions"]}}if(Q.showTooltip){ay.prop("title",L()["mask"])}if(aM&&aB!=true){aM.preventDefault?aM.preventDefault():aM.returnValue=false;var aO=I(aG);var aQ=Q.onKeyPress.call(this,aM,r(),aO.begin,Q);ar(aG,aQ,aO)}var aN;for(var aL in L().validPositions){aN+=" "+aL}}}}function S(aB){var aD=d(this),aA=this,az=aB.keyCode,ay=r();var ax=I(aA);var aC=Q.onKeyUp.call(this,aB,ay,ax.begin,Q);ar(aA,aC,ax);if(az==Q.keyCode.TAB&&Q.showMaskOnFocus){if(aD.hasClass("focus-inputmask")&&aA._valueGet().length==0){N();ay=r();Y(aA,ay);I(aA,0);V=r().join("")}else{Y(aA,ay);I(aA,ak(0),ak(ad()))}}}function af(aA){if(x===true&&aA.type=="input"){x=false;return true}var ay=this,aB=d(ay),ax=ay._valueGet();if(aA.type=="propertychange"&&ay._valueGet().length<=ad()){return true}else{if(aA.type=="paste"){if(window.clipboardData&&window.clipboardData.getData){ax=window.clipboardData.getData("Text")}else{if(aA.originalEvent&&aA.originalEvent.clipboardData&&aA.originalEvent.clipboardData.getData){ax=aA.originalEvent.clipboardData.getData("text/plain")}}}}var az=d.isFunction(Q.onBeforePaste)?Q.onBeforePaste.call(ay,ax,Q):ax;A(ay,true,false,az.split(""),true);aB.click();if(X(r())===true){aB.trigger("complete")}return false}function ae(aA){if(x===true&&aA.type=="input"){x=false;return true}var ax=this;var ay=I(ax),az=ax._valueGet();az=az.replace(new RegExp("("+v(aw().join(""))+")*"),"");if(ay.begin>az.length){I(ax,az.length);ay=I(ax)}if((r().length-az.length)==1&&az.charAt(ay.begin)!=r()[ay.begin]&&az.charAt(ay.begin+1)!=r()[ay.begin]&&!M(ay.begin)){aA.keyCode=Q.keyCode.BACKSPACE;au.call(ax,aA)}aA.preventDefault()}function am(ay){ag=d(ay);if(ag.is(":input")&&ag.attr("type")!="number"){ag.data("_inputmask",{maskset:F,opts:Q,isRTL:false});if(Q.showTooltip){ag.prop("title",L()["mask"])}ah(ay);if(ay.dir=="rtl"||Q.rightAlign){ag.css("text-align","right")}if(ay.dir=="rtl"||Q.numericInput){ay.dir="ltr";ag.removeAttr("dir");var aA=ag.data("_inputmask");aA.isRTL=true;ag.data("_inputmask",aA);ai=true}ag.unbind(".inputmask");ag.removeClass("focus-inputmask");ag.closest("form").bind("submit",function(){if(V!=r().join("")){ag.change()}if(Q.autoUnmask&&Q.removeMaskOnSubmit){ag.inputmask("remove")}}).bind("reset",function(){setTimeout(function(){ag.trigger("setvalue")},0)});ag.bind("mouseenter.inputmask",function(){var aD=d(this),aC=this;if(!aD.hasClass("focus-inputmask")&&Q.showMaskOnHover){if(aC._valueGet()!=r().join("")){Y(aC,r())}}}).bind("blur.inputmask",function(){var aF=d(this),aD=this;if(aF.data("_inputmask")){var aE=aD._valueGet(),aC=r();aF.removeClass("focus-inputmask");if(V!=r().join("")){aF.change()}if(Q.clearMaskOnLostFocus&&aE!=""){if(aE==aw().join("")){aD._valueSet("")}else{ao(aD)}}if(X(aC)===false){aF.trigger("incomplete");if(Q.clearIncomplete){N();if(Q.clearMaskOnLostFocus){aD._valueSet("")}else{aC=aw().slice();Y(aD,aC)}}}}}).bind("focus.inputmask",function(){var aE=d(this),aC=this,aD=aC._valueGet();if(Q.showMaskOnFocus&&!aE.hasClass("focus-inputmask")&&(!Q.showMaskOnHover||(Q.showMaskOnHover&&aD==""))){if(aC._valueGet()!=r().join("")){Y(aC,r(),s(u()))}}aE.addClass("focus-inputmask");V=r().join("")}).bind("mouseleave.inputmask",function(){var aD=d(this),aC=this;if(Q.clearMaskOnLostFocus){if(!aD.hasClass("focus-inputmask")&&aC._valueGet()!=aD.attr("placeholder")){if(aC._valueGet()==aw().join("")||aC._valueGet()==""){aC._valueSet("")}else{ao(aC)}}}}).bind("click.inputmask",function(){var aC=this;if(d(aC).is(":focus")){setTimeout(function(){var aF=I(aC);if(aF.begin==aF.end){var aE=ai?ak(aF.begin):aF.begin,aG=u(aE),aD=s(aG);if(aE<aD){if(M(aE)){I(aC,aE)}else{I(aC,s(aE))}}else{I(aC,aD)}}},0)}}).bind("dblclick.inputmask",function(){var aC=this;setTimeout(function(){I(aC,0,s(u()))},0)}).bind(g+".inputmask dragdrop.inputmask drop.inputmask",af).bind("setvalue.inputmask",function(){var aC=this;A(aC,true);V=r().join("")}).bind("complete.inputmask",Q.oncomplete).bind("incomplete.inputmask",Q.onincomplete).bind("cleared.inputmask",Q.oncleared);ag.bind("keydown.inputmask",au).bind("keypress.inputmask",K).bind("keyup.inputmask",S);if(c||p||h||m){if(g=="input"){ag.unbind(g+".inputmask")}ag.bind("input.inputmask",ae)}if(j){ag.bind("input.inputmask",af)}var ax=d.isFunction(Q.onBeforeMask)?Q.onBeforeMask.call(ay,ay._valueGet(),Q):ay._valueGet();A(ay,true,false,ax.split(""),true);V=r().join("");var az;try{az=document.activeElement}catch(aB){}if(X(r())===false){if(Q.clearIncomplete){N()}}if(Q.clearMaskOnLostFocus){if(r().join("")==aw().join("")){ay._valueSet("")}else{ao(ay)}}else{Y(ay,r())}if(az===ay){ag.addClass("focus-inputmask");I(ay,s(u()))}G(ay)}}if(y!=undefined){switch(y.action){case"isComplete":ag=d(y.el);F=ag.data("_inputmask")["maskset"];Q=ag.data("_inputmask")["opts"];return X(y.buffer);case"unmaskedvalue":ag=y["$input"];F=ag.data("_inputmask")["maskset"];Q=ag.data("_inputmask")["opts"];ai=y["$input"].data("_inputmask")["isRTL"];return q(y["$input"]);case"mask":V=r().join("");am(y.el);break;case"format":ag=d({});ag.data("_inputmask",{maskset:F,opts:Q,isRTL:Q.numericInput});if(Q.numericInput){ai=true}var t=y.value.split("");A(ag,false,false,ai?t.reverse():t,true);return ai?r().reverse().join(""):r().join("");case"isValid":ag=d({});ag.data("_inputmask",{maskset:F,opts:Q,isRTL:Q.numericInput});if(Q.numericInput){ai=true}var t=y.value.split("");A(ag,false,true,ai?t.reverse():t);var O=r();var aa=C();O.length=aa;return X(O)&&y.value==O.join("");case"getemptymask":ag=d(y.el);F=ag.data("_inputmask")["maskset"];Q=ag.data("_inputmask")["opts"];return aw();case"remove":var aq=y.el;ag=d(aq);F=ag.data("_inputmask")["maskset"];Q=ag.data("_inputmask")["opts"];aq._valueSet(q(ag));ag.unbind(".inputmask");ag.removeClass("focus-inputmask");ag.removeData("_inputmask");var aj;if(Object.getOwnPropertyDescriptor){aj=Object.getOwnPropertyDescriptor(aq,"value")}if(aj&&aj.get){if(aq._valueGet){Object.defineProperty(aq,"value",{get:aq._valueGet,set:aq._valueSet})}}else{if(document.__lookupGetter__&&aq.__lookupGetter__("value")){if(aq._valueGet){aq.__defineGetter__("value",aq._valueGet);aq.__defineSetter__("value",aq._valueSet)}}}try{delete aq._valueGet;delete aq._valueSet}catch(at){aq._valueGet=undefined;aq._valueSet=undefined}break}}}d.inputmask={defaults:{placeholder:"_",optionalmarker:{start:"[",end:"]"},quantifiermarker:{start:"{",end:"}"},groupmarker:{start:"(",end:")"},alternatormarker:"|",escapeChar:"\\",mask:null,oncomplete:d.noop,onincomplete:d.noop,oncleared:d.noop,repeat:0,greedy:true,autoUnmask:false,removeMaskOnSubmit:true,clearMaskOnLostFocus:true,insertMode:true,clearIncomplete:false,aliases:{},alias:null,onKeyUp:d.noop,onKeyPress:d.noop,onKeyDown:d.noop,onBeforeMask:undefined,onBeforePaste:undefined,onUnMask:undefined,showMaskOnFocus:true,showMaskOnHover:true,onKeyValidation:d.noop,skipOptionalPartCharacter:" ",showTooltip:false,numericInput:false,rightAlign:false,radixPoint:"",nojumps:false,nojumpsThreshold:0,definitions:{"9":{validator:"[0-9]",cardinality:1,definitionSymbol:"*"},a:{validator:"[A-Za-z\u0410-\u044F\u0401\u0451]",cardinality:1,definitionSymbol:"*"},"*":{validator:"[A-Za-z\u0410-\u044F\u0401\u04510-9]",cardinality:1}},keyCode:{ALT:18,BACKSPACE:8,CAPS_LOCK:20,COMMA:188,COMMAND:91,COMMAND_LEFT:91,COMMAND_RIGHT:93,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,MENU:93,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38,WINDOWS:91},ignorables:[8,9,13,19,27,33,34,35,36,37,38,39,40,45,46,93,112,113,114,115,116,117,118,119,120,121,122,123],isComplete:undefined},masksCache:{},escapeRegex:function(r){var q=["/",".","*","+","?","|","(",")","[","]","{","}","\\"];return r.replace(new RegExp("(\\"+q.join("|\\")+")","gim"),"\\$1")},format:function(s,q){var r=d.extend(true,{},d.inputmask.defaults,q);f(r.alias,q,r);return e({action:"format",value:s},b(r),r)},isValid:function(s,q){var r=d.extend(true,{},d.inputmask.defaults,q);f(r.alias,q,r);return e({action:"isValid",value:s},b(r),r)}};d.fn.inputmask=function(u,y,s,v,r){s=s||e;v=v||"_inputmask";function x(C,A){var D=d(C);for(var z in A){var B=D.data("inputmask-"+z.toLowerCase());if(B!=undefined){A[z]=B}}return A}var q=d.extend(true,{},d.inputmask.defaults,y),w;if(typeof u==="string"){switch(u){case"mask":f(q.alias,y,q);w=b(q,s!==e);if(w.length==0){return this}return this.each(function(){s({action:"mask",el:this},d.extend(true,{},w),x(this,q))});case"unmaskedvalue":var t=d(this);if(t.data(v)){return s({action:"unmaskedvalue","$input":t})}else{return t.val()}case"remove":return this.each(function(){var z=d(this);if(z.data(v)){s({action:"remove",el:this})}});case"getemptymask":if(this.data(v)){return s({action:"getemptymask",el:this})}else{return""}case"hasMaskedValue":return this.data(v)?!this.data(v)["opts"].autoUnmask:false;case"isComplete":if(this.data(v)){return s({action:"isComplete",buffer:this[0]._valueGet().split(""),el:this})}else{return true}case"getmetadata":if(this.data(v)){w=this.data(v)["maskset"];return w.metadata}else{return undefined}case"_detectScope":f(q.alias,y,q);if(r!=undefined&&!f(r,y,q)&&d.inArray(r,["mask","unmaskedvalue","remove","getemptymask","hasMaskedValue","isComplete","getmetadata","_detectScope"])==-1){q.mask=r}if(d.isFunction(q.mask)){q.mask=q.mask.call(this,q)}return d.isArray(q.mask);default:f(q.alias,y,q);if(!f(u,y,q)){q.mask=u}w=b(q,s!==e);if(w==undefined){return this}return this.each(function(){s({action:"mask",el:this},d.extend(true,{},w),x(this,q))})}}else{if(typeof u=="object"){q=d.extend(true,{},d.inputmask.defaults,u);f(q.alias,u,q);w=b(q,s!==e);if(w==undefined){return this}return this.each(function(){s({action:"mask",el:this},d.extend(true,{},w),x(this,q))})}else{if(u==undefined){return this.each(function(){var B=d(this).attr("data-inputmask");if(B&&B!=""){try{B=B.replace(new RegExp("'","g"),'"');var z=d.parseJSON("{"+B+"}");d.extend(true,z,y);q=d.extend(true,{},d.inputmask.defaults,z);f(q.alias,z,q);q.alias=undefined;d(this).inputmask("mask",q,s)}catch(A){}}})}}}}}})(jQuery);(function(a){a.extend(a.inputmask.defaults.definitions,{h:{validator:"[01][0-9]|2[0-3]",cardinality:2,prevalidator:[{validator:"[0-2]",cardinality:1}]},s:{validator:"[0-5][0-9]",cardinality:2,prevalidator:[{validator:"[0-5]",cardinality:1}]},d:{validator:"0[1-9]|[12][0-9]|3[01]",cardinality:2,prevalidator:[{validator:"[0-3]",cardinality:1}]},m:{validator:"0[1-9]|1[012]",cardinality:2,prevalidator:[{validator:"[01]",cardinality:1}]},y:{validator:"(19|20)\\d{2}",cardinality:4,prevalidator:[{validator:"[12]",cardinality:1},{validator:"(19|20)",cardinality:2},{validator:"(19|20)\\d",cardinality:3}]}});a.extend(a.inputmask.defaults.aliases,{"dd/mm/yyyy":{mask:"1/2/y",placeholder:"dd/mm/yyyy",regex:{val1pre:new RegExp("[0-3]"),val1:new RegExp("0[1-9]|[12][0-9]|3[01]"),val2pre:function(c){var b=a.inputmask.escapeRegex.call(this,c);return new RegExp("((0[1-9]|[12][0-9]|3[01])"+b+"[01])")},val2:function(c){var b=a.inputmask.escapeRegex.call(this,c);return new RegExp("((0[1-9]|[12][0-9])"+b+"(0[1-9]|1[012]))|(30"+b+"(0[13-9]|1[012]))|(31"+b+"(0[13578]|1[02]))")}},leapday:"29/02/",separator:"/",yearrange:{minyear:1900,maxyear:2099},isInYearRange:function(e,b,c){if(isNaN(e)){return false}var d=parseInt(e.concat(b.toString().slice(e.length)));var f=parseInt(e.concat(c.toString().slice(e.length)));return(!isNaN(d)?b<=d&&d<=c:false)||(!isNaN(f)?b<=f&&f<=c:false)},determinebaseyear:function(c,e,g){var f=(new Date()).getFullYear();if(c>f){return c}if(e<f){var b=e.toString().slice(0,2);var h=e.toString().slice(2,4);while(e<b+g){b--}var d=b+h;return c>d?c:d}return f},onKeyUp:function(g,b,d,f){var h=a(this);if(g.ctrlKey&&g.keyCode==f.keyCode.RIGHT){var c=new Date();h.val(c.getDate().toString()+(c.getMonth()+1).toString()+c.getFullYear().toString())}},definitions:{"1":{validator:function(c,f,g,b,d){var e=d.regex.val1.test(c);if(!b&&!e){if(c.charAt(1)==d.separator||"-./".indexOf(c.charAt(1))!=-1){e=d.regex.val1.test("0"+c.charAt(0));if(e){f.buffer[g-1]="0";return{refreshFromBuffer:{start:g-1,end:g},pos:g,c:c.charAt(0)}}}}return e},cardinality:2,prevalidator:[{validator:function(c,f,g,b,d){if(!isNaN(f.buffer[g+1])){c+=f.buffer[g+1]}var e=c.length==1?d.regex.val1pre.test(c):d.regex.val1.test(c);if(!b&&!e){e=d.regex.val1.test("0"+c);if(e){f.buffer[g]="0";g++;return{pos:g}}}return e},cardinality:1}]},"2":{validator:function(d,h,f,g,b){var c=(b.mask.indexOf("2")==b.mask.length-1)?h.buffer.join("").substr(5,3):h.buffer.join("").substr(0,3);if(c.indexOf(b.placeholder[0])!=-1){c="01"+b.separator}var m=b.regex.val2(b.separator).test(c+d);if(!g&&!m){if(d.charAt(1)==b.separator||"-./".indexOf(d.charAt(1))!=-1){m=b.regex.val2(b.separator).test(c+"0"+d.charAt(0));if(m){h.buffer[f-1]="0";return{refreshFromBuffer:{start:f-1,end:f},pos:f,c:d.charAt(0)}}}}if((b.mask.indexOf("2")==b.mask.length-1)&&m){var j=h.buffer.join("").substr(4,4)+d;if(j!=b.leapday){return true}else{var e=parseInt(h.buffer.join("").substr(0,4),10);if(e%4===0){if(e%100===0){if(e%400===0){return true}else{return false}}else{return true}}else{return false}}}return m},cardinality:2,prevalidator:[{validator:function(c,g,h,b,d){if(!isNaN(g.buffer[h+1])){c+=g.buffer[h+1]}var f=(d.mask.indexOf("2")==d.mask.length-1)?g.buffer.join("").substr(5,3):g.buffer.join("").substr(0,3);if(f.indexOf(d.placeholder[0])!=-1){f="01"+d.separator}var e=c.length==1?d.regex.val2pre(d.separator).test(f+c):d.regex.val2(d.separator).test(f+c);if(!b&&!e){e=d.regex.val2(d.separator).test(f+"0"+c);if(e){g.buffer[h]="0";h++;return{pos:h}}}return e},cardinality:1}]},y:{validator:function(c,f,h,b,e){if(e.isInYearRange(c,e.yearrange.minyear,e.yearrange.maxyear)){var g=f.buffer.join("").substr(0,6);if(g!=e.leapday){return true}else{var d=parseInt(c,10);if(d%4===0){if(d%100===0){if(d%400===0){return true}else{return false}}else{return true}}else{return false}}}else{return false}},cardinality:4,prevalidator:[{validator:function(d,g,h,c,e){var f=e.isInYearRange(d,e.yearrange.minyear,e.yearrange.maxyear);if(!c&&!f){var b=e.determinebaseyear(e.yearrange.minyear,e.yearrange.maxyear,d+"0").toString().slice(0,1);f=e.isInYearRange(b+d,e.yearrange.minyear,e.yearrange.maxyear);if(f){g.buffer[h++]=b[0];return{pos:h}}b=e.determinebaseyear(e.yearrange.minyear,e.yearrange.maxyear,d+"0").toString().slice(0,2);f=e.isInYearRange(b+d,e.yearrange.minyear,e.yearrange.maxyear);if(f){g.buffer[h++]=b[0];g.buffer[h++]=b[1];return{pos:h}}}return f},cardinality:1},{validator:function(c,h,f,g,b){var m=b.isInYearRange(c,b.yearrange.minyear,b.yearrange.maxyear);if(!g&&!m){var d=b.determinebaseyear(b.yearrange.minyear,b.yearrange.maxyear,c).toString().slice(0,2);m=b.isInYearRange(c[0]+d[1]+c[1],b.yearrange.minyear,b.yearrange.maxyear);if(m){h.buffer[f++]=d[1];return{pos:f}}d=b.determinebaseyear(b.yearrange.minyear,b.yearrange.maxyear,c).toString().slice(0,2);if(b.isInYearRange(d+c,b.yearrange.minyear,b.yearrange.maxyear)){var j=h.buffer.join("").substr(0,6);if(j!=b.leapday){m=true}else{var e=parseInt(c,10);if(e%4===0){if(e%100===0){if(e%400===0){m=true}else{m=false}}else{m=true}}else{m=false}}}else{m=false}if(m){h.buffer[f-1]=d[0];h.buffer[f++]=d[1];h.buffer[f++]=c[0];return{refreshFromBuffer:{start:f-3,end:f},pos:f}}}return m},cardinality:2},{validator:function(c,e,f,b,d){return d.isInYearRange(c,d.yearrange.minyear,d.yearrange.maxyear)},cardinality:3}]}},insertMode:false,autoUnmask:false},"mm/dd/yyyy":{placeholder:"mm/dd/yyyy",alias:"dd/mm/yyyy",regex:{val2pre:function(c){var b=a.inputmask.escapeRegex.call(this,c);return new RegExp("((0[13-9]|1[012])"+b+"[0-3])|(02"+b+"[0-2])")},val2:function(c){var b=a.inputmask.escapeRegex.call(this,c);return new RegExp("((0[1-9]|1[012])"+b+"(0[1-9]|[12][0-9]))|((0[13-9]|1[012])"+b+"30)|((0[13578]|1[02])"+b+"31)")},val1pre:new RegExp("[01]"),val1:new RegExp("0[1-9]|1[012]")},leapday:"02/29/",onKeyUp:function(g,b,d,f){var h=a(this);if(g.ctrlKey&&g.keyCode==f.keyCode.RIGHT){var c=new Date();h.val((c.getMonth()+1).toString()+c.getDate().toString()+c.getFullYear().toString())}}},"yyyy/mm/dd":{mask:"y/1/2",placeholder:"yyyy/mm/dd",alias:"mm/dd/yyyy",leapday:"/02/29",onKeyUp:function(g,b,d,f){var h=a(this);if(g.ctrlKey&&g.keyCode==f.keyCode.RIGHT){var c=new Date();h.val(c.getFullYear().toString()+(c.getMonth()+1).toString()+c.getDate().toString())}}},"dd.mm.yyyy":{mask:"1.2.y",placeholder:"dd.mm.yyyy",leapday:"29.02.",separator:".",alias:"dd/mm/yyyy"},"dd-mm-yyyy":{mask:"1-2-y",placeholder:"dd-mm-yyyy",leapday:"29-02-",separator:"-",alias:"dd/mm/yyyy"},"mm.dd.yyyy":{mask:"1.2.y",placeholder:"mm.dd.yyyy",leapday:"02.29.",separator:".",alias:"mm/dd/yyyy"},"mm-dd-yyyy":{mask:"1-2-y",placeholder:"mm-dd-yyyy",leapday:"02-29-",separator:"-",alias:"mm/dd/yyyy"},"yyyy.mm.dd":{mask:"y.1.2",placeholder:"yyyy.mm.dd",leapday:".02.29",separator:".",alias:"yyyy/mm/dd"},"yyyy-mm-dd":{mask:"y-1-2",placeholder:"yyyy-mm-dd",leapday:"-02-29",separator:"-",alias:"yyyy/mm/dd"},datetime:{mask:"1/2/y h:s",placeholder:"dd/mm/yyyy hh:mm",alias:"dd/mm/yyyy",regex:{hrspre:new RegExp("[012]"),hrs24:new RegExp("2[0-4]|1[3-9]"),hrs:new RegExp("[01][0-9]|2[0-4]"),ampm:new RegExp("^[a|p|A|P][m|M]"),mspre:new RegExp("[0-5]"),ms:new RegExp("[0-5][0-9]")},timeseparator:":",hourFormat:"24",definitions:{h:{validator:function(d,g,h,b,e){if(e.hourFormat=="24"){if(parseInt(d,10)==24){g.buffer[h-1]="0";g.buffer[h]="0";return{refreshFromBuffer:{start:h-1,end:h},c:"0"}}}var f=e.regex.hrs.test(d);if(!b&&!f){if(d.charAt(1)==e.timeseparator||"-.:".indexOf(d.charAt(1))!=-1){f=e.regex.hrs.test("0"+d.charAt(0));if(f){g.buffer[h-1]="0";g.buffer[h]=d.charAt(0);h++;return{refreshFromBuffer:{start:h-2,end:h},pos:h,c:e.timeseparator}}}}if(f&&e.hourFormat!=="24"&&e.regex.hrs24.test(d)){var c=parseInt(d,10);if(c==24){g.buffer[h+5]="a";g.buffer[h+6]="m"}else{g.buffer[h+5]="p";g.buffer[h+6]="m"}c=c-12;if(c<10){g.buffer[h]=c.toString();g.buffer[h-1]="0"}else{g.buffer[h]=c.toString().charAt(1);g.buffer[h-1]=c.toString().charAt(0)}return{refreshFromBuffer:{start:h-1,end:h+6},c:g.buffer[h]}}return f},cardinality:2,prevalidator:[{validator:function(c,f,g,b,d){var e=d.regex.hrspre.test(c);if(!b&&!e){e=d.regex.hrs.test("0"+c);if(e){f.buffer[g]="0";g++;return{pos:g}}}return e},cardinality:1}]},s:{validator:"[0-5][0-9]",cardinality:2,prevalidator:[{validator:function(c,f,g,b,d){var e=d.regex.mspre.test(c);if(!b&&!e){e=d.regex.ms.test("0"+c);if(e){f.buffer[g]="0";g++;return{pos:g}}}return e},cardinality:1}]},t:{validator:function(c,e,f,b,d){return d.regex.ampm.test(c+"m")},casing:"lower",cardinality:1}},insertMode:false,autoUnmask:false},datetime12:{mask:"1/2/y h:s t\\m",placeholder:"dd/mm/yyyy hh:mm xm",alias:"datetime",hourFormat:"12"},"hh:mm t":{mask:"h:s t\\m",placeholder:"hh:mm xm",alias:"datetime",hourFormat:"12"},"h:s t":{mask:"h:s t\\m",placeholder:"hh:mm xm",alias:"datetime",hourFormat:"12"},"hh:mm:ss":{mask:"h:s:s",placeholder:"hh:mm:ss",alias:"datetime",autoUnmask:false},"hh:mm":{mask:"h:s",placeholder:"hh:mm",alias:"datetime",autoUnmask:false},date:{alias:"dd/mm/yyyy"},"mm/yyyy":{mask:"1/y",placeholder:"mm/yyyy",leapday:"donotuse",separator:"/",alias:"mm/dd/yyyy"}})})(jQuery);(function(A){var M,at="2.4.0",R=Math.round,V,u=0,e=1,aH=2,t=3,am=4,r=5,O=6,ao={},ad=(typeof module!=="undefined"&&module.exports),b=/^\/?Date\((\-?\d+)/i,aQ=/(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/,av=/^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/,ag=/(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|X|zz?|ZZ?|.)/g,U=/(\[[^\[]*\])|(\\)?(LT|LL?L?L?|l{1,4})/g,f=/\d\d?/,W=/\d{1,3}/,aP=/\d{3}/,aD=/\d{1,4}/,Z=/[+\-]?\d{1,6}/,aM=/\d+/,E=/[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,p=/Z|[\+\-]\d\d:?\d\d/i,j=/T/i,aE=/[\+\-]?\d+(\.\d{1,3})?/,aA=/^\s*\d{4}-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d:?\d\d|Z)?)?$/,P="YYYY-MM-DDTHH:mm:ssZ",aO=["YYYY-MM-DD","GGGG-[W]WW","GGGG-[W]WW-E","YYYY-DDD"],C=[["HH:mm:ss.SSSS",/(T| )\d\d:\d\d:\d\d\.\d{1,3}/],["HH:mm:ss",/(T| )\d\d:\d\d:\d\d/],["HH:mm",/(T| )\d\d:\d\d/],["HH",/(T| )\d\d/]],T=/([\+\-]|\d\d)/gi,ax="Date|Hours|Minutes|Seconds|Milliseconds".split("|"),z={Milliseconds:1,Seconds:1000,Minutes:60000,Hours:3600000,Days:86400000,Months:2592000000,Years:31536000000},c={ms:"millisecond",s:"second",m:"minute",h:"hour",d:"day",D:"date",w:"week",W:"isoWeek",M:"month",y:"year",DDD:"dayOfYear",e:"weekday",E:"isoWeekday",gg:"weekYear",GG:"isoWeekYear"},aL={dayofyear:"dayOfYear",isoweekday:"isoWeekday",isoweek:"isoWeek",weekyear:"weekYear",isoweekyear:"isoWeekYear"},ac={},aG="DDD w W M D d".split(" "),ae="M D H h m s w W".split(" "),aI={M:function(){return this.month()+1},MMM:function(aX){return this.lang().monthsShort(this,aX)},MMMM:function(aX){return this.lang().months(this,aX)},D:function(){return this.date()},DDD:function(){return this.dayOfYear()},d:function(){return this.day()},dd:function(aX){return this.lang().weekdaysMin(this,aX)},ddd:function(aX){return this.lang().weekdaysShort(this,aX)},dddd:function(aX){return this.lang().weekdays(this,aX)},w:function(){return this.week()},W:function(){return this.isoWeek()},YY:function(){return F(this.year()%100,2)},YYYY:function(){return F(this.year(),4)},YYYYY:function(){return F(this.year(),5)},gg:function(){return F(this.weekYear()%100,2)},gggg:function(){return this.weekYear()},ggggg:function(){return F(this.weekYear(),5)},GG:function(){return F(this.isoWeekYear()%100,2)},GGGG:function(){return this.isoWeekYear()},GGGGG:function(){return F(this.isoWeekYear(),5)},e:function(){return this.weekday()},E:function(){return this.isoWeekday()},a:function(){return this.lang().meridiem(this.hours(),this.minutes(),true)},A:function(){return this.lang().meridiem(this.hours(),this.minutes(),false)},H:function(){return this.hours()},h:function(){return this.hours()%12||12},m:function(){return this.minutes()},s:function(){return this.seconds()},S:function(){return H(this.milliseconds()/100)},SS:function(){return F(H(this.milliseconds()/10),2)},SSS:function(){return F(this.milliseconds(),3)},SSSS:function(){return F(this.milliseconds(),3)},Z:function(){var aY=-this.zone(),aX="+";if(aY<0){aY=-aY;aX="-"}return aX+F(H(aY/60),2)+":"+F(H(aY)%60,2)},ZZ:function(){var aY=-this.zone(),aX="+";if(aY<0){aY=-aY;aX="-"}return aX+F(H(10*aY/6),4)},z:function(){return this.zoneAbbr()},zz:function(){return this.zoneName()},X:function(){return this.unix()}},Q=["months","monthsShort","weekdays","weekdaysShort","weekdaysMin"];function J(aY,aX){return function(aZ){return F(aY.call(this,aZ),aX)}}function g(aX,aY){return function(aZ){return this.lang().ordinal(aX.call(this,aZ),aY)}}while(aG.length){V=aG.pop();aI[V+"o"]=g(aI[V],V)}while(ae.length){V=ae.pop();aI[V+V]=J(aI[V],2)}aI.DDDD=J(aI.DDD,3);function ay(){}function G(aX){aU(aX);aq(this,aX)}function X(a0){var a3=n(a0),a2=a3.year||0,aY=a3.month||0,aX=a3.week||0,a6=a3.day||0,a4=a3.hour||0,a1=a3.minute||0,a5=a3.second||0,aZ=a3.millisecond||0;this._input=a0;this._milliseconds=+aZ+a5*1000+a1*60000+a4*3600000;this._days=+a6+aX*7;this._months=+aY+a2*12;this._data={};this._bubble()}function aq(aY,aX){for(var aZ in aX){if(aX.hasOwnProperty(aZ)){aY[aZ]=aX[aZ]}}if(aX.hasOwnProperty("toString")){aY.toString=aX.toString}if(aX.hasOwnProperty("valueOf")){aY.valueOf=aX.valueOf}return aY}function m(aX){if(aX<0){return Math.ceil(aX)}else{return Math.floor(aX)}}function F(aZ,aY){var aX=aZ+"";while(aX.length<aY){aX="0"+aX}return aX}function B(a0,aZ,a3,a2){var aY=aZ._milliseconds,a5=aZ._days,aX=aZ._months,a1,a4;if(aY){a0._d.setTime(+a0._d+aY*a3)}if(a5||aX){a1=a0.minute();a4=a0.hour()}if(a5){a0.date(a0.date()+a5*a3)}if(aX){a0.month(a0.month()+aX*a3)}if(aY&&!a2){M.updateOffset(a0)}if(a5||aX){a0.minute(a1);a0.hour(a4)}}function a(aX){return Object.prototype.toString.call(aX)==="[object Array]"}function d(aX){return Object.prototype.toString.call(aX)==="[object Date]"||aX instanceof Date}function aF(a2,a1,aY){var aX=Math.min(a2.length,a1.length),aZ=Math.abs(a2.length-a1.length),a3=0,a0;for(a0=0;a0<aX;a0++){if((aY&&a2[a0]!==a1[a0])||(!aY&&H(a2[a0])!==H(a1[a0]))){a3++}}return a3+aZ}function aK(aY){if(aY){var aX=aY.toLowerCase().replace(/(.)s$/,"$1");aY=c[aY]||aL[aX]||aX}return aY}function n(a0){var aY={},aX,a1,aZ;for(a1 in a0){if(a0.hasOwnProperty(a1)){aX=aK(a1);if(aX){aY[aX]=a0[a1]}}}return aY}function aj(aY){var aX,aZ;if(aY.indexOf("week")===0){aX=7;aZ="day"}else{if(aY.indexOf("month")===0){aX=12;aZ="month"}else{return}}M[aY]=function(a4,a1){var a3,a0,a5=M.fn._lang[aY],a2=[];if(typeof a4==="number"){a1=a4;a4=A}a0=function(a7){var a6=M().utc().set(aZ,a7);return a5.call(M.fn._lang,a6,a4||"")};if(a1!=null){return a0(a1)}else{for(a3=0;a3<aX;a3++){a2.push(a0(a3))}return a2}}}function H(aX){var aZ=+aX,aY=0;if(aZ!==0&&isFinite(aZ)){if(aZ>=0){aY=Math.floor(aZ)}else{aY=Math.ceil(aZ)}}return aY}function aS(aX,aY){return new Date(Date.UTC(aX,aY+1,0)).getUTCDate()}function aN(aX){return aB(aX)?366:365}function aB(aX){return(aX%4===0&&aX%100!==0)||aX%400===0}function aU(aX){var aY;if(aX._a&&aX._pf.overflow===-2){aY=aX._a[e]<0||aX._a[e]>11?e:aX._a[aH]<1||aX._a[aH]>aS(aX._a[u],aX._a[e])?aH:aX._a[t]<0||aX._a[t]>23?t:aX._a[am]<0||aX._a[am]>59?am:aX._a[r]<0||aX._a[r]>59?r:aX._a[O]<0||aX._a[O]>999?O:-1;if(aX._pf._overflowDayOfYear&&(aY<u||aY>aH)){aY=aH}aX._pf.overflow=aY}}function aw(aX){aX._pf={empty:false,unusedTokens:[],unusedInput:[],overflow:-2,charsLeftOver:0,nullInput:false,invalidMonth:null,invalidFormat:false,userInvalidated:false,iso:false}}function ar(aX){if(aX._isValid==null){aX._isValid=!isNaN(aX._d.getTime())&&aX._pf.overflow<0&&!aX._pf.empty&&!aX._pf.invalidMonth&&!aX._pf.nullInput&&!aX._pf.invalidFormat&&!aX._pf.userInvalidated;if(aX._strict){aX._isValid=aX._isValid&&aX._pf.charsLeftOver===0&&aX._pf.unusedTokens.length===0}}return aX._isValid}function y(aX){return aX?aX.toLowerCase().replace("_","-"):aX}aq(ay.prototype,{set:function(aX){var aZ,aY;for(aY in aX){aZ=aX[aY];if(typeof aZ==="function"){this[aY]=aZ}else{this["_"+aY]=aZ}}},_months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),months:function(aX){return this._months[aX.month()]},_monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),monthsShort:function(aX){return this._monthsShort[aX.month()]},monthsParse:function(aX){var aY,a0,aZ;if(!this._monthsParse){this._monthsParse=[]}for(aY=0;aY<12;aY++){if(!this._monthsParse[aY]){a0=M.utc([2000,aY]);aZ="^"+this.months(a0,"")+"|^"+this.monthsShort(a0,"");this._monthsParse[aY]=new RegExp(aZ.replace(".",""),"i")}if(this._monthsParse[aY].test(aX)){return aY}}},_weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),weekdays:function(aX){return this._weekdays[aX.day()]},_weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),weekdaysShort:function(aX){return this._weekdaysShort[aX.day()]},_weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),weekdaysMin:function(aX){return this._weekdaysMin[aX.day()]},weekdaysParse:function(a0){var aX,aZ,aY;if(!this._weekdaysParse){this._weekdaysParse=[]}for(aX=0;aX<7;aX++){if(!this._weekdaysParse[aX]){aZ=M([2000,1]).day(aX);aY="^"+this.weekdays(aZ,"")+"|^"+this.weekdaysShort(aZ,"")+"|^"+this.weekdaysMin(aZ,"");this._weekdaysParse[aX]=new RegExp(aY.replace(".",""),"i")}if(this._weekdaysParse[aX].test(a0)){return aX}}},_longDateFormat:{LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D YYYY",LLL:"MMMM D YYYY LT",LLLL:"dddd, MMMM D YYYY LT"},longDateFormat:function(aY){var aX=this._longDateFormat[aY];if(!aX&&this._longDateFormat[aY.toUpperCase()]){aX=this._longDateFormat[aY.toUpperCase()].replace(/MMMM|MM|DD|dddd/g,function(aZ){return aZ.slice(1)});this._longDateFormat[aY]=aX}return aX},isPM:function(aX){return((aX+"").toLowerCase().charAt(0)==="p")},_meridiemParse:/[ap]\.?m?\.?/i,meridiem:function(aX,aY,aZ){if(aX>11){return aZ?"pm":"PM"}else{return aZ?"am":"AM"}},_calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},calendar:function(aY,aZ){var aX=this._calendar[aY];return typeof aX==="function"?aX.apply(aZ):aX},_relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},relativeTime:function(a0,aZ,aY,a1){var aX=this._relativeTime[aY];return(typeof aX==="function")?aX(a0,aZ,aY,a1):aX.replace(/%d/i,a0)},pastFuture:function(aZ,aX){var aY=this._relativeTime[aZ>0?"future":"past"];return typeof aY==="function"?aY(aX):aY.replace(/%s/i,aX)},ordinal:function(aX){return this._ordinal.replace("%d",aX)},_ordinal:"%d",preparse:function(aX){return aX},postformat:function(aX){return aX},week:function(aX){return x(aX,this._week.dow,this._week.doy).week},_week:{dow:0,doy:6},_invalidDate:"Invalid date",invalidDate:function(){return this._invalidDate}});function ab(aY,aX){aX.abbr=aY;if(!ao[aY]){ao[aY]=new ay()}ao[aY].set(aX);return ao[aY]}function aR(aX){delete ao[aX]}function ap(a1){var a0=0,aY,a3,a2,aZ,aX=function(a4){if(!ao[a4]&&ad){try{require("./lang/"+a4)}catch(a5){}}return ao[a4]};if(!a1){return M.fn._lang}if(!a(a1)){a3=aX(a1);if(a3){return a3}a1=[a1]}while(a0<a1.length){aZ=y(a1[a0]).split("-");aY=aZ.length;a2=y(a1[a0+1]);a2=a2?a2.split("-"):null;while(aY>0){a3=aX(aZ.slice(0,aY).join("-"));if(a3){return a3}if(a2&&a2.length>=aY&&aF(aZ,a2,true)>=aY-1){break}aY--}a0++}return M.fn._lang}function aa(aX){if(aX.match(/\[[\s\S]/)){return aX.replace(/^\[|\]$/g,"")}return aX.replace(/\\/g,"")}function q(aZ){var a0=aZ.match(ag),aX,aY;for(aX=0,aY=a0.length;aX<aY;aX++){if(aI[a0[aX]]){a0[aX]=aI[a0[aX]]}else{a0[aX]=aa(a0[aX])}}return function(a2){var a1="";for(aX=0;aX<aY;aX++){a1+=a0[aX] instanceof Function?a0[aX].call(a2,aZ):a0[aX]}return a1}}function af(aX,aY){if(!aX.isValid()){return aX.lang().invalidDate()}aY=aW(aY,aX.lang());if(!ac[aY]){ac[aY]=q(aY)}return ac[aY](aX)}function aW(aZ,a0){var aX=5;function aY(a1){return a0.longDateFormat(a1)||a1}U.lastIndex=0;while(aX>=0&&U.test(aZ)){aZ=aZ.replace(U,aY);U.lastIndex=0;aX-=1}return aZ}function ai(aZ,aY){var aX;switch(aZ){case"DDDD":return aP;case"YYYY":case"GGGG":case"gggg":return aD;case"YYYYY":case"GGGGG":case"ggggg":return Z;case"S":case"SS":case"SSS":case"DDD":return W;case"MMM":case"MMMM":case"dd":case"ddd":case"dddd":return E;case"a":case"A":return ap(aY._l)._meridiemParse;case"X":return aE;case"Z":case"ZZ":return p;case"T":return j;case"SSSS":return aM;case"MM":case"DD":case"YY":case"GG":case"gg":case"HH":case"hh":case"mm":case"ss":case"M":case"D":case"d":case"H":case"h":case"m":case"s":case"w":case"ww":case"W":case"WW":case"e":case"E":return f;default:aX=new RegExp(aV(al(aZ.replace("\\","")),"i"));return aX}}function v(aY){var aX=(p.exec(aY)||[])[0],a0=(aX+"").match(T)||["-",0,0],aZ=+(a0[1]*60)+H(a0[2]);return a0[0]==="+"?-aZ:aZ}function ak(a1,aZ,a0){var aY,aX=a0._a;switch(a1){case"M":case"MM":if(aZ!=null){aX[e]=H(aZ)-1}break;case"MMM":case"MMMM":aY=ap(a0._l).monthsParse(aZ);if(aY!=null){aX[e]=aY}else{a0._pf.invalidMonth=aZ}break;case"D":case"DD":if(aZ!=null){aX[aH]=H(aZ)}break;case"DDD":case"DDDD":if(aZ!=null){a0._dayOfYear=H(aZ)}break;case"YY":aX[u]=H(aZ)+(H(aZ)>68?1900:2000);break;case"YYYY":case"YYYYY":aX[u]=H(aZ);break;case"a":case"A":a0._isPm=ap(a0._l).isPM(aZ);break;case"H":case"HH":case"h":case"hh":aX[t]=H(aZ);break;case"m":case"mm":aX[am]=H(aZ);break;case"s":case"ss":aX[r]=H(aZ);break;case"S":case"SS":case"SSS":case"SSSS":aX[O]=H(("0."+aZ)*1000);break;case"X":a0._d=new Date(parseFloat(aZ)*1000);break;case"Z":case"ZZ":a0._useUTC=true;a0._tzm=v(aZ);break;case"w":case"ww":case"W":case"WW":case"d":case"dd":case"ddd":case"dddd":case"e":case"E":a1=a1.substr(0,1);case"gg":case"gggg":case"GG":case"GGGG":case"GGGGG":a1=a1.substr(0,2);if(aZ){a0._w=a0._w||{};a0._w[a1]=aZ}break}}function Y(a1){var a3,a2,a6=[],aZ,a5,aY,a7,a8,a0,a4,aX;if(a1._d){return}aZ=o(a1);if(a1._w&&a1._a[aH]==null&&a1._a[e]==null){aY=function(a9){return a9?(a9.length<3?(parseInt(a9,10)>68?"19"+a9:"20"+a9):a9):(a1._a[u]==null?M().weekYear():a1._a[u])};a7=a1._w;if(a7.GG!=null||a7.W!=null||a7.E!=null){a8=s(aY(a7.GG),a7.W||1,a7.E,4,1)}else{a0=ap(a1._l);a4=a7.d!=null?aT(a7.d,a0):(a7.e!=null?parseInt(a7.e,10)+a0._week.dow:0);aX=parseInt(a7.w,10)||1;if(a7.d!=null&&a4<a0._week.dow){aX++}a8=s(aY(a7.gg),aX,a4,a0._week.doy,a0._week.dow)}a1._a[u]=a8.year;a1._dayOfYear=a8.dayOfYear}if(a1._dayOfYear){a5=a1._a[u]==null?aZ[u]:a1._a[u];if(a1._dayOfYear>aN(a5)){a1._pf._overflowDayOfYear=true}a2=D(a5,0,a1._dayOfYear);a1._a[e]=a2.getUTCMonth();a1._a[aH]=a2.getUTCDate()}for(a3=0;a3<3&&a1._a[a3]==null;++a3){a1._a[a3]=a6[a3]=aZ[a3]}for(;a3<7;a3++){a1._a[a3]=a6[a3]=(a1._a[a3]==null)?(a3===2?1:0):a1._a[a3]}a6[t]+=H((a1._tzm||0)/60);a6[am]+=H((a1._tzm||0)%60);a1._d=(a1._useUTC?D:ah).apply(null,a6)}function au(aY){var aX;if(aY._d){return}aX=n(aY._i);aY._a=[aX.year,aX.month,aX.day,aX.hour,aX.minute,aX.second,aX.millisecond];Y(aY)}function o(aY){var aX=new Date();if(aY._useUTC){return[aX.getUTCFullYear(),aX.getUTCMonth(),aX.getUTCDate()]}else{return[aX.getFullYear(),aX.getMonth(),aX.getDate()]}}function L(a0){a0._a=[];a0._pf.empty=true;var aZ=ap(a0._l),a3=""+a0._i,a2,aY,a6,a1,a5,aX=a3.length,a4=0;a6=aW(a0._f,aZ).match(ag)||[];for(a2=0;a2<a6.length;a2++){a1=a6[a2];aY=(ai(a1,a0).exec(a3)||[])[0];if(aY){a5=a3.substr(0,a3.indexOf(aY));if(a5.length>0){a0._pf.unusedInput.push(a5)}a3=a3.slice(a3.indexOf(aY)+aY.length);a4+=aY.length}if(aI[a1]){if(aY){a0._pf.empty=false}else{a0._pf.unusedTokens.push(a1)}ak(a1,aY,a0)}else{if(a0._strict&&!aY){a0._pf.unusedTokens.push(a1)}}}a0._pf.charsLeftOver=aX-a4;if(a3.length>0){a0._pf.unusedInput.push(a3)}if(a0._isPm&&a0._a[t]<12){a0._a[t]+=12}if(a0._isPm===false&&a0._a[t]===12){a0._a[t]=0}Y(a0);aU(a0)}function al(aX){return aX.replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,function(aY,a2,a1,a0,aZ){return a2||a1||a0||aZ})}function aV(aX){return aX.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}function aJ(aX){var a1,aZ,a0,aY,a2;if(aX._f.length===0){aX._pf.invalidFormat=true;aX._d=new Date(NaN);return}for(aY=0;aY<aX._f.length;aY++){a2=0;a1=aq({},aX);aw(a1);a1._f=aX._f[aY];L(a1);if(!ar(a1)){continue}a2+=a1._pf.charsLeftOver;a2+=a1._pf.unusedTokens.length*10;a1._pf.score=a2;if(a0==null||a2<a0){a0=a2;aZ=a1}}aq(aX,aZ||a1)}function h(aZ){var a0,aY=aZ._i,aX=aA.exec(aY);if(aX){aZ._pf.iso=true;for(a0=4;a0>0;a0--){if(aX[a0]){aZ._f=aO[a0-1]+(aX[6]||" ");break}}for(a0=0;a0<4;a0++){if(C[a0][1].exec(aY)){aZ._f+=C[a0][0];break}}if(p.exec(aY)){aZ._f+="Z"}L(aZ)}else{aZ._d=new Date(aY)}}function K(aZ){var aY=aZ._i,aX=b.exec(aY);if(aY===A){aZ._d=new Date()}else{if(aX){aZ._d=new Date(+aX[1])}else{if(typeof aY==="string"){h(aZ)}else{if(a(aY)){aZ._a=aY.slice(0);Y(aZ)}else{if(d(aY)){aZ._d=new Date(+aY)}else{if(typeof(aY)==="object"){au(aZ)}else{aZ._d=new Date(aY)}}}}}}}function ah(a4,aX,a2,a1,a3,a0,aZ){var aY=new Date(a4,aX,a2,a1,a3,a0,aZ);if(a4<1970){aY.setFullYear(a4)}return aY}function D(aY){var aX=new Date(Date.UTC.apply(null,arguments));if(aY<1970){aX.setUTCFullYear(aY)}return aX}function aT(aX,aY){if(typeof aX==="string"){if(!isNaN(aX)){aX=parseInt(aX,10)}else{aX=aY.weekdaysParse(aX);if(typeof aX!=="number"){return null}}}return aX}function az(aX,aZ,aY,a0,a1){return a1.relativeTime(aZ||1,!!aY,aX,a0)}function w(aZ,aX,aY){var a4=R(Math.abs(aZ)/1000),a0=R(a4/60),a3=R(a0/60),a5=R(a3/24),a1=R(a5/365),a2=a4<45&&["s",a4]||a0===1&&["m"]||a0<45&&["mm",a0]||a3===1&&["h"]||a3<22&&["hh",a3]||a5===1&&["d"]||a5<=25&&["dd",a5]||a5<=45&&["M"]||a5<345&&["MM",R(a5/30)]||a1===1&&["y"]||["yy",a1];a2[2]=aX;a2[3]=aZ>0;a2[4]=aY;return az.apply({},a2)}function x(a1,aZ,a2){var aY=a2-aZ,aX=a2-a1.day(),a0;if(aX>aY){aX-=7}if(aX<aY-7){aX+=7}a0=M(a1).add("d",aX);return{week:Math.ceil(a0.dayOfYear()/7),year:a0.year()}}function s(a1,a0,a2,a4,aX){var a3=new Date(Date.UTC(a1,0)).getUTCDay(),aZ,aY;a2=a2!=null?a2:aX;aZ=aX-a3+(a3>a4?7:0);aY=7*(a0-1)+(a2-aX)+aZ+1;return{year:aY>0?a1:a1-1,dayOfYear:aY>0?aY:aN(a1-1)+aY}}function I(aY){var aX=aY._i,aZ=aY._f;if(typeof aY._pf==="undefined"){aw(aY)}if(aX===null){return M.invalid({nullInput:true})}if(typeof aX==="string"){aY._i=aX=ap().preparse(aX)}if(M.isMoment(aX)){aY=aq({},aX);aY._d=new Date(+aX._d)}else{if(aZ){if(a(aZ)){aJ(aY)}else{L(aY)}}else{K(aY)}}return new G(aY)}M=function(aY,aZ,a0,aX){if(typeof(a0)==="boolean"){aX=a0;a0=A}return I({_i:aY,_f:aZ,_l:a0,_strict:aX,_isUTC:false})};M.utc=function(aZ,a0,a1,aY){var aX;if(typeof(a1)==="boolean"){aY=a1;a1=A}aX=I({_useUTC:true,_isUTC:true,_l:a1,_i:aZ,_f:a0,_strict:aY}).utc();return aX};M.unix=function(aX){return M(aX*1000)};M.duration=function(a3,a6){var a4=M.isDuration(a3),a7=(typeof a3==="number"),a0=(a4?a3._input:(a7?{}:a3)),a1=null,aZ,a2,aY,a5,aX;if(a7){if(a6){a0[a6]=a3}else{a0.milliseconds=a3}}else{if(!!(a1=aQ.exec(a3))){aZ=(a1[1]==="-")?-1:1;a0={y:0,d:H(a1[aH])*aZ,h:H(a1[t])*aZ,m:H(a1[am])*aZ,s:H(a1[r])*aZ,ms:H(a1[O])*aZ}}else{if(!!(a1=av.exec(a3))){aZ=(a1[1]==="-")?-1:1;aY=function(a9){var a8=a9&&parseFloat(a9.replace(",","."));return(isNaN(a8)?0:a8)*aZ};a0={y:aY(a1[2]),M:aY(a1[3]),d:aY(a1[4]),h:aY(a1[5]),m:aY(a1[6]),s:aY(a1[7]),w:aY(a1[8])}}}}a2=new X(a0);if(a4&&a3.hasOwnProperty("_lang")){a2._lang=a3._lang}return a2};M.version=at;M.defaultFormat=P;M.updateOffset=function(){};M.lang=function(aY,aX){var aZ;if(!aY){return M.fn._lang._abbr}if(aX){ab(y(aY),aX)}else{if(aX===null){aR(aY);aY="en"}else{if(!ao[aY]){ap(aY)}}}aZ=M.duration.fn._lang=M.fn._lang=ap(aY);return aZ._abbr};M.langData=function(aX){if(aX&&aX._lang&&aX._lang._abbr){aX=aX._lang._abbr}return ap(aX)};M.isMoment=function(aX){return aX instanceof G};M.isDuration=function(aX){return aX instanceof X};for(V=Q.length-1;V>=0;--V){aj(Q[V])}M.normalizeUnits=function(aX){return aK(aX)};M.invalid=function(aY){var aX=M.utc(NaN);if(aY!=null){aq(aX._pf,aY)}else{aX._pf.userInvalidated=true}return aX};M.parseZone=function(aX){return M(aX).parseZone()};aq(M.fn=G.prototype,{clone:function(){return M(this)},valueOf:function(){return +this._d+((this._offset||0)*60000)},unix:function(){return Math.floor(+this/1000)},toString:function(){return this.clone().lang("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")},toDate:function(){return this._offset?new Date(+this):this._d},toISOString:function(){return af(M(this).utc(),"YYYY-MM-DD[T]HH:mm:ss.SSS[Z]")},toArray:function(){var aX=this;return[aX.year(),aX.month(),aX.date(),aX.hours(),aX.minutes(),aX.seconds(),aX.milliseconds()]},isValid:function(){return ar(this)},isDSTShifted:function(){if(this._a){return this.isValid()&&aF(this._a,(this._isUTC?M.utc(this._a):M(this._a)).toArray())>0}return false},parsingFlags:function(){return aq({},this._pf)},invalidAt:function(){return this._pf.overflow},utc:function(){return this.zone(0)},local:function(){this.zone(0);this._isUTC=false;return this},format:function(aY){var aX=af(this,aY||M.defaultFormat);return this.lang().postformat(aX)},add:function(aX,aZ){var aY;if(typeof aX==="string"){aY=M.duration(+aZ,aX)}else{aY=M.duration(aX,aZ)}B(this,aY,1);return this},subtract:function(aX,aZ){var aY;if(typeof aX==="string"){aY=M.duration(+aZ,aX)}else{aY=M.duration(aX,aZ)}B(this,aY,-1);return this},diff:function(a1,a0,aX){var a2=this._isUTC?M(a1).zone(this._offset||0):M(a1).local(),aY=(this.zone()-a2.zone())*60000,a3,aZ;a0=aK(a0);if(a0==="year"||a0==="month"){a3=(this.daysInMonth()+a2.daysInMonth())*43200000;aZ=((this.year()-a2.year())*12)+(this.month()-a2.month());aZ+=((this-M(this).startOf("month"))-(a2-M(a2).startOf("month")))/a3;aZ-=((this.zone()-M(this).startOf("month").zone())-(a2.zone()-M(a2).startOf("month").zone()))*60000/a3;if(a0==="year"){aZ=aZ/12}}else{a3=(this-a2);aZ=a0==="second"?a3/1000:a0==="minute"?a3/60000:a0==="hour"?a3/3600000:a0==="day"?(a3-aY)/86400000:a0==="week"?(a3-aY)/604800000:a3}return aX?aZ:m(aZ)},from:function(aY,aX){return M.duration(this.diff(aY)).lang(this.lang()._abbr).humanize(!aX)},fromNow:function(aX){return this.from(M(),aX)},calendar:function(){var aY=this.diff(M().zone(this.zone()).startOf("day"),"days",true),aX=aY<-6?"sameElse":aY<-1?"lastWeek":aY<0?"lastDay":aY<1?"sameDay":aY<2?"nextDay":aY<7?"nextWeek":"sameElse";return this.format(this.lang().calendar(aX,this))},isLeapYear:function(){return aB(this.year())},isDST:function(){return(this.zone()<this.clone().month(0).zone()||this.zone()<this.clone().month(5).zone())},day:function(aY){var aX=this._isUTC?this._d.getUTCDay():this._d.getDay();if(aY!=null){aY=aT(aY,this.lang());return this.add({d:aY-aX})}else{return aX}},month:function(aX){var aY=this._isUTC?"UTC":"",aZ;if(aX!=null){if(typeof aX==="string"){aX=this.lang().monthsParse(aX);if(typeof aX!=="number"){return this}}aZ=this.date();this.date(1);this._d["set"+aY+"Month"](aX);this.date(Math.min(aZ,this.daysInMonth()));M.updateOffset(this);return this}else{return this._d["get"+aY+"Month"]()}},startOf:function(aX){aX=aK(aX);switch(aX){case"year":this.month(0);case"month":this.date(1);case"week":case"isoWeek":case"day":this.hours(0);case"hour":this.minutes(0);case"minute":this.seconds(0);case"second":this.milliseconds(0)}if(aX==="week"){this.weekday(0)}else{if(aX==="isoWeek"){this.isoWeekday(1)}}return this},endOf:function(aX){aX=aK(aX);return this.startOf(aX).add((aX==="isoWeek"?"week":aX),1).subtract("ms",1)},isAfter:function(aY,aX){aX=typeof aX!=="undefined"?aX:"millisecond";return +this.clone().startOf(aX)>+M(aY).startOf(aX)},isBefore:function(aY,aX){aX=typeof aX!=="undefined"?aX:"millisecond";return +this.clone().startOf(aX)<+M(aY).startOf(aX)},isSame:function(aY,aX){aX=typeof aX!=="undefined"?aX:"millisecond";return +this.clone().startOf(aX)===+M(aY).startOf(aX)},min:function(aX){aX=M.apply(null,arguments);return aX<this?this:aX},max:function(aX){aX=M.apply(null,arguments);return aX>this?this:aX},zone:function(aX){var aY=this._offset||0;if(aX!=null){if(typeof aX==="string"){aX=v(aX)}if(Math.abs(aX)<16){aX=aX*60}this._offset=aX;this._isUTC=true;if(aY!==aX){B(this,M.duration(aY-aX,"m"),1,true)}}else{return this._isUTC?aY:this._d.getTimezoneOffset()}return this},zoneAbbr:function(){return this._isUTC?"UTC":""},zoneName:function(){return this._isUTC?"Coordinated Universal Time":""},parseZone:function(){if(typeof this._i==="string"){this.zone(this._i)}return this},hasAlignedHourOffset:function(aX){if(!aX){aX=0}else{aX=M(aX).zone()}return(this.zone()-aX)%60===0},daysInMonth:function(){return aS(this.year(),this.month())},dayOfYear:function(aX){var aY=R((M(this).startOf("day")-M(this).startOf("year"))/86400000)+1;return aX==null?aY:this.add("d",(aX-aY))},weekYear:function(aX){var aY=x(this,this.lang()._week.dow,this.lang()._week.doy).year;return aX==null?aY:this.add("y",(aX-aY))},isoWeekYear:function(aX){var aY=x(this,1,4).year;return aX==null?aY:this.add("y",(aX-aY))},week:function(aX){var aY=this.lang().week(this);return aX==null?aY:this.add("d",(aX-aY)*7)},isoWeek:function(aX){var aY=x(this,1,4).week;return aX==null?aY:this.add("d",(aX-aY)*7)},weekday:function(aX){var aY=(this.day()+7-this.lang()._week.dow)%7;return aX==null?aY:this.add("d",aX-aY)},isoWeekday:function(aX){return aX==null?this.day()||7:this.day(this.day()%7?aX:aX-7)},get:function(aX){aX=aK(aX);return this[aX]()},set:function(aX,aY){aX=aK(aX);if(typeof this[aX]==="function"){this[aX](aY)}return this},lang:function(aX){if(aX===A){return this._lang}else{this._lang=ap(aX);return this}}});function aC(aX,aY){M.fn[aX]=M.fn[aX+"s"]=function(aZ){var a0=this._isUTC?"UTC":"";if(aZ!=null){this._d["set"+a0+aY](aZ);M.updateOffset(this);return this}else{return this._d["get"+a0+aY]()}}}for(V=0;V<ax.length;V++){aC(ax[V].toLowerCase().replace(/s$/,""),ax[V])}aC("year","FullYear");M.fn.days=M.fn.day;M.fn.months=M.fn.month;M.fn.weeks=M.fn.week;M.fn.isoWeeks=M.fn.isoWeek;M.fn.toJSON=M.fn.toISOString;aq(M.duration.fn=X.prototype,{_bubble:function(){var aZ=this._milliseconds,a4=this._days,aX=this._months,a2=this._data,a3,a1,aY,a0;a2.milliseconds=aZ%1000;a3=m(aZ/1000);a2.seconds=a3%60;a1=m(a3/60);a2.minutes=a1%60;aY=m(a1/60);a2.hours=aY%24;a4+=m(aY/24);a2.days=a4%30;aX+=m(a4/30);a2.months=aX%12;a0=m(aX/12);a2.years=a0},weeks:function(){return m(this.days()/7)},valueOf:function(){return this._milliseconds+this._days*86400000+(this._months%12)*2592000000+H(this._months/12)*31536000000},humanize:function(aY){var aZ=+this,aX=w(aZ,!aY,this.lang());if(aY){aX=this.lang().pastFuture(aZ,aX)}return this.lang().postformat(aX)},add:function(aX,aZ){var aY=M.duration(aX,aZ);this._milliseconds+=aY._milliseconds;this._days+=aY._days;this._months+=aY._months;this._bubble();return this},subtract:function(aX,aZ){var aY=M.duration(aX,aZ);this._milliseconds-=aY._milliseconds;this._days-=aY._days;this._months-=aY._months;this._bubble();return this},get:function(aX){aX=aK(aX);return this[aX.toLowerCase()+"s"]()},as:function(aX){aX=aK(aX);return this["as"+aX.charAt(0).toUpperCase()+aX.slice(1)+"s"]()},lang:M.fn.lang,toIsoString:function(){var a0=Math.abs(this.years()),aX=Math.abs(this.months()),a2=Math.abs(this.days()),aY=Math.abs(this.hours()),aZ=Math.abs(this.minutes()),a1=Math.abs(this.seconds()+this.milliseconds()/1000);if(!this.asSeconds()){return"P0D"}return(this.asSeconds()<0?"-":"")+"P"+(a0?a0+"Y":"")+(aX?aX+"M":"")+(a2?a2+"D":"")+((aY||aZ||a1)?"T":"")+(aY?aY+"H":"")+(aZ?aZ+"M":"")+(a1?a1+"S":"")}});function S(aX){M.duration.fn[aX]=function(){return this._data[aX]}}function an(aX,aY){M.duration.fn["as"+aX]=function(){return +this/aY}}for(V in z){if(z.hasOwnProperty(V)){an(V,z[V]);S(V.toLowerCase())}}an("Weeks",604800000);M.duration.fn.asMonths=function(){return(+this-this.years()*31536000000)/2592000000+this.years()*12};M.lang("en",{ordinal:function(aZ){var aX=aZ%10,aY=(H(aZ%100/10)===1)?"th":(aX===1)?"st":(aX===2)?"nd":(aX===3)?"rd":"th";return aZ+aY}});function N(aY){var aX=false,aZ=M;if(typeof ender!=="undefined"){return}if(aY){this.moment=function(){if(!aX&&console&&console.warn){aX=true;console.warn("Accessing Moment through the global scope is deprecated, and will be removed in an upcoming release.")}return aZ.apply(null,arguments)}}else{this["moment"]=M}}if(ad){module.exports=M;N(true)}else{if(typeof define==="function"&&define.amd){define("moment",function(aY,aX,aZ){if(aZ.config().noGlobal!==true){N(aZ.config().noGlobal===A)}return M})}else{N()}}}).call(this);(function(b,a,c){(function(d){if(typeof define==="function"&&define.amd){define(["jquery","imagesloaded"],d)}else{if(jQuery&&!jQuery.fn.qtip){d(jQuery)}}}(function(L){var E=true,ah=false,H=null,e="x",d="y",j="width",K="height",M="top",B="left",J="bottom",ai="right",I="center",t="flip",U="flipinvert",O="shift",Z,S,q,f,F={},m="qtip",R="data-hasqtip",N="data-qtip-id",s=["ui-widget","ui-tooltip"],o="."+m,z="click dblclick mousedown mouseup mousemove mouseleave mouseenter".split(" "),aa=m+"-fixed",h=m+"-default",y=m+"-focus",ab=m+"-hover",P=m+"-disabled",x="_replacedByqTip",r="oldtitle",ae;BROWSER={ie:(function(){var C=3,X=a.createElement("div");while((X.innerHTML="<!--[if gt IE "+(++C)+"]><i></i><![endif]-->")){if(!X.getElementsByTagName("i")[0]){break}}return C>4?C:NaN}()),iOS:parseFloat((""+(/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent)||[0,""])[1]).replace("undefined","3_2").replace("_",".").replace("_",""))||ah};function g(Y,X,aj,C){this.id=aj;this.target=Y;this.tooltip=H;this.elements=elements={target:Y};this._id=m+"-"+aj;this.timers={img:{}};this.options=X;this.plugins={};this.cache=cache={event:{},target:L(),disabled:ah,attr:C,onTooltip:ah,lastClass:""};this.rendered=this.destroyed=this.disabled=this.waiting=this.hiddenDuringWait=this.positioning=this.triggering=ah}S=g.prototype;S.render=function(al){if(this.rendered||this.destroyed){return this}var ao=this,aq=this.options,X=this.cache,C=this.elements,an=aq.content.text,ak=aq.content.title,aj=aq.content.button,am=aq.position,Y="."+this._id+" ",ap=[];L.attr(this.target[0],"data-aria-describedby",this._id);this.tooltip=C.tooltip=tooltip=L("<div/>",{id:this._id,"class":[m,h,aq.style.classes,m+"-pos-"+aq.position.my.abbrev()].join(" "),width:aq.style.width||"",height:aq.style.height||"",tracking:am.target==="mouse"&&am.adjust.mouse,role:"alert","data-aria-live":"polite","data-aria-atomic":ah,"data-aria-describedby":this._id+"-content","data-aria-hidden":E}).toggleClass(P,this.disabled).attr(N,this.id).data(m,this).appendTo(am.container).append(C.content=L("<div />",{"class":m+"-content",id:this._id+"-content","data-aria-atomic":E}));this.rendered=-1;this.positioning=E;if(ak){this._createTitle();if(!L.isFunction(ak)){ap.push(this._updateTitle(ak,ah))}}if(aj){this._createButton()}if(!L.isFunction(an)){ap.push(this._updateContent(an,ah))}this.rendered=E;this._setWidget();L.each(aq.events,function(ar,at){L.isFunction(at)&&tooltip.bind((ar==="toggle"?["tooltipshow","tooltiphide"]:["tooltip"+ar]).join(Y)+Y,at)});L.each(F,function(at){var ar;if(this.initialize==="render"&&(ar=this(ao))){ao.plugins[at]=ar}});this._assignEvents();L.when.apply(L,ap).then(function(){ao._trigger("render");ao.positioning=ah;if(!ao.hiddenDuringWait&&(aq.show.ready||al)){ao.toggle(E,X.event,ah)}ao.hiddenDuringWait=ah});Z.api[this.id]=this;return this};S.destroy=function(C){if(this.destroyed){return this.target}function X(){if(this.destroyed){return}this.destroyed=E;var Y=this.target,aj=Y.attr(r);if(this.rendered){this.tooltip.stop(1,0).find("*").remove().end().remove()}L.each(this.plugins,function(ak){this.destroy&&this.destroy()});clearTimeout(this.timers.show);clearTimeout(this.timers.hide);this._unassignEvents();Y.removeData(m).removeAttr(N).removeAttr("data-aria-describedby");if(this.options.suppress&&aj){Y.attr("title",aj).removeAttr(r)}this._unbind(Y);this.options=this.elements=this.cache=this.timers=this.plugins=this.mouse=H;delete Z.api[this.id]}if(C!==E&&this.rendered){tooltip.one("tooltiphidden",L.proxy(X,this));!this.triggering&&this.hide()}else{X.call(this)}return this.target};function v(C){return C===H||L.type(C)!=="object"}function Q(C){return !(L.isFunction(C)||(C&&C.attr)||C.length||(L.type(C)==="object"&&(C.jquery||C.then)))}function D(Y){var X,ak,aj,C;if(v(Y)){return ah}if(v(Y.metadata)){Y.metadata={type:Y.metadata}}if("content" in Y){X=Y.content;if(v(X)||X.jquery||X.done){X=Y.content={text:(ak=Q(X)?ah:X)}}else{ak=X.text}if("ajax" in X){aj=X.ajax;C=aj&&aj.once!==ah;delete X.ajax;X.text=function(an,am){var ao=ak||L(this).attr(am.options.content.attr)||"Loading...",al=L.ajax(L.extend({},aj,{context:am})).then(aj.success,H,aj.error).then(function(ap){if(ap&&C){am.set("content.text",ap)}return ap},function(ar,ap,aq){if(am.destroyed||ar.status===0){return}am.set("content.text",ap+": "+aq)});return !C?(am.set("content.text",ao),al):ao}}if("title" in X){if(!v(X.title)){X.button=X.title.button;X.title=X.title.text}if(Q(X.title||ah)){X.title=ah}}}if("position" in Y&&v(Y.position)){Y.position={my:Y.position,at:Y.position}}if("show" in Y&&v(Y.show)){Y.show=Y.show.jquery?{target:Y.show}:Y.show===E?{ready:E}:{event:Y.show}}if("hide" in Y&&v(Y.hide)){Y.hide=Y.hide.jquery?{target:Y.hide}:{event:Y.hide}}if("style" in Y&&v(Y.style)){Y.style={classes:Y.style}}L.each(F,function(){this.sanitize&&this.sanitize(Y)});return Y}f=S.checks={builtin:{"^id$":function(aj,ak,X,Y){var al=X===E?Z.nextid:X,C=m+"-"+al;if(al!==ah&&al.length>0&&!L("#"+C).length){this._id=C;if(this.rendered){this.tooltip[0].id=this._id;this.elements.content[0].id=this._id+"-content";this.elements.title[0].id=this._id+"-title"}}else{aj[ak]=Y}},"^prerender":function(X,Y,C){C&&!this.rendered&&this.render(this.options.show.ready)},"^content.text$":function(X,Y,C){this._updateContent(C)},"^content.attr$":function(Y,aj,C,X){if(this.options.content.text===this.target.attr(X)){this._updateContent(this.target.attr(C))}},"^content.title$":function(X,Y,C){if(!C){return this._removeTitle()}C&&!this.elements.title&&this._createTitle();this._updateTitle(C)},"^content.button$":function(X,Y,C){this._updateButton(C)},"^content.title.(text|button)$":function(X,Y,C){this.set("content."+Y,C)},"^position.(my|at)$":function(X,Y,C){"string"===typeof C&&(X[Y]=new q(C,Y==="at"))},"^position.container$":function(X,Y,C){this.tooltip.appendTo(C)},"^show.ready$":function(X,Y,C){C&&(!this.rendered&&this.render(E)||this.toggle(E))},"^style.classes$":function(Y,aj,C,X){this.tooltip.removeClass(X).addClass(C)},"^style.width|height":function(X,Y,C){this.tooltip.css(Y,C)},"^style.widget|content.title":function(){this._setWidget()},"^style.def":function(X,Y,C){this.tooltip.toggleClass(h,!!C)},"^events.(render|show|move|hide|focus|blur)$":function(X,Y,C){tooltip[(L.isFunction(C)?"":"un")+"bind"]("tooltip"+Y,C)},"^(show|hide|position).(event|target|fixed|inactive|leave|distance|viewport|adjust)":function(){var C=this.options.position;tooltip.attr("tracking",C.target==="mouse"&&C.adjust.mouse);this._unassignEvents();this._assignEvents()}}};function p(C,aj){var X=0,al,Y=C,ak=aj.split(".");while(Y=Y[ak[X++]]){if(X<ak.length){al=Y}}return[al||C,ak.pop()]}S.get=function(X){if(this.destroyed){return this}var Y=p(this.options,X.toLowerCase()),C=Y[0][Y[1]];return C.precedance?C.string():C};function W(aj,X){var Y,ak,C;for(Y in this.checks){for(ak in this.checks[Y]){if(C=(new RegExp(ak,"i")).exec(aj)){X.push(C);if(Y==="builtin"||this.plugins[Y]){this.checks[Y][ak].apply(this.plugins[Y]||this,X)}}}}}var n=/^position\.(my|at|adjust|target|container|viewport)|style|content|show\.ready/i,ag=/^prerender|show\.ready/i;S.set=function(ak,al){if(this.destroyed){return this}var am=this.rendered,C=ah,aj=this.options,Y=this.checks,X;if("string"===typeof ak){X=ak;ak={};ak[X]=al}else{ak=L.extend({},ak)}L.each(ak,function(ao,ap){if(!am&&!ag.test(ao)){delete ak[ao];return}var aq=p(aj,ao.toLowerCase()),an;an=aq[0][aq[1]];aq[0][aq[1]]=ap&&ap.nodeType?L(ap):ap;C=n.test(ao)||C;ak[ao]=[aq[0],aq[1],ap,an]});D(aj);this.positioning=E;L.each(ak,L.proxy(W,this));this.positioning=ah;if(this.rendered&&this.tooltip[0].offsetWidth>0&&C){this.reposition(aj.position.target==="mouse"?H:this.cache.event)}return this};S._update=function(ak,aj,C){var Y=this,X=this.cache;if(!this.rendered||!ak){return ah}if(L.isFunction(ak)){ak=ak.call(this.elements.target,X.event,this)||""}if(L.isFunction(ak.then)){X.waiting=E;return ak.then(function(al){X.waiting=ah;return Y._update(al,aj)},H,function(al){return Y._update(al,aj)})}if(ak===ah||(!ak&&ak!=="")){return ah}if(ak.jquery&&ak.length>0){aj.children().detach().end().append(ak.css({display:"block"}))}else{aj.html(ak)}X.waiting=E;return(L.fn.imagesLoaded?aj.imagesLoaded():L.Deferred().resolve(L([]))).done(function(al){X.waiting=ah;if(al.length&&Y.rendered&&Y.tooltip[0].offsetWidth>0){Y.reposition(X.event,!al.length)}}).promise()};S._updateContent=function(X,C){this._update(X,this.elements.content,C)};S._updateTitle=function(X,C){if(this._update(X,this.elements.title,C)===ah){this._removeTitle(ah)}};S._createTitle=function(){var C=this.elements,X=this._id+"-title";if(C.titlebar){this._removeTitle()}C.titlebar=L("<div />",{"class":m+"-titlebar "+(this.options.style.widget?A("header"):"")}).append(C.title=L("<div />",{id:X,"class":m+"-title","data-aria-atomic":E})).insertBefore(C.content).delegate(".qtip-close","mousedown keydown mouseup keyup mouseout",function(Y){L(this).toggleClass("ui-state-active ui-state-focus",Y.type.substr(-4)==="down")}).delegate(".qtip-close","mouseover mouseout",function(Y){L(this).toggleClass("ui-state-hover",Y.type==="mouseover")});if(this.options.content.button){this._createButton()}};S._removeTitle=function(C){var X=this.elements;if(X.title){X.titlebar.remove();X.titlebar=X.title=X.button=H;if(C!==ah){this.reposition()}}};S.reposition=function(aA,ax){if(!this.rendered||this.positioning||this.destroyed){return this}this.positioning=E;var aw=this.cache,ak=this.tooltip,aD=this.options.position,aF=aD.target,au=aD.my,av=aD.at,aC=aD.viewport,aq=aD.container,ay=aD.adjust,X=ay.method.split(" "),aB=ak.outerWidth(ah),az=ak.outerHeight(ah),am=0,an=0,Y=ak.css("position"),aE={left:0,top:0},C=ak[0].offsetWidth>0,ar=aA&&aA.type==="scroll",aj=L(b),aG=aq[0].ownerDocument,ap=this.mouse,ao,al;if(L.isArray(aF)&&aF.length===2){av={x:B,y:M};aE={left:aF[0],top:aF[1]}}else{if(aF==="mouse"&&((aA&&aA.pageX)||aw.event.pageX)){av={x:B,y:M};aA=ap&&ap.pageX&&(ay.mouse||!aA||!aA.pageX)?ap:(aA&&(aA.type==="resize"||aA.type==="scroll")?aw.event:aA&&aA.pageX&&aA.type==="mousemove"?aA:(!ay.mouse||this.options.show.distance)&&aw.origin&&aw.origin.pageX?aw.origin:aA)||aA||aw.event||ap||{};if(Y!=="static"){aE=aq.offset()}if(aG.body.offsetWidth!==(b.innerWidth||aG.documentElement.clientWidth)){al=L(aG.body).offset()}aE={left:aA.pageX-aE.left+(al&&al.left||0),top:aA.pageY-aE.top+(al&&al.top||0)};if(ay.mouse&&ar){aE.left-=ap.scrollX-aj.scrollLeft();aE.top-=ap.scrollY-aj.scrollTop()}}else{if(aF==="event"&&aA&&aA.target&&aA.type!=="scroll"&&aA.type!=="resize"){aw.target=L(aA.target)}else{if(aF!=="event"){aw.target=L(aF.jquery?aF:elements.target)}}aF=aw.target;aF=L(aF).eq(0);if(aF.length===0){return this}else{if(aF[0]===a||aF[0]===b){am=BROWSER.iOS?b.innerWidth:aF.width();an=BROWSER.iOS?b.innerHeight:aF.height();if(aF[0]===b){aE={top:(aC||aF).scrollTop(),left:(aC||aF).scrollLeft()}}}else{if(F.imagemap&&aF.is("area")){ao=F.imagemap(this,aF,av,F.viewport?X:ah)}else{if(F.svg&&aF[0].ownerSVGElement){ao=F.svg(this,aF,av,F.viewport?X:ah)}else{am=aF.outerWidth(ah);an=aF.outerHeight(ah);aE=aF.offset()}}}}if(ao){am=ao.width;an=ao.height;al=ao.offset;aE=ao.position}aE=this.reposition.offset(aF,aE,aq);if((BROWSER.iOS>3.1&&BROWSER.iOS<4.1)||(BROWSER.iOS>=4.3&&BROWSER.iOS<4.33)||(!BROWSER.iOS&&Y==="fixed")){aE.left-=aj.scrollLeft();aE.top-=aj.scrollTop()}if(!ao||(ao&&ao.adjustable!==ah)){aE.left+=av.x===ai?am:av.x===I?am/2:0;aE.top+=av.y===J?an:av.y===I?an/2:0}}}aE.left+=ay.x+(au.x===ai?-aB:au.x===I?-aB/2:0);aE.top+=ay.y+(au.y===J?-az:au.y===I?-az/2:0);if(F.viewport){aE.adjusted=F.viewport(this,aE,aD,am,an,aB,az);if(al&&aE.adjusted.left){aE.left+=al.left}if(al&&aE.adjusted.top){aE.top+=al.top}}else{aE.adjusted={left:0,top:0}}if(!this._trigger("move",[aE,aC.elem||aC],aA)){return this}delete aE.adjusted;if(ax===ah||!C||isNaN(aE.left)||isNaN(aE.top)||aF==="mouse"||!L.isFunction(aD.effect)){ak.css(aE)}else{if(L.isFunction(aD.effect)){aD.effect.call(ak,this,L.extend({},aE));ak.queue(function(at){L(this).css({opacity:"",height:""});if(BROWSER.ie){this.style.removeAttribute("filter")}at()})}}this.positioning=ah;return this};S.reposition.offset=function(aj,an,X){if(!X[0]){return an}var aq=L(aj[0].ownerDocument),am=!!BROWSER.ie&&a.compatMode!=="CSS1Compat",ap=X[0],Y,al,C,ak;function ao(at,ar){an.left+=ar*at.scrollLeft();an.top+=ar*at.scrollTop()}do{if((al=L.css(ap,"position"))!=="static"){if(al==="fixed"){C=ap.getBoundingClientRect();ao(aq,-1)}else{C=L(ap).position();C.left+=(parseFloat(L.css(ap,"borderLeftWidth"))||0);C.top+=(parseFloat(L.css(ap,"borderTopWidth"))||0)}an.left-=C.left+(parseFloat(L.css(ap,"marginLeft"))||0);an.top-=C.top+(parseFloat(L.css(ap,"marginTop"))||0);if(!Y&&(ak=L.css(ap,"overflow"))!=="hidden"&&ak!=="visible"){Y=L(ap)}}}while((ap=ap.offsetParent));if(Y&&(Y[0]!==aq[0]||am)){ao(Y,1)}return an};var u=(q=S.reposition.Corner=function(X,C){X=(""+X).replace(/([A-Z])/," $1").replace(/middle/gi,I).toLowerCase();this.x=(X.match(/left|right/i)||X.match(/center/)||["inherit"])[0].toLowerCase();this.y=(X.match(/top|bottom|center/i)||["inherit"])[0].toLowerCase();this.forceY=!!C;var Y=X.charAt(0);this.precedance=(Y==="t"||Y==="b"?d:e)}).prototype;u.invert=function(X,C){this[X]=this[X]===B?ai:this[X]===ai?B:C||this[X]};u.string=function(){var C=this.x,X=this.y;return C===X?C:this.precedance===d||(this.forceY&&X!=="center")?X+" "+C:C+" "+X};u.abbrev=function(){var C=this.string().split(" ");return C[0].charAt(0)+(C[1]&&C[1].charAt(0)||"")};u.clone=function(){return new q(this.string(),this.forceY)};S.toggle=function(al,au){var ar=this.cache,X=this.options,ak=this.tooltip;if(au){if((/over|enter/).test(au.type)&&(/out|leave/).test(ar.event.type)&&X.show.target.add(au.target).length===X.show.target.length&&ak.has(au.relatedTarget).length){return this}ar.event=L.extend({},au)}this.waiting&&!al&&(this.hiddenDuringWait=E);if(!this.rendered){return al?this.render(1):this}else{if(this.destroyed||this.disabled){return this}}var aj=al?"show":"hide",aq=this.options[aj],ap=this.options[!al?"show":"hide"],aw=this.options.position,an=this.options.content,at=this.tooltip.css("width"),C=this.tooltip[0].offsetWidth>0,am=al||aq.target.length===1,ao=!au||aq.target.length<2||ar.target[0]===au.target,av,ay,Y,ax;if((typeof al).search("boolean|number")){al=!C}av=!ak.is(":animated")&&C===al&&ao;ay=!av?!!this._trigger(aj,[90]):H;if(ay!==ah&&al){this.focus(au)}if(!ay||av){return this}L.attr(ak[0],"data-aria-hidden",!!!al);if(al){ar.origin=L.extend({},this.mouse);if(L.isFunction(an.text)){this._updateContent(an.text,ah)}if(L.isFunction(an.title)){this._updateTitle(an.title,ah)}if(!ae&&aw.target==="mouse"&&aw.adjust.mouse){L(a).bind("mousemove."+m,this._storeMouse);ae=E}if(!at){ak.css("width",ak.outerWidth(ah))}this.reposition(au,arguments[2]);if(!at){ak.css("width","")}if(!!aq.solo){(typeof aq.solo==="string"?L(aq.solo):L(o,aq.solo)).not(ak).not(aq.target).qtip("hide",L.Event("tooltipsolo"))}}else{clearTimeout(this.timers.show);delete ar.origin;if(ae&&!L(o+'[tracking="true"]:visible',aq.solo).not(ak).length){L(a).unbind("mousemove."+m);ae=ah}this.blur(au)}after=L.proxy(function(){if(al){if(BROWSER.ie){ak[0].style.removeAttribute("filter")}ak.css("overflow","");if("string"===typeof aq.autofocus){L(this.options.show.autofocus,ak).focus()}this.options.show.target.trigger("qtip-"+this.id+"-inactive")}else{ak.css({display:"",visibility:"",opacity:"",left:"",top:""})}this._trigger(al?"visible":"hidden")},this);if(aq.effect===ah||am===ah){ak[aj]();after()}else{if(L.isFunction(aq.effect)){ak.stop(1,1);aq.effect.call(ak,this);ak.queue("fx",function(az){after();az()})}else{ak.fadeTo(90,al?1:0,after)}}if(al){aq.target.trigger("qtip-"+this.id+"-inactive")}return this};S.show=function(C){return this.toggle(E,C)};S.hide=function(C){return this.toggle(ah,C)};S.focus=function(aj){if(!this.rendered||this.destroyed){return this}var al=L(o),ak=this.tooltip,Y=parseInt(ak[0].style.zIndex,10),X=Z.zindex+al.length,C;if(!ak.hasClass(y)){if(this._trigger("focus",[X],aj)){if(Y!==X){al.each(function(){if(this.style.zIndex>Y){this.style.zIndex=this.style.zIndex-1}});al.filter("."+y).qtip("blur",aj)}ak.addClass(y)[0].style.zIndex=X}}return this};S.blur=function(C){if(!this.rendered||this.destroyed){return this}this.tooltip.removeClass(y);this._trigger("blur",[this.tooltip.css("zIndex")],C);return this};S.disable=function(C){if(this.destroyed){return this}if("boolean"!==typeof C){C=!(this.tooltip.hasClass(P)||this.disabled)}if(this.rendered){this.tooltip.toggleClass(P,C).attr("data-aria-disabled",C)}this.disabled=!!C;return this};S.enable=function(){return this.disable(ah)};S._createButton=function(){var X=this,ak=this.elements,aj=ak.tooltip,Y=this.options.content.button,C=typeof Y==="string",al=C?Y:"Close tooltip";if(ak.button){ak.button.remove()}if(Y.jquery){ak.button=Y}else{ak.button=L("<a />",{"class":"qtip-close "+(this.options.style.widget?"":m+"-icon"),title:al,"data-aria-label":al}).prepend(L("<span />",{"class":"ui-icon ui-icon-close",html:"&times;"}))}ak.button.appendTo(ak.titlebar||aj).attr("role","button").click(function(am){if(!aj.hasClass(P)){X.hide(am)}return ah})};S._updateButton=function(C){if(!this.rendered){return ah}var X=this.elements.button;if(C){this._createButton()}else{X.remove()}};function A(C){return s.concat("").join(C?"-"+C+" ":" ")}S._setWidget=function(){var C=this.options.style.widget,aj=this.elements,Y=aj.tooltip,X=Y.hasClass(P);Y.removeClass(P);P=C?"ui-state-disabled":"qtip-disabled";Y.toggleClass(P,X);Y.toggleClass("ui-helper-reset "+A(),C).toggleClass(h,this.options.style.def&&!C);if(aj.content){aj.content.toggleClass(A("content"),C)}if(aj.titlebar){aj.titlebar.toggleClass(A("header"),C)}if(aj.button){aj.button.toggleClass(m+"-icon",!C)}};function G(C){if(this.tooltip.hasClass(P)){return ah}clearTimeout(this.timers.show);clearTimeout(this.timers.hide);var X=L.proxy(function(){this.toggle(E,C)},this);if(this.options.show.delay>0){this.timers.show=setTimeout(X,this.options.show.delay)}else{X()}}function V(aj){if(this.tooltip.hasClass(P)){return ah}var X=L(aj.relatedTarget),C=X.closest(o)[0]===this.tooltip[0],Y=X[0]===this.options.show.target[0];clearTimeout(this.timers.show);clearTimeout(this.timers.hide);if(this!==X[0]&&(this.options.position.target==="mouse"&&C)||(this.options.hide.fixed&&((/mouse(out|leave|move)/).test(aj.type)&&(C||Y)))){try{aj.preventDefault();aj.stopImmediatePropagation()}catch(ak){}return}var al=L.proxy(function(){this.toggle(ah,aj)},this);if(this.options.hide.delay>0){this.timers.hide=setTimeout(al,this.options.hide.delay)}else{al()}}function ad(C){if(this.tooltip.hasClass(P)||!this.options.hide.inactive){return ah}clearTimeout(this.timers.inactive);this.timers.inactive=setTimeout(L.proxy(function(){this.hide(C)},this),this.options.hide.inactive)}function T(C){if(this.rendered&&this.tooltip[0].offsetWidth>0){this.reposition(C)}}S._storeMouse=function(C){this.mouse={pageX:C.pageX,pageY:C.pageY,type:"mousemove",scrollX:b.pageXOffset||a.body.scrollLeft||a.documentElement.scrollLeft,scrollY:b.pageYOffset||a.body.scrollTop||a.documentElement.scrollTop}};S._bind=function(C,Y,al,ak,X){var aj="."+this._id+(ak?"-"+ak:"");Y.length&&L(C).bind((Y.split?Y:Y.join(aj+" "))+aj,L.proxy(al,X||this))};S._unbind=function(C,X){L(C).unbind("."+this._id+(X?"-"+X:""))};var af="."+m;function w(C,X,Y){L(a.body).delegate(C,(X.split?X:X.join(af+" "))+af,function(){var aj=Z.api[L.attr(this,N)];aj&&!aj.disabled&&Y.apply(aj,arguments)})}L(function(){w(o,["mouseenter","mouseleave"],function(X){var aj=X.type==="mouseenter",Y=L(X.currentTarget),ak=L(X.relatedTarget||X.target),C=this.options;if(aj){this.focus(X);Y.hasClass(aa)&&!Y.hasClass(P)&&clearTimeout(this.timers.hide)}else{if(C.position.target==="mouse"&&C.hide.event&&C.show.target&&!ak.closest(C.show.target[0]).length){this.hide(X)}}Y.toggleClass(ab,aj)});w("["+N+"]",z,ad)});S._trigger=function(X,C,Y){var aj=L.Event("tooltip"+X);aj.originalEvent=(Y&&L.extend({},Y))||this.cache.event||H;this.triggering=E;this.tooltip.trigger(aj,[this].concat(C||[]));this.triggering=ah;return !aj.isDefaultPrevented()};S._assignEvents=function(){var at=this.options,ap=at.position,ar=this.tooltip,al=at.show.target,ao=at.hide.target,am=ap.container,Y=ap.viewport,ak=L(a),aj=L(a.body),an=L(b),X=at.show.event?L.trim(""+at.show.event).split(" "):[],aq=at.hide.event?L.trim(""+at.hide.event).split(" "):[],C=[];if(/mouse(out|leave)/i.test(at.hide.event)&&at.hide.leave==="window"){this._bind(ak,["mouseout","blur"],function(au){if(!/select|option/.test(au.target.nodeName)&&!au.relatedTarget){this.hide(au)}})}if(at.hide.fixed){ao=ao.add(ar.addClass(aa))}else{if(/mouse(over|enter)/i.test(at.show.event)){this._bind(ao,"mouseleave",function(){clearTimeout(this.timers.show)})}}if((""+at.hide.event).indexOf("unfocus")>-1){this._bind(am.closest("html"),["mousedown","touchstart"],function(ax){var aw=L(ax.target),av=this.rendered&&!this.tooltip.hasClass(P)&&this.tooltip[0].offsetWidth>0,au=aw.parents(o).filter(this.tooltip[0]).length>0;if(aw[0]!==this.target[0]&&aw[0]!==this.tooltip[0]&&!au&&!this.target.has(aw[0]).length&&av){this.hide(ax)}})}if("number"===typeof at.hide.inactive){this._bind(al,"qtip-"+this.id+"-inactive",ad);this._bind(ao.add(ar),Z.inactiveEvents,ad,"-inactive")}aq=L.map(aq,function(av){var au=L.inArray(av,X);if((au>-1&&ao.add(al).length===ao.length)){C.push(X.splice(au,1)[0]);return}return av});this._bind(al,X,G);this._bind(ao,aq,V);this._bind(al,C,function(au){(this.tooltip[0].offsetWidth>0?V:G).call(this,au)});this._bind(al.add(ar),"mousemove",function(ax){if("number"===typeof at.hide.distance){var aw=this.cache.origin||{},av=this.options.hide.distance,au=Math.abs;if(au(ax.pageX-aw.pageX)>=av||au(ax.pageY-aw.pageY)>=av){this.hide(ax)}}this._storeMouse(ax)});if(ap.target==="mouse"){if(ap.adjust.mouse){if(at.hide.event){this._bind(al,["mouseenter","mouseleave"],function(au){this.cache.onTarget=au.type==="mouseenter"})}this._bind(ak,"mousemove",function(au){if(this.rendered&&this.cache.onTarget&&!this.tooltip.hasClass(P)&&this.tooltip[0].offsetWidth>0){this.reposition(au)}})}}if(ap.adjust.resize||Y.length){this._bind(L.event.special.resize?Y:an,"resize",T)}if(ap.adjust.scroll){this._bind(an.add(ap.container),"scroll",T)}};S._unassignEvents=function(){var C=[this.options.show.target[0],this.options.hide.target[0],this.rendered&&this.tooltip[0],this.options.position.container[0],this.options.position.viewport[0],this.options.position.container.closest("html")[0],b,a];if(this.rendered){this._unbind(L([]).pushStack(L.grep(C,function(X){return typeof X==="object"})))}else{L(C[0]).unbind("."+this._id+"-create")}};function ac(aj,X,C){var ak,au,ao,Y,ar,al=L(a.body),aq=aj[0]===a?al:aj,ap=(aj.metadata)?aj.metadata(C.metadata):H,at=C.metadata.type==="html5"&&ap?ap[C.metadata.name]:H,am=aj.data(C.metadata.name||"qtipopts");try{am=typeof am==="string"?L.parseJSON(am):am}catch(an){}Y=L.extend(E,{},Z.defaults,C,typeof am==="object"?D(am):H,D(at||ap));au=Y.position;Y.id=X;if("boolean"===typeof Y.content.text){ao=aj.attr(Y.content.attr);if(Y.content.attr!==ah&&ao){Y.content.text=ao}else{return ah}}if(!au.container.length){au.container=al}if(au.target===ah){au.target=aq}if(Y.show.target===ah){Y.show.target=aq}if(Y.show.solo===E){Y.show.solo=au.container.closest("body")}if(Y.hide.target===ah){Y.hide.target=aq}if(Y.position.viewport===E){Y.position.viewport=au.container}au.container=au.container.eq(0);au.at=new q(au.at,E);au.my=new q(au.my);if(aj.data(m)){if(Y.overwrite){aj.qtip("destroy")}else{if(Y.overwrite===ah){return ah}}}aj.attr(R,X);if(Y.suppress&&(ar=aj.attr("title"))){aj.removeAttr("title").attr(r,ar).attr("title","")}ak=new g(aj,Y,X,!!ao);aj.data(m,ak);aj.one("remove.qtip-"+X+" removeqtip.qtip-"+X,function(){var av;if((av=L(this).data(m))){av.destroy()}});return ak}Z=L.fn.qtip=function(X,al,am){var an=(""+X).toLowerCase(),ak=H,C=L.makeArray(arguments).slice(1),aj=C[C.length-1],Y=this[0]?L.data(this[0],m):H;if((!arguments.length&&Y)||an==="api"){return Y}else{if("string"===typeof X){this.each(function(){var ao=L.data(this,m);if(!ao){return E}if(aj&&aj.timeStamp){ao.cache.event=aj}if(al&&(an==="option"||an==="options")){if(am!==c||L.isPlainObject(al)){ao.set(al,am)}else{ak=ao.get(al);return ah}}else{if(ao[an]){ao[an].apply(ao,C)}}});return ak!==H?ak:this}else{if("object"===typeof X||!arguments.length){Y=D(L.extend(E,{},X));return Z.bind.call(this,Y,aj)}}}};Z.bind=function(X,C){return this.each(function(al){var aj,Y,ak,an,am,ap;ap=L.isArray(X.id)?X.id[al]:X.id;ap=!ap||ap===ah||ap.length<1||Z.api[ap]?Z.nextid++:ap;an=".qtip-"+ap+"-create";am=ac(L(this),ap,X);if(am===ah){return E}else{Z.api[ap]=am}aj=am.options;L.each(F,function(){if(this.initialize==="initialize"){this(am)}});Y={show:aj.show.target,hide:aj.hide.target};ak={show:L.trim(""+aj.show.event).replace(/ /g,an+" ")+an,hide:L.trim(""+aj.hide.event).replace(/ /g,an+" ")+an};if(/mouse(over|enter)/i.test(ak.show)&&!/mouse(out|leave)/i.test(ak.hide)){ak.hide+=" mouseleave"+an}Y.show.bind("mousemove"+an,function(aq){am._storeMouse(aq);am.cache.onTarget=E});function ao(ar){function aq(){am.render(typeof ar==="object"||aj.show.ready);Y.show.add(Y.hide).unbind(an)}if(am.disabled){return ah}am.cache.event=L.extend({},ar);am.cache.target=ar?L(ar.target):[c];if(aj.show.delay>0){clearTimeout(am.timers.show);am.timers.show=setTimeout(aq,aj.show.delay);if(ak.show!==ak.hide){Y.hide.bind(ak.hide,function(){clearTimeout(am.timers.show)})}}else{aq()}}Y.show.bind(ak.show,ao);if(aj.show.ready||aj.prerender){ao(C)}})};Z.api={};L.each({attr:function(C,ak){if(this.length){var X=this[0],aj="title",Y=L.data(X,"qtip");if(C===aj&&Y&&"object"===typeof Y&&Y.options.suppress){if(arguments.length<2){return L.attr(X,r)}if(Y&&Y.options.content.attr===aj&&Y.cache.attr){Y.set("content.text",ak)}return this.attr(r,ak)}}return L.fn["attr"+x].apply(this,arguments)},clone:function(X){var aj=L([]),Y="title",C=L.fn["clone"+x].apply(this,arguments);if(!X){C.filter("["+r+"]").attr("title",function(){return L.attr(this,r)}).removeAttr(r)}return C}},function(X,Y){if(!Y||L.fn[X+x]){return E}var C=L.fn[X+x]=L.fn[X];L.fn[X]=function(){return Y.apply(this,arguments)||C.apply(this,arguments)}});if(!L.ui){L["cleanData"+x]=L.cleanData;L.cleanData=function(C){for(var X=0,Y;(Y=L(C[X])).length;X++){if(Y.attr(R)){try{Y.triggerHandler("removeqtip")}catch(aj){}}}L["cleanData"+x].apply(this,arguments)}}Z.version="2.1.1";Z.nextid=0;Z.inactiveEvents=z;Z.zindex=15000;Z.defaults={prerender:ah,id:ah,overwrite:E,suppress:E,content:{text:E,attr:"title",title:ah,button:ah},position:{my:"top left",at:"bottom right",target:ah,container:ah,viewport:ah,adjust:{x:0,y:0,mouse:E,scroll:E,resize:E,method:"flipinvert flipinvert"},effect:function(X,Y,C){L(this).animate(Y,{duration:200,queue:ah})}},show:{target:ah,event:"mouseenter",effect:E,delay:90,solo:ah,ready:ah,autofocus:ah},hide:{target:ah,event:"mouseleave",effect:E,delay:0,fixed:ah,inactive:ah,leave:"window",distance:ah},style:{classes:"",widget:ah,width:ah,height:ah,def:E},events:{render:H,move:H,show:H,hide:H,toggle:H,visible:H,hidden:H,focus:H,blur:H}};F.viewport=function(ax,aF,aD,ak,al,aB,aA){var aE=aD.target,aj=ax.elements.tooltip,av=aD.my,ay=aD.at,az=aD.adjust,C=az.method.split(" "),aq=C[0],ao=C[1]||C[0],aC=aD.viewport,ar=aD.container,aw=ax.cache,au=ax.plugins.tip,Y={left:0,top:0},X,an,am;if(!aC.jquery||aE[0]===b||aE[0]===a.body||az.method==="none"){return Y}X=aj.css("position")==="fixed";aC={elem:aC,width:aC[0]===b?aC.width():aC.outerWidth(ah),height:aC[0]===b?aC.height():aC.outerHeight(ah),scrollleft:X?0:aC.scrollLeft(),scrolltop:X?0:aC.scrollTop(),offset:aC.offset()||{left:0,top:0}};ar={elem:ar,scrollLeft:ar.scrollLeft(),scrollTop:ar.scrollTop(),offset:ar.offset()||{left:0,top:0}};function ap(aG,at,aK,aW,aO,aM,aV,aY,aQ){var aL=aF[aO],aR=av[aG],aX=ay[aG],aZ=aK===O,aT=-ar.offset[aO]+aC.offset[aO]+aC["scroll"+aO],aN=aR===aO?aQ:aR===aM?-aQ:-aQ/2,aS=aX===aO?aY:aX===aM?-aY:-aY/2,aH=au&&au.size?au.size[aV]||0:0,aU=au&&au.corner&&au.corner.precedance===aG&&!aZ?aH:0,aJ=aT-aL+aU,aI=aL+aQ-aC[aV]-aT+aU,aP=aN-(av.precedance===aG||aR===av[at]?aS:0)-(aX===I?aY/2:0);if(aZ){aU=au&&au.corner&&au.corner.precedance===at?aH:0;aP=(aR===aO?1:-1)*aN-aU;aF[aO]+=aJ>0?aJ:aI>0?-aI:0;aF[aO]=Math.max(-ar.offset[aO]+aC.offset[aO]+(aU&&au.corner[aG]===I?au.offset:0),aL-aP,Math.min(Math.max(-ar.offset[aO]+aC.offset[aO]+aC[aV],aL+aP),aF[aO]))}else{aW*=(aK===U?2:0);if(aJ>0&&(aR!==aO||aI>0)){aF[aO]-=aP+aW;an.invert(aG,aO)}else{if(aI>0&&(aR!==aM||aJ>0)){aF[aO]-=(aR===I?-aP:aP)+aW;an.invert(aG,aM)}}if(aF[aO]<aT&&-aF[aO]>aI){aF[aO]=aL;an=av.clone()}}return aF[aO]-aL}if(aq!=="shift"||ao!=="shift"){an=av.clone()}Y={left:aq!=="none"?ap(e,d,aq,az.x,B,ai,j,ak,aB):0,top:ao!=="none"?ap(d,e,ao,az.y,M,J,K,al,aA):0};if(an&&aw.lastClass!==(am=m+"-pos-"+an.abbrev())){aj.removeClass(ax.cache.lastClass).addClass((ax.cache.lastClass=am))}return Y}}))}(window,document));
/*!
 * jQuery UI Position v1.10.0
 * http://jqueryui.com
 *
 * Copyright 2013 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/position/
 */
(function(e,c){e.ui=e.ui||{};var m,n=Math.max,r=Math.abs,p=Math.round,d=/left|center|right/,h=/top|center|bottom/,a=/[\+\-]\d+%?/,o=/^\w+/,b=/%$/,g=e.fn.position;function q(u,t,s){return[parseInt(u[0],10)*(b.test(u[0])?t/100:1),parseInt(u[1],10)*(b.test(u[1])?s/100:1)]}function j(s,t){return parseInt(e.css(s,t),10)||0}function f(t){var s=t[0];if(s.nodeType===9){return{width:t.width(),height:t.height(),offset:{top:0,left:0}}}if(e.isWindow(s)){return{width:t.width(),height:t.height(),offset:{top:t.scrollTop(),left:t.scrollLeft()}}}if(s.preventDefault){return{width:0,height:0,offset:{top:s.pageY,left:s.pageX}}}return{width:t.outerWidth(),height:t.outerHeight(),offset:t.offset()}}e.position={scrollbarWidth:function(){if(m!==c){return m}var t,s,v=e("<div style='display:block;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),u=v.children()[0];e("body").append(v);t=u.offsetWidth;v.css("overflow","scroll");s=u.offsetWidth;if(t===s){s=v[0].clientWidth}v.remove();return(m=t-s)},getScrollInfo:function(w){var v=w.isWindow?"":w.element.css("overflow-x"),u=w.isWindow?"":w.element.css("overflow-y"),t=v==="scroll"||(v==="auto"&&w.width<w.element[0].scrollWidth),s=u==="scroll"||(u==="auto"&&w.height<w.element[0].scrollHeight);return{width:t?e.position.scrollbarWidth():0,height:s?e.position.scrollbarWidth():0}},getWithinInfo:function(t){var u=e(t||window),s=e.isWindow(u[0]);return{element:u,isWindow:s,offset:u.offset()||{left:0,top:0},scrollLeft:u.scrollLeft(),scrollTop:u.scrollTop(),width:s?u.width():u.outerWidth(),height:s?u.height():u.outerHeight()}}};e.fn.position=function(C){if(!C||!C.of){return g.apply(this,arguments)}C=e.extend({},C);var D,z,x,B,w,s,y=e(C.of),v=e.position.getWithinInfo(C.within),t=e.position.getScrollInfo(v),A=(C.collision||"flip").split(" "),u={};s=f(y);if(y[0].preventDefault){C.at="left top"}z=s.width;x=s.height;B=s.offset;w=e.extend({},B);e.each(["my","at"],function(){var G=(C[this]||"").split(" "),F,E;if(G.length===1){G=d.test(G[0])?G.concat(["center"]):h.test(G[0])?["center"].concat(G):["center","center"]}G[0]=d.test(G[0])?G[0]:"center";G[1]=h.test(G[1])?G[1]:"center";F=a.exec(G[0]);E=a.exec(G[1]);u[this]=[F?F[0]:0,E?E[0]:0];C[this]=[o.exec(G[0])[0],o.exec(G[1])[0]]});if(A.length===1){A[1]=A[0]}if(C.at[0]==="right"){w.left+=z}else{if(C.at[0]==="center"){w.left+=z/2}}if(C.at[1]==="bottom"){w.top+=x}else{if(C.at[1]==="center"){w.top+=x/2}}D=q(u.at,z,x);w.left+=D[0];w.top+=D[1];return this.each(function(){var F,O,H=e(this),J=H.outerWidth(),G=H.outerHeight(),I=j(this,"marginLeft"),E=j(this,"marginTop"),N=J+I+j(this,"marginRight")+t.width,M=G+E+j(this,"marginBottom")+t.height,K=e.extend({},w),L=q(u.my,H.outerWidth(),H.outerHeight());if(C.my[0]==="right"){K.left-=J}else{if(C.my[0]==="center"){K.left-=J/2}}if(C.my[1]==="bottom"){K.top-=G}else{if(C.my[1]==="center"){K.top-=G/2}}K.left+=L[0];K.top+=L[1];if(!e.support.offsetFractions){K.left=p(K.left);K.top=p(K.top)}F={marginLeft:I,marginTop:E};e.each(["left","top"],function(Q,P){if(e.ui.position[A[Q]]){e.ui.position[A[Q]][P](K,{targetWidth:z,targetHeight:x,elemWidth:J,elemHeight:G,collisionPosition:F,collisionWidth:N,collisionHeight:M,offset:[D[0]+L[0],D[1]+L[1]],my:C.my,at:C.at,within:v,elem:H})}});if(C.using){O=function(S){var U=B.left-K.left,R=U+z-J,T=B.top-K.top,Q=T+x-G,P={target:{element:y,left:B.left,top:B.top,width:z,height:x},element:{element:H,left:K.left,top:K.top,width:J,height:G},horizontal:R<0?"left":U>0?"right":"center",vertical:Q<0?"top":T>0?"bottom":"middle"};if(z<J&&r(U+R)<z){P.horizontal="center"}if(x<G&&r(T+Q)<x){P.vertical="middle"}if(n(r(U),r(R))>n(r(T),r(Q))){P.important="horizontal"}else{P.important="vertical"}C.using.call(this,S,P)}}H.offset(e.extend(K,{using:O}))})};e.ui.position={fit:{left:function(w,v){var u=v.within,y=u.isWindow?u.scrollLeft:u.offset.left,A=u.width,x=w.left-v.collisionPosition.marginLeft,z=y-x,t=x+v.collisionWidth-A-y,s;if(v.collisionWidth>A){if(z>0&&t<=0){s=w.left+z+v.collisionWidth-A-y;w.left+=z-s}else{if(t>0&&z<=0){w.left=y}else{if(z>t){w.left=y+A-v.collisionWidth}else{w.left=y}}}}else{if(z>0){w.left+=z}else{if(t>0){w.left-=t}else{w.left=n(w.left-x,w.left)}}}},top:function(v,u){var t=u.within,z=t.isWindow?t.scrollTop:t.offset.top,A=u.within.height,x=v.top-u.collisionPosition.marginTop,y=z-x,w=x+u.collisionHeight-A-z,s;if(u.collisionHeight>A){if(y>0&&w<=0){s=v.top+y+u.collisionHeight-A-z;v.top+=y-s}else{if(w>0&&y<=0){v.top=z}else{if(y>w){v.top=z+A-u.collisionHeight}else{v.top=z}}}}else{if(y>0){v.top+=y}else{if(w>0){v.top-=w}else{v.top=n(v.top-x,v.top)}}}}},flip:{left:function(y,x){var w=x.within,C=w.offset.left+w.scrollLeft,F=w.width,u=w.isWindow?w.scrollLeft:w.offset.left,z=y.left-x.collisionPosition.marginLeft,D=z-u,t=z+x.collisionWidth-F-u,B=x.my[0]==="left"?-x.elemWidth:x.my[0]==="right"?x.elemWidth:0,E=x.at[0]==="left"?x.targetWidth:x.at[0]==="right"?-x.targetWidth:0,v=-2*x.offset[0],s,A;if(D<0){s=y.left+B+E+v+x.collisionWidth-F-C;if(s<0||s<r(D)){y.left+=B+E+v}}else{if(t>0){A=y.left-x.collisionPosition.marginLeft+B+E+v-u;if(A>0||r(A)<t){y.left+=B+E+v}}}},top:function(x,w){var v=w.within,E=v.offset.top+v.scrollTop,F=v.height,s=v.isWindow?v.scrollTop:v.offset.top,z=x.top-w.collisionPosition.marginTop,B=z-s,y=z+w.collisionHeight-F-s,C=w.my[1]==="top",A=C?-w.elemHeight:w.my[1]==="bottom"?w.elemHeight:0,G=w.at[1]==="top"?w.targetHeight:w.at[1]==="bottom"?-w.targetHeight:0,u=-2*w.offset[1],D,t;if(B<0){t=x.top+A+G+u+w.collisionHeight-F-E;if((x.top+A+G+u)>B&&(t<0||t<r(B))){x.top+=A+G+u}}else{if(y>0){D=x.top-w.collisionPosition.marginTop+A+G+u-s;if((x.top+A+G+u)>y&&(D>0||r(D)<y)){x.top+=A+G+u}}}}},flipfit:{left:function(){e.ui.position.flip.left.apply(this,arguments);e.ui.position.fit.left.apply(this,arguments)},top:function(){e.ui.position.flip.top.apply(this,arguments);e.ui.position.fit.top.apply(this,arguments)}}};(function(){var w,y,t,v,u,s=document.getElementsByTagName("body")[0],x=document.createElement("div");w=document.createElement(s?"div":"body");t={visibility:"hidden",width:0,height:0,border:0,margin:0,background:"none"};if(s){e.extend(t,{position:"absolute",left:"-1000px",top:"-1000px"})}for(u in t){w.style[u]=t[u]}w.appendChild(x);y=s||document.documentElement;y.insertBefore(w,y.firstChild);x.style.cssText="position: absolute; left: 10.7432222px;";v=e(x).offset().left;e.support.offsetFractions=v>10&&v<11;w.innerHTML="";y.removeChild(w)})()}(jQuery));
/*!
 * jQuery contextMenu - Plugin for simple contextMenu handling
 *
 * Version: 1.6.6
 *
 * Authors: Rodney Rehm, Addy Osmani (patches for FF)
 * Web: http://medialize.github.com/jQuery-contextMenu/
 *
 * Licensed under
 *   MIT License http://www.opensource.org/licenses/mit-license
 *   GPL v3 http://opensource.org/licenses/GPL-3.0
 *
 */
(function(c,d){c.support.htmlMenuitem=("HTMLMenuItemElement" in window);c.support.htmlCommand=("HTMLCommandElement" in window);c.support.eventSelectstart=("onselectstart" in document.documentElement);if(!c.ui||!c.ui.widget){var t=c.cleanData;c.cleanData=function(v){for(var w=0,x;(x=v[w])!=null;w++){try{c(x).triggerHandler("remove")}catch(y){}}t(v)}}var s=null,b=false,q=c(window),h=0,g={},o={},n={},j={selector:null,appendTo:null,trigger:"right",autoHide:false,delay:200,reposition:true,determinePosition:function(v){if(c.ui&&c.ui.position){v.css("display","block").position({my:"center top",at:"center bottom",of:this,offset:"0 5",collision:"fit"}).css("display","none")}else{var w=this.offset();w.top+=this.outerHeight();w.left+=this.outerWidth()/2-v.outerWidth()/2;v.css(w)}},position:function(z,D,C){var B=this,A;if(!D&&!C){z.determinePosition.call(this,z.$menu);return}else{if(D==="maintain"&&C==="maintain"){A=z.$menu.position()}else{A={top:C,left:D}}}var v=q.scrollTop()+q.height(),E=q.scrollLeft()+q.width(),F=z.$menu.height(),w=z.$menu.width();if(A.top+F>v){A.top-=F}if(A.left+w>E){A.left-=w}z.$menu.css(A)},positionSubmenu:function(v){if(c.ui&&c.ui.position){v.css("display","block").position({my:"left top",at:"right top",of:this,collision:"flipfit fit"}).css("display","")}else{var w={top:0,left:this.outerWidth()};v.css(w)}},zIndex:1,animation:{duration:50,show:"slideDown",hide:"slideUp"},events:{show:c.noop,hide:c.noop},callback:null,items:{}},m={timer:null,pageX:null,pageY:null},e=function(x){var w=0,v=x;while(true){w=Math.max(w,parseInt(v.css("z-index"),10)||0);v=v.parent();if(!v||!v.length||"html body".indexOf(v.prop("nodeName").toLowerCase())>-1){break}}return w},u={abortevent:function(v){v.preventDefault();v.stopImmediatePropagation()},contextmenu:function(x){var w=c(this);x.preventDefault();x.stopImmediatePropagation();if(x.data.trigger!="right"&&x.originalEvent){return}if(w.hasClass("context-menu-active")){return}if(!w.hasClass("context-menu-disabled")){s=w;if(x.data.build){var v=x.data.build(s,x);if(v===false){return}x.data=c.extend(true,{},j,x.data,v||{});if(!x.data.items||c.isEmptyObject(x.data.items)){if(window.console){(console.error||console.log)("No items specified to show in contextMenu")}throw new Error("No Items specified")}x.data.$trigger=s;f.create(x.data)}f.show.call(w,x.data,x.pageX,x.pageY)}},click:function(v){v.preventDefault();v.stopImmediatePropagation();c(this).trigger(c.Event("contextmenu",{data:v.data,pageX:v.pageX,pageY:v.pageY}))},mousedown:function(w){var v=c(this);if(s&&s.length&&!s.is(v)){s.data("contextMenu").$menu.trigger("contextmenu:hide")}if(w.button==2){s=v.data("contextMenuActive",true)}},mouseup:function(w){var v=c(this);if(v.data("contextMenuActive")&&s&&s.length&&s.is(v)&&!v.hasClass("context-menu-disabled")){w.preventDefault();w.stopImmediatePropagation();s=v;v.trigger(c.Event("contextmenu",{data:w.data,pageX:w.pageX,pageY:w.pageY}))}v.removeData("contextMenuActive")},mouseenter:function(x){var w=c(this),v=c(x.relatedTarget),y=c(document);if(v.is(".context-menu-list")||v.closest(".context-menu-list").length){return}if(s&&s.length){return}m.pageX=x.pageX;m.pageY=x.pageY;m.data=x.data;y.on("mousemove.contextMenuShow",u.mousemove);m.timer=setTimeout(function(){m.timer=null;y.off("mousemove.contextMenuShow");s=w;w.trigger(c.Event("contextmenu",{data:m.data,pageX:m.pageX,pageY:m.pageY}))},x.data.delay)},mousemove:function(v){m.pageX=v.pageX;m.pageY=v.pageY},mouseleave:function(w){var v=c(w.relatedTarget);if(v.is(".context-menu-list")||v.closest(".context-menu-list").length){return}try{clearTimeout(m.timer)}catch(w){}m.timer=null},layerClick:function(A){var C=c(this),E=C.data("contextMenuRoot"),w=false,z=A.button,F=A.pageX,D=A.pageY,B,v,G;A.preventDefault();A.stopImmediatePropagation();setTimeout(function(){var I,H,y;var x=((E.trigger=="left"&&z===0)||(E.trigger=="right"&&z===2));if(document.elementFromPoint){E.$layer.hide();B=document.elementFromPoint(F-q.scrollLeft(),D-q.scrollTop());E.$layer.show()}if(E.reposition&&x){if(document.elementFromPoint){if(E.$trigger.is(B)||E.$trigger.has(B).length){E.position.call(E.$trigger,E,F,D);return}}else{v=E.$trigger.offset();I=c(window);v.top+=I.scrollTop();if(v.top<=A.pageY){v.left+=I.scrollLeft();if(v.left<=A.pageX){v.bottom=v.top+E.$trigger.outerHeight();if(v.bottom>=A.pageY){v.right=v.left+E.$trigger.outerWidth();if(v.right>=A.pageX){E.position.call(E.$trigger,E,F,D);return}}}}}}if(B&&x){E.$trigger.one("contextmenu:hidden",function(){c(B).contextMenu({x:F,y:D})})}E.$menu.trigger("contextmenu:hide")},50)},keyStop:function(w,v){if(!v.isInput){w.preventDefault()}w.stopPropagation()},key:function(z){var x=s.data("contextMenu")||{};switch(z.keyCode){case 9:case 38:u.keyStop(z,x);if(x.isInput){if(z.keyCode==9&&z.shiftKey){z.preventDefault();x.$selected&&x.$selected.find("input, textarea, select").blur();x.$menu.trigger("prevcommand");return}else{if(z.keyCode==38&&x.$selected.find("input, textarea, select").prop("type")=="checkbox"){z.preventDefault();return}}}else{if(z.keyCode!=9||z.shiftKey){x.$menu.trigger("prevcommand");return}}case 40:u.keyStop(z,x);if(x.isInput){if(z.keyCode==9){z.preventDefault();x.$selected&&x.$selected.find("input, textarea, select").blur();x.$menu.trigger("nextcommand");return}else{if(z.keyCode==40&&x.$selected.find("input, textarea, select").prop("type")=="checkbox"){z.preventDefault();return}}}else{x.$menu.trigger("nextcommand");return}break;case 37:u.keyStop(z,x);if(x.isInput||!x.$selected||!x.$selected.length){break}if(!x.$selected.parent().hasClass("context-menu-root")){var y=x.$selected.parent().parent();x.$selected.trigger("contextmenu:blur");x.$selected=y;return}break;case 39:u.keyStop(z,x);if(x.isInput||!x.$selected||!x.$selected.length){break}var w=x.$selected.data("contextMenu")||{};if(w.$menu&&x.$selected.hasClass("context-menu-submenu")){x.$selected=null;w.$selected=null;w.$menu.trigger("nextcommand");return}break;case 35:case 36:if(x.$selected&&x.$selected.find("input, textarea, select").length){return}else{(x.$selected&&x.$selected.parent()||x.$menu).children(":not(.disabled, .not-selectable)")[z.keyCode==36?"first":"last"]().trigger("contextmenu:focus");z.preventDefault();return}break;case 13:u.keyStop(z,x);if(x.isInput){if(x.$selected&&!x.$selected.is("textarea, select")){z.preventDefault();return}break}x.$selected&&x.$selected.trigger("mouseup");return;case 32:case 33:case 34:u.keyStop(z,x);return;case 27:u.keyStop(z,x);x.$menu.trigger("contextmenu:hide");return;default:var v=(String.fromCharCode(z.keyCode)).toUpperCase();if(x.accesskeys[v]){x.accesskeys[v].$node.trigger(x.accesskeys[v].$menu?"contextmenu:focus":"mouseup");return}break}z.stopPropagation();x.$selected&&x.$selected.trigger(z)},prevItem:function(z){z.stopPropagation();var y=c(this).data("contextMenu")||{};if(y.$selected){var v=y.$selected;y=y.$selected.parent().data("contextMenu")||{};y.$selected=v}var x=y.$menu.children(),w=!y.$selected||!y.$selected.prev().length?x.last():y.$selected.prev(),B=w;while(w.hasClass("disabled")||w.hasClass("not-selectable")){if(w.prev().length){w=w.prev()}else{w=x.last()}if(w.is(B)){return}}if(y.$selected){u.itemMouseleave.call(y.$selected.get(0),z)}u.itemMouseenter.call(w.get(0),z);var A=w.find("input, textarea, select");if(A.length){A.focus()}},nextItem:function(z){z.stopPropagation();var y=c(this).data("contextMenu")||{};if(y.$selected){var v=y.$selected;y=y.$selected.parent().data("contextMenu")||{};y.$selected=v}var x=y.$menu.children(),w=!y.$selected||!y.$selected.next().length?x.first():y.$selected.next(),B=w;while(w.hasClass("disabled")||w.hasClass("not-selectable")){if(w.next().length){w=w.next()}else{w=x.first()}if(w.is(B)){return}}if(y.$selected){u.itemMouseleave.call(y.$selected.get(0),z)}u.itemMouseenter.call(w.get(0),z);var A=w.find("input, textarea, select");if(A.length){A.focus()}},focusInput:function(z){var y=c(this).closest(".context-menu-item"),x=y.data(),w=x.contextMenu,v=x.contextMenuRoot;v.$selected=w.$selected=y;v.isInput=w.isInput=true},blurInput:function(z){var y=c(this).closest(".context-menu-item"),x=y.data(),w=x.contextMenu,v=x.contextMenuRoot;v.isInput=w.isInput=false},menuMouseenter:function(w){var v=c(this).data().contextMenuRoot;v.hovering=true},menuMouseleave:function(w){var v=c(this).data().contextMenuRoot;if(v.$layer&&v.$layer.is(w.relatedTarget)){v.hovering=false}},itemMouseenter:function(z){var y=c(this),x=y.data(),w=x.contextMenu,v=x.contextMenuRoot;v.hovering=true;if(z&&v.$layer&&v.$layer.is(z.relatedTarget)){z.preventDefault();z.stopImmediatePropagation()}(w.$menu?w:v).$menu.children(".hover").trigger("contextmenu:blur");if(y.hasClass("disabled")||y.hasClass("not-selectable")){w.$selected=null;return}y.trigger("contextmenu:focus")},itemMouseleave:function(z){var y=c(this),x=y.data(),w=x.contextMenu,v=x.contextMenuRoot;if(v!==w&&v.$layer&&v.$layer.is(z.relatedTarget)){v.$selected&&v.$selected.trigger("contextmenu:blur");z.preventDefault();z.stopImmediatePropagation();v.$selected=w.$selected=w.$node;return}y.trigger("contextmenu:blur")},itemClick:function(A){var z=c(this),y=z.data(),x=y.contextMenu,v=y.contextMenuRoot,w=y.contextMenuKey,B;if(!x.items[w]||z.is(".disabled, .context-menu-submenu, .context-menu-separator, .not-selectable")){return}A.preventDefault();A.stopImmediatePropagation();if(c.isFunction(v.callbacks[w])&&Object.prototype.hasOwnProperty.call(v.callbacks,w)){B=v.callbacks[w]}else{if(c.isFunction(v.callback)){B=v.callback}else{return}}if(B.call(v.$trigger,w,v)!==false){v.$menu.trigger("contextmenu:hide")}else{if(v.$menu.parent().length){f.update.call(v.$trigger,v)}}},inputClick:function(v){v.stopImmediatePropagation()},hideMenu:function(x,w){var v=c(this).data("contextMenuRoot");f.hide.call(v.$trigger,v,w&&w.force)},focusItem:function(z){z.stopPropagation();var y=c(this),x=y.data(),w=x.contextMenu,v=x.contextMenuRoot;y.addClass("hover").siblings(".hover").trigger("contextmenu:blur");w.$selected=v.$selected=y;if(w.$node){v.positionSubmenu.call(w.$node,w.$menu)}},blurItem:function(z){z.stopPropagation();var y=c(this),x=y.data(),w=x.contextMenu,v=x.contextMenuRoot;y.removeClass("hover");w.$selected=null}},f={show:function(A,w,C){var v=c(this),B,z={};c("#context-menu-layer").trigger("mousedown");A.$trigger=v;if(A.events.show.call(v,A)===false){s=null;return}f.update.call(v,A);A.position.call(v,A,w,C);if(A.zIndex){z.zIndex=e(v)+A.zIndex}f.layer.call(A.$menu,A,z.zIndex);A.$menu.find("ul").css("zIndex",z.zIndex+1);A.$menu.css(z)[A.animation.show](A.animation.duration,function(){v.trigger("contextmenu:visible")});v.data("contextMenu",A).addClass("context-menu-active");c(document).off("keydown.contextMenu").on("keydown.contextMenu",u.key);if(A.autoHide){c(document).on("mousemove.contextMenuAutoHide",function(x){var y=v.offset();y.right=y.left+v.outerWidth();y.bottom=y.top+v.outerHeight();if(A.$layer&&!A.hovering&&(!(x.pageX>=y.left&&x.pageX<=y.right)||!(x.pageY>=y.top&&x.pageY<=y.bottom))){A.$menu.trigger("contextmenu:hide")}})}},hide:function(w,x){var v=c(this);if(!w){w=v.data("contextMenu")||{}}if(!x&&w.events&&w.events.hide.call(v,w)===false){return}v.removeData("contextMenu").removeClass("context-menu-active");if(w.$layer){setTimeout((function(z){return function(){z.remove()}})(w.$layer),10);try{delete w.$layer}catch(y){w.$layer=null}}s=null;w.$menu.find(".hover").trigger("contextmenu:blur");w.$selected=null;c(document).off(".contextMenuAutoHide").off("keydown.contextMenu");w.$menu&&w.$menu[w.animation.hide](w.animation.duration,function(){if(w.build){w.$menu.remove();c.each(w,function(z,A){switch(z){case"ns":case"selector":case"build":case"trigger":return true;default:w[z]=d;try{delete w[z]}catch(B){}return true}})}setTimeout(function(){v.trigger("contextmenu:hidden")},10)})},create:function(w,v){if(v===d){v=w}w.$menu=c('<ul class="context-menu-list"></ul>').addClass(w.className||"").data({contextMenu:w,contextMenuRoot:v});c.each(["callbacks","commands","inputs"],function(y,x){w[x]={};if(!v[x]){v[x]={}}});v.accesskeys||(v.accesskeys={});c.each(w.items,function(z,A){var E=c('<li class="context-menu-item"></li>').addClass(A.className||""),x=null,D=null;E.on("click",c.noop);A.$node=E.data({contextMenu:w,contextMenuRoot:v,contextMenuKey:z});if(A.accesskey){var B=p(A.accesskey);for(var y=0,C;C=B[y];y++){if(!v.accesskeys[C]){v.accesskeys[C]=A;A._name=A.name.replace(new RegExp("("+C+")","i"),'<span class="context-menu-accesskey">$1</span>');break}}}if(typeof A=="string"){E.addClass("context-menu-separator not-selectable")}else{if(A.type&&n[A.type]){n[A.type].call(E,A,w,v);c.each([w,v],function(G,F){F.commands[z]=A;if(c.isFunction(A.callback)){F.callbacks[z]=A.callback}})}else{if(A.type=="html"){E.addClass("context-menu-html not-selectable")}else{if(A.type){x=c("<label></label>").appendTo(E);c("<span></span>").html(A._name||A.name).appendTo(x);E.addClass("context-menu-input");w.hasTypes=true;c.each([w,v],function(G,F){F.commands[z]=A;F.inputs[z]=A})}else{if(A.items){A.type="sub"}}}switch(A.type){case"text":D=c('<input type="text" value="1" name="" value="">').attr("name","context-menu-input-"+z).val(A.value||"").appendTo(x);break;case"textarea":D=c('<textarea name=""></textarea>').attr("name","context-menu-input-"+z).val(A.value||"").appendTo(x);if(A.height){D.height(A.height)}break;case"checkbox":D=c('<input type="checkbox" value="1" name="" value="">').attr("name","context-menu-input-"+z).val(A.value||"").prop("checked",!!A.selected).prependTo(x);break;case"radio":D=c('<input type="radio" value="1" name="" value="">').attr("name","context-menu-input-"+A.radio).val(A.value||"").prop("checked",!!A.selected).prependTo(x);break;case"select":D=c('<select name="">').attr("name","context-menu-input-"+z).appendTo(x);if(A.options){c.each(A.options,function(F,G){c("<option></option>").val(F).text(G).appendTo(D)});D.val(A.selected)}break;case"sub":c("<span></span>").html(A._name||A.name).appendTo(E);A.appendTo=A.$node;f.create(A,v);E.data("contextMenu",A).addClass("context-menu-submenu");A.callback=null;break;case"html":c(A.html).appendTo(E);break;default:c.each([w,v],function(G,F){F.commands[z]=A;if(c.isFunction(A.callback)){F.callbacks[z]=A.callback}});c("<span></span>").html(A._name||A.name||"").appendTo(E);break}if(A.type&&A.type!="sub"&&A.type!="html"){D.on("focus",u.focusInput).on("blur",u.blurInput);if(A.events){D.on(A.events,w)}}if(A.icon){E.addClass("icon icon-"+A.icon)}}}A.$input=D;A.$label=x;E.appendTo(w.$menu);if(!w.hasTypes&&c.support.eventSelectstart){E.on("selectstart.disableTextSelect",u.abortevent)}});if(!w.$node){w.$menu.css("display","none").addClass("context-menu-root")}w.$menu.appendTo(w.appendTo||document.body)},resize:function(v,w){v.css({position:"absolute",display:"block"});v.data("width",Math.ceil(v.width())+1);v.css({position:"static",minWidth:"0px",maxWidth:"100000px"});v.find("> li > ul").each(function(){f.resize(c(this),true)});if(!w){v.find("ul").andSelf().css({position:"",display:"",minWidth:"",maxWidth:""}).width(function(){return c(this).data("width")})}},update:function(x,w){var v=this;if(w===d){w=x;f.resize(x.$menu)}x.$menu.children().each(function(){var y=c(this),z=y.data("contextMenuKey"),B=x.items[z],A=(c.isFunction(B.disabled)&&B.disabled.call(v,z,w))||B.disabled===true;y[A?"addClass":"removeClass"]("disabled");if(B.type){y.find("input, select, textarea").prop("disabled",A);switch(B.type){case"text":case"textarea":B.$input.val(B.value||"");break;case"checkbox":case"radio":B.$input.val(B.value||"").prop("checked",!!B.selected);break;case"select":B.$input.val(B.selected||"");break}}if(B.$menu){f.update.call(v,B,w)}})},layer:function(w,x){var v=w.$layer=c('<div id="context-menu-layer" style="position:fixed; z-index:'+x+'; top:0; left:0; opacity: 0; filter: alpha(opacity=0); background-color: #000;"></div>').css({height:q.height(),width:q.width(),display:"block"}).data("contextMenuRoot",w).insertBefore(this).on("contextmenu",u.abortevent).on("mousedown",u.layerClick);if(!c.support.fixedPosition){v.css({position:"absolute",height:c(document).height()})}return v}};function p(z){var x=z.split(/\s+/),y=[];for(var w=0,v;v=x[w];w++){v=v[0].toUpperCase();y.push(v)}return y}c.fn.contextMenu=function(v){if(v===d){this.first().trigger("contextmenu")}else{if(v.x&&v.y){this.first().trigger(c.Event("contextmenu",{pageX:v.x,pageY:v.y}))}else{if(v==="hide"){var w=this.data("contextMenu").$menu;w&&w.trigger("contextmenu:hide")}else{if(v==="destroy"){c.contextMenu("destroy",{context:this})}else{if(c.isPlainObject(v)){v.context=this;c.contextMenu("create",v)}else{if(v){this.removeClass("context-menu-disabled")}else{if(!v){this.addClass("context-menu-disabled")}}}}}}}return this};c.contextMenu=function(z,D){if(typeof z!="string"){D=z;z="create"}if(typeof D=="string"){D={selector:D}}else{if(D===d){D={}}}var x=c.extend(true,{},j,D||{});var y=c(document);var B=y;var C=false;if(!x.context||!x.context.length){x.context=document}else{B=c(x.context).first();x.context=B.get(0);C=x.context!==document}switch(z){case"create":if(!x.selector){throw new Error("No selector specified")}if(x.selector.match(/.context-menu-(list|item|input)($|\s)/)){throw new Error('Cannot bind to selector "'+x.selector+'" as it contains a reserved className')}if(!x.build&&(!x.items||c.isEmptyObject(x.items))){throw new Error("No Items specified")}h++;x.ns=".contextMenu"+h;if(!C){g[x.selector]=x.ns}o[x.ns]=x;if(!x.trigger){x.trigger="right"}if(!b){y.on({"contextmenu:hide.contextMenu":u.hideMenu,"prevcommand.contextMenu":u.prevItem,"nextcommand.contextMenu":u.nextItem,"contextmenu.contextMenu":u.abortevent,"mouseenter.contextMenu":u.menuMouseenter,"mouseleave.contextMenu":u.menuMouseleave},".context-menu-list").on("mouseup.contextMenu",".context-menu-input",u.inputClick).on({"mouseup.contextMenu":u.itemClick,"contextmenu:focus.contextMenu":u.focusItem,"contextmenu:blur.contextMenu":u.blurItem,"contextmenu.contextMenu":u.abortevent,"mouseenter.contextMenu":u.itemMouseenter,"mouseleave.contextMenu":u.itemMouseleave},".context-menu-item");b=true}B.on("contextmenu"+x.ns,x.selector,x,u.contextmenu);if(C){B.on("remove"+x.ns,function(){c(this).contextMenu("destroy")})}switch(x.trigger){case"hover":B.on("mouseenter"+x.ns,x.selector,x,u.mouseenter).on("mouseleave"+x.ns,x.selector,x,u.mouseleave);break;case"left":B.on("click"+x.ns,x.selector,x,u.click);break}if(!x.build){f.create(x)}break;case"destroy":var v;if(C){var w=x.context;c.each(o,function(E,G){if(G.context!==w){return true}v=c(".context-menu-list").filter(":visible");if(v.length&&v.data().contextMenuRoot.$trigger.is(c(G.context).find(G.selector))){v.trigger("contextmenu:hide",{force:true})}try{if(o[G.ns].$menu){o[G.ns].$menu.remove()}delete o[G.ns]}catch(F){o[G.ns]=null}c(G.context).off(G.ns);return true})}else{if(!x.selector){y.off(".contextMenu .contextMenuAutoHide");c.each(o,function(E,F){c(F.context).off(F.ns)});g={};o={};h=0;b=false;c("#context-menu-layer, .context-menu-list").remove()}else{if(g[x.selector]){v=c(".context-menu-list").filter(":visible");if(v.length&&v.data().contextMenuRoot.$trigger.is(x.selector)){v.trigger("contextmenu:hide",{force:true})}try{if(o[g[x.selector]].$menu){o[g[x.selector]].$menu.remove()}delete o[g[x.selector]]}catch(A){o[g[x.selector]]=null}y.off(g[x.selector])}}}break;case"html5":if((!c.support.htmlCommand&&!c.support.htmlMenuitem)||(typeof D=="boolean"&&D)){c('menu[type="context"]').each(function(){if(this.id){c.contextMenu({selector:"[contextmenu="+this.id+"]",items:c.contextMenu.fromMenu(this)})}}).css("display","none")}break;default:throw new Error('Unknown operation "'+z+'"')}return this};c.contextMenu.setInputValues=function(v,w){if(w===d){w={}}c.each(v.inputs,function(x,y){switch(y.type){case"text":case"textarea":y.value=w[x]||"";break;case"checkbox":y.selected=w[x]?true:false;break;case"radio":y.selected=(w[y.radio]||"")==y.value?true:false;break;case"select":y.selected=w[x]||"";break}})};c.contextMenu.getInputValues=function(v,w){if(w===d){w={}}c.each(v.inputs,function(x,y){switch(y.type){case"text":case"textarea":case"select":w[x]=y.$input.val();break;case"checkbox":w[x]=y.$input.prop("checked");break;case"radio":if(y.$input.prop("checked")){w[y.radio]=y.value}break}});return w};function r(v){return(v.id&&c('label[for="'+v.id+'"]').val())||v.name}function a(x,w,v){if(!v){v=0}w.each(function(){var y=c(this),B=this,C=this.nodeName.toLowerCase(),z,A;if(C=="label"&&y.find("input, textarea, select").length){z=y.text();y=y.children().first();B=y.get(0);C=B.nodeName.toLowerCase()}switch(C){case"menu":A={name:y.attr("label"),items:{}};v=a(A.items,y.children(),v);break;case"a":case"button":A={name:y.text(),disabled:!!y.attr("disabled"),callback:(function(){return function(){y.click()}})()};break;case"menuitem":case"command":switch(y.attr("type")){case d:case"command":case"menuitem":A={name:y.attr("label"),disabled:!!y.attr("disabled"),callback:(function(){return function(){y.click()}})()};break;case"checkbox":A={type:"checkbox",disabled:!!y.attr("disabled"),name:y.attr("label"),selected:!!y.attr("checked")};break;case"radio":A={type:"radio",disabled:!!y.attr("disabled"),name:y.attr("label"),radio:y.attr("radiogroup"),value:y.attr("id"),selected:!!y.attr("checked")};break;default:A=d}break;case"hr":A="-------";break;case"input":switch(y.attr("type")){case"text":A={type:"text",name:z||r(B),disabled:!!y.attr("disabled"),value:y.val()};break;case"checkbox":A={type:"checkbox",name:z||r(B),disabled:!!y.attr("disabled"),selected:!!y.attr("checked")};break;case"radio":A={type:"radio",name:z||r(B),disabled:!!y.attr("disabled"),radio:!!y.attr("name"),value:y.val(),selected:!!y.attr("checked")};break;default:A=d;break}break;case"select":A={type:"select",name:z||r(B),disabled:!!y.attr("disabled"),selected:y.val(),options:{}};y.children().each(function(){A.options[this.value]=c(this).text()});break;case"textarea":A={type:"textarea",name:z||r(B),disabled:!!y.attr("disabled"),value:y.val()};break;case"label":break;default:A={type:"html",html:y.clone(true)};break}if(A){v++;x["key"+v]=A}});return v}c.contextMenu.fromMenu=function(w){var x=c(w),v={};a(v,x.children());return v};c.contextMenu.defaults=j;c.contextMenu.types=n;c.contextMenu.handle=u;c.contextMenu.op=f;c.contextMenu.menus=o})(jQuery);(function(a){a.prompt=function(m,n){if(n!==undefined&&n.classes!==undefined&&typeof n.classes==="string"){n={box:n.classes}}a.prompt.options=a.extend({},a.prompt.defaults,n);a.prompt.currentPrefix=a.prompt.options.prefix;if(a.prompt.timeout){clearTimeout(a.prompt.timeout)}a.prompt.timeout=false;var b=a.prompt.options,f=a(document.body),d=a(window);var c='<div class="'+a.prompt.options.prefix+"box "+b.classes.box+'">';if(b.useiframe&&(a("object, applet").length>0)){c+='<iframe src="javascript:false;" style="display:block;position:absolute;z-index:-1;" class="'+b.prefix+"fade "+b.classes.fade+'"></iframe>'}else{c+='<div class="'+b.prefix+"fade "+b.classes.fade+'"></div>'}c+='<div class="'+b.prefix+" "+b.classes.prompt+'"><form action="javascript:false;" onsubmit="return false;" class="'+b.prefix+"form "+b.classes.form+'"><div class="'+b.prefix+"close "+b.classes.close+'">'+b.closeText+'</div><div class="'+b.prefix+'states"></div></form></div></div>';a.prompt.jqib=a(c).appendTo(f);a.prompt.jqi=a.prompt.jqib.children("."+b.prefix);a.prompt.jqif=a.prompt.jqib.children("."+b.prefix+"fade");if(m.constructor===String){m={state0:{title:b.title,html:m,buttons:b.buttons,position:b.position,focus:b.focus,defaultButton:b.defaultButton,submit:b.submit}}}a.prompt.options.states={};var e,j;for(e in m){j=a.extend({},a.prompt.defaults.state,{name:e},m[e]);a.prompt.addState(j.name,j);if(a.prompt.currentStateName===""){a.prompt.currentStateName=j.name}}a.prompt.jqi.on("click","."+b.prefix+"buttons button",function(u){var s=a(this),o=s.parents("."+b.prefix+"state"),w=a.prompt.options.states[o.data("jqi-name")],r=o.children("."+b.prefix+"message"),v=w.buttons[s.text()]||w.buttons[s.html()],p={};if(v===undefined){for(var t in w.buttons){if(w.buttons[t].title===s.text()||w.buttons[t].title===s.html()){v=w.buttons[t].value}}}a.each(a.prompt.jqi.children("form").serializeArray(),function(x,y){if(p[y.name]===undefined){p[y.name]=y.value}else{if(typeof p[y.name]===Array||typeof p[y.name]==="object"){p[y.name].push(y.value)}else{p[y.name]=[p[y.name],y.value]}}});var q=new a.Event("impromptu:submit");q.stateName=w.name;q.state=o;o.trigger(q,[v,r,p]);if(!q.isDefaultPrevented()){a.prompt.close(true,v,r,p)}});var h=function(){if(b.persistent){var p=(b.top.toString().indexOf("%")>=0?(d.height()*(parseInt(b.top,10)/100)):parseInt(b.top,10)),o=parseInt(a.prompt.jqi.css("top").replace("px",""),10)-p;a("html,body").animate({scrollTop:o},"fast",function(){var r=0;a.prompt.jqib.addClass(b.prefix+"warning");var q=setInterval(function(){a.prompt.jqib.toggleClass(b.prefix+"warning");if(r++>1){clearInterval(q);a.prompt.jqib.removeClass(b.prefix+"warning")}},100)})}else{a.prompt.close(true)}};var g=function(t){var r=(window.event)?event.keyCode:t.keyCode;if(r===27){h()}if(r===13){var s=a.prompt.getCurrentState().find("."+b.prefix+"defaultbutton");var o=a(t.target);if(o.is("textarea,."+b.prefix+"button")===false&&s.length>0){t.preventDefault();s.click()}}if(r===9){var u=a("input,select,textarea,button",a.prompt.getCurrentState());var q=!t.shiftKey&&t.target===u[u.length-1];var p=t.shiftKey&&t.target===u[0];if(q||p){setTimeout(function(){if(!u){return}var v=u[p===true?u.length-1:0];if(v){v.focus()}},10);return false}}};a.prompt.position();a.prompt.style();a.prompt.jqif.click(h);d.resize({animate:false},a.prompt.position);a.prompt.jqi.find("."+b.prefix+"close").click(a.prompt.close);a.prompt.jqib.on("keydown",g).on("impromptu:loaded",b.loaded).on("impromptu:close",b.close).on("impromptu:statechanging",b.statechanging).on("impromptu:statechanged",b.statechanged);a.prompt.jqif[b.show](b.overlayspeed);a.prompt.jqi[b.show](b.promptspeed,function(){var o=a.prompt.jqi.find("."+b.prefix+"states ."+b.prefix+"state").eq(0);a.prompt.goToState(o.data("jqi-name"));a.prompt.jqib.trigger("impromptu:loaded")});if(b.timeout>0){a.prompt.timeout=setTimeout(function(){a.prompt.close(true)},b.timeout)}return a.prompt.jqib};a.prompt.defaults={prefix:"jqi",classes:{box:"",fade:"",prompt:"",form:"",close:"",title:"",message:"",buttons:"",button:"",defaultButton:""},title:"",closeText:"&times;",buttons:{Ok:true},loaded:function(b){},submit:function(g,c,b,d){},close:function(g,c,b,d){},statechanging:function(b,d,c){},statechanged:function(b,c){},opacity:0.6,zIndex:999,overlayspeed:"slow",promptspeed:"fast",show:"fadeIn",focus:0,defaultButton:0,useiframe:false,top:"15%",position:{container:null,x:null,y:null,arrow:null,width:null},persistent:true,timeout:0,states:{},state:{name:null,title:"",html:"",buttons:{Ok:true},focus:0,defaultButton:0,position:{container:null,x:null,y:null,arrow:null,width:null},submit:function(g,c,b,d){return true}}};a.prompt.currentPrefix=a.prompt.defaults.prefix;a.prompt.currentStateName="";a.prompt.setDefaults=function(b){a.prompt.defaults=a.extend({},a.prompt.defaults,b)};a.prompt.setStateDefaults=function(b){a.prompt.defaults.state=a.extend({},a.prompt.defaults.state,b)};a.prompt.position=function(j){var g=a.fx.off,c=a.prompt.getCurrentState(),d=a.prompt.options.states[c.data("jqi-name")],n=d?d.position:undefined,f=a(window),q=document.body.scrollHeight,b=a(window).height(),p=a(document).height(),o=q>b?q:b,m=parseInt(f.scrollTop(),10)+(a.prompt.options.top.toString().indexOf("%")>=0?(b*(parseInt(a.prompt.options.top,10)/100)):parseInt(a.prompt.options.top,10));if(j!==undefined&&j.data.animate===false){a.fx.off=true}a.prompt.jqib.css({position:"absolute",height:o,width:"100%",top:0,left:0,right:0,bottom:0});a.prompt.jqif.css({position:"fixed",height:o,width:"100%",top:0,left:0,right:0,bottom:0});if(n&&n.container){var h=a(n.container).offset();if(a.isPlainObject(h)&&h.top!==undefined){a.prompt.jqi.css({position:"absolute"});a.prompt.jqi.animate({top:h.top+n.y,left:h.left+n.x,marginLeft:0,width:(n.width!==undefined)?n.width:null});m=(h.top+n.y)-(a.prompt.options.top.toString().indexOf("%")>=0?(b*(parseInt(a.prompt.options.top,10)/100)):parseInt(a.prompt.options.top,10));a("html,body").animate({scrollTop:m},"slow","swing",function(){})}}else{if(n&&n.width){a.prompt.jqi.css({position:"absolute",left:"50%"});a.prompt.jqi.animate({top:n.y||m,left:n.x||"50%",marginLeft:((n.width/2)*-1),width:n.width})}else{a.prompt.jqi.css({position:"absolute",top:m,left:"50%",marginLeft:((a.prompt.jqi.outerWidth(false)/2)*-1)})}}if(j!==undefined&&j.data.animate===false){a.fx.off=g}};a.prompt.style=function(){a.prompt.jqif.css({zIndex:a.prompt.options.zIndex,display:"none",opacity:a.prompt.options.opacity});a.prompt.jqi.css({zIndex:a.prompt.options.zIndex+1,display:"none"});a.prompt.jqib.css({zIndex:a.prompt.options.zIndex})};a.prompt.get=function(b){return a("."+a.prompt.currentPrefix)};a.prompt.addState=function(n,t,p){var d="",c=null,r="",q="",b=a.prompt.options,h=a("."+a.prompt.currentPrefix+"states"),o=[],e,m,g,s,f,j=0;t=a.extend({},a.prompt.defaults.state,{name:n},t);if(t.position.arrow!==null){r='<div class="'+b.prefix+"arrow "+b.prefix+"arrow"+t.position.arrow+'"></div>'}if(t.title&&t.title!==""){q='<div class="lead '+b.prefix+"title "+b.classes.title+'">'+t.title+"</div>"}e=t.html;if(typeof t.html==="function"){e="Error: html function must return text"}d+='<div id="'+b.prefix+"state_"+n+'" class="'+b.prefix+'state" data-jqi-name="'+n+'" style="display:none;">'+r+q+'<div class="'+b.prefix+"message "+b.classes.message+'">'+e+'</div><div class="'+b.prefix+"buttons "+b.classes.buttons+'"'+(a.isEmptyObject(t.buttons)?'style="display:none;"':"")+">";if(a.isArray(t.buttons)){o=t.buttons}else{if(a.isPlainObject(t.buttons)){for(g in t.buttons){if(t.buttons.hasOwnProperty(g)){o.push({title:g,value:t.buttons[g]})}}}}for(j=0,f=o.length;j<f;j++){s=o[j],m=t.focus===j||(isNaN(t.focus)&&t.defaultButton===j)?(a.prompt.currentPrefix+"defaultbutton "+b.classes.defaultButton):"";d+='<button class="'+b.classes.button+" "+a.prompt.currentPrefix+"button "+m;if(typeof s.classes!=="undefined"){d+=" "+(a.isArray(s.classes)?s.classes.join(" "):s.classes)+" "}d+='" name="'+b.prefix+"_"+n+"_button"+s.title.replace(/[^a-z0-9]+/gi,"")+'" id="'+b.prefix+"_"+n+"_button"+s.title.replace(/[^a-z0-9]+/gi,"")+'" value="'+s.value+'">'+s.title+"</button>"}d+="</div></div>";c=a(d);c.on("impromptu:submit",t.submit);if(p!==undefined){h.find("#"+a.prompt.currentPrefix+"state_"+p).after(c)}else{h.append(c)}a.prompt.options.states[n]=t;return c};a.prompt.removeState=function(c,e){var b=a.prompt.getState(c),d=function(){b.remove()};if(b.length===0){return false}if(b.css("display")!=="none"){if(e!==undefined&&a.prompt.getState(e).length>0){a.prompt.goToState(e,false,d)}else{if(b.next().length>0){a.prompt.nextState(d)}else{if(b.prev().length>0){a.prompt.prevState(d)}else{a.prompt.close()}}}}else{b.slideUp("slow",d)}return true};a.prompt.getState=function(b){return a("#"+a.prompt.currentPrefix+"state_"+b)};a.prompt.getStateContent=function(b){return a.prompt.getState(b)};a.prompt.getCurrentState=function(){return a.prompt.getState(a.prompt.getCurrentStateName())};a.prompt.getCurrentStateName=function(){return a.prompt.currentStateName};a.prompt.goToState=function(d,j,m){var h=a.prompt.get(),f=a.prompt.options,c=a.prompt.getState(d),n=f.states[c.data("jqi-name")],e=new a.Event("impromptu:statechanging"),b=a.prompt.options;if(n!==undefined){if(typeof n.html==="function"){var g=n.html;c.find("."+b.prefix+"message ").html(g())}if(typeof j==="function"){m=j;j=false}a.prompt.jqib.trigger(e,[a.prompt.getCurrentStateName(),d]);if(!e.isDefaultPrevented()&&c.length>0){a.prompt.jqi.find("."+a.prompt.currentPrefix+"parentstate").removeClass(a.prompt.currentPrefix+"parentstate");if(j){a.prompt.jqi.find("."+a.prompt.currentPrefix+"substate").not(c).slideUp(f.promptspeed).removeClass("."+a.prompt.currentPrefix+"substate").find("."+a.prompt.currentPrefix+"arrow").hide();a.prompt.jqi.find("."+a.prompt.currentPrefix+"state:visible").addClass(a.prompt.currentPrefix+"parentstate");c.addClass(a.prompt.currentPrefix+"substate")}else{a.prompt.jqi.find("."+a.prompt.currentPrefix+"state").not(c).slideUp(f.promptspeed).find("."+a.prompt.currentPrefix+"arrow").hide()}a.prompt.currentStateName=n.name;c.slideDown(f.promptspeed,function(){var o=a(this);if(typeof(n.focus)==="string"){o.find(n.focus).eq(0).focus()}else{o.find("."+a.prompt.currentPrefix+"defaultbutton").focus()}o.find("."+a.prompt.currentPrefix+"arrow").show(f.promptspeed);if(typeof m==="function"){a.prompt.jqib.on("impromptu:statechanged",m)}a.prompt.jqib.trigger("impromptu:statechanged",[d]);if(typeof m==="function"){a.prompt.jqib.off("impromptu:statechanged",m)}});if(!j){a.prompt.position()}}}return c};a.prompt.nextState=function(c){var b=a("#"+a.prompt.currentPrefix+"state_"+a.prompt.getCurrentStateName()).next();if(b.length>0){a.prompt.goToState(b.attr("id").replace(a.prompt.currentPrefix+"state_",""),c)}return b};a.prompt.prevState=function(c){var b=a("#"+a.prompt.currentPrefix+"state_"+a.prompt.getCurrentStateName()).prev();if(b.length>0){a.prompt.goToState(b.attr("id").replace(a.prompt.currentPrefix+"state_",""),c)}return b};a.prompt.close=function(d,c,e,b){if(a.prompt.timeout){clearTimeout(a.prompt.timeout);a.prompt.timeout=false}if(a.prompt.jqib){a.prompt.jqib.fadeOut("fast",function(){a.prompt.jqib.trigger("impromptu:close",[c,e,b]);a.prompt.jqib.remove();a(window).off("resize",a.prompt.position)})}a.prompt.currentStateName=""};a.fn.prompt=function(b){if(b===undefined){b={}}if(b.withDataAndEvents===undefined){b.withDataAndEvents=false}a.prompt(a(this).clone(b.withDataAndEvents).html(),b)}})(jQuery);(function(b){b.color={};b.color.make=function(f,e,c,d){var h={};h.r=f||0;h.g=e||0;h.b=c||0;h.a=d!=null?d:1;h.add=function(m,j){for(var g=0;g<m.length;++g){h[m.charAt(g)]+=j}return h.normalize()};h.scale=function(m,j){for(var g=0;g<m.length;++g){h[m.charAt(g)]*=j}return h.normalize()};h.toString=function(){if(h.a>=1){return"rgb("+[h.r,h.g,h.b].join(",")+")"}else{return"rgba("+[h.r,h.g,h.b,h.a].join(",")+")"}};h.normalize=function(){function g(m,n,j){return n<m?m:n>j?j:n}h.r=g(0,parseInt(h.r),255);h.g=g(0,parseInt(h.g),255);h.b=g(0,parseInt(h.b),255);h.a=g(0,h.a,1);return h};h.clone=function(){return b.color.make(h.r,h.b,h.g,h.a)};return h.normalize()};b.color.extract=function(e,d){var f;do{f=e.css(d).toLowerCase();if(f!=""&&f!="transparent"){break}e=e.parent()}while(e.length&&!b.nodeName(e.get(0),"body"));if(f=="rgba(0, 0, 0, 0)"){f="transparent"}return b.color.parse(f)};b.color.parse=function(f){var e,c=b.color.make;if(e=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(f)){return c(parseInt(e[1],10),parseInt(e[2],10),parseInt(e[3],10))}if(e=/rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]+(?:\.[0-9]+)?)\s*\)/.exec(f)){return c(parseInt(e[1],10),parseInt(e[2],10),parseInt(e[3],10),parseFloat(e[4]))}if(e=/rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(f)){return c(parseFloat(e[1])*2.55,parseFloat(e[2])*2.55,parseFloat(e[3])*2.55)}if(e=/rgba\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\s*\)/.exec(f)){return c(parseFloat(e[1])*2.55,parseFloat(e[2])*2.55,parseFloat(e[3])*2.55,parseFloat(e[4]))}if(e=/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(f)){return c(parseInt(e[1],16),parseInt(e[2],16),parseInt(e[3],16))}if(e=/#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(f)){return c(parseInt(e[1]+e[1],16),parseInt(e[2]+e[2],16),parseInt(e[3]+e[3],16))}var d=b.trim(f).toLowerCase();if(d=="transparent"){return c(255,255,255,0)}else{e=a[d]||[0,0,0];return c(e[0],e[1],e[2])}};var a={aqua:[0,255,255],azure:[240,255,255],beige:[245,245,220],black:[0,0,0],blue:[0,0,255],brown:[165,42,42],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgrey:[169,169,169],darkgreen:[0,100,0],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkviolet:[148,0,211],fuchsia:[255,0,255],gold:[255,215,0],green:[0,128,0],indigo:[75,0,130],khaki:[240,230,140],lightblue:[173,216,230],lightcyan:[224,255,255],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightyellow:[255,255,224],lime:[0,255,0],magenta:[255,0,255],maroon:[128,0,0],navy:[0,0,128],olive:[128,128,0],orange:[255,165,0],pink:[255,192,203],purple:[128,0,128],violet:[128,0,128],red:[255,0,0],silver:[192,192,192],white:[255,255,255],yellow:[255,255,0]}})(jQuery);(function(e){var d=Object.prototype.hasOwnProperty;if(!e.fn.detach){e.fn.detach=function(){return this.each(function(){if(this.parentNode){this.parentNode.removeChild(this)}})}}function a(h,g){var m=g.children("."+h)[0];if(m==null){m=document.createElement("canvas");m.className=h;e(m).css({direction:"ltr",position:"absolute",left:0,top:0}).appendTo(g);if(!m.getContext){if(window.G_vmlCanvasManager){m=window.G_vmlCanvasManager.initElement(m)}else{throw new Error("Canvas is not available. If you're using IE with a fall-back such as Excanvas, then there's either a mistake in your conditional include, or the page has no DOCTYPE and is rendering in Quirks Mode.")}}}this.element=m;var j=this.context=m.getContext("2d");var f=window.devicePixelRatio||1,n=j.webkitBackingStorePixelRatio||j.mozBackingStorePixelRatio||j.msBackingStorePixelRatio||j.oBackingStorePixelRatio||j.backingStorePixelRatio||1;this.pixelRatio=f/n;this.resize(g.width(),g.height());this.textContainer=null;this.text={};this._textCache={}}a.prototype.resize=function(j,f){if(j<=0||f<=0){throw new Error("Invalid dimensions for plot, width = "+j+", height = "+f)}var h=this.element,g=this.context,m=this.pixelRatio;if(this.width!=j){h.width=j*m;h.style.width=j+"px";this.width=j}if(this.height!=f){h.height=f*m;h.style.height=f+"px";this.height=f}g.restore();g.save();g.scale(m,m)};a.prototype.clear=function(){this.context.clearRect(0,0,this.width,this.height)};a.prototype.render=function(){var f=this._textCache;for(var q in f){if(d.call(f,q)){var p=this.getTextLayer(q),g=f[q];p.hide();for(var o in g){if(d.call(g,o)){var h=g[o];for(var r in h){if(d.call(h,r)){var m=h[r].positions;for(var j=0,n;n=m[j];j++){if(n.active){if(!n.rendered){p.append(n.element);n.rendered=true}}else{m.splice(j--,1);if(n.rendered){n.element.detach()}}}if(m.length==0){delete h[r]}}}}}p.show()}}};a.prototype.getTextLayer=function(g){var f=this.text[g];if(f==null){if(this.textContainer==null){this.textContainer=e("<div class='flot-text'></div>").css({position:"absolute",top:0,left:0,bottom:0,right:0,"font-size":"smaller",color:"#545454"}).insertAfter(this.element)}f=this.text[g]=e("<div></div>").addClass(g).css({position:"absolute",top:0,left:0,bottom:0,right:0}).appendTo(this.textContainer)}return f};a.prototype.getTextInfo=function(p,r,m,n,g){var q,f,j,h;r=""+r;if(typeof m==="object"){q=m.style+" "+m.variant+" "+m.weight+" "+m.size+"px/"+m.lineHeight+"px "+m.family}else{q=m}f=this._textCache[p];if(f==null){f=this._textCache[p]={}}j=f[q];if(j==null){j=f[q]={}}h=j[r];if(h==null){var o=e("<div></div>").html(r).css({position:"absolute","max-width":g,top:-9999}).appendTo(this.getTextLayer(p));if(typeof m==="object"){o.css({font:q,color:m.color})}else{if(typeof m==="string"){o.addClass(m)}}h=j[r]={width:o.outerWidth(true),height:o.outerHeight(true),element:o,positions:[]};o.detach()}return h};a.prototype.addText=function(q,t,r,u,h,j,f,p,s){var g=this.getTextInfo(q,u,h,j,f),n=g.positions;if(p=="center"){t-=g.width/2}else{if(p=="right"){t-=g.width}}if(s=="middle"){r-=g.height/2}else{if(s=="bottom"){r-=g.height}}for(var m=0,o;o=n[m];m++){if(o.x==t&&o.y==r){o.active=true;return}}o={active:true,rendered:false,element:n.length?g.element.clone():g.element,x:t,y:r};n.push(o);o.element.css({top:Math.round(r),left:Math.round(t),"text-align":p})};a.prototype.removeText=function(q,s,r,u,h,j){if(u==null){var f=this._textCache[q];if(f!=null){for(var p in f){if(d.call(f,p)){var g=f[p];for(var t in g){if(d.call(g,t)){var n=g[t].positions;for(var m=0,o;o=n[m];m++){o.active=false}}}}}}}else{var n=this.getTextInfo(q,u,h,j).positions;for(var m=0,o;o=n[m];m++){if(o.x==s&&o.y==r){o.active=false}}}};function c(T,D,F,g){var w=[],O={colors:["#edc240","#afd8f8","#cb4b4b","#4da74d","#9440ed"],legend:{show:true,noColumns:1,labelFormatter:null,labelBoxBorderColor:"#ccc",container:null,position:"ne",margin:5,backgroundColor:null,backgroundOpacity:0.85,sorted:null},xaxis:{show:null,position:"bottom",mode:null,font:null,color:null,tickColor:null,transform:null,inverseTransform:null,min:null,max:null,autoscaleMargin:null,ticks:null,tickFormatter:null,labelWidth:null,labelHeight:null,reserveSpace:null,tickLength:null,alignTicksWithAxis:null,tickDecimals:null,tickSize:null,minTickSize:null},yaxis:{autoscaleMargin:0.02,position:"left"},xaxes:[],yaxes:[],series:{points:{show:false,radius:3,lineWidth:2,fill:true,fillColor:"#ffffff",symbol:"circle"},lines:{lineWidth:2,fill:false,fillColor:null,steps:false},bars:{show:false,lineWidth:2,barWidth:1,fill:true,fillColor:null,align:"left",horizontal:false,zero:true},shadowSize:3,highlightColor:null},grid:{show:true,aboveData:false,color:"#545454",backgroundColor:null,borderColor:null,tickColor:null,margin:0,labelMargin:5,axisMargin:8,borderWidth:2,minBorderMargin:null,markings:null,markingsColor:"#f4f4f4",markingsLineWidth:2,clickable:false,hoverable:false,autoHighlight:true,mouseActiveRadius:10},interaction:{redrawOverlayInterval:1000/60},hooks:{}},af=null,ao=null,ap=null,G=null,az=null,ar=[],Z=[],M={left:0,right:0,top:0,bottom:0},n=0,ag=0,s={processOptions:[],processRawData:[],processDatapoints:[],processOffset:[],drawBackground:[],drawSeries:[],draw:[],bindEvents:[],drawOverlay:[],shutdown:[]},h=this;h.setData=N;h.setupGrid=R;h.draw=ax;h.getPlaceholder=function(){return T};h.getCanvas=function(){return af.element};h.getPlotOffset=function(){return M};h.width=function(){return n};h.height=function(){return ag};h.offset=function(){var aB=ap.offset();aB.left+=M.left;aB.top+=M.top;return aB};h.getData=function(){return w};h.getAxes=function(){var aC={},aB;e.each(ar.concat(Z),function(aD,aE){if(aE){aC[aE.direction+(aE.n!=1?aE.n:"")+"axis"]=aE}});return aC};h.getXAxes=function(){return ar};h.getYAxes=function(){return Z};h.c2p=ab;h.p2c=U;h.getOptions=function(){return O};h.highlight=aq;h.unhighlight=ak;h.triggerRedrawOverlay=aa;h.pointOffset=function(aB){return{left:parseInt(ar[A(aB,"x")-1].p2c(+aB.x)+M.left,10),top:parseInt(Z[A(aB,"y")-1].p2c(+aB.y)+M.top,10)}};h.shutdown=r;h.destroy=function(){r();T.removeData("plot").empty();w=[];O=null;af=null;ao=null;ap=null;G=null;az=null;ar=[];Z=[];s=null;aj=[];h=null};h.resize=function(){var aC=T.width(),aB=T.height();af.resize(aC,aB);ao.resize(aC,aB)};h.hooks=s;K(h);ad(F);aA();N(D);R();ax();av();function I(aD,aB){aB=[h].concat(aB);for(var aC=0;aC<aD.length;++aC){aD[aC].apply(this,aB)}}function K(){var aC={Canvas:a};for(var aB=0;aB<g.length;++aB){var aD=g[aB];aD.init(h,aC);if(aD.options){e.extend(true,O,aD.options)}}}function ad(aD){e.extend(true,O,aD);if(aD&&aD.colors){O.colors=aD.colors}if(O.xaxis.color==null){O.xaxis.color=e.color.parse(O.grid.color).scale("a",0.22).toString()}if(O.yaxis.color==null){O.yaxis.color=e.color.parse(O.grid.color).scale("a",0.22).toString()}if(O.xaxis.tickColor==null){O.xaxis.tickColor=O.grid.tickColor||O.xaxis.color}if(O.yaxis.tickColor==null){O.yaxis.tickColor=O.grid.tickColor||O.yaxis.color}if(O.grid.borderColor==null){O.grid.borderColor=O.grid.color}if(O.grid.tickColor==null){O.grid.tickColor=e.color.parse(O.grid.color).scale("a",0.22).toString()}var aB,aI,aG,aF=T.css("font-size"),aE=aF?+aF.replace("px",""):13,aC={style:T.css("font-style"),size:Math.round(0.8*aE),variant:T.css("font-variant"),weight:T.css("font-weight"),family:T.css("font-family")};aG=O.xaxes.length||1;for(aB=0;aB<aG;++aB){aI=O.xaxes[aB];if(aI&&!aI.tickColor){aI.tickColor=aI.color}aI=e.extend(true,{},O.xaxis,aI);O.xaxes[aB]=aI;if(aI.font){aI.font=e.extend({},aC,aI.font);if(!aI.font.color){aI.font.color=aI.color}if(!aI.font.lineHeight){aI.font.lineHeight=Math.round(aI.font.size*1.15)}}}aG=O.yaxes.length||1;for(aB=0;aB<aG;++aB){aI=O.yaxes[aB];if(aI&&!aI.tickColor){aI.tickColor=aI.color}aI=e.extend(true,{},O.yaxis,aI);O.yaxes[aB]=aI;if(aI.font){aI.font=e.extend({},aC,aI.font);if(!aI.font.color){aI.font.color=aI.color}if(!aI.font.lineHeight){aI.font.lineHeight=Math.round(aI.font.size*1.15)}}}if(O.xaxis.noTicks&&O.xaxis.ticks==null){O.xaxis.ticks=O.xaxis.noTicks}if(O.yaxis.noTicks&&O.yaxis.ticks==null){O.yaxis.ticks=O.yaxis.noTicks}if(O.x2axis){O.xaxes[1]=e.extend(true,{},O.xaxis,O.x2axis);O.xaxes[1].position="top";if(O.x2axis.min==null){O.xaxes[1].min=null}if(O.x2axis.max==null){O.xaxes[1].max=null}}if(O.y2axis){O.yaxes[1]=e.extend(true,{},O.yaxis,O.y2axis);O.yaxes[1].position="right";if(O.y2axis.min==null){O.yaxes[1].min=null}if(O.y2axis.max==null){O.yaxes[1].max=null}}if(O.grid.coloredAreas){O.grid.markings=O.grid.coloredAreas}if(O.grid.coloredAreasColor){O.grid.markingsColor=O.grid.coloredAreasColor}if(O.lines){e.extend(true,O.series.lines,O.lines)}if(O.points){e.extend(true,O.series.points,O.points)}if(O.bars){e.extend(true,O.series.bars,O.bars)}if(O.shadowSize!=null){O.series.shadowSize=O.shadowSize}if(O.highlightColor!=null){O.series.highlightColor=O.highlightColor}for(aB=0;aB<O.xaxes.length;++aB){P(ar,aB+1).options=O.xaxes[aB]}for(aB=0;aB<O.yaxes.length;++aB){P(Z,aB+1).options=O.yaxes[aB]}for(var aH in s){if(O.hooks[aH]&&O.hooks[aH].length){s[aH]=s[aH].concat(O.hooks[aH])}}I(s.processOptions,[O])}function N(aB){w=t(aB);B();V()}function t(aE){var aC=[];for(var aB=0;aB<aE.length;++aB){var aD=e.extend(true,{},O.series);if(aE[aB].data!=null){aD.data=aE[aB].data;delete aE[aB].data;e.extend(true,aD,aE[aB]);aE[aB].data=aD.data}else{aD.data=aE[aB]}aC.push(aD)}return aC}function A(aC,aD){var aB=aC[aD+"axis"];if(typeof aB=="object"){aB=aB.n}if(typeof aB!="number"){aB=1}return aB}function m(){return e.grep(ar.concat(Z),function(aB){return aB})}function ab(aE){var aC={},aB,aD;for(aB=0;aB<ar.length;++aB){aD=ar[aB];if(aD&&aD.used){aC["x"+aD.n]=aD.c2p(aE.left)}}for(aB=0;aB<Z.length;++aB){aD=Z[aB];if(aD&&aD.used){aC["y"+aD.n]=aD.c2p(aE.top)}}if(aC.x1!==undefined){aC.x=aC.x1}if(aC.y1!==undefined){aC.y=aC.y1}return aC}function U(aF){var aD={},aC,aE,aB;for(aC=0;aC<ar.length;++aC){aE=ar[aC];if(aE&&aE.used){aB="x"+aE.n;if(aF[aB]==null&&aE.n==1){aB="x"}if(aF[aB]!=null){aD.left=aE.p2c(aF[aB]);break}}}for(aC=0;aC<Z.length;++aC){aE=Z[aC];if(aE&&aE.used){aB="y"+aE.n;if(aF[aB]==null&&aE.n==1){aB="y"}if(aF[aB]!=null){aD.top=aE.p2c(aF[aB]);break}}}return aD}function P(aC,aB){if(!aC[aB-1]){aC[aB-1]={n:aB,direction:aC==ar?"x":"y",options:e.extend(true,{},aC==ar?O.xaxis:O.yaxis)}}return aC[aB-1]}function B(){var aM=w.length,aD=-1,aE;for(aE=0;aE<w.length;++aE){var aJ=w[aE].color;if(aJ!=null){aM--;if(typeof aJ=="number"&&aJ>aD){aD=aJ}}}if(aM<=aD){aM=aD+1}var aI,aB=[],aH=O.colors,aG=aH.length,aC=0;for(aE=0;aE<aM;aE++){aI=e.color.parse(aH[aE%aG]||"#666");if(aE%aG==0&&aE){if(aC>=0){if(aC<0.5){aC=-aC-0.2}else{aC=0}}else{aC=-aC}}aB[aE]=aI.scale("rgb",1+aC)}var aF=0,aN;for(aE=0;aE<w.length;++aE){aN=w[aE];if(aN.color==null){aN.color=aB[aF].toString();++aF}else{if(typeof aN.color=="number"){aN.color=aB[aN.color].toString()}}if(aN.lines.show==null){var aL,aK=true;for(aL in aN){if(aN[aL]&&aN[aL].show){aK=false;break}}if(aK){aN.lines.show=true}}if(aN.lines.zero==null){aN.lines.zero=!!aN.lines.fill}aN.xaxis=P(ar,A(aN,"x"));aN.yaxis=P(Z,A(aN,"y"))}}function V(){var aP=Number.POSITIVE_INFINITY,aJ=Number.NEGATIVE_INFINITY,aB=Number.MAX_VALUE,aW,aU,aT,aO,aD,aK,aV,aQ,aI,aH,aC,a2,aZ,aM,a1,aY;function aF(a5,a4,a3){if(a4<a5.datamin&&a4!=-aB){a5.datamin=a4}if(a3>a5.datamax&&a3!=aB){a5.datamax=a3}}e.each(m(),function(a3,a4){a4.datamin=aP;a4.datamax=aJ;a4.used=false});for(aW=0;aW<w.length;++aW){aK=w[aW];aK.datapoints={points:[]};I(s.processRawData,[aK,aK.data,aK.datapoints])}for(aW=0;aW<w.length;++aW){aK=w[aW];a1=aK.data;aY=aK.datapoints.format;if(!aY){aY=[];aY.push({x:true,number:true,required:true});aY.push({y:true,number:true,required:true});if(aK.bars.show||(aK.lines.show&&aK.lines.fill)){var aR=!!((aK.bars.show&&aK.bars.zero)||(aK.lines.show&&aK.lines.zero));aY.push({y:true,number:true,required:false,defaultValue:0,autoscale:aR});if(aK.bars.horizontal){delete aY[aY.length-1].y;aY[aY.length-1].x=true}}aK.datapoints.format=aY}if(aK.datapoints.pointsize!=null){continue}aK.datapoints.pointsize=aY.length;aQ=aK.datapoints.pointsize;aV=aK.datapoints.points;var aG=aK.lines.show&&aK.lines.steps;aK.xaxis.used=aK.yaxis.used=true;for(aU=aT=0;aU<a1.length;++aU,aT+=aQ){aM=a1[aU];var aE=aM==null;if(!aE){for(aO=0;aO<aQ;++aO){a2=aM[aO];aZ=aY[aO];if(aZ){if(aZ.number&&a2!=null){a2=+a2;if(isNaN(a2)){a2=null}else{if(a2==Infinity){a2=aB}else{if(a2==-Infinity){a2=-aB}}}}if(a2==null){if(aZ.required){aE=true}if(aZ.defaultValue!=null){a2=aZ.defaultValue}}}aV[aT+aO]=a2}}if(aE){for(aO=0;aO<aQ;++aO){a2=aV[aT+aO];if(a2!=null){aZ=aY[aO];if(aZ.autoscale!==false){if(aZ.x){aF(aK.xaxis,a2,a2)}if(aZ.y){aF(aK.yaxis,a2,a2)}}}aV[aT+aO]=null}}else{if(aG&&aT>0&&aV[aT-aQ]!=null&&aV[aT-aQ]!=aV[aT]&&aV[aT-aQ+1]!=aV[aT+1]){for(aO=0;aO<aQ;++aO){aV[aT+aQ+aO]=aV[aT+aO]}aV[aT+1]=aV[aT-aQ+1];aT+=aQ}}}}for(aW=0;aW<w.length;++aW){aK=w[aW];I(s.processDatapoints,[aK,aK.datapoints])}for(aW=0;aW<w.length;++aW){aK=w[aW];aV=aK.datapoints.points;aQ=aK.datapoints.pointsize;aY=aK.datapoints.format;var aL=aP,aS=aP,aN=aJ,aX=aJ;for(aU=0;aU<aV.length;aU+=aQ){if(aV[aU]==null){continue}for(aO=0;aO<aQ;++aO){a2=aV[aU+aO];aZ=aY[aO];if(!aZ||aZ.autoscale===false||a2==aB||a2==-aB){continue}if(aZ.x){if(a2<aL){aL=a2}if(a2>aN){aN=a2}}if(aZ.y){if(a2<aS){aS=a2}if(a2>aX){aX=a2}}}}if(aK.bars.show){var a0;switch(aK.bars.align){case"left":a0=0;break;case"right":a0=-aK.bars.barWidth;break;default:a0=-aK.bars.barWidth/2}if(aK.bars.horizontal){aS+=a0;aX+=a0+aK.bars.barWidth}else{aL+=a0;aN+=a0+aK.bars.barWidth}}aF(aK.xaxis,aL,aN);aF(aK.yaxis,aS,aX)}e.each(m(),function(a3,a4){if(a4.datamin==aP){a4.datamin=null}if(a4.datamax==aJ){a4.datamax=null}})}function aA(){T.css("padding",0).children().filter(function(){return !e(this).hasClass("flot-overlay")&&!e(this).hasClass("flot-base")}).remove();if(T.css("position")=="static"){T.css("position","relative")}af=new a("flot-base",T);ao=new a("flot-overlay",T);G=af.context;az=ao.context;ap=e(ao.element).unbind();var aB=T.data("plot");if(aB){aB.shutdown();ao.clear()}T.data("plot",h)}function av(){if(O.grid.hoverable){ap.mousemove(f);ap.bind("mouseleave",S)}if(O.grid.clickable){ap.click(L)}I(s.bindEvents,[ap])}function r(){if(o){clearTimeout(o)}ap.unbind("mousemove",f);ap.unbind("mouseleave",S);ap.unbind("click",L);I(s.shutdown,[ap])}function q(aG){function aC(aH){return aH}var aF,aB,aD=aG.options.transform||aC,aE=aG.options.inverseTransform;if(aG.direction=="x"){aF=aG.scale=n/Math.abs(aD(aG.max)-aD(aG.min));aB=Math.min(aD(aG.max),aD(aG.min))}else{aF=aG.scale=ag/Math.abs(aD(aG.max)-aD(aG.min));aF=-aF;aB=Math.max(aD(aG.max),aD(aG.min))}if(aD==aC){aG.p2c=function(aH){return(aH-aB)*aF}}else{aG.p2c=function(aH){return(aD(aH)-aB)*aF}}if(!aE){aG.c2p=function(aH){return aB+aH/aF}}else{aG.c2p=function(aH){return aE(aB+aH/aF)}}}function ac(aE){var aB=aE.options,aK=aE.ticks||[],aJ=aB.labelWidth||0,aF=aB.labelHeight||0,aL=aJ||(aE.direction=="x"?Math.floor(af.width/(aK.length||1)):null),aH=aE.direction+"Axis "+aE.direction+aE.n+"Axis",aI="flot-"+aE.direction+"-axis flot-"+aE.direction+aE.n+"-axis "+aH,aD=aB.font||"flot-tick-label tickLabel";for(var aG=0;aG<aK.length;++aG){var aM=aK[aG];if(!aM.label){continue}var aC=af.getTextInfo(aI,aM.label,aD,null,aL);aJ=Math.max(aJ,aC.width);aF=Math.max(aF,aC.height)}aE.labelWidth=aB.labelWidth||aJ;aE.labelHeight=aB.labelHeight||aF}function H(aD){var aC=aD.labelWidth,aK=aD.labelHeight,aI=aD.options.position,aB=aD.direction==="x",aG=aD.options.tickLength,aH=O.grid.axisMargin,aJ=O.grid.labelMargin,aM=true,aF=true,aE=true,aL=false;e.each(aB?ar:Z,function(aO,aN){if(aN&&(aN.show||aN.reserveSpace)){if(aN===aD){aL=true}else{if(aN.options.position===aI){if(aL){aF=false}else{aM=false}}}if(!aL){aE=false}}});if(aF){aH=0}if(aG==null){aG=aE?"full":5}if(!isNaN(+aG)){aJ+=+aG}if(aB){aK+=aJ;if(aI=="bottom"){M.bottom+=aK+aH;aD.box={top:af.height-M.bottom,height:aK}}else{aD.box={top:M.top+aH,height:aK};M.top+=aK+aH}}else{aC+=aJ;if(aI=="left"){aD.box={left:M.left+aH,width:aC};M.left+=aC+aH}else{M.right+=aC+aH;aD.box={left:af.width-M.right,width:aC}}}aD.position=aI;aD.tickLength=aG;aD.box.padding=aJ;aD.innermost=aM}function ae(aB){if(aB.direction=="x"){aB.box.left=M.left-aB.labelWidth/2;aB.box.width=af.width-M.left-M.right+aB.labelWidth}else{aB.box.top=M.top-aB.labelHeight/2;aB.box.height=af.height-M.bottom-M.top+aB.labelHeight}}function E(){var aD=O.grid.minBorderMargin,aC,aB;if(aD==null){aD=0;for(aB=0;aB<w.length;++aB){aD=Math.max(aD,2*(w[aB].points.radius+w[aB].points.lineWidth/2))}}var aE={left:aD,right:aD,top:aD,bottom:aD};e.each(m(),function(aF,aG){if(aG.reserveSpace&&aG.ticks&&aG.ticks.length){if(aG.direction==="x"){aE.left=Math.max(aE.left,aG.labelWidth/2);aE.right=Math.max(aE.right,aG.labelWidth/2)}else{aE.bottom=Math.max(aE.bottom,aG.labelHeight/2);aE.top=Math.max(aE.top,aG.labelHeight/2)}}});M.left=Math.ceil(Math.max(aE.left,M.left));M.right=Math.ceil(Math.max(aE.right,M.right));M.top=Math.ceil(Math.max(aE.top,M.top));M.bottom=Math.ceil(Math.max(aE.bottom,M.bottom))}function R(){var aD,aF=m(),aG=O.grid.show;for(var aC in M){var aE=O.grid.margin||0;M[aC]=typeof aE=="number"?aE:aE[aC]||0}I(s.processOffset,[M]);for(var aC in M){if(typeof(O.grid.borderWidth)=="object"){M[aC]+=aG?O.grid.borderWidth[aC]:0}else{M[aC]+=aG?O.grid.borderWidth:0}}e.each(aF,function(aI,aJ){var aH=aJ.options;aJ.show=aH.show==null?aJ.used:aH.show;aJ.reserveSpace=aH.reserveSpace==null?aJ.show:aH.reserveSpace;p(aJ)});if(aG){var aB=e.grep(aF,function(aH){return aH.show||aH.reserveSpace});e.each(aB,function(aH,aI){au(aI);Y(aI);x(aI,aI.ticks);ac(aI)});for(aD=aB.length-1;aD>=0;--aD){H(aB[aD])}E();e.each(aB,function(aH,aI){ae(aI)})}n=af.width-M.left-M.right;ag=af.height-M.bottom-M.top;e.each(aF,function(aH,aI){q(aI)});if(aG){aw()}ay()}function p(aE){var aF=aE.options,aD=+(aF.min!=null?aF.min:aE.datamin),aB=+(aF.max!=null?aF.max:aE.datamax),aH=aB-aD;if(aH==0){var aC=aB==0?1:0.01;if(aF.min==null){aD-=aC}if(aF.max==null||aF.min!=null){aB+=aC}}else{var aG=aF.autoscaleMargin;if(aG!=null){if(aF.min==null){aD-=aH*aG;if(aD<0&&aE.datamin!=null&&aE.datamin>=0){aD=0}}if(aF.max==null){aB+=aH*aG;if(aB>0&&aE.datamax!=null&&aE.datamax<=0){aB=0}}}}aE.min=aD;aE.max=aB}function au(aG){var aC=aG.options;var aF;if(typeof aC.ticks=="number"&&aC.ticks>0){aF=aC.ticks}else{aF=0.3*Math.sqrt(aG.direction=="x"?af.width:af.height)}var aL=(aG.max-aG.min)/aF,aH=-Math.floor(Math.log(aL)/Math.LN10),aE=aC.tickDecimals;if(aE!=null&&aH>aE){aH=aE}var aB=Math.pow(10,-aH),aD=aL/aB,aN;if(aD<1.5){aN=1}else{if(aD<3){aN=2;if(aD>2.25&&(aE==null||aH+1<=aE)){aN=2.5;++aH}}else{if(aD<7.5){aN=5}else{aN=10}}}aN*=aB;if(aC.minTickSize!=null&&aN<aC.minTickSize){aN=aC.minTickSize}aG.delta=aL;aG.tickDecimals=Math.max(0,aE!=null?aE:aH);aG.tickSize=aC.tickSize||aN;if(aC.mode=="time"&&!aG.tickGenerator){throw new Error("Time mode requires the flot.time plugin.")}if(!aG.tickGenerator){aG.tickGenerator=function(aQ){var aS=[],aT=b(aQ.min,aQ.tickSize),aP=0,aO=Number.NaN,aR;do{aR=aO;aO=aT+aP*aQ.tickSize;aS.push(aO);++aP}while(aO<aQ.max&&aO!=aR);return aS};aG.tickFormatter=function(aT,aR){var aQ=aR.tickDecimals?Math.pow(10,aR.tickDecimals):1;var aS=""+Math.round(aT*aQ)/aQ;if(aR.tickDecimals!=null){var aP=aS.indexOf(".");var aO=aP==-1?0:aS.length-aP-1;if(aO<aR.tickDecimals){return(aO?aS:aS+".")+(""+aQ).substr(1,aR.tickDecimals-aO)}}return aS}}if(e.isFunction(aC.tickFormatter)){aG.tickFormatter=function(aO,aP){return""+aC.tickFormatter(aO,aP)}}if(aC.alignTicksWithAxis!=null){var aI=(aG.direction=="x"?ar:Z)[aC.alignTicksWithAxis-1];if(aI&&aI.used&&aI!=aG){var aM=aG.tickGenerator(aG);if(aM.length>0){if(aC.min==null){aG.min=Math.min(aG.min,aM[0])}if(aC.max==null&&aM.length>1){aG.max=Math.max(aG.max,aM[aM.length-1])}}aG.tickGenerator=function(aQ){var aR=[],aO,aP;for(aP=0;aP<aI.ticks.length;++aP){aO=(aI.ticks[aP].v-aI.min)/(aI.max-aI.min);aO=aQ.min+aO*(aQ.max-aQ.min);aR.push(aO)}return aR};if(!aG.mode&&aC.tickDecimals==null){var aK=Math.max(0,-Math.floor(Math.log(aG.delta)/Math.LN10)+1),aJ=aG.tickGenerator(aG);if(!(aJ.length>1&&/\..*0$/.test((aJ[1]-aJ[0]).toFixed(aK)))){aG.tickDecimals=aK}}}}}function Y(aF){var aH=aF.options.ticks,aG=[];if(aH==null||(typeof aH=="number"&&aH>0)){aG=aF.tickGenerator(aF)}else{if(aH){if(e.isFunction(aH)){aG=aH(aF)}else{aG=aH}}}var aE,aB;aF.ticks=[];for(aE=0;aE<aG.length;++aE){var aC=null;var aD=aG[aE];if(typeof aD=="object"){aB=+aD[0];if(aD.length>1){aC=aD[1]}}else{aB=+aD}if(aC==null){aC=aF.tickFormatter(aB,aF)}if(!isNaN(aB)){aF.ticks.push({v:aB,label:aC})}}}function x(aB,aC){if(aB.options.autoscaleMargin&&aC.length>0){if(aB.options.min==null){aB.min=Math.min(aB.min,aC[0].v)}if(aB.options.max==null&&aC.length>1){aB.max=Math.max(aB.max,aC[aC.length-1].v)}}}function ax(){af.clear();I(s.drawBackground,[G]);var aC=O.grid;if(aC.show&&aC.backgroundColor){u()}if(aC.show&&!aC.aboveData){z()}for(var aB=0;aB<w.length;++aB){I(s.drawSeries,[G,w[aB]]);am(w[aB])}I(s.draw,[G]);if(aC.show&&aC.aboveData){z()}af.render();aa()}function v(aB,aF){var aC,aH,aI,aJ,aG=m();for(var aE=0;aE<aG.length;++aE){aC=aG[aE];if(aC.direction==aF){aJ=aF+aC.n+"axis";if(!aB[aJ]&&aC.n==1){aJ=aF+"axis"}if(aB[aJ]){aH=aB[aJ].from;aI=aB[aJ].to;break}}}if(!aB[aJ]){aC=aF=="x"?ar[0]:Z[0];aH=aB[aF+"1"];aI=aB[aF+"2"]}if(aH!=null&&aI!=null&&aH>aI){var aD=aH;aH=aI;aI=aD}return{from:aH,to:aI,axis:aC}}function u(){G.save();G.translate(M.left,M.top);G.fillStyle=y(O.grid.backgroundColor,ag,0,"rgba(255, 255, 255, 0)");G.fillRect(0,0,n,ag);G.restore()}function z(){var aR,aQ,aU,aD;G.save();G.translate(M.left,M.top);var aE=O.grid.markings;if(aE){if(e.isFunction(aE)){aQ=h.getAxes();aQ.xmin=aQ.xaxis.min;aQ.xmax=aQ.xaxis.max;aQ.ymin=aQ.yaxis.min;aQ.ymax=aQ.yaxis.max;aE=aE(aQ)}for(aR=0;aR<aE.length;++aR){var aO=aE[aR],aF=v(aO,"x"),aJ=v(aO,"y");if(aF.from==null){aF.from=aF.axis.min}if(aF.to==null){aF.to=aF.axis.max}if(aJ.from==null){aJ.from=aJ.axis.min}if(aJ.to==null){aJ.to=aJ.axis.max}if(aF.to<aF.axis.min||aF.from>aF.axis.max||aJ.to<aJ.axis.min||aJ.from>aJ.axis.max){continue}aF.from=Math.max(aF.from,aF.axis.min);aF.to=Math.min(aF.to,aF.axis.max);aJ.from=Math.max(aJ.from,aJ.axis.min);aJ.to=Math.min(aJ.to,aJ.axis.max);var aG=aF.from===aF.to,aM=aJ.from===aJ.to;if(aG&&aM){continue}aF.from=Math.floor(aF.axis.p2c(aF.from));aF.to=Math.floor(aF.axis.p2c(aF.to));aJ.from=Math.floor(aJ.axis.p2c(aJ.from));aJ.to=Math.floor(aJ.axis.p2c(aJ.to));if(aG||aM){var aB=aO.lineWidth||O.grid.markingsLineWidth,aS=aB%2?0.5:0;G.beginPath();G.strokeStyle=aO.color||O.grid.markingsColor;G.lineWidth=aB;if(aG){G.moveTo(aF.to+aS,aJ.from);G.lineTo(aF.to+aS,aJ.to)}else{G.moveTo(aF.from,aJ.to+aS);G.lineTo(aF.to,aJ.to+aS)}G.stroke()}else{G.fillStyle=aO.color||O.grid.markingsColor;G.fillRect(aF.from,aJ.to,aF.to-aF.from,aJ.from-aJ.to)}}}aQ=m();aU=O.grid.borderWidth;for(var aP=0;aP<aQ.length;++aP){var aC=aQ[aP],aK=aC.box,aN=aC.tickLength,aI,aH,aT,aV;if(!aC.show||aC.ticks.length==0){continue}G.lineWidth=1;if(aC.direction=="x"){aI=0;if(aN=="full"){aH=(aC.position=="top"?0:ag)}else{aH=aK.top-M.top+(aC.position=="top"?aK.height:0)}}else{aH=0;if(aN=="full"){aI=(aC.position=="left"?0:n)}else{aI=aK.left-M.left+(aC.position=="left"?aK.width:0)}}if(!aC.innermost){G.strokeStyle=aC.options.color;G.beginPath();aT=aV=0;if(aC.direction=="x"){aT=n+1}else{aV=ag+1}if(G.lineWidth==1){if(aC.direction=="x"){aH=Math.floor(aH)+0.5}else{aI=Math.floor(aI)+0.5}}G.moveTo(aI,aH);G.lineTo(aI+aT,aH+aV);G.stroke()}G.strokeStyle=aC.options.tickColor;G.beginPath();for(aR=0;aR<aC.ticks.length;++aR){var aL=aC.ticks[aR].v;aT=aV=0;if(isNaN(aL)||aL<aC.min||aL>aC.max||(aN=="full"&&((typeof aU=="object"&&aU[aC.position]>0)||aU>0)&&(aL==aC.min||aL==aC.max))){continue}if(aC.direction=="x"){aI=aC.p2c(aL);aV=aN=="full"?-ag:aN;if(aC.position=="top"){aV=-aV}}else{aH=aC.p2c(aL);aT=aN=="full"?-n:aN;if(aC.position=="left"){aT=-aT}}if(G.lineWidth==1){if(aC.direction=="x"){aI=Math.floor(aI)+0.5}else{aH=Math.floor(aH)+0.5}}G.moveTo(aI,aH);G.lineTo(aI+aT,aH+aV)}G.stroke()}if(aU){aD=O.grid.borderColor;if(typeof aU=="object"||typeof aD=="object"){if(typeof aU!=="object"){aU={top:aU,right:aU,bottom:aU,left:aU}}if(typeof aD!=="object"){aD={top:aD,right:aD,bottom:aD,left:aD}}if(aU.top>0){G.strokeStyle=aD.top;G.lineWidth=aU.top;G.beginPath();G.moveTo(0-aU.left,0-aU.top/2);G.lineTo(n,0-aU.top/2);G.stroke()}if(aU.right>0){G.strokeStyle=aD.right;G.lineWidth=aU.right;G.beginPath();G.moveTo(n+aU.right/2,0-aU.top);G.lineTo(n+aU.right/2,ag);G.stroke()}if(aU.bottom>0){G.strokeStyle=aD.bottom;G.lineWidth=aU.bottom;G.beginPath();G.moveTo(n+aU.right,ag+aU.bottom/2);G.lineTo(0,ag+aU.bottom/2);G.stroke()}if(aU.left>0){G.strokeStyle=aD.left;G.lineWidth=aU.left;G.beginPath();G.moveTo(0-aU.left/2,ag+aU.bottom);G.lineTo(0-aU.left/2,0);G.stroke()}}else{G.lineWidth=aU;G.strokeStyle=O.grid.borderColor;G.strokeRect(-aU/2,-aU/2,n+aU,ag+aU)}}G.restore()}function aw(){e.each(m(),function(aM,aC){var aF=aC.box,aE=aC.direction+"Axis "+aC.direction+aC.n+"Axis",aI="flot-"+aC.direction+"-axis flot-"+aC.direction+aC.n+"-axis "+aE,aB=aC.options.font||"flot-tick-label tickLabel",aG,aL,aJ,aH,aK;af.removeText(aI);if(!aC.show||aC.ticks.length==0){return}for(var aD=0;aD<aC.ticks.length;++aD){aG=aC.ticks[aD];if(!aG.label||aG.v<aC.min||aG.v>aC.max){continue}if(aC.direction=="x"){aH="center";aL=M.left+aC.p2c(aG.v);if(aC.position=="bottom"){aJ=aF.top+aF.padding}else{aJ=aF.top+aF.height-aF.padding;aK="bottom"}}else{aK="middle";aJ=M.top+aC.p2c(aG.v);if(aC.position=="left"){aL=aF.left+aF.width-aF.padding;aH="right"}else{aL=aF.left+aF.padding}}af.addText(aI,aL,aJ,aG.label,aB,null,null,aH,aK)}})}function am(aB){if(aB.lines.show){J(aB)}if(aB.bars.show){W(aB)}if(aB.points.show){X(aB)}}function J(aE){function aD(aP,aQ,aI,aU,aT){var aV=aP.points,aJ=aP.pointsize,aN=null,aM=null;G.beginPath();for(var aO=aJ;aO<aV.length;aO+=aJ){var aL=aV[aO-aJ],aS=aV[aO-aJ+1],aK=aV[aO],aR=aV[aO+1];if(aL==null||aK==null){continue}if(aS<=aR&&aS<aT.min){if(aR<aT.min){continue}aL=(aT.min-aS)/(aR-aS)*(aK-aL)+aL;aS=aT.min}else{if(aR<=aS&&aR<aT.min){if(aS<aT.min){continue}aK=(aT.min-aS)/(aR-aS)*(aK-aL)+aL;aR=aT.min}}if(aS>=aR&&aS>aT.max){if(aR>aT.max){continue}aL=(aT.max-aS)/(aR-aS)*(aK-aL)+aL;aS=aT.max}else{if(aR>=aS&&aR>aT.max){if(aS>aT.max){continue}aK=(aT.max-aS)/(aR-aS)*(aK-aL)+aL;aR=aT.max}}if(aL<=aK&&aL<aU.min){if(aK<aU.min){continue}aS=(aU.min-aL)/(aK-aL)*(aR-aS)+aS;aL=aU.min}else{if(aK<=aL&&aK<aU.min){if(aL<aU.min){continue}aR=(aU.min-aL)/(aK-aL)*(aR-aS)+aS;aK=aU.min}}if(aL>=aK&&aL>aU.max){if(aK>aU.max){continue}aS=(aU.max-aL)/(aK-aL)*(aR-aS)+aS;aL=aU.max}else{if(aK>=aL&&aK>aU.max){if(aL>aU.max){continue}aR=(aU.max-aL)/(aK-aL)*(aR-aS)+aS;aK=aU.max}}if(aL!=aN||aS!=aM){G.moveTo(aU.p2c(aL)+aQ,aT.p2c(aS)+aI)}aN=aK;aM=aR;G.lineTo(aU.p2c(aK)+aQ,aT.p2c(aR)+aI)}G.stroke()}function aF(aI,aQ,aP){var aW=aI.points,aV=aI.pointsize,aN=Math.min(Math.max(0,aP.min),aP.max),aX=0,aU,aT=false,aM=1,aL=0,aR=0;while(true){if(aV>0&&aX>aW.length+aV){break}aX+=aV;var aZ=aW[aX-aV],aK=aW[aX-aV+aM],aY=aW[aX],aJ=aW[aX+aM];if(aT){if(aV>0&&aZ!=null&&aY==null){aR=aX;aV=-aV;aM=2;continue}if(aV<0&&aX==aL+aV){G.fill();aT=false;aV=-aV;aM=1;aX=aL=aR+aV;continue}}if(aZ==null||aY==null){continue}if(aZ<=aY&&aZ<aQ.min){if(aY<aQ.min){continue}aK=(aQ.min-aZ)/(aY-aZ)*(aJ-aK)+aK;aZ=aQ.min}else{if(aY<=aZ&&aY<aQ.min){if(aZ<aQ.min){continue}aJ=(aQ.min-aZ)/(aY-aZ)*(aJ-aK)+aK;aY=aQ.min}}if(aZ>=aY&&aZ>aQ.max){if(aY>aQ.max){continue}aK=(aQ.max-aZ)/(aY-aZ)*(aJ-aK)+aK;aZ=aQ.max}else{if(aY>=aZ&&aY>aQ.max){if(aZ>aQ.max){continue}aJ=(aQ.max-aZ)/(aY-aZ)*(aJ-aK)+aK;aY=aQ.max}}if(!aT){G.beginPath();G.moveTo(aQ.p2c(aZ),aP.p2c(aN));aT=true}if(aK>=aP.max&&aJ>=aP.max){G.lineTo(aQ.p2c(aZ),aP.p2c(aP.max));G.lineTo(aQ.p2c(aY),aP.p2c(aP.max));continue}else{if(aK<=aP.min&&aJ<=aP.min){G.lineTo(aQ.p2c(aZ),aP.p2c(aP.min));G.lineTo(aQ.p2c(aY),aP.p2c(aP.min));continue}}var aO=aZ,aS=aY;if(aK<=aJ&&aK<aP.min&&aJ>=aP.min){aZ=(aP.min-aK)/(aJ-aK)*(aY-aZ)+aZ;aK=aP.min}else{if(aJ<=aK&&aJ<aP.min&&aK>=aP.min){aY=(aP.min-aK)/(aJ-aK)*(aY-aZ)+aZ;aJ=aP.min}}if(aK>=aJ&&aK>aP.max&&aJ<=aP.max){aZ=(aP.max-aK)/(aJ-aK)*(aY-aZ)+aZ;aK=aP.max}else{if(aJ>=aK&&aJ>aP.max&&aK<=aP.max){aY=(aP.max-aK)/(aJ-aK)*(aY-aZ)+aZ;aJ=aP.max}}if(aZ!=aO){G.lineTo(aQ.p2c(aO),aP.p2c(aK))}G.lineTo(aQ.p2c(aZ),aP.p2c(aK));G.lineTo(aQ.p2c(aY),aP.p2c(aJ));if(aY!=aS){G.lineTo(aQ.p2c(aY),aP.p2c(aJ));G.lineTo(aQ.p2c(aS),aP.p2c(aJ))}}}G.save();G.translate(M.left,M.top);G.lineJoin="round";var aG=aE.lines.lineWidth,aB=aE.shadowSize;if(aG>0&&aB>0){G.lineWidth=aB;G.strokeStyle="rgba(0,0,0,0.1)";var aH=Math.PI/18;aD(aE.datapoints,Math.sin(aH)*(aG/2+aB/2),Math.cos(aH)*(aG/2+aB/2),aE.xaxis,aE.yaxis);G.lineWidth=aB/2;aD(aE.datapoints,Math.sin(aH)*(aG/2+aB/4),Math.cos(aH)*(aG/2+aB/4),aE.xaxis,aE.yaxis)}G.lineWidth=aG;G.strokeStyle=aE.color;var aC=C(aE.lines,aE.color,0,ag);if(aC){G.fillStyle=aC;aF(aE.datapoints,aE.xaxis,aE.yaxis)}if(aG>0){aD(aE.datapoints,0,0,aE.xaxis,aE.yaxis)}G.restore()}function X(aE){function aH(aN,aM,aU,aK,aS,aT,aQ,aJ){var aR=aN.points,aI=aN.pointsize;for(var aL=0;aL<aR.length;aL+=aI){var aP=aR[aL],aO=aR[aL+1];if(aP==null||aP<aT.min||aP>aT.max||aO<aQ.min||aO>aQ.max){continue}G.beginPath();aP=aT.p2c(aP);aO=aQ.p2c(aO)+aK;if(aJ=="circle"){G.arc(aP,aO,aM,0,aS?Math.PI:Math.PI*2,false)}else{aJ(G,aP,aO,aM,aS)}G.closePath();if(aU){G.fillStyle=aU;G.fill()}G.stroke()}}G.save();G.translate(M.left,M.top);var aG=aE.points.lineWidth,aC=aE.shadowSize,aB=aE.points.radius,aF=aE.points.symbol;if(aG==0){aG=0.0001}if(aG>0&&aC>0){var aD=aC/2;G.lineWidth=aD;G.strokeStyle="rgba(0,0,0,0.1)";aH(aE.datapoints,aB,null,aD+aD/2,true,aE.xaxis,aE.yaxis,aF);G.strokeStyle="rgba(0,0,0,0.2)";aH(aE.datapoints,aB,null,aD/2,true,aE.xaxis,aE.yaxis,aF)}G.lineWidth=aG;G.strokeStyle=aE.color;aH(aE.datapoints,aB,C(aE.points,aE.color),0,false,aE.xaxis,aE.yaxis,aF);G.restore()}function an(aM,aL,aU,aH,aP,aD,aK,aJ,aT,aQ,aC){var aE,aS,aI,aO,aF,aB,aN,aG,aR;if(aQ){aG=aB=aN=true;aF=false;aE=aU;aS=aM;aO=aL+aH;aI=aL+aP;if(aS<aE){aR=aS;aS=aE;aE=aR;aF=true;aB=false}}else{aF=aB=aN=true;aG=false;aE=aM+aH;aS=aM+aP;aI=aU;aO=aL;if(aO<aI){aR=aO;aO=aI;aI=aR;aG=true;aN=false}}if(aS<aK.min||aE>aK.max||aO<aJ.min||aI>aJ.max){return}if(aE<aK.min){aE=aK.min;aF=false}if(aS>aK.max){aS=aK.max;aB=false}if(aI<aJ.min){aI=aJ.min;aG=false}if(aO>aJ.max){aO=aJ.max;aN=false}aE=aK.p2c(aE);aI=aJ.p2c(aI);aS=aK.p2c(aS);aO=aJ.p2c(aO);if(aD){aT.fillStyle=aD(aI,aO);aT.fillRect(aE,aO,aS-aE,aI-aO)}if(aC>0&&(aF||aB||aN||aG)){aT.beginPath();aT.moveTo(aE,aI);if(aF){aT.lineTo(aE,aO)}else{aT.moveTo(aE,aO)}if(aN){aT.lineTo(aS,aO)}else{aT.moveTo(aS,aO)}if(aB){aT.lineTo(aS,aI)}else{aT.moveTo(aS,aI)}if(aG){aT.lineTo(aE,aI)}else{aT.moveTo(aE,aI)}aT.stroke()}}function W(aD){function aC(aI,aH,aK,aJ,aM,aL){var aN=aI.points,aF=aI.pointsize;for(var aG=0;aG<aN.length;aG+=aF){if(aN[aG]==null){continue}an(aN[aG],aN[aG+1],aN[aG+2],aH,aK,aJ,aM,aL,G,aD.bars.horizontal,aD.bars.lineWidth)}}G.save();G.translate(M.left,M.top);G.lineWidth=aD.bars.lineWidth;G.strokeStyle=aD.color;var aB;switch(aD.bars.align){case"left":aB=0;break;case"right":aB=-aD.bars.barWidth;break;default:aB=-aD.bars.barWidth/2}var aE=aD.bars.fill?function(aF,aG){return C(aD.bars,aD.color,aF,aG)}:null;aC(aD.datapoints,aB,aB+aD.bars.barWidth,aE,aD.xaxis,aD.yaxis);G.restore()}function C(aD,aB,aC,aF){var aE=aD.fill;if(!aE){return null}if(aD.fillColor){return y(aD.fillColor,aC,aF,aB)}var aG=e.color.parse(aB);aG.a=typeof aE=="number"?aE:0.4;aG.normalize();return aG.toString()}function ay(){if(O.legend.container!=null){e(O.legend.container).html("")}else{T.find(".legend").remove()}if(!O.legend.show){return}var aJ=[],aG=[],aH=false,aQ=O.legend.labelFormatter,aP,aL;for(var aF=0;aF<w.length;++aF){aP=w[aF];if(aP.label){aL=aQ?aQ(aP.label,aP):aP.label;if(aL){aG.push({label:aL,color:aP.color})}}}if(O.legend.sorted){if(e.isFunction(O.legend.sorted)){aG.sort(O.legend.sorted)}else{if(O.legend.sorted=="reverse"){aG.reverse()}else{var aE=O.legend.sorted!="descending";aG.sort(function(aS,aR){return aS.label==aR.label?0:((aS.label<aR.label)!=aE?1:-1)})}}}for(var aF=0;aF<aG.length;++aF){var aN=aG[aF];if(aF%O.legend.noColumns==0){if(aH){aJ.push("</tr>")}aJ.push("<tr>");aH=true}aJ.push('<td class="legendColorBox"><div style="border:1px solid '+O.legend.labelBoxBorderColor+';padding:1px"><div style="width:4px;height:0;border:5px solid '+aN.color+';overflow:hidden"></div></div></td><td class="legendLabel">'+aN.label+"</td>")}if(aH){aJ.push("</tr>")}if(aJ.length==0){return}var aO='<table style="font-size:smaller;color:'+O.grid.color+'">'+aJ.join("")+"</table>";if(O.legend.container!=null){e(O.legend.container).html(aO)}else{var aK="",aC=O.legend.position,aD=O.legend.margin;if(aD[0]==null){aD=[aD,aD]}if(aC.charAt(0)=="n"){aK+="top:"+(aD[1]+M.top)+"px;"}else{if(aC.charAt(0)=="s"){aK+="bottom:"+(aD[1]+M.bottom)+"px;"}}if(aC.charAt(1)=="e"){aK+="right:"+(aD[0]+M.right)+"px;"}else{if(aC.charAt(1)=="w"){aK+="left:"+(aD[0]+M.left)+"px;"}}var aM=e('<div class="legend">'+aO.replace('style="','style="position:absolute;'+aK+";")+"</div>").appendTo(T);if(O.legend.backgroundOpacity!=0){var aI=O.legend.backgroundColor;if(aI==null){aI=O.grid.backgroundColor;if(aI&&typeof aI=="string"){aI=e.color.parse(aI)}else{aI=e.color.extract(aM,"background-color")}aI.a=1;aI=aI.toString()}var aB=aM.children();e('<div style="position:absolute;width:'+aB.width()+"px;height:"+aB.height()+"px;"+aK+"background-color:"+aI+';"> </div>').prependTo(aM).css("opacity",O.legend.backgroundOpacity)}}}var aj=[],o=null;function at(aI,aG,aD){var aO=O.grid.mouseActiveRadius,a0=aO*aO+1,aY=null,aR=false,aW,aU,aT;for(aW=w.length-1;aW>=0;--aW){if(!aD(w[aW])){continue}var aP=w[aW],aH=aP.xaxis,aF=aP.yaxis,aV=aP.datapoints.points,aQ=aH.c2p(aI),aN=aF.c2p(aG),aC=aO/aH.scale,aB=aO/aF.scale;aT=aP.datapoints.pointsize;if(aH.options.inverseTransform){aC=Number.MAX_VALUE}if(aF.options.inverseTransform){aB=Number.MAX_VALUE}if(aP.lines.show||aP.points.show){for(aU=0;aU<aV.length;aU+=aT){var aK=aV[aU],aJ=aV[aU+1];if(aK==null){continue}if(aK-aQ>aC||aK-aQ<-aC||aJ-aN>aB||aJ-aN<-aB){continue}var aM=Math.abs(aH.p2c(aK)-aI),aL=Math.abs(aF.p2c(aJ)-aG),aS=aM*aM+aL*aL;if(aS<a0){a0=aS;aY=[aW,aU/aT]}}}if(aP.bars.show&&!aY){var aE,aX;switch(aP.bars.align){case"left":aE=0;break;case"right":aE=-aP.bars.barWidth;break;default:aE=-aP.bars.barWidth/2}aX=aE+aP.bars.barWidth;for(aU=0;aU<aV.length;aU+=aT){var aK=aV[aU],aJ=aV[aU+1],aZ=aV[aU+2];if(aK==null){continue}if(w[aW].bars.horizontal?(aQ<=Math.max(aZ,aK)&&aQ>=Math.min(aZ,aK)&&aN>=aJ+aE&&aN<=aJ+aX):(aQ>=aK+aE&&aQ<=aK+aX&&aN>=Math.min(aZ,aJ)&&aN<=Math.max(aZ,aJ))){aY=[aW,aU/aT]}}}}if(aY){aW=aY[0];aU=aY[1];aT=w[aW].datapoints.pointsize;return{datapoint:w[aW].datapoints.points.slice(aU*aT,(aU+1)*aT),dataIndex:aU,series:w[aW],seriesIndex:aW}}return null}function f(aB){if(O.grid.hoverable){j("plothover",aB,function(aC){return aC.hoverable!=false})}}function S(aB){if(O.grid.hoverable){j("plothover",aB,function(aC){return false})}}function L(aB){j("plotclick",aB,function(aC){return aC.clickable!=false})}function j(aC,aB,aD){var aE=ap.offset(),aH=aB.pageX-aE.left-M.left,aF=aB.pageY-aE.top-M.top,aJ=ab({left:aH,top:aF});aJ.pageX=aB.pageX;aJ.pageY=aB.pageY;var aK=at(aH,aF,aD);if(aK){aK.pageX=parseInt(aK.series.xaxis.p2c(aK.datapoint[0])+aE.left+M.left,10);aK.pageY=parseInt(aK.series.yaxis.p2c(aK.datapoint[1])+aE.top+M.top,10)}if(O.grid.autoHighlight){for(var aG=0;aG<aj.length;++aG){var aI=aj[aG];if(aI.auto==aC&&!(aK&&aI.series==aK.series&&aI.point[0]==aK.datapoint[0]&&aI.point[1]==aK.datapoint[1])){ak(aI.series,aI.point)}}if(aK){aq(aK.series,aK.datapoint,aC)}}T.trigger(aC,[aJ,aK])}function aa(){var aB=O.interaction.redrawOverlayInterval;if(aB==-1){ai();return}if(!o){o=setTimeout(ai,aB)}}function ai(){o=null;az.save();ao.clear();az.translate(M.left,M.top);var aC,aB;for(aC=0;aC<aj.length;++aC){aB=aj[aC];if(aB.series.bars.show){al(aB.series,aB.point)}else{ah(aB.series,aB.point)}}az.restore();I(s.drawOverlay,[az])}function aq(aD,aB,aF){if(typeof aD=="number"){aD=w[aD]}if(typeof aB=="number"){var aE=aD.datapoints.pointsize;aB=aD.datapoints.points.slice(aE*aB,aE*(aB+1))}var aC=Q(aD,aB);if(aC==-1){aj.push({series:aD,point:aB,auto:aF});aa()}else{if(!aF){aj[aC].auto=false}}}function ak(aD,aB){if(aD==null&&aB==null){aj=[];aa();return}if(typeof aD=="number"){aD=w[aD]}if(typeof aB=="number"){var aE=aD.datapoints.pointsize;aB=aD.datapoints.points.slice(aE*aB,aE*(aB+1))}var aC=Q(aD,aB);if(aC!=-1){aj.splice(aC,1);aa()}}function Q(aD,aE){for(var aB=0;aB<aj.length;++aB){var aC=aj[aB];if(aC.series==aD&&aC.point[0]==aE[0]&&aC.point[1]==aE[1]){return aB}}return -1}function ah(aB,aH){var aF=aH[0],aD=aH[1],aI=aB.xaxis,aG=aB.yaxis,aJ=(typeof aB.highlightColor==="string")?aB.highlightColor:e.color.parse(aB.color).scale("a",0.5).toString();if(aF<aI.min||aF>aI.max||aD<aG.min||aD>aG.max){return}var aE=aB.points.radius+aB.points.lineWidth/2;az.lineWidth=aE;az.strokeStyle=aJ;var aC=1.5*aE;aF=aI.p2c(aF);aD=aG.p2c(aD);az.beginPath();if(aB.points.symbol=="circle"){az.arc(aF,aD,aC,0,2*Math.PI,false)}else{aB.points.symbol(az,aF,aD,aC,false)}az.closePath();az.stroke()}function al(aE,aB){var aF=(typeof aE.highlightColor==="string")?aE.highlightColor:e.color.parse(aE.color).scale("a",0.5).toString(),aD=aF,aC;switch(aE.bars.align){case"left":aC=0;break;case"right":aC=-aE.bars.barWidth;break;default:aC=-aE.bars.barWidth/2}az.lineWidth=aE.bars.lineWidth;az.strokeStyle=aF;an(aB[0],aB[1],aB[2]||0,aC,aC+aE.bars.barWidth,function(){return aD},aE.xaxis,aE.yaxis,az,aE.bars.horizontal,aE.bars.lineWidth)}function y(aJ,aB,aH,aC){if(typeof aJ=="string"){return aJ}else{var aI=G.createLinearGradient(0,aH,0,aB);for(var aE=0,aD=aJ.colors.length;aE<aD;++aE){var aF=aJ.colors[aE];if(typeof aF!="string"){var aG=e.color.parse(aC);if(aF.brightness!=null){aG=aG.scale("rgb",aF.brightness)}if(aF.opacity!=null){aG.a*=aF.opacity}aF=aG.toString()}aI.addColorStop(aE/(aD-1),aF)}return aI}}}e.plot=function(j,g,f){var h=new c(e(j),g,f,e.plot.plugins);return h};e.plot.version="0.8.3";e.plot.plugins=[];e.fn.plot=function(g,f){return this.each(function(){e.plot(this,g,f)})};function b(g,f){return f*Math.floor(g/f)}})(jQuery);(function(c){var e=10;var a=0.95;function d(z){var h=null,E=null,j=null,q=null,w=null,r=null,f=false,y=null;var m=[];z.hooks.processOptions.push(function(G,F){if(F.series.pie.show){F.grid.show=false;if(F.series.pie.label.show=="auto"){if(F.legend.show){F.series.pie.label.show=false}else{F.series.pie.label.show=true}}if(F.series.pie.radius=="auto"){if(F.series.pie.label.show){F.series.pie.radius=3/4}else{F.series.pie.radius=1}}if(F.series.pie.tilt>1){F.series.pie.tilt=1}else{if(F.series.pie.tilt<0){F.series.pie.tilt=0}}}});z.hooks.bindEvents.push(function(H,F){var G=H.getOptions();if(G.series.pie.show){if(G.grid.hoverable){F.unbind("mousemove").mousemove(v)}if(G.grid.clickable){F.unbind("click").click(o);c(H.getPlaceholder().children(".pieLabel")).each(function(I,J){c(this).unbind("click").click(o)})}}});z.hooks.processDatapoints.push(function(J,G,H,I){var F=J.getOptions();if(F.series.pie.show){A(J,G,H,I)}});z.hooks.drawOverlay.push(function(G,H){var F=G.getOptions();if(F.series.pie.show){B(G,H)}});z.hooks.draw.push(function(H,G){var F=H.getOptions();if(F.series.pie.show){s(H,G)}});function A(H,F,G){if(!f){f=true;h=H.getCanvas();E=c(h).parent();j=H.getOptions();H.setData(D(H.getData()))}}function D(K){var I=0,H=0,M=0,F=j.series.pie.combine.color,L=[];for(var G=0;G<K.length;++G){var J=K[G].data;if(c.isArray(J)&&J.length==1){J=J[0]}if(c.isArray(J)){if(!isNaN(parseFloat(J[1]))&&isFinite(J[1])){J[1]=+J[1]}else{J[1]=0}}else{if(!isNaN(parseFloat(J))&&isFinite(J)){J=[1,+J]}else{J=[1,0]}}K[G].data=[J]}for(var G=0;G<K.length;++G){I+=K[G].data[0][1]}for(var G=0;G<K.length;++G){var J=K[G].data[0][1];if(J/I<=j.series.pie.combine.threshold){H+=J;M++;if(!F){F=K[G].color}}}for(var G=0;G<K.length;++G){var J=K[G].data[0][1];if(M<2||J/I>j.series.pie.combine.threshold){L.push(c.extend(K[G],{data:[[1,J]],color:K[G].color,label:K[G].label,angle:J*Math.PI*2/I,percent:J/(I/100)}))}}if(M>1){L.push({data:[[1,H]],color:F,label:j.series.pie.combine.label,angle:H*Math.PI*2/I,percent:H/(I/100)})}return L}function s(K,N){if(!E){return}var G=K.getPlaceholder().width(),I=K.getPlaceholder().height(),M=E.children().filter(".legend").children().width()||0;y=N;f=false;q=Math.min(G,I/j.series.pie.tilt)/2;r=I/2+j.series.pie.offset.top;w=G/2;if(j.series.pie.offset.left=="auto"){if(j.legend.position.match("w")){w+=M/2}else{w-=M/2}if(w<q){w=q}else{if(w>G-q){w=G-q}}}else{w+=j.series.pie.offset.left}var L=K.getData(),O=0;do{if(O>0){q*=a}O+=1;J();if(j.series.pie.tilt<=0.8){H()}}while(!F()&&O<e);if(O>=e){J();E.prepend("<div class='error'>Could not draw pie with labels contained inside canvas</div>")}if(K.setSeries&&K.insertLegend){K.setSeries(L);K.insertLegend()}function J(){y.clearRect(0,0,G,I);E.children().filter(".pieLabel, .pieLabelBackground").remove()}function H(){var U=j.series.pie.shadow.left;var T=j.series.pie.shadow.top;var R=10;var S=j.series.pie.shadow.alpha;var P=j.series.pie.radius>1?j.series.pie.radius:q*j.series.pie.radius;if(P>=G/2-U||P*j.series.pie.tilt>=I/2-T||P<=R){return}y.save();y.translate(U,T);y.globalAlpha=S;y.fillStyle="#000";y.translate(w,r);y.scale(1,j.series.pie.tilt);for(var Q=1;Q<=R;Q++){y.beginPath();y.arc(0,0,P,0,Math.PI*2,false);y.fill();P-=Q}y.restore()}function F(){var S=Math.PI*j.series.pie.startAngle;var P=j.series.pie.radius>1?j.series.pie.radius:q*j.series.pie.radius;y.save();y.translate(w,r);y.scale(1,j.series.pie.tilt);y.save();var U=S;for(var R=0;R<L.length;++R){L[R].startAngle=U;T(L[R].angle,L[R].color,true)}y.restore();if(j.series.pie.stroke.width>0){y.save();y.lineWidth=j.series.pie.stroke.width;U=S;for(var R=0;R<L.length;++R){T(L[R].angle,j.series.pie.stroke.color,false)}y.restore()}C(y);y.restore();if(j.series.pie.label.show){return Q()}else{return true}function T(X,V,W){if(X<=0||isNaN(X)){return}if(W){y.fillStyle=V}else{y.strokeStyle=V;y.lineJoin="round"}y.beginPath();if(Math.abs(X-Math.PI*2)>1e-9){y.moveTo(0,0)}y.arc(0,0,P,U,U+X/2,false);y.arc(0,0,P,U+X/2,U+X,false);y.closePath();U+=X;if(W){y.fill()}else{y.stroke()}}function Q(){var Y=S;var V=j.series.pie.label.radius>1?j.series.pie.label.radius:q*j.series.pie.label.radius;for(var X=0;X<L.length;++X){if(L[X].percent>=j.series.pie.label.threshold*100){if(!W(L[X],Y,X)){return false}}Y+=L[X].angle}return true;function W(al,ae,ac){if(al.data[0][1]==0){return true}var an=j.legend.labelFormatter,am,aa=j.series.pie.label.formatter;if(an){am=an(al.label,al)}else{am=al.label}if(aa){am=aa(am,al)}var af=((ae+al.angle)+ae)/2;var ak=w+Math.round(Math.cos(af)*V);var ai=r+Math.round(Math.sin(af)*V)*j.series.pie.tilt;var ab="<span class='pieLabel' id='pieLabel"+ac+"' style='position:absolute;top:"+ai+"px;left:"+ak+"px;'>"+am+"</span>";E.append(ab);var aj=E.children("#pieLabel"+ac);var Z=(ai-aj.height()/2);var ad=(ak-aj.width()/2);aj.css("top",Z);aj.css("left",ad);if(0-Z>0||0-ad>0||I-(Z+aj.height())<0||G-(ad+aj.width())<0){return false}if(j.series.pie.label.background.opacity!=0){var ag=j.series.pie.label.background.color;if(ag==null){ag=al.color}var ah="top:"+Z+"px;left:"+ad+"px;";c("<div class='pieLabelBackground' style='position:absolute;width:"+aj.width()+"px;height:"+aj.height()+"px;"+ah+"background-color:"+ag+";'></div>").css("opacity",j.series.pie.label.background.opacity).insertBefore(aj)}return true}}}}function C(F){if(j.series.pie.innerRadius>0){F.save();var G=j.series.pie.innerRadius>1?j.series.pie.innerRadius:q*j.series.pie.innerRadius;F.globalCompositeOperation="destination-out";F.beginPath();F.fillStyle=j.series.pie.stroke.color;F.arc(0,0,G,0,Math.PI*2,false);F.fill();F.closePath();F.restore();F.save();F.beginPath();F.strokeStyle=j.series.pie.stroke.color;F.arc(0,0,G,0,Math.PI*2,false);F.stroke();F.closePath();F.restore()}}function t(I,J){for(var K=false,H=-1,F=I.length,G=F-1;++H<F;G=H){((I[H][1]<=J[1]&&J[1]<I[G][1])||(I[G][1]<=J[1]&&J[1]<I[H][1]))&&(J[0]<(I[G][0]-I[H][0])*(J[1]-I[H][1])/(I[G][1]-I[H][1])+I[H][0])&&(K=!K)}return K}function u(N,M){var H=z.getData(),K=z.getOptions(),L=K.series.pie.radius>1?K.series.pie.radius:q*K.series.pie.radius,Q,O;for(var X=0;X<H.length;++X){var T=H[X];if(T.pie.show){y.save();y.beginPath();y.moveTo(0,0);y.arc(0,0,L,T.startAngle,T.startAngle+T.angle/2,false);y.arc(0,0,L,T.startAngle+T.angle/2,T.startAngle+T.angle,false);y.closePath();Q=N-w;O=M-r;if(y.isPointInPath){if(y.isPointInPath(N-w,M-r)){y.restore();return{datapoint:[T.percent,T.data],dataIndex:0,series:T,seriesIndex:X}}}else{var W=L*Math.cos(T.startAngle),V=L*Math.sin(T.startAngle),I=L*Math.cos(T.startAngle+T.angle/4),F=L*Math.sin(T.startAngle+T.angle/4),R=L*Math.cos(T.startAngle+T.angle/2),P=L*Math.sin(T.startAngle+T.angle/2),Z=L*Math.cos(T.startAngle+T.angle/1.5),Y=L*Math.sin(T.startAngle+T.angle/1.5),J=L*Math.cos(T.startAngle+T.angle),G=L*Math.sin(T.startAngle+T.angle),U=[[0,0],[W,V],[I,F],[R,P],[Z,Y],[J,G]],S=[Q,O];if(t(U,S)){y.restore();return{datapoint:[T.percent,T.data],dataIndex:0,series:T,seriesIndex:X}}}y.restore()}}return null}function v(F){p("plothover",F)}function o(F){p("plotclick",F)}function p(F,L){var G=z.offset();var J=parseInt(L.pageX-G.left);var H=parseInt(L.pageY-G.top);var N=u(J,H);if(j.grid.autoHighlight){for(var I=0;I<m.length;++I){var K=m[I];if(K.auto==F&&!(N&&K.series==N.series)){g(K.series)}}}if(N){n(N.series,F)}var M={pageX:L.pageX,pageY:L.pageY};E.trigger(F,[M,N])}function n(G,H){var F=x(G);if(F==-1){m.push({series:G,auto:H});z.triggerRedrawOverlay()}else{if(!H){m[F].auto=false}}}function g(G){if(G==null){m=[];z.triggerRedrawOverlay()}var F=x(G);if(F!=-1){m.splice(F,1);z.triggerRedrawOverlay()}}function x(H){for(var F=0;F<m.length;++F){var G=m[F];if(G.series==H){return F}}return -1}function B(J,K){var H=J.getOptions();var F=H.series.pie.radius>1?H.series.pie.radius:q*H.series.pie.radius;K.save();K.translate(w,r);K.scale(1,H.series.pie.tilt);for(var I=0;I<m.length;++I){G(m[I].series)}C(K);K.restore();function G(L){if(L.angle<=0||isNaN(L.angle)){return}K.fillStyle="rgba(255, 255, 255, "+H.series.pie.highlight.opacity+")";K.beginPath();if(Math.abs(L.angle-Math.PI*2)>1e-9){K.moveTo(0,0)}K.arc(0,0,F,L.startAngle,L.startAngle+L.angle/2,false);K.arc(0,0,F,L.startAngle+L.angle/2,L.startAngle+L.angle,false);K.closePath();K.fill()}}z.pie={unSelect:function(){m=[];z.triggerRedrawOverlay()}}}var b={series:{pie:{show:false,radius:"auto",innerRadius:0,startAngle:3/2,tilt:1,shadow:{left:5,top:15,alpha:0.02},offset:{top:0,left:"auto"},stroke:{color:"#fff",width:1},label:{show:"auto",formatter:function(f,g){return"<div style='font-size:x-small;text-align:center;padding:2px;color:"+g.color+";'>"+f+"<br/>"+Math.round(g.percent)+"%</div>"},radius:1,background:{color:null,opacity:0},threshold:0},combine:{threshold:-1,color:null,label:"Other"},highlight:{opacity:0.5}}}};c.plot.plugins.push({init:d,options:b,name:"pie",version:"1.1"})})(jQuery);(function(b){var a={series:{stack:null}};function c(f){function d(m,j){var h=null;for(var g=0;g<j.length;++g){if(m==j[g]){break}if(j[g].stack==m.stack){h=j[g]}}return h}function e(E,w,g){if(w.stack==null||w.stack===false){return}var q=d(w,E.getData());if(!q){return}var B=g.pointsize,H=g.points,h=q.datapoints.pointsize,z=q.datapoints.points,u=[],y,x,n,L,K,t,v=w.lines.show,I=w.bars.horizontal,p=B>2&&(I?g.format[2].x:g.format[2].y),o=v&&w.lines.steps,G=true,r=I?1:0,J=I?0:1,F=0,D=0,C,A;while(true){if(F>=H.length){break}C=u.length;if(H[F]==null){for(A=0;A<B;++A){u.push(H[F+A])}F+=B}else{if(D>=z.length){if(!v){for(A=0;A<B;++A){u.push(H[F+A])}}F+=B}else{if(z[D]==null){for(A=0;A<B;++A){u.push(null)}G=true;D+=h}else{y=H[F+r];x=H[F+J];L=z[D+r];K=z[D+J];t=0;if(y==L){for(A=0;A<B;++A){u.push(H[F+A])}u[C+J]+=K;t=K;F+=B;D+=h}else{if(y>L){if(v&&F>0&&H[F-B]!=null){n=x+(H[F-B+J]-x)*(L-y)/(H[F-B+r]-y);u.push(L);u.push(n+K);for(A=2;A<B;++A){u.push(H[F+A])}t=K}D+=h}else{if(G&&v){F+=B;continue}for(A=0;A<B;++A){u.push(H[F+A])}if(v&&D>0&&z[D-h]!=null){t=K+(z[D-h+J]-K)*(y-L)/(z[D-h+r]-L)}u[C+J]+=t;F+=B}}G=false;if(C!=u.length&&p){u[C+2]+=t}}}}if(o&&C!=u.length&&C>0&&u[C]!=null&&u[C]!=u[C-B]&&u[C+1]!=u[C-B+1]){for(A=0;A<B;++A){u[C+B+A]=u[C+A]}u[C+1]=u[C-B+1]}}g.points=u}f.hooks.processDatapoints.push(e)}b.plot.plugins.push({init:c,options:a,name:"stack",version:"1.2"})})(jQuery);
/*! DataTables 1.10.9
 * ©2008-2015 SpryMedia Ltd - datatables.net/license
 */
(function(b,a,c){(function(d){if(typeof define==="function"&&define.amd){define("datatables",["jquery"],d)}else{if(typeof exports==="object"){module.exports=d(require("jquery"))}else{if(jQuery&&!jQuery.fn.dataTable){d(jQuery)}}}}(function(bH){var Q;var L;var M;var bm;var aE;var ba={};var Z=/[\r\n]/g;var aX=/<.*?>/g;var aq=/^[\w\+\-]/;var bx=/[\w\+\-]$/;var aG=new RegExp("(\\"+["/",".","*","+","?","|","(",")","[","]","{","}","\\","$","^","-"].join("|\\")+")","g");var bI=/[',$£€¥%\u2009\u202F\u20BD\u20a9\u20BArfk]/gi;var bD=function(bT){return !bT||bT===true||bT==="-"?true:false};var I=function(bU){var bT=parseInt(bU,10);return !isNaN(bT)&&isFinite(bU)?bT:null};var bF=function(bU,bT){if(!ba[bT]){ba[bT]=new RegExp(p(bT),"g")}return typeof bU==="string"&&bT!=="."?bU.replace(/\./g,"").replace(ba[bT],"."):bU};var an=function(bW,bT,bV){var bU=typeof bW==="string";if(bD(bW)){return true}if(bT&&bU){bW=bF(bW,bT)}if(bV&&bU){bW=bW.replace(bI,"")}return !isNaN(parseFloat(bW))&&isFinite(bW)};var bO=function(bT){return bD(bT)||typeof bT==="string"};var m=function(bW,bT,bV){if(bD(bW)){return true}var bU=bO(bW);return !bU?null:an(G(bW),bT,bV)?true:null};var ay=function(bU,bY,bX){var bV=[];var bW=0,bT=bU.length;if(bX!==c){for(;bW<bT;bW++){if(bU[bW]&&bU[bW][bY]){bV.push(bU[bW][bY][bX])}}}else{for(;bW<bT;bW++){if(bU[bW]){bV.push(bU[bW][bY])}}}return bV};var w=function(bV,bT,bZ,bY){var bW=[];var bX=0,bU=bT.length;if(bY!==c){for(;bX<bU;bX++){if(bV[bT[bX]][bZ]){bW.push(bV[bT[bX]][bZ][bY])}}}else{for(;bX<bU;bX++){bW.push(bV[bT[bX]][bZ])}}return bW};var bi=function(bT,bX){var bV=[];var bU;if(bX===c){bX=0;bU=bT}else{bU=bX;bX=bT}for(var bW=bX;bW<bU;bW++){bV.push(bW)}return bV};var ag=function(bU){var bV=[];for(var bW=0,bT=bU.length;bW<bT;bW++){if(bU[bW]){bV.push(bU[bW])}}return bV};var G=function(bT){return bT.replace(aX,"")};var aK=function(bZ){var bW=[],bY,bX,bT=bZ.length,bV,bU=0;again:for(bX=0;bX<bT;bX++){bY=bZ[bX];for(bV=0;bV<bU;bV++){if(bW[bV]===bY){continue again}}bW.push(bY);bU++}return bW};function W(bX){var bW="a aa ai ao as b fn i m o s ",bT,bV,bU={};bH.each(bX,function(bY,bZ){bT=bY.match(/^([^A-Z]+?)([A-Z])/);if(bT&&bW.indexOf(bT[1]+" ")!==-1){bV=bY.replace(bT[0],bT[2].toLowerCase());bU[bV]=bY;if(bT[1]==="o"){W(bX[bY])}}});bX._hungarianMap=bU}function ad(bW,bT,bV){if(!bW._hungarianMap){W(bW)}var bU;bH.each(bT,function(bX,bY){bU=bW._hungarianMap[bX];if(bU!==c&&(bV||bT[bU]===c)){if(bU.charAt(0)==="o"){if(!bT[bU]){bT[bU]={}}bH.extend(true,bT[bU],bT[bX]);ad(bW[bU],bT[bU],bV)}else{bT[bU]=bT[bX]}}})}function aV(bW){var bV=Q.defaults.oLanguage;var bU=bW.sZeroRecords;if(!bW.sEmptyTable&&bU&&bV.sEmptyTable==="No data available in table"){U(bW,bW,"sZeroRecords","sEmptyTable")}if(!bW.sLoadingRecords&&bU&&bV.sLoadingRecords==="Loading..."){U(bW,bW,"sZeroRecords","sLoadingRecords")}if(bW.sInfoThousands){bW.sThousands=bW.sInfoThousands}var bT=bW.sDecimal;if(bT){bt(bT)}}var aP=function(bV,bU,bT){if(bV[bU]!==c){bV[bT]=bV[bU]}};function a7(bW){aP(bW,"ordering","bSort");aP(bW,"orderMulti","bSortMulti");aP(bW,"orderClasses","bSortClasses");aP(bW,"orderCellsTop","bSortCellsTop");aP(bW,"order","aaSorting");aP(bW,"orderFixed","aaSortingFixed");aP(bW,"paging","bPaginate");aP(bW,"pagingType","sPaginationType");aP(bW,"pageLength","iDisplayLength");aP(bW,"searching","bFilter");if(typeof bW.sScrollX==="boolean"){bW.sScrollX=bW.sScrollX?"100%":""}var bV=bW.aoSearchCols;if(bV){for(var bU=0,bT=bV.length;bU<bT;bU++){if(bV[bU]){ad(Q.models.oSearch,bV[bU])}}}}function aa(bU){aP(bU,"orderable","bSortable");aP(bU,"orderData","aDataSort");aP(bU,"orderSequence","asSorting");aP(bU,"orderDataType","sortDataType");var bT=bU.aDataSort;if(bT&&!bH.isArray(bT)){bU.aDataSort=[bT]}}function bg(bW){if(!Q.__browser){var bU={};Q.__browser=bU;var bX=bH("<div/>").css({position:"fixed",top:0,left:0,height:1,width:1,overflow:"hidden"}).append(bH("<div/>").css({position:"absolute",top:1,left:1,width:100,overflow:"scroll"}).append(bH("<div/>").css({width:"100%",height:10}))).appendTo("body");var bV=bX.children();var bT=bV.children();bU.barWidth=bV[0].offsetWidth-bV[0].clientWidth;bU.bScrollOversize=bT[0].offsetWidth===100&&bV[0].clientWidth!==100;bU.bScrollbarLeft=Math.round(bT.offset().left)!==1;bU.bBounding=bX[0].getBoundingClientRect().width?true:false;bX.remove()}bH.extend(bW.oBrowser,Q.__browser);bW.oScroll.iBarWidth=Q.__browser.barWidth}function aY(bX,bZ,b1,bT,bV,bU){var bW=bT,b0,bY=false;if(b1!==c){b0=b1;bY=true}while(bW!==bV){if(!bX.hasOwnProperty(bW)){continue}b0=bY?bZ(b0,bX[bW],bW,bX):bX[bW];bY=true;bW+=bU}return b0}function R(bX,bW){var bY=Q.defaults.column;var bT=bX.aoColumns.length;var bV=bH.extend({},Q.models.oColumn,bY,{nTh:bW?bW:a.createElement("th"),sTitle:bY.sTitle?bY.sTitle:bW?bW.innerHTML:"",aDataSort:bY.aDataSort?bY.aDataSort:[bT],mData:bY.mData?bY.mData:bT,idx:bT});bX.aoColumns.push(bV);var bU=bX.aoPreSearchCols;bU[bT]=bH.extend({},Q.models.oSearch,bU[bT]);a5(bX,bT,bH(bW).data())}function a5(bV,b4,b3){var bZ=bV.aoColumns[b4];var bT=bV.oClasses;var bU=bH(bZ.nTh);if(!bZ.sWidthOrig){bZ.sWidthOrig=bU.attr("width")||null;var b5=(bU.attr("style")||"").match(/width:\s*(\d+[pxem%]+)/);if(b5){bZ.sWidthOrig=b5[1]}}if(b3!==c&&b3!==null){aa(b3);ad(Q.defaults.column,b3);if(b3.mDataProp!==c&&!b3.mData){b3.mData=b3.mDataProp}if(b3.sType){bZ._sManualType=b3.sType}if(b3.className&&!b3.sClass){b3.sClass=b3.className}bH.extend(bZ,b3);U(bZ,b3,"sWidth","sWidthOrig");if(b3.iDataSort!==c){bZ.aDataSort=[b3.iDataSort]}U(bZ,b3,"aDataSort")}var b2=bZ.mData;var bY=at(b2);var b1=bZ.mRender?at(bZ.mRender):null;if(b3!=null&&b3.dateFormat!=c&&bZ.type.toLowerCase()=="date"){b1=Q.ext.fnFormatDate}var bX=function(b6){return typeof b6==="string"&&b6.indexOf("@")!==-1};bZ._bAttrSrc=bH.isPlainObject(b2)&&(bX(b2.sort)||bX(b2.type)||bX(b2.filter));bZ.fnGetData=function(b8,b7,b9){var b6=bY(b8,b7,c,b9);if(b3.dateFormat!=c&&bZ.type.toLowerCase()=="date"&&b7=="sort"){return b6}return b1&&b7?b1(b6,b7,b8,b9):b6};bZ.fnSetData=function(b6,b8,b7){return aB(b2)(b6,b8,b7)};if(typeof b2!=="number"){bV._rowReadObject=true}if(!bV.oFeatures.bSort){bZ.bSortable=false;bU.addClass(bT.sSortableNone)}var bW=bH.inArray("asc",bZ.asSorting)!==-1;var b0=bH.inArray("desc",bZ.asSorting)!==-1;if(!bZ.bSortable||(!bW&&!b0)){bZ.sSortingClass=bT.sSortableNone;bZ.sSortingClassJUI=""}else{if(bW&&!b0){bZ.sSortingClass=bT.sSortableAsc;bZ.sSortingClassJUI=bT.sSortJUIAscAllowed}else{if(!bW&&b0){bZ.sSortingClass=bT.sSortableDesc;bZ.sSortingClassJUI=bT.sSortJUIDescAllowed}else{bZ.sSortingClass=bT.sSortable;bZ.sSortingClassJUI=bT.sSortJUI}}}}function aM(bX){if(bX.oFeatures.bAutoWidth!==false){var bW=bX.aoColumns;by(bX);for(var bV=0,bU=bW.length;bV<bU;bV++){bW[bV].nTh.style.width=bW[bV].sWidth}}var bT=bX.oScroll;if(bT.sY!==""||bT.sX!==""){o(bX)}O(bX,null,"column-sizing",[bX])}function u(bV,bT){var bU=s(bV,"bVisible");return typeof bU[bT]==="number"?bU[bT]:null}function bL(bV,bT){var bU=s(bV,"bVisible");var bW=bH.inArray(bT,bU);return bW!==-1?bW:null}function aT(bT){return s(bT,"bVisible").length}function s(bV,bU){var bT=[];bH.map(bV.aoColumns,function(bX,bW){if(bX[bU]){bT.push(bW)}});return bT}function y(bW){var bX=bW.aoColumns;var b1=bW.aoData;var b3=Q.ext.type.detect;var b2,b6,b0,bU,bZ,bY;var bV,b4,b5,bT;for(b2=0,b6=bX.length;b2<b6;b2++){bV=bX[b2];bT=[];if(!bV.sType&&bV._sManualType){bV.sType=bV._sManualType}else{if(!bV.sType){for(b0=0,bU=b3.length;b0<bU;b0++){for(bZ=0,bY=b1.length;bZ<bY;bZ++){if(bT[bZ]===c){bT[bZ]=bw(bW,bZ,b2,"type")}b5=b3[b0](bT[bZ],bW);if(!b5&&b0!==b3.length-1){break}if(b5==="html"){break}}if(b5){bV.sType=b5;break}}if(!bV.sType){bV.sType="string"}}}}}function n(bU,b4,bV,b3){var b0,bW,bZ,b5,bY,b2,bT;var bX=bU.aoColumns;if(b4){for(b0=b4.length-1;b0>=0;b0--){bT=b4[b0];var b1=bT.targets!==c?bT.targets:bT.aTargets;if(!bH.isArray(b1)){b1=[b1]}for(bZ=0,b5=b1.length;bZ<b5;bZ++){if(typeof b1[bZ]==="number"&&b1[bZ]>=0){while(bX.length<=b1[bZ]){R(bU)}b3(b1[bZ],bT)}else{if(typeof b1[bZ]==="number"&&b1[bZ]<0){b3(bX.length+b1[bZ],bT)}else{if(typeof b1[bZ]==="string"){for(bY=0,b2=bX.length;bY<b2;bY++){if(b1[bZ]=="_all"||bH(bX[bY].nTh).hasClass(b1[bZ])){b3(bY,bT)}}}}}}}}if(bV){for(b0=0,bW=bV.length;b0<bW;b0++){b3(b0,bV[b0])}}}function aR(bV,b4,b3,b0){var b2=bV.aoData.length;var bU=bH.extend(true,{},Q.models.oRow,{src:b3?"dom":"data",idx:b2});bU._aData=b4;bV.aoData.push(bU);var bZ,bX;var bY=bV.aoColumns;for(var b1=0,bW=bY.length;b1<bW;b1++){bY[b1].sType=null}bV.aiDisplayMaster.push(b2);var bT=bV.rowIdFn(b4);if(bT!==c){bV.aIds[bT]=bU}if(b3||!bV.oFeatures.bDeferRender){S(bV,b2,b3,b0)}return b2}function bS(bU,bT){var bV;if(!(bT instanceof bH)){bT=bH(bT)}return bT.map(function(bW,bX){bV=bh(bU,bX);return aR(bU,bV.data,bX,bV.cells)})}function bu(bT,bU){return(bU._DT_RowIndex!==c)?bU._DT_RowIndex:null}function a3(bT,bU,bV){return bH.inArray(bV,bT.aoData[bU].anCells)}function bw(bW,bT,bX,bZ){var b0=bW.iDraw;var bU=bW.aoColumns[bX];var bV=bW.aoData[bT]._aData;var b1=bU.sDefaultContent;var bY=bU.fnGetData(bV,bZ,{settings:bW,row:bT,col:bX});if(bY===c){if(bW.iDrawError!=b0&&b1===null){aQ(bW,0,"Requested unknown parameter "+(typeof bU.mData=="function"?"{function}":"'"+bU.mData+"'")+" for row "+bT,4);bW.iDrawError=b0}return b1}if((bY===bV||bY===null)&&b1!==null){bY=b1}else{if(typeof bY==="function"){return bY.call(bV)}}if(bY===null&&bZ=="display"){return""}return bY}function bo(bU,bV,bY,bX){var bT=bU.aoColumns[bY];var bW=bU.aoData[bV]._aData;bT.fnSetData(bW,bX,{settings:bU,row:bV,col:bY})}var N=/\[.*?\]$/;var f=/\(\)$/;function ao(bT){return bH.map(bT.match(/(\\.|[^\.])+/g)||[""],function(bU){return bU.replace(/\\./g,".")})}function at(bU){if(bH.isPlainObject(bU)){var bV={};bH.each(bU,function(bW,bX){if(bX){bV[bW]=at(bX)}});return function(bY,bX,b0,bZ){var bW=bV[bX]||bV._;return bW!==c?bW(bY,bX,b0,bZ):bY}}else{if(bU===null){return function(bW){return bW}}else{if(typeof bU==="function"){return function(bX,bW,bZ,bY){return bU(bX,bW,bZ,bY)}}else{if(typeof bU==="string"&&(bU.indexOf(".")!==-1||bU.indexOf("[")!==-1||bU.indexOf("(")!==-1)){var bT=function(b4,b5,bW){var b7,b0,b2,bZ;if(bW!==""){var b6=ao(bW);for(var b3=0,bY=b6.length;b3<bY;b3++){b7=b6[b3].match(N);b0=b6[b3].match(f);if(b7){b6[b3]=b6[b3].replace(N,"");if(b6[b3]!==""){b4=b4[b6[b3]]}b2=[];b6.splice(0,b3+1);bZ=b6.join(".");if(bH.isArray(b4)){for(var b1=0,b8=b4.length;b1<b8;b1++){b2.push(bT(b4[b1],b5,bZ))}}var bX=b7[0].substring(1,b7[0].length-1);b4=(bX==="")?b2:b2.join(bX);break}else{if(b0){b6[b3]=b6[b3].replace(f,"");b4=b4[b6[b3]]();continue}}if(b4===null||b4[b6[b3]]===c){return c}b4=b4[b6[b3]]}}return b4};return function(bX,bW){return bT(bX,bW,bU)}}else{return function(bX,bW){return bX[bU]}}}}}}function aB(bU){if(bH.isPlainObject(bU)){return aB(bU._)}else{if(bU===null){return function(){}}else{if(typeof bU==="function"){return function(bV,bX,bW){bU(bV,"set",bX,bW)}}else{if(typeof bU==="string"&&(bU.indexOf(".")!==-1||bU.indexOf("[")!==-1||bU.indexOf("(")!==-1)){var bT=function(b3,bZ,bV){var b6=ao(bV),b4;var b5=b6[b6.length-1];var b7,b0,bW,bY;for(var b2=0,bX=b6.length-1;b2<bX;b2++){b7=b6[b2].match(N);b0=b6[b2].match(f);if(b7){b6[b2]=b6[b2].replace(N,"");b3[b6[b2]]=[];b4=b6.slice();b4.splice(0,b2+1);bY=b4.join(".");if(bH.isArray(bZ)){for(var b1=0,b8=bZ.length;b1<b8;b1++){bW={};bT(bW,bZ[b1],bY);b3[b6[b2]].push(bW)}}else{b3[b6[b2]]=bZ}return}else{if(b0){b6[b2]=b6[b2].replace(f,"");b3=b3[b6[b2]](bZ)}}if(b3[b6[b2]]===null||b3[b6[b2]]===c){b3[b6[b2]]={}}b3=b3[b6[b2]]}if(b5.match(f)){b3=b3[b5.replace(f,"")](bZ)}else{b3[b5.replace(N,"")]=bZ}};return function(bV,bW){return bT(bV,bW,bU)}}else{return function(bV,bW){bV[bU]=bW}}}}}}function bJ(bT){return ay(bT.aoData,"_aData")}function bk(bT){bT.aoData.length=0;bT.aiDisplayMaster.length=0;bT.aiDisplay.length=0;bT.aIds={}}function a8(bU,bW,bY){var bX=-1;for(var bV=0,bT=bU.length;bV<bT;bV++){if(bU[bV]==bW){bX=bV}else{if(bU[bV]>bW){bU[bV]--}}}if(bX!=-1&&bY===c){bU.splice(bX,1)}}function E(bW,bU,bT,bX){var b2=bW.aoData[bU];var bY,b0;var bV=function(b3,b4){while(b3.childNodes.length){b3.removeChild(b3.firstChild)}b3.innerHTML=bw(bW,bU,b4,"display")};if(bT==="dom"||((!bT||bT==="auto")&&b2.src==="dom")){b2._aData=bh(bW,b2,bX,bX===c?c:b2._aData).data}else{var b1=b2.anCells;if(b1){if(bX!==c){bV(b1[bX],bX)}else{for(bY=0,b0=b1.length;bY<b0;bY++){bV(b1[bY],bY)}}}}b2._aSortData=null;b2._aFilterData=null;var bZ=bW.aoColumns;if(bX!==c){bZ[bX].sType=null}else{for(bY=0,b0=bZ.length;bY<b0;bY++){bZ[bY].sType=null}af(bW,b2)}}function bh(b9,bX,b0,ca){var b6=[],bY=bX.firstChild,cb,bW,b2,b7=0,b8,bT=b9.aoColumns,bV=b9._rowReadObject;ca=ca!==c?ca:bV?{}:[];var b3=function(ce,cg){if(typeof ce==="string"){var cd=ce.indexOf("@");if(cd!==-1){var cc=ce.substring(cd+1);var cf=aB(ce);cf(ca,cg.getAttribute(cc))}}};var bZ=function(cc){if(b0===c||b0===b7){bW=bT[b7];b8=bH.trim(cc.innerHTML);if(bW&&bW._bAttrSrc){var cd=aB(bW.mData._);cd(ca,b8);b3(bW.mData.sort,cc);b3(bW.mData.type,cc);b3(bW.mData.filter,cc)}else{if(bV){if(!bW._setter){bW._setter=aB(bW.mData)}bW._setter(ca,b8)}else{ca[b7]=b8}}}b7++};if(bY){while(bY){cb=bY.nodeName.toUpperCase();if(cb=="TD"||cb=="TH"){bZ(bY);b6.push(bY)}bY=bY.nextSibling}}else{b6=bX.anCells;for(var b5=0,b4=b6.length;b5<b4;b5++){bZ(b6[b5])}}var bU=bY?bX:bX.nTr;if(bU){var b1=bU.getAttribute("id");if(b1){aB(b9.rowId)(ca,b1)}}return{data:ca,cells:b6}}function S(bU,b1,bT,bZ){var b4=bU.aoData[b1],bX=b4._aData,b3=[],b2,bY,bW,b0,bV;if(b4.nTr===null){b2=bT||a.createElement("tr");b4.nTr=b2;b4.anCells=b3;b2._DT_RowIndex=b1;af(bU,b4);for(b0=0,bV=bU.aoColumns.length;b0<bV;b0++){bW=bU.aoColumns[b0];bY=bT?bZ[b0]:a.createElement(bW.sCellType);b3.push(bY);if(!bT||bW.mRender||bW.mData!==b0){bY.innerHTML=bw(bU,b1,b0,"display")}if(bW.sClass){bY.className+=" "+bW.sClass}if(bW.bVisible&&!bT){b2.appendChild(bY)}else{if(!bW.bVisible&&bT){bY.parentNode.removeChild(bY)}}if(bW.fnCreatedCell){bW.fnCreatedCell.call(bU.oInstance,bY,bw(bU,b1,b0),bX,b1,b0)}}O(bU,"aoRowCreatedCallback",null,[b2,bX,b1])}b4.nTr.setAttribute("role","row")}function af(bU,bX){var bW=bX.nTr;var bV=bX._aData;if(bW){var bY=bU.rowIdFn(bV);if(bY){bW.id=bY}if(bV.DT_RowClass){var bT=bV.DT_RowClass.split(" ");bX.__rowc=bX.__rowc?aK(bX.__rowc.concat(bT)):bT;bH(bW).removeClass(bX.__rowc.join(" ")).addClass(bV.DT_RowClass)}if(bV.DT_RowAttr){bH(bW).attr(bV.DT_RowAttr)}if(bV.DT_RowData){bH(bW).data(bV.DT_RowData)}}}function aO(bT){var bX,b2,b1,b4,bW;var bY=bT.nTHead;var bZ=bT.nTFoot;var b0=bH("th, td",bY).length===0;var bV=bT.oClasses;var bU=bT.aoColumns;if(b0){b4=bH("<tr/>").appendTo(bY)}for(bX=0,b2=bU.length;bX<b2;bX++){bW=bU[bX];b1=bH(bW.nTh).addClass(bW.sClass);if(b0){b1.appendTo(b4)}if(bT.oFeatures.bSort){b1.addClass(bW.sSortingClass);if(bW.bSortable!==false){b1.attr("tabindex",bT.iTabIndex).attr("aria-controls",bT.sTableId);F(bT,bW.nTh,bX)}}if(bW.sTitle!=b1[0].innerHTML){b1.html(bW.sTitle)}V(bT,"header")(bT,b1,bW,bV)}if(b0){aA(bT.aoHeader,bY)}bH(bY).find(">tr").attr("role","row");bH(bY).find(">tr>th, >tr>td").addClass(bV.sHeaderTH);bH(bZ).find(">tr>th, >tr>td").addClass(bV.sFooterTH);if(bZ!==null){var b3=bT.aoFooter[0];for(bX=0,b2=b3.length;bX<b2;bX++){bW=bU[bX];bW.nTf=b3[bX].cell;if(bW.sClass){bH(bW.nTf).addClass(bW.sClass)}}}}function a9(bW,b5,b8){var b1,bY,b0,b4,bZ,b2,bX,b7;var bV=[];var b3=[];var bT=bW.aoColumns.length;var bU,b6;if(!b5){return}if(b8===c){b8=false}for(b1=0,bY=b5.length;b1<bY;b1++){bV[b1]=b5[b1].slice();bV[b1].nTr=b5[b1].nTr;for(b0=bT-1;b0>=0;b0--){if(!bW.aoColumns[b0].bVisible&&!b8){bV[b1].splice(b0,1)}}b3.push([])}for(b1=0,bY=bV.length;b1<bY;b1++){b7=bV[b1].nTr;if(b7){while((bX=b7.firstChild)){b7.removeChild(bX)}}for(b0=0,b4=bV[b1].length;b0<b4;b0++){bU=1;b6=1;if(b3[b1][b0]===c){b7.appendChild(bV[b1][b0].cell);b3[b1][b0]=1;while(bV[b1+bU]!==c&&bV[b1][b0].cell==bV[b1+bU][b0].cell){b3[b1+bU][b0]=1;bU++}while(bV[b1][b0+b6]!==c&&bV[b1][b0].cell==bV[b1][b0+b6].cell){for(bZ=0;bZ<bU;bZ++){b3[b1+bZ][b0+b6]=1}b6++}bH(bV[b1][b0].cell).attr("rowspan",bU).attr("colspan",b6)}}}}function a6(bV){var cf=O(bV,"aoPreDrawCallback","preDraw",[bV]);if(bH.inArray(false,cf)!==-1){z(bV,false);return}var ce,ca,b6;var bZ=[];var ch=0;var b3=bV.asStripeClasses;var b8=b3.length;var b4=bV.aoOpenRows.length;var b9=bV.oLanguage;var b5=bV.iInitDisplayStart;var cd=B(bV)=="ssp";var bY=bV.aiDisplay;bV.bDrawing=true;if(b5!==c&&b5!==-1){bV._iDisplayStart=cd?b5:b5>=bV.fnRecordsDisplay()?0:b5;bV.iInitDisplayStart=-1}var bU=bV._iDisplayStart;var bW=bV.fnDisplayEnd();if(bV.bDeferLoading){bV.bDeferLoading=false;bV.iDraw++;z(bV,false)}else{if(!cd){bV.iDraw++}else{if(!bV.bDestroying&&!aj(bV)){return}}}if(bY.length!==0){var bX=cd?0:bU;var bT=cd?bV.aoData.length:bW;for(var cb=bX;cb<bT;cb++){var b1=bY[cb];var b2=bV.aoData[b1];if(b2.nTr===null){S(bV,b1)}var cg=b2.nTr;if(b8!==0){var cc=b3[ch%b8];if(b2._sRowStripe!=cc){bH(cg).removeClass(b2._sRowStripe).addClass(cc);b2._sRowStripe=cc}}O(bV,"aoRowCallback",null,[cg,b2._aData,ch,cb]);bZ.push(cg);ch++}}else{var b7=b9.sZeroRecords;if(bV.iDraw==1&&B(bV)=="ajax"){b7=b9.sLoadingRecords}else{if(b9.sEmptyTable&&bV.fnRecordsTotal()===0){b7=b9.sEmptyTable}}bZ[0]=bH("<tr/>",{"class":b8?b3[0]:""}).append(bH("<td />",{valign:"top",colSpan:aT(bV),"class":bV.oClasses.sRowEmpty}).html(b7))[0]}O(bV,"aoHeaderCallback","header",[bH(bV.nTHead).children("tr")[0],bJ(bV),bU,bW,bY]);O(bV,"aoFooterCallback","footer",[bH(bV.nTFoot).children("tr")[0],bJ(bV),bU,bW,bY]);var b0=bH(bV.nTBody);b0.children().detach();b0.append(bH(bZ));O(bV,"aoDrawCallback","draw",[bV]);bV.bSorted=false;bV.bFiltered=false;bV.bDrawing=false}function am(bX,bU){var bW=bX.oFeatures,bT=bW.bSort,bV=bW.bFilter;if(bT){A(bX)}if(bV){x(bX,bX.oPreviousSearch)}else{bX.aiDisplay=bX.aiDisplayMaster.slice()}if(bU!==true){bX._iDisplayStart=0}bX._drawHold=bU;a6(bX);bX._drawHold=false}function j(bX){var ca=bX.oClasses;var b7=bH(bX.nTable);var bZ=bH("<div/>").insertBefore(b7);var bY=bX.oFeatures;var bU=bH("<div/>",{id:bX.sTableId+"_wrapper","class":ca.sWrapper+(bX.nTFoot?"":" "+ca.sNoFooter)});bX.nHolding=bZ[0];bX.nTableWrapper=bU[0];bX.nTableReinsertBefore=bX.nTable.nextSibling;var b0=bX.sDom.split("");var b5,b1,bW,cb,b9,b3;for(var b6=0;b6<b0.length;b6++){b5=null;b1=b0[b6];if(b1=="<"){bW=bH("<div/>")[0];cb=b0[b6+1];if(cb=="'"||cb=='"'){b9="";b3=2;while(b0[b6+b3]!=cb){b9+=b0[b6+b3];b3++}if(b9=="H"){b9=ca.sJUIHeader}else{if(b9=="F"){b9=ca.sJUIFooter}}if(b9.indexOf(".")!=-1){var b4=b9.split(".");bW.id=b4[0].substr(1,b4[0].length-1);bW.className=b4[1]}else{if(b9.charAt(0)=="#"){bW.id=b9.substr(1,b9.length-1)}else{bW.className=b9}}b6+=b3}bU.append(bW);bU=bH(bW)}else{if(b1==">"){bU=bU.parent()}else{if(b1=="l"&&bY.bPaginate&&bY.bLengthChange){b5=aU(bX)}else{if(b1=="f"&&bY.bFilter){b5=t(bX)}else{if(b1=="r"&&bY.bProcessing){b5=bC(bX)}else{if(b1=="t"){b5=bB(bX)}else{if(b1=="i"&&bY.bInfo){b5=g(bX)}else{if(b1=="p"&&bY.bPaginate){b5=aD(bX)}else{if(Q.ext.feature.length!==0){var b8=Q.ext.feature;for(var b2=0,bT=b8.length;b2<bT;b2++){if(b1==b8[b2].cFeature){b5=b8[b2].fnInit(bX);break}}}}}}}}}}}if(b5){var bV=bX.aanFeatures;if(!bV[b1]){bV[b1]=[]}bV[b1].push(b5);bU.append(b5)}}bZ.replaceWith(bU);bX.nHolding=null}function aA(bZ,bU){var b6=bH(bU).children("tr");var b5,b3;var b1,bY,bX,bV,b7,b2,b0,b8,bT;var b4;var bW=function(b9,cc,cb){var ca=b9[cc];while(ca[cb]){cb++}return cb};bZ.splice(0,bZ.length);for(b1=0,bV=b6.length;b1<bV;b1++){bZ.push([])}for(b1=0,bV=b6.length;b1<bV;b1++){b5=b6[b1];b0=0;b3=b5.firstChild;while(b3){if(b3.nodeName.toUpperCase()=="TD"||b3.nodeName.toUpperCase()=="TH"){b8=b3.getAttribute("colspan")*1;bT=b3.getAttribute("rowspan")*1;b8=(!b8||b8===0||b8===1)?1:b8;bT=(!bT||bT===0||bT===1)?1:bT;b2=bW(bZ,b1,b0);b4=b8===1?true:false;for(bX=0;bX<b8;bX++){for(bY=0;bY<bT;bY++){bZ[b1+bY][b2+bX]={cell:b3,unique:b4};bZ[b1+bY].nTr=b5}}}b3=b3.nextSibling}}}function bj(b0,bU,bY){var bV=[];if(!bY){bY=b0.aoHeader;if(bU){bY=[];aA(bY,bU)}}for(var bX=0,bT=bY.length;bX<bT;bX++){for(var bW=0,bZ=bY[bX].length;bW<bZ;bW++){if(bY[bX][bW].unique&&(!bV[bW]||!b0.bSortCellsTop)){bV[bW]=bY[bX][bW].cell}}}return bV}function az(bU,bV,bZ){O(bU,"aoServerParams","serverParams",[bV]);if(bV&&bH.isArray(bV)){var bW={};var bX=/(.*?)\[\]$/;bH.each(bV,function(b6,b7){var b5=b7.name.match(bX);if(b5){var b4=b5[0];if(!bW[b4]){bW[b4]=[]}bW[b4].push(b7.value)}else{bW[b7.name]=b7.value}});bV=bW}var bT;var b0=bU.ajax;var b1=bU.oInstance;var b2=function(b4){O(bU,null,"xhr",[bU,b4,bU.jqXHR]);bZ(b4)};if(bH.isPlainObject(b0)&&b0.data){bT=b0.data;var b3=bH.isFunction(bT)?bT(bV,bU):bT;bV=bH.isFunction(bT)&&b3?b3:bH.extend(true,bV,b3);delete b0.data}var bY={data:bV,success:function(b5){var b4=b5.error||b5.sError;if(b4){aQ(bU,0,b4)}bU.json=b5;b2(b5)},dataType:"json",cache:false,type:bU.sServerMethod,error:function(b7,b5,b6){var b4=O(bU,null,"xhr",[bU,null,bU.jqXHR]);if(bH.inArray(true,b4)===-1){if(b5=="parsererror"){aQ(bU,0,"Invalid JSON response",1)}else{if(b7.readyState===4){aQ(bU,0,"Ajax error",7)}}}z(bU,false)}};bU.oAjaxData=bV;O(bU,null,"preXhr",[bU,bV]);if(bU.fnServerData){bU.fnServerData.call(b1,bU.sAjaxSource,bH.map(bV,function(b5,b4){return{name:b4,value:b5}}),b2,bU)}else{if(bU.sAjaxSource||typeof b0==="string"){bU.jqXHR=bH.ajax(bH.extend(bY,{url:b0||bU.sAjaxSource}))}else{if(bH.isFunction(b0)){bU.jqXHR=b0.call(b1,bV,b2,bU)}else{bU.jqXHR=bH.ajax(bH.extend(bY,b0));b0.data=bT}}}}function aj(bT){if(bT.bAjaxDataGet){bT.iDraw++;z(bT,true);az(bT,bN(bT),function(bU){Y(bT,bU)});return false}return true}function bN(bY){var bZ=bY.aoColumns,b5=bZ.length,bV=bY.oFeatures,bT=bY.oPreviousSearch,b4=bY.aoPreSearchCols,b2,b1=[],bU,bX,b7,b0=aL(bY),b9=bY._iDisplayStart,b3=bV.bPaginate!==false?bY._iDisplayLength:-1;var bW=function(ca,cb){b1.push({name:ca,value:cb})};bW("sEcho",bY.iDraw);bW("iColumns",b5);bW("sColumns",ay(bZ,"sName").join(","));bW("iDisplayStart",b9);bW("iDisplayLength",b3);var b6={draw:bY.iDraw,columns:[],order:[],start:b9,length:b3,search:{value:bT.sSearch,regex:bT.bRegex}};for(b2=0;b2<b5;b2++){bX=bZ[b2];b7=b4[b2];bU=typeof bX.mData=="function"?"function":bX.mData;b6.columns.push({data:bU,name:bX.sName,searchable:bX.bSearchable,orderable:bX.bSortable,search:{value:b7.sSearch,regex:b7.bRegex}});bW("mDataProp_"+b2,bU);if(bV.bFilter){bW("sSearch_"+b2,b7.sSearch);bW("bRegex_"+b2,b7.bRegex);bW("bSearchable_"+b2,bX.bSearchable)}if(bV.bSort){bW("bSortable_"+b2,bX.bSortable)}}if(bV.bFilter){bW("sSearch",bT.sSearch);bW("bRegex",bT.bRegex)}if(bV.bSort){bH.each(b0,function(ca,cb){b6.order.push({column:cb.col,dir:cb.dir});bW("iSortCol_"+ca,cb.col);bW("sSortDir_"+ca,cb.dir)});bW("iSortingCols",b0.length)}var b8=Q.ext.legacy.ajax;if(b8===null){return bY.sAjaxSource?b1:b6}return b8?b1:b6}function Y(bT,b1){var bY=function(b2,b3){return b1[b2]!==c?b1[b2]:b1[b3]};var bU=bv(bT,b1);var bW=bY("sEcho","draw");var bX=bY("iTotalRecords","recordsTotal");var b0=bY("iTotalDisplayRecords","recordsFiltered");if(bW){if(bW*1<bT.iDraw){return}bT.iDraw=bW*1}bk(bT);bT._iRecordsTotal=parseInt(bX,10);bT._iRecordsDisplay=parseInt(b0,10);for(var bV=0,bZ=bU.length;bV<bZ;bV++){aR(bT,bU[bV])}bT.aiDisplay=bT.aiDisplayMaster.slice();bT.bAjaxDataGet=false;a6(bT);if(!bT._bInitComplete){aF(bT,b1)}bT.bAjaxDataGet=true;z(bT,false)}function bv(bV,bU){var bT=bH.isPlainObject(bV.ajax)&&bV.ajax.dataSrc!==c?bV.ajax.dataSrc:bV.sAjaxDataProp;if(bT==="data"){return bU.aaData||bU[bT]}return bT!==""?at(bT)(bU):bU}function t(bW){var bX=bW.oClasses;var bV=bW.sTableId;var bZ=bW.oLanguage;var bY=bW.oPreviousSearch;var bU=bW.aanFeatures;var b4='<input type="search" class="'+bX.sFilterInput+'"/>';var b3=bZ.sSearch;b3=b3.match(/_INPUT_/)?b3.replace("_INPUT_",b4):b3+b4;var bT=bH("<div/>",{id:!bU.f?bV+"_filter":null,"class":bX.sFilter}).append(bH("<label/>").append(b3));var b2=function(){var b6=bU.f;var b5=!this.value?"":this.value;if(b5!=bY.sSearch){x(bW,{sSearch:b5,bRegex:bY.bRegex,bSmart:bY.bSmart,bCaseInsensitive:bY.bCaseInsensitive});bW._iDisplayStart=0;a6(bW)}};var b1=bW.searchDelay!==null?bW.searchDelay:B(bW)==="ssp"?400:0;var b0=bH("input",bT).val(bY.sSearch).attr("placeholder",bZ.sSearchPlaceholder).bind("keyup.DT search.DT input.DT paste.DT cut.DT",b1?ap(b2,b1):b2).bind("keypress.DT",function(b5){if(b5.keyCode==13){return false}}).attr("aria-controls",bV);bH(bW.nTable).on("search.dt.DT",function(b6,b5){if(bW===b5){try{if(b0[0]!==a.activeElement){b0.val(bY.sSearch)}}catch(b7){}}});return bT[0]}function x(bW,b0,bZ){var bV=bW.oPreviousSearch;var bY=bW.aoPreSearchCols;var bX=function(b1){bV.sSearch=b1.sSearch;bV.bRegex=b1.bRegex;bV.bSmart=b1.bSmart;bV.bCaseInsensitive=b1.bCaseInsensitive};var bU=function(b1){return b1.bEscapeRegex!==c?!b1.bEscapeRegex:b1.bRegex};y(bW);if(B(bW)!="ssp"){aC(bW,b0.sSearch,bZ,bU(b0),b0.bSmart,b0.bCaseInsensitive);bX(b0);for(var bT=0;bT<bY.length;bT++){ab(bW,bY[bT].sSearch,bT,bU(bY[bT]),bY[bT].bSmart,bY[bT].bCaseInsensitive)}aw(bW)}else{bX(b0)}bW.bFiltered=true;O(bW,null,"search",[bW])}function aw(bW){var bV=Q.ext.search;var bZ=bW.aiDisplay;var b1,bU;for(var bY=0,b0=bV.length;bY<b0;bY++){var b2=[];for(var bX=0,bT=bZ.length;bX<bT;bX++){bU=bZ[bX];b1=bW.aoData[bU];if(bV[bY](bW,b1._aFilterData,bU,b1._aData,bX)){b2.push(bU)}}bZ.length=0;bH.merge(bZ,b2)}}function ab(bU,bT,bY,b1,b2,bW){if(bT===""){return}var bZ;var b0=bU.aiDisplay;var bV=aZ(bT,b1,b2,bW);for(var bX=b0.length-1;bX>=0;bX--){bZ=bU.aoData[b0[bX]]._aFilterData[bY];if(!bV.test(bZ)){b0.splice(bX,1)}}}function aC(bU,b2,bT,b1,b4,bX){var bW=aZ(b2,b1,b4,bX);var bV=bU.oPreviousSearch.sSearch;var bZ=bU.aiDisplayMaster;var b0,b3,bY;if(Q.ext.search.length!==0){bT=true}b3=aH(bU);if(b2.length<=0){bU.aiDisplay=bZ.slice()}else{if(b3||bT||bV.length>b2.length||b2.indexOf(bV)!==0||bU.bSorted){bU.aiDisplay=bZ.slice()}b0=bU.aiDisplay;for(bY=b0.length-1;bY>=0;bY--){if(!bW.test(bU.aoData[b0[bY]]._sFilterRow)){b0.splice(bY,1)}}}}function aZ(bV,bW,bX,bT){bV=bW?bV:p(bV);if(bX){var bU=bH.map(bV.match(/"[^"]+"|[^ ]+/g)||[""],function(bZ){if(bZ.charAt(0)==='"'){var bY=bZ.match(/^"(.*)"$/);bZ=bY?bY[1]:bZ}return bZ.replace('"',"")});bV="^(?=.*?"+bU.join(")(?=.*?")+").*$"}return new RegExp(bV,bT?"i":"")}function p(bT){return bT.replace(aG,"\\$1")}var e=bH("<div>")[0];var av=e.textContent!==c;function aH(bU){var bW=bU.aoColumns;var bV;var bY,bX,b2,bT,b1,bZ,b4;var b3=Q.ext.type.search;var b0=false;for(bY=0,b2=bU.aoData.length;bY<b2;bY++){b4=bU.aoData[bY];if(!b4._aFilterData){b1=[];for(bX=0,bT=bW.length;bX<bT;bX++){bV=bW[bX];if(bV.bSearchable){bZ=bw(bU,bY,bX,"filter");if(b3[bV.sType]){bZ=b3[bV.sType](bZ)}if(bZ===null){bZ=""}if(typeof bZ!=="string"&&bZ.toString){bZ=bZ.toString()}}else{bZ=""}if(bZ.indexOf&&bZ.indexOf("&")!==-1){e.innerHTML=bZ;bZ=av?e.textContent:e.innerText}if(bZ.replace){bZ=bZ.replace(/[\r\n]/g,"")}b1.push(bZ)}b4._aFilterData=b1;b4._sFilterRow=b1.join("  ");b0=true}}return b0}function bA(bT){return{search:bT.sSearch,smart:bT.bSmart,regex:bT.bRegex,caseInsensitive:bT.bCaseInsensitive}}function aI(bT){return{sSearch:bT.search,bSmart:bT.smart,bRegex:bT.regex,bCaseInsensitive:bT.caseInsensitive}}function g(bU){var bV=bU.sTableId,bT=bU.aanFeatures.i,bW=bH("<div/>",{"class":bU.oClasses.sInfo,id:!bT?bV+"_info":null});if(!bT){bU.aoDrawCallback.push({fn:ax,sName:"information"});bW.attr("role","status").attr("aria-live","polite");bH(bU.nTable).attr("aria-describedby",bV+"_info")}return bW[0]}function ax(bW){var bT=bW.aanFeatures.i;if(bT.length===0){return}var bV=bW.oLanguage,bU=bW._iDisplayStart+1,bX=bW.fnDisplayEnd(),b0=bW.fnRecordsTotal(),bZ=bW.fnRecordsDisplay(),bY=bZ?bV.sInfo:bV.sInfoEmpty;if(bZ!==b0){bY+=" "+bV.sInfoFiltered}bY+=bV.sInfoPostFix;bY=br(bW,bY);var b1=bV.fnInfoCallback;if(b1!==null){bY=b1.call(bW.oInstance,bW,bU,bX,b0,bZ,bY)}bH(bT).html(bY)}function br(bW,bY){var bU=bW.fnFormatNumber,bZ=bW._iDisplayStart+1,bT=bW._iDisplayLength,bX=bW.fnRecordsDisplay(),bV=bT===-1;return bY.replace(/_START_/g,bU.call(bW,bZ)).replace(/_END_/g,bU.call(bW,bW.fnDisplayEnd())).replace(/_MAX_/g,bU.call(bW,bW.fnRecordsTotal())).replace(/_TOTAL_/g,bU.call(bW,bX)).replace(/_PAGE_/g,bU.call(bW,bV?1:Math.ceil(bZ/bT))).replace(/_PAGES_/g,bU.call(bW,bV?1:Math.ceil(bX/bT)))}function h(bW){var bZ,bV,b0=bW.iInitDisplayStart;var bY=bW.aoColumns,bX;var bU=bW.oFeatures;var bT=bW.bDeferLoading;if(!bW.bInitialised){setTimeout(function(){h(bW)},200);return}j(bW);aO(bW);a9(bW,bW.aoHeader);a9(bW,bW.aoFooter);z(bW,true);if(bU.bAutoWidth){by(bW)}for(bZ=0,bV=bY.length;bZ<bV;bZ++){bX=bY[bZ];if(bX.sWidth){bX.nTh.style.width=bM(bX.sWidth)}}O(bW,null,"preInit",[bW]);am(bW);var b1=B(bW);if(b1!="ssp"||bT){if(b1=="ajax"){az(bW,[],function(b3){var b2=bv(bW,b3);for(bZ=0;bZ<b2.length;bZ++){aR(bW,b2[bZ])}bW.iInitDisplayStart=b0;am(bW);z(bW,false);aF(bW,b3)},bW)}else{z(bW,false);aF(bW)}}}function aF(bU,bT){bU._bInitComplete=true;if(bT||bU.oInit.aaData){aM(bU)}O(bU,"aoInitComplete","init",[bU,bT])}function aW(bU,bV){var bT=parseInt(bV,10);bU._iDisplayLength=bT;bn(bU);O(bU,null,"length",[bU,bT])}function aU(bY){var bZ=bY.oClasses,bW=bY.sTableId,bV=bY.aLengthMenu,bT=bH.isArray(bV[0]),bX=bT?bV[0]:bV,b1=bT?bV[1]:bV;var b2=bH("<select/>",{name:bW+"_length","aria-controls":bW,"class":bZ.sLengthSelect});for(var b0=0,b3=bX.length;b0<b3;b0++){b2[0][b0]=new Option(b1[b0],bX[b0])}var bU=bH("<div><label/></div>").addClass(bZ.sLength);if(!bY.aanFeatures.l){bU[0].id=bW+"_length"}bU.children().append(bY.oLanguage.sLengthMenu.replace("_MENU_",b2[0].outerHTML));bH("select",bU).val(bY._iDisplayLength).bind("change.DT",function(b4){aW(bY,bH(this).val());a6(bY)});bH(bY.nTable).bind("length.dt.DT",function(b6,b5,b4){if(bY===b5){bH("select",bU).val(b4)}});return bU[0]}function aD(bW){var bV=bW.sPaginationType,bY=Q.ext.pager[bV],bU=typeof bY==="function",bZ=function(b0){a6(b0)},bX=bH("<div/>").addClass(bW.oClasses.sPaging+bV)[0],bT=bW.aanFeatures;if(!bU){bY.fnInit(bW,bX,bZ)}if(!bT.p){bX.id=bW.sTableId+"_paginate";bW.aoDrawCallback.push({fn:function(b3){if(bU){var b0=b3._iDisplayStart,b5=b3._iDisplayLength,b1=b3.fnRecordsDisplay(),b8=b5===-1,b6=b8?0:Math.ceil(b0/b5),b2=b8?1:Math.ceil(b1/b5),b7=bY(b6,b2),b4,b9;for(b4=0,b9=bT.p.length;b4<b9;b4++){V(b3,"pageButton")(b3,bT.p[b4],b4,b7,b6,b2)}}else{bY.fnUpdate(b3,bZ)}},sName:"pagination"})}return bX}function aJ(bV,bW,bZ){var bY=bV._iDisplayStart,bT=bV._iDisplayLength,bU=bV.fnRecordsDisplay();if(bU===0||bT===-1){bY=0}else{if(typeof bW==="number"){bY=bW*bT;if(bY>bU){bY=0}}else{if(bW=="first"){bY=0}else{if(bW=="previous"){bY=bT>=0?bY-bT:0;if(bY<0){bY=0}}else{if(bW=="next"){if(bY+bT<bU){bY+=bT}}else{if(bW=="last"){bY=Math.floor((bU-1)/bT)*bT}else{aQ(bV,0,"Unknown paging action: "+bW,5)}}}}}}var bX=bV._iDisplayStart!==bY;bV._iDisplayStart=bY;if(bX){O(bV,null,"page",[bV]);if(bZ){a6(bV)}}return bX}function bC(bT){return bH("<div/>",{id:!bT.aanFeatures.r?bT.sTableId+"_processing":null,"class":bT.oClasses.sProcessing}).html(bT.oLanguage.sProcessing).insertBefore(bT.nTable)[0]}function z(bU,bT){if(bU.oFeatures.bProcessing){bH(bU.aanFeatures.r).css("display",bT?"block":"none")}O(bU,null,"processing",[bU,bT])}function bB(b7){var b6=bH(b7.nTable);b6.attr("role","grid");var bT=b7.oScroll;if(bT.sX===""&&bT.sY===""){return b7.nTable}var b1=bT.sX;var b0=bT.sY;var b8=b7.oClasses;var b5=b6.children("caption");var bU=b5.length?b5[0]._captionSide:null;var bX=bH(b6[0].cloneNode(false));var ca=bH(b6[0].cloneNode(false));var bZ=b6.children("tfoot");var b2="<div/>";var bY=function(cb){return !cb?null:bM(cb)};if(bT.sX&&b6.attr("width")==="100%"){b6.removeAttr("width")}if(!bZ.length){bZ=null}var b4=bH(b2,{"class":b8.sScrollWrapper}).append(bH(b2,{"class":b8.sScrollHead}).css({overflow:"hidden",position:"relative",border:0,width:b1?bY(b1):"100%"}).append(bH(b2,{"class":b8.sScrollHeadInner}).css({"box-sizing":"content-box",width:bT.sXInner||"100%"}).append(bX.removeAttr("id").css("margin-left",0).append(bU==="top"?b5:null).append(b6.children("thead"))))).append(bH(b2,{"class":b8.sScrollBody}).css({position:"relative",overflow:"auto",width:bY(b1)}).append(b6));if(bZ){b4.append(bH(b2,{"class":b8.sScrollFoot}).css({overflow:"hidden",border:0,width:b1?bY(b1):"100%"}).append(bH(b2,{"class":b8.sScrollFootInner}).append(ca.removeAttr("id").css("margin-left",0).append(bU==="bottom"?b5:null).append(b6.children("tfoot")))))}var bV=b4.children();var b3=bV[0];var b9=bV[1];var bW=bZ?bV[2]:null;if(b1){bH(b9).on("scroll.DT",function(cb){var cc=this.scrollLeft;b3.scrollLeft=cc;if(bZ){bW.scrollLeft=cc}})}bH(b9).css(b0&&bT.bCollapse?"max-height":"height",b0);b7.nScrollHead=b3;b7.nScrollBody=b9;b7.nScrollFoot=bW;b7.aoDrawCallback.push({fn:o,sName:"scrolling"});return b4[0]}function o(cs){var co=cs.oScroll,bY=co.sX,cj=co.sXInner,bV=co.sY,ch=co.iBarWidth,cm=bH(cs.nScrollHead),cb=cm[0].style,bX=cm.children("div"),bU=bX[0].style,cv=bX.children("table"),b4=cs.nScrollBody,cf=bH(b4),ca=b4.style,cp=bH(cs.nScrollFoot),ce=cp.children("div"),cc=ce.children("table"),b2=bH(cs.nTHead),cd=bH(cs.nTable),cg=cd[0],b0=cg.style,b9=cs.nTFoot?bH(cs.nTFoot):null,b1=cs.oBrowser,b6=b1.bScrollOversize,bW,bZ,cr,ct,b7,b5,cl=[],cn=[],ci=[],cu,b3,cw,b8=function(cx){var cy=cx.style;cy.paddingTop="0";cy.paddingBottom="0";cy.borderTopWidth="0";cy.borderBottomWidth="0";cy.height=0};cd.children("thead, tfoot").remove();b7=b2.clone().prependTo(cd);bW=b2.find("tr");cr=b7.find("tr");b7.find("th, td").removeAttr("tabindex");if(b9){b5=b9.clone().prependTo(cd);bZ=b9.find("tr");ct=b5.find("tr")}if(!bY){ca.width="100%";cm[0].style.width="100%"}bH.each(bj(cs,b7),function(cx,cy){cu=u(cs,cx);cy.style.width=cs.aoColumns[cu].sWidth});if(b9){bb(function(cx){cx.style.width=""},ct)}cw=cd.outerWidth();if(bY===""){b0.width="100%";if(b6&&(cd.find("tbody").height()>b4.offsetHeight||cf.css("overflow-y")=="scroll")){b0.width=bM(cd.outerWidth()-ch)}cw=cd.outerWidth()}else{if(cj!==""){b0.width=bM(cj);cw=cd.outerWidth()}}bb(b8,cr);bb(function(cx){ci.push(cx.innerHTML);cl.push(bM(bH(cx).css("width")))},cr);bb(function(cy,cx){cy.style.width=cl[cx]},bW);bH(cr).height(0);if(b9){bb(b8,ct);bb(function(cx){cn.push(bM(bH(cx).css("width")))},ct);bb(function(cy,cx){cy.style.width=cn[cx]},bZ);bH(ct).height(0)}bb(function(cy,cx){cy.innerHTML='<div class="dataTables_sizing" style="height:0;overflow:hidden;">'+ci[cx]+"</div>";cy.style.width=cl[cx]},cr);if(b9){bb(function(cy,cx){cy.innerHTML="";cy.style.width=cn[cx]},ct)}if(cd.outerWidth()<cw){b3=((b4.scrollHeight>b4.offsetHeight||cf.css("overflow-y")=="scroll"))?cw+ch:cw;if(b6&&(b4.scrollHeight>b4.offsetHeight||cf.css("overflow-y")=="scroll")){b0.width=bM(b3-ch)}if(bY===""||cj!==""){aQ(cs,1,"Possible column misalignment",6)}}else{b3="100%"}ca.width=bM(b3);cb.width=bM(b3);if(b9){cs.nScrollFoot.style.width=bM(b3)}if(!bV){if(b6){ca.height=bM(cg.offsetHeight+ch)}}var bT=cd.outerWidth();cv[0].style.width=bM(bT);bU.width=bM(bT);var ck=cd.height()>b4.clientHeight||cf.css("overflow-y")=="scroll";var cq="padding"+(b1.bScrollbarLeft?"Left":"Right");bU[cq]=ck?ch+"px":"0px";if(b9){cc[0].style.width=bM(bT);ce[0].style.width=bM(bT);ce[0].style[cq]=ck?ch+"px":"0px"}cf.scroll();if((cs.bSorted||cs.bFiltered)&&!cs._drawHold){b4.scrollTop=0}}function bb(bY,bV,bU){var bW=0,bX=0,bT=bV.length;var b0,bZ;while(bX<bT){b0=bV[bX].firstChild;bZ=bU?bU[bX].firstChild:null;while(b0){if(b0.nodeType===1){if(bU){bY(b0,bZ,bW)}else{bY(b0,bW)}bW++}b0=b0.nextSibling;bZ=bU?bZ.nextSibling:null}bX++}}var a4=/<.*?>/g;function by(bZ){var cb=bZ.nTable,bW=bZ.aoColumns,bV=bZ.oScroll,b7=bV.sY,b8=bV.sX,bY=bV.sXInner,cg=bW.length,cd=s(bZ,"bVisible"),cc=bH("th",bZ.nTHead),b4=cb.getAttribute("width"),b1=cb.parentNode,ce=false,ca,bX,ci,b6,bT,ch=bZ.oBrowser,b9=ch.bScrollOversize;var b3=cb.style.width;if(b3&&b3.indexOf("%")!==-1){b4=b3}for(ca=0;ca<cd.length;ca++){bX=bW[cd[ca]];if(bX.sWidth!==null){bX.sWidth=ak(bX.sWidthOrig,b1);ce=true}}if(b9||!ce&&!b8&&!b7&&cg==aT(bZ)&&cg==cc.length){for(ca=0;ca<cg;ca++){var b2=u(bZ,ca);if(b2){bW[b2].sWidth=bM(cc.eq(ca).width())}}}else{var b0=bH(cb).clone().css("visibility","hidden").removeAttr("id");b0.find("tbody tr").remove();var bU=bH("<tr/>").appendTo(b0.find("tbody"));b0.find("thead, tfoot").remove();b0.append(bH(bZ.nTHead).clone()).append(bH(bZ.nTFoot).clone());b0.find("tfoot th, tfoot td").css("width","");cc=bj(bZ,b0.find("thead")[0]);for(ca=0;ca<cd.length;ca++){bX=bW[cd[ca]];cc[ca].style.width=bX.sWidthOrig!==null&&bX.sWidthOrig!==""?bM(bX.sWidthOrig):""}if(bZ.aoData.length){for(ca=0;ca<cd.length;ca++){ci=cd[ca];bX=bW[ci];bH(aN(bZ,ci)).clone(false).append(bX.sContentPadding).appendTo(bU)}}var b5=bH("<div/>").css(b8||b7?{position:"absolute",top:0,left:0,height:1,right:0,overflow:"hidden"}:{}).append(b0).appendTo(b1);if(b8&&bY){b0.width(bY)}else{if(b8){b0.css("width","auto");if(b0.width()<b1.clientWidth){b0.width(b1.clientWidth)}}else{if(b7){b0.width(b1.clientWidth)}else{if(b4){b0.width(b4)}}}}if(b8){var cj=0;for(ca=0;ca<cd.length;ca++){bX=bW[cd[ca]];bT=ch.bBounding?cc[ca].getBoundingClientRect().width:bH(cc[ca]).outerWidth();cj+=bX.sWidthOrig===null?bT:parseInt(bX.sWidth,10)+bT-bH(cc[ca]).width()}b0.width(bM(cj));cb.style.width=bM(cj)}for(ca=0;ca<cd.length;ca++){bX=bW[cd[ca]];b6=bH(cc[ca]).width();if(b6){bX.sWidth=bM(b6)}}cb.style.width=bM(b0.css("width"));b5.remove()}if(b4){cb.style.width=bM(b4)}if((b4||b8)&&!bZ._reszEvt){var cf=function(){bH(b).bind("resize.DT-"+bZ.sInstance,ap(function(){aM(bZ)}))};if(b9){setTimeout(cf,1000)}else{cf()}bZ._reszEvt=true}}function ap(bT,bW){var bV=bW!==c?bW:200,bU,bX;return function(){var b0=this,bZ=+new Date(),bY=arguments;if(bU&&bZ<bU+bV){clearTimeout(bX);bX=setTimeout(function(){bU=c;bT.apply(b0,bY)},bV)}else{bU=bZ;bT.apply(b0,bY)}}}function ak(bU,bT){if(!bU){return 0}var bW=bH("<div/>").css("width",bM(bU)).appendTo(bT||a.body);var bV=bW[0].offsetWidth;bW.remove();return bV}function aN(bU,bW){var bT=ae(bU,bW);if(bT<0){return null}var bV=bU.aoData[bT];return !bV.nTr?bH("<td/>").html(bw(bU,bT,bW,"display"))[0]:bV.anCells[bW]}function ae(bY,bZ){var bX,bT=-1,bV=-1;for(var bW=0,bU=bY.aoData.length;bW<bU;bW++){bX=bw(bY,bW,bZ,"display")+"";bX=bX.replace(a4,"");if(bX.length>bT){bT=bX.length;bV=bW}}return bV}function bM(bT){if(bT===null){return"0px"}if(typeof bT=="number"){return bT<0?"0px":bT+"px"}return bT.match(/\d$/)?bT+"px":bT}function aL(bW){var b1,bV,bY,b2,bZ=[],b4=[],b6=bW.aoColumns,b0,b5,bT,b3,bX=bW.aaSortingFixed,b8=bH.isPlainObject(bX),bU=[],b7=function(b9){if(b9.length&&!bH.isArray(b9[0])){bU.push(b9)}else{bH.merge(bU,b9)}};if(bH.isArray(bX)){b7(bX)}if(b8&&bX.pre){b7(bX.pre)}b7(bW.aaSorting);if(b8&&bX.post){b7(bX.post)}for(b1=0;b1<bU.length;b1++){b3=bU[b1][0];b0=b6[b3].aDataSort;for(bY=0,b2=b0.length;bY<b2;bY++){b5=b0[bY];bT=b6[b5].sType||"string";if(bU[b1]._idx===c){bU[b1]._idx=bH.inArray(bU[b1][1],b6[b5].asSorting)}bZ.push({src:b3,col:b5,dir:bU[b1][1],index:bU[b1]._idx,type:bT,formatter:Q.ext.type.order[bT+"-pre"]})}}return bZ}function A(bY){var ca,bW,b7,b9,cb,b6,bT,b3,bZ,cf=[],b2=Q.ext.type.order,b4=bY.aoData,b8=bY.aoColumns,bU,ce,bX,b1,b5,cc=0,b0,bV=bY.aiDisplayMaster,cd;y(bY);cd=aL(bY);for(ca=0,bW=cd.length;ca<bW;ca++){b0=cd[ca];if(b0.formatter){cc++}J(bY,b0.col)}if(B(bY)!="ssp"&&cd.length!==0){for(ca=0,b7=bV.length;ca<b7;ca++){cf[bV[ca]]=ca}if(cc===cd.length){bV.sort(function(co,cn){var cp,cm,cg,cl,ch,ci=cd.length,ck=b4[co]._aSortData,cj=b4[cn]._aSortData;for(cg=0;cg<ci;cg++){ch=cd[cg];cp=ck[ch.col];cm=cj[ch.col];cl=cp<cm?-1:cp>cm?1:0;if(cl!==0){return ch.dir==="asc"?cl:-cl}}cp=cf[co];cm=cf[cn];return cp<cm?-1:cp>cm?1:0})}else{bV.sort(function(cq,cp){var cr,co,ch,cg,cm,ci,cn,cj=cd.length,cl=b4[cq]._aSortData,ck=b4[cp]._aSortData;for(ch=0;ch<cj;ch++){ci=cd[ch];cr=cl[ci.col];co=ck[ci.col];cn=b2[ci.type+"-"+ci.dir]||b2["string-"+ci.dir];cm=cn(cr,co);if(cm!==0){return cm}}cr=cf[cq];co=cf[cp];return cr<co?-1:cr>co?1:0})}}bY.bSorted=true}function bf(bX){var b3;var b2;var bY=bX.aoColumns;var bZ=aL(bX);var b0=bX.oLanguage.oAria;for(var b1=0,bV=bY.length;b1<bV;b1++){var bU=bY[b1];var bW=bU.asSorting;var b4=bU.sTitle.replace(/<.*?>/g,"");var bT=bU.nTh;bT.removeAttribute("aria-sort");if(bU.bSortable){if(bZ.length>0&&bZ[0].col==b1){bT.setAttribute("aria-sort",bZ[0].dir=="asc"?"ascending":"descending");b2=bW[bZ[0].index+1]||bW[0]}else{b2=bW[0]}b3=b4+(b2==="asc"?b0.sSortAscending:b0.sSortDescending)}else{b3=b4}bT.setAttribute("aria-label",b3)}}function bl(bW,bY,bT,b2){var bU=bW.aoColumns[bY];var b0=bW.aaSorting;var bX=bU.asSorting;var b1;var bZ=function(b4,b5){var b3=b4._idx;if(b3===c){b3=bH.inArray(b4[1],bX)}return b3+1<bX.length?b3+1:b5?null:0};if(typeof b0[0]==="number"){b0=bW.aaSorting=[b0]}if(bT&&bW.oFeatures.bSortMulti){var bV=bH.inArray(bY,ay(b0,"0"));if(bV!==-1){b1=bZ(b0[bV],true);if(b1===null&&b0.length===1){b1=0}if(b1===null){b0.splice(bV,1)}else{b0[bV][1]=bX[b1];b0[bV]._idx=b1}}else{b0.push([bY,bX[0],0]);b0[b0.length-1]._idx=0}}else{if(b0.length&&b0[0][0]==bY){b1=bZ(b0[0]);b0.length=1;b0[0][1]=bX[b1];b0[0]._idx=b1}else{b0.length=0;b0.push([bY,bX[0]]);b0[0]._idx=0}}am(bW);if(typeof b2=="function"){b2(bW)}}function F(bV,bU,bX,bW){var bT=bV.aoColumns[bX];be(bU,{},function(bY){if(bT.bSortable===false){return}if(bV.oFeatures.bProcessing){z(bV,true);setTimeout(function(){bl(bV,bX,bY.shiftKey,bW);if(B(bV)!=="ssp"){z(bV,false)}},0)}else{bl(bV,bX,bY.shiftKey,bW)}})}function ai(bY){var bZ=bY.aLastSort;var bU=bY.oClasses.sSortColumn;var bW=aL(bY);var bX=bY.oFeatures;var bV,bT,b0;if(bX.bSort&&bX.bSortClasses){for(bV=0,bT=bZ.length;bV<bT;bV++){b0=bZ[bV].src;bH(ay(bY.aoData,"anCells",b0)).removeClass(bU+(bV<2?bV+1:3))}for(bV=0,bT=bW.length;bV<bT;bV++){b0=bW[bV].src;bH(ay(bY.aoData,"anCells",b0)).addClass(bU+(bV<2?bV+1:3))}}bY.aLastSort=bW}function J(bT,bY){var bU=bT.aoColumns[bY];var b2=Q.ext.order[bU.sSortDataType];var b0;if(b2){b0=b2.call(bT.oInstance,bT,bY,bL(bT,bY))}var b1,bW;var bX=Q.ext.type.order[bU.sType+"-pre"];for(var bV=0,bZ=bT.aoData.length;bV<bZ;bV++){b1=bT.aoData[bV];if(!b1._aSortData){b1._aSortData=[]}if(!b1._aSortData[bY]||b2){bW=b2?b0[bV]:bw(bT,bV,bY,"sort");b1._aSortData[bY]=bX?bX(bW):bW}}}function bq(bT){if(!bT.oFeatures.bStateSave||bT.bDestroying){return}var bU={time:+new Date(),start:bT._iDisplayStart,length:bT._iDisplayLength,order:bH.extend(true,[],bT.aaSorting),search:bA(bT.oPreviousSearch),columns:bH.map(bT.aoColumns,function(bV,bW){return{visible:bV.bVisible,search:bA(bT.aoPreSearchCols[bW])}})};O(bT,"aoStateSaveParams","stateSaveParams",[bT,bU]);bT.oSavedState=bU;bT.fnStateSaveCallback.call(bT.oInstance,bT,bU)}function ah(bT){var bU={time:+new Date(),start:bT._iDisplayStart,length:bT._iDisplayLength,order:bH.extend(true,[],bT.aaSorting),search:bA(bT.oPreviousSearch)};O(bT,"aoSaveExternalState","saveExternalState",[bU])}function bQ(bV,b0){var bY,b1;var bW=bV.aoColumns;if(!bV.oFeatures.bStateSave){return}var bT=bV.fnStateLoadCallback.call(bV.oInstance,bV);if(!bT||!bT.time){return}var bZ=O(bV,"aoStateLoadParams","stateLoadParams",[bV,bT]);if(bH.inArray(false,bZ)!==-1){return}var bX=bV.iStateDuration;if(bX>0&&bT.time<+new Date()-(bX*1000)){return}if(bW.length!==bT.columns.length){return}bV.oLoadedState=bH.extend(true,{},bT);if(bT.start!==c){bV._iDisplayStart=bT.start;bV.iInitDisplayStart=bT.start}if(bT.length!==c){bV._iDisplayLength=bT.length}if(bT.order!==c){bV.aaSorting=[];bH.each(bT.order,function(b3,b2){bV.aaSorting.push(b2[0]>=bW.length?[0,b2[1]]:b2)})}if(bT.search!==c){bH.extend(bV.oPreviousSearch,aI(bT.search))}for(bY=0,b1=bT.columns.length;bY<b1;bY++){var bU=bT.columns[bY];if(bU.visible!==c){bW[bY].bVisible=bU.visible}if(bU.search!==c){bH.extend(bV.aoPreSearchCols[bY],aI(bU.search))}}O(bV,"aoStateLoaded","stateLoaded",[bV,bT])}function ar(bV){var bU=Q.settings;var bT=bH.inArray(bV,ay(bU,"nTable"));return bT!==-1?bU[bT]:null}function aQ(bW,bY,bX,bT){bX="DataTables warning: "+(bW?"table id="+bW.sTableId+" - ":"")+bX;if(bT){bX+=". For more information about this error, please see http://datatables.net/tn/"+bT}if(!bY){var bV=Q.ext;var bU=bV.sErrMode||bV.errMode;if(bW){O(bW,null,"error",[bW,bT,bX])}if(bU=="alert"){alert(bX)}else{if(bU=="throw"){throw new Error(bX)}else{if(typeof bU=="function"){bU(bW,bT,bX)}}}}else{if(b.console&&console.log){console.log(bX)}}}function U(bU,bW,bT,bV){if(bH.isArray(bT)){bH.each(bT,function(bX,bY){if(bH.isArray(bY)){U(bU,bW,bY[0],bY[1])}else{U(bU,bW,bY)}});return}if(bV===c){bV=bT}if(bW[bT]!==c){bU[bV]=bW[bT]}}function a0(bT,bV,bU){var bW;for(var bX in bV){if(bV.hasOwnProperty(bX)){bW=bV[bX];if(bH.isPlainObject(bW)){if(!bH.isPlainObject(bT[bX])){bT[bX]={}}bH.extend(true,bT[bX],bW)}else{if(bU&&bX!=="data"&&bX!=="aaData"&&bH.isArray(bW)){bT[bX]=bW.slice()}else{bT[bX]=bW}}}}return bT}function be(bV,bU,bT){bH(bV).bind("click.DT",bU,function(bW){bV.blur();bT(bW)}).bind("keypress.DT",bU,function(bW){if(bW.which===13){bW.preventDefault();bT(bW)}}).bind("selectstart.DT",function(){return false})}function bP(bW,bU,bT,bV){if(bT){bW[bU].push({fn:bT,sName:bV})}}function O(bW,bX,bT,bV){var bU=[];if(bX){bU=bH.map(bW[bX].slice().reverse(),function(b0,bZ){return b0.fn.apply(bW.oInstance,bV)})}if(bT!==null){var bY=bH.Event(bT+".dt");bH(bW.nTable).trigger(bY,bV);bU.push(bY.result)}return bU}function bn(bV){var bW=bV._iDisplayStart,bU=bV.fnDisplayEnd(),bT=bV._iDisplayLength;if(bW>=bU){bW=bU-bT}bW-=(bW%bT);if(bT===-1||bW<0){bW=0}bV._iDisplayStart=bW}function V(bU,bT){var bW=bU.renderer;var bV=Q.ext.renderer[bT];if(bH.isPlainObject(bW)&&bW[bT]){return bV[bW[bT]]||bV._}else{if(typeof bW==="string"){return bV[bW]||bV._}}return bV._}function B(bT){if(bT.oFeatures.bServerSide){return"ssp"}else{if(bT.ajax||bT.sAjaxSource){return"ajax"}}return"dom"}Q=function(bV){this.$=function(bZ,bY){return this.api(true).$(bZ,bY)};this._=function(bZ,bY){return this.api(true).rows(bZ,bY).data()};this.api=function(bY){return bY?new M(ar(this[L.iApiIndex])):new M(this)};this.fnAddData=function(b0,b1){var bY=this.api(true);var bZ=bH.isArray(b0)&&(bH.isArray(b0[0])||bH.isPlainObject(b0[0]))?bY.rows.add(b0):bY.row.add(b0);if(b1===c||b1){bY.draw()}return bZ.flatten().toArray()};this.fnAdjustColumnSizing=function(b1){var b0=this.api(true).columns.adjust();var bZ=b0.settings()[0];var bY=bZ.oScroll;if(b1===c||b1){b0.draw(false)}else{if(bY.sX!==""||bY.sY!==""){o(bZ)}}};this.fnClearTable=function(bZ){var bY=this.api(true).clear();if(bZ===c||bZ){bY.draw()}};this.fnClose=function(bY){this.api(true).row(bY).child.hide()};this.fnDeleteRow=function(b2,b4,b3){var bZ=this.api(true);var b1=bZ.rows(b2);var bY=b1.settings()[0];var b0=bY.aoData[b1[0][0]];b1.remove();if(b4){b4.call(this,bY,b0)}if(b3===c||b3){bZ.draw()}return b0};this.fnDestroy=function(bY){this.api(true).destroy(bY)};this.fnDraw=function(bY){this.api(true).draw(bY)};this.fnFilter=function(b2,bZ,b0,b4,b3,bY){var b1=this.api(true);if(bZ===null||bZ===c){b1.search(b2,b0,b4,bY)}else{b1.column(bZ).search(b2,b0,b4,bY)}b1.draw()};this.fnGetData=function(b1,bY){var b0=this.api(true);if(b1!==c){var bZ=b1.nodeName?b1.nodeName.toLowerCase():"";return bY!==c||bZ=="td"||bZ=="th"?b0.cell(b1,bY).data():b0.row(b1).data()||null}return b0.data().toArray()};this.fnGetNodes=function(bZ){var bY=this.api(true);return bZ!==c?bY.row(bZ).node():bY.rows().nodes().flatten().toArray()};this.fnGetPosition=function(b0){var bZ=this.api(true);var b1=b0.nodeName.toUpperCase();if(b1=="TR"){return bZ.row(b0).index()}else{if(b1=="TD"||b1=="TH"){var bY=bZ.cell(b0).index();return[bY.row,bY.columnVisible,bY.column]}}return null};this.fnIsOpen=function(bY){return this.api(true).row(bY).child.isShown()};this.fnOpen=function(bZ,bY,b0){return this.api(true).row(bZ).child(bY,b0).show().child()[0]};this.fnPageChange=function(bY,b0){var bZ=this.api(true).page(bY);if(b0===c||b0){bZ.draw(false)}};this.fnSetColumnVis=function(bZ,bY,b1){var b0=this.api(true).column(bZ).visible(bY);if(b1===c||b1){b0.columns.adjust().draw()}};this.fnSettings=function(){return ar(this[L.iApiIndex])};this.fnSort=function(bY){this.api(true).order(bY).draw()};this.fnSortListener=function(bZ,bY,b0){this.api(true).order.listener(bZ,bY,b0)};this.fnUpdate=function(b2,b1,bY,b3,b0){var bZ=this.api(true);if(bY===c||bY===null){bZ.row(b1).data(b2)}else{bZ.cell(b1,bY).data(b2)}if(b0===c||b0){bZ.columns.adjust()}if(b3===c||b3){bZ.draw()}return 0};this.fnVersionCheck=L.fnVersionCheck;var bW=this;var bU=bV===c;var bT=this.length;if(bU){bV={}}this.oApi=this.internal=L.internal;for(var bX in Q.ext.internal){if(bX){this[bX]=al(bX)}}this.each(function(){var ci={};var ce=bT>1?a0(ci,bV,true):bV;var co=0,cm,cn,cr,cl,bY;var b9=this.getAttribute("id");var b7=false;var cc=Q.defaults;var b8=bH(this);if(this.nodeName.toLowerCase()!="table"){aQ(null,0,"Non-table node initialisation ("+this.nodeName+")",2);return}a7(cc);aa(cc.column);ad(cc,cc,true);ad(cc.column,cc.column,true);ad(cc,bH.extend(ce,b8.data()));var b4=Q.settings;for(co=0,cm=b4.length;co<cm;co++){var cf=b4[co];if(cf.nTable==this||cf.nTHead.parentNode==this||(cf.nTFoot&&cf.nTFoot.parentNode==this)){var ck=ce.bRetrieve!==c?ce.bRetrieve:cc.bRetrieve;var cb=ce.bDestroy!==c?ce.bDestroy:cc.bDestroy;if(bU||ck){return cf.oInstance}else{if(cb){cf.oInstance.fnDestroy();break}else{aQ(cf,0,"Cannot reinitialise DataTable",3);return}}}if(cf.sTableId==this.id){b4.splice(co,1);break}}if(b9===null||b9===""){b9="DataTables_Table_"+(Q.ext._unique++);this.id=b9}var b5=bH.extend(true,{},Q.models.oSettings,{sDestroyWidth:b8[0].style.width,sInstance:b9,sTableId:b9});b5.nTable=this;b5.oApi=bW.internal;b5.oInit=ce;b4.push(b5);b5.oInstance=(bW.length===1)?bW:b8.dataTable();a7(ce);if(ce.oLanguage){aV(ce.oLanguage)}if(ce.aLengthMenu&&!ce.iDisplayLength){ce.iDisplayLength=bH.isArray(ce.aLengthMenu[0])?ce.aLengthMenu[0][0]:ce.aLengthMenu[0]}ce=a0(bH.extend(true,{},cc),ce);U(b5.oFeatures,ce,["bPaginate","bLengthChange","bFilter","bSort","bSortMulti","bInfo","bProcessing","bAutoWidth","bSortClasses","bServerSide","bDeferRender"]);U(b5,ce,["asStripeClasses","ajax","fnServerData","fnFormatNumber","sServerMethod","aaSorting","aaSortingFixed","aLengthMenu","sPaginationType","sAjaxSource","sAjaxDataProp","iStateDuration","sDom","bSortCellsTop","iTabIndex","fnStateLoadCallback","fnStateSaveCallback","renderer","searchDelay","rowId",["iCookieDuration","iStateDuration"],["oSearch","oPreviousSearch"],["aoSearchCols","aoPreSearchCols"],["iDisplayLength","_iDisplayLength"],["bJQueryUI","bJUI"]]);U(b5.oScroll,ce,[["sScrollX","sX"],["sScrollXInner","sXInner"],["sScrollY","sY"],["bScrollCollapse","bCollapse"]]);U(b5.oLanguage,ce,"fnInfoCallback");bP(b5,"aoDrawCallback",ce.fnDrawCallback,"user");bP(b5,"aoServerParams",ce.fnServerParams,"user");bP(b5,"aoStateSaveParams",ce.fnStateSaveParams,"user");bP(b5,"aoStateLoadParams",ce.fnStateLoadParams,"user");bP(b5,"aoStateLoaded",ce.fnStateLoaded,"user");bP(b5,"aoRowCallback",ce.fnRowCallback,"user");bP(b5,"aoRowCreatedCallback",ce.fnCreatedRow,"user");bP(b5,"aoHeaderCallback",ce.fnHeaderCallback,"user");bP(b5,"aoFooterCallback",ce.fnFooterCallback,"user");bP(b5,"aoInitComplete",ce.fnInitComplete,"user");bP(b5,"aoPreDrawCallback",ce.fnPreDrawCallback,"user");b5.aoSaveExternalState=[];bP(b5,"aoSaveExternalState",ce.fnSaveExternalState,"user");b5.rowIdFn=at(ce.rowId);bg(b5);var ca=b5.oClasses;if(ce.bJQueryUI){bH.extend(ca,Q.ext.oJUIClasses,ce.oClasses);if(ce.sDom===cc.sDom&&cc.sDom==="lfrtip"){b5.sDom='<"H"lfr>t<"F"ip>'}if(!b5.renderer){b5.renderer="jqueryui"}else{if(bH.isPlainObject(b5.renderer)&&!b5.renderer.header){b5.renderer.header="jqueryui"}}}else{bH.extend(ca,Q.ext.classes,ce.oClasses)}b8.addClass(ca.sTable);if(b5.iInitDisplayStart===c){b5.iInitDisplayStart=ce.iDisplayStart;b5._iDisplayStart=ce.iDisplayStart}if(ce.iDeferLoading!==null){b5.bDeferLoading=true;var cs=bH.isArray(ce.iDeferLoading);b5._iRecordsDisplay=cs?ce.iDeferLoading[0]:ce.iDeferLoading;b5._iRecordsTotal=cs?ce.iDeferLoading[1]:ce.iDeferLoading}var ch=b5.oLanguage;bH.extend(true,ch,ce.oLanguage);if(ch.sUrl!==""){bH.ajax({dataType:"json",url:ch.sUrl,success:function(cu){aV(cu);ad(cc.oLanguage,cu);bH.extend(true,ch,cu);h(b5)},error:function(){h(b5)}});b7=true}if(ce.asStripeClasses===null){b5.asStripeClasses=[ca.sStripeOdd,ca.sStripeEven]}var cp=b5.asStripeClasses;var b3=b8.children("tbody").find("tr").eq(0);if(bH.inArray(true,bH.map(cp,function(cv,cu){return b3.hasClass(cv)}))!==-1){bH("tbody tr",this).removeClass(cp.join(" "));b5.asDestroyStripes=cp.slice()}var cj=[];var b2;var cg=this.getElementsByTagName("thead");if(cg.length!==0){aA(b5.aoHeader,cg[0]);cj=bj(b5)}if(ce.aoColumns===null){b2=[];for(co=0,cm=cj.length;co<cm;co++){b2.push(null)}}else{b2=ce.aoColumns}for(co=0,cm=b2.length;co<cm;co++){R(b5,cj?cj[co]:null)}n(b5,ce.aoColumnDefs,b2,function(cv,cu){a5(b5,cv,cu)});if(b3.length){var ct=function(cu,cv){return cu.getAttribute("data-"+cv)!==null?cv:null};bH(b3[0]).children("th, td").each(function(cx,cu){var cv=b5.aoColumns[cx];if(cv.mData===cx){var cw=ct(cu,"sort")||ct(cu,"order");var cy=ct(cu,"filter")||ct(cu,"search");if(cw!==null||cy!==null){cv.mData={_:cx+".display",sort:cw!==null?cx+".@data-"+cw:c,type:cw!==null?cx+".@data-"+cw:c,filter:cy!==null?cx+".@data-"+cy:c};a5(b5,cx)}}})}var b6=b5.oFeatures;if(ce.bStateSave){b6.bStateSave=true;bQ(b5,ce);bP(b5,"aoDrawCallback",bq,"state_save")}else{if(bV.fnLoadExternalState!=c){Q.ext.fnLoadFromExternalState(b5,bV)}}if(ce.aaSorting===c){var b1=b5.aaSorting;for(co=0,cm=b1.length;co<cm;co++){b1[co][1]=b5.aoColumns[co].asSorting[0]}}ai(b5);if(b6.bSort){bP(b5,"aoDrawCallback",function(){if(b5.bSorted){var cu=aL(b5);var cv={};bH.each(cu,function(cw,cx){cv[cx.src]=cx.dir});O(b5,null,"order",[b5,cu,cv]);bf(b5)}})}bP(b5,"aoDrawCallback",function(){if(b5.bSorted||B(b5)==="ssp"||b6.bDeferRender){ai(b5)}},"sc");var b0=b8.children("caption").each(function(){this._captionSide=b8.css("caption-side")});var cq=b8.children("thead");if(cq.length===0){cq=bH("<thead/>").appendTo(this)}b5.nTHead=cq[0];var bZ=b8.children("tbody");if(bZ.length===0){bZ=bH("<tbody/>").appendTo(this)}b5.nTBody=bZ[0];var cd=b8.children("tfoot");if(cd.length===0&&b0.length>0&&(b5.oScroll.sX!==""||b5.oScroll.sY!=="")){cd=bH("<tfoot/>").appendTo(this)}if(cd.length===0||cd.children().length===0){b8.addClass(ca.sNoFooter)}else{if(cd.length>0){b5.nTFoot=cd[0];aA(b5.aoFooter,b5.nTFoot)}}if(ce.aaData){for(co=0;co<ce.aaData.length;co++){aR(b5,ce.aaData[co])}}else{if(b5.bDeferLoading||B(b5)=="dom"){bS(b5,bH(b5.nTBody).children("tr"))}}b5.aiDisplay=b5.aiDisplayMaster.slice();b5.bInitialised=true;if(b7===false){h(b5)}});bW=null;return this};var X=[];var r=Array.prototype;var bR=function(bV){var bT,bX;var bW=Q.settings;var bU=bH.map(bW,function(bZ,bY){return bZ.nTable});if(!bV){return[]}else{if(bV.nTable&&bV.oApi){return[bV]}else{if(bV.nodeName&&bV.nodeName.toLowerCase()==="table"){bT=bH.inArray(bV,bU);return bT!==-1?[bW[bT]]:null}else{if(bV&&typeof bV.settings==="function"){return bV.settings().toArray()}else{if(typeof bV==="string"){bX=bH(bV)}else{if(bV instanceof bH){bX=bV}}}}}}if(bX){return bX.map(function(bY){bT=bH.inArray(this,bU);return bT!==-1?bW[bT]:null}).toArray()}};M=function(bV,bX){if(!(this instanceof M)){return new M(bV,bX)}var bW=[];var bY=function(b0){var bZ=bR(b0);if(bZ){bW=bW.concat(bZ)}};if(bH.isArray(bV)){for(var bU=0,bT=bV.length;bU<bT;bU++){bY(bV[bU])}}else{bY(bV)}this.context=aK(bW);if(bX){bH.merge(this,bX)}this.selector={rows:null,cols:null,opts:null};M.extend(this,this,X)};Q.Api=M;bH.extend(M.prototype,{any:function(){return this.count()!==0},concat:r.concat,context:[],count:function(){return this.flatten().length},each:function(bV){for(var bU=0,bT=this.length;bU<bT;bU++){bV.call(this,this[bU],bU,this)}return this},eq:function(bT){var bU=this.context;return bU.length>bT?new M(bU[bT],this[bT]):null},filter:function(bW){var bU=[];if(r.filter){bU=r.filter.call(this,bW,this)}else{for(var bV=0,bT=this.length;bV<bT;bV++){if(bW.call(this,this[bV],bV,this)){bU.push(this[bV])}}}return new M(this.context,bU)},flatten:function(){var bT=[];return new M(this.context,bT.concat.apply(bT,this.toArray()))},join:r.join,indexOf:r.indexOf||function(bV,bW){for(var bU=(bW||0),bT=this.length;bU<bT;bU++){if(this[bU]===bV){return bU}}return -1},iterator:function(ca,bV,bW,bY){var b8=[],b9,b5,bT,b3,b2,bU=this.context,bX,b0,b7,b4=this.selector;if(typeof ca==="string"){bY=bW;bW=bV;bV=ca;ca=false}for(b5=0,bT=bU.length;b5<bT;b5++){var b1=new M(bU[b5]);if(bV==="table"){b9=bW.call(b1,bU[b5],b5);if(b9!==c){b8.push(b9)}}else{if(bV==="columns"||bV==="rows"){b9=bW.call(b1,bU[b5],this[b5],b5);if(b9!==c){b8.push(b9)}}else{if(bV==="column"||bV==="column-rows"||bV==="row"||bV==="cell"){b0=this[b5];if(bV==="column-rows"){bX=aS(bU[b5],b4.opts)}for(b3=0,b2=b0.length;b3<b2;b3++){b7=b0[b3];if(bV==="cell"){b9=bW.call(b1,bU[b5],b7.row,b7.column,b5,b3)}else{b9=bW.call(b1,bU[b5],b7,b5,b3,bX)}if(b9!==c){b8.push(b9)}}}}}}if(b8.length||bY){var bZ=new M(bU,ca?b8.concat.apply([],b8):b8);var b6=bZ.selector;b6.rows=b4.rows;b6.cols=b4.cols;b6.opts=b4.opts;return bZ}return this},lastIndexOf:r.lastIndexOf||function(bT,bU){return this.indexOf.apply(this.toArray.reverse(),arguments)},length:0,map:function(bW){var bU=[];if(r.map){bU=r.map.call(this,bW,this)}else{for(var bV=0,bT=this.length;bV<bT;bV++){bU.push(bW.call(this,this[bV],bV))}}return new M(this.context,bU)},pluck:function(bT){return this.map(function(bU){return bU[bT]})},pop:r.pop,push:r.push,reduce:r.reduce||function(bT,bU){return aY(this,bT,bU,0,this.length,1)},reduceRight:r.reduceRight||function(bT,bU){return aY(this,bT,bU,this.length-1,-1,-1)},reverse:r.reverse,selector:null,shift:r.shift,sort:r.sort,splice:r.splice,toArray:function(){return r.slice.call(this)},to$:function(){return bH(this)},toJQuery:function(){return bH(this)},unique:function(){return new M(this.context,aK(this))},unshift:r.unshift});M.extend=function(b1,bX,bU){if(!bU.length||!bX||(!(bX instanceof M)&&!bX.__dt_wrapper)){return}var bY,b0,bW,bT,bV,b2,bZ=function(b4,b3,b5){return function(){var b6=b3.apply(b4,arguments);M.extend(b6,b6,b5.methodExt);return b6}};for(bY=0,b0=bU.length;bY<b0;bY++){bV=bU[bY];bX[bV.name]=typeof bV.val==="function"?bZ(b1,bV.val,bV):bH.isPlainObject(bV.val)?{}:bV.val;bX[bV.name].__dt_wrapper=true;M.extend(b1,bX[bV.name],bV.propExt)}};M.register=bm=function(bV,bX){if(bH.isArray(bV)){for(var b0=0,bW=bV.length;b0<bW;b0++){M.register(bV[b0],bX)}return}var b1,b4,bY=bV.split("."),bZ=X,b3,bU;var b2=function(b8,b6){for(var b7=0,b5=b8.length;b7<b5;b7++){if(b8[b7].name===b6){return b8[b7]}}return null};for(b1=0,b4=bY.length;b1<b4;b1++){bU=bY[b1].indexOf("()")!==-1;b3=bU?bY[b1].replace("()",""):bY[b1];var bT=b2(bZ,b3);if(!bT){bT={name:b3,val:{},methodExt:[],propExt:[]};bZ.push(bT)}if(b1===b4-1){bT.val=bX}else{bZ=bU?bT.methodExt:bT.propExt}}};M.registerPlural=aE=function(bT,bV,bU){M.register(bT,bU);M.register(bV,function(){var bW=bU.apply(this,arguments);if(bW===this){return this}else{if(bW instanceof M){return bW.length?bH.isArray(bW[0])?new M(bW.context,bW[0]):bW[0]:c}}return bW})};var d=function(bT,bU){if(typeof bT==="number"){return[bU[bT]]}var bV=bH.map(bU,function(bX,bW){return bX.nTable});return bH(bV).filter(bT).map(function(bX){var bW=bH.inArray(this,bV);return bU[bW]}).toArray()};bm("tables()",function(bT){return bT?new M(d(bT,this.context)):this});bm("table()",function(bT){var bV=this.tables(bT);var bU=bV.context;return bU.length?new M(bU[0]):bV});aE("tables().nodes()","table().node()",function(){return this.iterator("table",function(bT){return bT.nTable},1)});aE("tables().body()","table().body()",function(){return this.iterator("table",function(bT){return bT.nTBody},1)});aE("tables().header()","table().header()",function(){return this.iterator("table",function(bT){return bT.nTHead},1)});aE("tables().footer()","table().footer()",function(){return this.iterator("table",function(bT){return bT.nTFoot},1)});aE("tables().containers()","table().container()",function(){return this.iterator("table",function(bT){return bT.nTableWrapper},1)});bm("draw()",function(bT){return this.iterator("table",function(bU){if(bT==="page"){a6(bU)}else{if(typeof bT==="string"){bT=bT==="full-hold"?false:true}am(bU,bT===false)}})});bm("page()",function(bT){if(bT===c){return this.page.info().page}return this.iterator("table",function(bU){aJ(bU,bT)})});bm("page.info()",function(bX){if(this.context.length===0){return c}var bW=this.context[0],bY=bW._iDisplayStart,bT=bW._iDisplayLength,bU=bW.fnRecordsDisplay(),bV=bT===-1;return{page:bV?0:Math.floor(bY/bT),pages:bV?1:Math.ceil(bU/bT),start:bY,end:bW.fnDisplayEnd(),length:bT,recordsTotal:bW.fnRecordsTotal(),recordsDisplay:bU,serverSide:B(bW)==="ssp"}});bm("page.len()",function(bT){if(bT===c){return this.context.length!==0?this.context[0]._iDisplayLength:c}return this.iterator("table",function(bU){aW(bU,bT)})});var K=function(bV,bT,bX){if(bX){var bU=new M(bV);bU.one("draw",function(){bX(bU.ajax.json())})}if(B(bV)=="ssp"){am(bV,bT)}else{z(bV,true);var bW=bV.jqXHR;if(bW&&bW.readyState!==4){bW.abort()}az(bV,[],function(b0){bk(bV);var b1=bv(bV,b0);for(var bZ=0,bY=b1.length;bZ<bY;bZ++){aR(bV,b1[bZ])}am(bV,bT);z(bV,false)})}};bm("ajax.json()",function(){var bT=this.context;if(bT.length>0){return bT[0].json}});bm("ajax.params()",function(){var bT=this.context;if(bT.length>0){return bT[0].oAjaxData}});bm("ajax.reload()",function(bU,bT){return this.iterator("table",function(bV){K(bV,bT===false,bU)})});bm("ajax.url()",function(bU){var bT=this.context;if(bU===c){if(bT.length===0){return c}bT=bT[0];return bT.ajax?bH.isPlainObject(bT.ajax)?bT.ajax.url:bT.ajax:bT.sAjaxSource}return this.iterator("table",function(bV){if(bH.isPlainObject(bV.ajax)){bV.ajax.url=bU}else{bV.ajax=bU}})});bm("ajax.url().load()",function(bU,bT){return this.iterator("table",function(bV){K(bV,bT===false,bU)})});var au=function(b2,bX,b3,bW,bT){var bZ=[],b1,b4,b0,b6,bY,bU,b5=typeof bX;if(!bX||b5==="string"||b5==="function"||bX.length===c){bX=[bX]}for(b0=0,b6=bX.length;b0<b6;b0++){b4=bX[b0]&&bX[b0].split?bX[b0].split(","):[bX[b0]];for(bY=0,bU=b4.length;bY<bU;bY++){b1=b3(typeof b4[bY]==="string"?bH.trim(b4[bY]):b4[bY]);if(b1&&b1.length){bZ=bZ.concat(b1)}}}var bV=L.selector[b2];if(bV.length){for(b0=0,b6=bV.length;b0<b6;b0++){bZ=bV[b0](bW,bT,bZ)}}return aK(bZ)};var bG=function(bT){if(!bT){bT={}}if(bT.filter&&bT.search===c){bT.search=bT.filter}return bH.extend({search:"none",order:"current",page:"all"},bT)};var C=function(bV){for(var bU=0,bT=bV.length;bU<bT;bU++){if(bV[bU].length>0){bV[0]=bV[bU];bV[0].length=1;bV.length=1;bV.context=[bV.context[bU]];return bV}}bV.length=0;return bV};var aS=function(bV,bT){var bW,b2,bX,b0=[],b1=bV.aiDisplay,bY=bV.aiDisplayMaster;var b3=bT.search,bU=bT.order,bZ=bT.page;if(B(bV)=="ssp"){return b3==="removed"?[]:bi(0,bY.length)}else{if(bZ=="current"){for(bW=bV._iDisplayStart,b2=bV.fnDisplayEnd();bW<b2;bW++){b0.push(b1[bW])}}else{if(bU=="current"||bU=="applied"){b0=b3=="none"?bY.slice():b3=="applied"?b1.slice():bH.map(bY,function(b5,b4){return bH.inArray(b5,b1)===-1?b5:null})}else{if(bU=="index"||bU=="original"){for(bW=0,b2=bV.aoData.length;bW<b2;bW++){if(b3=="none"){b0.push(bW)}else{bX=bH.inArray(bW,b1);if((bX===-1&&b3=="removed")||(bX>=0&&b3=="applied")){b0.push(bW)}}}}}}}return b0};var H=function(bU,bT,bV){var bW=function(b3){var bZ=I(b3);var b1,bX;if(bZ!==null&&!bV){return[bZ]}var b2=aS(bU,bV);if(bZ!==null&&bH.inArray(bZ,b2)!==-1){return[bZ]}else{if(!b3){return b2}}if(typeof b3==="function"){return bH.map(b2,function(b4){var b5=bU.aoData[b4];return b3(b4,b5._aData,b5.nTr)?b4:null})}var bY=ag(w(bU.aoData,b2,"nTr"));if(b3.nodeName){if(bH.inArray(b3,bY)!==-1){return[b3._DT_RowIndex]}}if(typeof b3==="string"&&b3.charAt(0)==="#"){var b0=bU.aIds[b3.replace(/^#/,"")];if(b0!==c){return[b0.idx]}}return bH(bY).filter(b3).map(function(){return this._DT_RowIndex}).toArray()};return au("row",bT,bW,bU,bV)};bm("rows()",function(bT,bU){if(bT===c){bT=""}else{if(bH.isPlainObject(bT)){bU=bT;bT=""}}bU=bG(bU);var bV=this.iterator("table",function(bW){return H(bW,bT,bU)},1);bV.selector.rows=bT;bV.selector.opts=bU;return bV});bm("rows().nodes()",function(){return this.iterator("row",function(bT,bU){return bT.aoData[bU].nTr||c},1)});bm("rows().data()",function(){return this.iterator(true,"rows",function(bT,bU){return w(bT.aoData,bU,"_aData")},1)});aE("rows().cache()","row().cache()",function(bT){return this.iterator("row",function(bU,bW){var bV=bU.aoData[bW];return bT==="search"?bV._aFilterData:bV._aSortData},1)});aE("rows().invalidate()","row().invalidate()",function(bT){return this.iterator("row",function(bU,bV){E(bU,bV,bT)})});aE("rows().indexes()","row().index()",function(){return this.iterator("row",function(bT,bU){return bU},1)});aE("rows().ids()","row().id()",function(bZ){var bU=[];var bX=this.context;for(var bW=0,bT=bX.length;bW<bT;bW++){for(var bV=0,bY=this[bW].length;bV<bY;bV++){var b0=bX[bW].rowIdFn(bX[bW].aoData[this[bW][bV]]._aData);bU.push((bZ===true?"#":"")+b0)}}return new M(bX,bU)});aE("rows().remove()","row().remove()",function(){var bT=this;this.iterator("row",function(bX,b0,bW){var bZ=bX.aoData;var bY=bZ[b0];bZ.splice(b0,1);for(var bV=0,bU=bZ.length;bV<bU;bV++){if(bZ[bV].nTr!==null){bZ[bV].nTr._DT_RowIndex=bV}}a8(bX.aiDisplayMaster,b0);a8(bX.aiDisplay,b0);a8(bT[bW],b0,false);bn(bX);var b1=bX.rowIdFn(bY._aData);if(b1!==c){delete bX.aIds[b1]}});this.iterator("table",function(bW){for(var bV=0,bU=bW.aoData.length;bV<bU;bV++){bW.aoData[bV].idx=bV}});return this});bm("rows.add()",function(bV){var bU=this.iterator("table",function(bZ){var b0,bY,bW;var bX=[];for(bY=0,bW=bV.length;bY<bW;bY++){b0=bV[bY];if(b0.nodeName&&b0.nodeName.toUpperCase()==="TR"){bX.push(bS(bZ,b0)[0])}else{bX.push(aR(bZ,b0))}}return bX},1);var bT=this.rows(-1);bT.pop();bH.merge(bT,bU);return bT});bm("row()",function(bT,bU){return C(this.rows(bT,bU))});bm("row().data()",function(bU){var bT=this.context;if(bU===c){return bT.length&&this.length?bT[0].aoData[this[0]]._aData:c}bT[0].aoData[this[0]]._aData=bU;E(bT[0],this[0],"data");return this});bm("row().node()",function(){var bT=this.context;return bT.length&&this.length?bT[0].aoData[this[0]].nTr||null:null});bm("row.add()",function(bU){if(bU instanceof bH&&bU.length){bU=bU[0]}var bT=this.iterator("table",function(bV){if(bU.nodeName&&bU.nodeName.toUpperCase()==="TR"){return bS(bV,bU)[0]}return aR(bV,bU)});return this.row(bT[0])});var ac=function(bV,bY,bX,bT){var bW=[];var bU=function(b2,b0){if(bH.isArray(b2)||b2 instanceof bH){for(var b1=0,bZ=b2.length;b1<bZ;b1++){bU(b2[b1],b0)}return}if(b2.nodeName&&b2.nodeName.toLowerCase()==="tr"){bW.push(b2)}else{var b3=bH("<tr><td/></tr>").addClass(b0);bH("td",b3).addClass(b0).html(b2)[0].colSpan=aT(bV);bW.push(b3[0])}};bU(bX,bT);if(bY._details){bY._details.remove()}bY._details=bH(bW);if(bY._detailsShow){bY._details.insertAfter(bY.nTr)}};var D=function(bV,bT){var bU=bV.context;if(bU.length){var bW=bU[0].aoData[bT!==c?bT:bV[0]];if(bW&&bW._details){bW._details.remove();bW._detailsShow=c;bW._details=c}}};var bd=function(bV,bU){var bT=bV.context;if(bT.length&&bV.length){var bW=bT[0].aoData[bV[0]];if(bW._details){bW._detailsShow=bU;if(bU){bW._details.insertAfter(bW.nTr)}else{bW._details.detach()}bz(bT[0])}}};var bz=function(bY){var bX=new M(bY);var bW=".dt.DT_details";var bV="draw"+bW;var bT="column-visibility"+bW;var bU="destroy"+bW;var bZ=bY.aoData;bX.off(bV+" "+bT+" "+bU);if(ay(bZ,"_details").length>0){bX.on(bV,function(b1,b0){if(bY!==b0){return}bX.rows({page:"current"}).eq(0).each(function(b2){var b3=bZ[b2];if(b3._detailsShow){b3._details.insertAfter(b3.nTr)}})});bX.on(bT,function(b5,b2,b0,b4){if(bY!==b2){return}var b7,b6=aT(b2);for(var b3=0,b1=bZ.length;b3<b1;b3++){b7=bZ[b3];if(b7._details){b7._details.children("td[colspan]").attr("colspan",b6)}}});bX.on(bU,function(b3,b1){if(bY!==b1){return}for(var b2=0,b0=bZ.length;b2<b0;b2++){if(bZ[b2]._details){D(bX,b2)}}})}};var q="";var v=q+"row().child";var a1=v+"()";bm(a1,function(bV,bT){var bU=this.context;if(bV===c){return bU.length&&this.length?bU[0].aoData[this[0]]._details:c}else{if(bV===true){this.child.show()}else{if(bV===false){D(this)}else{if(bU.length&&this.length){ac(bU[0],bU[0].aoData[this[0]],bV,bT)}}}}return this});bm([v+".show()",a1+".show()"],function(bT){bd(this,true);return this});bm([v+".hide()",a1+".hide()"],function(){bd(this,false);return this});bm([v+".remove()",a1+".remove()"],function(){D(this);return this});bm(v+".isShown()",function(){var bT=this.context;if(bT.length&&this.length){return bT[0].aoData[this[0]]._detailsShow||false}return false});var bc=/^(.+):(name|visIdx|visible)$/;var a2=function(bY,bX,bW,bV,bZ){var bU=[];for(var b0=0,bT=bZ.length;b0<bT;b0++){bU.push(bw(bY,bZ[b0],bX))}return bU};var bE=function(bW,bT,bX){var bV=bW.aoColumns,bZ=ay(bV,"sName"),bU=ay(bV,"nTh");var bY=function(b4){var b1=I(b4);if(b4===""){return bi(bV.length)}if(b1!==null){return[b1>=0?b1:bV.length+b1]}if(typeof b4==="function"){var b5=aS(bW,bX);return bH.map(bV,function(b7,b6){return b4(b6,a2(bW,b6,0,0,b5),bU[b6])?b6:null})}var b2=typeof b4==="string"?b4.match(bc):"";if(b2){switch(b2[2]){case"visIdx":case"visible":var b0=parseInt(b2[1],10);if(b0<0){var b3=bH.map(bV,function(b6,b7){return b6.bVisible?b7:null});return[b3[b3.length+b0]]}return[u(bW,b0)];case"name":return bH.map(bZ,function(b6,b7){return b6===b2[1]?b7:null})}}else{return bH(bU).filter(b4).map(function(){return bH.inArray(this,bU)}).toArray()}};return au("column",bT,bY,bW,bX)};var P=function(bV,bW,bT,b0){var b2=bV.aoColumns,bU=b2[bW],bY=bV.aoData,b5,b4,bX,b3,b1;if(bT===c){return bU.bVisible}if(bU.bVisible===bT){return}if(bT){var bZ=bH.inArray(true,ay(b2,"bVisible"),bW+1);for(bX=0,b3=bY.length;bX<b3;bX++){b1=bY[bX].nTr;b4=bY[bX].anCells;if(b1){b1.insertBefore(b4[bW],b4[bZ]||null)}}}else{bH(ay(bV.aoData,"anCells",bW)).detach()}bU.bVisible=bT;a9(bV,bV.aoHeader);a9(bV,bV.aoFooter);if(b0===c||b0){aM(bV);if(bV.oScroll.sX||bV.oScroll.sY){o(bV)}}O(bV,null,"column-visibility",[bV,bW,bT]);bq(bV)};bm("columns()",function(bT,bU){if(bT===c){bT=""}else{if(bH.isPlainObject(bT)){bU=bT;bT=""}}bU=bG(bU);var bV=this.iterator("table",function(bW){return bE(bW,bT,bU)},1);bV.selector.cols=bT;bV.selector.opts=bU;return bV});aE("columns().header()","column().header()",function(bT,bU){return this.iterator("column",function(bW,bV){return bW.aoColumns[bV].nTh},1)});aE("columns().footer()","column().footer()",function(bT,bU){return this.iterator("column",function(bW,bV){return bW.aoColumns[bV].nTf},1)});aE("columns().data()","column().data()",function(){return this.iterator("column-rows",a2,1)});aE("columns().dataSrc()","column().dataSrc()",function(){return this.iterator("column",function(bU,bT){return bU.aoColumns[bT].mData},1)});aE("columns().cache()","column().cache()",function(bT){return this.iterator("column-rows",function(bX,bW,bV,bU,bY){return w(bX.aoData,bY,bT==="search"?"_aFilterData":"_aSortData",bW)},1)});aE("columns().nodes()","column().nodes()",function(){return this.iterator("column-rows",function(bW,bV,bU,bT,bX){return w(bW.aoData,bX,"anCells",bV)},1)});aE("columns().visible()","column().visible()",function(bU,bT){return this.iterator("column",function(bW,bV){if(bU===c){return bW.aoColumns[bV].bVisible}P(bW,bV,bU,bT)})});aE("columns().indexes()","column().index()",function(bT){return this.iterator("column",function(bV,bU){return bT==="visible"?bL(bV,bU):bU},1)});bm("columns.adjust()",function(){return this.iterator("table",function(bT){aM(bT)},1)});bm("column.index()",function(bV,bT){if(this.context.length!==0){var bU=this.context[0];if(bV==="fromVisible"||bV==="toData"){return u(bU,bT)}else{if(bV==="fromData"||bV==="toVisible"){return bL(bU,bT)}}}});bm("column()",function(bT,bU){return C(this.columns(bT,bU))});var bs=function(bX,bY,bT){var b1=bX.aoData;var b8=aS(bX,bT);var b6=ag(w(b1,b8,"anCells"));var b5=bH([].concat.apply([],b6));var b7;var bW=bX.aoColumns.length;var b2,b0,b3,bZ,bU,b4;var bV=function(b9){var ca=typeof b9==="function";if(b9===null||b9===c||ca){b2=[];for(b0=0,b3=b8.length;b0<b3;b0++){b7=b8[b0];for(bZ=0;bZ<bW;bZ++){bU={row:b7,column:bZ};if(ca){b4=b1[b7];if(b9(bU,bw(bX,b7,bZ),b4.anCells?b4.anCells[bZ]:null)){b2.push(bU)}}else{b2.push(bU)}}}return b2}if(bH.isPlainObject(b9)){return[b9]}return b5.filter(b9).map(function(cb,cc){if(cc.parentNode){b7=cc.parentNode._DT_RowIndex}else{for(cb=0,b3=b1.length;cb<b3;cb++){if(bH.inArray(cc,b1[cb].anCells)!==-1){b7=cb;break}}}return{row:b7,column:bH.inArray(cc,b1[b7].anCells)}}).toArray()};return au("cell",bY,bV,bX,bT)};bm("cells()",function(bW,bT,bU){if(bH.isPlainObject(bW)){if(bW.row===c){bU=bW;bW=null}else{bU=bT;bT=null}}if(bH.isPlainObject(bT)){bU=bT;bT=null}if(bT===null||bT===c){return this.iterator("table",function(b4){return bs(b4,bW,bG(bU))})}var bX=this.columns(bT,bU);var b3=this.rows(bW,bU);var b0,bZ,b1,bY,bV;var b2=this.iterator("table",function(b5,b4){b0=[];for(bZ=0,b1=b3[b4].length;bZ<b1;bZ++){for(bY=0,bV=bX[b4].length;bY<bV;bY++){b0.push({row:b3[b4][bZ],column:bX[b4][bY]})}}return b0},1);bH.extend(b2.selector,{cols:bT,rows:bW,opts:bU});return b2});aE("cells().nodes()","cell().node()",function(){return this.iterator("cell",function(bV,bW,bU){var bT=bV.aoData[bW].anCells;return bT?bT[bU]:c},1)});bm("cells().data()",function(){return this.iterator("cell",function(bU,bV,bT){return bw(bU,bV,bT)},1)});aE("cells().cache()","cell().cache()",function(bT){bT=bT==="search"?"_aFilterData":"_aSortData";return this.iterator("cell",function(bV,bW,bU){return bV.aoData[bW][bT][bU]},1)});aE("cells().render()","cell().render()",function(bT){return this.iterator("cell",function(bV,bW,bU){return bw(bV,bW,bU,bT)},1)});aE("cells().indexes()","cell().index()",function(){return this.iterator("cell",function(bU,bV,bT){return{row:bV,column:bT,columnVisible:bL(bU,bT)}},1)});aE("cells().invalidate()","cell().invalidate()",function(bT){return this.iterator("cell",function(bV,bW,bU){E(bV,bW,bT,bU)})});bm("cell()",function(bT,bV,bU){return C(this.cells(bT,bV,bU))});bm("cell().data()",function(bV){var bU=this.context;var bT=this[0];if(bV===c){return bU.length&&bT.length?bw(bU[0],bT[0].row,bT[0].column):c}bo(bU[0],bT[0].row,bT[0].column,bV);E(bU[0],bT[0].row,"data",bT[0].column);return this});bm("order()",function(bT,bV){var bU=this.context;if(bT===c){return bU.length!==0?bU[0].aaSorting:c}if(typeof bT==="number"){bT=[[bT,bV]]}else{if(!bH.isArray(bT[0])){bT=Array.prototype.slice.call(arguments)}}return this.iterator("table",function(bW){bW.aaSorting=bT.slice()})});bm("order.listener()",function(bU,bT,bV){return this.iterator("table",function(bW){F(bW,bU,bT,bV)})});bm(["columns().order()","column().order()"],function(bT){var bU=this;return this.iterator("table",function(bX,bW){var bV=[];bH.each(bU[bW],function(bZ,bY){bV.push([bY,bT])});bX.aaSorting=bV})});bm("search()",function(bU,bW,bX,bV){var bT=this.context;if(bU===c){return bT.length!==0?bT[0].oPreviousSearch.sSearch:c}return this.iterator("table",function(bY){if(!bY.oFeatures.bFilter){return}x(bY,bH.extend({},bY.oPreviousSearch,{sSearch:bU+"",bRegex:bW===null?false:bW,bSmart:bX===null?true:bX,bCaseInsensitive:bV===null?true:bV}),1)})});aE("columns().search()","column().search()",function(bT,bV,bW,bU){return this.iterator("column",function(bZ,bY){var bX=bZ.aoPreSearchCols;if(bT===c){return bX[bY].sSearch}if(!bZ.oFeatures.bFilter){return}bH.extend(bX[bY],{sSearch:bT+"",bRegex:bV===null?false:bV,bSmart:bW===null?true:bW,bCaseInsensitive:bU===null?true:bU});x(bZ,bZ.oPreviousSearch,1)})});bm("state()",function(){return this.context.length?this.context[0].oSavedState:null});bm("state.clear()",function(){return this.iterator("table",function(bT){bT.fnStateSaveCallback.call(bT.oInstance,bT,{})})});bm("state.loaded()",function(){return this.context.length?this.context[0].oLoadedState:null});bm("state.save()",function(){return this.iterator("table",function(bT){bq(bT)})});bm("state.saveExternalState()",function(){return this.iterator("table",function(bT){ah(bT)})});Q.versionCheck=Q.fnVersionCheck=function(bV){var bZ=Q.version.split(".");var bW=bV.split(".");var bU,bY;for(var bX=0,bT=bW.length;bX<bT;bX++){bU=parseInt(bZ[bX],10)||0;bY=parseInt(bW[bX],10)||0;if(bU===bY){continue}return bU>bY}return true};Q.isDataTable=Q.fnIsDataTable=function(bV){var bT=bH(bV).get(0);var bU=false;bH.each(Q.settings,function(bY,bZ){var bX=bZ.nScrollHead?bH("table",bZ.nScrollHead)[0]:null;var bW=bZ.nScrollFoot?bH("table",bZ.nScrollFoot)[0]:null;if(bZ.nTable===bT||bX===bT||bW===bT){bU=true}});return bU};Q.tables=Q.fnTables=function(bV){var bU=false;if(bH.isPlainObject(bV)){bU=bV.api;bV=bV.visible}var bT=bH.map(Q.settings,function(bW){if(!bV||(bV&&bH(bW.nTable).is(":visible"))){return bW.nTable}});return bU?new M(bT):bT};Q.util={throttle:ap,escapeRegex:p};Q.camelToHungarian=ad;bm("$()",function(bT,bV){var bW=this.rows(bV).nodes(),bU=bH(bW);return bH([].concat(bU.filter(bT).toArray(),bU.find(bT).toArray()))});bH.each(["on","one","off"],function(bU,bT){bm(bT+"()",function(){var bV=Array.prototype.slice.call(arguments);if(!bV[0].match(/\.dt\b/)){bV[0]+=".dt"}var bW=bH(this.tables().nodes());bW[bT].apply(bW,bV);return this})});bm("clear()",function(){return this.iterator("table",function(bT){bk(bT)})});bm("settings()",function(){return new M(this.context,this.context)});bm("init()",function(){var bT=this.context;return bT.length?bT[0].oInit:null});bm("data()",function(){return this.iterator("table",function(bT){return ay(bT.aoData,"_aData")}).flatten()});bm("destroy()",function(bT){bT=bT||false;return this.iterator("table",function(bU){var b4=bU.nTableWrapper.parentNode;var bV=bU.oClasses;var b6=bU.nTable;var bZ=bU.nTBody;var b1=bU.nTHead;var b2=bU.nTFoot;var b7=bH(b6);var bY=bH(bZ);var b0=bH(bU.nTableWrapper);var b8=bH.map(bU.aoData,function(b9){return b9.nTr});var bX,b5;bU.bDestroying=true;O(bU,"aoDestroyCallback","destroy",[bU]);if(!bT){new M(bU).columns().visible(true)}b0.unbind(".DT").find(":not(tbody *)").unbind(".DT");bH(b).unbind(".DT-"+bU.sInstance);if(b6!=b1.parentNode){b7.children("thead").detach();b7.append(b1)}if(b2&&b6!=b2.parentNode){b7.children("tfoot").detach();b7.append(b2)}bU.aaSorting=[];bU.aaSortingFixed=[];ai(bU);bH(b8).removeClass(bU.asStripeClasses.join(" "));bH("th, td",b1).removeClass(bV.sSortable+" "+bV.sSortableAsc+" "+bV.sSortableDesc+" "+bV.sSortableNone);if(bU.bJUI){bH("th span."+bV.sSortIcon+", td span."+bV.sSortIcon,b1).detach();bH("th, td",b1).each(function(){var b9=bH("div."+bV.sSortJUIWrapper,this);bH(this).append(b9.contents());b9.detach()})}bY.children().detach();bY.append(b8);var bW=bT?"remove":"detach";b7[bW]();b0[bW]();if(!bT&&b4){b4.insertBefore(b6,bU.nTableReinsertBefore);b7.css("width",bU.sDestroyWidth).removeClass(bV.sTable);b5=bU.asDestroyStripes.length;if(b5){bY.children().each(function(b9){bH(this).addClass(bU.asDestroyStripes[b9%b5])})}}var b3=bH.inArray(bU,Q.settings);if(b3!==-1){Q.settings.splice(b3,1)}})});bH.each(["column","row","cell"],function(bT,bU){bm(bU+"s().every()",function(bV){return this.iterator(bU,function(b0,bZ,bY,bX,bW){bV.call(new M(b0)[bU](bZ,bU==="cell"?bY:c),bZ,bY,bX,bW)})})});bm("i18n()",function(bW,bX,bV){var bU=this.context[0];var bT=at(bW)(bU.oLanguage);if(bT===c){bT=bX}if(bV!==c&&bH.isPlainObject(bT)){bT=bT[bV]!==c?bT[bV]:bT._}return bT.replace("%d",bV)});Q.version="1.10.9";Q.settings=[];Q.models={};Q.models.oSearch={bCaseInsensitive:true,sSearch:"",bRegex:false,bSmart:true};Q.models.oRow={nTr:null,anCells:null,_aData:[],_aSortData:null,_aFilterData:null,_sFilterRow:null,_sRowStripe:"",src:null,idx:-1};Q.models.oColumn={idx:null,aDataSort:null,asSorting:null,bSearchable:null,bSortable:null,bVisible:null,_sManualType:null,_bAttrSrc:false,fnCreatedCell:null,fnGetData:null,fnSetData:null,mData:null,mRender:null,nTh:null,nTf:null,sClass:null,sContentPadding:null,sDefaultContent:null,sName:null,sSortDataType:"std",sSortingClass:null,sSortingClassJUI:null,sTitle:null,sType:null,sWidth:null,sWidthOrig:null};Q.defaults={aaData:null,aaSorting:[[0,"asc"]],aaSortingFixed:[],ajax:null,aLengthMenu:[10,25,50,100],aoColumns:null,aoColumnDefs:null,aoSearchCols:[],asStripeClasses:null,bAutoWidth:true,bDeferRender:false,bDestroy:false,bFilter:true,bInfo:true,bJQueryUI:false,bLengthChange:true,bPaginate:true,bProcessing:false,bRetrieve:false,bScrollCollapse:false,bServerSide:false,bSort:true,bSortMulti:true,bSortCellsTop:false,bSortClasses:true,bStateSave:false,fnCreatedRow:null,fnDrawCallback:null,fnFooterCallback:null,fnFormatNumber:function(bT){return bT.toString().replace(/\B(?=(\d{3})+(?!\d))/g,this.oLanguage.sThousands)},fnHeaderCallback:null,fnInfoCallback:null,fnInitComplete:null,fnPreDrawCallback:null,fnRowCallback:null,fnServerData:null,fnServerParams:null,fnStateLoadCallback:function(bT){try{return JSON.parse((bT.iStateDuration===-1?sessionStorage:localStorage).getItem("DataTables_"+bT.sInstance+"_"+location.pathname))}catch(bU){}},fnStateLoadParams:null,fnStateLoaded:null,fnStateSaveCallback:function(bT,bU){try{(bT.iStateDuration===-1?sessionStorage:localStorage).setItem("DataTables_"+bT.sInstance+"_"+location.pathname,JSON.stringify(bU))}catch(bV){}},fnStateSaveParams:null,iStateDuration:7200,iDeferLoading:null,iDisplayLength:10,iDisplayStart:0,iTabIndex:0,oClasses:{},oLanguage:{oAria:{sSortAscending:": activate to sort column ascending",sSortDescending:": activate to sort column descending"},oPaginate:{sFirst:"First",sLast:"Last",sNext:"Next",sPrevious:"Previous"},sEmptyTable:"No data available in table",sInfo:"Showing _START_ to _END_ of _TOTAL_ entries",sInfoEmpty:"Showing 0 to 0 of 0 entries",sInfoFiltered:"(filtered from _MAX_ total entries)",sInfoPostFix:"",sDecimal:"",sThousands:",",sLengthMenu:"Show _MENU_ entries",sLoadingRecords:"Loading...",sProcessing:"Processing...",sSearch:"Search:",sSearchPlaceholder:"",sUrl:"",sZeroRecords:"No matching records found"},oSearch:bH.extend({},Q.models.oSearch),sAjaxDataProp:"data",sAjaxSource:null,sDom:"lfrtip",searchDelay:null,sPaginationType:"simple_numbers",sScrollX:"",sScrollXInner:"",sScrollY:"",sServerMethod:"GET",renderer:null,rowId:"DT_RowId"};W(Q.defaults);Q.defaults.column={aDataSort:null,iDataSort:-1,asSorting:["asc","desc"],bSearchable:true,bSortable:true,bVisible:true,fnCreatedCell:null,mData:null,mRender:null,sCellType:"td",sClass:"",sContentPadding:"",sDefaultContent:null,sName:"",sSortDataType:"std",sTitle:null,sType:null,sWidth:null};W(Q.defaults.column);Q.models.oSettings={oFeatures:{bAutoWidth:null,bDeferRender:null,bFilter:null,bInfo:null,bLengthChange:null,bPaginate:null,bProcessing:null,bServerSide:null,bSort:null,bSortMulti:null,bSortClasses:null,bStateSave:null},oScroll:{bCollapse:null,iBarWidth:0,sX:null,sXInner:null,sY:null},oLanguage:{fnInfoCallback:null},oBrowser:{bScrollOversize:false,bScrollbarLeft:false,bBounding:false,barWidth:0},ajax:null,aanFeatures:[],aoData:[],aiDisplay:[],aiDisplayMaster:[],aIds:{},aoColumns:[],aoHeader:[],aoFooter:[],oPreviousSearch:{},aoPreSearchCols:[],aaSorting:null,aaSortingFixed:[],asStripeClasses:null,asDestroyStripes:[],sDestroyWidth:0,aoRowCallback:[],aoHeaderCallback:[],aoFooterCallback:[],aoDrawCallback:[],aoRowCreatedCallback:[],aoPreDrawCallback:[],aoInitComplete:[],aoStateSaveParams:[],aoStateLoadParams:[],aoStateLoaded:[],sTableId:"",nTable:null,nTHead:null,nTFoot:null,nTBody:null,nTableWrapper:null,bDeferLoading:false,bInitialised:false,aoOpenRows:[],sDom:null,searchDelay:null,sPaginationType:"two_button",iStateDuration:0,aoStateSave:[],aoStateLoad:[],oSavedState:null,oLoadedState:null,sAjaxSource:null,sAjaxDataProp:null,bAjaxDataGet:true,jqXHR:null,json:c,oAjaxData:c,fnServerData:null,aoServerParams:[],sServerMethod:null,fnFormatNumber:null,aLengthMenu:null,iDraw:0,bDrawing:false,iDrawError:-1,_iDisplayLength:10,_iDisplayStart:0,_iRecordsTotal:0,_iRecordsDisplay:0,bJUI:null,oClasses:{},bFiltered:false,bSorted:false,bSortCellsTop:null,oInit:null,aoDestroyCallback:[],fnRecordsTotal:function(){return B(this)=="ssp"?this._iRecordsTotal*1:this.aiDisplayMaster.length},fnRecordsDisplay:function(){return B(this)=="ssp"?this._iRecordsDisplay*1:this.aiDisplay.length},fnDisplayEnd:function(){var bT=this._iDisplayLength,bY=this._iDisplayStart,bV=bY+bT,bU=this.aiDisplay.length,bW=this.oFeatures,bX=bW.bPaginate;if(bW.bServerSide){return bX===false||bT===-1?bY+bU:Math.min(bY+bT,this._iRecordsDisplay)}else{return !bX||bV>bU||bT===-1?bU:bV}},oInstance:null,sInstance:null,iTabIndex:0,nScrollHead:null,nScrollFoot:null,aLastSort:[],oPlugins:{},rowIdFn:null,rowId:null};Q.ext=L={buttons:{},classes:{},errMode:"alert",feature:[],search:[],selector:{cell:[],column:[],row:[]},internal:{},legacy:{ajax:null},pager:{},renderer:{pageButton:{},header:{}},order:{},type:{detect:[],search:{},order:{}},_unique:0,fnVersionCheck:Q.fnVersionCheck,iApiIndex:0,oJUIClasses:{},sVersion:Q.version};bH.extend(L,{afnFiltering:L.search,aTypes:L.type.detect,ofnSearch:L.type.search,oSort:L.type.order,afnSortData:L.order,aoFeatures:L.feature,oApi:L.internal,oStdClasses:L.classes,oPagination:L.pager});bH.extend(Q.ext.classes,{sTable:"dataTable",sNoFooter:"no-footer",sPageButton:"paginate_button",sPageButtonActive:"current",sPageButtonDisabled:"disabled",sStripeOdd:"odd",sStripeEven:"even",sRowEmpty:"dataTables_empty",sWrapper:"dataTables_wrapper",sFilter:"dataTables_filter",sInfo:"dataTables_info",sPaging:"dataTables_paginate paging_",sLength:"dataTables_length",sProcessing:"dataTables_processing",sSortAsc:"sorting_asc",sSortDesc:"sorting_desc",sSortable:"sorting",sSortableAsc:"sorting_asc_disabled",sSortableDesc:"sorting_desc_disabled",sSortableNone:"sorting_disabled",sSortColumn:"sorting_",sFilterInput:"",sLengthSelect:"",sScrollWrapper:"dataTables_scroll",sScrollHead:"dataTables_scrollHead",sScrollHeadInner:"dataTables_scrollHeadInner",sScrollBody:"dataTables_scrollBody",sScrollFoot:"dataTables_scrollFoot",sScrollFootInner:"dataTables_scrollFootInner",sHeaderTH:"",sFooterTH:"",sSortJUIAsc:"",sSortJUIDesc:"",sSortJUI:"",sSortJUIAscAllowed:"",sSortJUIDescAllowed:"",sSortJUIWrapper:"",sSortIcon:"",sJUIHeader:"",sJUIFooter:""});(function(){var bU="";bU="";var bV=bU+"ui-state-default";var bW=bU+"css_right ui-icon ui-icon-";var bT=bU+"fg-toolbar ui-toolbar ui-widget-header ui-helper-clearfix";bH.extend(Q.ext.oJUIClasses,Q.ext.classes,{sPageButton:"fg-button ui-button "+bV,sPageButtonActive:"ui-state-disabled",sPageButtonDisabled:"ui-state-disabled",sPaging:"dataTables_paginate fg-buttonset ui-buttonset fg-buttonset-multi ui-buttonset-multi paging_",sSortAsc:bV+" sorting_asc",sSortDesc:bV+" sorting_desc",sSortable:bV+" sorting",sSortableAsc:bV+" sorting_asc_disabled",sSortableDesc:bV+" sorting_desc_disabled",sSortableNone:bV+" sorting_disabled",sSortJUIAsc:bW+"triangle-1-n",sSortJUIDesc:bW+"triangle-1-s",sSortJUI:bW+"carat-2-n-s",sSortJUIAscAllowed:bW+"carat-1-n",sSortJUIDescAllowed:bW+"carat-1-s",sSortJUIWrapper:"DataTables_sort_wrapper",sSortIcon:"DataTables_sort_icon",sScrollHead:"dataTables_scrollHead "+bV,sScrollFoot:"dataTables_scrollFoot "+bV,sHeaderTH:bV,sFooterTH:bV,sJUIHeader:bT+" ui-corner-tl ui-corner-tr",sJUIFooter:bT+" ui-corner-bl ui-corner-br"})}());var bK=Q.ext.pager;function bp(bY,bT){var bU=[],bW=bK.numbers_length,bX=Math.floor(bW/2),bV=1;if(bT<=bW){bU=bi(0,bT)}else{if(bY<=bX){bU=bi(0,bW-2);bU.push("ellipsis");bU.push(bT-1)}else{if(bY>=bT-1-bX){bU=bi(bT-(bW-2),bT);bU.splice(0,0,"ellipsis");bU.splice(0,0,0)}else{bU=bi(bY-bX+2,bY+bX-1);bU.push("ellipsis");bU.push(bT-1);bU.splice(0,0,"ellipsis");bU.splice(0,0,0)}}}bU.DT_el="span";return bU}bH.extend(bK,{simple:function(bU,bT){return["previous","next"]},full:function(bU,bT){return["first","previous","next","last"]},numbers:function(bU,bT){return[bp(bU,bT)]},simple_numbers:function(bU,bT){return["previous",bp(bU,bT),"next"]},full_numbers:function(bU,bT){return["first","previous",bp(bU,bT),"next","last"]},_numbers:bp,numbers_length:7});bH.extend(true,Q.ext.renderer,{pageButton:{_:function(bZ,b6,b5,b4,b3,bX){var b0=bZ.oClasses;var bW=bZ.oLanguage.oPaginate;var bV,bU,bT=0;var b1=function(b8,cd){var cb,b7,cc,ca;var ce=function(cf){aJ(bZ,cf.data.action,true)};for(cb=0,b7=cd.length;cb<b7;cb++){ca=cd[cb];if(bH.isArray(ca)){var b9=bH("<"+(ca.DT_el||"div")+"/>").appendTo(b8);b1(b9,ca)}else{bV=null;bU="";switch(ca){case"ellipsis":b8.append('<span class="ellipsis">&#x2026;</span>');break;case"first":bV=bW.sFirst;bU=ca+(b3>0?"":" "+b0.sPageButtonDisabled);break;case"previous":bV=bW.sPrevious;bU=ca+(b3>0?"":" "+b0.sPageButtonDisabled);break;case"next":bV=bW.sNext;bU=ca+(b3<bX-1?"":" "+b0.sPageButtonDisabled);break;case"last":bV=bW.sLast;bU=ca+(b3<bX-1?"":" "+b0.sPageButtonDisabled);break;default:bV=ca+1;bU=b3===ca?b0.sPageButtonActive:"";break}if(bV!==null){cc=bH("<a>",{"class":b0.sPageButton+" "+bU,"aria-controls":bZ.sTableId,"data-dt-idx":bT,tabindex:bZ.iTabIndex,id:b5===0&&typeof ca==="string"?bZ.sTableId+"_"+ca:null}).html(bV).appendTo(b8);be(cc,{action:ca},ce);bT++}}}};var bY;try{bY=bH(b6).find(a.activeElement).data("dt-idx")}catch(b2){}b1(bH(b6).empty(),b4);if(bY){bH(b6).find("[data-dt-idx="+bY+"]").focus()}}}});bH.extend(Q.ext.type.detect,[function(bV,bU){var bT=bU.oLanguage.sDecimal;return an(bV,bT)?"num"+bT:null},function(bV,bU){if(bV&&!(bV instanceof Date)&&(!aq.test(bV)||!bx.test(bV))){return null}var bT=Date.parse(bV);return(bT!==null&&!isNaN(bT))||bD(bV)?"date":null},function(bV,bU){var bT=bU.oLanguage.sDecimal;return an(bV,bT,true)?"num-fmt"+bT:null},function(bV,bU){var bT=bU.oLanguage.sDecimal;return m(bV,bT)?"html-num"+bT:null},function(bV,bU){var bT=bU.oLanguage.sDecimal;return m(bV,bT,true)?"html-num-fmt"+bT:null},function(bU,bT){return bD(bU)||(typeof bU==="string"&&bU.indexOf("<")!==-1)?"html":null}]);bH.extend(Q.ext.type.search,{html:function(bT){return bD(bT)?bT:typeof bT==="string"?bT.replace(Z," ").replace(aX,""):""},string:function(bT){return bD(bT)?bT:typeof bT==="string"?bT.replace(Z," "):bT}});var T=function(bW,bT,bV,bU){if(bW!==0&&(!bW||bW==="-")){return -Infinity}if(bT){bW=bF(bW,bT)}if(bW.replace){if(bV){bW=bW.replace(bV,"")}if(bU){bW=bW.replace(bU,"")}}return bW*1};function bt(bT){bH.each({num:function(bU){return T(bU,bT)},"num-fmt":function(bU){return T(bU,bT,bI)},"html-num":function(bU){return T(bU,bT,aX)},"html-num-fmt":function(bU){return T(bU,bT,aX,bI)}},function(bU,bV){L.type.order[bU+bT+"-pre"]=bV;if(bU.match(/^html\-/)){L.type.search[bU+bT]=L.type.search.html}})}bH.extend(L.type.order,{"date-pre":function(bT){return Date.parse(bT)||0},"html-pre":function(bT){return bD(bT)?"":bT.replace?bT.replace(/<.*?>/g,"").toLowerCase():bT+""},"string-pre":function(bT){return bD(bT)?"":typeof bT==="string"?bT.toLowerCase():!bT.toString?"":bT.toString()},"string-asc":function(bT,bU){return((bT<bU)?-1:((bT>bU)?1:0))},"string-desc":function(bT,bU){return((bT<bU)?1:((bT>bU)?-1:0))}});bt("");bH.extend(true,Q.ext.renderer,{header:{_:function(bW,bT,bV,bU){bH(bW.nTable).on("order.dt.DT",function(b0,bX,bZ,bY){if(bW!==bX){return}var b1=bV.idx;bT.removeClass(bV.sSortingClass+" "+bU.sSortAsc+" "+bU.sSortDesc).addClass(bY[b1]=="asc"?bU.sSortAsc:bY[b1]=="desc"?bU.sSortDesc:bV.sSortingClass)})},jqueryui:function(bW,bT,bV,bU){bH("<div/>").addClass(bU.sSortJUIWrapper).append(bT.contents()).append(bH("<span/>").addClass(bU.sSortIcon+" "+bV.sSortingClassJUI)).appendTo(bT);bH(bW.nTable).on("order.dt.DT",function(b0,bX,bZ,bY){if(bW!==bX){return}var b1=bV.idx;bT.removeClass(bU.sSortAsc+" "+bU.sSortDesc).addClass(bY[b1]=="asc"?bU.sSortAsc:bY[b1]=="desc"?bU.sSortDesc:bV.sSortingClass);bT.find("span."+bU.sSortIcon).removeClass(bU.sSortJUIAsc+" "+bU.sSortJUIDesc+" "+bU.sSortJUI+" "+bU.sSortJUIAscAllowed+" "+bU.sSortJUIDescAllowed).addClass(bY[b1]=="asc"?bU.sSortJUIAsc:bY[b1]=="desc"?bU.sSortJUIDesc:bV.sSortingClassJUI)})}}});Q.render={number:function(bV,bU,bT,bW,bX){return{display:function(b1){if(typeof b1!=="number"&&typeof b1!=="string"){return b1}var bZ=b1<0?"-":"";b1=Math.abs(parseFloat(b1));var b0=parseInt(b1,10);var bY=bT?bU+(b1-b0).toFixed(bT).substring(2):"";return bZ+(bW||"")+b0.toString().replace(/\B(?=(\d{3})+(?!\d))/g,bV)+bY+(bX||"")}}}};function al(bT){return function(){var bU=[ar(this[Q.ext.iApiIndex])].concat(Array.prototype.slice.call(arguments));return Q.ext.internal[bT].apply(this,bU)}}bH.extend(Q.ext.internal,{_fnExternApiFunc:al,_fnBuildAjax:az,_fnAjaxUpdate:aj,_fnAjaxParameters:bN,_fnAjaxUpdateDraw:Y,_fnAjaxDataSrc:bv,_fnAddColumn:R,_fnColumnOptions:a5,_fnAdjustColumnSizing:aM,_fnVisibleToColumnIndex:u,_fnColumnIndexToVisible:bL,_fnVisbleColumns:aT,_fnGetColumns:s,_fnColumnTypes:y,_fnApplyColumnDefs:n,_fnHungarianMap:W,_fnCamelToHungarian:ad,_fnLanguageCompat:aV,_fnBrowserDetect:bg,_fnAddData:aR,_fnAddTr:bS,_fnNodeToDataIndex:bu,_fnNodeToColumnIndex:a3,_fnGetCellData:bw,_fnSetCellData:bo,_fnSplitObjNotation:ao,_fnGetObjectDataFn:at,_fnSetObjectDataFn:aB,_fnGetDataMaster:bJ,_fnClearTable:bk,_fnDeleteIndex:a8,_fnInvalidate:E,_fnGetRowElements:bh,_fnCreateTr:S,_fnBuildHead:aO,_fnDrawHead:a9,_fnDraw:a6,_fnReDraw:am,_fnAddOptionsHtml:j,_fnDetectHeader:aA,_fnGetUniqueThs:bj,_fnFeatureHtmlFilter:t,_fnFilterComplete:x,_fnFilterCustom:aw,_fnFilterColumn:ab,_fnFilter:aC,_fnFilterCreateSearch:aZ,_fnEscapeRegex:p,_fnFilterData:aH,_fnFeatureHtmlInfo:g,_fnUpdateInfo:ax,_fnInfoMacros:br,_fnInitialise:h,_fnInitComplete:aF,_fnLengthChange:aW,_fnFeatureHtmlLength:aU,_fnFeatureHtmlPaginate:aD,_fnPageChange:aJ,_fnFeatureHtmlProcessing:bC,_fnProcessingDisplay:z,_fnFeatureHtmlTable:bB,_fnScrollDraw:o,_fnApplyToChildren:bb,_fnCalculateColumnWidths:by,_fnThrottle:ap,_fnConvertToWidth:ak,_fnGetWidestNode:aN,_fnGetMaxLenString:ae,_fnStringToCss:bM,_fnSortFlatten:aL,_fnSort:A,_fnSortAria:bf,_fnSortListener:bl,_fnSortAttachListener:F,_fnSortingClasses:ai,_fnSortData:J,_fnSaveState:bq,_fnLoadState:bQ,_fnSettingsFromNode:ar,_fnLog:aQ,_fnMap:U,_fnBindAction:be,_fnCallbackReg:bP,_fnCallbackFire:O,_fnLengthOverflow:bn,_fnRenderer:V,_fnDataSource:B,_fnRowAttributes:af,_fnCalculateEnd:function(){}});bH.fn.dataTable=Q;bH.fn.dataTableSettings=Q.settings;bH.fn.dataTableExt=Q.ext;bH.fn.DataTable=function(bT){return bH(this).dataTable(bT).api()};bH.each(Q,function(bU,bT){bH.fn.DataTable[bU]=bT});return bH.fn.dataTable}))}(window,document));$.extend($.fn.dataTable.ext,{fnFormatDate:function(c,b,a,h){if(c==""){return c}var g=/\w{3}\s\d{2},\s\d{4}(($)|(\s\d{2}:\d{2}:\d{2}))/.test(c);if(!g){return"*"+c+"*"}try{var f=dateFormat(c,h.settings.aoColumns[h.col].dateFormat);return f}catch(d){return"*"+c+"*"}},fnLoadFromExternalState:function(f,c){var e,a;var d=f.aoColumns;if(c.fnLoadExternalState==undefined||typeof c.fnLoadExternalState!="function"){return}var g=c.fnLoadExternalState.call();if(!g||!g.time){return}g.columns=$.map(f.aoColumns,function(h,j){return{visible:h.bVisible,search:{search:f.aoPreSearchCols[j].sSearch,smart:f.aoPreSearchCols[j].bSmart,regex:f.aoPreSearchCols[j].bRegex,caseInsensitive:f.aoPreSearchCols[j].bCaseInsensitive}}});f.oLoadedState=$.extend(true,{},g);if(g.start!==undefined){f._iDisplayStart=g.start;f.iInitDisplayStart=g.start}if(g.length!==undefined){f._iDisplayLength=g.length}if(g.order!==undefined){f.aaSorting=[];$.each(g.order,function(j,h){f.aaSorting.push(h[0]>=d.length?[0,h[1]]:h)})}if(g.search!==undefined){$.extend(f.oPreviousSearch,{sSearch:g.search.search,bSmart:g.search.smart,bRegex:g.search.regex,bCaseInsensitive:g.search.caseInsensitive})}for(e=0,a=g.columns.length;e<a;e++){var b=g.columns[e];if(b.visible!==undefined){d[e].bVisible=b.visible}if(b.search!==undefined){$.extend(f.aoPreSearchCols[e],{sSearch:b.search.search,bSmart:b.search.smart,bRegex:b.search.regex,bCaseInsensitive:b.search.caseInsensitive})}}}});if(!window.console){console={};console.log=function(a){}}var MPage=MPage||{};MPage.namespace=MPage.namespace||function(b){var c=b.split(".");for(var a=0;a<c.length;a++){if(a==0){window[c[0]]=window[c[0]]||{}}else{if(a==1){window[c[0]][c[1]]=window[c[0]][c[1]]||{}}else{if(a==2){window[c[0]][c[1]][c[2]]=window[c[0]][c[1]][c[2]]||{}}else{alert("Long namespace: "+c.length)}}}}};var nswsbb=nswsbb||{};if(location.protocol.match(/^http/)){nswsbb.mobileMPage=true}else{nswsbb.mobileMPage=false}nswsbb.getMPageMobileUrl=function(){if(location.protocol.match(/^http/)){var b=/^(http:\/\/[^\/]+\/[^\/]+\/[^\/]+.nsw.gov.au)/;var a=b.exec(location.href);if(a!=null&&a.length>0){return a[0]}return[location.protocol,"",location.host,"mp_mobile"].join("/")}return null};nswsbb.getDiscernReportUrl=function(){var a=nswsbb.getMPageMobileUrl();if(a!=null){return[a,"mpages/reports/"].join("/")}return null};nswsbb.createHttpRequest=function(){try{return new XMLHttpRequest()}catch(a){try{return ActiveXObject("Msxml2.XMLHTTP")}catch(a){return new ActiveXObject("Microsoft.XMLHTTP")}}};nswsbb.loadCCL=function(b,a,m,j){var f=this;var c=null;var g=null;var e=null;var d="";var h;var g=nswsbb.getDiscernReportUrl();var c=g?nswsbb.createHttpRequest():new XMLCclRequest();c.onreadystatechange=function(){if(this.readyState==4&&this.status==200){try{if(typeof(f.debug)!="undefined"&&f.debug!==null&&f.debug){window.open().document.write(this.responseText)}switch(j){case"XML":if(window.ActiveXObject){xmlDoc=new ActiveXObject("Microsoft.XMLDOM");xmlDoc.async="false";xmlDoc.loadXML(this.responseText)}else{if(document.implementation&&document.implementation.createDocument){parser=new DOMParser();xmlDoc=parser.parseFromString(this.responseText,"text/xml")}}m.call(f,xmlDoc);break;case"TEXT":m.call(f,this.responseText);break;case"JSON":default:m.call(f,JSON.parse(this.responseText));break}}catch(n){}}};for(h=a.length;h--;){if(typeof a[h]=="string"){if(!/^'.*'$/.test(a[h])&&!/^".*"$/.test(a[h])&&!/^\^.*\^$/.test(a[h])){a[h]="^"+a[h]+"^"}}else{if(typeof a[h]=="number"){if(!/\.0$/.test(a[h])){a[h]=a[h]+".0"}}}}if(g){g=[g,b,"?parameters=",encodeURIComponent(a.join(","))].join("");c.open("GET",g,true);c.send(null)}else{c.open("GET",b,true);c.send(a.join(","))}};nswsbb.isWorkflowMPage=function(){if(typeof m_bedrockMpage.MPAGE[0].SETTINGS!="undefined"){if(typeof m_bedrockMpage.MPAGE[0].SETTINGS.BR_SET.VT_MN!="undefined"){if(m_bedrockMpage.MPAGE[0].SETTINGS.BR_SET.VT_MN=="WF_STD"){return true}else{return false}}else{return false}}else{return false}};nswsbb.ptEventViewerLink=function(d,c,a){var b=[];var e=[d,"0.0",c,'"EVENT"',"0.0"];b.push("<a onclick='MP_Util.LaunchClinNoteViewer(",e.join(","),"); return false;' href='#'>",a,"</a>");return b.join("")};nswsbb.FormatCCLPara=function(a){if(typeof a=="undefined"||a==null){return 0}return a};nswsbb.GetLookBackUnitType=function(a){var b="days";switch(a){case 1:b="hours";break;case 2:break;case 3:b="weeks";break;case 4:b="months";break;case 5:b="years";break;default:break}return b};nswsbb.GetBasePathOfScript=function(b){var a="";$("script").each(function(){var c=$(this).attr("src");var d=new RegExp(b);if(d.test(c)){a=c.substr(0,c.lastIndexOf("/")+1);return false}});return a};nswsbb.appendHead=function(f){var e=0;var d,h;var g=f.js;var a=f.css;var c=document.getElementsByTagName("head")[0];for(var b in a){h=document.createElement("link");h.type="text/css";h.rel="stylesheet";h.href=a[b];c.appendChild(h)}for(var b in g){d=document.createElement("script");d.type="text/javascript";d.src=g[b];c.appendChild(d)}};nswsbb.i18n=nswsbb.i18n||{};nswsbb.i18n.discernabu=nswsbb.i18n.discernabu||{};if(typeof nswsbb.i18n.discernabu.patinfo_o1=="undefined"){nswsbb.i18n.discernabu.patinfo_o1={NO_RESULTS_FOUND:"No results found",RFV:"Reason For Visit",ROOM_BED:"Room/Bed",ADMIT_DIAG:"Admitting Diagnosis",ADMIT_DATE:"Admit Date",PRIM_PHYS:"Primary Physician",ATTEND_PHYS:"Attending Physician",REFER_PHYS:"Referring Physician",EMER_CONTACT:"Emergency Contact",EMER_NUMBER:"Emergency #",CODE_STATUS:"Code Status",LAST_VISIT:"Last Visit",LAST:"Last",VISIT:"Visit",CONTACTS:"Contacts",ADMIT_PHYS:"Admitting Physician",TARGETED_DISCHARGE_DATE:"Targeted Discharge Date",SERVICE:"Specialty",MODE_OF_ARRVAL:"Mode of Arrival",ADVANCE_DIRECTIVE:"Advance Directive",DETAILS:"Details",CHIEF_COMPLAINT:"Chief Complaint",DIET_ACTIVITY:"Diet and Activity",SERVICE_CAT:"Care Type",RESP_PERSON:"Responsible Person Contact",RESP_NAME:"Responsible Person",RESP_PHONE:"Phone Number"}}if(typeof nswsbb.i18n.discernabu.orders_o1=="undefined"){nswsbb.i18n.discernabu.orders_o1={STATUS:"Status",ORDERED:"Ordered",ORDER_NAME:"Order",ORDER_DETAILS:"Order Details",ORDER_DATE:"Order Date/Time",START_DT_TM:"Start Date/Time",ORDER_STATUS:"Status",ORDER_PHYS:"Ordered by",ORDER_COMMENTS:"Order Comments"}}nswsbb.GetDocDict=function(e,d){var g={};var f;for(var c=0;c<e.length;c++){var b=e[c][d];if(!(b in g)){f=[]}var a=e[c];f.push(a);g[b]=f}return g};nswsbb.debugObject=[];nswsbb.cclajax=function(d,f,e,a,p,j,o,n){var q=null;var h=null;var m;var c={};if(j){var b=j.getComponentUid();c.COMPONENT_ID=b;c.COMPONENT_NAME=j.name}c.TIME=new Date().toLocaleString();c.CCL_NAME=d;var h=nswsbb.getDiscernReportUrl();var q=h?nswsbb.createHttpRequest():new XMLCclRequest();for(m=a.length;m--;){if(typeof a[m]=="string"){if(a[m].substring(0,6).toUpperCase()=="VALUE("){console.log("VALUE( param found: "+a[m])}else{if(!/^'.*'$/.test(a[m])&&!/^".*"$/.test(a[m])&&!/^\^.*\^$/.test(a[m])){a[m]="^"+a[m]+"^"}}}else{if(typeof a[m]=="number"){if(!/\.0$/.test(a[m])){a[m]=a[m]+".0"}}}}if(a instanceof Array){a=a.join()}if(a!=""){a="'MINE',"+a}else{a="'MINE'"}c.CCL_PARAMETERS=a;console.log(d+" "+a);q.onreadystatechange=function(){if(q.readyState==4&&q.status==200){var r=null;switch(n){case"TEXT":r=q.responseText;break;default:r=JSON.parse(q.responseText);break}c.CCL_RESPONSE=r;nswsbb.debugObject.push(c);if(p){p(r)}}};if(h){if(o){var g=encodeURIComponent(o);h=[h,d,"?parameters=",encodeURIComponent(a),"&blobIn=",g].join("")}else{h=[h,d,"?parameters=",encodeURIComponent(a)].join("")}q.open("GET",h,e);if(o){q.setRequestHeader("Content-type","application/x-www-form-urlencoded")}q.send(null)}else{q.open(f,d,e);if(o){q.setBlobIn(o)}q.send(a)}return q};nswsbb.cclajaxtext=function(b,f,c,e,g){var a=nswsbb.getDiscernReportUrl();var d=a?nswsbb.createHttpRequest():new XMLCclRequest();d.onreadystatechange=function(){if(d.readyState==4&&d.status==200){var h=d.responseText;if(g){g(h)}}};if(a){a=[a,b,"?parameters=",encodeURIComponent(e)].join("");d.open("GET",a,c);d.send(null)}else{d.open("GET",b,c);d.send(e)}return d};$(document).ready(function(){var a=false;$(document).on("keydown",document,function(c){var b=123;if(c.ctrlKey&&c.keyCode===b){a=true}});document.oncontextmenu=function(){return false};$(document).on("mousedown",document,function(c){var b=123;if(c.button==2&&a){a=false;nswsbb.debugObject.push(tm.getTimers());nswsbb.debugObject.push(tm.dumpAsCSV());tm.clearTimers();$(window.open().document.body).append("<pre>"+JSON.stringify(nswsbb.debugObject,null,4)+"</pre>");return false}return true})});nswsbb.Trunc=function(b,a){if(b.length>a){return b.substr(0,a-1)+"..."}else{return b}};nswsbb.CreateDocLaunchLink=function(o,j,m,a,n,b,g){if(m.toUpperCase()=="POWERNOTE"){var e=n;var f=b;return"<a href=\"javascript:window.external.DiscernObjectFactory('POWERNOTE').BeginNoteFromEncounterPathway("+o+","+j+",'"+e+"','"+f+"');\">"+a+"</a>"}else{if(m.toUpperCase()=="POWERFORM"){return"<a href=\"javascript:window.external.DiscernObjectFactory('POWERFORM').OpenForm("+o+","+j+","+n+","+b+","+g+');">'+a+"</a>"}else{if(m.toUpperCase()=="PC POWERNOTE"){return"<a href=\"javascript:window.external.DiscernObjectFactory('POWERNOTE').BeginNoteFromPrecompletedNote("+o+","+j+","+n+');">'+a+"</a>"}else{if(m.toUpperCase()=="IVIEW"){var h=a.toLowerCase();var d="";var c="";return"<a href=\"javascript:window.external.DiscernObjectFactory('TASKDOC').LaunchIView('"+h+"','"+d+"','"+c+"',"+o+","+j+');">'+a+"</a>"}else{return a}}}}};nswsbb.GetStreams=function(){var a=[];nswsbb.cclajax("855_pc_doc_launcher_start","GET",false,"",function(b){a=b.MAIN_DATA.QUAL});return a};nswsbb.GetDocumentsHTML=function(j,v,s){var r=[];var q;var o="<div class='document-launcher-placeholder'></div>";r.push("<div class='documents content-body'>");if(j.length===0){nswsbb.cclajax("855_pc_doc_launcher_top20","GET",false,j,function(x){q=x.MAIN_DATA.QUAL})}else{nswsbb.cclajax("855_pc_doc_launcher","GET",false,j,function(x){q=x.MAIN_DATA.QUAL})}if(q&&q.length>0){var b=nswsbb.GetDocDict(q,"DOCGROUP");for(key in b){var t=[];t.push("<table class='sub-sec'>");if(key!=""){t.push("<tr><th colspan='2' class='sub-sec-hd' style='border-width:0;'><span class='sub-sec-hd-tgl'>-</span><span class='sub-sec-title'>",key,"</span></th></tr>")}for(var p=0;p<b[key].length;p++){var d;var c=b[key][p]["DOCDISPLAYNAME"];var n=b[key][p]["ALIAS"];if(typeof n=="undefined"||n==""){n=c}var w=b[key][p]["DOCTYPE"];var u=b[key][p]["DOCID1"];var m=b[key][p]["DOCID2"];var f=b[key][p]["DOCCHARTMODE"];var h=b[key][p]["PEVENT_ID"]?b[key][p]["PEVENT_ID"]:0;d=nswsbb.CreateDocLaunchLink(v,s,w,n,u,m,f);var e=" class='document-link' alias='"+n+"' doctype='"+w+"' formid='"+u+"' activityid='"+m+"' chartmode='"+f+"' eventid='"+h+"' displayname='"+c+"'>"+d+"&nbsp</span>";if(b[key][p]["HAS_DOC"]>0){var a=moment(b[key][p]["CREATE_DT_FM"],"DD-MM-YYYY").format("DD/MM/YY");var g="";if(w.toUpperCase()=="POWERNOTE"){g="MP_Util.LaunchClinNoteViewer("+b[key][p]["PERSON_ID"]+","+b[key][p]["ENCNTR_ID"]+","+b[key][p]["PEVENT_ID"]+',"'+b[key][p]["VIEW_TYPE"]+'",'+b[key][p]["PEVENT_ID"]+");"}else{if(w.toUpperCase()=="POWERFORM"){g="MP_Util.LaunchClinNoteViewer("+b[key][p]["PERSON_ID"]+","+b[key][p]["ENCNTR_ID"]+","+b[key][p]["EVENT_ID"]+',"'+b[key][p]["VIEW_TYPE"]+'",'+b[key][p]["PEVENT_ID"]+");"}}d="<span style='display: inline-block;'"+e+"<span onclick='"+g+"' class='res-modified' date='"+a+"' author='"+b[key][p]["AUTHOR"]+"'></span>"}else{d="<span style='display: inline-block;'"+e+"</span>"}if(p%2==0){t.push("<tr class='sub-sec-content'><td style='width:50%'>",d,"</td>")}else{t.push("<td>",d,"</td></tr>")}}if(b[key].length/2!=0){t.push("</tr>")}t.push("</table>");r=r.concat(t)}r.push(o);r.push("</div>")}else{r.push("No results found",o,"</div>")}return r};(function(a){a.fn.flot_pie=function(b,d){d=a.extend({series:{pie:{show:true,radius:1,label:{show:true,radius:2/3,formatter:d.labelFormatter,threshold:0}},attributes:d.attributes},grid:{hoverable:true,clickable:true},legend:{show:false}},d);var e={};function c(m,n){var j=a.grep(m,function(p,o){return p.label==n});if(j.length<=0){return false}if(typeof j[0].clickable=="undefined"||j[0]==null){return false}return j[0].clickable}function f(){b.unbind("plothover");b.bind("plothover",function(m,o,n){if(!n){a(b.children(".flot-overlay")[0]).css({cursor:"auto"});return}var j=c(n.series.attributes,n.series.label);if(!j){a(b.children(".flot-overlay")[0]).css({cursor:"auto"});a(b.children("#pieLabel"+n.seriesIndex)[0]).css({cursor:"auto"});return}else{a(b.children(".flot-overlay")[0]).css({cursor:"pointer"});a(b.children("#pieLabel"+n.seriesIndex)[0]).css({cursor:"pointer"});return}})}function g(){b.unbind("plotclick");b.bind("plotclick",function(m,o,n){if(!n){return}var j=c(n.series.attributes,n.series.label);if(j){a(m.target).trigger("flotclick",[o,n])}})}function h(){plot=a.plot(b,d.data,d);f();g();a.extend(e,plot)}this.initialize=function(){h();return e};return this.initialize()}})(jQuery);(function(a){a.fn.nswsbb_component_pie=function(f){f=a.extend({data:[],attributes:[{label:"Complete",clickable:false},{label:"Incomplete",clickable:true}],labelFormatter:function(m,n){return"<div style='font-size:8pt; text-align:center; padding:2px; color:white;'>"+m+"<br/>"+n.percent+"%</div>"},legendLocation:{left:0},componentId:""},f);var h;var d=a(this);var g={legendIconId:f.componentId+"-legendicon",legendLocation:{top:-22,left:f.legendLocation.left-20},clickableLabel:function(){var m=a.grep(f.attributes,function(p,o){return(p.clickable)});return m[0].label}};function b(){var m=a("<div>").css({top:g.legendLocation.top,left:g.legendLocation.left,position:"absolute"}).append(a("<div>").css({cursor:"pointer"}).attr("id",g.legendIconId).attr("label",g.clickableLabel()).addClass("custom-glyphicon-th-list"));return m}function c(m){a("#"+g.legendIconId).qtip({content:"Show "+m+" Records",position:{viewport:a(window),target:"mouse",adjust:{y:21,method:"shift shift"}},style:{def:false,classes:"nswsbb-tips"}})}function j(){d.unbind("flotclick");d.bind("flotclick",function(m,o,n){if(!n){return}h.pie.unSelect();return})}function e(){a(document).ready(function(){var m=b();m.appendTo(a(d));c(g.clickableLabel());a(document).off("click","#"+g.legendIconId).on("click","#"+g.legendIconId,function(){a(d).trigger("flotclick",[null,{series:{label:a(this).attr("label")}}])})})}init=function(){j();h=a.fn.flot_pie(d,f);e()};this.initialize=function(){init();return this};return this.initialize()}})(jQuery);if(!String.prototype.format){String.prototype.format=function(){var a=arguments;return this.replace(/{(\d+)}/g,function(b,c){return typeof a[c]!="undefined"?a[c]:b})}}(function(f){var s=document.attachEvent,n=false;var o=f.fn.resize;f.fn.resizing=function(z){return this.each(function(){if(this==window){o.call(jQuery(this),z)}else{addResizeListener(this,z)}})};f.fn.removeResizing=function(z){return this.each(function(){removeResizeListener(this,z)})};if(!s){var a=(function(){var z=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||function(A){return window.setTimeout(A,20)};return function(A){return z(A)}})();var p=(function(){var z=window.cancelAnimationFrame||window.mozCancelAnimationFrame||window.webkitCancelAnimationFrame||window.clearTimeout;return function(A){return z(A)}})();function t(z){var B=z.__resizeTriggers__,A=B.firstElementChild,C=B.lastElementChild,D=A.firstElementChild;C.scrollLeft=C.scrollWidth;C.scrollTop=C.scrollHeight;D.style.width=A.offsetWidth+1+"px";D.style.height=A.offsetHeight+1+"px";A.scrollLeft=A.scrollWidth;A.scrollTop=A.scrollHeight}function x(z){return z.offsetWidth!=z.__resizeLast__.width||z.offsetHeight!=z.__resizeLast__.height}function y(A){var z=this;t(this);if(this.__resizeRAF__){p(this.__resizeRAF__)}this.__resizeRAF__=a(function(){if(x(z)){z.__resizeLast__.width=z.offsetWidth;z.__resizeLast__.height=z.offsetHeight;z.__resizeListeners__.forEach(function(B){B.call(z,A)})}})}var u=false,q="animation",w="",h="animationstart",m="Webkit Moz O ms".split(" "),c="webkitAnimationStart animationstart oAnimationStart MSAnimationStart".split(" "),d="";var g=document.createElement("fakeelement");if(g.style.animationName!==undefined){u=true}if(u===false){for(var r=0;r<m.length;r++){if(g.style[m[r]+"AnimationName"]!==undefined){d=m[r];q=d+"Animation";w="-"+d.toLowerCase()+"-";h=c[r];u=true;break}}}var j="resizeanim";var e="@"+w+"keyframes "+j+" { from { opacity: 0; } to { opacity: 0; } } ";var v=w+"animation: 1ms "+j+"; "}function b(){if(!n){var A=(e?e:"")+".resize-triggers { "+(v?v:"")+'visibility: hidden; opacity: 0; } .resize-triggers, .resize-triggers > div, .contract-trigger:before { content: " "; display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; } .resize-triggers > div { background: #eee; overflow: auto; } .contract-trigger:before { width: 200%; height: 200%; }',z=document.head||document.getElementsByTagName("head")[0],B=document.createElement("style");B.type="text/css";if(B.styleSheet){B.styleSheet.cssText=A}else{B.appendChild(document.createTextNode(A))}z.appendChild(B);n=true}}window.addResizeListener=function(z,A){if(s){z.attachEvent("onresize",A)}else{if(!z.__resizeTriggers__){if(getComputedStyle(z).position=="static"){z.style.position="relative"}b();z.__resizeLast__={};z.__resizeListeners__=[];(z.__resizeTriggers__=document.createElement("div")).className="resize-triggers";z.__resizeTriggers__.innerHTML='<div class="expand-trigger"><div></div></div><div class="contract-trigger"></div>';z.appendChild(z.__resizeTriggers__);t(z);z.addEventListener("scroll",y,true);h&&z.__resizeTriggers__.addEventListener(h,function(B){if(B.animationName==j){t(z)}})}z.__resizeListeners__.push(A)}};window.removeResizeListener=function(z,A){if(s){z.detachEvent("onresize",A)}else{z.__resizeListeners__.splice(z.__resizeListeners__.indexOf(A),1);if(!z.__resizeListeners__.length){z.removeEventListener("scroll",y);z.__resizeTriggers__=!z.removeChild(z.__resizeTriggers__)}}}}(jQuery));var utility={initialize:function(){var a=[];$("meta").each(function(b,c){a.push($(c).attr("content"))});this.isCernerV5=new RegExp(/IE=10/g).test(a.join(","));this.checkIE();this.isIESupported=!(!this.isCernerV5&&!this.isIELaterThan10&&!this.isNodeValueSupported())},checkIE:function(){var a=/.+Trident\/([0-9]+)./g.exec(navigator.userAgent);if(a!=null&&a.length>1){this.isIELaterThan10=parseInt(a[1])>=7}},checkNodeValue:function(){var e=true;var d=document.createElement("INPUT");var b="placeholder",f="";var a=d.getAttributeNode(b);if(!a){a=document.createAttribute(b);d.setAttributeNode(a)}try{a.nodeValue=f+""}catch(c){e=false}return e},isIESupported:false,isNodeValueSupported:function(){return this.checkNodeValue()},isCernerV5:false,isIELaterThan10:false,isWebAccess:/^http/.test(location.href)};utility.initialize();var nswsbb=nswsbb||{};nswsbb.timing={};nswsbb.timing.createTiming=function(d){var c=(typeof d!="undefined"&&d.timerOn);var b={};var f=[];var g=-1;var e=-1;b.getTimers=function(){return f};b.clearTimers=function(){f=[];g=-1;e=-1};b.dumpAsTextArray=function(n,m,j){var h=[];if(!c){return h}if(typeof n==="undefined"){n=false}if(typeof m==="undefined"){m=true}if(typeof j==="undefined"){j="-"}$.each(f,function(p,r){var o="";if(m){for(var q=0;q<r.depth;q++){o+=j}}if(r.matched===true){h.push(o+r.event_type+" "+r.task_name+": "+r.duration+" ms")}else{if(n===false){h.push(o+r.task_name+": unmatched")}}});return h};b.dumpAsCSV=function(j){var h=[];if(!c){return h}if(typeof j==="undefined"){j=false}h.push("Event,Task,Depth,Time,Duration,Matched?");$.each(f,function(m,o){if(o.matched===true||j===false){var n=o.event_type+","+o.task_name+","+o.depth;n=n+","+moment(o.time).format("HH:mm:ss")+","+o.duration+","+o.matched;h.push(n)}});return h};b.startTimer=function(h){if(!c){return}e++;var j=a("Start",h,Date.now(),e,-1,false);return j};b.stopTimer=function(h){if(!c){return}if(h>g||h<0){return}var j=Date.now();f[h].stop_time=Date.now();f[h].duration=j-f[h].time;f[h].matched=true;var m=a("Finish",f[h].task_name,j,f[h].depth,f[h].duration,true);e--;return m};b.addEvent=function(j){if(!c){return}var h=a("Event",j,Date.now(),e,-1,true);return h};var a=function(q,m,o,p,n,h){g++;var j=g;f[j]={};f[j].event_type=q;f[j].task_name=m;f[j].time=o;f[j].depth=p;f[j].duration=n;f[j].matched=h;return j};return b};var tm=nswsbb.timing.createTiming({timerOn:true});MPage.namespace("ceraus_au.pat_info");ceraus_au.pat_info=function(){};ceraus_au.pat_info.option1={treatment_address_lbl:"Treatment Address",home_phone_lbl:"Home Phone",home_phone_cd:"HOME",mobile_phone_lbl:"Mobile Phone",mobile_phone_cd:"PAGERPERSONAL",aboriginality_status_lbl:"Aboriginality",interp_req_lbl:"Interpreter required",nationality_lbl:"Country of Birth",language_lbl:"Preferred Language",cald_stat_lbl:"CALD Status",mental_health_lbl:"Legal Status",oohc_lbl:"OOHC Legal Status",home_env_lbl:"Home Risk Assessment",carer:{subsec_lbl:"Carer Information",name_lbl:"Name",address_lbl:"Address"}};ceraus_au.pat_info.prototype=new MPage.Component();ceraus_au.pat_info.prototype.constructor=MPage.Component;ceraus_au.pat_info.prototype.base=MPage.Component.prototype;ceraus_au.pat_info.prototype.name="ceraus_au.pat_info";ceraus_au.pat_info.prototype.cclProgram="1ceraus_au_pat_info";ceraus_au.pat_info.prototype.cclParams=[];ceraus_au.pat_info.prototype.cclDataType="JSON";ceraus_au.pat_info.prototype.init=function(){var a=this;var b=(a.options.home_phone_cd)?a.options:ceraus_au.pat_info.option1;a.cclParams=[];a.cclParams.push("MINE");a.cclParams.push(this.getProperty("personId"));a.cclParams.push(this.getProperty("encounterId"));a.cclParams.push(b.home_phone_cd);a.cclParams.push(b.mobile_phone_cd);a.setProperty("headerSubTitle","Loading...")};ceraus_au.pat_info.prototype.addEventHandlers=function(){var a=this;var b=a.getComponentUid();var c=a.getTarget();$("#"+b+" tr").mouseover(function(){$(this).addClass("ceraus_hover")}).mouseout(function(){$(this).removeClass("ceraus_hover")})};ceraus_au.pat_info.prototype.getSubHeader=function(a){return["<div class='sub-title-disp' style='margin:-6px -6px 6px -6px;border-left:none;border-right:none;'>",a,"</div>"].join("")};ceraus_au.pat_info.prototype.render=function(){var r=this;var u=(r.options.home_phone_cd)?r.options:ceraus_au.pat_info.option1;var s=r.getComponentUid();var I=r.getTarget();if(typeof(r.data)=="undefined"){l;r.data={PAT_INFO:{PERSON_ID:103363,ENCNTR_ID:83559,TREATMENT_ADDRESS:"239 Victoria St, Darlinghurst NSW 2010, Australia",HOME_PHONE_CD:170,MOBILE_PHONE_CD:161,ABORIG_STATUS:{CD:9012301,DISP:"Neither Aboriginal nor Torres Strait"},HOME_PHONE:"+61 2 9357 3533",MOBILE_PHONE:"+61 2 9357 3534",CALD_STATUS:"Sure",CARER:{NAME:"Ajinkya Raulkar, MD",ADDRESS:"10/6 Cowper Wharf Roadway, Woolloomooloo NSW 2011, Australia",HOME_PHONE:"+61 1300 546 475",MOBILE_PHONE:"+61 1300 546 476"},INTERP_REQ:{IS_REQUIRED:1,LANG_CD:9014602,LANG_DISP:"Spanish"},MENTAL_HEALTH:{CD:0,STATUS:"CTO-S131",DT_TM:"2013-03-22T15:00:00Z"},HOME_RISK:{EVENT_ID:1,CD:1,ASSESSMENT:"Completed",DT_TM:"2013-04-26T12:21:00Z"},STATUS_DATA:{STATUS:"S",SUBEVENTSTATUS:[{OPERATIONNAME:"",OPERATIONSTATUS:"",TARGETOBJECTNAME:"",TARGETOBJECTVALUE:""}]}}}}var B=r.data.PAT_INFO;var c=[];r.setProperty("headerSubTitle","");var f="N";if(B.INTERP_REQ.IS_REQUIRED==1){f="Y ";if(B.INTERP_REQ.INTERP_TYPE!=""){f+="("+B.INTERP_REQ.INTERP_TYPE+")"}}if(B.MENTAL_HEALTH.DT_TM!=""){B.MENTAL_HEALTH.DT_TM=new Date().setCustISO8601(B.MENTAL_HEALTH.DT_TM).formatString("longdate");B.MENTAL_HEALTH.DT_TM=" <span class='ceraus_dttm'>("+B.MENTAL_HEALTH.DT_TM+")</span>"}if(B.HOME_RISK.CD>0){var a=new Date().setCustISO8601(B.HOME_RISK.DT_TM).formatString("longdatetime");var v=r.getProperty("personId"),t=r.getProperty("encounterId");if(B.HOME_RISK.EVENT_ID>0){B.HOME_RISK.ASSESSMENT=["<a href=\"javascript:MPAGES_EVENT('CLINICALNOTE','",v,"|",t,"|",B.HOME_RISK.EVENT_ID,"|",u.home_env_lbl,"|31|CLINNOTES|341|CLINNOTES|1')\">Completed (",a,")</a>"].join("")}else{B.HOME_RISK.ASSESSMENT=["Completed (",a,")"].join("")}}else{B.HOME_RISK.ASSESSMENT="Not Completed"}var E="--";if(B.TADDRESS.length>0){var m=B.TADDRESS[0];var p=(m.STREET2!=""||m.STREET3!=""||m.STREET4!="")?[" (",m.STREET2," ",m.STREET3," ",m.STREET4,")"].join(""):"";if(p==""&&m.STREET1==""&&m.CITY==""&&m.STATE==""&&m.ZIPCODE==""&&m.COUNTRY==""){E="--"}else{E=[m.STREET1,p,", ",m.CITY," ",m.STATE," ",m.ZIPCODE,", ",m.COUNTRY].join("")}}else{E="--"}var q=E;var e=B.HOME_PHONE;var z=B.MOBILE_PHONE;var b=B.ABORIG_STATUS.DISP;var H=B.INTERP_REQ.NATIONALITY_DISP;var j=B.INTERP_REQ.LANG_DISP;var C=B.CALD_STATUS;var D=B.MENTAL_HEALTH.STATUS;var y=B.MENTAL_HEALTH.DT_TM;var h=B.HOME_RISK.ASSESSMENT;c.push("<div class='ceraus_patinfo'>");c.push("<table>");if(q==""){q="--"}c.push("<tr><td class='ceraus_header'>",u.treatment_address_lbl,":</td><td>",q,"</td></tr>");if(e==""){e="--"}c.push("<tr><td class='ceraus_header'>",u.home_phone_lbl,":</td><td>",e,"</td></tr>");if(z==""){z="--"}c.push("<tr><td class='ceraus_header'>",u.mobile_phone_lbl,":</td><td>",z,"</td></tr>");c.push("<tr><td class='ceraus_header'>Call Instruction:</td><td>",B.CALL_INSTRUCTION,"</td></tr>");c.push("<tr><td class='ceraus_header'>Preferred Contact Method:</td><td>",B.PREF_CONT_METHOD,"</td></tr>");c.push("<tr><td class='ceraus_header'>",u.aboriginality_status_lbl,":</td><td>",b,"</td></tr>");c.push("<tr><td class='ceraus_header'>",u.interp_req_lbl,":</td><td>",f,"</td></tr>");if(H==""){H="--"}c.push("<tr><td class='ceraus_header'>",u.nationality_lbl,":</td><td>",H,"</td></tr>");if(j==""){j="--"}c.push("<tr><td class='ceraus_header'>",u.language_lbl,":</td><td>",j,"</td></tr>");if(C==""){C="--"}c.push("<tr><td class='ceraus_header'>",u.cald_stat_lbl,":</td><td>",C,"</td></tr>");if(D==""){D="--"}c.push("<tr><td class='ceraus_header'>",u.mental_health_lbl,":</td><td>",D,y,"</td></tr>");if(h==""){h="--"}c.push("<tr><td class='ceraus_header'>",u.home_env_lbl,":</td><td>",h,"</td></tr>");var G=0;for(var o=0;o<B.RELATIONSHIPS.length;o++){var d=B.RELATIONSHIPS[o];if(d.RELATIONSHIP=="MOTHER"){c.push("<tr><td class='ceraus_header'>Mother</td><td>",d.NAME,"&nbsp;&nbsp;<span class='ceraus_header'>MRN:&nbsp;</span>",d.MRN,"</td></tr>");G=1}}if(G==0){c.push("<tr><td class='ceraus_header'>Mother</td><td>--</td></tr>")}var n=0;var A=0;for(var o=0;o<B.RELATIONSHIPS.length;o++){var d=B.RELATIONSHIPS[o];if(d.RELATIONSHIP=="CHILD"&&A==0){A+=1;c.push("<tr><td class='ceraus_header'>Children</td><td>",d.NAME,"&nbsp;&nbsp;<span class='ceraus_header'>MRN:&nbsp;</span>",d.MRN,"</td></tr>");n=1}else{if(d.RELATIONSHIP=="CHILD"){c.push("<tr><td></td><td>",d.NAME,"&nbsp;&nbsp;<span class='ceraus_header'>MRN:&nbsp;</span>",d.MRN,"</td></tr>")}}}if(n==0){c.push("<tr><td class='ceraus_header'>Children</td><td>--</td></tr>")}c.push("<tr><td class='ceraus_header'>Chronic Disease for Aboriginal Health</td><td>",B.CDM_VAL,"</td></tr>");c.push("</table>");c.push("</div>");I.innerHTML=c.join("");var w="--";if(B.CARER.ADDRESS.length>0){var g=B.CARER.ADDRESS[0];var F=(g.STREET2!=""||g.STREET3!=""||g.STREET4!="")?[" (",g.STREET2," ",g.STREET3," ",g.STREET4,")"].join(""):"";if(F==""&&g.STREET1==""&&g.CITY==""&&g.STATE==""&&g.ZIPCODE==""&&g.COUNTRY==""){w="--"}else{w=[g.STREET1,F,", ",g.CITY," ",g.STATE," ",g.ZIPCODE,", ",g.COUNTRY].join("")}}else{w="--"}$("#"+s+" .ceraus_patinfo").cernerSubSection({title:u.carer.subsec_lbl,subTitle:"",content:["<table>","<tr><td class='ceraus_header'>",u.carer.name_lbl,":</td><td>",B.CARER.NAME,"</td></tr>","<tr><td class='ceraus_header'>",u.carer.address_lbl,":</td><td>",w,"</td></tr>","<tr><td class='ceraus_header'>",u.home_phone_lbl,":</td><td>",B.CARER.HOME_PHONE,"</td></tr>","<tr><td class='ceraus_header'>",u.mobile_phone_lbl,":</td><td>",B.CARER.MOBILE_PHONE,"</td></tr>","</table>"].join(""),isExpand:false});r.addEventHandlers()};MPage.namespace("CHOC.ALERTS");CHOC.ALERTS=function(){};CHOC.ALERTS.prototype=new MPage.Component();CHOC.ALERTS.prototype.constructor=MPage.Component;CHOC.ALERTS.prototype.base=MPage.Component.prototype;CHOC.ALERTS.prototype.name="CHOC.ALERTS";CHOC.ALERTS.prototype.cclProgram="855_mp_problem_alert";CHOC.ALERTS.prototype.cclParams=[];CHOC.ALERTS.prototype.cclDataType="JSON";CHOC.ALERTS.prototype.init=function(b){var a=this;a.cclParams.push("MINE");a.cclParams.push(this.getProperty("personId"));a.cclParams.push(this.getProperty("encounterId"));a.cclParams.push("A")};CHOC.ALERTS.prototype.addEventHandlers=function(){var f=this;var m=f.getComponentUid();var e=f.getTarget();$("#"+m+" .classOfElementWithinComponent").click(function(){});var d=$("#"+m+" .nswsbb-pl-info");var j="nswsbb-hover-highlight";var h=d.length;for(var c=0;c<h;c++){var n=d.eq(c);n.hover(function(){$(this).addClass(j)},function(){$(this).removeClass(j)});var g=n.attr("display");var b=n.attr("a_display");if(b===""){b=g}var a=["<div class='nswsbb-hvr'><dl class='nswsbb-pl-det'><dt><span>Alert:</span></dt><dd class='nswsbb-pl-det-name'><span>",g,"</span></dd><dt><span>Annotated Display Name:</span></dt><dd class='nswsbb-pl-det-annot'><span>",b,"</span></dd><dt><span>Onset Date:</span></dt><dd class='nswsbb-pl-det-dt'><span>",n.attr("onsetdate"),"</span></dd><dt><span>Last Update:</span></dt><dd class='nswsbb-pl-det-dt'><span>",n.attr("updatedate"),"</span></dd><dt><span>Responsible Provider:</span></dt><dd class='nswsbb-pl-det-dt'><span>",n.attr("respprovider"),"</span></dd><dt><span>Comments: </span></dt><dd class='nswsbb-pl-det-comment'><span>",n.attr("comment"),"</span></dd></dl></div>"];n.qtip({content:{text:$(a.join("")).addClass(j)},position:{viewport:$(window),target:"mouse",adjust:{y:21,method:"shift shift"}},style:{def:false,classes:"nswsbb-hover"}})}};CHOC.ALERTS.prototype.getSubHeader=function(a){return["<div class='sub-title-disp' style='margin:-6px -6px 6px -6px;border-left:none;border-right:none;'>",a,"</div>"].join("")};CHOC.ALERTS.prototype.render=function(){var o=this;var p=o.getComponentUid();var n=o.getTarget();var g=[];var q={ALERTS:{ALERT:[{DISPLAY:"Bariatric Patient",DATE_TM:"18/12/13",PROVIDER_ID:111588,COMMENTS:[]}],ALERTCNT:1}};var e=o.data.MAIN_DATA;var d=e.QUAL;var c=e.CNT;g.push(o.getSubHeader("All Visits"));o.setProperty("headerTitle","Alerts");o.setProperty("headerSubTitle","("+c+")");if(c==0){g.push("<span style='color:#A0A0A0; padding:5px'>No results found</span>");n.innerHTML=g.join("")}else{g.push("<div class='content-body CHOC-ALERTS'>");for(var h=0;h<c;h++){var f=d[h];var m="";if(f.LAST_UPDATE_DT!==""){m=moment(f.LAST_UPDATE_DT,"DD-MM-YYYY HH:mm:ss").format("DD/MM/YYYY")}var a="";var b="";if(f.IDENTIFIER){b="("+f.IDENTIFIER+")"}if(f.ONSET_DT!==""){a=moment(f.ONSET_DT,"DD-MM-YYYY HH:mm:ss").format("DD/MM/YYYY")}var j=f.A_DISPLAY?f.A_DISPLAY:f.DISPLAY;g.push("<div class='nswsbb-pl-info' respprovider='",f.RESP_PRSNL,"' comment='",f.COMMENT,"' display='",f.DISPLAY,"' a_display='",f.A_DISPLAY,"' updatedate='",m,"' onsetdate='",a,"'>",j,"&nbsp<span class='code'>",b,"</span></div>")}g.push("</div>");n.innerHTML=g.join("")}o.addEventHandlers()};MPage.namespace("EMR2.PROBLEMS");EMR2.PROBLEMS=function(){};EMR2.PROBLEMS.prototype=new MPage.Component();EMR2.PROBLEMS.prototype.constructor=MPage.Component;EMR2.PROBLEMS.prototype.base=MPage.Component.prototype;EMR2.PROBLEMS.prototype.name="EMR2.PROBLEMS";EMR2.PROBLEMS.prototype.cclProgram="855_mp_problem_alert";EMR2.PROBLEMS.prototype.cclParams=[];EMR2.PROBLEMS.prototype.cclDataType="JSON";EMR2.PROBLEMS.prototype.init=function(b){var a=this;a.cclParams.push("MINE");a.cclParams.push(this.getProperty("personId"));a.cclParams.push(this.getProperty("encounterId"));a.cclParams.push("P")};EMR2.PROBLEMS.prototype.addEventHandlers=function(){var h=this;var n=h.getComponentUid();var f=h.getTarget();$("#"+n+" .classOfElementWithinComponent").click(function(){});var b=$("#"+n+" .nswsbb-pl-info");var m="nswsbb-hover-highlight";var d=b.length;for(var e=0;e<d;e++){var g=b.eq(e);g.hover(function(){$(this).addClass(m)},function(){$(this).removeClass(m)});var j=g.attr("display");var c=g.attr("a_display");if(c===""){c=j}var a=["<div class='nswsbb-hvr'><dl class='nswsbb-pl-det'><dt><span>Problem:</span></dt><dd class='nswsbb-pl-det-name'><span>",j,"</span></dd><dt><span>Annotated Display Name:</span></dt><dd class='nswsbb-pl-det-annot'><span>",c,"</span></dd><dt><span>Onset Date:</span></dt><dd class='nswsbb-pl-det-dt'><span>",g.attr("onsetdate"),"</span></dd><dt><span>Last Update:</span></dt><dd class='nswsbb-pl-det-dt'><span>",g.attr("updatedate"),"</span></dd><dt><span>Responsible Provider:</span></dt><dd class='nswsbb-pl-det-dt'><span>",g.attr("respprovider"),"</span></dd><dt><span>Comments: </span></dt><dd class='nswsbb-pl-det-comment'><span>",g.attr("comment"),"</span></dd></dl></div>"];g.qtip({content:{text:$(a.join("")).addClass(m)},position:{viewport:$(window),target:"mouse",adjust:{y:21,method:"shift shift"}},style:{def:false,classes:"nswsbb-hover"}})}};EMR2.PROBLEMS.prototype.getSubHeader=function(a){return["<div class='sub-title-disp' style='margin:-6px -6px 6px -6px;border-left:none;border-right:none;'>",a,"</div>"].join("")};EMR2.PROBLEMS.prototype.render=function(){var m=this;var n=m.getComponentUid();var j=m.getTarget();var f=[];var d=m.data.MAIN_DATA;var c=d.QUAL;var o=d.CNT;f.push(m.getSubHeader("All Visits"));m.setProperty("headerTitle","Problems");m.setProperty("headerSubTitle","("+o+")");if(o==0){f.push("<span style='color:#A0A0A0; padding:5px'>No results found</span>");j.innerHTML=f.join("")}else{f.push("<div class='content-body EMR2-PROBLEMS'>");for(var g=0;g<o;g++){var e=c[g];var h="";if(e.LAST_UPDATE_DT!==""){h=moment(e.LAST_UPDATE_DT,"DD-MM-YYYY HH:mm:ss").format("DD/MM/YYYY")}var a="";var b="";if(e.IDENTIFIER){b="("+e.IDENTIFIER+")"}if(e.ONSET_DT!==""){a=moment(e.ONSET_DT,"DD-MM-YYYY HH:mm:ss").format("DD/MM/YYYY")}f.push("<div class='nswsbb-pl-info' respprovider='",e.RESP_PRSNL,"' comment='",e.COMMENT,"' display='",e.DISPLAY,"' a_display='",e.A_DISPLAY,"' updatedate='",h,"' onsetdate='",a,"'>",e.DISPLAY,"&nbsp<span class='code'>",b,"</span></div>")}f.push("</div>");j.innerHTML=f.join("")}m.addEventHandlers()};MPage.namespace("nswsbb.EMR_OUTSTANDING_PATHOLOGY_ORDERS");nswsbb.EMR_OUTSTANDING_PATHOLOGY_ORDERS=function(){};nswsbb.EMR_OUTSTANDING_PATHOLOGY_ORDERS.prototype=new MPage.Component();nswsbb.EMR_OUTSTANDING_PATHOLOGY_ORDERS.prototype.constructor=MPage.Component;nswsbb.EMR_OUTSTANDING_PATHOLOGY_ORDERS.prototype.base=MPage.Component.prototype;nswsbb.EMR_OUTSTANDING_PATHOLOGY_ORDERS.prototype.name="nswsbb.EMR_OUTSTANDING_PATHOLOGY_ORDERS";nswsbb.EMR_OUTSTANDING_PATHOLOGY_ORDERS.prototype.cclProgram="MP_GET_OUTSTANDING_ORDERS";nswsbb.EMR_OUTSTANDING_PATHOLOGY_ORDERS.prototype.cclParams=[];nswsbb.EMR_OUTSTANDING_PATHOLOGY_ORDERS.prototype.cclDataType="JSON";nswsbb.EMR_OUTSTANDING_PATHOLOGY_ORDERS.prototype.loadCCL=nswsbb.loadCCL;nswsbb.EMR_OUTSTANDING_PATHOLOGY_ORDERS.option1={EMR_OUTSTANDING_PATHOLOGY_ORDERS_Config:{STYLE:null,NAMESPACE:"ord",LOOK_BACK_UNITS:7,LOOK_BACK_UNIT_TYPE_FLAG:2,SCOPE:2,CATALOG_CODES:2513,ORDER_STATUSES:"value(2551.0,26834.0,2550.0,2548.0)",PPR_CD:9045035}};nswsbb.EMR_OUTSTANDING_PATHOLOGY_ORDERS.prototype.init=function(d){var c=this;var e=c.options.EMR_OUTSTANDING_PATHOLOGY_ORDERS_Config;var b=[];b.push("^MINE^");b.push(c.getProperty("personId")+".0");var a=(e.SCOPE==2)?(c.getProperty("encounterId")):0;b.push(a+".0");b.push(c.getProperty("userId")+".0");b.push(e.LOOK_BACK_UNITS);b.push(e.LOOK_BACK_UNIT_TYPE_FLAG);b.push(e.CATALOG_CODES+".0");b.push(e.ORDER_STATUSES);b.push(e.PPR_CD+".0");b.join(",");c.cclParams.push(b)};nswsbb.EMR_OUTSTANDING_PATHOLOGY_ORDERS.prototype.addEventHandlers=function(){var c=this;var e=c.getComponentUid();var f=c.getTarget();var a="nswsbb-hover-highlight";for(var d=0;d<$("#"+e+" .nswsbb-hvr").length;d++){var b=$("#"+e+" .nswsbb-hvr").eq(d).prevAll(".nswsbb-ord-info:first");b.hover(function(){$(this).addClass(a)},function(){$(this).removeClass(a)});b.qtip({content:{text:$("#"+e+" .nswsbb-hvr").eq(d).clone().addClass(a)},position:{viewport:$(window),target:"mouse",adjust:{method:"shift shift"}},style:{def:false,classes:"nswsbb-hover"}})}$("#"+e+" .nswsbb-hvr").hide()};nswsbb.EMR_OUTSTANDING_PATHOLOGY_ORDERS.prototype.render=function(){var g=this;var m=g.getComponentUid();var v=g.getTarget();var a=[];if(typeof(g.data)=="undefined"){g.data={RECORD_DATA:{ORDERS:[{NAME:"CTB Brain",HOVER_NAME:"CT Brain (CTB Brain)",STATUS:"Ordered",CURRENT_START_DT_TM:"2013-10-28T04:56:00Z",ORIG_ORDER_DT_TM:"2013-10-27T04:56:00Z",CLINICAL_DISPLAY_LINE:"Requested Start: 28/10/2013 15:56, Priority: Immediate <30 mins",ORDER_COMMENT:"",RESPONSIBLE_PROVIDER_ID:67159,RESPONSIBLE_PROVIDER:"Smith, Michael"},{NAME:"Full Blood Count",HOVER_NAME:"Full Blood Count",STATUS:"Ordered",CURRENT_START_DT_TM:"2013-10-28T04:57:00Z",ORIG_ORDER_DT_TM:"2013-10-27T04:56:00Z",CLINICAL_DISPLAY_LINE:"Clinician Collect, Routine, Routine, Collection Date/Time 28/10/2013 15:57, Blood, Print Label Y/N, Print Label By Order Location",ORDER_COMMENT:"",RESPONSIBLE_PROVIDER_ID:67159,RESPONSIBLE_PROVIDER:"Smith, Michael"}],STATUS_DATA:{STATUS:"S",SUBEVENTSTATUS:[{OPERATIONNAME:"",OPERATIONSTATUS:"",TARGETOBJECTNAME:"",TARGETOBJECTVALUE:""}]}}}}var u=g.data.RECORD_DATA;var n=this.options.EMR_OUTSTANDING_PATHOLOGY_ORDERS_Config;var s="";var o=n.NAMESPACE;var d=new Date();var r;var f=i18n.discernabu.orders_o1;var t=[];var e="";var q=0;var b=null;var c="";var p="";var h=nswsbb.i18n.discernabu.patinfo_o1;var n=g.options.EMR_OUTSTANDING_PATHOLOGY_ORDERS_Config;q=u.ORDERS.length;if(q>0){g.setProperty("headerTitle",g.getProperty("headerTitle")+" ("+q+")");t.push("<div class='content-hdr'><dl class='",o,"-info-hdr hdr'><dt class='",o,"-nm-hd'><span></span></dt><dt class='",o,"-st-hd'><span>",f.STATUS,"</span></dt><dt class='",o,"-dt-hd'><span>",f.ORDERED,"</span></dt></dl></div>");t.push("<div class ='","content-body","'>");for(r=0;r<q;r++){b=u.ORDERS[r];d.setISO8601(b.ORIG_ORDER_DT_TM);e=d.format("longDateTime2");c=d.format("longDateTime3");d.setISO8601(b.CURRENT_START_DT_TM);p=d.format("longDateTime3");t.push("<dl class='nswsbb-ord-info'><dd class= 'ord-name'><span>",b.NAME,"</span></dd><dd class= 'ord-status'><span>",b.STATUS,"</span></dd><dd class= 'ord-date'><span class='date-time'>",e,"</span></dd></dl><h4 class='det-hd'><span>","</span></h4><div class='nswsbb-hvr'><dl class='ord-det'><dt><span>",f.ORDER_NAME,":</span></dt><dd><span>",b.HOVER_NAME,"</span></dd><dt><span>",f.ORDER_DETAILS,":</span></dt><dd><span>",b.CLINICAL_DISPLAY_LINE,"</span></dd><dt><span>",f.ORDER_COMMENTS,":</span></dt><dd><span>",b.ORDER_COMMENT.replace(/\n/g,"<br />"),"</span></dd><dt><span>",f.ORDER_DATE,":</span></dt><dd><span>",c,"</span></dd><dt><span>",f.START_DT_TM,":</span></dt><dd><span>",p,"</span></dd>   <dt><span>",f.ORDER_STATUS,":</span></dt><dd><span>",b.STATUS,"</span></dd><dt><span>",f.ORDER_PHYS,":</span></dt><dd><span>",b.RESPONSIBLE_PROVIDER,"</span></dd></dl></div>")}v.innerHTML=t.join("");g.addEventHandlers()}else{v.innerHTML="<span class='res-none'>"+h.NO_RESULTS_FOUND+"</span>"}$("#"+m+" .sec-content").before("<div class='sub-title-disp lb-drop-down'>Last "+n.LOOK_BACK_UNITS+" "+nswsbb.GetLookBackUnitType(n.LOOK_BACK_UNIT_TYPE_FLAG)+" for all visit</div>")};MPage.namespace("nswsbb.ClinDocLauncher");nswsbb.ClinDocLauncher=function(){};nswsbb.ClinDocLauncher.prototype=new MPage.Component();nswsbb.ClinDocLauncher.prototype.constructor=MPage.Component;nswsbb.ClinDocLauncher.prototype.base=MPage.Component.prototype;nswsbb.ClinDocLauncher.prototype.name="nswsbb.ClinDocLauncher";nswsbb.ClinDocLauncher.option1={};nswsbb.ClinDocLauncher.prototype.init=function(a){};nswsbb.ClinDocLauncher.prototype.addEventHandlers=function(){var g=this,h=g.getComponentUid(),e=g.getTarget(),m=g.getProperty("personId"),c=g.getProperty("encounterId"),j=g.getProperty("userId"),d=0,a=0,f;f=function(){var o=$("#"+h+" .nswsbb-lb-mnu-selectWindow").hasClass("menu-hide")?true:false,p=40,n=0;if(o){if(d){$("#"+h+" .documents").height(d)}}else{d=$("#"+h+" .documents").height();a=$("#"+h+" .nswsbb-mnu-contentbox").height();if(p>d-a){n=Math.max(n,a)+p;$("#"+h+" .documents").height(n)}}};$("#"+h+" .noe-drop-down").click(function(){$("#"+h+" .nswsbb-lb-mnu-selectWindow").toggleClass("menu-hide");f()});$(document).on("click","#"+h+" .sub-sec-hd",function(){$(this).parent().toggleClass("closed");$(this).parent().parent().find(".sub-sec-content").toggle()});$("#"+h+" .nswsbb-lb-mnu").click(function(){var o=$(this).text();$("#"+h+" .lblmnudisplay").text(o);$("#"+h+" .nswsbb-mnu-labelbox").text(o);$("#"+h+" .nswsbb-lb-mnu-selectWindow").toggleClass("menu-hide");var t=h+".stream";var r=o;var n=j+',"'+t+'","'+r+'"';nswsbb.cclajax("MP_MAINTAIN_USER_PREFS","POST",true,n);var s="My Most Used Documents";if(o===s){var q=""}else{var p=jQuery.grep(nswsbb.GetStreams(),function(u){return u.CAT_DISP==o})[0];var q=[p.CAT_CD,m,c,p.LEVEL3]}var p=jQuery.grep(nswsbb.GetStreams(),function(u){return u.CAT_DISP==o})[0];$("#"+h+" .documents").replaceWith(nswsbb.GetDocumentsHTML(q,m,c).join(""));b()});b();function b(){var w=$("#"+h+" .res-modified");var x="nswsbb-hover-highlight";var q=w.length;for(var s=0;s<q;s++){var v=w.eq(s);v.hover(function(){$(this).addClass("lb-drop-down")});var n=["<div style='width:auto' class='nswsbb-hvr'>","Date: ",v.attr("date"),"<br>Author: ",v.attr("author"),"</div>"];v.qtip({content:{text:$(n.join("")).addClass(x)},position:{viewport:$(window),target:"mouse",adjust:{y:21,method:"shift shift"}},style:{def:false,classes:"nswsbb-hover"}})}var u=$("#"+h+" .document-link");var p=u.length;for(var s=0;s<p;s++){var o=u.eq(s);var t=o.attr("alias");var r=o.attr("displayname");if(t!==r){var n=["<div style='width:auto' class='nswsbb-hvr'>",r,"</div>"];o.qtip({content:{text:$(n.join("")).addClass(x)},position:{viewport:$(window),target:"mouse",adjust:{y:21,method:"shift shift"}},style:{def:false,classes:"nswsbb-hover"}})}}}};nswsbb.ClinDocLauncher.prototype.render=function(){var n=this;var p=n.getComponentUid();var m=n.getTarget();var f=[];var t=n.getProperty("personId");var c=n.getProperty("encounterId");var s=n.getProperty("userId");var o=nswsbb.GetStreams();var g=p+".stream";var b=s+',"'+g+'"';var h="Change Document Category";var e=o[0].CAT_DISP;nswsbb.cclajax("MP_GET_USER_PREFS","GET",false,b,function(j){if(j.RECORD_DATA.PREF_STRING!==""){e=j.RECORD_DATA.PREF_STRING}});f.push("<div class='dropdownmenu' style='width:100%;'>","<div id='stt' class='sub-title-disp'>","<span class='lblmnudisplay noe-drop-down' title='",h,"'>",e,"</span>");f.push("<span class='noe-drop-down noe-venue-type-link' title='",h,"'>","</span>");f.push("<span id='cf1msg' class='filter-applied-msg' title=''></span></div>");f.push("<div class='cvClassFilterSpan nswsbb-lb-mnu-selectWindow lb-menu2 menu-hide'>");f.push("<div class='nswsbb-mnu-labelbox'>",e,"</div>");f.push("<div class='nswsbb-mnu-contentbox'>");var q="My Most Used Documents";for(var d=0;d<o.length;d++){f.push("<div><span class='nswsbb-lb-mnu'>",o[d].CAT_DISP,"</span></div>")}f.push("</div></div></div>");if(e===q){var a=""}else{var r=jQuery.grep(o,function(j){return j.CAT_DISP==e})[0];if(r){var a=[r.CAT_CD,t,c,r.LEVEL3]}else{var a=""}}m.innerHTML=nswsbb.GetDocumentsHTML(a,t,c).join("");$("#"+p+" .dropdownmenu").remove();$("#"+p+" .sec-content").before(f.join(""));n.addEventHandlers()};MPage.namespace("nswsbb.DA_Summary");nswsbb.DA_Summary=function(){};nswsbb.DA_Summary.prototype=new MPage.Component();nswsbb.DA_Summary.prototype.constructor=MPage.Component;nswsbb.DA_Summary.prototype.base=MPage.Component.prototype;nswsbb.DA_Summary.prototype.name="nswsbb.DA_Summary";nswsbb.DA_Summary.prototype.cclProgram="855_mp_drug_and_alc";nswsbb.DA_Summary.prototype.cclParams=[];nswsbb.DA_Summary.prototype.cclDataType="JSON";nswsbb.DA_Summary.option1={};nswsbb.DA_Summary.prototype.init=function(b){var a=this;a.cclParams.push("MINE");a.cclParams.push(a.getProperty("encounterId"))};nswsbb.DA_Summary.prototype.addEventHandlers=function(){var b=this;var d=b.getComponentUid();var f=b.getTarget();var a="nswsbb-hover-highlight";$("#"+d+" .sub-sec-hd").click(function(){$(this).parent().toggleClass("closed");$(this).parent().find(".sub-sec-content").toggle()});$("#"+d+" [id^='serviceepisode']").hide();for(var c=0;c<$("#"+d+" .serviceepisode").length;c++){var e=$("#"+d+" .serviceepisode").eq(c);e.hover(function(){$(this).addClass(a)},function(){$(this).removeClass(a)});e.qtip({content:{text:$("#serviceepisode"+c).clone().addClass(a)},position:{viewport:$(window),target:"mouse",adjust:{method:"shift shift"}},style:{def:false,classes:"nswsbb-hover"}})}};nswsbb.DA_Summary.prototype.render=function(){var m=this;var y=m.getTarget();var b=[];var a=m.getProperty("personId");var s=m.getProperty("encounterId");var e=m.data;var d="Not collected";if(e.JSON.LASTNONATTENDRISKDATE===""){b.push("<div><div><span>","<b>Last Non attendance Risk Rating</b>",":</span></div><div><span>",d,"</span></div></div>")}else{var q=moment(e.JSON.LASTNONATTENDRISKDATE,"DD/MM/YYYY");var t=e.JSON.LASTNONATTENDRISKID;var x=e.JSON.LASTNONATTENDRISKSCORE;b.push("<div><div><span>","<b>Last Non attendance Risk Rating</b>",":</span></div><div><span>",x,"</span><span>","  on "+nswsbb.CreateDocLaunchLink(a,s,"Powerform",q.format("DD/MM/YYYY"),0,t,1),"</span></div></div>")}if(e.JSON.LASTDAASSESSDATE===""){b.push("<div><div><span>","<b>Last D&A Assessment Date</b>",":</span></div><div><span>",d,"</span></div></div>")}else{var v=moment(e.JSON.LASTDAASSESSDATE,"DD/MM/YYYY");var u=parseInt(moment().diff(v,"days",true));var n=e.JSON.LASTDAASSESSID;b.push("<div><div><span>","<b>Last D&A Assessment Date</b>",":</span></div><div><span>",u,"</span><span>"," days ago  on "+nswsbb.CreateDocLaunchLink(a,s,"Powerform",v.format("DD/MM/YYYY"),0,n,1),"</span></div></div>")}if(e.JSON.LASTATOPDATE===""){b.push("<div><span>","<b>Last ATOP Completed</b>",":</span></div><div><span>",d,"</span></div></div>")}else{var j=moment(e.JSON.LASTATOPDATE,"DD/MM/YYYY");var f=parseInt(moment().diff(j,"days",true));var r=e.JSON.LASTATOPID;b.push("<div><div><span>","<b>Last ATOP Completed</b>",":</span></div><div><span>",f,"</span><span>"," days ago  on "+nswsbb.CreateDocLaunchLink(a,s,"Powerform",j.format("DD/MM/YYYY"),0,r,1),"</span></div></div>")}if(e.JSON.LASTCOMPLEXITYRATINGDATE==""){b.push("<div><div><span>","<b>Last Complexity Rating Total Scores</b>",":</span></div><div><span>",d,"</span></div></div>")}else{var o=moment(e.JSON.LASTCOMPLEXITYRATINGDATE,"DD/MM/YYYY");var c=e.JSON.LASTCOMPLEXITYRATINGSCORE;var w=e.JSON.LASTCOMPLEXITYRATINGID;b.push("<div><div><span>","<b>Last Complexity Rating Total Scores</b>",":</span></div><div><span>",c,"</span><span>","  on "+nswsbb.CreateDocLaunchLink(a,s,"Powerform",o.format("DD/MM/YYYY"),0,w,1),"</span></div></div>")}if(e.JSON.LASTGLOBALCAREPLANDATE===""){b.push("<div><div><span>","<b>Last Global Care Plan</b>",":</span></div><div><span>",p,"</span><span>",d,"</span></div></div>")}else{var h=moment(e.JSON.LASTGLOBALCAREPLANDATE,"DD/MM/YYYY");var p=parseInt(moment().diff(h,"days",true));var g=e.JSON.LASTGLOBALCAREPLANID;b.push("<div><div><span>","<b>Last Global Care Plan</b>",":</span></div><div><span>",p,"</span><span>"," days ago  on "+nswsbb.CreateDocLaunchLink(a,s,"Powerform",h.format("DD/MM/YYYY"),0,g,1),"</span></div></div>")}nswsbb.cclajax("855_dcp_get_current_services","GET",false,s,function(C){b.push("<div class='sub-sec'><div class='sub-sec-hd'><span class='sub-sec-hd-tgl'>-</span><span class='sub-sec-title'>Service Episodes ("+C.JSON.CNT+")</span></div>");b.push("<div class='sub-sec-content' style='overflow:auto'><table id='serviceEpisodeContent'><tr><th>Main Service Provided</th><th>Principal Drug</th><th>Start Date</th><th>End Date</th></tr>");for(var A=0;A<C.JSON.REC.length;A++){var z,D,B;if(C.JSON.REC[A]["COMMENCEMENT_DT_TM"]===""){z=C.JSON.REC[A]["COMMENCEMENT_DT_TM"]}else{z=moment(C.JSON.REC[A]["COMMENCEMENT_DT_TM"],"DD-MM-YYYY").format("DD/MM/YY")}if(C.JSON.REC[A]["CESSATION_DT_TM"]===""){D=C.JSON.REC[A]["CESSATION_DT_TM"]}else{D=moment(C.JSON.REC[A]["CESSATION_DT_TM"],"DD-MM-YYYY").format("DD/MM/YY")}if(C.JSON.REC[A]["SVC_START_DT_TM"]===""){B=C.JSON.REC[A]["SVC_START_DT_TM"]}else{B=moment(C.JSON.REC[A]["SVC_START_DT_TM"],"DD-MM-YYYY").format("DD/MM/YY")}b.push("<tr class='serviceepisode' link_id='"+A+"'><td style='width:45%'>"+nswsbb.Trunc(C.JSON.REC[A]["SERVICE"],20)+"</td><td style='width:15%'>"+nswsbb.Trunc(C.JSON.REC[A]["DRUG"],8)+"</td><td>"+z+"</td><td>"+D+"</td></tr>");b.push("<div  class='nswsbb-hvr' id='serviceepisode"+A+"'>");b.push("<div><span>Main Service Provided</span>",":<span>"+C.JSON.REC[A]["SERVICE"]+"</span></div>");b.push("<div><span>Principal Drug</span>",":<span'>"+C.JSON.REC[A]["DRUG"]+"</span></div>");b.push("<div><span>Team</span>",":<span'>"+C.JSON.REC[A]["ASSOC_GRP"]+"</span></div>");b.push("<div><span>Start Date</span>",":<span'>"+z+"</span></div>");b.push("<div><span>Last Contact</span>",":<span'>"+B+"</span></div>");b.push("<div><span>End Date</span>",":<span'>"+D+"</span></div>");b.push("<div><span>#Contacts</span>",":<span'>"+C.JSON.REC[A]["NO_OF_CONTACTS"]+"</span></div>");b.push("</div>")}b.push("</table></div></div>")});y.innerHTML=b.join("");m.addEventHandlers()};MPage.namespace("nswsbb.Patient_Info");nswsbb.Patient_Info=function(){};nswsbb.Patient_Info.prototype=new MPage.Component();nswsbb.Patient_Info.prototype.constructor=MPage.Component;nswsbb.Patient_Info.prototype.base=MPage.Component.prototype;nswsbb.Patient_Info.prototype.name="nswsbb.Patient_Info";nswsbb.Patient_Info.prototype.cclProgram="855_mp_patient_info";nswsbb.Patient_Info.prototype.cclParams=[];nswsbb.Patient_Info.prototype.cclDataType="JSON";nswsbb.Patient_Info.option_emr={app_name:"EMR"};nswsbb.Patient_Info.option_choc={label_names:{treatment_address_lbl:"Treatment Address",home_phone_lbl:"Home Phone",home_phone_cd:"HOME",mobile_phone_lbl:"Mobile Phone",mobile_phone_cd:"PAGERPERSONAL",business_phone_lbl:"Business Phone",business_phone_cd:"BUSINESS",email_lbl:"Email Address",email_cd:"EMAIL",aboriginality_status_lbl:"Aboriginality",interp_req_lbl:"Interpreter required",nationality_lbl:"Country of Birth",language_lbl:"Preferred Language",cald_stat_lbl:"CALD Status",mental_health_lbl:"Legal Status",home_env_lbl:"Home Risk Assessment",associated_group_lbl:"Associated Group",carer:{subsec_lbl:"Carer Information",name_lbl:"Name",address_lbl:"Address"},mother:{subsec_lbl:"Mother Information",name_lbl:"Name",address_lbl:"Address",mrn_lbl:"MRN"},service_category_lbl:"Service Category",nok:{subsec_lbl:"Next of Kin",relationship_lbl:"Relationship to Person",name_lbl:"Name",address_lbl:"Address",address_cd:"HOME",call_instruction_lbl:"Call Instruction"},emc:{subsec_lbl:"Emergency Contact",relationship_lbl:"Relationship to Person",name_lbl:"Name",address_lbl:"Address",address_cd:"HOME",alt_address_lbl:"Temporary Address",alt_address_cd:"ALTERNATE",alt_home_phone_lbl:"Temporary Home Phone",alt_home_phone_cd:"ALTERNATE",alt_mobile_phone_lbl:"Temporary Mobile Phone",alt_mobile_phone_cd:"PAGERALTERNATE",alt_email_lbl:"Temporary Email Address",call_instruction_lbl:"Call Instruction"}},app_name:"CHOC"};nswsbb.Patient_Info.option_emr_no_emergency_contact={app_name:"EMR"};nswsbb.Patient_Info.option_eMR_GSGW={app_name:"EMR"};nswsbb.Patient_Info.prototype.init=function(b){var a=this;a.cclParams.push("^MINE^");a.cclParams.push(a.getProperty("personId"));a.cclParams.push(a.getProperty("encounterId"));a.cclParams.push(a.getProperty("userId"));a.cclParams.push(a.getProperty("pprCd"));try{var c=window.external.DiscernObjectFactory("PVCONTXTMPAGE");if(c){a.cclParams.push("'numbr("+c.GetValidEncounters(a.getProperty("personId"))+")'")}}catch(d){a.cclParams.push("'numbr(0.0)'")}if(typeof a.options.app_name=="undefined"||a.options.app_name==""){a.cclParams.push("EMR")}else{a.cclParams.push("'"+a.options.app_name+"'")}a.setProperty("headerSubTitle","Loading...")};nswsbb.Patient_Info.prototype.addEventHandlers=function(){var c=this;var e=c.getComponentUid();var f=c.getTarget();var a="nswsbb-hover-highlight";$("#"+e+" .sub-sec-hd").click(function(){$(this).parent().toggleClass("closed")});$("#"+e+" dl").mouseover(function(){$(this).addClass(a)}).mouseout(function(){$(this).removeClass(a)});for(var d=0;d<$("#"+e+" .nswsbb-hvr").length;d++){var b=$("#"+e+" .nswsbb-hvr").eq(d).prevAll(".nswsbb-pt-info:first");b.qtip({content:{text:$("#"+e+" .nswsbb-hvr").eq(d).clone().addClass(a)},position:{viewport:$(window),target:"mouse",adjust:{y:21,method:"shift shift"}},style:{def:false,classes:"nswsbb-hover"}})}$("#"+e+" .nswsbb-hvr").hide()};nswsbb.Patient_Info.prototype.render=function(){var ak=this;var ae=ak.getComponentUid();var am=ak.getTarget();if(typeof(ak.data)=="undefined"){ak.data={RECORD_DATA:{PT_CNT:1,PERSON_ID:117884,ENCNTR_ID:96188,RFV:"Testing for display",MED_SERVICE:"Drug & Alcohol",PRIMARY_PHYS:"",ATTENDING_PHYS:"",ADMITTING_PHYS:"",REFERRING_PHYS:"",ENCOUNTER_GP:"",ENCOUNTER_GP_PHONE:"",PREFERRED_LANG:"",SERVICE_CAT:"",CHIEFCOMPLAINTS:[],ADVANCEDDIRECTIVES:[],MODESOFARRIVAL:[],CONTACT_NAME:"",CONTACT_NUMBER:"",PREVIOUSDOCEVENTID:0,LASTVISITEVENTID:0,LASTVISITPEVENTID:0,LASTVISITDOCMODFLG:0,DOCVIEWERTYPE:"",RESUSCITATION:[{CODE_STATUS:"DONOTRENDERFILTER",CODE_STATUS_DETAILS:""}],CONTACT_LIST:[],ROOM_BED:"",ADMIT_DT_TM:"2014-01-29T05:41:00Z",ADMIT_DATE:"/Date(2014-01-29T05:41:00.000+00:00)/",ADMIT_DIAG:"",ESTIMATED_DEPART_DT_TM:"",ESTIMATED_DEPART_DATE:"/Date(0000-00-00T00:00:00.000+00:00)/",ESTIMATED_DEPART_TZ:-1,ESTIMATED_DEPART_MODIFIED_FLAG:0,ESTIMATED_DEPART_EVENTID:0,MULT_VISIT_TYPE_IND:0,VISIT_LIST:[],ACTIVITY_ORDER_DISP:"",ACTIVITY_ORDER:"",DIET_ORDER_DISP:"",DIET:"",PRSNL:[],STATUS_DATA:{STATUS:"S",SUBEVENTSTATUS:[{OPERATIONNAME:"",OPERATIONSTATUS:"",TARGETOBJECTNAME:"",TARGETOBJECTVALUE:""}]},TREATMENT_ADDRESS:"--",HOME_PHONE_CD:170,MOBILE_PHONE_CD:180,ABORIG_STATUS:{CD:9012301,DISP:"Neither Aboriginal nor Torres Strait"},HOME_PHONE:"(87) 8787-8878",MOBILE_PHONE:"0321 182 182",CALL_INSTRUCTION:"checking for display",PREF_CONT_METHOD:"Telephone",CALD_STATUS:"--",CDM_VAL:"--",TADDRESS:[{STREET1:"35 Victoria Ave",STREET2:"",STREET3:"",STREET4:"",CITY:"CHATSWOOD",STATE:"NSW",COUNTRY:"Australia",ZIPCODE:"2067"}],CARER:{PERSON_ID:0,NAME:"--",ADDRESS:[{STREET1:"",STREET2:"",STREET3:"",STREET4:"",CITY:"",STATE:"",COUNTRY:"",ZIPCODE:""}],HOME_PHONE:"--",MOBILE_PHONE:"--"},PERSON_RESP:{RESP_NAME:"",RESP_PHONE:"",RESP_RELTN:""},INTERP_REQ:{IS_REQUIRED:1,LANG_CD:9014557,LANG_DISP:"Hindi",NATIONALITY_CD:9342792,NATIONALITY_DISP:"Greenland",INTERP_TYPE:"Hindi"},MENTAL_HEALTH:{CD:9340967,STATUS:"MHAs.143(1)(a) Breach CTO Ill",CHANGE_DT_TM:"2014-01-29T13:00:00Z",EXPIRY_DT_TM:"2015-01-23T13:00:00Z"},HOME_RISK:{EVENT_ID:0,CD:0,ASSESSMENT:"",DT_TM:""},RELATIONSHIPS:[{NAME:"brownie, jane",RELATIONSHIP:"MOTHER",MRN:"",PERSONID:117903}]}}}var ab=ak.data.ALLDATA.RECORD_DATA;var N;var aJ;if(typeof ak.options.app_name=="undefined"||ak.options.app_name==""||ak.options.app_name=="EMR"){N=ak.data.ALLDATA.OPTIONS;aJ="EMR"}else{N=nswsbb.Patient_Info.option_choc;aJ="CHOC"}var g=nswsbb.i18n.discernabu.patinfo_o1;var af="N";if(ab.INTERP_REQ.IS_REQUIRED==1){af="Y ";if(ab.INTERP_REQ.INTERP_TYPE!=""){af+="("+ab.INTERP_REQ.INTERP_TYPE+")"}}var aV=[];ak.setProperty("headerSubTitle","");aV.push("<div class='","content-body","'>");if(aJ==="EMR"){var aL=N;var C=[];var an="";var B=g.NO_RESULTS_FOUND;var aU=g.NO_RESULTS_FOUND;var J=g.NO_RESULTS_FOUND;var ah=g.NO_RESULTS_FOUND;var K=g.NO_RESULTS_FOUND;var aj=g.NO_RESULTS_FOUND;var I=g.NO_RESULTS_FOUND;var aD=g.NO_RESULTS_FOUND;var M=g.NO_RESULTS_FOUND;var E=g.NO_RESULTS_FOUND;var aH=g.NO_RESULTS_FOUND;var A=g.NO_RESULTS_FOUND;var aE=0;var q=new Date();var w=5;var T;var z;if(typeof MPAGE_LOCALE=="undefined"||MPAGE_LOCALE==null){z=new mp_formatter.DateTimeFormatter(new mp_formatter.Locale(MPAGE_LC.en_AU))}else{z=new mp_formatter.DateTimeFormatter(MPAGE_LOCALE)}var aG=new Date();var Y=ab.VISIT_LIST.length;var ad=ab.MULT_VISIT_TYPE_IND;if(ab.RFV!=""){B=ab.RFV}if(ab.ROOM_BED!=""){aU=ab.ROOM_BED}if(ab.ADMIT_DT_TM!=""){ah=ab.ADMIT_DT_TM;q.setISO8601(ah);ah=z.format(q,mp_formatter.DateTimeFormatter.FULL_DATE_2YEAR)}if(ab.PRIMARY_PHYS!=""){K=ab.PRIMARY_PHYS}if(ab.ATTENDING_PHYS!=""){aj=ab.ATTENDING_PHYS}if(ab.ADMITTING_PHYS!=""){I=ab.ADMITTING_PHYS}if(ab.REFERRING_PHYS!=""){aD=ab.REFERRING_PHYS}if(ab.MED_SERVICE!=""){M=ab.MED_SERVICE}if(ab.PERSON_RESP.RESP_NAME!=""){aH=ab.PERSON_RESP.RESP_NAME}if(ab.PERSON_RESP.RESP_PHONE!=""){A=ab.PERSON_RESP.RESP_PHONE}if(ab.ESTIMATED_DEPART_DT_TM!=null&&ab.ESTIMATED_DEPART_DT_TM!=""){var V=new Date();V.setISO8601(ab.ESTIMATED_DEPART_DATE);var aP=new Date(1900,0,1,0,0,0,0);if(V>aP){E=z.formatISO8601(ab.ESTIMATED_DEPART_DT_TM,mp_formatter.DateTimeFormatter.FULL_DATE_TIME_2YEAR)}else{E=ab.ESTIMATED_DEPART_DT_TM}}if(aL.CHIEF_COMPLAINT_CODES!=""){var c="<dd class='nswsbb-pt-detail'><span>"+g.NO_RESULTS_FOUND+"</span></dd>";if(ab.CHIEFCOMPLAINTS.length>0){var at=ab.CHIEFCOMPLAINTS[0].CHIEFCOMPLAINT;if(at>""){C=[];var ay=(ab.CHIEFCOMPLAINTS[0].MODIFIED_FLAG>0)?"<span class='res-modified'>&nbsp;</span>":"";var aW=ab.CHIEFCOMPLAINTS[0].EVENTID;var e=nswsbb.ptEventViewerLink(ak.getProperty("personId")+".0",aW,at);C.push("<dd class='nswsbb-pt-detail'><span>",e,"</span>",ay,"</dd>");c=C.join("")}}aV.push("<dl class='nswsbb-pt-info'><dt class='nswsbb-pt-label'><span>",g.CHIEF_COMPLAINT,":</span></dt>",c,"</dl>")}if(aL.IS_RFV_DISPLAY==="true"){aV.push("<dl class='nswsbb-pt-info'><dt class='nswsbb-pt-label'><span>",g.RFV,":</span></dt><dd class='nswsbb-pt-detail'><span>",B,"</span></dd></dl>")}if(aL.IS_PRIMARY_PHYS_DISPLAY==="true"){aV.push("<dl class='nswsbb-pt-info'><dt  class='nswsbb-pt-label'><span>",g.PRIM_PHYS,":</span></dt><dd class='nswsbb-pt-detail'><span>",K,"</span></dd></dl>")}if(aL.IS_ATTENDING_PHYS_DISPLAY==="true"){aV.push("<dl class='nswsbb-pt-info'><dt  class='nswsbb-pt-label'><span>",g.ATTEND_PHYS,":</span></dt><dd class='nswsbb-pt-detail'><span>",aj,"</span></dd></dl>")}if(aL.IS_ADMITTING_PHYS_DISPLAY==="true"){aV.push("<dl class='nswsbb-pt-info'><dt  class='nswsbb-pt-label'><span>",g.ADMIT_PHYS,":</span></dt><dd class='nswsbb-pt-detail'><span>",I,"</span></dd></dl>")}if(aL.IS_REFERRING_PHYS_DISPLAY==="true"){aV.push("<dl class='nswsbb-pt-info'><dt  class='nswsbb-pt-label'><span>",g.REFER_PHYS,":</span></dt><dd class='nswsbb-pt-detail'><span>",aD,"</span></dd></dl>")}if(aL.IS_MEDICAL_SERVICE_DISPLAY==="true"){aV.push("<dl class='nswsbb-pt-info'><dt  class='nswsbb-pt-label'><span>",g.SERVICE,":</span></dt><dd class='nswsbb-pt-detail'><span>",M,"</span></dd></dl>")}if(aL.IS_ROOM_BED_DISPLAY==="true"){aV.push("<dl class='nswsbb-pt-info'><dt class='nswsbb-pt-label'><span>",g.ROOM_BED,":</span></dt><dd class='nswsbb-pt-detail'><span>",aU,"</span></dd></dl>")}if(aL.IS_ADMIT_DATE_DISPLAY==="true"){aV.push("<dl class='nswsbb-pt-info'><dt class='nswsbb-pt-label'><span>",g.ADMIT_DATE,":</span></dt><dd class='nswsbb-pt-detail'><span>",ah,"</span></dd></dl>")}if(aL.ESTIMATED_DISCHARGE_DATE_CODES!=""){var ay=(ab.ESTIMATED_DEPART_MODIFIED_FLAG>0)?"<span class='res-modified'>&nbsp;</span>":"";var aW=ab.ESTIMATED_DEPART_EVENTID;if(aW>0){var e=nswsbb.ptEventViewerLink(ak.getProperty("personId")+".0",aW,E)}else{var e=E}aV.push("<dl class='nswsbb-pt-info'><dt class='nswsbb-pt-label'><span>",g.TARGETED_DISCHARGE_DATE,":</span></dt><dd class='nswsbb-pt-detail'><span>",e,"</span>",ay,"</dd></dl>")}if(aL.MODE_OF_ARRIVAL!=""){var ap="<dd class='nswsbb-pt-detail'><span>"+g.NO_RESULTS_FOUND+"</span></dd>";if(ab.MODESOFARRIVAL.length>0){var aB=ab.MODESOFARRIVAL[0].MODEOFARRIVAL;if(aB>""){C=[];var ay=(ab.MODESOFARRIVAL[0].MODIFIED_FLAG>0)?"<span class='nswsbb-res-modified'>&nbsp;</span>":"";var aW=ab.MODESOFARRIVAL[0].EVENTID;var e=nswsbb.ptEventViewerLink(ak.getProperty("personId")+".0",aW,aB);C.push("<dd class='nswsbb-pt-detail'><span>",e,"</span>",ay,"</dd>");ap=C.join("")}}aV.push("<dl class='nswsbb-pt-info'><dt class='nswsbb-pt-label'><span>",g.MODE_OF_ARRVAL,":</span></dt>",ap,"</dl>")}if(aL.ADVANCED_DIRECTIVES!=""){var ar="<dd class='nswsbb-pt-detail'><span>"+g.NO_RESULTS_FOUND+"</span></dd>";if(ab.ADVANCEDDIRECTIVES.length>0){var ax=ab.ADVANCEDDIRECTIVES[0].ADVANCEDIRECTIVE;if(ax>""){C=[];var ay=(ab.ADVANCEDDIRECTIVES[0].MODIFIED_FLAG>0)?"<span class='res-modified'>&nbsp;</span>":"";var aW=ab.ADVANCEDDIRECTIVES[0].EVENTID;var e=nswsbb.ptEventViewerLink(ak.getProperty("personId")+".0",aW,ax);C.push("<dd class='nswsbb-pt-detail'><span>",e,"</span>",ay,"</dd>");ar=C.join("")}}aV.push("<dl class='nswsbb-pt-info'><dt class='nswsbb-pt-label'><span>",g.ADVANCE_DIRECTIVE,":</span></dt>",ar,"</dl>")}var F;if(ab.ENCOUNTER_GP&&ab.ENCOUNTER_GP_PHONE){F=ab.ENCOUNTER_GP+" ("+ab.ENCOUNTER_GP_PHONE+")"}else{if(ab.ENCOUNTER_GP&&!ab.ENCOUNTER_GP_PHONE){F=ab.ENCOUNTER_GP+" ("+g.NO_RESULTS_FOUND+")"}else{F=g.NO_RESULTS_FOUND}}aV.push("<dl class='nswsbb-pt-info'><dt class='nswsbb-pt-label'><span>","GP(GP Phone Number)",":</span></dt><dd class='nswsbb-pt-detail'><span>",F,"</span></dd></dl>");if(Y>0){T="";var ay=(ab.LASTVISITDOCMODFLAG>0)?"<span class='res-modified'>&nbsp;</span>":"";if(ab.VISIT_LIST[0].UTCDATE!=""){var aF=ab.VISIT_LIST[0].UTCDATE;aG.setISO8601(aF);T=z.format(aG,mp_formatter.DateTimeFormatter.FULL_DATE_2YEAR)}if(ab.DOCVIEWERTYPE==="AP"){if((ab.LASTVISITEVENTID>0)&&(ab.LASTVISITPEVENTID>0)){aV.push("<dl class='nswsbb-pt-info'><dt class='nswsbb-pt-label'><span>",g.LAST_VISIT,":</span></dt><dd class='nswsbb-pt-detail'><span>",MP_Util.CreateClinNoteLink(ak.getProperty("personId"),ak.getProperty("encounterId"),ab.LASTVISITEVENTID,T+"&nbsp("+ab.VISIT_LIST[0].TYPE+"&nbsp"+ab.VISIT_LIST[0].LOC+")",ab.DOCVIEWERTYPE,ab.LASTVISITPEVENTID),"</span></dd></dl>")}else{aV.push("<dl class='nswsbb-pt-info'><dt class='nswsbb-pt-label'><span>",g.LAST_VISIT,":</span></dt><dd class='nswsbb-pt-detail'><span>",T,"&nbsp","(",ab.VISIT_LIST[0].TYPE,"&nbsp",ab.VISIT_LIST[0].LOC,")","</span>",ay,"</dd></dl>")}}else{if((ab.DOCVIEWERTYPE!=="STANDARD")&&(ab.LASTVISITEVENTID>0)){aV.push("<dl class='nswsbb-pt-info'><dt class='nswsbb-pt-label'><span>",g.LAST_VISIT,":</span></dt><dd class='nswsbb-pt-detail'><span>",MP_Util.CreateClinNoteLink(ak.getProperty("personId"),ak.getProperty("encounterId"),ab.LASTVISITEVENTID,T+"&nbsp("+ab.VISIT_LIST[0].TYPE+"&nbsp"+ab.VISIT_LIST[0].LOC+")",ab.DOCVIEWERTYPE,ab.LASTVISITPEVENTID),"</span></dd></dl>")}else{aV.push("<dl class='nswsbb-pt-info'><dt class='nswsbb-pt-label'><span>",g.LAST_VISIT,":</span></dt><dd class='nswsbb-pt-detail'><span>",T,"&nbsp","(",ab.VISIT_LIST[0].TYPE,"&nbsp",ab.VISIT_LIST[0].LOC,")","</span>",ay,"</dd></dl>")}}if(Y>1){aV.push("<h4 class='det-hd'><span>",g.DETAILS,"</span></h4><div class='nswsbb-hvr'><dl class='pt-det'>");for(var aa=0,U=ab.VISIT_LIST.length;aa<U;aa++){if(ab.VISIT_LIST[0].UTCDATE!=""){var aM=ab.VISIT_LIST[aa].UTCDATE;aG.setISO8601(aM);aV.push("<dd><span>",z.format(aG,mp_formatter.DateTimeFormatter.FULL_DATE_4YEAR),"&nbsp","(",ab.VISIT_LIST[aa].TYPE,"&nbsp",ab.VISIT_LIST[aa].LOC,")","</span></dd><br/>")}}aV.push("</dl></div>")}}else{aV.push("<dl class='nswsbb-pt-info'><dt class='nswsbb-pt-label'><span>",g.LAST_VISIT,":</span></dt><dd class='nswsbb-pt-detail'><span>",g.NO_RESULTS_FOUND,"</span></dd></dl>")}var aq=ab.ABORIG_STATUS.DISP?ab.ABORIG_STATUS.DISP:g.NO_RESULTS_FOUND;aV.push("<dl class='nswsbb-pt-info'><dt class='nswsbb-pt-label'><span>","Aboriginality",":</span></dt><dd class='nswsbb-pt-detail'><span>",aq,"</span></dd></dl>");aV.push("<dl class='nswsbb-pt-info'><dt class='nswsbb-pt-label'><span>","Interpreter required",":</span></dt><dd class='nswsbb-pt-detail'><span>",af,"</span></dd></dl>");var au=ab.PREFERRED_LANG?ab.PREFERRED_LANG:g.NO_RESULTS_FOUND;aV.push("<dl class='nswsbb-pt-info'><dt class='nswsbb-pt-label'><span>","Preferred Language",":</span></dt><dd class='nswsbb-pt-detail'><span>",au,"</span></dd></dl>");var aA=aL.IS_SERVICE_CATEGORY_DISPLAY;if((typeof aA==="undefined")||(aA===true)){var Q=ab.SERVICE_CAT?ab.SERVICE_CAT:g.NO_RESULTS_FOUND;aV.push("<dl class='nswsbb-pt-info'><dt class='nswsbb-pt-label'><span>",g.SERVICE_CAT,":</span></dt><dd class='nswsbb-pt-detail'><span>",Q,"</span></dd></dl>")}if(aL.RESUS_ORDER_CODES!=""){var W="";var O="";for(i=0,k=ab.RESUSCITATION.length;i<k;i++){if(i>0){W+=", "}W+=ab.RESUSCITATION[i].CODE_STATUS;O=ab.RESUSCITATION[i].CODE_STATUS_DETAILS}if(W==""){W=g.NO_RESULTS_FOUND;O=""}aV.push("<dl class='nswsbb-pt-info'><dt  class='nswsbb-pt-label'><span>",g.CODE_STATUS,":</span></dt><dd class='nswsbb-pt-detail'><span class='res-severe'>",W,"</span></dd></dl>");if(O!=""){aV.push("<h4 class='det-hd'><span>",g.DETAILS,"</span></h4><div class='nswsbb-hvr'><dl class='pt-det'><dd><span>",O,"</span></dd></dl></div>")}}if(aL.DIET_ORDER!=""||aL.PATIENT_ACTIVITY_ORDER!=""){if(!ab.DIET&&!ab.ACTIVITY_ORDER){aV.push("<div class='sub-sec closed'><h3 class='sub-sec-hd'><span class='sub-sec-hd-tgl'>-</span><span class='sub-sec-title'>",g.DIET_ACTIVITY," (0) </span></h3><div class='sub-sec-content'><span class='res-none'>",g.NO_RESULTS_FOUND,"</span></div></div>")}else{var aI=(ab.DIET&&ab.ACTIVITY_ORDER)?2:1;aV.push("<div class='sub-sec'><h3 class='sub-sec-hd'><span class='sub-sec-hd-tgl'>-</span><span class='sub-sec-title'>",g.DIET_ACTIVITY," (",aI,")</span></h3><div class='sub-sec-content'>");if(ab.DIET){aV.push("<dl class='nswsbb-pt-info'><dt class='nswsbb-pt-label'><span>",ab.DIET,"</span></dt><dd class='nswsbb-pt-detail'><span>",ab.DIET_ORDER_DISP,"</span></dd></dl>")}if(ab.ACTIVITY_ORDER){aV.push("<dl class='nswsbb-pt-info'><dt class='nswsbb-pt-label'><span>",ab.ACTIVITY_ORDER,"</span></dt><dd class='nswsbb-pt-detail'><span>",ab.ACTIVITY_ORDER_DISP,"</span></dd></dl>")}aV.push("</div></div>")}}if(aL.IS_RESPONSIBLE_PERSON_DISPLAY==="true"){if(ab.PERSON_RESP.RESP_NAME=="--"&&ab.PERSON_RESP.RESP_PHONE=="--"){aV.push("<div class='sub-sec closed'><h3 class='sub-sec-hd'><span class='sub-sec-hd-tgl'>-</span><span class='sub-sec-title'>",g.RESP_PERSON," (0) </span></h3><div class='sub-sec-content'><span class='res-none'>",g.NO_RESULTS_FOUND,"</span></div></div>")}else{var aI=1;aV.push("<div class='sub-sec'><h3 class='sub-sec-hd'><span class='sub-sec-hd-tgl'>-</span><span class='sub-sec-title'>",g.RESP_PERSON," (",aI,")</span></h3><div class='sub-sec-content'>");aV.push("<dl class='nswsbb-pt-info'><dt  class='nswsbb-pt-label'><span>",aH,":</span></dt><dd class='nswsbb-pt-detail'><span>",A,"</span></dd></dl>");aV.push("</div></div>")}}if(aL.IS_EMERGENCY_CONTACTS_DISPLAY==="true"){var o=ab.CONTACT_LIST;if(ab.EMC_CONTACT_CNT>0){aV.push("<div class='sub-sec'><h3 class='sub-sec-hd'><span class='sub-sec-hd-tgl'>-</span><span class='sub-sec-title'>",g.EMER_CONTACT," (",ab.EMC_CONTACT_CNT,")</span></h3><div class='sub-sec-content'>");for(var aa=0,U=o.length;aa<U;aa++){if(o[aa].CONTACT_TYPE=="EMC"){aV.push("<dl class='nswsbb-pt-info'><dt class='nswsbb-pt-label'><span>",o[aa].NAME,":</span></dt><dd class='nswsbb-pt-detail'><span>",o[aa].NUMBER,"</span></dd></dl>");if(o[aa].CONTACT_PHONE.length>0){aV.push("<h4 class='det-hd'><span>",g.DETAILS,"</span></h4><div class='nswsbb-hvr'><dl class='pt-det'>")}for(var R=0,P=o[aa].CONTACT_PHONE.length;R<P;R++){aV.push("<dd><span>",o[aa].CONTACT_PHONE[R].NUMBER,"</span></dd><br/>");if(o[aa].CONTACT_PHONE[R].UPDATE_DT_TM&&o[aa].CONTACT_PHONE[R].UPDATE_DT_TM!==""){var ai=o[aa].CONTACT_PHONE[R].UPDATE_DT_TM;var aN=new Date();aN.setCustISO8601(ai);ai=z.format(aN,mp_formatter.DateTimeFormatter.FULL_DATE_4YEAR);if(R<P-1){aV.push("<dd><span>","Last Updated Date: "+ai,"</span></dd><br/></br>")}else{aV.push("<dd><span>","Last Updated Date: "+ai,"</span></dd><br/>")}}}aV.push("</dl></div>")}}aV.push("</div></div>")}else{aV.push("<div class='sub-sec closed'><h3 class='sub-sec-hd'><span class='sub-sec-hd-tgl'>-</span><span class='sub-sec-title'>",g.EMER_CONTACT," (0)</span></h3><div class='sub-sec-content'><span class='res-none'>",g.NO_RESULTS_FOUND,"</span></div></div>")}}}else{if(aJ==="CHOC"){var s=N.label_names;if(ab.MENTAL_HEALTH.CHANGE_DT_TM!=""){ab.MENTAL_HEALTH.CHANGE_DT_TM=new Date().setCustISO8601(ab.MENTAL_HEALTH.CHANGE_DT_TM).formatString("longdate");ab.MENTAL_HEALTH.CHANGE_DT_TM=" ("+ab.MENTAL_HEALTH.CHANGE_DT_TM+")"}if(ab.MENTAL_HEALTH.EXPIRY_DT_TM!=""){ab.MENTAL_HEALTH.EXPIRY_DT_TM=new Date().setCustISO8601(ab.MENTAL_HEALTH.EXPIRY_DT_TM).formatString("longdate");ab.MENTAL_HEALTH.EXPIRY_DT_TM=" ("+ab.MENTAL_HEALTH.EXPIRY_DT_TM+")"}if(ab.OUT_OF_HOME_CARE.CHANGE_DT_TM!=""){ab.OUT_OF_HOME_CARE.CHANGE_DT_TM=new Date().setCustISO8601(ab.OUT_OF_HOME_CARE.CHANGE_DT_TM).formatString("longdate");ab.OUT_OF_HOME_CARE.CHANGE_DT_TM=" ("+ab.OUT_OF_HOME_CARE.CHANGE_DT_TM+")"}if(ab.OUT_OF_HOME_CARE.EXPIRY_DT_TM!=""){ab.OUT_OF_HOME_CARE.EXPIRY_DT_TM=new Date().setCustISO8601(ab.OUT_OF_HOME_CARE.EXPIRY_DT_TM).formatString("longdate");ab.OUT_OF_HOME_CARE.EXPIRY_DT_TM=" ("+ab.OUT_OF_HOME_CARE.EXPIRY_DT_TM+")"}if(ab.HOME_RISK.CD>0){var aO=new Date().setCustISO8601(ab.HOME_RISK.DT_TM).formatString("longdatetime");var aS=ak.getProperty("personId"),D=ak.getProperty("encounterId");if(ab.HOME_RISK.EVENT_ID>0){ab.HOME_RISK.ASSESSMENT=["<a href=\"javascript:MPAGES_EVENT('CLINICALNOTE','",aS,"|",D,"|",ab.HOME_RISK.EVENT_ID,"|",s.home_env_lbl,"|31|CLINNOTES|341|CLINNOTES|1')\">Completed (",aO,")</a>"].join("")}else{ab.HOME_RISK.ASSESSMENT=["Completed (",aO,")"].join("")}}else{ab.HOME_RISK.ASSESSMENT="Not Completed"}var d="--";if(ab.TADDRESS.length>0){var al=ab.TADDRESS[0];var t=(al.STREET2!=""||al.STREET3!=""||al.STREET4!="")?[" (",al.STREET2," ",al.STREET3," ",al.STREET4,")"].join(""):"";if(t==""&&al.STREET1==""&&al.CITY==""&&al.STATE==""&&al.ZIPCODE==""&&al.COUNTRY==""){d="--"}else{d=[al.STREET1,t,", ",al.CITY," ",al.STATE," ",al.ZIPCODE,", ",al.COUNTRY].join("")}}else{d="--"}var H=d;var u=ab.HOME_PHONE;var n=ab.MOBILE_PHONE;var aw=ab.ABORIG_STATUS.DISP;var p=ab.INTERP_REQ.NATIONALITY_DISP;var ag=ab.INTERP_REQ.LANG_DISP;var b=ab.CALD_STATUS;var aR=ab.MENTAL_HEALTH.STATUS;var G=ab.MENTAL_HEALTH.CHANGE_DT_TM;var S=ab.MENTAL_HEALTH.EXPIRY_DT_TM;var v=ab.HOME_RISK.ASSESSMENT;var h=ab.MED_SERVICE;var az=ab.OUT_OF_HOME_CARE.STATUS;var aQ=ab.OUT_OF_HOME_CARE.CHANGE_DT_TM;var L=ab.OUT_OF_HOME_CARE.EXPIRY_DT_TM;if(H==""){H="--"}aV.push("<dl class='nswsbb-pt-info'><dt class='nswsbb-pt-label'>",s.treatment_address_lbl,":</dt><dd class='nswsbb-pt-detail'>",H,"</dd></dl>");if(u==""){u="--"}aV.push("<dl class='nswsbb-pt-info'><dt class='nswsbb-pt-label'>",s.home_phone_lbl,":</dt><dd class='nswsbb-pt-detail'>",u,"</dd></dl>");if(n==""){n="--"}aV.push("<dl class='nswsbb-pt-info'><dt class='nswsbb-pt-label'>",s.mobile_phone_lbl,":</dt><dd class='nswsbb-pt-detail'>",n,"</dd></dl>");aV.push("<dl class='nswsbb-pt-info'><dt class='nswsbb-pt-label'>Home Phone Instruction:</dt><dd class='nswsbb-pt-detail'>",ab.HOME_PHONE_INSTRUCTION,"</dd></dl>");aV.push("<dl class='nswsbb-pt-info'><dt class='nswsbb-pt-label'>Contact Instruction:</dt><dd class='nswsbb-pt-detail'>",ab.CONTACT_INSTRUCTION,"</dd></dl>");aV.push("<dl class='nswsbb-pt-info'><dt class='nswsbb-pt-label'>Preferred Contact Method:</dt><dd class='nswsbb-pt-detail'>",ab.PREF_CONT_METHOD,"</dd></dl>");aV.push("<dl class='nswsbb-pt-info'><dt class='nswsbb-pt-label'>",s.aboriginality_status_lbl,":</dt><dd class='nswsbb-pt-detail'>",aw,"</dd></dl>");aV.push("<dl class='nswsbb-pt-info'><dt class='nswsbb-pt-label'>",s.interp_req_lbl,":</dt><dd class='nswsbb-pt-detail'>",af,"</dd></dl>");if(p==""){p="--"}aV.push("<dl class='nswsbb-pt-info'><dt class='nswsbb-pt-label'>",s.nationality_lbl,":</dt><dd class='nswsbb-pt-detail'>",p,"</dd></dl>");if(ag==""){ag="--"}aV.push("<dl class='nswsbb-pt-info'><dt class='nswsbb-pt-label'>",s.language_lbl,":</dt><dd class='nswsbb-pt-detail'>",ab.PREFERRED_LANG,"</dd></dl>");if(b==""){b="--"}aV.push("<dl class='nswsbb-pt-info'><dt class='nswsbb-pt-label'>",s.cald_stat_lbl,":</dt><dd class='nswsbb-pt-detail'>",b,"</dd></dl>");if(aR==""){aR="--"}aV.push("<dl class='nswsbb-pt-info'><dt class='nswsbb-pt-label'>",s.mental_health_lbl,":</dt><dd class='nswsbb-pt-detail'>",aR,S,"</dd></dl>");if(v==""){v="--"}aV.push("<dl class='nswsbb-pt-info'><dt class='nswsbb-pt-label'>",s.home_env_lbl,":</dt><dd class='nswsbb-pt-detail'>",v,"</dd></dl>");var X=ab.TEAMS||[];var r=X.length;var X=ab.TEAMS||[];var r=X.length;var ao="--";if(r===1){ao=X[0].PERSONNEL_NAME_FIRST}else{if(r===2){ao=X[0].PERSONNEL_NAME_FIRST+" ; "+X[1].PERSONNEL_NAME_FIRST}}aV.push("<dl class='nswsbb-pt-info'><dt class='nswsbb-pt-label'>",s.associated_group_lbl,":</dt><dd class='nswsbb-pt-detail'>",ao,"</dd></dl>");var aT=0;var a=0;for(var R=0;R<ab.RELATIONSHIPS.length;R++){var ac=ab.RELATIONSHIPS[R];if(ac.RELATIONSHIP=="CHILD"&&a==0){a+=1;aV.push("<dl class='nswsbb-pt-info'><dt class='nswsbb-pt-label'>Children</dt><dd class='nswsbb-pt-detail'>",ac.NAME,"&nbsp;&nbsp;<span class='nswsbb-pt-label''>MRN:&nbsp;</span>",ac.MRN,"</dd></dl>");aT=1}else{if(ac.RELATIONSHIP=="CHILD"){aV.push("<dl class='nswsbb-pt-info'><dt></dt><dd class='nswsbb-pt-detail'>",ac.NAME,"&nbsp;&nbsp;<span class='nswsbb-pt-label''>MRN:&nbsp;</span>",ac.MRN,"</dd></dl>")}}}if(aT==0){aV.push("<dl class='nswsbb-pt-info'><dt class='nswsbb-pt-label'>Children</dt><dd class='nswsbb-pt-detail'>--</dd></dl>")}aV.push("<dl class='nswsbb-pt-info'><dt class='nswsbb-pt-label'>Chronic Disease for Aboriginal Health</dt><dd class='nswsbb-pt-detail'>",ab.CDM_VAL,"</dd></dl>");var aK=$.grep(ab.RELATIONSHIPS,function(j){return j.RELATIONSHIP=="MOTHER"})[0];aV.push("<div class='sub-sec closed'><h3 class='sub-sec-hd'><span class='sub-sec-hd-tgl'>-</span><span class='sub-sec-title'>");aV.push(s.mother.subsec_lbl);if(typeof aK==="undefined"){aV.push(" (0)");aV.push("</span></h3><div class='sub-sec-content'><span class='res-none'>",g.NO_RESULTS_FOUND,"</span></div></div>")}else{aV.push(" (",1,")");aV.push("</span></h3><div class='sub-sec-content'>");aV.push("<dl class='nswsbb-pt-info'><dt class='nswsbb-pt-label'>",s.mother.name_lbl,":</dt><dd class='nswsbb-pt-detail'>",aK.NAME,"</dd></dl>");aV.push("<dl class='nswsbb-pt-info'><dt class='nswsbb-pt-label'>",s.mother.mrn_lbl,":</dt><dd class='nswsbb-pt-detail'>",Z(aK.MRN),"</dd></dl>");aV.push("<dl class='nswsbb-pt-info'><dt class='nswsbb-pt-label'>",s.mother.address_lbl,":</dt><dd class='nswsbb-pt-detail'>",aC(aK.ADDRESS[0]),"</dd></dl>");aV.push("<dl class='nswsbb-pt-info'><dt class='nswsbb-pt-label'>",s.home_phone_lbl,":</dt><dd class='nswsbb-pt-detail'>",Z(aK.HOME_PHONE),"</dd></dl>");aV.push("<dl class='nswsbb-pt-info'><dt class='nswsbb-pt-label'>",s.mobile_phone_lbl,":</dt><dd class='nswsbb-pt-detail'>",Z(aK.MOBILE_PHONE),"</dd></dl>");aV.push("</div></div>")}aV.push("<div class='sub-sec closed'><h3 class='sub-sec-hd'><span class='sub-sec-hd-tgl'>-</span><span class='sub-sec-title'>");aV.push(s.carer.subsec_lbl);var av=0;var f=aC(ab.CARER.ADDRESS[0]);if(ab.CARER.NAME!=="--"||f!=="--"||ab.CARER.HOME_PHONE!=="--"||ab.CARER.MOBILE_PHONE!=="--"){av=1}if(av===0){aV.push(" (0)");aV.push("</span></h3><div class='sub-sec-content'><span class='res-none'>",g.NO_RESULTS_FOUND,"</span></div></div>")}else{aV.push(" (",av,")");aV.push("</span></h3><div class='sub-sec-content'>");aV.push("<dl class='nswsbb-pt-info'><dt class='nswsbb-pt-label'>",s.carer.name_lbl,":</dt><dd class='nswsbb-pt-detail'>",ab.CARER.NAME,"</dd></dl>");aV.push("<dl class='nswsbb-pt-info'><dt class='nswsbb-pt-label'>",s.carer.address_lbl,":</dt><dd class='nswsbb-pt-detail'>",f,"</dd></dl>");aV.push("<dl class='nswsbb-pt-info'><dt class='nswsbb-pt-label'>",s.home_phone_lbl,":</dt><dd class='nswsbb-pt-detail'>",Z(ab.CARER.HOME_PHONE),"</dd></dl>");aV.push("<dl class='nswsbb-pt-info'><dt class='nswsbb-pt-label'>",s.mobile_phone_lbl,":</dt><dd class='nswsbb-pt-detail'>",Z(ab.CARER.MOBILE_PHONE),"</dd></dl>");aV.push("</div></div>")}}}aV.push("</div>");am.innerHTML=aV.join("");function aC(j){var y="--";if(typeof j!=="undefined"){var m=[];var x=[];if(j.STREET1.length>0){m.push(j.STREET1)}if(j.STREET2.length>0){x.push(j.STREET2)}if(j.STREET3.length>0){x.push(j.STREET3)}if(j.STREET4.length>0){x.push(j.STREET4)}if(x.length>0){if(m.length>0){m.push(" ")}m.push("(",x.join(" "),")")}x=[];if(j.CITY.length>0){x.push(j.CITY)}if(j.STATE.length>0){x.push(j.STATE)}if(j.ZIPCODE.length>0){x.push(j.ZIPCODE)}if(x.length>0){if(m.length>0){m.push(", ")}m.push(x.join(" "))}if(j.COUNTRY.length>0){if(m.length>0){m.push(", ")}m.push(j.COUNTRY)}y=m.join("")}return y}function Z(j){if(typeof j==="undefined"||j===""){j="--"}return j}ak.addEventHandlers()};MPage.namespace("cerner.ehealth");cerner.ehealth=function(){};cerner.ehealth.prototype=new MPage.Component();cerner.ehealth.prototype.constructor=MPage.Component;cerner.ehealth.prototype.base=MPage.Component.prototype;cerner.ehealth.name="cerner.ehealth";cerner.ehealth.prototype.cclProgram="ehealth_url_storage";cerner.ehealth.prototype.cclParams=["MINE","personId","encounterId","userId","domain"];cerner.ehealth.prototype.cclDataType="TEXT";cerner.ehealth.option1={domain:"cerner.sesiahs.nswhealth.net"};cerner.ehealth.prototype.init=function(b){var a;var c=[];a=this.options.cclParams;c.push("MINE");c.push(this.getProperty("personId"));c.push(this.getProperty("encounterId"));c.push(this.getProperty("userId"));c.push(this.options.domain);this.cclParams=c};cerner.ehealth.prototype.render=function(){var b=[];var c=this.getTarget();if($.trim(this.data)!=""){var a='javascript:APPLINK( 100 , "'+this.data+'" ,"");';b.push("<a  id ='ehealth_link' onclick='",a,"'> eHealth</a>");c.innerHTML=b.join("")}else{c.innerHTML="No additional information available"}};MPage.namespace("nswsbb.graphics");nswsbb.graphics=function(){};nswsbb.graphics.prototype=new MPage.Component();nswsbb.graphics.prototype.constructor=MPage.Component;nswsbb.graphics.prototype.base=MPage.Component.prototype;nswsbb.graphics.name="nswsbb.graphics";nswsbb.graphics.option_falls_assessment={reprottype:"F"};nswsbb.graphics.option_pressure_injury={reprottype:"P"};nswsbb.graphics.option_mst={reprottype:"M"};nswsbb.graphics.option_admission_assessment={reprottype:"A"};nswsbb.graphics.option_weight_complete_assessment={reprottype:"W"};nswsbb.graphics.option_height_complete_assessment={reprottype:"H"};nswsbb.graphics.prototype.init=function(a){};nswsbb.graphics.prototype.addEventHandlers=function(a){};nswsbb.graphics.prototype.render=function(){var j=this;var a=[];var D=j.getTarget();var p=j.getComponentUid();var c=j.getProperty("userId");var w='"'+j.options.reprottype+'"';var v,d;var B,m;var h=p+"-facility";var x=c;var A=x+',"'+h+'"';nswsbb.cclajax("MP_GET_USER_PREFS","GET",false,A,function(F){if(F.RECORD_DATA.PREF_STRING!==""&&!isNaN((parseFloat(F.RECORD_DATA.PREF_STRING)))){v=F.RECORD_DATA.PREF_STRING}},j);var s=p+"-ward";var t=x+',"'+s+'"';nswsbb.cclajax("MP_GET_USER_PREFS","GET",false,t,function(F){if(F.RECORD_DATA.PREF_STRING!==""&&!isNaN((parseFloat(F.RECORD_DATA.PREF_STRING)))){d=F.RECORD_DATA.PREF_STRING}},j);var y=$("#"+p).width();a.push('<div id="content">');a.push('<span class="title">Current status:&nbsp</span><span class="facility-name"></span>');a.push('<div class="demo-container">');a.push('<div class="placeholder" class="demo-placeholder" style="height:200px;width:100%"></div>');a.push('<div class="menu">');a.push('<button class="example-1 activate">Ward</button>');a.push('<button class="example-2">Hospital</button>');a.push("</div>");a.push("</div>");a.push("</div>");D.innerHTML=a.join("");var u="<div class='no-setting-prompt'>The filters for this <b>Graph</b> have not been set.<br><br> Please <b>right click</b>, and choose, <b>\"Change Filter\"</b>, to see the filters for this Graph.<br><br>The filters you choose will be stored for your login and redisplayed each time you visit the page.<br><br>The filters are set separately for each of the Analytics components.<br><br>You can change the filters at any time in the future by right clicking.</div>";if(!(v&d)){$("#"+p+" .menu").hide();$("#"+p+" .title").removeClass("error").hide();$("#"+p+" .placeholder").html(u)}else{var o=[];o.push(parseFloat(v));o.push(parseFloat(d));o.push('"'+j.options.reprottype+'"');o.push('"W"');nswsbb.cclajax("855_mp_analytics_data","GET",false,o,function(F){B=F.MAIN_DATA},j)}var r="Complete";var E="Incomplete";var b="green";var g="red";var f=$("#"+p+" .placeholder");if(typeof B!=="undefined"){if(B.STATUS===-1){$("#"+p+" .title").addClass("error").text("Error in getting data to render the graph:"+B.ERROR_MSG);$("#"+p+" .menu").hide();$("#"+p+" .placeholder").html(u)}else{var q=B.WARD_DISP;var n=parseInt(B.WARD_CURR);var C=[{label:r,data:n},{label:E,data:100-n}];$("#"+p+" .title").removeClass("error").text("Current Status:");$("#"+p+" .title").show();$("#"+p+" .facility-name").text(q);z(f,C);$("#"+p+" .menu button").click(function(){$("#"+p+" .menu button").removeClass("activate");$(this).addClass("activate");var I=$(this).text().toUpperCase();if(I==="HOSPITAL"){if(typeof m==="undefined"){var F=[];F.push(parseFloat(v));F.push(parseFloat(d));F.push('"'+j.options.reprottype+'"');F.push('"F"');nswsbb.cclajax("855_mp_analytics_data","GET",false,F,function(K){m=K.MAIN_DATA},j)}var H=parseInt(m.FAC_CURR);var G=m.FAC_DISP}else{var H=parseInt(B.WARD_CURR);var G=B.WARD_DISP}var J=[{label:r,data:H},{label:E,data:100-H}];f.unbind();$("#"+p+" .facility-name").text(G);z(f,J)})}}$.contextMenu({selector:"#"+p,callback:function(H,G){var F="clicked: "+H},items:{Setting:{name:"Change Filter",icon:"edit",callback:function(O,Q){var F="edit was clicked";var G;nswsbb.cclajax("855_pc_analytics_prompt","GET",false,"",function(R){G=R.MAIN_DATA},j);var L=[];for(var J=0;J<G.FACILITY.length;J++){L.push({FAC_CD:G.FACILITY[J].FAC_CD,FAC_DISP:G.FACILITY[J].FAC_DISP})}nswsbb.cclajax("MP_GET_USER_PREFS","GET",false,A,function(R){if(R.RECORD_DATA.PREF_STRING!==""){v=R.RECORD_DATA.PREF_STRING}},j);nswsbb.cclajax("MP_GET_USER_PREFS","GET",false,t,function(R){if(R.RECORD_DATA.PREF_STRING!==""){d=R.RECORD_DATA.PREF_STRING}},j);var K=[];var N=p+"-facility";K.push("<div>");K.push("<div class='ccl'>");K.push("<span class='ccl-label'>Facility</span>");K.push("<div class='checkbox-list-conainer' id='"+N+"'>");$.each(L,function(R,S){if(S.FAC_CD==parseFloat(v)){K.push("<input type='checkbox' checked value='",S.FAC_CD,"'/><span>",S.FAC_DISP,"</span><br>")}else{K.push("<input type='checkbox' value='",S.FAC_CD,"'/><span>",S.FAC_DISP,"</span><br>")}});K.push("</div>");K.push("</div>");var M=p+"-ward";if(typeof v==="undefined"||isNaN((parseFloat(v)))){v=G.FACILITY[0].FAC_CD}var I=jQuery.grep(G.FACILITY,function(S,R){return(S.FAC_CD==v)});K.push("<div class='ccl'>");K.push("<span class='ccl-label'>Ward</span>");K.push("<div class='checkbox-list-conainer' id='"+M+"'>");$.each(I[0].WARD,function(R,S){if(S.WARD_CD==parseInt(d)){K.push("<input type='checkbox' checked value='",S.WARD_CD,"'/><span>",S.WARD_DISP,"</span><br>")}else{K.push("<input type='checkbox' value='",S.WARD_CD,"'/><span>",S.WARD_DISP,"</span><br>")}});K.push("</div>");K.push("<div>");K.push("</div>");var P={state0:{title:"Setting Of "+j.getProperty("headerTitle"),html:K.join(""),buttons:{Save:true},submit:function(ad,ag,U,ab){var ah=parseFloat($("#"+N).find("input:checked").val());var Y=parseFloat($("#"+M).find("input:checked").val());var R='"'+j.options.reprottype+'"';var af=[ah,Y,R,'"W"'];var X=[ah,Y,R,'"F"'];nswsbb.cclajax("855_mp_analytics_data","GET",false,af,function(ai){B=ai.MAIN_DATA},j);nswsbb.cclajax("855_mp_analytics_data","GET",false,X,function(ai){m=ai.MAIN_DATA},j);ad.preventDefault();if(ag==1){$.prompt.close()}if(m.STATUS===-1){$("#"+p+" .title").addClass("error").text("Error in getting data to render the graph:"+B.ERROR_MSG).show();$("#"+p+" .menu").hide();$("#"+p+" .facility-name").text("");$("#"+p+" .placeholder").html(u)}else{var T=$("#"+p+" .menu button.activate").text().toUpperCase();if(T==="HOSPITAL"){var ae=parseInt(m.FAC_CURR);var S=m.FAC_DISP}else{var ae=parseInt(B.WARD_CURR);var S=B.WARD_DISP}var Z=[{label:r,data:ae},{label:E,data:100-ae}];$("#"+p+" .facility-name").text(S);$("#"+p+" .no-setting-prompt").remove();$("#"+p+" .title").removeClass("error").text("Current Status:").show();$("#"+p+" .menu").show();z(f,Z);var ac=ah;var W=x+',"'+h+'","'+ac+'"';nswsbb.cclajax("MP_MAINTAIN_USER_PREFS","POST",true,W);var V=Y;var aa=x+',"'+s+'","'+V+'"';nswsbb.cclajax("MP_MAINTAIN_USER_PREFS","POST",true,aa);$("#"+p+" .menu button").click(function(){$("#"+p+" .menu button").removeClass("activate");$(this).addClass("activate");var ak=$(this).text().toUpperCase();if(ak==="HOSPITAL"){var aj=parseInt(m.FAC_CURR);var ai=m.FAC_DISP}else{var aj=parseInt(B.WARD_CURR);var ai=B.WARD_DISP}Z=[{label:r,data:aj},{label:E,data:100-aj}];f.unbind();$("#"+p+" .facility-name").text(ai);z(f,Z)})}}}};$.prompt(P);var H=function(){var T=$("#"+N+" input:checked").length>0?true:false,R=$("#"+M+" input:checked").length>0?true:false,S=$("#"+M).closest(".ccl").next(".jqibuttons").find("button").filter(function(){return $(this).text().toUpperCase()==="SAVE"});if(T&&R){S.removeAttr("disabled")}else{S.attr("disabled","disabled")}};H();$("body").on("click","#"+N+" input",function(){if($(this).prop("checked")){$(this).siblings().prop("checked",false);var T=$(this).next().text();var S=jQuery.grep(G.FACILITY,function(V,U){return(V.FAC_DISP==T)});var R=[];$.each(S[0].WARD,function(U,V){R.push("<input type='checkbox' value='",V.WARD_CD,"'/><span>",V.WARD_DISP,"</span><br>")});$("#"+M).html(R.join(""))}H()});$("body").on("click","#"+M+" input",function(){if($(this).prop("checked")){$(this).siblings().prop("checked",false)}H()})}}}});function e(F,G){return"<div style='font-size:8pt; text-align:center; padding:2px; color:white;'>"+F+"<br/>"+G.percent+"%</div>"}function z(F,G){$.plot(F,G,{series:{pie:{show:true,radius:1,label:{show:true,radius:2/3,formatter:e,threshold:0}}},legend:{show:false}})}};MPage.namespace("nswsbb.ehealth");nswsbb.ehealth=function(){};nswsbb.ehealth.prototype=new MPage.Component();nswsbb.ehealth.prototype.constructor=MPage.Component;nswsbb.ehealth.prototype.base=MPage.Component.prototype;nswsbb.ehealth.name="nswsbb.ehealth";nswsbb.ehealth.prototype.cclProgram="855_EHEALTH_URL_STORAGE";nswsbb.ehealth.prototype.cclParams=["MINE","personId","encounterId","userId","domain","testlink","debugflag"];nswsbb.ehealth.prototype.cclDataType="TEXT";nswsbb.ehealth.option1={};nswsbb.ehealth.prototype.init=function(a){var b=[];b.push("MINE");b.push(this.getProperty("personId"));b.push(this.getProperty("encounterId"));b.push(this.getProperty("userId"));b.push("domain");b.push("http://www.google.com.au/?q=");b.push(0);this.cclParams=b};nswsbb.ehealth.prototype.render=function(){var h=this;var d=[];var f=h.getTarget();var j=0;var e=typeof h.data===Object?h.data:JSON.parse(h.data);for(var a=0;a<e.MAIN_DATA.LINKS.length;a++){if($.trim(e.MAIN_DATA.LINKS[a].LINK)!==""){j++;var b=e.MAIN_DATA.LINKS[a].LINK+e.MAIN_DATA.USERNAME+"@"+e.MAIN_DATA.DOMAIN;var g="";g=e.MAIN_DATA.LINKS[a].SOURCE;var c='javascript:APPLINK( 100 , "'+b+'" ,"");';if(a>0){d.push("<br/>")}d.push("<a  id ='ehealth_link' onclick='",c,"'> ",g,"</a>")}}if(j>0){f.innerHTML=d.join("")}else{f.innerHTML="No additional information available"}};MPage.namespace("cerner.bbt_overview");cerner.bbt_overview=function(){};cerner.bbt_overview.prototype=new MPage.Component();cerner.bbt_overview.prototype.constructor=MPage.Component;cerner.bbt_overview.prototype.base=MPage.Component.prototype;cerner.bbt_overview.prototype.name="cerner.bbt_overview";cerner.bbt_overview.prototype.cclProgram="aus_mp_bbsum_overview";cerner.bbt_overview.prototype.cclParams=[];cerner.bbt_overview.prototype.cclDataType="JSON";cerner.bbt_overview.prototype.init=function(){var a=[];a.push("MINE");a.push(this.getProperty("personId"));this.cclParams=a;this.data=""};cerner.bbt_overview.prototype.updateHeaderCount=function(b){var a=this;if(typeof b=="string"){a.setProperty("headerSubTitle",b)}else{a.setProperty("headerSubTitle",["(",b,")"].join(""))}};cerner.bbt_overview.prototype.addEventHandlers=function(){$(".pathwest-bbt-overview dt").mouseover(function(){$(this).removeClass("hovered").addClass("hovered").next().removeClass("hovered").addClass("hovered")}).mouseout(function(){$(this).removeClass("hovered").next().removeClass("hovered")});$(".pathwest-bbt-overview dd").mouseover(function(){$(this).removeClass("hovered").addClass("hovered").prev().removeClass("hovered").addClass("hovered")}).mouseout(function(){$(this).removeClass("hovered").prev().removeClass("hovered")})};cerner.bbt_overview.prototype.refresh=function(){this.updateHeaderCount("Loading...");this.generate();return};var display_table=function(){$("#satab").removeClass("hidden");var a=window.event.clientX;var b=window.event.clientY;$("#satab").css({top:b+20,left:a+10})};var hide_table=function(){$("#satab").addClass("hidden")};cerner.bbt_overview.prototype.render=function(){var m=this;var n=m.getComponentUid();var c=[];var z=m.getTarget();var g=m.data.RECORD_DATA;var u=g.ANTIBODYLIST.length;var h=m.data.RECORD_DATA;var s=h.TRANSREQLIST.length;var q=m.data.RECORD_DATA;var x=m.data.RECORD_DATA;var j=x.SPECAVAILLIST.length;var p=m.data.RECORD_DATA;var e=p.CCE_ANTIBODY.length;var y=m.data.RECORD_DATA;var b=y.CCE_CURRENT_ABORH.length;var w=m.data.RECORD_DATA;var f=w.CCE_SECOND_ABORH.length;var a=m.data.RECORD_DATA;var d=a.PHENOTYPELIST.length;c.push("<table>");c.push("<tr>");c.push("<td>Blood Group</td>");if(q.BLOOD_GROUP_CNT<2){c.push("<td style='color:#A4A4A4'>");c.push("No confirmed blood group on record","</td>")}else{c.push("<td>",q.BLOOD_GROUP,"</td>")}c.push("</tr>");c.push("<tr>");c.push("<td>Antibodies</td>");if(u==0){c.push("<td style='color:#A4A4A4'>");c.push("No antibodies on file")}else{c.push("<td>");for(var t=0,r=u;t<r;t++){c.push(g.ANTIBODYLIST[t].ANTIBODY_CHART_NAME);if(t<u-1){c.push(", ")}}}c.push("</td>");c.push("</tr>");c.push("<tr>");c.push("<td>Transfusion Requirements</td>");if(s==0){c.push("<td style='color:#A4A4A4'>");c.push("No transfusion requirements on file")}else{c.push("<td>");for(var t=0,r=s;t<r;t++){c.push(h.TRANSREQLIST[t].REQUIREMENT_DISP);if(t<s-1){c.push(", ")}}}c.push("</td>");c.push("</tr>");c.push("<tr>");c.push("<td>Patient Phenotype </td>");if(d==0){c.push("<td style='color:#A4A4A4'>");c.push("No phenotype on file")}else{c.push("<td>");if(q.FISHER_RACE_DISP>""){c.push(q.FISHER_RACE_DISP);c.push(" ")}if(q.WEINER_DISP>""){c.push(q.WIENER_DISP);c.push(" ")}for(var t=0,r=d;t<r;t++){c.push(a.PHENOTYPELIST[t].PHENOTYPE_DISP);if(t<d-1){c.push(" ")}}}c.push("</td>");c.push("</tr>");c.push("<td>Specimen Availability</td>");var o="<div id='satab' class='ttip hidden'><table> <b>Crossmatch Eligibility</b></th>";o=o+"<tr class='ttip'><td width='35%'></td>";o=o+"<td width='25%'>Verified Date/Time</td>";o=o+"<td width='25%'>Test</td>";o=o+"<td width='15%'>Accession</td></tr>";o=o+"<tr class='ttip'><td width='35%'>Current ABO/Rh Determination:</td>";if(b==0){o=o+"<td>No Result</td>";o=o+"<td>-</td>";o=o+"<td>-</td></tr>"}else{o=o+"<td width='25%'>"+y.CCE_CURRENT_ABORH[0].COLLECTED_DT_TM+"</td>";o=o+"<td width='25%'>"+y.CCE_CURRENT_ABORH[0].ORDER_MNEMONIC+"</td>";o=o+"<td width='15%'>"+y.CCE_CURRENT_ABORH[0].ACCESSION+"</td></tr>"}o=o+"<tr class='ttip'><td width='35%'>Second ABO/Rh Determination:</td>";if(f==0){o=o+"<td>No Result</td>";o=o+"<td>-</td>";o=o+"<td>-</td></tr>"}else{o=o+"<td width='25%'>"+y.CCE_SECOND_ABORH[0].COLLECTED_DT_TM+"</td>";o=o+"<td width='25%'>"+y.CCE_SECOND_ABORH[0].ORDER_MNEMONIC+"</td>";o=o+"<td width='15%'>"+y.CCE_SECOND_ABORH[0].ACCESSION+"</td></tr>"}o=o+"<tr class='ttip'><td width='35%'>Antibody Screen:</td>";if(e==0){o=o+"<td>No Result</td>";o=o+"<td>-</td>";o=o+"<td>-</td></tr>"}else{o=o+"<td width='25%'>"+p.CCE_ANTIBODY[0].COLLECTED_DT_TM+"</td>";o=o+"<td width='25%'>"+p.CCE_ANTIBODY[0].ORDER_MNEMONIC+"</td>";o=o+"<td width='15%'>"+p.CCE_ANTIBODY[0].ACCESSION+"</td></tr>"}o=o+"</table></div>";$("body").append(o);var v=["<td><span onmouseover='display_table()' onmouseout='hide_table()'><a href='#'>"];v=v+q.EXPIRY_DT_TM+"</a></td>";c.push(v);z.innerHTML=c.join("");m.addEventHandlers()};MPage.namespace("cerner.bbt_products");cerner.bbt_products=function(){};cerner.bbt_products.prototype=new MPage.Component();cerner.bbt_products.prototype.constructor=MPage.Component;cerner.bbt_products.prototype.base=MPage.Component.prototype;cerner.bbt_products.prototype.name="cerner.bbt_products";cerner.bbt_products.prototype.cclProgram="aus_mp_bbsum_products";cerner.bbt_products.prototype.cclParams=[];cerner.bbt_products.prototype.cclDataType="JSON";cerner.bbt_products.prototype.init=function(){var a=[];a.push("MINE");a.push(this.getProperty("personId"));this.cclParams=a;this.data=""};cerner.bbt_products.prototype.updateHeaderCount=function(b){var a=this;if(typeof b=="string"){a.setProperty("headerSubTitle",b)}else{a.setProperty("headerSubTitle",["(",b,")"].join(""))}};cerner.bbt_products.prototype.addEventHandlers=function(){$(".pathwest-bbt-overview dt").mouseover(function(){$(this).removeClass("hovered").addClass("hovered").next().removeClass("hovered").addClass("hovered")}).mouseout(function(){$(this).removeClass("hovered").next().removeClass("hovered")});$(".pathwest-bbt-overview dd").mouseover(function(){$(this).removeClass("hovered").addClass("hovered").prev().removeClass("hovered").addClass("hovered")}).mouseout(function(){$(this).removeClass("hovered").prev().removeClass("hovered")})};var flextable=function(b,d,e){var c=document.getElementById(b);var a=c.rows.length;for(i=1;i<a;i++){if(c.rows[i].style.display=="none"){if(b=="Assigntbl"){if(e==0){$("#AssignOuter").css("height","0px")}if(e==1){$("#AssignOuter").css("height","18px")}if(e==2){$("#AssignOuter").css("height","36px")}if(e==3){$("#AssignOuter").css("height","54px")}if(e==4){$("#AssignOuter").css("height","72px")}if(e==5){$("#AssignOuter").css("height","90px")}if(e==6){$("#AssignOuter").css("height","108px")}if(e==7){$("#AssignOuter").css("height","126px")}if(e==8){$("#AssignOuter").css("height","144px")}if(e==9){$("#AssignOuter").css("height","162px")}if(e>9){$("#AssignOuter").css("height","180px")}if(e<11){$("AssignInner").css("height","auto");$("AssignOuter").css("height","auto")}else{$("AssignInner").css("height","72px");$("AssignOuter").css("height","72px")}}if(b=="CMatchtbl"){if(e==0){$("#CMatchOuter").css("height","0px")}if(e==1){$("#CMatchOuter").css("height","18px")}if(e==2){$("#CMatchOuter").css("height","36px")}if(e==3){$("#CMatchOuter").css("height","54px")}if(e==4){$("#CMatchOuter").css("height","72px")}if(e==5){$("#CMatchOuter").css("height","90px")}if(e==6){$("#CMatchOuter").css("height","108px")}if(e==7){$("#CMatchOuter").css("height","126px")}if(e==8){$("#CMatchOuter").css("height","144px")}if(e==9){$("#CMatchOuter").css("height","162px")}if(e>9){$("#CMatchOuter").css("height","180px")}if(e<11){$("CMatchInner").css("height","auto");$("CMatchOuter").css("height","auto")}else{$("CMatchInner").css("height","72px");$("CMatchOuter").css("height","72px")}}if(b=="Dispensetbl"){if(e==0){$("#DispenseOuter").css("height","0px")}if(e==1){$("#DispenseOuter").css("height","18px")}if(e==2){$("#DispenseOuter").css("height","36px")}if(e==3){$("#DispenseOuter").css("height","54px")}if(e==4){$("#DispenseOuter").css("height","72px")}if(e==5){$("#DispenseOuter").css("height","90px")}if(e==6){$("#DispenseOuter").css("height","108px")}if(e==7){$("#DispenseOuter").css("height","126px")}if(e==8){$("#DispenseOuter").css("height","144px")}if(e==9){$("#DispenseOuter").css("height","162px")}if(e>9){$("#DispenseOuter").css("height","180px")}if(e<11){$("DispenseInner").css("height","auto");$("DispenseOuter").css("height","auto")}else{$("DispenseInner").css("height","180px");$("DispenseOuter").css("height","180px")}}if(b=="Historytbl"){if(e<11){$("#CompTransHist").css("height","auto");$("#CompTransHistInner").css("height","auto")}else{$("#CompTransHist").css("height","180px");$("#CompTransHistInner").css("height","180px")}}if(b=="Transfusetbl"){if(e<11){$("#TransfuseInner").css("height","auto");$("#TransfuseOuter").css("height","auto")}else{$("#TransfuseInner").css("height","180px");$("#TransfuseOuter").css("height","180px")}}c.rows[i].style.display="";document.getElementById(d).src=CERN_static_content+"\\images\\5323_expanded_16.png"}else{if(b=="Assigntbl"){$("#AssignOuter").css("height","0px")}if(b=="CMatchtbl"){$("#CMatchOuter").css("height","0px")}if(b=="Historytbl"){$("#CompTransHist").css("height","0px")}if(b=="Transfusetbl"){$("#TransfuseOuter").css("height","0px")}if(b=="Dispensetbl"){$("#DispenseOuter").css("height","0px")}c.rows[i].style.display="none";document.getElementById(d).src=CERN_static_content+"\\images\\5323_collapsed_16.png"}}};cerner.bbt_products.prototype.refresh=function(){this.updateHeaderCount("Loading...");this.generate();return};cerner.bbt_products.prototype.render=function(){var s=this;var t=s.getComponentUid();var d=[];var B=s.getTarget();var n=s.data.RECORD_DATA;var A=n.ASSIGNEDLIST.length;var z=s.data.RECORD_DATA;var w=z.CROSSMATCHEDLIST.length;var e=s.data.RECORD_DATA;var f=s.data.RECORD_DATA;var c=f.DISPENSEDLIST.length;var b=s.data.RECORD_DATA;var x=b.TRANSFUSEDLIST.length;var g=s.data.RECORD_DATA;var r=g.FTRANSFUSEDLIST.length;var m=180;var u=180;var a=72;d.push("<table class='.five-col .col4'>");d.push("<th width='20%' class='content-hdr '>Product Number</th>");d.push("<th width='28%' class='content-hdr '>Product Name</th>");d.push("<th width='19%' class='content-hdr '>Product Group</th>");d.push("<th width='7%' class='content-hdr '>Qty</th>");d.push("<th width='26%' class='content-hdr '>Date/Time</th>");d.push("</table>");switch(A){case 0:m=0;break;case 1:m=18;break;case 2:m=36;break;case 3:m=54;break;case 4:m=72;break;case 5:m=90;break;case 6:m=108;break;case 7:m=126;break;case 8:m=144;break;case 9:m=162;break;default:m=180}d.push("<div id='AssignOuter' style='padding:25px 0px 0px;width:100%;height:"+m+"px;overflow:hidden;position:relative;'><div id='AssignInner' style='width:100%;height:"+u+"px;overflow:auto' >");d.push("<table id='Assigntbl' class='sub-sec-hd'>");d.push("<tr style='position:absolute;top:0;width:100%'>");var q="<td colspan='5' class='sub-sec-hd' style='position:relative;top:0;width:100%;color:#3E3E3E'><input id='updnIMG1' type='image' onclick=";q+='"flextable(';q+="'Assigntbl','updnIMG1',"+A+")";q+='"';q+=" src='"+CERN_static_content+"\\images\\5323_expanded_16.png'";q+='"></input> Assigned (';q+=e.ASSIGNEDLIST_CNT;q+=")</td>";d.push(q);d.push("</tr>");if(A<1){d.push("<tr style='display: none;'>")}else{d.push("<tr>")}d.push("</tr>");for(var y=0,v=A;y<v;y++){if(y%2==1){d.push("<tr class='evenrow'>")}else{d.push("<tr class='oddrow'>")}d.push("<td width='20%'>",n.ASSIGNEDLIST[y].PRODUCT_NUMBER,"</td>");d.push("<td width='28%'>",n.ASSIGNEDLIST[y].PRODUCT,"</td>");d.push("<td width='19%'>",n.ASSIGNEDLIST[y].PRODUCT_GRP,"</td>");d.push("<td width='7%'>",n.ASSIGNEDLIST[y].QUANTITY,"</td>");d.push("<td width='26%'>",n.ASSIGNEDLIST[y].PE_EVENT_DT_TM,"</td>");d.push("</tr>")}d.push("</table>");d.push("</div></div>");switch(w){case 0:m=0;break;case 1:m=18;break;case 2:m=36;break;case 3:m=54;break;case 4:m=72;break;case 5:m=90;break;case 6:m=108;break;case 7:m=126;break;case 8:m=144;break;case 9:m=162;break;default:m=180}d.push("<div id='CMatchOuter' style='padding:25px 0px 0px;height:"+m+"px;overflow:hidden;position:relative;'><div id='CMatchInner' style='height:"+u+"px;overflow:auto' >");d.push("<table id='CMatchtbl' class='sub-sec-hd'>");d.push("<tr style='position:absolute;top:0;width:100%'>");var h="<td colspan='5' class='sub-sec-hd' style='position:relative;top:0;width:100%;color:#3E3E3E'><input id='updnIMG2' type='image' onclick=";h+='"flextable(';h+="'CMatchtbl','updnIMG2',"+w+")";h+='"';h+=" src='"+CERN_static_content+"\\images\\5323_expanded_16.png'";h+='"></input> Crossmatched (';h+=w;h+=")</td>";d.push(h);d.push("</tr>");if(w<1){d.push("<tr style='display: none;'>")}else{d.push("<tr>")}d.push("</tr>");for(var y=0,v=w;y<v;y++){if(y%2==1){d.push("<tr class='evenrow'>")}else{d.push("<tr class='oddrow'>")}d.push("<td width='20%'>",z.CROSSMATCHEDLIST[y].PRODUCT_NUMBER,"</td>");d.push("<td width='28%'>",z.CROSSMATCHEDLIST[y].PRODUCT,"</td>");d.push("<td width='19%'>",z.CROSSMATCHEDLIST[y].PRODUCT_GRP,"</td>");d.push("<td width='7%'>-</td>");d.push("<td width='26%'>",z.CROSSMATCHEDLIST[y].PE_EVENT_DT_TM,"</td>");d.push("</tr>")}d.push("</table>");d.push("</div></div>");switch(c){case 0:m=0;break;case 1:m=18;break;case 2:m=36;break;case 3:m=54;break;case 4:m=72;break;case 5:m=90;break;case 6:m=108;break;case 7:m=126;break;case 8:m=144;break;case 9:m=162;break;default:m=180}d.push("<div id='DispenseOuter' style='padding:25px 0px 0px;height:"+m+"px;overflow:hidden;position:relative;'><div id='DispenseInner' style='height:"+u+"px;overflow:auto' >");d.push("<table id='Dispensetbl' class='sub-sec-hd'>");d.push("<tr style='position:absolute;top:0;width:100%'>");var p="<td colspan='5' class='sub-sec-hd' style='position:relative;top:0;width:100%;color:#3E3E3E'><input id='updnIMG3' type='image' onclick=";p+='"flextable(';p+="'Dispensetbl','updnIMG3',"+e.DISPENSEDLIST_CNT+")";p+='"';p+=" src='"+CERN_static_content+"\\images\\5323_expanded_16.png'";p+='"></input> Dispensed  (';p+=e.DISPENSEDLIST_CNT;p+=")</td>";d.push(p);d.push("</tr>");if(c<1){d.push("<tr style='display: none;'>")}else{d.push("<tr>")}for(var y=0,v=c;y<v;y++){if(y%2==1){d.push("<tr class='evenrow'>")}else{d.push("<tr class='oddrow'>")}d.push("<td width='20%'>",f.DISPENSEDLIST[y].PRODUCT_NUMBER,"</td>");d.push("<td width='28%'>",f.DISPENSEDLIST[y].PRODUCT,"</td>");d.push("<td width='19%'>",f.DISPENSEDLIST[y].PRODUCT_GRP,"</td>");d.push("<td width='7%'>",f.DISPENSEDLIST[y].QUANTITY,"</td>");d.push("<td width='26%'>",f.DISPENSEDLIST[y].PE_EVENT_DT_TM,"</td>");d.push("</tr>")}d.push("</table>");d.push("</div></div>");d.push("<div id='TransfuseOuter' style='padding:25px 0px 0px;height:0px;overflow:hidden;position:relative;'><div id='TransfuseInner' style='height:180px;overflow:auto' >");d.push("<table id='Transfusetbl' class='sub-sec-hd'>");d.push("<tr style='position:absolute;top:0;width:100%'>");var o="<td colspan='5' class='sub-sec-hd' style='position:relative;top:0;width:100%;color:#3E3E3E'><input id='updnIMG4' type='image' onclick=";o+='"flextable(';o+="'Transfusetbl','updnIMG4',"+e.TRANSFUSEDLIST_CNT+")";o+='"';o+=" src='"+CERN_static_content+"\\images\\5323_collapsed_16.png'";o+="></input> Transfused (Last 3 Months) (";o+=e.TRANSFUSEDLIST_CNT;o+=")</td>";d.push(o);d.push("</tr>");d.push("<tr style='display: none;'>");for(var y=0,v=x;y<v;y++){if(y%2==1){d.push("<tr class='evenrow' style='display: none;'>")}else{d.push("<tr class='oddrow' style='display: none;'>")}d.push("<td width='20%'>",b.TRANSFUSEDLIST[y].PRODUCT_NUMBER,"</td>");d.push("<td width='28%'>",b.TRANSFUSEDLIST[y].PRODUCT,"</td>");d.push("<td width='19%'>",b.TRANSFUSEDLIST[y].PRODUCT_GRP,"</td>");d.push("<td width='7%'>",b.TRANSFUSEDLIST[y].QUANTITY,"</td>");d.push("<td width='26%'>",b.TRANSFUSEDLIST[y].PE_EVENT_DT_TM,"</td>");d.push("</tr>")}d.push("</table>");d.push("</div></div>");d.push("<div id='CompTransHist' style='padding:25px 0px 0px;height:0px;overflow:hidden;position:relative;'><div id='CompTransHistInner' style='height:180px;overflow:auto' >");d.push("<table id='Historytbl' class='sub-sec-hd'>");d.push("<tr style='position:absolute;top:0;width:100%'>");var j="<td colspan='5' class='sub-sec-hd' style='position:relative;top:0;width:100%;color:#3E3E3E'><input id='updnIMG5' type='image' onclick=";j+='"flextable(';j+="'Historytbl','updnIMG5',"+e.FTRANSFUSEDLIST_CNT+")";j+='"';j+=" src='"+CERN_static_content+"\\images\\5323_collapsed_16.png'";j+="></input> Complete Transfusion History (";j+=e.FTRANSFUSEDLIST_CNT;j+=")</td>";d.push(j);d.push("</tr>");d.push("<tr style='display: none;'>");for(var y=0,v=r;y<v;y++){if(y%2==1){d.push("<tr class='evenrow' style='display: none;'>")}else{d.push("<tr class='oddrow' style='display: none;'>")}d.push("<td width='20%'>",b.FTRANSFUSEDLIST[y].PRODUCT_NUMBER,"</td>");d.push("<td width='28%'>",b.FTRANSFUSEDLIST[y].PRODUCT,"</td>");d.push("<td width='19%'>",b.FTRANSFUSEDLIST[y].PRODUCT_GRP,"</td>");d.push("<td width='7%'>",b.FTRANSFUSEDLIST[y].QUANTITY,"</td>");d.push("<td width='26%'>",b.FTRANSFUSEDLIST[y].PE_EVENT_DT_TM,"</td>");d.push("</tr>")}d.push("</table>");d.push("</div></div>");B.innerHTML=d.join("");s.addEventHandlers()};MPage.namespace("nswsbb.DocLauncherMk2");nswsbb.DocLauncherMk2=function(){};nswsbb.DocLauncherMk2.prototype=new MPage.Component();nswsbb.DocLauncherMk2.prototype.constructor=MPage.Component;nswsbb.DocLauncherMk2.prototype.base=MPage.Component.prototype;nswsbb.DocLauncherMk2.prototype.name="nswsbb.ClinDocLauncherMultiMenus";nswsbb.DocLauncherMk2.prototype.init=function(a){};nswsbb.DocLauncherMk2.prototype.render=function(){var am=this,O=am.getComponentUid(),b=am.getTarget(),C=am.options.levels,ag=[],F=am.getProperty("personId"),E=am.getProperty("encounterId"),d=am.getProperty("userId"),G=O+"._11__stream",af=d+',"'+G+'"',A=0,z=0,s="Select Level1... ",N="Select Level2... ",g="Select Level3... ",x="",e="",Y="",I=s,t=N,an=g,Z=[],X=[],aa=[],ak=0,ah=0,al=0,m=[],P=null,D=0,f=0,W,ao=[],J="<div class='documents content-body'><br>Please choose an option for each of the menus to display the available documents.<div class='document-launcher-placeholder'></div></div>",u="<div class='documents content-body'><div class='document-launcher-placeholder'></div></div>",j="",v=0,aj=0,r=0,U="";var ad=function(){var ap;nswsbb.cclajax("855_mp_doc_launcher_mk2_start","GET",false,"'Document Launcher Mk2'",function(aq){ap=aq.MAIN_DATA.LV1},am);return ap};var ac=function(ap,ar,aq){return jQuery.grep(ap,function(at){return at[ar]===aq})};var V=function(ar,at,ax){var ay=true,ap=0,av=ar.length,au=0;var aw=function(az){return $.inArray(az,ax)<0};for(var aq=0;aq<av;aq++){if((au>1)||(au===1&&ap<av-1)){ay=false;break}else{if(aw(ar[aq].LAUNCH_ATTR[at])){ap=aq;au++}}}return ay};var h=function(aq){var ar=[{NAME:aq.DOCDISPLAYNAME,LAUNCH_ATTR:aq.LAUNCH_ATTR}],ap=aq.WORKFLOW,au=ap.length,av;for(var at=0;at<au;at++){av=ap[at];if(av.SEQ===0){ar.unshift({NAME:av.EVENT_SET_DISP,LAUNCH_ATTR:av.LAUNCH_ATTR})}else{ar.push({NAME:av.EVENT_SET_DISP,LAUNCH_ATTR:av.LAUNCH_ATTR})}}return ar};var S=function(at,ar){for(var ap=0,aq=at.length;ap<aq;ap++){ar(at[ap].LAUNCH_ATTR)}};var c=function(ap){alert(ap)};var Q=function(){return{FormLM:"Powerform",NoteLM:"Powernote",PreNoteLM:"Powernote",iViewLM:"iView",DynDocLM:"Dynamic Document",DynDocNtLM:"Dynamic Document",DynDocWfLM:"Dynamic Document"}};var ai=function(at,ar){var aq=at+',"'+ar+'"',ap="";nswsbb.cclajax("MP_GET_USER_PREFS","GET",false,aq,function(au){if(au.RECORD_DATA.PREF_STRING!==""){ap=au.RECORD_DATA.PREF_STRING}});return ap};var a=function(ap){var aq=function(ar){return{content:{text:$(ar).addClass("nswsbb-hover-highlight")},position:{viewport:$(window),target:"mouse",adjust:{x:15,y:21,method:"shift shift"}},style:{def:false,classes:"nswsbb-hover"}}};$("#"+O+" .res-modified").each(function(){var at=parseFloat($(this).prev().attr("doc-index")),ar=ap[at];$(this).hover(function(){$(this).addClass("lb-drop-down")});var au=["<div style='width:auto' class='nswsbb-hvr'>","Date: ",ar.LAUNCH_CLINICAL_DOC.CREATE_DT_FM,"<br>Author: ",ar.LAUNCH_CLINICAL_DOC.AUTHOR,"</div>"];$(this).qtip(aq(au.join("")))});$("#"+O+" .document-link").each(function(){var at=parseFloat($(this).attr("doc-index")),ar=ap[at],av=h(ar),au=["<div style='width:auto' class='nswsbb-hvr'>","<div class='nswsbb-tooltip-title'>Workflow</div>"];au.push("<ol>");$.each(av,function(aw,ax){au.push("<li>",aw+1,". ",ax.NAME," (",Q()[ax.LAUNCH_ATTR.LAUNCH_METHOD],")","</li>")});au.push("</ol></div>");if(av.length>1){$(this).qtip(aq(au.join("")))}})};var q=function(ar,aq,at){var au=".",ap;if(at instanceof Array){at=at.join(au)}ap=ar+',"'+aq+'","'+at+'"';nswsbb.cclajax("MP_MAINTAIN_USER_PREFS","POST",true,ap)};var M=function(av,aC,aw,ay,aq,ap,au){var aB=au.LV3_DISP,ax=au.LV3_CD,aA=au.LEVEL3,at=[ax,aC,aw,aA],aD=[aq,ap,aB,ax,aA],az=ab(at),ar=w(az);$("#"+O+" .documents").replaceWith(ar);a(az);q(av,ay,aD);U=""};var L={totalLevels:function(){var ap=3;if(Z.length==1&&Z[0].LV2.length==1){ap=1}if(Z.length==1&&Z[0].LV2.length>1){ap=2}return ap},menuWidth:function(){return(95/this.totalLevels())+"%"},menuHolderWidth:function(){return"99.5%"},setMenuWidth:function(){$("#"+O+" .dropdownmenu").each(function(ap,aq){$(this).css({width:L.menuWidth()})})},setDefaultLevel:function(){X=Z[0].LV2;aa=Z[0].LV2[0].LV3},setPreferenceToMenu:function(){m=ai(d,G).split(".");if(m.length<5){this.setDefaultLevel();return true}var ar=ac(Z,"LV1_DISP",m[0]);if(ar.length<=0){this.setDefaultLevel();return true}X=ar[0].LV2;var ap=ac(X,"LV2_DISP",m[1]);if(ap.length<=0){aa=X[0].LV3;return true}aa=ap[0].LV3;var aq=ac(aa,"LV3_DISP",m[2]);if(aq.length<=0){return true}x=m[0];e=m[1];Y=m[2];A=parseFloat(m[3]);z=parseFloat(m[4]);I=x;t=e;an=Y;return false},validateStream:function(ar){var aq="";var ap='<dl class="cust-info error-message error-text" title="{0}" style="border: 1px solid rgb(204, 0, 0); padding: 2px 4px;"><dd><span>Error retrieving results</span></dd></dl>';if(ar==undefined){aq=ap.format("No records returned.")}else{if(ar.length<=0){aq=ap.format("No records on the first level menu.")}else{if(ar.length===1&&ar[0].LV2.length<=0){aq=ap.format("No records on the second level menu.")}}}return aq}};var B=function(ar,au,av,at){var ap=[];var aq={baseLine:'<DIV><SPAN class="lblmnudisplay noe-drop-down">{0}</SPAN><SPAN class="noe-drop-down noe-venue-type-link"></SPAN> </DIV> <DIV class="nswsbb-lb-mnu-selectWindow lb-menu2 menu-hide"><DIV class=nswsbb-mnu-labelbox>Inpatient</DIV> <DIV class=nswsbb-mnu-contentbox>{1}</DIV></DIV>',base:function(az,ay){var ax=ay?"right-border":"";var aw=$("<div>").addClass(ar+" dropdownmenu").addClass(ax).css({width:L.menuWidth()}).html(az);return aw[0].outerHTML},dropDownMenu:function(aw,aA,ay){var ax=this.baseLine.format(aA,this.menuItems(ay));var az=(L.totalLevels()==3&&av=="LV1")||(L.totalLevels()==3&&av=="LV2")||(L.totalLevels()==2&&av=="LV2");return this.base(ax,az)},menuItem:function(ay,ax,aw){return $("<div>").append($("<span>").addClass("nswsbb-lb-mnu").addClass(aw).attr("cd",ay).text(ax))[0].outerHTML},menuItems:function(ax){var aw=[];$(ax).each(function(az,aA){var ay=(av==="LV3")?"level3="+aA.LEVEL3:"";aw.push(aq.menuItem(aA[av+"_CD"],aA[av+"_DISP"],ay))});return aw.join("")}};return aq.dropDownMenu(ar,at,au)};var ab=function(ap){nswsbb.cclajax("855_mp_doc_launcher_mk2","GET",false,ap,function(aq){W=aq.MAIN_DATA.QUAL});return W};var w=function(ap){var aq=[],av=0,az="<div class='document-launcher-placeholder'></div>",au,aA=[],ay="",aC=0,aB,ax="",ar="";aq.push("<div class='documents content-body'>");var aw=function(aH,aG){var aJ={};var aI;for(var aF=0;aF<aH.length;aF++){var aE=aH[aF][aG];if(!(aE in aJ)){aI=[]}var aD=aH[aF];aD.DOC_INDEX=aF;aI.push(aD);aJ[aE]=aI}return aJ};if(ap&&(av=ap.length)>0){au=aw(ap,"DOCGROUP");for(key in au){aA=[];aA.push("<table class='sub-sec'>");if(key!=""){aA.push("<tr><th colspan='2' class='sub-sec-hd' style='border-width:0;'><span class='sub-sec-hd-tgl'>-</span><span class='sub-sec-title'>",key,"</span></th></tr>")}for(var at=0;at<au[key].length;at++){ay=au[key][at].DOCDISPLAYNAME;aB=au[key][at].DOC_INDEX;ax="<span style='display: inline-block;' class='document-link' doc-index='"+aB+"'><a>"+ay+"</a></span>";if(au[key][at].HAS_DOC>0){ar="<span class='res-modified'></span>";ax+=ar}if(at%2==0){aA.push("<tr class='sub-sec-content'><td style='width:50%'>",ax,"</td>")}else{aA.push("<td>",ax,"</td></tr>")}}if(au[key].length/2!=0){aA.push("</tr>")}aA.push("</table>");aq=aq.concat(aA)}aq.push(az);aq.push("</div>")}else{aq.push("No results found",az,"</div>")}return aq.join("")};var K=function(av,ax,aw,au){var ap=null,at,ar,aq;at=ac(av,"LV1_DISP",ax);if(at.length>0){X=at[0].LV2;ar=ac(X,"LV2_DISP",aw);if(ar.length>0){aa=ar[0].LV3;aq=ac(aa,"LV3_DISP",au);if(aq.length>0){ap=aq[0]}}}return ap};var y=function(ap){var ar=ap.LAUNCH_METHOD;if(ar==="FormLM"){window.external.DiscernObjectFactory("POWERFORM").OpenForm(F,E,ap.DCP_FORMS_REF_ID,ap.ACTIVITY_ID,ap.DOCCHARTMODE)}else{if(ar==="NoteLM"){window.external.DiscernObjectFactory("POWERNOTE").BeginNoteFromEncounterPathway(F,E,ap.CKI_SOURCE,ap.CKI_IDENTIFIER)}else{if(ar==="PreNoteLM"){window.external.DiscernObjectFactory("POWERNOTE").BeginNoteFromPrecompletedNote(F,E,ap.STORY_ID)}else{if(ar==="iViewLM"){window.external.DiscernObjectFactory("TASKDOC").LaunchIView(ap.IVIEW_BAND_NAME.toLowerCase(),ap.IVIEW_SECTION_NAME,ap.IVIEW_EVENT_SET_NAME,F,E)}else{if(ar==="DynDocLM"){window.external.DiscernObjectFactory("DYNDOC").OpenNewDocumentByReferenceTemplateId(F,E,ap.TEMPLATE_ID)}else{if(ar==="DynDocNtLM"){window.external.DiscernObjectFactory("DYNDOC").OpenNewDocumentByReferenceTemplateIdAndNoteType(F,E,ap.TEMPLATE_ID,ap.NOTE_TYPE_CD)}else{if(ar==="DynDocWfLM"){window.external.DiscernObjectFactory("DYNDOC").OpenDynDocByWorkFlowId()}else{if(ar==="MPageRpt"){var aq=window.external.DiscernObjectFactory("PVFRAMEWORKLINK");aq.SetPopupStringProp("REPORT_NAME",ap.REPORT_NAME);aq.SetPopupDoubleProp("WIDTH",500);aq.SetPopupBoolProp("MODAL",1);aq.LaunchPopup()}}}}}}}}};var o=function(){var ap=0;$("#"+O+" .dropdownmenu").each(function(){if(!$(this).hasClass("menu-hide")){ap=Math.max(ap,$(this).find(" .nswsbb-lb-mnu").length)}});var ar=(ap+1)*25;var aq=100;aq=Math.max(aq,$("#"+O+" .content-body").height());var at=50;at=Math.max(at,ar-aq);$("#"+O+" .document-launcher-placeholder").height(at)};o=function(){var aq=$("#"+O+" .nswsbb-lb-mnu-selectWindow.menu-hide").length===$("#"+O+" .nswsbb-lb-mnu-selectWindow").length?true:false,at=40,ap=0;var ar=function(ax){var av=0;for(var aw=0,au=ax.length;aw<au;aw++){av=Math.max(av,ax.eq(aw).height())}return av};if(aq){if(aj){$("#"+O+" .documents").height(aj)}}else{aj=$("#"+O+" .documents").height();r=ar($("#"+O+" .nswsbb-lb-mnu-selectWindow:not('.menu-hide') .nswsbb-mnu-contentbox"));if(at>aj-r){ap=Math.max(ap,r)+at;$("#"+O+" .documents").height(ap)}}};Z=ad();var ae=L.validateStream(Z);if(ae.length>0){b.innerHTML=ae;return}var H=L.setPreferenceToMenu();if(L.totalLevels()==3){ag.push(B("doc-level1",Z,"LV1",I))}if(L.totalLevels()==2||L.totalLevels()==3){ag.push(B("doc-level2",X,"LV2",t))}ag.push(B("doc-level3",aa,"LV3",an));setTimeout(function(){L.setMenuWidth()},0);if(A){var n=[A,F,E,z];var p=ab(n);b.innerHTML=w(p);a(W)}else{b.innerHTML=J}setTimeout(function(){o()},0);$("#"+O+" .dropdownmenu").remove();var R=$("<div>").addClass("sub-title-disp doc-launcher").css({width:L.menuHolderWidth()}).html(ag.join(""));$("#"+O+" .sec-content").before(R[0].outerHTML);$(document).on("click","#"+O+" .noe-drop-down",function(){var at=$(this).parents(".dropdownmenu");var ap=at.find(".nswsbb-lb-mnu-selectWindow");var aq=function(ax,au){var aw="";for(var av=1;av<=ax;av++){aw="doc-level"+av;if(au.hasClass(aw)){return aw}}};var ar=aq(3,at);if(U===""||U===ar){if(ap.find(" .nswsbb-lb-mnu").length){ap.toggleClass("menu-hide")}if(ap.hasClass("menu-hide")){U=""}else{U=ar}o()}});$(document).on("click","#"+O+" .res-modified",function(){var ar=parseFloat($(this).prev().attr("doc-index")),aq=$(this).text(),ap=W[ar],at=ap.LAUNCH_CLINICAL_DOC,av=ap.LAUNCH_ATTR.LAUNCH_METHOD,au=Q(),aw=au[av].toUpperCase();MP_Util.LaunchClinNoteViewer(at.PERSON_ID,at.ENCNTR_ID,at.PEVENT_ID,at.VIEW_TYPE,at.PEVENT_ID)});$(document).on("click","#"+O+" .document-link",function(){var at=parseFloat($(this).attr("doc-index")),ar=$(this).text(),aq=W[at],au=null,av=["FormLM"],ap="Invalid Workflow";au=h(aq);if(V(au,"LAUNCH_METHOD",av)){S(au,y)}else{c(ap)}});var T=function(aq,ap){var ar="#"+O+" ."+aq;$(ar+" .nswsbb-lb-mnu-selectWindow").removeClass("menu-hide");U=aq;if($(ar+" .nswsbb-lb-mnu").length===1){$(ar+" .nswsbb-lb-mnu").click();ap=$(ar+" .nswsbb-lb-mnu").text()}else{o()}$(ar+" .lblmnudisplay").text(ap);$(ar+" .nswsbb-mnu-labelbox").text(ap)};$(document).on("click","#"+O+" .nswsbb-lb-mnu",function(){var ar=$(this).text();var ap=parseFloat($(this).attr("cd"));var aq=$(this).parents(".dropdownmenu");aq.find(".lblmnudisplay").text(ar);aq.find(".lblmnudisplay").attr("cd",ap);aq.find(".nswsbb-mnu-labelbox").text(ar);aq.find(".nswsbb-lb-mnu-selectWindow").toggleClass("menu-hide");if($(this).parents(".doc-level1").length===1){I=ar;X=ac(Z,"LV1_DISP",I)[0].LV2;if(X.length>0){$("#"+O+" .doc-level2").replaceWith(B("doc-level2",X,"LV2",t));P=K(Z,I,t,an);if(P){M(d,F,E,G,I,t,P)}else{T("doc-level2",N)}}else{$("#"+O+" .doc-level2").html("")}}else{if(($(this).parents(".doc-level2").length===1)){I=(I==s)?Z[0].LV1_DISP:I;t=ar;X=ac(Z,"LV1_DISP",I)[0].LV2;aa=ac(X,"LV2_DISP",t)[0].LV3;if(aa.length>0){$("#"+O+" .doc-level3").replaceWith(B("doc-level3",aa,"LV3",an));P=K(Z,I,t,an);if(P){M(d,F,E,G,I,t,P)}else{T("doc-level3",g)}}else{$("#"+O+" .doc-level3").html("")}}else{I=(I==s)?Z[0].LV1_DISP:I;t=(t==N)?Z[0].LV2[0].LV2_DISP:t;an=ar;P=K(Z,I,t,an);M(d,F,E,G,I,t,P)}}});if(!utility.isCernerV5){$("#"+O).addClass("doc-launcher-container V4")}else{$("#"+O).addClass("doc-launcher-container")}};MPage.namespace("nswsbb.quality_informatics");nswsbb.quality_informatics=function(){};nswsbb.quality_informatics.prototype=new MPage.Component();nswsbb.quality_informatics.prototype.constructor=MPage.Component;nswsbb.quality_informatics.prototype.base=MPage.Component.prototype;nswsbb.quality_informatics.name="nswsbb.quality_informatics";nswsbb.quality_informatics.option_falls_assessment={reprottype:"CE",moduleName:"Falls Assessment",powerform:"OMS Falls Risk Screen_Modified",completeLabel:"Complete",inCompleteLabel:"Incomplete",positiveGraph:"true",eventSet:"Falls Assessment Complete"};nswsbb.quality_informatics.option_pressure_injury={reprottype:"CE",moduleName:"Pressure Injury",powerform:"Waterlow Assessment",completeLabel:"Complete",inCompleteLabel:"Incomplete",positiveGraph:"true",eventSet:"Pressure Injury Complete"};nswsbb.quality_informatics.option_mst={reprottype:"CE",moduleName:"MST",powerform:"Malnutrition Screening Tool",completeLabel:"Complete",inCompleteLabel:"Incomplete",positiveGraph:"true",eventSet:"MST Complete"};nswsbb.quality_informatics.option_admission_assessment={reprottype:"CE",moduleName:"Admission Assessment",powerform:"Adult Admission Assessment",completeLabel:"Complete",inCompleteLabel:"Incomplete",positiveGraph:"true",eventSet:"Admission Assessment Complete"};nswsbb.quality_informatics.option_weight_complete_assessment={reprottype:"CE",moduleName:"Weight",powerform:"Height and Weight",completeLabel:"Complete",inCompleteLabel:"Incomplete",positiveGraph:"true",eventSet:"Weight Complete"};nswsbb.quality_informatics.option_height_complete_assessment={reprottype:"CE",moduleName:"Height",powerform:"Height and Weight",completeLabel:"Complete",inCompleteLabel:"Incomplete",positiveGraph:"true",eventSet:"Height Complete"};nswsbb.quality_informatics.option_allergies={reprottype:"ALG",moduleName:"Allergies",powerform:"MP Allergies & Adverse Reactions",completeLabel:"Charted",inCompleteLabel:"Not Charted",positiveGraph:"true",eventSet:"Allergy Charted"};nswsbb.quality_informatics.option_unsigned={reprottype:"SAV",moduleName:"Unsigned",powerform:"",completeLabel:"Signed",inCompleteLabel:"Not Signed",positiveGraph:"false",eventSet:"Unsigned"};nswsbb.quality_informatics.prototype.init=function(c){var b=this.options.moduleName;tm.addEvent("QI "+b+" Init");$.extend(this.options,{draw:function(){}});var a=this;var d=this.getComponentUid();$(document).ready(function(){$("#"+d).resizing(function(){tm.addEvent("QI "+b+" Resize");a.options.draw()})})};nswsbb.quality_informatics.prototype.addEventHandlers=function(a){};nswsbb.quality_informatics.prototype.render=function(){var component=this;var targetHTML=[];var target=component.getTarget();var compId=component.getComponentUid();var dUserId=component.getProperty("userId");var reporttype='"'+component.options.reprottype+'"';var currentFacilityCD,currentWardCD;var origWardData,origFacData;var PreferenceFacility=compId+"-facility";var providerId=dUserId;var cclGetPreferenceFacility=providerId+',"'+PreferenceFacility+'"';var graphData;var myTable;var renderTimer=tm.startTimer("QI "+component.options.moduleName+" Render");var localVar={document:{positive:(component.options.positiveGraph!=undefined)?eval(component.options.positiveGraph):true,setPercentage:function(data){this.dataValue=parseInt(data)},dataValue:0,completePercentage:function(){return(this.positive)?this.dataValue:100-this.dataValue},inCompletePercentage:function(){return(this.positive)?100-this.dataValue:this.dataValue},setTitle:function(){var authorOnly=true;if(activeButton==="HOSPITAL"){authorOnly=origFacData.QUAL&&origFacData.QUAL.length>0&&origFacData.QUAL[0].AUTHOR_ONLY}else{authorOnly=origWardData.QUAL&&origWardData.QUAL.length>0&&origWardData.QUAL[0].AUTHOR_ONLY}if(authorOnly==1){$(".jqititle").after($("<div>").css({"padding-left":"10px","font-size":"1.5em",color:"red"}).text("Only an author can modify the document"))}}},showError:function(msg){var container=$("<div>").append($("<dl>").addClass("cust-info error-message error-text").attr("title",msg).css({border:"1px solid rgb(204, 0, 0)",padding:"2px 4px"}).append($("<dd>")).append($("<span>").text("Error in loading the component.")));target.innerHTML=container.html()},color:{dirty:"#cc0066",unauthorised:"#bfbfbf"}};var services={getUserPrefs:function(prefString){var qiTimer=tm.startTimer("QI "+component.options.moduleName+" getUserPrefs");var returnString;nswsbb.cclajax("855_MP_QUALITY_INFORMATICS_PRF","GET",false,prefString,function(data){if(data.RECORD_DATA.PREF_STRING!==""&&!isNaN((parseFloat(data.RECORD_DATA.PREF_STRING)))){returnString=data.RECORD_DATA.PREF_STRING}},component);tm.stopTimer(qiTimer);return returnString},saveUserPrefs:function(prefString){var qiTimer=tm.startTimer("QI "+component.options.moduleName+" saveUserPrefs");nswsbb.cclajax("MP_MAINTAIN_USER_PREFS","POST",true,prefString,function(){tm.stopTimer(qiTimer)})},getGraphData:function(facilityCD,wardCD,reportMode,facilityMode){var qiTimer=tm.startTimer("QI "+component.options.moduleName+" getGraphData");var cclParametesArr=[];cclParametesArr.push(parseFloat(facilityCD));cclParametesArr.push(parseFloat(wardCD));cclParametesArr.push('"'+component.options.reprottype+'"');cclParametesArr.push('"'+reportMode+'"');cclParametesArr.push(parseFloat(facilityMode));cclParametesArr.push(component.options.eventSet);nswsbb.cclajax("855_mp_quality_informatics","GET",false,cclParametesArr,function(data){graphData=data.MAIN_DATA},component);tm.stopTimer(qiTimer);return graphData},getDocuments:function(cclParametesArr){var qiTimer=tm.startTimer("QI "+component.options.moduleName+" getDocuments");nswsbb.cclajax("855_mp_doc_launcher_mk2","GET",false,cclParametesArr,function(data){documents=data.MAIN_DATA.QUAL});tm.stopTimer(qiTimer);return documents}};if(!utility.isIESupported){localVar.showError("Quality Informatics is not supported in this IE version. It must be later or equal to version 11.");return}var user={isInAuthorList:function(record){var authors=[];$(record.AUTHORS).each(function(index,item){authors.push(item.AUTHOR_ID)});var authorline=";"+authors.join(";")+";";return(!(typeof record.AUTHOR_ONLY=="undefined")&&!(typeof record.AUTHORS=="undefined")&&((record.AUTHOR_ONLY==0)||(record.AUTHOR_ONLY==1&&authorline.indexOf(";"+providerId+";")>=0)))}};var bindButtons=function(){var qiTimer=tm.startTimer("QI "+component.options.moduleName+" bindButtons");$("#"+compId+" .menu button").off("click").on("click",function(){$("#"+compId+" .menu button").removeClass("activate");$(this).addClass("activate");activeButton=$(this).text().toUpperCase();if(activeButton==="HOSPITAL"){if(typeof origFacData==="undefined"){origFacData=services.getGraphData(currentFacilityCD,currentWardCD,"F","1")}localVar.document.setPercentage(origFacData.FAC_CURR);facilityName=origFacData.FAC_DISP}else{if(typeof origWardData==="undefined"){origWardData=services.getGraphData(currentFacilityCD,currentWardCD,"W","1")}localVar.document.setPercentage(origWardData.WARD_CURR);facilityName=origWardData.WARD_DISP}var data=[{label:labelComplete,data:localVar.document.completePercentage(),color:colorComplete},{label:labelNonComplete,data:localVar.document.inCompletePercentage(),color:colorIncomplete}];placeholder.unbind();$("#"+compId+" .facility-name").text(facilityName);GetPieChart(placeholder,data)});tm.stopTimer(qiTimer)};var pieChart={isFacility:function(){return activeButton=="HOSPITAL"},loadFacility:function(){var rowsCount=origFacData.QUAL.length;origFacData=services.getGraphData(currentFacilityCD,currentWardCD,"F","1");if(rowsCount!=origFacData.QUAL.length){origWardData=undefined}localVar.document.setPercentage(origFacData.FAC_CURR);facilityName=origFacData.FAC_DISP},loadWard:function(){var rowsCount=origWardData.QUAL.length;origWardData=services.getGraphData(currentFacilityCD,currentWardCD,"W","1");if(rowsCount!=origWardData.QUAL.length){origFacData=undefined}localVar.document.setPercentage(origWardData.WARD_CURR);facilityName=origWardData.WARD_DISP},preparePieData:function(){var data=[{label:labelComplete,data:localVar.document.completePercentage(),color:colorComplete},{label:labelNonComplete,data:localVar.document.inCompletePercentage(),color:colorIncomplete}];return data},setTitle:function(){$("#"+compId+" .facility-name").text(facilityName);$("#"+compId+" .no-setting-prompt").remove();$("#"+compId+" .title").removeClass("error").text("Current Status:").show();$("#"+compId+" .menu").show()},saveTableState:function(){myTable.state.saveExternalState()},redraw:function(){var qiTimer=tm.startTimer("QI "+component.options.moduleName+" pieChart.redraw");this.saveTableState();if(this.isFacility()){this.loadFacility()}else{this.loadWard()}this.setTitle();GetPieChart(placeholder,this.preparePieData());tm.stopTimer(qiTimer)},reload:function(){var qiTimer=tm.startTimer("QI "+component.options.moduleName+" pieChart.reload");var dirtyitems=$.grep(myTable.data(),function(n,i){return n.UI.dirty});if(dirtyitems.length<=0){return}setTimeout(function(){pieChart.redraw();tm.stopTimer(qiTimer)},400)}};currentFacilityCD=services.getUserPrefs(cclGetPreferenceFacility);var PreferenceWard=compId+"-ward";var cclGetPreferenceWard=providerId+',"'+PreferenceWard+'"';currentWardCD=services.getUserPrefs(cclGetPreferenceWard);var componentWidth=$("#"+compId).width();targetHTML.push('<div id="content">');targetHTML.push('<span class="title">Current status:&nbsp</span><span class="facility-name"></span>');targetHTML.push('<div class="demo-container">');targetHTML.push('<div class="placeholder" class="demo-placeholder" style="height:200px;width:100%"></div>');targetHTML.push('<div class="menu">');targetHTML.push('<button class="ward activate">Ward</button>');targetHTML.push('<button class="hospital">Hospital</button>');targetHTML.push("</div>");targetHTML.push("</div>");targetHTML.push("</div>");target.innerHTML=targetHTML.join("");var noSettingPrompt="<div class='no-setting-prompt'>The filters for this <b>Graph</b> have not been set.<br><br> Please <b>right click</b>, and choose, <b>\"Change Filter\"</b>, to see the filters for this Graph.<br><br>The filters you choose will be stored for your login and redisplayed each time you visit the page.<br><br>The filters are set separately for each of the Analytics components.<br><br>You can change the filters at any time in the future by right clicking.</div>";if(!(currentFacilityCD&currentWardCD)){$("#"+compId+" .menu").hide();$("#"+compId+" .title").removeClass("error").hide();$("#"+compId+" .placeholder").html(noSettingPrompt)}else{origWardData=services.getGraphData(currentFacilityCD,currentWardCD,"W","1")}var labelComplete=component.options.completeLabel;var labelNonComplete=component.options.inCompleteLabel;var colorComplete="#afd8f8";var colorIncomplete="#edc240";var placeholder=$("#"+compId+" .placeholder");var activeButton="";var facilityName="";if(typeof origWardData!=="undefined"){if(origWardData.STATUS===-1){$("#"+compId+" .title").addClass("error").text("Error in getting data to render the graph:"+origWardData.ERROR_MSG);$("#"+compId+" .menu").hide();$("#"+compId+" .placeholder").html(noSettingPrompt)}else{facilityName=origWardData.WARD_DISP;localVar.document.setPercentage(origWardData.WARD_CURR);var data=[{label:labelComplete,data:localVar.document.completePercentage(),color:colorComplete},{label:labelNonComplete,data:localVar.document.inCompletePercentage(),color:colorIncomplete}];$("#"+compId+" .title").removeClass("error").text("Current Status:");$("#"+compId+" .title").show();$("#"+compId+" .facility-name").text(facilityName);GetPieChart(placeholder,data);bindButtons()}}$.contextMenu({selector:"#"+compId,callback:function(key,options){var m="clicked: "+key},items:{Setting:{name:"Change Filter",icon:"edit",callback:function(key,options){var m="edit was clicked";var mainData;nswsbb.cclajax("855_mp_quality_informatics_pmt","GET",false,"",function(data){mainData=data.MAIN_DATA},component);if(mainData.FACILITY.length==0){$("#"+compId+" .placeholder").html("No Facilities associated to this user");return}var facility=[];for(var i=0;i<mainData.FACILITY.length;i++){facility.push({FAC_CD:mainData.FACILITY[i].FAC_CD,FAC_DISP:mainData.FACILITY[i].FAC_DISP})}currentFacilityCD=services.getUserPrefs(cclGetPreferenceFacility);currentWardCD=services.getUserPrefs(cclGetPreferenceWard);var htmlFacility=[];var facilityID=compId+"-facility";htmlFacility.push("<div>");htmlFacility.push("<div class='ccl'>");htmlFacility.push("<span class='ccl-label'>Facility</span>");htmlFacility.push("<div class='checkbox-list-conainer' id='"+facilityID+"'>");$.each(facility,function(index,value){if(value.FAC_CD==parseFloat(currentFacilityCD)){htmlFacility.push("<input type='checkbox' checked value='",value.FAC_CD,"'/><span>",value.FAC_DISP,"</span><br>")}else{htmlFacility.push("<input type='checkbox' value='",value.FAC_CD,"'/><span>",value.FAC_DISP,"</span><br>")}});htmlFacility.push("</div>");htmlFacility.push("</div>");var wardID=compId+"-ward";if(typeof currentFacilityCD==="undefined"||isNaN((parseFloat(currentFacilityCD)))){currentFacilityCD=mainData.FACILITY[0].FAC_CD}var currentFacility=jQuery.grep(mainData.FACILITY,function(n,i){return(n.FAC_CD==currentFacilityCD)});htmlFacility.push("<div class='ccl'>");htmlFacility.push("<span class='ccl-label'>Ward</span>");htmlFacility.push("<div class='checkbox-list-conainer' id='"+wardID+"'>");$.each(currentFacility[0].WARD,function(index,value){if(value.WARD_CD==parseInt(currentWardCD)){htmlFacility.push("<input type='checkbox' checked value='",value.WARD_CD,"'/><span>",value.WARD_DISP,"</span><br>")}else{htmlFacility.push("<input type='checkbox' value='",value.WARD_CD,"'/><span>",value.WARD_DISP,"</span><br>")}});htmlFacility.push("</div>");htmlFacility.push("<div>");htmlFacility.push("</div>");var statesdemo={state0:{title:"Setting Of "+component.getProperty("headerTitle"),html:htmlFacility.join(""),buttons:{Save:true},submit:function(e,v,m,f){var selectedFacility=parseFloat($("#"+facilityID).find("input:checked").val());currentFacilityCD=selectedFacility;var selectedWard=parseFloat($("#"+wardID).find("input:checked").val());currentWardCD=selectedWard;origWardData=services.getGraphData(currentFacilityCD,currentWardCD,"W","1");origFacData=undefined;e.preventDefault();if(v==1){$.prompt.close()}if(origWardData.STATUS===-1){$("#"+compId+" .title").addClass("error").text("Error in getting data to render the graph:"+origWardData.ERROR_MSG).show();$("#"+compId+" .menu").hide();$("#"+compId+" .facility-name").text("");$("#"+compId+" .placeholder").html(noSettingPrompt)}else{activeButton="WARD";$("#"+compId+" .menu button.activate").removeClass("activate");$("#"+compId+" .menu button.ward").addClass("activate");localVar.document.setPercentage(origWardData.WARD_CURR);facilityName=origWardData.WARD_DISP;var data=[{label:labelComplete,data:localVar.document.completePercentage(),color:colorComplete},{label:labelNonComplete,data:localVar.document.inCompletePercentage(),color:colorIncomplete}];$("#"+compId+" .facility-name").text(facilityName);$("#"+compId+" .no-setting-prompt").remove();$("#"+compId+" .title").removeClass("error").text("Current Status:").show();$("#"+compId+" .menu").show();GetPieChart(placeholder,data);var PreferenceStrFacility=selectedFacility;var cclSetPreferenceFacility=providerId+',"'+PreferenceFacility+'","'+PreferenceStrFacility+'"';services.saveUserPrefs(cclSetPreferenceFacility);var PreferenceStrWard=selectedWard;var cclSetPreferenceWard=providerId+',"'+PreferenceWard+'","'+PreferenceStrWard+'"';services.saveUserPrefs(cclSetPreferenceWard);bindButtons()}}}};$.prompt(statesdemo);var modifyStateOfSaveBtn=function(){var hasFacility=$("#"+facilityID+" input:checked").length>0?true:false,hasWard=$("#"+wardID+" input:checked").length>0?true:false,$saveBtn=$("#"+wardID).closest(".ccl").next(".jqibuttons").find("button").filter(function(){return $(this).text().toUpperCase()==="SAVE"});if(hasFacility&&hasWard){$saveBtn.removeAttr("disabled")}else{$saveBtn.attr("disabled","disabled")}};modifyStateOfSaveBtn();$("body").on("click","#"+facilityID+" input",function(){if($(this).prop("checked")){$(this).siblings().prop("checked",false);var selectedItem=$(this).next().text();var newFacility=jQuery.grep(mainData.FACILITY,function(n,i){return(n.FAC_DISP==selectedItem)});var newFacilityHTML=[];$.each(newFacility[0].WARD,function(index,value){newFacilityHTML.push("<input type='checkbox' value='",value.WARD_CD,"'/><span>",value.WARD_DISP,"</span><br>")});$("#"+wardID).html(newFacilityHTML.join(""))}modifyStateOfSaveBtn()});$("body").on("click","#"+wardID+" input",function(){if($(this).prop("checked")){$(this).siblings().prop("checked",false)}modifyStateOfSaveBtn()})}}}});function labelFormatter(label,series){return"<div style='font-size:8pt; text-align:center; padding:2px; color:white;'>"+label+"<br/>"+series.percent+"%</div>"}function GetPieChart(container,d){function getCsvFileName(){return component.options.moduleName+"_"+facilityName+"_"+dateFormat(new Date(),"isoDate",null)+"-"+dateFormat(new Date(),"isoTime",null)}function buildTable(data,columns,facName){var unsignedRowHandler={actionList:[],columnList:[],disableText:"Author Only",color:{dirty:"#cc0066",unauthorised:"#bfbfbf"},contentLine:'<div style="max-width:250px;overflow:hidden;padding:0px 9px 3px;">{0}</div>',init:function(){var longtext=function(td,len){var text=$(td).text();$(td).text(text.substring(0,len)+"...");$(td).qtip({content:unsignedRowHandler.contentLine.format(text),position:{viewport:$(window),target:"mouse",adjust:{y:21,method:"shift shift"}}})};var disable=function(td,len){$(td).qtip({content:unsignedRowHandler.contentLine.format(unsignedRowHandler.disableText),position:{viewport:$(window),target:"mouse",adjust:{y:21,method:"shift shift"}}})};this.actionList=[{target:true,enable:true,longtext:true,show:longtext},{target:true,enable:false,longtext:true,show:longtext},{target:false,enable:false,longtext:false,show:disable},{target:true,enable:false,longtext:false,show:disable},{target:false,enable:false,longtext:true,show:disable}];this.columnList=$.map($.grep(columns,function(n){return n.visible==1}),function(n,i){return{name:n.data,type:n.type.toLowerCase(),length:n.maxLength?n.maxLength:-1}})},setToolTips:function(cindex,enable,td){var col=unsignedRowHandler.columnList[cindex];var target=col.length>0&&col.type=="string";var longtext=$(td).text().length>col.length;var items=$.grep(this.actionList,function(n){return n.target==target&&n.enable==enable&&n.longtext==longtext});if(items.length>0){items[0].show(td,col.length)}},setDisableRow:function(row,aData){aData.UI={disabled:true,dirty:false};$(row).css({color:this.color.unauthorised});$($(row).find("td")).each(function(index,item){unsignedRowHandler.setToolTips(index,false,this)})},setEnableRow:function(row,aData){aData.UI={disabled:false,dirty:false};$(row).css({cursor:"pointer"});$($(row).find("td")).each(function(index,item){unsignedRowHandler.setToolTips(index,true,this)})},setRow:function(row,aData){if(!user.isInAuthorList(aData)){this.setDisableRow(row,aData)}else{this.setEnableRow(row,aData)}}};unsignedRowHandler.init();return $("#incompleteTable").DataTable({dom:"Blfrtip",data:data,lengthMenu:[10],columns:columns,buttons:[{extend:"csvHtml5",exportOptions:{columns:":visible"},title:getCsvFileName()}],stateSave:false,fnLoadExternalState:function(){return tableUserPreference.get(facName)},fnSaveExternalState:function(state){tableUserPreference.set(facName,state)},fnCreatedRow:function(nRow,aData,iDataIndex){unsignedRowHandler.setRow(nRow,aData)}})}var tableUserPreference={local:{hospital:{code:currentFacilityCD},ward:{code:currentWardCD}},fromJson:function(line){var state=JSON.parse(line.replace(/'/g,'"'));state.search.search=state.search.search.replace(/x001/g,"'").replace(/x002/g,'"');return state},toJson:function(state){state.search.search=state.search.search.replace(/'/g,"x001").replace(/"/g,"x002");var line=JSON.stringify(state).replace(/"/g,"'");return line},getParamArray:function(facility){var code;for(var name in tableUserPreference.local){if(name==facility){code=tableUserPreference.local[name].code}}return[dUserId,'"'+compId+"-dts-"+facility+"-"+code+'"']},get:function(facility){var rdata="";var param=tableUserPreference.getParamArray(facility).join(",");nswsbb.cclajax("MP_GET_USER_PREFS","GET",false,param,function(data){if(data!=undefined){rdata=data.RECORD_DATA.PREF_STRING}},component);return rdata===""?null:tableUserPreference.fromJson(rdata)},set:function(facility,state){var data=tableUserPreference.toJson(state);var param=tableUserPreference.getParamArray(facility);param.push('"'+data+'"');nswsbb.cclajax("MP_MAINTAIN_USER_PREFS","POST",true,param.join(","))}};function draw(){$(container).nswsbb_component_pie({data:d,attributes:[{label:d[0].label,clickable:false},{label:d[1].label,clickable:true}],legendLocation:{left:$(target).position().left+$(target).width()},componentId:compId});container.unbind("flothover");container.bind("flothover",function(event,pos,obj){if(!obj){return}if(obj.series.label==="Incomplete"){var percent=parseFloat(obj.series.percent).toFixed(2);$("#hover").html("<span style='font-weight:bold; color:"+obj.series.color+"'>"+obj.series.label+" ("+percent+"%)</span>")}});container.unbind("flotclick");container.bind("flotclick",function(event,pos,obj){if(!obj){return}if(obj.series.label===labelNonComplete){var promptTitle=component.options.moduleName+" - "+facilityName;if(typeof(myTablePrompt)!="undefined"){myTablePrompt=null}var myTablePrompt=$.prompt('<table id="incompleteTable" class="display compact" width="100%"></table>',{title:promptTitle,buttons:{Close:true},position:{width:1000,height:800}});myTablePrompt.on("impromptu:close",function(e,v,m,f){pieChart.saveTableState();pieChart.reload()});localVar.document.setTitle();if(activeButton==="HOSPITAL"){if(typeof(myTable)=="object"){myTable.destroy()}myTable=buildTable(origFacData.QUAL,origFacData.columns,"hospital")}else{if(typeof(myTable)=="object"){myTable.destroy()}myTable=buildTable(origWardData.QUAL,origWardData.columns,"ward")}$("#incompleteTable tbody").off("click","tr");$("#incompleteTable tbody").on("click","tr",function(){var myRow=(myTable.row(this).data()),myArgs=[];if(myRow.UI.disabled){return}myArgs.push(myRow.PERSON_ID," - ",myRow.ENCNTR_ID," - ",myRow.FORM_ID," - ");myArgs.push(myRow.FORM_ACTIVITY_ID," - ",myRow.CHART_MODE);if(location.href.match(/^http/)){alert("myArgs = "+myArgs.join("")+", Facility = "+currentFacilityCD+", Ward = "+currentWardCD)}else{if(myRow.LAUNCH_TYPE.toUpperCase()==="FORMLM"){window.external.DiscernObjectFactory("POWERFORM").OpenForm(myRow.PERSON_ID,myRow.ENCNTR_ID,myRow.FORM_ID,myRow.FORM_ACTIVITY_ID,myRow.CHART_MODE)}else{MP_Util.LaunchClinNoteViewer(myRow.PERSON_ID,myRow.ENCNTR_ID,myRow.PEVENT_ID,myRow.VIEW_TYPE,myRow.PEVENT_ID)}}$(this).css({color:localVar.color.dirty,"text-decoration":"line-through",cursor:"default"});myRow.UI={disabled:true,dirty:true}})}return})}component.options.draw=draw;draw()}tm.stopTimer(renderTimer)};


/* ----------------------------------------------------------------------------------

START OF CHW CUSTOM CODE
// 000 Tony                    			Outstanding orders deployment
// 001 Laxmisree Vanam         			SCHN IV Continuous Infusions deployment
// 002 Tony Fitzsimons					Enhance outstanding orders - 3day option, add accession to tooltip, set max height
// 003 Tony Fitzsimons		16/06/16	Add Alerts component, namespace schn.alerts2
// 004 Tony Fitzsimons		13/07/16	SCHN Incomplete Discharge Summaries and eHealth v3.0.2 code
// 005 Tony Fitzsimons		25/07/16	Add hyperlink for Respiratory support in alerts component (schn.alerts2)
// 006 Tony Fitzsimons		24/08/16 	SCHN Oncology Reference Documents component added (schn.clintrials)
// 007 Tony Fitzsimons		29/08/16	Add code for Waitlist (schn.wl_bookings) and Coded Admissions (schn.codedAdmissions)
// 008 Michael Gong 		29/08/16	Add code for Appointments (schn.appointments) 
// 009 Michael Gong         01/09/16    wording change for schn.appointments 
// 010 Tony Fitzsimons		01/09/16	Modified Coded Admissions subheader to include ICD-10-AM reference
// 011 Tony Fitzsimons		06/09/16	Add more document hyperlinks for Oncology schn.clintrials
// 012 Tony Fitzsimons		09/09/16	Add more document hyperlinks for Oncology schn.clintrials
// 013 Tony Fitzsimons		16/09/16	Add more document hyperlinks for Oncology schn.clintrials
// 014 Tony Fitzsimons		05/10/16	Add more document hyperlinks for Oncology schn.clintrials
// 015 Tony Fitzsimons		25/10/16	Add more document hyperlinks for Oncology schn.clintrials
// 016 Tony Fitzsimons		04/11/16	Add more document hyperlinks for Oncology schn.clintrials
// 017 Tony Fitzsimons		08/11/16	Add more document hyperlinks for Oncology schn.clintrials
// 018 Michael Gong         17/11/16    T:8834843 modify schn.alerts2 to be working from Org level Dynamic Worklist, to remove prompt encntr_id from 707_mp_alerts_and_plans, replace pat_personid with c_alert[i].PATIENT_ID in js
// 018.5 Tony Fitzsimons	09/12/16	Add more document hyperlinks for Oncology schn.clintrials
// 019 Michael Gong         09/12/16    T:8943737 modify schn.alerts2 to use qtip instead of tooltips for hover to retain hover data display format  
// 020 Michael Gong         09/12/16    T:8943737 modify schn.outorders to use qtip for hover to retain hover data display format, replace .attr with .prop for click and change functions, repalce $pat_personid$ with this.getProperty("personId") to make it working at org level from Dynamic Worklist
										hvrdata will work with highlighting any column of th erow not just the first order name column.
// 021 Michael Gong         09/12/16    T:8943737 modify schn.wl_bookings to use qtip for hover to retain hover data display format
// 022 Michael Gong         09/12/16    T:8943737 modify schn.appointments to use qtip for hover to retain hover data display format, modify 707_mp_pat_info_sum_get_appts2 to add list_name
// 023 Tony Fitzsimons		15/12/16	Add Kids GPS hyperlink to schn.alerts2 namespace
// 024 Michael Gong         18/01/17    Add schn.documents 
// 025 Tony Fitzsimons		15/02/17	Add Neuro and seizure hyperlinks to schn.alerts2
// 026 Tony Fitzsimons		28/02/17	Add schn.oneview_connect namespace
// 027 Tony Fitzsimons		27/03/17	Add schn.provcontacts namespace
------------------------------------------------------------------------------------*/


/* ----------------------------------------------------------------------------------

TABLESORTER PLUGIN

------------------------------------------------------------------------------------*/

(function($){$.extend({tablesorter:new
function(){var parsers=[],widgets=[];this.defaults={cssHeader:"header",cssAsc:"headerSortUp",cssDesc:"headerSortDown",cssChildRow:"expand-child",sortInitialOrder:"asc",sortMultiSortKey:"shiftKey",sortForce:null,sortAppend:null,sortLocaleCompare:true,textExtraction:"simple",parsers:{},widgets:[],widgetZebra:{css:["even","odd"]},headers:{},widthFixed:false,cancelSelection:true,sortList:[],headerList:[],dateFormat:"us",decimal:'/\.|\,/g',onRenderHeader:null,selectorHeaders:'thead th',debug:false};function benchmark(s,d){log(s+","+(new Date().getTime()-d.getTime())+"ms");}this.benchmark=benchmark;function log(s){if(typeof console!="undefined"&&typeof console.debug!="undefined"){console.log(s);}else{alert(s);}}function buildParserCache(table,$headers){if(table.config.debug){var parsersDebug="";}if(table.tBodies.length==0)return;var rows=table.tBodies[0].rows;if(rows[0]){var list=[],cells=rows[0].cells,l=cells.length;for(var i=0;i<l;i++){var p=false;if($.metadata&&($($headers[i]).metadata()&&$($headers[i]).metadata().sorter)){p=getParserById($($headers[i]).metadata().sorter);}else if((table.config.headers[i]&&table.config.headers[i].sorter)){p=getParserById(table.config.headers[i].sorter);}if(!p){p=detectParserForColumn(table,rows,-1,i);}if(table.config.debug){parsersDebug+="column:"+i+" parser:"+p.id+"\n";}list.push(p);}}if(table.config.debug){log(parsersDebug);}return list;};function detectParserForColumn(table,rows,rowIndex,cellIndex){var l=parsers.length,node=false,nodeValue=false,keepLooking=true;while(nodeValue==''&&keepLooking){rowIndex++;if(rows[rowIndex]){node=getNodeFromRowAndCellIndex(rows,rowIndex,cellIndex);nodeValue=trimAndGetNodeText(table.config,node);if(table.config.debug){log('Checking if value was empty on row:'+rowIndex);}}else{keepLooking=false;}}for(var i=1;i<l;i++){if(parsers[i].is(nodeValue,table,node)){return parsers[i];}}return parsers[0];}function getNodeFromRowAndCellIndex(rows,rowIndex,cellIndex){return rows[rowIndex].cells[cellIndex];}function trimAndGetNodeText(config,node){return $.trim(getElementText(config,node));}function getParserById(name){var l=parsers.length;for(var i=0;i<l;i++){if(parsers[i].id.toLowerCase()==name.toLowerCase()){return parsers[i];}}return false;}function buildCache(table){if(table.config.debug){var cacheTime=new Date();}var totalRows=(table.tBodies[0]&&table.tBodies[0].rows.length)||0,totalCells=(table.tBodies[0].rows[0]&&table.tBodies[0].rows[0].cells.length)||0,parsers=table.config.parsers,cache={row:[],normalized:[]};for(var i=0;i<totalRows;++i){var c=$(table.tBodies[0].rows[i]),cols=[];if(c.hasClass(table.config.cssChildRow)){cache.row[cache.row.length-1]=cache.row[cache.row.length-1].add(c);continue;}cache.row.push(c);for(var j=0;j<totalCells;++j){cols.push(parsers[j].format(getElementText(table.config,c[0].cells[j]),table,c[0].cells[j]));}cols.push(cache.normalized.length);cache.normalized.push(cols);cols=null;};if(table.config.debug){benchmark("Building cache for "+totalRows+" rows:",cacheTime);}return cache;};function getElementText(config,node){var text="";if(!node)return"";if(!config.supportsTextContent)config.supportsTextContent=node.textContent||false;if(config.textExtraction=="simple"){if(config.supportsTextContent){text=node.textContent;}else{if(node.childNodes[0]&&node.childNodes[0].hasChildNodes()){text=node.childNodes[0].innerHTML;}else{text=node.innerHTML;}}}else{if(typeof(config.textExtraction)=="function"){text=config.textExtraction(node);}else{text=$(node).text();}}return text;}function appendToTable(table,cache){if(table.config.debug){var appendTime=new Date()}var c=cache,r=c.row,n=c.normalized,totalRows=n.length,checkCell=(n[0].length-1),tableBody=$(table.tBodies[0]),rows=[];for(var i=0;i<totalRows;i++){var pos=n[i][checkCell];rows.push(r[pos]);if(!table.config.appender){var l=r[pos].length;for(var j=0;j<l;j++){tableBody[0].appendChild(r[pos][j]);}}}if(table.config.appender){table.config.appender(table,rows);}rows=null;if(table.config.debug){benchmark("Rebuilt table:",appendTime);}applyWidget(table);setTimeout(function(){$(table).trigger("sortEnd");},0);};function buildHeaders(table){if(table.config.debug){var time=new Date();}var meta=($.metadata)?true:false;var header_index=computeTableHeaderCellIndexes(table);$tableHeaders=$(table.config.selectorHeaders,table).each(function(index){this.column=header_index[this.parentNode.rowIndex+"-"+this.cellIndex];this.order=formatSortingOrder(table.config.sortInitialOrder);this.count=this.order;if(checkHeaderMetadata(this)||checkHeaderOptions(table,index))this.sortDisabled=true;if(checkHeaderOptionsSortingLocked(table,index))this.order=this.lockedOrder=checkHeaderOptionsSortingLocked(table,index);if(!this.sortDisabled){var $th=$(this).addClass(table.config.cssHeader);if(table.config.onRenderHeader)table.config.onRenderHeader.apply($th);}table.config.headerList[index]=this;});if(table.config.debug){benchmark("Built headers:",time);log($tableHeaders);}return $tableHeaders;};function computeTableHeaderCellIndexes(t){var matrix=[];var lookup={};var thead=t.getElementsByTagName('THEAD')[0];var trs=thead.getElementsByTagName('TR');for(var i=0;i<trs.length;i++){var cells=trs[i].cells;for(var j=0;j<cells.length;j++){var c=cells[j];var rowIndex=c.parentNode.rowIndex;var cellId=rowIndex+"-"+c.cellIndex;var rowSpan=c.rowSpan||1;var colSpan=c.colSpan||1
var firstAvailCol;if(typeof(matrix[rowIndex])=="undefined"){matrix[rowIndex]=[];}for(var k=0;k<matrix[rowIndex].length+1;k++){if(typeof(matrix[rowIndex][k])=="undefined"){firstAvailCol=k;break;}}lookup[cellId]=firstAvailCol;for(var k=rowIndex;k<rowIndex+rowSpan;k++){if(typeof(matrix[k])=="undefined"){matrix[k]=[];}var matrixrow=matrix[k];for(var l=firstAvailCol;l<firstAvailCol+colSpan;l++){matrixrow[l]="x";}}}}return lookup;}function checkCellColSpan(table,rows,row){var arr=[],r=table.tHead.rows,c=r[row].cells;for(var i=0;i<c.length;i++){var cell=c[i];if(cell.colSpan>1){arr=arr.concat(checkCellColSpan(table,headerArr,row++));}else{if(table.tHead.length==1||(cell.rowSpan>1||!r[row+1])){arr.push(cell);}}}return arr;};function checkHeaderMetadata(cell){if(($.metadata)&&($(cell).metadata().sorter===false)){return true;};return false;}function checkHeaderOptions(table,i){if((table.config.headers[i])&&(table.config.headers[i].sorter===false)){return true;};return false;}function checkHeaderOptionsSortingLocked(table,i){if((table.config.headers[i])&&(table.config.headers[i].lockedOrder))return table.config.headers[i].lockedOrder;return false;}function applyWidget(table){var c=table.config.widgets;var l=c.length;for(var i=0;i<l;i++){getWidgetById(c[i]).format(table);}}function getWidgetById(name){var l=widgets.length;for(var i=0;i<l;i++){if(widgets[i].id.toLowerCase()==name.toLowerCase()){return widgets[i];}}};function formatSortingOrder(v){if(typeof(v)!="Number"){return(v.toLowerCase()=="desc")?1:0;}else{return(v==1)?1:0;}}function isValueInArray(v,a){var l=a.length;for(var i=0;i<l;i++){if(a[i][0]==v){return true;}}return false;}function setHeadersCss(table,$headers,list,css){$headers.removeClass(css[0]).removeClass(css[1]);var h=[];$headers.each(function(offset){if(!this.sortDisabled){h[this.column]=$(this);}});var l=list.length;for(var i=0;i<l;i++){h[list[i][0]].addClass(css[list[i][1]]);}}function fixColumnWidth(table,$headers){var c=table.config;if(c.widthFixed){var colgroup=$('<colgroup>');$("tr:first td",table.tBodies[0]).each(function(){colgroup.append($('<col>').css('width',$(this).width()));});$(table).prepend(colgroup);};}function updateHeaderSortCount(table,sortList){var c=table.config,l=sortList.length;for(var i=0;i<l;i++){var s=sortList[i],o=c.headerList[s[0]];o.count=s[1];o.count++;}}function multisort(table,sortList,cache){if(table.config.debug){var sortTime=new Date();}var dynamicExp="var sortWrapper = function(a,b) {",l=sortList.length;for(var i=0;i<l;i++){var c=sortList[i][0];var order=sortList[i][1];var s=(table.config.parsers[c].type=="text")?((order==0)?makeSortFunction("text","asc",c):makeSortFunction("text","desc",c)):((order==0)?makeSortFunction("numeric","asc",c):makeSortFunction("numeric","desc",c));var e="e"+i;dynamicExp+="var "+e+" = "+s;dynamicExp+="if("+e+") { return "+e+"; } ";dynamicExp+="else { ";}var orgOrderCol=cache.normalized[0].length-1;dynamicExp+="return a["+orgOrderCol+"]-b["+orgOrderCol+"];";for(var i=0;i<l;i++){dynamicExp+="}; ";}dynamicExp+="return 0; ";dynamicExp+="}; ";if(table.config.debug){benchmark("Evaling expression:"+dynamicExp,new Date());}eval(dynamicExp);cache.normalized.sort(sortWrapper);if(table.config.debug){benchmark("Sorting on "+sortList.toString()+" and dir "+order+" time:",sortTime);}return cache;};function makeSortFunction(type,direction,index){var a="a["+index+"]",b="b["+index+"]";if(type=='text'&&direction=='asc'){return"("+a+" == "+b+" ? 0 : ("+a+" === null ? Number.POSITIVE_INFINITY : ("+b+" === null ? Number.NEGATIVE_INFINITY : ("+a+" < "+b+") ? -1 : 1 )));";}else if(type=='text'&&direction=='desc'){return"("+a+" == "+b+" ? 0 : ("+a+" === null ? Number.POSITIVE_INFINITY : ("+b+" === null ? Number.NEGATIVE_INFINITY : ("+b+" < "+a+") ? -1 : 1 )));";}else if(type=='numeric'&&direction=='asc'){return"("+a+" === null && "+b+" === null) ? 0 :("+a+" === null ? Number.POSITIVE_INFINITY : ("+b+" === null ? Number.NEGATIVE_INFINITY : "+a+" - "+b+"));";}else if(type=='numeric'&&direction=='desc'){return"("+a+" === null && "+b+" === null) ? 0 :("+a+" === null ? Number.POSITIVE_INFINITY : ("+b+" === null ? Number.NEGATIVE_INFINITY : "+b+" - "+a+"));";}};function makeSortText(i){return"((a["+i+"] < b["+i+"]) ? -1 : ((a["+i+"] > b["+i+"]) ? 1 : 0));";};function makeSortTextDesc(i){return"((b["+i+"] < a["+i+"]) ? -1 : ((b["+i+"] > a["+i+"]) ? 1 : 0));";};function makeSortNumeric(i){return"a["+i+"]-b["+i+"];";};function makeSortNumericDesc(i){return"b["+i+"]-a["+i+"];";};function sortText(a,b){if(table.config.sortLocaleCompare)return a.localeCompare(b);return((a<b)?-1:((a>b)?1:0));};function sortTextDesc(a,b){if(table.config.sortLocaleCompare)return b.localeCompare(a);return((b<a)?-1:((b>a)?1:0));};function sortNumeric(a,b){return a-b;};function sortNumericDesc(a,b){return b-a;};function getCachedSortType(parsers,i){return parsers[i].type;};this.construct=function(settings){return this.each(function(){if(!this.tHead||!this.tBodies)return;var $this,$document,$headers,cache,config,shiftDown=0,sortOrder;this.config={};config=$.extend(this.config,$.tablesorter.defaults,settings);$this=$(this);$.data(this,"tablesorter",config);$headers=buildHeaders(this);this.config.parsers=buildParserCache(this,$headers);cache=buildCache(this);var sortCSS=[config.cssDesc,config.cssAsc];fixColumnWidth(this);$headers.click(function(e){var totalRows=($this[0].tBodies[0]&&$this[0].tBodies[0].rows.length)||0;if(!this.sortDisabled&&totalRows>0){$this.trigger("sortStart");var $cell=$(this);var i=this.column;this.order=this.count++%2;if(this.lockedOrder)this.order=this.lockedOrder;if(!e[config.sortMultiSortKey]){config.sortList=[];if(config.sortForce!=null){var a=config.sortForce;for(var j=0;j<a.length;j++){if(a[j][0]!=i){config.sortList.push(a[j]);}}}config.sortList.push([i,this.order]);}else{if(isValueInArray(i,config.sortList)){for(var j=0;j<config.sortList.length;j++){var s=config.sortList[j],o=config.headerList[s[0]];if(s[0]==i){o.count=s[1];o.count++;s[1]=o.count%2;}}}else{config.sortList.push([i,this.order]);}};setTimeout(function(){setHeadersCss($this[0],$headers,config.sortList,sortCSS);appendToTable($this[0],multisort($this[0],config.sortList,cache));},1);return false;}}).mousedown(function(){if(config.cancelSelection){this.onselectstart=function(){return false};return false;}});$this.bind("update",function(){var me=this;setTimeout(function(){me.config.parsers=buildParserCache(me,$headers);cache=buildCache(me);},1);}).bind("updateCell",function(e,cell){var config=this.config;var pos=[(cell.parentNode.rowIndex-1),cell.cellIndex];cache.normalized[pos[0]][pos[1]]=config.parsers[pos[1]].format(getElementText(config,cell),cell);}).bind("sorton",function(e,list){$(this).trigger("sortStart");config.sortList=list;var sortList=config.sortList;updateHeaderSortCount(this,sortList);setHeadersCss(this,$headers,sortList,sortCSS);appendToTable(this,multisort(this,sortList,cache));}).bind("appendCache",function(){appendToTable(this,cache);}).bind("applyWidgetId",function(e,id){getWidgetById(id).format(this);}).bind("applyWidgets",function(){applyWidget(this);});if($.metadata&&($(this).metadata()&&$(this).metadata().sortlist)){config.sortList=$(this).metadata().sortlist;}if(config.sortList.length>0){$this.trigger("sorton",[config.sortList]);}applyWidget(this);});};this.addParser=function(parser){var l=parsers.length,a=true;for(var i=0;i<l;i++){if(parsers[i].id.toLowerCase()==parser.id.toLowerCase()){a=false;}}if(a){parsers.push(parser);};};this.addWidget=function(widget){widgets.push(widget);};this.formatFloat=function(s){var i=parseFloat(s);return(isNaN(i))?0:i;};this.formatInt=function(s){var i=parseInt(s);return(isNaN(i))?0:i;};this.isDigit=function(s,config){return/^[-+]?\d*$/.test($.trim(s.replace(/[,.']/g,'')));};this.clearTableBody=function(table){if($.browser.msie){function empty(){while(this.firstChild)this.removeChild(this.firstChild);}empty.apply(table.tBodies[0]);}else{table.tBodies[0].innerHTML="";}};}});$.fn.extend({tablesorter:$.tablesorter.construct});var ts=$.tablesorter;ts.addParser({id:"text",is:function(s){return true;},format:function(s){return $.trim(s.toLocaleLowerCase());},type:"text"});ts.addParser({id:"digit",is:function(s,table){var c=table.config;return $.tablesorter.isDigit(s,c);},format:function(s){return $.tablesorter.formatFloat(s);},type:"numeric"});ts.addParser({id:"currency",is:function(s){return/^[�$�?.]/.test(s);},format:function(s){return $.tablesorter.formatFloat(s.replace(new RegExp(/[�$�]/g),""));},type:"numeric"});ts.addParser({id:"ipAddress",is:function(s){return/^\d{2,3}[\.]\d{2,3}[\.]\d{2,3}[\.]\d{2,3}$/.test(s);},format:function(s){var a=s.split("."),r="",l=a.length;for(var i=0;i<l;i++){var item=a[i];if(item.length==2){r+="0"+item;}else{r+=item;}}return $.tablesorter.formatFloat(r);},type:"numeric"});ts.addParser({id:"url",is:function(s){return/^(https?|ftp|file):\/\/$/.test(s);},format:function(s){return jQuery.trim(s.replace(new RegExp(/(https?|ftp|file):\/\//),''));},type:"text"});ts.addParser({id:"isoDate",is:function(s){return/^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/.test(s);},format:function(s){return $.tablesorter.formatFloat((s!="")?new Date(s.replace(new RegExp(/-/g),"/")).getTime():"0");},type:"numeric"});ts.addParser({id:"percent",is:function(s){return/\%$/.test($.trim(s));},format:function(s){return $.tablesorter.formatFloat(s.replace(new RegExp(/%/g),""));},type:"numeric"});ts.addParser({id:"usLongDate",is:function(s){return s.match(new RegExp(/^[A-Za-z]{3,10}\.? [0-9]{1,2}, ([0-9]{4}|'?[0-9]{2}) (([0-2]?[0-9]:[0-5][0-9])|([0-1]?[0-9]:[0-5][0-9]\s(AM|PM)))$/));},format:function(s){return $.tablesorter.formatFloat(new Date(s).getTime());},type:"numeric"});ts.addParser({id:"shortDate",is:function(s){return/\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}/.test(s);},format:function(s,table){var c=table.config;s=s.replace(/\-/g,"/");if(c.dateFormat=="us"){s=s.replace(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/,"$3/$1/$2");}else if(c.dateFormat=="uk"){s=s.replace(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/,"$3/$2/$1");}else if(c.dateFormat=="dd/mm/yy"||c.dateFormat=="dd-mm-yy"){s=s.replace(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2})/,"$1/$2/$3");}return $.tablesorter.formatFloat(new Date(s).getTime());},type:"numeric"});ts.addParser({id:"time",is:function(s){return/^(([0-2]?[0-9]:[0-5][0-9])|([0-1]?[0-9]:[0-5][0-9]\s(am|pm)))$/.test(s);},format:function(s){return $.tablesorter.formatFloat(new Date("2000/01/01 "+s).getTime());},type:"numeric"});ts.addParser({id:"metadata",is:function(s){return false;},format:function(s,table,cell){var c=table.config,p=(!c.parserMetadataName)?'sortValue':c.parserMetadataName;return $(cell).metadata()[p];},type:"numeric"});ts.addWidget({id:"zebra",format:function(table){if(table.config.debug){var time=new Date();}var $tr,row=-1,odd;$("tr:visible",table.tBodies[0]).each(function(i){$tr=$(this);if(!$tr.hasClass(table.config.cssChildRow))row++;odd=(row%2==0);$tr.removeClass(table.config.widgetZebra.css[odd?0:1]).addClass(table.config.widgetZebra.css[odd?1:0])});if(table.config.debug){$.tablesorter.benchmark("Applying Zebra widget",time);}}});})(jQuery);

/* ----------------------------------------------------------------------------------

SCHN MASTER BASE CLASS NAMESPACE
//common functions go here...

------------------------------------------------------------------------------------*/

// <startNameSpace = "schn">
MPage.namespace("schn");

var schn = schn || {};

schn.openPowerform = function(pid,eid,formid,actid,mode){
	var mpObj=window.external.DiscernObjectFactory("POWERFORM");
	mpObj.OpenForm(pid,eid,formid,actid,mode);
}

schn.openDocumentViewer = function(dPersonId, dEventId){
	var objPVViewerMPage = window.external.DiscernObjectFactory("PVVIEWERMPAGE");
	objPVViewerMPage.CreateDocViewer(dPersonId);
	objPVViewerMPage.AppendDocEvent(dEventId);
	objPVViewerMPage.LaunchDocViewer();
}

schn.modifyDynDoc = function(dPersonId, dEncounterId, dMdocEventId){
	var DynDocMPageUtils = window.external.DiscernObjectFactory("DYNDOC");
	DynDocMPageUtils.ModifyExistingDocumentByEventId(dPersonId, dEncounterId, dMdocEventId);
}

// open chart to default tab
schn.openChart = function(dPersonId, dEncounterId){
	var params = '/PERSONID=' + dPersonId + ' /ENCNTRID=' + dEncounterId;
	APPLINK(0, "Powerchart.exe", params);
}

/* ----------------------------------------------------------------------------------

SCHN OUTSTANDING ORDER COMPONENT

------------------------------------------------------------------------------------*/

/* Put name of component here  OUTSTANDING PATHOLOGY ORDERS*/
//020
/*
MPage.namespace("schn.outorders");
schn.outorders = function () {};

schn.outorders.option1 = {
	"outorders" : {
		"lookback_ccl" : "2 Y",
		"lookback_desc" : "2 years"
	}
};
schn.outorders.option2 = {
	"outorders" : {
		"lookback_ccl" : "7 D",
		"lookback_desc" : "7 Days"
	}
};

schn.outorders.prototype = new MPage.Component();
schn.outorders.prototype.constructor = MPage.Component;
schn.outorders.prototype.base = MPage.Component.prototype;
schn.outorders.prototype.name = "schn.outorders";
schn.outorders.prototype.cclProgram = "707_mp_lab_outstand_order";
schn.outorders.prototype.cclParams = [];
schn.outorders.prototype.cclDataType = "JSON"; //possible values=> JSON, TEXT, XML

schn.outorders.prototype.init = function (options) {
	//code to perform before immediately rendering (usually updating params is needed)
	var component = this;
	//your options are attached to the options of the object behind the scenes
	//var comp_options = this.options.documents;
	
	component.cclParams.push("MINE");
	//CAN USE ANY OR ALL OF THE FOLLOWING IN ORDER AS NEEDED:
	component.cclParams.push(this.getProperty("personId"));
	//component.cclParams.push(this.getProperty("encounterId"));
	component.cclParams.push("7 D"); //default look back last seven days
	//component.cclParams.push(this.getProperty("userId"));
	//component.cclParams.push(this.getProperty("PPRCode"));
	//component.cclParams.push(this.getProperty("positionCd"));
	//alert('finished init');
	//set the subtitle text next to header if needed (uncomment and update if needed)
	component.setProperty("headerSubTitle", "Loading...");
};

schn.outorders.prototype.addEventHandlers = function (record) {
	var component = this;
	var compId = component.getComponentUid();
	var target = component.getTarget();
	
	$("#" + compId + " .hvrData").tooltip({
		"track" : true,
		"delay" : 150,
		"fade" : 150
	});
	
	//check box validate
	
	$("#schn-future").click(function () {
		//calculate and send the future check box as boolean values
		component.renderoutordertable($("#schn-future").attr("checked") == "checked");
		//reattach tool tip
		$("#" + compId + " .hvrData").tooltip({
		"track" : true,
		"delay" : 150,
		"fade" : 150
	});
	});
	$("#schn_lookbackopt").change(function(){
		component.outorderlookbackopt($("#schn_lookbackopt").val(), $("#schn-future").attr("checked") == "checked");
		var schn_lookbacklabel=$("#schn_lookbackopt :selected").text();
		$("#schn-subtitle").html("Outstanding pathology orders in "+ schn_lookbacklabel);
		//reattach tool tip
		
	});
};

schn.outorders.prototype.getSubHeader = function (str) {
	//note that inline styles could be put in their own class and put as a second class for the div
	return ["<div class='sub-title-disp' id='schn-subtitle' style='margin:-6px -6px 6px -6px;border-left:none;border-right:none;'>", str, "</div>"].join("");
};

schn.outorders.prototype.render = function () {
	var component = this;
	var compId = component.getComponentUid();
	var target = component.getTarget();
	var record = component.data.ORDERS;
	var doc_length = record.ORD.length;
	//var comp_options = component.options.outorders;
	var targetHTML = [];
	//alert('render something!!!');
	//set and create subheader (uncomment and update if needed)
	//targetHTML.push(component.getSubHeader("Selected Visit last " + comp_options.lookback_desc));
	targetHTML.push(component.getSubHeader("Outstanding pathology orders in last 7 days"));
	//set the title text if needed (uncomment and update if needed)
	//component.setProperty("headerTitle", "New Title");
	
	//set the subtitle text next to header if needed (uncomment and update if needed)
	//component.setProperty("headerSubTitle", "(" + doc_length + ")");
	
	//set the component to collapsed (false)/expanded (true) if needed (uncomment and update if needed)
	//component.setProperty("headerShowHideState",true);
	
	//do something here with the targetHTML (component.data will have data type defined by this.cclDataType)
	targetHTML.push("<div class='schn-outorders schn-main-component content-body' id='schn-outorderlist'>",
		"<form action=''><input type='checkbox' id='schn-future' name='future' value='future'>Include future orders?</form>",
		"<select id='schn_lookbackopt'><option value='3 D'>Last 3 Days</option><option value='7 D' selected>Last 7 Days</option><option value='14 D'>Last 14 Days</option><option value='1 M'>Last 1 Month</option><option value='3 M'>Last 3 Months</option></select>",
		"<div id='schn-outordertable'></div></div>");
	
	target.innerHTML = targetHTML.join("");
	
	//call table rendering here
	component.renderoutordertable(false);
	
	//this may or may not be needed
	component.addEventHandlers(record); //call last after the HTML is on the screen, so JQuery can find it
	
};
schn.outorders.prototype.renderoutordertable = function (future_check) {
	
	var num_recs = 0;
	var component = this;
	var schnoutorderHTML = [];
	var schnoutorderTableBody = [];
	var new_record = this.data.ORDERS;
	var new_table_cnt = 0;
	if(new_record.ORD.length>0){
		var render_flag = 0;
		for (var i = 0; i < new_record.ORD.length; i++) {
			var docObj = new_record.ORD[i];
			if (future_check || (!docObj.FUTURE_FLAG && !future_check)) {
				render_flag = 1; //set the flag to render the table only if there are qualifying orders
				schnoutorderTableBody.push(
					"<tr>",
					"<td class='hvrData' title='Orders Id: ", docObj.ORD_ID,
					"<br>Order: ", docObj.ORD_NAME,
					"<br>Accession Number: ", docObj.ACC_NUM,
					"<br>Order Detail: ", docObj.ORD_DETAIL,
					"<br>Order Comments: ", docObj.ORD_COMMENTS,
					"<br>Order Date Time: ", docObj.ORD_DT_TM,
					"<br>Start Date Time: ", docObj.ORD_ST_DT_TM,
					"<br>Order Status: ", docObj.ORD_STATUS,
					"<br>Department Status: ", docObj.DEPT_STATUS,
					"<br>Ordered By: ", docObj.ORD_BY, "'>", docObj.ORD_NAME, "</td>",
					"<td>", docObj.ORD_DT_TM, "</td>",
					"<td>", docObj.ORD_ST_DT_TM, "</td>",
					"<td>", docObj.ORD_STATUS, "</td>",
					"<td>", docObj.DEPT_STATUS, "</td>",
					"</tr> ");
					new_table_cnt++;
			}; //endif
		}; // end for
		//remove the commas from the finished table body array
		schnoutorderTableBody = schnoutorderTableBody.join("");
		if (render_flag == 1){
			schnoutorderHTML.push("<table id='schn_outorders'><thead>",
				"<tr>",
				"<th><span>Order Name</span></th>",
				"<th><span>Order Date</span></th>",
				"<th><span>Order Start Date</span></th>",
				"<th><span>Order Status</span></th>",
				"<th><span>Dept Status</span></th>",
				"</tr></thead><tbody>");
			schnoutorderHTML.push(schnoutorderTableBody);
				  
		// Close the table
		schnoutorderHTML.push("</tbody></table>");
		} else {
			schnoutorderHTML.push("<p>No outstanding pathology orders found</p>"); 
		}; //endif
	} else {
		schnoutorderHTML.push("<p>No outstanding pathology orders found</p>");
	}; //end if
	
	$("#schn-outordertable")[0].innerHTML=schnoutorderHTML.join("");
	//set the subtitle text next to header if needed (uncomment and update if needed)
	component.setProperty("headerSubTitle", "(" + new_table_cnt + ")");
	
	//call tablesorter
	//set default sort column
	$.tablesorter.defaults.sortList = [[2,1]];
	
	$("#schn_outorders").tablesorter({
		//tell tablesorter what format the date is in...dd/mm/yyyy hh:ss is "UK"
		dateFormat: "uk"				   
	});
	
};
schn.outorders.prototype.outorderlookbackopt = function (lookbackoptval, future_check) {
	var component = this;
	var schn_newlookbacktable = new XMLCclRequest();
	schn_newlookbacktable.onreadystatechange=function(){
	   if(schn_newlookbacktable.readyState==4 && schn_newlookbacktable.status==200)
	   {
		var msgLookback = schn_newlookbacktable.responseText;
			if (msgLookback != undefined && msgLookback != null && msgLookback > " ") {
				var jsonLookback = eval('(' + msgLookback+ ')');
			}
			if (jsonLookback){
				//call table rendering here				
				//reset the table data to the new reference and will be used by renderoutordertable
				component.data.ORDERS = jsonLookback.ORDERS;
				component.renderoutordertable(future_check);
				var compId = component.getComponentUid();
				$("#" + compId + " .hvrData").tooltip({
				"track" : true,
				"delay" : 150,
				"fade" : 150
				});
			} 
	   };
	};
	   //  Call the ccl progam and send the parameter string
   schn_newlookbacktable.open('GET', "707_MP_LAB_OUTSTAND_ORDER");
   schn_newlookbacktable.send("^MINE^, $PAT_Personid$,^"+lookbackoptval+"^");
};
*/
//020
//020->

MPage.namespace("schn.outorders");
schn.outorders = function () {};

schn.outorders.option1 = {
	"outorders" : {
		"lookback_ccl" : "2 Y",
		"lookback_desc" : "2 years"
	}
};
schn.outorders.option2 = {
	"outorders" : {
		"lookback_ccl" : "7 D",
		"lookback_desc" : "7 Days"
	}
};

schn.outorders.prototype = new MPage.Component();
schn.outorders.prototype.constructor = MPage.Component;
schn.outorders.prototype.base = MPage.Component.prototype;
schn.outorders.prototype.name = "schn.outorders";
schn.outorders.prototype.cclProgram = "707_mp_lab_outstand_order";
schn.outorders.prototype.cclParams = [];
schn.outorders.prototype.cclDataType = "JSON"; //possible values=> JSON, TEXT, XML

schn.outorders.prototype.init = function (options) {
	//code to perform before immediately rendering (usually updating params is needed)
	var component = this;
	//your options are attached to the options of the object behind the scenes
	//var comp_options = this.options.documents;
	
	component.cclParams.push("MINE");
	//CAN USE ANY OR ALL OF THE FOLLOWING IN ORDER AS NEEDED:
	component.cclParams.push(this.getProperty("personId"));
	//component.cclParams.push(this.getProperty("encounterId"));
	component.cclParams.push("7 D"); //default look back last seven days
	//component.cclParams.push(this.getProperty("userId"));
	//component.cclParams.push(this.getProperty("PPRCode"));
	//component.cclParams.push(this.getProperty("positionCd"));
	//alert('finished init');
	//set the subtitle text next to header if needed (uncomment and update if needed)
	component.setProperty("headerSubTitle", "Loading...");
};

schn.outorders.prototype.addEventHandlers = function (record) {
	var component = this;
	var compId = component.getComponentUid();
	var target = component.getTarget();
	
//	$("#" + compId + " .hvrData").tooltip({
//		"track" : true,
//		"delay" : 150,
//		"fade" : 150
//	});

//020->
	var out_order = $("#"+compId+" .schn-outorder-hvrdata");
	
	var classOfHover = 'nswsbb-hover-highlight';
	var alertsNum = out_order.length;
	for (var i = 0; i < alertsNum; i++) {
		var currentalert = out_order.eq(i);
		currentalert.hover(function () {
			$(this).addClass(classOfHover);
		},
			function () {
			$(this).removeClass(classOfHover);
		});
		var AMO = currentalert.attr("AMO");
//		var annoDisplayName = currentalert.attr("Annotated_Display");
//		if (annoDisplayName === "")
//			annoDisplayName = displayName;
		var tooltipObj = ["<div class='nswsbb-hvr'><dl class='nswsbb-pl-det'><dt><span>Orders Id:</span></dt><dd class='nswsbb-pl-det-name'><span>",currentalert.attr("OrdersId") , 
		"</span></dd><dt><span>Order:</span></dt><dd class='nswsbb-pl-det-annot'><span>", currentalert.attr("Order"), 
		"</span></dd><dt><span>Accession Number:</span></dt><dd class='nswsbb-pl-det-dt'><span>", currentalert.attr("AccessionNumber"),
		"</span></dd><dt><span>Order Detail:</span></dt><dd class='nswsbb-pl-det-dt'><span>", currentalert.attr("OrderDetail"), 
		"</span></dd><dt><span>Order Comments:</span></dt><dd class='nswsbb-pl-det-dt'><span>", currentalert.attr("OrderComments"), 
		"</span></dd><dt><span>Order Date Time:</span></dt><dd class='nswsbb-pl-det-dt'><span>", currentalert.attr("OrderDateTime"), 
		"</span></dd><dt><span>Start Date Time:</span></dt><dd class='nswsbb-pl-det-dt'><span>", currentalert.attr("StartDateTime"), 
		"</span></dd><dt><span>Order Status: </span></dt><dd class='nswsbb-pl-det-comment'><span>", currentalert.attr("OrderStatus"), 
		"</span></dd><dt><span>Department Status: </span></dt><dd class='nswsbb-pl-det-comment'><span>", currentalert.attr("DepartmentStatus"), 
		"</span></dd><dt><span>Ordered By: </span></dt><dd class='nswsbb-pl-det-comment'><span>", currentalert.attr("OrderedBy"), 

		"</span></dd></dl></div>"];
		
		currentalert.qtip({
			content : {
				text : $(tooltipObj.join("")).addClass(classOfHover)
			},
			position : {
				viewport : $(window),
				target : 'mouse',
				adjust : {
					y : 21,
					x : 40,
					method : 'shift shift'
				}
			},
			style : {
				def : false,
				classes : 'nswsbb-hover'
			}
		});
	}
//020<-

	
	//check box validate
	
	$("#schn-future").click(function () {
		//calculate and send the future check box as boolean values
//020	component.renderoutordertable($("#schn-future").attr("checked") == "checked");
		component.renderoutordertable($("#schn-future").prop("checked") == true);

		//reattach tool tip
//		$("#" + compId + " .hvrData").tooltip({
//		"track" : true,
//		"delay" : 150,
//		"fade" : 150
//	});

//020->
	var out_order = $("#"+compId+" .schn-outorder-hvrdata");
	
	var classOfHover = 'nswsbb-hover-highlight';
	var alertsNum = out_order.length;
	for (var i = 0; i < alertsNum; i++) {
		var currentalert = out_order.eq(i);
		currentalert.hover(function () {
			$(this).addClass(classOfHover);
		},
			function () {
			$(this).removeClass(classOfHover);
		});
		var AMO = currentalert.attr("AMO");
//		var annoDisplayName = currentalert.attr("Annotated_Display");
//		if (annoDisplayName === "")
//			annoDisplayName = displayName;
		var tooltipObj = ["<div class='nswsbb-hvr'><dl class='nswsbb-pl-det'><dt><span>Orders Id:</span></dt><dd class='nswsbb-pl-det-name'><span>",currentalert.attr("OrdersId") , 
		"</span></dd><dt><span>Order:</span></dt><dd class='nswsbb-pl-det-annot'><span>", currentalert.attr("Order"), 
		"</span></dd><dt><span>Accession Number:</span></dt><dd class='nswsbb-pl-det-dt'><span>", currentalert.attr("AccessionNumber"),
		"</span></dd><dt><span>Order Detail:</span></dt><dd class='nswsbb-pl-det-dt'><span>", currentalert.attr("OrderDetail"), 
		"</span></dd><dt><span>Order Comments:</span></dt><dd class='nswsbb-pl-det-dt'><span>", currentalert.attr("OrderComments"), 
		"</span></dd><dt><span>Order Date Time:</span></dt><dd class='nswsbb-pl-det-dt'><span>", currentalert.attr("OrderDateTime"), 
		"</span></dd><dt><span>Start Date Time:</span></dt><dd class='nswsbb-pl-det-dt'><span>", currentalert.attr("StartDateTime"), 
		"</span></dd><dt><span>Order Status: </span></dt><dd class='nswsbb-pl-det-comment'><span>", currentalert.attr("OrderStatus"), 
		"</span></dd><dt><span>Department Status: </span></dt><dd class='nswsbb-pl-det-comment'><span>", currentalert.attr("DepartmentStatus"), 
		"</span></dd><dt><span>Ordered By: </span></dt><dd class='nswsbb-pl-det-comment'><span>", currentalert.attr("OrderedBy"), 

		"</span></dd></dl></div>"];
		
		currentalert.qtip({
			content : {
				text : $(tooltipObj.join("")).addClass(classOfHover)
			},
			position : {
				viewport : $(window),
				target : 'mouse',
				adjust : {
					y : 21,
					x : 40,
					method : 'shift shift'
				}
			},
			style : {
				def : false,
				classes : 'nswsbb-hover'
			}
		});
	}
//020<-


	});
	$("#schn_lookbackopt").change(function(){
//020	component.outorderlookbackopt($("#schn_lookbackopt").val(), $("#schn-future").attr("checked") == "checked");
		component.outorderlookbackopt($("#schn_lookbackopt").val(), $("#schn-future").prop("checked") == true);

		var schn_lookbacklabel=$("#schn_lookbackopt :selected").text();
		$("#schn-subtitle").html("Outstanding pathology orders in "+ schn_lookbacklabel);
		//reattach tool tip


		
	});
};

schn.outorders.prototype.getSubHeader = function (str) {
	//note that inline styles could be put in their own class and put as a second class for the div
	return ["<div class='sub-title-disp' id='schn-subtitle' style='margin:-6px -6px 6px -6px;border-left:none;border-right:none;'>", str, "</div>"].join("");
};

schn.outorders.prototype.render = function () {
	var component = this;
	var compId = component.getComponentUid();
	var target = component.getTarget();
	var record = component.data.ORDERS;
	var doc_length = record.ORD.length;
	//var comp_options = component.options.outorders;
	var targetHTML = [];
	//alert('render something!!!');
	//set and create subheader (uncomment and update if needed)
	//targetHTML.push(component.getSubHeader("Selected Visit last " + comp_options.lookback_desc));
	targetHTML.push(component.getSubHeader("Outstanding pathology orders in last 7 days"));
	//set the title text if needed (uncomment and update if needed)
	//component.setProperty("headerTitle", "New Title");
	
	//set the subtitle text next to header if needed (uncomment and update if needed)
	//component.setProperty("headerSubTitle", "(" + doc_length + ")");
	
	//set the component to collapsed (false)/expanded (true) if needed (uncomment and update if needed)
	//component.setProperty("headerShowHideState",true);
	
	//do something here with the targetHTML (component.data will have data type defined by this.cclDataType)
	targetHTML.push("<div class='schn-outorders schn-main-component content-body' id='schn-outorderlist'>",
		"<form action=''><input type='checkbox' id='schn-future' name='future' value='future'>Include future orders?</form>",
		"<select id='schn_lookbackopt'><option value='3 D'>Last 3 Days</option><option value='7 D' selected>Last 7 Days</option><option value='14 D'>Last 14 Days</option><option value='1 M'>Last 1 Month</option><option value='3 M'>Last 3 Months</option></select>",
		"<div id='schn-outordertable'></div></div>");
	
	target.innerHTML = targetHTML.join("");
	
	//call table rendering here
	component.renderoutordertable(false);
	
	//this may or may not be needed
	component.addEventHandlers(record); //call last after the HTML is on the screen, so JQuery can find it
	
};
schn.outorders.prototype.renderoutordertable = function (future_check) {
	
	var num_recs = 0;
	var component = this;
	var schnoutorderHTML = [];
	var schnoutorderTableBody = [];
	var new_record = this.data.ORDERS;
	var new_table_cnt = 0;
	if(new_record.ORD.length>0){
		var render_flag = 0;
		for (var i = 0; i < new_record.ORD.length; i++) {
			var docObj = new_record.ORD[i];
			if (future_check || (!docObj.FUTURE_FLAG && !future_check)) {
				render_flag = 1; //set the flag to render the table only if there are qualifying orders
				schnoutorderTableBody.push(
//					"<tr>",

//					"<td class='hvrData' title='Orders Id: ", docObj.ORD_ID,
//					"<tr class='hvrData' id = 'schn-appts-cell_2' title='Orders Id: ", docObj.ORD_ID,
//					"<tr class='hvrData' id = 'schn-appts-cell_2' ",
					"<tr class='schn-outorder-hvrdata' id = 'schn-appts-cell_2' ",

					'OrdersId="', docObj.ORD_ID, '"',
					'Order="', docObj.ORD_NAME, '"',
					'AccessionNumber="', docObj.ACC_NUM, '"',
					'OrderDetail="', docObj.ORD_DETAIL, '"',
					'OrderComments="', docObj.ORD_COMMENTS, '"',
					'OrderDateTime="', docObj.ORD_DT_TM, '"',
					'StartDateTime="', docObj.ORD_ST_DT_TM, '"',
					'OrderStatus="', docObj.ORD_STATUS, '"',
					'DepartmentStatus="', docObj.DEPT_STATUS, '"',
					'OrderedBy="', docObj.ORD_BY, '"',			
					
//					"<br>Order: ", docObj.ORD_NAME,
//					"<br>Accession Number: ", docObj.ACC_NUM,
//					"<br>Order Detail: ", docObj.ORD_DETAIL,
//					"<br>Order Comments: ", docObj.ORD_COMMENTS,
//					"<br>Order Date Time: ", docObj.ORD_DT_TM,
//					"<br>Start Date Time: ", docObj.ORD_ST_DT_TM,
//					"<br>Order Status: ", docObj.ORD_STATUS,
//					"<br>Department Status: ", docObj.DEPT_STATUS,
//					"<br>Ordered By: ", docObj.ORD_BY, 
					"'>",
					"<td>",	docObj.ORD_NAME, "</td>",
					"<td>", docObj.ORD_DT_TM, "</td>",
					"<td>", docObj.ORD_ST_DT_TM, "</td>",
					"<td>", docObj.ORD_STATUS, "</td>",
					"<td>", docObj.DEPT_STATUS, "</td>",
					"</tr> ");
					new_table_cnt++;
			}; //endif
		}; // end for
		//remove the commas from the finished table body array
		schnoutorderTableBody = schnoutorderTableBody.join("");
		if (render_flag == 1){
			schnoutorderHTML.push("<table id='schn_outorders'><thead>",
				"<tr>",
				"<th><span>Order Name</span></th>",
				"<th><span>Order Date</span></th>",
				"<th><span>Order Start Date</span></th>",
				"<th><span>Order Status</span></th>",
				"<th><span>Dept Status</span></th>",
				"</tr></thead><tbody>");
			schnoutorderHTML.push(schnoutorderTableBody);
				  
		// Close the table
		schnoutorderHTML.push("</tbody></table>");
		} else {
			schnoutorderHTML.push("<p>No outstanding pathology orders found</p>"); 
		}; //endif
	} else {
		schnoutorderHTML.push("<p>No outstanding pathology orders found</p>");
	}; //end if
	
	$("#schn-outordertable")[0].innerHTML=schnoutorderHTML.join("");
	//set the subtitle text next to header if needed (uncomment and update if needed)
	component.setProperty("headerSubTitle", "(" + new_table_cnt + ")");
	
	//call tablesorter
	//set default sort column
	$.tablesorter.defaults.sortList = [[2,1]];
	
	$("#schn_outorders").tablesorter({
		//tell tablesorter what format the date is in...dd/mm/yyyy hh:ss is "UK"
		dateFormat: "uk"				   
	});
	
};
schn.outorders.prototype.outorderlookbackopt = function (lookbackoptval, future_check) {
	var component = this;
	
	//020
	var pid = this.getProperty("personId");
	//alert(pid);
	
	var schn_newlookbacktable = new XMLCclRequest();
	schn_newlookbacktable.onreadystatechange=function(){
	   if(schn_newlookbacktable.readyState==4 && schn_newlookbacktable.status==200)
	   {
		var msgLookback = schn_newlookbacktable.responseText;
			if (msgLookback != undefined && msgLookback != null && msgLookback > " ") {
				var jsonLookback = eval('(' + msgLookback+ ')');
			}
			if (jsonLookback){
				//call table rendering here				
				//reset the table data to the new reference and will be used by renderoutordertable
				component.data.ORDERS = jsonLookback.ORDERS;
				component.renderoutordertable(future_check);
				var compId = component.getComponentUid();
//				$("#" + compId + " .hvrData").tooltip({
//				"track" : true,
//				"delay" : 150,
//				"fade" : 150
//				});

//020->
	var out_order = $("#"+compId+" .schn-outorder-hvrdata");
	
	var classOfHover = 'nswsbb-hover-highlight';
	var alertsNum = out_order.length;
	for (var i = 0; i < alertsNum; i++) {
		var currentalert = out_order.eq(i);
		currentalert.hover(function () {
			$(this).addClass(classOfHover);
		},
			function () {
			$(this).removeClass(classOfHover);
		});
		var AMO = currentalert.attr("AMO");
//		var annoDisplayName = currentalert.attr("Annotated_Display");
//		if (annoDisplayName === "")
//			annoDisplayName = displayName;
		var tooltipObj = ["<div class='nswsbb-hvr'><dl class='nswsbb-pl-det'><dt><span>Orders Id:</span></dt><dd class='nswsbb-pl-det-name'><span>",currentalert.attr("OrdersId") , 
		"</span></dd><dt><span>Order:</span></dt><dd class='nswsbb-pl-det-annot'><span>", currentalert.attr("Order"), 
		"</span></dd><dt><span>Accession Number:</span></dt><dd class='nswsbb-pl-det-dt'><span>", currentalert.attr("AccessionNumber"),
		"</span></dd><dt><span>Order Detail:</span></dt><dd class='nswsbb-pl-det-dt'><span>", currentalert.attr("OrderDetail"), 
		"</span></dd><dt><span>Order Comments:</span></dt><dd class='nswsbb-pl-det-dt'><span>", currentalert.attr("OrderComments"), 
		"</span></dd><dt><span>Order Date Time:</span></dt><dd class='nswsbb-pl-det-dt'><span>", currentalert.attr("OrderDateTime"), 
		"</span></dd><dt><span>Start Date Time:</span></dt><dd class='nswsbb-pl-det-dt'><span>", currentalert.attr("StartDateTime"), 
		"</span></dd><dt><span>Order Status: </span></dt><dd class='nswsbb-pl-det-comment'><span>", currentalert.attr("OrderStatus"), 
		"</span></dd><dt><span>Department Status: </span></dt><dd class='nswsbb-pl-det-comment'><span>", currentalert.attr("DepartmentStatus"), 
		"</span></dd><dt><span>Ordered By: </span></dt><dd class='nswsbb-pl-det-comment'><span>", currentalert.attr("OrderedBy"), 

		"</span></dd></dl></div>"];
		
		currentalert.qtip({
			content : {
				text : $(tooltipObj.join("")).addClass(classOfHover)
			},
			position : {
				viewport : $(window),
				target : 'mouse',
				adjust : {
					y : 21,
					x : 40,
					method : 'shift shift'
				}
			},
			style : {
				def : false,
				classes : 'nswsbb-hover'
			}
		});
	}
//020<-


			} 
	   };
	};
	   //  Call the ccl progam and send the parameter string
   schn_newlookbacktable.open('GET', "707_MP_LAB_OUTSTAND_ORDER");
//020  schn_newlookbacktable.send("^MINE^, $PAT_Personid$,^"+lookbackoptval+"^");
   schn_newlookbacktable.send("^MINE^, "+pid+",^"+lookbackoptval+"^");
};

//020<-
/*$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$*/

/**********************************************************************************************
* Days-Hours-Minutes-Seconds Counter script by Praveen Lobo 
* (http://PraveenLobo.com/techblog/javascript-counter-count-days-hours-minutes-seconds/)
* This notice MUST stay intact(in both JS file and SCRIPT tag) for legal use.
* http://praveenlobo.com/blog/disclaimer/
**********************************************************************************************/
function DaysHMSCounter(initDate, id){
    this.counterDate = new Date(initDate);
    this.container = document.getElementById(id);
    this.update();
}
 
DaysHMSCounter.prototype.calculateUnit=function(secDiff, unitSeconds){
    var tmp = Math.abs((tmp = secDiff/unitSeconds)) < 1? 0 : tmp;
    return Math.abs(tmp < 0 ? Math.ceil(tmp) : Math.floor(tmp));
}
 
DaysHMSCounter.prototype.calculate=function(){
    var secDiff = Math.abs(Math.round(((new Date()) - this.counterDate)/1000));
    this.days = this.calculateUnit(secDiff,86400);
    this.hours = this.calculateUnit((secDiff-(this.days*86400)),3600);
    this.mins = this.calculateUnit((secDiff-(this.days*86400)-(this.hours*3600)),60);
    this.secs = this.calculateUnit((secDiff-(this.days*86400)-(this.hours*3600)-(this.mins*60)),1);
}
 
DaysHMSCounter.prototype.update=function(){ 
    this.calculate();
	this.hour_days = this.hours + (this.days * 24);
	if (this.mins < 10){
		this.mins = '0' + this.mins;
	}
	if (this.secs < 10){
		this.secs = '0' + this.secs;
	}
    this.container.innerHTML =
        //" <strong>" + this.days + "</strong> " + (this.days == 1? "day" : "days") +
        //" <strong>" + this.hours + "</strong> " + (this.hours == 1? "hour" : "hours") +
		//" <strong>" + this.hour_days + "</strong> " + (this.hour_days == 1? "hour" : "hours") +
        //" <strong>" + this.mins + "</strong> " + (this.mins == 1? "min" : "mins") +
        //" <strong>" + this.secs + "</strong> " + (this.secs == 1? "sec" : "secs");
		// this.hour_days + "  hrs  " + this.mins + " mins  " + this.secs + " secs  " ;
		 this.hour_days + "  hrs  " + this.mins + " mins" ;
    var self = this;
    setTimeout(function(){self.update();}, (1000));
}
//window.onload=function(){ new DaysHMSCounter('October 21, 2015 00:00:00', 'counter'); }


/* ******************************************************************************

SCHN Continous Infusions

********************************************************************************/
/* Put name of component here */
MPage.namespace("schn.continfusion");
schn.continfusion = function(){};

schn.continfusion.prototype = new MPage.Component();
schn.continfusion.prototype.constructor = MPage.Component;
schn.continfusion.prototype.base = MPage.Component.prototype;
schn.continfusion.prototype.name = "schn.continfusion";
schn.continfusion.prototype.cclProgram = "707_mp_continous_infusions";
schn.continfusion.prototype.cclParams = [];
schn.continfusion.prototype.cclDataType = "JSON"; //possible values=> JSON, TEXT, XML

schn.continfusion.prototype.init = function(options) {
	//code to perform before immediately rendering (usually updating params is needed)
	var component = this;
	//your options are attached to the options of the object behind the scenes
	//var comp_options = this.options.documents;
	
	component.cclParams.push("MINE");
	//CAN USE ANY OR ALL OF THE FOLLOWING IN ORDER AS NEEDED:
	component.cclParams.push(this.getProperty("personId"));
	//component.cclParams.push(this.getProperty("encounterId"));
	//component.cclParams.push(this.getProperty("userId"));
	//component.cclParams.push(this.getProperty("PPRCode"));
	//component.cclParams.push(this.getProperty("positionCd"));
};

schn.continfusion.prototype.addEventHandlers = function() {
	var component = this;
	var compId = component.getComponentUid();
	var target = component.getTarget();
	
	$("#"+compId+" .classOfElementWithinComponent").click(function(){
		//some stuff to do when clicked
	});
};


schn.continfusion.prototype.getSubHeader = function( str ) {
	//note that inline styles could be put in their own class and put as a second class for the div
	return ["<div class='sub-title-disp' style='margin:-6px -6px 6px -6px;border-left:none;border-right:none;'>",str,"</div>"].join("");
};

schn.continfusion.prototype.render = function() {
	var component = this;
	var compId = component.getComponentUid();
	var target = component.getTarget();
	var record = component.data.ORDERS;
	var doc_length = record.ORD.length; //This is the record structure cnt
	var new_record = this.data.ORDERS;
	//var schnoutorderTableBody = [];
	//var comp_options = component.options.outorders;
	var targetHTML = [];

	//set the subtitle text next to header if needed (uncomment and update if needed)
	//set the SubTitle -> counts total number of orders list and display on the title of the continous mpage component
	component.setProperty("headerSubTitle","(" + doc_length + ")"); 
	// Set the first line words on the continuous mpage component
	targetHTML.push(component.getSubHeader("Time since continuous infusion started. IV fluid bags must be changed every 24 hours according to CHW IV fluid management practice guidelines."));

	//*********************************Main output starts*************************************************
		//do something here with the targetHTML (component.data will have data type defined by this.cclDataType)
		if (doc_length == 0)  // if zero orders found then display no iv results found
	{
		targetHTML.push("<span style='color:black; padding:5px'>No IV Continuous Infusions found</span>");
		target.innerHTML = targetHTML.join("");
	}
	// ****Display IV table data for continuous infusions component*****
	else {
    // set the table
		targetHTML.push("<table id='schn_continousinfusions'><tbody>");
				
// start of for loop to display the table data
  for (var i = 0; i < new_record.ORD.length; i++) {
		var docObj = new_record.ORD[i];   // reset the initial docObj to display for the data for the each row...
        //var myhourspass = docObj.ORD_HOURS;		
		var myhourspass = document.getElementById(docObj.ORD_HOURS);
		if (i%2 == 1){
			j = 1;
		} else {
			j = 2;
		}
	targetHTML.push("<tr ");
	  	if (j == 1 ){
			//targetHTML.push("class='inf_odd'");
			targetHTML.push("style='background-color:#F3F6FD;'") ;// light blue colour  
			} else {
			//targetHTML.push("class='inf_even'");
			targetHTML.push("style='background-color:#FFFFFF;'");//grey colour
		} 
		//targetHTML.push("style='background-color:#FFFFFF;'");//grey colour
		targetHTML.push(">",	
  			"<td colspan='3'><span class='order_name'>" + docObj.ORD_MED_NAME + "</span><span class='cdl'>" + 	" " + docObj.ORD_DETAIL + "</span> </td>",
		//working perfectly for timers  "<td class='details' rowspan='2' id='time'><span class='cell_label'>Time since current bag started: </span><span class='order_name'><div id='counter" + [i] + "'></div></span></td>",
		//15122015	  "<td class='details' rowspan='2' id='time'><span class='cell_label'>Time since current bag started: </span><span class='order_name'><div id='counter" + [i] + "'></div></span></td>",
		    "<td class='details' rowspan='2'><span class='time'>Time since current bag started: </span><span class='order_name2'><div id='counter" + [i] + "'></div></span></td>",
       //11022016
	   //"<td class='details' rowspan='2'><span class='time'>Time since current bag started: </span><span class='cd1'>" + docObj.ORD_ST_DT_TM + "</span></td>",
		// for colour changes"<td rowspan='2'  <div id='counter" + [i] + "' > </div> <div id='counter' Time since current bag started: </div></td>",
	    //"<td class='changeorange_details' rowspan='2'><span class='orangetext'>Time since current bag started: <span class='order_name'><div id='counter" + [i] + "'></div></span></td>",
			"</tr>", // close the odd row from first 2 rows order details 
			 "<tr "); // start the even row from third 2 rows

	if (j == 1) {
		//	targetHTML.push("class='inf_odd'");
		targetHTML.push("style='background-color:#F3F6FD;'");// light blue colour
		//	} else {
		} else {
		//	targetHTML.push("class='inf_even'");
		targetHTML.push("style='background-color:#FFFFFF;'"); //grey colour
		} 

		targetHTML.push(">",
     		   	  "<td class='details'><span class='cell_label'>Current rate:</span><br /><span class='order_name2'>" + docObj.ORD_RATE + "</span></td>",
				  "<td class='details'><span class='cell_label'>Site:</span><br /><span class='order_name2'>" + docObj.ORD_SITE + "</span></td>",
				  "<td class='details'><span class='cell_label'>Current bag number :</span><br /><span class='order_name2'> Bag #" + docObj.ORD_BAG + "</span></td>",
				  "</tr>");	
}	
// start of for loop to display the table data			  
				
		targetHTML.push("</tbody></table>");
		//$$$$$$$$$ works perfect for the table proporties $$$$$$$$$$$$		
				
// start set the timer counter//

   target.innerHTML = targetHTML.join("");
	//for (var i = 0; i < new_record.ORD.length; i++) {
	//start for loop for the timer counter///
	for (var i=0; i<new_record.ORD.length; i++){
	   var docObj = new_record.ORD[i];  // reset the initial docObj to display for the data for the each row...
		var cntr = 'counter' + [i];
	    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	//	var myDate = "30\/01\/2016 00:00:00"; //docObj.ORD_ST_DT_TM.split(" ");
		var myDate = docObj.ORD_ST_DT_TM.split(" ");
		var datearray = myDate[0].split("/");
		
		var newDateTime = months[datearray[1] -1] + ' ' + datearray[0] + ', ' + datearray[2] + " " + myDate[1];
		//alert(cntr);
	//	alert(myDate);
	//	alert(datearray);
     // alert(newDateTime);	  
	   new DaysHMSCounter(newDateTime, cntr);
	
		var parenti = document.getElementById(cntr);
		var children = parenti.firstChild.nodeValue
		var hoursPassed = children.substring(0,2);
		
	   // if (hoursPassed < 23 ) {
		// parenti.className = "timedetails";
		//}
	if (hoursPassed > 22 && hoursPassed < 24) {
		parenti.className = "alert_orange";	
		}
		
		if (hoursPassed > 23 ) {
		 parenti.className = "alert_red";
		}
    } // endfor //end for loop for the timer counter///
//new DaysHMSCounter('February 10, 2016 10:30:00', 'counter');
		}  
		//$$$$$$$$$ works perfect  $$$$$$$$$$$$	
};



/* ----------------------------------------------------------------------------------

SCHN ALERTS COMPONENT

------------------------------------------------------------------------------------*/


/* Put name of component here */
//019 toolttips is not working for MPage V6
/*

MPage.namespace("schn.alerts2");
schn.alerts2 = function(){};

schn.alerts2.prototype = new MPage.Component();
schn.alerts2.prototype.constructor = MPage.Component;
schn.alerts2.prototype.base = MPage.Component.prototype;
schn.alerts2.prototype.name = "schn.alerts2";
schn.alerts2.prototype.cclProgram = "707_mp_alerts_and_plans";
schn.alerts2.prototype.cclParams = [];
schn.alerts2.prototype.cclDataType = "JSON"; //possible values=> JSON, TEXT, XML

schn.alerts2.prototype.init = function(options) {
	//code to perform before immediately rendering (usually updating params is needed)
	var component = this;
	component.cclParams.push("MINE");
	//CAN USE ANY OR ALL OF THE FOLLOWING IN ORDER AS NEEDED:
	component.cclParams.push(this.getProperty("personId"));
//018 component.cclParams.push(this.getProperty("encounterId"));
	//component.cclParams.push(this.getProperty("userId"));
	//component.cclParams.push(this.getProperty("PPRCode"));
	//component.cclParams.push(this.getProperty("positionCd"));
};

schn.alerts2.prototype.addEventHandlers = function() {
	var component = this;
	var compId = component.getComponentUid();
	var target = component.getTarget();
	
	//$("#"+compId+" .classOfElementWithinComponent").click(function(){
	$("#"+compId+" .sub-sec-hd").click(function(){
		//some stuff to do when clicked
		$(this).parent().toggleClass("closed");
	});
};

schn.alerts2.prototype.getSubHeader = function( str ) {
	//note that inline styles could be put in their own class and put as a second class for the div
	return ["<div class='sub-title-disp' style='margin:-6px -6px 6px -6px;border-left:none;border-right:none;'>",str,"</div>"].join("");
};

schn.alerts2.prototype.render = function() {
	var component = this;
	var compId = component.getComponentUid();
	var target = component.getTarget();
	var record = component.data.ALERTS;
	var c_alert = record.ALERT;
	var nc_alert = record.NONCLINALERTS;
	var c_alert_length = c_alert.length;
	var nc_alert_length = nc_alert.length;
	var targetHTML = [];
	//set and create subheader (uncomment and update if needed)
	targetHTML.push(component.getSubHeader("Click links to view Management Plans"));
	
	//set the title text if needed (uncomment and update if needed)
	//component.setProperty("headerTitle", "New Title");
	
	//set the subtitle text next to header if needed (uncomment and update if needed)
	var total_alerts = 0;
	total_alerts = total_alerts + c_alert.length;
	if (nc_alert[0].PT_ALERT.length != 0) {
		total_alerts = total_alerts + 1;
	}
	if (nc_alert[0].SOCIAL_ALERTS[0].SOCIAL_ALERT.length != 0) {
		total_alerts = total_alerts + nc_alert[0].SOCIAL_ALERTS.length;
	}
	component.setProperty("headerSubTitle","(" + total_alerts + ")");
	
	//set the component to collapsed (false)/expanded (true) if needed (uncomment and update if needed)
	//component.setProperty("headerShowHideState",true);
	
	//do something here with the targetHTML (component.data will have data type defined by this.cclDataType)
	
	if (nc_alert[0].DECEASED == "No") {
		targetHTML.push('<div class="content-body">');
		targetHTML.push('<div class="sub-sec"><h3 class="sub-sec-hd"><span class="sub-sec-hd-tgl">-</span><span class="sub-sec-title">Clinical Alerts</span></h3>');
		if (c_alert_length > 0) {
			//targetHTML.push('<p>There are ' + c_alert_length + ' alerts</>');
			targetHTML.push('<div class="sub-sec-content"><table><tbody>');
		
			for (i=0;i<c_alert_length;i++){
				targetHTML.push('<tr class="hvrData" title="',
							//hover tooltip in the title>',
							'Alert: <b>' + c_alert[i].DESC + '</b><br />',
							'Annotated Display: ' + c_alert[i].ANNOTATED + '<br />',
							'Onset Date: ' + c_alert[i].ONSET + '<br />',
							'Responsible Provider: ' + c_alert[i].RESP_PROV + '<br />',
							'Last Updated: ' + c_alert[i].UPDT_DT_TM + '<br />',
							'Last Updated By: ' + c_alert[i].UPDT_PROV + '<br />',
							'Comments: ' + c_alert[i].COMMENTS,
							'">');
				if (c_alert[i].SOURCE_ID === "AL00113") {   //allow natural death	
//018				targetHTML.push("<td class='schn-alerts-cell'><a class='schn-link' href='javascript:CCLLINK(\"707_AND_FORM_DATA\", \"^MINE^, value($pat_personid$)\", 0)' >" + c_alert[i].ANNOTATED + "</a></td>");
					targetHTML.push("<td class='schn-alerts-cell'><a class='schn-link' href='javascript:CCLLINK(\"707_AND_FORM_DATA\", \"^MINE^, "+c_alert[i].PATIENT_ID+"\", 0)' >" + c_alert[i].ANNOTATED + "</a></td>");
					
				} else if ((c_alert[i].SOURCE_ID === "AL00109") || (c_alert[i].SOURCE_ID === "AL00128") || (c_alert[i].SOURCE_ID === "AL00129") || (c_alert[i].SOURCE_ID === "AL00130")){   //Kids GPS or neuro/seizure plans.	
					if (c_alert[i].ENCOUNTER_ID > 0) { //Checking encounter_ID as if component is visible on organiser-level MPage eg Dynamic Worklist, there is no encounter_ID
						targetHTML.push("<td class='schn-alerts-cell'><a class='schn-link' href='javascript:APPLINK(0,\"Powerchart.exe\",\"/PERSONID="+c_alert[i].PATIENT_ID+" /ENCNTRID="+c_alert[i].ENCOUNTER_ID+" /FIRSTTAB=^Acute Management Plans^\")' >" + c_alert[i].ANNOTATED + "</a></td>");
					} else {
						targetHTML.push("<td class='schn-alerts-cell'>" + c_alert[i].ANNOTATED + " - see Acute Management Plans</td>");
					}
				} else if (c_alert[i].SOURCE_ID === "AL00118") {   //Intrathecal baclofen plan.	
//018					targetHTML.push("<td class='schn-alerts-cell'><a class='schn-link' href='javascript:CCLLINK(\"707_REHAB_IBAC_PUMP\", \"^MINE^, value($pat_personid$)\", 0)' >" + c_alert[i].ANNOTATED + "</a></td>");
					targetHTML.push("<td class='schn-alerts-cell'><a class='schn-link' href='javascript:CCLLINK(\"707_REHAB_IBAC_PUMP\", \"^MINE^, "+c_alert[i].PATIENT_ID+"\", 0)' >" + c_alert[i].ANNOTATED + "</a></td>");

				} else if (c_alert[i].SOURCE_ID === "AL00120") {   //adrenal insufficiency plan	
//018					targetHTML.push("<td class='schn-alerts-cell'><a class='schn-link' href='javascript:CCLLINK(\"707_ADRENAL_PLAN\", \"^MINE^, value($pat_personid$)\", 0)' >" + c_alert[i].ANNOTATED + "</a></td>");
					targetHTML.push("<td class='schn-alerts-cell'><a class='schn-link' href='javascript:CCLLINK(\"707_ADRENAL_PLAN\", \"^MINE^, "+c_alert[i].PATIENT_ID+"\", 0)' >" + c_alert[i].ANNOTATED + "</a></td>");

				}  else if (c_alert[i].SOURCE_ID === "AL00123") {   //Respiratory Support Service	
//018					targetHTML.push("<td class='schn-alerts-cell'><a class='schn-link' href='javascript:CCLLINK(\"707_RESPS_FORM_DATA\", \"^MINE^, value($pat_personid$)\", 0)' >" + c_alert[i].ANNOTATED + "</a></td>");
					targetHTML.push("<td class='schn-alerts-cell'><a class='schn-link' href='javascript:CCLLINK(\"707_RESPS_FORM_DATA\", \"^MINE^, "+c_alert[i].PATIENT_ID+"\", 0)' >" + c_alert[i].ANNOTATED + "</a></td>");

				} else if (c_alert[i].DESC === "Severe Asthma Action Plan (Acute Management Plan tab)") {
//018					targetHTML.push("<td class='schn-alerts-cell'><a class='schn-link' href='javascript:CCLLINK(\"707_SEVERE_ASTHMA_DATA\", \"^MINE^, value($pat_personid$)\", 0)' >" + c_alert[i].ANNOTATED + "</a></td>");
					targetHTML.push("<td class='schn-alerts-cell'><a class='schn-link' href='javascript:CCLLINK(\"707_SEVERE_ASTHMA_DATA\", \"^MINE^, "+c_alert[i].PATIENT_ID+"\", 0)' >" + c_alert[i].ANNOTATED + "</a></td>");

				} else {
					targetHTML.push('<td class="schn-alerts-cell">' + c_alert[i].ANNOTATED + '</td>');
				}
				
				targetHTML.push('<td class="schn-alerts-cell">' + c_alert[i].SOURCE_ID + '</td>',
							'</tr>');
			}
		
			targetHTML.push ('</tbody></table></div></div>');	
			targetHTML.push('</div>');   //close content-body
		} else {
			//targetHTML.push('<table><tr><td class="schn-alerts-cell">There are no clinical alerts for this patient.</td></tr></table>');
			targetHTML.push("<div class='sub-sec-content'><span class='res-none'>There are no clinical alerts for this patient.</span></div>");
		}
			
		targetHTML.push('<div class="sub-sec"><h3 class="sub-sec-hd"><span class="sub-sec-hd-tgl">-</span><span class="sub-sec-title">Non-Clinical Alerts</span></h3>');
		if ((nc_alert[0].PT_ALERT.length > 0) || (nc_alert[0].SOCIAL_ALERTS[0].SOCIAL_ALERT.length > 1)) {
			targetHTML.push('<div class="sub-sec-content"><table><tbody>');
			if (nc_alert[0].PT_ALERT.length > 0) {
				targetHTML.push('<tr><td  class="schn-alerts-cell" colspan="2"><b>Patient Alert:</b></td></tr>');
				targetHTML.push('<tr><td  class="schn-alerts-cell" colspan="2">' + nc_alert[0].PT_ALERT + '</td></tr>');
			}
			if (nc_alert[0].SOCIAL_ALERTS[0].SOCIAL_ALERT.length > 1) {
				targetHTML.push('<tr><td class="schn-alerts-cell"><b>Social Alert:</b></td><td class="schn-alerts-cell"><b>Last Updated</b></td></tr>');
				for (m=0;m < nc_alert[0].SOCIAL_ALERTS.length; m++){
					targetHTML.push('<tr><td class="schn-alerts-cell">' + nc_alert[0].SOCIAL_ALERTS[m].SOCIAL_ALERT + '</td><td class="schn-alerts-cell">' + nc_alert[0].SOCIAL_ALERTS[m].SOCIAL_UPDT + '</td></tr>');
				}				
			}
			targetHTML.push('</tbody></table></div>');
		} else {
			targetHTML.push("<div class='sub-sec-content'><span class='res-none'>There are no Patient or Social alerts entered for this patient.</span></div>");
		}
			
	} else {
		targetHTML.push('<table class="schn-alerts-table"><tr><td class="schn-alerts-cell">' + nc_alert[0].DECEASED );
		if (nc_alert[0].DEC_DATE > ""){
			targetHTML.push('<br />Deceased Date: ' + nc_alert[0].DEC_DATE );
		}
		targetHTML.push('<br />' + nc_alert[0].DEC_EST + '</td></tr></table>');
	}
		
	target.innerHTML = targetHTML.join("");
	
	//hover tooltip...
	$("#" + compId + " .hvrData").tooltip({
		"track" : true,
		"delay" : 100,
		"fade" : 150
	});
	//this may or may not be needed
	component.addEventHandlers();
};  //end schn.alerts2
//019
*/

//019-> using qtip for hover data display
/* Put name of component here */
MPage.namespace("schn.alerts2");
schn.alerts2 = function(){};

schn.alerts2.prototype = new MPage.Component();
schn.alerts2.prototype.constructor = MPage.Component;
schn.alerts2.prototype.base = MPage.Component.prototype;
schn.alerts2.prototype.name = "schn.alerts2";
schn.alerts2.prototype.cclProgram = "707_mp_alerts_and_plans";
schn.alerts2.prototype.cclParams = [];
schn.alerts2.prototype.cclDataType = "JSON"; //possible values=> JSON, TEXT, XML

schn.alerts2.prototype.init = function(options) {
	//code to perform before immediately rendering (usually updating params is needed)
	var component = this;
	component.cclParams.push("MINE");
	//CAN USE ANY OR ALL OF THE FOLLOWING IN ORDER AS NEEDED:
	component.cclParams.push(this.getProperty("personId"));
	component.cclParams.push(this.getProperty("encounterId"));
	//component.cclParams.push(this.getProperty("userId"));
	//component.cclParams.push(this.getProperty("PPRCode"));
	//component.cclParams.push(this.getProperty("positionCd"));
};

schn.alerts2.prototype.addEventHandlers = function() {
	var component = this;
	var compId = component.getComponentUid();
	var target = component.getTarget();
	
	//$("#"+compId+" .classOfElementWithinComponent").click(function(){
	
	$("#"+compId+" .sub-sec-hd").click(function(){
		//some stuff to do when clicked
		$(this).parent().toggleClass("closed");
	});
//019->	
	var clin_alerts = $("#"+compId+" .schn-alert-tip");
	
	var classOfHover = 'nswsbb-hover-highlight';
	var alertsNum = clin_alerts.length;
	for (var i = 0; i < alertsNum; i++) {
		var currentalert = clin_alerts.eq(i);
		currentalert.hover(function () {
			$(this).addClass(classOfHover);
		},
			function () {
			$(this).removeClass(classOfHover);
		});
		var displayName = currentalert.attr("Alert");
		var annoDisplayName = currentalert.attr("Annotated_Display");
		if (annoDisplayName === "")
			annoDisplayName = displayName;
		var tooltipObj = ["<div class='nswsbb-hvr'><dl class='nswsbb-pl-det'><dt><span>Alert:</span></dt><dd class='nswsbb-pl-det-name'><span><b>", displayName, 
							"</b></span></dd><dt><span>Annotated Display Name:</span></dt><dd class='nswsbb-pl-det-annot'><span>", annoDisplayName, 
							"</span></dd><dt><span>Onset Date:</span></dt><dd class='nswsbb-pl-det-dt'><span>", currentalert.attr("Onset_Date"),
							"</span></dd><dt><span>Responsible Provider:</span></dt><dd class='nswsbb-pl-det-dt'><span>", currentalert.attr("Responsible_Provider"), 
							"</span></dd><dt><span>Last Update:</span></dt><dd class='nswsbb-pl-det-dt'><span>", currentalert.attr("Last_Updated"), 
							"</span></dd><dt><span>Last Updated By:</span></dt><dd class='nswsbb-pl-det-dt'><span>", currentalert.attr("Last_Updated_By"), 
							"</span></dd><dt><span>Comments: </span></dt><dd class='nswsbb-pl-det-comment'><span>", currentalert.attr("Comments"), 
							"</span></dd></dl></div>"];
		
		currentalert.qtip({
			content : {
				text : $(tooltipObj.join("")).addClass(classOfHover)
			},
			position : {
				viewport : $(window),
				target : 'mouse',
				adjust : {
					y : 21,
					x : 40,
					method : 'shift shift'
				}
			},
			style : {
				def : false,
				classes : 'nswsbb-hover'
			}
		});
	}
//019<-	
};

schn.alerts2.prototype.getSubHeader = function( str ) {
	//note that inline styles could be put in their own class and put as a second class for the div
	return ["<div class='sub-title-disp' style='margin:-6px -6px 6px -6px;border-left:none;border-right:none;'>",str,"</div>"].join("");
};

schn.alerts2.prototype.render = function() {
	var component = this;
	var compId = component.getComponentUid();
	var target = component.getTarget();
	var record = component.data.ALERTS;
	var c_alert = record.ALERT;
	var nc_alert = record.NONCLINALERTS;
	var c_alert_length = c_alert.length;
	var nc_alert_length = nc_alert.length;
	var targetHTML = [];
	//set and create subheader (uncomment and update if needed)
	targetHTML.push(component.getSubHeader("Click links to view Management Plans"));
	
	//set the title text if needed (uncomment and update if needed)
	//component.setProperty("headerTitle", "New Title");
	
	//set the subtitle text next to header if needed (uncomment and update if needed)
	var total_alerts = 0;
	total_alerts = total_alerts + c_alert.length;
	if (nc_alert[0].PT_ALERT.length != 0) {
		total_alerts = total_alerts + 1;
	}
	if (nc_alert[0].SOCIAL_ALERTS[0].SOCIAL_ALERT.length != 0) {
		total_alerts = total_alerts + nc_alert[0].SOCIAL_ALERTS.length;
	}
	component.setProperty("headerSubTitle","(" + total_alerts + ")");
	
	//set the component to collapsed (false)/expanded (true) if needed (uncomment and update if needed)
	//component.setProperty("headerShowHideState",true);
	
	//do something here with the targetHTML (component.data will have data type defined by this.cclDataType)
	
	if (nc_alert[0].DECEASED == "No") {
		targetHTML.push('<div class="content-body">');
		targetHTML.push('<div class="sub-sec"><h3 class="sub-sec-hd"><span class="sub-sec-hd-tgl">-</span><span class="sub-sec-title">Clinical Alerts</span></h3>');
		if (c_alert_length > 0) {



			targetHTML.push('<div class="sub-sec-content">');

			

			for (i=0;i<c_alert_length;i++){
				
				targetHTML.push('<div class="schn-alert-tip"',

							//hover attributes>

							'Alert="', c_alert[i].DESC, '"',
							'Annotated_Display="', c_alert[i].ANNOTATED, '"',
							'Onset_Date="', c_alert[i].ONSET, '"',
							'Responsible_Provider="', c_alert[i].RESP_PROV, '"',
							'Last_Updated="', c_alert[i].UPDT_DT_TM, '"',
							'Last_Updated_By="', c_alert[i].UPDT_PROV, '"',
							'Comments="', c_alert[i].COMMENTS,
							'">');
				
				if (c_alert[i].SOURCE_ID === "AL00113") {   //allow natural death	
//019				targetHTML.push("<span class='schn-alerts-cell'><a class='schn-link' href='javascript:CCLLINK(\"707_AND_FORM_DATA\", \"^MINE^, value($pat_personid$)\", 0)' >" + c_alert[i].ANNOTATED + "</a></span>");
					targetHTML.push("<span class='schn-alerts-cell'><a class='schn-link' href='javascript:CCLLINK(\"707_AND_FORM_DATA\", \"^MINE^, "+c_alert[i].PATIENT_ID+"\", 0)' >" + c_alert[i].ANNOTATED + "</a></span>");
//023	& 025			
				} else if ((c_alert[i].SOURCE_ID === "AL00109") || (c_alert[i].SOURCE_ID === "AL00128") || (c_alert[i].SOURCE_ID === "AL00129") || (c_alert[i].SOURCE_ID === "AL00130")){   //Kids GPS or neuro/seizure plans.		
					if (c_alert[i].ENCOUNTER_ID > 0) { //Checking encounter_ID as if component is visible on organiser-level MPage eg Dynamic Worklist, there is no encounter_ID
						targetHTML.push("<td class='schn-alerts-cell'><a class='schn-link' href='javascript:APPLINK(0,\"Powerchart.exe\",\"/PERSONID="+c_alert[i].PATIENT_ID+" /ENCNTRID="+c_alert[i].ENCOUNTER_ID+" /FIRSTTAB=^Acute Management Plans New^\")' >" + c_alert[i].ANNOTATED + "</a></td>");
					} else {
						targetHTML.push("<td class='schn-alerts-cell'>" + c_alert[i].ANNOTATED + " - see Acute Management Plans</td>");
					}
					
				} else if (c_alert[i].SOURCE_ID === "AL00118") {   //Intrathecal baclofen plan.	
//019				targetHTML.push("<span class='schn-alerts-cell'><a class='schn-link' href='javascript:CCLLINK(\"707_REHAB_IBAC_PUMP\", \"^MINE^, value($pat_personid$)\", 0)' >" + c_alert[i].ANNOTATED + "</a></span>");
					targetHTML.push("<span class='schn-alerts-cell'><a class='schn-link' href='javascript:CCLLINK(\"707_REHAB_IBAC_PUMP\", \"^MINE^, "+c_alert[i].PATIENT_ID+"\", 0)' >" + c_alert[i].ANNOTATED + "</a></span>");

				} else if (c_alert[i].SOURCE_ID === "AL00120") {   //adrenal insufficiency plan	
//019				targetHTML.push("<span class='schn-alerts-cell'><a class='schn-link' href='javascript:CCLLINK(\"707_ADRENAL_PLAN\", \"^MINE^, value($pat_personid$)\", 0)' >" + c_alert[i].ANNOTATED + "</a></span>");
					targetHTML.push("<span class='schn-alerts-cell'><a class='schn-link' href='javascript:CCLLINK(\"707_ADRENAL_PLAN\", \"^MINE^, "+c_alert[i].PATIENT_ID+"\", 0)' >" + c_alert[i].ANNOTATED + "</a></span>");

				}  else if (c_alert[i].SOURCE_ID === "AL00123") {   //Respiratory Support Service	
//019				targetHTML.push("<span class='schn-alerts-cell'><a class='schn-link' href='javascript:CCLLINK(\"707_RESPS_FORM_DATA\", \"^MINE^, value($pat_personid$)\", 0)' >" + c_alert[i].ANNOTATED + "</a></span>");
					targetHTML.push("<span class='schn-alerts-cell'><a class='schn-link' href='javascript:CCLLINK(\"707_RESPS_FORM_DATA\", \"^MINE^, "+c_alert[i].PATIENT_ID+"\", 0)' >" + c_alert[i].ANNOTATED + "</a></span>");

				} else if (c_alert[i].DESC === "Severe Asthma Action Plan (Acute Management Plan tab)") {
//019				targetHTML.push("<span class='schn-alerts-cell'><a class='schn-link' href='javascript:CCLLINK(\"707_SEVERE_ASTHMA_DATA\", \"^MINE^, value($pat_personid$)\", 0)' >" + c_alert[i].ANNOTATED + "</a></span>");
					targetHTML.push("<span class='schn-alerts-cell'><a class='schn-link' href='javascript:CCLLINK(\"707_SEVERE_ASTHMA_DATA\", \"^MINE^, "+c_alert[i].PATIENT_ID+"\", 0)' >" + c_alert[i].ANNOTATED + "</a></span>");

				} else {
					targetHTML.push('<span class="schn-alerts-cell">' + c_alert[i].ANNOTATED + '</span>');
				}
				
				targetHTML.push('<span class="schn-alerts-cell">&nbsp;(' + c_alert[i].SOURCE_ID + ')</span>');

				targetHTML.push('</div>');   //close schn-alert-tip

			}

			

			targetHTML.push ('</div>');	// close sub-sec-content



		} else {


			targetHTML.push("<div class='sub-sec-content'><span class='res-none'>There are no clinical alerts for this patient.</span></div>");
		}

		targetHTML.push('</div>');  //close sub-sec	

		targetHTML.push('<div class="sub-sec"><h3 class="sub-sec-hd"><span class="sub-sec-hd-tgl">-</span><span class="sub-sec-title">Non-Clinical Alerts</span></h3>');
		if ((nc_alert[0].PT_ALERT.length > 0) || (nc_alert[0].SOCIAL_ALERTS[0].SOCIAL_ALERT.length > 1)) {
			targetHTML.push('<div class="sub-sec-content"><table><tbody>');
			if (nc_alert[0].PT_ALERT.length > 0) {
				targetHTML.push('<tr><td  class="schn-alerts-cell" colspan="2"><b>Patient Alert:</b></td></tr>');
				targetHTML.push('<tr><td  class="schn-alerts-cell" colspan="2">' + nc_alert[0].PT_ALERT + '</td></tr>');
			}
			if (nc_alert[0].SOCIAL_ALERTS[0].SOCIAL_ALERT.length > 1) {
				targetHTML.push('<tr><td class="schn-alerts-cell"><b>Social Alert:</b></td><td class="schn-alerts-cell"><b>Last Updated</b></td></tr>');
				for (m=0;m < nc_alert[0].SOCIAL_ALERTS.length; m++){
					targetHTML.push('<tr><td class="schn-alerts-cell">' + nc_alert[0].SOCIAL_ALERTS[m].SOCIAL_ALERT + '</td><td class="schn-alerts-cell">' + nc_alert[0].SOCIAL_ALERTS[m].SOCIAL_UPDT + '</td></tr>');
				}				
			}
			targetHTML.push('</tbody></table></div>');   //close sub-sec-content
		} else {
			targetHTML.push("<div class='sub-sec-content'><span class='res-none'>There are no Patient or Social alerts entered for this patient.</span></div>");
		}

		targetHTML.push('</div>');   //close sub-sec	

	} else {
		targetHTML.push('<table class="schn-alerts-table"><tr><td class="schn-alerts-cell">' + nc_alert[0].DECEASED );
		if (nc_alert[0].DEC_DATE > ""){
			targetHTML.push('<br />Deceased Date: ' + nc_alert[0].DEC_DATE );
		}
		targetHTML.push('<br />' + nc_alert[0].DEC_EST + '</td></tr></table>');
	}

	targetHTML.push('</div>');  //close content-body	

	target.innerHTML = targetHTML.join("");
	
	//hover tooltip...
//019	$("#" + compId + " .hvrData").tooltip({
//		"track" : true,
//		"delay" : 100,
//		"fade" : 150
//	});
	//this may or may not be needed
	component.addEventHandlers();
};  //end schn.alerts2

//019<-


/********************************************************************************

SCHN INCOMPLETE DISCHARGE SUMMARIES

/********************************************************************************/


/* Put name of component here */
MPage.namespace("schn.dc_analytics");
schn.dc_analytics = function(){};

schn.dc_analytics.prototype = new MPage.Component();
schn.dc_analytics.prototype.constructor = MPage.Component;
schn.dc_analytics.prototype.base = MPage.Component.prototype;
schn.dc_analytics.prototype.name = "schn.dc_analytics";
schn.dc_analytics.prototype.cclProgram = "707_MP_DYNDOC_EXTRACT";
schn.dc_analytics.prototype.cclParams = [];
schn.dc_analytics.prototype.cclDataType = "JSON"; //possible values=> JSON, TEXT, XML

schn.dc_analytics.prototype.init = function(options) {
	//code to perform before immediately rendering (usually updating params is needed)
	var component = this;
	component.cclParams.push("MINE");
	//CAN USE ANY OR ALL OF THE FOLLOWING IN ORDER AS NEEDED:
	//component.cclParams.push(this.getProperty("personId"));
	//component.cclParams.push(this.getProperty("encounterId"));
	//component.cclParams.push(this.getProperty("userId"));
	//component.cclParams.push(this.getProperty("PPRCode"));
	//component.cclParams.push(this.getProperty("positionCd"));
};

schn.dc_analytics.prototype.addEventHandlers = function() {
	var component = this;
	var compId = component.getComponentUid();
	var target = component.getTarget();
	
	$("#"+compId+" .dc-selector").change(function(event){
		//alert("Changed a filter");
		if(event.target.id == 'schn-dc-amo'){
			$('#schn-dc-myOwn').removeAttr('checked');
		}
		$("#dc-hover").html("");
		component.updateFilters();
	});
	
	$("#"+compId+" .dc-check").change(function(){
		//alert("Changed checkbox");
		$('#schn-dc-amo option').prop('selected', function(){
			return this.defaultSelected;
		});
		$("#dc-hover").html("");
		component.updateFilters();
	});
	
	$("#"+compId+" .schn-close").click(function(){
		var modal = document.getElementById('schn-dc-modal');			//X close modal window
		modal.style.display = "none";
	});
	
	$("#"+compId+" .schn-modal").click(function(){						// close modal window
		this.style.display = "none";
	});
	
};

schn.dc_analytics.prototype.getSubHeader = function( str ) {
	//note that inline styles could be put in their own class and put as a second class for the div
	return ["<div class='sub-title-disp' style='margin:-6px -6px 6px -6px;border-left:none;border-right:none;'>",str,"</div>"].join("");
};

var rangeLook, faclook, wardLook, medLook, medLook_cd, amoLook, amoLook_cd, myLook = false;
var user_id;
var dcsumm_copy = [];   // copy of JSON for global use
var dcPieChart;			//to store place for pie chart, for global reference
var modal, close;		//to store references to modal windows, for global use

schn.dc_analytics.prototype.render = function() {
	var component = this;
	var compId = component.getComponentUid();
	var target = component.getTarget();
	var targetHTML = [];
	var dcrecord = component.data.ENC;
	var dcsumm = dcrecord.QUAL;
	//trim the ward to allow string matching
	for(i=0;i<dcsumm.length;i++){
		dcsumm[i].WARD = dcsumm[i].WARD.trim();
	}
	dcsumm_copy = dcsumm;  // copy to the global array
	var dcamo = dcrecord.AMOFILTER;
	var dcmed = dcrecord.MEDSERVICEFILTER;
	var dcward = dcrecord.WARDFILTER;
	var dcuser = dcrecord.USER;
	user_id = dcuser[0].USER_ID;

	rangeLook = 7;
	faclook = 'CHW';
	wardLook = 'All';
	medLook = 'All';
	medLook_cd = 'All';
	amoLook = 'All';
	amoLook_cd = 'All';
	
	var defaultRange = dcsumm.filter(function(v,i) {
    	return v.DISDT_RANGE === 7;
	});
	
	//set and create subheader (uncomment and update if needed)
	targetHTML.push(component.getSubHeader("Lists discharged patients only. AMO's, Wards, and Medical Services without incomplete discharges are not listed in drop-down filters"));
	
	//set the title text if needed (uncomment and update if needed)
	//component.setProperty("headerTitle", "New Title");
	
	//set the subtitle text next to header if needed (uncomment and update if needed)
	//component.setProperty("headerSubTitle","(10)");
	
	//set the component to collapsed (false)/expanded (true) if needed (uncomment and update if needed)
	//component.setProperty("headerShowHideState",true);
	
	//do something here with the targetHTML (component.data will have data type defined by this.cclDataType)
	
	targetHTML.push('<form><fieldset>',
						'<div class="selection">',
						'<label for="schn-dc-lookback">Lookback Range: </label>',
						'<select name="lookback" id="schn-dc-lookback" size="1" class="dc-selector">',
							'<option value="7" selected="selected">7 Days</option>',
							'<option value="14">14 Days</option>',
							'<option value="30">30 Days</option>',
						'</select>',
						'</div>',
						'<div class="selection">',
						'<label for="schn-dc-facility">Facility: </label>',
						'<select name="facility" id="schn-dc-facility" size="1" class="dc-selector">',
							'<option value="CHW" selected="selected">CHW</option>',
						'</select>',
						'</div>',
						'<div class="selection">',
						'<label for="schn-dc-wards">Ward: </label>',
						'<select name="wards" id="schn-dc-wards" size="1" class="dc-selector">',
							'<option value="All" selected="selected">All</option>');
							
							for (i=0;i<dcward.length;i++){
								targetHTML.push('<option value="' + dcward[i].WARD_NAME.trim() + '">' + dcward[i].WARD_NAME.trim() + '</option>');
							}	
						targetHTML.push('</select>',
						'</div>');

	targetHTML.push('<div class="selection">',
						'<label for="schn-dc-medserv">Medical Service: </label>',
						'<select name="medserv" id="schn-dc-medserv" class="dc-selector">',
							'<option value="All">All</option>');
						
							for (i=0;i<dcmed.length;i++){
								targetHTML.push('<option value="' + dcmed[i].MED_SERVICE_CODES + '">' + dcmed[i].MED_SERVICE_NAME.trim() + '</option>');
							}
		targetHTML.push('</select>');
						
	targetHTML.push('</div>');
	
	targetHTML.push('<div class="selection">',
						'<label for="schn-dc-amo">Attending Medical Officer: </label>',
						'<select name="amo" id="schn-dc-amo" class="dc-selector">',
							'<option value="All">All</option>');
							
							for (j=0;j<dcamo.length;j++){
								targetHTML.push('<option value="' + dcamo[j].AMO_PERSON_ID + '">' + dcamo[j].AMO_NAME.trim() + '</option>');
							}
	
		targetHTML.push('</select>',
						'</div>');
	
	targetHTML.push('<div class="selection">',
						'<label for="schn-dc-myOwn">My records only: </label>',
						'<input type="checkbox" name="schn-dc-myOwn" value="myOwn" id="schn-dc-myOwn" class="dc-check" style="float: left;"><span class="schn-instruction"> includes AMO, author, or Updated by</span>',
					'</div>');
	
	targetHTML.push('</fieldset></form>');
	targetHTML.push('<div id="dc-hover"></div>');
	//pie chart display
	targetHTML.push('<div id="dc-chart" class="dc-pie-chart" style="width:100%;height:250px"></div>');
	
	//modal pop up window for on-click event
	targetHTML.push('<div id="schn-dc-modal" class="schn-modal">',
						'<div id="schn-dc-modal-content" class="schn-modal-content"><span class="schn-close">X</span>',
							'<div id="dc-list">',
							'</div>',
						'</div>',
					'</div>');
	
	target.innerHTML = targetHTML.join("");
			
	dcPieChart = $("#" + compId + " .dc-pie-chart");			//placeholder for pie chart in global variable
	modal = document.getElementById('schn-dc-modal');			//modal window in global variable
	close = document.getElementsByClassName("schn-close")[0];	//modal window close button in global variable
	
	//call pie chart rendering here
	component.countArray(defaultRange);
	
	//this may or may not be needed - add last after HTML is rendered so JQuery can find them.
	component.addEventHandlers();
};   // end render
	
schn.dc_analytics.prototype.countArray = function(summs){
	var component = this;
	var completed = 0,
		inProgress = 0,
		notCommenced = 0;

	for (i=0; i<summs.length;i++){
		switch((summs[i].SUMMARY_STATUS).trim()) {
			case "Auth (Verified)":
				completed++;
				break;
			case "Modified":
				completed++;
				break;
			case "In Progress":
				inProgress++;
				break;
			default:
				notCommenced++;
		} 
	}
	var dc_list = document.getElementById('dc-list');
	pieHTML = [];
	pieHTML.push('<h4 class="boldie">Incomplete Discharge Summaries</h4>');
	if (summs.length > 0 && ((inProgress > 0) ||  (notCommenced > 0))) {
		pieHTML.push('<h6>Summaries due for service <span class="boldie">' + medLook + '</span>, ward <span class="boldie">' + wardLook + '</span>, attending medical officer: <span class="boldie">' + amoLook + '</span>, last <span class="boldie">' + rangeLook + '</span> days</h6>');
		pieHTML.push('<table id="incomplete-dc">');
		pieHTML.push('<tr><th>Name</th><th>DOB</th><th>Age</th><th>Gender</th><th>MRN</th><th>Admit Date</th><th>Discharge Date</th><th>Est Discharge Date</th><th>Ward</th><th>Medical Service</th><th>Attending MO</th><th>Summary Status</th><th>Author</th><th>Last Updated</th><th>Updated by</th>');
		for (j=0; j<summs.length;j++){
			var dc_status = summs[j].SUMMARY_STATUS.trim();
			if (dc_status === "In Progress" || dc_status === ""){
				pieHTML.push('<tr>');
				pieHTML.push('<td><a class="schn-link" href="javascript:schn.openChart(' + summs[j].PERSON_ID + ', ' + summs[j].ENCNTR_ID + ');">' + summs[j].PATIENTNAME + '</a></td>');
				pieHTML.push('<td>' + summs[j].DOB + '</td>',
							'<td>' + summs[j].AGE + '</td>',
							'<td>' + summs[j].GENDER + '</td>',
							'<td>' + summs[j].MRN + '</td>',
							'<td>' + summs[j].ADMIT_DT_TM.substring(0,10) + '</td>',
							'<td>' + summs[j].DISCH_DT_TM.substring(0,10) + '</td>',
							'<td>' + summs[j].EDD + '</td>',
							'<td>' + summs[j].WARD.trim() + '</td>',
							'<td>' + summs[j].MEDICAL_SERVICE.trim() + '</td>',
							'<td>' + summs[j].AMO.trim() + '</td>',
							'<td><a class="schn-link" href="#" onclick="javascript:schn.modifyDynDoc(' + summs[j].PERSON_ID + ', ' + summs[j].ENCNTR_ID + ', ' + summs[j].EVENTID +');">' + summs[j].SUMMARY_STATUS + '</a></td>', 
							'<td>' + summs[j].AUTHOR.trim() + '</td>',
							'<td>' + summs[j].UPDATED_DATE + '</td>',
							'<td>' + summs[j].UPDATED_BY + '</td>',
							'</tr>');
			}   // end if
		}   // end for
		pieHTML.push('</table>');
	} else {
		pieHTML.push("<p>No incomplete summaries due for service <span class='boldie'>" + medLook + "</span>, ward <span class='boldie'>" + wardLook + "</span>, attending medical officer: <span class='boldie'>" + amoLook + "</span>, last <span class='boldie'>" + rangeLook + "</span> days.</p>");
	}
	pieHTML = pieHTML.join("");
	
	dc_list.innerHTML = (pieHTML);
	
	var data = [
		{label: "Completed", data: completed, color: "#005CDE" },
		{label: "In Progress", data: inProgress, color: "#7D0096" },
		{label: "Not Commenced", data: notCommenced, color: "#DE000F" }
	]

	$(function () { 
		var options = {
			series: {
				pie: {	show: true,
					radius: 1,
					label: {
						show: true,
						radius: 1/2,
						formatter: function (label, series) {
							return '<div style="font-size:8pt;padding:5px;color:white;">' + label + '<br/>' +   
							Math.round(series.percent) + '%</div>';
						},
						background: {
                   		opacity: 0.1
						},
						threshold: 0.1
					}
				}
			},
			legend: {
				show: false
			},
			grid: {
				hoverable: true,
				clickable: true
			}
		};

		renderPie(dcPieChart, data, options); 
	});

	function renderPie(place, data, opts){
		$.plot(place, data, opts)
		place.bind("plotclick", pieClick);
		place.bind("plothover", pieHover);
	}	
	
	function pieHover(event,pos,obj){
		if (!obj){return;}
            var dc_percent = Math.round(parseFloat(obj.series.percent));
 
        var dcHover = [];
        dcHover.push("<div style=\"float:left;width:250px;height:20px;color:", obj.series.color, "\">",
                  "<span style=\"font-weight:bold;color:", obj.series.color, "\">", obj.series.label, ": " , obj.series.data[0][1] , " (", dc_percent, "%)</span>",
                  "</div>");
 
            $("#dc-hover").html(dcHover.join('')); 
	}
		
	function pieClick(event, pos, obj){
		if(obj){
			if(obj.series.label == "Completed") {
				return;
			} else if(obj.series.label == "In Progress") {
				modal.style.display = "block";
			} else if (obj.series.label == "Not Commenced") {
				modal.style.display = "block";
			}
		}
	}
};   // end countArray

schn.dc_analytics.prototype.updateFilters = function(){
	var component = this;
	var days = document.getElementById("schn-dc-lookback");
	var facility = document.getElementById("schn-dc-facility");
	var ward = document.getElementById("schn-dc-wards");
	var medsrv = document.getElementById("schn-dc-medserv");
	var attending = document.getElementById("schn-dc-amo");
	var myOwn = document.getElementById("schn-dc-myOwn");
	rangeLook = days.options[days.selectedIndex].value;
	faclook = facility.options[facility.selectedIndex].text;
	wardLook = ward.options[ward.selectedIndex].value;
	medLook = medsrv.options[medsrv.selectedIndex].text;
	medLook_cd = medsrv.options[medsrv.selectedIndex].value;
	amoLook = attending.options[attending.selectedIndex].text;
	amoLook_cd = attending.options[attending.selectedIndex].value;
	if($("#schn-dc-myOwn").attr('checked')){
		myLook = 1;
	} else {
		myLook = 0;
	}
		
	var filterParams = 'v.DISDT_RANGE <= parseInt(rangeLook)';
	if (wardLook != 'All'){
		filterParams += ' && v.WARD == wardLook';
	}
	if (medLook_cd != 'All'){
		filterParams += ' && v.MED_SERVICE_CD == medLook_cd';
	}
	if (amoLook_cd != 'All'){
		filterParams += ' && v.AMO_ID == amoLook_cd';
	}
	if (myLook === 1){
		filterParams += ' && (v.AMO_ID == ' + user_id + ' || v.AUTHOR_ID == ' + user_id + ' || v.UPDATED_ID == ' + user_id + ')';
	}
	if (filterParams){
		var filterRange = dcsumm_copy.filter(function(v,i) {
			return eval(filterParams);
		})
	}
	if(filterRange.length == 0){
		// no results
		$("#dc-chart").html("No results for range <span class='boldie'>" + rangeLook + "</span> days, <span class='boldie'>" + wardLook + "</span>, <span class='boldie'>" + medLook + "</span>, attending medical officer: <span class='boldie'>" + amoLook + "</span>");
		$("#dc-list").html("");
	} else {
		$("#dc-chart").html("");
		component.countArray(filterRange);
	}
};   // end updateFilters
// end dc_analytics namespace



/********************************************************************************

SCHN ONCOLOGY REFERENCE DOCUMENTS

/********************************************************************************/

/* Put name of component here */
MPage.namespace("schn.clintrials");
schn.clintrials = function(){};

schn.clintrials.prototype = new MPage.Component();
schn.clintrials.prototype.constructor = MPage.Component;
schn.clintrials.prototype.base = MPage.Component.prototype;
schn.clintrials.prototype.name = "schn.clintrials";
schn.clintrials.prototype.cclProgram = "707_mp_onc_reference_docs";
schn.clintrials.prototype.cclParams = [];
schn.clintrials.prototype.cclDataType = "JSON"; //possible values=> JSON, TEXT, XML

schn.clintrials.prototype.init = function(options) {
	//code to perform before immediately rendering (usually updating params is needed)
	var component = this;
	component.cclParams.push("MINE");
	//CAN USE ANY OR ALL OF THE FOLLOWING IN ORDER AS NEEDED:
	component.cclParams.push(this.getProperty("personId"));
	//component.cclParams.push(this.getProperty("encounterId"));
	//component.cclParams.push(this.getProperty("userId"));
	//component.cclParams.push(this.getProperty("PPRCode"));
	//component.cclParams.push(this.getProperty("positionCd"));
};

schn.clintrials.prototype.addEventHandlers = function() {
	var component = this;
	var compId = component.getComponentUid();
	var target = component.getTarget();
	
	$("#"+compId+" .classOfElementWithinComponent").click(function(){
		//some stuff to do when clicked
	});
};

schn.clintrials.prototype.getSubHeader = function( str ) {
	//note that inline styles could be put in their own class and put as a second class for the div
	return ["<div class='sub-title-disp' style='margin:-6px -6px 6px -6px;border-left:none;border-right:none;'>",str,"</div>"].join("");
};

schn.clintrials.prototype.render = function() {
	var component = this;
	var compId = component.getComponentUid();
	var target = component.getTarget();
	var record = component.data.TRIALS;
	var trial = record.TRIAL;
	var protocol = record.PROTOCOL;
	var person = record.PERSON;
	var targetHTML = [];
	
	//set and create subheader (uncomment and update if needed)
	//targetHTML.push(component.getSubHeader("Selected Visit"));
	
	//set the title text if needed (uncomment and update if needed)
	//component.setProperty("headerTitle", "New Title");
	
	//set the subtitle text next to header if needed (uncomment and update if needed)
	//component.setProperty("headerSubTitle","(10)");
	
	//set the component to collapsed (false)/expanded (true) if needed (uncomment and update if needed)
	//component.setProperty("headerShowHideState",true);
	
	//do something here with the targetHTML (component.data will have data type defined by this.cclDataType)
	
	//document links
	var aall0631_link = "cog_infant_all__aall0631.pdf";
	var aall0932_link = "aall0932doc.pdf";
	var aall1231_link = "aall1231doc.pdf";
	var aaml1031_link = "aaml1031doc.pdf";
	var aaml1531_link = "aaml1531doc.pdf";
	var acns0334_link = "acns0334_protocol_amd_3_28jan2016.pdf";
	var acns0831_link = "acns0831doc.pdf";
	var acns1221_link = "acns1221doc.pdf";
	var aews1031_link = "aews1031_protocol_amd_2_4_mar_2016.pdf";
	var ahod0331_link = "ahod0031doc.pdf";
	var alcl99_link = "alcl_-results_of_alcl_99_trial.pdf";
	var anbl0032_link = "anbl0032_protocol_amd_19a_12_jun_2015.pdf";
	var anbl0531_link = "anbl0531_protocol_amendment_3_18_aug_2011.pdf";
	var anbl0532_link = "anbl0532_protocol_amd_4a_16_aug_2011.pdf";
	var anbl1232_link = "anbl1232doc.pdf";
	var anhl1131_link = "anhl1131_protocol_version_3_0_20_mar_2015.pdf";
	var aost0331_link = "aost0331_amd_6_6_sep_2011.pdf";
	var apml4_link = "apml4_protocol.pdf";
	var arar0331_link = "arar0331doc.pdf";
	var aren0321_link = "aren0321.pdf";
	var aren0532_link = "aren0532doc.pdf";
	var arst0431_link = "arst0431_amd_3_26_jun_2007.pdf";
	var arst0531_link = "arst0531_amd_3a_30_jan_2014.pdf";
	var beacopp_link = "beacopp.pdf";
	var bevacizumab_plus_link = "bevacizumab_plus_irinotecan_in_recurrent_glioblastoma_multiforme.pdf";
	var blinatumomab_link = "blinatumomab.pdf"
	var colorectalFox6_link = "colorectal_metastatic_folfox6.pdf";  //018.5	
	var denosumab_link = "denosumab_20062004_amend7protocol_15may13.pdf";
	var esphall_link = "esphall_protocol_amd_01_1_dec_2009.pdf";
	var fablmb96_link = "fab_lmb96_ccg-5961_amd_6.pdf";
	var intreallsr_link = "intreall_sr_2010_protocol_version_1_8_1_nov_2012.pdf"
	var joe_chemo_link = "joe_chemotherapy_for_retinoblastoma.pdf";
	var lchiv_link = "lch-iv_protocol_amended_version_nov_2014_international_approved_april_2015.pdf";
	var mek11650_link = "mek116540_protocol_amd_3_5jan16.pdf";
	var nat_wilms_link = "national_wilms_tumor_study_-_v.pdf";
	var pembrolizumab_link = "mk_3475-051-02_amendment_4_24_jun_2016.pdf";
	var RapCV_link = "rapcv_protocol_version_3_21jan2013.pdf";
	var siop_wilms_link = "wt_2002_01_siop_wilms_uk_protocol_02feb_09_formatting_corrections.pdf";
	var siopel3_link = "siopel_3.pdf";
	var siopel4_link = "siopel_4_version_july_2004.pdf";
	var sjmb12_link = "sjmb12_protocol_amd_3_0_letterofapproval_2_31july2015.pdf";
	var study9_link = "study_9_protocol_version_1_2_15_apr_2011.pdf"
	var supervac_link = "super_vac.pdf";
	
	var ref_doc_path = "\"http://chw.schn.health.nsw.gov.au/ou/casu/resources/_protocol_documents/";
	
	targetHTML.push('<div class="content-body">');
	targetHTML.push('<div class="sub-sec"><h3 class="sub-sec-hd"><span class="sub-sec-title">Protocol Documents</span></h3>');
	targetHTML.push('<div class="sub-sec-content">');
	if(protocol.length > 0){
		if(protocol[0].PROTOCOL_ID > 0){
			targetHTML.push('<p>Most recent document:<p>');
			targetHTML.push("<table><tr><td><a class='schn-link' href='javascript:schn.openDocumentViewer(" + person[0].PID + ", " + protocol[0].PROTOCOL_ID + ");'>Oncology Protocol</a></td><td>Last Updated:" + protocol[0].PROTOCOL_UPDT + "</td></tr></table>");
		} else {
			targetHTML.push('<span class="res-none">There are no protocol documents for this patient.</span>');
		}
	}
	targetHTML.push('</div>');  //end sub-sec-content
	targetHTML.push('</div>');  //end sub-sec
	
	targetHTML.push('<div class="sub-sec"><h3 class="sub-sec-hd"><span class="sub-sec-title">Reference Documents</span></h3>');
	targetHTML.push('<div class="sub-sec-content">');
	if(trial.length > 0 ) {
		targetHTML.push('<p>Document List Updated: ' + trial[0].STUDY_UPDT + '</p>');
		targetHTML.push('<table>');
		for (i=0;i<trial.length;i++){
			targetHTML.push('<div class="sub-sec"><tr><td>' + parseInt(i+1) + '.&nbsp;</td>');
			
			var sname = trial[i].STUDY_NAME;
			
			switch(sname){
				case "AALL0631":
					targetHTML.push("<td><a class='schn-link' href='javascript:APPLINK(100, " + ref_doc_path + aall0631_link + "\",\"\");'>AALL0631</a></td>");
					break;
				//024
				case "AALL0932":
					targetHTML.push("<td><a class='schn-link' href='javascript:APPLINK(100, " + ref_doc_path + aall0932_link + "\",\"\");'>AALL0932</a></td>");
					break;
				case "AALL1231":
					targetHTML.push("<td><a class='schn-link' href='javascript:APPLINK(100, " + ref_doc_path + aall1231_link + "\",\"\");'>AALL1231</a></td>");
					break;
				case "AAML1031":
					targetHTML.push("<td><a class='schn-link' href='javascript:APPLINK(100, " + ref_doc_path + aaml1031_link + "\",\"\");'>AAML1031</a></td>");
					break;
				case "AAML1531":
					targetHTML.push("<td><a class='schn-link' href='javascript:APPLINK(100, " + ref_doc_path + aaml1531_link + "\",\"\");'>AAML1531</a></td>");
					break;
				case "ACNS0334":
					targetHTML.push("<td><a class='schn-link' href='javascript:APPLINK(100, " + ref_doc_path + acns0334_link + "\",\"\");'>ACNS0334</a></td>");
					break;
				case "ACNS0831":
					targetHTML.push("<td><a class='schn-link' href='javascript:APPLINK(100, " + ref_doc_path + acns0831_link + "\",\"\");'>ACNS0831</a></td>");
					break;
				case "ACNS1221":
					targetHTML.push("<td><a class='schn-link' href='javascript:APPLINK(100, " + ref_doc_path + acns1221_link + "\",\"\");'>ACNS1221</a></td>");
					break;
				case "AEWS1031":
					targetHTML.push("<td><a class='schn-link' href='javascript:APPLINK(100, " + ref_doc_path + aews1031_link + "\",\"\");'>AEWS1031</a></td>");
					break;
				case "AHOD0031":
					targetHTML.push("<td><a class='schn-link' href='javascript:APPLINK(100, " + ref_doc_path + ahod0331_link + "\",\"\");'>AHOD0031</a></td>");
					break;
				case "ALCL99":
					targetHTML.push("<td><a class='schn-link' href='javascript:APPLINK(100, " + ref_doc_path + alcl99_link + "\",\"\");'>ALCL99</a></td>");
					break;
				case "ANBL0032":
					targetHTML.push("<td><a class='schn-link' href='javascript:APPLINK(100, " + ref_doc_path + anbl0032_link + "\",\"\");'>ANBL0032</a></td>");
					break;
				case "ANBL0531":
					targetHTML.push("<td><a class='schn-link' href='javascript:APPLINK(100, " + ref_doc_path + anbl0531_link + "\",\"\");'>ANBL0531</a></td>");
					break;
				case "ANBL0532":
					targetHTML.push("<td><a class='schn-link' href='javascript:APPLINK(100, " + ref_doc_path + anbl0532_link + "\",\"\");'>ANBL0532</a></td>");
					break;
				case "ANBL1232":
					targetHTML.push("<td><a class='schn-link' href='javascript:APPLINK(100, " + ref_doc_path + anbl1232_link + "\",\"\");'>ANBL1232</a></td>");
					break;
				case "ANHL1131":
					targetHTML.push("<td><a class='schn-link' href='javascript:APPLINK(100, " + ref_doc_path + anhl1131_link + "\",\"\");'>ANHL1131</a></td>");
					break;
				case "AOST0331":
					targetHTML.push("<td><a class='schn-link' href='javascript:APPLINK(100, " + ref_doc_path + aost0331_link + "\",\"\");'>AOST0331</a></td>");
					break;
				case "APML4 PROTOCOL":
					targetHTML.push("<td><a class='schn-link' href='javascript:APPLINK(100, " + ref_doc_path + apml4_link + "\",\"\");'>APML4 Protocol</a></td>");
					break;
				case "ARAR0331":
					targetHTML.push("<td><a class='schn-link' href='javascript:APPLINK(100, " + ref_doc_path + arar0331_link + "\",\"\");'>ARAR0331</a></td>");
					break;
				case "AREN0321":
					targetHTML.push("<td><a class='schn-link' href='javascript:APPLINK(100, " + ref_doc_path + aren0321_link + "\",\"\");'>AREN0321</a></td>");
					break;
				//024
				case "AREN0532":
					targetHTML.push("<td><a class='schn-link' href='javascript:APPLINK(100, " + ref_doc_path + aren0532_link + "\",\"\");'>AREN0532</a></td>");
					break;
				case "ARST0431":
					targetHTML.push("<td><a class='schn-link' href='javascript:APPLINK(100, " + ref_doc_path + arst0431_link + "\",\"\");'>ARST0431</a></td>");
					break;
				case "ARST0531":
					targetHTML.push("<td><a class='schn-link' href='javascript:APPLINK(100, " + ref_doc_path + arst0531_link + "\",\"\");'>ARST0531</a></td>");
					break;
				case "BEACOPP":
					targetHTML.push("<td><a class='schn-link' href='javascript:APPLINK(100, " + ref_doc_path + beacopp_link + "\",\"\");'>BEACOPP</a></td>");
					break;
				case "BEVACIZUMAB PLUS IRINOTECAN IN RECURRENT GLIOBLASTOMA MULTIF":
					targetHTML.push("<td><a class='schn-link' href='javascript:APPLINK(100, " + ref_doc_path + bevacizumab_plus_link + "\",\"\");'>Bevacizumab Plus Irinotecan in Recurrent Glioblastoma Multiforme</a></td>");
					break;
				case "BLINATUMOMAB":
					targetHTML.push("<td><a class='schn-link' href='javascript:APPLINK(100, " + ref_doc_path + blinatumomab_link + "\",\"\");'>Blinatumomab</a></td>");
					break;
				//018.5
				case "COLORECTAL METASTATIC FOLFOX6":
					targetHTML.push("<td><a class='schn-link' href='javascript:APPLINK(100, " + ref_doc_path + colorectalFox6_link + "\",\"\");'>Colorectal Metastatic FOLFOX6</a></td>");
					break;
				case "DENOSUMAB":
					targetHTML.push("<td><a class='schn-link' href='javascript:APPLINK(100, " + ref_doc_path + denosumab_link + "\",\"\");'>Denosumab</a></td>");
					break;
				case "ESPHALL":
					targetHTML.push("<td><a class='schn-link' href='javascript:APPLINK(100, " + ref_doc_path + esphall_link + "\",\"\");'>EsPhALL</a></td>");
					break;
				case "FABLMB96":
					targetHTML.push("<td><a class='schn-link' href='javascript:APPLINK(100, " + ref_doc_path + fablmb96_link + "\",\"\");'>FABLMB96</a></td>");
					break;
				case "INTREALL SR 2010":
					targetHTML.push("<td><a class='schn-link' href='javascript:APPLINK(100, " + ref_doc_path + intreallsr_link + "\",\"\");'>IntReALL SR 2010</a></td>");
					break;
				case "JOE CHEMOTHERAPY FOR RETINOBLASTOMA":
					targetHTML.push("<td><a class='schn-link' href='javascript:APPLINK(100, " + ref_doc_path + joe_chemo_link + "\",\"\");'>JOE Chemotherapy for Retinoblastoma</a></td>");
					break;	
				case "LCH-IV":
					targetHTML.push("<td><a class='schn-link' href='javascript:APPLINK(100, " + ref_doc_path + lchiv_link + "\",\"\");'>LCH-IV</a></td>");
					break;					
				case "MEK116540":
					targetHTML.push("<td><a class='schn-link' href='javascript:APPLINK(100, " + ref_doc_path + mek11650_link + "\",\"\");'>MEK116540</a></td>");
					break;
				case "NATIONAL WILM'S TUMOR STUDY - 5":
					targetHTML.push("<td><a class='schn-link' href='javascript:APPLINK(100, " + ref_doc_path + nat_wilms_link + "\",\"\");'>National Wilm's Tumor Study - 5</a></td>");
					break;
				case "PEMBROLIZUMAB (MK-3475)":
					targetHTML.push("<td><a class='schn-link' href='javascript:APPLINK(100, " + ref_doc_path + pembrolizumab_link + "\",\"\");'>Pembrolizumab (MK-3475)</a></td>");
					break;
				case "RAPCV":
					targetHTML.push("<td><a class='schn-link' href='javascript:APPLINK(100, " + ref_doc_path + RapCV_link + "\",\"\");'>RapCV</a></td>");
					break;
				case "SIOP WILMS TUMOUR 2001":
					targetHTML.push("<td><a class='schn-link' href='javascript:APPLINK(100, " + ref_doc_path + siop_wilms_link + "\",\"\");'>SIOP Wilms Tumour 2001</a></td>");
					break;
				case "SIOPEL 3":
					targetHTML.push("<td><a class='schn-link' href='javascript:APPLINK(100, " + ref_doc_path + siopel3_link + "\",\"\");'>SIOPEL 3</a></td>");
					break;
				case "SIOPEL 4":
					targetHTML.push("<td><a class='schn-link' href='javascript:APPLINK(100, " + ref_doc_path + siopel4_link + "\",\"\");'>SIOPEL 4</a></td>");
					break;
				case "SJMB12":
					targetHTML.push("<td><a class='schn-link' href='javascript:APPLINK(100, " + ref_doc_path + sjmb12_link + "\",\"\");'>SJMB12</a></td>");
					break;
				case "STUDY 9":
					targetHTML.push("<td><a class='schn-link' href='javascript:APPLINK(100, " + ref_doc_path + study9_link + "\",\"\");'>Study 9</a></td>");
					break;
				case "SUPER VAC":
					targetHTML.push("<td><a class='schn-link' href='javascript:APPLINK(100, " + ref_doc_path + supervac_link + "\",\"\");'>Super VAC</a></td>");
					break;
				default:
					targetHTML.push("<td>No link</td>");
			}	
			targetHTML.push('</tr>');
		}
		targetHTML.push('</table>');
	} else {
		targetHTML.push('<span class="res-none">There are no clinical trial reference documents for this patient.</span>');
	}
	targetHTML.push('</div>');  //end sub-sec-content
	targetHTML.push('</div>');  //end sub-sec
	targetHTML.push('</div>');  //end content-body
	
	
	
	target.innerHTML = targetHTML.join("");
	
	//this may or may not be needed
	//component.addEventHandlers();
};



/* ----------------------------------------------------------------------------------

SCHN CODED ADMISSIONS COMPONENT

------------------------------------------------------------------------------------*/

/* Put name of component here */
MPage.namespace("schn.codedAdmissions");
schn.codedAdmissions = function(){};

schn.codedAdmissions.prototype = new MPage.Component();
schn.codedAdmissions.prototype.constructor = MPage.Component;
schn.codedAdmissions.prototype.base = MPage.Component.prototype;
schn.codedAdmissions.prototype.name = "schn.codedAdmissions";
schn.codedAdmissions.prototype.cclProgram = "707_mp_coded_admissions";
schn.codedAdmissions.prototype.cclParams = [];
schn.codedAdmissions.prototype.cclDataType = "JSON"; //possible values=> JSON, TEXT, XML

schn.codedAdmissions.prototype.init = function(options) {
	//code to perform before immediately rendering (usually updating params is needed)
	var component = this;
	component.cclParams.push("MINE");
	//CAN USE ANY OR ALL OF THE FOLLOWING IN ORDER AS NEEDED:
	component.cclParams.push(this.getProperty("personId"));
	//component.cclParams.push(this.getProperty("encounterId"));
	//component.cclParams.push(this.getProperty("userId"));
	//component.cclParams.push(this.getProperty("PPRCode"));
	//component.cclParams.push(this.getProperty("positionCd"));
};

schn.codedAdmissions.prototype.addEventHandlers = function() {
	var component = this;
	var compId = component.getComponentUid();
	var target = component.getTarget();
	
	$("#"+compId+" .classOfElementWithinComponent").click(function(){
		//some stuff to do when clicked
	});
};

schn.codedAdmissions.prototype.getSubHeader = function( str ) {
	//note that inline styles could be put in their own class and put as a second class for the div
	return ["<div class='sub-title-disp' style='margin:-6px -6px 6px -6px;border-left:none;border-right:none;'>",str,"</div>"].join("");
};

schn.codedAdmissions.prototype.render = function() {
	var component = this;
	var compId = component.getComponentUid();
	var target = component.getTarget();
	var record = component.data.ADMISSIONS;
	var adm = record.ADMISSION;
	var adm_length = adm.length;
	var targetHTML = [];
	
	//set and create subheader (uncomment and update if needed)
	targetHTML.push(component.getSubHeader("<b>Assigned by Medical Records using ICD-10-AM. </b><br />For more than 5 recent encounters, open the chart to the specific encounter and click the Coding Summary item in the chart menu"));
	
	//set the title text if needed (uncomment and update if needed)
	//component.setProperty("headerTitle", "New Title");
	
	//set the subtitle text next to header if needed (uncomment and update if needed)
	//component.setProperty("headerSubTitle","(10)");
	
	//set the component to collapsed (false)/expanded (true) if needed (uncomment and update if needed)
	//component.setProperty("headerShowHideState",true);
	
	//check if there are coded admissions returned
	var admissions_exist = 0;
	for (var j=0; j<adm_length;j++){
		if (adm[j].ENC_ID > 0){
			admissions_exist = 1;
		}
	}	
	
	targetHTML.push('<div class="content-body">');
	if (admissions_exist == 1){
		//targetHTML.push('<p>There are admissions for this patient.</p>');
		//loop through the first 5 admissions returned
		
		
		targetHTML.push('<div class="sub-sec"><h3 class="sub-sec-hd"><span class="sub-sec-title">5 Most Recent Coded Admissions (CHW Inpatient)</span></h3>');
		targetHTML.push('<div class="sub-sec-content"><table class="schn-table-border"><thead><tr>',
						'<th>Admit Date</th>',
						'<th>Discharge Date</th>',
						'<th>Medical Service</th>',
						'<th>Attending Doctor</th>',
						'<th>Principle Diagnosis</th>',
						'<th>Principle Procedure</th>',
						'<th>Coding Summary</th>',
						'</tr></thead>');
		for (i=0;i<5;i++){
			targetHTML.push('<tbody>');
			if (adm[i].ENC_ID > 0) {
				targetHTML.push('<tr><td>' + adm[i].ADM_DATE + '</td>',
							'<td class="schn-cell-border">' + adm[i].DISCH_DATE + '</td>',
							'<td class="schn-cell-border">' + adm[i].MED_SERVICE + '</td>',
							'<td class="schn-cell-border">' + adm[i].FNAME + ' ' + adm[i].LNAME + '</td>',
							'<td class="schn-cell-border">' + adm[i].PRINCIPLE_DX + '</td>',
							'<td class="schn-cell-border">' + adm[i].PRINCIPLE_PR + '</td>',
							"<td class='schn-cell-border'><a class='schn-link' href='javascript:CCLLINK(\"707_CODED_ATTESTATION_SHEET\", \"^MINE^, " + adm[i].ENC_ID + "\", 0)'>Coding Summary</a></td>",
							'</tr>');
				}
		}
		targetHTML.push('</tbody></table></div></div>');
		//if there is a 6th admission, it will be the first admission for this patient
		if (adm_length = 6 && adm[i].ENC_ID > 0){
			targetHTML.push('<div class="sub-sec"><h3 class="sub-sec-hd"><span class="sub-sec-title">First Coded Admission (CHW Inpatient)</span></h3>');
		targetHTML.push('<div class="sub-sec-content"><table class="schn-table-border"><thead>',
						'<tr>',
						'<th>Admit Date</th>',
						'<th>Discharge Date</th>',
						'<th>Medical Service</th>',
						'<th>Attending Doctor</th>',
						'<th>Principle Diagnosis</th>',
						'<th>Principle Procedure</th>',
						'<th>Coding Summary</th>',
						'</tr></thead>');
		targetHTML.push('<tbody><tr><td>' + adm[i].ADM_DATE + '</td>',
							'<td>' + adm[i].DISCH_DATE + '</td>',
							'<td>' + adm[i].MED_SERVICE + '</td>',
							'<td>' + adm[i].FNAME + ' ' + adm[i].LNAME + '</td>',
							'<td>' + adm[i].PRINCIPLE_DX + '</td>',
							'<td>' + adm[i].PRINCIPLE_PR + '</td>',
							"<td><a class='schn-link' href='javascript:CCLLINK(\"707_CODED_ATTESTATION_SHEET\", \"^MINE^, " + adm[i].ENC_ID + "\", 0)'>Coding Summary</a></td>",
							'</tr>');
		targetHTML.push('</tbody></table></div></div>');
		
		}
		
	} else {
		targetHTML.push("<div class='sub-sec-content'><span class='res-none'>No coded admissions for this patient.</span></div>");
	}
	targetHTML.push('</div>');  //close content-body
	
	target.innerHTML = targetHTML.join("");
	
	//this may or may not be needed
	//component.addEventHandlers();
};

/* ----------------------------------------------------------------------------------

SCHN WAITLIST BOOKINGS COMPONENT

------------------------------------------------------------------------------------*/

/* Put name of component here */
//021
/*

MPage.namespace("schn.wl_bookings");
schn.wl_bookings = function(){};

schn.wl_bookings.prototype = new MPage.Component();
schn.wl_bookings.prototype.constructor = MPage.Component;
schn.wl_bookings.prototype.base = MPage.Component.prototype;
schn.wl_bookings.prototype.name = "schn.wl_bookings";
schn.wl_bookings.prototype.cclProgram = "707_mp_wl_bookings";
schn.wl_bookings.prototype.cclParams = [];
schn.wl_bookings.prototype.cclDataType = "JSON"; //possible values=> JSON, TEXT, XML

schn.wl_bookings.prototype.init = function(options) {
	//code to perform before immediately rendering (usually updating params is needed)
	var component = this;
	component.cclParams.push("MINE");
	//CAN USE ANY OR ALL OF THE FOLLOWING IN ORDER AS NEEDED:
	component.cclParams.push(this.getProperty("personId"));
	//component.cclParams.push(this.getProperty("encounterId"));
	//component.cclParams.push(this.getProperty("userId"));
	//component.cclParams.push(this.getProperty("PPRCode"));
	//component.cclParams.push(this.getProperty("positionCd"));
};

schn.wl_bookings.prototype.addEventHandlers = function() {
	var component = this;
	var compId = component.getComponentUid();
	var target = component.getTarget();
	
	//$("#"+compId+" .classOfElementWithinComponent").click(function(){
		//some stuff to do when clicked
	//});
	$("#" + compId + " .hvrData").tooltip({
		"track" : true,
		"delay" : 150,
		"fade" : 150
	});
};

schn.wl_bookings.prototype.getSubHeader = function( str ) {
	//note that inline styles could be put in their own class and put as a second class for the div
	return ["<div class='sub-title-disp' style='margin:-6px -6px 6px -6px;border-left:none;border-right:none;'>",str,"</div>"].join("");
};
	
schn.wl_bookings.prototype.render = function() {
	var component = this;
	var compId = component.getComponentUid();
	var target = component.getTarget();
	var record = component.data.WAITLISTS;
	var wait = record.WAITLIST;
	var rfa = record.RFA;
	var wait_length = wait.length;
	var rfa_length = rfa.length;
	
	var targetHTML = [];
	//set and create subheader (uncomment and update if needed)
	targetHTML.push(component.getSubHeader("Hover over an encounter to view information from the eRFA forms (if one is charted for that encounter)"));
	
	//set the title text if needed (uncomment and update if needed)
	//component.setProperty("headerTitle", "New Title");
	
	//set the subtitle text next to header if needed (uncomment and update if needed)
	//component.setProperty("headerSubTitle","(10)");
	
	//set the component to collapsed (false)/expanded (true) if needed (uncomment and update if needed)
	//component.setProperty("headerShowHideState",true);
	targetHTML.push('<div class="content-body">');
	targetHTML.push('<div class="sub-sec"><h3 class="sub-sec-hd"><span class="sub-sec-title">Waitlist Bookings</span></h3>');
	if (wait_length > 0){
		targetHTML.push('<div class="sub-sec-content"><table class="schn-table-border"><thead><tr>',
						'<th>Listing Date</th>',
						'<th>Urgency</th>',
						'<th>Planned Admission Date</th>',
						'<th>Attending Doctor</th>',
						'<th>Specialty</th>',
						'<th>Reason for Admission</th>',
						'</tr></thead>');
		
		for (i=0; i<wait_length;i++){
			targetHTML.push('<tbody><tr class="hvrData" title="',
							//hover tooltip in the title
							'<b>Request for Admission</b><br />',
							'AMO: <b>' + wait[i].FORMS[0].WL_AMO + '</b><br />',
							'Clinical Priority: <b>' + wait[i].FORMS[0].WL_CLIN_PRIORITY + '</b><br />',
							'Diagnosis: <b>' + wait[i].FORMS[0].WL_DIAG + '</b><br />',
							'Admission Reason: <b>' + wait[i].FORMS[0].WL_ADM_REASON + '</b><br />',
							'Special Instructions: <b>' + wait[i].FORMS[0].WL_SPEC_INSTR + '</b><br />',
							'Confirmed Admission Date: <b>' + wait[i].FORMS[0].WL_CONFIRMED_ADM_DT + '</b><br />',
							'Planned Admission Date: <b>' + wait[i].FORMS[0].WL_PLANNED_ADM_DT + '</b><br />',
							'Multiple Bookings: <b>' + wait[i].FORMS[0].WL_MULT_BOOKINGS + '</b><br />',
							'">',
							
							'<td class="schn-cell-border">' + wait[i].LISTING + '</td>',
							'<td class="schn-cell-border">' + wait[i].URGENCY + '</td>',
							'<td class="schn-cell-border">' + wait[i].PLANNED + '</td>',
							'<td class="schn-cell-border">' + wait[i].AMO + '</td>',
							'<td class="schn-cell-border">' + wait[i].MED_SERV + '</td>',
							'<td class="schn-cell-border">' + wait[i].REASON + '</td>',
							'</tr>');
		}
		
		
		targetHTML.push('</tbody></table></div>');
		
		
	} else {
		targetHTML.push("<div class='sub-sec-content'><span class='res-none'>There are no Waitlist bookings for this patient.</span></div>");
	}
	
	targetHTML.push('</div>');
	
	targetHTML.push('<div class="sub-sec"><h3 class="sub-sec-hd"><span class="sub-sec-title">Requests for Admission</span></h3>');
	if (rfa_length > 0){
		targetHTML.push('<div class="sub-sec-content"><table class="schn-table-border"><thead><tr>',
						'<th>Pre-Registration Date</th>',
						'<th>Urgency</th>',
						'<th>Confirmed Admission Date</th>',
						'<th>Planned Admission Date</th>',
						'<th>Attending Doctor</th>',
						'<th>Reason for Admission</th>',
						'</tr></thead>');
		
		for (j=0; j<rfa_length;j++){
			targetHTML.push('<tbody><tr class="hvrData" title="',
							//hover tooltip in the title
							'<b>Request for Admission</b><br />',
							'AMO: <b>' + rfa[j].RFA_FORMS[0].RFA_AMO + '</b><br />',
							'Clinical Priority: <b>' + rfa[j].RFA_FORMS[0].RFA_CLIN_PRIORITY + '</b><br />',
							'Diagnosis: <b>' + rfa[j].RFA_FORMS[0].RFA_DIAG + '</b><br />',
							'Admission Reason: <b>' + rfa[j].RFA_FORMS[0].RFA_ADM_REASON + '</b><br />',
							'Special Instructions: <b>' + rfa[j].RFA_FORMS[0].RFA_SPEC_INSTR + '</b><br />',
							'Confirmed Admission Date: <b>' + rfa[j].RFA_FORMS[0].RFA_CONFIRMED_ADM_DT + '</b><br />',
							'Planned Admission Date: <b>' + rfa[j].RFA_FORMS[0].RFA_PLANNED_ADM_DT + '</b><br />',
							'Multiple Bookings: <b>' + rfa[j].RFA_FORMS[0].RFA_MULT_BOOKINGS + '</b><br />',
							'">',
							'<td class="schn-cell-border">' + rfa[j].PRE_REG_DT + '</td>',
							'<td class="schn-cell-border">' + rfa[j].RFA_FORMS[0].RFA_CLIN_PRIORITY + '</td>',
							'<td class="schn-cell-border">' + rfa[j].RFA_FORMS[0].RFA_CONFIRMED_ADM_DT + '</td>',
							'<td class="schn-cell-border">' + rfa[j].RFA_FORMS[0].RFA_PLANNED_ADM_DT + '</td>',
							'<td class="schn-cell-border">' + rfa[j].RFA_FORMS[0].RFA_AMO + '</td>',
							'<td class="schn-cell-border">' + rfa[j].RFA_FORMS[0].RFA_ADM_REASON + '</td>',
							'</tr>');
		}
	
		targetHTML.push('</tbody></table></div>');
	
	} else {
		targetHTML.push("<div class='sub-sec-content'><span class='res-none'>There are no current Requests for Admission for this patient.</span></div>");
	}
	targetHTML.push('</div>');
	targetHTML.push('</div>');	//close content-body
	target.innerHTML = targetHTML.join("");
	
	//hover tooltip
	$("#" + compId + " .hvrData").tooltip({
		"track" : true,
		"delay" : 100,
		"fade" : 150
	});
	//this may or may not be needed
	//component.addEventHandlers();
};   // end schn.wl_bookings

//021
*/
//021->
MPage.namespace("schn.wl_bookings");
schn.wl_bookings = function(){};

schn.wl_bookings.prototype = new MPage.Component();
schn.wl_bookings.prototype.constructor = MPage.Component;
schn.wl_bookings.prototype.base = MPage.Component.prototype;
schn.wl_bookings.prototype.name = "schn.wl_bookings";
schn.wl_bookings.prototype.cclProgram = "707_mp_wl_bookings";
schn.wl_bookings.prototype.cclParams = [];
schn.wl_bookings.prototype.cclDataType = "JSON"; //possible values=> JSON, TEXT, XML

schn.wl_bookings.prototype.init = function(options) {
	//code to perform before immediately rendering (usually updating params is needed)
	var component = this;
	component.cclParams.push("MINE");
	//CAN USE ANY OR ALL OF THE FOLLOWING IN ORDER AS NEEDED:
	component.cclParams.push(this.getProperty("personId"));
	//component.cclParams.push(this.getProperty("encounterId"));
	//component.cclParams.push(this.getProperty("userId"));
	//component.cclParams.push(this.getProperty("PPRCode"));
	//component.cclParams.push(this.getProperty("positionCd"));
};

schn.wl_bookings.prototype.addEventHandlers = function() {
	var component = this;
	var compId = component.getComponentUid();
	var target = component.getTarget();
	
	//$("#"+compId+" .classOfElementWithinComponent").click(function(){
		//some stuff to do when clicked
	//});
//021	$("#" + compId + " .hvrData").tooltip({
//		"track" : true,
//		"delay" : 150,
//		"fade" : 150
//	});

	$("#"+compId+" .sub-sec-hd").click(function(){
		//some stuff to do when clicked
		$(this).parent().toggleClass("closed");
	});
	
	var wl_book = $("#"+compId+" .schn-wlb-hvrdata");
	
	var classOfHover = 'nswsbb-hover-highlight';
	var alertsNum = wl_book.length;
	for (var i = 0; i < alertsNum; i++) {
		var currentalert = wl_book.eq(i);
		currentalert.hover(function () {
			$(this).addClass(classOfHover);
		},
			function () {
			$(this).removeClass(classOfHover);
		});
		var AMO = currentalert.attr("AMO");
//		var annoDisplayName = currentalert.attr("Annotated_Display");
//		if (annoDisplayName === "")
//			annoDisplayName = displayName;
		var tooltipObj = ["<div class='nswsbb-hvr'><dl class='nswsbb-pl-det'><dt><span><b>Request for Admission</b></span></dt><dd class='nswsbb-pl-det-name'><span>", , 
		"</span></dd><dt><span>AMO:</span></dt><dd class='nswsbb-pl-det-annot'><span>", AMO, 
		"</span></dd><dt><span>Clinical Priority:</span></dt><dd class='nswsbb-pl-det-dt'><span>", currentalert.attr("ClinicalPriority"),
		"</span></dd><dt><span>Diagnosis:</span></dt><dd class='nswsbb-pl-det-dt'><span>", currentalert.attr("Diagnosis"), 
		"</span></dd><dt><span>Admission Reason:</span></dt><dd class='nswsbb-pl-det-dt'><span>", currentalert.attr("AdmissionReason"), 
		"</span></dd><dt><span>Special Instructions:</span></dt><dd class='nswsbb-pl-det-dt'><span>", currentalert.attr("SpecialInstructions"), 
		"</span></dd><dt><span>Confirmed Admission Date:</span></dt><dd class='nswsbb-pl-det-dt'><span>", currentalert.attr("ConfirmedAdmissionDate"), 
		"</span></dd><dt><span>Planned Admission Date: </span></dt><dd class='nswsbb-pl-det-comment'><span>", currentalert.attr("PlannedAdmissionDate"), 
		"</span></dd><dt><span>Multiple Bookings: </span></dt><dd class='nswsbb-pl-det-comment'><span>", currentalert.attr("MultipleBookings"), 
		"</span></dd></dl></div>"];
		
		currentalert.qtip({
			content : {
				text : $(tooltipObj.join("")).addClass(classOfHover)
			},
			position : {
				viewport : $(window),
				target : 'mouse',
				adjust : {
					y : 21,
					x : 40,
					method : 'shift shift'
				}
			},
			style : {
				def : false,
				classes : 'nswsbb-hover'
			}
		});
	}

};

schn.wl_bookings.prototype.getSubHeader = function( str ) {
	//note that inline styles could be put in their own class and put as a second class for the div
	return ["<div class='sub-title-disp' style='margin:-6px -6px 6px -6px;border-left:none;border-right:none;'>",str,"</div>"].join("");
};
	
schn.wl_bookings.prototype.render = function() {
	var component = this;
	var compId = component.getComponentUid();
	var target = component.getTarget();
	var record = component.data.WAITLISTS;
	var wait = record.WAITLIST;
	var rfa = record.RFA;
	var wait_length = wait.length;
	var rfa_length = rfa.length;
	
	var targetHTML = [];
	//set and create subheader (uncomment and update if needed)
	targetHTML.push(component.getSubHeader("Hover over an encounter to view information from the eRFA forms (if one is charted for that encounter)"));
	
	//set the title text if needed (uncomment and update if needed)
	//component.setProperty("headerTitle", "New Title");
	
	//set the subtitle text next to header if needed (uncomment and update if needed)
	//component.setProperty("headerSubTitle","(10)");
	
	//set the component to collapsed (false)/expanded (true) if needed (uncomment and update if needed)
	//component.setProperty("headerShowHideState",true);
	targetHTML.push('<div class="content-body">');
	targetHTML.push('<div class="sub-sec"><h3 class="sub-sec-hd"><span class="sub-sec-title">Waitlist Bookings</span></h3>');
	if (wait_length > 0){
		targetHTML.push('<div class="sub-sec-content"><table class="schn-table-border"><thead><tr>',
						'<th>Listing Date</th>',
						'<th>Urgency</th>',
						'<th>Planned Admission Date</th>',
						'<th>Attending Doctor</th>',
						'<th>Specialty</th>',
						'<th>Reason for Admission</th>',
						'</tr></thead>');
		
		for (i=0; i<wait_length;i++){
//021		targetHTML.push('<tbody><tr class="hvrData" title="',
			targetHTML.push('<tbody><tr class="schn-wlb-hvrdata" id="schn-appts-cell_2"',
			
			
			//hover tooltip in the title
		//					'Request for Admission \r\n',
		//					'AMO: ' + wait[i].FORMS[0].WL_AMO + '\r\n',
		//					'Clinical Priority: ' + wait[i].FORMS[0].WL_CLIN_PRIORITY + '\r\n',
		//					'Diagnosis: ' + wait[i].FORMS[0].WL_DIAG + '\r\n',
		//					'Admission Reason: ' + wait[i].FORMS[0].WL_ADM_REASON + '\r\n',
		//					'Special Instructions: ' + wait[i].FORMS[0].WL_SPEC_INSTR + '\r\n',
		//					'Confirmed Admission Date: ' + wait[i].FORMS[0].WL_CONFIRMED_ADM_DT + '\r\n',
		//					'Planned Admission Date: ' + wait[i].FORMS[0].WL_PLANNED_ADM_DT + '\r\n',
		//					'Multiple Bookings: ' + wait[i].FORMS[0].WL_MULT_BOOKINGS + '\r\n',

							'AMO="', wait[i].FORMS[0].WL_AMO, '"',	
							'ClinicalPriority="',  wait[i].FORMS[0].WL_CLIN_PRIORITY, '"',
							'Diagnosis="',  wait[i].FORMS[0].WL_DIAG, '"', 
							'AdmissionReason="', wait[i].FORMS[0].WL_ADM_REASON,'"', 
							'SpecialInstructions="',  wait[i].FORMS[0].WL_SPEC_INSTR,'"',
							'ConfirmedAdmissionDate="',  wait[i].FORMS[0].WL_CONFIRMED_ADM_DT, '"', 
							'PlannedAdmissionDate="',  wait[i].FORMS[0].WL_PLANNED_ADM_DT, '"',
							'MultipleBookings="', wait[i].FORMS[0].WL_MULT_BOOKINGS,'"',

							'">',
							
							'<td class="schn-cell-border">' + wait[i].LISTING + '</td>',
							'<td class="schn-cell-border">' + wait[i].URGENCY + '</td>',
							'<td class="schn-cell-border">' + wait[i].PLANNED + '</td>',
							'<td class="schn-cell-border">' + wait[i].AMO + '</td>',
							'<td class="schn-cell-border">' + wait[i].MED_SERV + '</td>',
							'<td class="schn-cell-border">' + wait[i].REASON + '</td>',

							'</tr>');

//							'">');
		}
		
		
		targetHTML.push('</tbody></table></div>');
		
		
	} else {
		targetHTML.push("<div class='sub-sec-content'><span class='res-none'>There are no Waitlist bookings for this patient.</span></div>");
	}
	
	targetHTML.push('</div>');
	
	targetHTML.push('<div class="sub-sec"><h3 class="sub-sec-hd"><span class="sub-sec-title">Requests for Admission</span></h3>');
	if (rfa_length > 0){
		targetHTML.push('<div class="sub-sec-content"><table class="schn-table-border"><thead><tr>',
						'<th>Pre-Registration Date</th>',
						'<th>Urgency</th>',
						'<th>Confirmed Admission Date</th>',
						'<th>Planned Admission Date</th>',
						'<th>Attending Doctor</th>',
						'<th>Reason for Admission</th>',
						'</tr></thead>');
		
		for (j=0; j<rfa_length;j++){
//021		targetHTML.push('<tbody><tr class="hvrData" title="',
			targetHTML.push('<tbody><tr class="schn-wlb-hvrdata" id="schn-appts-cell_2"',

			//hover tooltip in the title
//021						'Request for Admission \r\n',  //016
//							'AMO: ' + rfa[j].RFA_FORMS[0].RFA_AMO + '\r\n',
//							'Clinical Priority: ' + rfa[j].RFA_FORMS[0].RFA_CLIN_PRIORITY + '\r\n',
//							'Diagnosis: ' + rfa[j].RFA_FORMS[0].RFA_DIAG + '\r\n',
//							'Admission Reason: ' + rfa[j].RFA_FORMS[0].RFA_ADM_REASON + '\r\n',
//							'Special Instructions: ' + rfa[j].RFA_FORMS[0].RFA_SPEC_INSTR + '\r\n',
//							'Confirmed Admission Date: ' + rfa[j].RFA_FORMS[0].RFA_CONFIRMED_ADM_DT + '\r\n',
//							'Planned Admission Date: ' + rfa[j].RFA_FORMS[0].RFA_PLANNED_ADM_DT + '\r\n',
//							'Multiple Bookings: ' + rfa[j].RFA_FORMS[0].RFA_MULT_BOOKINGS + '\r\n',

							'AMO="', rfa[j].RFA_FORMS[0].RFA_AMO, '"',	
							'ClinicalPriority="',  rfa[j].RFA_FORMS[0].RFA_CLIN_PRIORITY, '"',
							'Diagnosis="',  rfa[j].RFA_FORMS[0].RFA_DIAG, '"', 
							'AdmissionReason="', rfa[j].RFA_FORMS[0].RFA_ADM_REASON ,'"', 
							'SpecialInstructions="',  rfa[j].RFA_FORMS[0].RFA_SPEC_INSTR,'"',
							'ConfirmedAdmissionDate="',  rfa[j].RFA_FORMS[0].RFA_CONFIRMED_ADM_DT, '"', 
							'PlannedAdmissionDate="',  rfa[j].RFA_FORMS[0].RFA_PLANNED_ADM_DT, '"',
							'MultipleBookings="', rfa[j].RFA_FORMS[0].RFA_MULT_BOOKINGS,'"',

							'">',
							'<td class="schn-cell-border">' + rfa[j].PRE_REG_DT + '</td>',
							'<td class="schn-cell-border">' + rfa[j].RFA_FORMS[0].RFA_CLIN_PRIORITY + '</td>',
							'<td class="schn-cell-border">' + rfa[j].RFA_FORMS[0].RFA_CONFIRMED_ADM_DT + '</td>',
							'<td class="schn-cell-border">' + rfa[j].RFA_FORMS[0].RFA_PLANNED_ADM_DT + '</td>',
							'<td class="schn-cell-border">' + rfa[j].RFA_FORMS[0].RFA_AMO + '</td>',
							'<td class="schn-cell-border">' + rfa[j].RFA_FORMS[0].RFA_ADM_REASON + '</td>',
							'</tr>');
		}
	
		targetHTML.push('</tbody></table></div>');
	
	} else {
		targetHTML.push("<div class='sub-sec-content'><span class='res-none'>There are no current Requests for Admission for this patient.</span></div>");
	}
	targetHTML.push('</div>');
	targetHTML.push('</div>');	//close content-body
	target.innerHTML = targetHTML.join("");
	
	//hover tooltip
//021	$("#" + compId + " .hvrData").tooltip({
//		"track" : true,
//		"delay" : 100,
//		"fade" : 150
//	});
	//this may or may not be needed
	component.addEventHandlers();
};   // end schn.wl_bookings

//021<-

/* ----------------------------------------------------------------------------------

008 SCHN APPOINTMENTS COMPONENT

------------------------------------------------------------------------------------*/

/*custom component - schn appointments */
//022 
/* 

MPage.namespace("schn.appointments");
schn.appointments = function(){};
schn.appointments.prototype = new MPage.Component();
schn.appointments.prototype.constructor = MPage.Component;
schn.appointments.prototype.base = MPage.Component.prototype;
schn.appointments.prototype.name = "schn.appointments";
schn.appointments.prototype.cclProgram = "707_mp_pat_info_sum_get_appts2";
schn.appointments.prototype.cclParams = [];
schn.appointments.prototype.cclDataType = "JSON"; //possible values=> JSON, TEXT, XML
//options to be setup in bedrock for each custom component
schn.appointments.option_single_col = {
	"display_col" : "S"
	};
schn.appointments.option_multiple_col = {
	"display_col" : "M"
	};

schn.appointments.prototype.init = function(options) {
	//code to perform before immediately rendering (usually updating params is needed)
	var component = this;
	component.cclParams.push("MINE");
	//CAN USE ANY OR ALL OF THE FOLLOWING IN ORDER AS NEEDED:
	component.cclParams.push(this.getProperty("personId"));
	//component.cclParams.push(this.getProperty("encounterId"));
	//component.cclParams.push(this.getProperty("userId"));
	//component.cclParams.push(this.getProperty("PPRCode"));
	//component.cclParams.push(this.getProperty("positionCd"));
};

schn.appointments.prototype.addEventHandlers = function() {
	var component = this;
	var compId = component.getComponentUid();
	var target = component.getTarget();
	
	//$("#"+compId+" .classOfElementWithinComponent").click(function(){
	$("#"+compId+" .sub-sec-hd").click(function(){
		//some stuff to do when clicked
		$(this).parent().toggleClass("closed");
	});
};

schn.appointments.prototype.getSubHeader = function( str ) {
	//note that inline styles could be put in their own class and put as a second class for the div
	return ["<div class='sub-title-disp' style='margin:-6px -6px 6px -6px;border-left:none;border-right:none;'>",str,"</div>"].join("");
};

schn.appointments.prototype.render = function() {
	var component = this;
	var compId = component.getComponentUid();
	var target = component.getTarget();
	var record = component.data.APPTS;
	var c_appt = record.LIST_PAST;
	var f_appt = record.LIST_FUTURE;
	var t_appt = record.LIST_TODAY;
	var r_appt = record.LIST_REQ;

	var c_appt_length = c_appt.length;
	var c_appt_length_display = String(c_appt.length)

	var r_appt_length = r_appt.length;
	var r_appt_length_display = String(r_appt.length)

	var t_appt_length = t_appt.length;
	var t_appt_length_display = String(t_appt.length)

	var f_appt_length = f_appt.length;
	var f_appt_length_display = String(f_appt.length)
	var targetHTML = [];
	

	var total_appts = 0;
	total_appts = total_appts + c_appt.length + f_appt.length + t_appt.length + r_appt.length;
	
	var option = component.options
	var appname = option.display_col
	
	//009
	var today_appt_string ="Today's Appointments"
	
//	component.setProperty("headerSubTitle","(" + 789 + ")");
	
	targetHTML.push('<div class="content-body schn-main-component">');
	{
		//targetHTML.push('<div class="content-body">');
		targetHTML.push('<div class="sub-sec"><h3 class="sub-sec-hd"><span class="sub-sec-hd-tgl">-</span><span class="sub-sec-title">Future Appointments</span></h3>');

		
		if (f_appt_length > 0) {
			//targetHTML.push('<div class="sub-sec-content"><table><tbody>');
			
			if(appname == "S"){
			targetHTML.push('<div class="sub-sec-content"><table class="schn-table-border"><thead><tr>',
						'<th>Appt Dt Tm</th>',
						'<th>Appt Type</th>',
						'<th>Appt State</th>',
						'<th>Primary Resource</th>',
						'<th>Location</th>',
						'<th>Referring Doctor</th>',
						'</tr></thead>');			
			}else{
			targetHTML.push('<div class="sub-sec-content"><table class="schn-table-border"><thead><tr>',
						'<th>Appt Dt Tm</th>',
						'<th>Appt Type</th>',
						'<th>Primary Resource</th>',
						'</tr></thead>');			
			}
			
			for (i=0;i<f_appt_length;i++){

				if (i%2 == 1){
					ind=1;
				}else{
					ind=2;
				}			
						
				if(appname == "S"){
				targetHTML.push('<tr class="hvrData" id="schn-appts-cell_2" title="',
							//hover tooltip in the title>',
							'Ref Doctor Mailing Address: <b>' + f_appt[i].ADDRESS + '</b><br />',
							'">');
				
				}else{
				targetHTML.push('<tr class="hvrData" id="schn-appts-cell_2" title="',
							//hover tooltip in the title>',
							'Appt Dt Tm: <b>' + f_appt[i].APPT_DT_TM_DISPLAY + '</b><br />',
							'Appt Type: <b>' + f_appt[i].APPT_TYPE + '</b><br />',
							'Appt State: <b>' + f_appt[i].SCH_STATE + '</b><br />',
							'Primary Resource: <b>' + f_appt[i].PRIMARY_RES + '</b><br />',
							'Location: <b>' + f_appt[i].LOCATION + '</b><br />',
							'Referring Doctor: <b>' + f_appt[i].REFERRING_DOC + '</b><br />',
							'Ref Doctor Mailing Address: <b>' + f_appt[i].ADDRESS + '</b><br />',
							'">');
				}
				
					if(appname == "S"){
			//targetHTML.push{'<div class="schn-appts-cell">');	
					targetHTML.push('<td style="background-color:#FFFFFF;">' + f_appt[i].APPT_DT_TM_DISPLAY + '</td>');
					targetHTML.push('<td style="background-color:#FFFFFF;">' + f_appt[i].APPT_TYPE + '</td>');
					targetHTML.push('<td style="background-color:#FFFFFF;">' + f_appt[i].SCH_STATE + '</td>');
					targetHTML.push('<td style="background-color:#FFFFFF;">' + f_appt[i].PRIMARY_RES + '</td>');
					targetHTML.push('<td style="background-color:#FFFFFF;">' + f_appt[i].LOCATION + '</td>');
					targetHTML.push('<td style="background-color:#FFFFFF;">' + f_appt[i].REFERRING_DOC + '</td>','</tr>');
					}else{
					targetHTML.push('<td style="background-color:#FFFFFF;">' + f_appt[i].APPT_DT_TM_DISPLAY + '</td>');
					targetHTML.push('<td style="background-color:#FFFFFF;">' + f_appt[i].APPT_TYPE + '</td>');
					targetHTML.push('<td style="background-color:#FFFFFF;">' + f_appt[i].PRIMARY_RES + '</td>','</tr>');
					}
			}
			
			targetHTML.push ('</tbody></table></div></div>');	
			//targetHTML.push('</div>');   //close content-body
		} else {
			//targetHTML.push('<table><tr><td class="schn-alerts-cell">There are no clinical alerts for this patient.</td></tr></table>');
			//009 targetHTML.push("<div class='sub-sec-content'><span class='res-none'>There is no future appointment.</span></div></div>");
			targetHTML.push("<div class='sub-sec-content'><span class='res-none'>There are no future appointments booked.</span></div></div>");
			//targetHTML.push("<span class='res-none'>There is no future appointment.</span></div>");
		}

		//targetHTML.push('<div class="content-body">');
		//009 targetHTML.push('<div class="sub-sec"><h3 class="sub-sec-hd"><span class="sub-sec-hd-tgl">-</span><span class="sub-sec-title">Today Appointments</span></h3>');
		targetHTML.push('<div class="sub-sec"><h3 class="sub-sec-hd"><span class="sub-sec-hd-tgl">-</span><span class="sub-sec-title">' + today_appt_string + '</span></h3>');

		if (t_appt_length > 0) {
			//targetHTML.push('<div class="sub-sec-content"><table><tbody>');
		
				if(appname == "S"){	
				targetHTML.push('<div class="sub-sec-content"><table class="schn-table-border"><thead><tr>',
						'<th>Appt Dt Tm</th>',
						'<th>Appt Type</th>',
						'<th>Appt State</th>',
						'<th>Primary Resource</th>',
						'<th>Location</th>',
						'<th>Referring Doctor</th>',
						'</tr></thead>');	
				}else{
				targetHTML.push('<div class="sub-sec-content"><table class="schn-table-border"><thead><tr>',
						'<th>Appt Dt Tm</th>',
						'<th>Appt Type</th>',
						'<th>Primary Resource</th>',
						'</tr></thead>');					
				}
				
		for (i=0;i<t_appt_length;i++){

				if (i%2 == 1){
					ind=1;
				}else{
					ind=2;
				}			
				
				if(appname == "S"){
				targetHTML.push('<tr class="hvrData" id="schn-appts-cell_2" title="',
							//hover tooltip in the title>',
							'Ref Doctor Mailing Address: <b>' + t_appt[i].ADDRESS + '</b><br />',
							'">');
				}else{
				targetHTML.push('<tr class="hvrData" id="schn-appts-cell_2" title="',
							//hover tooltip in the title>',
							'Appt Dt Tm: <b>' + t_appt[i].APPT_DT_TM_DISPLAY + '</b><br />',
							'Appt Type: <b>' + t_appt[i].APPT_TYPE + '</b><br />',
							'Appt State: <b>' + t_appt[i].SCH_STATE + '</b><br />',
							'Primary Resource: <b>' + t_appt[i].PRIMARY_RES + '</b><br />',
							'Location: <b>' + t_appt[i].LOCATION + '</b><br />',
							'Referring Doctor: <b>' + t_appt[i].REFERRING_DOC + '</b><br />',
							'Ref Doctor Mailing Address: <b>' + t_appt[i].ADDRESS + '</b><br />',
							'">');
				}
				
			//targetHTML.push{'<div class="schn-appts-cell">');	
					//targetHTML.push('<tr id="schn-appts-cell">');
				
					if(appname == "S"){
					targetHTML.push('<td style="background-color:#FFFFFF;">' + t_appt[i].APPT_DT_TM_DISPLAY + '</td>');
					targetHTML.push('<td style="background-color:#FFFFFF;">' + t_appt[i].APPT_TYPE + '</td>');
					targetHTML.push('<td style="background-color:#FFFFFF;">' + t_appt[i].SCH_STATE + '</td>');
					targetHTML.push('<td style="background-color:#FFFFFF;">' + t_appt[i].PRIMARY_RES + '</td>');
					targetHTML.push('<td style="background-color:#FFFFFF;">' + t_appt[i].LOCATION + '</td>');
					targetHTML.push('<td style="background-color:#FFFFFF;">' + t_appt[i].REFERRING_DOC + '</td>','</tr>');
					}else{
					targetHTML.push('<td style="background-color:#FFFFFF;">' + t_appt[i].APPT_DT_TM_DISPLAY + '</td>');
					targetHTML.push('<td style="background-color:#FFFFFF;">' + t_appt[i].APPT_TYPE + '</td>');
					targetHTML.push('<td style="background-color:#FFFFFF;">' + t_appt[i].PRIMARY_RES + '</td>','</tr>');
					}
			}
			
			targetHTML.push ('</tbody></table></div></div>');	
			//targetHTML.push('</div>');   //close content-body
		} else {
			//targetHTML.push('<table><tr><td class="schn-alerts-cell">There are no clinical alerts for this patient.</td></tr></table>');
			//009 targetHTML.push("<div class='sub-sec-content'><span class='res-none'>There is no appointment for today.</span></div></div>");
			targetHTML.push("<div class='sub-sec-content'><span class='res-none'>There are no appointments for today.</span></div></div>");
			//targetHTML.push("<span class='res-none'>There is no appointment for today.</span></div>");
		}

		
		
		//targetHTML.push('<div class="content-body">');
		targetHTML.push('<div class="sub-sec"><h3 class="sub-sec-hd"><span class="sub-sec-hd-tgl">-</span><span class="sub-sec-title">Past Appointments (Last 10 Appointments)</span></h3>');
		
		if (c_appt_length > 0 ) {
			//targetHTML.push('<div class="sub-sec-content"><table><tbody>');
			
			if(c_appt_length >10){ c_appt_length = 10};
			
			if(appname == "S"){
			targetHTML.push('<div class="sub-sec-content"><table class="schn-table-border"><thead><tr>',
						'<th>Appt Dt Tm</th>',
						'<th>Appt Type</th>',
						'<th>Appt State</th>',
						'<th>Primary Resource</th>',
						'<th>Location</th>',
						'<th>Referring Doctor</th>',
						'</tr></thead>');	
			}else{
			targetHTML.push('<div class="sub-sec-content"><table class="schn-table-border"><thead><tr>',
						'<th>Appt Dt Tm</th>',
						'<th>Appt Type</th>',
						'<th>Primary Resource</th>',
						'</tr></thead>');	
			}
			
			for (i=0;i<c_appt_length;i++){
			//for (i=0;i<10;i++){

				if (i%2 == 1){
					ind=1;
				}else{
					ind=2;
				}			
				
				if(appname == "S"){
				targetHTML.push('<tr class="hvrData" id="schn-appts-cell_2" title="',
							//hover tooltip in the title>',
							'Ref Doctor Mailing Address: <b>' + c_appt[i].ADDRESS + '</b><br />',
							'">');
				}else{
				targetHTML.push('<tr class="hvrData" id="schn-appts-cell_2" title="',
							//hover tooltip in the title>',
							'Appt Dt Tm: <b>' + c_appt[i].APPT_DT_TM_DISPLAY + '</b><br />',
							'Appt Type: <b>' + c_appt[i].APPT_TYPE + '</b><br />',
							'Appt State: <b>' + c_appt[i].SCH_STATE + '</b><br />',
							'Primary Resource: <b>' + c_appt[i].PRIMARY_RES + '</b><br />',
							'Location: <b>' + c_appt[i].LOCATION + '</b><br />',
							'Referring Doctor: <b>' + c_appt[i].REFERRING_DOC + '</b><br />',
							'Ref Doctor Mailing Address: <b>' + c_appt[i].ADDRESS + '</b><br />',
							'">');
				}
				
			//targetHTML.push{'<div class="schn-appts-cell">');	
					//targetHTML.push('<tr id="schn-appts-cell">');
					if(appname == "S"){
					targetHTML.push('<td style="background-color:#FFFFFF;">' + c_appt[i].APPT_DT_TM_DISPLAY + '</td>');
					targetHTML.push('<td style="background-color:#FFFFFF;">' + c_appt[i].APPT_TYPE + '</td>');
					targetHTML.push('<td style="background-color:#FFFFFF;">' + c_appt[i].SCH_STATE + '</td>');
					targetHTML.push('<td style="background-color:#FFFFFF;">' + c_appt[i].PRIMARY_RES + '</td>');
					targetHTML.push('<td style="background-color:#FFFFFF;">' + c_appt[i].LOCATION + '</td>');
					targetHTML.push('<td style="background-color:#FFFFFF;">' + c_appt[i].REFERRING_DOC + '</td>','</tr>');
					}else{
					targetHTML.push('<td style="background-color:#FFFFFF;">' + c_appt[i].APPT_DT_TM_DISPLAY + '</td>');
					targetHTML.push('<td style="background-color:#FFFFFF;">' + c_appt[i].APPT_TYPE + '</td>');
					targetHTML.push('<td style="background-color:#FFFFFF;">' + c_appt[i].PRIMARY_RES + '</td>','</tr>');
					}
					
			}
			
			targetHTML.push ('</tbody></table></div></div>');	
			//targetHTML.push('</div>');   //close content-body
		} else {
			//targetHTML.push('<table><tr><td class="schn-alerts-cell">There are no clinical alerts for this patient.</td></tr></table>');
			//009 targetHTML.push("<div class='sub-sec-content'><span class='res-none'>There is no past appointment.</span></div></div>");
			targetHTML.push("<div class='sub-sec-content'><span class='res-none'>There are no past appointments.</span></div></div>");
			//targetHTML.push("<span class='res-none'>There is no past appointment.</span></div>");
		}

		
		//targetHTML.push('<div class="content-body">');
		//009targetHTML.push('<div class="sub-sec"><h3 class="sub-sec-hd"><span class="sub-sec-hd-tgl">-</span><span class="sub-sec-title">Request List Appointments</span></h3>');
		targetHTML.push('<div class="sub-sec"><h3 class="sub-sec-hd"><span class="sub-sec-hd-tgl">-</span><span class="sub-sec-title">Requested Appointments</span></h3>');
		//targetHTML.push('<div class="sub-sec"><h3 class="sub-sec-hd"><span class="sub-sec-title">Request List Appointments v1.41</span></h3>');

				
		if (r_appt_length > 0) {
			if(appname == "S"){
			targetHTML.push('<div class="sub-sec-content"><table class="schn-table-border"><thead><tr>',
						'<th>Appt Type</th>',
						'<th>Earliest Dt Tm</th>',
						'<th>Latest Dt Tm</th>',
						'<th>Referred By</th>',
						'</tr></thead>');
			}else{
			targetHTML.push('<div class="sub-sec-content"><table class="schn-table-border"><thead><tr>',
						'<th>Appt Type</th>',
						'<th>Earliest Dt Tm</th>',
						'<th>Latest Dt Tm</th>',
						'</tr></thead>');
			}			
						
			targetHTML.push('<tbody>');
			
			for (i=0;i<r_appt_length;i++){

				if (i%2 == 1){
					ind=1;
				}else{
					ind=2;
				}			
				
				if(appname == "S"){
				targetHTML.push('<tr  class="hvrData" id="schn-appts-cell_2" title="',
				//			//hover tooltip in the title>',
							'Schedule Comments: <b>' + r_appt[i].SCH_COMMENTS + '</b><br />',
							'">');
				}else{
				targetHTML.push('<tr  class="hvrData" id="schn-appts-cell_2" title="',
				//			//hover tooltip in the title>',
							'Referred By: <b>' + r_appt[i].REFERRING_DOC + '</b><br />',
							'Schedule Comments: <b>' + r_appt[i].SCH_COMMENTS + '</b><br />',
							'">');
				}			

			//targetHTML.push{'<div class="schn-appts-cell">');	
					//targetHTML.push('<tr id="schn-appts-cell">');
					if(appname == "S"){
					targetHTML.push('<td style="background-color:#FFFFFF;">' + r_appt[i].APPT_TYPE + '</td>');
					targetHTML.push('<td style="background-color:#FFFFFF;">' + r_appt[i].EARLIEST_DT_TM_D + '</td>');
					targetHTML.push('<td style="background-color:#FFFFFF;">' + r_appt[i].LATEST_DT_TM_D + '</td>');
					targetHTML.push('<td style="background-color:#FFFFFF;">' + r_appt[i].REFERRING_DOC + '</td>','</tr>');
					}else{
					targetHTML.push('<td style="background-color:#FFFFFF;">' + r_appt[i].APPT_TYPE + '</td>');
					targetHTML.push('<td style="background-color:#FFFFFF;">' + r_appt[i].EARLIEST_DT_TM_D + '</td>');
					targetHTML.push('<td style="background-color:#FFFFFF;">' + r_appt[i].LATEST_DT_TM_D + '</td>','</tr>');
					}
			}
			
			targetHTML.push ('</tbody></table></div></div>');	
			//targetHTML.push('</div>');   //close content-body
		} else {
			//targetHTML.push('<table><tr><td class="schn-alerts-cell">There are no clinical alerts for this patient.</td></tr></table>');
			//009 targetHTML.push("<div class='sub-sec-content'><span class='res-none'>There is no appointment for request list.</span></div></div>");
			targetHTML.push("<div class='sub-sec-content'><span class='res-none'>There are no requested appointments.</span></div></div>");
			//targetHTML.push("<span class='res-none'>There is no appointment for request list.</span></div>");
		}
		
		
	} 
	
	targetHTML.push('</div>') //end ocntent body
	
	
	target.innerHTML = targetHTML.join("");
	//display total to header 
	//component.setProperty("headerSubTitle", "(" + total_appts + ")");
	
	//hover tooltip...
	$("#" + compId + " .hvrData").tooltip({
		"track" : true,
		"delay" : 150,
		"fade" : 150,
	});


	//this may or may not be needed
	component.addEventHandlers();
};
//end custom component schn.appointments

//022
*/

//022->
MPage.namespace("schn.appointments");
schn.appointments = function(){};
schn.appointments.prototype = new MPage.Component();
schn.appointments.prototype.constructor = MPage.Component;
schn.appointments.prototype.base = MPage.Component.prototype;
schn.appointments.prototype.name = "schn.appointments";
schn.appointments.prototype.cclProgram = "707_mp_pat_info_sum_get_appts2";
schn.appointments.prototype.cclParams = [];
schn.appointments.prototype.cclDataType = "JSON"; //possible values=> JSON, TEXT, XML
//options to be setup in bedrock for each custom component
schn.appointments.option_single_col = {
	"display_col" : "S"
	};
schn.appointments.option_multiple_col = {
	"display_col" : "M"
	};

schn.appointments.prototype.init = function(options) {
	//code to perform before immediately rendering (usually updating params is needed)
	var component = this;
	component.cclParams.push("MINE");
	//CAN USE ANY OR ALL OF THE FOLLOWING IN ORDER AS NEEDED:
	component.cclParams.push(this.getProperty("personId"));
	//component.cclParams.push(this.getProperty("encounterId"));
	//component.cclParams.push(this.getProperty("userId"));
	//component.cclParams.push(this.getProperty("PPRCode"));
	//component.cclParams.push(this.getProperty("positionCd"));
};

schn.appointments.prototype.addEventHandlers = function() {
	var component = this;
	var compId = component.getComponentUid();
	var target = component.getTarget();
	
//020
	var option = component.options
	var appname = option.display_col
	
//	var record = component.data.APPTS;
//	var c_appt = record.LIST_PAST;
//	var f_appt = record.LIST_FUTURE;
//	var t_appt = record.LIST_TODAY;
//	var r_appt = record.LIST_REQ;
	
	
	//$("#"+compId+" .classOfElementWithinComponent").click(function(){
	$("#"+compId+" .sub-sec-hd").click(function(){
		//some stuff to do when clicked
		$(this).parent().toggleClass("closed");
	});
	
//022 ->
	//

	var appts_hvr = $("#"+compId+" .schn-appts-hvrdata");	
	var classOfHover = 'nswsbb-hover-highlight';
	var alertsNum = appts_hvr.length;
		
	for (var i = 0; i < alertsNum; i++) {
		var currentappts = appts_hvr.eq(i);
		currentappts.hover(function () {
			$(this).addClass(classOfHover);
		},
			function () {
			$(this).removeClass(classOfHover);
		});
		
		var list_name = currentappts.attr("ListName")
		
	if(appname == "S" && list_name != "R_List" ){
//		if( list_name != "Request List" ){
		var tooltipObj = ["<div class='nswsbb-hvr'><dl class='nswsbb-pl-det'><dt><span>Ref Doctor Mailing Address:</span></dt><dd class='nswsbb-pl-det-name'><span>", currentappts.attr("RefDoctorMailingAddress"), 
		"</span></dd></dl></div>"]; 
//		}
//		else if (currentappts.attr("ListName") == 'Request List'){
//		var tooltipObj = ["<div class='nswsbb-hvr'><dl class='nswsbb-pl-det'><dt><span>Schedule Comments:</span></dt><dd class='nswsbb-pl-det-name'><span>", currentappts.attr("ListName"),
//		"</span></dd></dl></div>"]; 
//		}
	}
	else if(appname == "S" && list_name == "R_List"){
		var tooltipObj = ["<div class='nswsbb-hvr'><dl class='nswsbb-pl-det'><dt><span>Schedule Comments:</span></dt><dd class='nswsbb-pl-det-name'><span>", currentappts.attr("ScheduleComments"),
		"</span></dd></dl></div>"]; 	
	}
	else if(appname == "M" && list_name != "R_List"){
		var tooltipObj = ["<div class='nswsbb-hvr'><dl class='nswsbb-pl-det'><dt><span>Appt Dt Tm:</span></dt><dd class='nswsbb-pl-det-name'><span>", currentappts.attr("ApptDtTm"),
		"</span></dd><dt><span>Appt Type:</span></dt><dd class='nswsbb-pl-det-dt'><span>", currentappts.attr("ApptType"),
		"</span></dd><dt><span>Appt State:</span></dt><dd class='nswsbb-pl-det-dt'><span>", currentappts.attr("ApptState"), 
		"</span></dd><dt><span>Primary Resource:</span></dt><dd class='nswsbb-pl-det-dt'><span>", currentappts.attr("PrimaryResource"), 
		"</span></dd><dt><span>Location:</span></dt><dd class='nswsbb-pl-det-dt'><span>", currentappts.attr("Location"), 
		"</span></dd><dt><span>Referring Doctor:</span></dt><dd class='nswsbb-pl-det-dt'><span>", currentappts.attr("ReferringDoctor"), 
		"</span></dd><dt><span>Ref Doctor Mailing Address: </span></dt><dd class='nswsbb-pl-det-comment'><span>", currentappts.attr("RefDoctorMailingAddress"), 

		"</span></dd></dl></div>"]; 	
	}
	else if(appname == "M" && list_name == "R_List"){
		var tooltipObj = ["<div class='nswsbb-hvr'><dl class='nswsbb-pl-det'><dt><span>Referred By:</span></dt><dd class='nswsbb-pl-det-name'><span>", currentappts.attr("ReferredBy"),
		"</span></dd><dt><span>Schedule Comments: </span></dt><dd class='nswsbb-pl-det-comment'><span>", currentappts.attr("ScheduleComments"), 

		"</span></dd></dl></div>"]; 	
	
	}
	
	
		
		currentappts.qtip({
			content : {
				text : $(tooltipObj.join("")).addClass(classOfHover)
			},
			position : {
				viewport : $(window),
				target : 'mouse',
				adjust : {
					y : 21,
					x : 40,
					method : 'shift shift'
				}
			},
			style : {
				def : false,
				classes : 'nswsbb-hover'
			}
		});
	}	
//022 <-	
	
};

schn.appointments.prototype.getSubHeader = function( str ) {
	//note that inline styles could be put in their own class and put as a second class for the div
	return ["<div class='sub-title-disp' style='margin:-6px -6px 6px -6px;border-left:none;border-right:none;'>",str,"</div>"].join("");
};

schn.appointments.prototype.render = function() {
	var component = this;
	var compId = component.getComponentUid();
	var target = component.getTarget();
	var record = component.data.APPTS;
	var c_appt = record.LIST_PAST;
	var f_appt = record.LIST_FUTURE;
	var t_appt = record.LIST_TODAY;
	var r_appt = record.LIST_REQ;

	var c_appt_length = c_appt.length;
	var c_appt_length_display = String(c_appt.length)

	var r_appt_length = r_appt.length;
	var r_appt_length_display = String(r_appt.length)

	var t_appt_length = t_appt.length;
	var t_appt_length_display = String(t_appt.length)

	var f_appt_length = f_appt.length;
	var f_appt_length_display = String(f_appt.length)
	var targetHTML = [];
	

	var total_appts = 0;
	total_appts = total_appts + c_appt.length + f_appt.length + t_appt.length + r_appt.length;
	
	var option = component.options
	var appname = option.display_col
	
	//009
	var today_appt_string ="Today's Appointments"
	
//	component.setProperty("headerSubTitle","(" + 789 + ")");
	
	targetHTML.push('<div class="content-body schn-main-component">');
	{
		//targetHTML.push('<div class="content-body">');
		targetHTML.push('<div class="sub-sec"><h3 class="sub-sec-hd"><span class="sub-sec-hd-tgl">-</span><span class="sub-sec-title">Future Appointments</span></h3>');

		
		if (f_appt_length > 0) {
			//targetHTML.push('<div class="sub-sec-content"><table><tbody>');
			
			if(appname == "S"){
			targetHTML.push('<div class="sub-sec-content"><table class="schn-table-border"><thead><tr>',
						'<th>Appt Dt Tm</th>',
						'<th>Appt Type</th>',
						'<th>Appt State</th>',
						'<th>Primary Resource</th>',
						'<th>Location</th>',
						'<th>Referring Doctor</th>',
						'</tr></thead>');			
			}else{
			targetHTML.push('<div class="sub-sec-content"><table class="schn-table-border"><thead><tr>',
						'<th>Appt Dt Tm</th>',
						'<th>Appt Type</th>',
						'<th>Primary Resource</th>',
						'</tr></thead>');			
			}
			
			for (i=0;i<f_appt_length;i++){

				if (i%2 == 1){
					ind=1;
				}else{
					ind=2;
				}			
						
				if(appname == "S"){
//022			targetHTML.push('<tr class="hvrData" id="schn-appts-cell_2" title="',
				targetHTML.push('<tr class="schn-appts-hvrdata" id="schn-appts-cell_2" ',
	
						//hover tooltip in the title>',
//022					'Ref Doctor Mailing Address: ' + f_appt[i].ADDRESS + '\r\n', //016
						'RefDoctorMailingAddress="', f_appt[i].ADDRESS, '"',
						'ListName="', f_appt[i].LIST_NAME, '"',
						
						
							'">');
				
				}else{
//022			targetHTML.push('<tr class="hvrData" id="schn-appts-cell_2" title="',
				targetHTML.push('<tr class="schn-appts-hvrdata" id="schn-appts-cell_2" ',

				//hover tooltip in the title>',
//022						'Appt Dt Tm: ' + f_appt[i].APPT_DT_TM_DISPLAY + '\r\n', //016
//							'Appt Type: ' + f_appt[i].APPT_TYPE + '\r\n',
//							'Appt State: ' + f_appt[i].SCH_STATE + '\r\n',
//							'Primary Resource: ' + f_appt[i].PRIMARY_RES + '\r\n',
//							'Location: ' + f_appt[i].LOCATION + '\r\n',
//							'Referring Doctor: ' + f_appt[i].REFERRING_DOC + '\r\n',
//							'Ref Doctor Mailing Address: ' + f_appt[i].ADDRESS + '\r\n',
//022
							'ApptDtTm="',  f_appt[i].APPT_DT_TM_DISPLAY, '"', 
							'ApptType="',  f_appt[i].APPT_TYPE, '"', 
							'ApptState="', f_appt[i].SCH_STATE, '"', 
							'PrimaryResource="',  f_appt[i].PRIMARY_RES, '"', 
							'Location="',  f_appt[i].LOCATION, '"',
							'ReferringDoctor="',  f_appt[i].REFERRING_DOC, '"',
							'RefDoctorMailingAddress="',  f_appt[i].ADDRESS, '"', 
							'ListName="', f_appt[i].LIST_NAME, '"',

							'">');
				}
				
					if(appname == "S"){
			//targetHTML.push{'<div class="schn-appts-cell">');	
					targetHTML.push('<td style="background-color:#FFFFFF;">' + f_appt[i].APPT_DT_TM_DISPLAY + '</td>');
					targetHTML.push('<td style="background-color:#FFFFFF;">' + f_appt[i].APPT_TYPE + '</td>');
					targetHTML.push('<td style="background-color:#FFFFFF;">' + f_appt[i].SCH_STATE + '</td>');
					targetHTML.push('<td style="background-color:#FFFFFF;">' + f_appt[i].PRIMARY_RES + '</td>');
					targetHTML.push('<td style="background-color:#FFFFFF;">' + f_appt[i].LOCATION + '</td>');
					targetHTML.push('<td style="background-color:#FFFFFF;">' + f_appt[i].REFERRING_DOC + '</td>','</tr>');
					}else{
					targetHTML.push('<td style="background-color:#FFFFFF;">' + f_appt[i].APPT_DT_TM_DISPLAY + '</td>');
					targetHTML.push('<td style="background-color:#FFFFFF;">' + f_appt[i].APPT_TYPE + '</td>');
					targetHTML.push('<td style="background-color:#FFFFFF;">' + f_appt[i].PRIMARY_RES + '</td>','</tr>');
					}
			}
			
			targetHTML.push ('</tbody></table></div></div>');	
			//targetHTML.push('</div>');   //close content-body
		} else {
			//targetHTML.push('<table><tr><td class="schn-alerts-cell">There are no clinical alerts for this patient.</td></tr></table>');
			//009 targetHTML.push("<div class='sub-sec-content'><span class='res-none'>There is no future appointment.</span></div></div>");
			targetHTML.push("<div class='sub-sec-content'><span class='res-none'>There are no future appointments booked.</span></div></div>");
			//targetHTML.push("<span class='res-none'>There is no future appointment.</span></div>");
		}

		//targetHTML.push('<div class="content-body">');
		//009 targetHTML.push('<div class="sub-sec"><h3 class="sub-sec-hd"><span class="sub-sec-hd-tgl">-</span><span class="sub-sec-title">Today Appointments</span></h3>');
		targetHTML.push('<div class="sub-sec"><h3 class="sub-sec-hd"><span class="sub-sec-hd-tgl">-</span><span class="sub-sec-title">' + today_appt_string + '</span></h3>');

		if (t_appt_length > 0) {
			//targetHTML.push('<div class="sub-sec-content"><table><tbody>');
		
				if(appname == "S"){	
				targetHTML.push('<div class="sub-sec-content"><table class="schn-table-border"><thead><tr>',
						'<th>Appt Dt Tm</th>',
						'<th>Appt Type</th>',
						'<th>Appt State</th>',
						'<th>Primary Resource</th>',
						'<th>Location</th>',
						'<th>Referring Doctor</th>',
						'</tr></thead>');	
				}else{
				targetHTML.push('<div class="sub-sec-content"><table class="schn-table-border"><thead><tr>',
						'<th>Appt Dt Tm</th>',
						'<th>Appt Type</th>',
						'<th>Primary Resource</th>',
						'</tr></thead>');					
				}
				
		for (i=0;i<t_appt_length;i++){

				if (i%2 == 1){
					ind=1;
				}else{
					ind=2;
				}			
				
				if(appname == "S"){
//022			targetHTML.push('<tr class="hvrData" id="schn-appts-cell_2" title="',
				targetHTML.push('<tr class="schn-appts-hvrdata" id="schn-appts-cell_2" ',

				//hover tooltip in the title>',
//022					'Ref Doctor Mailing Address: ' + t_appt[i].ADDRESS + '\r\n', //016
						'RefDoctorMailingAddress="', t_appt[i].ADDRESS, '"',
						'ListName="', t_appt[i].LIST_NAME, '"',

							'">');
				}else{
//022			targetHTML.push('<tr class="hvrData" id="schn-appts-cell_2" title="',
				targetHTML.push('<tr class="schn-appts-hvrdata" id="schn-appts-cell_2" ',

				//hover tooltip in the title>',
//022						'Appt Dt Tm: ' + t_appt[i].APPT_DT_TM_DISPLAY + '\r\n', //016
//							'Appt Type: ' + t_appt[i].APPT_TYPE + '\r\n',
//							'Appt State: ' + t_appt[i].SCH_STATE + '\r\n',
//							'Primary Resource: ' + t_appt[i].PRIMARY_RES + '\r\n',
//							'Location: ' + t_appt[i].LOCATION + '\r\n',
//							'Referring Doctor: ' + t_appt[i].REFERRING_DOC + '\r\n',
//							'Ref Doctor Mailing Address: ' + t_appt[i].ADDRESS + '\r\n',
//022
							'ApptDtTm="',  t_appt[i].APPT_DT_TM_DISPLAY, '"', 
							'ApptType="',  t_appt[i].APPT_TYPE, '"', 
							'ApptState="', t_appt[i].SCH_STATE, '"', 
							'PrimaryResource="',  t_appt[i].PRIMARY_RES, '"', 
							'Location="',  t_appt[i].LOCATION, '"',
							'ReferringDoctor="',  t_appt[i].REFERRING_DOC, '"',
							'RefDoctorMailingAddress="',  t_appt[i].ADDRESS, '"', 
							'ListName="', t_appt[i].LIST_NAME, '"',

							'">');
				}
				
			//targetHTML.push{'<div class="schn-appts-cell">');	
					//targetHTML.push('<tr id="schn-appts-cell">');
				
					if(appname == "S"){
					targetHTML.push('<td style="background-color:#FFFFFF;">' + t_appt[i].APPT_DT_TM_DISPLAY + '</td>');
					targetHTML.push('<td style="background-color:#FFFFFF;">' + t_appt[i].APPT_TYPE + '</td>');
					targetHTML.push('<td style="background-color:#FFFFFF;">' + t_appt[i].SCH_STATE + '</td>');
					targetHTML.push('<td style="background-color:#FFFFFF;">' + t_appt[i].PRIMARY_RES + '</td>');
					targetHTML.push('<td style="background-color:#FFFFFF;">' + t_appt[i].LOCATION + '</td>');
					targetHTML.push('<td style="background-color:#FFFFFF;">' + t_appt[i].REFERRING_DOC + '</td>','</tr>');
					}else{
					targetHTML.push('<td style="background-color:#FFFFFF;">' + t_appt[i].APPT_DT_TM_DISPLAY + '</td>');
					targetHTML.push('<td style="background-color:#FFFFFF;">' + t_appt[i].APPT_TYPE + '</td>');
					targetHTML.push('<td style="background-color:#FFFFFF;">' + t_appt[i].PRIMARY_RES + '</td>','</tr>');
					}
			}
			
			targetHTML.push ('</tbody></table></div></div>');	
			//targetHTML.push('</div>');   //close content-body
		} else {
			//targetHTML.push('<table><tr><td class="schn-alerts-cell">There are no clinical alerts for this patient.</td></tr></table>');
			//009 targetHTML.push("<div class='sub-sec-content'><span class='res-none'>There is no appointment for today.</span></div></div>");
			targetHTML.push("<div class='sub-sec-content'><span class='res-none'>There are no appointments for today.</span></div></div>");
			//targetHTML.push("<span class='res-none'>There is no appointment for today.</span></div>");
		}

		
		
		//targetHTML.push('<div class="content-body">');
		targetHTML.push('<div class="sub-sec"><h3 class="sub-sec-hd"><span class="sub-sec-hd-tgl">-</span><span class="sub-sec-title">Past Appointments (Last 10 Appointments)</span></h3>');
		
		if (c_appt_length > 0 ) {
			//targetHTML.push('<div class="sub-sec-content"><table><tbody>');
			
			if(c_appt_length >10){ c_appt_length = 10};
			
			if(appname == "S"){
			targetHTML.push('<div class="sub-sec-content"><table class="schn-table-border"><thead><tr>',
						'<th>Appt Dt Tm</th>',
						'<th>Appt Type</th>',
						'<th>Appt State</th>',
						'<th>Primary Resource</th>',
						'<th>Location</th>',
						'<th>Referring Doctor</th>',
						'</tr></thead>');	
			}else{
			targetHTML.push('<div class="sub-sec-content"><table class="schn-table-border"><thead><tr>',
						'<th>Appt Dt Tm</th>',
						'<th>Appt Type</th>',
						'<th>Primary Resource</th>',
						'</tr></thead>');	
			}
			
			for (i=0;i<c_appt_length;i++){
			//for (i=0;i<10;i++){

				if (i%2 == 1){
					ind=1;
				}else{
					ind=2;
				}			
				
				if(appname == "S"){
//022			targetHTML.push('<tr class="hvrData" id="schn-appts-cell_2" title="',
				targetHTML.push('<tr class="schn-appts-hvrdata" id="schn-appts-cell_2" ',

				//hover tooltip in the title>',
//022					'Ref Doctor Mailing Address: ' + c_appt[i].ADDRESS + '\r\n', //016
						'RefDoctorMailingAddress="', c_appt[i].ADDRESS, '"',
						'ListName="', c_appt[i].LIST_NAME, '"',

							'">');
				}else{
//022			targetHTML.push('<tr class="hvrData" id="schn-appts-cell_2" title="',
				targetHTML.push('<tr class="schn-appts-hvrdata" id="schn-appts-cell_2" ',

				//hover tooltip in the title>',
//022						'Appt Dt Tm: ' + c_appt[i].APPT_DT_TM_DISPLAY + '\r\n', //016
//							'Appt Type: ' + c_appt[i].APPT_TYPE + '\r\n',
//							'Appt State: ' + c_appt[i].SCH_STATE + '\r\n',
//							'Primary Resource: ' + c_appt[i].PRIMARY_RES + '\r\n',
//							'Location: ' + c_appt[i].LOCATION + '\r\n',
//							'Referring Doctor: ' + c_appt[i].REFERRING_DOC + '\r\n',
//							'Ref Doctor Mailing Address: ' + c_appt[i].ADDRESS + '\r\n',
//022
							'ApptDtTm="',  c_appt[i].APPT_DT_TM_DISPLAY, '"', 
							'ApptType="',  c_appt[i].APPT_TYPE, '"', 
							'ApptState="', c_appt[i].SCH_STATE, '"', 
							'PrimaryResource="',  c_appt[i].PRIMARY_RES, '"', 
							'Location="',  c_appt[i].LOCATION, '"',
							'ReferringDoctor="',  c_appt[i].REFERRING_DOC, '"',
							'RefDoctorMailingAddress="',  c_appt[i].ADDRESS, '"', 
							'ListName="', c_appt[i].LIST_NAME, '"',
					
							'">');
				}
				
			//targetHTML.push{'<div class="schn-appts-cell">');	
					//targetHTML.push('<tr id="schn-appts-cell">');
					if(appname == "S"){
					targetHTML.push('<td style="background-color:#FFFFFF;">' + c_appt[i].APPT_DT_TM_DISPLAY + '</td>');
					targetHTML.push('<td style="background-color:#FFFFFF;">' + c_appt[i].APPT_TYPE + '</td>');
					targetHTML.push('<td style="background-color:#FFFFFF;">' + c_appt[i].SCH_STATE + '</td>');
					targetHTML.push('<td style="background-color:#FFFFFF;">' + c_appt[i].PRIMARY_RES + '</td>');
					targetHTML.push('<td style="background-color:#FFFFFF;">' + c_appt[i].LOCATION + '</td>');
					targetHTML.push('<td style="background-color:#FFFFFF;">' + c_appt[i].REFERRING_DOC + '</td>','</tr>');
					}else{
					targetHTML.push('<td style="background-color:#FFFFFF;">' + c_appt[i].APPT_DT_TM_DISPLAY + '</td>');
					targetHTML.push('<td style="background-color:#FFFFFF;">' + c_appt[i].APPT_TYPE + '</td>');
					targetHTML.push('<td style="background-color:#FFFFFF;">' + c_appt[i].PRIMARY_RES + '</td>','</tr>');
					}
					
			}
			
			targetHTML.push ('</tbody></table></div></div>');	
			//targetHTML.push('</div>');   //close content-body
		} else {
			//targetHTML.push('<table><tr><td class="schn-alerts-cell">There are no clinical alerts for this patient.</td></tr></table>');
			//009 targetHTML.push("<div class='sub-sec-content'><span class='res-none'>There is no past appointment.</span></div></div>");
			targetHTML.push("<div class='sub-sec-content'><span class='res-none'>There are no past appointments.</span></div></div>");
			//targetHTML.push("<span class='res-none'>There is no past appointment.</span></div>");
		}

		
		//targetHTML.push('<div class="content-body">');
		//009targetHTML.push('<div class="sub-sec"><h3 class="sub-sec-hd"><span class="sub-sec-hd-tgl">-</span><span class="sub-sec-title">Request List Appointments</span></h3>');
		targetHTML.push('<div class="sub-sec"><h3 class="sub-sec-hd"><span class="sub-sec-hd-tgl">-</span><span class="sub-sec-title">Requested Appointments</span></h3>');
		//targetHTML.push('<div class="sub-sec"><h3 class="sub-sec-hd"><span class="sub-sec-title">Request List Appointments v1.41</span></h3>');

				
		if (r_appt_length > 0) {
			if(appname == "S"){
			targetHTML.push('<div class="sub-sec-content"><table class="schn-table-border"><thead><tr>',
						'<th>Appt Type</th>',
						'<th>Earliest Dt Tm</th>',
						'<th>Latest Dt Tm</th>',
						'<th>Referred By</th>',
						'</tr></thead>');
			}else{
			targetHTML.push('<div class="sub-sec-content"><table class="schn-table-border"><thead><tr>',
						'<th>Appt Type</th>',
						'<th>Earliest Dt Tm</th>',
						'<th>Latest Dt Tm</th>',
						'</tr></thead>');
			}			
						
			targetHTML.push('<tbody>');
			
			for (i=0;i<r_appt_length;i++){

				if (i%2 == 1){
					ind=1;
				}else{
					ind=2;
				}			
				
				if(appname == "S"){
//022			targetHTML.push('<tr  class="hvrData" id="schn-appts-cell_2" title="',
				targetHTML.push('<tr class="schn-appts-hvrdata" id="schn-appts-cell_2" ',
				//			//hover tooltip in the title>',
//022						'Schedule Comments: ' + r_appt[i].SCH_COMMENTS + '\r\n', //016
							'ScheduleComments="',  r_appt[i].SCH_COMMENTS, '"',
							'ListName="', r_appt[i].LIST_NAME, '"',

							'">');
				}else{
//022			targetHTML.push('<tr  class="hvrData" id="schn-appts-cell_2" title="',
				targetHTML.push('<tr class="schn-appts-hvrdata" id="schn-appts-cell_2" ',

				//			//hover tooltip in the title>',
//022						'Referred By: ' + r_appt[i].REFERRING_DOC + '\r\n', //016
//							'Schedule Comments: ' + r_appt[i].SCH_COMMENTS + '\r\n',
							'ReferredBy="',  r_appt[i].REFERRING_DOC, '"',
							'ScheduleComments="',  r_appt[i].SCH_COMMENTS, '"',
							'ListName="', r_appt[i].LIST_NAME, '"',

							'">');
				}			

			//targetHTML.push{'<div class="schn-appts-cell">');	
					//targetHTML.push('<tr id="schn-appts-cell">');
					if(appname == "S"){
					targetHTML.push('<td style="background-color:#FFFFFF;">' + r_appt[i].APPT_TYPE + '</td>');
					targetHTML.push('<td style="background-color:#FFFFFF;">' + r_appt[i].EARLIEST_DT_TM_D + '</td>');
					targetHTML.push('<td style="background-color:#FFFFFF;">' + r_appt[i].LATEST_DT_TM_D + '</td>');
					targetHTML.push('<td style="background-color:#FFFFFF;">' + r_appt[i].REFERRING_DOC + '</td>','</tr>');
					}else{
					targetHTML.push('<td style="background-color:#FFFFFF;">' + r_appt[i].APPT_TYPE + '</td>');
					targetHTML.push('<td style="background-color:#FFFFFF;">' + r_appt[i].EARLIEST_DT_TM_D + '</td>');
					targetHTML.push('<td style="background-color:#FFFFFF;">' + r_appt[i].LATEST_DT_TM_D + '</td>','</tr>');
					}
			}
			
			targetHTML.push ('</tbody></table></div></div>');	
			//targetHTML.push('</div>');   //close content-body
		} else {
			//targetHTML.push('<table><tr><td class="schn-alerts-cell">There are no clinical alerts for this patient.</td></tr></table>');
			//009 targetHTML.push("<div class='sub-sec-content'><span class='res-none'>There is no appointment for request list.</span></div></div>");
			targetHTML.push("<div class='sub-sec-content'><span class='res-none'>There are no requested appointments.</span></div></div>");
			//targetHTML.push("<span class='res-none'>There is no appointment for request list.</span></div>");
		}
		
		
	} 
	
	targetHTML.push('</div>') //end ocntent body
	
	
	target.innerHTML = targetHTML.join("");
	//display total to header 
	//component.setProperty("headerSubTitle", "(" + total_appts + ")");
	
	//hover tooltip...
//016	$("#" + compId + " .hvrData").tooltip({
//		"track" : true,
//		"delay" : 150,
//		"fade" : 150,
//	});


	//this may or may not be needed
	component.addEventHandlers();
};

//022<-

//024->
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------------------------------------------------------
USER SAVED DOCUMENTS - COMPONENT FOR DOCTOR 
Author: Matthew Huynh
----------------------------------------------------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/* Put name of component here */
MPage.namespace("schn.documents");
schn.documents = function(){};

schn.documents.option1 = {
	"documents":{
		"lookback_ccl":"2 Y",
		"lookback_desc":"2 years"
	}
};
schn.documents.option2 = {
	"documents":{
		"lookback_ccl":"5 Y",
		"lookback_desc":"5 years"
	}
};
//*********************************
schn.documents.prototype = new MPage.Component();
schn.documents.prototype.constructor = MPage.Component;
schn.documents.prototype.base = MPage.Component.prototype;
schn.documents.prototype.name = "schn.documents";
schn.documents.prototype.cclProgram = "707_mp_saved_docs";
schn.documents.prototype.cclParams = [];
schn.documents.prototype.cclDataType = "JSON"; //possible values=> JSON, TEXT, XML

schn.documents.prototype.init = function(options) {
	//code to perform before immediately rendering (usually updating params is needed)
	var component = this;
	//clear cclParams in case of refresh
	var comp_options = this.options.documents;
	component.cclParams = [];
	component.cclParams.push("MINE");
	//CAN USE ANY OR ALL OF THE FOLLOWING IN ORDER AS NEEDED:
	component.cclParams.push(this.getProperty("personId"));
	//component.cclParams.push(this.getProperty("encounterId"));
	////>>>>>component.cclParams.push(comp_options.lookback_ccl);
	//component.cclParams.push(this.getProperty("userId"));
	//component.cclParams.push(this.getProperty("PPRCode"));
	//component.cclParams.push(this.getProperty("positionCd"));
};

//*********************************
schn.documents.prototype.getSubHeader = function( str ) {
	//note that inline styles could be put in their own class and put as a second class for the div
	return ["<div class='sub-title-disp' style='margin:-6px -6px 6px -6px;border-left:none;border-right:none;'>",str,"</div>"].join("");
};

//*****************************************************
schn.documents.prototype.render = function() {
	var component = this;
	var compId = component.getComponentUid();
	var target = component.getTarget();
	var record = component.data.OUT;
	var doc_length = record.DOC.length;
	var comp_options = component.options.documents;

	var targetHTML = [];

	if(doc_length > 0)
	{	
		
		//set and create subheader (uncomment and update if needed)
	     targetHTML.push(component.getSubHeader("C = CHW MRN | S = SCH MRN | L = LAB MRN"));		
		
		//create a main div for the component 		
		targetHTML.push('<div class="content-body schn-main-component">');
			
		//create table if there are saved documents create table tag
		targetHTML.push('<table class="schn-table-border">');
		
		//set the title text if needed (uncomment and update if needed)
		component.setProperty("headerTitle", "Saved Documents - " + record.USER+"("+doc_length+")" );	
	 
		//set the component to collapsed (false)/expanded (true) if needed (uncomment and update if needed)
		//component.setProperty("headerShowHideState",true);	
		//create table columns name if there are saved documents
		targetHTML.push('<tr class="schn-label-cell schn-cell-border">');
		targetHTML.push('<td class="schn-td-pad"><b>MRN</b></td>');
		targetHTML.push('<td class="schn-td-pad"><b>NAME</b></b></td>');
		targetHTML.push('<td class="schn-td-pad"><b>DOCUMENT</b></td>');
		targetHTML.push('<td class="schn-td-pad"><b>DATE TIME</b></td>');		

		for (var i=0;i<doc_length;i++) {			
			var docObj = record.DOC[i];			
			targetHTML.push(
				"<tr class='docRow'>",
					"<td class='schn-td-pad'>",docObj.MRN,"</td>");
					targetHTML.push('<td><a class="schn-link" title="Click to Open Patient Chart" href="#" onclick="javascript:schn.openChart(' + docObj.PID + ', ' + docObj.EID + ', ' + docObj.EVENT_ID +')">' + docObj.NAME + '</a></td>');										
					if(docObj.EVENT_ID > 0)
					{   //CALL FUNCTION TO OPEN CLINICAL NOTES							
						targetHTML.push('<td><a class="schn-link" title="Click to Open Saved Document" href="#" onclick="javascript:schn.modifyDynDoc(' + docObj.PID + ', ' + docObj.EID + ', ' + docObj.EVENT_ID +')">' + docObj.DOC_NAME + '</a></td>');										
					}
					else //CALL FUNCTION TO OPEN POWERFORM
					{   								
						var paramStr = docObj.PID + "|" + docObj.EID + "|0|" + docObj.FORM_ID + "|0|"; 
						targetHTML.push(    
							"<td title='Click to Open Saved Form: ", "'>",  
							"<a class='schn-link' href=\"javascript:MPAGES_EVENT('POWERFORM', '",paramStr,"')\">", docObj.DOC_NAME,"</a></td>");
					}		

					targetHTML.push("<td class='schn-td-pad'>",docObj.DOC_DTTM,"</td>");			
		}; 
		
		// Close the table		 
		targetHTML.push("</table>");	
		target.innerHTML = targetHTML.join("");	
					
		 //  This will do alternate row shading with jquery
         $('tr.docRow:odd').addClass('odd_row');

		//this may or may not be needed trouble shoot only
		//component.addEventHandlers();
		//$(".opendoc").css("border","3px solid red");
 
	} //display no record message 
	
	else 
	{
		targetHTML.push('<div class="content-body schn-main-component res-none">');
		//set the title text if needed (uncomment and update if needed)
		component.setProperty("headerTitle", "No Saved Documents - " + record.USER+"("+doc_length+")" );
	}	
	targetHTML.push('</div>');		
};
// end schn.documents 024<-



/********************************************************************************
//OneView Communication component
/********************************************************************************/

/* Put name of component here */
MPage.namespace("schn.oneview_connect");
schn.oneview_connect = function(){};

schn.oneview_connect.prototype = new MPage.Component();
schn.oneview_connect.prototype.constructor = MPage.Component;
schn.oneview_connect.prototype.base = MPage.Component.prototype;
schn.oneview_connect.prototype.name = "schn.oneview_connect";
schn.oneview_connect.prototype.cclProgram = "707_mp_oneview_connect";
schn.oneview_connect.prototype.cclParams = [];
schn.oneview_connect.prototype.cclDataType = "JSON"; //possible values=> JSON, TEXT, XML

schn.oneview_connect.prototype.init = function(options) {
	//code to perform before immediately rendering (usually updating params is needed)
	var component = this;
	component.cclParams.push("MINE");
	//CAN USE ANY OR ALL OF THE FOLLOWING IN ORDER AS NEEDED:
	component.cclParams.push(this.getProperty("personId"));
	component.cclParams.push(this.getProperty("encounterId"));
	component.cclParams.push(this.getProperty("userId"));
	//component.cclParams.push(this.getProperty("PPRCode"));
	//component.cclParams.push(this.getProperty("positionCd"));
};

schn.oneview_connect.prototype.addEventHandlers = function() {
	var component = this;
	var compId = component.getComponentUid();
	var target = component.getTarget();
	
	$("#"+compId+" .classOfElementWithinComponent").click(function(){
		//some stuff to do when clicked
	});
};

schn.oneview_connect.prototype.getSubHeader = function( str ) {
	//note that inline styles could be put in their own class and put as a second class for the div
	return ["<div class='sub-title-disp' style='margin:-6px -6px 6px -6px;border-left:none;border-right:none;'>",str,"</div>"].join("");
};

schn.oneview_connect.prototype.render = function() {
	var component = this;
	var compId = component.getComponentUid();
	var target = component.getTarget();
	var record = component.data.ONEVIEW;
	var oneviews = record.ONEVIEWS;
	/*var enc = record.ENC;
	var user = record.USER;*/
	var pid = oneviews[0].PATIENTID;
	var eid = oneviews[0].ENCID;
	/*var uid = user[0].USER_ID;*/
	var targetHTML = [];
	//set and create subheader (uncomment and update if needed)
	//targetHTML.push(component.getSubHeader("Selected Visit"));
	
	//set the title text if needed (uncomment and update if needed)
	//component.setProperty("headerTitle", "New Title");
	
	//set the subtitle text next to header if needed (uncomment and update if needed)
	//component.setProperty("headerSubTitle","(10)");
	
	//set the component to collapsed (false)/expanded (true) if needed (uncomment and update if needed)
	//component.setProperty("headerShowHideState",true);
	
	//do something here with the targetHTML (component.data will have data type defined by this.cclDataType)
	targetHTML.push('<div class="content-body schn-main-component-large">');
	
	
	var oneview_url = 'EmployeeID=' + oneviews[0].EMPLOYEEID + '&StaffFirstName=' + oneviews[0].STAFFFIRSTNAME + '&StaffLastName=' + oneviews[0].STAFFLASTNAME + '&StaffDesignation=' + oneviews[0].STAFFDESIGNATION + '&StaffUsername=' + oneviews[0].STAFFUSERNAME + '&MRN=' + oneviews[0].MRN + '&FacilityID=' + oneviews[0].FACILITYID;
	targetHTML.push('<p>URL: ' + oneview_url + '</p>');
	
	targetHTML.push('<section><p>Is this communication reportable under Activity Based Funding? You can chart your statistics for ABF here: ');
	targetHTML.push('<a class="schn-link" href="javascript:schn.openPowerform(' + pid +', ' + eid + ', 31061529.00, 0.0, 0);">Outpatient Statistics</a>');
	targetHTML.push('</p></section>');
	targetHTML.push('<div id="oneview_iframe"><iframe id="oneview_app" src="http://mgt-test01.ov.schn.health.nsw.gov.au/Oneview.ClinicalCommunicationsComponent.Web_deploy/?' + oneview_url + '" width="100%"></iframe>');
	
	
	
	targetHTML.push('</div>');  //close content-body
	target.innerHTML = targetHTML.join("");
	
	//this may or may not be needed
	//component.addEventHandlers();
};



/* ----------------------------------------------------------------------------------

SCHN PROVIDER CONTACTS COMPONENT (Tony's component)

------------------------------------------------------------------------------------*/


/* Put name of component here */
MPage.namespace("schn.provcontacts");
schn.provcontacts = function(){};

schn.provcontacts.prototype = new MPage.Component();
schn.provcontacts.prototype.constructor = MPage.Component;
schn.provcontacts.prototype.base = MPage.Component.prototype;
schn.provcontacts.prototype.name = "schn.provcontacts";
schn.provcontacts.prototype.cclProgram = "707_mp_provider_contacts";
schn.provcontacts.prototype.cclParams = [];
schn.provcontacts.prototype.cclDataType = "JSON"; //possible values=> JSON, TEXT, XML

schn.provcontacts.prototype.init = function(options) {
	//code to perform before immediately rendering (usually updating params is needed)
	var component = this;
	component.cclParams.push("MINE");
	//CAN USE ANY OR ALL OF THE FOLLOWING IN ORDER AS NEEDED:
	component.cclParams.push(this.getProperty("personId"));
	component.cclParams.push(this.getProperty("encounterId"));
	//component.cclParams.push(this.getProperty("userId"));
	//component.cclParams.push(this.getProperty("PPRCode"));
	//component.cclParams.push(this.getProperty("positionCd"));
};

schn.provcontacts.prototype.addEventHandlers = function() {
	var component = this;
	var compId = component.getComponentUid();
	var target = component.getTarget();
	
	//$("#"+compId+" .classOfElementWithinComponent").click(function(){
		//some stuff to do when clicked
	//});
	$("#" + compId + " .sub-sec-hd").click(function () {
		$(this).parent().toggleClass("closed");
	});
};

schn.provcontacts.prototype.getSubHeader = function( str ) {
	//note that inline styles could be put in their own class and put as a second class for the div
	return ["<div class='sub-title-disp' style='margin:-6px -6px 6px -6px;border-left:none;border-right:none;'>",str,"</div>"].join("");
};

schn.provcontacts.prototype.render = function() {
	var component = this;
	var compId = component.getComponentUid();
	var target = component.getTarget();
	var record = component.data.PROVIDERS;
	var provs = record.PROVIDER;
	var provs_length = provs.length;
	var targetHTML = [];
	//set and create subheader (uncomment and update if needed)
	targetHTML.push(component.getSubHeader("Providers for specific encounters may vary"));
	
	//set the title text if needed (uncomment and update if needed)
	//component.setProperty("headerTitle", "New Title");
	
	//set the subtitle text next to header if needed (uncomment and update if needed)
	//component.setProperty("headerSubTitle","(10)");
	
	//set the component to collapsed (false)/expanded (true) if needed (uncomment and update if needed)
	//component.setProperty("headerShowHideState",true);
	
	//do something here with the targetHTML (component.data will have data type defined by this.cclDataType)
	
	//check if there are no providers at all (eg reg encounter, or non-inpatient/outpatient encounters
	var providers_exist = 0;
	for (var j=0; j<provs_length;j++){
		if (provs[j].PROV_TYPE_CD > 0){
			providers_exist = 1;
		}
	}	
	
	if (providers_exist == 1){
		targetHTML.push('<div class="content-body schn-main-component">');
		for (var i=0; i<provs_length;i++){
			if (provs[i].PROV_TYPE_CD != 0){
				targetHTML.push('<div class="sub-sec"><h3 class="sub-sec-hd"><span class="sub-sec-hd-tgl">-</span><span class="sub-sec-title">' + provs[i].PROV_TYPE + '</span></h3>');
				targetHTML.push('<div class="sub-sec-content">');
				targetHTML.push('<table class="schn-table-border"><tbody>');
				//targetHTML.push('<tr><td colspan="2"><h6 class="schn-h6-header">' + provs[i].FNAME + ' ' + provs[i].LNAME + '</h6></td></tr>');
				targetHTML.push('<tr><td colspan="2"><h6 class="sub-title-disp"><b>' + provs[i].FNAME + ' ' + provs[i].LNAME + '</b></h6></td></tr>');
				//targetHTML.push('<tr><td colspan="2"><h6 class="cv-ClassFilterLabel">' + provs[i].FNAME + ' ' + provs[i].LNAME + '</h6></td></tr>');
			
				if (provs[i].UPDT_DT_TM){
					targetHTML.push('<tr><td class="schn-label-cell schn-cell-border">Last updated:</td><td class="schn-standard-cell schn-cell-border"> ' + provs[i].UPDT_DT_TM + '</td></tr>');
				}
			
			
				if (provs[i].PROVIDER_NUM){
					targetHTML.push('<tr><td class="schn-label-cell schn-cell-border">Provider Number:</td><td class="schn-standard-cell schn-cell-border">' + provs[i].PROVIDER_NUM + '</td></tr>');
				}

				if (provs[i].STREET_ADDR){
					targetHTML.push('<tr><td class="schn-label-cell schn-cell-border">Mailing Address:</td><td class="schn-standard-cell schn-cell-border">' + provs[i].STREET_ADDR);
				}
				if (provs[i].STREET_ADDR2){
					targetHTML.push('</br>' + provs[i].STREET_ADDR2);
				}
				if (provs[i].STREET_ADDR3){
					targetHTML.push('<br />' + provs[i].STREET_ADDR3);
				}
				if (provs[i].STREET_ADDR4){
					targetHTML.push('<br />' + provs[i].STREET_ADDR4);
				}
				if (provs[i].CITY){
					targetHTML.push('<br />' + provs[i].CITY);
				}
				if (provs[i].STATE){
					targetHTML.push(' ' + provs[i].STATE);
				}	
				if (provs[i].PCODE){
					targetHTML.push(' ' + provs[i].PCODE);
				}
				targetHTML.push('</td></tr>');
		
				if (provs[i].BUS_PH){
					targetHTML.push('<tr><td class="schn-label-cell schn-cell-border">Business Phone:</td><td class="schn-standard-cell schn-cell-border">' + provs[i].BUS_PH + '</td></tr>');
				}
				if (provs[i].EMAIL){
					targetHTML.push('<tr><td class="schn-label-cell schn-cell-border">Business Email:</td><td class="schn-standard-cell schn-cell-border">' + provs[i].EMAIL + '</td></tr>');
				}
				targetHTML.push('</tbody></table></div></div>');
			}
		}
		//close main component
		targetHTML.push('</div>');
	} else {
		//there are no providers
		targetHTML.push("<div class='sub-sec-content'><span class='res-none'>No providers currently registered for this patient.</span></div>");
	}

	target.innerHTML = targetHTML.join("");
	
	
	//this may or may not be needed
	component.addEventHandlers();
};






/* ----------------------------------------------------------------------------------

SCHN PATIENT DEMOGRAPHICS COMPONENT - LAXMI's MPAGE COMPONENT
------------------------------------------------------------------------------------*/
/* Put name of component here */
MPage.namespace("schn.patientdemo");
schn.patientdemo = function(){};

schn.patientdemo.prototype = new MPage.Component();
schn.patientdemo.prototype.constructor = MPage.Component;
schn.patientdemo.prototype.base = MPage.Component.prototype;
schn.patientdemo.prototype.name = "schn.patientdemo";
schn.patientdemo.prototype.cclProgram = "707_mp_patient_demo";
schn.patientdemo.prototype.cclParams = [];
schn.patientdemo.prototype.cclDataType = "JSON"; //possible values=> JSON, TEXT, XML
//options to be setup in bedrock for each custom component
/*schn.patientdemo.option_single_col = {
	"display_col" : "S"
	};
schn.patientdemo.option_multiple_col = {
	"display_col" : "M"
	};
*/
schn.patientdemo.prototype.init = function(options) {
	//code to perform before immediately rendering (usually updating params is needed)
	var component = this;
	component.cclParams.push("MINE");
	//CAN USE ANY OR ALL OF THE FOLLOWING IN ORDER AS NEEDED:
//	component.cclParams.push(this.getProperty("personId"));
	component.cclParams.push(this.getProperty("encounterId"));
	//component.cclParams.push(this.getProperty("userId"));
	//component.cclParams.push(this.getProperty("PPRCode"));
	//component.cclParams.push(this.getProperty("positionCd"));
};
//This addEventHandler function is for the collapsible purpose
schn.patientdemo.prototype.addEventHandlers = function() {
	var component = this;
	var compId = component.getComponentUid();
	var target = component.getTarget();
	//some stuff to do when clicked which is to collapse the tabs
	$("#" + compId + " .sub-sec-hd").click(function () {
	$(this).parent().toggleClass("closed");
	});
	
	// hover data for the last visits if exists
	var patdemo_visits = $("#"+compId+" .patdemo-hvr");	
	var classOfHover = 'nswsbb-hover-highlight';
	var patdemoNum = patdemo_visits.length;
	for (var i = 0; i < patdemoNum; i++) {
		var previousvisit = patdemo_visits.eq(i);
		previousvisit.hover(function () {
			$(this).addClass(classOfHover);
		},
			function () {
			$(this).removeClass(classOfHover);
		});
	var tooltipObj = ["<div class='nswsbb-hvr'><dl class='nswsbb-pl-det'><dt><span>Reg Date | Encounter Type | Location | Discharge Date | ",
	"</span></dl></dt><dd class='nswsbb-pl-det-name'><dt><span>",
	previousvisit.attr("RegDate1"),previousvisit.attr("EncounterType1"), previousvisit.attr("Location1"),previousvisit.attr("DischargeDate1"),previousvisit.attr("DischargeSum1"),
	,"</span></dt><dt><span>",
	previousvisit.attr("RegDate2"),previousvisit.attr("EncounterType2"), previousvisit.attr("Location2"),previousvisit.attr("DischargeDate2"),previousvisit.attr("DischargeSum2"),
	,"</span></dt><dt><span>",
	previousvisit.attr("RegDate3"),previousvisit.attr("EncounterType3"), previousvisit.attr("Location3"),previousvisit.attr("DischargeDate3"),previousvisit.attr("DischargeSum3"),
	,"</span></dt><dt><span>",
	previousvisit.attr("RegDate4"),previousvisit.attr("EncounterType4"), previousvisit.attr("Location4"),previousvisit.attr("DischargeDate4"),previousvisit.attr("DischargeSum4"),
	,"</span></dt><dt><span>",
	previousvisit.attr("RegDate5"),previousvisit.attr("EncounterType5"), previousvisit.attr("Location5"),previousvisit.attr("DischargeDate5"),previousvisit.attr("DischargeSum5"),
	,"</span></dt></dd></div>"];
		//"<a class=\"schn-link\" href=\"javascript:schn.openDocumentViewer(", previousvisit.attr("DischargeSum1") Summary "></a>",   
		//'<a class="schn-link" href="javascript:schn.openPowerform('previousvisit.attr("DischargeSum1")'></a>',
		
	previousvisit.qtip({
			content : {
				text : $(tooltipObj.join("")).addClass(classOfHover)
			},
			position : {
				viewport : $(window),
				target : 'mouse',
				adjust : {
					y : 21,
					x : 40,
					method : 'shift shift'
				}
			},
			style : {
				def : false,
				classes : 'nswsbb-hover',
				width : "500px"
			}
		});
	}
	
};

schn.patientdemo.prototype.getSubHeader = function( str ) {
	//note that inline styles could be put in their own class and put as a second class for the div
	return ["<div class='sub-title-disp' style='margin:-6px -6px 6px -6px;border-left:none;border-right:none;'>",str,"</div>"].join("");
};

schn.patientdemo.prototype.render = function() {
	var component = this;
	var compId = component.getComponentUid();
	var target = component.getTarget();
	var record = component.data.PAT;
	var patrecord = record.QUAL;
	var patrecord_length = patrecord.length;
	var targetHTML = [];
	var wait = record.QUAL;
	var wait_length = wait.length;
	var total_alerts = 0;
	//f (patrecord[0].ENCID[0].ENCID.length > 1)	
	//if (patrecord[0].ENCID[0].prev_encntrid.length > 0) {
	//total_alerts = total_alerts + 1;
//	}
	var personid_cnt = 0;
	for (var j=0; j<patrecord_length;j++){
		if (patrecord[j].PERSON_ID > 0){
			personid_cnt = 1;
		}
	}	
////print in one line -> targetHTML.push('<tr><td colspan="2"><h6 class="schn-h6-header-nobold"> <b> DOB: </b>' + patrecord[i].DOB + '<b> Age: </b>' + patrecord[i].AGE + ' <b> Gender: </b>' + patrecord[i].GENDER + '</h6></td></tr>');
	
	//if (personid_cnt == 1){
			if(patrecord_length > 0) {
		//targetHTML.push('<div id="schn_main-content" class="schn-main-component">');
		targetHTML.push('<div class="content-body schn-main-component">');
	for (var i=0; i<patrecord_length;i++){
		targetHTML.push('<div><h5 class="schn-h5-header"><b>' + patrecord[i].NAME +'</b></h5>');
		
		/*targetHTML.push('<tr><td colspan="2"><h3 class="sub-title-disp"><b>'+ patrecord[i].NAME + '</b></h3></td></tr>');	
		targetHTML.push('<div class="sub-sec"><h3 class="sub-sec-hd"><span class="sub-sec-hd-tgl">-</span><span class="sub-sec-title"><b>Patient Info</b></span></h3>');
		targetHTML.push('<div class="sub-sec"><div class="sub-sec-content">');
		targetHTML.push('<table class="schn-table-border"><tbody>');*/

//  ******Patient Info******
	targetHTML.push('<div class="sub-sec"><h3 class="sub-sec-hd"><span class="sub-sec-hd-tgl">-</span><span class="sub-sec-title"><b>Patient Info </b></span></h3>');
	targetHTML.push('<div class="sub-sec-content">');
	targetHTML.push('<table class="schn-table-border"><tbody>');
if (patrecord[i].DOB.trim() > ""){
	targetHTML.push('<tr><td class="schn-label-cell schn-cell-border">DOB: </td><td class="schn-standard-cell schn-cell-border">'+ patrecord[i].DOB); 
}
if (patrecord[i].AGE.trim() > ""){
	targetHTML.push('<tr><td class="schn-label-cell schn-cell-border">Age: </td><td class="schn-standard-cell schn-cell-border">'+ patrecord[i].AGE); 
}
if (patrecord[i].GENDER.trim() > ""){	
	targetHTML.push('<tr><td class="schn-label-cell schn-cell-border">Gender: </td><td class="schn-standard-cell schn-cell-border">'+ patrecord[i].GENDER); 
}
if (patrecord[i].MEDICARE.trim() > ""){	
	targetHTML.push('<tr><td class="schn-label-cell schn-cell-border">Medicare: </td><td class="schn-standard-cell schn-cell-border">'+ patrecord[i].MEDICARE); 
}
if (patrecord[i].RACE.trim() > ""){	
	targetHTML.push('<tr><td class="schn-label-cell schn-cell-border">Aboriginality: </td><td class="schn-standard-cell schn-cell-border">'+ patrecord[i].RACE); 
}	
if (patrecord[i].INTER_REQ.trim() > ""){
	targetHTML.push('<tr><td class="schn-label-cell schn-cell-border">Interpreter Required: </td><td class="schn-standard-cell schn-cell-border">'+ patrecord[i].INTER_REQ); 
}
if (patrecord[i].INTER_TYPE.trim() > ""){
targetHTML.push('<tr><td class="schn-label-cell schn-cell-border">Interpreter Type: </td><td class="schn-standard-cell schn-cell-border">'+ patrecord[i].INTER_TYPE); 
}	
if (patrecord[i].LANG.trim() > ""){	
	targetHTML.push('<tr><td class="schn-label-cell schn-cell-border">Preferred language: </td><td class="schn-standard-cell schn-cell-border">' + patrecord[i].LANG); 
}
if (patrecord[i].RELIGION.trim() > ""){
	targetHTML.push('<tr><td class="schn-label-cell schn-cell-border">Religion: </td><td class="schn-standard-cell schn-cell-border">' + patrecord[i].RELIGION);
}
if (patrecord[i].GENETICS_TRACKNUM.trim() > ""){
	targetHTML.push('<tr><td class="schn-label-cell schn-cell-border">Genetics Track Number: </td><td class="schn-standard-cell schn-cell-border">' + patrecord[i].GENETICS_TRACKNUM);		
}
	targetHTML.push('</tbody></table></div></div>');
// ******Contact Info******
	    targetHTML.push('<div class="sub-sec"><h3 class="sub-sec-hd"><span class="sub-sec-hd-tgl">-</span><span class="sub-sec-title"><b>Contact Info</b></span></h3>');
	    targetHTML.push('<div class="sub-sec-content">');
	    targetHTML.push('<table class="schn-table-border"><tbody>');
if (patrecord[i].HOME_PH.trim() > ""){		
		targetHTML.push('<tr><td class="schn-label-cell schn-cell-border">Home Phone: </td><td class="schn-standard-cell schn-cell-border">' + patrecord[i].HOME_PH); 
}	
if (patrecord[i].MOBILE_PH.trim() > ""){	
	targetHTML.push('<tr><td class="schn-label-cell schn-cell-border">Mobile: </td><td class="schn-standard-cell schn-cell-border">' + patrecord[i].MOBILE_PH); 
}	
if (patrecord[i].EMAIL.trim() > ""){	
		targetHTML.push('<tr><td class="schn-label-cell schn-cell-border">Email: </td><td class="schn-standard-cell schn-cell-border">' + patrecord[i].EMAIL);
}
    targetHTML.push('</tbody></table></div></div>');
//******Address Info - Home Address******
	targetHTML.push('<div class="sub-sec"><h3 class="sub-sec-hd"><span class="sub-sec-hd-tgl">-</span><span class="sub-sec-title"><b>Home Address</b></span></h3>');
	targetHTML.push('<div class="sub-sec-content">');
	targetHTML.push('<table class="schn-table-border"><tbody>');
if (patrecord[i].HOMEAD_STREET_ADDR.trim() > ""){
	targetHTML.push('<tr><td class="schn-label-cell schn-cell-border">Street Address:</td><td class="schn-standard-cell schn-cell-border">' + patrecord[i].HOMEAD_STREET_ADDR);
}
if (patrecord[i].HOMEAD_CITY.trim() > ""){
	targetHTML.push('<tr><td class="schn-label-cell schn-cell-border">Suburb: </td><td class="schn-standard-cell schn-cell-border">' + patrecord[i].HOMEAD_CITY);
}
if (patrecord[i].HOMEAD_STATE.trim() > ""){
	targetHTML.push('<tr><td class="schn-label-cell schn-cell-border">State: </td><td class="schn-standard-cell schn-cell-border">' + patrecord[i].HOMEAD_STATE);
}	
if (patrecord[i].HOMEAD_PCODE.trim() > ""){
	targetHTML.push('<tr><td class="schn-label-cell schn-cell-border">Postcode: </td><td class="schn-standard-cell schn-cell-border">' + patrecord[i].HOMEAD_PCODE);
}	
	targetHTML.push('</tbody></table></div></div>');
//******Address Info - Mailing Address******
	targetHTML.push('<div class="sub-sec"><h3 class="sub-sec-hd"><span class="sub-sec-hd-tgl">-</span><span class="sub-sec-title"><b>Mailing Address</b></span></h3>');
	targetHTML.push('<div class="sub-sec-content">');
	targetHTML.push('<table class="schn-table-border"><tbody>');
if (patrecord[i].STREET_ADDR.trim() > ""){
	targetHTML.push('<tr><td class="schn-label-cell schn-cell-border">Street Address:</td><td class="schn-standard-cell schn-cell-border">' + patrecord[i].STREET_ADDR);
}
if (patrecord[i].CITY.trim() > ""){
	targetHTML.push('<tr><td class="schn-label-cell schn-cell-border">Suburb: </td><td class="schn-standard-cell schn-cell-border">' + patrecord[i].CITY);
}
if (patrecord[i].STATE.trim() > ""){
	targetHTML.push('<tr><td class="schn-label-cell schn-cell-border">State: </td><td class="schn-standard-cell schn-cell-border">' + patrecord[i].STATE);
}	
if (patrecord[i].PCODE.trim() > ""){
	targetHTML.push('<tr><td class="schn-label-cell schn-cell-border">Postcode: </td><td class="schn-standard-cell schn-cell-border">' + patrecord[i].PCODE);
}	
	targetHTML.push('</tbody></table></div></div>');
// ***** Encounter Info******
	targetHTML.push('<div class="sub-sec"><h3 class="sub-sec-hd"><span class="sub-sec-hd-tgl">-</span><span class="sub-sec-title"><b>Encounter Info </b>' + patrecord[i].CURRENT_ENC + '</span></h3>');
    targetHTML.push('<div class="sub-sec-content">');
    targetHTML.push('<table class="schn-table-border"><tbody>');		
if (patrecord[i].ATTEND_DR.trim() > ""){
	targetHTML.push('<tr><td class="schn-label-cell schn-cell-border">Attending Dr: </td><td class="schn-standard-cell schn-cell-border">'+ patrecord[i].ATTEND_DR); 
}
if (patrecord[i].ADMIT_DR.trim() > ""){
	targetHTML.push('<tr><td class="schn-label-cell schn-cell-border">Admitting Dr: </td><td class="schn-standard-cell schn-cell-border">' + patrecord[i].ADMIT_DR); 
}
if (patrecord[i].SPECIALTY.trim() > ""){		
    targetHTML.push('<tr><td class="schn-label-cell schn-cell-border">Specialty: </td><td class="schn-standard-cell schn-cell-border">'+ patrecord[i].SPECIALTY); 
}
if (patrecord[i].REASON_VISIT.trim() > ""){
	targetHTML.push('<tr><td class="schn-label-cell schn-cell-border">Reason for Visit: </td><td class="schn-standard-cell schn-cell-border">' + patrecord[i].REASON_VISIT); 
}
if (patrecord[i].DIET.trim() > ""){
	targetHTML.push('<tr><td class="schn-label-cell schn-cell-border">Current Diet: </td><td class="schn-standard-cell schn-cell-border">' + patrecord[i].DIET); 	
} 
if (patrecord[i].EDD.trim() > ""){
	targetHTML.push('<tr><td class="schn-label-cell schn-cell-border">Expected Discharge Date: </td><td class="schn-standard-cell schn-cell-border">' + patrecord[i].EDD); 	
} if (patrecord[i].DDATE.trim() > "" ){
//if (patrecord[i].DDATE == null || patrecord[i].DDATECNVT == ''){
	targetHTML.push('<tr><td class="schn-label-cell schn-cell-border">Deceased Date: </td><td class="schn-standard-cell schn-cell-border">' + patrecord[i].DDATE); 	
} 

	//targetHTML.push('<tr class="patdemo-hvr"><td class="schn-label-cell schn-cell-border">Last Visit: </td><td class="schn-standard-cell schn-cell-border">'+ patrecord[i].LAST_VISIT);  
//for (m=0; m<wait_length ;m++){
//for (i=0;i < patrecord[0].ENCID.length; i++){
//for (m=0;m < patrecord[0].ENCID.length; m++){
						//if (patrecord[0].ENCID[0].PREV_ENCNTRID > 0){
						//   prev_encid_cnt =1;}
	                   	//"<a class='schn-link' href='javascript:schn.openDocumentViewer(" + patrecord[0].PERSON_ID + ", " + patrecord[0].ENCID[m].DISUM_EVENT_ID + ");
						//	if(wait[i].ENCID[0].DISUM_EVENT_ID > 0) {
						//	'DischargeSum= "',patrecord[0].ENCID[m].DISUM_EVENT_ID,'"', 
						//	"<a class='schn-link' href='javascript:schn.openDocumentViewer(" + patrecord[0].ENCID[1].DISUM_EVENT_ID  + ");'>"Summary'</a>'
						//  '<a class="schn-link" href="javascript:schn.openDocumentViewer(' + patrecord[0].ENCID[1].DISUM_EVENT_ID + ');">Summary</a>',
						//	'DischargeSum1="',patrecord[0].ENCID[1].DISUM_EVENT_ID,'"',
						//  'DischargeSum1= "','<a class="schn-link" href="javascript:schn.openDocumentViewer(' + patrecord[0].ENCID[1].DISUM_EVENT_ID + ');">Summary</a>','"',
						//  'DischargeSum1="','<a class="schn-link" href="javascript:schn.openPowerform(' + patrecord[0].ENCID[1].DISUM_EVENT_ID +');">Summary</a>',
						//   patrecord[0].ENCID[1].DISUM_EVENT_ID,'"',
						//}
						//var personid_cnt = 0;
	//for (m=0;m < patrecord[0].ENCID.length; m++){
		//if (patrecord[j].PERSON_ID > 0){
		//	personid_cnt = 1;
		//}
	//}	
if (patrecord[i].LAST_VISIT_DATE <= 0 ){
	targetHTML.push('<tr><td class="schn-label-cell schn-cell-border">Last Visit: </td><td class="schn-standard-cell schn-cell-border"> No previous visits are found' ); 	
} 	
if (patrecord[i].LAST_VISIT.trim() > ""){
		if (patrecord[i].PREV_VISITONE.trim() > ""){
	        targetHTML.push('<tr class="patdemo-hvr" ',	
			'RegDate1="',patrecord[i].PREV_VISITONE, "",'"'
		    );
		}	
		if (patrecord[i].PREV_VISITTWO.trim() > ""){
			targetHTML.push('<tr class="patdemo-hvr" ',	
			'RegDate2="',patrecord[i].PREV_VISITTWO, "",'"'
			);
		}
		if (patrecord[i].PREV_VISITTHREE.trim() > ""){	
			targetHTML.push('<tr class="patdemo-hvr" ',	
			'RegDate3="',patrecord[i].PREV_VISITTHREE, "",'"'
			);
		}
		if (patrecord[i].PREV_VISITFOUR.trim() > ""){	
			targetHTML.push('<tr class="patdemo-hvr" ',	
			'RegDate4="',patrecord[i].PREV_VISITFOUR, "",'"'
			);
		}
		if (patrecord[i].PREV_VISITFIVE.trim() > ""){	
			targetHTML.push('<tr class="patdemo-hvr" ',	
			'RegDate5="',patrecord[i].PREV_VISITFIVE, "",'"'
			);
		}	
		
	targetHTML.push('><td class="schn-label-cell schn-cell-border">Last Visit: </td><td class="schn-standard-cell schn-cell-border">'+ patrecord[i].LAST_VISIT);
//	} else {
//	targetHTML.push('<td class="schn-label-cell schn-cell-border">Last Visit: </td><td class="schn-standard-cell schn-cell-border" No previous visits found>');
}

	//} //endif
	// if (patrecord[i].TOTAL_LASTVISITS > 0) {
	     //   targetHTML.push('<tr class="patdemo-hvr" ',	
		//	'RegDate1="',patrecord[i].PREV_VISITONE, ""," , ",'"'
		//	'RegDate1="',patrecord[0].ENCID[0].PREV_REGDT," , ",'"',
		//	'EncounterType1="',patrecord[0].ENCID[0].PREV_ENCNTR_TYPE," , ",'"',
		//	'Location1="',patrecord[0].ENCID[0].PREV_LOCATION ," , ",'"',
		//	'DischargeDate1="',patrecord[0].ENCID[0].PREV_DISCHDT,'"'
		  //  );
	//if (lasttwo_exist == 1){
	//if(patrecord[0].ENCID[1].PREV_ENCNTRID > 0){
	  //if (patrecord[i].TOTAL_LASTVISITS > 1) {
		//    targetHTML.push('<tr class="patdemo-hvr" ',	
	    //    'RegDate1="',patrecord[i].PREV_VISITTWO, ""," , ",'"'			
	//		'RegDate2="',patrecord[0].ENCID[1].PREV_REGDT," , ",'"',
		//	'EncounterType2="',patrecord[0].ENCID[1].PREV_ENCNTR_TYPE," , ",'"',
		//	'Location2="',patrecord[0].ENCID[1].PREV_LOCATION ," , ",'"',
		//	'DischargeDate2="',patrecord[0].ENCID[1].PREV_DISCHDT,'"'
		//);
	//} //endif
		//	if (lastthree_exist == 1){
	//if(patrecord[0].ENCID[2].PREV_ENCNTRID > 0){
	//if (patrecord[i].TOTAL_LASTVISITS > 2) {
		//targetHTML.push('<tr class="patdemo-hvr" ',							
	//	'RegDate1="',patrecord[i].PREV_VISITTHREE, ""," , ",'"'	
		//	'RegDate3="',patrecord[0].ENCID[2].PREV_REGDT," , ",'"',
    	//	'EncounterType3="',patrecord[0].ENCID[2].PREV_ENCNTR_TYPE," , ",'"',
		//	'Location3="',patrecord[0].ENCID[2].PREV_LOCATION ," , ",'"',
		//	'DischargeDate3="',patrecord[0].ENCID[2].PREV_DISCHDT,'"' 
		//);
	//} //endif
//	if (lastfour_exist == 1){//if(patrecord[0].ENCID[3].PREV_ENCNTRID > 0){
	//if (patrecord[i].TOTAL_LASTVISITS > 3) {
		//targetHTML.push('<tr class="patdemo-hvr" ',							
		// 'RegDate1="',patrecord[i].PREV_VISITFOUR, ""," , ",'"'		
		//	'RegDate4="',patrecord[0].ENCID[3].PREV_REGDT," , ",'"',
		//	'EncounterType4="',patrecord[0].ENCID[3].PREV_ENCNTR_TYPE," , ",'"',
		//	'Location4="',patrecord[0].ENCID[3].PREV_LOCATION ," , ",'"',
		//	'DischargeDate4="',patrecord[0].ENCID[3].PREV_DISCHDT,'"'
	//	);
	//}//endif			
	//	if (lastfive_exist == 1){//if(patrecord[0].ENCID[4].PREV_ENCNTRID > 0){
	//if (patrecord[i].TOTAL_LASTVISITS > 4) {
		//targetHTML.push('<tr class="patdemo-hvr" ',		
        // 'RegDate1="',patrecord[i].PREV_VISITFIVE, ""," , ",'"'				
		//	'RegDate5="',patrecord[0].ENCID[4].PREV_REGDT," , ",'"',
		//	'EncounterType5="',patrecord[0].ENCID[4].PREV_ENCNTR_TYPE," , ",'"',
		//	'Location5="',patrecord[0].ENCID[4].PREV_LOCATION ," , ",'"',
		//	'DischargeDate5="',patrecord[0].ENCID[4].PREV_DISCHDT,'"'
		//);
//} //endif								
//	if (patrecord[i].TOTAL_LASTVISITS > 5) {
	//	targetHTML.push('<tr class="patdemo-hvr" ',	
	//	'RegDate1="',patrecord[i].PREV_VISITFIVE, ""," , ",'"'		
	//	'RegDate4="',patrecord[0].ENCID[3].PREV_REGDT," , ",'"',		
	//		'RegDate5="',patrecord[0].ENCID[5].PREV_REGDT," , ",'"',
	//		'EncounterType5="',patrecord[0].ENCID[5].PREV_ENCNTR_TYPE," , ",'"',
	//		'Location5="',patrecord[0].ENCID[5].PREV_LOCATION ," , ",'"',
	//		'DischargeDate5="',patrecord[0].ENCID[5].PREV_DISCHDT,'"'
	//	);
//	} //endif								

	//} // endif totalcnt 								
	 											 		

	}
	targetHTML.push('</tbody></table></div>');
	//} // endif for providers exits
		
		//close main component
		targetHTML.push('</div>');
	} else {
		//there is no patient info
		targetHTML.push('<p>No qualified data for this patient</p>');
	}

	target.innerHTML = targetHTML.join("");
	//This is for the collapsible - addEventHandlers
	component.addEventHandlers();
	//hover tooltip
	$("#" + compId + " .hvrData").tooltip({
		"track" : true,
		"delay" : 150,
		"fade" : 150
	});
	

};
/*	,'RegDate3="',patrecord[0].ENCID[2].PREV_REGDT," , ",'"'
							'EncounterType3="',patrecord[0].ENCID[2].PREV_ENCNTR_TYPE," , ",'"',
							'Location3="',patrecord[0].ENCID[2].PREV_LOCATION ," , ",'"',
							'DischargeDate3="',patrecord[0].ENCID[2].PREV_DISCHDT,'"',
						//	'DischargeSum3= "',patrecord[0].ENCID[3].DISUM_EVENT_ID,'"',
							
							'RegDate4="',patrecord[0].ENCID[3].PREV_REGDT," , ",'"',
							'EncounterType4="',patrecord[0].ENCID[3].PREV_ENCNTR_TYPE," , ",'"',
							'Location4="',patrecord[0].ENCID[3].PREV_LOCATION ," , ",'"',
							'DischargeDate4="',patrecord[0].ENCID[3].PREV_DISCHDT,'"',
							//'DischargeSum4= "',patrecord[0].ENCID[4].DISUM_EVENT_ID,'"',
							
							'RegDate5="',patrecord[0].ENCID[4].PREV_REGDT," , ",'"',
							'EncounterType5="',patrecord[0].ENCID[4].PREV_ENCNTR_TYPE," , ",'"',
							'Location5="',patrecord[0].ENCID[4].PREV_LOCATION ," , ",'"',
							'DischargeDate5="',patrecord[0].ENCID[4].PREV_DISCHDT,'"'
							//'DischargeSum5= "',patrecord[0].ENCID[5].DISUM_EVENT_ID,'"'
							*/
							//); 			
/* ----------------------------------------------------------------------------------
SCHN PATIENT CONTACTS COMPONENT - COMPONENT FOR NOK DETAILS - LAXMI's Component
------------------------------------------------------------------------------------*/
/*Put name of component here*/ 
MPage.namespace("schn.patientcontacts");
schn.patientcontacts = function(){};

schn.patientcontacts.prototype = new MPage.Component();
schn.patientcontacts.prototype.constructor = MPage.Component;
schn.patientcontacts.prototype.base = MPage.Component.prototype;
schn.patientcontacts.prototype.name = "schn.patientcontacts";
schn.patientcontacts.prototype.cclProgram = "707_mp_patient_contacts";
schn.patientcontacts.prototype.cclParams = [];
schn.patientcontacts.prototype.cclDataType = "JSON"; //possible values=> JSON, TEXT, XML

schn.patientcontacts.prototype.init = function(options) {
	//code to perform before immediately rendering (usually updating params is needed)
	var component = this;
	component.cclParams.push("MINE");
	//CAN USE ANY OR ALL OF THE FOLLOWING IN ORDER AS NEEDED:
	//component.cclParams.push(this.getProperty("personId"));
	component.cclParams.push(this.getProperty("encounterId"));
	//component.cclParams.push(this.getProperty("userId"));
	//component.cclParams.push(this.getProperty("PPRCode"));
	//component.cclParams.push(this.getProperty("positionCd"));
};
    //This addEventHandler function is for the collapsible purpose
	schn.patientcontacts.prototype.addEventHandlers = function() {
	var component = this;
	var compId = component.getComponentUid();
	var target = component.getTarget();
	//some stuff to do when clicked
	$("#" + compId + " .sub-sec-hd").click(function () {
		$(this).parent().toggleClass("closed");
	});
};
//};

schn.patientcontacts.prototype.getSubHeader = function( str ) {
	//note that inline styles could be put in their own class and put as a second class for the div
	return ["<div class='sub-title-disp' style='margin:-6px -6px 6px -6px;border-left:none;border-right:none;'>",str,"</div>"].join("");
};

schn.patientcontacts.prototype.render = function() {
	var component = this;
	var compId = component.getComponentUid();
	var target = component.getTarget();
	var record = component.data.PAT;
	var patnokrecord = record.QUAL;
	var patnokrecord_length = patnokrecord.length;
	var targetHTML = [];
	var ptcallinstruc_exist = 0;
	for (var j=0; j<patnokrecord_length;j++){
		if (patnokrecord[j].LONG_TEXT_ID > 0){
			ptcallinstruc_exist = 1;
		}
	}	
    // Start of the table Data
	if(patnokrecord_length > 0) {
		targetHTML.push('<div class="content-body schn-main-component">');
	 if (ptcallinstruc_exist == 1){
		targetHTML.push('<div class="sub-sec"><div class="sub-sec-content">');
		targetHTML.push('<table class="schn-table-border"><tbody>');
		targetHTML.push('<tr><td class="schn-label-cell schn-cell-border"> Patient Call Instructions: </td><td class="schn-standard-cell schn-cell-border">'+ patnokrecord[1].PTCALL_INSTRUCTION + '</tr></td>'); 
		targetHTML.push('</tbody></table></div></div>');
         }	
	for (var i=0; i<patnokrecord_length;i++){
	//if (patnokrecord[i].PERSON_ID > 0){
		//targetHTML.push('<div class="sub-sec"><h3 class="sub-sec-hd"><span class="sub-sec-hd-tgl">-</span><span class="sub-sec-title">' + patnokrecord[i].NOK_TYPE + '</span></h3>');
		//	targetHTML.push('<div><h5 class="schn-h5-header"><b>' + patnokrecord[i].NOK_TYPE + '</b></h5>');
		//targetHTML.push('<div class="sub-sec-content"><table class="schn-table-border"><tbody>');
		//targetHTML.push('<div class="sub-sec"><tr><td class="schn-label-cell schn-cell-border">Street Address: </td><td class="schn-standard-cell schn-cell-border">' + patnokrecord[i].CITY + '</span></h3>');
		//targetHTML.push('<div class="sub-sec-content">');
		//targetHTML.push('<table class="schn-table-border"><tbody>');
		//targetHTML.push('<table class="schn-table-border"><tbody>');
		//targetHTML.push('<tr><div><h6 class="schn-h6-header">' + patnokrecord[i].NOK_NAME + '</h6></tr>');
	    targetHTML.push('<div class="sub-sec"><h3 class="sub-sec-hd"><span class="sub-sec-hd-tgl">-</span><span class="sub-sec-title">' + patnokrecord[i].NOK_TYPE + '</span></h3>');
	    targetHTML.push('<div class="sub-sec-content">');
	    targetHTML.push('<table class="schn-table-border"><tbody>');
	    targetHTML.push('<tr><td colspan="2"><h6 class="sub-title-disp"><b>'+ patnokrecord[i].NOK_NAME + '</b></h6></td></tr>');	
	
		if (patnokrecord[i].ST_ADDRESS)	{
		targetHTML.push('<tr><td class="schn-label-cell schn-cell-border">Street Address: </td><td class="schn-standard-cell schn-cell-border">'+ patnokrecord[i].ST_ADDRESS); 
		}
		if (patnokrecord[i].CITY)	{
		targetHTML.push('<tr><td class="schn-label-cell schn-cell-border"> Suburb: </td><td class="schn-standard-cell schn-cell-border">'+ patnokrecord[i].CITY); 
		} 
		if (patnokrecord[i].STATE)	{		
		targetHTML.push('<tr><td class="schn-label-cell schn-cell-border"> State: </td><td class="schn-standard-cell schn-cell-border">'+ patnokrecord[i].STATE); 
		} 
		if (patnokrecord[i].ZIPCODE)	{		
		targetHTML.push('<tr><td class="schn-label-cell schn-cell-border"> Postcode: </td><td class="schn-standard-cell schn-cell-border">'+ patnokrecord[i].ZIPCODE); 
		} 
		if (patnokrecord[i].HOME_PH)	{				
		targetHTML.push('<tr><td class="schn-label-cell schn-cell-border"> Home Phone: </td><td class="schn-standard-cell schn-cell-border">'+ patnokrecord[i].HOME_PH); 
		} 
		if (patnokrecord[i].HOMEPHCALL_NOTES)	{				
		targetHTML.push('<tr><td class="schn-label-cell schn-cell-border"> Call Instructions: </td><td class="schn-standard-cell schn-cell-border">' + patnokrecord[i].HOMEPHCALL_NOTES); 
		}
		if (patnokrecord[i].MOBILE_NUM)	{		
		targetHTML.push('<tr><td class="schn-label-cell schn-cell-border"> Mobile:  </td><td class="schn-standard-cell schn-cell-border">'+ patnokrecord[i].MOBILE_NUM); 
		} 
		if (patnokrecord[i].MOBILECALL_NOTES)	{				
		targetHTML.push('<tr><td class="schn-label-cell schn-cell-border"> Mobile Instructions: </td><td class="schn-standard-cell schn-cell-border">' + patnokrecord[i].MOBILECALL_NOTES); 
		}
		if (patnokrecord[i].BUSINESS_PH)	{		
		targetHTML.push('<tr><td class="schn-label-cell schn-cell-border">Business Phone:  </td><td class="schn-standard-cell schn-cell-border">'+ patnokrecord[i].BUSINESS_PH); 
		} 
		//if (patnokrecord[i].MOBILECALL_NOTES)	{				
		//targetHTML.push('<tr><td class="schn-label-cell schn-cell-border"> Mobile Instructions: </td><td class="schn-standard-cell schn-cell-border">' + patnokrecord[i].MOBILECALL_NOTES); 
	//	}
		if (patnokrecord[i].EMAIL_ADD)	{		
		targetHTML.push('<tr><td class="schn-label-cell schn-cell-border"> Email: </td><td class="schn-standard-cell schn-cell-border">'+ patnokrecord[i].EMAIL_ADD); 
		} 
		//targetHTML.push('</td></tr>');
	targetHTML.push('</tbody></table></div></div>');
		}
		//close main component
		

	//} //endif

	} else {
		targetHTML.push("<div class='sub-sec-content'><span class='res-none'>No contacts are found for this patient.</span></div>");
		//targetHTML.push("<p>No contacts are found for this patient </p>");
	targetHTML.push('</div>');
	}; //end if*/

	target.innerHTML = targetHTML.join("");
    //This is for the collapsible - addEventHandlers
	component.addEventHandlers();
};

