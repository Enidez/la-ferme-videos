// J+1 — décor « maquette en coupe » réutilisable : l'immeuble de Sam (cage d'escalier, 5 niveaux), les figurines, la place de la mairie.
// Unités réelles (mètres) : les objets Poly Haven sont posés à leur vraie taille. Toutes les figurines sont posables (bras, jambes, tête, sourcils).
import * as THREE from 'three';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';

// ---------- matériaux et primitives
const MC = new Map();
export const M = (c, r = .8, o = {}) => { const k = c + r + JSON.stringify(o); if (!MC.has(k)) MC.set(k, new THREE.MeshStandardMaterial({color: c, roughness: r, ...o})); return MC.get(k); };
const sh = o => { o.traverse(m => { if (m.isMesh) { m.castShadow = true; m.receiveShadow = true; } }); return o; };
export function box(p, w, h, d, m, x, y, z) { const o = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m); o.position.set(x, y, z); sh(o); p.add(o); return o; }
export function rbox(p, w, h, d, m, x, y, z, r = .06) { const o = new THREE.Mesh(new RoundedBoxGeometry(w, h, d, 3, Math.min(r, w / 2, h / 2, d / 2)), m); o.position.set(x, y, z); sh(o); p.add(o); return o; }
export function cyl(p, r1, r2, h, m, x, y, z, n = 20) { const o = new THREE.Mesh(new THREE.CylinderGeometry(r1, r2, h, n), m); o.position.set(x, y, z); sh(o); p.add(o); return o; }
function ball(p, r, m, x, y, z, sx = 1, sy = 1, sz = 1) { const o = new THREE.Mesh(new THREE.SphereGeometry(r, 24, 16), m); o.position.set(x, y, z); o.scale.set(sx, sy, sz); sh(o); p.add(o); return o; }
function caps(p, r, l, m, x, y, z) { const o = new THREE.Mesh(new THREE.CapsuleGeometry(r, l, 6, 16), m); o.position.set(x, y, z); sh(o); p.add(o); return o; }
// texture « panneau » dessinée au canvas (affiches, boîtes aux lettres, enseigne MAIRIE)
export function canvasTex(w, h, draw) { const c = document.createElement('canvas'); c.width = w; c.height = h; draw(c.getContext('2d'), w, h); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t; }
// halo doux (fumée, poussière) pour les sprites
export const softTex = canvasTex(128, 128, (g, w) => { const r = g.createRadialGradient(64, 64, 0, 64, 64, 64); r.addColorStop(0, 'rgba(255,255,255,1)'); r.addColorStop(.5, 'rgba(255,255,255,.35)'); r.addColorStop(1, 'rgba(255,255,255,0)'); g.fillStyle = r; g.fillRect(0, 0, w, w); });

// ---------- objets Poly Haven (window.MODELS chargé par <script>)
const LIB = {};
export async function loadModels(GL, ids) { await Promise.all(ids.map(id => new Promise((ok, ko) => GL.parse(JSON.stringify(window.MODELS[id]), '', g => { LIB[id] = g.scene; ok(); }, ko)))); }
// pose un objet à sa taille réelle, posé au sol en (x,y,z) ; s = facteur d'échelle éventuel
export function put(p, id, x, y, z, ry = 0, s = 1) { const o = sh(LIB[id].clone()); o.scale.setScalar(s); o.rotation.y = ry; const b = new THREE.Box3().setFromObject(o); o.position.set(x, y - b.min.y, z); p.add(o); return o; }

