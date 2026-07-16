# DA Control — React Admin Panel

[English](./README.md) · **Українська**

Портфоліо / інтерв’ю-проєкт: компактна адмін-панель на **React 18**, **Redux Toolkit**, **React Router**, **MUI** та **Sass**.

Публічні mock API:
- [Fake Store API](https://fakestoreapi.com/) — users, products, carts
- [JSONPlaceholder](https://jsonplaceholder.typicode.com/) — posts і comments

> **Статус:** свідомо незавершене демо. Базові CRUD та стан дашборду є; auth, реальний бекенд і повний edit UX — поза скоупом (див. [Roadmap](#roadmap)).

---

## Швидкий старт

```bash
npm install
npm start
```

Додаток: [http://localhost:3000](http://localhost:3000)

```bash
npm run build   # production-збірка
```

---

## Що показує проєкт

| Область | Підхід |
| --- | --- |
| State | Redux Toolkit slices (`createSlice` + `createAsyncThunk`) |
| Дані | Тонкий шар `services/` (fetch + mappers), без логіки в UI |
| Роутинг | Вкладені React Router v6 маршрути по ресурсах |
| UI | Спільний layout, design tokens у CSS variables, light/dark |
| Таблиці | Сортування / пагінація через `resourceConfig` |

---

## Структура проєкту

```text
src/
  components/     # Перевикористовуваний UI (layout, tables, charts, widgets)
  context/        # Dark mode (локальний UI-стан, не бізнес-дані)
  hooks/          # Спільні хуки (resource path, store helpers)
  pages/          # Екрани рівня роутів
  services/       # API-клієнти + мапери відповідей
  store/          # Redux store + feature slices
  utils/          # Чисті хелпери / конфіг колонок
  constants/      # Константи додатку (базові URL API)
```

### Store (бізнес-дані)

| Slice | Відповідальність |
| --- | --- |
| `usersSlice` | Список users, поточний user, create/delete |
| `productsSlice` | Список products, поточний product, create/delete |
| `postsSlice` | Posts, поточний post, comments, create/delete |
| `dashboardSlice` | Widgets, featured revenue, chart, transactions |

Кожен slice володіє: `initialState`, async thunks, reducers і **selectors**. Компоненти ходять у store лише через `useDispatch` / `useSelector`.

### Services

| Файл | Роль |
| --- | --- |
| `fakeStore.js` | Fake Store HTTP + `mapUser` / `mapProduct` |
| `postsService.js` | JSONPlaceholder posts/comments |
| `dashboardService.js` | Збирає dashboard DTO з users + products + carts |

---

## Основні маршрути

| Path | Екран |
| --- | --- |
| `/` | Dashboard |
| `/users`, `/users/:id`, `/users/new` | Users |
| `/products`, `/products/:id`, `/products/new` | Products |
| `/posts`, `/posts/:id`, `/posts/new` | Posts |
| `/login` | Login UI mock (без реальної auth) |

Статичні маршрути на кшталт `new` реєструються **перед** динамічними `:id`.

---

## Конвенції (для контриб’юторів)

1. **UI не викликає `fetch` напряму** — спочатку service, потім thunk.
2. **Selectors живуть поруч зі slice**, якому належить стан.
3. **Екрани ресурсів** (`List` / `Single` / `New`) — спільна реалізація через `resourceConfig`.
4. Краще маленькі pure helpers у `utils/`, ніж copy-paste у компонентах.
5. Незавершені місця позначай `TODO` (пошук по репо).

---

## Roadmap (відомі прогалини)

- [ ] Реальна автентифікація / protected routes
- [ ] Edit-флоу (зараз заглушки)
- [ ] Optimistic updates і server-side pagination
- [ ] Unit-тести для mappers і slices
- [ ] Заміна CRA на Vite при масштабуванні

Ці прогалини навмисні для невеликого портфоліо-семплу — акцент на читабельній архітектурі та чистому Redux.
