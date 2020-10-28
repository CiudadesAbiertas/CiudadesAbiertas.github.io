
	
jQuery(document).ready(function() {

	if (getCookie(COOKIE_ACCEPT_FULL_NAME) == 'true' || getCookie(COOKIE_ACCEPT_FULL_NAME) == 'false' || getCookie(COOKIE_REFUSE_ALL) == 'true'
		|| getCookie(COOKIE_REFUSE_ALL) == 'false' ){
		
		document.getElementById("cookiesInfo").style.display = "none";
		if ((getCookie(COOKIE_ACCEPT_FULL_NAME) == 'true') && (document.getElementById("custom-form-checkbox") != null)){
			document.getElementById("custom-form-checkbox").className = "custom-form-checkbox custom-form-checked";
		}
	}else{
		document.getElementById("cookiesInfo").style.display = "block";
	}

	trackUserAction();
	
});

"use strict";

	var MUST_SHOW_FORM_EXECUTED_COOKIE_NAME = "mustShowFormExecuted",
		COOKIE_REFUSE_ALL = "RefuseFullCookies",
        COOKIE_ACCEPT_PRIMARY_DATA = "AcceptPrimaryCookies",
        COOKIE_ACCEPT_FULL_NAME = "AcceptFullCookies",
		//duration cookie 1 year
        COOKIE_VALIDATION_DAYS = 365;


	/**
	* Función que registra un clic en un enlace saliente en Analytics.
	* Esta función toma una cadena de URL válida como argumento y la utiliza
	* como la etiqueta del evento. Configurar el método de transporte como "beacon" permite que el hit se envíe
	* con "navigator.sendBeacon" en el navegador que lo admita.
	*/
	function captureInPageLink(eventCategory, eventAction, eventLabel) {
		if(getCookie(COOKIE_ACCEPT_FULL_NAME) == 'true'){
			ga('send', 'event', eventCategory, eventAction, eventLabel);
		}
	}
	
	function changeStateConfigCookie(){
		if (document.getElementById("custom-form-checkbox").className == "custom-form-checkbox custom-form-checked"){
			document.getElementById("custom-form-checkbox").className = "custom-form-checkbox";
		}else{
			document.getElementById("custom-form-checkbox").className = "custom-form-checkbox custom-form-checked";
		}
	}
	function changeCookies() {
		
		deleteCookie(COOKIE_ACCEPT_FULL_NAME);
		deleteCookie(COOKIE_REFUSE_ALL);
			
		if (document.getElementById("custom-form-checkbox").className == "custom-form-checkbox custom-form-checked"){
			setCookie(COOKIE_ACCEPT_FULL_NAME, 'true', "", COOKIE_VALIDATION_DAYS, 1);
			setCookie(COOKIE_REFUSE_ALL, 'false', "", COOKIE_VALIDATION_DAYS, 1);
			document.getElementById("cookiesInfo").style.display = "none";
			trackUserAction();
		}else{
			setCookie(COOKIE_REFUSE_ALL, 'true', "", COOKIE_VALIDATION_DAYS, 1);
			setCookie(COOKIE_ACCEPT_FULL_NAME, 'false', "", COOKIE_VALIDATION_DAYS, 1);
			document.getElementById("cookiesInfo").style.display = "none";
		}
	}
	function acceptCookies() {
		//EN PRO
		//setCookie(COOKIE_ACCEPT_FULL_NAME, 'true', getDomain(), COOKIE_VALIDATION_DAYS, 1);
		setCookie(COOKIE_ACCEPT_FULL_NAME, 'true', "", COOKIE_VALIDATION_DAYS, 1);
		document.getElementById("cookiesInfo").style.display = "none";
		trackUserAction();
	}
	function refuseCookies() {
		//EN PRO
		//setCookie(COOKIE_ACCEPT_FULL_NAME, 'true', getDomain(), COOKIE_VALIDATION_DAYS, 1);
		setCookie(COOKIE_REFUSE_ALL, 'true', "", COOKIE_VALIDATION_DAYS, 1);
		document.getElementById("cookiesInfo").style.display = "none";
	}
	
	function trackUserAction(){
		if(getCookie(COOKIE_ACCEPT_FULL_NAME) == 'true' ){
			
			(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
			(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
			m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
			})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

			ga('create', 'UA-179393538-1', 'auto');
			
			var urlToSave = location.pathname + location.hash;
			
			//Para todos los hits. Para convertir en anónima la dirección IP de todos los hits que se envían desde un único objeto de seguimiento, usa el comando set para asignar el valor anonymizeIp al campo true de ese objeto:
			ga('set', 'anonymizeIp', true);
			ga('send', {
			  hitType: 'pageview',
			  page: urlToSave
			});
		}
		
	}

	function getDomain() {
        var subDomain = window.location.hostname;

        subDomain = subDomain.replace(/[0-9]+/,"").replace("www.","").replace("pre.","").replace("pinternet.","").replace("..",".");
        subDomain = subDomain.indexOf(".") === 0 ? subDomain : "." + subDomain;

        return subDomain;
    }
	
	function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1, c.length);
            }
            if (c.indexOf(nameEQ) == 0) {
                return c.substring(nameEQ.length,c.length);
            }
        }
        return null;
    }
	
	function setCookie(name, value, domain, expirationDays, sameSite) {
        var expires = "";
        if (expirationDays) {
            var date = new Date();
            date.setTime(date.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        var sameSiteOwn=";SameSite=Lax";
        if (sameSite) {
            sameSiteOwn = ";SameSite=" + sameSite;
        }
        document.cookie = name + "=" + (value || "") + expires + ";domain=" + domain + ";path=/;" + sameSiteOwn;
    }
	
	function deleteCookie(name) {
	  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	}
	