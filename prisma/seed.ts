// prisma/seed.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

  const animeList = [
    {
      title: "Bleach: Thousand-Year Blood War",
      summary:
        "Ichigo Kurosaki thought his life would finally calm down after earning the power and responsibility of a Soul Reaper. But when strange spiritual disturbances begin spreading through Karakura Town and beyond, it becomes clear that something far worse than Hollows is moving in the shadows. A wave of disappearances and silent killings hints at an enemy that understands Soul Reaper systems, tactics, and weaknesses—an enemy that has been waiting for the perfect moment to strike.\n\nThat moment arrives when the Quincy Empire, led by the terrifying Yhwach, declares war on Soul Society. The Wandenreich invade with ruthless precision, crushing squads, stealing Bankai, and forcing captains and lieutenants into the most desperate battles of their lives. As the Soul Reapers scramble to survive, secrets about the Quincy, the Soul King, and the true structure of the afterlife surface—revealing that the conflict isn’t just a battle for territory, but a clash over the very rules of existence.\n\nWith the Soul Society on the brink of collapse, Ichigo is pushed to confront the origin of his own power: the truths behind his Zanpakutō, his mixed spiritual heritage, and what it really means to protect people when the cost is everything. Allies are broken, loyalties are tested, and victory becomes less about strength and more about resolve. In a war where both sides believe they are restoring the world to its “proper” state, Ichigo must decide what future is worth fighting for—and what he’s willing to lose to reach it.",
      creator: "Tite Kubo",
      ep_count: 40,
      season: 3,
      image: "/assets/Anime/bleach_v2.png",
      genre: "Action, Shounen, Supernatural",
    },
    {
      title: "Jujutsu Kaisen",
      summary:
        "Yuji Itadori is an unusually strong high schooler living a simple life—until he encounters a cursed object so dangerous it draws monsters like a beacon. In a split-second decision to save others, Yuji swallows the object: one of Sukuna’s fingers. Rather than dying, he becomes the host of Ryomen Sukuna, the most feared curse in history, effectively turning Yuji into a walking disaster that the jujutsu world would rather execute than risk.\n\nTaken in by Tokyo Jujutsu High, Yuji enters a hidden society of sorcerers who exorcise curses created from human fear, grief, hatred, and regret. Under Gojo Satoru, Yuji trains beside Megumi Fushiguro and Nobara Kugisaki, learning cursed energy control and the harsh reality that saving people often means choosing who you can’t save. Missions escalate from local hauntings to encounters with special-grade curses and organized curse users, revealing a growing conspiracy aimed at overturning the balance of the jujutsu world.\n\nBut the greatest threat is inside Yuji himself. Sukuna doesn’t bargain—he waits, provokes, and searches for openings to seize control at the worst possible time. As jujutsu politics tighten around Yuji, allies question if he’s a hero or a ticking bomb. Yuji’s core struggle becomes deeply personal: he wants a “proper death” that has meaning, but every battle forces him to confront the pain of survival, the weight of responsibility, and the terrifying truth that being strong enough to protect others can also make you the most dangerous person in the room.",
      creator: "Gege Akutami",
      ep_count: 47,
      season: 3,
      image: "/assets/Anime/jjk_v2.png",
      genre: "Action, Dark Fantasy, Supernatural",
    },
    {
      title: "Demon Slayer",
      summary:
        "Tanjiro Kamado returns home to find his family slaughtered by demons, with his sister Nezuko being the sole survivor—yet tragically transformed into a demon herself. Refusing to give up on her humanity, Tanjiro sets out on a path that is equal parts revenge and rescue: he wants to stop the demon who destroyed his life, and he wants to find a cure that will bring his sister back.\n\nTo do that, Tanjiro joins the Demon Slayer Corps, an organization that has fought demons for generations in the shadows of Japan’s night. Through brutal training, he learns breathing techniques that push the human body to its limits, sharpening his senses and swordsmanship into something capable of matching supernatural monsters. Each mission introduces Tanjiro to demons with horrifying power and heartbreaking origins—creatures shaped by despair, abuse, and the thirst for survival—forcing Tanjiro to balance compassion with the necessity of killing.\n\nAs Tanjiro grows stronger, the true scale of the war reveals itself: the Demon King Muzan Kibutsuji and his elite forces, the Twelve Kizuki, are far beyond anything most slayers can handle. Tanjiro’s journey becomes a fight against fate itself—surviving impossible battles, earning the respect of the Hashira, and uncovering the legacy behind his own family’s connection to a legendary breathing style. In a world where one mistake means death, Tanjiro pushes forward with empathy as his weapon and determination as his shield, refusing to let tragedy be the final word.",
      creator: "Koyoharu Gotouge",
      ep_count: 63,
      season: 4,
      image: "/assets/Anime/demon_slayer_v2.png",
      genre: "Action, Historical, Supernatural",
    },

    {
      title: "Naruto Shippuden",
      summary:
        "After years of training with Jiraiya, Naruto Uzumaki returns to the Hidden Leaf Village no longer just the loud kid everyone ignored—he’s a shinobi with real skill, real scars, and a real dream. But his homecoming isn’t peaceful. A shadowy organization called Akatsuki is moving across the nations, hunting the Tailed Beasts and the jinchūriki who contain them. Naruto realizes quickly that his journey to become Hokage is no longer just about recognition—it’s about survival and protecting the people who finally believe in him.\n\nAs Team 7’s story continues, the series becomes a collision of personal rivalries and world-level war. Sasuke Uchiha’s path drifts further into darkness as he seeks revenge and power, while Naruto fights to bring him back without losing himself. Meanwhile, political tension between villages, secret histories of legendary clans, and the consequences of past wars all bubble to the surface. The shinobi world begins to crack under the weight of old hatred, and the line between “hero” and “villain” becomes painfully complicated.\n\nNaruto Shippuden builds toward massive turning points: heartbreaking sacrifices, brutal battles against god-level enemies, and revelations about the origins of chakra and the true meaning of peace. Naruto’s growth isn’t just strength—he learns leadership, empathy, and the burden of carrying hope when everyone else is ready to give up. In the end, it’s a story about cycles of revenge and the fight to break them—where the greatest power isn’t a jutsu, but the ability to understand someone who’s already decided to hate you.",
      creator: "Masashi Kishimoto",
      ep_count: 500,
      season: 21,
      image: "/assets/Anime/naruto.png",
      genre: "Action, Adventure, Comedy",
    },

    {
      title: "Solo Leveling",
      summary:
        "In a world where mysterious gates open and connect Earth to deadly dungeons, “Hunters” risk their lives to clear monsters and protect humanity. Sung Jinwoo is known as the weakest Hunter of all—barely surviving raids, constantly injured, and mocked for being useless. He keeps showing up anyway, because he needs the money to support his family and pay for his mother’s hospital care. For Jinwoo, every dungeon isn’t an adventure—it's a gamble with his life.\n\nEverything changes when a routine raid turns into a nightmare: a hidden double dungeon filled with rules, traps, and an overwhelming presence that wipes out stronger Hunters like they’re nothing. Jinwoo is left behind and should die… but instead, he receives a strange “System” that only he can see—like a game interface giving him quests, stats, and the ability to level up. For the first time ever, a Hunter can grow stronger after awakening, and Jinwoo becomes the exception that threatens to rewrite the rules of the entire world.\n\nAs Jinwoo’s power skyrockets, he’s forced into conflicts that are bigger than any single dungeon. Powerful guilds want to control him, governments want to monitor him, and the truth behind the gates begins to reveal an ancient war with cosmic stakes. Jinwoo’s rise is thrilling, but it’s also isolating—because the stronger he becomes, the less human his battles feel. The series mixes hype progression with darker questions: what does strength cost, how far would you go to protect your people, and what happens when you become the monster everyone else fears?",
      creator: "Chugong",
      ep_count: 25,
      season: 2,
      image: "/assets/Anime/solo_leveling.png",
      genre: "Action, Fantasy, Game",
    },

    {
      title: "My Hero Academia",
      summary:
        "In a society where nearly everyone is born with a superpower called a Quirk, heroism is an industry—complete with rankings, agencies, brand deals, and public expectations. Izuku Midoriya grows up idolizing heroes more than anyone, studying their moves and dreaming of becoming one himself. The problem is brutal: he’s one of the rare people born Quirkless, and the world constantly reminds him that wanting something isn’t the same as being capable of it.\n\nMidoriya’s life flips when he meets his idol, All Might, the Symbol of Peace. After witnessing Midoriya’s courage in the face of real danger, All Might chooses him as his successor and passes down One For All, a legendary power that can be inherited. But gaining power doesn’t instantly make Midoriya a hero—his body can’t handle it, and every use risks destroying him from the inside. At U.A. High School, he trains alongside future legends like Bakugo and Todoroki while facing villains that threaten the stability of hero society.\n\nAs the stakes rise, the story digs deeper into what heroism really means. Villains aren’t just “bad guys”—many are products of a system that failed them. The public’s trust becomes fragile, heroes face burnout and corruption, and the line between saving people and being used as a symbol gets messy. My Hero Academia is about growth through pressure: Midoriya learning how to lead without losing his kindness, classmates discovering their own reasons to fight, and a world realizing that peace built on one person’s shoulders will eventually crack.",
      creator: "Kohei Horikoshi",
      ep_count: 170,
      season: 8,
      image: "/assets/Anime/my_hero_academia.png",
      genre: "Action, Superhero, Shounen",
    },

    {
      title: "Attack on Titan",
      summary:
        "Humanity lives behind towering walls, surviving in fear of Titans—giant, mindless creatures that devour people for no apparent reason. Eren Yeager’s world shatters when a colossal Titan breaches the wall and turns his home into a slaughterhouse, killing his mother and leaving him with a single obsession: wipe every Titan off the face of the earth. Alongside Mikasa Ackerman and Armin Arlert, Eren joins the military to fight back, believing the enemy is simple and the goal is clear.\n\nBut the truth is far more horrifying than the Titans themselves. As Eren and his friends learn the reality of the world beyond the walls, the story transforms into a brutal political and ideological war. Secrets about Titan powers, hidden histories, and betrayal from within turn every victory into another question. The Survey Corps must fight not only monsters, but propaganda, corruption, and impossible choices where saving one group may doom another.\n\nAttack on Titan becomes a story about freedom, fear, and how people justify violence. Characters you trust can become enemies, and enemies can reveal reasons you never expected. With every revelation, the meaning of “monster” shifts—from Titans, to humans, to the systems that shape them. It’s intense, strategic, and tragic, constantly asking: if you had the power to protect your people, how far would you go before you became the villain in someone else’s story?",
      creator: "Hajime Isayama",
      ep_count: 87,
      season: 4,
      image: "/assets/Anime/aot.png",
      genre: "Dark Fantasy, Action, Drama",
    },

    {
      title: "One Piece",
      summary:
        "Monkey D. Luffy sets sail with a ridiculous dream: to find the legendary treasure known as the One Piece and become the King of the Pirates. In a world ruled by the World Government, the Marines, and powerful pirate crews, freedom is rare and truth is dangerous. Luffy’s greatest weapon isn’t strategy or reputation—it’s his ability to attract people who’ve lost hope and make them believe in a future again.\n\nAs the Straw Hat crew grows, each member brings their own trauma, goals, and reasons for fighting. Their adventures take them across islands with completely different cultures, politics, and threats—some hilarious, some heartbreaking, and some straight-up terrifying. Under the surface, the world is tied together by a hidden history: ancient weapons, forbidden knowledge, and a century erased from the record. Every arc pushes Luffy closer to the center of a global conflict he didn’t even realize he stepped into.\n\nWhat makes One Piece hit hard is that it isn’t just about fights—it’s about inherited will, chosen family, and rebellion against systems that crush people. Luffy constantly challenges tyrants, slavers, and corrupt leaders, not because he wants to be a hero, but because he can’t stand watching someone’s freedom get stolen. The story builds into massive wars, world-shaking alliances, and reveals that turn a goofy pirate journey into one of the biggest, deepest fantasy worlds in anime.",
      creator: "Eiichiro Oda",
      ep_count: 1100,
      season: 21,
      image: "/assets/Anime/one_piece.png",
      genre: "Action, Adventure, Comedy",
    },

    {
      title: "Fullmetal Alchemist: Brotherhood",
      summary:
        "After attempting forbidden human transmutation to bring their mother back, brothers Edward and Alphonse Elric pay a horrifying price: Edward loses an arm and a leg, while Alphonse loses his entire body—his soul bound to a suit of armor. Determined to undo the damage, they become State Alchemists and search for the Philosopher’s Stone, a rumored artifact capable of amplifying alchemy and restoring what was lost.\n\nTheir journey quickly reveals that the Stone is tied to genocide, political manipulation, and human experimentation on a national scale. The militarized government of Amestris is built on secrets, with shady projects and “accidents” that look more like planned sacrifices. As the brothers dig deeper, they meet allies and enemies whose lives were shaped by war: soldiers with PTSD, civilians who lost everything, and survivors who refuse to let history be rewritten.\n\nBrotherhood is a story about consequences and morality. It asks what a life is worth, whether power can ever be used cleanly, and how far people will go to “fix” their pain. The villains aren’t random—they represent twisted philosophy and long-term planning. And through it all, Ed and Al learn that real strength is choosing responsibility over shortcuts, protecting others even when it costs, and accepting that some things can’t be gained without equal sacrifice.",
      creator: "Hiromu Arakawa",
      ep_count: 64,
      season: 1,
      image: "/assets/Anime/fmab.png",
      genre: "Action, Adventure, Fantasy",
    },

    {
      title: "Hunter x Hunter (2011)",
      summary:
        "Gon Freecss grows up believing his father abandoned him, only to learn the truth: Ging is alive and is a legendary “Hunter,” an elite class of adventurers licensed to explore dangerous lands, track rare creatures, uncover secrets, and take on missions normal people can’t survive. Gon decides to become a Hunter not for revenge, but for understanding—he wants to know what could be so amazing that his father would choose it over everything else.\n\nThe Hunter Exam introduces Gon to lifelong friends and brutal reality: talent doesn’t guarantee survival. Killua is an assassin kid trying to escape his family’s shadow, Kurapika is fueled by revenge for his massacred clan, and Leorio wants power to help people in his own way. Their paths split and intersect across arcs that feel completely different—tournament battles, crime family politics, psychological mind games, and wars against creatures that force humanity to question its own place in the food chain.\n\nHunter x Hunter shines because it doesn’t play fair. Power systems are strategic, fights are brainy, and victories often come with a cost. The story explores obsession, morality, and how good intentions can become destructive. It builds to arcs that go from fun adventure to some of the darkest, most intense storytelling in shounen—where the real question isn’t “who wins,” but “what does winning do to you afterward?”",
      creator: "Yoshihiro Togashi",
      ep_count: 148,
      season: 7,
      image: "/assets/Anime/hxh.png",
      genre: "Action, Adventure, Fantasy",
    },

    {
      title: "Chainsaw Man",
      summary:
        "Denji’s life is rock-bottom: he’s drowning in debt inherited from his father, surviving by hunting devils for pocket change, and living with only his pet devil-dog Pochita as family. When he’s betrayed and killed, Denji makes a contract that brings him back as Chainsaw Man—a human-devil hybrid with chainsaws bursting from his body. Suddenly, he’s thrown into the world of Public Safety, an organization that weaponizes devil hunters to fight threats that regular people can’t even comprehend.\n\nDenji’s dreams are painfully simple—good food, a bed, and someone to care about him. But that simplicity makes him easy to manipulate, and the people around him often treat him as a tool rather than a person. As Denji meets fellow hunters like Aki and Power, the story mixes chaotic comedy with sudden, brutal tragedy. Devils are born from fear, and the stronger the fear, the stronger the devil—meaning the world’s worst nightmares take physical form.\n\nChainsaw Man is about control, loneliness, and how trauma distorts desire. The fights are insane, but the emotional damage is the real threat. Denji has to figure out who he is when everyone wants something from him—his power, his loyalty, his body, his future. It’s stylish, violent, and surprisingly human, showing how someone starved of love can confuse survival with happiness until reality forces them to grow.",
      creator: "Tatsuki Fujimoto",
      ep_count: 12,
      season: 1,
      image: "/assets/Anime/chainsaw_man.png",
      genre: "Action, Dark Fantasy, Supernatural",
    },

    {
      title: "Spy x Family",
      summary:
        "In a tense Cold War-like era, master spy Twilight is tasked with an impossible mission: infiltrate an elite social circle by building a “perfect family” in a matter of days. To do it, he becomes Loid Forger, adopts a young girl named Anya, and marries a woman named Yor. The twist is that none of them are normal—Loid is a spy, Yor is a professional assassin, and Anya can read minds. And somehow… they all keep their secrets from each other.\n\nWhat starts as a fake household turns into a surprisingly wholesome (and chaotic) found-family story. Loid tries to stay emotionally detached because attachments get spies killed. Yor tries to act like a normal wife while hiding the fact that she murders people for a living. Anya just wants the family to stay together, even when she knows every secret and every lie. Missions, school politics, and assassination jobs collide with parenting stress, awkward romance, and the daily struggle of pretending to be “normal.”\n\nSpy x Family balances comedy with emotional moments about connection and healing. It’s about broken people building something real by accident. Even though their roles started as lies, their small acts—protecting each other, showing up, trying—become genuine. And in a world obsessed with suspicion and conflict, the Forgers slowly become proof that peace can start with something as simple as caring about the people in your home.",
      creator: "Tatsuya Endo",
      ep_count: 37,
      season: 2,
      image: "/assets/Anime/spy_x_family.png",
      genre: "Comedy, Action, Slice of Life",
    },

    {
      title: "Death Note",
      summary:
        "Light Yagami is a brilliant student who believes the world is rotten. When he finds a mysterious notebook—the Death Note—he discovers that anyone whose name is written inside will die. With the power to kill from anywhere, Light decides to become a godlike judge, cleansing society of criminals and creating a “perfect” world under his rule. He calls this new identity Kira, and the world begins to change as people fear judgment from an invisible executioner.\n\nBut Kira’s rise draws the attention of L, a legendary detective who treats the case like a chess match. L quickly narrows the search, and what follows is a psychological war where each side tries to expose the other without revealing themselves. Light must balance school life, family life, and constant suspicion, all while manipulating people around him to stay ahead. Meanwhile, the Death Note introduces rules, loopholes, and supernatural elements that expand the game beyond simple murder.\n\nDeath Note is less about action and more about obsession, ego, and moral collapse. It asks whether power can ever be used “cleanly,” and how quickly someone becomes what they claim to hate when they believe the ends justify the means. As the body count rises and the pressure tightens, the story becomes a warning: when someone decides they alone define justice, the line between savior and tyrant disappears.",
      creator: "Tsugumi Ohba",
      ep_count: 37,
      season: 1,
      image: "/assets/Anime/death_note.png",
      genre: "Thriller, Mystery, Supernatural",
    },
  ];

  // Upsert anime and keep a lookup map by title
  const animeMap: Record<string, { id: string }> = {};

  for (const anime of animeList) {
    const record = await prisma.anime.upsert({
      where: { title: anime.title }, // title should be @unique
      update: {
        summary: anime.summary,
        creator: anime.creator,
        ep_count: anime.ep_count,
        season: anime.season,
        image: anime.image,
        genre: anime.genre,
      },
      create: anime,
    });

    animeMap[record.title] = { id: record.id };
  }

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
      abilities: "Limitless, Infinity, Hollow Purple, Six Eyes",
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
      abilities: "Ten Shadows Technique, shikigami summoning",
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
      abilities: "Water Breathing, Sun Breathing, enhanced smell",
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
      abilities: "Flame Breathing, incredible physical strength",
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
      abilities: "One For All, super strength, Full Cowling",
      strength: "Analytical, determined, never gives up.",
      weakness: "Overthinks, can push his body too far.",
      animeTitle: "My Hero Academia",
    },
    {
      name: "Levi Ackerman",
      image: "/assets/Characters/levi.png",
      role: "Squad Captain",
      desc: "Humanity’s strongest soldier, cold, precise, and terrifyingly efficient with ODM gear.",
      stats: 98,
      abilities: "ODM gear mastery, extreme speed and precision",
      strength: "Unmatched skill against titans, elite combat instincts.",
      weakness: "Emotionally guarded, carries heavy trauma.",
      animeTitle: "Attack on Titan",
    },

    {
      name: "Rukia Kuchiki",
      image: "/assets/Characters/rukia.png",
      role: "Soul Reaper / Noble of the Kuchiki Clan",
      desc: "A disciplined Soul Reaper whose choices pull Ichigo into the spirit world and shape his path.",
      stats: 90,
      abilities: "Zanpakutō (Sode no Shirayuki), Kido, Hakuda",
      strength: "Composed under pressure, strong technique and control.",
      weakness: "Can be emotionally distant, carries guilt alone.",
      animeTitle: "Bleach: Thousand-Year Blood War",
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
      where: { name: character.name }, 
      update: {
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
