from django.conf import settings
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from ..models import profile
from ..serializers import public_profileserializers

ALLOWED_HOSTS = settings.ALLOWED_HOSTS
User = get_user_model()


@api_view(['GET', 'POST'])
def user_profile_api_view(request, username, *args, **kwargs):
    qs = profile.objects.filter(user__username=username)
    if not qs.exists():
        return Response({"detail": "User not found"}, status=404)
    profile_obj = qs.first()
    data = request.data or {}
    if request.method == "POST":
        current_user = request.user
        action = data.get("action")
        if profile_obj.user != current_user:
            if action == "follow":
                profile_obj.followers.add(current_user)
            elif action == "unfollow":
                profile_obj.followers.remove(current_user)
            else:
                pass
    serializer = public_profileserializers(instance=profile_obj, context={"request": request})
    return Response(serializer.data, status=200)


# @api_view(['GET', 'POST'])
# @permission_classes([IsAuthenticated])
# def user_follow(request, username, *args, **kwargs):
#
#     to_follow_user = User.objects.filter(username=username)
#     if current_user.username == username:
#         my_followers = current_user.profile.followers.all()
#         return Response({"count": my_followers.count()}, status=200)
#     if not to_follow_user.exists():
#         return Response({}, status=400)
#     other = to_follow_user.first()
#     profile = other.profile
#     data = request.data or {}
#     action = data.get("action")
#     if action == "follow":
#         profile.followers.add(current_user)
#     elif action == "unfollow":
#         profile.followers.remove(current_user)
#     else:
#         pass
#     data = public_profileserializers(instance=profile, context={"request": request})
#     return Response(data.data, status=200)
