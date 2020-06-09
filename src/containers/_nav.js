export default [
  {
    _name: 'CSidebarNav',
    _children: [
      {
        _name: 'CSidebarNavItem',
        name: 'Dashboard',
        to: '/dashboard',
        icon: 'cil-speedometer'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Application',
        to: '/application',
        icon: 'cil-user'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Admission',
        to: '/admission',
        icon: 'cil-user'
      }
    ]
  }
]