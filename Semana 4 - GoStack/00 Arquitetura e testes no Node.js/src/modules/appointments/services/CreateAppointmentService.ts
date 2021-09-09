import Appointment from "../infra/typeorm/entities/Appointments";
import AppointmentsRepository from '../infra/typeorm/repositories/AppointmentsRepository';
import AppError from '../../../shared/errors/AppError';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

import { injectable, inject } from 'tsyringe';

import {startOfHour} from 'date-fns';

interface IRequest {
    provider_id: string
    date: Date;
}

@injectable()
class CreateAppointmentService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,
    ){}

    public async execute({date, provider_id}:IRequest): Promise<Appointment> {

        const appointmentDate = startOfHour(date);

        const findAppointmentSameDate = await this.appointmentsRepository.findByDate(
        appointmentDate
        );

        if (findAppointmentSameDate) {
            throw new AppError('this appointment is already booked');
        }
        const appointment = this.appointmentsRepository.create({
            provider_id, 
            date: appointmentDate,
        });
            
        return appointment;

  }
}

export default CreateAppointmentService;