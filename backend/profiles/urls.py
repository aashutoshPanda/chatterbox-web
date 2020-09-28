from django.urls import path
from rest_framework import routers

from .views import AuthViewSet, UserList, RequestDetailView, RequestView, requestAcceptView, current_user_from_token_view, friend_list

router = routers.DefaultRouter(trailing_slash=False)
router.register('auth', AuthViewSet, basename='profile')

urlpatterns = router.urls
urlpatterns += [
    path("users/", UserList.as_view(), name="users_list"),
    path("current_user_from_token/", current_user_from_token_view,
         name="current_user_from_token"),
    path("request/", RequestView.as_view(), name="friend_reqest"),
    path("request/<int:pk>/", RequestDetailView.as_view(),
         name="reqest_detail"),
    path("request/accept/<int:pk>/", requestAcceptView,
         name="reqest_accept"),
    path("friends/", friend_list,
         name="friend_list"),
]
