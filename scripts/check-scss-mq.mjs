// Guardrail: component modules must use `@include mq(...)`, never a raw
// `@media (min-width: …)`. Keeps breakpoints routed through one API.
import fs from "fs";
import path from "path";

function walk(d) {
  let o = [];
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.posix.join(d.replace(/\\/g, "/"), e.name);
    if (e.isDirectory()) o = o.concat(walk(p));
    else o.push(p);
  }
  return o;
}

const offenders = [];
for (const f of walk("src/components").filter((x) => x.endsWith(".module.scss"))) {
  const txt = fs.readFileSync(f, "utf8");
  txt.split("\n").forEach((line, i) => {
    if (/@media\s*\(\s*min-width/.test(line)) offenders.push(`${f}:${i + 1}`);
  });
}

if (offenders.length) {
  console.error("Raw @media (min-width) found — use @include mq() instead:");
  offenders.forEach((o) => console.error("  " + o));
  process.exit(1);
}
console.log("scss breakpoint guard: ok");
