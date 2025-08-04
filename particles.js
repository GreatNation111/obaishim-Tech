// Particle Animation
class Particle {
    constructor() {
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        this.size = Math.random() * 5 + 2;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.life = 1;
        this.element = document.createElement('div');
        this.element.style.position = 'absolute';
        this.element.style.width = this.size + 'px';
        this.element.style.height = this.size + 'px';
        this.element.style.background = `hsl(${Math.random() * 360}, 70%, 50%)`;
        this.element.style.borderRadius = '50%';
        document.querySelector('.particles').appendChild(this.element);
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= 0.01;
        if (this.life <= 0) {
            this.element.remove();
            return false;
        }
        this.element.style.left = this.x + 'px';
        this.element.style.top = this.y + 'px';
        this.element.style.opacity = this.life;
        return true;
    }
}

function createParticles() {
    const particles = [];
    setInterval(() => {
        particles.push(new Particle());
        particles.forEach((particle, index) => {
            if (!particle.update()) particles.splice(index, 1);
        });
    }, 100);
}

createParticles();