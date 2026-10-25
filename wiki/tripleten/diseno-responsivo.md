# MÓDULO DISEÑO RESPONSIVO

## 1. ¿Qué es el diseño responsivo y en qué se diferencia del diseño adaptativo?

El **diseño responsivo** es el nombre general para las técnicas que hacen que un sitio se vea natural en cualquier pantalla. Su idea central es definir el tamaño de los elementos con **unidades relativas**.

El **diseño adaptativo** usa reglas específicas para cada resolución, como si hubiera varias versiones del mismo sitio para distintos tamaños de pantalla.

Hoy el diseño adaptativo se considera una parte del responsivo, y su legado son las media queries. La diferencia es que el responsivo se ajusta de forma más fluida, mientras que el adaptativo es más rígido.

---

## 2. ¿Cuáles son las tres formas de ajustar un sitio a distintos tamaños de pantalla sin JavaScript?

1. Usar unidades relativas, como `%`, `vw` y `vh`.
2. Escribir reglas CSS separadas para los tamaños de pantalla más comunes (media queries).
3. Mostrar u ocultar elementos según la pantalla con la propiedad `display`: `display: none` oculta el elemento y otro valor, como `block`, lo muestra.

---

## 3. ¿Qué son los enfoques Desktop first y Mobile first?

- **Desktop first (escritorio primero):** se construye primero la versión para computadoras y después se adapta a tabletas y celulares. Es el enfoque más tradicional y todavía el más usado, porque los navegadores completos en celulares son relativamente recientes.
- **Mobile first (móvil primero):** se empieza por las pantallas más pequeñas y se avanza hacia las más grandes. Hoy muchas de las páginas más visitadas (redes sociales, compras, comida a domicilio) se usan desde el celular. En el celular las páginas cargan más rápido porque tienen menos elementos y animaciones.

Los dos enfoques son válidos; lo importante es saber trabajar con ambos.

---

## 4. ¿Qué tamaños de pantalla suelen aparecer en un diseño?

Normalmente tres: computadora de escritorio, tableta y celular, por ejemplo **1280px**, **768px** y **320px**.

Los tamaños intermedios se acuerdan con el diseñador o se resuelven por cuenta propia, porque el sitio debe funcionar en cualquier resolución.

---

## 5. ¿Cuáles son las tres reglas para crear un sitio adaptable?

1. Hacer diseños responsivos.
2. Crear bloques responsivos.
3. Cambiar los estilos CSS en los puntos de ruptura (con la regla `@media`).

---

## 6. ¿Qué debo revisar en el diseño para saber cómo cambia entre pantallas?

1. ¿Cómo cambia el número de filas y columnas cuando los elementos se comprimen?
2. ¿Cambia el orden de los elementos?
3. ¿Cómo cambian las dimensiones y los márgenes? ¿Hay algún patrón?
4. ¿Qué elementos aparecen o desaparecen según el tamaño de la pantalla?
5. ¿Cómo responden los elementos a los cambios de su contenedor? Por ejemplo, `flex-direction: row` suele cambiarse por `column`.

---

## 7. ¿Para qué sirven min-width, max-width, min-height y max-height?

- **`min-width`:** fija el ancho mínimo de la página, para que en pantallas más pequeñas los elementos no se desborden.
- **`max-width`:** evita que el contenido se estire sin límite en pantallas anchas. Junto con `margin: auto` centra el contenido y deja espacio vacío a los lados.
- **`min-height`:** es mejor que una altura fija para los bloques de texto, porque les permite crecer si el contenido lo necesita.
- **`max-height`:** evita que algo crezca demasiado en pantallas grandes, por ejemplo una imagen con `min-height: 80vh`.

```css
.content {
  max-width: 1280px;
  margin: 0 auto;
}
```

---

## 8. ¿Cómo funcionan los porcentajes en el ancho, el margen y el padding?

Se calculan como un porcentaje del **ancho del elemento padre**.

La altura también se puede dar en porcentaje (respecto a la altura del padre), pero solo conviene hacerlo con contenedores flexibles o cuando el padre tiene una altura declarada explícitamente.

---

## 9. ¿Qué son las unidades vw y vh?

Son unidades relativas a la **ventana gráfica** (la parte de la página que se ve en la pantalla).

- `100vw` es todo el ancho de la ventana, incluida la barra de desplazamiento; `1vw` es el 1%.
- `100vh` es toda la altura de la ventana; `1vh` es el 1%.

Hay que tener cuidado con `width: 100vw` y `height: 100vh`: incluyen la barra de desplazamiento y en algunos navegadores crean desplazamiento extra. Para que algo ocupe todo el ancho es mejor usar `width: 100%`.

---

## 10. ¿Qué son las unidades vmin y vmax?

Funcionan como `vw` y `vh`, pero toman la dimensión más pequeña de la ventana (`vmin`) o la más grande (`vmax`).

