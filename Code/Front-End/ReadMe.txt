La version de ce code est la dernière et en voulant faire des tâches que vous aviez dit qu'on devait faire si on avait le temps
j'ai crée un bug, mais je pense qu'il est mieux de vous donner la version la plus aboutie. le bug est que si on ajoute un livre (via la page d'ajout) tout marche mais si on 
veut accéder à ses détails dans la page de détails cela ne marche pas pour les livres ajoutées sur le site (et non ceux déjà là depuis le mockup), ce bug vient du fait
que j'ai voulu rajouter la possibilité d'ajouter un auteur à un livre (ce qui ne nous était pas demandé pour avoir acquis). Et donc si vous voulez tester le fait
que la page de détails marche correctement sans prendre compte des auteurs il vous suffit d'aller commenter cette ligne :
          <p v-if="livre.extrait">Auteur :{{ auteurs.data.prenom }} {{ auteurs.data.nom }} </p>
Dans la view "DetailsLivre"

Si vous ne comprenez pas quelque chose ou avez un problème, demandez moi sur teams ou outlook.
Julien Mares