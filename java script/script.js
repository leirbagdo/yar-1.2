document.addEventListener("DOMContentLoaded", function() {

});
// Seleciona o carrossel
const carrossel = document.querySelector('.carrossel');
let isDown = false;
let startX;
let scrollLeft;

// Quando pressionar o botão do mouse
carrossel.addEventListener('mousedown', (e) => {
    isDown = true;
    carrossel.classList.add('active');
    startX = e.pageX - carrossel.offsetLeft;
    scrollLeft = carrossel.scrollLeft;
});

// Quando sair do carrossel
carrossel.addEventListener('mouseleave', () => {
    isDown = false;
    carrossel.classList.remove('active');
});

// Quando soltar o botão do mouse
carrossel.addEventListener('mouseup', () => {
    isDown = false;
    carrossel.classList.remove('active');
});

// Quando arrastar
carrossel.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - carrossel.offsetLeft;
    const walk = (x - startX) * 2; // Velocidade do arrasto
    carrossel.scrollLeft = scrollLeft - walk;
});