// ---------- figurines « vinyle » : grosse tête, corps arrondi, articulations nommées
// opt : skin, top, bottom, shoes, hair ('court'|'chignon'|'bonnet'|'aucun'), hairCol, hood, beard, glasses, cane, scarf, vest (gilet fluo), h (taille), hunch
export function perso(opt = {}) {
  const k = opt.h || 1, g = new THREE.Group(), P = {};
  const skin = M(opt.skin || '#d9a27e', .55), top = M(opt.top || '#e8742c', .75), bot = M(opt.bottom || '#3b4a63', .85), shoe = M(opt.shoes || '#f1efe9', .6);
  const root = new THREE.Group(); root.scale.setScalar(k); g.add(root);
  // jambes (hanche -> genou -> pied)
  const leg = s => { const hip = new THREE.Group(); hip.position.set(.095 * s, .78, 0); root.add(hip); caps(hip, .085, .26, bot, 0, -.2, 0);
    const knee = new THREE.Group(); knee.position.y = -.4; hip.add(knee); caps(knee, .075, .24, bot, 0, -.17, 0); rbox(knee, .15, .1, .27, shoe, 0, -.36, .05, .045); return {hip, knee}; };
  P.legL = leg(-1); P.legR = leg(1);
  // buste
  const torso = new THREE.Group(); torso.position.y = .78; root.add(torso); P.torso = torso;
  rbox(torso, .4, .2, .24, bot, 0, .04, 0, .09);                                     // bassin
  const chest = new THREE.Mesh(new THREE.CapsuleGeometry(.19, .26, 8, 20), top); chest.scale.set(1.08, 1, .7); chest.position.y = .33; sh(chest); torso.add(chest);
  if (opt.hood) { const hd = new THREE.Mesh(new THREE.SphereGeometry(.15, 20, 14), top); hd.scale.set(1.1, .8, .55); hd.position.set(0, .56, -.15); sh(hd); torso.add(hd);
    rbox(torso, .2, .09, .03, M(opt.top, .9), 0, .2, .13, .03);                       // poche kangourou
    [-.05, .05].forEach(x => cyl(torso, .008, .008, .12, M('#f1efe9', .6), x, .46, .14, 6)); }
  if (opt.vest) { const v = new THREE.Mesh(new THREE.CapsuleGeometry(.197, .2, 8, 20), M('#d7f20f', .5, {emissive: '#3a4200'})); v.scale.set(1.1, 1, .73); v.position.y = .35; sh(v); torso.add(v);
    [.28, .42].forEach(y => box(torso, .44, .025, .3, M('#c9cdd2', .2, {metalness: .6}), 0, y, 0)); }
  if (opt.scarf) { const sc = new THREE.Mesh(new THREE.TorusGeometry(.12, .045, 10, 24), M(opt.scarf, .9)); sc.rotation.x = Math.PI / 2; sc.position.y = .6; sh(sc); torso.add(sc); }
  // bras (épaule -> coude -> main)
  const arm = s => { const sh_ = new THREE.Group(); sh_.position.set(.24 * s, .52, 0); torso.add(sh_); caps(sh_, .062, .16, top, 0, -.12, 0);
    const el = new THREE.Group(); el.position.y = -.27; sh_.add(el); caps(el, .055, .14, top, 0, -.1, 0); ball(el, .055, skin, 0, -.24, 0); return {sh: sh_, el}; };
  P.armL = arm(-1); P.armR = arm(1);
  // tête
  const head = new THREE.Group(); head.position.y = .7; torso.add(head); P.head = head;
  cyl(head, .06, .07, .1, skin, 0, .02, 0);
  const hr = .2, hc = .2; ball(head, hr, skin, 0, hc, 0, 1, 1.02, .96);
  ball(head, .03, skin, 0, hc - .01, hr * .97);                                       // nez
  [-1, 1].forEach(s => ball(head, .04, skin, .195 * s, hc, 0, .5, 1, .8));          // oreilles
  const eyeM = M('#16120f', .25), hiM = M('#ffffff', .2, {emissive: '#777'});
  P.eyes = [-1, 1].map(s => { const e = ball(head, .026, eyeM, .07 * s, hc + .035, hr * .93, 1, 1.35, .6); ball(head, .008, hiM, .07 * s + .008, hc + .05, hr * .93 + .016); return e; });
  const browM = M(opt.hairCol || '#2a1d14', .8);
  P.brows = [-1, 1].map(s => { const b = rbox(head, .075, .018, .02, browM, .072 * s, hc + .095, hr * .9, .008); b.userData.s = s; return b; });
  P.mouth = rbox(head, .06, .012, .02, M('#6b3a30', .7), 0, hc - .075, hr * .9, .006);
  const hairM = M(opt.hairCol || '#2a1d14', .85);
  if (opt.hair === 'court' || !opt.hair) { const c = new THREE.Mesh(new THREE.SphereGeometry(hr * 1.04, 24, 16, 0, Math.PI * 2, 0, Math.PI * .4), hairM); c.position.y = hc + .02; c.rotation.x = -.1; sh(c); head.add(c); }
  if (opt.hair === 'chignon') { const c = new THREE.Mesh(new THREE.SphereGeometry(hr * 1.05, 24, 16, 0, Math.PI * 2, 0, Math.PI * .45), hairM); c.position.y = hc; c.rotation.x = -.25; sh(c); head.add(c); ball(head, .085, hairM, 0, hc + .14, -.13); }
  if (opt.hair === 'bonnet') { const c = new THREE.Mesh(new THREE.SphereGeometry(hr * 1.07, 24, 16, 0, Math.PI * 2, 0, Math.PI * .4), M(opt.hatCol || '#2d3440', .95)); c.position.y = hc + .02; sh(c); head.add(c);
    const rim = new THREE.Mesh(new THREE.TorusGeometry(hr * .98, .03, 8, 28), M(opt.hatCol || '#2d3440', .95)); rim.rotation.x = Math.PI / 2; rim.position.y = hc + .07; sh(rim); head.add(rim); }
  if (opt.beard) { const b = new THREE.Mesh(new THREE.SphereGeometry(hr * 1.02, 24, 16, Math.PI * .2, Math.PI * .6, Math.PI * .66, Math.PI * .3), M(opt.beardCol || '#4a3426', .95)); b.position.y = hc; sh(b); head.add(b); P.mouth.visible = false; }
  if (opt.glasses) { const gM = M('#8a6d3b', .3, {metalness: .7}); [-1, 1].forEach(s => { const r = new THREE.Mesh(new THREE.TorusGeometry(.043, .007, 8, 20), gM); r.position.set(.07 * s, hc + .035, hr * .97); head.add(r); }); box(head, .05, .007, .007, gM, 0, hc + .04, hr * .99); }
  if (opt.cane) { const c = new THREE.Group(); P.armR.el.add(c); cyl(c, .014, .014, .86, M('#4a3320', .5), 0, -.62, .02, 8); const t = new THREE.Mesh(new THREE.TorusGeometry(.04, .013, 8, 12, Math.PI), M('#4a3320', .5)); t.position.set(-.04, -.2, .02); c.add(t); P.cane = c; }
  if (opt.hunch) { torso.rotation.x = opt.hunch; head.rotation.x = -opt.hunch * .7; }
  // ombre de contact douce sous les pieds
  const sd = new THREE.Mesh(new THREE.CircleGeometry(.32, 24), new THREE.MeshBasicMaterial({map: softTex, color: '#000', transparent: true, opacity: .35, depthWrite: false})); sd.rotation.x = -Math.PI / 2; sd.position.y = .005; g.add(sd);
  g.userData.P = P; g.userData.hunch = opt.hunch || 0; sh(g); return g;
}
// poses : valeurs en radians ; brows = inquiétude (>0 sourcils relevés au centre)
export function pose(f, o = {}) { const P = f.userData.P, hu = f.userData.hunch;
  // remise à zéro (une même figurine sert dans plusieurs plans)
  [P.armL, P.armR].forEach(a => { a.sh.rotation.set(0, 0, 0); a.el.rotation.set(0, 0, 0); }); [P.legL, P.legR].forEach(l => { l.hip.rotation.set(0, 0, 0); l.knee.rotation.set(0, 0, 0); });
  P.torso.rotation.set(hu, 0, 0); P.head.rotation.set(-hu * .7, 0, 0); f.userData.sitDrop = 0;
  const A = (a, v) => { if (!v) return; a.sh.rotation.set(v[0] || 0, 0, v[1] || 0); a.el.rotation.x = v[2] || 0; };
  A(P.armL, o.armL); A(P.armR, o.armR);
  if (o.legL) { P.legL.hip.rotation.x = o.legL[0]; P.legL.knee.rotation.x = o.legL[1]; } if (o.legR) { P.legR.hip.rotation.x = o.legR[0]; P.legR.knee.rotation.x = o.legR[1]; }
  if (o.sit) { const s = o.sit; P.legL.hip.rotation.x = P.legR.hip.rotation.x = -1.45 * s; P.legL.knee.rotation.x = P.legR.knee.rotation.x = 1.45 * s; f.userData.sitDrop = .33 * s; }
  if (o.head) P.head.rotation.set(o.head[0] || 0, o.head[1] || 0, o.head[2] || 0);
  if (o.lean !== undefined) P.torso.rotation.x = o.lean;
  if (o.brows !== undefined) P.brows.forEach(b => { b.rotation.z = -b.userData.s * o.brows; });
  if (o.mouth !== undefined) P.mouth.scale.set(1 - .3 * o.mouth, 1 + 3 * o.mouth, 1);
  return f; }
