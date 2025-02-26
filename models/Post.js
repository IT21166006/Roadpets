import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    images: [{ type: String, required: true }],
    createdAt: { type: Date, default: Date.now },
    
});


const Post = mongoose.model('Post', postSchema);

export default Post;