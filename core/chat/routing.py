from django.urls import re_path
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from .import consumers

websocket_urlpatterns= [
    re_path(r'ws/chat/(?P<room_name>\w+)/$', consumers.chatConsumers.as_asgi())
    
]
