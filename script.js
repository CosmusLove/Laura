const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');

const particles = [];
const heartPoints = []; // Przesunięcie deklaracji przed wywołaniem funkcji resizeCanvas
let particleDensity = 0.01; // Początkowa intensywność cząsteczek

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const scale = Math.min(canvas.width, canvas.height) / 30;
    heartPoints.length = 0;  
    generateHeartShape(scale); 
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Funkcja do generowania punktów serca
function generateHeartShape(scale) {
    for (let angle = 0; angle < Math.PI * 2; angle += 0.05) {
        const x = scale * (16 * Math.sin(angle) ** 3);
        const y = -scale * (13 * Math.cos(angle) - 5 * Math.cos(2 * angle) - 2 * Math.cos(3 * angle) - Math.cos(4 * angle));
        heartPoints.push({ x, y });
    }
}

function randomColor() {
    const colors = ['#ff0055', '#ff3355', '#ff6688', '#ff99aa', '#ffcccc'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Klasa cząsteczki
class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 2 + 1;
        this.color = randomColor();
        this.speedX = (Math.random() - 0.5) * 4;
        this.speedY = (Math.random() - 0.5) * 4;
        this.alpha = 1;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.alpha -= 0.01;
    }

    draw() {
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Animacja cząsteczek w kształcie serca
function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (particleDensity < 0.1) particleDensity += 0.0005;

    for (let i = 0; i < heartPoints.length; i++) {
        const point = heartPoints[i];
        
        const x = point.x + canvas.width / 2;
        const y = point.y + canvas.height / 2;

        if (Math.random() < particleDensity) {
            particles.push(new Particle(x, y));
        }
    }

    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        if (particles[i].alpha <= 0) {
            particles.splice(i, 1);
            i--;
        }
    }

    requestAnimationFrame(animateParticles);
}

// Inicjalizacja
generateHeartShape(20);
animateParticles();

// Dodanie okienka życzeń
setTimeout(() => {
    const wishPopup = document.getElementById('wishPopup');
    wishPopup.style.display = 'block'; // Pokaż okienko
}, 3000); // Pokazanie po 3 sekundach

// Zamknięcie okienka
document.getElementById('closePopup').addEventListener('click', () => {
    const wishPopup = document.getElementById('wishPopup');
    wishPopup.style.display = 'none'; // Ukryj okienko po kliknięciu
});
