# 🌐 HOSTINGER DEPLOYMENT GUIDE
**Complete Setup Instructions for Altiora Systems Website**

---

## 🎯 **HOSTINGER DEPLOYMENT OVERVIEW**

### **Why Hostinger is Perfect for Altiora Systems:**
- ✅ You already own the domain and hosting
- ✅ No additional monthly costs
- ✅ Full control over hosting environment
- ✅ Direct file management capabilities
- ✅ Apache server with .htaccess support

---

## 📋 **PRE-DEPLOYMENT SETUP**

### **Form Backend Configuration**

#### **Google Sheets Integration (Recommended)**
1. **Create Google Sheet:** "Altiora Website Forms"
2. **Set up two sheets within the workbook:**

**Sheet 1: Contact Forms**
```
Column A: Timestamp
Column B: Name  
Column C: Email
Column D: Subject
Column E: Message
Column F: Agree to Communications
```

**Sheet 2: Product Notifications**
```
Column A: Timestamp
Column B: Email
```

3. **Google Apps Script Setup:**
   - In Google Sheet: Extensions → Apps Script
   - Replace default code with the script provided in GOOGLE_SHEETS_SETUP.md
   - Deploy as web app with "Anyone" access
   - Copy the deployment URL

4. **Update Website Forms:**
   Replace `YOUR_GOOGLE_SHEETS_SCRIPT_URL` in:
   - `contact.html` (line 89)
   - `products.html` (line 90)

---

## 🚀 **HOSTINGER DEPLOYMENT METHODS**

### **Method 1: File Manager Upload (Recommended)**

#### **Step 1: Prepare Files**
Create deployment package excluding documentation:
```bash
# Files to include:
✅ All HTML files (index, about, products, contact, thank-you, 404)
✅ css/ folder (complete)
✅ js/ folder (complete)
✅ assets/ folder (complete)
✅ Configuration files (sitemap.xml, robots.txt, manifest.json, .htaccess)

# Files to exclude:
❌ Documents/ folder
❌ test-mobile-menu.html
❌ optimize-images.sh
❌ All .md files
```

#### **Step 2: Upload to Hostinger**
1. **Login to Hostinger hPanel**
2. **Navigate to File Manager**
3. **Go to public_html directory**
4. **Upload all prepared files**
5. **Maintain folder structure**

### **Method 2: FTP Upload (Advanced)**

#### **FTP Settings:**
- **Host:** Your domain name or FTP server
- **Username:** Your Hostinger FTP username  
- **Password:** Your FTP password
- **Port:** 21 (standard) or 22 (SFTP)

#### **Upload Process:**
1. **Connect via FTP client** (FileZilla recommended)
2. **Navigate to public_html directory**
3. **Upload all website files maintaining structure**
4. **Set proper file permissions** (644 for files, 755 for folders)

---

## 🔧 **POST-DEPLOYMENT CONFIGURATION**

### **Apache Configuration (.htaccess)**
Your website includes optimized .htaccess file with:
- **Security headers** (XSS protection, content type validation)
- **Performance optimization** (compression, caching)
- **HTTPS enforcement** (SSL redirection)
- **URL rewriting** (clean URLs)

### **SSL Certificate Setup**
1. **Hostinger typically provides free SSL**
2. **Verify SSL is active** in hPanel
3. **Test HTTPS redirection** after deployment

### **Domain Configuration**
1. **Ensure domain points to Hostinger nameservers**
2. **Verify www/non-www redirection** works correctly
3. **Test subdomain accessibility** if applicable

---

## 🧪 **TESTING CHECKLIST**

### **Functionality Testing**
- [ ] **Homepage loads** correctly
- [ ] **All pages accessible** via navigation
- [ ] **Mobile menu** opens and closes properly
- [ ] **Contact form** submits successfully
- [ ] **Product notification form** works
- [ ] **Thank you page** displays after form submission
- [ ] **404 page** shows for invalid URLs

### **Performance Testing**
- [ ] **Images load** quickly and correctly
- [ ] **Favicon displays** in browser tab
- [ ] **CSS styles** apply properly
- [ ] **JavaScript functionality** works
- [ ] **Mobile responsiveness** verified

### **Form Integration Testing**
- [ ] **Google Sheets** receives form submissions
- [ ] **Email notifications** work (if configured)
- [ ] **Form validation** prevents invalid submissions
- [ ] **Fallback system** works if Google Sheets fails

---

## 🔍 **TROUBLESHOOTING**

### **Common Issues & Solutions**

#### **Forms Not Working:**
- ✅ Verify Google Apps Script deployment URL is correct
- ✅ Check script has "Anyone" access permissions
- ✅ Test script URL directly in browser
- ✅ Verify form action URLs in HTML match script URL

#### **Images Not Loading:**
- ✅ Check file paths are correct (case-sensitive)
- ✅ Verify assets/ folder uploaded completely
- ✅ Check file permissions (644 for images)
- ✅ Clear browser cache

#### **CSS/JS Not Loading:**
- ✅ Verify folder structure maintained during upload
- ✅ Check file permissions (644 for files, 755 for folders)
- ✅ Test direct file URLs in browser
- ✅ Clear browser cache

#### **SSL/HTTPS Issues:**
- ✅ Verify SSL certificate is active in Hostinger
- ✅ Check .htaccess HTTPS redirection rules
- ✅ Test both www and non-www versions
- ✅ Clear browser cache and test in incognito

### **Performance Optimization**
- ✅ Enable Hostinger's CDN if available
- ✅ Verify .htaccess compression settings work
- ✅ Check browser caching headers
- ✅ Test with Google PageSpeed Insights

---

## 📞 **SUPPORT RESOURCES**

### **Hostinger Support:**
- **Knowledge Base:** help.hostinger.com
- **Live Chat:** Available 24/7 in hPanel
- **Email Support:** Via hPanel ticket system

### **Website-Specific Support:**
- **Google Sheets Setup:** See GOOGLE_SHEETS_SETUP.md
- **Deployment Issues:** Follow troubleshooting section above
- **Performance Questions:** Run Google PageSpeed Insights test

---

## 🎉 **SUCCESS METRICS**

### **Deployment Success Indicators:**
- ✅ All pages load within 3 seconds
- ✅ Mobile menu functions smoothly
- ✅ Forms submit successfully to Google Sheets
- ✅ Favicon displays in browser tabs
- ✅ SSL certificate shows secure connection
- ✅ Search engines can crawl the site

### **Business Success Indicators:**
- ✅ Professional appearance builds credibility
- ✅ Lead capture forms generate inquiries
- ✅ Mobile experience engages users
- ✅ SEO optimization improves visibility
- ✅ Fast loading speed retains visitors

---

**Your Altiora Systems website is ready for professional deployment on Hostinger! 🚀**

*Follow this guide step-by-step for a successful launch.*
