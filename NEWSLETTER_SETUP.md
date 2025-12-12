# Newsletter Google Sheets Setup Guide

## Current Status
✅ Newsletter form is connected to your existing Google Sheets script
✅ Uses the same script URL as your contact form

## How It Works
When someone subscribes:
1. They enter their email
2. Email is sent to your Google Sheet
3. Success message appears
4. Form resets automatically

## Setup Instructions

### Option 1: Use Same Sheet as Contact Form (Easiest)
Your newsletter is already connected! Emails will appear in the same Google Sheet as contact messages.

**To separate them:**
1. Open your Google Sheet
2. Add a new column called "Type" 
3. The script will automatically mark newsletter emails

### Option 2: Create Separate Sheet for Newsletter

1. **Create New Google Sheet**
   - Go to https://sheets.google.com
   - Create new sheet named "Newsletter Subscribers"
   - Add column header: `Email` in cell A1

2. **Create Google Apps Script**
   - In your sheet, click `Extensions` → `Apps Script`
   - Delete existing code and paste:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = e.parameter;
  
  // Add timestamp
  var timestamp = new Date();
  
  // Append data to sheet
  sheet.appendRow([
    timestamp,
    data.Email
  ]);
  
  return ContentService.createTextOutput(JSON.stringify({result: "success"}))
    .setMimeType(ContentService.MimeType.JSON);
}
```

3. **Deploy Script**
   - Click `Deploy` → `New deployment`
   - Click gear icon → Select `Web app`
   - Execute as: `Me`
   - Who has access: `Anyone`
   - Click `Deploy`
   - Copy the Web app URL

4. **Update Your Portfolio**
   - Open `script.js`
   - Find line: `const newsletterScriptURL = '...'`
   - Replace with your new URL

## Testing
1. Go to your portfolio
2. Scroll to "Stay Updated" section
3. Enter test email
4. Click Subscribe
5. Check your Google Sheet - email should appear!

## Current Configuration
- **Form Name**: `newsletter-subscription`
- **Field Name**: `Email`
- **Script URL**: Same as contact form (currently)
- **Success Message**: "✅ Thanks for subscribing!"
- **Error Message**: "❌ Subscription failed!"

## Troubleshooting

**Email not appearing in sheet?**
- Check script URL is correct
- Make sure sheet column is named "Email" (capital E)
- Check browser console for errors (F12)

**Getting CORS error?**
- Redeploy the script
- Make sure "Who has access" is set to "Anyone"

**Want to send confirmation emails?**
You'll need to add email sending code to the Google Apps Script (requires Gmail API setup)

## Next Steps (Optional)
- Set up email confirmation for subscribers
- Create email templates for updates
- Export subscriber list for email campaigns
- Add unsubscribe functionality

---

**Need help?** The newsletter is already working with your current setup!
