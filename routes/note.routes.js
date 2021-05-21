const {Router} = require('express')
const config = require('config')
const shortid = require('shortid')
const Note = require('../models/Note')
const auth = require('../middleware/auth.middleware')
const router = Router()

router.post('/generate', auth, async (req, res) => {
  try {
    const {name, task, timeUTC} = req.body

    const code = shortid.generate()

    const note = new Note({
      code, name, owner: req.user.userId, task, timeUTC
    })

    await note.save()

    res.status(201).json({ note })
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

router.delete('/delete', auth, async (req, res) => {
  try {
    const { _id } = req.body
    await Note.deleteOne({ _id })
    res.status(202).json({message: `${_id} удален`})
  } catch (error) {
    
  }
})

router.get('/', auth, async (req, res) => {
  try {
    const notes = await Note.find({ owner: req.user.userId })
    res.json(notes)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

router.get('/:id', auth, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id)
    res.json(note)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

module.exports = router