import { Information } from "../interfaces/InformationDisplay";

export const sidebarLinks = [
  {
    text: "Resumen",
    to: "/",
  },
  {
    text: "Uso de la API",
    to: "/usage",
  },
  {
    text: "Arquitectura",
    to: "/architecture",
  },
  {
    text: "Despliegue",
    to: "/deploy",
  },
  // {
  //   text: "Frontend",
  //   to: "/front",
  // },
  // {
  //   text: "Posibles adiciones",
  //   to: "/future",
  // },
  { text: "Repositorio", to: "https://github.com/DEadMan10sds/TSExpress" },
  {
    text: "Requerimientos & Prueba técnica",
    to: "https://gist.github.com/fabianmedina09/db94a7a4c30c0218976d708a5e6833e7#buenas-pr%C3%A1cticas-nice-to-have",
  },
];

const home: Information[] = [
  {
    title: "Descripción general",
    content: [
      {
        paragraph:
          "Este es un servidor monolítico backend desarrollado en NodeJs con typescript. Los principales módulos son Express y el driver shell de mongodb, dicho servidor ha sido diseñado para la prueba técnica con fecha de entrega a más tardar de 02/04/2024.",
      },
      {
        paragraph:
          "En otras palabras, esta es una API básica que consume datos de una base de datos de Mongo (actualmente consume 2 colecciones) usando su controlador oficial para NodeJs, implementa buenas prácticas de clean code, reuso de código, naming conventions y logs.",
      },
    ],
  },
  {
    title: "Solicitudes",
    content: [
      {
        paragraph:
          "Para el consumo de las tablas de mongodb se implementó un CRUD para cada una de ellas, con la adición de una solicitud de tipo DELETE que permite hacer un 'soft delete' de un documento consultado, en otras palabras, lo desactivará. Dicha desactivación causará que el documento no se encuentre en búsquedas generales, sino que se tendrá que buscar haciendo una query especial (para incluir a todos los documentos desactivados) o bien buscar el documento por su Id de mongo, esto nos permite hacer uso de la solicitud de tipo PUT para actualizar el documento seleccionado y reactivarlo.",
      },
    ],
  },
  {
    title: "Respuestas",
    content: [
      {
        paragraph:
          "Cada respuesta tienen una estructura específica, además del código de respuesta, se implementa un json para dar más información sobre la situación de la solicitud, además de que hay 2 campos extra, el campo 'DATA' que permite regresar la información solicitada y que se encontró, y el campo 'ERROR', que permite detallar el error al que se haya llegado ya sea por:",
        list: ["Limitantes de la API", "Error de la base de datos"],
      },
      {
        paragraph:
          "Además de devolver el error en la solicitud, se guarda un log en la consola del servidor para poder recuperar aún más detalles o una versión más 'cruda' de dicho error, gracias a esto podemos tener un gran control e información de las cosas que se pueden mejorar y de los casos de uso que hay que considerar para una futura versión de la misma API.",
      },
    ],
  },
  {
    title: "Despliegue",
    content: [
      {
        paragraph:
          "El despliegue se hizo con la capa gratuita de la plataforma 'Render', la cual permite crear la build de producción y ejecutarla, además dado que en el repositorio también se encuentra el servidor de desarrollo del frontend (donde usted se encuentra leyendo esta documentación) es posible generar también la build del frontend para ser almacenada en la carpeta 'public' de la API y que sea retornada en cualquier solicitud 404 con su correspondiente status",
      },
    ],
  },
];

