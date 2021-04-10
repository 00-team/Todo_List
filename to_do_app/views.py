from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST, require_GET
from django.utils import timezone
from to_do_app.models import Todo
from django.http import HttpResponseRedirect, HttpResponse, JsonResponse

import json

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


# @csrf_exempt
# def delete(request,todo_id):
#     Todo.objects.get(id=todo_id).delete()
#     return HttpResponseRedirect("/")


# @require_POST
# @csrf_exempt
def get_all_todos(request):
    todos = Todo.objects.all().order_by("-added_date")
    ts = []
    for todo in todos:
        ts.append({
            "id": todo.id,
            "title": todo.title,
            "description": todo.description,
            "important": todo.important
        })
    
    return JsonResponse({"data":ts})


@require_POST
def delete_todo(r):
    data = r.body

    try:
        data = json.loads(data)
    except json.JSONDecodeError:
        return JsonResponse({
            "error":"data is not Valid"
        })

    if not data.get("tid"):
        return JsonResponse({
            "error":"data is not Valid"
        })


    tid = data.get("tid")

    if type(tid) == str:
        if tid.isnumeric():
            tid = int(tid)

    if not Todo.objects.filter(id=tid).exists():
        return JsonResponse({
            "error":"Todo Not Found"
        })
    
    t = Todo.objects.get(id=tid)
    t.delete()

    return JsonResponse({
        "sucsess":"Todo now Deleted"
    })



@require_POST
def save_todo(r):
    data = r.body

    try:
        data = json.loads(data)
    except json.JSONDecodeError:
        return JsonResponse({
            "error":"data is not Valid"
        })
    
    if not data.get("title") or not data.get("description"):
        return JsonResponse({
            "error":"data is not Valid"
        })

    if data.get("tid"):
        tid = data.get("tid")

        if type(tid) == str:
            if tid.isnumeric():
                tid = int(tid)

        if not Todo.objects.filter(id=tid).exists():
            return JsonResponse({
                "error":"Todo Not Found"
            })
        
        t = Todo.objects.get(id=tid)
        t.title = data.get("title")
        t.description = data.get("description")
        t.important = bool(data.get("important")) or False
        t.save()

        return JsonResponse({
            "sucsess":"Todo now Edited"
        })

    else:
        t = Todo.objects.create(
            title=data.get("title"),
            description=data.get("description"),
            important=bool(data.get("important")) or False,
            added_date=timezone.now()
        )
        t.save()

        return JsonResponse({
            "sucsess":"Todo now Added",
            "todo": {
                "id":t.id,
                "title":t.title,
                "description":t.description,
                "important":t.important,
            }
        })