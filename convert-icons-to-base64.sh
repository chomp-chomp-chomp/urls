#!/bin/bash

# ============================================================================
# Icon to Base64 Converter
# ============================================================================
# This script converts your icon files to base64 format for embedding in the worker
#
# Usage:
#   1. Place your icon files in this directory with these names:
#      - favicon.ico (or will be created from 32x32 PNG)
#      - icon-16.png (16x16 pixels)
#      - icon-32.png (32x32 pixels)
#      - apple-touch-icon.png (180x180 pixels)
#      - icon-192.png (192x192 pixels) - YOU HAVE THIS
#      - icon-512.png (512x512 pixels) - YOU HAVE THIS
#
#   2. Run: bash convert-icons-to-base64.sh
#
#   3. Copy the base64 output and paste into worker-themed-no-titles.js
# ============================================================================

echo "🎨 Icon to Base64 Converter for Cloudflare Worker"
echo "=================================================="
echo ""

# Create output file
OUTPUT_FILE="icon-base64-output.txt"
> "$OUTPUT_FILE"

echo "📝 Converting icons to base64..."
echo ""

# Function to convert and output
convert_icon() {
  local file=$1
  local var_name=$2

  if [ -f "$file" ]; then
    echo "✅ Found: $file"
    echo "// $file" >> "$OUTPUT_FILE"
    echo "'$var_name': {" >> "$OUTPUT_FILE"

    if [[ "$file" == *.ico ]]; then
      echo "  data: '$(base64 -w 0 "$file" 2>/dev/null || base64 "$file")'," >> "$OUTPUT_FILE"
      echo "  type: 'image/x-icon'" >> "$OUTPUT_FILE"
    else
      echo "  data: '$(base64 -w 0 "$file" 2>/dev/null || base64 "$file")'," >> "$OUTPUT_FILE"
      echo "  type: 'image/png'" >> "$OUTPUT_FILE"
    fi

    echo "}," >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"
  else
    echo "❌ Missing: $file"
  fi
}

# Convert each icon
convert_icon "favicon.ico" "/favicon.ico"
convert_icon "icon-16.png" "/icon-16.png"
convert_icon "icon-32.png" "/icon-32.png"
convert_icon "apple-touch-icon.png" "/apple-touch-icon.png"
convert_icon "icon-192.png" "/icon-192.png"
convert_icon "icon-512.png" "/icon-512.png"

echo ""
echo "=================================================="
echo "✅ Conversion complete!"
echo ""
echo "📄 Base64 data saved to: $OUTPUT_FILE"
echo ""
echo "📋 Next steps:"
echo "   1. Open $OUTPUT_FILE"
echo "   2. Copy the icon data"
echo "   3. Open worker-themed-no-titles.js"
echo "   4. Find the 'handleIconRequest' function (around line 1000)"
echo "   5. Replace the PLACEHOLDER values in the icons object"
echo "   6. Save and redeploy your worker"
echo ""
echo "=================================================="
echo ""

# Create missing icons from existing ones using ImageMagick (if available)
if command -v convert &> /dev/null; then
  echo "🎨 ImageMagick detected! Can create missing icon sizes..."
  echo ""

  if [ -f "icon-512.png" ]; then
    if [ ! -f "icon-192.png" ]; then
      echo "Creating icon-192.png from icon-512.png..."
      convert icon-512.png -resize 192x192 icon-192.png
    fi

    if [ ! -f "apple-touch-icon.png" ]; then
      echo "Creating apple-touch-icon.png (180x180) from icon-512.png..."
      convert icon-512.png -resize 180x180 apple-touch-icon.png
    fi

    if [ ! -f "icon-32.png" ]; then
      echo "Creating icon-32.png from icon-512.png..."
      convert icon-512.png -resize 32x32 icon-32.png
    fi

    if [ ! -f "icon-16.png" ]; then
      echo "Creating icon-16.png from icon-512.png..."
      convert icon-512.png -resize 16x16 icon-16.png
    fi

    if [ ! -f "favicon.ico" ] && [ -f "icon-32.png" ] && [ -f "icon-16.png" ]; then
      echo "Creating favicon.ico from icon-16.png and icon-32.png..."
      convert icon-16.png icon-32.png favicon.ico
    fi

    echo ""
    echo "✅ Missing icon sizes created! Run this script again to convert them to base64."
  else
    echo "⚠️  icon-512.png not found. Cannot create missing sizes."
  fi
else
  echo "💡 Install ImageMagick to auto-create missing icon sizes:"
  echo "   macOS: brew install imagemagick"
  echo "   Ubuntu/Debian: sudo apt-get install imagemagick"
  echo "   Windows: https://imagemagick.org/script/download.php"
fi

echo ""
