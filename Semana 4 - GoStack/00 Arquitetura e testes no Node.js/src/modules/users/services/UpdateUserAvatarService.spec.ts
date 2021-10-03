// import CreateAppointmentService from "./CreateAppointmentService";
// import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import AppError from '../../../shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeStorageProvider from '../../../shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
// import CreateUserService from'./CreateUserService';
import UpdateUserAvatarService from './UpdateUserAvatarService';

describe('UpdateUserAvatar', () => {

    it('should be able to update a user', async() => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeStorageProvider = new FakeStorageProvider();
        
        const UpdateUserAvatar = new UpdateUserAvatarService(fakeUsersRepository, fakeStorageProvider);
        
        const user = await fakeUsersRepository.create({
            name: 'Keeven Oliveira',
            email: 'contato.keevenoliveira@gmail.com',
            password: 'rayAishiteru'
        })
        await UpdateUserAvatar.execute({
            user_id: user.id,
            avatarFilename: 'avatar.jpg',
        })

        expect(user.avatar).toBe('avatar.jpg');
        // expect(user).toHaveProperty('password');
        // expect(user).toHaveProperty('name');
        // expect(user.name).toBe('123454124');
    });
    
    it('should not be able to update from avatar not existing user_id', async() => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeStorageProvider = new FakeStorageProvider();
        
        const UpdateUserAvatar = new UpdateUserAvatarService(fakeUsersRepository, fakeStorageProvider);

        expect(UpdateUserAvatar.execute({
            user_id: 'id-no-existing-user',
            avatarFilename: 'avatar.jpg',
        })).rejects.toBeInstanceOf(AppError);
        // expect(user).toHaveProperty('password');
        // expect(user).toHaveProperty('name');
        // expect(user.name).toBe('123454124');
    });

    it('should delete old avatar when new one updating new one', async() => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeStorageProvider = new FakeStorageProvider();
        
        const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

        const UpdateUserAvatar = new UpdateUserAvatarService(fakeUsersRepository, fakeStorageProvider);
        
        const user = await fakeUsersRepository.create({
            name: 'Keeven Oliveira',
            email: 'contato.keevenoliveira@gmail.com',
            password: 'rayAishiteru'
        })
        await UpdateUserAvatar.execute({
            user_id: user.id,
            avatarFilename: 'avatar.jpg',
        })

        //spy - espionar

        await UpdateUserAvatar.execute({
            user_id: user.id,
            avatarFilename: 'avatar2.jpg',
        })

        expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');

        expect(user.avatar).toBe('avatar2.jpg');
        // expect(user).toHaveProperty('password');
        // expect(user).toHaveProperty('name');
        // expect(user.name).toBe('123454124');
    });
        
        
})