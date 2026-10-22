// J+1 — trois pistes de character design pour Sam, Mme Ferreira et le voisin : LOW POLY, PIONS (jeu de plateau), JOUET (figurine plastique).
// Même squelette posable que immeuble.js (userData.P : torso, head, armL/armR {sh, el}, legL/legR {hip, knee}, brows, mouth, cane).
import * as THREE from 'three';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
import {canvasTex, softTex} from './immeuble.js';

const sh = o => { o.traverse(m => { if (m.isMesh) { m.castShadow = true; m.receiveShadow = true; } }); return o; };
const add = (p, geo, mat, x = 0, y = 0, z = 0) => { const o = new THREE.Mesh(geo, mat); o.position.set(x, y, z); sh(o); p.add(o); return o; };
const grp = (p, x = 0, y = 0, z = 0) => { const g = new THREE.Group(); g.position.set(x, y, z); p.add(g); return g; };
const shadowDisc = (g, r = .34) => { const d = new THREE.Mesh(new THREE.CircleGeometry(r, 24), new THREE.MeshBasicMaterial({map: softTex, color: '#000', transparent: true, opacity: .4, depthWrite: false})); d.rotation.x = -Math.PI / 2; d.position.y = .004; g.add(d); };

// ======================= 1. LOW POLY : facettes, peu de polygones, couleurs franches, ombrage plat
export function lowPoly(opt = {}) {
  const k = opt.h || 1, g = new THREE.Group(), r = grp(g); r.scale.setScalar(k); const P = {};
  const F = (c, ro = .85) => new THREE.MeshStandardMaterial({color: c, roughness: ro, flatShading: true});
  const skin = F(opt.skin || '#d9a27e'), top = F(opt.top || '#e8742c'), bot = F(opt.bottom || '#33425c'), shoe = F(opt.shoes || '#efe9dc'), hair = F(opt.hairCol || '#2a1d14');
  const leg = s => { const hip = grp(r, .1 * s, .82); add(hip, new THREE.CylinderGeometry(.085, .075, .42, 5), bot, 0, -.2); const knee = grp(hip, 0, -.42);
    add(knee, new THREE.CylinderGeometry(.075, .06, .36, 5), bot, 0, -.18); add(knee, new THREE.BoxGeometry(.13, .09, .26), shoe, 0, -.38, .05); return {hip, knee}; };
  P.legL = leg(-1); P.legR = leg(1);
  const torso = grp(r, 0, .82); P.torso = torso;
  add(torso, new THREE.CylinderGeometry(.19, .17, .16, 6), bot, 0, .05);
  const ch = add(torso, new THREE.CylinderGeometry(.24, .18, .5, 6), top, 0, .36); ch.scale.z = .72;
  if (opt.hood) { const hd = add(torso, new THREE.IcosahedronGeometry(.15, 0), top, 0, .6, -.13); hd.scale.set(1.15, .7, .6); }
  if (opt.scarf) add(torso, new THREE.TorusGeometry(.13, .05, 3, 6), F(opt.scarf), 0, .62).rotation.x = Math.PI / 2;
  const arm = s => { const a = grp(torso, .27 * s, .56); add(a, new THREE.CylinderGeometry(.06, .05, .3, 5), top, 0, -.14); const el = grp(a, 0, -.29);
    add(el, new THREE.CylinderGeometry(.05, .045, .26, 5), top, 0, -.12); add(el, new THREE.IcosahedronGeometry(.055, 0), skin, 0, -.29); return {sh: a, el}; };
  P.armL = arm(-1); P.armR = arm(1);
  const head = grp(torso, 0, .66); P.head = head; const hc = .2;
  add(head, new THREE.CylinderGeometry(.055, .065, .12, 5), skin, 0, .03);
  const hd = add(head, new THREE.IcosahedronGeometry(.17, 1), skin, 0, hc); hd.scale.set(.95, 1.12, .95);
  add(head, new THREE.ConeGeometry(.03, .07, 4), skin, 0, hc - .01, .17).rotation.x = Math.PI / 2;
  const dark = F('#18120e', .5);
  P.eyes = [-1, 1].map(s => add(head, new THREE.BoxGeometry(.035, .045, .02), dark, .062 * s, hc + .035, .152));
  P.brows = [-1, 1].map(s => { const b = add(head, new THREE.BoxGeometry(.07, .016, .02), hair, .065 * s, hc + .09, .148); b.userData.s = s; return b; });
  P.mouth = add(head, new THREE.BoxGeometry(.06, .012, .02), F('#6b3a30'), 0, hc - .075, .15);
  if (!opt.hair || opt.hair === 'court') { const c = add(head, new THREE.IcosahedronGeometry(.18, 1), hair, 0, hc + .07, -.03); c.scale.set(1, .62, 1.02); }
  if (opt.hair === 'chignon') { const c = add(head, new THREE.IcosahedronGeometry(.178, 1), hair, 0, hc + .07, -.02); c.scale.set(1, .6, 1); add(head, new THREE.OctahedronGeometry(.08, 0), hair, 0, hc + .14, -.15); }
  if (opt.hair === 'bonnet') { const b = add(head, new THREE.CylinderGeometry(.13, .19, .2, 6), F(opt.hatCol || '#8e2b25'), 0, hc + .12, 0); add(head, new THREE.IcosahedronGeometry(.05, 0), F(opt.hatCol || '#8e2b25'), 0, hc + .25, 0); }
  if (opt.beard) { const b = add(head, new THREE.IcosahedronGeometry(.15, 0), F(opt.beardCol || '#4a3426'), 0, hc - .085, .06); b.scale.set(1.1, .8, .9); P.mouth.visible = false; }
  if (opt.glasses) { const gm = F('#8a6d3b', .4); [-1, 1].forEach(s => add(head, new THREE.TorusGeometry(.04, .008, 3, 6), gm, .064 * s, hc + .035, .165)); }
  if (opt.cane) { const c = grp(P.armR.el); add(c, new THREE.CylinderGeometry(.014, .014, .9, 4), F('#4a3320'), 0, -.7, .04); P.cane = c; }
  if (opt.hunch) { torso.rotation.x = opt.hunch; head.rotation.x = -opt.hunch * .7; }
  shadowDisc(g); g.userData.P = P; g.userData.hunch = opt.hunch || 0; return g;
}

