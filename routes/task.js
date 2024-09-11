const { Router } = require('express')
const task = require('../controllers/task')

const router = Router();

router.get('/addtask/:id', task.addtask);
router.post('/Addtask/:id', task.Addtask);

router.post('/', task.addtask);

router.get('/mytask/:id', task.mytask);
router.get('/regulartask/:id', task.regulartask);

router.get('/editTask/:id', task.editTask)
router.post('/EditTask/:id', task.EditTask)

router.get('/delete/:id', task.delete);
router.get('/status/:id', task.status)
module.exports = router;