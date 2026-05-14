/**
 * Génère un audio style griot africain pour le conte "La Générosité récompensée"
 * Utilise l'API ElevenLabs pour une voix expressive et narrative.
 *
 * Usage :
 *   ELEVENLABS_API_KEY=sk-... npx tsx scripts/generate-audio-griot.ts
 *
 * Voices recommandées ElevenLabs :
 *   - "George"        → voix grave et posée, idéale pour un griot
 *   - "Clyde"         → voix chaude et dramatique
 *   - "Antoni"        → voix profonde et narrative
 *   Ou choisissez une voix via : https://elevenlabs.io/voice-library
 */

import fs from "fs";
import path from "path";

const API_KEY = process.env.ELEVENLABS_API_KEY;
if (!API_KEY) {
  console.error("❌ Définissez ELEVENLABS_API_KEY avant de lancer le script.");
  process.exit(1);
}

// Voix ElevenLabs avec style griot
// Remplacez VOICE_ID par l'ID de la voix choisie depuis voice-library
const VOICE_ID = process.env.ELEVENLABS_VOICE_ID || "2EiwWnXFnvU5JabPnv8n"; // "Clyde" - voix dramatique

const OUTPUT_PATH = path.resolve("public/assets/audio/generosite-recompensee.mp3");

// ─── Texte adapté en style griot africain ────────────────────────────────────
// Le griot africain utilise des formules d'appel, des répétitions expressives
// et un rythme oral qui invite l'auditeur à rentrer dans l'histoire.
const GRIOT_TEXT = `
Un conte ! Un conte !
Qu'il vienne, qu'il parte, qu'il revienne !

Écoutez bien, mes amis, écoutez bien.
Je vous raconte aujourd'hui l'histoire de Sawa,
la jeune fille généreuse du village Tanganyika.

Dans le village Tanganyika, vivaient heureux des paisibles citoyens.
On pouvait ressentir l'harmonie et la convivialité qui régnaient,
dès qu'on posait ses pieds à la grande hutte de Sawa,
positionnée à l'entrée du village.

Sawa ! Sawa !
Elle était une jeune fille à la peau noir ébène,
aux cheveux soigneusement tressés.
Elle portait toujours son sourire éclatant,
et son regard chaleureux, comme sa plus belle robe.

Elle était si accueillante que toute personne qui passait par le village Tanganyika
gardait souvenir d'elle.
Elle aimait se tenir à l'entrée du village, prononçant ce mot de bienvenue à tout visiteur :
Karibu !

Karibu ! Karibu !
Ce mot veut dire « Bienvenue chez nous » en Swahili,
langue parlée dans toute la région.

Sawa était également l'amie des animaux.
Elle nourrissait régulièrement Rouka, le singe malicieux,
et Kombe-Kombe, l'épervier au regard perçant.
Son aura enchantait toute personne qui croisait sa route.

Mais... mais écoutez bien ce qui arriva.
Le chef Mwami devenait de plus en plus agacé par les éloges
que ses invités faisaient au sujet de Sawa.
La jalousie est un poison terrible, mes amis. Un poison terrible.

Il décida de faire du village Tanganyika un énorme marché commercial,
pour exploiter le talent de Sawa et des artisans à son propre intérêt.

Aussitôt dit, le Mwami se rendit dans la grotte du village
invoquer Mvula, le dieu de la pluie.
Il exigea que la pluie tombe dès le soir même, malgré la saison sèche.

Mécontent de son attitude, Mvula fit tomber un violent torrent.
Le village fut piégé par les eaux,
les récoltes inondées,
et la détresse s'installa.

Ohhh... la détresse s'installa !

Touchée par la souffrance de ses concitoyens,
Sawa décida d'aller voir le chef, au péril de sa vie.
Elle demanda l'autorisation d'aller présenter des excuses à Mvula,
au nom du village, afin d'arrêter les souffrances.

Le chef accepta... mais il lui tendit une amulette prétendument protectrice.
En réalité, il préparait déjà un piège.
Il ordonna à ses guerriers d'attaquer Sawa sur la route.

Les guerriers capturèrent Sawa et s'apprêtèrent à l'immoler.
Mais écoutez ! Écoutez bien !

Rouka, le singe qu'elle avait nourri depuis son enfance,
demanda l'aide des gorilles.
Comme une véritable armée, ils descendirent des arbres,
assommèrent les guerriers... et sauvèrent Sawa !

La générosité revient toujours, mes amis.
Toujours.

Le lendemain, Sawa reprit la route accompagnée de ses amis primates.
À l'approche du domaine sacré de Mvula,
une violente tempête l'emporta dans les airs.
Sa chute aurait pu être fatale,
mais Kombe-Kombe, l'épervier, la recueillit sous ses ailes.

Kombe-Kombe lui demanda aussitôt de jeter l'amulette du Mwami,
car elle contenait un esprit maléfique.
Sawa comprit alors qu'elle avait été trahie.

Soudain, Sawa se retrouva devant le dieu de la pluie.
Tremblante mais courageuse,
elle supplia Mvula de pardonner au Mwami
et de délivrer le village des eaux.

Attendri, Mvula lui révéla qu'il était aussi Kombe-Kombe,
l'épervier qui venait souvent au village.
Il connaissait la générosité de Sawa,
car elle l'avait toujours nourri avec bonté.
Grâce à elle, tout le village serait sauvé.

Mvula redevint épervier et ramena Sawa jusqu'au village.
Dès qu'elle posa les pieds sur la flotte,
les eaux se retirèrent...
et la terre redevint ferme.

Les villageois, témoins de ce miracle, acclamèrent Sawa.
Reconnaissant son courage, son dévouement et sa bonté,
ils décidèrent de détrôner le Mwami...
et de faire de Sawa la nouvelle reine de Tanganyika !

Ainsi s'acheva la tyrannie du Mwami.
Les habitants retrouvèrent leur tranquillité,
vivant en harmonie les uns avec les autres,
tout en respectant la nature qui les entoure.

Conte terminé.
Ce que j'ai raconté est vrai, ou peut-être que non...
Mais la leçon, elle, est vraie pour toujours :
La générosité est toujours récompensée.
`;

// ─── Paramètres de voix ElevenLabs ───────────────────────────────────────────
const VOICE_SETTINGS = {
  stability: 0.35,         // Faible stabilité = plus de variation expressives
  similarity_boost: 0.75,  // Fidélité à la voix
  style: 0.65,             // Style expressif (0 = neutre, 1 = très expressif)
  use_speaker_boost: true
};

async function generateAudio() {
  console.log("🎙️ Génération audio en cours avec voix griot...");
  console.log(`📝 Texte : ${GRIOT_TEXT.length} caractères`);
  console.log(`🔊 Voice ID : ${VOICE_ID}`);

  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
    {
      method: "POST",
      headers: {
        "xi-api-key": API_KEY!,
        "Content-Type": "application/json",
        Accept: "audio/mpeg",
      },
      body: JSON.stringify({
        text: GRIOT_TEXT,
        model_id: "eleven_multilingual_v2",
        voice_settings: VOICE_SETTINGS,
      }),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    console.error("❌ Erreur API ElevenLabs :", response.status, error);
    process.exit(1);
  }

  const buffer = await response.arrayBuffer();
  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, Buffer.from(buffer));

  console.log(`✅ Audio sauvegardé : ${OUTPUT_PATH}`);
  console.log(`📦 Taille : ${(buffer.byteLength / 1024).toFixed(1)} Ko`);
}

generateAudio().catch(console.error);
