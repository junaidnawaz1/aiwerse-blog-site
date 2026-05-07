// import mongoose from 'mongoose'

// const commentSchema = new mongoose.Schema({
//   user: String,
//   text: String,
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// })

// const postSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true
//   },
//   content: {
//     type: String,
//     required: true
//   },
//   imageUrl: String,
//   category: {
//     type: String,
//     required: true
//   },
//   seoTitle: String,
//   seoDescription: String,
//   likes: {
//     type: Number,
//     default: 0
//   },
//   comments: [commentSchema],
//   shares: {
//     type: Number,
//     default: 0
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// })

// export const Post = mongoose.models.Post || mongoose.model('Post', postSchema)

import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
  user: String,
  text: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    unique: true,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  imageUrl: String,
  category: {
    type: String,
    required: true
  },
  seoTitle: String,
  seoDescription: String,
  likes: {
    type: Number,
    default: 0
  },
  comments: [commentSchema],
  shares: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})
export const Post = mongoose.models.Post || mongoose.model('Post', postSchema)
