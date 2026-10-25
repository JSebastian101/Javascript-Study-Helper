# MÓDULO PRODUCTO DIGITAL Y TRABAJO CON DISEÑADORES

## 1. ¿Qué es un producto digital y por qué conviene conocer su ciclo de vida?

En informática, "producto" suele referirse a una página web o a una aplicación. Crear un producto es un trabajo en equipo, así que conocer todo su ciclo de vida ayuda a entender las responsabilidades propias y las de los compañeros, y a comunicarse mejor con el equipo.

---

## 2. ¿Cuáles son las etapas de desarrollo de un producto digital?

1. **Idea del producto:** se decide qué necesidades del usuario va a resolver y se escriben los términos de referencia (TOR) iniciales.
2. **Solución:** se define cómo hacerlo: la funcionalidad, prototipos aproximados de la interacción con el usuario y unos TOR más claros.
3. **Diseño:** el diseñador hace los esquemas y prototipos de las páginas. Suele haber reuniones de revisión y pruebas de usabilidad.
4. **Implementación:** el desarrollador escribe el código.
5. **Pruebas y debugging:** se prueba todo en distintos dispositivos y navegadores. Después suele venir el control de calidad (QA).
6. **Publicación:** el sitio se "envía a producción" o se "despliega", es decir, se aloja en un servidor o dominio real.
7. **Refactorizar (opcional):** se mejora algo (una función nueva, un ajuste de diseño) y el ciclo vuelve a empezar.

Las dos primeras etapas normalmente las hace el cliente.

---

## 3. ¿El cliente siempre es alguien externo?

No. El cliente (o "parte interesada") puede ser la misma empresa. Por ejemplo, cuando un equipo interno de Amazon trabaja en Amazon Prime Video, la parte interesada es la propia Amazon.

---

## 4. ¿Qué es un documento de especificaciones?

Es una visualización del sitio web que detalla cómo se debe programar cada componente: márgenes, fuentes, dimensiones, colores, sombras, degradados, etc.

Hoy en día se trabaja con herramientas como Figma, Sketch o Adobe XD, donde el desarrollador puede inspeccionar el diseño y obtener esas medidas directamente, sin que el diseñador tenga que escribir largas hojas de especificaciones.

Una buena especificación:

- Tiene información precisa y bien organizada.
- Muestra cómo se verá el sitio en distintas plataformas: celular, tableta y computadora.

---

## 5. ¿Cuál es la diferencia entre una especificación y un brief?

- Un **brief** es una descripción aproximada de lo que hay que hacer. Una imagen o un .pdf sin más información es un brief, no una especificación.
- Una **especificación** incluye todos los detalles técnicos necesarios para programar.

---

## 6. ¿Qué herramientas de diseño son las más usadas y qué ventajas y desventajas tienen?

| Herramienta | Ventajas | Desventajas |
| --- | --- | --- |
| Sketch | Interfaz ligera y sencilla, buen rendimiento | Solo funciona en macOS |
| Figma | Funciona en el navegador, buena colaboración y prototipos, vista previa en el celular | Agregar miembros al equipo puede ser caro |
| Adobe Photoshop | Permite trabajar con formas, imágenes, márgenes y tipografía | Consume muchos recursos, los archivos .psd son pesados y es cada vez más anticuado para diseño web |
| Adobe Illustrator | Trabaja con gráficos vectoriales | Pesado y poco intuitivo, como Photoshop |

---

## 7. ¿Cómo se organiza un archivo de Figma?

Páginas → Frames → Grupos → Elementos.

- En la columna izquierda está el **panel de capas** (layers).
- Un **frame** es un lienzo individual. Normalmente cada frame representa una página web en un tamaño de pantalla.
- Los frames suelen llamarse con el ancho de pantalla que representan: 320 (celulares pequeños), 768 (tabletas), etc.
- Algunos diseñadores también usan frames para información extra, como los estados "Hover on" y "Hover off".

Un archivo se puede abrir en **modo de visualización** ("view only", sin permisos para editar) o en **modo de edición**.

---

## 8. ¿Cómo mido la distancia entre dos elementos en Figma?