const usage: Information[] = [
  {
    title: "La API",
    content: [
      {
        paragraph:
          "El link principal de la api es: 'https://tsexpress.onrender.com', aquí podremos acceder y encadenar las solicitudes y rutas que nos permite el servidor backend.",
      },
      {
        paragraph:
          "Gracias a la arquitectura y naturaleza de la API, se puede hacer uso de ella de manera modular independientemente del frontend que se tenga, es decir, la podemos acoplar a cualquier framework de frontend que necesitemos o elijamos, ya que, para hacer uso de la API, solo tenemos que conocer las URL y queries posibles para manejar y adminstrar la información que se almacene",
      },
      {
        paragraph:
          "Debido al tipo de proyecto, en este caso no se está estableciendo ninguna API KEY para controlar y manejar el uso de la API de manera púlbica, ya que no está destinada a un entorno de producción y de uso público.",
      },
    ],
  },
  {
    title: "Cómo hacer solicitudes",
    content: [
      {
        paragraph:
          "Al igual que muchas otras API's, para hacer solicitudes es tan sencillo como obtener el link 'https://tsexpress.onrender.com/api/' al cual podemos agregar la cadena que nos indique la colección o funcionalidades a las que queremos acceder: ",
        list: ["Articles", "Auth", "Users", "Health"],
      },
      {
        paragraph:
          "Esto para bien, manipular la información de la base de datos o tener acceso a dicha API mediante el sistema de sesión usando 'jsonwebtoken'.",
      },
    ],
  },
  {
    title: "Solicitudes a 'user' y 'articles'",
    content: [
      {
        paragraph:
          "Cómo se explica en el apartado de 'Arquitectura', la API maneja 2 colecciones, Usuarios y Artículos (que en este caso son independientes, aunque cabe notar que 'articles' requiere que el usuario tenga su sesión iniciada), para ambas colecciones se tienen las operaciones básices de un CRUD y se agregó una extra que permite hacer un 'soft delete' o en otras palabras, activar y desactivar algún documento, esto para tener un manejo más específico de la información",
      },
    ],
  },
  {
    title: "Queries aceptables en 'articles' y 'users'",
    content: [
      {
        paragraph: "",
      },
      {
        paragraph:
          "El servidor acepta todas las queries que maneja el driver de mongodb, tanto para ordenamiento, búsqueda específica y paginación, lo cual permite tener una gran flexibilidad al momento de hacer alguna consulta sin tener que hacer mucho manejo de dichas queries. A pesar de esto, para facilitar la paginación y el ordenamiento, hay que hacer cierto manejo de el objeto 'req.queries' que se recibe en el controlador de cada ruta.",
      },
      {
        paragraph:
          "Para esto se hace uso de un 'helper' que nos permite convertir las queries de ordenamiento de string (dado que ese es su tipo de dato natural recibido) a number, lo que permite ingresar la query directamente en los filtros de búsqueda de la colección.",
      },
      {
        paragraph:
          "Por ejemplo, una query aceptable de ordenamiento es: 'https://tsexpress.onrender.com/api/user/get/?name=1', dicha query nos retornará todos los usuarios ordenados por nombre de manera ascendente.",
      },
    ],
  },
  {
    title: "Paginación",
    content: [
      {
        paragraph:
          "Siguendo con las queries aceptables en las solicitudes de la API, tenemos 2 queries específicas que permiten hacer dicha paginación, estas son: ",
        list: ["limit", "start"],
      },
      {
        paragraph:
          "Dichas queries reciben ambos parámetros numéricos, los cuales permiten llamar a las funciones 'skip' y 'limit' del driver shell de mongodb para facilitar la paginación directamente desde la solicitud.",
      },
    ],
  },
  {
    title: "Queries por defecto",
    content: [
      {
        paragraph:
          "En cada solicitud de tipo GET se tiene un objeto que almacena una query por defecto, en dicho objeto se almacena principalmente la query que nos permite buscar todos los documentos que se encuentran 'activados' sin tener que estar estableciéndola constantemente y 'ensuciando' la url.",
      },
    ],
  },
  {
    title: "La ruta 'health'",
    content: [
      {
        paragraph:
          "La ruta 'https://tsexpress.onrender.com/health' nos permite hacer un chequeo rápido del estado de la API, es decir, si hacemos una solicitud de tipo 'GET' a dicha ruta, nos tiene que devolver un estado 200 (Ok) en caso de estar funcionando correctamente, de otra forma nos devolverá un estado de error.",
      },
    ],
  },
  {
    title: "Auth y el manejo de jsonwebtoken",
    content: [
      {
        paragraph:
          "Por otro lado, tenemos la ruta 'https://tsexpress.onrender.com/api/auth/login' la cual nos permite iniciar sesión en la API y generar un token para validar el acceso al conjunto completo de rutas de la colección 'Articles' y las rutas de los usuarios que los permiten: ",
        list: ["Editar", "Desactivar", "Eliminar"],
      },
      {
        paragraph:
          "Esto nos da la posibilidad de tener un mejor control de quién accede a qué funcionalidades de la API y qué accesos se les pueden dar.",
        // image: [
        //   {
        //     src: "/54693096.png",
        //     alt: "Logo for server",
        //   },
        // ],
      },
    ],
  },
];

