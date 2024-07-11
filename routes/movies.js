import { Router } from "express";

import { MovieController } from "../controllers/movies.js";

export const moviesRouter = Router()

moviesRouter.get('/', MovieController.getAll)
moviesRouter.post('/', MovieController.create)

moviesRouter.get('/:id', MovieController.getId)
moviesRouter.patch('/:id', MovieController.update)
moviesRouter.delete('/:id', MovieController.delete)