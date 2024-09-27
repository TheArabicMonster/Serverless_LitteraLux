// Définition du modèle de la table utilisateurs
const utilisateursModel = (sequelize, DataTypes) => {
    return sequelize.define(
        "Utilisateur",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            pseudo: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: {
                    msg: "Ce pseudo est déjà pris",
                },
                validate: {
                    notNull: {
                        msg: "Le pseudo ne doit pas être nul",
                    },
                    notEmpty: {
                        msg: "Le pseudo ne doit pas être vide",
                    },
                    is: {
                        args: /^[a-zA-Z0-9_-]+$/i,
                        msg: "Le pseudo doit être composer en alphanumérique et de tirets et underscores",
                    },
                },
            },
            motDePasse: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "Le mot de passe ne doit pas être nul",
                    },
                    notEmpty: {
                        msg: "Le mot de passe ne doit pas être vide",
                    },
                },
            },
            dateEnregistrement: {
                type: DataTypes.DATE,
                allowNull: false,
                validate: {
                    isDate: {
                        msg: "La date d'enregistrement doit être une date valide",
                    },
                },
            },
        },
        {
            tableName: "utilisateurs",
            timestamps: false,
            createdAt: false,
            updatedAt: false,
        }
    );
}
export { utilisateursModel };