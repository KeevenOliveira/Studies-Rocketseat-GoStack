import { Router } from 'express';

import CreateAppointmentService from '../../../services/CreateAppointmentService'; 
import ensureAuthenticated from '../../../../users/infra/http/middlewares/ensureAuthenticated';

import AppointmentsController from '../controllers/AppointmentsController';

const appointmentsRouter = Router();

const AppointmentController = new AppointmentsController();

appointmentsRouter.use(ensureAuthenticated); // vai aplicar esse middleware em todas as rotas

// appointmentsRouter.get('/', async (request, response)=>{

//     const appointment = await appointmentsRepository.find(); 

//     return response.json(appointment);
// })

appointmentsRouter.post('/', AppointmentController.create);

export default appointmentsRouter;