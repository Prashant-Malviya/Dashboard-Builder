// Seed script — creates one sample dashboard with a text, image and chart widget
// Run with: npm run seed

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  const dashboard = await prisma.dashboard.create({
    data: { name: "Sample Marketing Dashboard" },
  });

  await prisma.widget.createMany({
    data: [
      {
        dashboardId: dashboard.id,
        type: "text",
        x: 40,
        y: 40,
        width: 320,
        height: 140,
        content: {
          html: "<p><strong>Welcome!</strong> This is a sample text widget.</p>",
          fontSize: 16,
        },
      },
      {
        dashboardId: dashboard.id,
        type: "image",
        x: 400,
        y: 40,
        width: 300,
        height: 200,
        content: {
          url: "https://placehold.co/300x200?text=Sample+Image",
        },
      },
      {
        dashboardId: dashboard.id,
        type: "chart",
        x: 40,
        y: 220,
        width: 420,
        height: 280,
        content: {
          title: "Monthly Sales",
          labels: ["Jan", "Feb", "Mar", "Apr", "May"],
          data: [12, 19, 8, 15, 22],
        },
      },
    ],
  });

  console.log(`Seed complete. Dashboard id: ${dashboard.id}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
