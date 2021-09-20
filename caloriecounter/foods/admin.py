from django.contrib import admin
from foods.models import Category, Food, Day, FoodItem, DailyCalorieIntake

class FoodAdmin(admin.ModelAdmin):
  list_display = ('title', 'calorie_content')

class CategoryAdmin(admin.ModelAdmin):
  list_display = ('title',)

class DayAdmin(admin.ModelAdmin):
  list_display = ('user', 'day', 'month', 'year')

class FoodItemAdmin(admin.ModelAdmin):
  list_display = ('food', 'date', 'weight', 'id', 'date_id', 'date_for_search')

class DailyCalorieIntakeAdmin(admin.ModelAdmin):
  list_display = ('username', 'daily_calorie_intake')

admin.site.register(Category, CategoryAdmin)
admin.site.register(Food, FoodAdmin)
admin.site.register(Day, DayAdmin)
admin.site.register(FoodItem, FoodItemAdmin)
admin.site.register(DailyCalorieIntake, DailyCalorieIntakeAdmin)