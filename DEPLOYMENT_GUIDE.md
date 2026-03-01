# 🚀 Deployment Guide - CampSite Solutions Showroom

This guide will walk you through deploying your app to Vercel (100% FREE hosting).

---

## ⚡ Quick Option: Skip Deployment (Use Localhost)

If you're demoing at a trade show booth and running the app on your laptop, you can skip deployment!

**To use localhost URLs:**
1. Keep your dev server running: `npm run dev`
2. The email preview links will work on your computer
3. Make sure your computer has internet for EmailJS to work

**Limitation:** Email links won't work on other computers or after you close the dev server.

---

## 🌐 Full Deployment (Recommended)

### Step 1: Create a GitHub Account (5 minutes)

1. Go to: https://github.com/signup
2. Enter your email address
3. Create a password
4. Choose a username (e.g., "campsitesolutions")
5. Verify your email
6. Click "Continue for free"

---

### Step 2: Install GitHub Desktop (Easiest Method)

Instead of using command line, use GitHub Desktop for a visual interface:

1. Download: https://desktop.github.com/
2. Install and open GitHub Desktop
3. Sign in with your new GitHub account
4. Click "Create a New Repository on your hard drive"
5. Fill in:
   - **Name:** `campsite-showroom`
   - **Local Path:** Browse to your project folder
   - **Initialize with README:** Leave unchecked (you already have files)
6. Click "Create Repository"
7. Click "Publish repository" in the top toolbar
8. Uncheck "Keep this code private" if you want it public (optional)
9. Click "Publish repository"

✅ Your code is now on GitHub!

---

### Step 3: Create a Vercel Account (2 minutes)

1. Go to: https://vercel.com/signup
2. Click "Continue with GitHub"
3. Authorize Vercel to access your GitHub account
4. Complete the signup

---

### Step 4: Deploy Your App (3 minutes)

1. Go to: https://vercel.com/new
2. You'll see a list of your GitHub repositories
3. Find "campsite-showroom" and click "Import"
4. Vercel will auto-detect the settings:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Click "Deploy"
6. Wait 2-3 minutes for the build to complete

🎉 Your app is now live!

---

### Step 5: Get Your Production URL

After deployment completes:

1. Vercel will show a **success page** with your URL
2. It will look like: `https://campsite-showroom.vercel.app`
3. Copy this URL (click the copy button)

---

### Step 6: Update Your Code with Production URL

1. Open your project in your code editor
2. Open the file: `/src/app/pages/LeadCapture.tsx`
3. Find **line 37** (around the top of the file):
   ```javascript
   const PRODUCTION_URL = 'https://your-production-url.com'; // ⚠️ UPDATE THIS!
   ```
4. Replace with your Vercel URL:
   ```javascript
   const PRODUCTION_URL = 'https://campsite-showroom.vercel.app';
   ```
5. Save the file

---

### Step 7: Push Your Changes

**Using GitHub Desktop:**
1. Open GitHub Desktop
2. You'll see your changes listed
3. In the bottom left, add a summary: "Add production URL"
4. Click "Commit to main"
5. Click "Push origin" in the top toolbar

**Vercel will automatically redeploy** (takes ~1 minute)

✅ **Done!** Your email links now work from anywhere!

---

## 🧪 Testing Your Deployment

1. Go to your Vercel URL: `https://your-app-name.vercel.app`
2. Navigate to "Lead Capture"
3. Fill out and submit the form
4. Check the email - the preview link should now work!

---

## 🔄 Making Future Updates

Whenever you make changes to your code:

1. Open GitHub Desktop
2. Write a commit message describing your changes
3. Click "Commit to main"
4. Click "Push origin"
5. Vercel automatically redeploys (1-2 minutes)

---

## 📱 Your Production URLs

After deployment, your app will be accessible at:

- **Main App:** `https://your-app-name.vercel.app`
- **Template Gallery:** `https://your-app-name.vercel.app/`
- **Section Library:** `https://your-app-name.vercel.app/library`
- **Custom Builder:** `https://your-app-name.vercel.app/builder`
- **Lead Capture:** `https://your-app-name.vercel.app/lead-capture`
- **Layout Previews:** `https://your-app-name.vercel.app/layout-preview/{id}`

---

## ⚙️ Custom Domain (Optional)

Want to use `demo.campsite.solutions` instead of `.vercel.app`?

1. Buy a domain from Namecheap, GoDaddy, etc.
2. In Vercel dashboard, go to your project settings
3. Click "Domains"
4. Add your custom domain
5. Follow DNS instructions

---

## 🆘 Troubleshooting

### Problem: "Build Failed" on Vercel

**Solution:**
1. Check Vercel build logs for errors
2. Make sure your code runs locally: `npm run build`
3. Fix any TypeScript errors
4. Push changes to GitHub

### Problem: "Module not found" errors

**Solution:**
1. Make sure all dependencies are in `package.json`
2. Vercel installs from `package.json` automatically
3. Check that imports use correct paths

### Problem: Email links still use localhost

**Solution:**
1. Double-check you updated `PRODUCTION_URL` in `/src/app/pages/LeadCapture.tsx`
2. Make sure you pushed changes to GitHub
3. Wait for Vercel to finish redeploying

### Problem: Preview links show 404

**Solution:**
- This is expected! Preview links are stored in localStorage on the computer that submitted the form
- For production, you'll need a backend database (we can add Supabase if needed)

---

## 💡 Tips

- Vercel gives you **unlimited deployments** on the free plan
- Every push to GitHub = automatic deployment
- View deployment logs in Vercel dashboard
- You can connect multiple domains to one project

---

## 🎉 You're Done!

Your CampSite Solutions Showroom is now live on the internet! Share your Vercel URL with anyone, and they can access your app.

**Questions?** Let me know what step you're on and I'll help!
