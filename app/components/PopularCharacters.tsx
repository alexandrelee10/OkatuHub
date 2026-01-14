import Link from "next/link";
import Image from "next/image";
import prisma from "../lib/prisma";

const PopularCharacters = async () => {
  const characters = await prisma.character.findMany({
    take: 8,
    orderBy: { name: "asc" },
    select: {
      id: true,
      name: true,
      image: true,
      anime: true,
    },
  });

  return (
    <section className="w-full px-4 sm:px-8 lg:px-16 py-12 bg-black text-white">
      <div className="max-w-7xl mx-auto text-center">

        <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-center">
          Popular Characters
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {characters.map((char: any) => (
            <Link
              key={char.id}
              href={`/characters/${char.id}`}
              className="group bg-zinc-900/80 border border-zinc-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg hover:border-red-500 transition-all"
            >
              <div className="relative w-full h-40 sm:h-48 overflow-hidden">
                <Image
                  src={char.image}
                  alt={char.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-3 space-y-1">
                <h3 className="text-sm font-semibold group-hover:text-red-300 transition-colors">
                  {char.name}
                </h3>
                <p className="text-xs text-zinc-400 truncate">
                  {Array.isArray(char.anime)
                    ? char.anime.join(", ")
                    : char.anime || ""}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCharacters;
