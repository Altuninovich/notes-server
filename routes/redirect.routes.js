const {Router} = require('express')
const Note = require('../models/Note')
const router = Router()


router.get('/:code', async (req, res) => {
  try {

    const note = await Note.findOne({ code: req.params.code })

    if (note) {
      await note.save()
      return res.redirect(note.from)
    }

    res.status(404).json('Заметка не найдена')

  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})


module.exports = router