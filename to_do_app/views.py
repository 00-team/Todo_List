from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.utils import timezone
from to_do_app.models import Todo
# Create your views here.


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
    if content:
        created_obj = Todo.objects.create(added_date=now,text=content)
    else:
        created_obj = Todo.objects.create(added_date=now, text="Now Set")
    print(created_obj)
    stuff_for_frontend = Todo.objects.all().order_by("-added_date")
    return render(request, "to_do_list/index.html",{
        "todo_items": stuff_for_frontend
    })

