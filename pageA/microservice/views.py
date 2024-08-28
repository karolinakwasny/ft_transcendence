from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db import models

class Comment(models.Model):
	name = models.CharField(max_length=100)
	comment = models.TextField()

class CommentView(APIView):
	def get(self, request):
		comments = Comment.objects.all().values('name', 'comment')
		return Response(list(comments))

	def post(self, request):
		name = request.data.get('name')
		comment = request.data.get('comment')
		Comment.objects.create(name=name, comment=comment)
		return Response(status=status.HTTP_201_CREATED)

class CommentCountView(APIView):
	def get(self, request):
		count = Comment.objects.count()
		return Response({'count': count})
