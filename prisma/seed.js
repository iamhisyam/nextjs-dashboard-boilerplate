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
            //std
            password:
              '$2a$10$rFeBnn7VMG8UzvHb6L8XFupav86ICwHg.Xdnt4jYGn3MJosgaSGza',
          },
        ],
      },
    },
  });

  const member = await prisma.userRole.upsert({
    where: { code: 'member' },
    update: {},
    create: {
      code: 'member',
      name: 'Member',
      users: {
        create: [
          {
            email: 'member@ahisyam.com',
            name: 'member',
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
      menuAuth: {
        create: [
          { userRoleCode: 'superadmin' },
          { userRoleCode: 'admin'},
          { userRoleCode: 'member'},
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
      menuAuth: {
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
      menuAuth: {
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
      menuAuth: {
        create: [
          { userRoleCode: 'superadmin'},
        ],
      },
    },
  });

 
  


  console.log(dashboard);
  console.log(master);
  console.log(users);
  console.log(menus);

}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });