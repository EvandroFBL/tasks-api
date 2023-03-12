import fs from 'node:fs/promises'

const databasePath = new URL('../db.json', import.meta.url);

export class Database {
    #database = {};

    constructor() {
        fs.readFile(databasePath, 'utf8').then(data => {
            this.#database = JSON.parse(data);
        }).catch(() => {
            this.#persist();
        });
    }
    
    #persist() {
        fs.writeFile(databasePath, JSON.stringify(this.#database));
    }
    
    select(table, search) {
        let data = this.#database[table] ?? [];
        
        if(search.title) {
            data = data.filter(row => {
                return Object.entries(search).some(([key, value]) => {
                    if(value) {
                        return row[key].toLowerCase().includes(value.toLowerCase());
                    }
                })
            })
        }
        
        return data;
    }

    insert(table, data) {
        if(Array.isArray(this.#database[table])){
            this.#database[table].push(data);
        } else {
            this.#database[table] = [data];
        }

        this.#persist();
    }

    update(table, id, data) {
        const rowIndex = this.#database[table].findIndex(row => row.id === id);

        if(rowIndex > -1) {
            let rowInfo = this.#database[table][rowIndex]
            if (data.title) Object.assign(rowInfo, {title: data.title})
            if (data.description) Object.assign(rowInfo, {description: data.description})
            Object.assign(rowInfo, {updated_at: new Date()})
            this.#database[table][rowIndex] = rowInfo
            this.#persist();
        }
    }

    delete(table, id) {
        const rowIndex = this.#database[table].findIndex(row => row.id === id);

        if(rowIndex) {
            this.#database[table].splice(rowIndex, 1);
            this.#persist();
        }    
    }
}