import mongoose from 'mongoose'

const CommentModel = new mongoose.Schema(
	{
		idUser: { type: String, required: true },
		comment: { type: String, required: true },
		avatarUrl: { 
      public_id: { type: String, required: true},
      url: { type: String, required: true}
    },
		name: { type: String, required: true }
	},
	{
		timestamps: true
	}
)

export default mongoose.model('Comment', CommentModel)
