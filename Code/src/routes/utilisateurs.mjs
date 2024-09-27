// Importation des modules
import express from "express";
import { success, getUniqueId } from "./helper.mjs";

// Importation des modèles
import { Utilisateur } from "../db/sequelize.mjs";

// Création du routeur
const utilisateursRouter = express();

// route GET /utilisateurs
utilisateursRouter.get("/", (req, res) => { // Récupérer la liste des utilisateurs
  Utilisateur.findAll()
    .then((utilisateurs) => {
      const message = "La liste des utilisateurs a bien été récupérée.";
      res.json(success(message, utilisateurs));
    })
    .catch((error) => {
      const message =
        "La liste des utilisateurs n'a pas pu être récupérée. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
});

// route GET /utilisateurs/:id
utilisateursRouter.get("/:id", (req, res) => { // Récupérer un utilisateur par son id
  Utilisateur.findByPk(req.params.id)
    .then((utilisateur) => {
      if (utilisateur === null) {
        const message =
          "L'utilisateur demandé n'existe pas. Merci de réessayer avec un autre identifiant.";
        return res.status(404).json({ message });
      }
      const message = `L'utilisateur dont l'id vaut ${req.params.id} a bien été récupéré.`;
      res.json(success(message, utilisateur));
    })
    .catch((error) => {
      const message =
        "L'utilisateur n'a pas pu être récupéré. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
});

// route POST /utilisateurs
utilisateursRouter.post("/", (req, res) => { // Créer un utilisateur
  Utilisateur.create(req.body)
    .then((createdUtilisateur) => {
      const message = `L'utilisateur ${createdUtilisateur.pseudo} a bien été créé !`;
      res.json(success(message, createdUtilisateur));
    })
    .catch((error) => {
      const message =
        "L'utilisateur n'a pas pu être ajouté. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
});

// route DELETE /utilisateurs/:id
utilisateursRouter.delete("/:id", (req, res) => { // Supprimer un utilisateur
  Utilisateur.findByPk(req.params.id)
    .then((utilisateur) => {
      if (utilisateur === null) {
        const message =
          "L'utilisateur demandé n'existe pas. Merci de réessayer avec un autre identifiant.";
        return res.status(404).json({ message });
      }
      return utilisateur.destroy();
    })
    .then(() => {
      const message = `L'utilisateur dont l'id vaut ${req.params.id} a bien été supprimé.`;
      res.json(success(message));
    })
    .catch((error) => {
      const message =
        "L'utilisateur n'a pas pu être supprimé. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
});

// Exportation du routeur
export { utilisateursRouter };