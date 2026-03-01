# 🎨 Campground Branding System - Complete Guide

## ✅ NEW: Color Palette Selection + Logo & Name Branding!

The complete branding system now includes **3 powerful features**:
1. **Company Name** - Applied to all navigation sections
2. **Logo Upload** - Custom logo for professional branding
3. **🎨 Color Palette** - Instant theme changes across the entire design!

---

## 🚀 Quick Start

### Access Branding Settings
On the **My Layout** page, click the **big blue button** that says:
- "Set Campground Branding" (if not configured)
- "✓ Campground Branding Set" (if already configured)

The button shows:
- Company name
- Color palette name (e.g., "Pine Valley RV Resort • Mountain Blue")
- Color dots preview when palette is selected

---

## 🎨 Color Palette Feature

### What It Does
Instantly changes the color scheme of your entire custom layout including:
- ✅ Navigation backgrounds
- ✅ Button colors
- ✅ Link hover states
- ✅ CTA banners
- ✅ Accent colors
- ✅ All themed sections

### Available Palettes

**10 Sophisticated Campground-Themed Color Schemes:**

1. **Evergreen Reserve** (Default)
   - Classic forest tones
   - Forest Green (#1F3D2B), Warm Sand (#D8CBB8), Charcoal Slate (#2A2E2C)
   - Perfect for: Traditional RV parks, forest campgrounds, nature reserves

2. **Lakeside Retreat**
   - Tranquil waterfront vibes
   - Deep Lake Blue (#1E3A5F), Mist Grey (#DCE1E6), Driftwood Taupe (#A89F91)
   - Perfect for: Lake campgrounds, waterfront resorts, fishing destinations

3. **Modern Woodland**
   - Contemporary forest style
   - Olive Green (#4E5B31), Stone Beige (#C7BFAE), Soft Black (#1C1C1C)
   - Perfect for: Modern glamping sites, boutique campgrounds, upscale RV resorts

4. **Golden Hour Pines**
   - Warm sunset elegance
   - Pine Green (#2F4F3F), Burnished Gold (#B38B4D), Cream Linen (#F4EFE6)
   - Perfect for: Luxury campgrounds, pine forest locations, sunset viewing areas

5. **Canadian Shield**
   - Natural granite tones
   - Granite Grey (#5B6467), Moss Green (#3F5A4F), Soft Cloud (#E8ECEB)
   - Perfect for: Rugged wilderness sites, Canadian locations, rock climbing areas

6. **Campfire Luxe**
   - Cozy fireside warmth
   - Deep Ember (#6B3E2E), Smoke Grey (#4A4A4A), Warm Ivory (#F1ECE5)
   - Perfect for: Cabin rentals, cozy retreats, fall camping, rustic luxury

7. **Harbour & Hemlock**
   - Coastal forest blend
   - Navy Blue (#1C2F45), Muted Sage (#8FA38A), Pale Sand (#E6DDCF)
   - Perfect for: Coastal campgrounds, Pacific Northwest, maritime settings

8. **Maple & Stone**
   - Rustic natural earth
   - Deep Maple Brown (#6A4B3B), Cool Stone (#B7B2AA), Forest Shadow (#28342D)
   - Perfect for: Autumn destinations, maple forest areas, traditional camping

9. **Morning Mist**
   - Soft dawn atmosphere
   - Dusty Blue (#6F8FAF), Soft Sage (#A3B18A), Warm White (#F8F6F2)
   - Perfect for: Peaceful retreats, yoga/wellness camps, misty valley locations

10. **Trailhead Minimal**
    - Clean outdoor aesthetic
    - Deep Teal (#1F4E4E), Muted Clay (#C2A28C), Off-White (#F5F3EF)
    - Perfect for: Hiking trailheads, minimalist camping, eco-friendly sites

### How to Select a Color Palette

1. Click the **blue branding button** at top of My Layout page
2. Scroll to the **"Color Palette"** section
3. You'll see **10 palette cards** with:
   - Palette name
   - Description
   - 3 color swatches
4. **Click any palette** to select it
5. See **live preview** at bottom of modal
6. Click **"Save Branding"**
7. Watch your entire layout update instantly! ✨

### Visual Indicators

- **Selected palette**: Blue border + checkmark badge
- **Branding button**: Shows color dots when palette active
- **Live preview**: See navigation with your chosen colors before saving

---

## 🏢 Company Name & Logo

### Company Name
- Text field for campground/business name
- Examples: "Sunset Valley RV Resort", "Pine Mountain Campground"
- Appears in **all navigation headers**
- Replaces placeholder "Campground Name"

### Logo Upload
- **URL field** for logo image
- Recommended size: **200x60px to 400x120px**
- **PNG with transparency** works best
- Automatically scales to fit navigation

### Where to Host Logos:
- **Client's website** - Right-click image → Copy image address
- **Free image hosts:**
  - Imgur.com
  - ImgBB.com
  - Postimages.org
- **Your own hosting** - S3, Cloudinary, etc.

### Logo Display Rules:
- **White backgrounds**: Logo shows naturally
- **Dark backgrounds**: Logo auto-inverts to white
- **Fallback**: Company name displays if logo fails to load

---

## 🎯 Trade Show Demo Workflow

### Perfect 2-Minute Client Demo:

**Step 1: Get Client Info**
- "What's your campground called?"
- "What colors represent your brand?"

**Step 2: Open Branding Modal**
- Click blue button
- Enter name: "Pine Valley RV Resort"
- Select palette: "Forest Green" or "Mountain Blue"
- (Optional) Paste logo URL if available
- Click Save

**Step 3: Show Impact**
✨ **Everything updates instantly!**
- All 3 navigation styles show their name
- All buttons match their color scheme
- Entire layout feels personalized

**Step 4: Fine-Tune Content**
- Click green Edit buttons on sections
- Customize headlines, images, text
- Client sees their campground come to life!

**Result:** Professional, branded demo in under 2 minutes! 🎉

---

## 🔧 Technical Details

### Data Storage
```javascript
localStorage.brandingSettings = {
  companyName: "Pine Valley RV Resort",
  logoUrl: "https://example.com/logo.png",
  colorPaletteId: "mountain-blue"
}
```

### How It Works
1. User selects palette in branding modal
2. Palette ID saved to localStorage + React Context
3. `useColorPalette()` hook provides colors to all components
4. Components apply colors via inline styles
5. Changes reflect immediately in preview

### Component Integration
```tsx
import { useColorPalette } from '../../hooks/useColorPalette';

export function NavigationWithCTA() {
  const palette = useColorPalette();
  
  return (
    <nav style={{ backgroundColor: palette.colors.primary }}>
      {/* Navigation content */}
    </nav>
  );
}
```

### Color Palette Structure
Each palette includes:
- `primary` - Main brand color (navs, headers)
- `primaryHover` - Hover state
- `primaryDark` - Darker variant (top bars)
- `secondary` - Secondary brand color
- `accent` - Call-to-action buttons
- `accentHover` - Button hover state
- `text` - Body text color
- `textLight` - Light text for secondary content

---

## 🎨 Which Components Use Color Palettes?

### ✅ Fully Themed:
- **NavigationCentered** - Logo color, link hovers
- **NavigationWithCTA** - Background, CTA button
- **NavigationWithTopBar** - Top bar background, CTA button
- **CTABanner** - Background gradient, buttons

### 🔄 More Components Coming:
The system is extensible! You can easily add color palette support to:
- Hero sections
- Feature cards
- Testimonials
- Footer
- Any component that uses brand colors

---

## 💡 Pro Tips

### Matching Client Brands
- **Ask about existing website colors**
- **Look at their logo** for color inspiration
- **Consider location:**
  - Desert → Desert Sunset
  - Mountains → Mountain Blue
  - Forest → Forest Green or Pine Forest
  - Beach → Coastal Breeze

### Client Can't Decide?
- **Default to Forest Green** - Safe, classic campground feel
- **Show 2-3 options** in real-time during demo
- **Clicking is instant** - Let them experiment!

### Combining With Section Edits
1. **Set global branding first** (name, logo, colors)
2. **Then customize sections individually**
3. **Global branding provides consistency**
4. **Section edits provide personalization**

### Quick Color Changes
- No coding required
- No CSS knowledge needed
- Click → Instant preview → Save
- Perfect for non-technical sales demos!

---

## 🐛 Troubleshooting

### Q: Color palette not applying?
**A:** Make sure you saved the branding modal. The preview in the modal shows how it will look.

### Q: Some sections not changing color?
**A:** Not all sections use the color palette yet. NavigationCentered, NavigationWithCTA, NavigationWithTopBar, and CTABanner are fully supported.

### Q: Want to use custom colors not in the presets?
**A:** The 10 presets cover most campground scenarios. For custom colors, we'd need to add code-level customization.

### Q: Can I have different color schemes per section?
**A:** The color palette is global (applies to all sections). This ensures visual consistency across the layout.

### Q: Logo looks wrong on dark backgrounds?
**A:** The system auto-inverts logos on dark navs. Use a PNG with transparent background for best results.

### Q: How do I reset to default?
**A:** Open branding modal → Select "Forest Green" palette → Delete company name → Delete logo URL → Save

---

## 📊 Visual Indicators in UI

### Branding Button States

**Not Configured:**
```
┌─────────────────────────────────────────────────┐
│ 🏢  Set Campground Branding                  ✏️│
│     Set logo, name & color palette              │
└─────────────────────────────────────────────────┘
Light blue background, blue text
```

**Configured with Name Only:**
```
┌─────────────────────────────────────────────────┐
│ 🏢  ✓ Campground Branding Set                ✏️│
│     Pine Valley RV Resort                       │
└─────────────────────────────────────────────────┘
Dark blue background, white text
```

**Fully Configured (Name + Palette):**
```
┌─────────────────────────────────────────────────┐
│ 🏢  ✓ Campground Branding Set 🟢🟠         🎨✏️│
│     Pine Valley RV Resort • Mountain Blue       │
└─────────────────────────────────────────────────┘
Dark blue background, white text, color dots visible
```

---

## 🎯 Key Benefits

### For Sales Demos:
- ✅ **Instant visual impact** - Colors change live
- ✅ **Professional appearance** - Matches client brand
- ✅ **Non-technical** - No coding, just clicking
- ✅ **Fast** - Entire branding setup in 30 seconds

### For Clients:
- ✅ **See their brand** come to life instantly
- ✅ **Consistent design** across all sections
- ✅ **Easy to understand** - Visual palette selection
- ✅ **Flexible** - Can change anytime

### For Development:
- ✅ **Centralized theming** via Context API
- ✅ **Extensible** - Easy to add more components
- ✅ **Persistent** - Saved in localStorage
- ✅ **Type-safe** - Full TypeScript support

---

## 📋 Quick Reference

### Color Palette by Use Case

| Location Type | Recommended Palette |
|--------------|---------------------|
| Mountain/Alpine | Lakeside Retreat, Canadian Shield |
| Forest/Woods | Evergreen Reserve, Modern Woodland, Golden Hour Pines |
| Desert/Southwest | Golden Hour Pines, Campfire Luxe |
| Beach/Coastal | Harbour & Hemlock, Morning Mist |
| Lake/Waterfront | Lakeside Retreat, Trailhead Minimal |
| Glamping/Boutique | Modern Woodland, Morning Mist |
| Traditional RV Park | Evergreen Reserve, Maple & Stone |
| Rustic/Cabin Rentals | Campfire Luxe, Maple & Stone |
| Canadian Locations | Canadian Shield, Harbour & Hemlock |
| Minimalist/Eco-Friendly | Trailhead Minimal, Morning Mist |

---

## 🎉 Summary

The complete Campground Branding System gives you:

1. **🏢 Company Name** - Global branding across all navs
2. **🖼️ Logo Upload** - Professional image branding
3. **🎨 Color Palettes** - 10 instant theme options

All controlled from **one modal**, with **instant preview**, **localStorage persistence**, and **zero coding required**!

Perfect for trade show demos where you need to personalize quickly and impress clients with professional, branded layouts in minutes.

**Access it all from the big blue button on My Layout!** 💙