export function place(p, f, x, y, z, ry = 0) { f.position.set(x, y - (f.userData.sitDrop || 0), z); f.rotation.y = ry; p.add(f); return f; }

// ---------- mobilier
const WOOD = M('#8a6447', .6), WOOD2 = M('#5b4130', .6), WHITE = M('#e9e5dc', .45), STEEL = M('#b9bcc0', .3, {metalness: .6});
export const FURN = {
  sofa(p, x, y, z, col = '#4f6475', w = 2, ry = 0) { const g = new THREE.Group(); g.position.set(x, y, z); g.rotation.y = ry; p.add(g); const m = M(col, .9);
    rbox(g, w, .42, .9, m, 0, .21, 0, .08); rbox(g, w, .5, .22, m, 0, .62, -.34, .1); [-1, 1].forEach(s => rbox(g, .2, .58, .9, m, (w / 2 - .1) * s, .3, 0, .08));
    for (let i = 0; i < 2; i++) rbox(g, (w - .44) / 2 - .02, .14, .66, M(col, 1), -((w - .44) / 4) + i * ((w - .44) / 2), .48, .08, .06); return g; },
  armchair(p, x, y, z, col = '#7d4f5f', ry = 0) { return FURN.sofa(p, x, y, z, col, 1.05, ry); },
  table(p, x, y, z, w = 1.4, d = .85) { rbox(p, w, .05, d, WOOD, x, y + .75, z, .015); [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([a, b]) => box(p, .05, .73, .05, WOOD2, x + a * (w / 2 - .08), y + .365, z + b * (d / 2 - .08))); },
  chair(p, x, y, z, ry = 0) { const g = new THREE.Group(); g.position.set(x, y, z); g.rotation.y = ry; p.add(g); rbox(g, .44, .05, .44, WOOD, 0, .46, 0, .015);
    [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([a, b]) => box(g, .04, .45, .04, WOOD2, a * .19, .225, b * .19)); rbox(g, .44, .4, .04, WOOD, 0, .7, -.2, .015); return g; },
  low(p, x, y, z, w = 1, d = .55) { rbox(p, w, .06, d, WOOD, x, y + .4, z, .02); rbox(p, w - .1, .04, d - .1, WOOD2, x, y + .12, z, .01); [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([a, b]) => box(p, .04, .4, .04, WOOD2, x + a * (w / 2 - .06), y + .2, z + b * (d / 2 - .06))); },
  kitchen(p, x, y, z, w = 2.6, upper = true) { // plan de travail contre le mur du fond, placards hauts, évier, frigo
    rbox(p, w, .86, .62, WHITE, x, y + .43, z, .02); rbox(p, w + .04, .05, .66, M('#3b3631', .4), x, y + .885, z + .01, .01);
    for (let i = 0; i < Math.floor(w / .6); i++) { box(p, .56, .78, .01, M('#dcd6ca', .4), x - w / 2 + .3 + i * .6, y + .43, z + .315); box(p, .12, .02, .02, STEEL, x - w / 2 + .3 + i * .6, y + .74, z + .33); }
    box(p, .5, .04, .4, STEEL, x + w / 4, y + .9, z); cyl(p, .012, .012, .25, STEEL, x + w / 4, y + 1.03, z - .15, 8);
    if (upper) rbox(p, w, .7, .35, WHITE, x, y + 1.85, z - .13, .02); rbox(p, .7, 1.9, .65, M('#d8dadc', .35), x - w / 2 - .38, y + .95, z, .04); box(p, .03, .5, .03, STEEL, x - w / 2 - .1, y + 1.3, z + .34); },
  bed(p, x, y, z, w = 1.5, col = '#8f9fb8', ry = 0) { const g = new THREE.Group(); g.position.set(x, y, z); g.rotation.y = ry; p.add(g);
    rbox(g, w, .3, 2, WOOD2, 0, .15, 0, .03); rbox(g, w - .08, .2, 1.92, WHITE, 0, .38, 0, .06); rbox(g, w, .9, .08, WOOD2, 0, .55, -1, .03);
    rbox(g, w - .04, .12, 1.4, M(col, 1), 0, .5, .28, .06); [-1, 1].forEach(s => rbox(g, w / 2 - .12, .14, .4, WHITE, s * w / 4, .53, -.72, .07)); return g; },
  wardrobe(p, x, y, z, w = 1.2) { rbox(p, w, 2.1, .6, WOOD, x, y + 1.05, z, .02); box(p, .01, 2, .02, WOOD2, x, y + 1.05, z + .3); [-1, 1].forEach(s => box(p, .02, .25, .03, STEEL, x + s * .06, y + 1.1, z + .31)); },
  shelf(p, x, y, z, w = 1, h = 1.9) { rbox(p, w, h, .32, WOOD2, x, y + h / 2, z, .01); const C = ['#a33b2b', '#2d5a7b', '#d9b44a', '#4d7a4f', '#e3dccf', '#5a3f63'];
    for (let r = 0; r < 4; r++) { box(p, w - .06, .025, .3, WOOD, x, y + .3 + r * h / 4.4, z + .01); let bx = x - w / 2 + .07; let i = r * 3;
      while (bx < x + w / 2 - .12) { const bw = .03 + ((i * 7) % 5) * .012, bh = .2 + ((i * 3) % 4) * .03; box(p, bw, bh, .2, M(C[i % 6], .8), bx + bw / 2, y + .3 + r * h / 4.4 + .0125 + bh / 2, z + .02); bx += bw + .006; i++; } } },
  rug(p, x, y, z, w, d, col = '#7a3b32') { const t = canvasTex(256, 256, (g) => { g.fillStyle = col; g.fillRect(0, 0, 256, 256); g.strokeStyle = 'rgba(255,240,210,.45)'; g.lineWidth = 10; g.strokeRect(18, 18, 220, 220); g.lineWidth = 4; g.strokeRect(40, 40, 176, 176); });
    const o = new THREE.Mesh(new THREE.PlaneGeometry(w, d), new THREE.MeshStandardMaterial({map: t, roughness: 1})); o.rotation.x = -Math.PI / 2; o.position.set(x, y + .012, z); o.receiveShadow = true; p.add(o); },
  frame(p, x, y, z, w = .5, h = .4, col = '#c7b28d') { rbox(p, w, h, .03, WOOD2, x, y, z, .01); box(p, w - .08, h - .08, .01, M(col, .7), x, y, z + .016); },
  plant(p, x, y, z) { cyl(p, .14, .11, .3, M('#b4613b', .8), x, y + .15, z); for (let i = 0; i < 6; i++) { const l = ball(p, .1, M('#3f6b3a', .8), x + Math.sin(i * 2.4) * .1, y + .45 + (i % 3) * .1, z + Math.cos(i * 2.4) * .1, .6, 1.4, .6); l.rotation.z = Math.sin(i) * .5; } },
  radiator(p, x, y, z, w = .8) { for (let i = 0; i < 10; i++) rbox(p, w / 10 - .01, .55, .08, WHITE, x - w / 2 + w / 20 + i * w / 10, y + .45, z, .02); },
  blanket(p, x, y, z, w, d, col = '#b8423a', ry = 0) { const o = rbox(p, w, .08, d, M(col, 1), x, y, z, .04); o.rotation.y = ry; return o; },
  // plaid posé sur des genoux : profil (z,y) extrudé sur la largeur w, motif écossais
  plaid(p, x, y, w, prof, col = '#a8322b') { const sh_ = new THREE.Shape(); const th = .05; prof.forEach(([z, yy], i) => i ? sh_.lineTo(z, yy) : sh_.moveTo(z, yy)); [...prof].reverse().forEach(([z, yy]) => sh_.lineTo(z + th * .6, yy - th));
    const t = canvasTex(256, 256, (g) => { g.fillStyle = col; g.fillRect(0, 0, 256, 256); g.fillStyle = 'rgba(30,20,20,.35)'; for (let i = 0; i < 256; i += 64) { g.fillRect(i, 0, 22, 256); g.fillRect(0, i, 256, 22); } g.fillStyle = 'rgba(240,210,150,.4)'; for (let i = 30; i < 256; i += 64) { g.fillRect(i, 0, 4, 256); g.fillRect(0, i, 256, 4); } });
    t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(2, 2);
    const o = new THREE.Mesh(new THREE.ExtrudeGeometry(sh_, {depth: w, bevelEnabled: true, bevelSize: .02, bevelThickness: .02, bevelSegments: 3, curveSegments: 12}), new THREE.MeshStandardMaterial({map: t, roughness: 1}));
    o.rotation.y = -Math.PI / 2; o.position.set(x + w / 2, y, 0); sh(o); p.add(o); return o; },
};