- En una computadora (más ancha que alta), `50vmin` es el 50% de la altura.
- En un celular (más alto que ancho), `50vmin` es el 50% del ancho.

Con `vmax` pasa al revés. Se usan poco, pero es útil conocerlas.

---

## 11. ¿Cuál es la diferencia entre una imagen de mapa de bits y una vectorial?

- **Mapa de bits:** se guarda como una cuadrícula de píxeles de colores. Sus formatos más comunes son `.jpg`, `.png` y `.gif`.
- **Vectorial:** se describe con fórmulas matemáticas (puntos, curvas, círculos, polígonos), por eso se ve nítida a cualquier tamaño. El formato vectorial que admiten los navegadores es `.svg`.

---

## 12. ¿Qué problemas tienen las imágenes de mapa de bits?

1. **Se ven peor al ampliarlas:** cada píxel crece y, en cierto punto, la imagen se ve como una cuadrícula borrosa.
2. **Se ven borrosas en pantallas de alta resolución:** dos pantallas del mismo tamaño pueden tener distinta cantidad de píxeles. El navegador agranda la imagen para que se vea del mismo tamaño, y eso la difumina.

Por eso conviene preparar las imágenes de mapa de bits pensando desde el principio en pantallas de alta resolución.

---

## 13. ¿Por qué se usan imágenes SVG para logotipos e íconos?

- Se ven nítidas en todos los dispositivos.
- Se pueden controlar con CSS y JavaScript.

Se crean en editores vectoriales como Figma, Sketch o Illustrator. Por dentro, un `.svg` es código parecido al HTML. Ese código suele traer información de más (metadatos, líneas repetidas, estilos innecesarios), así que conviene optimizarlo con herramientas como SVGOMG antes de usarlo.

---

## 14. ¿De qué formas puedo agregar un SVG a una página?

1. Con el atributo `src` de la etiqueta `<img>`.
2. Con la propiedad `background-image` en CSS.
3. Como un `<iframe>`.
4. Con el atributo `src` de la etiqueta `<embed>`.
5. Con el atributo `data` de la etiqueta `<object>`.
6. Incrustando el código del SVG directamente en el HTML.

Con `<img>` y `background-image`, el CSS y el JavaScript de la página no pueden cambiar las partes internas del SVG. Las opciones 3, 4 y 5 casi no se usan.

Para dar estilos o animar un SVG, lo mejor es incrustar su código en el HTML, aunque el archivo HTML crece. En los proyectos de TripleTen se usa `<img>`, salvo que el proyecto indique otra cosa, porque su sintaxis es sencilla, carga más rápido y admite el atributo `alt`.

```html
<img src="./images/logo.svg" alt="Logotipo">
```

---

## 15. ¿Para qué sirve la etiqueta meta viewport?

Define la relación entre el tamaño de la página y el dispositivo donde se abre. Es fundamental para el diseño responsivo.

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

Su atributo `content` acepta seis propiedades: `width`, `height`, `initial-scale`, `minimum-scale`, `maximum-scale` y `user-scalable`.

---

## 16. ¿Qué hacen width y height en la etiqueta meta viewport?

- `width` define el ancho de la ventana gráfica: un número de píxeles (`width=600`) o el ancho del dispositivo (`width=device-width`).
- `height` hace lo mismo con la altura (`height=device-height`); se usa muy poco.

```html
<meta name="viewport" content="width=device-width, height=device-height, initial-scale=1">
```

---

## 17. ¿Qué hace initial-scale?

Fija el nivel de zoom con el que se carga la página.

- `initial-scale=1`: zoom al 100%; el contenido se ve en su tamaño normal.
- `initial-scale=0.5`: zoom al 50%; el contenido se ve a la mitad de su tamaño.

---

## 18. ¿Cómo controlo si el usuario puede hacer zoom?

- `minimum-scale`: qué tan pequeña puede hacerse la página.
- `maximum-scale`: qué tan grande puede hacerse.
- `user-scalable`: `yes` (el valor por defecto) permite hacer zoom; `no` lo impide.

Se usan poco. Un caso útil: algunos navegadores móviles agrandan la página al girar el celular a horizontal, y se puede evitar con una escala máxima.

```html
<meta name="viewport" content="initial-scale=1, maximum-scale=1">
```

---

## 19. ¿Qué es una media query y cuál es su sintaxis?

Es una directiva CSS que aplica estilos solo cuando se cumplen ciertas condiciones, por ejemplo un tamaño de ventana. Sirve para hacer páginas responsivas.

```css
@media (condicion1) and (condicion2) {
  selector {
    propiedad: valor;
  }
}
```

Se escriben al final del CSS. Con BEM, cada bloque lleva sus media queries al final de su propio archivo; si los estilos están agrupados por tipo, van al final del archivo general.

---

## 20. ¿Qué hay que tener en cuenta al diseñar para celulares y tabletas?

