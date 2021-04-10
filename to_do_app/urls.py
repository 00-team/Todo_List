from django.urls import path
from . import views


urlpatterns = [
    path("", views.home, name="home"),

    path("gats/", views.get_all_todos, name="Get All Todos"),
    path("dt/", views.delete_todo, name="Delete Todo"),
    path("st/", views.save_todo, name="Save Todo"),
]
