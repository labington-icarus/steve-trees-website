# Frame Sharpness Research Report

## Context
- Source video: docs/tree-fall-kling-v2.mp4 (1764x1172, H.264 yuv420p, ~28.5 Mbps, 24fps)
- Current frames in public/frames-scroll/ are 1080x718 JPEG (~43KB each)
- User reports visible pixels/blockiness on desktop

## Measured Samples
| File | Width | Height | Size (KB) | Mean Gradient | Block Variance |
|---|---|---:|---:|---:|
| frame_1080_bilinear_q80.jpg | 1080 | 718 | 39.6 | 12.85 | 5582.26 |
| frame_1080_bicubic_q80.jpg | 1080 | 718 | 42.4 | 14.04 | 5683.92 |
| frame_1080_lanczos_q80.jpg | 1080 | 718 | 42.9 | 14.22 | 5689.88 |
| frame_1080_spline_q2.jpg | 1080 | 718 | 265.6 | 15.84 | 5869.36 |
| frame_1080_lanczos5_q2.jpg | 1080 | 718 | 270.2 | 15.98 | 5884.32 |
| frame_native_lanczos5_q2.jpg | 1764 | 1172 | 461.6 | 11.14 | 5885.37 |
| frame_native_noscale_q2.jpg | 1764 | 1172 | 461.6 | 11.14 | 5885.37 |

## Key Findings
1. JPEG quality is a major contributor: -q:v 80 is effectively worst quality in FFmpeg MJPEG (range 2-31, lower is better). Raising to -q:v 2 improves edge metrics ~24%.
2. Scaling filter: Lanczos (param0=5) + accurate_rnd and full_chroma_int/full_chroma_inp yields the sharpest pre-scaled output. Spline is nearly as good.
3. Canvas defaults: current Hero.tsx does not set imageSmoothingEnabled/imageSmoothingQuality, so browsers use smoothing=true, quality=low on high-DPR screens.
4. Sub-pixel drawImage: current code passes fractional destination coordinates to drawImage, which can cause extra blur/jitter.
5. Source H.264: 28.5 Mbps yuv420p is unlikely the main blocker, but macroblock artifacts are baked in. Extracting I-frames avoids inter-frame ghosting.

## Pre-scale vs Native+Canvas Downscale
- Native 1764px preserves detail but doubles file size, increases decode/memory, and still depends on browser low-quality downscale.
- Pre-scaling to 1080px with lanczos/spline and -q:v 2 gives nearly identical sharpness metrics with smaller files and less runtime overhead.
Recommendation: Pre-scale to 1080px (or 2160px for 2x retina) using high-quality filters.

## Recommended ffmpeg command
ffmpeg -i tree-fall-kling-v2.mp4 -vf "select=eq(pict_type,I),scale=1080:-1:flags=lanczos+accurate_rnd+full_chroma_int+full_chroma_inp:param0=5:force_original_aspect_ratio=decrease,setsar=1" -q:v 2 -fps_mode passthrough public/frames-scroll/frame_%03d.jpg

## Recommended canvas changes
- Set ctx.imageSmoothingEnabled = true;
- Set ctx.imageSmoothingQuality = "high";
- Round all drawImage destination coordinates to integers.

## Root cause ranking
1. -q:v 80 (worst JPEG quality)
2. imageSmoothingQuality default low
3. Fractional drawImage coords
4. Scaling filter choice (secondary once #1 fixed)
5. Source H.264 artifacts (minor)

## Files created
- /home/marsskinner/dev/steves-trees/research-comparison/ with sample frames and this report
