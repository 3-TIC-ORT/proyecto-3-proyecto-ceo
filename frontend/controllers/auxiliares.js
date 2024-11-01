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
}, 2150)


export { debouncedExitPage };
export { debouncedPostDeletion };

export { debounce };