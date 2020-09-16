from django.urls import path
from rest_framework import routers

from .views import AuthViewSet, UserList

router = routers.DefaultRouter(trailing_slash=False)
router.register('auth', AuthViewSet, basename='profile')

urlpatterns = router.urls
urlpatterns += [
    path("users/", UserList.as_view(), name="users_list")
]
