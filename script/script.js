// Datos de prueba locales (evita CORS)
const PROYECTOS_LOCALES = [
    {
        id: 1,
        imagen: './assets/heroBg.jpg',
        titulo: 'Mi Portfolio Personal',
        descripcion: 'Sitio web desarrollado con HTML, CSS y JavaScript para mostrar mis proyectos de manera profesional.',
        tecnologias: ['html', 'css', 'js'],
        github: 'https://github.com/Exequiel0311/Exequiel-s-Porafolio.git',
        demo: null
    }
];

// Configuración de iconos
const ICONOS = {
    html: 'bx bxl-html5',
    css: 'bx bxl-css3',
    js: 'bx bxl-javascript',
    javascript: 'bx bxl-javascript',
    react: 'bx bxl-react',
    nodejs: 'bx bxl-nodejs',
    mongodb: 'bx bxl-mongodb'
};

// Función para cargar proyectos
function cargarProyectos() {
    console.log('📦 Cargando proyectos locales...');
    mostrarProyectos(PROYECTOS_LOCALES);
}

// Función para mostrar proyectos
function mostrarProyectos(proyectos) {
    const contenedor = document.getElementById('contenedor-proyectos');

    if (!contenedor) {
        console.error('❌ No se encontró el contenedor de proyectos');
        return;
    }

    if (proyectos.length === 0) {
        contenedor.innerHTML = '<p data-i18n="cargandoProyectos">No hay proyectos para mostrar.</p>';
        return;
    }

    contenedor.innerHTML = proyectos.map(proyecto => `
        <div class="tarjeta-proyecto">
            <img src="${proyecto.imagen}" alt="${proyecto.titulo}" class="imagen-proyecto" 
                 onerror="this.src='https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400'">
            <h3>${proyecto.titulo}</h3>
            <p>${proyecto.descripcion}</p>
            
            <div class="tecnologias-proyecto">
                ${proyecto.tecnologias.map(tech => `
                    <div class="icono-tecnologia" title="${tech}">
                        <i class="${ICONOS[tech] || 'bx bx-code'}"></i>
                    </div>
                `).join('')}
            </div>
            
            <div class="botones-accion">
                ${proyecto.github ? `
                    <a href="${proyecto.github}" target="_blank" class="boton-accion">
                        <i class='bx bxl-github'></i>
                        Código
                    </a>
                ` : ''}
                
                ${proyecto.demo ? `
                    <a href="${proyecto.demo}" target="_blank" class="boton-accion demo">
                        <i class='bx bx-link-external'></i>
                        Página
                    </a>
                ` : ''}
            </div>
        </div>
    `).join('');
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    cargarProyectos();
});