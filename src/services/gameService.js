const PLATFORM_NAMES = {
  1: "PC",
  4: "Nintendo Switch",
  5: "Wii",
  6: "Wii U",
  7: "PlayStation",
  8: "PlayStation 2",
  9: "PlayStation 3",
  10: "PlayStation 4",
  11: "PlayStation 5",
  12: "Xbox",
  13: "Xbox 360",
  14: "Xbox One",
  15: "Xbox Series X",
  4919: "PlayStation 5",
  4920: "Xbox Series X",
  4980: "PC",
  4981: "Nintendo Switch",
};

import { getJson } from "./apiClient";

const DEVELOPER_ID_TO_NAME = {
  2808: "Square Enix",
  9150: "Ubisoft",
  9151: "Ubisoft Annecy",
  9152: "UbiSoft Barcelona",
  9153: "Ubisoft Casablanca",
  9155: "Ubisoft France",
  9156: "Ubisoft Milan",
  9157: "Ubisoft Montpellier",
  9149: "Ubisoft Montreal",
  9165: "Ubisoft Nagoya",
  9147: "Ubisoft Paris",
  9168: "Ubisoft Porto Alegre",
  9169: "Ubisoft Quebec",
  9171: "Ubisoft Reflections",
  9172: "Ubisoft Romania",
  9173: "Ubisoft San Francisco",
  9175: "Ubisoft Sao Paulo",
  9176: "Ubisoft Shanghai",
  10343: "Ubisoft Singapore",
  9177: "Ubisoft Sofia",
  9178: "Ubisoft Tiwak",
  9179: "Ubisoft Toronto",
  9180: "Ubisoft Vancouver",
  9181: "Ubisoft, Disney Interactive Studios",
  9182: "Uchida",
  9183: "uclick",
  9184: "UCS",
  9185: "Udo Gertz",
  9187: "UEA Game Lab",
  9188: "UEP Systems",
  9189: "UFO Interactive",
  9191: "UGA",
  9192: "UGC D.A. International",
  9194: "UIG Entertainment",
  9195: "UK Magic",
  9196: "Ukiyotei",
  9197: "Ukiyotei, Fine",
  10018: "Epic Games", // Fortnite
  7006: "Treyarch", // Call of Duty: Black Ops 7
  9025: "Raven Software", // Call of Duty: Black Ops 7
  4971: "Mojang Studios", // Minecraft
  5658: "4J Studios", // Minecraft
  7826: "Microsoft Studios", // Minecraft
  7249: "Roblox Corporation", // ROBLOX
  10210: "Valve", // Counter-Strike 2
  7217: "Riot Games", // League of Legends
};

export async function listAllGames() {
  const gameNames = [
    "Fortnite",
    "Call of Duty: Black Ops 7",
    "Minecraft",
    "Roblox",
    "Counter-Strike 2",
    "League of Legends",
    "EA Sports FC 26",
    "Helldivers 2",
    "Grand Theft Auto V",
    "Elden Ring",
  ];
  const results = await Promise.all(
    gameNames.map(async (name) => {
      const result = await fetchGameByNameFromAPI(name, { include: "boxart" });
      if (
        result.data &&
        Array.isArray(result.data.games) &&
        result.data.games.length > 0
      ) {
        const boxart = result.include && result.include.boxart;
        const baseUrl = boxart && boxart.base_url && boxart.base_url.original;
        const game = result.data.games[0];
        let posterUrl = "";
        if (
          boxart &&
          boxart.data &&
          boxart.data[game.id] &&
          boxart.data[game.id][0]
        ) {
          posterUrl = baseUrl + boxart.data[game.id][0].filename;
        }
        let developerName = "Unknown";
        if (Array.isArray(game.developers) && game.developers.length > 0) {
          developerName = game.developers
            .map((dev) => {
              if (typeof dev === "string" && isNaN(Number(dev))) return dev;
              const id = typeof dev === "number" ? dev : Number(dev);
              return DEVELOPER_ID_TO_NAME[id] || dev;
            })
            .join(", ");
        }
        return {
          id: game.id,
          title: game.game_title,
          developer: developerName,
          platforms: game.platform
            ? [PLATFORM_NAMES[game.platform] || String(game.platform)]
            : [],
          releaseYear: game.release_date ? game.release_date.split("-")[0] : "",
          posterUrl,
          description: game.overview || "",
        };
      }
      return null;
    }),
  );
  return results.filter(Boolean);
}

export async function fetchGameByIdFromAPI(gameId, options = {}) {
  return getJson("api/games/by-id", {
    query: {
      id: gameId,
      ...options,
    },
  });
}

export async function fetchGameByNameFromAPI(name, options = {}) {
  return getJson("api/games/by-name", {
    query: {
      name,
      ...options,
    },
  });
}

export async function listFeaturedGames() {
  return listAllGames();
}

export async function getGameById(gameId) {
  const result = await fetchGameByIdFromAPI(gameId, {
    include: "boxart,genres,players,publishers",
  });
  if (
    result.data &&
    Array.isArray(result.data.games) &&
    result.data.games.length > 0
  ) {
    const game = result.data.games[0];
    const boxart = result.include && result.include.boxart;
    const baseUrl = boxart && boxart.base_url && boxart.base_url.original;
    let posterUrl = "";
    if (
      boxart &&
      boxart.data &&
      boxart.data[game.id] &&
      boxart.data[game.id][0]
    ) {
      posterUrl = baseUrl + boxart.data[game.id][0].filename;
    }
    let developerName = "Unknown";
    if (Array.isArray(game.developers) && game.developers.length > 0) {
      developerName = game.developers
        .map((dev) => {
          if (typeof dev === "string" && isNaN(Number(dev))) return dev;
          const id = typeof dev === "number" ? dev : Number(dev);
          return DEVELOPER_ID_TO_NAME[id] || dev;
        })
        .join(", ");
    }
    let genres = [];
    if (
      result.include &&
      result.include.genres &&
      result.include.genres.data &&
      game.genres
    ) {
      genres = game.genres
        .map((id) => result.include.genres.data[id]?.name)
        .filter(Boolean);
    }
    let publishers = [];
    if (
      result.include &&
      result.include.publishers &&
      result.include.publishers.data &&
      game.publishers
    ) {
      publishers = game.publishers
        .map((id) => result.include.publishers.data[id]?.name)
        .filter(Boolean);
    }
    let playerInfo = null;
    if (
      result.include &&
      result.include.players &&
      result.include.players.data &&
      game.players
    ) {
      playerInfo = result.include.players.data[game.players]?.name || null;
    }
    const esrb = game.esrb || null;
    const coop = game.coop || null;
    const releaseDate = game.release_date || "";
    return {
      id: game.id,
      title: game.game_title,
      developer: developerName,
      platforms: game.platform
        ? [PLATFORM_NAMES[game.platform] || String(game.platform)]
        : [],
      releaseYear: game.release_date ? game.release_date.split("-")[0] : "",
      releaseDate,
      posterUrl,
      description: game.overview || "",
      genres,
      publishers,
      esrb,
      coop,
      playerInfo,
    };
  }
  return null;
}
