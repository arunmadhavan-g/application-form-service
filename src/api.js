import {transaction} from "objection";
import Application from "./models/application"
import ApplicationForms from "./models/ApplicationForms";


export default router => {
    router.post("/applications", async (req, res) => {
        const graph = req.body;
        const inserted = await transaction(Application.knex(),
                                                tx => Application.query(tx)
                                                                        .insertGraph(graph));
        res.send(inserted);
    });

    router.get("/applications", async (req, res) => {
        console.log("is it coming here?");
        const application = await Application.query().orderBy("id");
        res.send(application);
    });


    router.post("/application_forms", async (req, res)=>{
       const graph = req.body;
        // console.log("graph", graph);
        const inserted = await transaction(ApplicationForms.knex(),
                                                tx => ApplicationForms.query(tx)
                                                    .insertGraph(graph));
       res.send(inserted);
    });
}