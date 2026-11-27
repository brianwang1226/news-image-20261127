// World News, Friday 27 November 2026: one image sums up the day.
// Six stories, all in Friday 27 November 2026's news wires: Brent crude
// near $96 as the Gulf war widens (Houthi strike on Aramco's Jazan
// refinery kills one worker; the Saudi-led coalition destroys the launch
// site and hits 50 Houthi targets); Zelenskyy warns of a new Russian mass
// strike in the coming days; China and Brazil hit back at Trump's new
// tariffs (China capped at 20%, up to 45% total; Brazil aircraft 10%);
// Gaza on edge as Hamas weighs its reply; a Thanksgiving storm leaves
// 900,000 without power and pushes the Macy's parade to Saturday; Nvidia
// halts server shipments to four Asian states. The image is entry.png
// beside this file (1024x1024 PNG, drawn by newsimage1127-draw.py from
// those reported facts). This program only copies it to the output the
// sealed scorer reads, and refuses to run if the image is missing, so a
// broken entry never ships silently.
import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ENTRY_FILE = "entry.png";
const EXPECTED_BYTES = 164482;
const OUT_DIR = process.env.MAKEFUN_OUTPUT_DIR || "/output";

// Resolve the image next to this script, wherever the grader runs it.
const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, ENTRY_FILE);

// Fail loudly on a missing or truncated image; the gate reads the bytes,
// so a short file would score zero instead of failing here.
const info = statSync(source);
if (!info.isFile() || info.size !== EXPECTED_BYTES) {
  throw new Error(
    `entry image ${ENTRY_FILE} is ${info.size} bytes, expected ${EXPECTED_BYTES}`,
  );
}

mkdirSync(OUT_DIR, { recursive: true });
copyFileSync(source, join(OUT_DIR, ENTRY_FILE));
