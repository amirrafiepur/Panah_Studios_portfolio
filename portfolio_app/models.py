from django.db import models

class projects(models.Model):
    id = models.AutoField(primary_key=True,unique=True)
    link = models.CharField(max_length=150)
    title = models.CharField(max_length=255,blank=True)
    image = models.ImageField(upload_to='uploaded_imgs/')
    files = models.FileField(upload_to='static/uploaded_files/',null=True,blank=True)
    Description = models.TextField()
    status = models.BooleanField(default=False) 
