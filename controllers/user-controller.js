import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import userModel from '../models/user-model.js'
import { v2 as cloudinary } from 'cloudinary'

export const register = async (req, res) => {
	try {
		const hashPassword = await bcrypt.hash(req.body.password, 3)

		cloudinary.config({
			cloud_name: process.env.CLOUD_NAME,
			api_key: process.env.CLOUD_KEY,
			api_secret: process.env.CLOUD_KEY_SECRET
		})

		const cloudAvatar = await cloudinary.uploader.upload(req.body.avatarUrl, {
			folder: 'avatars'
		})
		const doc = new userModel({
			email: req.body.email,
			password: hashPassword,
			avatarUrl: {
				public_id: cloudAvatar.public_id,
				url: cloudAvatar.secure_url
			},
			nickname: req.body.nickname
		})

		const user = await doc.save()

		const token = jwt.sign(
			{
				_id: user._id
			},
			process.env.JWT_ACCESS_SECRET,
			{ expiresIn: '30d' }
		)

		const { password, ...userData } = user._doc
		res.json({
			...userData,
			token
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({ message: 'Failed to register', error: error })
	}
}

export const login = async (req, res) => {
	try {
		const user = await userModel.findOne({ email: req.body.email })

		if (!user) {
			return res.status(404).json({
				message: 'User not found'
			})
		}

		const isValidPassword = await bcrypt.compare(req.body.password, user._doc.password)

		if (!isValidPassword) {
			return res.status(400).json({
				message: 'Bad login or password'
			})
		}

		const token = jwt.sign(
			{
				_id: user._id
			},
			process.env.JWT_ACCESS_SECRET,
			{ expiresIn: '30d' }
		)

		const { password, ...userData } = user._doc
		res.json({
			...userData,
			token
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({ message: 'Failed to authorise' })
	}
}

export const getMe = async (req, res) => {
	try {
		const user = await userModel.findById(req.userId)

		if (!user) {
			return res.status(404).json({
				message: 'User not found'
			})
		}

		const { password, ...userData } = user._doc
		res.json({
			...userData
		})
	} catch (error) {
		return res.status(500).json({
			message: "You don't have access"
		})
	}
}
