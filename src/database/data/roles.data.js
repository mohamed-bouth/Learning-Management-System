const rolesData = [
  {
    name: 'admin',
    permissions: [
      { name: 'course:get', scope: 'all' },
      { name: 'course:modules', scope: 'all' },
      { name: 'course:create', scope: 'all' },
      { name: 'course:update', scope: 'all' },
      { name: 'course:delete', scope: 'all' },
      { name: 'category:get', scope: 'all' },
      { name: 'category:create', scope: 'all' },
      { name: 'category:update', scope: 'all' },
      { name: 'category:delete', scope: 'all' },
      { name: 'roles:get', scope: 'all' },
      { name: 'role:get', scope: 'all' },
      { name: 'role:create', scope: 'all' },
      { name: 'role:update', scope: 'all' },
      { name: 'role:delete', scope: 'all' },
      { name: 'permissions:set', scope: 'all' },
      { name: 'permissions:get', scope: 'all' },
      { name: 'module:read', scope: 'all' },
      { name: 'module:create', scope: 'all' },
      { name: 'module:update', scope: 'all' },
      { name: 'module:resources', scope: 'all' },
      { name: 'module:delete', scope: 'all' },
      { name: 'resource:read', scope: 'all' },
      { name: 'resource:create', scope: 'all' },
      { name: 'resource:update', scope: 'all' },
      { name: 'resource:delete', scope: 'all' },
      { name: 'enrollment:read', scope: 'all' },
      { name: 'enrollment:create', scope: 'all' },
      { name: 'enrollment:update', scope: 'all' },
      { name: 'enrollment:delete', scope: 'all' }
    ]
  },
  {
    name: 'trainer',
    permissions: [
      { name: 'course:get', scope: 'own' },
      { name: 'course:modules', scope: 'own' },
      { name: 'course:create', scope: 'own' },
      { name: 'course:update', scope: 'own' },
      { name: 'category:get', scope: 'all' },
      { name: 'module:read', scope: 'own' },
      { name: 'module:create', scope: 'own' },
      { name: 'module:update', scope: 'own' },
      { name: 'module:resources', scope: 'own' },
      { name: 'module:delete', scope: 'own' },
      { name: 'resource:read', scope: 'own' },
      { name: 'resource:create', scope: 'own' },
      { name: 'resource:update', scope: 'own' },
      { name: 'resource:delete', scope: 'own' },
      { name: 'enrollment:read', scope: 'own' },
      { name: 'enrollment:create', scope: 'own' },
      { name: 'enrollment:update', scope: 'own' },
      { name: 'enrollment:delete', scope: 'own' }
    ]
  },
  {
    name: 'learner',
    permissions: [
      { name: 'course:get', scope: 'published' },
      { name: 'course:modules', scope: 'published' },
      { name: 'category:get', scope: 'all' },
      { name: 'module:read', scope: 'published' },
      { name: 'module:resources', scope: 'published' },
      { name: 'resource:read', scope: 'published' },
      { name: 'enrollment:read', scope: 'own' },
      { name: 'enrollment:create', scope: 'published' }
    ]
  }
];

export default rolesData;