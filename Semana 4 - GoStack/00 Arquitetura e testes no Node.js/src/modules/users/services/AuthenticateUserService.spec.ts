// import CreateAppointmentService from "./CreateAppointmentService";
// import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import AppError from '../../../shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from'./AuthenticateUserService';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('AuthenticateUser', () => {

    it('should be able to authenticate', async() => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();
        const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
        const authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);

        const user = await createUser.execute({
            name: 'Keeven Oliveira',
            email: 'contato.keevenoliveira@gmail.com',
            password: 'rayAishiteru'
        })

        const response = await authenticateUser.execute({
            email: 'contato.keevenoliveira@gmail.com',
            password: 'rayAishiteru'
        })
        expect(response).toHaveProperty('token');
        expect(response.user).toEqual(user);
        // expect(user).toHaveProperty('password');
        // expect(user).toHaveProperty('name');
        // expect(user.name).toBe('123454124');
    });
    it('should not be able to authenticate when not exists user', async() => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();
        const authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);


        expect(authenticateUser.execute({
            email: 'contato.keevenoliveira@gmail.com',
            password: 'rayAishiteru'
        })).rejects.toBeInstanceOf(AppError)
        // expect(user).toHaveProperty('password');
        // expect(user).toHaveProperty('name');
        // expect(user.name).toBe('123454124');
    });

    it('should be able to authenticate', async() => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();
        const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
        const authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);

        await createUser.execute({
            name: 'Keeven Oliveira',
            email: 'contato.keevenoliveira@gmail.com',
            password: 'rayAishiteru'
        })

        expect(authenticateUser.execute({
            email: 'contato.keevenoliveira@gmail.com',
            password: 'wrong-password'
        })).rejects.toBeInstanceOf(AppError);

        // expect(response.user).toEqual(user);
        // expect(user).toHaveProperty('password');
        // expect(user).toHaveProperty('name');
        // expect(user.name).toBe('123454124');
    });
        
})