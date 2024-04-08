# Prueba Técnica Mango

Este repositorio contiene la solución a una prueba técnica realizada como parte del proceso de selección de Mango.

## Descripción del Proyecto

El proyecto consiste en desarrollar un custom slider con react. 

## Tecnologías Utilizadas

- Typescript
- React
- CSS

## Instrucciones de Uso

1. Clona el repositorio.
2. Escribe en la terminal npm i para instalar las dependencias necesarias
3. Levanta el mock server con npm run mock:server
4. Levante el cliente con npm run start
5. Lanza los test con npm run test
6. Ve al navegador y dirígete a http://localhost:8080/

## Herramientas utilizadas

1. Ningun uso de CLI: Uno de los primeros requisitos de esta prueba técnica era montar el proyecto desde cero, por tanto se ha montado con node, webpack y babel. Ninguna preconfiguración.
2. Uso de estilos: Se ha utilizado CSS para montar unos estilos básicos. 
3. Uso de Typescript: Se ha usado typescript ya que es una herramienta fundamental en cualquier aplicación actual de react.
4. Uso de Librerias Externas: React Query para la gestión del estado asíncrono del servidor o Json Server para montar un server mock son las más representativos.

## Objetivos

Mi foco en la realización de esta prueba ha sido centrarme en el clean code y en la separación de responsabilidades. 
He procurado darle a la aplicación una distribución de carpetas y archivos que sigan las buenas prácticas de desarrollo.

En lo relativo al componente Slider que es la base de esta prueba técnica, he procurado separar las capa de la lógica y la capa presentacional
con el objetivo de facilitar su legibilidad. He procurado cumplir todos los requerimientos que aparecían en los requisitos de la prueba así 
como facilitado una serie de tests utilizando jest y react testing library.

## Problemas

Mi principal problema en la prueba ha sido enfrentarme a montar el proyecto desde cero sin el habitual uso de algún CLI. Esto complica en gran 
medida la prueba pero también aporta valor el hecho de montarlo desde 0 y ver todas sus complicaciones. Otro de los retos que he encontrado
ha sido la gestión de eventos del raton para controlar el slider así como los eventos "touch" de dispositivos táctiles.
Por último, a la hora de realizar algunos test unitarios en el componente slider he encontrado problemas a la hora de simular con precisión
los eventos de drag. De hecho uno de los test (el número 4 falla por esto mismo).

## Mejoras

Si el tiempo lo hubiera permitido, habría hecho hincapié en:

- Aumentar el número de test unitarios. Además creo que añadir en este componente pruebas funcionales con Cypress sería conveniente dada la dificultad de gestionar eventos tan precisos como el drag del slider.
- Integrar algún servicio de mock api que no funcione únicamente en local
- Desplegar la aplicación en Vercel o en otro servicio similar.
- Dedicar mayor tiempo a los estilos, aplicar BEM con SAAS etc u otro sistema de organización de estilos. 

## Conclusiones

He disfrutado realizando la prueba técnica ya que he aprendido mucho a la hora de montar un componente tan complejo como es un slider desde cero. He necesitado investigar y comprender mejor diferentes eventos
así como a realizar los cáculos necesarios para el reposicionamiento de los thumbs. Sin duda ha sido una experiencia enriquecedora y me gustaría poder debatir más en detalle todo el desarrollo planteado.

Muchísimas gracias por vuestro tiempo.

