import Dexie from 'https://cdn.jsdelivr.net/npm/dexie@3.0.3/dist/dexie.mjs';

let db;

export default class CourseService {

    constructor() {
        this.#initializeDB();
    }

    #initializeDB() {
        db = new Dexie('courseDB');

        db.version(1).stores({
            courses: "++id, &title", 
        });

        db.on("populate", async () => {
            await db.courses.bulkPut([
                { title: "Serverless", description: "Serverless architecture using AWS", duration: 50, link: "https://serverlessaws.cursos.erickwendel.com.br"}
            ]);
        });

        db.open();
    }

    getAll() {
        return db.courses.toArray();
    }

    get(id) {
        return db.courses.get(id);
    }

    save(course) {
        return db.courses.put(course);
    }

    delete(id) {
        return db.courses.delete(id);
    }
}