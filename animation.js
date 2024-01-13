const canvas = document.getElementById("anim");
const context = canvas.getContext("2d");
setSize();
const c = ["FF0000", "00FF00", "0000FF", "FFFF00", "00FFFF", "FF00FF"];
let particlesArray = [];

class Particle {
    constructor(size, color) {
        this.x = Math.random() * canvas.width;
        this.y = -Math.random() * canvas.height;
        this.size = size;
        this.color = color;
        this.rotateSpeed = 0.05;
        this.fallSpeed = Math.random() + size / 20;
        this.theta = Math.random() * 2 * Math.PI;
        this.alpha = Math.floor(((size - 9) / 11) * 255).toString(16);
    }

    animate() {
        //rotate
        this.theta = (this.theta + this.rotateSpeed) % (2 * Math.PI);

        //fall
        this.y += this.fallSpeed;
        if (this.y > canvas.height) {
            this.y -= canvas.height + Math.random() * canvas.height;
        }

        //animate
        context.beginPath();
        context.lineWidth = (this.size * 2) / 3;
        context.strokeStyle = "#" + this.color + this.alpha;
        context.moveTo(
            this.x + (this.size / 2) * Math.cos(this.theta),
            this.y + (this.size / 2) * Math.sin(this.theta)
        );
        context.lineTo(
            this.x - (this.size / 2) * Math.cos(this.theta),
            this.y - (this.size / 2) * Math.sin(this.theta)
        );
        context.stroke();
    }
}

generateParticles(20);
anim();

addEventListener("resize", () => setSize());

function generateParticles(amount) {
    for (let i = 0; i < amount; i++) {
        particlesArray[i] = new Particle(
            Math.random() * 10 + 10,
            randomColor()
        );
    }

    particlesArray.sort(function (a, b) {
        return a.size - b.size;
    });
}

function randomColor() {
    return c[Math.floor(Math.random() * c.length)];
}

function setSize() {
    canvas.height = canvas.parentElement.clientHeight;
    canvas.width = canvas.parentElement.clientWidth;
}

function anim() {
    requestAnimationFrame(anim);
    context.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach((particle) => particle.animate());
}
