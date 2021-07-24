const express = require("express");
const cors = require('cors');
const app = express();
const port = 3005;

app.use(cors())

// connection
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://abhisheks:admin@cluster0.gr3w7.mongodb.net/personal?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('connected')
});

// declaring schema
const TodoSchema = new mongoose.Schema({
    id: String,
    value: String,
    isDone: Boolean
});

// compiling schema into model
const TodoModel = mongoose.model('TodoSchema', TodoSchema);
const testt = new TodoModel({ id: "123", value: "new value", isDone: false })
console.log(testt)

testt.save(function (err, resp) {
    if (err) return console.error(err);
    // fluffy.speak();
    console.log(resp)
});

app.get("/get-todos", ( req, res ) => {
    res.send(
        { 
            msg: 'got successfully', 
            data: [
                {
                    id: "1",
                    value: 'task 1',
                    isDone: false
                },
                {
                    id: "2",
                    value: 'task 2',
                    isDone: false
                }
            ] 
        }
    );
});

app.post("/add-todos", ( req, res ) => {
    res.send({ msg: 'added successfully' });
});

app.put("/update-todos", ( req, res ) => {
    res.send({ msg: 'updated successfully' });
});

app.delete("/delete-todos", ( req, res ) => {
    res.send({ msg: 'deleted successfully' });
});

app.listen(port, () => {
    console.log( `serving at: ${ port }`)
});