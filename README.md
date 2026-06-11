# Shaktiman Singh — Static Portfolio

Static replica of the Laravel portfolio. Same design and content, deployable for **free** on GitHub Pages.

## Project structure

```
Portfolio-Normal/
├── index.html
├── css/style.css
├── js/app.js
├── images/Shaktiman_Singh_Profile_Image.png
└── SHAKTIMAN_SINGH_RESUME.pdf
```

## Local preview

Open `index.html` in a browser, or:

```bash
cd Portfolio-Normal
npx serve .
```

Then visit `http://localhost:3000`.

## Enable contact form (Web3Forms — free)

1. Go to [web3forms.com](https://web3forms.com) and create an access key with your email
2. Open `js/app.js`
3. Replace `REPLACE_WITH_YOUR_WEB3FORMS_KEY` with your key
4. Messages will be emailed to you — no backend needed

## Deploy on GitHub Pages (free)

1. Create a new GitHub repo (e.g. `shaktiman-portfolio`)
2. Push this folder:

```bash
cd Portfolio-Normal
git init
git add .
git commit -m "Static portfolio site"
git branch -M main
git remote add origin https://github.com/ShaktimanSingh/shaktiman-portfolio.git
git push -u origin main
```

3. On GitHub → repo **Settings** → **Pages**
4. Source: **Deploy from branch** → branch `main` → folder `/ (root)` → Save
5. Live at: `https://shaktimansingh.github.io/shaktiman-portfolio/`

### Custom domain (optional)

In Pages settings, add your domain (e.g. `shaktiman.dev`) and point DNS to GitHub.

## Notes

- Laravel version stays at `portfolio-laravel` on GitHub to show backend skills
- This static version is for **free hosting** with no server costs
- GitHub Pages does not support PHP/Laravel — this HTML version is the production site
