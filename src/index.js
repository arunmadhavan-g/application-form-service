import express from "express";
import pug from "pug";
// import pdf from "html-pdf";
import promiseRouter from "express-promise-router";
import registerApi from './api.js';
import Knex from 'knex';
import knexConfig from "../knexfile";
import {Model}  from 'objection';
import bodyParser from 'body-parser';

Model.knex(Knex(knexConfig.development));

const router = promiseRouter();
const app = express()
                .use(bodyParser.json())
                .use(router);
const port = 3000;

registerApi(router);

app.get("/pdf", (req, res) => {
    const applicationTemplate= pug.compileFile('templates/application.pug');

    const html = applicationTemplate({
        pageTitle: "VM Application",
        youAreUsingPug: true,
        foo: true,
        bar: (val) => `hello ${val}`
    });

    // res.setHeader('Content-Type', 'application/pdf');
    // res.setHeader('Content-Disposition', 'attachment; filename=application.pdf');

    // pdf.create(html).toStream((err, stream) => {
    //     stream.pipe(res)
    // });

    res.send(html);
});

app.listen(port, ()=> console.log("Started the server in Port"+ port));