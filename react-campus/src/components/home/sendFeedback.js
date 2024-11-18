
const sendFeedback = async ({ opinion, sugerencia, rating, setPublishing, setError }) => {
    setPublishing(true);
    setError(false);

    const token = localStorage.getItem('token');

    if (!opinion) {
        setError(true)
        setPublishing(false);
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
                opinion,
                sugerencia,
                puntaje: rating
            })
        })

        if (!response.ok) {
            console.log('Failed')
        } else {
            console.log('Feedback sent successfully');
            setPublishing(false);
        }

    } catch(error) {
        console.error('Failed to send the feedback:', error);
    } finally {
        setPublishing(false);
        console.log('Finished businness')
    }
}

export { sendFeedback }