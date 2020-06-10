from django.contrib import admin
from .models import blog, blog_like


class blog_like_admin(admin.TabularInline):
    model = blog_like


class BlogAdmin(admin.ModelAdmin):
    inlines = [blog_like_admin]
    list_display = ['__str__', 'user']
    search_fields = ['content', 'user__username', 'user__email']

    class Meta:
        model = blog


admin.site.register(blog, BlogAdmin)
