import { Express } from 'express';
import { engine } from 'express-handlebars';
import dotenv from 'dotenv';
import path from "path";
import router from '../routes/index';

class Config {
    public init(app: Express) {
        // dotenv
        dotenv.config();

        // Handlebars
        app.engine('.hbs', engine(
            {
                extname: ".hbs",
                defaultLayout: "main",
                layoutsDir: path.join(__dirname, "..", "views/layouts"), // back to previous directory
                
                partialsDir: path.join(__dirname, "..", "views/partials") // back to previous directory
            }
        ));

        app.set('view engine', '.hbs');
        app.set('views', path.join(__dirname, '..', 'views'));

        // APIs
        app.use('/', router);

    }
}

export const config = new Config();