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
      'module:resources'
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
      'module:resources'
    ]
  },
  {
    name: 'learner',
    permissions: [
      'course:get',
      'course:modules',
      'category:get',
      'module:resources'
    ]
  }
];

export default rolesData;