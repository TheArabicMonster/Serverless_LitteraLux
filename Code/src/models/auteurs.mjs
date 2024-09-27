const auteurModel = (sequelize, DataTypes) => {
    return sequelize.define(
        "Auteur",
        {
            idAuteur: { 
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            nom: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "Le nom ne doit pas être nul",
                    },
                    notEmpty: {
                        msg: "Le nom ne doit pas être vide",
                    }
                }
            },
            prenom: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "Le prénom ne doit pas être nul",
                    },
                    notEmpty: {
                        msg: "Le prénom ne doit pas être vide",
                    }
                }
            },
        },
        {
            timestamps: true,
            createdAt: "dateCreation",
            updatedAt: false,
            tableName: "auteurs",
        }
    )
}
export { auteurModel };