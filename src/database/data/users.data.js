import { hashPassword } from "../../utils/password.service.js";

const usersData = [
  {
    name: "admin",
    email: "admin@gmail.com",
    passwordHash: await hashPassword("Password123"),
    roleId: null,
    status: "active",
  },
  {
    name: "trainer",
    email: "trainer@gmail.com",
    passwordHash: await hashPassword("Password123"),
    roleId: null,
    status: "active",
  },
  {
    name: "learner",
    email: "learner@gmail.com",
    passwordHash: await hashPassword("Password123"),
    roleId: null,
    status: "active",
  },
];

export default usersData;
