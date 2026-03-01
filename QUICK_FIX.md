# 🔧 QUICK FIX - Change This One Thing!

## The Problem
Your EmailJS template is showing raw HTML code instead of rendering it.

## The Solution
Change **double braces** `{{ }}` to **triple braces** `{{{ }}}`

---

## In Your EmailJS Template Editor

### ❌ WRONG (shows raw HTML):
```html
{{layoutPreview}}
```

### ✅ CORRECT (renders styled layout):
```html
{{{layoutPreview}}}
```

**That's it!** Just add one more `{` at the beginning and one more `}` at the end.

---

## Full Template Code (Copy/Paste This)

**Subject:**
```
New Lead: {{parkName}} - {{contactName}}
```

**Content:**
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

---

## Checklist

- [ ] Copy the template code above
- [ ] Go to https://dashboard.emailjs.com/admin/templates/template_sc8xh69/edit
- [ ] Make sure **HTML mode is ON** (toggle in top right corner)
- [ ] Paste the template code
- [ ] Double-check that `{{{layoutPreview}}}` has **3 braces**
- [ ] Click **Save**
- [ ] Test by submitting a lead with sections selected

---

## Why Triple Braces?

EmailJS uses Mustache template syntax:
- `{{variable}}` = Escaped text (shows `<div>` as text)
- `{{{variable}}}` = Raw HTML (renders actual HTML)

Since `layoutPreview` contains HTML code, we need triple braces to render it properly.

---

## Test It Now!

1. Select 5+ sections from `/library`
2. Fill out form at `/lead`
3. Submit
4. Check email at `info@campsite.solutions`
5. You should see a beautiful styled layout! ✨

If it works, you'll see colored sections with numbers, not raw HTML code!
