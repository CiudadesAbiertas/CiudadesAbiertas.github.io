/* JS to manage Ciudades Abiertas cookies  */

jQuery(document).ready(function() {
	//document.getElementById("cookiesInfo").style.display = "none";

	trackUserAction();

});

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


/* GA4 */
function gtag(){dataLayer.push(arguments);}
function llamaGtag(){


	var urlToSave = location.pathname + location.hash;

    gtag('js', new Date());
    gtag('config', 'G-WVV3CGQ45M',{
		//'etiqueta-pagina' : urlToSave,
		'page_location' : urlToSave
	});

}
/* FIN GA4 */

function trackUserAction(){

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

function getDomain() {
	var subDomain = window.location.hostname;

	subDomain = subDomain.replace(/[0-9]+/,"").replace("www.","").replace("pre.","").replace("pinternet.","").replace("..",".");
	subDomain = subDomain.indexOf(".") === 0 ? subDomain : "." + subDomain;

	return subDomain;
}