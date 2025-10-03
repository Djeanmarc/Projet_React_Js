# tp2 — Todo minimal (React + TypeScript + Vite)

Ce dépôt contient une petite application TODO écrite en React + TypeScript et packagée avec Vite.

Objectifs principaux
- Formulaire contrôlé avec validation (titre obligatoire, échéance >= aujourd'hui si renseignée).
- Persistance locale via `localStorage` (clé `tp2:tasks`).
- Accessibilité basique (labels, aria-*), performance pensée pour listes longues.

Prérequis
- Node.js (>= 18 recommandé)
- npm (ou yarn/pnpm si vous préférez, ajustez les commandes)

Installation

```powershell
npm install
```

Scripts utiles

- `npm run dev` — démarre le serveur de développement Vite (HMR)
- `npm run build` — construit l'application (exécute `tsc -b` puis `vite build`)
- `npm run lint` — lance ESLint sur le projet
- `npm run preview` — prévisualise le build produit

Exécution en développement

```powershell
npm run dev
# ouvrez http://localhost:5173 (ou le port affiché si 5173 est occupé)
```

Structure importante

- `src/main.tsx` — point d'entrée
- `src/App.tsx` — conteneur principal et gestion d'état
- `src/TodoForm.tsx` — formulaire contrôlé + validation
- `src/TodoList.tsx` — liste des tâches (composant memoizé pour perf)
- `src/types.ts` — types TypeScript partagés
- `src/App.css` — styles globaux (thème clair minimal)

Persistance
- Les tâches sont sauvegardées dans `localStorage` sous la clé `tp2:tasks`.

Bonnes pratiques Git (commits atomiques)

Pour garder le dépôt propre et lisible, respectez les règles suivantes lors des commits :

- Faites des commits atomiques : une seule fonctionnalité ou correction par commit.
- Messages clairs et courts : commencez par un préfixe type `feat:`, `fix:`, `chore:`, `docs:` suivi d'une description brève.
  - Exemple : `feat: add todo form validation`
- Utilisez `git add -p` pour construire des commits précis lorsque vous avez modifié plusieurs endroits.
- Regroupez les commits liés avant de pousser (rebase interactif) :

```powershell
git add -p
git commit -m "feat: add todo form validation"
git push origin main
```

Si vous devez nettoyer l'historique avant de pousser (réécriture locale), utilisez :

```powershell
# regrouper / éditer les derniers commits
git rebase -i HEAD~3
# puis forcer le push si nécessaire (seulement si vous comprenez les risques)
git push --force-with-lease origin main
```

Contribuer
- Ouvrez une issue ou une PR décrivant clairement la modification.
- Gardez les changements petits et testables.

Questions / extensions possibles
- Ajouter des tests unitaires (Vitest), une modal custom pour la confirmation de suppression, ou la virtualisation de la liste (react-window) si vous gérez des milliers d'items.

---

Si vous voulez, je peux ajouter un `CONTRIBUTING.md` et un jeu minimal de tests pour la validation du formulaire.
