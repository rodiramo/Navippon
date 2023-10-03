/** @type {import('tailwindcss').Config} */
export default {
  // content define cuáles son los archivos que Tailwind debe analizar para
  // buscar qué clases usamos en el proyecto.
  // Necesitamos agregar el archivo [index.html], que es el arranque de 
  // Vite, y todos los archivos que usemos para el proyecto, en nuestro
  // caso, el contenido de la carpeta [src/]
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    // A través de extend podemos agregar nuevos valores para diferentes estilos de Tailwind.
    extend: {
      gridTemplateRows: {
        'layout': '60px 1fr 100px',
      },
    },
  },
  plugins: [],
}