// ---------- l'immeuble en coupe
// Repères : x = largeur (cage d'escalier à gauche), y = haut, z = vers la caméra. Niveaux : 0 = RDC, 1 = 1er … 4 = 4e.
export const B = {FH: 2.8, SL: .26, X0: -6.8, XS: -3.6, X1: 6.2, XIN: 1.6, D: 4.6, NF: 5};
export const Y = f => f * B.FH + B.SL / 2;                                          // sol fini du niveau f
export function immeuble(S) {
  const g = new THREE.Group(); S.add(g); const {FH, SL, X0, XS, X1, XIN, D, NF} = B, zb = -D / 2, W = X1 - X0;
  const cut = M('#c8c1b4', .9), plaster = M('#d8d0c2', .9), stairM = M('#b5aea2', .85), outer = M('#9b8f80', .95);
  const PAP = ['#9aa3a9', '#c9b893', '#a7b6a0', '#d2b48c', '#9c9fb8'], FLOOR = ['#77736c', '#8a6a4f', '#93714f', '#7b5a43', '#6e5b4d'];
  for (let f = 0; f <= NF; f++) {
    const y = f * FH; box(g, X1 - XS + .3, SL, D + .2, cut, (X1 + XS) / 2 + .15, y, 0);              // dalle appartement
    box(g, XS - X0 - 2.2 + .3, SL, D + .2, cut, X0 - .15 + (XS - X0 - 2.2 + .3) / 2, y, 0);           // palier côté mur (x0)
    box(g, 1.1, SL, D + .2, cut, XS - .5, y, 0);                                                    // palier devant la porte
  }
  // murs extérieurs, toit, acrotère
  box(g, .3, NF * FH + SL, D + .3, outer, X0 - .15, NF * FH / 2, 0); box(g, .3, NF * FH + SL, D + .3, outer, X1 + .15, NF * FH / 2, 0);
  rbox(g, W + 1, .5, D + .7, outer, (X0 + X1) / 2, NF * FH + .35, 0, .05); box(g, W + .8, .5, .15, outer, (X0 + X1) / 2, NF * FH + .8, zb - .1);
  [-3.2, 3.6].forEach(x => { box(g, .5, 1.2, .5, outer, x, NF * FH + 1.2, -1); box(g, .7, .1, .7, cut, x, NF * FH + 1.85, -1); });     // conduits de cheminée
  // mur du fond percé de fenêtres (on voit la nuit dehors, la lune éclaire le sol)
  const WINS = [[-1.9, 1.3], [.3, 1.1], [3.9, 1.3]];
  for (let f = 0; f < NF; f++) {
    const y0 = f * FH + SL / 2, h = FH - SL, pap = M(PAP[f], .95);
    // segments de mur autour des fenêtres (appartement)
    let xa = XS; const cuts = WINS.map(([cx, w]) => [cx - w / 2, cx + w / 2]);
    cuts.forEach(([a, b]) => { box(g, a - xa, h, .25, pap, (xa + a) / 2, y0 + h / 2, zb - .125); box(g, b - a, .9, .25, pap, (a + b) / 2, y0 + .45, zb - .125); box(g, b - a, h - 2.3, .25, pap, (a + b) / 2, y0 + 2.3 + (h - 2.3) / 2, zb - .125);
      // menuiserie + vitre
      const fr = M('#e8e4dc', .5); box(g, b - a, .06, .3, fr, (a + b) / 2, y0 + .93, zb - .1); box(g, b - a, .06, .1, fr, (a + b) / 2, y0 + 2.27, zb - .2); box(g, .05, 1.4, .1, fr, (a + b) / 2, y0 + 1.6, zb - .2);
      const gl = new THREE.Mesh(new THREE.PlaneGeometry(b - a, 1.4), new THREE.MeshStandardMaterial({color: '#203250', roughness: .1, metalness: .2, transparent: true, opacity: .25})); gl.position.set((a + b) / 2, y0 + 1.6, zb - .2); g.add(gl);
      if (f > 0) [-1, 1].forEach(s => rbox(g, .22, 1.7, .08, M(['#7a2f2f', '#c9b77e', '#4c6a7a', '#6b4f7a', '#8b8f6a'][f], 1), s < 0 ? a - .05 : b + .05, y0 + 1.45, zb + .05, .04));
      xa = b; });
    box(g, X1 - xa, h, .25, pap, (xa + X1) / 2, y0 + h / 2, zb - .125);
    box(g, XS - X0, h, .25, plaster, (X0 + XS) / 2, y0 + h / 2, zb - .125);                         // fond de cage
    // sol fini (parquet / carrelage) et plinthes
    box(g, X1 - XS - .1, .02, D - .2, M(FLOOR[f], .7), (X1 + XS) / 2, y0 + .01, 0);
    // mur de refend séjour / chambre (avec porte ouverte), cloison palier / appartement avec porte d'entrée
    box(g, .12, h, D - 2.2, plaster, XIN, y0 + h / 2, zb + (D - 2.2) / 2); box(g, .12, h - 2.1, 1, plaster, XIN, y0 + 2.1 + (h - 2.1) / 2, zb + D - 2.2 + .5); box(g, .12, h, 1.2, plaster, XIN, y0 + h / 2, D / 2 - .6);
    // cloison d'entrée : porte entre z=.35 et z=1.25 (vue de profil, visible depuis le palier)
    box(g, .16, h, 2.65, plaster, XS, y0 + h / 2, zb + 1.325); box(g, .16, h - 2.1, .9, plaster, XS, y0 + 2.1 + (h - 2.1) / 2, .8); box(g, .16, h, 1.05, plaster, XS, y0 + h / 2, 1.775);
    if (f > 0) { const door = new THREE.Group(); door.position.set(XS, y0, 1.25); g.add(door); rbox(door, .06, 2.08, .9, M('#5a3a26', .55), 0, 1.04, -.45, .015);
      [-1, 1].forEach(s => { cyl(door, .015, .015, .12, STEEL, s * .06, 1.0, -.8, 8).rotation.z = Math.PI / 2; }); ball(door, .012, M('#111', .2), .04, 1.55, -.45);
      box(door, .02, .1, .14, M('#c9a35c', .3, {metalness: .7}), .045, 1.7, -.45); g.userData['door' + f] = door; }
    if (f === 0) { box(g, X1 - XS - .2, .02, D - .2, M('#77736c', .7), (X1 + XS) / 2, y0 + .01, 0); }
  }
  // escaliers : deux volées par étage (arrière vers la gauche, puis avant vers la droite), palier intermédiaire contre le mur
  const step = (x, y, z, w) => box(g, .18, .18, w, stairM, x, y, z);
  for (let f = 0; f < NF; f++) { const y = f * FH + SL / 2, xa = XS - 1.1, xb = X0 + 1.05;
    for (let i = 0; i < 8; i++) { const t = (i + 1) / 8, x = xa - (xa - xb) * t, yy = y + 1.4 * t; step(x, yy - .09, -1.15, 2.1); }
    box(g, 1.05, SL * .7, D - .2, stairM, X0 + .52, y + 1.4 - SL * .35, 0);
    for (let i = 0; i < 8; i++) { const t = (i + 1) / 8, x = xb + (xa - xb) * t, yy = y + 1.4 + 1.4 * t; step(x, yy - .09, 1.15, 2.1); }
    // rampe métallique
    const rail = new THREE.Mesh(new THREE.CylinderGeometry(.02, .02, Math.hypot(xa - xb, 1.4), 8), M('#2b2f36', .4, {metalness: .7}));
    rail.position.set((xa + xb) / 2, y + 1.4 + .95, 2.2); rail.rotation.z = Math.atan2(1.4, xa - xb) - Math.PI / 2; g.add(rail);
  }
  // RDC : hall, boîtes aux lettres, compteur, porte vitrée sur rue
  const bal = canvasTex(512, 256, (c, w, h) => { c.fillStyle = '#6f7a80'; c.fillRect(0, 0, w, h); for (let i = 0; i < 10; i++) { const x = 10 + (i % 5) * 100, y = 10 + Math.floor(i / 5) * 120; c.fillStyle = '#8c979d'; c.fillRect(x, y, 92, 110); c.fillStyle = '#20252a'; c.fillRect(x + 12, y + 20, 68, 8); c.fillStyle = '#efe8d6'; c.fillRect(x + 20, y + 60, 52, 18); } });
  const bx = new THREE.Mesh(new THREE.BoxGeometry(2, 1, .25), [M('#6f7a80'), M('#6f7a80'), M('#6f7a80'), M('#6f7a80'), new THREE.MeshStandardMaterial({map: bal, roughness: .5, metalness: .3}), M('#6f7a80')]);
  bx.position.set(-.8, Y(0) + 1.4, zb + .14); sh(bx); g.add(bx);
  return g;
}

