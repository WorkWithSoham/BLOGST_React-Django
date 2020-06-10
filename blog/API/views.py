from django.conf import settings
from ..models import blog
from ..serializers import blog_serializer, blogActionSerializer, blog_create_serializer
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination

ALLOWED_HOSTS = settings.ALLOWED_HOSTS


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def blog_create(request, *args, **kwargs):
    serializer = blog_create_serializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save(user=request.user)
        return Response(serializer.data, status=201)
    return Response({}, status=400)


@api_view(['GET'])
def blog_list_view(request, *args, **kwargs):
    qs = blog.objects.all()  # queryset(qs)
    username = request.GET.get('username')
    if username is not None:
        qs = qs.by_username(username)
    return paginated_qs_response(qs, request)


def paginated_qs_response(qs, request):
    paginator = PageNumberPagination()
    paginator.page_size = 20
    paginated_qs = paginator.paginate_queryset(qs, request)
    serializer = blog_serializer(paginated_qs, many=True)
    return paginator.get_paginated_response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def blog_feed_view(request, *args, **kwargs):
    user = request.user
    qs = blog.objects.feed(user)
    return paginated_qs_response(qs, request)


@api_view(['GET'])
def blog_view(request, blog_id, *args, **kwargs):
    qs = blog.objects.filter(id=blog_id)
    if not qs.exists():
        return Response({}, status=404)
    obj = qs.first()
    serializer = blog_serializer(obj)
    return Response(serializer.data, status=200)


@api_view(['DELETE', 'POST'])
@permission_classes([IsAuthenticated])
def blog_del_view(request, blog_id, *args, **kwargs):
    qs = blog.objects.filter(id=blog_id)
    if not qs.exists():
        return Response({}, status=404)
    qs = qs.filter(user=request.user)
    if not qs.exists():
        return Response({'message': "You cannot delete this Blog!"}, status=401)
    obj = qs.first()
    obj.delete()
    return Response({"message": "Blog deleted successfully."}, status=200)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def blog_action_view(request, *args, **kwargs):
    serializer = blogActionSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        data = serializer.validated_data
        blog_id = data.get("id")
        action = data.get("action")
        content = data.get("content")
        qs = blog.objects.filter(id=blog_id)
        if not qs.exists():
            return Response({}, status=404)
        obj = qs.first()
        if action == "like":
            obj.likes.add(request.user)
            serializer = blog_serializer(obj)
            return Response(serializer.data, status=200)
        elif action == "unlike":
            obj.likes.remove(request.user)
            serializer = blog_serializer(obj)
            return Response(serializer.data, status=200)
        elif action == "reblog":
            reblog = blog.objects.create(
                user=request.user,
                parent=obj,
                content=content)
            serializer = blog_serializer(reblog)
            return Response(serializer.data, status=200)
        # elif action == "comment":
        #   comment = blog.objects.create(user=request.user, parent=obj, content=content)
        #   serializer = blog_serializer(comment)
        #   return Response(serializer.data, status=200)
    return Response({}, status=200)
