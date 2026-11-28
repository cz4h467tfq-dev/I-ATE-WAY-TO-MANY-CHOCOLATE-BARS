"""Builds assets/welnova-school.glb: the WELNOVA Eco-Future School for the AR viewer.

Units are metres, sized to sit on a table (about 0.5 m tall).
Run: python3 tools/make_school_glb.py
"""
import json
import math
import struct
from pathlib import Path

import numpy as np

MATERIALS = {
    "stone":   (0.90, 0.89, 0.84, 1.0),
    "slab":    (0.80, 0.80, 0.76, 1.0),
    "glass":   (0.13, 0.22, 0.30, 1.0),
    "f1":      (0.18, 0.44, 0.84, 1.0),   # Inclusion & Accessibility
    "f2":      (0.85, 0.30, 0.54, 1.0),   # Anti-Bullying & Well-being
    "f3":      (0.48, 0.29, 0.77, 1.0),   # Digital Learning & Innovation
    "f4":      (0.12, 0.48, 0.32, 1.0),   # Environment & Sustainability
    "water":   (0.17, 0.42, 0.62, 1.0),
    "grass":   (0.36, 0.62, 0.25, 1.0),
    "leaf":    (0.11, 0.40, 0.24, 1.0),
    "trunk":   (0.42, 0.28, 0.17, 1.0),
    "solar":   (0.08, 0.13, 0.27, 1.0),
    "metal":   (0.55, 0.57, 0.60, 1.0),
    "ground":  (0.70, 0.66, 0.56, 1.0),
}

geo = {k: {"p": [], "n": [], "i": []} for k in MATERIALS}


def add(mat, positions, normals, indices):
    g = geo[mat]
    base = len(g["p"])
    g["p"].extend(positions)
    g["n"].extend(normals)
    g["i"].extend(i + base for i in indices)


def box(mat, cx, cy, cz, sx, sy, sz):
    hx, hy, hz = sx / 2, sy / 2, sz / 2
    faces = [
        ((1, 0, 0), [(hx, -hy, -hz), (hx, hy, -hz), (hx, hy, hz), (hx, -hy, hz)]),
        ((-1, 0, 0), [(-hx, -hy, hz), (-hx, hy, hz), (-hx, hy, -hz), (-hx, -hy, -hz)]),
        ((0, 1, 0), [(-hx, hy, -hz), (-hx, hy, hz), (hx, hy, hz), (hx, hy, -hz)]),
        ((0, -1, 0), [(-hx, -hy, hz), (-hx, -hy, -hz), (hx, -hy, -hz), (hx, -hy, hz)]),
        ((0, 0, 1), [(-hx, -hy, hz), (hx, -hy, hz), (hx, hy, hz), (-hx, hy, hz)]),
        ((0, 0, -1), [(hx, -hy, -hz), (-hx, -hy, -hz), (-hx, hy, -hz), (hx, hy, -hz)]),
    ]
    p, n, i = [], [], []
    for normal, quad in faces:
        b = len(p)
        for v in quad:
            p.append((v[0] + cx, v[1] + cy, v[2] + cz))
            n.append(normal)
        i += [b, b + 1, b + 2, b, b + 2, b + 3]
    add(mat, p, n, i)


def cylinder(mat, cx, cy, cz, r_bottom, r_top, h, seg=16):
    p, n, i = [], [], []
    slope = (r_bottom - r_top) / h
    for s in range(seg + 1):
        a = 2 * math.pi * s / seg
        c, si = math.cos(a), math.sin(a)
        nl = math.sqrt(1 + slope * slope)
        nrm = (c / nl, slope / nl, si / nl)
        p.append((cx + r_bottom * c, cy, cz + r_bottom * si)); n.append(nrm)
        p.append((cx + r_top * c, cy + h, cz + r_top * si)); n.append(nrm)
    for s in range(seg):
        a, b = 2 * s, 2 * s + 2
        i += [a, a + 1, b + 1, a, b + 1, b]
    # caps
    for y, r, ny in ((cy, r_bottom, -1), (cy + h, r_top, 1)):
        if r <= 0:
            continue
        centre = len(p)
        p.append((cx, y, cz)); n.append((0, ny, 0))
        for s in range(seg + 1):
            a = 2 * math.pi * s / seg
            p.append((cx + r * math.cos(a), y, cz + r * math.sin(a))); n.append((0, ny, 0))
        for s in range(seg):
            if ny > 0:
                i += [centre, centre + s + 2, centre + s + 1]
            else:
                i += [centre, centre + s + 1, centre + s + 2]
    add(mat, p, n, i)


