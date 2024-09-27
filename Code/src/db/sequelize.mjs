// Importation des modules
import { Sequelize, DataTypes } from "sequelize";
import bcrypt from "bcrypt";

//importation des mockup
import { utilisateurs } from "./mockup-utilisateurs.mjs";
import { livres } from "./mockup-livres.mjs";
import { commentaires } from "./mockup-commentaires.mjs";
import { auteurs } from "./mockup-auteurs.mjs";
import { categories } from "./mockup-categories.mjs";
import { editeurs } from "./mockup-editeurs.mjs";

//importation des models
import { livreModel } from "../models/livres.mjs";
import { utilisateursModel } from "../models/utilisateurs.mjs";
import { commentaireModel } from "../models/commentaires.mjs";
import { auteurModel } from "../models/auteurs.mjs";
import { categorieModel } from "../models/categories.mjs";
import { editeursModel } from "../models/editeurs.mjs";


const sequelize = new Sequelize(
  "db_livres", // Nom de la DB qui doit exister
  "root", // Nom de l'utilisateur
  "root", // Mot de passe de l'utilisateur
  {
    host: "localhost",
    port: "6033",// pour les conteneurs docker MySQL
    dialect: "mysql",
    logging: false,
  }
);

// Creation des tables a partir des modeles
const Livre = livreModel(sequelize, DataTypes);
const Utilisateur = utilisateursModel(sequelize, DataTypes);
const Commentaire = commentaireModel(sequelize, DataTypes);
const Auteur = auteurModel(sequelize, DataTypes);
const Categories = categorieModel(sequelize, DataTypes);
const Editeur = editeursModel(sequelize, DataTypes);

// Association des tables
// Un editeur peut avoir plusieurs livres
Editeur.hasMany(Livre, { foreignKey: "idEditeur" });
Livre.belongsTo(Editeur, { foreignKey: "idEditeur" });

// Un auteur peut avoir plusieurs livres
Auteur.hasMany(Livre, { foreignKey: "idAuteur" });
Livre.belongsTo(Auteur, { foreignKey: "idAuteur" });

// une categorie peut avoir plusieurs livres
Categories.hasMany(Livre, { foreignKey: "id_categorie" });
Livre.belongsTo(Categories, { foreignKey: "id_categorie" });

// Un livre peut avoir plusieurs commentaires
Livre.hasMany(Commentaire, { foreignKey: "idLivre" });
Commentaire.belongsTo(Livre, { foreignKey: "idLivre" });

// Un utilisateur peut avoir plusieurs livres
Utilisateur.hasMany(Livre, { foreignKey: "id_utilisateur" });
Livre.belongsTo(Utilisateur, { foreignKey: "id_utilisateur" });

// Un utilisateur peut avoir plusieurs commentaires
Utilisateur.hasMany(Commentaire, { foreignKey: "id_utilisateur" });
Commentaire.belongsTo(Utilisateur, { foreignKey: "id_utilisateur" });


// Fonction pour initialiser la base de données
let initDb = () => {
  return sequelize
    .sync({ force: true }) // Force la synchro => donc supprime les données également
    .then(() => {
      importAuteurs();
      importCategories();
      importEditeurs();
      importLivres();
      importCommentaires();
      importUtilisateurs();
      console.log("La base de données db_livres a bien été synchronisée");
    });
};



// Fonction pour importer les utilisateurs avec mot de passe hashé
const importUtilisateurs = () => {
  // Importe tous les utilisateurs présents dans un fichier ou une source de données
  utilisateurs.map((utilisateur) => {
    bcrypt.hash(utilisateur.motDePasse, 10).then((hash) => {
      Utilisateur.create({
        pseudo: utilisateur.pseudo,
        motDePasse: hash,
        dateEnregistrement: utilisateur.dateEnregistrement
      }).then((utilisateur) => console.log(utilisateur.toJSON())).catch((error) => {
        console.error("Erreur lors de la création de l'utilisateur :", error);
      });
    });
  });
};  

// Fonction pour importer les commentaires
const importCommentaires = () => {
  // Importe tous les commentaires présents dans un fichier ou une source de données
  commentaires.map((commentaire) => {
    Commentaire.create({
      contenu: commentaire.contenu,
      appreciation: commentaire.appreciation,
      idLivre: commentaire.idLivre
    }).then((commentaire) => console.log(commentaire.toJSON())).catch((error) => {
      console.error("Erreur lors de la création du commentaire :", error);
    });
  });
};

// Fonction pour importer les auteurs
const importAuteurs = () => {
  // Importe tous les auteurs présents dans un fichier ou une source de données
  auteurs.map((auteur) => {
    Auteur.create({
      nom: auteur.nom,
      prenom: auteur.prenom,
    }).then((auteur) => console.log(auteur.toJSON())).catch((error) => {
      console.error("Erreur lors de la création de l'auteur :", error);
    });
  });
};

// Fonction pour importer les categories
const importCategories = () => {
  // Importe tous les categories présents dans un fichier ou une source de données
  categories.map((categorie) => {
    Categories.create({
      nom: categorie.nom,
    }).then((categorie) => console.log(categorie.toJSON())).catch((error) => {
      console.error("Erreur lors de la création de la categorie :", error);
    });
  });
};

// Fonction pour importer les editeurs
const importEditeurs = () => {
  // Importe tous les editeurs présents dans un fichier ou une source de données
  editeurs.map((editeur) => {
    Editeur.create({
      nom: editeur.nom,
    }).then((editeur) => console.log(editeur.toJSON())).catch((error) => {
      console.error("Erreur lors de la création de l'editeur :", error);
    });
  });
};
// Fonction pour importer les livres
const importLivres = () => {
  // Importe tous les livres présents dans un fichier ou une source de données
  livres.map((livre) => {
    Livre.create({
      titre: livre.titre,
      extrait: livre.extrait,
      resume: livre.resume,
      anneeEdition: livre.anneeEdition,
      imageCouverture: livre.imageCouverture,
      id_categorie: livre.id_categorie,
      idAuteur: livre.idAuteur,
      nbPage: livre.nbPage
    }).then((livre) => console.log(livre.toJSON())).catch((error) => {
      console.error("Erreur lors de la création du livre :", error);
    });;
  });
};
export { sequelize, initDb, Livre, Utilisateur, Commentaire, Auteur, Categories, Editeur};