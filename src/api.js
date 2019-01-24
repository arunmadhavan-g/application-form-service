import {createApplication, allApplications, getApplication} from "./models/application"
import {loginCount} from "./models/admin";
import {start, end} from "./models/schedule";
import json2xls from 'json2xls';
import pug from "pug/lib";
import pdf from "html-pdf";

export default router => {


    router.get("/pdf/:id", async (req, res) => {
        const val = await getApplication(req.params.id);
        const applicationTemplate= pug.compileFile('templates/application.pug');

        const html = applicationTemplate({
            pageTitle: val.name,
            youAreUsingPug: true,
            foo: true,
            bar: val.id
        });

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=application.pdf');

        pdf.create(html).toStream((err, stream) => {
            stream.pipe(res)
        });

        // res.send(html);
    });


    router.get("/application/:id", async (req, res) => {
        const val = await getApplication(req.params.id);
        console.log("the val queries is:", val, req.params.id);
        res.send(val);
    });

    // unprotected
    router.post("/application", async (req, res) => {
        const graph = req.body;
        const inserted = await createApplication(graph);
        res.send(inserted);
    });

    //unprotected
    router.post("/login", async (req, res) => {
        const {user, password} = req.body;
        const count = await loginCount(user, password);
        count > 0? res.status(200) : res.status(401);
        res.send();
    });

    //protected
    router.post("/start", async (req, res) => {
        const {event} = req.body;
        await start(event);
        res.send();
    });

    //protected
    router.post("/end", async (req, res) => {
        const {event} = req.body;
        await end(event);
        res.send();
    });

    //protected
    router.get("/application_dump", async (req, res) => {
       const all = await allApplications();
       const xlsx = json2xls(all);
       res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
       res.setHeader('Content-Disposition', 'attachment; filename=applications.xlsx');
       res.write(xlsx, 'binary');
       res.send();
    });
}