// ---------- extérieur : rue, réverbères éteints, voitures, immeubles d'en face, ciel étoilé, lune
export function rue(S, {night = true} = {}) {
  const g = new THREE.Group(); S.add(g);
  const sw = M('#5d5a55', .95); box(g, 60, .14, 3.4, sw, 0, -.07, 4); box(g, 60, .14, 12, M('#3d3f44', .95), 0, -.05, -8);
  const road = new THREE.Mesh(new THREE.PlaneGeometry(60, 9), M('#22252b', .9)); road.rotation.x = -Math.PI / 2; road.position.set(0, -.12, 10.2); road.receiveShadow = true; g.add(road);
  for (let i = -6; i < 7; i++) box(g, 1.6, .01, .14, M('#c9c4b8', .8), i * 4, -.11, 10.2);
  const car = (x, z, col) => { const c = new THREE.Group(); c.position.set(x, -.12, z); g.add(c); rbox(c, 4.1, .7, 1.75, M(col, .35, {metalness: .4}), 0, .55, 0, .18); rbox(c, 2.3, .6, 1.6, M(col, .35, {metalness: .4}), -.2, 1.1, 0, .2);
    rbox(c, 2.15, .48, 1.62, M('#1a2230', .1, {metalness: .5}), -.2, 1.12, 0, .16); [[-1.3, 1], [1.3, 1], [-1.3, -1], [1.3, -1]].forEach(([a, b]) => { const w = cyl(c, .34, .34, .22, M('#15171a', .8), a, .34, b * .8, 16); w.rotation.x = Math.PI / 2; }); };
  car(-3.4, 7.6, '#8e2b25'); car(7.8, 7.6, '#c9c6bf'); car(15, 12.6, '#2d4a6b');
  // immeubles voisins (fenêtres éteintes)
  const nb = (x, w, h, col) => { const b = box(g, w, h, 10, M(col, .95), x, h / 2, -2); for (let r = 0; r < Math.floor(h / 2.8); r++) for (let c = 0; c < Math.floor(w / 2); c++) box(g, .9, 1.2, .05, M('#0d1626', .2), x - w / 2 + 1 + c * 2, r * 2.8 + 1.6, 3.02); return b; };
  nb(-13.2, 12, 16.5, '#6e675e'); nb(13.5, 14, 13.4, '#7a6f62');
  const sky = new THREE.Group(); g.add(sky);
  for (let i = 0; i < 14; i++) { const h = 14 + ((i * 53) % 22), w = 6 + (i % 4) * 2; box(sky, w, h, 6, M('#0a0f19', 1), -60 + i * 9.5, h / 2, -40 - (i % 3) * 8); }
  if (night) { const pts = []; for (let i = 0; i < 500; i++) { const a = Math.random() * Math.PI - Math.PI, e = .15 + Math.random() * 1.2; pts.push(Math.cos(a) * 150 * Math.cos(e) + 0, 150 * Math.sin(e), Math.sin(a) * 150 * Math.cos(e)); }
    const sg = new THREE.BufferGeometry(); sg.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3)); g.add(new THREE.Points(sg, new THREE.PointsMaterial({color: '#cfd8ff', size: 1.4, sizeAttenuation: false, fog: false})));
    const moon = new THREE.Mesh(new THREE.SphereGeometry(4, 32, 16), new THREE.MeshBasicMaterial({color: '#f3f0e2', fog: false})); moon.position.set(-38, 62, -120); g.add(moon); g.userData.moon = moon; }
  return g;
}

