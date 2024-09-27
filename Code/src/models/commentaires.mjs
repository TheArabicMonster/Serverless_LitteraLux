const commentaireModel = (sequelize, DataTypes) => {
    return sequelize.define(
        "Commentaire",
        {
            idCommentaire: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            contenu: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "Le contenu ne doit pas être nul",
                    },
                    notEmpty: {
                        msg: "Le contenu ne doit pas être vide",
                    }
                }
            },
            appreciation: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "L'appréciation ne doit pas être nulle",
                    },
                    notEmpty: {
                        msg: "L'appréciation ne doit pas être vide",
                    },
                    isInt: {
                        msg: "L'appréciation doit être un nombre entier",
                    }
                }
            },
            idLivre: {
                type: DataTypes.INTEGER,
                allowNull: false,
              },
            
        },
        {
            timestamps: false,
            createdAt: "dateCreation",
            updatedAt: "dateMiseAJour",
            tableName: "commentaires"
        }
    )
}
export { commentaireModel };