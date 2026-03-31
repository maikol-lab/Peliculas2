# Arquitectura del Proyecto - Ar Movie

## Descripción General

Ar Movie es una **Single Page Application (SPA)** construida con React 19 y Vite 7 que consume la API de The Movie Database (TMDB) para mostrar información sobre películas, series de televisión y actores.

## Stack Tecnológico
![Diagrama de Stack Tecnológico](../public/asset/Diagrama%20de%20Stack%20Tecnológico.png)

## Patrón de Arquitectura

La aplicación sigue un patrón **Component-Based Architecture** con:

- **Componentes de presentación**: CardActores, Cardpeliculas, ModalPeliculas, Paginador
- **Componentes de contenedor**: FiltroGenerosCine, FiltroGenerosTv
- **Páginas/Views**: Tendencias, Generos, Actores, Detalle, Peliculas, Busquedas
- **Layout**: Header (navegación + búsqueda) y Footer

## Diagrama de Arquitectura

![Diagrama de Arquitectura](../public/asset/Diagrama%20de%20Arquitectura.png)

## Diagrama de Componentes

![Diagrama de Componentes](../public/asset/Diagrama%20de%20Componentes.png)

## Flujo de Datos

![Diagrama de Flujo de Datos](../public/asset/Flujo%20de%20Datos.png)


## Gestión de Estado

La aplicación utiliza **estado local con useState** en cada componente/página:

![Diagrama de Gestión de Estado](../public/asset/Gestión%20de%20Estado.png)

## Patrones de Diseño Utilizados

### 1. Container/Presentational Pattern
- **Container**: Páginas que manejan lógica y fetching de datos
- **Presentational**: Cards y componentes UI que solo renderizan

### 2. Conditional Rendering
```jsx
if (loading) return <Spinner />;
if (error) return <Error />;
return <Content />;
```

### 3. Dynamic Routing
- Parámetros de URL para tipo, ID, género
- Navegación programática con useNavigate

### 4. Composición de Componentes
- ModalPeliculas dentro de CardPeliculas
- Paginador reutilizable en múltiples páginas

## Seguridad

> **Nota importante**: La API Key de TMDB está expuesta en el código del cliente. Para producción:
> 1. Usar variables de entorno (`VITE_TMDB_API_KEY`)
> 2. Considerar un proxy backend para ocultar la key
> 3. Restringir la API Key en el dashboard de TMDB a dominios específicos

## Rendimiento

- **Code Splitting**: Vite genera chunks automáticos por ruta
- **Lazy Loading**: Imágenes de TMDB con diferentes tamaños (w500, original)
- **Optimización de renders**: Keys en listas, estados mínimos

## Escalabilidad

Para escalar el proyecto se recomienda:
1. Migrar a TypeScript para type safety
2. Implementar React Query / SWR para cacheo de datos
3. Crear un servicio centralizado para llamadas a la API
4. Agregar state management (Zustand/Redux) si crece la complejidad
5. Implementar lazy loading de rutas con React.lazy()
