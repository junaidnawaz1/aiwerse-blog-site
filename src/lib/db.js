// import mongoose from 'mongoose'

// const MONGODB_URI = "mongodb+srv://Newsoo1:newsee1@newsee1.osqgnmy.mongodb.net/?appName=Newsee1&retryWrites=true&w=majority"

// if (!MONGODB_URI) {
//   console.error('MongoDB connection string is missing')
// }

// let cached = global._mongo || { conn: null, promise: null }
// if (!global._mongo) global._mongo = cached

// export async function connectToDatabase() {
//   if (cached.conn) return cached.conn

//   if (!cached.promise) {
//     cached.promise = mongoose
//       .connect(MONGODB_URI)
//       .then(() => {
//         console.log('MongoDB connected successfully')
//         cached.conn = mongoose.connection
//         return cached.conn
//       })
//       .catch((err) => {
//         console.error('MongoDB connection failed', err)
//         throw err
//       })
//   }

//   cached.conn = await cached.promise
//   return cached.conn
// }

// // Try to connect once when the module is first imported (log errors)
// connectToDatabase().catch((err) => console.error('Initial MongoDB connection error', err))

// // Export mongoose for reuse (models, etc.)
// export default mongoose
import mongoose from 'mongoose';

const MONGODB_URI = "mongodb://snipixofficial_db_user:snipixmyuser@ac-yxqlsoi-shard-00-00.osqgnmy.mongodb.net:27017,ac-yxqlsoi-shard-00-01.osqgnmy.mongodb.net:27017,ac-yxqlsoi-shard-00-02.osqgnmy.mongodb.net:27017/?ssl=true&replicaSet=atlas-hmoj0o-shard-0&authSource=admin&appName=Newsee1";

export async function connectToDatabase() {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected successfully');
    return mongoose.connection;
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    throw error;
  }
}

export default mongoose;