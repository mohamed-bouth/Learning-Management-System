const permissionsData = [
  // Courses
  {
    name: "course:get",
    description: "Allows viewing the list of courses and their details.",
  },
  {
    name: "course:modules",
    description: "Allows viewing the modules associated with a course.",
  },
  {
    name: "course:create",
    description: "Allows creating new courses.",
  },
  {
    name: "course:update",
    description: "Allows updating existing course information.",
  },
  {
    name: "course:delete",
    description: "Allows deleting existing courses.",
  },

  // Categories
  {
    name: "category:get",
    description: "Allows viewing the list of categories and their details.",
  },
  {
    name: "category:create",
    description: "Allows creating new categories.",
  },
  {
    name: "category:update",
    description: "Allows updating existing category information.",
  },
  {
    name: "category:delete",
    description: "Allows deleting existing categories.",
  },

  // Roles and permissions
  {
    name: "roles:get",
    description: "Allows viewing the list of roles.",
  },
  {
    name: "role:get",
    description: "Allows viewing the details of a specific role.",
  },
  {
    name: "role:create",
    description: "Allows creating new roles.",
  },
  {
    name: "role:update",
    description: "Allows updating existing roles.",
  },
  {
    name: "role:delete",
    description: "Allows deleting existing roles.",
  },
  {
    name: "permissions:set",
    description: "Allows assigning or removing permissions from roles.",
  },

  // Modules and resources
  {
    name: "module:read",
    description: "empty"
  },
  {
    name: "module:create",
    description: "empty"
  },
  {
    name: "module:update",
    description: "empty"
  },
  {
    name: "module:delete",
    description: "empty"
  },
  {
    name: "module:resources",
    description: "Allows viewing the resources associated with a module.",
  },
  {
    name: "resource:read",
    description: "Allows viewing resources.",
  },
  {
    name: "resource:create",
    description: "Allows creating resources.",
  },
  {
    name: "resource:update",
    description: "Allows updating resources.",
  },
  {
    name: "resource:delete",
    description: "Allows deleting resources.",
  },
  {
    name: "enrollment:read",
    description: "Allows viewing enrollments.",
  },
  {
    name: "enrollment:create",
    description: "Allows creating enrollments.",
  },
  {
    name: "enrollment:update",
    description: "Allows updating enrollments.",
  },
  {
    name: "enrollment:delete",
    description: "Allows deleting enrollments.",
  },
];

export default permissionsData;
