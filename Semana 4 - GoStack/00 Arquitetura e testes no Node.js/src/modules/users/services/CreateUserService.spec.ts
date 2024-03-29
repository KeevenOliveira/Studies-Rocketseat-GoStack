// import CreateAppointmentService from "./CreateAppointmentService";
// import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import AppError from '../../../shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from'./CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('CreateUser', () => {

    it('should be able to create a new user', async() => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();
        const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
        const user = await createUser.execute({
            name: 'Keeven Oliveira',
            email: 'contato.keevenoliveira@gmail.com',
            password: 'rayAishiteru'
        })
        expect(user).toHaveProperty('id');
        // expect(user).toHaveProperty('password');
        // expect(user).toHaveProperty('name');
        // expect(user.name).toBe('123454124');
    });

    it('should not be able to create a new user with same email from another', async() => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();
        const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
        const user = await createUser.execute({
            name: 'Keeven Oliveira',
            email: 'contato.keevenoliveira@gmail.com',
            password: 'rayAishiteru'
        })
        expect(createUser.execute({
            name: 'Keeven Oliveira',
            email: 'contato.keevenoliveira@gmail.com',
            password: 'rayAishiteru'
        })).rejects.toBeInstanceOf(AppError);
        // expect(user).toHaveProperty('password');
        // expect(user).toHaveProperty('name');
        // expect(user.name).toBe('123454124');
    });
        
})