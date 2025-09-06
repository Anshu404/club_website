import os
import sys
from PIL import Image

def process_images(root_folder=".", quality=40):
    """
    Recursively finds ALL images (PNG, JPG, etc.), converts them to a
    new compressed JPG with a lowercase .jpg extension, and replaces the original.
    """
    print(f"🐍 Running with Python executable: {sys.executable}")
    print("-" * 30)

    converted_count = 0
    recompressed_count = 0
    skipped_count = 0
    
    # Define all valid image extensions we want to process (all lowercase)
    valid_extensions = {".png", ".jpg", ".jpeg", ".webp", ".bmp", ".tiff"}

    for subdir, _, files in os.walk(root_folder):
        for file in files:
            if file.startswith('.'):
                continue

            filepath = os.path.join(subdir, file)
            filename, ext = os.path.splitext(file)
            ext_lower = ext.lower()

            # If the file is not a valid image, skip it
            if ext_lower not in valid_extensions:
                continue

            try:
                img = Image.open(filepath).convert("RGB")
                
                # This line guarantees the lowercase .jpg extension
                new_path = os.path.join(subdir, filename + ".jpg")
                
                # Save the new compressed JPG
                img.save(new_path, "JPEG", optimize=True, quality=quality)

                if ext_lower in {".jpg", ".jpeg"}:
                    # If the original file name is different from the new one (e.g., .JPG -> .jpg), remove the old one.
                    if filepath != new_path:
                        os.remove(filepath)
                    recompressed_count += 1
                    print(f"🔄 Re-compressed: {filepath}")
                else:
                    converted_count += 1
                    os.remove(filepath)
                    print(f"✅ Converted: {filepath} → {new_path}")

            except Exception as e:
                skipped_count += 1
                print(f"❌ Error processing {filepath}: {e}")

    # Print a final summary
    print("\n" + "="*30)
    print("✨ SCRIPT COMPLETE ✨")
    print(f"✅ Images converted (e.g., PNG→JPG): {converted_count}")
    print(f"🔄 Images re-compressed (JPG→JPG): {recompressed_count}")
    print(f"🚫 Images skipped due to errors: {skipped_count}")
    print("="*30)


# --- SCRIPT STARTS HERE ---
if __name__ == "__main__":
    process_images(root_folder=".", quality=40)