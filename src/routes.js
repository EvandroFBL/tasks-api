import { Database } from './database.js';
import { randomUUID } from 'node:crypto'
import { buildRoutePath } from './utils/build-route-path.js';
import { title } from 'node:process';

const database = new Database()

export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {
            const { search } = req.query
            const tasks = database.select('tasks', {
                title: search,
                description: search
            })
            return res.end(JSON.stringify(tasks));
        }
    },
    {
        method: 'POST',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {
            const { title, description } = req.body
            const task = {
                id: randomUUID(),
                title,
                description,
                completed_at: null,
                created_at: new Date(),
                updated_at: new Date()
            }
            database.insert('tasks', task)
            return res.writeHead(204).end()
        }
    },
    {
        method: 'PUT',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {
            const { title, description } = req.body
            const { id } = req.params

            if (!title && !description) {
                return res.writeHead(400).end(JSON.stringify({message: 'Title or Description are required.'}))
            }
            
            const task = database.select('tasks', {id})
            if (!task) {
                return res.writeHead(400).end(JSON.stringify({message: 'Task not found'}))
            }

            database.update('tasks', id, { title, description })

            return res.writeHead(204).end()
        }
    }
]