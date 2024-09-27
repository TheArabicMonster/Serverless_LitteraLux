import jwt from "jsonwebtoken";
import { privateKey } from "./private_key.mjs";

// Middleware d'authentification
const auth = (req, res, next) => {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) { // Si le jeton d'authentification n'est pas fourni on renvoie un message d'erreur
        const message = `Vous n'avez pas fourni de jeton d'authentification. Ajoutez-en un dans l'en-tête de la requête.`;
        return res.status(401).json({ message });
    } else {
        const token = authorizationHeader.split(" ")[1];
        const decodedToken = jwt.verify(
            token,
            privateKey,
            (error, decodedToken) => {// Vérifie le token
                if (error) { // Si le token n'est pas valide on renvoie un message d'erreur
                    const message = `L'utilisateur n'est pas autorisé à accéder à cette ressource.`;
                    return res.status(401).json({ message, data: error });
                }
                const userId = decodedToken.userId;
                if (req.body.userId && req.body.userId !== userId) { // Si l'identifiant de l'utilisateur est invalide on renvoie un message d'erreur
                    const message = `L'identifiant de l'utisateur est invalide`;
                    return res.status(401).json({ message });
                } else { // Si l'identifiant de l'utilisateur est valide on appelle la fonction next
                    next();
                }
            }
        );
    }
};

export { auth };