const architecture: Information[] = [
  {
    title: "Paquetes y dependencias",
    content: [
      {
        paragraph: "Para esta API se está haciendo uso de los paquetes: ",
        list: [
          "bcrypt: Dicho paquete nos permite encriptar las contraseñas de los usuarios o cualquier dato que necesitemos proteger, ya que se estableció un sistema de sesiónes.",
          "cors: Este paquete nos facilita la implementación de precisamente los 'cors', a pesar de esto se desarrolló un middleware personalizado donde se pueden modificar y alterar el manejo de dichos 'cors' a placer del desarrollador, este middleware se encuentra en el archivo 'middlewares/corsHandler.ts'.",
          "dotenv: Hacer uso de variables de entonrno facilita mucho el manejo de información global como el puerto, la dirección de la base de datos, entre otros, precisamente este paquete implementa esta funcionalidad.",
          "express js: Para establecer directamente el servidor, los middlewares, rutas, puerto y conexión a la base de datos.",
          "express-validator: Habilita la validación de tipos de datos y campos al agregar el middleware 'check' en las rutas deseadas, permitiendo así tener una capa extra de seguridad y retornar un error si un dato es erróneo o faltante.",
          "jsonwebtoken: Nos permite crear un token cifrado que valida la existencia de un usuario y su sesión, se genera al iniciar sesión desde 'https://tsexpress.onrender.com/api/auth/login' y se tiene que agregar dicho token en el header 'x-Token' para el resto de solicitudes que lo requieran.",
          "mongodb: Siendo el driver (controlador) nativo para establecer la conexión a la base de datos y el manejo de la información para obtener, crear, actualizar y eliminar los documentos.",
        ],
      },
      {
        paragraph:
          "Por otro lado, tenemos las dependencias de desarrollo, las cuales nos permiten hacer uso de Typescript para tener un control más robusto de nuestro código, estás dependencias incluyen los @types de:",
        list: ["bcrypt", "cors", "express", "jsonwebtoken", "node"],
      },
      {
        paragraph:
          "Sin embargo, estas no son todas las dependencias de desarrollador requeridas, también tenemos las que permiten usar node con Typescript: ",
        list: ["ts-node", "typescript"],
      },
    ],
  },
  {
    title: "Arquitectura",
    content: [
      {
        paragraph:
          "La arquitectura principal de la API es un sistema monolítico que se conecta a una base de datos descentralizada, siendo monolítico ya que almacena tanto la build del frontend como la build del propio servidor, el único elemento 'externo' es la ya mencionada base de datos, la cual en este caso es un clúster proporcionado por mongodb.",
      },
      {
        paragraph:
          "El servidor hace uso de la clase 'Server', la cual almacena toda la información básica de nuestra API, sus middlewares y cómo se instancia, permitiendo un escalado horizontal en caso de ser necesario.",
        image: [
          {
            src: "/serverClass.png",
            alt: "Server",
          },
        ],
      },
    ],
  },
  {
    title: "Inicialización",
    content: [
      {
        paragraph:
          "Para instanciar el servidor es tan fácil como mandar llamar la clase con su constructor, guardar dicha instancia en una variable y mandar llamar el método 'listen' como se muestra en la imagen:",
        image: [
          {
            src: "/serverInstance.png",
            alt: "Server instance example",
          },
        ],
      },
      {
        paragraph:
          "Esto nos permite que en caso de que queramos hacer un escalado horizontal, podemos añadir el como parámetro del constructor el puerto que tomará el servidor y hacer N instancias que necesitemos dentronde un mismo servidor, de igual manera se pueden instanciar diversos servidores en alguna plataforma que permita esto como lo puede ser Kubernetes.",
      },
    ],
  },
  {
    title: "Base de datos",
    content: [
      {
        paragraph:
          "Como se ha mencionado a lo largo de la documentación, se hace uso de la base de datos mongo a través de su driver nativo para nodejs, establecemos dicha conexión en el middleware 'database', lo que nos permite modificarla dependiendo de nuestras necesidades.",
        image: [
          {
            src: "/dbConnection.png",
            alt: "Conexión a la base de datos",
          },
        ],
      },
      {
        paragraph:
          "La conexión se establece dentro de un trycatch (para poder registrar todos los errores que lleguen a suceder), este middleware nos permite exportar una variable de tipo 'DB', con la cual posteriormente se establece un objeto de colecciones, donde se almacena el conjunto de colecciones de la base de datos, esto para no instanciar constantemente la conección a dichas colecciones y así reusar los elementos del servidor. ",
        image: [
          {
            src: "/collectionGroup.png",
            alt: "Colecciones de la base de datos",
          },
        ],
      },
    ],
  },
  {
    title: "Validators",
    content: [
      {
        paragraph:
          "Como se podrá notar al iniciar el servidor y al leer la conexión a la base de datos, se puede elegir la aplicación de un conjunto de 'validators' o validadores, estos nos permiten definir la estructura que queremos que tenga cada documento dentro de las colecciones en la base de datos, a pesar de que esto puede generar contradicción con la flexibilidad de mongodb (que permite almacenar documentos con distinto formato y atributos dentro de una misma colección) nos da una capa extra de seguridad al darnos la confianza de limitar cómo se guarda la información.",
      },
      {
        paragraph:
          "Los validadores se aplican de una manera especial, empezando con que se obtiene su aplicación (es decir, si se establecerán o no) desde una variable de entorno, posteriormente se generará un objeto que almacena los validadores de cada colección si están activos o un validador por defecto (sin ningún tipo de restricción) en caso de que no se activen.",
        image: [
          {
            src: "/validators.png",
            alt: "Validators Object",
          },
        ],
      },
      {
        paragraph:
          "Posteriormente se hace un recorre dicho objeto para verificar si la colección a la que se quiere aplicar cada validador existe, en caso de hacerlo sobreescribe los validadores (con el validador especificado en el objeto principal) o en su defecto, crea la colección y establece dicho validador.",
        image: [
          {
            src: "/applicationOfValidatiors.png",
            alt: "Ciclo para aplicar validadores",
          },
        ],
      },
    ],
  },
  {
    title: "Secciones",
    content: [
      {
        paragraph:
          "Para cada sección de la API, se generó un router o 'subdominio' específico donde se definen todas las rutass a las que se pueden acceder, su tipo de solicitud y el controlador que les pertenece, esto nos da la posiblidada de incrementar la cantidad de secciones que se pueden tener el el servidor ya que cada una es independiente de las demás (llegando a recordar la arquitectura de microservicios pero manteniendo una sola base de datos).",
      },
    ],
  },
  {
    title: "Enrutamiento",
    content: [
      {
        paragraph:
          "Además de establecer una instancia del router que proporciona express y definir el tipo de solicitud que se requiere para cada ruta, se tienen 3 partes igualmente importantes para un buen funcionamiento:",
        list: [
          "Dirección: 'Subdominio al que consultar'.",
          "Middlewares: Se usa el 'Check' del paquete express-validator y 2 middlewares personalizados en los que se recolectan los errores de dicho 'check' y se valida el jwt de la sesión del usuario para darle acceso.",
          "Controller: El controlador es todo el manejo de la lógica, se mantiene separado para tener un código más limpio y se importa dentro de un objeto con el mismo nombre de la sección para mantener orden y consistencia.",
        ],
        image: [
          {
            src: "/route.png",
            alt: "Graphic route syntax",
          },
          {
            src: "/routeCode.png",
            alt: "Route code",
          },
        ],
      },
      {
        paragraph:
          "Con el router ya instanciado, se exporta y se incorpora junto a su 'ruta madre' dentro de la clase Server que conocimos al inicio de la sección:",
        image: [
          {
            src: "/routeImplementation.png",
            alt: "Route Implementation",
          },
          {
            src: "/routePaths.png",
            alt: "Route Paths",
          },
        ],
      },
    ],
  },
  {
    title: "Middlewares de rutas",
    content: [
      {
        paragraph:
          "Profundizando un poco más en los middlewares de las rutas, se implementan para hacer una validación extra a los tipos de datos que queremos guardar en la base de datos, esto usando la functión 'check' que nos proporciona 'express-validator', donde podemos especificar el campo que queremos verificar (así se encuentre tanto en el body o en los params de la request/solicitud) y el cual nos permite encadenar la validación con funciones como pueden ser:",
        list: [
          "notEmpty: Establece un campo obligatorio",
          "isString: Valida que el dato sea de tipo string",
          "optional: Establece que el dato es opcional",
          "isMongoId: Valida que sea un id de móngo válido",
          "withMessage: Permite establecer un mensaje personalizado para cada validación en caso de que no se cumpla",
          "isEmail: Fuerza el campo a tener el formato de un correo electrónico",
        ],
      },
      {
        paragraph:
          "Dichas validaciones son solo un ejemplo, ya que se pueden agregar muchas más dependiendo de nuestras necesidadades, además de que en este caso se implementaron 2 middlewares personalizados para hacer más robusta la API:",
        list: ["validateJWT", "validateFields"],
      },
    ],
  },
  {
    title: "Validate JWT",
    content: [
      {
        paragraph:
          "Este middleware personalizado nos permite acceder al header 'x-Token' si existe en la solicitud para verificar la autorización de la sesión ya que, en caso de que exista, se decodificará y nos dejará libre la información básica del usuario como su Id de mongo con el cual haremos una búsqueda en la base de datos para verificar que existe el usuario y no estamos sufriendo algún tipo de ataque. En caso de que la solicitud no cuente con el header, el jwt no se decodifique de manera correcta o el usuario no exista, se retornará un error.",
        image: [
          {
            src: "/validateJTW.png",
            alt: "Validate JWT",
          },
        ],
      },
    ],
  },
  {
    title: "validate Fields",
    content: [
      {
        paragraph:
          "El segundo middleware personalizado que se tiene es 'validateFields' el cual es relativamente más sencillo, ya que simplmente revisa los errores que guarda la función 'check' que vimos anteriormente y, en caso de que exista al menos 1 error retornar la solicitud con un código de error y el mensaje correspondiente, si no encuentra ningún error (es decir que los datos cumplen con las validaciones) la solicitud avanza al controlador.",
        image: [
          {
            src: "/validateFields.png",
            alt: "Validation of fields",
          },
        ],
      },
    ],
  },
];

const deploy: Information[] = [
  {
    title: "Despliegues",
    content: [],
  },
];

const front: Information[] = [
  {
    title: "Front",
    content: [],
  },
];

export const content = {
  home,
  usage,
  architecture,
  deploy,
  front,
};
