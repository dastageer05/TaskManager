const {Router} = require('express');
const user = require('../controllers/user')
const router = Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/profile/`))
  },
  filename: function (req, file, cb) {
     const fileName = `${Date.now()}-${file.originalname}`;
     cb(null, fileName);
  }
})

const upload = multer({ storage: storage });

router.get('/signin', user.Signin);
router.get('/signup', user.Signup);

router.post('/signin', user.signin);
router.post('/signup', upload.single('profileImage'), user.signup);

router.get('/logout', user.logout);

router.get('/about/:id', user.about);

router.get('/editUser/:id', user.editUser);
router.post('/EditUser/:id', upload.single('profileImage'), user.EditUser);

router.get('/changePassword/:id', user.changePassword);
router.post('/ChangePassword/:id', user.ChangePassword)

module.exports = router;