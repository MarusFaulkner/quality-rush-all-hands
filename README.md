# Quality Rush: All Hands

The Quality Rush finale. **Mike Maintenance**, **Maya Metrology** and **Mister Quality** share one plant floor for a 3-minute shift, and a problem in one zone flows into the next, the same way it does in a real plant:

**Production → Inspection → Shipping**
**Prevention → Detection → Containment**

- **Mike (Production):** a machine on yellow makes bad parts, and its lot becomes suspect. Lock out, then repair, before it breaks down.
- **Maya (Inspection):** pull defective parts off the conveyor before they're boxed.
- **Mister Quality (Shipping):** throw a HOLD tag on every box from a suspect lot before it reaches the truck.

You control one teammate at a time. The other two run on autopilot, slower and less accurate, so you go where the plant needs you. Three bad parts reaching the truck and the shift fails.

Part of the **Quality Rush** series by Marcus Faulkner, with [Defect Runner](https://marusfaulkner.github.io/quality-rush/), [Line Down!](https://marusfaulkner.github.io/line-down/) and [Containment Strike](https://marusfaulkner.github.io/containment-strike/).

## How to play

| Action | Phone | Keyboard / mouse |
|---|---|---|
| Take control of a teammate | Tap their button or tap them | 1, 2, 3 |
| Fix a machine | Tap it, then **Lock out**, then tap **Repair** fast | Click it, L, then Space |
| Pull a defective part | Tap it on the conveyor | Click it |
| Hold a suspect box | Tap it | Click it |
| Move | Tap the floor | ← → |
| Pause | Pause button | P or Esc |

The last 30 seconds are a **truck rush**: everything moves faster.

The end-of-shift report shows **where each problem was caught** (fixed at the machine, pulled on the line, held at the dock, or escaped), uptime, and a team rank from Trainee to **ALL HANDS ON DECK**.

## Run it locally

No build step. Open `index.html` in a browser, or serve the folder:

```
python3 -m http.server
```

## Tech

Plain HTML, CSS and JavaScript. Canvas for the plant floor, SVG parts drawn in code, Web Audio for the synthesized music and sound effects. Artwork was generated with AI and cut out for the game.

A game, not safety or quality training. Follow your site's procedures.

© 2026 Marcus Faulkner · Quality Rush · Mister Quality™