# ---- the building -------------------------------------------------------
W, D = 0.34, 0.22          # footprint
FLOOR_H = 0.075
BASE_H = 0.06
GROUND = 0.0

# ground plate
box("ground", 0, -0.006, 0, W + 0.12, 0.012, D + 0.10)

# basement: rainwater collection, partly glass so the tank shows
box("slab", 0, BASE_H / 2, 0, W, BASE_H, D)
box("glass", 0, BASE_H / 2, D / 2 + 0.001, W * 0.8, BASE_H * 0.6, 0.004)
cylinder("water", -0.08, 0.012, D / 2 + 0.03, 0.022, 0.022, 0.045)
cylinder("water", 0.08, 0.012, D / 2 + 0.03, 0.022, 0.022, 0.045)

floors = ["f1", "f2", "f3", "f4"]
for k, mat in enumerate(floors):
    y0 = BASE_H + k * FLOOR_H
    # stone body
    box("stone", 0, y0 + FLOOR_H / 2, 0, W, FLOOR_H, D)
    # coloured balcony slab marks the theme of each floor
    box(mat, 0, y0 + 0.006, D / 2 + 0.012, W + 0.02, 0.012, 0.03)
    box(mat, 0, y0 + 0.006, -D / 2 - 0.012, W + 0.02, 0.012, 0.03)
    # windows front and back
    n_win = 3 if k == 0 else 5
    win_w = 0.07 if k == 0 else 0.045
    span = W * 0.8
    for w in range(n_win):
        x = -span / 2 + span * (w + 0.5) / n_win
        for z in (D / 2 + 0.002, -D / 2 - 0.002):
            box("glass", x, y0 + FLOOR_H * 0.55, z, win_w, FLOOR_H * 0.6, 0.004)
    # side windows
    for z in (-0.05, 0.05):
        for x in (W / 2 + 0.002, -W / 2 - 0.002):
            box("glass", x, y0 + FLOOR_H * 0.55, z, 0.004, FLOOR_H * 0.55, 0.05)
    # balcony rail
    box("metal", 0, y0 + 0.03, D / 2 + 0.026, W + 0.02, 0.004, 0.003)

# accessible ramp at the entrance (Inclusion floor)
box("f1", W / 2 + 0.05, BASE_H / 2, D / 2 - 0.03, 0.10, 0.008, 0.05)

roof_y = BASE_H + 4 * FLOOR_H
box("slab", 0, roof_y + 0.006, 0, W + 0.02, 0.012, D + 0.02)
box("grass", 0, roof_y + 0.016, 0, W - 0.01, 0.008, D - 0.01)
# parapet
box("stone", 0, roof_y + 0.025, D / 2 + 0.005, W + 0.02, 0.026, 0.008)
box("stone", 0, roof_y + 0.025, -D / 2 - 0.005, W + 0.02, 0.026, 0.008)
box("stone", W / 2 + 0.005, roof_y + 0.025, 0, 0.008, 0.026, D + 0.02)
box("stone", -W / 2 - 0.005, roof_y + 0.025, 0, 0.008, 0.026, D + 0.02)

