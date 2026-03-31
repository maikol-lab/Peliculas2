# Guía de Troubleshooting - Ar Movie

## Tabla de Contenidos

- [Problemas de Instalación](#problemas-de-instalación)
- [Problemas de Desarrollo](#problemas-de-desarrollo)
- [Problemas de la API TMDB](#problemas-de-la-api-tmdb)
- [Problemas de Renderizado](#problemas-de-renderizado)
- [Problemas de Navegación](#problemas-de-navegación)
- [Problemas de Video/Trailers](#problemas-de-videotrailers)
- [Problemas de Build](#problemas-de-build)
- [Errores Comunes](#errores-comunes)

---

## Problemas de Instalación

### `npm install` falla

**Síntoma**: Errores al instalar dependencias.

**Solución**:
```bash
# Limpiar cache de npm
npm cache clean --force

# Eliminar node_modules y package-lock.json
rm -rf node_modules package-lock.json

# Reinstalar
npm install
```

### Versión de Node.js incompatible

**Síntoma**: Error de versión mínima de Node.

**Solución**: Verificar que Node.js >= 18:
```bash
node --version
```

Si es menor a 18, actualizar desde [nodejs.org](https://nodejs.org).

---

## Problemas de Desarrollo

### El servidor no inicia

**Síntoma**: `npm run dev` no arranca o falla inmediatamente.

**Solución**:
```bash
# Verificar que el puerto 5173 no esté en uso
# Windows:
netstat -ano | findstr :5173

# Si está ocupado, usar otro puerto:
npm run dev -- --port 3000
```

### Hot Module Replacement (HMR) no funciona

**Síntoma**: Los cambios no se reflejan automáticamente.

**Solución**:
1. Verificar que no haya errores de sintaxis en la consola
2. Reiniciar el servidor de desarrollo
3. Verificar que los archivos estén dentro de `src/`

---

## Problemas de la API TMDB

### No se cargan los datos (spinner infinito)

**Síntoma**: La aplicación muestra "Cargando..." indefinidamente.

**Causas posibles**:
1. API Key inválida o expirada
2. Sin conexión a internet
3. Rate limit excedido

**Solución**:
```
1. Verificar la API Key en el código:
   - Buscar "ecbcdcf9044928d12b179d9153f5a269" en los archivos
   - Verificar en https://www.themoviedb.org/settings/api

2. Verificar conexión a internet

3. Esperar unos minutos si se excedió el rate limit
```

### Error 401 - Unauthorized

**Síntoma**: Mensaje "HTTP error! status: 401"

**Solución**:
- La API Key es inválida o fue revocada
- Generar una nueva API Key en el dashboard de TMDB
- Reemplazar en todos los archivos que contienen la key

### Error 429 - Too Many Requests

**Síntoma**: "HTTP error! status: 429"

**Solución**:
- Esperar 10-30 segundos antes de hacer más peticiones
- TMDB limita a ~40 requests/segundo
- Considerar implementar debounce en la búsqueda

### Error 500 - Server Error

**Síntoma**: "HTTP error! status: 500"

**Solución**:
- Error temporal del servidor de TMDB
- Esperar unos minutos e intentar de nuevo
- Verificar el estado de TMDB en https://www.themoviedb.org

---

## Problemas de Renderizado

### Imágenes no se muestran

**Síntoma**: Posters o fotos de actores aparecen rotas.

**Causas posibles**:
1. `poster_path` o `profile_path` es null
2. URL de imagen mal construida

**Solución**:
```jsx
// Verificar antes de renderizar:
{item.poster_path && (
  <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} />
)}
```

La app ya filtra actores sin `profile_path` en `Actores.jsx:82-83` y `Detalle.jsx:230-232`.

### Modal no se abre

**Síntoma**: Click en "Modal" no abre el popup.

**Causas posibles**:
1. Bootstrap JS no está cargado
2. IDs duplicados en los modales

**Solución**:
1. Verificar que `public/js/main.js` y Bootstrap JS estén en `index.html`
2. Cada ModalPeliculas usa `item.id` como ID, verificar que no haya duplicados

### Dropdown de géneros vacío

**Síntoma**: Los menús "Generos Cine" y "Generos Tv" no muestran opciones.

**Solución**:
- Verificar la consola del navegador para errores de red
- Comprobar que los endpoints `/genre/movie/list` y `/genre/tv/list` responden
- Los componentes `FiltroGenerosCine` y `FiltroGenerosTv` manejan estados de loading y error

---

## Problemas de Navegación

### Links no funcionan

**Síntoma**: Click en enlaces no navega a la página esperada.

**Solución**:
- Verificar que `react-router-dom` esté instalado
- Comprobar que las rutas en `App.jsx` coincidan con los `Link`
- Verificar que no haya errores en la consola del navegador

### Botón "Regresar" no funciona

**Síntoma**: Click en "Regresar" no vuelve a la página anterior.

**Solución**:
- El botón usa `navigate(-1)` de React Router
- Verificar que el historial del navegador tenga páginas anteriores
- Si se accede directamente a la URL, no hay historial previo

---

## Problemas de Video/Trailers

### Trailers no se reproducen

**Síntoma**: Click en "Ver Trailers" no muestra video o muestra error.

**Causas posibles**:
1. No hay trailers disponibles para esa película/serie
2. El video de YouTube fue eliminado o es privado
3. Problema con react-youtube

**Solución**:
```
1. Verificar la consola del navegador para errores de YouTube

2. Algunos títulos no tienen trailers en TMDB:
   - La app busca primero en español, luego en inglés
   - Si no hay trailers, el botón no se muestra

3. Verificar que react-youtube esté instalado:
   npm list react-youtube
```

### Modal de trailers no se cierra correctamente

**Síntoma**: El video sigue sonando después de cerrar el modal.

**Solución**:
- La app ya implementa limpieza en `Detalle.jsx:133-147`
- El evento `hidden.bs.modal` detiene el video con `playerRef.current.stopVideo()`
- Si persiste, verificar que Bootstrap JS esté correctamente cargado

---

## Problemas de Build

### `npm run build` falla

**Síntoma**: Errores durante la compilación.

**Solución**:
```bash
# Verificar errores de ESLint primero
npm run lint

# Corregir errores de sintaxis o imports
# Luego intentar de nuevo
npm run build
```

### Errores de ESLint

**Síntoma**: `npm run lint` reporta errores.

**Solución**:
```bash
# Ver errores específicos
npm run lint

# Los errores comunes incluyen:
# - Variables no usadas
# - Imports no utilizados
# - Reglas de react-hooks
```

### Preview no funciona después del build

**Síntoma**: `npm run preview` no muestra la app correctamente.

**Solución**:
```bash
# Asegurarse de hacer build primero
npm run build
npm run preview

# La preview se sirve en http://localhost:4173
```

---

## Errores Comunes

### "Cannot read properties of undefined"

**Causa**: Intentar acceder a propiedades de datos no cargados.

**Solución**:
- La app usa el patrón loading/error/content en todas las páginas
- Verificar que los checks de `loading` y `error` estén antes del renderizado

### "Too many re-renders"

**Causa**: Llamada a setState dentro del render sin useEffect.

**Solución**:
- Verificar que los fetch estén dentro de `useEffect`
- No llamar a funciones que modifican estado directamente en el JSX

### Rutas con parámetros no funcionan

**Causa**: Parámetros de URL mal definidos o no leídos correctamente.

**Solución**:
```jsx
// Verificar useParams en cada componente:
const params = useParams();
const tipo = params.tipo;  // debe coincidir con la ruta en App.jsx
```

### Bootstrap no aplica estilos

**Causa**: CSS de Bootstrap no está cargado.

**Solución**:
- Verificar que los archivos CSS estén en `public/css/` y referenciados en `index.html`
- Verificar que las clases CSS sean correctas (Bootstrap 5)

---

## Debugging Tips

### Habilitar React DevTools

1. Instalar la extensión "React Developer Tools" en el navegador
2. Inspeccionar componentes y su estado en tiempo real
3. Verificar props y hooks

### Verificar llamadas a la API

1. Abrir DevTools del navegador (F12)
2. Ir a la pestaña "Network"
3. Filtrar por "Fetch/XHR"
4. Verificar las llamadas a `api.themoviedb.org`

### Logs de consola

La app muestra la URL de la API en caso de error en `Actores.jsx:66`:
```jsx
<p class="text-center my-5">{API}</p>
```

Esto ayuda a depurar URLs mal formadas.

---

## Contacto

Si encuentras un bug no documentado aquí:
1. Revisar la consola del navegador (F12)
2. Verificar la pestaña Network para errores de API
3. Comprobar que Node.js y npm estén actualizados
4. Crear un issue en el repositorio con los detalles del error
