import express from "express";
import pug from "pug";
import pdf from "html-pdf";
import promiseRouter from "express-promise-router";
import registerApi from './api.js';
import Knex from 'knex';
import knexConfig from "../knexfile";
import {Model}  from 'objection';
import bodyParser from 'body-parser';
import helmet from 'helmet';

Model.knex(Knex(knexConfig.development));

const router = promiseRouter();
const app = express()
                .use(bodyParser.json())
                .use((req, res, next) => {
                    res.header('Access-Control-Allow-Origin', "*");
                    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
                    res.header('Access-Control-Allow-Headers', 'Content-Type');
                    next();
                })
                .use(router)
                .use(helmet());


const port = 3010;

registerApi(router);

// app.get("/pdf", (req, res) => {
//     const applicationTemplate= pug.compileFile('templates/application.pug');
//
//     const html = applicationTemplate({
//         pageTitle: "VM Application",
//         youAreUsingPug: true,
//         foo: true,
//         bar: (val) => `hello ${val}`
//     });
//
//     res.setHeader('Content-Type', 'application/pdf');
//     res.setHeader('Content-Disposition', 'attachment; filename=application.pdf');
//
//     pdf.create(html).toStream((err, stream) => {
//         stream.pipe(res)
//     });
//
//     // res.send(html);
// });

app.listen(port, ()=> console.log("Started the server in Port"+ port));