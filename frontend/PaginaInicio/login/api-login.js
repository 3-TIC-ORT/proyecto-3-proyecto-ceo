
let loginButton = document.getElementById('loginSubmit')
let goToResumenes = document.getElementById('irAResumenes')
let goToRegister = document.getElementById('goToRegister')

goToResumenes.addEventListener('click', redirectRoute)
loginButton.addEventListener('click', loginData);

console.log('Running API-login');

async function loginData(event) {
    
    event.preventDefault();
    console.log('Fetching login-data')

    try {

        let userName = document.getElementById('nombre').value
        let userLastName = document.getElementById('apellido').value
        let userPassword = document.getElementById('password').value
        let userGmail = document.getElementById('gmail').value

        console.log('Trying fetch..')
        let response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName: userName,
                lastName: userLastName,
                password: userPassword,
                gmail: userGmail
            })
        })

        console.log('response:', response)
        console.log("when you greet it with open arms!")
        

        if (!response.ok) {
            throw new Error('[client], Error!!! :(')
        }

        let data = await response.json()

        localStorage.setItem('token', data.token)

    } catch (error) {
        console.log('[client] ERROR:',error)
    }
}

async function redirectRoute() {
    const token = localStorage.getItem('token')
    console.log('Sending token...');

    let response = await fetch('http://localhost:3000/resumenes', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    if (response.ok) {
        console.log('token:', token)
        console.log('[client] Hurraa, se mando token')
        window.location.href = '../ResumenesPrincipal/index.html'
    } else {
        console.log('[client] ERROR: Failed to authenticate (response is not ok)')
    }
};
