const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

const DPR = Math.min(window.devicePixelRatio || 1, 2);

function resize() {
  canvas.width = innerWidth * DPR;
  canvas.height = innerHeight * DPR;
  canvas.style.width = innerWidth + "px";
  canvas.style.height = innerHeight + "px";
  ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
}
resize();
addEventListener("resize", resize);

let particles = [];

function launchFireworks(x, y) {
  for (let i = 0; i < 120; i++) {
    particles.push({
      x,
      y,
      vx: Math.cos(Math.random() * Math.PI * 2) * (Math.random() * 6 + 2),
      vy: Math.sin(Math.random() * Math.PI * 2) * (Math.random() * 6 + 2),
      life: 1,
      color: `hsl(${Math.random() * 360},100%,60%)`
    });
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.life -= 0.015;

    ctx.globalAlpha = p.life;
    ctx.fillStyle = p.color;
    ctx.fillRect(p.x, p.y, 2.2, 2.2);

    if (p.life <= 0) particles.splice(i, 1);
  }

  requestAnimationFrame(animate);
}
animate();

canvas.addEventListener("click", e => {
  launchFireworks(e.clientX, e.clientY);
});

setInterval(() => {
  launchFireworks(
    Math.random() * innerWidth,
    Math.random() * innerHeight * 0.7
  );
}, 800);
