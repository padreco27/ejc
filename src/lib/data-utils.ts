import { promises as fs } from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "src", "data");

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function readData(filename: string): Promise<any[]> {
  const filePath = path.join(DATA_DIR, filename);
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function writeData(filename: string, data: any[]): Promise<void> {
  const filePath = path.join(DATA_DIR, filename);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}
