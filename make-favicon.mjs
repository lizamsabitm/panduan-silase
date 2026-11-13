import sharp from "sharp";
import { writeFileSync } from "fs";

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="6" fill="#3b7d1c"/>
  <path d="M16 4 C10 4 5 9 5 15 C5 20 9 24 14 25 L14 20 C11 19 9 17 9 15 C9 11 12 8 16 8 C20 8 23 11 23 15 C23 17 21 19 18 20 L18 25 C23 24 27 20 27 15 C27 9 22 4 16 4Z" fill="white"/>
  <rect x="15" y="15" width="2" height="12" rx="1" fill="white"/>
</svg>`;

await sharp(Buffer.from(svg))
  .resize(32, 32)
  .png()
  .toFile("public/favicon-32.png");

await sharp(Buffer.from(svg))
  .resize(16, 16)
  .png()
  .toFile("public/favicon-16.png");

console.log("File PNG favicon berhasil dibuat!");