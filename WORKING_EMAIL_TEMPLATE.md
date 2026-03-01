# 🎯 EMAIL TEMPLATE - FINAL WORKING VERSION

## Copy This Entire Template

Go to: https://dashboard.emailjs.com/admin/templates/template_sc8xh69/edit

---

### Subject:
```
New Lead: {{parkName}} - {{contactName}}
```

---

### Content (make sure HTML mode is ON):

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
</head>
<body style="font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f5f5f5;">

<table cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 700px; margin: 0 auto; background-color: #ffffff;">
  <tr>
    <td style="padding: 30px;">
      
      <h2 style="color: #2C3E50; margin: 0 0 20px 0;">🎉 New Lead from CampSite Solutions Showroom!</h2>

      <h3 style="color: #2C3E50; margin: 24px 0 12px 0; border-bottom: 2px solid #E8D5B5; padding-bottom: 8px;">📋 Contact Information</h3>
      <table cellpadding="6" cellspacing="0" border="0" width="100%" style="margin-bottom: 20px;">
        <tr>
          <td width="40%" style="color: #666; font-size: 14px;"><strong>Campground Name:</strong></td>
          <td style="color: #333; font-size: 14px;">{{parkName}}</td>
        </tr>
        <tr style="background-color: #f9f9f9;">
          <td width="40%" style="color: #666; font-size: 14px;"><strong>Contact Name:</strong></td>
          <td style="color: #333; font-size: 14px;">{{contactName}}</td>
        </tr>
        <tr>
          <td width="40%" style="color: #666; font-size: 14px;"><strong>Email:</strong></td>
          <td style="color: #333; font-size: 14px;"><a href="mailto:{{email}}" style="color: #2C3E50;">{{email}}</a></td>
        </tr>
        <tr style="background-color: #f9f9f9;">
          <td width="40%" style="color: #666; font-size: 14px;"><strong>Phone:</strong></td>
          <td style="color: #333; font-size: 14px;">{{phone}}</td>
        </tr>
        <tr>
          <td width="40%" style="color: #666; font-size: 14px;"><strong>Website:</strong></td>
          <td style="color: #333; font-size: 14px;">{{website}}</td>
        </tr>
        <tr style="background-color: #f9f9f9;">
          <td width="40%" style="color: #666; font-size: 14px;"><strong>Business Model:</strong></td>
          <td style="color: #333; font-size: 14px; text-transform: capitalize;">{{primaryModel}}</td>
        </tr>
      </table>

      <h3 style="color: #2C3E50; margin: 24px 0 12px 0; border-bottom: 2px solid #E8D5B5; padding-bottom: 8px;">📝 Additional Notes</h3>
      <div style="background-color: #f9fafb; padding: 16px; border-left: 4px solid #f97316; border-radius: 4px; margin-bottom: 24px;">
        <p style="margin: 0; color: #333; white-space: pre-wrap; font-size: 14px; line-height: 1.6;">{{notes}}</p>
      </div>

      <h3 style="color: #2C3E50; margin: 24px 0 12px 0; border-bottom: 2px solid #E8D5B5; padding-bottom: 8px;">🎨 Custom Layout ({{sectionCount}} sections)</h3>
      
      {{{layoutPreview}}}

      <div style="background-color: #f9fafb; padding: 16px; border-radius: 8px; margin-top: 24px;">
        <p style="margin: 0 0 8px 0; color: #666; font-size: 14px;"><strong>📋 Section List:</strong></p>
        <p style="margin: 0; color: #333; font-size: 14px; line-height: 1.6;">{{selectedSections}}</p>
      </div>

      <hr style="margin: 30px 0; border: none; border-top: 2px solid #e5e7eb;">

      <p style="color: #999; font-size: 12px; text-align: center; margin: 0;">
        This lead was submitted through your CampSite Solutions website builder showroom.
      </p>

    </td>
  </tr>
</table>

</body>
</html>
```

---

### Template Settings:

1. **To Email:** `{{recipientEmail}}`
2. **Reply To:** `{{email}}`
3. **From Name:** `CampSite Solutions Showroom`
4. **HTML Mode:** ✅ **MUST BE ON**

---

## ⚠️ Critical Checks:

- [ ] `{{{layoutPreview}}}` has **3 curly braces** (not 2!)
- [ ] **HTML mode is ON** in template editor
- [ ] All other variables use **2 curly braces**: `{{parkName}}`, `{{email}}`, etc.
- [ ] Template is saved

---

## What You'll See:

The email will display:

1. **Contact Info Table** - Clean, professional layout
2. **Notes Section** - Highlighted with orange accent bar
3. **Layout Preview** - Beautiful styled box showing:
   - Campground name in colored header
   - All sections numbered with colored circles (①②③...)
   - Alternating row colors
   - Footer with "Built with CampSite Solutions"
4. **Section List** - Plain text backup

---

## Test Steps:

1. **Copy the entire HTML template above**
2. **Paste into your EmailJS template** (replace everything)
3. **Check HTML mode is ON** (toggle in top right)
4. **Save template**
5. **Test:**
   - Go to `/library` and select 5-8 sections
   - Go to `/lead` and fill out form:
     - Park Name: Camp Blue Lemon
     - Contact Name: Test User
     - Email: your-test@email.com
     - Phone: (123) 456-7890
     - Business Model: Seasonal Sites
     - Notes: Test submission
   - Submit form
   - Check email at `info@campsite.solutions`

6. **Check browser console** - You should see:
   ```
   📧 Email Data: {
     sectionCount: 8,
     sectionNames: ['Navigation - Centered Links', 'Hero - ...', ...],
     branding: { companyName: 'Camp Blue Lemon' },
     paletteColors: { primary: '#166534', secondary: '#f3f4f6', accent: '#f97316' },
     htmlLength: 2856
   }
   ```

---

## Troubleshooting:

### Still seeing raw HTML?
- Make sure you used `{{{layoutPreview}}}` with **3 braces**
- Verify HTML mode is **ON** (not plain text mode)
- Clear browser cache and test again

### No sections showing?
- Check browser console for the "📧 Email Data" log
- Make sure you selected sections from `/library` before submitting
- Verify `sectionCount > 0` in console

### Layout looks plain/unstyled?
- This is expected! The new code uses **table-based layout** which works in all email clients
- You should see:
  - Colored header with campground name
  - Numbered sections (1, 2, 3...)
  - Alternating row backgrounds
  - Orange accent border on left side
  - Footer

### Only showing 1 section?
- Check the console log - is `sectionNames` showing all sections?
- If yes, but email only shows 1, your email client might be truncating the HTML
- Try viewing in Gmail or a different email client

---

## What Changed:

I updated the HTML generator to use **tables instead of divs** because:
- ✅ Tables are universally supported in email clients
- ✅ No modern CSS that gets stripped out
- ✅ Inline styles only (no classes)
- ✅ Works in Gmail, Outlook, Apple Mail, Yahoo, etc.

The old version used flexbox/grid which many email clients don't support.

---

Your EmailJS is already configured:
- ✅ Service: `service_gjhrv5c`
- ✅ Template: `template_sc8xh69`
- ✅ Key: `EZRLXacodMklHIfE5`
- ✅ Recipient: `info@campsite.solutions`

Just update the template and test! 🚀
