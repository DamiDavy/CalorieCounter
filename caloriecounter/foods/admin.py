from django.contrib import admin
from foods.models import Category, Food, Day

class FoodAdmin(admin.ModelAdmin):
  list_display = ('title', 'calorie_content')

class CategoryAdmin(admin.ModelAdmin):
  list_display = ('title',)

class DayAdmin(admin.ModelAdmin):
  list_display = ('user', 'day', 'month', 'year')

admin.site.register(Category, CategoryAdmin)
admin.site.register(Food, FoodAdmin)
admin.site.register(Day, DayAdmin)