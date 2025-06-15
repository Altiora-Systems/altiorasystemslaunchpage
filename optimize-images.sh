#!/bin/bash

# Image Optimization Script for Altiora Systems Website
# This script helps optimize images for web performance

echo "🖼️  Altiora Systems - Image Optimization Script"
echo "=============================================="
echo ""

# Check if imagemin is available
if ! command -v imagemin &> /dev/null; then
    echo "❌ imagemin-cli not found. Installing..."
    echo "Run: npm install -g imagemin-cli imagemin-webp imagemin-mozjpeg imagemin-pngquant"
    echo ""
    echo "After installation, run this script again."
    exit 1
fi

# Create optimized directory
mkdir -p assets/images/optimized
mkdir -p assets/images/optimized/team
mkdir -p assets/images/optimized/mockups

echo "📂 Creating optimized directories..."

# Optimize team photos (JPG/JPEG)
echo "👥 Optimizing team photos..."
if ls assets/images/team/*.{jpg,jpeg} 1> /dev/null 2>&1; then
    imagemin assets/images/team/*.{jpg,jpeg} \
        --out-dir=assets/images/optimized/team \
        --plugin=mozjpeg --plugin.mozjpeg.quality=75
    echo "   ✅ Team photos optimized"
else
    echo "   ℹ️  No team photos found"
fi

# Optimize mockup images (PNG)
echo "🖥️  Optimizing mockup images..."
if ls assets/images/mockups/*.png 1> /dev/null 2>&1; then
    imagemin assets/images/mockups/*.png \
        --out-dir=assets/images/optimized/mockups \
        --plugin=pngquant --plugin.pngquant.quality="65-75"
    echo "   ✅ Mockup images optimized"
else
    echo "   ℹ️  No mockup images found"
fi

# Generate WebP versions
echo "🌐 Generating WebP versions..."
if ls assets/images/optimized/**/*.{jpg,jpeg,png} 1> /dev/null 2>&1; then
    imagemin assets/images/optimized/**/*.{jpg,jpeg,png} \
        --out-dir=assets/images/optimized \
        --plugin=webp --plugin.webp.quality=75
    echo "   ✅ WebP versions generated"
fi

# Show file size comparison
echo ""
echo "📊 File Size Comparison:"
echo "========================"

if [ -f "assets/images/team/Sinha_Deepayan.jpg" ]; then
    ORIGINAL=$(du -h assets/images/team/Sinha_Deepayan.jpg | cut -f1)
    if [ -f "assets/images/optimized/team/Sinha_Deepayan.jpg" ]; then
        OPTIMIZED=$(du -h assets/images/optimized/team/Sinha_Deepayan.jpg | cut -f1)
        echo "Deepayan photo: $ORIGINAL → $OPTIMIZED"
    fi
fi

if [ -f "assets/images/mockups/altioraconnect.png" ]; then
    ORIGINAL=$(du -h assets/images/mockups/altioraconnect.png | cut -f1)
    if [ -f "assets/images/optimized/mockups/altioraconnect.png" ]; then
        OPTIMIZED=$(du -h assets/images/optimized/mockups/altioraconnect.png | cut -f1)
        echo "Hero mockup: $ORIGINAL → $OPTIMIZED"
    fi
fi

echo ""
echo "🚀 Next Steps:"
echo "=============="
echo "1. Review optimized images in assets/images/optimized/"
echo "2. Update HTML img src paths to use optimized versions"
echo "3. Implement WebP with fallbacks using <picture> elements"
echo "4. Test website performance with new images"
echo ""
echo "📝 Example WebP implementation:"
echo "<picture>"
echo '  <source srcset="assets/images/optimized/team/eadie-alex.webp" type="image/webp">'
echo '  <img src="assets/images/optimized/team/eadie-alex.jpg" alt="Alexander Eadie" loading="lazy">'
echo "</picture>"
echo ""
echo "✨ Optimization complete!"
