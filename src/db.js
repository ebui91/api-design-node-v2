import mongoose from 'mongoose'
mongoose.Promise = global.Promise

export const connect = () => {
  return mongoose.connect('mongodb://@ds223509.mlab.com:23509/bui-mongodb-test', {
    useMongoClient: true
  })
}
