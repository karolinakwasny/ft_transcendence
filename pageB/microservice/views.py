from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db import models

class Comment(models.Model):
	name = models.CharField(max_length=100)
	comment = models.TextField()

class CommentListView(APIView):
	def get(self, request):
		comments = Comment.objects.all().values('name', 'comment')
		return Response(list(comments))
