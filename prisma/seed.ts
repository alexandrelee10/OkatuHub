// prisma/seed.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Anime List 
  const animeList = [
    {
      title: "Bleach: Thousand-Year Blood War",
      summary:
        "Ichigo Kurosaki returns to protect Karakura Town as the Quincy Empire invades Soul Society.",
      creator: "Tite Kubo",
      ep_count: 40,
      season: 3,
      image: "/assets/Anime/bleach_v2.png",
      genre: "Action, Shounen, Supernatural",
    },
    {
      title: "Jujutsu Kaisen",
      summary:
        "Yuji Itadori becomes a jujutsu sorcerer after ingesting a cursed object belonging to Sukuna.",
      creator: "Gege Akutami",
      ep_count: 47,
      season: 3,
      image: "/assets/Anime/jjk_v2.png",
      genre: "Action, Dark Fantasy, Supernatural",
    },
    {
      title: "Demon Slayer",
      summary:
        "Tanjiro Kamado joins the Demon Slayer Corps after his family is slaughtered by demons.",
      creator: "Koyoharu Gotouge",
      ep_count: 63,
      season: 4,
      image: "/assets/Anime/demon_slayer_v2.png",
      genre: "Action, Historical, Supernatural",
    },
    {
      title: "Naruto Shippuden",
      summary:
        "Naruto Uzumaki returns to Konoha after training with Jiraiya and continues his journey to become Hokage.",
      creator: "Masashi Kishimoto",
      ep_count: 500,
      season: 21,
      image: "/assets/Anime/naruto.png",
      genre: "Action, Adventure, Comedy",
    },
    {
      title: "Solo Leveling",
      summary:
        "A low-ranked player becomes the strongest in the game world.",
      creator: "Choi Seung-hoon",
      ep_count: 25,
      season: 2,
      image: "/assets/Anime/solo_leveling.png",
      genre: "Action, Fantasy, Game",
    },
    {
      title: "My Hero Academia",
      summary:
        "A boy without a quirk becomes the number one hero.",
      creator: "Kohei Horikoshi",
      ep_count: 170,
      season: 8,
      image: "/assets/Anime/my_hero_academia.png",
      genre: "Action, Fantasy, Game",
    },
  ];

  // Characters (only required fields: name, image)
  const characterList = [
    {
      name: "Naruto Uzumaki",
      image: "/assets/Characters/naruto.png",
    },
    {
      name: "Satoru Gojo",
      image: "/assets/Characters/gojo.png",
    },
    {
      name: "Levi Ackerman",
      image: "/assets/Characters/levi.png",
    },
    {
      name: "Tanjiro Kamado",
      image: "/assets/Characters/tanjiro.png",
    },
    {
      name: "Sasuke Uchiha",
      image: "/assets/Characters/sasuke.png",
    },
    {
      name: "Izuku Midoriya",
      image: "/assets/Characters/izuku.png",
    },
    {
      name: "Kakashi Hatake",
      image: "/assets/Characters/kakashi.png",
    },
    {
      name: "Itachi Uchiha",
      image: "/assets/Characters/itachi.png",
    },
    {
      name: "Megumi Fushiguro",
      image: "/assets/Characters/megumi.png",
    },
    {
      name: "Kyojuro Rengoku",
      image: "/assets/Characters/rengoku.png",
    },
  ];

  // Seed Anime
  for (const anime of animeList) {
    await prisma.anime.upsert({
      where: { title: anime.title }, // title should be @unique in your Anime model
      update: {},
      create: anime,
    });
  }

  // Seed Characters
  for (const character of characterList) {
    await prisma.character.upsert({
      where: { name: character.name }, // name is @unique on Character
      update: {},
      create: character,
    });
  }

  console.log("✅ Seeded anime and characters");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
