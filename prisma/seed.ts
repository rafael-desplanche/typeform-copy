import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const existing = await prisma.form.findFirst({ where: { publicId: 'demo-form' } });
  if (existing) return;

  await prisma.form.create({
    data: {
      title: 'Formulaire démo MVP',
      publicId: 'demo-form',
      steps: {
        create: [
          {
            order: 1,
            type: 'QUESTION',
            fieldType: 'TEXT',
            label: 'Quel est votre prénom ?',
            required: true,
          },
          {
            order: 2,
            type: 'QUESTION',
            fieldType: 'EMAIL',
            label: 'Quel est votre email ?',
            required: true,
          },
          {
            order: 3,
            type: 'END',
            endMessage: 'Merci ! Votre réponse a bien été enregistrée.',
            ctaLabel: 'Retour à l’accueil',
            ctaUrl: 'http://localhost:3000',
          },
        ],
      },
    },
  });
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
