// DRAG SCROLL SUAVE SIN SNAP AUTOMÁTICO
class SmoothDragScroll {
    constructor(container) {
        this.container = container;
        this.isDragging = false;
        this.startX = 0;
        this.scrollLeftStart = 0;
        this.velocity = 0;
        this.lastX = 0;
        this.timestamp = 0;
        this.animationId = null;
        this.targetScroll = 0;
        this.isAnimating = false;

        this.init();
    }

    init() {
        // Remover scroll-snap-type del CSS original
        this.container.style.scrollSnapType = 'none';

        // Eventos de mouse
        this.container.addEventListener('mousedown', this.onDragStart.bind(this));
        this.container.addEventListener('mousemove', this.onDragMove.bind(this));
        this.container.addEventListener('mouseup', this.onDragEnd.bind(this));
        this.container.addEventListener('mouseleave', this.onDragEnd.bind(this));

        // Eventos táctiles
        this.container.addEventListener('touchstart', this.onTouchStart.bind(this));
        this.container.addEventListener('touchmove', this.onTouchMove.bind(this));
        this.container.addEventListener('touchend', this.onDragEnd.bind(this));

        // Prevenir selección de texto
        this.container.addEventListener('selectstart', (e) => {
            if (this.isDragging) e.preventDefault();
        });

        // Iniciar loop de animación
        this.animationLoop();
    }

    onDragStart(e) {
        this.isDragging = true;
        this.container.classList.add('dragging');
        this.startX = this.getClientX(e);
        this.scrollLeftStart = this.container.scrollLeft;
        this.velocity = 0;
        this.lastX = this.startX;
        this.timestamp = performance.now();

        this.isAnimating = false;
    }

    onDragMove(e) {
        if (!this.isDragging) return;

        e.preventDefault();
        const currentX = this.getClientX(e);
        const deltaX = currentX - this.startX;

        // Scroll suave durante el drag
        this.container.scrollLeft = this.scrollLeftStart - deltaX * 1.3;

        // Calcular velocidad para la inercia
        const now = performance.now();
        const deltaTime = now - this.timestamp;
        if (deltaTime > 0) {
            this.velocity = (currentX - this.lastX) / deltaTime * 15;
            this.lastX = currentX;
            this.timestamp = now;
        }
    }

    onDragEnd() {
        if (!this.isDragging) return;

        this.isDragging = false;
        this.container.classList.remove('dragging');

        // Snap suave a la tarjeta más cercana (OPCIONAL)
        if (Math.abs(this.velocity) < 2) { // Solo si la velocidad es baja
            this.smoothSnapToNearest();
        } else {
            // Inercia normal
            this.targetScroll = this.container.scrollLeft + (this.velocity * 60);
            this.isAnimating = true;
        }
    }


    onTouchStart(e) {
        this.onDragStart(e.touches[0]);
    }

    onTouchMove(e) {
        this.onDragMove(e.touches[0]);
    }

    animationLoop() {
        if (this.isAnimating) {
            this.applySmoothInertia();
        }
        requestAnimationFrame(this.animationLoop.bind(this));
    }

    applySmoothInertia() {
        const currentScroll = this.container.scrollLeft;
        const distance = this.targetScroll - currentScroll;

        // Suavizado exponencial sin snap
        this.velocity = distance * 0.1;
        this.velocity *= 0.85; // Fricción

        const newScroll = currentScroll + this.velocity;
        this.container.scrollLeft = newScroll;

        // Detener cuando sea negligible
        if (Math.abs(this.velocity) < 0.05 && Math.abs(distance) < 1) {
            this.isAnimating = false;
            this.velocity = 0;
        }
    }

    getClientX(e) {
        return e.clientX || e.pageX;
    }
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    const carruseles = document.querySelectorAll('.carrusel-servicios, .grid-proyectos');

    carruseles.forEach(carrusel => {
        if (!carrusel._dragScrollInstance) {
            carrusel._dragScrollInstance = new SmoothDragScroll(carrusel);
        }
    });
});