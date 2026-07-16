import { fakeStoreService } from "./fakeStore";

const METHODS = ["Online Payment", "Cash on Delivery", "Credit Card"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];

const formatDate = (value) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const roundMoney = (value) => Math.round(value * 100) / 100;

export const buildDashboard = ({ users, products, carts }) => {
  const productsById = Object.fromEntries(products.map((item) => [item.id, item]));
  const usersById = Object.fromEntries(users.map((item) => [item.id, item]));

  const transactions = carts
    .map((cart) => {
      const lines = cart.products ?? [];
      const amount = lines.reduce((sum, line) => {
        const product = productsById[line.productId];
        return sum + (product?.price ?? 0) * (line.quantity ?? 1);
      }, 0);
      const firstProduct = productsById[lines[0]?.productId];
      const customer = usersById[cart.userId];

      return {
        id: cart.id,
        image: firstProduct?.image ?? "",
        product: firstProduct?.title ?? `Order #${cart.id}`,
        customer: customer?.name ?? `User #${cart.userId}`,
        customerId: cart.userId,
        date: formatDate(cart.date),
        amount: roundMoney(amount),
        items: lines.reduce((sum, line) => sum + (line.quantity ?? 1), 0),
        method: METHODS[cart.id % METHODS.length],
        status: cart.id % 3 === 0 ? "Pending" : "Approved",
      };
    })
    .sort((a, b) => b.id - a.id);

  const revenue = roundMoney(
    transactions.reduce((sum, row) => sum + row.amount, 0)
  );
  const approvedRevenue = roundMoney(
    transactions
      .filter((row) => row.status === "Approved")
      .reduce((sum, row) => sum + row.amount, 0)
  );
  const pendingCount = transactions.filter((row) => row.status === "Pending").length;
  const progress = revenue
    ? Math.min(100, Math.round((approvedRevenue / revenue) * 100))
    : 0;

  const widgets = {
    user: {
      amount: users.length,
      diff: 12,
      isPositive: true,
    },
    order: {
      amount: carts.length,
      diff: pendingCount > 0 ? pendingCount : 8,
      isPositive: pendingCount <= 2,
    },
    earning: {
      amount: Math.round(approvedRevenue),
      diff: 18,
      isPositive: true,
      isMoney: true,
    },
    balance: {
      amount: Math.round(revenue),
      diff: 7,
      isPositive: true,
      isMoney: true,
    },
  };

  const featured = {
    progress,
    todaySales: roundMoney(approvedRevenue / Math.max(transactions.length, 1)),
    target: roundMoney(revenue * 1.15),
    lastWeek: roundMoney(revenue * 0.28),
    lastMonth: roundMoney(revenue * 0.72),
    targetPositive: true,
    lastWeekPositive: false,
    lastMonthPositive: true,
  };

  const chart = MONTHS.map((name, index) => {
    const base = products[index % products.length]?.price ?? 100;
    const usersPoint = users.length * (18 + index * 2);
    const ordersPoint = carts.length * (30 + index * 4);
    const earningsPoint = Math.round(base * (12 + index * 3));
    const balancePoint = Math.round(base * (15 + index * 2));
    return {
      name,
      users: usersPoint,
      orders: ordersPoint,
      earnings: earningsPoint,
      balance: balancePoint,
      total: Math.round((earningsPoint + balancePoint) / 2),
    };
  });

  return {
    widgets,
    featured,
    chart,
    transactions,
    updatedAt: new Date().toISOString(),
  };
};

export const dashboardService = {
  fetchDashboardData: async () => {
    const [users, products, carts] = await Promise.all([
      fakeStoreService.fetchUsers(),
      fakeStoreService.fetchProducts(),
      fakeStoreService.fetchCarts(),
    ]);
    return buildDashboard({ users, products, carts });
  },
};
