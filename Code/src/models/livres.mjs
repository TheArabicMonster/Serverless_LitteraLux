const livreModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "Livre",
    {
      idLivre: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      titre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Le titre ne doit pas être nul",
          },
          notEmpty: {
            msg: "Le titre ne doit pas être vide",
          }
        }
      },
      extrait: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "L'extrait ne doit pas être nul",
          },
          notEmpty: {
            msg: "L'extrait ne doit pas être vide",
          }
        }
      },
      resume: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Le résumé ne doit pas être nul",
          },
          notEmpty: {
            msg: "Le résumé ne doit pas être vide",
          }
        }
      },
      anneeEdition: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "L'année d'édition ne doit pas être nulle",
          },
          notEmpty: {
            msg: "L'année d'édition ne doit pas être vide",
          },
          isInt: {
            msg: "L'année d'édition doit être un nombre entier",
          }
        }
      },
      imageCouverture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "L'image de couverture ne doit pas être nulle",
          },
          notEmpty: {
            msg: "L'image de couverture ne doit pas être vide",
          }
        }
      },
      id_categorie: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      idAuteur: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      nbPage: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }

    },
    {
      timestamps: true,
      createdAt: "created_at",
      updatedAt: false,
      tableName: "livres"
    }
  );
};

export { livreModel };