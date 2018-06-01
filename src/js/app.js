/*
| ------------------------------------------------------------------------------
| # PWA: Service Worker (register)
| ------------------------------------------------------------------------------
| Adaptat de https://preview.pwabuilder.com/serviceworker
|
*/

if (navigator.serviceWorker.controller) {
  console.log('[PWA Builder] active service worker found, no need to register')
} else {
  navigator.serviceWorker.register('sw.js', {
    scope: './'
  }).then(function(reg) {
    console.log('Service worker has been registered for scope:'+ reg.scope);
  });
}

/*
| ------------------------------------------------------------------------------
| # Cookie: indexPagina
| ------------------------------------------------------------------------------
| Obtenir la URL de la pàgina en la que ens trobem i guardar-la per, desprès,
| poder gestionar quina pàgina 404 mostrar, amb l'idioma que li correspongui.
| - Mirar la pàgina 404.html de l'arrel.
|
*/

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

(function() {
  // Definir el nom de la cookie.
  // Obtenir i guardar la URL de la pàgina com a valor de la cookie.
  // Definir els dies que han de passar per a que expiri la cookie.
  var cookieName   = "indexPagina";
  var cookieValue  = window.location.href;
  var cookieExpire = 1;
  
  // Generar la cookie.
  setCookie(cookieName, cookieValue, cookieExpire);
})();