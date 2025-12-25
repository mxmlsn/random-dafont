CREATE OR REPLACE FUNCTION delete_poster_image()
RETURNS TRIGGER AS $$
DECLARE
  file_path text;
BEGIN
  IF OLD.image_url LIKE '%/posters/%' THEN
    file_path := substring(OLD.image_url from '/posters/(.+)$');

    IF file_path IS NOT NULL AND file_path != '' THEN
      PERFORM storage.delete(
        bucket_id := 'posters',
        name := file_path
      );
    END IF;
  END IF;

  RETURN OLD;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS delete_poster_image_trigger ON posters;

CREATE TRIGGER delete_poster_image_trigger
  BEFORE DELETE ON posters
  FOR EACH ROW
  EXECUTE FUNCTION delete_poster_image();
