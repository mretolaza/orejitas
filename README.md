# Proyecto 2: Juego de Cartas de Orejitas
## Información
- Curso: Redes
- Sección: 20
- Catedrático: Jorge Yass

## Autores
|      Nombre     | Carnet |
|:---------------:|:------:|
| André Rodríguez |  18332 |
|   Cesar Rodas   |  16776 |
|  Maria Retolaza |  16339 |

## Instalación y levantamiento del proyecto
Requisitos:
- Node: 14.15.0
- Npm: 6.14.8
- Angular: 11.0.5
- Nodemon: 2.0.12

### Clonación del repo
Abrimos la terminal.
Ejecutar el siguiente comando:  
Github CLI:
```
gh repo clone mretolaza/shine-server
```
SSH:  
```
git@github.com:mretolaza/shine-server.git
```
HTTPS:
```
https://github.com/mretolaza/shine-server.git
```

Luego para acceder a la carpeta:
```
cd shine-server
```

### Server del Juego
Luego de clonar el repositorio y acceder a la carpeta principal procedemos a la configuración del server.  
Ejecutamos el siguiente comando para acceder a la carpeta del server:
```
cd shine-server
```

Luego de cumplir los requisitos de las herramientas se instala los paquetes requeridos.  
Ejecutamos el siguiente comando:

```
npm install
```

Teniendo instalado los paquetes requeridos por el server y nodemon procedemos a correr el servidor.  
Ejecutamos el siguiente comando:

```
nodemon app.js
```

### Cliente del juego
Luego abrimos otra terminal y nos dirigimos a la carpeta del repo. Luego nos dirigimos a la carpeta del cliente ejecutando el siguiente comando:
```
cd shine-client
```

Luego de cumplir los requisitos de las herramientas se instala los paquetes requeridos.  
Ejecutamos el siguiente comando:

```
npm install
```

Teniendo todo instalado corremmos el cliente.
Ejecutamos el siguiente comando:

```
ng serve -o
```

<strong> A disfrutar del juego! </strong>

## Reglas del Juego

<strong>¿Cómo se juega OREJITAS?</strong> 

- Cuando ingresen todos los jugadores que tiene permitido la sala, entonces se realizará el reparto de cartas. 

- Cada jugador recibirá <strong>5 cartas</strong>. Si juegan el máximo de jugadores permitido (7) entonces la mesa se quedará con 17 cartas para su interacción a lo largo del juego 

- Se seleccionar de forma <strong>aleatoria</strong> al primer jugador. Dicho jugador, establece la <strong>figura</strong> con la cual iniciará el juego. 

- Todos los jugadores deberán de colocar una carta de <strong>la misma figura</strong> para poder realizar una jugada correcta 

<strong>Modo: Cambio de JUEGO</strong> 

- Para poder realizar un cambio de juego, deberá de lanzar una carta con <strong>la misma figura</strong> del juego actual y deberá de seleccionar <strong>dentro de su mano</strong> una carta que sea mayor a la carta del jugador. 

- Los jugadores deberán de elegir una carta de la figura que marca el <strong>nuevo juego</strong> 

<strong>Seleccionar cartas de la MESA</strong>

- Si no tienes dentro de tu mano una carta de la <strong>misma figura</strong> que la carta que se encuentra en juego, podrás agarrar de la mesa hasta obtener una carta correcta. 

- Si la mesa se queda con <strong>0 cartas</strong> entonces TERMINA EL JUEGO 

<strong>¿Quién es el GANADOR?</strong>

- El primer jugador que tenga <strong>0 cartas</strong> en su mano GANA 
- El jugador con la menor cantidad de cartas, si y solo sí, la mesa del juego se queda sin cartas para continuar
Proyecto 2 - Redes 
