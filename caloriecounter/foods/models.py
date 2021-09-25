from django.db import models
from django.contrib.auth.models import User

class DailyCalorieIntake(models.Model):
  username = models.CharField(max_length=64, unique=True)
  daily_calorie_intake = models.IntegerField()

  def __str__(self):
    return '%s %s' % (self.username, self.daily_calorie_intake)

class Category(models.Model):
  title = models.CharField(max_length=64, unique=True)
  image = models.URLField(max_length=150, blank=True)

  def __str__(self):
    return self.title

class Food(models.Model):
  title = models.CharField(max_length=64, unique=True)
  calorie_content = models.IntegerField()
  protein_content = models.DecimalField(max_digits=3, decimal_places=1)
  fat_content = models.DecimalField(max_digits=3, decimal_places=1)
  carbohydrate_content = models.DecimalField(max_digits=3, decimal_places=1)
  image = models.URLField(max_length=150)
  category = models.ManyToManyField(Category, related_name="foods")

  def __str__(self):
    return self.title

class Day(models.Model):
  user = models.ForeignKey(User, related_name="days", on_delete=models.CASCADE)
  day = models.CharField(max_length=2)
  month = models.CharField(max_length=2)
  year = models.CharField(max_length=4)

  def __str__(self):
    return '%s %s.%s.%s' % (self.user.username, self.day, self.month, self.year)

class FoodItem(models.Model):
  food = models.ForeignKey(Food, related_name="items", on_delete=models.CASCADE)
  date = models.ForeignKey(Day, related_name="foods", on_delete=models.CASCADE)
  date_for_search = models.CharField(max_length=10, default='0')
  weight = models.IntegerField()

  def __str__(self):
    return '%s (%s.%s.%s) %s' % (self.food.title, self.date.day, self.date.month, self.date.year, self.weight)
