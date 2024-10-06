let angle = 0;
let isDragging = false
const carousel = document.querySelector('.carousel');

carousel.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX; 
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        const currentX = e.pageX;
        const deltaX = currentX - startX; 
        angle += deltaX * 0.1; 
        carousel.style.transform = `rotateY(${angle}deg)`;
        startX = currentX;
    }
});


carousel.addEventListener('mouseup', (e) => {
    if (isDragging) {
        isDragging = false;
    }
});

carousel.addEventListener('mouseleave', (e) => {
    if (isDragging) {
        isDragging = false;
    }
});

const links = document.querySelectorAll('.carousel__face');

links.forEach(link => {
    let isDragging = false;

    link.addEventListener('mousedown', () => {
        isDragging = false;
    });

    link.addEventListener('mousemove', () => {
        isDragging = true;
    });

    link.addEventListener('click', (e) => {
        if (isDragging) {
            e.preventDefault(); 
        }
    });
});