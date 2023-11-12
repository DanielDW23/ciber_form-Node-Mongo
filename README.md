# PROYECTO DESARROLLO SEGURO 🛡️ 

## Descripción

Tras realizar la auditoría de seguridad correspondiente sobre la web **`rovikron.web.app`** se debe realizar una propuesta de mejora en la seguridad del envío del formulario. Para esto, se deberá diseñar una aplicación web que tenga un formulario de acceso público, la misma deberá contar con un perfil de administrador y otro de usuario. Estos últimos, serán los únicos que podrán loguearse en la plataforma. 

Se debe realizar una propuesta de securitizaciones a implementar tanto del lado del cliente como del lado del servidor.

Se debe entregar una solución que aporte lo siguiente:

### CLIENTE:

1- Se debe desarrollar un clon de la página de contacto de rovikron utilizando React Js.

Se debe implementar: 
- ReCaptcha de Google para el formulario. :heavy_check_mark:
- Implementar 2 campos ocultos en el formulario. :heavy_check_mark:
- Sistema de validación del lado del cliente para validar que los campos tienen las dimensiones y el formato correcto:
  
  - **Email:** formato email maximo 100 caracteres,  required,trim,lawurcase, maxleth 100 caracteres, validate con validator :heavy_check_mark:
  - **name:** required,trim,lawurcase, maxleth 80 caracteres, validate con validatoro , solo se permiten letras :heavy_check_mark:
  - **subject:** required,trim,lawurcase, maxleth, validate con validator :heavy_check_mark:
,maxleth 120 caracteres ,solo se permiten letras :heavy_check_mark:
  - **message:**  required,trim,lawurcase, maxleth, validate con validator
,maxlethmaxleth 400 caracteres máximo ,solo se permiten letras :heavy_check_mark:

- Sistema de validación del lado del cliente para protegernos contra Xss y bots.
  - Validar todos los datos de los diferentes campos escapando las cadenas tipicas utilizadas en Xss e impedir el envío de los campos al servidor. :heavy_check_mark:
  - Comprobar si los campos ocultos han sido cumplimentados e impedir el envío del formulario al servidor para detectar posibles bots.:heavy_check_mark:


2- Se debe crear un panel de administración para acceder a los registros del formulario.

- Existirá una ruta de admin con un login que dará acceso al panel de control. :heavy_check_mark:
- Existirán 2 tipos de usuarios Admin y User 
  - Admin podrá realizar el crud de los usuarios :heavy_check_mark:
  - User podrá realizar la visualización de los registros almacenados en la bbdd :heavy_check_mark:
  - Se debe Realizar en React utilizando rutas protegidas y un sistema de roles.Auth context. :heavy_check_mark:

### SERVIDOR:
	
Se utilizará Node.js

Se debe implementar: 

- Formulario: 
  - Ruta y controlador para almacenar los datos de contacto de los usuarios que cumplimentan el formulario. :heavy_check_mark:
  - Se debe utilizar un ORM para la gestión con la BBDD que podrá ser mongo o cualquiera sql :heavy_check_mark:
  - Se debe validar los campos que vienen del formulario aplicando filtros contra XSS y contra posibles Sqli. Se debe validar que los campos ocultos del formulario no estén cumplimentados devolviendo un error 500 si es necesario. :heavy_check_mark:
  - Se debe aplicar un middleware en la ruta contra posibles ataques de fuerza bruta utilizando la librería express-rate-limit redis limitando el número de peticiones aceptadas por ip en este caso 2. :heavy_check_mark:
https://medium.com/gitconnected/prevent-brute-force-attacks-in-node-js-419367ae35e6
	
- Crud administración: 
  - Rutas para login(email , password)  con 2 roles diferentes admin y user. Se debe implementar JWT para el sistema de login guardando id usuario role y nombre, fecha de expiración. :heavy_check_mark:
  - El admin será único y generado directamente en bbdd. :heavy_check_mark:
  - Rutas para crear editar y eliminar usuarios se deberá validar mediante middleware que el usuario tiene rol admin. :heavy_check_mark:
  - Ruta consulta de registros se deberá validar mediante middleware que el usuario tiene rol usuario. :heavy_check_mark:
  - Todos los usuarios tendrán id nombre apellidos rol email nombre usuario. :heavy_check_mark:
  - Se deberá aplicar hash en las contraseñas para su cifrado. :heavy_check_mark:
  - Se debe aplicar un middleware en la ruta contra posibles ataques de fuerza bruta utilizando la librería express-rate-limit limitando el número de intentos de inicio de sesión aceptadas por ip en este caso 5. :heavy_check_mark:
https://medium.com/gitconnected/prevent-brute-force-attacks-in-node-js-419367ae35e6

## Tecnologías 

 <p align="center">
 <img src= "https://github.com/DanielDW23/ciber_form-Node-Mongo/assets/126791645/e60f6479-d352-408d-94f4-7d6766e79d57" width="200"></img>
 <img src= "https://github.com/DanielDW23/ciber_form-Node-Mongo/assets/126791645/1d8263f2-bc1f-4ee6-8731-d3c3b0f9b964" width="200"></img>
 <img src= "https://github.com/DanielDW23/ciber_form-Node-Mongo/assets/126791645/00386a29-8764-46ac-a8c6-81d7e3da1b75" width="200"></img>
 </p>


## Capturas de pantalla

  ### WEB
  
  <p align="center" >
 <img src="https://github.com/DanielDW23/ciber_form-Node-Mongo/assets/126791645/18c00e50-6580-49e8-95e1-54a060fbcb1d" width="750" />
 <img src="https://github.com/DanielDW23/ciber_form-Node-Mongo/assets/126791645/947e5379-a08e-4e50-8a71-a6cd18e03215" width="750" />
 <img src="https://github.com/DanielDW23/ciber_form-Node-Mongo/assets/126791645/d53984d5-2709-4f19-9c02-b801f7e059cb" width="750" />
 <img src="https://github.com/DanielDW23/ciber_form-Node-Mongo/assets/126791645/91cd33b2-6e5f-4c54-94b5-9e73a77279ba" width="750" />
    
  <img src="https://github.com/DanielDW23/ciber_form-Node-Mongo/assets/126791645/61aaee83-887e-4d7b-874d-c5a6a443a634" width="270" />
 <img src="https://github.com/DanielDW23/ciber_form-Node-Mongo/assets/126791645/09d80985-bf93-40e1-9904-783ee5c30fcc" width="270" />
 <img src="https://github.com/DanielDW23/ciber_form-Node-Mongo/assets/126791645/bd89d1fb-451e-4c58-9de3-aeb469b29c43" width="270" />

</p>
