import { Router } from 'express';
import TrianguloController from './controllers/TrianguloController';

const routes = new Router();

routes.post('/tipo', TrianguloController.tipo);
routes.post('/area', TrianguloController.area);
routes.post('/perimetro', TrianguloController.perimetro);
routes.post('/verificacao', TrianguloController.verificacao);

export default routes;
