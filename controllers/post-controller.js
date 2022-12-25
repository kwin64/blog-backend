import commentModel from '../models/comment-model.js'
import postModel from '../models/post-model.js'

export const create = async (req, res) => {
	try {
		const doc = new postModel({
			title: req.body.title,
			text: req.body.text,
			imageUrl: req.body.imageUrl,
			tags: req.body.tags,
			user: req.userId
		})

		const post = await doc.save()
		res.json(post)
	} catch (error) {
		console.log(error)
		res.status(500).json({
			message: 'failed to create post'
		})
	}
}

export const getTags = async (req, res) => {
	try {
		const posts = await postModel.find().limit(5).exec()
		const tags = posts
			.map(obj => obj.tags)
			.flatMap()
			.slice(0, 5)
		res.json(tags)
	} catch (error) {
		console.log(error)
		res.status(500).json({
			message: 'failed to get posts'
		})
	}
}

export const getAllPosts = async (req, res) => {
	try {
		const posts = await postModel.find().populate('user').exec()
		res.json(posts)
	} catch (error) {
		console.log(error)
		res.status(500).json({
			message: 'failed to get posts'
		})
	}
}

export const getOne = async (req, res) => {
	try {
		const postId = req.params.id
		postModel
			.findOneAndUpdate(
				{
					_id: postId
				},
				{
					$inc: { viewsCount: 1 }
				},
				{
					returnDocument: 'after'
				},
				(error, doc) => {
					if (error) {
						console.log(error)
						return res.status(500).json({
							message: 'failed return article'
						})
					}

					if (!doc) {
						return res.status(404).json({
							message: 'article not found'
						})
					}
					res.json(doc)
				}
			)
			.populate('user')
	} catch (error) {
		console.log(error)
		res.status(500).json({
			message: 'failed to get posts'
		})
	}
}

export const remove = async (req, res) => {
	try {
		const postId = req.params.id

		const commentsPosts = await postModel.findById({ _id: postId })

		const arrIdComments = commentsPosts.comments.map(comment => comment._id.toString())

		await commentModel.deleteMany({ _id: { $in: arrIdComments } })

		postModel.findOneAndDelete(
			{
				_id: postId
			},
			(error, doc) => {
				if (error) {
					console.log(error)
					return res.status(500).json({
						message: 'failed remove article'
					})
				}

				if (!doc) {
					return res.status(404).json({
						message: 'article not found'
					})
				}

				res.json({ success: true })
			}
		)
	} catch (error) {
		console.log(error)
		res.status(500).json({
			message: 'failed to get posts'
		})
	}
}

export const update = async (req, res) => {
	try {
		const postId = req.params.id
		await postModel.updateOne(
			{
				_id: postId
			},
			{
				title: req.body.title,
				text: req.body.text,
				imageUrl: req.body.imageUrl,
				user: req.userId,
				tags: req.body.tags
			}
		)

		res.json({ success: true })
	} catch (error) {
		console.log(error)
		res.status(500).json({
			message: 'failed update post'
		})
	}
}

export const getComments = async (req, res) => {
	try {
		const postId = req.params.id

		const post = await postModel.findById(postId)

		const list = await Promise.all(post.comments.map(comment => commentModel.findById(comment)))
		res.json(list)
	} catch (error) {
		res.json({ message: 'failed get comments' })
	}
}
