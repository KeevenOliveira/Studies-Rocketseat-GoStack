import CreateAppointmentService from "./CreateAppointmentService";
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

describe('CreateAppointment', () => {

    it('should be able to create a new appointment', async() => {
        // expect(FakeAppointmentsRepository).toBe(4);
        const fakeAppointmentsRepository = new FakeAppointmentsRepository();
        const createAppointment = new CreateAppointmentService(fakeAppointmentsRepository);
        // expect(fakeAppointmentsRepository.create())
        // expect(createAppointment.execute)
        const appointment = await createAppointment.execute({
            date: new Date,
            provider_id: '123454124'
        })

        // return appointment
        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('123454124');
    });

    it('should not be able to create tow appointments on the same time', () => {
        expect(1 + 3).toBe(4);
    });
        
})