# Cloudinary Usage in Konjyosom Tech Solutions

## What is Cloudinary Used For?

Cloudinary is a **cloud-based image/video management service** used in this project for:

### 1. Image Uploads (Primary Use)
| Feature | Files Uploaded | Where Used |
|---------|---------------|------------|
| **Job Photos** | Before/after work photos | Technician uploads from job site |
| **Booking Photos** | Customer-submitted site photos | Booking form |
| **Quotation Files** | Floor plans, requirements | Quotation request |
| **Project Images** | Portfolio showcase images | Admin CMS |
| **Website Assets** | Logo, favicon, hero images | Website CMS |
| **Technician Avatars** | Profile pictures | Technician profiles |

### 2. Why Cloudinary Instead of Local Storage?

| Local Storage | Cloudinary |
|-------------|------------|
| ❌ Server disk fills up | ✅ Unlimited cloud storage |
| ❌ Slow on Render free tier | ✅ CDN delivery (fast worldwide) |
| ❌ Manual backup needed | ✅ Automatic backup & versioning |
| ❌ No image optimization | ✅ Auto-resize, compress, format |
| ❌ No image transformations | ✅ Crop, rotate, watermark, etc. |

### 3. How It Works in This Project

```
User uploads photo → Backend receives file → Uploads to Cloudinary → 
Gets URL back → Saves URL to MongoDB → Serves URL to frontend
```

### 4. API Endpoints Using Cloudinary

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/upload/image` | POST | Single image upload |
| `/api/upload/images` | POST | Multiple images (up to 10) |
| `/api/upload/:publicId` | DELETE | Delete image from Cloudinary |

### 5. Code Example (Backend)

```javascript
// Upload image to Cloudinary
const cloudinary = require('./config/cloudinary');

const result = await cloudinary.uploader.upload(file.path, {
    folder: 'konjyosomtech/jobs',     // Organized folders
    use_filename: true,               // Keep original name
    unique_filename: true,            // Add unique suffix
    transformation: [
        { width: 1200, crop: 'limit' }, // Auto-resize
        { quality: 'auto' }              // Auto-compress
    ]
});

// Returns:
// result.secure_url  → https://res.cloudinary.com/.../image.jpg
// result.public_id   → konjyosomtech/jobs/abc123
```

### 6. Frontend Usage

```javascript
// Display uploaded image
<img src="https://res.cloudinary.com/your-cloud/image/upload/v123/photo.jpg" />

// With automatic optimization (Cloudinary URL format)
<img src="https://res.cloudinary.com/your-cloud/image/upload/w_400,q_auto/photo.jpg" />
// w_400 = width 400px, q_auto = automatic quality
```

### 7. Folder Structure in Cloudinary

```
konjyosomtech/
├── jobs/              # Work order before/after photos
├── bookings/          # Customer booking photos
├── quotations/        # Quotation attachment files
├── projects/          # Portfolio project images
├── website/           # Logo, hero images, favicon
├── technicians/       # Technician profile photos
└── temp/              # Temporary uploads
```

### 8. Free Tier Limits (Cloudinary)

| Plan | Storage | Bandwidth | Transformations |
|------|---------|-----------|-----------------|
| **Free** | 25 GB | 25 GB/month | 25,000/month |
| Paid | Unlimited | Unlimited | Unlimited |

**For a small business like Konjyosom Tech, the free tier is sufficient.**

### 9. Setup Steps

1. **Sign up** at [cloudinary.com](https://cloudinary.com)
2. **Get your credentials** from Dashboard:
   - Cloud Name
   - API Key
   - API Secret
3. **Add to `.env`:**
   ```
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   ```
4. **Done!** Images upload automatically when technicians/ customers submit forms.

### 10. Alternative: If You Don't Want Cloudinary

You can modify the code to use **local storage only** (not recommended for Render free tier):

1. Remove `cloudinary` package
2. Use `multer` to save files to `/uploads/` folder
3. Serve static files via Express: `app.use('/uploads', express.static('uploads'))`
4. **Warning:** Files will be lost on Render free tier (ephemeral filesystem)

---

**Recommendation:** Use Cloudinary for production. It's free, fast, and reliable.
