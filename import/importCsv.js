import { parse } from 'csv-parse';
import fs from 'node:fs'

const csvPath = new URL('./tasks.csv', import.meta.url);

const readStream = fs.createReadStream(csvPath)

const csvParser = parse({
    delimiter: ',',
    from_line: 2,
    trim: true
})

async function run() {
    const lineParser = readStream.pipe(csvParser)

    for await (const line of lineParser) {
        const [title, description] = line
        
        await fetch('http://localhost:3434/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({title, description})
        })
    }
}

await run()