const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const superadmin = await prisma.userRole.upsert({
    where: { code: 'superadmin' },
    update: {},
    create: {
      code: 'superadmin',
      name: 'Superadmin',
      users: {
        create: [
          {
            email: 'superadmin@ahisyam.com',
            name: 'Superadmin',
            username: 'superadmin',
            //std
            password:
              '$2a$10$rFeBnn7VMG8UzvHb6L8XFupav86ICwHg.Xdnt4jYGn3MJosgaSGza',
          },
        ],
      },
    },
  });

  const admin = await prisma.userRole.upsert({
    where: { code: 'admin' },
    update: {},
    create: {
      code: 'admin',
      name: 'Admin',
      users: {
        create: [
          {
            email: 'admin@ahisyam.com',
            name: 'Admin',
            username: 'admin',
            //std
            password:
              '$2a$10$rFeBnn7VMG8UzvHb6L8XFupav86ICwHg.Xdnt4jYGn3MJosgaSGza',
          },
        ],
      },
    },
  });

  const employee = await prisma.userRole.upsert({
    where: { code: 'employee' },
    update: {},
    create: {
      code: 'employee',
      name: 'Employee',
      users: {
        create: [
          {
            email: 'employee@ahisyam.com',
            name: 'employee',
            username: 'employee',
            //std
            password:
              '$2a$10$rFeBnn7VMG8UzvHb6L8XFupav86ICwHg.Xdnt4jYGn3MJosgaSGza',
          },
        ],
      },
    },
  });

  const dashboard = await prisma.menu.upsert({
    where: { name : "Dashboard" },
    update: {},
    create: {
   
      name: 'Dashboard',
      slug: '/',
      menuAuths: {
        create: [
          { userRoleCode: 'superadmin' },
          { userRoleCode: 'admin'},
          { userRoleCode: 'employee'},
        ],
      },
    },
  });

  const master = await prisma.menu.upsert({
    where: { name: "Master" },
    update: {},
    create: {
      name: 'Master',
      slug: '#',
      menuAuths: {
        create: [
          { userRoleCode: 'superadmin'},
          { userRoleCode: 'admin'},
        ],
      },
    },
  });

  const users = await prisma.menu.upsert({
    where: { name: 'Users'},
    update: {},
    create: {
      
      name: 'Users',
      slug: '/master/users',
      parentMenuId: 2,
      menuAuths: {
        create: [
          { userRoleCode: 'superadmin'},
        ],
      },
    },
  });

  const menus = await prisma.menu.upsert({
    where: { name: 'Menus'},
    update: {},
    create: {
      name: 'Menus',
      slug: '/master/menus',
      parentMenuId: 2,
      menuAuths: {
        create: [
          { userRoleCode: 'superadmin'},
        ],
      },
    },
  });

  const departments = await prisma.menu.upsert({
    where: {  name: 'Departments' },
    update: {},
    create: {
      name: 'Departments',
      slug: '/master/departments',
      parentMenuId: 2,
      menuAuths: {
        create: [
          { userRoleCode: 'superadmin' },
          { userRoleCode: 'admin'},
        ],
      },
    },
  });

  const grades = await prisma.menu.upsert({
    where: { name: 'Grades'},
    update: {},
    create: {
      name: 'Grades',
      slug: '/master/grades',
      parentMenuId: 2,
      menuAuths: {
        create: [
          { userRoleCode: 'superadmin'},
          { userRoleCode: 'admin' },
        ],
      },
    }, 
  });

  const jobs = await prisma.menu.upsert({
    where: {name: 'Jobs'},
    update: {},
    create: {
 
      name: 'Jobs',
      slug: '/master/jobs',
      parentMenuId: 2,
      menuAuths: {
        create: [
          { userRoleCode: 'superadmin'},
          { userRoleCode: 'admin'},
        ],
      },
    },
  });


  const payrollmaster = await prisma.menu.upsert({
    where: { name: 'Payroll', },
    update: {},
    create: {
  
      name: 'Payroll',
      slug: '#',
   
      menuAuths: {
        create: [
          { userRoleCode: 'superadmin'},
          { userRoleCode: 'admin' },
        ],
      },
    },
  });


  const employees = await prisma.menu.upsert({
    where: { name: 'Employees'},
    update: {},
    create: {
 
      name: 'Employees',
      slug: '/master/employees',
      parentMenuId: 8,
      menuAuths: {
        create: [
          { userRoleCode: 'superadmin' },
          { userRoleCode: 'admin' },
        ],
      },
    },
  });

  const payrollMy = await prisma.menu.upsert({
    where: { name: 'My Payroll'},
    update: {},
    create: {
      name: 'My Payroll',
      slug: '/my-payroll',

      menuAuths: {
        create: [
          { userRoleCode: 'employee' },
        ],
      },
    },
  });


  const payrollList = await prisma.menu.upsert({
    where: { name: 'Payroll List'},
    update: {},
    create: {
      name: 'Payroll List',
      slug: '/master/payrolls',
      parentMenuId: 8,
      menuAuths: {
        create: [
          { userRoleCode: 'superadmin' },
          { userRoleCode: 'admin'},
        ],
      },
    },
  });


  const documents = await prisma.menu.upsert({
    where: { name: 'Documents' },
    update: {},
    create: {
      name: 'Documents',
      slug: '/master/documents',
      parentMenuId: 8,
      menuAuths: {
        create: [
          { userRoleCode: 'superadmin' },
          { userRoleCode: 'admin' },
        ],
      },
    },
  });

  


  console.log(dashboard);
  console.log(master);
  console.log(users);
  console.log(menus);
  console.log(departments);
  console.log(grades);
  console.log(jobs);
  console.log(payrollmaster);
  console.log(payrollList);
  console.log(employees);
  console.log(payrollMy);
  console.log(documents);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });