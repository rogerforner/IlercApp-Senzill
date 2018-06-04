# Senzill

**Senzill** és un projecte, basat amb [Jekyll](https://jekyllrb.com/), destinat a facilitar el desenvolupament de llocs webs estàtics o [JAMstack](https://jamstack.org/).

# Instal·lació

## Descarregar

Podem descarregar el projecte fent-ne ús de [git](https://git-scm.com/), mitjançant la _shell_:

```
$ git clone https://github.com/rogerforner/senzill.git
```

Si es desitja un nom de directori diferent al del repositori (senzill):

```
$ git clone https://github.com/rogerforner/senzill.git nomNou
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

Executant, en la _shell_ **gulp** (sense watch) compilarem el lloc web, estant, aquest, preparat per ser "consumit".

```
$ gulp
```

**$ gulp watch**

Executant, en la _shell_ **gulp watch** també es compilarà el lloc web, però amb la diferència de que quan un fitxer sigui modificat, segons el tipus d'aquests, es durà endavant una compilació automàtica.

```
$ gulp watch
```

S'ha de tenir en compte que mitjançant la comanda **jekyll build** no s'executa cap tipus de servidor, de fet, només es compilen els fitxers que formen el nostre lloc web, sent enviats, desprès de la compilació, al directori **/_site.**

Dit això, hem de tenir present que l'execució del lloc web es durà a terme directament amb un **servidor local**, és indiferent si es tracta d'un [Laragon](https://laragon.org/) o un [XAMPP](https://www.apachefriends.org/es/index.html) o un [Wamp](http://www.wampserver.com/en/) o un [LAMP](https://es.wikipedia.org/wiki/LAMP) etc.

Tenint en compte que el directori on es compila el lloc web és /_site, la nostra URL del localhos es visualitzarà (o somilar):

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

- Els fitxers **YML** són decodificats i emprats per permetre'n la compilació del lloc web, aquest dividit en diversos directoris /_nomDirectori.

# Configuració