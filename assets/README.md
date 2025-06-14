# Assets Directory Structure

This directory contains all static assets for the Altiora Systems website, organized for easy maintenance and scalability.

## Directory Structure

```
assets/
├── fonts/                          # Font files
│   ├── Futura Md BT Medium.ttf
│   ├── FuturaStd-Bold.otf
│   └── Medino_Regular_font (altiora systems).otf
├── icons/                          # All icon files
│   ├── favicons/                   # Website favicons and PWA icons
│   │   ├── favicon.ico
│   │   ├── favicon-16x16.png
│   │   ├── favicon-32x32.png
│   │   ├── apple-touch-icon.png
│   │   ├── android-chrome-192x192.png
│   │   └── android-chrome-512x512.png
│   ├── social/                     # Social media icons (general use)
│   │   ├── facebook.svg
│   │   ├── instagram.svg
│   │   ├── linkedin.svg
│   │   └── twitter.svg
│   └── ui/                         # UI/Interface specific icons
│       ├── Wordmark Logo.svg       # Header logo
│       ├── X_icon.svg             # Header X/Twitter icon
│       └── Linkedin_icon.svg      # Header LinkedIn icon
└── images/                         # All image files
    ├── backgrounds/                # Background graphics and illustrations
    │   ├── altiora systems background 2.svg
    │   ├── background.png
    │   ├── family.svg
    │   └── waves.svg
    ├── logos/                      # Company and product logos
    │   ├── 103610_Altiora_Flat_B_R_01.png
    │   ├── Altiora Systems.svg
    │   ├── AltioraSystems_NoText.png
    │   ├── Altiora_notext.svg
    │   ├── AltioraConnect_White_lightblue.png
    │   ├── AltioraConnect_black_lightblue.png
    │   ├── altiora connect_w:black.svg
    │   ├── altiora connect_w:white.svg
    │   ├── Barrel Link_No Tagline.png
    │   ├── Barrel Link_Tagline.png
    │   └── barrellink.svg
    ├── mockups/                    # Device mockups and app screenshots
    │   ├── BarrelLink MVP.png
    │   ├── Pages from MVP.png
    │   ├── iPhone 12 Pro mockup.svg
    │   └── Macbook Pro 16 mockup.svg
    ├── team/                       # Team member photographs
    │   ├── Eadie_Alex.jpeg
    │   ├── Glazer_Steve.jpeg
    │   ├── Lee_Peter.jpeg
    │   └── Sinha_Deepayan.jpg
    └── misc/                       # Miscellaneous images
        └── ChatGPT Image Jun 13, 2025 at 04_04_25 PM.png
```

## Usage Guidelines

### Icons
- **Favicons**: Use for browser tabs, bookmarks, and PWA configurations
- **Social**: General social media icons for footer or contact sections
- **UI**: Header-specific icons optimized for the navigation bar

### Images
- **Backgrounds**: SVG graphics and patterns for section backgrounds
- **Logos**: All company and product logo variations
- **Mockups**: Device mockups and application screenshots for hero sections
- **Team**: Professional headshots for about/team pages
- **Misc**: Temporary or miscellaneous images

## File Naming Conventions

- Use descriptive, lowercase names with hyphens: `logo-white.svg`
- Include size or variant info when relevant: `favicon-32x32.png`
- Group related files with consistent prefixes: `altiora-connect-white.svg`

## Optimization Notes

- SVG files are preferred for logos and icons (scalable, small file size)
- PNG files should be optimized for web (consider WebP alternatives)
- Large images should include responsive variants for different screen sizes

## Current Usage

- **Header Logo**: `icons/ui/Wordmark Logo.svg`
- **Header Social Icons**: `icons/ui/X_icon.svg`, `icons/ui/Linkedin_icon.svg`
- **Hero App Screenshot**: `images/mockups/BarrelLink MVP.png`
- **Hero Product Logo**: `images/logos/altiora connect_w:white.svg`
- **Favicons**: All files in `icons/favicons/`
