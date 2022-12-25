import { Router } from 'express'
import {
	createComment,
	removeComment,
	getComment,
	updateComment
} from '../controllers/comment-controller.js'
import {
	create,
	getAllPosts,
	getOne,
	getTags,
	remove,
	update,
	getComments
} from '../controllers/post-controller.js'
import authMiddleware from '../middlewares/auth-middleware.js'
import validationErrorsMiddleware from '../middlewares/validationErrors-middleware.js'
import { postCreateValidation } from '../validation/post.js'
const router = new Router()

router.get('/', getAllPosts)
router.get('/tags', getTags)
router.get('/:id', getOne)

router.get('/comments/:id', getComments)
router.get('/comment/:id', getComment)
router.post('/:id/comment', authMiddleware, createComment)
router.delete('/:id/comment/:idComment', authMiddleware, removeComment)
router.patch('/comment/:id', authMiddleware, updateComment)

router.post('/', authMiddleware, postCreateValidation, validationErrorsMiddleware, create)
router.delete('/:id', authMiddleware, remove)
router.patch('/:id', authMiddleware, postCreateValidation, validationErrorsMiddleware, update)

export default router
