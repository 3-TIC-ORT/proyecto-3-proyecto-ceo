async function popupLogin(gmail, password) {

    console.log('Login through the popup-')
    try {
        let response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                gmail: gmail,
                password: password
            })
        })
    
        if (response.ok) {
            let data = await response.json() 
            localStorage.setItem('token', data.token)
            location.reload()
            return true;
        } else {
            console.log('Not OK')
            return false;
        }

    } catch (error) {
        console.log(error, 'FAILED to login through the popup.')
    }
}

export { popupLogin }