// ---------- la place de la mairie (jour 3) : façade, drapeau, foule, 3 palettes d'eau
export function mairie(S, {x = 120, crowd = 70} = {}) {
  const g = new THREE.Group(); g.position.x = x; S.add(g);
  const stone = M('#d9cfbd', .9), slate = M('#4a5160', .7);
  const pav = canvasTex(512, 512, (c, w) => { c.fillStyle = '#8d8579'; c.fillRect(0, 0, w, w); for (let y = 0; y < 16; y++) for (let x = 0; x < 16; x++) { const v = 120 + ((x * 7 + y * 13) % 30); c.fillStyle = `rgb(${v},${v - 6},${v - 14})`; c.fillRect(x * 32 + (y % 2) * 16 + 1, y * 32 + 1, 30, 30); } });
  pav.wrapS = pav.wrapT = THREE.RepeatWrapping; pav.repeat.set(10, 10);
  const gr = new THREE.Mesh(new THREE.PlaneGeometry(70, 70), new THREE.MeshStandardMaterial({map: pav, roughness: .95})); gr.rotation.x = -Math.PI / 2; gr.receiveShadow = true; g.add(gr);
  // façade
  box(g, 22, 11, 3, stone, 0, 5.5, -14); rbox(g, 23, .6, 3.6, stone, 0, 11.3, -14, .05);
  const roof = new THREE.Mesh(new THREE.CylinderGeometry(.01, 13.5, 4, 4, 1), slate); roof.rotation.y = Math.PI / 4; roof.scale.set(1, 1, .2); roof.position.set(0, 13.6, -14.5); sh(roof); g.add(roof);
  const ped = new THREE.Mesh(new THREE.CylinderGeometry(0, 4.5, 2.2, 3), stone); ped.rotation.set(Math.PI / 2, 0, 0); ped.rotation.z = Math.PI; ped.scale.set(1.6, .2, 1); ped.position.set(0, 12.4, -12.4);
  const tri = new THREE.Shape(); tri.moveTo(-6, 0); tri.lineTo(6, 0); tri.lineTo(0, 2.6); tri.lineTo(-6, 0); const tm = new THREE.Mesh(new THREE.ExtrudeGeometry(tri, {depth: .6, bevelEnabled: false}), stone); tm.position.set(0, 11.6, -12.6); sh(tm); g.add(tm);
  for (let i = 0; i < 6; i++) { const cx = -6.25 + i * 2.5; cyl(g, .32, .36, 7.6, M('#e6ddcc', .8), cx, 3.9, -12.1); box(g, .9, .3, .9, stone, cx, .15, -12.1); box(g, .9, .3, .9, stone, cx, 7.85, -12.1); }
  box(g, 14, .4, 2, stone, 0, 8.2, -12.2);
  const sign = canvasTex(1024, 128, (c, w, h) => { c.fillStyle = '#e6ddcc'; c.fillRect(0, 0, w, h); c.fillStyle = '#3a3229'; c.font = 'bold 92px serif'; c.textAlign = 'center'; c.letterSpacing = '30px'; c.fillText('MAIRIE', w / 2, 100); });
  const sm = new THREE.Mesh(new THREE.PlaneGeometry(7, .9), new THREE.MeshStandardMaterial({map: sign, roughness: .8})); sm.position.set(0, 9.2, -12.45); g.add(sm);
  for (let i = 0; i < 4; i++) [-9.2, 9.2].forEach(cx => { box(g, 1.5, 2.4, .1, M('#22303e', .2), cx + (i % 2) * 0 , 3 + Math.floor(i / 2) * 4.4, -12.45); });
  [-1.25, 1.25].forEach(cx => box(g, 1.6, 3.2, .1, M('#3b2a1e', .5), cx, 1.6, -12.5));
  // drapeau tricolore
  cyl(g, .05, .05, 4.5, STEEL, 0, 13.8 + 1.4, -12.6, 8); ['#1f3f8f', '#f2f0ea', '#c8242b'].forEach((c, i) => { const fl = box(g, .8, 1.3, .03, M(c, .8, {side: THREE.DoubleSide}), .45 + i * .8, 15.6, -12.6); fl.rotation.y = .25; });
  // tables + 3 palettes d'eau (packs de 6 bouteilles filmés)
  const pal = (px, pz, n) => { const pg = new THREE.Group(); pg.position.set(px, 0, pz); g.add(pg);
    for (let i = 0; i < 3; i++) box(pg, 1.2, .1, .1, WOOD, 0, .05, -.45 + i * .45); for (let i = 0; i < 7; i++) box(pg, .14, .03, 1, M('#b08a5c', .9), -.51 + i * .17, .115, 0);
    const pack = M('#8fc3e0', .15, {transparent: true, opacity: .75}), cap = M('#2c5ea8', .5);
    for (let l = 0; l < n; l++) for (let a = 0; a < 3; a++) for (let b = 0; b < 3; b++) { rbox(pg, .37, .32, .3, pack, -.4 + a * .4, .3 + l * .33, -.33 + b * .33, .03); for (let q = 0; q < 3; q++) cyl(pg, .025, .025, .03, cap, -.52 + a * .4 + q * .12, .47 + l * .33, -.33 + b * .33, 8); } return pg; };
  pal(-2.2, -7.6, 4); pal(0, -7.6, 3); pal(2.2, -7.6, 2);
  FURN.table(g, 0, 0, -5.9, 5.2, .9); box(g, 5.8, .3, .1, M('#f0ede4', .7), 0, .55, -5.43);
  // barrières
  for (let i = 0; i < 6; i++) [-1, 1].forEach(s => { const bx = s * (3.1 + (i % 3) * 0), bz = -5.4 + 0; if (i) return; for (let k = 0; k < 4; k++) { const b = new THREE.Group(); b.position.set(s * 3.2, 0, -4.5 + k * 2.1); g.add(b); [.15, 1.0].forEach(yy => box(b, .04, .04, 2, M('#b8bec4', .3, {metalness: .8}), 0, yy, 0)); for (let r = 0; r < 12; r++) box(b, .015, .85, .015, M('#b8bec4', .3, {metalness: .8}), 0, .57, -.95 + r * .173); [-1, 1].forEach(e => box(b, .4, .03, .05, M('#b8bec4', .3, {metalness: .8}), 0, .02, e * .95)); } });
  // foule : files compactes vers les tables
  const TOPS = ['#2f4858', '#8e3b46', '#3d5a40', '#55606e', '#a46a3a', '#3c3f58', '#6b5b4b', '#7a8b8f', '#4a3b5c', '#9a8f7c', '#2b2b2b', '#b5543c'], SK = ['#f0c9a8', '#d9a27e', '#a8754f', '#7a4e33', '#e6c2a2'];
  let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647; const ppl = [];
  for (let i = 0; i < crowd; i++) { const row = Math.floor(i / 16), col = i % 16; const px = -9 + col * 1.2 + (rnd() - .5) * .5 + (row % 2) * .4, pz = -4.6 + row * .8 + (rnd() - .5) * .3; if (Math.abs(Math.abs(px) - 3.2) < .45) continue;
    const f = perso({top: TOPS[i % 12], bottom: rnd() < .5 ? '#2c3646' : '#4d4a45', skin: SK[i % 5], shoes: rnd() < .5 ? '#2a2a2a' : '#e9e6df', hair: rnd() < .25 ? 'bonnet' : 'court', hairCol: rnd() < .3 ? '#8a6a45' : '#1d1612', hatCol: TOPS[(i + 5) % 12], h: .9 + rnd() * .15});
    pose(f, {armL: [0, -.1, -.2 - rnd() * .5], armR: [0, .1, -.2 - rnd() * .5], head: [-.1 + rnd() * .2, (rnd() - .5) * .6, 0]}); place(g, f, px, 0, pz, Math.PI + (rnd() - .5) * .6); ppl.push(f); }
  // agents municipaux en gilet
  const ag = [-1.6, 1.6].map((x, i) => { const f = perso({top: '#2a3d66', bottom: '#20283a', vest: 1, skin: SK[i + 1], shoes: '#222', hairCol: '#1d1612'}); pose(f, {armR: [-.5 - i * .9, .3, -1.2], armL: [0, -.1, -.3]}); return place(g, f, x, 0, -6.8, 0); });
  put(g, 'Megaphone_01', 2.4, .78, -5.9, -.6);
  g.userData.crowd = ppl; g.userData.agents = ag; return g;
}
