import * as fs from "fs/promises";

export default async function handler(req, res) {
  const myDir = await fs.readdir("/Users/robz");
  res.status(201).json({ list: myDir });
}
