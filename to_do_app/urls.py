from django.urls import path
from . import views

urlpatterns = [
    path("",views.home,name="home"),
    path("add_search/", views.add_search, name="add_search"),
]
