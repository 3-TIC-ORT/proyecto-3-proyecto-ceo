console.log('Running details controller..')
import { getQueryParams } from "./queryParamsController.js"

async function getDetails(endpoint, route) {
    console.log('Getting details info')
    const token = localStorage.getItem('token')
    const id = await getQueryParams()

    try {

        const response = await fetch(`http://localhost:3000/${endpoint}/${route}?id=${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
    
        if (response.ok) {

            console.log('Got the details info')
            const data = await response.json()
            console.log('Received data: ', data)
            return data;
        } 

    } catch (error) {
        console.log('Failed to get the details info:', error)
    }
}

export { getDetails };