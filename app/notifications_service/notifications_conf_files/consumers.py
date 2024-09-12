# consumers.py

from channels.generic.websocket import WebsocketConsumer
import json

class NotificationConsumer(WebsocketConsumer):
    notifications = []  # In-memory storage for notifications

    def connect(self):
        self.accept()

    def disconnect(self, close_code):
        pass

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']

        # Notification.objects.create(user=self.scope['user'], message=message)
        # Store notification in-memory
        self.notifications.append(message)

        self.send(text_data=json.dumps({
            'message': message
        }))
