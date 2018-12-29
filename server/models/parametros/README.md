# Modelos Axiliares
Carpeta con modelos auxiliares para entradas y salidas de información.
Estos modelos tienen el _dataSource_ como null

## De entrada:
### CredencialesAlumno:

Este modelo se utiliza para representar los valores de entrada para el logeo de los alumnos.

Su propiedad _public_ está puesta en true para evitar el mensaje: 
>Tratando el tipo remoto desconocido "CredencialesAlumno" como "any"

## De salida:
### Config

Modelo que representa al objeto config de SalidaAlumnos

Utilizado para mandar configuraciones especiales para la App móvil

- url_api
- url_base
- topic_general
- topic

### MateriaHorario

Modelo que representa los atributos de cada materia devuelta en SalidaHorario

### SalidaAlumnos:

Este modelo se utiliza para representar los valores de salida cuando el usuario se logea exitosamente

### SalidaHorario:

Modelo que representa los datos del horario ordenados por dia en arreglos de MateriaHorario

Este modelo contempla un horario de Lunes a Viernes
