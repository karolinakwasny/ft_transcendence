from django.urls import path
from .views import CommentView, CommentCountView

urlpatterns = [
	path('api/comments/', CommentView.as_view(), name='comments'),
	path('api/comments/count', CommentCountView.as_view(), name='comment_count'),
]
