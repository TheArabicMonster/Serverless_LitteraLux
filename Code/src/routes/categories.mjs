// Importation des modules
import express from "express";
import { success, getUniqueId } from "./helper.mjs";
import { auth } from "../auth/auth.mjs";

// Importation des modèles
import { Categories, Livre } from "../db/sequelize.mjs";
import { livres } from "../db/mockup-livres.mjs";

// Création du routeur
const categoriesRouter = express();

// route GET /categories avec l'authentification
categoriesRouter.get("/", (req, res) => { // Récupérer toutes les catégories
  Categories.findAll()
    .then((Categories) => {
      const message = "La liste des catégories a bien été récupérée.";
      res.json(success(message, Categories));
    })
    .catch((error) => {
      const message = "La liste des catégories n'a pas pu être récupérée. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
});


// route GET /categories/:id permet de récupérer touts les livres d'une catégorie avec l'authentification 
categoriesRouter.get("/:id/livres/", async (req, res) => {
  Categories.findByPk(req.params.id)
    .then((categorie) => {
      if (categorie === null) {
        const message =
          "La categorie demandée n'existe pas. Merci de réessayer avec un autre identifiant.";
        return res.status(404).json({ message });
      }
      return Livre.findAndCountAll({
        where: {
          id_categorie: categorie.idCategorie,
        },
        order: ["titre"],
      }).then((livres) => {
        let message;
        if (livres.count === 0) {
          message = `Il n'y a pas de produits pour la catégorie dont l'id vaut ${req.params.id}.`;
        } else {
          message = `La liste des produits de la catégorie dont l'id vaut ${req.params.id} a bien été récupérée.`;
        }
        res.json({ message, data: livres });
      });
    })
    .catch((error) => {
      const message =
        "La liste des produits de la catégorie n'a pas pu être récupérée. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
});


// route POST /categories avec l'authentification
categoriesRouter.post("/", auth, (req, res) => { // Créer une catégorie
  Categories.create(req.body)
    .then((createdCategorie) => {
      const message = `La catégorie ${createdCategorie.nom} a bien été créée !`;
      res.json(success(message, createdCategorie));
    })
    .catch((error) => {
      const message =
        "La catégorie n'a pas pu être ajoutée. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
});

// route DELETE /categories/:id avec l'authentification
categoriesRouter.delete("/:id", auth, (req, res) => { // Supprimer une catégorie
  Categories.findByPk(req.params.id)
    .then((categorie) => {
      if (categorie === null) {
        const message =
          "La catégorie demandée n'existe pas. Merci de réessayer avec un autre identifiant.";
        return res.status(404).json({ message });
      }
      categorie.destroy()
        .then(() => {
          const message = `La catégorie dont l'id vaut ${req.params.id} a bien été supprimée.`;
          res.json(success(message));
        })
        .catch((error) => {
          const message =
            "La catégorie n'a pas pu être supprimée. Merci de réessayer dans quelques instants.";
          res.status(500).json({ message, data: error });
        });
    })
    .catch((error) => {
      const message =
        "La catégorie n'a pas pu être récupérée. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
});

// route GET /categories/:id/livres avec l'authentification, route imbriquée
categoriesRouter.get("/:id/livres", auth, (req, res) => { // Récupérer les livres d'une catégorie
  Categories.findByPk(req.params.id, { include: "livres" }) // On inclut les livres de la catégorie
    .then((categorie) => { // Si la catégorie n'existe pas
      if (categorie === null) { // On renvoie un message d'erreur
        const message =
          "La catégorie demandée n'existe pas. Merci de réessayer avec un autre identifiant.";
        return res.status(404).json({ message });
      } // Si la catégorie existe on renvoie les livres de la catégorie
      const message = `Les livres de la catégorie ${categorie.nom} ont bien été récupérés.`;
      res.json(success(message, categorie.livres));
    }
    )
    .catch((error) => { // Si une erreur survient on renvoie un message d'erreur
      const message =
        "Les livres de la catégorie n'ont pas pu être récupérés. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
}
);


// route GET /livres/:id avec authentification
categoriesRouter.get("/:id", (req, res) => { // Récupérer un livre par son id 
  Categories.findByPk(req.params.id)
    .then((categorie) => {
      if (categorie === null) {
        const message =
          "Le livre demandé n'existe pas. merci de réessayer avec un autre identifiant.";
        return res.status(404).json({ message });
      }
      const message = `Le livre dont l'id vaut ${req.params.id} a bien été récupéré.`
      res.json(success(message, categorie));
    })
    .catch((error) => {
      const message =
        "Le livre n'a pas pu être récupéré. merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
});





// categoriesRouter.get("/:id/livres", auth, (req, res) => { // Récupérer les livres d'une catégorie
//   Categorie.findByPk(req.params.id, { include: "livres" }) // On inclut les livres de la catégorie
//     .then((categorie) => { // Si la catégorie n'existe pas
//       if (categorie === null) { // On renvoie un message d'erreur
//         const message =
//           "La catégorie demandée n'existe pas. Merci de réessayer avec un autre identifiant.";
//         return res.status(404).json({ message });
//       } // Si la catégorie existe on renvoie les livres de la catégorie
//       const message = `Les livres de la catégorie ${categorie.nom} ont bien été récupérés.`;
//       res.json(success(message, categorie.livres));
//     })
//     .catch((error) => { // Si une erreur survient on renvoie un message d'erreur
//       const message =
//         "Les livres de la catégorie n'ont pas pu être récupérés. Merci de réessayer dans quelques instants.";
//       res.status(500).json({ message, data: error });
//     });
// });


// categoriesRouter.get("/:id/livres", auth, (req, res) => { // Récupérer les livres d'une catégorie
//   Categorie.findByPk(req.params.id, { include: "livres" }) // On inclut les livres de la catégorie
//     .then((categorie) => { // Si la catégorie n'existe pas
//       if (categorie === null) { // On renvoie un message d'erreur
//         const message =
//           "La catégorie demandée n'existe pas. Merci de réessayer avec un autre identifiant.";
//         return res.status(404).json({ message });
//       } // Si la catégorie existe on renvoie les livres de la catégorie
//       const message = `Les livres de la catégorie ${categorie.nom} ont bien été récupérés.`;
//       res.json(success(message, categorie.livres));
//     })
//     .catch((error) => { // Si une erreur survient on renvoie un message d'erreur
//       const message =
//         "Les livres de la catégorie n'ont pas pu être récupérés. Merci de réessayer dans quelques instants.";
//       res.status(500).json({ message, data: error });
//     });
// });

// Exportation du routeur
export { categoriesRouter };