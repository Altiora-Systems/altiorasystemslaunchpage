# 📊 Google Sheets Form Integration Guide - Altiora Systems

## 🎯 Setup Google Sheets to Receive Form Submissions

### **Step 1: Create Google Sheets**

1. **Go to [sheets.google.com](https://sheets.google.com)**
2. **Create a new sheet:** "Altiora Website Forms"
3. **Set up two sheets within the workbook:**

#### **Sheet 1: Contact Forms**
```
Column A: Timestamp
Column B: Name  
Column C: Email
Column D: Subject
Column E: Message
Column F: Agree to Communications
```

#### **Sheet 2: Product Notifications**
```
Column A: Timestamp
Column B: Email
```

### **Step 2: Create Google Apps Script**

1. **In your Google Sheet, go to Extensions → Apps Script**
2. **Replace the default code with this:**

```javascript
function doPost(e) {
  try {
    // Get the active spreadsheet
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    
    // Parse the form data
    var data = JSON.parse(e.postData.contents);
    
    // Determine which sheet to use based on form type
    var sheet;
    var row = [];
    
    if (data.subject) {
      // Contact form
      sheet = ss.getSheetByName('Contact Forms');
      row = [
        new Date(),
        data.name || '',
        data.email || '',
        data.subject || '',
        data.message || '',
        data.agreeComms ? 'Yes' : 'No'
      ];
    } else {
      // Product notification form
      sheet = ss.getSheetByName('Product Notifications');
      row = [
        new Date(),
        data.email || ''
      ];
    }
    
    // Add the data to the sheet
    sheet.appendRow(row);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        'result': 'success',
        'message': 'Form submitted successfully'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        'result': 'error',
        'message': error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput("Google Apps Script is working!")
    .setMimeType(ContentService.MimeType.TEXT);
}
```

### **Step 3: Deploy the Script**

1. **Click "Deploy" → "New deployment"**
2. **Set type:** "Web app"
3. **Execute as:** "Me"
4. **Who has access:** "Anyone"
5. **Click "Deploy"**
6. **Copy the Web App URL** (looks like: `https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec`)

### **Step 4: Update Your Website**

**Replace `YOUR_GOOGLE_SHEETS_SCRIPT_URL` in your HTML files with your actual script URL:**

- **contact.html:** Line 89
- **products.html:** Line 90

### **Step 5: Test the Integration**

1. **Deploy your website to Hostinger**
2. **Submit a test form**
3. **Check your Google Sheet** - you should see the data appear!

---

## 🔧 JavaScript Form Handling

The existing JavaScript in `contact.js` and `products.js` will automatically:
- ✅ Handle form validation
- ✅ Submit to Google Sheets
- ✅ Redirect to thank-you page on success
- ✅ Fall back to mailto if Google Sheets fails

---

## 📈 Benefits of Google Sheets Integration

### **Advantages:**
- ✅ **Free** - No monthly costs
- ✅ **Real-time data** - See submissions instantly
- ✅ **Easy analysis** - Built-in charts and filtering
- ✅ **Email notifications** - Get notified of new submissions
- ✅ **Export options** - Download as CSV, Excel, etc.
- ✅ **Collaboration** - Share with team members

### **Features:**
- **Automatic timestamps** for all submissions
- **Organized data** in separate sheets
- **No submission limits** (unlike free Formspree)
- **Full control** over your data

---

## 🚀 Ready to Deploy!

Once you've completed the Google Sheets setup:

1. **Update the form action URLs** with your script URL
2. **Upload all files to Hostinger**
3. **Test the forms**
4. **Go live!** 🎉

Your forms will now send data directly to your Google Sheets while providing a professional user experience.

---

## 🔍 Troubleshooting

**If forms don't work:**
1. Check that the Google Apps Script is deployed as "Anyone" access
2. Verify the script URL is correct in your HTML files
3. Test the script URL directly in browser (should show "Google Apps Script is working!")
4. Check the Google Apps Script logs for errors