# rooftop garden: cedar-like trees
for x, z, s in ((-0.11, 0.05, 1.0), (-0.06, -0.05, 0.8), (0.0, 0.06, 0.9)):
    cylinder("trunk", x, roof_y + 0.02, z, 0.004, 0.004, 0.02 * s)
    cylinder("leaf", x, roof_y + 0.03 * s, z, 0.03 * s, 0.0, 0.035 * s)
    cylinder("leaf", x, roof_y + 0.05 * s, z, 0.022 * s, 0.0, 0.03 * s)

# solar panels
for x in (0.08, 0.13):
    for z in (-0.05, 0.03):
        box("metal", x, roof_y + 0.03, z, 0.004, 0.02, 0.004)
        box("solar", x, roof_y + 0.042, z, 0.045, 0.004, 0.06)

# rainwater pipe from roof to basement tank
cylinder("metal", -W / 2 - 0.012, BASE_H * 0.3, D / 2 - 0.02, 0.005, 0.005, roof_y - BASE_H * 0.3 + 0.02)

# ---- write GLB ----------------------------------------------------------
buffer = bytearray()
buffer_views, accessors, primitives, materials = [], [], [], []


def push(data, target):
    while len(buffer) % 4:
        buffer.append(0)
    offset = len(buffer)
    buffer.extend(data)
    buffer_views.append({"buffer": 0, "byteOffset": offset, "byteLength": len(data), "target": target})
    return len(buffer_views) - 1


for name, rgba in MATERIALS.items():
    g = geo[name]
    if not g["p"]:
        continue
    materials.append({
        "name": name,
        "pbrMetallicRoughness": {
            "baseColorFactor": list(rgba),
            "metallicFactor": 0.3 if name in ("metal", "solar", "glass") else 0.0,
            "roughnessFactor": 0.35 if name in ("glass", "water", "solar") else 0.85,
        },
    })
    pos = np.array(g["p"], dtype=np.float32)
    nor = np.array(g["n"], dtype=np.float32)
    nor /= np.linalg.norm(nor, axis=1, keepdims=True)
    idx = np.array(g["i"], dtype=np.uint32)
    bv_p = push(pos.tobytes(), 34962)
    bv_n = push(nor.tobytes(), 34962)
    bv_i = push(idx.tobytes(), 34963)
    accessors.append({"bufferView": bv_p, "componentType": 5126, "count": len(pos), "type": "VEC3",
                      "min": pos.min(0).tolist(), "max": pos.max(0).tolist()})
    a_p = len(accessors) - 1
    accessors.append({"bufferView": bv_n, "componentType": 5126, "count": len(nor), "type": "VEC3"})
    a_n = len(accessors) - 1
    accessors.append({"bufferView": bv_i, "componentType": 5125, "count": len(idx), "type": "SCALAR"})
    a_i = len(accessors) - 1
    primitives.append({"attributes": {"POSITION": a_p, "NORMAL": a_n}, "indices": a_i,
                       "material": len(materials) - 1})

gltf = {
    "asset": {"version": "2.0", "generator": "WELNOVA make_school_glb.py"},
    "scene": 0,
    "scenes": [{"nodes": [0]}],
    "nodes": [{"mesh": 0, "name": "WELNOVA Eco-Future School"}],
    "meshes": [{"primitives": primitives}],
    "materials": materials,
    "accessors": accessors,
    "bufferViews": buffer_views,
    "buffers": [{"byteLength": len(buffer)}],
}

js = json.dumps(gltf, separators=(",", ":")).encode()
js += b" " * ((4 - len(js) % 4) % 4)
while len(buffer) % 4:
    buffer.append(0)
total = 12 + 8 + len(js) + 8 + len(buffer)
out = Path(__file__).resolve().parent.parent / "assets" / "welnova-school.glb"
out.parent.mkdir(exist_ok=True)
with open(out, "wb") as f:
    f.write(struct.pack("<III", 0x46546C67, 2, total))
    f.write(struct.pack("<II", len(js), 0x4E4F534A)); f.write(js)
    f.write(struct.pack("<II", len(buffer), 0x004E4942)); f.write(bytes(buffer))
print(f"wrote {out} ({total} bytes, {len(primitives)} materials)")
