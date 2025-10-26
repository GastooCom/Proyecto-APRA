## Descripción de carpetas

### src/components/
Contiene los componentes de React como (Asistencia.jsx, cameracomponent.jsx, FormularioIniciarSesion.jsx, FormularioRegistrarse.jsx, Notificaciones.jsx, PaginaInicio.jsx, PermisoCamara.jsx, ProtectedRoute.jsx) que conforman las distintas secciones del proyecto, como formularios, páginas, permisos y notificaciones.

### src/context/
Incluye los contextos globales de la app, por ejemplo (AuthContext.jsx) para manejar autenticación o estados compartidos.

### src/css/
Archivos de estilos individuales para cada componente (Asistencia.css, FormularioIniciarSesion.css, FormularioRegistrarse.css, Notificaciones.css, PaginaInicio.css, PermisoCamara.css).

### src/firebase/
Configuración y conexión con (firebase.jsx) Firebase para el manejo de datos y autenticación.

### src/hooks/
Hooks personalizados de React que abstraen lógica específica del proyecto, como AltaAsistencia.jsx, BajaAsistencia.jsx, ModificarAsistencia.jsx useAsistencias.jsx, o useUsuario.jsx.

### src/Imagenes/
Contiene íconos y recursos visuales usados en la interfaz (Google.png, main.jpg, etc.).

### src/services/
Archivos encargados de la comunicación con APIs o servicios externos, como usuarioService.jsx.

## Archivos importantes

App.jsx: Componente principal de la aplicación.
index.js: Punto de entrada del proyecto.
package.json: Lista de dependencias y scripts.
README.md: Descripción general del proyecto.
estructura.md: Explica la arquitectura del proyecto.

---

## Tecnologías utilizadas

Tecnología Descripción 
React.js Biblioteca de JavaScript para construir interfaces de usuario dinámicas.
Firebase Plataforma de Google utilizada para autenticación, base de datos y hosting.
JavaScriptLenguaje principal utilizado en el desarrollo del proyecto.
CSS Lenguaje para dar estilo y diseño a los componentes y páginas.
Node.js / npm Entorno de ejecución y gestor de paquetes para dependencias del proyecto.
Git / GitHub Control de versiones y repositorio remoto para el desarrollo colaborativo.