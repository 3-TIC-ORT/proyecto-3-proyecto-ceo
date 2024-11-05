import { displayInvalidMessage } from "../controllers/auxiliares.js";

let angle = 0;
let isDragging = false
let rating = 0;

const carousel = document.querySelector('.carousel');
const stars = document.querySelectorAll('.star')
const links = document.querySelectorAll('.carousel__face');
const publishFeedback = document.getElementById('send')

const messageDisplay = document.getElementById('messageDisplay')
const messageText = document.getElementById('message')
let startX;

carousel.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX; 
});

publishFeedback.addEventListener('click', sendFeedback)

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

stars.forEach(star => {
    star.addEventListener('click', setStars)
})

function setStars(e) {
    rating = e.target.getAttribute('data-star');
    console.log(rating)

    stars.forEach(star => {
        star.src = '../img/Empty-Star.svg';
    })

    for (let i = 0; i < rating; i++) {
        stars[i].src = '../img/Star.svg'
    };
}

async function sendFeedback() {
    const token = localStorage.getItem('token') 
    const opinion = document.getElementById('opinion').value
    const sugerencia = document.getElementById('sugerencia').value
    const puntaje = parseInt(rating)
    console.log(sugerencia, opinion, puntaje);

    if (!opinion) {
        let text = 'No te olvides de la opinion!'
        displayInvalidMessage(messageDisplay, messageText, text)
        return;
    }

    try {
        let response = await fetch('http://localhost:3000/send-feedback', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                opinion: opinion,
                sugerencia: sugerencia,
                puntaje: puntaje
            })
        })
        if (response.ok) {
            console.log('Feedback sent successfully');
        } else {
            console.log('Failed to send feedback:', response.statusText);
        }
    } catch (error) {
        console.log('ERROR, failed to send feedback:', error);
    }
}
