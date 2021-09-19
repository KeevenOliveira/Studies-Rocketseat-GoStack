import { v4 as uuid } from 'uuid';

import Appointment from '../../infra/typeorm/entities/Appointments';
import IAppointmentsRepository from '../IAppointmentsRepository';
import ICreateAppointmentDTO from '../../dtos/ICreateAppointmentDTO';

class AppointmentsRepository implements IAppointmentsRepository{

    private appointments: Appointment[] = [];

    public async findByDate(date: Date): Promise<Appointment|undefined>{
        const findAppointment = this.appointments.find(appointments =>
            appointments.date === date
        );
        return findAppointment

    }
    public async create ({provider_id, date}: ICreateAppointmentDTO): Promise<Appointment> {
        const appointment = new Appointment();
        
        Object.assign(appointment, {id: uuid(), date: date, provider_id: provider_id})


        appointment.id = uuid();
        appointment.date = date;
        appointment.provider_id = provider_id

        this.appointments.push(appointment);
        
        return appointment;
    }
}

export default AppointmentsRepository;