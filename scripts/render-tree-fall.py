import os
import math
from PIL import Image, ImageDraw

WIDTH, HEIGHT = 1920, 1080
FRAME_COUNT = 121
OUTPUT_DIR = "/home/marsskinner/dev/steves-trees/public/frames-three"

# Brand colors (RGB)
COLORS = {
    "forest": (27, 77, 54),
    "pine": (46, 125, 74),
    "pine_light": (62, 160, 90),
    "lime": (201, 217, 62),
    "gold": (201, 162, 39),
    "cream": (248, 245, 239),
    "ink": (17, 17, 17),
    "trunk": (92, 64, 51),
    "trunk_dark": (64, 45, 36),
    "grass": (58, 110, 45),
    "grass_light": (74, 140, 58),
    "sky_top": (135, 206, 235),
    "sky_bottom": (224, 246, 255),
}

os.makedirs(OUTPUT_DIR, exist_ok=True)

# Camera / projection
FOV = 600.0
CAM_DIST = 18.0
CAM_ELEVATION = 8.0

LIGHT = (0.5, -0.8, -0.3)  # direction from light toward object

def normalize(v):
    x, y, z = v
    l = math.sqrt(x*x + y*y + z*z)
    return (x/l, y/l, z/l) if l else (0, 0, 0)

LIGHT = normalize(LIGHT)

def project(p):
    x, y, z = p
    # Camera is behind (negative z), looking toward origin
    cx, cy, cz = 0, CAM_ELEVATION, -CAM_DIST
    tx, ty, tz = x - cx, y - cy, z - cz
    if tz <= 0.1:
        tz = 0.1
    scale = FOV / tz
    px = WIDTH / 2 + tx * scale
    py = HEIGHT / 2 - ty * scale  # y up
    return px, py, tz

def cross(a, b):
    return (
        a[1]*b[2] - a[2]*b[1],
        a[2]*b[0] - a[0]*b[2],
        a[0]*b[1] - a[1]*b[0]
    )

def sub(a, b):
    return (a[0]-b[0], a[1]-b[1], a[2]-b[2])

def dot(a, b):
    return a[0]*b[0] + a[1]*b[1] + a[2]*b[2]

def shade(color, normal, ambient=0.55):
    n = normalize(normal)
    intensity = max(0.0, dot(n, LIGHT))
    factor = ambient + (1 - ambient) * intensity
    return (
        min(255, int(color[0] * factor)),
        min(255, int(color[1] * factor)),
        min(255, int(color[2] * factor)),
    )

def make_cylinder(radius, height, segments, y_center):
    vertices = []
    faces = []
    half = height / 2
    top_center = (0, y_center + half, 0)
    bot_center = (0, y_center - half, 0)
    vertices.append(top_center)
    vertices.append(bot_center)
    top_idx = 0
    bot_idx = 1
    for i in range(segments):
        a = 2 * math.pi * i / segments
        x = radius * math.cos(a)
        z = radius * math.sin(a)
        vertices.append((x, y_center + half, z))
        vertices.append((x, y_center - half, z))
    for i in range(segments):
        v1 = 2 + 2 * i
        v2 = 2 + 2 * ((i + 1) % segments)
        v3 = v2 + 1
        v4 = v1 + 1
        faces.append(([v1, v2, v3], COLORS["trunk"]))
        faces.append(([v1, v3, v4], COLORS["trunk"]))
        faces.append(([top_idx, v1, v2], COLORS["trunk_dark"]))
        faces.append(([bot_idx, v3, v4], COLORS["trunk_dark"]))
    return vertices, faces

def make_cone(radius, height, y_base, segments):
    vertices = []
    faces = []
    tip = (0, y_base + height, 0)
    base_center = (0, y_base, 0)
    vertices.append(tip)
    vertices.append(base_center)
    tip_idx = 0
    base_idx = 1
    for i in range(segments):
        a = 2 * math.pi * i / segments
        x = radius * math.cos(a)
        z = radius * math.sin(a)
        vertices.append((x, y_base, z))
    for i in range(segments):
        v1 = 2 + i
        v2 = 2 + ((i + 1) % segments)
        faces.append(([tip_idx, v1, v2], COLORS["pine"]))
        faces.append(([base_idx, v2, v1], COLORS["pine_light"]))
    return vertices, faces

