- [Senzill](#senzill)
- [Instal·lació](#instal-lacio)
    - [Descarregar](#descarregar)
    - [npm](#npm)
- [Execució](#execucio)
    - [Compilació](#compilacio)
- [Configuració](#configuracio)
    - [_config.yml](#configyml)
        - [Tractament de fitxers i directoris](#tractament-de-fitxers-i-directoris)
        - [URL i baseurl](#url-i-baseurl)
        - [Idiomes](#idiomes)
        - [Traduccions](#traduccions)
        - [Col·leccions (tipus de publicacions)](#col-leccions-tipus-de-publicacions)
            - [Enllaços permanents](#enllacos-permanents)
        - [Service worker](#service-worker)
        - [Termes legals](#termes-legals)
    - [_config-prod.yml](#config-prodyml)
- [Maquetació](#maquetacio)
    - [Edició](#edicio)
    - [Continguts (exemples)](#continguts-exemples)
        - [Breadcrumbs](#breadcrumbs)
        - [Idiomes](#idiomes)
        - [Loops](#loops)
            - [Publicacions + categories + etiquetes (tots els idiomes)](#publicacions-categories-etiquetes-tots-els-idiomes)
            - [Publicacions (segons l'idioma de la pàgina)](#publicacions-segons-lidioma-de-la-pagina)
            - [Publicacions (idioma definit)](#publicacions-idioma-definit)
            - [Publicacions agrupades per categories (tots els idiomes)](#publicacions-agrupades-per-categories-tots-els-idiomes)
            - [Publicacions agrupades per categories (segons l'idioma de la pàgina)](#publicacions-agrupades-per-categories-segons-lidioma-de-la-pagina)
            - [Publicacions agrupades per categories (idioma definit)](#publicacions-agrupades-per-categories-idioma-definit)
            - [Publicacions agrupades per etiquetes (totes els idiomes)](#publicacions-agrupades-per-etiquetes-totes-els-idiomes)
            - [Publicacions agrupades per etiquetes (segons l'idioma de la pàgina)](#publicacions-agrupades-per-etiquetes-segons-lidioma-de-la-pagina)
            - [Publicacions agrupades per etiquetes (idioma definit)](#publicacions-agrupades-per-etiquetes-idioma-definit)
- [Bibliografia Web](#bibliografia-web)

# Senzill

**Senzill** és un projecte, basat amb [Jekyll](https://jekyllrb.com/), destinat a facilitar el desenvolupament de llocs webs estàtics o [JAMstack](https://jamstack.org/).

# Instal·lació

## Descarregar

Podem descarregar el projecte fent-ne ús de [git](https://git-scm.com/), mitjançant la _shell_:

```
$ git clone https://github.com/rogerforner/IlercApp-Senzill.git senzill
```

Si es desitja un nom de directori diferent al del repositori (senzill):

```
$ git clone https://github.com/rogerforner/IlercApp-Senzill.git nomNou
```

## npm

Un cop descarregat hem d'executar [npm](https://www.npmjs.com/) ja que són necessaris alguns paquets

```
$ npm install
```

S'instal·laran els següents paquets (_package.json_):

```json
"devDependencies": {
    "axios": "^0.18.0",
    "moment": "^2.22.2",
    "vue": "^2.5.16"
},
"dependencies": {
    "gulp": "^4.0.0",
    "gulp-autoprefixer": "^5.0.0",
    "gulp-clean-css": "^3.9.3",
    "gulp-concat": "^2.6.1",
    "gulp-htmlmin": "^4.0.0",
    "gulp-sass": "^4.0.1",
    "gulp-shell": "^0.6.5",
    "gulp-uglify": "^3.0.0"
}
```

# Execució

Jekyll disposa de les seves pròpies comandes per dur a terme la compilació de _SASS_ i els fitxers que en componguin el projecte. Ara bé, en el nostre cas no en farem un ús directe d'aquestes, emprarem [gulp](https://gulpjs.com/).

**$ gulp**

Podem veure la configuració de gulp en el fitxer de l'arrel _gulpfile.js_.

Executant, en la _shell_, **gulp** (sense watch) compilarem la totalitat del lloc web, quedant preparat per ser "consumit".

```
$ gulp
```

**$ gulp watch**

Executant, en la _shell_, **gulp watch** també es compilarà el lloc web, però amb la diferència de que quan un fitxer sigui modificat, segons el tipus d'aquests, es durà endavant una compilació automàtica.

```
$ gulp watch
```

S'ha de tenir en compte que mitjançant la comanda **jekyll build** no s'executa cap tipus de servidor, de fet, només es compilen els fitxers que formen el nostre lloc web, sent enviats, desprès de la compilació, al directori **/_site.**

Dit això, hem de tenir present que l'execució del lloc web es durà a terme directament amb un **servidor local**, és indiferent si es tracta d'un [Laragon](https://laragon.org/) o un [XAMPP](https://www.apachefriends.org/es/index.html) o un [Wamp](http://www.wampserver.com/en/) o un [LAMP](https://es.wikipedia.org/wiki/LAMP) etc.

Tenint en compte que el directori on es compila el lloc web és /_site, la nostra URL del localhost es visualitzarà (o similar):

```
http://localhost/nomProjecte/_site/ca
http://senzill.oo/_site/ca
```

**/ca** fa referència a l'idioma, per defecte, al qual s'hagi configurat el projecte. A aquest directori s'arriba de forma automàtica, mitjançant una redirecció escrita amb JavaScript, aquesta situada al _index.html_ de /_site.

```html
<script type="text/javascript">
window.location.href = "{{- site.url | append:site.baseurl -}}/{{- site.t.default_lang -}}";
</script>
```

:bulb: **Idea**

Amb aquest fitxer es podria jugar. Per exemple, ampliant el temps d'espera abans de que es dugui a terme la redirecció, proporcionant el temps suficient com per convertir el fitxer index.html amb una pantalla d'inici de càrrega o introductoria.

- Amb un Spinner.
- Amb un vídeo.
- Etc.

## Compilació

A través de la compilació es duen a terme "dos" processos, un corresponent al **Gulp** i un altre al **Jekyll**.

**Gulp**:

- Els fitxers **SASS** són compilats a un fitxer _CSS_.
- Els fitxers **CSS** són concatenats i minificats.
- Els fitxers **JS** són concatenats i minificats.
- Els fitxers **HTML** són minificats.

**Jekyll**:

- Els fitxers **YML** són decodificats i emprats per permetre'n la correcta compilació del lloc web, aquest dividit en diversos directoris /_nomDirectori.

# Configuració

## _config.yml

Aquest és el **principal fitxer de configuració** de Jekyll, és emprat per determinar els directoris que seran inclosos, o no, en la compilació del lloc web, la URL principal d'aquest, l'idioma per defecte i els que en faran del lloc web un lloc multi idioma, també els tipus de publicacions que s'hagin d'emprar per generar contingut, entre altres apartats que poden ser ampliats segons la necessitat.

### Tractament de fitxers i directoris

> Predeterminat de Jekyll.

La variable _exclude_ és emprada per definir els fitxers i directoris que seran **exclosos** en la compilació del lloc web.

```yml
exclude:
  # SRC
  - src
  # Informació
  - LICENCE.md
  - README.md
  # Gestors de paquets
  ## Bundle
  - Gemfile
  - Gemfile.lock
  ## Node (npm)
  - node_modules
  - package.json
  - package-lock.json
  # Gulp (task runner)
  - gulpfile.js
```

### URL i baseurl

> Predeterminat de Jekyll.

Mitjançant la la variable _url_ es defineix quina és la URL principal del lloc web mentre que mitjançant la variable _baseurl_ es defineix quin és el directori (arrel) del lloc web.

És a dir, el nostre projecte es pot trobar situat en l'arrel on apunta el nostre domini:

```yml
> https://rogerforner.com

url: "https://rogerforner.com"
baseurl: ""
```

O bé es pot trobar situat en l'arrel d'un directori on apunti el nostre domini:

```yml
> https://rogerforner.com/ilercapp

url: "https://rogerforner.com"
baseurl: "ilercapp"
```

### Idiomes

> No predeterminat de Jekyll. Afegit per nosaltres.

Mitjançant l'array _langs_ es defineixen els idiomes que conformaran el lloc web.

```yml
langs:
  - "ca"
  - "es"
```

Tots els idiomes del lloc web hi seran referenciats a través de la URL, de tal manera que es visualitzaran com si es tractessin d'un directori en el mateix domini.

```
https://rogerforner.com/ca
https://rogerforner.com/es

https://rogerforner.com/ilercapp/ca
https://rogerforner.com/ilercapp/es
```

### Traduccions

> No predeterminat de Jekyll. Afegit per nosaltres.

Les traduccions ens seran útils per traduir aquell text que es mantingui estàtic en el lloc web, és a dir, que no presenti canvis de forma constant.

En l'exemple següent es pot veure la traducció de les meta etiquetes i peu de pàgina (_site_info_), també les de geolocalització (_geo_tag_) i les de _Open Graph_.

```yml
t:
  default_lang: "ca"
  ca:
    site_info:
      name: "Senzill"
      motto: "Per Roger Forner Fabre"
      description: "Senzill és un projecte, basat en Jekyll, destinat a facilitar el desenvolupament de llocs webs estàtics o JAMstack."
      locale: "ca-es"
      geo_tag:
        region: "ES-CT"
        placename: "Tortosa"
        position: "40.812578;0.521442"
        icbm: "40.812578, 0.521442"
    open_graph:
      facebook:
        app_id:
        publisher: #https://www.facebook.com/compteLLocWeb
        author: #https://www.facebook.com/compteAutorRa
        img:
      google_plus:
        publisher: #https://plus.google.com/compteLLocWeb
        author: #https://plus.google.com/compteAutorRa
        img:
      twitter:
        publisher: #@compteLlocWeb
        author: "@rogerforner" #@compteAutorRa
        img:
  es:
    site_info:
      name: "Senzill"
      motto:
      description: "Senzill es un proyecto, basado en Jekyll, destinado a facilitar el desarrollo de aplicaciones estáticas o JAMstack."
      locale: "es-es"
      geo_tag:
        region:
        placename:
        position:
        icbm:
    open_graph:
      facebook:
        app_id:
        publisher: #https://www.facebook.com/compteLLocWeb
        author: #https://www.facebook.com/compteAutorRa
        img:
      google_plus:
        publisher: #https://plus.google.com/compteLLocWeb
        author: #https://plus.google.com/compteAutorRa
        img:
      twitter:
        publisher: #@compteLlocWeb
        author: #@compteAutorRa
        img:
```

_Cada cas en pot requerir menys o més, poden ser afegides a voluntat._

Com es pot veure, les traduccions van introduïdes per l'array _t_, el qual és precedit per un seguit d'arrays. Cadascun d'aquests s'inicia amb el text que en defineix l'idioma al qual es correspondrà cada traducció, idioma establert mitjançant la variable _langs_. I també es pot veure la variable _default_lang_, la qual en defineix l'idioma per defecte, el principal, del lloc web.

```yml
t:
  default_lang: "ca"
  ca:
    ...
  es:
    ...
```

### Col·leccions (tipus de publicacions)

> Predeterminat de Jekyll.

Les col·leccions són els tipus de contingut que es generarà en el lloc web i se'n poden afegir tantes com es desitgi.

```yml
collections:
  pages:
    output: true
  posts:
    output: true
  feed:
    output: true
```

#### Enllaços permanents

Els enllaços permanents són emprats per definir les URLs dels diversos tipus de contingut que s'hagin predefinit. És una manera de garantir-ne la visibilitat de les URLs d'una forma amigable, entendible, de cara als/les nostres usuaris/àries.

Per defecte deixem la variable _permalink_ de la següent manera:

```yml
permalink: "pretty"
```

Desprès en definirem les rutes per a cadascun dels tipus de contingut que tinguem i, **molt important**, per a cadascun dels idiomes.

```yml
defaults:
  - # Pàgines
    scope:
      path: "_pages/ca"
    values:
      permalink: "/ca/:title/"
      lang: "ca"
      layout: "default"
  -
    scope:
      path: "_pages/es"
    values:
      permalink: "/es/:title/"
      lang: "es"
      layout: "default"
  - # Publicacions
    scope:
      path: "_posts/ca"
    values:
      permalink: "/ca/posts/:title/"
      lang: "ca"
      layout: "default"
  -
    scope:
      path: "_posts/es"
    values:
      permalink: "/es/posts/:title/"
      lang: "es"
      layout: "default"
  - # etc.
```

### Service worker

> No predeterminat de Jekyll. Afegit per nosaltres.

S'han declarat les variables que seran emprades per configurar el fitxer _sw.js_.

```yml
pwa:
  manifest:
    name: "Senzill"
    short_name: "Senzill"
    theme_color: "#0b1728"
    background_color: "#afc6e9"
  sw_cache:
    - "/"
    - "/assets/"
```

### Termes legals

> No predeterminat de Jekyll. Afegit per nosaltres.

S'han declarat variables que seran emprades per emplenar el _Copyright_ del peu de pàgina, també el nom del/la creador/ra del lloc web, així com per emplenar alguns espais de l'avís legal.

```yml
legal:
  owner:
    name: "Roger Forner Fabre"
    id: "DNI/NIF/..."
    domicile: "Domicili"
    email: "hello@rogerforner.com"
    domain: "rogerforner.com"
  developer:
    name: "IlercApp"
    url: "https://rogerforner.com/ilercapp"
```

## _config-prod.yml

Es tracta d'un fitxer de configuració que té exactament la mateixa funcionalitat que el fitxer _config.yml_, però amb la diferència de que en aquest hi afegiríem tota aquella configuració que **només** volem que estigui activa en un entorn de producció i no en un de desenvolupament.

Per exemple, si estem realitzant canvis en el nostre projecte, no és desitjable que Google Analytics estigui en funcionament en local. Mitjançant aquest fitxer de configuració això és possible ja que disposem de la possibilitat de compilar el lloc web sense la necessitat de que es compilin les meta etiquetes que de Google.

_Aquest fitxer segueix sent tan escalable com l'altre, és a dir, es pot ampliar segons la necessitat_.

```yml
# Bing Webmaster Center: http://www.bing.com/webmaster
# Google Search Console: https://www.google.com/webmasters/verification/home?hl=en
# Pinterest Site Verification: http://pinterest.com/
# Yandex Webmaster: https://webmaster.yandex.com/
site_verification:
  bing:
  google:
  pinterest:
  yandex:

# google_analytics: https://www.google.com/analytics/web/#home/
analytics:
  google_analytics: #ID de seguiment (UA-000000-2).

# etc.
```

**Per evitar la compilació** d'aquest fitxer i d'altres que es puguin crear per necessitat, és recomanable comentar la línia **99** del fitxer _gulpfile.js_.

En el cas de que es desitgi emprar, només s'haurà de comentar la línia **98** i _descomentar la 99_.

```js
 97 gulp.task('build', shell.task([
 98   'jekyll build'
 99   // 'jekyll build --config _config.yml,_config-prod.yml'
100 ]));
```

# Maquetació

Totes les col·leccions han de tenir el seu propi directori **_nomCol·leccio** i, a més a més, aquestes contindran un directori que es correspondrà a l'idioma, aquest definit en el fitxer de configuració **_config.yml**.

Cada directori d'idioma contindrà les pàgines, ja siguin amb format _.html_ o _.md_. I aquestes tindran el mateix nom tant en un directori com a un altres, és a dir, si en l'idioma català tenim _benvinguts.html_, en l'idioma castellà hi afegirem el fitxer que es correspondrà a la seva traducció amb el mateix nom _benvinguts.html_.

```
_pages
|
|
+--- /ca
|    404.html
|    benvinguts.html
|    etc.
|
+--- /es
|    404.html
|    benvinguts.html
|    etc.
```

_No ens hem de preocupar de que els fitxers d'ambdós directoris tinguin el mateix nom, el contingut estarà escrit amb l'idioma que li pertoqui._ A través de les URLs visualitzarem el fitxer corresponent gràcies al directori d'idioma:

```
https://rogerforner.com/ca/benvinguts
https://rogerforner.com/es/benvinguts
```

:information_source: Per facilitar la navegació a través del lloc web s'han de dur endavant les bones pràctiques d'usuabilitat, aquestes citades per [Steve Krug](https://www.sensible.com/) en el seu llibre _Don't make me thing_.

És a dir, **oblidem** d'una vegada per totes la navegació tediosa a través de les URLs.

## Edició

Totes les pàgines, sigui quina sigui la col·lecció, han de tenir un encapçalament, el qual s'iniciarà amb 3 guions (---) i, finalitzarà, també, amb 3 guions (---).

A banda, dintre del propi contingut de la pàgina es podran escriure les variables definides tant en l'encapçalament com en els fitxer de configuració del lloc web. És Jekyll, en el moment de la compilació, qui interpretarà aquestes afegint-hi, en el seu lloc, el contingut apropiat.

```yml
---
lang: ca
title: "Sobre nosaltres"
description: "Pàgina sobre nosaltres."
robots: "index,follow"

breadcrumbs:
  - title: "Inici"
    url: ""
  - title: "Sobre nosaltres"

facebook:
  app_id:
  publisher:
  author:
  img:
google_plus:
  publisher:
  author:
  img:
twitter:
  publisher:
  author:
  img:
---
```

- La variable **lang** és obligada i és emprada per definir l'idioma de la pàgina.
- Les variables **title**, **description** i **robots** són obligades i són emprades per emplenar les meta etiquetes corresponents.
    - La variable "robots" pots contenir index,follow o noindex,nofollow, o ambdues possibilitats intercalades.
- L'array **breadcrumbs** no és obligat, ho hauria de ser si tenim en compte les bones pràctiques de la usabilitat. És emprada per mostrar, en la mateixa pàgina, les migues de pa.
    - Si la URL està buida, el text que li dona raó ser no serà un enllaç. EN cas contrari serà un enllaç que durà a aquella pàgina en concret.
- Els arrays **facebook**, **google_plus** i **twitter** són emprats per sobreescriure la configuració per defecte de l'Open Graph protocol.

## Continguts (exemples)

### Breadcrumbs

```html
{%- for item in page.breadcrumbs -%}
  {%- if item.url -%}
    <a href="{{- site.url | append:site.baseurl -}}/{{- page.lang -}}/{{- item.url -}}">{{- item.title -}}</a>
  {%- else -%}
    {{- item.title | prepend:' / ' -}}
  {%- endif -%}
{%- endfor -%}
```

### Idiomes

```html
<ul>
  {%- for lang in site.langs -%}
  	{%- if lang == page.lang -%}
  	  <li class="active">{{- lang -}}</li>
  	{%- else -%}
      <li>
        {%- assign pageName = page.path | split:'/' | last -%}
        {%- capture otherPath -%}_{{- page.collection -}}/{{- lang -}}/{{- pageName -}}{%- endcapture -%}
        {%- assign otherPage = site[page.collection] | where:'path', otherPath | first -%}
        {%- assign langUrl = otherPage.url -%}
        <a href="{{- site.baseurl | append:langUrl | remove:'index.html' -}}">{{- lang -}}</a>
      </li>
  	{%- endif -%}
  {%- endfor -%}
</ul>
```

### Loops

#### Publicacions + categories + etiquetes (tots els idiomes)

```html
{%- for post in site.posts -%}
  <h3><a href="{{- post.url | prepend:site.baseurl -}}">{{- post.title -}}</a></h3>
  <p>{{- post.description -}}</p>
  <p><small><strong>{{- post.date | date:'%B %e, %Y' -}}</strong></small></p>
  Categories:
  <ul>
    {%- for category in post.categories -%}
      <li><a href="{{- site.url | append:site.baseurl -}}/{{- post.lang -}}/archive_categories#{{- category | replace:' ', '-' | downcase -}}">{{- category -}}</a></li>
    {%- endfor -%}
  </ul>
  Etiquetes:
  <ul>
    {%- for tag in post.tags -%}
      <li><a href="{{- site.url | append:site.baseurl -}}/{{- post.lang -}}/archive_tags#{{- tag | replace:' ', '-' | downcase -}}">{{- tag -}}</a></li>
    {%- endfor -%}
  </ul>
{%- endfor -%}
```

#### Publicacions (segons l'idioma de la pàgina)

```html
{%- assign postsCa = site.posts | where:'lang', page.lang -%}
{%- for post in postsCa -%}
  <h3><a href="{{- post.url | prepend:site.baseurl -}}">{{- post.title -}}</a></h3>
  <p>{{- post.description -}}</p>
  <p><small><strong>{{- post.date | date:'%B %e, %Y' -}}</strong></small></p>
{%- endfor -%}
```

#### Publicacions (idioma definit)

```html
{%- assign postsEs = site.posts | where:'lang', "es" -%}
{%- for post in postsEs -%}
  <h3><a href="{{- post.url | prepend:site.baseurl -}}">{{- post.title -}}</a></h3>
  <p>{{- post.description -}}</p>
  <p><small><strong>{{- post.date | date:'%B %e, %Y' -}}</strong></small></p>
{%- endfor -%}
```

#### Publicacions agrupades per categories (tots els idiomes)

```html
{%- for category in site.categories -%}
  <div class="archive-group">
    {%- capture categoryName -%}{{- category | first -}}{%- endcapture -%}
    <h3>{{ categoryName }}</h3>

    {%- for post in site.categories[categoryName] -%}
      <ul>
        <li><a href="{{- post.url | prepend:site.baseurl -}}">{{- post.title -}}</a></li>
      </ul>
    {%- endfor -%}
  </div>
{%- endfor -%}
```

#### Publicacions agrupades per categories (segons l'idioma de la pàgina)

```html
{%- for category in site.categories -%}
  <div class="archive-group">
    {%- capture categoryName -%}{{- category | first -}}{%- endcapture -%}
    <h3>{{ categoryName }}</h3>

    {%- for post in site.categories[categoryName] -%}
      {%- if post.lang == page.lang -%}
        <ul>
          <li><a href="{{- post.url | prepend:site.baseurl -}}">{{- post.title -}}</a></li>
        </ul>
      {%- endif -%}
    {%- endfor -%}
  </div>
{%- endfor -%}
```

#### Publicacions agrupades per categories (idioma definit)

```html
{%- for category in site.categories -%}
  <div class="archive-group">
    {%- capture categoryName -%}{{- category | first -}}{%- endcapture -%}
    <h3>{{ categoryName }}</h3>

    {%- for post in site.categories[categoryName] -%}
      {%- if post.lang == 'es' -%}
        <ul>
          <li><a href="{{- post.url | prepend:site.baseurl -}}">{{- post.title -}}</a></li>
        </ul>
      {%- endif -%}
    {%- endfor -%}
  </div>
{%- endfor -%}
```

#### Publicacions agrupades per etiquetes (totes els idiomes)

```html
{%- for tag in site.tags -%}
  <div class="archive-group">
    {%- capture tagName -%}{{- tag | first -}}{%- endcapture -%}
    <h3><u>{{ tagName }}</u></h3>

    {%- for post in site.tags[tagName] -%}
      <ul>
        <li><a href="{{- post.url | prepend:site.baseurl -}}">{{- post.title -}}</a></li>
      </ul>
    {%- endfor -%}
  </div>
{%- endfor -%}
```

#### Publicacions agrupades per etiquetes (segons l'idioma de la pàgina)

```html
{%- for category in site.tags -%}
  <div class="archive-group">
    {%- capture tagName -%}{{- category | first -}}{%- endcapture -%}
    <h3><u>{{ tagName }}</u></h3>

    {%- for post in site.tags[tagName] -%}
      {%- if post.lang == page.lang -%}
        <ul>
          <li><a href="{{- post.url | prepend:site.baseurl -}}">{{- post.title -}}</a></li>
        </ul>
      {%- endif -%}
    {%- endfor -%}
  </div>
{%- endfor -%}
```

#### Publicacions agrupades per etiquetes (idioma definit)

```html
{%- for category in site.tags -%}
  <div class="archive-group">
    {%- capture tagName -%}{{- category | first -}}{%- endcapture -%}
    <h3><u>{{ tagName }}</u></h3>

    {%- for post in site.tags[tagName] -%}
      {%- if post.lang == 'es' -%}
        <ul>
          <li><a href="{{- post.url | prepend:site.baseurl -}}">{{- post.title -}}</a></li>
        </ul>
      {%- endif -%}
    {%- endfor -%}
  </div>
{%- endfor -%}
```

# Bibliografia Web

Per més informació, en quant a Jekyll, es poden consultar els següents llocs web:

- [Jekyll](https://jekyllrb.com/docs/home/)
- [Liquid for designers](https://github.com/Shopify/liquid/wiki/Liquid-for-Designers)
- [Gulp](https://gulpjs.com/)
- [Service Workers](https://developers.google.com/web/fundamentals/primers/service-workers/?hl=es)
- [JSON Feed](https://jsonfeed.org/)
- [Open Graph protocol](http://ogp.me/)
