import mongoose from 'mongoose'

export const initConnection = () => {
    return new Promise((resolve, reject) => {
        try {
            // connection
            mongoose.connect("mongodb+srv://abhisheks:admin@cluster0.gr3w7.mongodb.net/personal?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});
            mongoose.connection.once('connected', function() {
                console.log('connected')
            });
            // declaring schema
            const TodoSchema = new mongoose.Schema({ value: String, isDone: Boolean });
            // compiling schema into model
            const TodoModel = mongoose.model('TodoSchema', TodoSchema);
            resolve(TodoModel)
        } catch(e) {
            reject(new Error(e.message))
        }
    })
}