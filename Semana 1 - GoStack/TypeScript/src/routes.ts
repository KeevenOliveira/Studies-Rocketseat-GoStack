import {createUser} from './services/CreateUser';
import {Request, Response} from 'express';

export function InitTypes(request:Request, response:Response){

    const user = createUser({
    name:'Keeven',
    email:'contato.keevenoliveira@gmail.com',
    password:'123456',
    techs:['Keeven', 'Kimberlly', 'Eduarda', 
    {
    title:'Java Spring', experience: 10
    }]
    });

    return response.json({message:'Hello World With TypeScript and Express'})
}