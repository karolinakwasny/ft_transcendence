# users/management/commands/delete_expired_qrcodes.py

from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import timedelta
from users.models import User  # Make sure you're importing the correct model

class Command(BaseCommand):
    help = "Delete QR codes that were generated more than 24 hours ago"

    def handle(self, *args, **kwargs):
        # Calculate expiration time (24 hours ago)
        expiration_time = timezone.now() - timedelta(hours=24)

        # Find users with QR codes older than 24 hours
        expired_users = User.objects.filter(
            qr_code__isnull=False,  # Make sure there's a QR code
            qr_code_generated_at__lt=expiration_time  # QR code generated more than 24 hours ago
        )

        count = 0
        for user in expired_users:
            try:
                # Delete QR code from Cloudinary
                if user.qr_code:
                    public_id = user.qr_code.name.split('.')[0]  # Extract public ID
                    cloudinary.uploader.destroy(public_id)  # Cloudinary delete
                    user.qr_code = None  # Clear QR code field in the database
                    user.qr_code_generated_at = None  # Optionally clear the timestamp as well
                    user.save()
                    count += 1
            except Exception as e:
                self.stderr.write(f"Error deleting QR for user {user.email}: {str(e)}")

        self.stdout.write(self.style.SUCCESS(f"Deleted {count} expired QR codes."))
