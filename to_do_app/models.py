from django.db import models


class Todo(models.Model):
    title = models.CharField(max_length=50)
    description = models.CharField(max_length=300)
    added_date = models.DateTimeField()
    important = models.BooleanField(default=False)
    
    def __str__(self):
        return self.title