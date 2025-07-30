# Copilot Instructions for Healthy4U

## Project Architecture
- **Monorepo structure**: Contains `backend` (Django) and `frontend` (Quasar/Vue) directories. Each is independently developed and run.
- **Backend**: Django project with apps for `appointments`, `institutions`, `patient_records`, and `users`. Each app has its own models, views, migrations, and admin config.
- **Frontend**: Quasar-based Vue SPA. Organized into `src/components`, `src/pages`, `src/layouts`, and `src/stores`.

## Developer Workflows
### Backend
- Setup: `python -m venv venv` → `venv\scripts\activate` → `pip install -r requirements.txt`
- DB Migrations: `python manage.py makemigrations` and `python manage.py migrate`
- Superuser: `python manage.py createsuperuser`
- Run server: `python manage.py runserver`
- Tests: Run with `python manage.py test <app>`
- Database: Uses SQLite (`db.sqlite3`)

### Frontend
- Setup: `npm install` (or `yarn`)
- Dev server: `quasar dev` (or `npm run dev`)
- Lint: `npm run lint` or `yarn lint`
- Build: `quasar build`

## Patterns & Conventions
- **Backend apps**: Each Django app is self-contained. Models are defined in `models.py`, views in `views.py`, migrations in `migrations/`.
- **Frontend pages**: Each route is a Vue file in `src/pages`. Shared UI in `src/components`. Main layout in `src/layouts/MainLayout.vue`.
- **API communication**: Frontend uses Axios (see `src/boot/axios.ts`) for HTTP requests to backend endpoints.
- **Routing**: Frontend routes defined in `src/router/routes.ts`.
- **State management**: Uses Pinia stores in `src/stores`.

## Integration Points
- **API endpoints**: Backend exposes RESTful endpoints per Django app. Frontend consumes these via Axios.
- **Environment config**: Frontend uses `quasar.config.ts` and `.env` files for configuration.
- **Static assets**: Frontend assets in `src/assets` and `public/`.

## Examples
- To add a new backend feature, create a Django app or add to an existing app, update models, run migrations, and expose views.
- To add a new frontend page, create a Vue file in `src/pages`, add a route in `src/router/routes.ts`, and connect to backend via Axios if needed.

## Key Files
- `backend/requirements.txt`: Python dependencies
- `backend/manage.py`: Django CLI
- `frontend/package.json`: Node dependencies
- `frontend/quasar.config.ts`: Quasar/Vue config
- `frontend/src/boot/axios.ts`: API setup
- `frontend/src/router/routes.ts`: Route definitions

---
For unclear or missing conventions, ask for clarification or check the respective README files.
