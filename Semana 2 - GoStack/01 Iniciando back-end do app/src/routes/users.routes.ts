import { Router } from 'express';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import CreateUserService from '../services/CreateUserService';
import multer from 'multer';    
import uploadConfig from '../config/upload';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';  
import User from '../models/User';

const usersRouter = Router();

const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response)=>{
    try{
        const { name, email, password } = request.body;

        const createUser = new CreateUserService();

        const user = await createUser.execute({
            name,
            email,
            password,
        })

        const userWithoutPassword = {
            id: user.id,
            name: user.name,
            email: user.email,
            created_at: user.created_at,
            updated_at: user.updated_at,
        }

        return response.json(userWithoutPassword);
        
    }catch(err){
        return response.status(400).json({ error: err.message })
    }
});

usersRouter.patch('/avatar', 
ensureAuthenticated, 
upload.single('avatar'), async (
    request,
    response
    )=>{
            const updateUserAvatar = new UpdateUserAvatarService;

            const user = await updateUserAvatar.execute({
                user_id: request.user.id,
                avatarFilename: request.file.filename,
            });

            const userWithoutPassword = {
                id: user.id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                created_at: user.created_at,
                updated_at: user.updated_at, 
            }

            return response.json(userWithoutPassword);

})

export default usersRouter;