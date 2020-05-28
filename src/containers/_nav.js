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
        name: 'Student Information',
        to: '/studentinfo',
        icon: 'cil-user'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'New Student Information',
        to: '/newstudentinfo',
        icon: 'cil-user'
      }
    ]
  }
]