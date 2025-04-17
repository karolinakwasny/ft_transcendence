# users/management/commands/delete_expired_qrcodes.py

from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import timedelta
from users.models import QRCode  # Update to your actual app/model name
import cloudinary.uploader

class Command(BaseCommand):
    help = "Delete expired QR codes (older than 24 hours)"

    def handle(self, *args, **kwargs):
        expiration_time = timezone.now() - timedelta(hours=24)
        expired_qrcodes = QRCode.objects.filter(created_at__lt=expiration_time)

        count = 0
        for qr in expired_qrcodes:
            try:
                cloudinary.uploader.destroy(qr.public_id)
                qr.delete()
                count += 1
            except Exception as e:
                self.stderr.write(f"Error deleting QR code {qr.public_id}: {str(e)}")

        self.stdout.write(self.style.SUCCESS(f"Deleted {count} expired QR codes."))
