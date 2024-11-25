 
const sendPost = async (
    file, 
    descripcion, 
    titulo, 
    setPublishing, 
    setError,
    endpoint,
) => {
    setPublishing(true);
    setError(false);

    let formData = new FormData();

    formData.append('archivo', file);
    formData.append('descripcion', descripcion);
    formData.append('titulo', titulo);

    console.log('Sending post!')

    if (!titulo || !descripcion || !file) {
        console.log('Failed, there is a missing field')
        setError(true);
        setPublishing(false);
        return;
    }

    try {
        const token = localStorage.getItem('token');

        let response = await fetch(`http://localhost:3000/${endpoint}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData
        })

        if (!response.ok) {
            console.log('Failed')
        } else {
            console.log(`${endpoint}, was sent succesfully!`);
            setPublishing(false);
        }

    } catch(error) {
        console.error(`${endpoint}, failed!`, error);
    } finally {
        setPublishing(false);
        console.log('Finished businness')
    }
}

export { sendPost }