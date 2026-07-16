export const resourceConfig = {
  users: {
    title: "Users",
    description: "Accounts, contacts and delivery addresses.",
    path: "/users",
    newPath: "/users/new",
    orderBy: "name",
    columns: [
      { id: "id", label: "ID", numeric: true },
      { id: "name", label: "User", type: "user" },
      { id: "username", label: "Username", type: "username" },
      { id: "email", label: "Email", type: "email" },
      { id: "phone", label: "Phone" },
      { id: "address", label: "Address", type: "address" },
      { id: "status", label: "Status", type: "status" },
      { id: "action", label: "Action", type: "action", disableSort: true },
    ],
  },
  products: {
    title: "Products",
    description: "Catalog with pricing, ratings and categories.",
    path: "/products",
    newPath: "/products/new",
    orderBy: "title",
    columns: [
      { id: "id", label: "ID", numeric: true },
      { id: "title", label: "Product", type: "product" },
      { id: "category", label: "Category", type: "category" },
      { id: "price", label: "Price", type: "price", numeric: true },
      { id: "rating", label: "Rating", type: "rating", numeric: true },
      { id: "reviews", label: "Reviews", numeric: true },
      { id: "status", label: "Status", type: "status" },
      { id: "action", label: "Action", type: "action", disableSort: true },
    ],
  },
  posts: {
    title: "Posts",
    description: "Articles from JSONPlaceholder — open any post to read it.",
    path: "/posts",
    newPath: "/posts/new",
    orderBy: "id",
    columns: [
      { id: "id", label: "ID", numeric: true },
      { id: "title", label: "Post", type: "post" },
      { id: "author", label: "Author", type: "author" },
      { id: "words", label: "Words", numeric: true },
      { id: "status", label: "Status", type: "status" },
      { id: "action", label: "Action", type: "action", disableSort: true },
    ],
  },
};

export const getResourceFromPath = (pathname) => {
  if (pathname.startsWith("/products")) return "products";
  if (pathname.startsWith("/posts")) return "posts";
  return "users";
};
