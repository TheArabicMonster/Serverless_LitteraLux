// Importation des modules
import express from "express";
import { success, getUniqueId } from "./helper.mjs";
import { auth } from "../auth/auth.mjs";

// Importation des modèles
import { Auteur } from "../db/sequelize.mjs";

// Création du routeur
const auteursRouter = express();

//route GET /auteurs avec l'authentification
auteursRouter.get("/", (req, res) => { // Récupérer tous les auteurs
  Auteur.findAll()
    .then((auteurs) => {
      const message = "La liste des auteurs a bien été récupérée.";
      res.json(success(message, auteurs));
    })
    .catch((error) => {
      const message =
        "La liste des auteurs n'a pas pu être récupérée. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
});

// route GET /auteurs/:id avec l'authentification
auteursRouter.get("/:id", (req, res) => { // Récupérer un auteur
  Auteur.findByPk(req.params.id)
    .then((auteur) => {
      if (auteur === null) {
        const message =
          "L'auteur demandé n'existe pas. Merci de réessayer avec un autre identifiant.";
        return res.status(404).json({ message });
      }
      const message = `L'auteur dont l'id vaut ${req.params.id} a bien été récupéré.`;
      res.json(success(message, auteur));
    })
    .catch((error) => {
      const message =
        "L'auteur n'a pas pu être récupéré. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
});

// route POST /auteurs avec l'authentification
auteursRouter.post("/", auth, (req, res) => { // Créer un auteur
  Auteur.create(req.body)
    .then((createdAuteur) => {
      const message = `L'auteur ${createdAuteur.nom} a bien été créé !`;
      res.json(success(message, createdAuteur));
    })
    .catch((error) => {
      const message =
        "L'auteur n'a pas pu être ajouté. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
});

// route DELETE /auteurs/:id
auteursRouter.delete("/:id", auth, (req, res) => { // Supprimer un auteur
  Auteur.findByPk(req.params.id)
    .then((auteur) => {
      if (auteur === null) {
        const message =
          "L'auteur demandé n'existe pas. Merci de réessayer avec un autre identifiant.";
        return res.status(404).json({ message });
      }
      auteur.destroy();
      const message = `L'auteur dont l'id vaut ${req.params.id} a bien été supprimé.`;
      res.json(success(message, auteur));
    })
    .catch((error) => {
      const message =
        "L'auteur n'a pas pu être supprimé. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
});

// Exportation du routeur
export { auteursRouter };