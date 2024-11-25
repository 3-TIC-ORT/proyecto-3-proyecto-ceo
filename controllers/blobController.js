
export async function fetchBlob(model, id, fileType) {
    const token = localStorage.getItem('token')
    console.log('ID:', id, 'Model:', model);

    try {
        const response = await fetch(`http://localhost:3000/download/${id}/${model}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.ok) {
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            return url;
        } else {
            console.error('Failed to fetch blob at:', model, id);
            return null;
        }
    } catch (error) {
        console.error('Error fetching blob:', error);
        return null;
    }
}