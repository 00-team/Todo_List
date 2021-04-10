from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST, require_GET
from django.utils import timezone
from to_do_app.models import Todo
from django.http import HttpResponseRedirect, HttpResponse, JsonResponse


@csrf_exempt
def home(request):
    stuff_for_frontend = Todo.objects.all().order_by("-added_date")
    return render(request,"base.html",{
        "todo_items" : stuff_for_frontend
        })


@csrf_exempt
def add_search(request):
    now = timezone.now()
    content = request.POST["input"]
    desc = request.POST["desc"]
    if content == "":
        return HttpResponseRedirect("/")
    created_obj = Todo.objects.create(
        added_date=now, text=content, description=desc)
    stuff_for_frontend = Todo.objects.all().order_by("-added_date")
    return HttpResponseRedirect("/")


@csrf_exempt
def delete(request,todo_id):
    Todo.objects.get(id=todo_id).delete()
    return HttpResponseRedirect("/")


@csrf_exempt
@require_POST
def get_all_todos(r):
    todos = Todo.objects.all().order_by("-added_date")
    ts = []
    for todo in todos:
        ts.append({
            "id": todo.id,
            "title": todo.title,
            "description": todo.description,
            "important": todo.important
        })
    
    JsonResponse(ts)