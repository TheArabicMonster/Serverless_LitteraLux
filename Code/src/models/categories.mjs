const categorieModel = (sequelize, DataTypes) => {
    return sequelize.define(
        "Categorie",
        {
            idCategorie: {
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
            }
        },
        {
            timestamps: false,
            createdAt:  "created_at",
            updatedAt: false,
            tableName: "categories"
        }
    )
}
export { categorieModel }; // Exportation du modèle de catégorie