Selecciono un elemento, mantengo presionada la tecla **Alt** (**Option** en macOS) y paso el cursor sobre el elemento vecino. Figma muestra la distancia en píxeles.

---

## 9. ¿Cómo veo las propiedades de un texto o de un color en Figma?

En modo de visualización, hago clic en la capa y abro la pestaña **Propiedades** del panel derecho. Las propiedades aparecen agrupadas (diseño, contenido, tipografía y colores) y cada grupo tiene un botón **Copiar** que copia su CSS.

Antes de usar ese CSS hay que analizarlo. Por ejemplo, un título centrado en un frame puede tener márgenes que no sirven en la página; lo importante es notar que el texto está centrado.

En modo de edición aparecen dos pestañas:

- **Design:** posición, alineación, colores, bordes, efectos y texto.
- **Prototype:** simula acciones como hacer clic o pasar el cursor sobre un elemento.

---

## 10. ¿Qué pasa si uso una fuente que el usuario no tiene instalada?

Con `font-family` la fuente solo se ve si el usuario la tiene instalada en su computadora. Para que todos la vean hay que cargar los archivos de la fuente en la página con la regla `@font-face`.

Las fuentes de pago requieren una licencia por cada proyecto, por eso conviene buscar opciones gratuitas, como Google Fonts.

---

## 11. ¿Cómo exporto imágenes desde Figma y en qué formato?

Selecciono solo la imagen (no el grupo que la contiene) y uso la opción **Export** del panel derecho.

- **.jpg:** la opción por defecto, porque pesa menos.
- **.png:** para imágenes con transparencia; en .jpg las zonas transparentes quedarían blancas.
- **.svg:** para gráficos vectoriales, íconos y líneas curvas.

No conviene exportar imágenes tres o cuatro veces más grandes de lo necesario, porque el sitio se vuelve lento (algunos desarrolladores exportan al doble, 2x). Tampoco deben quedar tan pequeñas que se vean borrosas.

---

## 12. ¿Qué cuidados debo tener al copiar código CSS desde Figma?

Figma no entiende el flujo del documento ni los contenedores flexibles: solo hace posicionamiento absoluto. Si se usa `position: absolute` en todos lados, habría que posicionar cada elemento a mano para cada resolución.

Lo recomendable es copiar solo propiedades sencillas, como el tamaño de las fuentes o los degradados. Hay que tener cuidado con las alturas fijas, porque impiden que los elementos se ajusten cuando cambia la resolución o el contenido.

---

## 13. ¿Qué significa "pixel perfect"?

Es implementar el diseño exactamente igual, píxel por píxel, a como aparece en el diseño de referencia. Existen herramientas, como la extensión PerfectPixel, que ayudan a comparar, pero no hay que confiar en ellas más que en el propio criterio.

---

## 14. ¿Qué preguntas debo hacer antes de empezar un proyecto?

- ¿En qué navegadores debe funcionar el sitio?
- ¿En qué dispositivos y pantallas? Normalmente celular, tableta y computadora.
- ¿Cómo debe cambiar el diseño en los puntos de ruptura?
- ¿El cliente necesita un sistema de gestión de contenido (CMS)? Si la respuesta es sí, probablemente hace falta un desarrollador de back-end y el proyecto cuesta más.
- Si es un proyecto freelance: ¿cuántas rondas de cambios se incluyen? ¿El pago es por hora o una suma fija?

---

## 15. ¿Qué suele faltar en un brief o en una especificación?

- Cómo y dónde funcionan las animaciones y los efectos hover (botones, menús desplegables, ventanas emergentes y enlaces).
- Los archivos de las fuentes y el permiso para usarlas. Se puede buscar "typeface" junto con el nombre de la fuente para ver su licencia; si no es abierta, hay que consultarlo con el diseñador.
- Todos los textos e imágenes del sitio.

---

## 16. ¿Qué prioridades puedo tener en cuenta al pensar en mi entorno de trabajo ideal?

- **Estabilidad:** trabajar en una gran empresa y avanzar poco a poco a puestos de nivel medio y superior. Es un camino lento pero confiable.
- **Remuneración elevada:** cambiar de trabajo con frecuencia buscando el mejor salario, o trabajar como consultor o independiente. Es una estrategia de alto riesgo y alta recompensa.
