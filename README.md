# Javascript_Assignment1
Javascript Corona Virus Game 

Bienvenue au jeu de Lutte contre le Corona ! 

Dans ce jeu, vous êtes la bactérie qui tue les cellules du virus Corona ayant la couleur
que vous pouvez choisir en bas dans la liste des couleurs. 
A chaque niveau, il faut manger toutes les cellules ayany la bonne couleur et surtout
ne pas toucher aux autres cellules qui vous contamineront et au bout de 3 mauvaises cellules 
touchées, vous perdez!
 
On commence par un niveau facile et à chaque fois que vous gagnez, vous passez au niveau 
supérieur. Le nombre de balles à manger correspond au numéro du niveau dans lequel vous êtes
(par exemple si vous êtes au niveau 3, il y aura 3 boules à manger).

Pour représenter le joueur, j'ai choisi une forme étoilée.
J'ai également personnalisé la mise en page du jeu en changeant le fond(dégardé de beige), 
les couleurs(degradé de texte) et le titre. Je n'ai pas voulu mettre de fond trop chargé pour 
bien percevoir les cellules du virus.

J'ai rajouté un message "Warning" au menu qui prévient le joueur du nombre de mauvaises cellules 
qu'il ne doit surtout pas manger sinon il perd!

De plus, vous avez la possibilité de recommencer à jouer à n'importe quel moment en appuyant 
sur la touche <Space>. (tout est remis à 0)


Pour le mouvement des cellules, la vitesse augmente au fur et à mesure des niveaux. 
J'ai essayé de faire différents mouvements pour chaque couleur:
-Cellule verte: grossit puis maigrit en boucle 
-Cellule bleue: maigrit puis grossi en boucle 
-Cellules rouge, rose et cyan: mouvement normal
-Cellules jaunes et violettes: rebondissent sur le sol 


Pour les obstacles: j'ai commencé à rajouter un obstacle au niveau 3, puis 2 obstacles au niveau 4,
puis 3 obstables au niveau 5, je n'ai pas rajouté plus d'obstacles pour ne pas trop encombrer 
la piste de jeu. Cependant je n'ai pas réussi à empêcher le joueur de ne pas traverser les obstacles,
j'ai essayé plusieurs choses mais sans succès...


Pour les projectiles, j'ai essayé de creer des boules oranges en ajoutant un event lorsqu'on 
clique sur "Enter". Cependant il y a un bug que je n'arrive pas à trouver dans mon code...


Pour conclure, je tenais à préciser que c'est la première fois que je fais du javascript.
Je trouve le cours et les videos très instructives et ce premier projet, que 
j'ai trouvé très amusant, m'a permis de m'entrainer en javascript et de mieux maitriser ce qu'on 
a vu en cours. J'espère que le jeu va vous plaire! 

 
