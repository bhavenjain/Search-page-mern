import mongoose from 'mongoose'
const Schema = mongoose.Schema

const search = new Schema({
  title: {
    type: String,
    required: true
  },
  source: {
    type: String,
    required: true
  },
  frequency: {
    type: String,
    required: true
  },
  unit: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
})

const Search = mongoose.model('SEARCH', search)
export default Search
