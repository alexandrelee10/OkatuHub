"use client";

import Link from "next/link";

const characters = [
  {
    id: "1",
    name: "Naruto Uzumaki",
    anime: "Naruto Shippuden",
    image:
      "https://cdn.myanimelist.net/images/characters/10/73578.jpg",
  },
  {
    id: "2",
    name: "Sasuke Uchiha",
    anime: "Naruto Shippuden",
    image:
      "https://cdn.myanimelist.net/images/characters/10/73578.jpg",
  },
  {
    id: "3",
    name: "Kakashi Hatake",
    anime: "Naruto Shippuden",
    image:
      "https://cdn.myanimelist.net/images/characters/10/73578.jpg",
  },
  {
    id: "4",
    name: "Itachi Uchiha",
    anime: "Naruto Shippuden",
    image:
      "https://cdn.myanimelist.net/images/characters/10/73578.jpg",
  },
];

const PopularCharacters = () => {
  return (
    <section className="w-full px-4 sm:px-8 lg:px-16 py-12 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-left">
          Popular Characters
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {characters.map((char) => (
            <Link
              key={char.id}
              href={`/characters/${char.id}`}
              className="group bg-zinc-900/80 border border-zinc-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg hover:border-red-500 transition-all"
            >
              {/* Image */}
              <div className="relative w-full h-40 sm:h-48 overflow-hidden">
                <img
                  src={char.image}
                  alt={char.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Info */}
              <div className="p-3 space-y-1">
                <h3 className="text-sm font-semibold group-hover:text-red-300 transition-colors">
                  {char.name}
                </h3>
                <p className="text-xs text-zinc-400">{char.anime}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCharacters;