// ======================= 2. PIONS : pièces de jeu en bois peint, tournées, sans bras ; l'identité tient aux accessoires
const grain = canvasTex(256, 512, (c, w, h) => { c.fillStyle = '#e6e0d6'; c.fillRect(0, 0, w, h); for (let i = 0; i < 70; i++) { c.strokeStyle = `rgba(110,80,50,${.05 + (i % 5) * .025})`; c.lineWidth = 1 + (i % 3); c.beginPath(); const x0 = (i * 37) % w; c.moveTo(x0, 0); for (let y = 0; y <= h; y += 16) c.lineTo(x0 + Math.sin(y / 40 + i) * 6, y); c.stroke(); } });
export function pion(opt = {}) {
  const k = (opt.h || 1) * 1.15, g = new THREE.Group(), r = grp(g); r.scale.setScalar(k); const P = {};
  const paint = new THREE.MeshStandardMaterial({color: opt.top || '#e8742c', map: grain, roughness: .5});
  const prof = [[0, 0], [.3, 0], [.315, .03], [.3, .07], [.24, .1], [.2, .15], [.16, .3], [.135, .48], [.125, .56], [.2, .6], [.205, .645], [.15, .67], [.1, .7], [.09, .74], [0, .74]].map(([x, y]) => new THREE.Vector2(x, y));
  const body = add(r, new THREE.LatheGeometry(prof, 40), paint); P.torso = grp(r); P.head = grp(r, 0, .88);
  const hm = new THREE.MeshStandardMaterial({color: opt.headCol || opt.top || '#e8742c', map: grain, roughness: .5});
  add(P.head, new THREE.SphereGeometry(.165, 32, 20), hm);
  const ink = new THREE.MeshStandardMaterial({color: '#141210', roughness: .4});
  P.eyes = [-1, 1].map(s => { const e = add(P.head, new THREE.SphereGeometry(.022, 12, 8), ink, .055 * s, .02, .155); e.scale.z = .35; return e; });
  P.brows = []; P.mouth = new THREE.Object3D();
  const wood = c => new THREE.MeshStandardMaterial({color: c, map: grain, roughness: .55});
  if (opt.hood) { const hd = add(r, new THREE.SphereGeometry(.13, 24, 16), wood(opt.hoodCol || '#c85c1c'), 0, .7, -.1); hd.scale.set(1.1, .6, .7); }
  if (opt.hair === 'chignon') { add(P.head, new THREE.SphereGeometry(.07, 20, 14), wood(opt.hairCol || '#f1eee8'), 0, .15, -.06); }
  if (opt.hair === 'bonnet') { const c = add(P.head, new THREE.CylinderGeometry(.13, .17, .14, 32), wood(opt.hatCol || '#a5302a'), 0, .1, 0); add(P.head, new THREE.SphereGeometry(.05, 16, 10), wood('#efe9dc'), 0, .2, 0); }
  if (opt.glasses) { const gm = new THREE.MeshStandardMaterial({color: '#c9a35c', roughness: .25, metalness: .8}); [-1, 1].forEach(s => add(P.head, new THREE.TorusGeometry(.035, .006, 8, 20), gm, .055 * s, .02, .165)); }
  if (opt.scarf) add(r, new THREE.TorusGeometry(.17, .04, 10, 28), wood(opt.scarf), 0, .62).rotation.x = Math.PI / 2;
  if (opt.beard) { const b = add(P.head, new THREE.SphereGeometry(.168, 32, 20, Math.PI * .2, Math.PI * .6, Math.PI * .62, Math.PI * .3), wood(opt.beardCol || '#4a3426')); }
  if (opt.cane) { const c = grp(r, .26, 0, .1); add(c, new THREE.CylinderGeometry(.013, .013, .72, 8), wood('#4a3320'), 0, .36); const t = add(c, new THREE.TorusGeometry(.035, .012, 8, 12, Math.PI), wood('#4a3320'), -.035, .72); P.cane = c; }
  // bras/jambes fictifs (compatibilité avec pose())
  const dummy = () => ({sh: grp(r), el: grp(r), hip: grp(r), knee: grp(r)}); P.armL = dummy(); P.armR = dummy(); P.legL = dummy(); P.legR = dummy();
  shadowDisc(g, .4); g.userData.P = P; g.userData.hunch = 0; return g;
}

