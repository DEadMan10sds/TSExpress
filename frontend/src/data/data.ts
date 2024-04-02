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
    text: "Frontend",
    to: "/front",
  },
  {
    text: "Despliegue",
    to: "/deploy",
  },
  {
    text: "Posibles adiciones",
    to: "/future",
  },
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
          "La ruta 'https://tsexpress.onrender.com/api/health' nos permite hacer un chequeo rápido del estado de la API, es decir, si hacemos una solicitud de tipo 'GET' a dicha ruta, nos tiene que devolver un estado 200 (Ok) en caso de estar funcionando correctamente, de otra forma nos devolverá un estado de error.",
      },
    ],
  },
  {
    title: "Auth y el manejo de jsonwebtoken",
    content: [
      {
        paragraph:
          "Por otro lado, tenemos la ruta 'https://tsexpress.onrender.com/api/login' la cual nos permite iniciar sesión en la API y generar un token para validar el acceso al conjunto completo de rutas de la colección 'Articles' y las rutas de los usuarios que los permiten: ",
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
    title: "Arquitectura",
    content: [],
  },
];

const front: Information[] = [
  {
    title: "Front",
    content: [],
  },
];

const deploy: Information[] = [
  {
    title: "Despliegues",
    content: [],
  },
];

export const content = {
  home,
  usage,
  architecture,
  front,
  deploy,
};
