# Amber Lynn Portfolio

Static website: plain HTML, CSS and JavaScript. No build step, nothing to install.

```
index.html        the page
css/styles.css    all styles
js/main.js        gallery filters, click-to-enlarge, inquiry form, copy email
img/              photos and the favicon
netlify.toml      Netlify settings (optional, safe to keep)
.nojekyll         tells GitHub Pages to serve the files as they are
```

## Preview on your computer
Double-click `index.html` to open it in a browser.

## Put it on GitHub
1. Sign in at github.com and click **New repository**. Name it, for example, `amber-lynn-site`, and click **Create repository**.
2. On the new repository page, click **uploading an existing file**.
3. Drag in everything inside this folder (`index.html`, `css`, `js`, `img`, `netlify.toml`, `README.md`, `.nojekyll`), then click **Commit changes**.

## Publish with GitHub Pages (free)
1. In the repository, open **Settings → Pages**.
2. Under **Branch**, choose `main` and `/ (root)`, then **Save**.
3. After a minute or two the site is live at `https://YOUR-USERNAME.github.io/amber-lynn-site/`.

## Or publish with Netlify (free)
- **Quickest:** go to app.netlify.com/drop and drag this whole folder onto the page.
- **Linked to GitHub (updates automatically):** in Netlify choose **Add new site → Import an existing project → GitHub**, pick the repository, leave the build command empty and the publish directory as `.`, then **Deploy**.

## Custom domain
Both GitHub Pages (Settings → Pages → Custom domain) and Netlify (Domain management) let you connect a domain such as amberlynn.art.

## Updating the site
Replace or add photos in `img/`, edit text in `index.html`, then upload the changed files to GitHub again. Netlify redeploys on its own when it is linked to the repository.
