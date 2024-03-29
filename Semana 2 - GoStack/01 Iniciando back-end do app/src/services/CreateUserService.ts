import { hash } from 'bcryptjs';
import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';
import User from '../models/User';

interface Request{
    name: string;
    email: string;
    password: string;
}

class CreateUserService{

    public async execute({email, name, password}:Request): Promise<User>{
        const usersRepository = getRepository(User);
        
        const checkUserExists = await usersRepository.findOne({
            where: { email },
        });
        if(checkUserExists){
            throw new AppError('Email address already used by another!');
        }

        const hashedPassword = await hash(password, 8);

        const user = usersRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        await usersRepository.save(user);

        return user; 
    }

}

export default CreateUserService;