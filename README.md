# BetaSeries API - React project

Reproduction du site [betaseries](https://www.betaseries.com/) permettant le suivi des series visionnées en utilisant l'api fournie sur le site.

## Installation

Assurez vous d'avoir [Node.js](https://nodejs.org/en/) d'installé .

Utilisez [YARN](https://yarnpkg.com/) pour l'installation des packages .

Effectuer l'installation côté client :

```
cd client
yarn install
yarn start
```

Effectuer l'installation côté client :

```
cd server
yarn install
node start
```

## Projet

Etape 1 :

-   ☑ Votre application permettra à l’utilisateur de se connecter avec les identifiants du compte qu’il aura créé au
    préalable sur le site betaseries

Etape 2 :

Une page affichera ses séries.
Il devra alors être capable d’ajouter les séries qu’il suit en appuyant sur une icône +.
Un appui long dirigera vers les détails de la série qui comprendront :

-   ☑ Le titre
-   ☑ L’image
-   ☑ Le nombre de saisons
-   ☑ Le nombre d’épisodes
-   ☑ La durée des épisodes
-   ☑ La note
-   ☑ Le résumé
-   ☑ Les genres de la série
-   ☑ La possibilité d’archiver la série

Etape 3 : Les épisodes

-   ☑ Afficher la liste des épisodes non vus classés par saison.
-   ☑ Un appui long sur un épisode doit afficher ses détails.
-   ☑ Un appui simple doit marquer l'épisode comme vu et non vu si on appui une nouvelle fois.

Etape 4 :

-   ☑ Il doit être possible d'ajouter des amis, de les bloquer et les supprimer.
-   ☑ Il doit être possible de recevoir des demandes d'amis.

Bonus personnel :

-   ☑ Alerte archives
-   ☑ Gérer les pages avec token si pas de token pas d'accès a la page .
-   ☑ Lister les personnes bloquées
-   ☑ Rendre le site responsive
-   ☑ Recherche de séries
-   ☑ Page de news
-   ☑ Route favoris
-   ☑ Messagerie
-   ☑ Ajout d'un profil utilisateur
-   ☑ Ajout d'un profil d'amis
-   ☑ Checkbox favoris
