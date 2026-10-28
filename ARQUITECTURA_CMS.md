# Especificación de arquitectura: Next.js + Sanity CMS

**Propósito:** establecer una arquitectura de contenido administrable
para un sitio web corporativo o de servicios. Este documento debe servir
como guía para construir el proyecto desde cero o adaptar una
implementación existente.

## 1. Objetivo general

Construir un sitio web con **Next.js como frontend** y **Sanity como CMS
headless**, donde una persona administradora pueda:

-   Crear páginas nuevas desde Sanity Studio sin crear manualmente una
    ruta de Next.js para cada página.
-   Editar el contenido de las páginas desde el CMS.
-   Componer cada página seleccionando bloques reutilizables
    disponibles.
-   Ordenar, agregar o quitar bloques según las necesidades de cada
    página.
-   Configurar campos SEO básicos por página.
-   Reutilizar componentes visuales existentes y mantener una
    implementación coherente.

La solución debe priorizar una arquitectura mantenible, escalable y de
bajo costo. No asumir que el proyecto debe rehacerse: si ya existe
código, primero analizarlo y adaptar lo necesario.

## 2. Principios obligatorios

1.  **Separación de responsabilidades**
    -   Sanity administra contenido, documentos, slugs y la composición
        de las páginas.
    -   Next.js resuelve rutas, consulta contenido y renderiza
        componentes.
    -   Los componentes React implementan la presentación y el
        comportamiento de cada bloque.
2.  **Páginas dinámicas**
    -   Utilizar un tipo de documento `page` para las páginas
        administrables.
    -   Cada página debe tener un `slug` único.
    -   Las páginas de contenido deben resolverse mediante una ruta
        dinámica de Next.js, por ejemplo `src/app/[slug]/page.tsx` si el
        proyecto usa App Router.
    -   La página de inicio (`/`) debe tener una resolución explícita y
        no depender de que la URL sea literalmente `/inicio`.
3.  **Bloques componibles**
    -   Cada página tendrá un campo `blocks` (o nombre equivalente,
        consistente en todo el proyecto) que permita seleccionar y
        ordenar bloques de una lista controlada.
    -   Los bloques deben ser objetos de contenido definidos en Sanity y
        estar asociados a componentes React conocidos.
    -   Una página podrá usar varios bloques del mismo tipo si el diseño
        lo permite.
    -   No es obligatorio que todas las páginas utilicen todos los
        bloques.
4.  **Diseño controlado por componentes**
    -   El CMS controla el contenido, el orden de los bloques y las
        variantes permitidas.
    -   Next.js controla la estructura visual, los estilos, la lógica y
        los componentes.
    -   No implementar un constructor visual ilimitado ni permitir que
        el CMS introduzca código arbitrario.
    -   Si se necesitan variantes (por ejemplo, un hero centrado o
        dividido), deben definirse explícitamente en el schema y
        soportarse en el componente correspondiente.
5.  **Reutilización**
    -   Los componentes deben poder reutilizarse en páginas diferentes.
    -   Evitar duplicar schemas, consultas, componentes o lógica de
        renderizado.
    -   Mantener una relación clara entre cada tipo de bloque de Sanity
        y su componente React.
6.  **Compatibilidad con el proyecto actual**
    -   Antes de cambiar archivos, inspeccionar la estructura,
        dependencias, rutas, schemas, consultas, estilos y componentes
        existentes.
    -   No reemplazar ni eliminar código funcional sin justificarlo.
    -   Aprovechar los componentes y patrones existentes cuando sean
        compatibles.
    -   Presentar un diagnóstico y un plan de adaptación antes de
        ejecutar cambios importantes.

## 3. Arquitectura esperada

Flujo de datos:

1.  La persona administradora crea o edita una página en Sanity Studio.
2.  Asigna un título, un slug, metadatos SEO y los bloques que necesita.
3.  Ordena los bloques en el CMS.
4.  Next.js consulta la página publicada por su slug.
5.  Un renderizador identifica el tipo de cada bloque.
6.  El renderizador muestra el componente React correspondiente con los
    datos recibidos.

