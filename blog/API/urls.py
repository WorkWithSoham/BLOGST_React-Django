from django.urls import path
from blog.API.views import (
    blog_view,
    blog_del_view,
    blog_list_view,
    blog_feed_view,
    blog_action_view,
    blog_create)

urlpatterns = [
    path('', blog_list_view),
    path('feed/', blog_feed_view),
    path('action/', blog_action_view),
    path('create-blog/', blog_create),
    path('<int:blog_id>/', blog_view),
    path('<int:blog_id>/delete/', blog_del_view),
]
