import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppointmentsRepository from '../../typeorm/repositories/AppointmentsRepository';
import CreateAppointmentService from '../../../services/CreateAppointmentService'; 
import ensureAuthenticated from '../../../../users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated); // vai aplicar esse middleware em todas as rotas

appointmentsRouter.get('/', async (request, response)=>{
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointment = await appointmentsRepository.find(); 

    return response.json(appointment);
})

appointmentsRouter.post('/', async (request, response)=>{    
        const { provider_id, date } = request.body;
        
        const parsedDate = parseISO(date);
        
        const createAppointment = new CreateAppointmentService();

        const appointment = await createAppointment.execute({date: parsedDate, provider_id})

        return response.json(appointment);
    
});

export default appointmentsRouter;