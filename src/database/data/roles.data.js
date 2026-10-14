const rolesData = [
  {
    name: 'admin',
    permissions: [
      'course:get',
      'course:modules',
      'course:create',
      'course:update',
      'course:delete',
      'category:get',
      'category:create',
      'category:update',
      'category:delete',
      'roles:get',
      'role:get',
      'role:create',
      'role:update',
      'role:delete',
      'permissions:set',
      'permissions:get',
      'module:read',
      'module:create',
      'module:update',
      'module:resources',
      'module:delete',
      'resource:read',
      'resource:create',
      'resource:update',
      'resource:delete',
      'enrollment:read',
      'enrollment:create',
      'enrollment:update',
      'enrollment:delete'
    ]
  },
  {
    name: 'trainer',
    permissions: [
      'course:get',
      'course:modules',
      'course:create',
      'course:update',
      'category:get',
      'module:read',
      'module:create',
      'module:update',
      'module:resources',
      'module:delete',
      'resource:read',
      'resource:create',
      'resource:update',
      'resource:delete',
      'enrollment:read',
      'enrollment:create',
      'enrollment:update',
      'enrollment:delete'
    ]
  },
  {
    name: 'learner',
    permissions: [
      'course:get',
      'course:modules',
      'category:get',
      'module:read',
      'module:resources',
      'resource:read',
      'enrollment:read',
      'enrollment:create'
    ]
  }
];

export default rolesData;