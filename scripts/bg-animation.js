class BgAnimation {
    constructor() {
        this.colors = ['#111', '#222', '#333', '#444', '#555', '#666'];
        this.lineColor = 'white';
        this.numOfParticles = 100;
        this.particleSize = 5;
        this.particleSpeed = 2;
        
        this.canvas = null;
        this.context = null;
        this.particles = [];
        this.mouseX = 0;
        this.mouseY = 0;
    }
    
    init() {
        this.initCanvas();
        if (this.canvas) {
            this.initParticles();
            this.animate();
        }
    }

    initCanvas() {
      this.canvas = document.getElementById('background-canvas');
      this.context = this.canvas.getContext('2d');
      this.resizeCanvas();

      window.addEventListener('resize', () => this.resizeCanvas());
      this.canvas.addEventListener('mousemove', (event)=> {
          this.mouseX = event.clientX;
          this.mouseY = event.clientY;
      })
    }

    resizeCanvas() {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    }

    initParticles() {
      this.particles = [];
      for (let i = 0; i < this.numOfParticles; i++) {
          const x = Math.random() * this.canvas.width;
          const y = Math.random() * this.canvas.height;
          this.particles.push(new Particle(x, y, this.particleSize, this.particleSpeed, this.colors));
      }
    }

    drawLines(context, particles, distanceThreshold) {
      context.beginPath();
      context.lineWidth = 1;
      context.strokeStyle = this.lineColor;
  
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
  
          if (distance < distanceThreshold) {
            context.moveTo(particles[i].x, particles[i].y);
            context.lineTo(particles[j].x, particles[j].y);
          }
        }
      }
      context.stroke();
    }

      animate() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.particles.forEach((particle) => {
            particle.update(this.mouseX, this.mouseY, this.canvas.width, this.canvas.height);
            particle.draw(this.context);
        });
        // Draw lines between particles within a certain distance
        //this.drawLines(this.context, this.particles, 100); // Adjust distance threshold as needed
    
        requestAnimationFrame(() => this.animate());
      }
}

class Particle {
    constructor(x, y, size, speed, color) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speed = speed;
        this.color = color[Math.floor(Math.random() * color.length)];
        this.velocityX = (Math.random() - 0.5) * 2;
        this.velocityY = (Math.random() - 0.5) * 2;
        this.friction = 0.9;
        this.minSpeed = speed / 10;
    }

    draw(context) {
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fillStyle = this.color;
        context.fill();
      }
    
      update(mouseX, mouseY, canvasWidth, canvasHeight) {
        const dx = this.x - mouseX;
        const dy = this.y - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        let forceX = 0;
        let forceY = 0;
    
        if (distance < 100) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = (100 - distance) / 200;
          forceX = forceDirectionX * force;
          forceY = forceDirectionY * force;
        }
    
        this.velocityX += forceX;
        this.velocityY += forceY;
        this.velocityX *= this.friction;
        this.velocityY *= this.friction;
    
        const currentSpeed = Math.sqrt(this.velocityX ** 2 + this.velocityY ** 2);
        if (currentSpeed < this.minSpeed) {
          const angle = Math.atan2(this.velocityY, this.velocityX);
          this.velocityX = Math.cos(angle) * this.minSpeed;
          this.velocityY = Math.sin(angle) * this.minSpeed;
        }
    
        this.x += this.velocityX;
        this.y += this.velocityY;
    
        if (this.x <= 0) this.x = canvasWidth;
        else if (this.x >= canvasWidth) this.x = 0;
    
        if (this.y <= 0) this.y = canvasHeight;
        else if (this.y >= canvasHeight) this.y = 0;
    }
}
    
// Usage example
const bgAnimation = new BgAnimation();
bgAnimation.init();
