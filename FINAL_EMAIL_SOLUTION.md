# ✅ WORKING EMAIL TEMPLATE - HTML Preview

## The Fix: Use Triple Curly Braces!

EmailJS escapes HTML by default. To render HTML properly, you need to use **triple curly braces** `{{{ }}}` instead of double `{{ }}`.

---

## Update Your EmailJS Template

### Template ID: `template_sc8xh69`

**Subject:**
```
New Lead: {{parkName}} - {{contactName}}
```

**Content (HTML Mode ON):**
```html
<h2>🎉 New Lead from CampSite Solutions Showroom!</h2>

<h3>📋 Contact Information</h3>
<ul>
  <li><strong>Campground Name:</strong> {{parkName}}</li>
  <li><strong>Contact Name:</strong> {{contactName}}</li>
  <li><strong>Email:</strong> <a href="mailto:{{email}}">{{email}}</a></li>
  <li><strong>Phone:</strong> {{phone}}</li>
  <li><strong>Website:</strong> {{website}}</li>
  <li><strong>Primary Business Model:</strong> {{primaryModel}}</li>
</ul>

<h3>📝 Additional Notes</h3>
<p style="white-space: pre-wrap; background-color: #f9fafb; padding: 12px; border-left: 4px solid #f97316; border-radius: 4px;">{{notes}}</p>

<h3>🎨 Custom Layout ({{sectionCount}} sections)</h3>

{{{layoutPreview}}}

<div style="margin-top: 20px; padding: 16px; background-color: #f9fafb; border-radius: 8px;">
  <p style="margin: 0; font-size: 14px; color: #666;">
    <strong>📋 Section List:</strong><br>
    {{selectedSections}}
  </p>
</div>

<hr style="margin: 30px 0; border: none; border-top: 2px solid #e5e7eb;">

<p style="color: #999; font-size: 12px;">
  This lead was submitted through your CampSite Solutions website builder showroom.
</p>
```

**⚠️ IMPORTANT:** Notice `{{{layoutPreview}}}` has **3 curly braces**, not 2!

**Settings:**
- **To Email:** `{{recipientEmail}}`
- **Reply To:** `{{email}}`
- **From Name:** `CampSite Solutions`
- **HTML Mode:** ✅ ON (important!)

---

## Why Triple Braces?

| Syntax | What It Does |
|--------|-------------|
| `{{layoutPreview}}` | Escapes HTML → shows raw `<div>` tags as text |
| `{{{layoutPreview}}}` | Renders HTML → shows beautiful styled layout ✅ |

This is standard Mustache template syntax that EmailJS uses.

---

## What Your Email Will Look Like

When properly configured with `{{{layoutPreview}}}`, you'll see:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎉 New Lead from CampSite Solutions Showroom!

📋 Contact Information
• Campground Name: Pine Valley RV Park
• Contact Name: John Smith
• Email: john@example.com
• Phone: (705) 555-0123
• Website: www.pinevalleyrvpark.com
• Primary Business Model: Seasonal Sites

📝 Additional Notes
Looking for a modern design with online booking

🎨 Custom Layout (8 sections)

┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃      Pine Valley RV Park             ┃  ← Styled header
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃ Layout Structure (8 sections)        ┃
┃                                       ┃
┃ ① Hero - Cinematic Overlay           ┃  ← Colored
┃ ② Stay Type Cards                    ┃     circle
┃ ③ Amenities Grid                     ┃     numbers
┃ ④ Photo Gallery - Masonry            ┃
┃ ⑤ Reviews & Testimonials             ┃
┃ ⑥ Local Attractions                  ┃
┃ ⑦ FAQ Section                        ┃
┃ ⑧ Contact Section                    ┃
┃                                       ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

📋 Section List:
Hero - Cinematic Overlay, Stay Type Cards, 
Amenities Grid, Photo Gallery - Masonry, ...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

But with **actual colors, rounded corners, shadows, and beautiful styling!**

---

## Step-by-Step Fix

1. **Go to EmailJS Dashboard:**  
   https://dashboard.emailjs.com/admin/templates/template_sc8xh69/edit

2. **Make sure HTML mode is ON** (toggle in top right)

3. **Find the line with `{{layoutPreview}}`**

4. **Change it to `{{{layoutPreview}}}`** (add one more `{` and `}`)

5. **Save template**

6. **Test it!**
   - Go to `/library` and select 5+ sections
   - Go to `/lead` and submit test form
   - Check email - should see beautiful styled layout!

---

## Before vs After

### ❌ Before (Double Braces):
```
Shows raw HTML:
<div style="max-width: 600px...">
  <div style="background-color: #166534...">
    <h2 style="color: white...">Pine Valley</h2>
  </div>
</div>
```

### ✅ After (Triple Braces):
```
Shows styled layout:
[Beautiful colored box with campground name]
[Numbered sections with colors]
[Professional footer]
```

---

## All Variables (for reference)

| Variable | Triple Braces? | Purpose |
|----------|----------------|---------|
| `{{parkName}}` | No | Plain text |
| `{{contactName}}` | No | Plain text |
| `{{email}}` | No | Plain text |
| `{{phone}}` | No | Plain text |
| `{{website}}` | No | Plain text |
| `{{primaryModel}}` | No | Plain text |
| `{{notes}}` | No | Plain text |
| `{{selectedSections}}` | No | Plain text list |
| `{{sectionCount}}` | No | Number |
| `{{{layoutPreview}}}` | **YES** ✅ | **Raw HTML** |

---

## Troubleshooting

### Still seeing raw HTML?
- ✅ Make sure you used `{{{` with **3 braces**, not 2
- ✅ Check that HTML mode is **ON** in template editor
- ✅ Try saving and testing again
- ✅ Clear browser cache and reload email

### No layout showing at all?
- ✅ Check browser console for JavaScript errors
- ✅ Make sure you selected sections before submitting
- ✅ Verify `layoutPreview` is spelled correctly

### Layout looks broken?
- ✅ Some email clients (Outlook 2007-2013) have poor HTML support
- ✅ Gmail, Apple Mail, and Outlook 365 work great
- ✅ The plain text section list is included as backup

---

## Test Now!

1. Update template with `{{{layoutPreview}}}`
2. Save template
3. Select sections at `/library`
4. Submit test lead at `/lead`
5. Check email - should see beautiful layout! 🎉

Your configuration is already set:
- ✅ Service ID: `service_gjhrv5c`
- ✅ Template ID: `template_sc8xh69`
- ✅ Public Key: `EZRLXacodMklHIfE5`
- ✅ Recipient: `info@campsite.solutions`

Just fix the triple braces and you're done!
