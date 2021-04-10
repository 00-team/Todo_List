from django.urls import path
from . import views


urlpatterns = [
    path("", views.home, name="home"),
    path("add_search/", views.add_search, name="add_search"),
    path("delete_todo/<int:todo_id>/", views.delete, name="delete"),


    path("gats/", views.get_all_todos, name="Get All Todos"),
]
