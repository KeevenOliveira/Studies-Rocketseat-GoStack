import Appointment from "../models/Appointments";
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import AppError from '../errors/AppError';

import { getCustomRepository } from 'typeorm';
import {startOfHour} from 'date-fns';

interface Request {
    provider_id: string
    date: Date;
}

class CreateAppointmentService {

    public async execute({date, provider_id}:Request): Promise<Appointment> {
        const appointmentsRepository = getCustomRepository(AppointmentsRepository);

        const appointmentDate = startOfHour(date);

        const findAppointmentSameDate = await appointmentsRepository.findByDate(
        appointmentDate
        );

        if (findAppointmentSameDate) {
            throw new AppError('this appointment is already booked');
        }

        const appointment = appointmentsRepository.create({
        provider_id,
        date: appointmentDate,
        });

        await appointmentsRepository.save(appointment);

        return appointment;
  }
}

export default CreateAppointmentService;