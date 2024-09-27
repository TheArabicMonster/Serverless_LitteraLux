import express from "express";
import cors from "cors";
import { initDb, Livre, sequelize } from "./db/sequelize.mjs";
import { livresRouter } from "./routes/livres.mjs";
import { loginRouter } from "./routes/login.mjs";
import { categoriesRouter } from "./routes/categories.mjs";
import { editeursRouter } from "./routes/editeurs.mjs";
import { auteursRouter } from "./routes/auteurs.mjs";
import { commentairesRouter } from "./routes/commentaires.mjs";
import { utilisateursRouter } from "./routes/utilisateurs.mjs";


const app = express();

app.use(express.json());
app.use(cors());
const port = process.env.PORT || 3000;

// Test de connexion à la base de données
sequelize
    .authenticate()
    .then((_) =>
        console.log("La connexion à la base de données a bien été établie")
    )
    .catch((error) => console.error("Impossible de se connecter à la DB"));
    initDb();

app.get("/api/", (req, res) => {
    res.redirect(`http://localhost:${port}/`);
});

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
});

app.use("/api/login", loginRouter);
app.use("/api/livres", livresRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/editeurs", editeursRouter);
app.use("/api/auteurs", auteursRouter);
app.use("/api/commentaires", commentairesRouter);
app.use("/api/utilisateurs", utilisateursRouter);
// Si aucune route ne correspondant à l'URL demandée par le consommateur
app.use(({ res }) => {
    const message =
        "Impossible de trouver la ressource demandée! Vous pouvez essayez un autre URL.";
    res.status(404).json(message);
});