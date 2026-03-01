# 🚀 Quick Update: Add Layout Preview to Your Email Template

Since you already have EmailJS configured, you just need to update your email template to include the visual layout preview!

## Steps to Update Your Template

### 1. Go to EmailJS Dashboard

1. Log in to [https://dashboard.emailjs.com/](https://dashboard.emailjs.com/)
2. Click **"Email Templates"** in the left sidebar
3. Find your template **"CampSite Lead Capture"** (Template ID: `template_sc8xh69`)
4. Click on it to edit

### 2. Update the Template Content

Replace your current template content with this updated version:

**Subject Line:**
```
New Lead: {{parkName}} - {{contactName}}
```

**Message Body (make sure HTML mode is enabled):**
```html
<h2>🎉 New Lead from CampSite Solutions Showroom!</h2>

<h3>📋 Contact Information</h3>
<ul>
  <li><strong>Campground Name:</strong> {{parkName}}</li>
  <li><strong>Contact Name:</strong> {{contactName}}</li>
  <li><strong>Email:</strong> {{email}}</li>
  <li><strong>Phone:</strong> {{phone}}</li>
  <li><strong>Website:</strong> {{website}}</li>
  <li><strong>Primary Business Model:</strong> {{primaryModel}}</li>
</ul>

<h3>📝 Additional Notes</h3>
<p>{{notes}}</p>

<h3>🎨 Custom Layout Preview</h3>
<p><strong>They selected {{sectionCount}} sections:</strong></p>
<p style="color: #666; font-size: 14px;">{{selectedSections}}</p>

<div style="margin: 20px 0;">
  {{layoutPreview}}
</div>

<hr style="margin: 30px 0; border: none; border-top: 2px solid #e5e7eb;">

<p style="color: #666; font-size: 12px;">
  This lead was submitted through your CampSite Solutions website builder showroom.
</p>
```

### 3. Important Settings

Make sure these fields are set correctly:

- **To Email:** `{{recipientEmail}}`
- **Reply To:** `{{email}}` (optional, but recommended - lets you reply directly to the lead)
- **From Name:** `CampSite Solutions` or whatever you prefer

### 4. Save the Template

Click the **"Save"** button in the top right corner.

### 5. Test It!

1. Go to your application at `/lead`
2. Fill out the form with test data
3. Make sure to **select some sections** from the Section Library first (so the layout preview appears)
4. Submit the form
5. Check your email at `info@campsite.solutions`

## What's New in the Email?

Your emails will now include:

✅ **All contact information** (name, email, phone, website)  
✅ **Business model** selection  
✅ **Custom notes** from the lead  
✅ **List of selected sections**  
✅ **Visual layout preview** - A beautiful HTML preview showing:
   - Their campground name with branding
   - All selected sections in order
   - Their chosen color palette
   - Numbered sections for easy reference

## What the Layout Preview Looks Like

The layout preview will show a visual representation like this:

```
╔══════════════════════════════════╗
║    [LOGO]  Campground Name       ║
╠══════════════════════════════════╣
║ Layout Structure (8 sections)    ║
║ ➊ Hero - Cinematic Overlay       ║
║ ➋ Stay Type Cards                ║
║ ➌ Amenities Grid                 ║
║ ➍ Photo Gallery - Masonry        ║
║ ➎ Reviews & Testimonials         ║
║ ➏ Local Attractions              ║
║ ➐ FAQ Section                    ║
║ ➑ Contact Section                ║
╚══════════════════════════════════╝
```

But styled beautifully with their actual branding colors!

## Already Done! ✅

Your configuration is already complete:
- ✅ Service ID: `service_gjhrv5c`
- ✅ Template ID: `template_sc8xh69`
- ✅ Public Key: `EZRLXacodMklHIfE5`
- ✅ Recipient: `info@campsite.solutions`
- ✅ Email enabled: `true`

Just update the template content and you're all set!