Responsabilidades:

  -----------------------------------------------------------------------
  Capa                                Responsabilidad
  ----------------------------------- -----------------------------------
  Sanity schemas                      Definir campos, validaciones y
                                      tipos de contenido

  Sanity Studio                       Interfaz para crear y editar
                                      páginas y contenido

  Consultas GROQ                      Obtener páginas y sus datos
                                      relacionados

  Cliente de Sanity                   Configurar el acceso a la API del
                                      CMS

  Rutas Next.js                       Resolver la página de inicio y las
                                      páginas dinámicas

  Renderizador de bloques             Convertir cada tipo de bloque en su
                                      componente React

  Componentes React                   Implementar la presentación de cada
                                      bloque

  Estilos                             Mantener diseño responsive y
                                      coherencia visual
  -----------------------------------------------------------------------

Los nombres y ubicaciones concretas deben adaptarse a la estructura real
del repositorio; no imponer una reorganización innecesaria.

## 4. Modelo de contenido en Sanity

### 4.1 Documento `page`

Como mínimo, debe contemplar:

-   `title`: título interno o principal de la página.
-   `slug`: identificador único para la URL.
-   `seoTitle`: título para buscadores, opcional.
-   `seoDescription`: descripción SEO, opcional.
-   `blocks`: lista ordenable de bloques que componen el contenido de la
    página.

Evaluar si conviene añadir una imagen para compartir en redes
(`ogImage`), una opción de ocultar la página de buscadores (`noIndex`) o
campos de publicación adicionales. Evitar campos innecesarios.

### 4.2 Tipos de bloques

Diseñar schemas reutilizables para los bloques que el sitio realmente
necesite. Ejemplos iniciales:

-   `heroBlock`: encabezado principal, texto, imagen y CTA.
-   `richTextBlock`: contenido editorial con texto enriquecido.
-   `servicesBlock`: listado de servicios.
-   `featuresBlock`: características o beneficios.
-   `imageTextBlock`: imagen y texto en una composición definida.
-   `testimonialsBlock`: testimonios.
-   `faqBlock`: preguntas frecuentes.
-   `ctaBlock`: llamada a la acción.
-   `contactBlock`: información o contenido relacionado con contacto.

Esta lista es orientativa, no una obligación de implementar todos los
bloques. Primero revisar los requisitos del sitio y los componentes
existentes.

Cada schema debe tener campos claros, validaciones razonables y nombres
consistentes. Para listas de elementos, definir los campos del elemento
y validar lo que sea obligatorio.

### 4.3 Variantes de bloque

Cuando sea útil, ofrecer variantes controladas, por ejemplo:

-   Hero: `centered`, `split`, `background`.
-   CTA: `simple`, `highlighted`.
-   Servicios: `grid`, `list`.

Solo exponer variantes que realmente tengan una implementación en
Next.js. El valor por defecto debe estar definido para evitar páginas
rotas cuando falte el campo.

### 4.4 Contenido compartido

Determinar si elementos como navegación, pie de página, datos de
contacto o redes sociales deben administrarse como documentos globales o
configuración del sitio, en lugar de duplicarse en cada página.

## 5. Renderizado de bloques en Next.js

Crear o adaptar un renderizador central, por ejemplo `BlockRenderer`,
que:

-   Reciba la lista de bloques de una página.
-   Identifique el `_type` de cada bloque.
-   Renderice el componente React correspondiente.
-   Pase los datos tipados y necesarios a ese componente.
-   Use una clave estable para cada elemento.
-   Gestione de forma segura los tipos de bloque desconocidos,
    registrando el caso sin romper toda la página.

Mantener un mapa explícito entre tipos de Sanity y componentes React. No
usar `eval`, HTML arbitrario ni código ejecutable procedente del CMS.

