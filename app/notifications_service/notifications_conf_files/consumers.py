# consumers.py

import json
from channels.generic.websocket import AsyncWebsocketConsumer

class NotificationConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()  # Accepts the WebSocket connection

    async def disconnect(self, close_code):
        pass

    async def receive(self, text_data):
        data = json.loads(text_data)
        message = data['message']
        
        # Broadcast the message back to the WebSocket clients
        await self.send(text_data=json.dumps({
            'message': message
        }))

