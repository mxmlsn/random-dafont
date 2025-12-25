# Database Migration Instructions

## New Fields Added to Posters Table

To support the new poster submission form, you need to add two new columns to the `posters` table in Supabase.

### Required Changes

1. **fonts** (JSONB) - Stores an array of font names used in the poster
2. **used_svg** (BOOLEAN) - Indicates if SVG from free-svg.com was used

### How to Apply Migration

#### Option 1: Supabase Dashboard (Recommended)

1. Open your Supabase project dashboard
2. Navigate to **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy and paste the contents of `supabase-migration-add-fonts-fields.sql`
5. Click **Run** to execute the migration

#### Option 2: Supabase CLI

```bash
# If you have Supabase CLI installed
supabase db push
```

### Migration SQL

The migration file (`supabase-migration-add-fonts-fields.sql`) contains:

```sql
-- Add fonts column (JSONB array to store font names)
ALTER TABLE posters
ADD COLUMN IF NOT EXISTS fonts JSONB DEFAULT '[]'::jsonb;

-- Add used_svg column (boolean to track if free-svg.com was used)
ALTER TABLE posters
ADD COLUMN IF NOT EXISTS used_svg BOOLEAN DEFAULT false;
```

### Verify Migration

After running the migration, verify the changes:

```sql
-- Check table structure
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'posters'
ORDER BY ordinal_position;
```

Expected columns:
- `id` (bigint, primary key)
- `created_at` (timestamp with time zone)
- `instagram` (text, nullable)
- `image_url` (text, not null)
- `status` (text, default: 'pending')
- `fonts` (jsonb, default: '[]')
- `used_svg` (boolean, default: false)

### Rollback (if needed)

If you need to rollback the migration:

```sql
ALTER TABLE posters DROP COLUMN IF EXISTS fonts;
ALTER TABLE posters DROP COLUMN IF EXISTS used_svg;
```

## Changes Made in This Update

### Backend API (`api/submit-poster.js`)
- Removed `nickname` field requirement
- Added support for `fonts` array
- Added support for `usedSvg` boolean
- Updated Telegram notifications to include new fields
- Instagram now stored without @ symbol (added in frontend only)

### Frontend
- Form now collects Instagram (optional), fonts (up to 10), and SVG checkbox
- Dynamic font input fields with add/remove buttons
- Anonymous submission flow with confirmation
- Updated poster display to show only Instagram handle on thumbnails
- Lightbox info box now shows fonts and SVG badge in bottom-left corner (240px wide)

### Database Schema
- `nickname` column can be dropped (no longer used)
- `instagram` column stores username without @ prefix
- `fonts` column stores array of font names as JSONB
- `used_svg` column stores boolean flag
