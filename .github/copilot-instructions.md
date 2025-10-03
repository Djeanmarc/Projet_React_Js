## But du dépôt

Ce dépôt est une application minimale React + TypeScript créée avec Vite.
Contexte essentiel pour un agent IA : l'app est organisée sous `src/` (entrée `src/main.tsx`, composant principal `src/App.tsx`). Le projet utilise React 19, TypeScript et le plugin `@vitejs/plugin-react` (voir `vite.config.ts`).

## Commandes utiles (dev / build / lint)

- Démarrer le serveur de développement :

  ```powershell
  npm run dev
  ```

- Building (exécute `tsc -b` puis `vite build`) :

  ```powershell
  npm run build
  ```

- Linter :

  ```powershell
  npm run lint
  ```

## Architecture & conventions observées

- Entrée de l'app : `src/main.tsx` (utilise `createRoot` et `StrictMode`).
- Composants fonctionnels et hooks React (ex. `useState` dans `src/App.tsx`).
- Fichiers CSS locaux : `src/index.css`, `src/App.css`.
- Ressources statiques : `public/` et `src/assets/` (import d'images via Vite, ex. `/vite.svg` et `./assets/react.svg`).
- TypeScript activé (voir `tsconfig.app.json` référencé depuis `tsconfig.json`).

## Patterns à respecter lors de modifications

- Utiliser des composants fonctionnels et des hooks. Eviter les classes.
- Préférer des composants contrôlés pour les formulaires : inputs doivent recevoir `value` + `onChange`.
- Pour la persistance locale, utiliser `localStorage` avec une clé dédiée (ex. `tp2:tasks`).
- Respecter l'accessibilité : associer `label` aux champs, `alt` sur images, et indiquer les erreurs via `aria-invalid` / `aria-describedby`.
- Performance : le projet utilise le plugin React Compiler (config dans `vite.config.ts`) — garder les composants simples et éviter les rerenders inutiles.

## Règles métier (implémenter exactement)

- Tâche (todo) : champ `titre` obligatoire, minimum 3 caractères.
- `échéance` : champ optionnel ; si renseigné, la date doit être valide et être aujourd'hui ou ultérieure.
- Unicité du titre : non exigée (mais peut être proposée comme bonus).
- Messages d'erreur : clairs et visibles ; les champs en erreur doivent être stylés visuellement (ex. bordure rouge) et exposer l'erreur via `aria-describedby`.

Exemples concrets à produire :
- Formulaire contrôlé dans un composant `TodoForm.tsx` qui valide `title.length >= 3` et `dueDate >= today`.
- Stockage : lecture et écriture JSON dans `localStorage.setItem('tp2:tasks', JSON.stringify(tasks))`.

## Points d'intégration / pièges connus

- Build exécute d'abord `tsc -b` — corriger les erreurs TypeScript avant `vite build`.
- Le linter est présent mais la configuration peut être stricte ; faire des corrections ciblées plutôt que contourner.
- Ignorer tout ce qui est lié à Angular (le projet doit rester React-only).

## Tests & vérifications rapides

- Vérifier en dev : `npm run dev` puis ouvrir `http://localhost:5173` (par défaut Vite).
- Après implémentation d'un formulaire, tester ces cas : titre vide, titre < 3, échéance passée, échéance aujourd'hui, sauvegarde puis reload (persistance).

## Où regarder pour exemples

- `src/App.tsx` — usage de `useState`, import d'assets et structure de base.
- `src/main.tsx` — point d'entrée, `StrictMode`.
- `vite.config.ts`, `package.json` — scripts et plugin React Compiler.

Si une section est ambiguë ou manque d'information, demandez une précision sur le comportement utilisateur souhaité (p.ex. format d'affichage des dates, tri des tâches, règles d'édition/suppression).

Merci — dites-moi si vous voulez que j'ajoute un composant d'exemple (`TodoForm.tsx` + `TodoList.tsx`) et des tests unitaires.
