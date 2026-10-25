# MÓDULO GIT

## 1. ¿Para qué sirve git add y en qué se diferencia de git commit?

- `git add` le dice a Git **qué archivos** van a entrar en el próximo commit. Los lleva a un almacenamiento temporal llamado **área de staging** (o índice).
- `git commit` guarda (confirma) todos los cambios que están en el área de staging.

Tenerlos separados permite seguir editando y elegir qué entra en cada commit.

---

## 2. ¿Qué estados puede tener un archivo en Git?

- **Sin seguimiento:** archivos nuevos que todavía no se agregaron con `git add`.
- **Modificados:** archivos que Git ya conoce y que cambiaron.
- **En staging:** archivos agregados con `git add`, listos para el commit.

Si un archivo se agrega con `git add` y después se vuelve a editar, esos cambios nuevos no están en staging hasta hacer `git add` otra vez.

---

## 3. ¿Cómo agrego archivos al área de staging?

```bash
git add nombre_archivo   # un archivo
git add -A               # todos los archivos con cambios
```

---

## 4. ¿Cómo agrego una carpeta vacía a Git?

Git no ve las carpetas vacías. Para incluir una, se crea dentro un archivo vacío llamado `.gitkeep`.

---

## 5. ¿Cómo veo el historial de commits?

Con `git log`, que muestra los commits confirmados (no todos los cambios del proyecto). Si la lista no termina sola, se sale con la tecla **q**.

```bash
git log
# commit b56aec1742c00c7f773ef2f3be8bd6461bc1fc7f (HEAD -> main)
# Author: Your name <you@mail.com>
# Date:   Fri Jan 31 14:13:29 2022 +0300
#
#     Added a simple layout
```

Con `git log --oneline` se ve una versión corta: los primeros 7 caracteres del hash y el mensaje de cada commit.

```bash
git log --oneline
# 06c23bf (HEAD -> main) agregar encabezado
# d9aab83 agregar esqueleto html
```

---

## 6. ¿Qué es el hash de un commit?

El **hashing** convierte cualquier dato en un string único de una longitud fija. El hash de un commit es el string que identifica a ese commit; se calcula a partir de su información: cuándo se hizo, qué archivos y qué líneas cambiaron.

Git genera hashes para todo lo que se crea o se cambia y los guarda en la carpeta `.git`. Comparando hashes se pueden comparar commits, lo que ayuda a encontrar errores. Para referirse a un commit basta con sus primeros 7 caracteres.

---

## 7. ¿Para qué sirve git diff?

Muestra las líneas que cambiaron en los archivos.

- `git diff`: muestra los cambios que **todavía no están en staging**.
- `git diff --staged`: muestra los cambios que **ya están en staging** y entrarán en el próximo commit.

En el resultado, `+` indica una línea agregada y `-` una línea eliminada:

```bash
git diff
#     <body>
# +     <h1>Texto de comparación</h1>
#     </body>
```

---

## 8. ¿Cómo comparo dos commits?

Con `git diff` seguido de los dos hashes. El primero es la referencia de la comparación, así que el orden cambia el resultado:

```bash
git diff d9aab83 06c23bf
# +  <body>
# +    <h1>Texto de comparación</h1>
# +  </body>

git diff 06c23bf d9aab83
# -  <body>
# -    <h1>Texto de comparación</h1>
# -  </body>
```

---

## 9. ¿Cómo agrego algo que olvidé al último commit?

Con `git commit --amend`. En lugar de crear otro commit, reemplaza el último con los cambios nuevos (y, si quiero, con otro mensaje). Así el historial no se llena de commits innecesarios.

```bash
git add -A
git commit --amend -m "agrega index.html con una estructura básica"
```

Cuidado: `--amend` cambia el historial. Si ese commit ya se había subido a GitHub, `git push` dará error y habría que forzarlo con `git push -f`. Forzar el envío solo es aceptable si nadie más trabaja en el repositorio; en equipo hay que evitarlo.

---

## 10. ¿Qué hace git reset HEAD?

Saca del área de staging los archivos que agregué con `git add`, **sin cambiar su contenido**. Sirve cuando agregué algo que no quería confirmar.

```bash
touch index2.html
git add -A
git status
# Changes to be committed:
#   new file:   index2.html

git reset HEAD
git status
# Untracked files:
#   index2.html
```

---

## 11. ¿Qué hace git reset --hard HEAD?

Reemplaza los archivos modificados por su versión del último commit (HEAD). **Se pierden todos los cambios que no estén confirmados**, así que hay que usarlo con mucho cuidado.

---

## 12. ¿Cómo vuelvo a un commit anterior?

Con `git reset` y el hash del commit:

- `git reset hash`: ese commit pasa a ser el último de la rama y los cambios posteriores **se conservan** en el directorio de trabajo.
- `git reset --hard hash`: ese commit pasa a ser el último y los cambios posteriores **se borran**.

