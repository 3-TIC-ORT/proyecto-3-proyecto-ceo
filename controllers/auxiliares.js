function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

const debouncedPostDeletion = debounce(async function deletePost() {
    route = 'delete'
    const deletion = await tryDeletePost(endpoint, route, ID)
}, 1000)

const debouncedExitPage = debounce(function exit() {
    window.location.href = '../index.html'
}, 1000)


function displayInvalidMessage(displayElement, messageElement, text) {
    if (!displayElement || !messageElement) {
        console.log(displayElement, messageElement)
        console.warn("Display or message element is missing.");
        return;
    }
    console.log('Displaying invalid message with:', displayElement)
    displayElement.classList.add('appear');
    messageElement.classList.add('blackText')
    messageElement.innerHTML = text;
    setTimeout(() => displayElement.classList.remove('appear'), 1000)
    console.log('Campos invalidos');
}

async function isLogged(logged, div) {
    const token = localStorage.getItem('token')
    if (!token) {
        console.warn('No token!')
        return;
    }
    try {
        let response = await fetch('http://localhost:3000/isLogged', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        let data = await response.json()
        if (response.ok) {
            div.classList.add('hidden')
            console.log(data)
            logged.innerHTML = `${data.firstName} ${data.lastName}`
        }

    } catch (error) {
        console.log('ERROR, failed to check user login:', error)
    }
}

export { isLogged };
export { debouncedExitPage };
export { debouncedPostDeletion };
export { displayInvalidMessage }
export { debounce };