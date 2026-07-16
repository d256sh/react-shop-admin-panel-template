const FAKE_STORE_URL = "https://fakestoreapi.com";

const getUserStatus = (id) => {
  if (id % 3 === 0) return "pending";
  if (id % 2 === 0) return "inactive";
  return "active";
};

/** Override API users 2 and 6 as female profiles */
const FEMALE_BY_ID = {
  2: {
    firstname: "Anna",
    lastname: "Kovalenko",
    username: "anna_k",
    email: "anna.kovalenko@example.com",
    phone: "1-555-0202",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  6: {
    firstname: "Olivia",
    lastname: "Bennett",
    username: "olivia_b",
    email: "olivia.bennett@example.com",
    phone: "1-555-0606",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
};

export const mapUser = (user) => {
  const override = FEMALE_BY_ID[user.id];
  const firstName = override?.firstname ?? user.name?.firstname ?? "";
  const lastName = override?.lastname ?? user.name?.lastname ?? "";
  const username = override?.username ?? user.username;
  const email = override?.email ?? user.email;
  const phone = override?.phone ?? user.phone;
  const street = user.address?.street ?? "";
  const number = user.address?.number ?? "";
  const city = user.address?.city ?? "—";
  const zipcode = user.address?.zipcode ?? "";

  return {
    id: user.id,
    name: `${firstName} ${lastName}`.trim() || username,
    firstName,
    lastName,
    username,
    email,
    phone,
    city,
    zipcode,
    street: [number, street].filter(Boolean).join(" "),
    address: [street && `${number} ${street}`.trim(), city, zipcode]
      .filter(Boolean)
      .join(", "),
    avatar: override?.avatar ?? `https://i.pravatar.cc/80?u=${email || user.id}`,
    status: getUserStatus(user.id),
  };
};

export const mapProduct = (product) => {
  const rate = product.rating?.rate ?? 0;
  const reviews = product.rating?.count ?? 0;
  const description = product.description ?? "";

  return {
    id: product.id,
    title: product.title,
    description,
    shortDescription:
      description.length > 72 ? `${description.slice(0, 72)}…` : description,
    price: product.price,
    category: product.category,
    image: product.image,
    rating: rate,
    reviews,
    status: rate >= 4 ? "active" : rate >= 3 ? "pending" : "inactive",
  };
};

async function request(path, options) {
  const response = await fetch(`${FAKE_STORE_URL}${path}`, options);
  if (!response.ok) {
    throw new Error(`FakeStore error: ${response.status}`);
  }
  return response.json();
}

export const fakeStoreService = {
  fetchUsers: async () => {
    const data = await request("/users");
    return data.map(mapUser);
  },
  fetchUser: async (id) => {
    const data = await request(`/users/${id}`);
    return mapUser(data);
  },
  createUser: async (body) => {
    const data = await request("/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return mapUser({
      ...body,
      id: data.id ?? Date.now(),
      name: body.name,
      address: body.address,
    });
  },
  deleteUser: async (id) => {
    await request(`/users/${id}`, { method: "DELETE" });
    return id;
  },
  fetchProducts: async () => {
    const data = await request("/products");
    return data.map(mapProduct);
  },
  fetchProduct: async (id) => {
    const data = await request(`/products/${id}`);
    return mapProduct(data);
  },
  createProduct: async (body) => {
    const data = await request("/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return mapProduct({
      ...body,
      id: data.id ?? Date.now(),
      rating: { rate: 0, count: 0 },
    });
  },
  deleteProduct: async (id) => {
    await request(`/products/${id}`, { method: "DELETE" });
    return id;
  },
};
