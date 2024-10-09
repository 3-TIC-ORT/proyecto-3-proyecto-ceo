import { User } from "../../backend/model/users.js";

async function findUserById(id) {
    const user = await User.findOne({
        where: {
            id
        }
    })

    return user;
}

export { findUserById }