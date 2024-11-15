
async function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id')
    return id
}

export { getQueryParams }
