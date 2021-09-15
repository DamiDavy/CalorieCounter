from django.db import models
from django.contrib.auth.models import User

class Category(models.Model):
	title = models.CharField(max_length=64)

class Food(models.Model):
  title = models.CharField(max_length=64, unique=True)
  calorie_content = models.IntegerField()
  protein_content = models.DecimalField(max_digits=3, decimal_places=1)
  fat_content = models.DecimalField(max_digits=3, decimal_places=1)
  carbohydrate_content = models.DecimalField(max_digits=3, decimal_places=1)
  image = models.URLField(max_length=150)
  category = models.ManyToManyField(Category, related_name="foods")

class Day(models.Model):
  user = models.ForeignKey(User, related_name="days", on_delete=models.CASCADE)
  foods = models.ManyToManyField(Food, related_name="days")
  day = models.CharField(max_length=2)
  month = models.CharField(max_length=2)
  year = models.CharField(max_length=4)



