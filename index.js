import cors from 'cors'
import fs from 'fs'
import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import multer from 'multer'
import authRoute from './routes/auth.js'
import postsRoute from './routes/posts.js'
dotenv.config()

mongoose.set('strictQuery', false)
mongoose
	.connect(process.env.DB_URL)
	.then(() => console.log('db connected'))
	.catch(err => console.log('db error', err))

const app = express()
const storage = multer.diskStorage({
	destination: (_, __, cb) => {
		if (!fs.existsSync('uploads')) {
			fs.mkdirSync('uploads')
		}
		cb(null, 'uploads')
	},
	filename: (_, file, cb) => {
		cb(null, file.originalname)
	}
})
const upload = multer({ storage })
app.use(express.json())

app.use(
	cors({
		credentials: true,
		origin: '*'
	})
)
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//   next();
// });
// app.use(cors());

app.use('/uploads', express.static('uploads'))

//Routes
app.use('/auth', authRoute)
app.use('/posts', postsRoute)
app.post('/upload', upload.single('image'), (req, res) => {
	res.json({
		url: `/uploads/${req.file.originalname}`
	})
})

app.listen(process.env.PORT || 5080, () => console.log(`server started on ${process.env.PORT}`))
