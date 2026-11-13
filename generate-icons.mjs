import sharp from "sharp";

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="80" fill="#3b7d1c"/>
  <text x="256" y="340" font-size="320" text-anchor="middle" fill="white" font-family="serif">🌿</text>
</svg>`;

const svgBuffer = Buffer.from(svg);

await sharp(svgBuffer).resize(32, 32).png().toFile("app/favicon.png");
console.log("Favicon berhasil dibuat!");