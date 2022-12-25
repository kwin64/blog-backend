
import { Router } from 'express'
import { getMe, login, register } from '../controllers/user-controller.js'
import authMiddleware from '../middlewares/auth-middleware.js'
import validationErrorsMiddleware from '../middlewares/validationErrors-middleware.js'
import { loginValidation, registrationValidation } from '../validation/auth.js'
const router = new Router()

router.post('/register',registrationValidation,validationErrorsMiddleware,register)
router.post('/login',loginValidation,validationErrorsMiddleware,login)
router.get('/me',authMiddleware,getMe)

export default router