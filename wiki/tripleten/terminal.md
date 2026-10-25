# MÓDULO TERMINAL (LÍNEA DE COMANDOS)

## 1. ¿Por qué conviene aprender atajos de la terminal?

Porque permiten trabajar más rápido y corregir errores sin volver a escribir todo. Estos atajos funcionan en terminales basadas en Unix, como Git Bash; en las de Windows (cmd o PowerShell) pueden comportarse distinto.

---

## 2. ¿Cómo corrijo un error al principio de un comando largo?

1. Voy al inicio de la línea con **Ctrl + A**.
2. Corrijo el error.
3. Vuelvo al final de la línea con **Ctrl + E**.
4. Termino de escribir el comando.

Para corregir algo en medio del comando me muevo con las flechas izquierda y derecha.

---

## 3. ¿Cómo vuelvo a usar un comando que ya escribí?

La terminal guarda los comandos anteriores en su **búfer de historial**. Con la flecha **arriba** veo el último comando; si sigo presionándola, aparecen los anteriores. Con la flecha **abajo** vuelvo hacia los más recientes.

---

## 4. ¿Cómo funciona el autocompletado con Tab?

Escribo las primeras letras de un comando o de una ruta y presiono **Tab**: si hay una única opción, la terminal la completa. Si hay varias, al presionar **Tab dos veces** muestra la lista de opciones.

En Git Bash, escribir `/` y presionar Tab dos veces muestra las carpetas del directorio raíz (la carpeta de nivel más alto del disco). En Windows, el directorio raíz se representa con una letra de unidad, por ejemplo `C:\`.

---

## 5. ¿Qué significa ~ en una ruta?

La virgulilla `~` es un atajo para la **carpeta de inicio** del usuario. Sirve para llegar a ella rápido desde cualquier lugar o para escribir rutas.

```bash
cd ~/Desktop/
```

---

## 6. ¿Cuáles son los comandos básicos de navegación?

- `pwd`: muestra en qué carpeta estoy.
- `ls`: lista los archivos de la carpeta.
- `cd`: me mueve a otra carpeta. `cd ..` sube un nivel.

Combinando `~`, `/` y Tab se escriben rutas muy rápido:

```bash
cd ~/Des    # presiono Tab y se completa:
cd ~/Desktop/
```

---

## 7. ¿Qué hacen mkdir y touch?

- `mkdir nombre`: crea una carpeta.
- `touch archivo`: crea un archivo vacío.

```bash
mkdir pages
touch index.css about.css
```

---

## 8. ¿Cómo ejecuto varios comandos en una sola línea?

Uniéndolos con `&&`. Se ejecutan uno tras otro, en orden (cada uno solo si el anterior funcionó):

```bash
# crea la carpeta new-project, entra en ella y crea index.html
mkdir new-project && cd new-project && touch index.html
```

Es útil cuando los comandos tardan: se escriben todos juntos y la terminal los ejecuta sola.

---

## 9. ¿Cómo copio archivos con cp?

`cp` recibe primero lo que quiero copiar y al final la carpeta donde quiero la copia. Puedo copiar varios archivos a la vez:

```bash
cp que_copiar donde_se_copia
cp archivo1 archivo2 donde_se_copia

# copia index.css y about.css a la carpeta pages
cp index.css about.css ./pages
```

---

## 10. ¿Cómo muevo archivos o carpetas con mv?

`mv` tiene la misma sintaxis que `cp`: primero lo que quiero mover y al final la carpeta de destino.

```bash
mkdir blocks
touch header.css footer.css

# mueve los dos archivos a la carpeta blocks
mv header.css footer.css ./blocks

cd blocks && ls
# footer.css
# header.css
```

---

## 11. ¿Cómo veo el contenido de un archivo en la terminal?

Con `cat` seguido de la ruta del archivo. Solo funciona con archivos de texto (HTML, CSS, .txt…), no con imágenes. Con la opción `-n` también muestra los números de línea.

```bash
cat index.html
cat ~/Documents/file.txt
cat -n index.html
```

---

## 12. ¿Cómo edito un archivo con nano?

`nano` es un editor de texto sencillo que funciona dentro de la terminal. Si el archivo no existe, lo crea.

```bash
nano hello.txt
```

- **Ctrl + O** y luego **Enter**: guardar.
- **Ctrl + X**: salir. Si hay cambios sin guardar, pregunta si quiero guardarlos.

En algunas versiones de macOS y Linux se abre `pico`, que funciona de forma muy parecida.

---

## 13. ¿Cómo funciona Vim y cómo salgo de él?

Vim trabaja con **modos**. Al abrirlo (`vim hello.txt`) está en **modo normal**, que sirve para moverse por el archivo y ejecutar comandos, pero no para escribir.

- **i**: entra al modo insertar, para escribir.
- **Esc**: vuelve al modo normal.
- **:q** y **Enter**: sale sin guardar.
- **:wq** y **Enter**: guarda y sale.

Al escribir `:` Vim pasa al modo línea de comandos.
