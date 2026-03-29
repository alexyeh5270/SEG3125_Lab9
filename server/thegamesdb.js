import fetch from "node-fetch";
import process from "process";
const API_BASE_URL = "https://api.thegamesdb.net";

export async function fetchGameById(req, res) {
  const API_KEY = process.env.THEGAMESDB_API_KEY;
  const { id, fields, include, page } = req.query;
  if (!id) {
    return res.status(400).json({ error: "Missing required id parameter" });
  }
  const params = new URLSearchParams({
    apikey: API_KEY,
    id,
    ...(fields && { fields }),
    ...(include && { include }),
    ...(page && { page }),
  });
  const url = `${API_BASE_URL}/v1/Games/ByGameID?${params.toString()}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error("Error in fetchGameById:", error);
    res.status(500).json({ error: "Failed to fetch game by ID" });
  }
}

export async function fetchGameByName(req, res) {
  const API_KEY = process.env.THEGAMESDB_API_KEY;
  const { name, fields, include, page, platform } = req.query;
  if (!name) {
    return res.status(400).json({ error: "Missing required name parameter" });
  }
  const params = new URLSearchParams({
    apikey: API_KEY,
    name,
    ...(fields && { fields }),
    ...(include && { include }),
    ...(page && { page }),
    ...(platform && { "filter[platform]": platform }),
  });
  try {
    const response = await fetch(
      `${API_BASE_URL}/v1.1/Games/ByGameName?${params.toString()}`,
    );
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error("Error in fetchGameByName:", error);
    res.status(500).json({ error: "Failed to fetch game by name" });
  }
}
