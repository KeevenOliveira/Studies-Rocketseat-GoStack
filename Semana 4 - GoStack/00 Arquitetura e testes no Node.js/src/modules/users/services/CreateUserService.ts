import { hash } from 'bcryptjs';

import AppError from '../../../shared/errors/AppError';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

import { injectable, inject } from 'tsyringe';

interface IRequest{
    name: string;
    email: string;
    password: string;
}

@injectable()
class CreateUserService{

    //concept dependecy inversion
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
     ){}
 
    public async execute({email, name, password}:IRequest): Promise<User>{
        
        const checkUserExists = await this.usersRepository.findByEmail(email);
        if(checkUserExists){
            throw new AppError('Email address already used by another!');
        }

        const hashedPassword = await hash(password, 8);

        const user = await this.usersRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        return user; 
    }

}

export default CreateUserService;