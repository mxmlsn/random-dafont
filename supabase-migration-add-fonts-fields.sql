-- Add new columns to posters table for fonts and SVG usage
-- Run this migration in your Supabase SQL Editor

-- Add fonts column (JSONB array to store font names)
ALTER TABLE posters
ADD COLUMN IF NOT EXISTS fonts JSONB DEFAULT '[]'::jsonb;

-- Add used_svg column (boolean to track if free-svg.com was used)
ALTER TABLE posters
ADD COLUMN IF NOT EXISTS used_svg BOOLEAN DEFAULT false;

-- Optional: Add comments to document the columns
COMMENT ON COLUMN posters.fonts IS 'Array of font names used in the poster';
COMMENT ON COLUMN posters.used_svg IS 'Indicates if SVG from free-svg.com was used';

-- Optional: Add index on fonts for better query performance
CREATE INDEX IF NOT EXISTS idx_posters_fonts ON posters USING GIN (fonts);
