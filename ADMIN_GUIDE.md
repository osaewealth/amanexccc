# 🎯 **Amanex Admin Dashboard - User Guide**

## 🚀 **What This Solves**

**Before**: You had to edit HTML code every time you wanted to:
- Add new job openings
- Update existing job details
- Add blog posts
- Edit blog content
- Change job requirements

**After**: You can now manage all content through a simple web interface - no coding required!

## 🔐 **How to Access**

1. **Go to**: `yourwebsite.com/admin`
2. **Password**: `amanex2025`
3. **Click**: "Login"

## 📋 **Managing Job Openings**

### **Adding a New Job**
1. Click **"Add New Job Opening"**
2. Fill in the form:
   - **Job Title**: e.g., "Marketing Manager"
   - **Department**: e.g., "Marketing"
   - **Location**: e.g., "Accra, Ghana"
   - **Employment Type**: e.g., "Full-time"
   - **Experience Required**: e.g., "3-5 years"
   - **Job Description**: Detailed description of the role
   - **Requirements**: One requirement per line
   - **Responsibilities**: One responsibility per line
3. Click **"Add Job"**

### **Editing a Job**
1. Find the job in the list
2. Click the **Edit** button (pencil icon)
3. Make your changes
4. Click **"Update Job"**

### **Deleting a Job**
1. Find the job in the list
2. Click the **Delete** button (trash icon)
3. Confirm deletion

## 📝 **Managing Blog Posts**

### **Adding a New Blog Post**
1. Click **"Add New Blog Post"**
2. Fill in the form:
   - **Blog Title**: e.g., "New Product Launch"
   - **Category**: e.g., "Company News"
   - **Date**: Select publication date
   - **Image URL**: Link to the blog image
   - **Blog Excerpt**: Short summary (2-3 sentences)
   - **Blog Content**: Full article content
   - **Publish immediately**: Check to publish right away
3. Click **"Add Blog"**

### **Editing a Blog Post**
1. Find the blog post in the list
2. Click the **Edit** button (pencil icon)
3. Make your changes
4. Click **"Update Blog"**

### **Deleting a Blog Post**
1. Find the blog post in the list
2. Click the **Delete** button (trash icon)
3. Confirm deletion

## 🔄 **How It Works**

- **Data Storage**: All content is stored in your browser's localStorage
- **Real-time Updates**: Changes appear immediately on your website
- **No Database Required**: Simple and lightweight solution
- **Backup**: Data persists even if you close the browser

## 🎨 **Features**

### **Job Management**
- ✅ Add/Edit/Delete job openings
- ✅ Rich text formatting for descriptions
- ✅ Requirements and responsibilities lists
- ✅ Department and location categorization
- ✅ Experience level specification

### **Blog Management**
- ✅ Add/Edit/Delete blog posts
- ✅ Category organization
- ✅ Publication date control
- ✅ Draft/Published status
- ✅ Image URL support
- ✅ Excerpt and full content

### **User Experience**
- ✅ Simple, intuitive interface
- ✅ Tab-based navigation
- ✅ Form validation
- ✅ Confirmation dialogs
- ✅ Responsive design

## 🚨 **Important Notes**

1. **Password Security**: Change the default password (`amanex2025`) in the code for production
2. **Data Backup**: Consider exporting data regularly
3. **Image URLs**: Use full URLs for blog images (e.g., `https://example.com/image.jpg`)
4. **Content Formatting**: Use plain text for now (HTML support can be added later)

## 🔧 **Customization Options**

### **Change Admin Password**
Edit `client/src/pages/admin.tsx` and change:
```typescript
const ADMIN_PASSWORD = 'your-new-password';
```

### **Add More Fields**
You can easily add more fields to job openings or blog posts by:
1. Updating the interface definitions
2. Adding form fields
3. Updating the display components

### **Add More Content Types**
The same pattern can be used to add:
- Product management
- Team member profiles
- Company news
- Customer testimonials

## 📱 **Mobile Friendly**

The admin dashboard works perfectly on:
- Desktop computers
- Tablets
- Mobile phones

## 🆘 **Troubleshooting**

### **Can't Access Admin Page**
- Check if the route `/admin` is working
- Verify the password is correct
- Clear browser cache and try again

### **Changes Not Appearing**
- Refresh the page
- Check if data is saved in localStorage
- Verify the form submission was successful

### **Data Lost**
- Check if localStorage is enabled in your browser
- Data persists between browser sessions
- Consider implementing a backup system

## 🚀 **Next Steps**

1. **Test the System**: Add a few job openings and blog posts
2. **Customize**: Adjust fields and styling as needed
3. **Train Your Team**: Show others how to use the dashboard
4. **Enhance**: Add more features like image uploads, rich text editing, etc.

## 💡 **Pro Tips**

- **Regular Updates**: Keep job openings current and relevant
- **Blog Consistency**: Maintain a regular posting schedule
- **Content Quality**: Write clear, engaging descriptions
- **SEO Friendly**: Use relevant keywords in titles and descriptions

---

**🎉 Congratulations!** You now have a professional content management system that makes updating your website as easy as filling out a form. No more coding required!
