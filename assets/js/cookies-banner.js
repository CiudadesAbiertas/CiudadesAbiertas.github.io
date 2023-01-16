
"use strict";

/**
* Función que registra un clic en un enlace saliente en Analytics.
* Esta función toma una cadena de URL válida como argumento y la utiliza
* como la etiqueta del evento. Configurar el método de transporte como "beacon" permite que el hit se envíe
* con "navigator.sendBeacon" en el navegador que lo admita.
*/
function captureInPageLink(eventCategory, eventAction, eventLabel) {
		//ga('send', 'event', eventCategory, eventAction, eventLabel);

		gtag('event', eventCategory, {
			'eventLabel' : eventLabel
		});
}


function gtag(){dataLayer.push(arguments);}
function llamaGtag(newHash = null){

     var urlToSave = location.pathname;

     if(newHash!==null){
           urlToSave = urlToSave + '#' + newHash;
     }else{
           urlToSave = urlToSave + location.hash;
     }

    gtag('js', new Date());
    gtag('config', 'G-WVV3CGQ45M',{
           'page_location' : urlToSave
     });

}

function getDomain() {
	var subDomain = window.location.hostname;

	subDomain = subDomain.replace(/[0-9]+/,"").replace("www.","").replace("pre.","").replace("pinternet.","").replace("..",".");
	subDomain = subDomain.indexOf(".") === 0 ? subDomain : "." + subDomain;

	return subDomain;
}