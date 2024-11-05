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

    displayElement.classList.add('appear');
    messageElement.classList.add('blackText')
    messageElement.innerHTML = text;
    setTimeout(() => displayElement.classList.remove('appear'), 1000)
    console.log('Campos invalidos');
}


export { debouncedExitPage };
export { debouncedPostDeletion };
export { displayInvalidMessage }
export { debounce };