Si el proyecto utiliza TypeScript, definir tipos para los datos de las
consultas y las propiedades de los componentes. Evitar el uso
indiscriminado de `any`.

## 6. Rutas y resolución de páginas

-   Identificar si el proyecto usa App Router (`src/app`) o Pages Router
    (`src/pages`) y respetar el patrón existente.
-   Resolver la página de inicio mediante una consulta específica o un
    identificador estable configurado para la home.
-   Resolver el resto de páginas por slug.
-   Gestionar páginas inexistentes con el mecanismo de 404 propio de
    Next.js.
-   Evitar colisiones entre slugs y rutas reservadas, como `/api`,
    `/admin` u otras rutas existentes.
-   Acordar una convención para las URLs y validarla en Sanity.
-   No crear una nueva ruta de código por cada página de contenido
    administrable.

Si se requieren rutas anidadas, como `/servicios/desarrollo-web`,
diseñar explícitamente una estrategia de slugs jerárquicos o una ruta
catch-all. No asumir que `[slug]` de un solo nivel resuelve
automáticamente rutas anidadas.

## 7. Consultas, imágenes y datos

-   Mantener las consultas GROQ en módulos reutilizables.
-   Consultar solo los campos necesarios.
-   Resolver correctamente las referencias a imágenes y demás documentos
    relacionados.
-   Usar las herramientas oficiales y la configuración compatible con la
    versión de Sanity instalada.
-   Mantener los tokens privados en variables de entorno del servidor;
    no exponer tokens de escritura al navegador.
-   Validar los datos antes de pasarlos a componentes que los requieran.
-   Definir una estrategia de caché y revalidación compatible con la
    versión de Next.js y la forma en que se consulta Sanity.
-   No asumir que los cambios publicados aparecerán inmediatamente si
    hay caché; documentar cómo se actualiza el contenido.

## 8. SEO, accesibilidad y diseño responsive

-   Generar metadatos de cada página desde el contenido de Sanity cuando
    exista.
-   Definir valores de reserva razonables si faltan campos SEO.
-   Usar encabezados semánticos, enlaces descriptivos, textos
    alternativos para imágenes y controles accesibles.
-   Mantener los componentes responsive para móvil, tablet y escritorio.
-   Optimizar las imágenes y evitar cargar recursos innecesarios.
-   Evitar que un campo de contenido vacío genere errores visuales o de
    ejecución.
-   Comprobar que las variantes de bloques mantienen contraste,
    legibilidad y navegación por teclado.

## 9. Costos y configuración

Priorizar servicios y planes gratuitos cuando sean suficientes, pero
**verificar los límites y condiciones vigentes** de Sanity, Next.js y el
proveedor de despliegue antes de afirmar que el proyecto tendrá costo
cero.

-   Mantener las claves y configuraciones en variables de entorno.
-   Proporcionar un archivo de ejemplo de variables, como
    `.env.example`, sin secretos reales.
-   Documentar cómo ejecutar el proyecto localmente y cómo configurar
    Sanity.
-   No añadir servicios externos de pago sin explicar su propósito,
    alternativa y costo potencial.
-   Separar el CMS del alojamiento del frontend: usar Sanity no elimina
    la necesidad de desplegar el frontend, aunque este pueda desplegarse
    en una plataforma con plan gratuito.

## 10. Adaptación de un proyecto existente: procedimiento obligatorio

Si ya existe código, seguir este orden antes de implementar:

### Fase A: inspección

1.  Revisar la estructura del repositorio y el `package.json`.
2.  Identificar versiones de Next.js, React, Sanity y TypeScript.
3.  Detectar el router utilizado y las rutas existentes.
4.  Localizar schemas, configuración del Studio, cliente de Sanity y
    consultas GROQ.
5.  Identificar componentes visuales existentes y cuáles se pueden
    reutilizar.
6.  Revisar estilos, variables de entorno esperadas, estrategia de
    imágenes, caché y despliegue.
