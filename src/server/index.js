import express from "express";
import cors from 'cors';
import bodyParser from "body-parser"
import mongoose from 'mongoose';
const app = express();
const port = 3005;

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// connection
mongoose.connect("mongodb+srv://abhisheks:admin@cluster0.gr3w7.mongodb.net/personal?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

// db.on('error', console.error.bind(console, 'connection error:'));
db.once('connected', function() {
    console.log('connected')
});

// declaring schema
const TodoSchema = new mongoose.Schema({
    value: String,
    isDone: Boolean
});

// compiling schema into model
const TodoModel = mongoose.model('TodoSchema', TodoSchema);

app.get("/get-todos", (req, res) => {
    TodoModel.find({}, (err, response) => {
        res.send(
            { 
                msg: 'got successfully', 
                data: response,
                error: false
            }
        );
    })
});

app.post("/add-todos", (req, res) => {
    const { value, isDone } = req.body
    const testt = new TodoModel({ value, isDone })
    testt.save((err, resp) => {
        if (err) return console.error(err);
        res.send({ msg: 'added successfully', data: resp, error: false });
    });
});

app.put("/update-todos", (req, res) => {
    TodoModel.findByIdAndUpdate(req.body._id, { ...req.body }, (err, result) => {
        if (err) {
            res.send({ msg: 'error', error: true });
        } else {
            res.json({ msg: 'successfully updated', error: false, data: result });
        }
    });
});

app.delete("/delete-todos", ( req, res ) => {
    TodoModel.findByIdAndDelete(req.body._id, error => {
        if (error) res.send({ msg: "error occured", error: true })
        else res.send({ msg: "deleted successfully", error: false })
    })
});

app.listen(port, () => {
    console.log( `serving at: ${ port }`)
});