Création d'un formulaire où l'utilisateur pourra entrer le nom du film qu'il cherche.

Au submit, l'API OMDB va récupérer la liste des films contenant les mots clefs que l'utilisateur a cherché.

Tu devras par la suite créer une fonction pour afficher la liste des films proposés.

Tu devras montrer :

- L'affiche du film

- Le nom du film

- Sa date de sortie

- Un CTA ("Call To Action") représenté par un bouton "Read more"

Il faudra utiliser l'asynchronie et l'Intersection Observer afin d'afficher les résultats petit à petit, lors du scroll.

Initialement, les blocs contenant les informations du film seront en opacité 0 et sur le côté de l'écran.

Lorsque tu scroll, les films s'afficheront petit à petit.


Voici quelques users stories afin de comprendre parfaitement la demande :

- L'utilisateur peut chercher une liste de films/séries grâce à des mots clefs

- L'utilisateur verra les films/séries apparaître sous forme de blocs, contenant le nom du film, la date de parution et une image ainsi qu'un CTA "Read More".

- L'utilisateur peut cliquer sur le CTA "Read More" afin d'afficher la description complète du film, ainsi que sa date de parution dans une popup.

- Les films/séries apparaissent petit à petit, au fur et à mesure du scroll.
