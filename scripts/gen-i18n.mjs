/**
 * One-off: translate src/i18n/en.json into the supported Indian languages with
 * Gemini and write src/i18n/translations.json. Re-run whenever en.json changes.
 *
 *   node scripts/gen-i18n.mjs       (needs GEMINI_API_KEY in .env)
 *
 * Output is static + committed, so the running app makes no translation calls
 * for UI strings. Keep proper nouns ("NammaFix AI", "Gemini", "BBMP") as-is.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const enPath = path.join(__dirname, "../src/i18n/en.json");
const outPath = path.join(__dirname, "../src/i18n/translations.json");

const TARGETS = [
  { code: "hi", name: "Hindi" },
  { code: "kn", name: "Kannada" },
  { code: "ta", name: "Tamil" },
  { code: "te", name: "Telugu" },
  { code: "bn", name: "Bengali" },
  { code: "mr", name: "Marathi" },
];

const en = JSON.parse(readFileSync(enPath, "utf8"));

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("GEMINI_API_KEY not set. Aborting.");
  process.exit(1);
}
const ai = new GoogleGenAI({ apiKey });

// One batched request for all languages — keeps the free-tier quota footprint tiny.
const langList = TARGETS.map((t) => `${t.code} (${t.name})`).join(", ");
const prompt =
  `Translate the VALUES of this English UI string table into these languages: ${langList}. ` +
  `This is a civic issue-reporting app used in Indian neighbourhoods. ` +
  `Rules: keep the SAME keys; translate only the values; keep proper nouns unchanged ("NammaFix AI", "Gemini", "BBMP", "Ward"); ` +
  `keep it natural and concise (UI labels, buttons, headings); preserve punctuation and the “smart quotes”. ` +
  `Return ONLY a JSON object keyed by the language code (${TARGETS.map((t) => t.code).join(", ")}), ` +
  `where each value is the fully translated table with the same keys. No markdown.\n\n` +
  JSON.stringify(en, null, 2);

console.log(`Translating ${Object.keys(en).length} keys into ${TARGETS.length} languages in one call...`);
const res = await ai.models.generateContent({
  model: "gemini-2.5-flash",
  contents: prompt,
  config: { responseMimeType: "application/json" },
});
const text = (res.text || "").trim().replace(/^```json\s*/i, "").replace(/```\s*$/, "");
const out = JSON.parse(text);

// Sanity-check coverage so a partial response can't silently ship.
for (const { code } of TARGETS) {
  const got = out[code] ? Object.keys(out[code]).length : 0;
  const want = Object.keys(en).length;
  console.log(`  ${code}: ${got}/${want} keys${got < want ? "  <-- INCOMPLETE" : ""}`);
}

writeFileSync(outPath, JSON.stringify(out, null, 2) + "\n", "utf8");
console.log(`Wrote ${outPath}`);
