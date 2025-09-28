// Sistema de idiomas
class GestorIdiomas {
    constructor() {
        this.idiomaActual = localStorage.getItem('idioma') || 'es';
        this.textos = {
            es: {
                // Header
                servicios: "Servicios",
                proyectos: "Proyectos", 
                contacto: "Contacto",
                
                // Hero
                tituloHero: "Servicios Informaticos",
                botonContacto: "Contactame",
                
                // Servicios
                tituloServicios: "Mis Servicios",
                desarrolloWeb: "Desarrollo Web",
                descDesarrolloWeb: "Creación de sitios y aplicaciones web responsive y modernas.",
                basesDatos: "Bases de Datos", 
                descBasesDatos: "Diseño y optimización de estructuras de datos eficientes.",
                mantenimiento: "Limpieza y Mantenimiento",
                descMantenimiento: "Mantenimiento preventivo y correctivo de equipos informáticos.",
                instalacionSoftware: "Instalación de Software",
                descInstalacionSoftware: "Instalación y configuración de programas y aplicaciones.",
                instalacionSO: "Instalación de SO", 
                descInstalacionSO: "Instalación y configuración de sistemas operativos.",
                typeador: "Typeador",
                descTypeador: "Digitación rápida y precisa de documentos y textos.",
                
                // Proyectos
                tituloProyectos: "Mis Proyectos",
                cargandoProyectos: "Cargando proyectos...",
                indicadorScroll: "Desplazá para ver más proyectos",
                
                // Contacto
                tituloContacto: "Contactame", 
                placeholderNombre: "Tu nombre",
                placeholderEmail: "Tu email",
                placeholderMensaje: "Tu mensaje",
                botonEnviar: "Enviar mensaje",
                mensajeExito: "✅ Mensaje enviado correctamente. Te responderé pronto!",
                mensajeError: "❌ Error al enviar el mensaje. Intentá de nuevo.",
                
                // Footer
                derechos: "Todos los derechos reservados."
            },
            en: {
                // Header
                servicios: "Services",
                proyectos: "Projects",
                contacto: "Contact",
                
                // Hero
                tituloHero: "IT Services", 
                botonContacto: "Contact Me",
                
                // Servicios
                tituloServicios: "My Services",
                desarrolloWeb: "Web Development",
                descDesarrolloWeb: "Creation of responsive and modern websites and applications.",
                basesDatos: "Databases",
                descBasesDatos: "Design and optimization of efficient data structures.",
                mantenimiento: "Cleaning and Maintenance", 
                descMantenimiento: "Preventive and corrective maintenance of computer equipment.",
                instalacionSoftware: "Software Installation",
                descInstalacionSoftware: "Installation and configuration of programs and applications.",
                instalacionSO: "OS Installation",
                descInstalacionSO: "Installation and configuration of operating systems.",
                typeador: "Typist",
                descTypeador: "Fast and accurate typing of documents and texts.",
                
                // Proyectos
                tituloProyectos: "My Projects", 
                cargandoProyectos: "Loading projects...",
                indicadorScroll: "Scroll to see more projects",
                
                // Contacto
                tituloContacto: "Contact Me",
                placeholderNombre: "Your name",
                placeholderEmail: "Your email", 
                placeholderMensaje: "Your message",
                botonEnviar: "Send message",
                mensajeExito: "✅ Message sent successfully. I'll get back to you soon!",
                mensajeError: "❌ Error sending message. Please try again.",
                
                // Footer
                derechos: "All rights reserved."
            }
        };
        this.inicializar();
    }
    
    inicializar() {
        this.cambiarIdioma(this.idiomaActual);
        this.agregarEventos();
    }
    
    cambiarIdioma(idioma) {
        this.idiomaActual = idioma;
        localStorage.setItem('idioma', idioma);
        
        const textos = this.textos[idioma];
        
        // Actualizar todos los textos
        document.querySelectorAll('[data-i18n]').forEach(elemento => {
            const clave = elemento.getAttribute('data-i18n');
            if (textos[clave]) {
                elemento.textContent = textos[clave];
            }
        });
        
        // Actualizar placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(elemento => {
            const clave = elemento.getAttribute('data-i18n-placeholder');
            if (textos[clave]) {
                elemento.placeholder = textos[clave];
            }
        });
        
        // Actualizar botón de idioma
        const botonIdioma = document.getElementById('boton-idioma');
        const textoIdioma = botonIdioma.querySelector('.texto-idioma');
        textoIdioma.textContent = idioma.toUpperCase();
    }
    
    alternarIdioma() {
        const nuevoIdioma = this.idiomaActual === 'es' ? 'en' : 'es';
        this.cambiarIdioma(nuevoIdioma);
    }
    
    agregarEventos() {
        document.getElementById('boton-idioma').addEventListener('click', () => {
            this.alternarIdioma();
        });
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new GestorIdiomas();
});