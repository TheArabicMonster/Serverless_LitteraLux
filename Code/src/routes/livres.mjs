import express from "express";
import { success, getUniqueId } from "./helper.mjs";
import { Livre } from "../db/sequelize.mjs";
import { auth } from "../auth/auth.mjs";
const livresRouter = express();

// route GET /livres avec authentification
livresRouter.get("/", (req, res) => { // Récupérer tous les livres
  Livre.findAll()
    .then((livres) => {
      const message = "La liste des livres a bien été récupérée.";
      res.json(success(message, livres));
    })
    .catch((error) => {
      const message =
        "La liste des livres n'a pas pu être récupérée. merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
});

// route GET /livres/recent 
livresRouter.get("/recent", (req, res) => { // Récupérer les 5 derniers livres
  Livre.findAll({ order: [["created_at", "DESC"]], limit: 5 })
    .then((livres) => {
      const message = "Les 5 derniers livres ont bien été récupérés.";
      res.json(success(message, livres));
    })
    .catch((error) => {
      const message =
        "Les 5 derniers livres n'ont pas pu être récupérés. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
});

// route GET /livres/:id avec authentification
livresRouter.get("/:id", (req, res) => { // Récupérer un livre par son id 
  Livre.findByPk(req.params.id)
    .then((livre) => {
      if (livre === null) {
        const message =
          "Le livre demandé n'existe pas. merci de réessayer avec un autre identifiant.";
        return res.status(404).json({ message });
      }
      const message = `Le livre dont l'id vaut ${req.params.id} a bien été récupéré.`
      res.json(success(message, livre));
    })
    .catch((error) => {
      const message =
        "Le livre n'a pas pu être récupéré. merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
});

// route POST /livres avec authentification
livresRouter.post("/", (req, res) => { // Créer un livre
  Livre.create(req.body)
    .then((createdLivre) => {
      const message = `Le livre ${createdLivre.titre} a bien été créé !`;
      res.json(success(message, createdLivre));
    })
    .catch((error) => {
      const message =
        "Le livre n'a pas pu être ajouté. merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
});

// route DELETE /livres/:id avec authentification



livresRouter.delete("/:id", auth, (req, res) => { // Supprimer un livre
  Livre.findByPk(req.params.id)
    .then((livre) => {
      if (livre === null) {
        const message =
          "Le livre demandé n'existe pas. Merci de réessayer avec un autre identifiant.";
        return res.status(404).json({ message });
      }
      Livre.destroy({ where: { idlivre: req.params.id } })
        .then(() => {
          const message = `Le livre ${livre.titre} a bien été supprimé !`;
          res.json(success(message, livre));
        })
        .catch((error) => {
          const message =
            "Le livre n'a pas pu être supprimé. Merci de réessayer dans quelques instants.";
          res.status(500).json({ message, data: error });
        });
    });
});


// route PUT /livres/:id avec authentification
livresRouter.put("/:id", auth, (req, res) => { // Mettre à jour un livre
  Livre.findByPk(req.params.id)
    .then((livre) => {
      if (livre === null) {
        const message =
          "Le livre demandé n'existe pas. Merci de réessayer avec un autre identifiant.";
        return res.status(404).json({ message });
      }
      livre.update(req.body);
      const message = `Le livre ${livre.titre} a bien été mis à jour !`;
      res.json(success(message, livre));
    })
    .catch((error) => {
      const message =
        "Le livre n'a pas pu être mis à jour. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
});
/*
livresRouter.get("/:id/commentaires", (req, res) => { // Récupérer les livres d'une catégorie
  Livre.findByPk(req.params.id, { include: "commentaires" }) // On inclut les livres de la catégorie
    .then((livre) => { // Si la catégorie n'existe pas
      if (livre === null) { // On renvoie un message d'erreur
        const message =
          "La catégorie demandée n'existe pas. Merci de réessayer avec un autre identifiant.";
        return res.status(404).json({ message });
      } // Si la catégorie existe on renvoie les livres de la catégorie
      const message = `Les livres de la catégorie ${livre.nom} ont bien été récupérés.`;
      res.json(success(message, livre.commentaires));
    }
    )
    .catch((error) => { // Si une erreur survient on renvoie un message d'erreur
      const message =
        "Les livres de la catégorie n'ont pas pu être récupérés. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
}
);*/


export { livresRouter };