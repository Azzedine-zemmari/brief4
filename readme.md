# Rapport sur l'application To-Do List

## Introduction

Cette application To-Do List vise à simplifier la gestion des tâches quotidiennes en permettant aux utilisateurs de créer, visualiser, modifier et supprimer des tâches. Elle utilise un loader animé pour améliorer l'expérience utilisateur, et un stockage local pour garantir la persistance des données malgré le rafraîchissement de la page.

## Fonctionnalités Principales

1. **Loader Animé**  
   L'application affiche un loader animé lors du chargement initial de la page, pour informer l'utilisateur que les éléments sont en cours de préparation.

2. **Affichage Simple**  
   L'interface utilisateur est divisée en trois cartes distinctes : 
   - To Do
   - Doing
   - Done

   Chaque carte contient des tâches correspondant à leur statut respectif. Un bouton d'ajout permet d'ajouter de nouvelles tâches.

3. **Ajout de Tâches**  
   - **Validation** : Lors de l'ajout d'une nouvelle tâche, le formulaire exige que tous les champs soient remplis et que la date choisie soit d'aujourd'hui ou d'une date future, mais jamais avant aujourd'hui.
   - **Choix du Statut** : L'utilisateur peut choisir dans quelle carte (To Do, Doing, Done) la tâche doit apparaître.
   - **Modification du Statut** : Après ajout, l'utilisateur peut modifier le statut de chaque tâche pour passer de "To Do" à "Doing" ou "Done".

4. **Suppression de Tâches**  
   Chaque tâche peut être supprimée individuellement, offrant une gestion flexible et dynamique des tâches.

5. **Stockage Local**  
   Toutes les tâches sont stockées dans le localStorage, ce qui garantit que les tâches ne sont pas perdues en cas de rafraîchissement de la page. Le stockage local permet de récupérer les données à tout moment, offrant une expérience utilisateur continue et fiable.


