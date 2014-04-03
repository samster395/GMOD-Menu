//Style Sheet Switcher version 1.1 Oct 10th, 2006
//Author: Dynamic Drive: http://www.dynamicdrive.com
//Usage terms: http://www.dynamicdrive.com/notice.htm

window.onload=function(){
var formref=document.getElementById("switchform")
indicateSelected(formref.switchcontrol)
}

var manual_or_random="manual" //"manual" or "random"
var randomsetting="3 days" //"eachtime", "sessiononly", or "x days (replace x with desired integer)". Only applicable if mode is random.

//////No need to edit beyond here//////////////

function getCookie(Name) { 
var re=new RegExp(Name+"=[^;]+", "i"); //construct RE to search for target name/value pair
if (document.cookie.match(re)) //if cookie found
return document.cookie.match(re)[0].split("=")[1] //return its value
return null
}

function setCookie(name, value, days) {
var expireDate = new Date()
//set "expstring" to either future or past date, to set or delete cookie, respectively
var expstring=(typeof days!="undefined")? expireDate.setDate(expireDate.getDate()+parseInt(days)) : expireDate.setDate(expireDate.getDate()-5)
document.cookie = name+"="+value+"; expires="+expireDate.toGMTString()+"; path=/";
//document.cookie = 'cookie_name=' + cookie_value+ ',path=/; domain=mydomain.com';
}


function deleteCookie(name){
setCookie(name, "moot")
}


$('#picker').colpick({
	layout:'hex',
	submit:0,
	colorScheme:'dark',
	onChange:function(hsb,hex,rgb,el,bySetColor) {
		$(el).css('border-color','#'+hex);
	baseColor = "#" + hex;
//	$("#charms").css('backgroundColor', baseColor);
	$(".bg-color-blue").css('backgroundColor', baseColor);
	setCookie("GMOD-bg-color-tiles", baseColor, 60)
//		updateBaseColor(hex);
		// Fill the text box just if the color was set using the picker, and not the colpickSetColor function.
		if(!bySetColor) $(el).val(hex);
	}
}).keyup(function(){
	$(this).colpickSetColor(this.value);
});

$('#picker2').colpick({
	layout:'hex',
	submit:0,
	colorScheme:'dark',
	onChange:function(hsb,hex,rgb,el,bySetColor) {
		$(el).css('border-color','#'+hex);
	baseColor = "#" + hex;
	$("#NavBar").css('backgroundColor', baseColor);
//	$(".bg-color-blue").css('backgroundColor', baseColor);
	setCookie("GMOD-bg-color-charms", baseColor, 60)
//		updateBaseColor(hex);
		// Fill the text box just if the color was set using the picker, and not the colpickSetColor function.
		if(!bySetColor) $(el).val(hex);
	}
}).keyup(function(){
	$(this).colpickSetColor(this.value);
});



function setStylesheet(title, randomize){ //Main stylesheet switcher function. Second parameter if defined causes a random alternate stylesheet (including none) to be enabled
var i, cacheobj, altsheets=[""]
for(i=0; (cacheobj=document.getElementsByTagName("link")[i]); i++) {
if(cacheobj.getAttribute("rel").toLowerCase()=="alternate stylesheet" && cacheobj.getAttribute("title")) { //if this is an alternate stylesheet with title
cacheobj.disabled = true
altsheets.push(cacheobj) //store reference to alt stylesheets inside array
if(cacheobj.getAttribute("title") == title) //enable alternate stylesheet with title that matches parameter
cacheobj.disabled = false //enable chosen style sheet
}
}
if (typeof randomize!="undefined"){ //if second paramter is defined, randomly enable an alt style sheet (includes non)
var randomnumber=Math.floor(Math.random()*altsheets.length)
altsheets[randomnumber].disabled=false
}
return (typeof randomize!="undefined" && altsheets[randomnumber]!="")? altsheets[randomnumber].getAttribute("title") : "" //if in "random" mode, return "title" of randomly enabled alt stylesheet
}


//function setBackground(title2, randomize){ //Main stylesheet switcher function. Second parameter if defined causes a random alternate stylesheet (including none) to be enabled
//
//document.body.style.backgroundImage='url(' + title2 + ')';  
//
//}
//
////function chooseBack(backtitle, days){ //Interface function to switch style sheets plus save "title" attr of selected stylesheet to cookie
//if (document.getElementById){
//setBackground(backtitle)
//setCookie("myback", backtitle, days)
//alert(backtitle);
//}
//}