- No hay mouse, así que no existe el efecto `:hover`.
- Los usuarios tocan la pantalla en lugar de hacer clic.
- La letra pequeña es difícil de leer.
- Los elementos pequeños son difíciles de tocar.
- Está bien que el diseño sea completamente distinto al de escritorio.

No todo se resuelve estirando elementos: a veces hay que cambiarlos o moverlos de lugar, y para eso están las media queries.

---

## 21. ¿Qué tipos de dispositivo puedo indicar en una media query?

Los más usados son:

- `all`: todos los dispositivos.
- `screen`: los dispositivos con pantalla.

```css
@media screen {
  body {
    font-family: "Arial";
  }
}
```

---

## 22. ¿Cuál es la diferencia entre max-width y min-width en una media query?

- `max-width`: los estilos se aplican cuando la ventana mide **como máximo** ese ancho.
- `min-width`: los estilos se aplican cuando la ventana mide **como mínimo** ese ancho.

Varias condiciones se combinan con `and`.

```css
/* fondo azul en ventanas de 720px o menos */
@media screen and (max-width: 720px) {
  body {
    background-color: blue;
  }
}

/* fondo verde en ventanas de 720px o más */
@media screen and (min-width: 720px) {
  body {
    background-color: green;
  }
}
```

---

## 23. ¿Qué puntos de ruptura se usan con más frecuencia?

Los estilos base suelen escribirse para portátiles medianos (entre 1024 y 1440 píxeles) y las media queries cubren el resto:

```css
/* estilos principales para 1024px */

@media screen and (min-width: 2560px) {
  /* monitores grandes 4K */
}

@media screen and (min-width: 1440px) {
  /* computadoras de escritorio y portátiles grandes */
}

@media screen and (max-width: 1024px) {
  /* tabletas en horizontal */
}

@media screen and (max-width: 768px) {
  /* tabletas */
}

@media screen and (max-width: 425px) {
  /* celulares grandes */
}

@media screen and (max-width: 375px) {
  /* celulares medianos */
}

@media screen and (max-width: 320px) {
  /* celulares pequeños */
}
```

No siempre se necesitan todas: los puntos de ruptura se acuerdan con el diseñador.

Regla importante: escribir los estilos **de lo general a lo específico y de lo grande a lo pequeño**, para que unos no anulen a otros.

---

## 24. ¿Cómo aplico estilos para la orientación horizontal?

Existe la condición `orientation` (`portrait` o `landscape`), pero los navegadores suelen tener problemas con ella. Por eso se combinan condiciones de ancho y alto:

```css
/* iPhone 5 en horizontal */
@media screen and (max-width: 568px) and (max-height: 320px) {
  /* estilos */
}
```

---

## 25. ¿Qué es la Device Toolbar y cómo la abro?

Es una barra de las DevTools de Chrome para ver la página en distintos tamaños de pantalla.

1. Abrir las DevTools: **Ctrl+Shift+I** (Windows/Linux) o **⌘+Option+I** (macOS).
2. Abrir la Device Toolbar: **Ctrl+Shift+M** (Windows/Linux) o **⌘+Shift+M** (macOS).

Sus partes, de izquierda a derecha:

1. **Dimensiones:** emula un dispositivo específico. Normalmente se deja en "Reactivo" (Responsive).
2. **Ancho y alto:** campos para escribir las dimensiones; también se pueden cambiar arrastrando los bordes.
3. **Zoom.**
4. **Throttling:** simula conexiones lentas.
5. **Rotar:** cambia entre vertical (portrait) y horizontal (landscape) e invierte el ancho y el alto.
6. **Más opciones.**

---

## 26. ¿Qué es el desplazamiento horizontal y cómo lo detecto?

Ocurre cuando hay contenido que no cabe a lo ancho de la ventana y aparece una barra de desplazamiento horizontal. Una página bien hecha solo debe desplazarse verticalmente.

Para ver las barras de desplazamiento en las DevTools: abrir la Device Toolbar, ir a **Más opciones → Agregar tipos de dispositivos** y elegir **Desktop**.

Hay que probar la página en todos los tamaños, empezando por 320px.

---

## 27. ¿Cómo encuentro qué elemento causa el desplazamiento horizontal?

1. Desplazar la página todo lo posible hacia la derecha y pasar el cursor por los elementos con el inspector. A veces el culpable es evidente.
2. Si no, en el panel **Elementos** borrar elementos uno por uno y revisar si el desplazamiento desaparece. El último elemento borrado antes de que desaparezca es la causa.

---

## 28. ¿Qué suele causar el desplazamiento horizontal?

- Anchos fijos en píxeles (`width`, `min-width`).
- Un `padding` horizontal que agranda el contenido.
- `width: 100vw`, que no descuenta la barra de desplazamiento vertical. Es mejor `width: 100%`.
- Márgenes, columnas de grid (`grid-template-columns`) y espacios entre elementos.
