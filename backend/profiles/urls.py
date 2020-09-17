from django.urls import path
from rest_framework import routers

from .views import AuthViewSet, UserList, UserFromToken

router = routers.DefaultRouter(trailing_slash=False)
router.register('auth', AuthViewSet, basename='profile')

urlpatterns = router.urls
urlpatterns += [
    path("users/", UserList.as_view(), name="users_list"),
    path("userfromtoken/", UserFromToken.as_view(), name="userfromtoken"),
    # path("myprofile/", My_profile.as_view(), name="myprofile"),
]
