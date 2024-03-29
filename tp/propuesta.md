# Propuesta TP DSW

## Grupo
### Integrantes
* Foresi, Alejandro
* Pecoraro, Lucio. Legajo: 50239
* Berto, Leandro. Legajo: 45368

### Repositorios
* [frontend app](https://github.com/chipcasla/utn-dsw/tree/main/frontend)
* [backend app](https://github.com/chipcasla/utn-dsw/tree/main/api-express)


## Sistema de gestión de reservas de restaurantes
### Descripción
Los clientes realizan reservas a través del sistema. Se registran en el sistema o, si ya estan reigstrados, se loguean ingresando datos personales y contraseña
Una vez logueados, seleccionan la fecha y hora deseadas y se verifica si hay mesas disponibles en el momento solicitado, confirmando o rechazando la reserva.
La administración interna permite gestionar las reservaciones existentes y modificarlas según sea necesario, además de poder registrar la llegada del cliente para evaluar cuantas reservas son incumplidas. También pueden cargar los platos disponibles, los cuales podrán visualizar los clientes.
Además, un cliente puede realizar una reseña del restaurante y a su vez ver las reseñas de otros clientes, asi como también puede borrar su reseña si lo desea.

### Modelo
![image](https://github.com/chipcasla/utn-dsw/blob/main/Diagrama%20dsw.drawio.png)

### Reglas de negocio
1. Los usuarios se registran mediante su dni y se les asigna un id
2. Una persona puede ser de tipo "usuario" o "adimnistrador"
3. Un usuario puede realizar una reseña del restaurante, con un puntaje entre 1 y 5
4. Se considera que una mesa esta disponible cuando, en el momento indicado, no tiene reservas o sólo tiene reservas canceladas
5. Los platos se clasifican en categorías
6. Las mesas tienen dos ubicaciones posibles: afuera y adentro

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
|CRUD |1. CRUD Categoría<br>2. CRUD Cliente<br>3. CRUD Mesa<br>4.. CRUD Restaurante<br>5.. CRUD Reseña|
|CUU/Epic|1. Reservar una mesa en un restaurante<br>2. Realizar el registro de cumplimiento de una reserva<br>3. Realizar reseña de restaurante(cliente)|


### Alcance Adicional Voluntario

|Req|Detalle|
|:-|:-|
|Listados | 1. Reservas filtradas por estado<br> 2. Platos filtrados por categoría |
|CUU/Epic|1. Cancelación de reserva|
|Otros|1. Manejo de archivos de imagenes de platos|

