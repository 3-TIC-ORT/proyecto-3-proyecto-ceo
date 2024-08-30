let loginButton = document.getElementById('loginSubmit')
let goToResumenes = document.getElementById('irAResumenes')
let goToRegister = document.getElementById('goToRegister')

goToResumenes.addEventListener('click', redirectRoute)
loginButton.addEventListener('click', loginData)

console.log('Running API-login')

async function loginData(event) {
    
    event.preventDefault();

    console.log('Fetching login-data')

    try {

        let response = await fetch('/log-in', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                name: userName,
                lastName: userLastName,
                password: userPassword
            })
        })

        console.log('response:', response)
        console.log("when you greet it with open arms!")
        

        if (!response.ok) {
            throw new Error('Error!!! :(')
        }

        let data = await response.json()

        localStorage.setItem('token', data.token)

    } catch (error) {
        console.log(error)
    }
}

async function redirectRoute() {
    const token = localStorage.getItem('token')
    console.log('mANDANDO token');

    let response = await fetch('/resumenes', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    if (response.ok) {
        console.log('token:', token)
        console.log('Hurraa, se mando token (login)')

    }

};
