from django.urls import path

from .views import (
    # user_follow,
    user_profile_api_view
)


urlpatterns = [
    path('<str:username>/follow', user_profile_api_view),
    path('<str:username>', user_profile_api_view),
]
