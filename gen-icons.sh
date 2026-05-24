#!/bin/bash
# gen-icons.sh
# Usage: ./gen-icons.sh icon-source.png
# Requires: sips (built into macOS) or ImageMagick
#
# Generates all iOS icon sizes into ios/App/App/Assets.xcassets/AppIcon.appiconset/

set -e

SOURCE="${1:-icon-source.png}"
DEST="ios/App/App/Assets.xcassets/AppIcon.appiconset"

if [ ! -f "$SOURCE" ]; then
  echo "Error: source image '$SOURCE' not found."
  echo "Usage: ./gen-icons.sh your-1024x1024-icon.png"
  exit 1
fi

mkdir -p "$DEST"

# Icon sizes required by iOS (size x scale)
declare -a SIZES=(
  "20:1" "20:2" "20:3"
  "29:1" "29:2" "29:3"
  "40:1" "40:2" "40:3"
  "60:2" "60:3"
  "76:1" "76:2"
  "83.5:2"
  "1024:1"
)

echo "Generating iOS icons from $SOURCE..."

for entry in "${SIZES[@]}"; do
  SIZE="${entry%%:*}"
  SCALE="${entry##*:}"
  PX=$(echo "$SIZE * $SCALE" | bc | cut -d. -f1)
  FILENAME="icon-${SIZE}x${SIZE}@${SCALE}x.png"

  if command -v sips &>/dev/null; then
    sips -z "$PX" "$PX" "$SOURCE" --out "$DEST/$FILENAME" > /dev/null 2>&1
  elif command -v convert &>/dev/null; then
    convert "$SOURCE" -resize "${PX}x${PX}" "$DEST/$FILENAME"
  else
    echo "Need sips (macOS) or ImageMagick. Run: brew install imagemagick"
    exit 1
  fi

  echo "  ✓ $FILENAME (${PX}x${PX}px)"
done

# Write Contents.json
cat > "$DEST/Contents.json" << 'JSON'
{
  "images": [
    {"size":"20x20",   "idiom":"iphone", "filename":"icon-20x20@2x.png",    "scale":"2x"},
    {"size":"20x20",   "idiom":"iphone", "filename":"icon-20x20@3x.png",    "scale":"3x"},
    {"size":"29x29",   "idiom":"iphone", "filename":"icon-29x29@1x.png",    "scale":"1x"},
    {"size":"29x29",   "idiom":"iphone", "filename":"icon-29x29@2x.png",    "scale":"2x"},
    {"size":"29x29",   "idiom":"iphone", "filename":"icon-29x29@3x.png",    "scale":"3x"},
    {"size":"40x40",   "idiom":"iphone", "filename":"icon-40x40@2x.png",    "scale":"2x"},
    {"size":"40x40",   "idiom":"iphone", "filename":"icon-40x40@3x.png",    "scale":"3x"},
    {"size":"60x60",   "idiom":"iphone", "filename":"icon-60x60@2x.png",    "scale":"2x"},
    {"size":"60x60",   "idiom":"iphone", "filename":"icon-60x60@3x.png",    "scale":"3x"},
    {"size":"20x20",   "idiom":"ipad",   "filename":"icon-20x20@1x.png",    "scale":"1x"},
    {"size":"20x20",   "idiom":"ipad",   "filename":"icon-20x20@2x.png",    "scale":"2x"},
    {"size":"29x29",   "idiom":"ipad",   "filename":"icon-29x29@1x.png",    "scale":"1x"},
    {"size":"29x29",   "idiom":"ipad",   "filename":"icon-29x29@2x.png",    "scale":"2x"},
    {"size":"40x40",   "idiom":"ipad",   "filename":"icon-40x40@1x.png",    "scale":"1x"},
    {"size":"40x40",   "idiom":"ipad",   "filename":"icon-40x40@2x.png",    "scale":"2x"},
    {"size":"76x76",   "idiom":"ipad",   "filename":"icon-76x76@1x.png",    "scale":"1x"},
    {"size":"76x76",   "idiom":"ipad",   "filename":"icon-76x76@2x.png",    "scale":"2x"},
    {"size":"83.5x83.5","idiom":"ipad",  "filename":"icon-83.5x83.5@2x.png","scale":"2x"},
    {"size":"1024x1024","idiom":"ios-marketing","filename":"icon-1024x1024@1x.png","scale":"1x"}
  ],
  "info": {"version":1,"author":"xcode"}
}
JSON

echo ""
echo "✅ Done! All icons written to $DEST"
echo "   Run 'npx cap sync ios' then open Xcode to verify."
