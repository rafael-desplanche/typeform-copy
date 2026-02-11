# Mini Typeform-like MVP

MVP minimal en **Next.js + TypeScript + Tailwind + Prisma/Postgres**.

## Fonctionnalités incluses

- Création/lecture minimale de formulaires via API (Form + Steps).
- URL publique par formulaire: `/f/[publicId]`.
- Parcours public: **une question par écran**, bouton **Suivant**, validation email/téléphone.
- Enregistrement de la soumission finale en base.
- Espace interne protégé par mot de passe unique (cookie):
  - `/dashboard/forms`
  - `/dashboard/forms/[formId]/responses`

## Modèle de données

- `Form (id, title, publicId, createdAt)`
- `Step (id, formId, order, type, fieldType?, label?, required?, endMessage?, ctaLabel?, ctaUrl?)`
- `Submission (id, formId, createdAt)`
- `Answer (id, submissionId, stepId, value)`

## Installation

1. Installer les dépendances:

```bash
npm install
```

2. Copier la configuration:

```bash
cp .env.example .env
```

3. Créer la base Postgres `typeform_copy` (ou adapter `DATABASE_URL`).

4. Générer Prisma Client:

```bash
npm run prisma:generate
```

5. Appliquer la migration:

```bash
npm run prisma:migrate
```

6. Seeder un formulaire démo (2 questions + 1 page de fin):

```bash
npm run prisma:seed
```

7. Lancer l’app:

```bash
npm run dev
```

## Variables d’environnement

- `DATABASE_URL`: connexion Postgres.
- `INTERNAL_PASSWORD`: mot de passe unique pour `/dashboard/*`.
- `NEXT_PUBLIC_APP_URL`: URL de base (utilisée pour redirection logout).

## Tester le flux complet

1. Aller sur `http://localhost:3000/dashboard/login`.
2. Se connecter avec `INTERNAL_PASSWORD`.
3. Ouvrir `http://localhost:3000/dashboard/forms`.
4. Cliquer le lien public du formulaire seedé (`/f/demo-form`).
5. Répondre aux 2 questions puis cliquer **Suivant**.
6. Revenir sur `/dashboard/forms/[formId]/responses` pour voir les soumissions.

## API minimales

- `GET /api/forms`
- `POST /api/forms`
- `GET /api/forms/:formId`
- `PATCH /api/forms/:formId`
- `DELETE /api/forms/:formId`
- `POST /api/forms/:formId/steps`
- `PATCH /api/forms/:formId/steps/:stepId`
- `DELETE /api/forms/:formId/steps/:stepId`
- `POST /api/submissions`
