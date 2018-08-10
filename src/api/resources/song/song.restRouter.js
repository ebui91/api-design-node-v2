import express from 'express'
import songController from './song.controller'
import userController from '../user/user.controller';

export const songRouter = express.Router()

songRouter.param('id', songController.findByParam)

songRouter.route('/') 
  .get(songController.getAll)
  .post(songController.createOne)

songRouter.route('/:id')
  .get(songController.getOne)
  .put(songController.updateOne)
  .delete(songController.deleteOne)