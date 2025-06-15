# Hostinger Deployment Guide - Altiora Systems Website

## 🎯 Hostinger Deployment Strategy

### **Advantages of Using Your Hostinger Hosting:**
- ✅ You already own the domain and hosting
- ✅ No additional costs or service dependencies
- ✅ Full control over hosting environment
- ✅ Direct file upload or Git integration
- ✅ Better for long-term business control

## 📋 Pre-Deployment Setup

### **Form Backend Options for Hostinger:**

#### **Option 1: Formspree (Recommended - Easy Setup)**
1. Go to [formspree.io](https://formspree.io)
2. Create a free account (1000 submissions/month)
3. Create two forms:
   - Contact Form
   - Product Notification Form
4. Get your form IDs
5. Update the HTML files:

```html
<!-- Replace YOUR_FORM_ID with your actual Formspree form ID -->
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

#### **Option 2: EmailJS (Alternative)**
1. Go to [emailjs.com](https://emailjs.com)
2. Connect your email service
3. Set up form handling with JavaScript

#### **Option 3: Hostinger's Contact Form (If Available)**
Check if your Hostinger plan includes built-in contact form functionality.

#### **Option 4: Keep Mailto (Simplest)**
The current mailto system will work immediately - forms open the user's email client.

## 🚀 Deployment Steps for Hostinger

### **Method 1: File Manager Upload (Easiest)**

1. **Prepare files for upload:**
   ```bash
   # Create a deployment package
   zip -r altiora-website.zip . -x "*.md" "optimize-images.sh" "test-*" ".git/*"
   ```

2. **Upload via Hostinger File Manager:**
   - Log into Hostinger control panel
   - Go to File Manager
   - Navigate to public_html (or your domain folder)
   - Upload and extract the zip file
   - Ensure index.html is in the root directory

### **Method 2: FTP Upload**

1. **Get FTP credentials from Hostinger:**
   - Host: your-domain.com
   - Username: (from Hostinger panel)
   - Password: (from Hostinger panel)

2. **Upload using FTP client:**
   ```bash
   # Using command line FTP
   ftp your-domain.com
   # Enter credentials
   cd public_html
   mput *.html
   mput -r css
   mput -r js
   mput -r assets
   ```

### **Method 3: Git Integration (Advanced)**

If your Hostinger plan supports Git:
1. Push your code to GitHub/GitLab
2. Set up Git integration in Hostinger
3. Configure automatic deployments

## 📂 File Structure on Hostinger

Your `public_html` folder should look like:
```
public_html/
├── index.html
├── about.html
├── contact.html
├── products.html
├── thank-you.html
├── 404.html
├── sitemap.xml
├── robots.txt
├── manifest.json
├── _redirects (may not work on all Hostinger plans)
├── css/
├── js/
└── assets/
```

## ⚙️ Hostinger-Specific Configuration

### **1. Set up Custom Error Pages:**
In Hostinger control panel:
- Go to Advanced → Error Pages
- Set 404 error page to `/404.html`

### **2. Configure Redirects (if supported):**
Check if your plan supports .htaccess redirects:

```apache
# .htaccess file for redirects
RewriteEngine On

# Redirect /home to /
RewriteRule ^home/?$ / [R=301,L]

# Force HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

### **3. Security Headers (if supported):**
Add to .htaccess:
```apache
# Security headers
Header always set X-Frame-Options DENY
Header always set X-Content-Type-Options nosniff
Header always set X-XSS-Protection "1; mode=block"
```

## 🔧 Form Setup Instructions

### **Setting up Formspree (Recommended):**

1. **Create Formspree account:**
   - Go to formspree.io
   - Sign up with your email

2. **Create Contact Form:**
   - Click "New Form"
   - Name: "Altiora Contact Form"
   - Copy the form ID (e.g., `xpzgkdqw`)

3. **Create Notification Form:**
   - Click "New Form" 
   - Name: "Product Notifications"
   - Copy the form ID

4. **Update your HTML files:**
   Replace `YOUR_FORM_ID` in contact.html and products.html with your actual form IDs.

5. **Test the forms:**
   After deployment, submit test forms to verify they work.

## 🌐 Domain and SSL Setup

### **If using subdomain (e.g., staging.yourdomain.com):**
1. Create subdomain in Hostinger panel
2. Point subdomain to the website files
3. Enable SSL for subdomain

### **If using main domain:**
1. Ensure domain points to Hostinger
2. SSL should be automatically enabled
3. Test https://yourdomain.com

## 📊 Testing Checklist After Deployment

### **Functionality Tests:**
- [ ] All pages load correctly
- [ ] Mobile menu works on all devices
- [ ] Forms submit successfully (or open email client)
- [ ] All internal links work
- [ ] External social media links work
- [ ] Images load properly
- [ ] Site works on mobile devices

### **Performance Tests:**
- [ ] Run Google PageSpeed Insights
- [ ] Test loading speed
- [ ] Verify mobile responsiveness
- [ ] Check for broken images or links

### **SEO Tests:**
- [ ] Verify sitemap.xml is accessible
- [ ] Check robots.txt
- [ ] Test social media preview (Facebook debugger)
- [ ] Verify meta tags are working

## 🔍 Troubleshooting Common Issues

### **Forms not working:**
- Verify Formspree form IDs are correct
- Check that form method is POST
- Ensure action URL is correct

### **Images not loading:**
- Check file paths are relative
- Verify images uploaded to correct folder
- Check file permissions

### **CSS/JS not loading:**
- Verify file paths in HTML
- Check file permissions
- Clear browser cache

### **404 errors:**
- Ensure all files uploaded to correct locations
- Check that index.html is in root directory
- Verify internal links use correct paths

## 💡 Performance Optimization for Hostinger

### **Image Optimization:**
```bash
# Run the image optimization script
./optimize-images.sh

# Then upload optimized images to replace originals
```

### **Enable Gzip Compression:**
Add to .htaccess (if supported):
```apache
# Enable compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>
```

## 📈 Post-Deployment Monitoring

### **Set up monitoring:**
- Google Analytics (optional)
- Google Search Console
- Form submission tracking
- Monitor site uptime

### **Regular maintenance:**
- Update copyright year annually
- Monitor form submissions
- Keep content updated
- Regular security updates

---

## 🎉 Ready for Hostinger Deployment!

Your website is fully prepared for Hostinger hosting. The main steps are:

1. **Set up form backend** (Formspree recommended)
2. **Upload files** to public_html
3. **Configure domain/SSL**
4. **Test everything**
5. **Monitor and maintain**

**Estimated deployment time:** 30-60 minutes  
**Technical complexity:** Low to Medium  
**Business impact:** Immediate professional web presence
