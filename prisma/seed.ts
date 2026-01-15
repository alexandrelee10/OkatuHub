// prisma/seed.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // 1) Seed Anime
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
      summary: "A low-ranked player becomes the strongest in the game world.",
      creator: "Choi Seung-hoon",
      ep_count: 25,
      season: 2,
      image: "/assets/Anime/solo_leveling.png",
      genre: "Action, Fantasy, Game",
    },
    {
      title: "My Hero Academia",
      summary: "A boy without a quirk becomes the number one hero.",
      creator: "Kohei Horikoshi",
      ep_count: 170,
      season: 8,
      image: "/assets/Anime/my_hero_academia.png",
      genre: "Action, Fantasy, Game",
    },
    {
      title: "Attack on Titan",
      summary:
        "A boy who suffers his mother's death and pursues freedom for him and his friends.",
      creator: "Hajime Isayama",
      ep_count: 50,
      season: 4,
      image: "/assets/Anime/aot.png",
      genre: "Dark Fantasy, Action, Drama",
    },
  ];

  // Upsert anime and keep a lookup map by title
  const animeMap: Record<string, { id: string }> = {};

  for (const anime of animeList) {
    const record = await prisma.anime.upsert({
      where: { title: anime.title }, // title should be @unique
      update: {},
      create: anime,
    });
    animeMap[record.title] = { id: record.id };
  }

  // 2) Seed Characters and ATTACH them via relation `anime`
  const characterList = [
    {
      name: "Naruto Uzumaki",
      image: "/assets/Characters/naruto.png",
      role: "Genin / Jinchuriki of Kurama",
      desc: "A loud, determined ninja who dreams of becoming Hokage and earning the village's respect.",
      stats: 95,
      abilities: "Shadow Clone Jutsu, Rasengan, Sage Mode, Kurama Chakra Mode",
      strength: "Unbreakable will, massive chakra reserves, inspires allies.",
      weakness: "Impulsive, can rush into fights without thinking.",
      animeTitle: "Naruto Shippuden",
    },
    {
      name: "Sasuke Uchiha",
      image: "/assets/Characters/sasuke.png",
      role: "Avenger / Leaf Shinobi",
      desc: "The last Uchiha heir who walks a dark path seeking power and revenge.",
      stats: 96,
      abilities: "Sharingan, Mangekyo Sharingan, Chidori, Amaterasu",
      strength: "Genius-level talent, deadly speed and precision.",
      weakness: "Isolates himself, consumed by vengeance.",
      animeTitle: "Naruto Shippuden",
    },
    {
      name: "Kakashi Hatake",
      image: "/assets/Characters/kakashi.png",
      role: "Jonin / Copy Ninja",
      desc: "The Copy Ninja of the Leaf, famous for his Sharingan and calm demeanor.",
      stats: 92,
      abilities: "Sharingan, Lightning Blade, vast jutsu knowledge.",
      strength: "Battle IQ, experience, leadership.",
      weakness: "Limited stamina compared to monsters like Naruto/Sasuke.",
      animeTitle: "Naruto Shippuden",
    },
    {
      name: "Itachi Uchiha",
      image: "/assets/Characters/itachi.png",
      role: "Rogue Ninja / Former Anbu",
      desc: "A prodigy who sacrificed everything in the shadows to protect Konoha.",
      stats: 97,
      abilities: "Mangekyo Sharingan, Tsukuyomi, Amaterasu, Susanoo.",
      strength: "Calm, insanely intelligent, perfect genjutsu user.",
      weakness: "Chronic illness, carries heavy emotional burden.",
      animeTitle: "Naruto Shippuden",
    },
    {
      name: "Satoru Gojo",
      image: "/assets/Characters/gojo.png",
      role: "Jujutsu Sorcerer / Teacher",
      desc: "The strongest jujutsu sorcerer, casually broken and cocky.",
      stats: 99,
      abilities: "Limitless, Infinity, Hollow Purple, Six Eyes.",
      strength: "Overwhelming power, near untouchable defense.",
      weakness: "Overconfident, tends to act alone.",
      animeTitle: "Jujutsu Kaisen",
    },
    {
      name: "Megumi Fushiguro",
      image: "/assets/Characters/megumi.png",
      role: "Jujutsu Sorcerer",
      desc: "A serious sorcerer with powerful shikigami and hidden potential.",
      stats: 89,
      abilities: "Ten Shadows Technique, shikigami summoning.",
      strength: "Strategic fighter, adaptable in battle.",
      weakness: "Undervalues himself, can hesitate.",
      animeTitle: "Jujutsu Kaisen",
    },
    {
      name: "Tanjiro Kamado",
      image: "/assets/Characters/tanjiro.png",
      role: "Demon Slayer",
      desc: "A kind-hearted boy who becomes a Demon Slayer after tragedy hits his family.",
      stats: 90,
      abilities: "Water Breathing, Sun Breathing, enhanced smell.",
      strength: "Empathy, strong resolve, quick learner.",
      weakness: "Pushes himself past his limits, gets injured often.",
      animeTitle: "Demon Slayer",
    },
    {
      name: "Kyojuro Rengoku",
      image: "/assets/Characters/rengoku.png",
      role: "Flame Hashira",
      desc: "A bright, passionate Hashira who fights with unwavering conviction.",
      stats: 94,
      abilities: "Flame Breathing, incredible physical strength.",
      strength: "Unshakable spirit, inspires everyone around him.",
      weakness: "Tends to shoulder everything himself.",
      animeTitle: "Demon Slayer",
    },
    {
      name: "Izuku Midoriya",
      image: "/assets/Characters/izuku.png",
      role: "Hero Student",
      desc: "A quirkless boy who inherits One For All and trains to become the greatest hero.",
      stats: 91,
      abilities: "One For All, super strength, Full Cowling.",
      strength: "Analytical, determined, never gives up.",
      weakness: "Overthinks, can push his body too far.",
      animeTitle: "My Hero Academia",
    },
    {
      name: "Levi Ackerman",
      image: "/assets/Characters/levi.png",
      role: "Squad Captain",
      desc: "Humanity’s strongest soldier, short king with terrifying skills.",
      stats: 98,
      abilities: "ODM gear mastery, extreme speed and precision.",
      strength: "Unmatched skill against titans, cold focus.",
      weakness: "Emotionally closed off, carries heavy trauma.",
      animeTitle: "Attack on Titan",
    },
    {
      name: "Rukia Kuchiki",
      image: "/assets/Characters/rukia.png",
      role: "Squad Captain",
      desc: "Humanity’s strongest soldier, short king with terrifying skills.",
      stats: 98,
      abilities: "ODM gear mastery, extreme speed and precision.",
      strength: "Unmatched skill against titans, cold focus.",
      weakness: "Emotionally closed off, carries heavy trauma.",
      animeTitle: "Attack on Titan",
    },
  ];

  for (const character of characterList) {
    const parentAnime = animeMap[character.animeTitle];

    if (!parentAnime) {
      console.warn(
        `No anime found for character "${character.name}" with animeTitle "${character.animeTitle}". Skipping.`
      );
      continue;
    }

    await prisma.character.upsert({
      where: { name: character.name }, // name should be @unique
      update: {
        image: character.image,
        role: character.role,
        desc: character.desc,
        stats: character.stats,
        abilities: character.abilities,
        strength: character.strength,
        weakness: character.weakness,
        // attach via relation field, NOT animeId
        anime: {
          connect: { id: parentAnime.id },
        },
      },
      create: {
        name: character.name,
        image: character.image,
        role: character.role,
        desc: character.desc,
        stats: character.stats,
        abilities: character.abilities,
        strength: character.strength,
        weakness: character.weakness,
        anime: {
          connect: { id: parentAnime.id },
        },
      },
    });
  }

  console.log("✅ Seeded anime and characters with relations");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
