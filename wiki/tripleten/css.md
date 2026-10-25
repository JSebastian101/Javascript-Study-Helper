# MÓDULO CSS: FLUJO, GRID, SOMBRAS Y FUENTES

## 1. ¿Qué es el flujo normal del documento?

Es la forma en que el navegador organiza los elementos por defecto: cada bloque empieza en una línea nueva, los elementos de línea se agrupan juntos y ningún elemento se superpone a otro. Todos los elementos están conectados: si uno cambia, los demás reaccionan.

---

## 2. ¿Cómo se comportan los elementos dentro del flujo normal?

- Cada elemento sabe dónde están los demás y reacciona cuando alguno cambia.
- En realidad no se pueden reposicionar; con `margin` o `padding` solo *parece* que se movieron.
- Un `margin` o un `padding` positivo agranda la caja del elemento: parece que se movió, pero en realidad creció.
- Un `margin` negativo desplaza el contenido en sentido contrario y puede hacer que los elementos se superpongan.

---

## 3. ¿Qué es position: static?

Es el valor por defecto de la propiedad `position`. Un elemento con `position: static` simplemente forma parte del flujo normal. Otros valores de `position` permiten sacarlo del flujo.

---

## 4. ¿Por qué conviene instalar las fuentes en el proyecto en lugar de usar el <link> de Google Fonts?

Porque tener los archivos de la fuente dentro del proyecto es más eficaz y confiable. Se hace en tres pasos:

1. Obtener los archivos de la fuente.
2. Declarar la fuente con `@font-face`.
3. Aplicar la fuente a un elemento.

---

## 5. ¿Dónde puedo conseguir los archivos de una fuente?

En Google Fonts (opción "Download all") o en el sitio de cada fuente; por ejemplo, la familia Inter se descarga gratis en rsms.me/inter. Solo hay que guardar las variantes que se van a usar, no toda la familia.

---

## 6. ¿Cómo declaro una fuente con @font-face?

Con `src` indico la ruta del archivo y con `font-family` el nombre con el que la voy a usar en el CSS:

```css
@font-face {
  src: url(path/to/font/file);
  font-family: "La mejor fuente de todas";
}
```

El nombre puede ir entre comillas simples o dobles; por convención se usan dobles. Estas declaraciones van antes del resto de los estilos, pero después de `normalize.css`, normalmente en un archivo aparte (`fonts.css`).

---

## 7. ¿Cómo declaro las variantes de una fuente (cursiva, negrita)?

Cada variante se declara por separado con el mismo `font-family`, indicando su `font-style` y su `font-weight`:

```css
@font-face {
  src: url(path/to/font/normal_font);
  font-family: "La mejor fuente de todas";
}

@font-face {
  src: url(path/to/font/italic_font);
  font-family: "La mejor fuente de todas";
  font-style: italic;
}

@font-face {
  src: url(path/to/font/bold_font);
  font-family: "La mejor fuente de todas";
  font-weight: bold;
}

@font-face {
  src: url(path/to/font/bold_italic_font);
  font-family: "La mejor fuente de todas";
  font-style: italic;
  font-weight: bold;
}
```

---

## 8. ¿Cómo aplico una fuente que declaré?

Con la propiedad `font-family`, usando el nombre que le di en `@font-face`. Después del nombre se escriben fuentes alternativas por si la primera no está disponible:

```css
body {
  font-family: "La mejor fuente de todas", Arial, sans-serif;
  font-weight: bold;
  font-style: italic;
}
```

---

## 9. ¿Dónde se guardan las fuentes en los proyectos de TripleTen?

En la carpeta `vendor/`:

```text
vendor/
  fonts/          ← archivos de las fuentes
  fonts.css       ← declaraciones @font-face
  normalize.css
```

---

## 10. ¿Qué formatos de fuente debo usar y para qué sirve format()?

Con **woff2** y **woff** es suficiente para todos los navegadores modernos. Los navegadores antiguos necesitan otros formatos, como `ttf` o `eot`.

La función `format()` permite dar una lista de archivos en distintos formatos; el navegador usa el primero que puede leer:

```css
@font-face {
  src: url(path/to/font/file.woff2) format("woff2"),
       url(path/to/font/file.woff) format("woff"),
       url(path/to/font/file.ttf) format("truetype"),
       url(path/to/font/file.eot) format("embedded-opentype");
}
```

La compatibilidad de cada navegador se puede revisar en caniuse.com.

---

## 11. ¿Qué es CSS Grid Layout?

Es un sistema para organizar elementos en los dos ejes a la vez, horizontal (x) y vertical (y), es decir, en filas y columnas. Hoy es compatible con todos los navegadores modernos.

---

## 12. ¿Cómo creo un contenedor grid?

