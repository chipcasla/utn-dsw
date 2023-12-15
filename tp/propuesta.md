# Propuesta TP DSW

## Grupo
### Integrantes
* Foresi, Alejandro
* Pecoraro, Lucio
* Berto, Leandro

### Repositorios
* [frontend app](http://hyperlinkToGihubOrGitlab)
* [backend app](http://hyperlinkToGihubOrGitlab)


## Sistema de gestión de reservas de restaurantes
### Descripción
Los clientes realizan reservas a través del sistema. Se registran en el sistema o, si ya estan reigstrados, se loguean ingresando datos personales y contraseña
Una vez logueados, seleccionan la fecha y hora deseadas y se verifica si hay mesas disponibles en el momento solicitado, confirmando o rechazando la reserva.
La administración interna permite gestionar las reservaciones existentes y modificarlas según sea necesario, además de poder registrar la llegada del cliente para evaluar cuantas reservas son incumplidas. También pueden cargar los platos disponibles, los cuales podrán visualizar los clientes.
Además, un cliente puede realizar una reseña del restaurante y a su vez ver las reseñas de otros clientes, asi como también puede borrar su reseña si lo desea.

### Modelo
![image](https://github.com/chipcasla/utn-dsw/assets/103225088/4d914c56-42f3-43b8-a108-c83608c64877)


## Alcance Funcional 

### Alcance Mínimo

Regularidad:
|Req|Detalle|
|:-|:-|
|CRUD simple|1. CRUD Plato<br>2. CRUD Cliente<br>3. CRUD Mesa|
|CRUD dependiente|1. CRUD Reseña {depende de} CRUD Cliente<br>2. CRUD Reserva {depende de} CRUD Cliente y CRUD Mesa|
|Listado<br>+<br>detalle|1. Lista de reservas filtrado por estado, muestra datos de reserva=> detalles completos de cliente.<br> 2. Listado de mesas filtrado disponibilidad, muestra id y ubicacion
|CUU/Epic|1. Reservar una mesa en el restaurante(cliente)<br>2. Realizar el registro de cumplimiento de una reserva(restaurante)|

Adicionales para Aprobación
|Req|Detalle|
|:-|:-|
|CRUD |1. CRUD Categoría<br>2. CRUD Cliente<br>3. CRUD Localidad<br>4. CRUD Provincia<br>5. CRUD Mesa<br>6. CRUD Restaurante<br>7. CRUD Reseña<br>7. CRUD Menu|
|CUU/Epic|1. Reservar una mesa en un restaurante<br>2. Realizar el registro de cumplimiento de una reserva<br>3. Realizar reseña de restaurante(cliente)|


### Alcance Adicional Voluntario

|Req|Detalle|
|:-|:-|
|CRUD |1. CRUD Promociones |
|Listados | 1. Listado con promociones o descuentos disponibles en un momento dado de restaurantes.<br>2. Un listado especial para identificar a aquellos clientes que visitan regularmente el restaurante o gastan una cantidad significativa.<br>3. Reservas filtradas por cliente muestra datos del cliente y de cada reserve fechas, estado, cantidad de personas|
|CUU/Epic|1. Realizar reserva de evento especial (aniversario,cumpleaños,etc)(cliente)<br>2. Cancelación de reserva|
|Otros|1. Envío de confirmacion/recordatorio de reserva por email|

