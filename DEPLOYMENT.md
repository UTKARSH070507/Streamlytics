# 🚀 Deployment Guide - Streamlytics

Comprehensive guide to deploy your Netflix Analytics Dashboard to various hosting platforms.

## 📋 Pre-Deployment Checklist

Before deploying, ensure:

```bash
# 1. Build the project
npm run build

# 2. Verify build succeeded
ls -la dist/

# 3. Test the build locally
npm run preview

# 4. Check for errors in console
# No errors should appear in browser dev console

# 5. Test all features work
# - Load home page
# - Navigate to dashboard
# - Apply filters
# - Check all charts load
```

## 🏗️ Build Output Structure

After `npm run build`, your `dist/` folder contains:

```
dist/
├── index.html           # Main HTML file
├── assets/
│   ├── index-XXXX.js    # Bundled JavaScript
│   └── index-XXXX.css   # Bundled CSS
└── Netflix_Refined_Final.xlsx  # Dataset (if copied)
```

## 🌐 Deployment Platforms

### Option 1: Vercel (⭐ Recommended - Easiest)

Vercel is the creator of Next.js and offers excellent support for Vite apps.

#### Step 1: Create Vercel Account

1. Go to [https://vercel.com](https://vercel.com)
2. Sign up with GitHub, GitLab, or Bitbucket
3. Or use email signup

#### Step 2: Deploy with Git (Easiest)

```bash
# 1. Initialize Git repository
git init
git add .
git commit -m "Initial commit: Streamlytics Dashboard"

# 2. Push to GitHub
# Create repo on GitHub first, then:
git remote add origin https://github.com/yourusername/streamlytics.git
git branch -M main
git push -u origin main

# 3. Import in Vercel
# Go to vercel.com → Import Project
# Select your GitHub repository
# Vercel will auto-detect Vite and deploy!
```

#### Step 3: Verify Deployment

- Vercel creates production URL automatically
- Auto-deploys on every push to main branch
- Custom domain support available

#### Deployment Time

- First deploy: 2-3 minutes
- Subsequent deploys: 30-60 seconds

### Option 2: Netlify

Great alternative with excellent developer experience.

#### Step 1: Install Netlify CLI

```bash
npm install -g netlify-cli
```

#### Step 2: Build Project

```bash
npm run build
```

#### Step 3: Deploy

```bash
# Method 1: Interactive
netlify deploy --prod --dir=dist

# Method 2: With specific site
netlify deploy --prod --dir=dist --site=your-site-id
```

#### Step 4: Configure

1. Go to [https://app.netlify.com](https://app.netlify.com)
2. Connect your repository
3. Set build command: `npm run build`
4. Set publish directory: `dist`

### Option 3: GitHub Pages

Free hosting through GitHub.

#### Step 1: Create GitHub Repository

```bash
# Initialize and push
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/streamlytics.git
git push -u origin main
```

#### Step 2: Update vite.config.js

```javascript
export default {
  base: "/streamlytics/", // Add this line
  // ... rest of config
};
```

#### Step 3: Deploy

```bash
npm run build
# Manually upload dist/ contents to GitHub Pages
# Or use gh-pages package
npm install --save-dev gh-pages
```

#### Step 4: Enable Pages

1. Go to repository Settings
2. Scroll to "Pages"
3. Select "main" branch as source
4. Set folder to "/docs" or use gh-pages branch

### Option 4: Traditional Web Host (Shared Hosting)

For traditional FTP hosting:

#### Step 1: Build Project

```bash
npm run build
```

#### Step 2: Upload via FTP

- Connect to server with FTP client
- Navigate to `public_html` or web root
- Upload contents of `dist/` folder
- Ensure Excel file is in root

#### Step 3: Configure Server (if needed)

- Ensure 404s redirect to index.html
- Set correct MIME types for assets
- Enable gzip compression

### Option 5: Docker Deployment

For containerized deployment:

#### Create Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

FROM node:18-alpine
RUN npm install -g serve

WORKDIR /app

COPY --from=0 /app/dist ./dist

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]
```

#### Build and Deploy

```bash
# Build image
docker build -t streamlytics .

# Run container
docker run -p 3000:3000 streamlytics
```

### Option 6: AWS S3 + CloudFront

For enterprise deployments:

#### Step 1: Build Project

```bash
npm run build
```

#### Step 2: Create S3 Bucket

```bash
aws s3 mb s3://streamlytics-dashboard
```

#### Step 3: Upload Files

```bash
aws s3 sync dist/ s3://streamlytics-dashboard/
```

#### Step 4: Configure CloudFront

- Create distribution pointing to S3
- Set default root to index.html
- Configure error pages

## 🔧 Environment Variables

Create `.env.production` for production settings:

```
VITE_API_URL=https://api.example.com
VITE_APP_NAME=Streamlytics
```

Access in components:

```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

## 🔐 Security Considerations

1. **Remove Sensitive Data**
   - Don't commit .env files with secrets
   - Use environment variables
   - Never expose API keys in code

2. **CORS Headers**
   - If using API, configure CORS properly
   - Excel file loads locally, no CORS issues

3. **Content Security Policy**
   - Add CSP headers in production
   - Restrict resource loading

4. **HTTPS**
   - Always use HTTPS
   - All hosting platforms support it

## 📊 Performance Optimization for Production

### Enable Compression

In deployment config, enable gzip/brotli compression.

### Set Cache Headers

```
# Static assets (forever)
max-age=31536000

# HTML files (1 day)
max-age=86400
```

### Monitor Performance

- Use Lighthouse (Chrome DevTools)
- Monitor Core Web Vitals
- Track user analytics

## ✅ Post-Deployment Checklist

After deploying:

- [ ] App loads without errors
- [ ] Home page renders correctly
- [ ] Dashboard page loads
- [ ] Data loads from Excel file
- [ ] Charts render with data
- [ ] Filters work correctly
- [ ] Cross-filtering works
- [ ] World map displays
- [ ] Animations are smooth
- [ ] Responsive on mobile
- [ ] No console errors
- [ ] Performance is acceptable
- [ ] All links work
- [ ] Images load correctly

## 🚨 Troubleshooting Deployments

### Issue: "Cannot find module"

**Solution**: Ensure all dependencies are listed in package.json and npm install was run.

### Issue: Excel file not found

**Solution**: Ensure Netflix_Refined_Final.xlsx is copied to dist/public/ folder before deployment.

### Issue: Routes not working

**Solution**: Configure server to route all requests to index.html (SPA routing).

### Issue: Styles not loading

**Solution**: Check if base path is correct in vite.config.js for subdirectory deployments.

### Issue: Slow performance

**Solution**:

- Enable compression
- Optimize images
- Check bundle size with `npm run build`
- Use production build, not dev build

## 📈 Performance Targets

After optimization, aim for:

- **Lighthouse Score**: 90+
- **First Contentful Paint**: < 1s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Bundle Size**: < 500KB gzipped

## 🔄 Continuous Deployment

### GitHub Actions (Vercel/Netlify)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: "18"
      - run: npm install
      - run: npm run build
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

## 📝 Environment-Specific Builds

### Development

```bash
npm run dev
```

### Staging

```bash
npm run build
NODE_ENV=staging npm run preview
```

### Production

```bash
NODE_ENV=production npm run build
```

## 🎯 Recommended Deployment Stack

For best results, we recommend:

1. **Hosting**: Vercel (easiest, fastest)
2. **CDN**: Vercel's built-in CDN
3. **Monitoring**: Vercel Analytics
4. **CI/CD**: GitHub Actions via Vercel

## 📞 Support for Each Platform

- **Vercel**: https://vercel.com/docs
- **Netlify**: https://docs.netlify.com/
- **GitHub Pages**: https://pages.github.com/
- **AWS**: https://aws.amazon.com/documentation/

## 🎉 Deployment Success!

Once deployed successfully:

- Share the live URL
- Monitor performance
- Update regularly with new features
- Gather user feedback

---

**Your Streamlytics Dashboard is now live! 🚀**
