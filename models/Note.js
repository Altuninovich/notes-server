const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  name: {type: String, default: '---'},
  code: {type: String, required: true, unique: true},
  date: {type: Date, default: Date.now},
  owner: {type: Types.ObjectId, ref: 'User'},
  task: {type: String, default: '---'},
  timeUTC: {type: String, default: null}
})

module.exports = model('Note', schema)
