
async function getQueryParams() {
    console.log('Getting parameters..')
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id')
    return id
}

export { getQueryParams }
