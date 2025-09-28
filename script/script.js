// Datos de prueba locales (evita CORS)
const PROYECTOS_LOCALES = [
    {
        id: 1,
        imagen: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400',
        titulo: 'Mi Portfolio Personal',
        descripcion: 'Sitio web desarrollado con HTML, CSS y JavaScript para mostrar mis proyectos de manera profesional.',
        tecnologias: ['html', 'css', 'js'],
        github: 'https://github.com/Exequiel0311/Exequiel-s-Porafolio.git',
        demo: 'https://tudominio.com'
    }
];

// Función simplificada
function cargarProyectos() {
    console.log('📦 Cargando proyectos locales...');
    mostrarProyectos(PROYECTOS_LOCALES);
}

// El resto del código igual...
function mostrarProyectos(proyectos) {
    const contenedor = document.getElementById('contenedor-proyectos');

    if (proyectos.length === 0) {
        contenedor.innerHTML = '<p>No hay proyectos para mostrar.</p>';
        return;
    }

    const ICONOS = {
        html: 'bx bxl-html5',
        css: 'bx bxl-css3',
        js: 'bx bxl-javascript',
        javascript: 'bx bxl-javascript',
        react: 'bx bxl-react',
        nodejs: 'bx bxl-nodejs',
        mongodb: 'bx bxl-mongodb'
    };

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
                        Pagina
                    </a>
                ` : ''}
            </div>
        </div>
    `).join('');
}

document.addEventListener('DOMContentLoaded', cargarProyectos);