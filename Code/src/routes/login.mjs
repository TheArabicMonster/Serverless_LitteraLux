import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { Utilisateur } from "../db/sequelize.mjs";
import { privateKey } from "../auth/private_key.mjs";

const loginRouter = express();

// Route POST /login pour se connecter
loginRouter.post("/", (req, res) => {
    Utilisateur.findOne({ where: { pseudo: req.body.pseudo } }) // Recherche l'utilisateur par son pseudo
        .then((user) => { // Si l'utilisateur n'existe pas
            if (!user) { // On renvoie un message d'erreur
                const message = `L'utilisateur demandé n'existe pas`;
                return res.status(404).json({ message });
            }
            bcrypt // Si l'utilisateur existe
                .compare(req.body.motDePasse, user.motDePasse) // On compare le mot de passe envoyé avec celui enregistré
                .then((isPasswordValid) => {
                    if (!isPasswordValid) { // Si le mot de passe est incorrect on renvoie un message d'erreur
                        const message = `Le mot de passe est incorrecte.`;
                        return res.status(401).json({ message });
                    } else { // Si le mot de passe est correct on renvoie un message de succès et on génère un token JWT
                        // JWT
                        const token = jwt.sign({ id_utilisateur: user.id }, privateKey, { // On signe le token avec la clé privée
                            expiresIn: "1y", // Le token expire dans 1 an
                        });
                        const message = `L'utilisateur a été connecté avec succès`;
                        return res.json({ message, data: user, token }); // On renvoie le token avec les données de l'utilisateur
                    }
                });
        })
        .catch((error) => { // Si une erreur survient on renvoie un message d'erreur
            const message = `L'utilisateur n'a pas pu être connecté. Réessayez dans quelques instants`;
            return res.json({ message, data: error });
        });
});


export { loginRouter };