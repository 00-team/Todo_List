from django.db import models

# Create your models here.

class Todo(models.Model):
    added_date = models.DateTimeField()
    text = models.CharField(max_length=100)
    description = models.CharField(max_length=200, default=" ")
    
    def __str__(self):
        return self.text