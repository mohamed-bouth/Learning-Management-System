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
    name: "module:resources",
    description: "Allows viewing the resources associated with a module.",
  },
];

export default permissionsData;
