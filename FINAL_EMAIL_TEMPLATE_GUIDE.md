# 📧 Final Email Template with Layout Screenshot

## Update Your EmailJS Template

Go to your EmailJS template editor and update it with this content:

### Template ID: `template_sc8xh69`

---

### Subject Line:
```
New Lead: {{parkName}} - {{contactName}}
```

---

### Email Content (HTML Mode):

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

<h3>🎨 Custom Layout</h3>
<p><strong>They selected {{sectionCount}} sections:</strong></p>
<p style="color: #666; font-size: 14px; margin-bottom: 20px;">{{selectedSections}}</p>

<!-- Option 1: HTML Visual Preview (embedded) -->
<div style="margin: 20px 0;">
  {{layoutPreview}}
</div>

<!-- Option 2: Screenshot Image (if available) -->
<div style="margin: 30px 0;">
  <h4>📸 Layout Screenshot:</h4>
  <img src="{{layoutImageUrl}}" alt="Layout Preview" style="max-width: 100%; border: 2px solid #e5e7eb; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);" />
</div>

<hr style="margin: 30px 0; border: none; border-top: 2px solid #e5e7eb;">

<p style="color: #666; font-size: 12px;">
  This lead was submitted through your CampSite Solutions website builder showroom.
</p>
```

---

### Important Settings:

1. **To Email:** `{{recipientEmail}}`
2. **Reply To:** `{{email}}` ← This lets you reply directly to the lead!
3. **From Name:** `CampSite Solutions Showroom`
4. **Enable HTML:** Make sure HTML mode is ON

---

## What You'll Get in Each Email:

✅ **Contact Details** - All the lead's information  
✅ **Business Model** - Their primary focus  
✅ **Custom Notes** - Any special requirements  
✅ **Section List** - Plain text list of selected sections  
✅ **HTML Preview** - Styled visual preview embedded in email  
✅ **Screenshot Image** - Actual PNG image of the layout (NEW!)

---

## Two Ways to View the Layout:

### 1. **HTML Preview** (Always Works)
- Styled HTML rendered directly in the email
- Shows sections with numbers, colors, and branding
- Works in all modern email clients

### 2. **Screenshot Image** (Extra Visual)
- Actual PNG image attached inline
- Base64 encoded (no external hosting needed)
- Perfect for forwarding or printing

---

## How It Works:

1. User builds custom layout on `/my-layout`
2. User fills out lead capture form on `/lead`
3. App generates:
   - Plain text section list
   - Styled HTML preview
   - PNG screenshot (using html2canvas)
4. Email sent with all three formats!

---

## Test It Now:

1. Go to `/library` and select 5+ sections
2. Go to `/lead` and fill out the form with test data
3. Submit the form
4. Check your email at `info@campsite.solutions`
5. You should see BOTH the HTML preview AND the screenshot image!

---

## Troubleshooting:

### If the screenshot doesn't appear:
- The `{{layoutImageUrl}}` will be empty if no sections are selected
- Check browser console for html2canvas errors
- Some email clients block base64 images (Gmail usually works fine)

### If the HTML preview doesn't appear:
- Make sure HTML mode is enabled in your template
- Check that `{{layoutPreview}}` is not escaped
- Try viewing in a different email client

### If neither appears:
- Check the email body in "View Source" mode
- Verify all template variables are spelled correctly
- Look for JavaScript errors in browser console when submitting

---

## Pro Tips:

💡 **Test with different email clients:**
- Gmail (best support)
- Outlook (good support)
- Apple Mail (excellent support)
- Yahoo Mail (basic support)

💡 **The image is base64 encoded**, which means:
- No external hosting required
- Works offline
- Larger email size (usually 50-200KB per image)
- Some spam filters may flag it (rare)

💡 **Both formats are included** so you have:
- HTML for quick viewing
- Image for reliable display across all clients
- Text list as fallback

---

## Your Configuration (Already Set):

✅ Service ID: `service_gjhrv5c`  
✅ Template ID: `template_sc8xh69`  
✅ Public Key: `EZRLXacodMklHIfE5`  
✅ Recipient: `info@campsite.solutions`  
✅ Status: **ENABLED**

Just update the template and you're all set! 🎉