```bash
git log --oneline
# 8dec4cf (HEAD -> main) Se han agregado estilos
# bc73f5f Se ha agregado otro encabezado

git reset bc73f5f          # conserva los cambios
git reset --hard bc73f5f   # borra los cambios
```

Los dos cambian el historial de la rama.

---

## 13. ¿Qué es git revert?

Es otra forma de deshacer cambios que **no modifica el historial**: crea un commit nuevo con el cambio opuesto al que se quiere deshacer. Es más seguro cuando otras personas trabajan en la misma rama.

---

## 14. ¿Qué es la carpeta .git?

Es una carpeta oculta que aparece al inicializar un repositorio con `git init`. Allí Git guarda todo el historial del proyecto. **Si se borra, se pierde el historial.**

---

## 15. ¿Qué es HEAD?

Es un puntero al commit y a la rama en la que estoy trabajando. El archivo `.git/HEAD` apunta a la rama actual, y el archivo de esa rama contiene el hash de su último commit:

```bash
cd .git/
cat HEAD
# ref: refs/heads/main

cat refs/heads/main
# 7d242e2e998b8a8165f9cec4e0cd06b870dcf65c
```

Cada vez que hago un commit, Git actualiza esa referencia.

---

## 16. ¿Qué es una rama y para qué sirve?

Una rama es una versión aislada del proyecto donde puedo hacer commits sin afectar a las demás.

- En equipo, cada persona trabaja en su propia rama sin molestar a las otras.
- Aunque trabaje una sola persona, también conviene: cada característica nueva se hace en una rama y, al terminar, se fusiona con `main`. Así siempre hay una versión estable.

La rama principal se llama **main**: guarda la versión final del código, la que ven los usuarios. Se crea automáticamente con el primer commit del repositorio.

---

## 17. ¿Cómo veo las ramas y sé en cuál estoy?

Con `git branch`. El asterisco marca la rama actual:

```bash
git branch
#   feature/header
# * main
```

Si la lista se abre en pantalla completa, se sale con **q**.

---

## 18. ¿Cómo creo una rama y me cambio a ella?

```bash
git branch feature/header      # crea la rama
git switch feature/header      # se cambia a la rama
git switch -c feature/header   # crea la rama y se cambia a ella
```

Los nombres de las ramas no pueden tener espacios.

---

## 19. ¿Qué diferencia hay entre git checkout, git switch y git restore?

`git checkout` hacía dos cosas distintas, así que se reemplazó por dos comandos más claros:

- `git switch nombre_rama`: cambia de rama (antes `git checkout nombre_rama`).
- `git restore ruta_archivo`: descarta los cambios no confirmados de un archivo y lo deja como en el último commit (antes `git checkout -- ruta_archivo`).

---

## 20. ¿Cómo debo nombrar una rama?

El nombre debe dejar claro qué se hace en ella:

- Una característica nueva empieza con `feature/`, por ejemplo `feature/header`.
- Una corrección de error empieza con `bugfix/`, por ejemplo `bugfix/horizontal-scroll`.

---

## 21. ¿Cómo fusiono una rama con main?

Primero me cambio a la rama de **destino** (la que recibe los cambios) y después uso `git merge` con el nombre de la rama que tiene los cambios:

```bash
git switch main
git merge feature/header
```

Git indica qué archivos y cuántas líneas cambiaron. Con `git log --oneline` se ve que los commits de `feature/header` ya están en `main`.

---

## 22. ¿Cómo elimino una rama?

Con `git branch -D nombre_rama`. No se puede borrar la rama en la que estoy, así que primero me cambio a otra:

```bash
git switch main
git branch -D feature/header
```

Es un buen hábito borrar las ramas que ya se fusionaron, para mantener el repositorio ordenado.

---

## 23. ¿Qué es una solicitud de extracción (pull request)?

Es una función de GitHub para proponer que los cambios de una rama se fusionen en otra (normalmente `main`). Permite que el equipo revise y comente el código antes de fusionarlo.

Contiene:

- **Título:** un resumen breve de los cambios.
- **Descripción (opcional):** una explicación más detallada.
- **Rama de origen:** donde está el código nuevo.
- **Rama de destino:** donde se quieren incorporar los cambios, normalmente `main`.

Puede terminar de dos formas:

- **Fusión:** los cambios se aprueban y se incorporan a la rama de destino.
- **Cierre:** los cambios no se aprueban y la solicitud se cierra.

---

## 24. ¿Cómo creo una pull request en GitHub?

1. En el repositorio, abro la pestaña **Pull requests** y hago clic en **New pull request**.
2. Elijo las ramas: la de la izquierda es la de **destino** y la de la derecha, la de **origen**. GitHub muestra los commits y las diferencias.
3. Hago clic en **Create pull request**, escribo el título y la descripción, y confirmo.

Si después subo más commits a la rama de origen, se agregan solos a la pull request. Al aprobarla, se puede fusionar con la opción por defecto, **Create a merge commit**.

Atajo: cuando subo cambios a una rama que no es la principal, GitHub muestra un botón **Compare & pull request** que abre el formulario con las ramas ya elegidas.
