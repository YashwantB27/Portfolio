# Push Portfolio to GitHub

Your portfolio has been initialized as a Git repository and committed locally! ✅

## Steps to Push to GitHub:

### Option 1: Using GitHub Desktop (Easiest)
1. Open **GitHub Desktop**
2. Click **File** → **Add Local Repository**
3. Browse to: `c:\Users\Buddala-Anusha\OneDrive\Documents\Portfolio`
4. Click **Publish repository**
5. Choose repository name (e.g., "portfolio" or "yashwant-portfolio")
6. Uncheck "Keep this code private" if you want it public
7. Click **Publish repository**

### Option 2: Using Command Line

#### Step 1: Create a new repository on GitHub
1. Go to https://github.com/new
2. Repository name: `portfolio` (or any name you prefer)
3. Description: "My personal portfolio website"
4. Choose Public or Private
5. **DO NOT** initialize with README, .gitignore, or license
6. Click **Create repository**

#### Step 2: Push your code
After creating the repository, run these commands:

```powershell
# Add your GitHub repository as remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

### Option 3: Using GitHub CLI (if installed)

```powershell
# Create repository and push in one command
gh repo create portfolio --public --source=. --push
```

## What's Been Committed:

✅ **4 files committed:**
- `index.html` - Main HTML structure
- `styles.css` - All styling and design system
- `script.js` - Interactive functionality
- `README.md` - Documentation

✅ **Commit message:** "Initial commit: Modern portfolio website with light/dark mode"

## Deploy to GitHub Pages (Optional)

After pushing to GitHub, you can host your portfolio for free:

1. Go to your repository on GitHub
2. Click **Settings**
3. Scroll to **Pages** (in the left sidebar)
4. Under **Source**, select **main** branch
5. Click **Save**
6. Your site will be live at: `https://YOUR_USERNAME.github.io/portfolio/`

## Next Steps:

1. Push your code using one of the options above
2. (Optional) Enable GitHub Pages for free hosting
3. Share your portfolio URL with the world! 🎉

---

**Note:** If you need help with any of these steps, let me know!
