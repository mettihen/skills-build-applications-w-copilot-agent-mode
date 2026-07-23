import { Router } from 'express';
import { Model, SortOrder } from 'mongoose';

interface ResourceRouterOptions {
  sort?: Record<string, SortOrder>;
}

export function createResourceRouter<T>(model: Model<T>, options: ResourceRouterOptions = {}) {
  const router = Router();

  router.get('/', async (_req, res, next) => {
    try {
      const documents = await model.find().sort(options.sort || {}).exec();
      res.json(documents);
    } catch (error) {
      next(error);
    }
  });

  router.post('/', async (req, res, next) => {
    try {
      const document = await model.create(req.body);
      res.status(201).json(document);
    } catch (error) {
      next(error);
    }
  });

  return router;
}