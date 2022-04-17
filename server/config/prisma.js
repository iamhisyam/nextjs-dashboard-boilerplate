import { PrismaClient } from '@prisma/client';

function connect(){
    globalThis.prisma =  globalThis.prisma || null
    if(globalThis.prisma){
        globalThis.prisma = new PrismaClient({
            // log: [
            //   {
            //     emit: 'event',
            //     level: 'query',
            //   },
            //   {
            //     emit: 'stdout',
            //     level: 'error',
            //   },
            //   {
            //     emit: 'stdout',
            //     level: 'info',
            //   },
            //   {
            //     emit: 'stdout',
            //     level: 'warn',
            //   },
            // ],
          });
          // globalThis.prisma.$on('query', (e) => {
          //   console.log('Query: ' + e.query)
          //   console.log('Params: ' + e.params)
          //   console.log('Duration: ' + e.duration + 'ms')
          // })
    }

    return globalThis.prisma;

}

export default connect;