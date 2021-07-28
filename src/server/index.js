import express from "express";
import cors from 'cors';
import bodyParser from "body-parser"
import { initConnection } from './initConnection.js'
import { GET_TODOS, ADD_TODOS, UPDATE_TODOS, DELETE_TODOS } from './routes.js';

const app = express();
const port = 3005;

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

initConnection().then(TodoModel => {

    const getTodos = (req, res) => {
        TodoModel.find({}, (err, response) => {
            res.send(
                { 
                    msg: 'got successfully', 
                    data: response,
                    error: false
                }
            );
        })
    }
    
    const addTodos = (req, res) => {
        const { value, isDone } = req.body
        const testt = new TodoModel({ value, isDone })
        testt.save((err, resp) => {
            if (err) return console.error(err);
            res.send({ msg: 'added successfully', data: resp, error: false });
        });
    }
    
    const updateTodos = (req, res) => {
        TodoModel.findByIdAndUpdate(req.body._id, { ...req.body }, (err, result) => {
            if (err) {
                res.send({ msg: 'error', error: true });
            } else {
                res.json({ msg: 'successfully updated', error: false, data: result });
            }
        });
    }
    
    const deleteTodos = (req, res) => {
        TodoModel.findByIdAndDelete(req.body._id, error => {
            if (error) res.send({ msg: "error occured", error: true })
            else res.send({ msg: "deleted successfully", error: false })
        })
    }
    
    app.get(GET_TODOS, getTodos);
    app.post(ADD_TODOS, addTodos);
    app.put(UPDATE_TODOS, updateTodos);
    app.delete(DELETE_TODOS, deleteTodos);

}).catch(error => console.error(error))

app.listen(port, () => console.log( `serving at: ${ port }`));