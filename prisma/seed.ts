import prisma from "@/lib/prisma";
import { faker } from "@faker-js/faker";

async function main() {
  for (let i = 1; i < 3; i++) {
    await prisma.user.create({
      data: {
        username: faker.internet.userName(),
        password: faker.word.noun(),
      },
    });
  }

  for (let i = 1; i < 3; i++) {
    await prisma.tag.create({
      data: {
        name: faker.word.noun(),
        createdAt: faker.date.past(),
        color: faker.color.rgb(),
      },
    });
  }

  for (let i = 1; i < 3; i++) {
    await prisma.group.create({
      data: {
        name: faker.word.noun(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
      },
    });
  }

  for (let i = 1; i < 3; i++) {
    await prisma.note.create({
      data: {
        name: faker.word.words(4),
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
        userId: i,
        groupId: i,
      },
    });
  }

  for (let i = 1; i < 3; i++) {
    await prisma.noteTags.create({
      data: {
        noteId: i,
        tagId: i,
        createdAt: faker.date.past({}),
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
