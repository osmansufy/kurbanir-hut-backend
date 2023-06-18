import express from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRouts } from "../modules/user/auth/auth.route";
import { CowRoutes } from "../modules/cow/cow.route";
import { OrderRoutes } from "../modules/order/order.route";

const router = express.Router();
const moduleRoutes = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRouts,
  },
  {
    path: "/cows",
    route: CowRoutes,
  },
  {
    path: "/orders",
    route: OrderRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
