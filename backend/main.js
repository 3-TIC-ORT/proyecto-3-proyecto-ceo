import  Express  from "express";
import  express  from "express";
import { User } from "./model/users.js";

console.log("--------------------------------------------------------------------------------------------")

const app = Express()
const PORT = 3000

app.post('/send_data', async (req, res) => {
    const userData = req.body; 

    console.log("Recibiendo data...")

    let firstName = userData.firstName;
    let password = userData.password;
    let lastName = userData.lastName;
    let gmail = userData.gmail;

    const user = await User.create({firstName: firstName, lastName: lastName, password: password, gmail: gmail})
    
})

app.get("/users", async (req,res) => {
    try {
        const users = await User.findAll();
        console.log("Corriendo")
        console.log(users)
    } catch (error) {
        console.error(err , "Busqueda no Exitosa")
    }
});

app.listen(PORT, () => {
    try {
        console.log("conextion escsufecuk", PORT)
    } catch (error) {
        
    }
})