7.  Identificar problemas, duplicaciones y funcionalidades que podrían
    romperse con una migración.

### Fase B: diagnóstico

Entregar un resumen con:

-   Qué partes ya cumplen el objetivo.
-   Qué partes pueden reutilizarse.
-   Qué falta implementar.
-   Qué debe modificarse y por qué.
-   Riesgos de compatibilidad o regresión.
-   Propuesta de cambios por etapas.

No afirmar que se inspeccionó un archivo o una funcionalidad sin haberlo
revisado realmente.

### Fase C: plan de adaptación

Proponer una lista ordenada de cambios, con archivos afectados y
propósito de cada cambio. Preferir modificaciones pequeñas y
reversibles. Si hay una decisión que cambia sustancialmente la
arquitectura, explicar las alternativas y pedir confirmación antes de
continuar.

### Fase D: implementación

-   Implementar primero el modelo `page` y los schemas necesarios.
-   Conectar o reutilizar el cliente de Sanity.
-   Implementar o adaptar las consultas.
-   Crear o adaptar el renderizador de bloques.
-   Conectar la página de inicio y la ruta dinámica.
-   Adaptar los componentes existentes antes de crear duplicados.
-   Añadir validaciones, metadatos y manejo de errores.
-   Actualizar la documentación y las variables de entorno de ejemplo.
-   No borrar datos de Sanity, cambiar el dataset ni ejecutar acciones
    destructivas sin autorización explícita.

### Fase E: verificación

-   Ejecutar las comprobaciones disponibles: lint, typecheck, pruebas y
    build.
-   Corregir errores causados por los cambios.
-   Probar una página con varios bloques y otra con una composición
    diferente.
-   Probar una página inexistente y campos opcionales vacíos.
-   Verificar la página de inicio, slugs, imágenes, metadatos y diseño
    responsive.
-   Informar qué comprobaciones se ejecutaron y cuáles no fue posible
    ejecutar.

## 11. Criterios de aceptación

La implementación se considera alineada con esta especificación cuando:

-   [ ] Se puede crear una nueva página desde Sanity Studio.
-   [ ] Se puede asignar un slug único a esa página.
-   [ ] Se pueden agregar, quitar y ordenar bloques permitidos.
-   [ ] La página se muestra en Next.js sin crear una ruta de código
    exclusiva para ella.
-   [ ] Distintas páginas pueden combinar los mismos bloques de formas
    diferentes.
-   [ ] Los bloques se renderizan mediante componentes React
    reutilizables.
-   [ ] Las variantes del CMS corresponden a diseños realmente
    implementados.
-   [ ] La home y las páginas inexistentes se resuelven correctamente.
-   [ ] Los campos SEO se reflejan en los metadatos.
-   [ ] El proyecto mantiene tipos, manejo de errores y diseño
    responsive.
-   [ ] Los secretos no quedan expuestos en el frontend ni en el
    repositorio.
-   [ ] Las funcionalidades existentes que deban conservarse siguen
    funcionando.
-   [ ] Se documentan los cambios, la configuración y las verificaciones
    realizadas.

## 12. Instrucción inicial para el asesor de IA

Antes de escribir o modificar código, responde con:

1.  Un diagnóstico breve de la estructura actual.
2.  La arquitectura actual y las diferencias respecto a esta
    especificación.
3.  Los archivos que propones crear, modificar o conservar.
4.  Los riesgos o decisiones que requieren confirmación.
5.  Un plan de implementación por etapas.

Si el proyecto está vacío, propone una estructura inicial sencilla. Si
ya existe una implementación, **adáptala incrementalmente** y evita
rehacerla sin una razón técnica concreta.

No inventes archivos, dependencias, resultados de pruebas ni
funcionalidades. Usa las versiones y convenciones que realmente
encuentres en el repositorio. Si una decisión depende de información que
no está disponible, indica la incertidumbre y plantea la opción
recomendada.
