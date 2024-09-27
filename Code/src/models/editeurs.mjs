const editeursModel = (sequelize, DataTypes) => {
    return sequelize.define(
        "Editeur",
        {
            idEditeur: {
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
            createdAt: false,
            updatedAt: false,
            tableName: "editeurs"
        }
    )
}
export { editeursModel }; // Exportation du modèle d'éditeur