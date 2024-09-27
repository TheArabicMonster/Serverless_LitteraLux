const success = (message, data) => {
  return {
    message: message,
    data: data,
  };
};

const getUniqueId = (livres) => {
  // On construit un tableau d'id de produits
  const livresIds = livres.map((product) => livres.id_livre);
  // La fonction passée à reduce compare deux éléments à la fois (a et b) et
  // retourne le plus grand des deux grâce à Math.max.
  // Au final, reduce parcourt tout le tableau productsIds, compare chaque ID
  // avec l'ID maximal trouvé jusqu'à présent, et retourne l'ID le plus élevé,
  // qui est stocké dans la variable maxId.
  const maxId = livresIds.reduce((a, b) => Math.max(a, b));
  return maxId + 1;
};
export { success, getUniqueId };

