# DA Control — React Admin Panel

**English** · [Українська](./README.uk.md)

Portfolio / interview project: a compact admin dashboard built with **React 18**, **Redux Toolkit**, **React Router**, **MUI**, and **Sass**.

Public mock APIs:
- [Fake Store API](https://fakestoreapi.com/) — users, products, carts
- [JSONPlaceholder](https://jsonplaceholder.typicode.com/) — posts & comments

> **Status:** intentionally incomplete demo. Core CRUD-style flows and dashboard state are in place; auth, real backend, and full edit UX are out of scope (see [Roadmap](#roadmap)).

---

## Quick start

```bash
npm install
npm start
```

App: [http://localhost:3000](http://localhost:3000)

```bash
npm run build   # production bundle
```

---

## What this project demonstrates

| Area | Approach |
| --- | --- |
| State | Redux Toolkit slices (`createSlice` + `createAsyncThunk`) |
| Data access | Thin `services/` layer (fetch + mappers), no logic in UI |
| Routing | Nested React Router v6 routes per resource |
| UI | Shared layout, design tokens in CSS variables, light/dark theme |
| Tables | Sortable/paginated list views driven by `resourceConfig` |

---

## Project structure

```text
src/
  components/     # Reusable UI (layout, tables, charts, widgets)
  context/        # Dark mode (local UI concern, not business data)
  hooks/          # Shared hooks (resource path, store helpers)
  pages/          # Route-level screens
  services/       # API clients + response mappers
  store/          # Redux store + feature slices
  utils/          # Pure helpers / resource column config
  constants/      # App-wide constants (API base URLs)
```

### Store (business data)

| Slice | Responsibility |
| --- | --- |
| `usersSlice` | User list, current user, create/delete |
| `productsSlice` | Product list, current product, create/delete |
| `postsSlice` | Posts, current post, comments, create/delete |
| `dashboardSlice` | Widgets, featured revenue, chart series, transactions |

Each slice owns: `initialState`, async thunks, reducers, and **selectors**. Components talk to the store via `useDispatch` / `useSelector` only.

### Services

| File | Role |
| --- | --- |
| `fakeStore.js` | Fake Store HTTP + `mapUser` / `mapProduct` |
| `postsService.js` | JSONPlaceholder posts/comments |
| `dashboardService.js` | Builds dashboard DTO from users + products + carts |

---

## Main routes

| Path | Screen |
| --- | --- |
| `/` | Dashboard |
| `/users`, `/users/:id`, `/users/new` | Users |
| `/products`, `/products/:id`, `/products/new` | Products |
| `/posts`, `/posts/:id`, `/posts/new` | Posts |
| `/login` | Login UI mock (no real auth yet) |

Static routes such as `new` are registered **before** dynamic `:id` params.

---

## Conventions (for contributors)

1. **UI does not call `fetch` directly** — use a service, then a thunk.
2. **Selectors live next to the slice** that owns the state.
3. **Resource screens** (`List` / `Single` / `New`) share one implementation keyed by `resourceConfig`.
4. Prefer small pure helpers in `utils/` over copy-paste in components.
5. Mark unfinished product areas with `TODO` comments (search the repo).

---

## Roadmap (known gaps)

- [ ] Real authentication / protected routes
- [ ] Edit flows (currently stubbed to dashboard / home)
- [ ] Optimistic updates & server-side pagination
- [ ] Unit tests for mappers and slices
- [ ] Replace CRA with Vite when scaling the app

These gaps are deliberate for a small portfolio sample — the focus is readable architecture and clean Redux usage.