import prisma from "@/lib/prisma";
import { faker } from "@faker-js/faker";

async function main() {
  for (let i = 1; i < 6; i++) {
    await prisma.note.create({
      data: {
        name: faker.word.words(4),
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
        User: {
          create: {
            username: faker.internet.userName(),
            password: faker.word.noun(),
          },
        },
        Group: {
          create: {
            name: faker.word.noun(),
            createdAt: faker.date.past(),
            updatedAt: faker.date.past(),
          },
        },
        NoteTags: {
          create: {
            Tag: {
              create: {
                name: faker.word.noun(),
                createdAt: faker.date.past(),
                color: faker.color.rgb(),
              },
            },
          },
        },
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