function chooseStyle(styletitle, days){ //Interface function to switch style sheets plus save "title" attr of selected stylesheet to cookie
if (document.getElementById){
setStylesheet(styletitle)
setCookie("GMOD-Menu-Theme", styletitle, days)
}
}

function themech2(theme){
window.location.reload(true);
setCookie("GMOD-Menu-Theme", theme, 60)
//$( "#result" ).load( "template/themes/metro.html" );
}

$(document).ready(function(){
function themech(theme){
//$( "#result" ).load( "template/themes/" + theme +".html" );
$( "#result" ).attr("src","'template/themes/" + theme +".html'");
//ng-include="template.url"
$( "#leaveCode" ).val(theme);
//$( "#result" ).load( "template/themes/metro.html" );
}

var selectedtitle4=getCookie("GMOD-Menu-Theme")
if (document.getElementById && selectedtitle4!=null){ //load user chosen style sheet from cookie if there is one stored
themech(selectedtitle4);
} else {
themech('metro');
}
if (selectedtitle4!='metro'){
$("#tiles").hide();
}
});
//function themech(theme){
//$( ".result" ).load( "template/themes/metro.html" );
//}

function indicateSelected(element){ //Optional function that shows which style sheet is currently selected within group of radio buttons or select menu
if (selectedtitle!=null && (element.type==undefined || element.type=="select-one")){ //if element is a radio button or select menu
var element=(element.type=="select-one") ? element.options : element
for (var i=0; i<element.length; i++){
if (element[i].value==selectedtitle){ //if match found between form element value and cookie value
if (element[i].tagName=="OPTION") //if this is a select menu
element[i].selected=true
else //else if it's a radio button
element[i].checked=true
break
}
}
}
}

if (manual_or_random=="manual"){ //IF MANUAL MODE
//var selectedtitle=getCookie("GMOD-Menu-Theme")
//if (document.getElementById && selectedtitle!=null) //load user chosen style sheet from cookie if there is one stored
//setStylesheet(selectedtitle)

var selectedtitle4=getCookie("GMOD-Menu-Theme")
if (document.getElementById && selectedtitle4!=null){ //load user chosen style sheet from cookie if there is one stored
//themech(selectedtitle4);
} else {
//themech('metro');
}
var selectedtitle2=getCookie("GMOD-bg-color-tiles")
if (document.getElementById && selectedtitle2!=null) //load user chosen style sheet from cookie if there is one stored
$(".bg-color-blue").css('backgroundColor', selectedtitle2);
$('#picker').css('border-color', selectedtitle2);
$('#picker').val(selectedtitle2);
	
var selectedtitle3=getCookie("GMOD-bg-color-charms")
if (document.getElementById && selectedtitle3!=null) //load user chosen style sheet from cookie if there is one stored
$("#NavBar").css('backgroundColor', selectedtitle3);
$('#picker2').css('border-color', selectedtitle3);
$('#picker2').val(selectedtitle3);
//alert(selectedtitle);

}

else if (manual_or_random=="random"){ //IF AUTO RANDOM MODE
if (randomsetting=="eachtime")
setStylesheet("", "random")
else if (randomsetting=="sessiononly"){ //if "sessiononly" setting
if (getCookie("mysheet_s")==null) //if "mysheet_s" session cookie is empty
document.cookie="mysheet_s="+setStylesheet("", "random")+"; path=/" //activate random alt stylesheet while remembering its "title" value
else
setStylesheet(getCookie("mysheet_s")) //just activate random alt stylesheet stored in cookie
}
else if (randomsetting.search(/^[1-9]+ days/i)!=-1){ //if "x days" setting
if (getCookie("mysheet_r")==null || parseInt(getCookie("mysheet_r_days"))!=parseInt(randomsetting)){ //if "mysheet_r" cookie is empty or admin has changed number of days to persist in "x days" variable
setCookie("mysheet_r", setStylesheet("", "random"), parseInt(randomsetting)) //activate random alt stylesheet while remembering its "title" value
setCookie("mysheet_r_days", randomsetting, parseInt(randomsetting)) //Also remember the number of days to persist per the "x days" variable
}
else
setStylesheet(getCookie("mysheet_r")) //just activate random alt stylesheet stored in cookie
} 
}