def build_tree():
    all_vertices = []
    all_faces = []
    offset = 0

    trunk_verts, trunk_faces = make_cylinder(0.65, 7.5, 10, 3.75)
    all_vertices.extend(trunk_verts)
    for f in trunk_faces:
        all_faces.append(([v + offset for v in f[0]], f[1]))
    offset += len(trunk_verts)

    layers = [
        (2.8, 3.0, 6.8),
        (2.2, 2.6, 8.8),
        (1.7, 2.2, 10.5),
        (1.2, 1.7, 11.8),
        (0.65, 1.2, 12.8),
    ]
    for r, h, yb in layers:
        cone_verts, cone_faces = make_cone(r, h, yb, 8)
        all_vertices.extend(cone_verts)
        for f in cone_faces:
            all_faces.append(([v + offset for v in f[0]], f[1]))
        offset += len(cone_verts)

    return all_vertices, all_faces

def transform_vertices(verts, angle_z):
    out = []
    for v in verts:
        x, y, z = v
        c, s = math.cos(angle_z), math.sin(angle_z)
        xr = x*c - y*s
        yr = x*s + y*c
        zr = z
        # Move tree base to left side of frame
        out.append((xr - 4.5, yr, zr))
    return out

def draw_background(draw):
    for y in range(HEIGHT):
        t = y / HEIGHT
        r = int(COLORS["sky_top"][0] * (1-t) + COLORS["sky_bottom"][0] * t)
        g = int(COLORS["sky_top"][1] * (1-t) + COLORS["sky_bottom"][1] * t)
        b = int(COLORS["sky_top"][2] * (1-t) + COLORS["sky_bottom"][2] * t)
        draw.line([(0, y), (WIDTH, y)], fill=(r, g, b))

def draw_ground(draw):
    horizon = HEIGHT // 2 + 40
    for y in range(horizon, HEIGHT):
        t = (y - horizon) / (HEIGHT - horizon)
        r = int(COLORS["grass"][0] * (1-t*0.6) + COLORS["grass_light"][0] * (t*0.6))
        g = int(COLORS["grass"][1] * (1-t*0.6) + COLORS["grass_light"][1] * (t*0.6))
        b = int(COLORS["grass"][2] * (1-t*0.6) + COLORS["grass_light"][2] * (t*0.6))
        draw.line([(0, y), (WIDTH, y)], fill=(r, g, b))

def draw_shadow(draw, angle_z):
    base_x, base_y = project((0, 0, 0))[:2]
    length = 1.0 + 7.0 * (angle_z / (math.pi/2))
    width = 1.0 + 0.5 * (angle_z / (math.pi/2))
    points = []
    for i in range(32):
        a = 2 * math.pi * i / 32
        sx = 0 + length * math.cos(a) * 0.5
        sz = width * math.sin(a) * 0.5
        px, py, _ = project((sx, 0.02, sz))
        points.append((px, py))
    draw.polygon(points, fill=(20, 50, 25, 120))

def render_frame(frame_idx):
    progress = frame_idx / (FRAME_COUNT - 1)
    eased = 1 - math.pow(1 - progress, 2.5)
    angle_z = eased * (math.pi / 2)

    img = Image.new("RGBA", (WIDTH, HEIGHT), COLORS["cream"])
    draw = ImageDraw.Draw(img)

    draw_background(draw)
    draw_ground(draw)

    verts, faces = build_tree()
    tverts = transform_vertices(verts, angle_z)

    draw_shadow(draw, angle_z)

    projected = [project(v) for v in tverts]

    render_faces = []
    for indices, color in faces:
        p0 = tverts[indices[0]]
        p1 = tverts[indices[1]]
        p2 = tverts[indices[2]]
        u = sub(p1, p0)
        v = sub(p2, p0)
        n = cross(u, v)
        cam_dir = normalize(sub((0, CAM_ELEVATION, CAM_DIST), p0))
        # Basic backface culling
        if dot(n, cam_dir) <= 0:
            continue
        depth = sum(projected[i][2] for i in indices) / 3
        render_faces.append((depth, indices, color, n))

    # Farther faces first
    render_faces.sort(key=lambda x: x[0])

    for _, indices, color, normal in render_faces:
        pts = [(projected[i][0], projected[i][1]) for i in indices]
        shaded = shade(color, normal)
        draw.polygon(pts, fill=shaded)

    rgb = Image.new("RGB", (WIDTH, HEIGHT), COLORS["cream"])
    rgb.paste(img, mask=img.split()[3])
    num = str(frame_idx + 1).zfill(3)
    rgb.save(os.path.join(OUTPUT_DIR, f"frame_{num}.png"), "PNG")

if __name__ == "__main__":
    print(f"Rendering {FRAME_COUNT} frames...")
    for i in range(FRAME_COUNT):
        render_frame(i)
        if (i + 1) % 10 == 0:
            print(f"Done {i+1}/{FRAME_COUNT}")
    print(f"Saved to {OUTPUT_DIR}")
