import { Router } from 'express';
import { createUserGuerra, callAllUsers, deleteUser} from '../controllers/usersBonoGuerra.js';

const routerGuerra = Router();



routerGuerra.post(`/`, createUserGuerra
)

routerGuerra.get(`/`,callAllUsers
)

routerGuerra.delete(`/:id`, deleteUser)

export {
    routerGuerra
}


