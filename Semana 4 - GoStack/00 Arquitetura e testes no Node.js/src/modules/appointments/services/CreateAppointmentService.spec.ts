import CreateAppointmentService from "./CreateAppointmentService";
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import AppError from '../../../shared/errors/AppError';

describe('CreateAppointment', () => {

    it('should be able to create a new appointment', async() => {
        const fakeAppointmentsRepository = new FakeAppointmentsRepository();
        const createAppointment = new CreateAppointmentService(fakeAppointmentsRepository);
        const appointment = await createAppointment.execute({
            date: new Date,
            provider_id: '123454124'
        })
        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('123454124');
    });

    it('should not be able to create tow appointments on the same time', async() => {
        const fakeAppointmentsRepository = new FakeAppointmentsRepository();
        const createAppointment = new CreateAppointmentService(fakeAppointmentsRepository);
        const appointmentDate = new Date(2021, 4, 4, 11);
        
        await createAppointment.execute({
            date: appointmentDate,
            provider_id: '123454124'
        })
        expect(
            createAppointment.execute({
                date: appointmentDate,
                provider_id: '123454124'
            })
        ).rejects.toBeInstanceOf(AppError);
    });
        
})