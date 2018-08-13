import merge from 'lodash.merge'
const testData = {message: 'hello'}

// These are generic methods used in the generic controllers for all models
export const controllers = {
  createOne(model, body) {
    return Promise.resolve(testData)
  },

  updateOne(docToUpdate, update) {
    return Promise.resolve(testData)
  },

  deleteOne(docToDelete) {
    return Promise.resolve(testData)
  },

  getOne(docToGet) {
    return Promise.resolve(testData)
  },

  getAll(model) {
    return Promise.resolve(testData)
  },

  findByParam(model, id) {
    return Promise.resolve(testData)
  }
}

export const createOne = (model) => (req, res, next) => {
  return controllers.createOne(model, req.body)
    .then(response => res.status(201).json(response))
    .catch(error => res.status(500).send("Error: could not process createOne."))
}

export const updateOne = (model) => async (req, res, next) => {
  const docToUpdate = req.docFromId
  const update = req.body

  return controllers.updateOne(docToUpdate, update)
    .then(response => res.status(200).json(reponse))
    .catch(error => res.status(500).send("Error: could not process updateOne."))
}

export const deleteOne = (model) => (req, res, next) => {
  const docToDelete = req.docFromId

  return controllers.deleteOne(docToDelete)
    .then(response => res.status(200).json(response))
    .catch(error => res.status(500).send("Error: could not process deleteOne."))
}

export const getOne = (model) => (req, res, next) => {
  const docToGet = req.docFromId

  return controllers.getOne(docToGet)
    .then(response => res.status(200).json(response))
    .catch(error => res.status(500).send("Error: could not fetch data for getOne."))
}

export const getAll = (model) => (req, res, next) => {
  return controllers.getAll(model)
    .then(response => res.status(200).json(response))
    .catch(error => res.status(500).send("Error: could not fetch data for getAll."))
}

export const findByParam = (model) => (req, res, next, id) => {
  return controllers.findByParam(model, id || req.params.id)
    .then(doc => {
      if(!doc) {
        next(new Error('Data not found.'))
      }
      req.docFromId = doc
      next()
    })
    .catch(error => res.status(500).send(`Error: could not find data with id: ${id}.`))
}


export const generateControllers = (model, overrides = {}) => {
  const defaults = {
    findByParam: findByParam(model),
    getAll: getAll(model),
    getOne: getOne(model),
    deleteOne: deleteOne(model),
    updateOne: updateOne(model),
    createOne: createOne(model)
  }

  return {...defaults, ...overrides}
}
