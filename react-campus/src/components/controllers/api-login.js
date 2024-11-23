
const login = async ({ setLogged, setError, password, gmail }) => {
    setError(false);

    if (!gmail) {
        setError(true)
        return;
    }
    
    try {
        let response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password,
                gmail,
            })
        })

        if (!response.ok) {
            console.log('Failed')
            setLogged(false)
        } else {
            console.log('Logged in successfully');

            const data = await response.json()
            const token = data.token
            localStorage.setItem('token', token)

            setError(false)
            setLogged(true)
        }

    } catch(error) {
        console.error('Failed to login:', error);
    } finally {
        console.log('Finished businness')
    } 
}


export { login }