# from django.contrib import admin
# from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
# from django.contrib.auth.models import User

# from .models import Profile


# class ProfileInline(admin.StackedInline):
#     model = Profile
#     can_delete = False


# class UserAdmin(BaseUserAdmin):
#     inlines = [ProfileInline]


# # unregister old user admin
# admin.site.unregister(User)
# # register new user admin
# admin.site.register(User, UserAdmin)

from django.contrib import admin
from .models import Profile, Relationship

admin.site.register(Profile)
admin.site.register(Relationship)