Con `display: grid`. Todos sus hijos directos se convierten automáticamente en elementos grid.

```css
.container {
  display: grid;
}
```

---

## 13. ¿Cómo se organizan los elementos de un grid por defecto?

Un contenedor grid empieza con una sola columna y una sola fila que ocupan todo el contenedor. Cada elemento que se agrega crea una fila nueva, así que quedan uno debajo del otro. Esa forma de organizar por defecto es la principal diferencia con flexbox.

Además, en grid es mucho más fácil cambiar el orden de los elementos.

---

## 14. ¿Cuál es la diferencia entre display: grid y display: inline-grid?

Con `inline-grid` el contenedor se comporta como un elemento en línea: su ancho es solo el que necesitan sus hijos, en lugar de ocupar todo el ancho disponible.

---

## 15. ¿Cuáles son las partes de un grid?

- **Elementos grid:** los hijos directos del contenedor grid.
- **Líneas de grid:** líneas invisibles, horizontales y verticales, que forman las filas y las columnas. Están numeradas desde el 1.
- **Grid track:** el espacio entre dos líneas, es decir, una fila o una columna.
- **Celda:** el espacio donde se cruzan una fila y una columna. Por defecto cada elemento ocupa una celda.

---

## 16. ¿Cómo defino las filas y columnas de un grid?

Con `grid-template-columns` y `grid-template-rows`. Cada valor, separado por espacios, es el tamaño de una columna o de una fila:

```css
.container {
  display: grid;
  grid-template-columns: 100px 100px 180px;
  grid-template-rows: 80px 80px 40px;
}
```

Esto crea un grid de 3 columnas y 3 filas (9 celdas).

- Los elementos llenan las celdas de izquierda a derecha y de arriba hacia abajo.
- Si hay menos elementos que celdas, las últimas quedan vacías.
- Si hay más elementos que celdas, el grid crea **celdas implícitas** con tamaño `auto`, que pueden colapsar si no tienen contenido ni tamaño definido.

---

## 17. ¿Qué hace el valor auto en el tamaño de una fila o columna?

El track toma el tamaño necesario para su elemento más grande y los demás comparten el espacio restante. El tamaño de las columnas también puede darse en píxeles o en porcentajes.

---

## 18. ¿Qué es un grid area y cómo se define con grid-template-areas?

Un **grid area** es una zona rectangular formada por una o varias celdas. Con `grid-template-areas`, en el contenedor, se le da un nombre a cada celda; las celdas con el mismo nombre forman un área. Un punto (`.`) deja una celda vacía.

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, 1fr);
  grid-template-areas:
    "header header header"
    "news news aside"
    "promo promo aside"
    ". footer footer";
}
```

`repeat(3, 1fr)` crea tres columnas del mismo tamaño.

---

## 19. ¿Cómo ubico un elemento dentro de un área?

Con la propiedad `grid-area` en el elemento grid, usando el nombre del área:

```css
.header {
  grid-area: header;
}
```

---

## 20. ¿Qué limitaciones tiene grid-template-areas?

- Todas las celdas deben tener un nombre (o un punto si están vacías).
- Cada área debe ser **rectangular**; no puede tener forma de L.
- Cada nombre se puede usar para **una sola área**; no se puede repetir en zonas separadas.

```css
/* no funciona: "promo" forma una L */
grid-template-areas:
  "header header header"
  "promo news aside"
  "promo promo aside"
  ". footer footer";
```

---

## 21. ¿Tengo que elegir entre Grid y Flexbox?

No. Están pensados para usarse juntos: cada uno tiene sus puntos fuertes, y combinarlos permite construir diseños más completos.

---

## 22. ¿Cómo agrego una sombra a un elemento o a un texto?

Con `box-shadow` para elementos y `text-shadow` para textos. Sus valores, en este orden, son:

1. Desplazamiento horizontal (negativo: hacia la izquierda; positivo: hacia la derecha).
2. Desplazamiento vertical (negativo: hacia arriba; positivo: hacia abajo).
3. Radio de difuminado (más grande = sombra más amplia y borrosa).
4. Color.

```css
div {
  box-shadow: 5px 6px 7px red;
}

h1 {
  text-shadow: 5px 6px 7px red;
}
```

La sombra queda 5px a la derecha y 6px hacia abajo, con 7px de difuminado y de color rojo.

---

## 23. ¿Cómo copio sombras y degradados desde Figma?

Figma también da el CSS de las sombras y los degradados. En modo de visualización hago clic en el elemento, abro la pestaña **Propiedades** y busco la sección **Sombras y desenfoques** (Shadows and blurs); arriba a la derecha hay un ícono para copiar. Para ver las propiedades CSS puede ser necesario activar el Modo Desarrollador.
