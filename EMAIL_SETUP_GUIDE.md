# Email Setup Guide for Lead Capture Form

This guide explains how to configure the lead capture form to send emails to your inbox when visitors submit the form.

## Overview

The application uses **EmailJS** - a free service that allows sending emails directly from the browser without needing a backend server.

## Setup Instructions

### Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

### Step 2: Add Email Service

1. In the EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the prompts to connect your email account
5. Copy the **Service ID** (you'll need this later)

### Step 3: Create Email Template

1. In the EmailJS dashboard, go to **Email Templates**
2. Click **Create New Template** or choose **"Contact Us"** as a starting template
3. **IMPORTANT:** Make sure to enable **HTML content** in your template editor
4. Use this template content:

**Template Name:**
```
CampSite Lead Capture
```

**Subject:**
```
New Lead: {{parkName}} - {{contactName}}
```

**Content (HTML Mode):**
```html
<h2>New Lead from CampSite Solutions Showroom!</h2>

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
<p><strong>Selected {{sectionCount}} sections:</strong> {{selectedSections}}</p>

<div style="margin: 20px 0;">
  {{layoutPreview}}
</div>

<hr style="margin: 30px 0; border: none; border-top: 2px solid #e5e7eb;">

<p style="color: #666; font-size: 12px;">
  This lead was submitted through your CampSite Solutions website builder showroom.
</p>
```

5. **Set the "To Email" field to:** `{{recipientEmail}}`
6. **Optional - Set "Reply To" to:** `{{email}}` (allows you to reply directly to the lead)
7. Click **Save**
8. Copy the **Template ID**

> **💡 Pro Tip:** The `{{layoutPreview}}` variable includes a beautifully formatted HTML preview of the customer's custom layout with their branding colors!

### Step 4: Get Public Key

1. In the EmailJS dashboard, go to **Account** → **General**
2. Find your **Public Key** in the API Keys section
3. Copy this key

### Step 5: Update Application Code

Open `/src/app/pages/LeadCapture.tsx` and find these lines near the top:

```typescript
const EMAILJS_CONFIG = {
  serviceId: 'YOUR_SERVICE_ID',        // Paste your Service ID here
  templateId: 'YOUR_TEMPLATE_ID',      // Paste your Template ID here
  publicKey: 'YOUR_PUBLIC_KEY',        // Paste your Public Key here
  recipientEmail: 'your@email.com',    // Replace with YOUR email address
};

// Change this to true to enable email sending
const EMAIL_ENABLED = false;
```

Replace the placeholders with your actual values:
- `YOUR_SERVICE_ID` → Your Service ID from Step 2
- `YOUR_TEMPLATE_ID` → Your Template ID from Step 3
- `YOUR_PUBLIC_KEY` → Your Public Key from Step 4
- `your@email.com` → Your actual email address where you want to receive leads

Then change `EMAIL_ENABLED` from `false` to `true`:

```typescript
const EMAIL_ENABLED = true;
```

### Step 6: Test the Form

1. Visit your application at `/lead` route
2. Fill out the lead capture form
3. Click "Submit & Generate Plan"
4. Check your email inbox for the lead notification

## Example Configuration

Here's what your configuration should look like with real values:

```typescript
const EMAILJS_CONFIG = {
  serviceId: 'service_abc123',
  templateId: 'template_xyz789',
  publicKey: 'xYz_AbC123',
  recipientEmail: 'john@campsitesolutions.com',
};

const EMAIL_ENABLED = true;
```

## Troubleshooting

### Emails Not Sending

1. **Check browser console** - Look for error messages
2. **Verify credentials** - Make sure all IDs and keys are correct
3. **Check spam folder** - Emails might be filtered as spam
4. **Test EmailJS directly** - Use their dashboard to test the service

### Common Error Messages

- **"Public key is invalid"** → Double-check your Public Key
- **"Template not found"** → Verify your Template ID
- **"Service not found"** → Verify your Service ID
- **"CORS error"** → Make sure you're using EmailJS's public key (not private key)

### Free Tier Limits

EmailJS free plan includes:
- 200 emails per month
- 2 email services
- 2 email templates
- Community support

This is perfect for a trade show booth or demo application. For production use with higher volume, consider upgrading to a paid plan.

## Security Notes

- The credentials in the code are **public keys** meant to be used in client-side code
- EmailJS protects against spam with rate limiting and CAPTCHA options
- Never put private/secret keys in client-side code
- For production, consider adding reCAPTCHA to prevent spam submissions

## Alternative: Demo Mode

If you want to test the form without setting up email:
- Keep `EMAIL_ENABLED = false`
- The form will still work and show the success page
- Form data will be logged to the browser console
- No actual emails will be sent

This is useful for:
- Testing the user experience
- Demonstrating the flow at trade shows
- Development and debugging

## Support

- EmailJS Documentation: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
- EmailJS Support: [https://www.emailjs.com/support/](https://www.emailjs.com/support/)