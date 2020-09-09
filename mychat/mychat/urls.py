from django.contrib import admin
from django.urls import path, include
from chat import views
urlpatterns = [
    path('auth/login', views.loginView),
    path('auth/logout', views.logoutView),
    path('auth/signup', views.signupView)

]
