import mongoose from 'mongoose'

const url =
  'mongodb+srv://admin:admin@cluster0.gveo1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('db connected')
  })
  .catch(err => console.log(`error connecting Db: ${err}`))