// ======================= 3. JOUET : figurine plastique articulée (rotules visibles), gros yeux, cheveux moulés, brillance
export function jouet(opt = {}) {
  const k = opt.h || 1, g = new THREE.Group(), r = grp(g); r.scale.setScalar(k); const P = {};
  const PL = (c, ro = .32) => new THREE.MeshPhysicalMaterial({color: c, roughness: ro, clearcoat: .7, clearcoatRoughness: .25});
  const skin = PL(opt.skin || '#e2a982', .38), top = PL(opt.top || '#e8742c', .45), bot = PL(opt.bottom || '#3a5a8c', .5), shoe = PL(opt.shoes || '#f4f1ea', .3), joint = PL(opt.jointCol || '#c9875f', .3);
  const cap = (p, r_, l, m, x, y, z) => add(p, new THREE.CapsuleGeometry(r_, l, 8, 20), m, x, y, z);
  const ring = (p, r_, m, y) => { const t = add(p, new THREE.TorusGeometry(r_, .012, 8, 28), m, 0, y, 0); t.rotation.x = Math.PI / 2; return t; };
  const leg = s => { const hip = grp(r, .1 * s, .8); add(hip, new THREE.SphereGeometry(.085, 20, 14), bot); cap(hip, .082, .24, bot, 0, -.2, 0); const knee = grp(hip, 0, -.4);
    add(knee, new THREE.SphereGeometry(.07, 16, 12), PL(opt.bottom || '#3a5a8c', .2)); cap(knee, .074, .22, bot, 0, -.17, 0); ring(knee, .078, PL('#f4f1ea', .4), -.07);
    const sh_ = add(knee, new RoundedBoxGeometry(.16, .11, .3, 3, .05), shoe, 0, -.37, .055); add(knee, new RoundedBoxGeometry(.165, .035, .31, 2, .015), PL(opt.sole || '#d24a2a', .4), 0, -.42, .055); return {hip, knee}; };
  P.legL = leg(-1); P.legR = leg(1);
  const torso = grp(r, 0, .8); P.torso = torso;
  add(torso, new RoundedBoxGeometry(.38, .2, .24, 4, .09), bot, 0, .05); ring(torso, .19, PL('#2b2b2b', .5), .14).scale.set(1, .66, 1);
  const ch = cap(torso, .19, .25, top, 0, .36, 0); ch.scale.set(1.1, 1, .72);
  if (opt.hood) { const hd = add(torso, new THREE.SphereGeometry(.16, 24, 16), top, 0, .58, -.15); hd.scale.set(1.12, .8, .55);
    [-.045, .045].forEach(x => cap(torso, .008, .1, PL('#f4f1ea'), x, .45, .135));
    const logo = canvasTex(256, 128, (c, w, h) => { c.clearRect(0, 0, w, h); c.font = '96px Anton'; c.textAlign = 'center'; c.fillStyle = '#1b1b1b'; c.fillText('J+1', w / 2, 104); });
    const lg = new THREE.Mesh(new THREE.PlaneGeometry(.16, .08), new THREE.MeshBasicMaterial({map: logo, transparent: true})); lg.position.set(0, .42, .142); torso.add(lg); }
  if (opt.buttons) for (let i = 0; i < 4; i++) add(torso, new THREE.CylinderGeometry(.018, .018, .015, 16), PL('#e9d9a6', .2), 0, .2 + i * .1, .14).rotation.x = Math.PI / 2;
  if (opt.puffy) for (let i = 0; i < 3; i++) { const t = add(torso, new THREE.TorusGeometry(.18, .045, 12, 28), top, 0, .2 + i * .14, 0); t.rotation.x = Math.PI / 2; t.scale.set(1.1, .75, 1); }
  if (opt.scarf) add(torso, new THREE.TorusGeometry(.12, .045, 12, 28), PL(opt.scarf, .6), 0, .6).rotation.x = Math.PI / 2;
  const arm = s => { const a = grp(torso, .25 * s, .53); add(a, new THREE.SphereGeometry(.072, 20, 14), joint); cap(a, .06, .15, top, 0, -.12, 0); const el = grp(a, 0, -.27);
    add(el, new THREE.SphereGeometry(.055, 16, 12), joint); cap(el, .054, .12, top, 0, -.09, 0); ring(el, .056, PL('#2b2b2b', .5), -.17);
    const hand = add(el, new THREE.SphereGeometry(.058, 20, 14), skin, 0, -.24, .01); hand.scale.set(.85, 1.1, .7); add(el, new THREE.CapsuleGeometry(.018, .03, 4, 8), skin, .03 * -s, -.22, .045).rotation.z = .6 * s; return {sh: a, el}; };
  P.armL = arm(-1); P.armR = arm(1);
  const head = grp(torso, 0, .68); P.head = head; const hc = .22, hr = .2;
  cap(head, .055, .06, skin, 0, .03, 0);
  const hd = add(head, new THREE.SphereGeometry(hr, 40, 28), skin, 0, hc); hd.scale.set(.95, 1.06, .92);
  const nose = add(head, new THREE.SphereGeometry(.034, 16, 12), skin, 0, hc - .015, .185); nose.scale.set(1, .9, 1.1);
  [-1, 1].forEach(s => { const e = add(head, new THREE.SphereGeometry(.042, 16, 12), skin, .19 * s, hc, 0); e.scale.set(.45, 1, .75); });
  const wht = new THREE.MeshPhysicalMaterial({color: '#fbfaf6', roughness: .1, clearcoat: 1}), iris = new THREE.MeshStandardMaterial({color: opt.eyeCol || '#5a3a22', roughness: .2}), pup = new THREE.MeshStandardMaterial({color: '#0c0a08', roughness: .1}), hi = new THREE.MeshBasicMaterial({color: '#ffffff'});
  P.eyes = [-1, 1].map(s => { const e = grp(head, .068 * s, hc + .035, .158); e.rotation.y = .28 * s; const b = add(e, new THREE.SphereGeometry(.045, 24, 16), wht); b.scale.set(1, 1.18, .55);
    add(e, new THREE.CircleGeometry(.027, 24), iris, 0, -.004, .026); add(e, new THREE.CircleGeometry(.014, 20), pup, 0, -.004, .027); add(e, new THREE.CircleGeometry(.007, 12), hi, .01, .008, .028); return e; });
  const hair = PL(opt.hairCol || '#3b2416', .3);
  P.brows = [-1, 1].map(s => { const b = add(head, new THREE.CapsuleGeometry(.012, .05, 4, 8), hair, .07 * s, hc + .1, .168); b.rotation.z = Math.PI / 2; b.userData.s = s; b.userData.base = Math.PI / 2; return b; });
  const smile = new THREE.Mesh(new THREE.TorusGeometry(.04, .009, 8, 20, Math.PI), PL('#7a2e28', .4)); smile.rotation.z = Math.PI; smile.position.set(0, hc - .07, .172); head.add(smile); P.mouth = smile;
  if (!opt.hair || opt.hair === 'court') { const c = add(head, new THREE.SphereGeometry(hr * 1.05, 32, 20, 0, Math.PI * 2, 0, Math.PI * .45), hair, 0, hc + .015, -.01); c.scale.set(.97, 1.05, .95);
    for (let i = 0; i < 7; i++) { const a = -1 + i * .33; const t = add(head, new THREE.ConeGeometry(.045, .12, 12), hair, Math.sin(a) * .13, hc + .16 - Math.abs(a) * .03, .1 + Math.cos(a) * .02); t.rotation.set(1.25, 0, -a * .6); } }
  if (opt.hair === 'chignon') { const c = add(head, new THREE.SphereGeometry(hr * 1.06, 32, 20, 0, Math.PI * 2, 0, Math.PI * .47), hair, 0, hc + .01, -.01); c.scale.set(.97, 1.05, .95);
    add(head, new THREE.TorusGeometry(.06, .035, 12, 24), hair, 0, hc + .17, -.12).rotation.x = -.6; add(head, new THREE.CylinderGeometry(.006, .006, .2, 8), PL('#d4af37', .2), .02, hc + .2, -.12).rotation.z = 1.1; }
  if (opt.hair === 'bonnet') { const m = PL(opt.hatCol || '#b5302a', .6); const c = add(head, new THREE.SphereGeometry(hr * 1.1, 32, 20, 0, Math.PI * 2, 0, Math.PI * .45), m, 0, hc + .02, 0); c.scale.y = 1.1;
    const t = add(head, new THREE.TorusGeometry(hr * 1.02, .035, 12, 32), m, 0, hc + .07, 0); t.rotation.x = Math.PI / 2; add(head, new THREE.SphereGeometry(.06, 20, 14), PL('#f4f1ea', .8), 0, hc + .25, 0); }
  if (opt.beard) { const b = add(head, new THREE.SphereGeometry(hr * 1.04, 32, 20, Math.PI * .15, Math.PI * .7, Math.PI * .6, Math.PI * .35), PL(opt.beardCol || '#4a3426', .55), 0, hc - .01, 0); P.mouth.visible = false; }
  if (opt.glasses) { const gm = PL(opt.glassCol || '#b3262b', .2); [-1, 1].forEach(s => add(head, new THREE.TorusGeometry(.05, .011, 10, 24), gm, .07 * s, hc + .035, .192)); add(head, new THREE.CapsuleGeometry(.007, .03, 4, 8), gm, 0, hc + .045, .2).rotation.z = Math.PI / 2; }
  if (opt.cane) { const c = grp(P.armR.el); add(c, new THREE.CylinderGeometry(.016, .016, .84, 12), PL('#6b4426', .3), 0, -.66, .05); add(c, new THREE.CylinderGeometry(.022, .022, .05, 12), PL('#222', .6), 0, -1.08, .05); add(c, new THREE.TorusGeometry(.045, .016, 10, 16, Math.PI), PL('#6b4426', .3), -.045, -.24, .05); P.cane = c; }
  if (opt.hunch) { torso.rotation.x = opt.hunch; head.rotation.x = -opt.hunch * .7; }
  shadowDisc(g); g.userData.P = P; g.userData.hunch = opt.hunch || 0; return g;
}

// les trois personnages, mêmes choix de costume dans chaque style
export const CAST = {
  sam: {top: '#e8742c', hood: 1, bottom: '#2f4a72', skin: '#c98e66', headCol: '#c98e66', hairCol: '#2b1a10', shoes: '#f1efe9'},
  mamie: {top: '#7a5c8e', bottom: '#4f4458', skin: '#ecc8aa', hair: 'chignon', hairCol: '#e3e0da', glasses: 1, cane: 1, scarf: '#d9b44a', shoes: '#7a4a3a', h: .9, hunch: .14, buttons: 1, headCol: '#ecc8aa'},
  voisin: {top: '#4e6b4a', bottom: '#454545', skin: '#a87656', hair: 'bonnet', hatCol: '#b5302a', beard: 1, hairCol: '#1c1410', shoes: '#4a3424', h: 1.07, puffy: 1, headCol: '#a87656'},
};
