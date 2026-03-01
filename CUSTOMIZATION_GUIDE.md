# 🎨 How to Customize Sections (Text & Images)

## YES! You can now change banner images and text on the fly!

The customization system has been fully implemented with real-time editing capabilities.

---

## How It Works

### 1. Add Sections to Your Layout
- Go to `/library`
- Click "Add to Layout" on any section
- Navigate to `/my-layout`

### 2. Find the Edit Button
- In the **Section Order** control panel, each section has 4 buttons:
  - ⬆️ Move Up
  - ⬇️ Move Down  
  - ❌ Remove
  - **✏️ EDIT** ← This is the new one!

### 3. Click Edit
- A modal will open with editable fields for that section
- Fields vary by section type (see below)

### 4. Make Your Changes
- **Text Fields:** Edit headlines, descriptions, button text
- **Image URLs:** Paste image URLs from Unsplash or any source
- Click "Save Changes"

### 5. See Updates Instantly
- The preview below updates immediately
- All changes are saved to localStorage
- Changes persist even after refresh!

---

## Which Sections Can Be Edited?

### 🎯 Fully Customizable Sections

#### Hero Banner
- ✏️ Headline
- ✏️ Subheadline
- ✏️ Button Text
- 🖼️ Background Image URL

#### Hero with Weather Card
- ✏️ Headline
- ✏️ Subheadline
- ✏️ Button Text
- 🖼️ Background Image URL

#### CTA Banner
- ✏️ Headline
- ✏️ Description
- ✏️ Button Text
- 🖼️ Background Image URL

#### Seasonal Benefits
- ✏️ Headline
- ✏️ Description (multi-line)
- 🖼️ Image URL

#### Photo Gallery
- 🖼️ Image 1-8 URLs (customize all 8 gallery images!)

#### Navigation - Centered Links
- ✏️ Company Name
- ✏️ Phone Number

#### Navigation - With CTA Button
- ✏️ Company Name
- ✏️ Tagline
- ✏️ Phone Number
- ✏️ CTA Button Text

#### Navigation - With Top Info Bar
- ✏️ Company Name
- ✏️ Address
- ✏️ Hours
- ✏️ Phone Number
- ✏️ Email
- ✏️ CTA Button Text

### ⏳ Other Sections
Other sections don't have editable fields yet, but the modal will show a message saying "More editing options coming soon!"

---

## Pro Tips

### 🖼️ Getting Images

**Option 1: Unsplash (Recommended)**
1. Go to [unsplash.com](https://unsplash.com)
2. Search for "campground", "RV park", "forest camping", etc.
3. Right-click on an image → "Copy image address"
4. Paste the URL into the image field

**Option 2: Any Image URL**
- You can use any publicly accessible image URL
- Format: `https://example.com/image.jpg`

### 📝 Text Best Practices

**Headlines:**
- Keep it short and punchy (5-10 words)
- Focus on benefits or emotional appeal
- Examples:
  - "Your Perfect Weekend Escape"
  - "Family Memories Start Here"
  - "Find Your Home Away From Home"

**Descriptions:**
- 1-2 sentences max
- Clear value proposition
- Examples:
  - "Modern amenities meet natural beauty in our family-friendly campground."
  - "Book your seasonal site today and enjoy summer-long adventures."

**Button Text:**
- Action-oriented (2-4 words)
- Examples:
  - "Book Now"
  - "Get Started"
  - "Reserve Your Spot"
  - "View Availability"

---

## Example Workflow

Let's customize a Hero section:

1. **Add Hero to Layout**
   - Go to Section Library
   - Click "Add to Layout" on "Hero Banner"
   - Go to My Layout

2. **Click Edit**
   - Find "Hero Banner" in Section Order
   - Click the ✏️ Edit button

3. **Customize Content**
   ```
   Headline: Pine Valley Campground
   Subheadline: Your family's favorite summer destination since 1985
   Button Text: Reserve Your Site
   Background Image: https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=1600
   ```

4. **Save & Preview**
   - Click "Save Changes"
   - Scroll down to see your customized hero section!

---

## Technical Details

### Data Storage
- All customizations are stored in **localStorage**
- Key: `sectionCustomizations`
- Persists across page refreshes
- Clears if you clear browser data

### How Sections Read Customizations
Each section component receives a `customization` prop:
```tsx
<Hero customization={{ headline: "Custom Text", backgroundImage: "..." }} />
```

The component uses custom values if provided, otherwise falls back to defaults:
```tsx
const headline = customization.headline || 'Default Headline';
```

### Adding More Editable Sections
To make a section editable:

1. **Add fields to EditSectionModal.tsx:**
   ```tsx
   'section-id': [
     { label: 'Field Name', key: 'fieldKey', type: 'text' }
   ]
   ```

2. **Update the component to accept customization prop:**
   ```tsx
   interface MyComponentProps {
     customization?: SectionCustomization;
   }
   
   export function MyComponent({ customization = {} }: MyComponentProps) {
     const myField = customization.fieldKey || 'default value';
     // ... use myField in your JSX
   }
   ```

---

## What's Saved to localStorage?

**Example customization data:**
```json
{
  "hero": {
    "headline": "Pine Valley Campground",
    "subheadline": "Your family's favorite summer destination",
    "buttonText": "Reserve Your Site",
    "backgroundImage": "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d"
  },
  "nav-centered": {
    "companyName": "Pine Valley RV Park",
    "phone": "555-987-6543"
  },
  "cta-banner": {
    "headline": "Ready to Experience Pine Valley?",
    "description": "Book your 2026 season now and save 10%!",
    "buttonText": "Get 10% Off"
  }
}
```

---

## Troubleshooting

**Q: My changes aren't showing up**
- Make sure you clicked "Save Changes" in the modal
- Refresh the page to verify persistence
- Check browser console for errors

**Q: Image isn't loading**
- Verify the URL is publicly accessible
- Make sure it's a direct image URL (ends in .jpg, .png, etc.)
- Try a different image from Unsplash

**Q: I want to reset to defaults**
- Remove the section and add it back
- Or clear localStorage in DevTools → Application → Local Storage

**Q: Can I edit sections on template pages?**
- Not yet! This only works for custom layouts built in Section Library
- Templates (Seasonal, Overnight, Trailers) use hardcoded content

---

## Summary

✅ **What You Can Do:**
- Edit text (headlines, descriptions, button labels)
- Change banner/background images
- Customize company info (name, phone, address)
- See changes in real-time preview
- Changes persist across sessions

✅ **Sections with Full Editing:**
- All 3 navigation options
- Both hero variants
- CTA Banner
- Seasonal Benefits
- Photo Gallery (all 8 images)

🎉 **Start customizing your campground website now!**
