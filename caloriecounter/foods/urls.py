from rest_framework import routers
from .api import FoodViewSet, CategoryViewSet, FoodItemViewSet, DayViewSet, DailyCalorieIntakeViewSet
from django.urls import path, re_path

router = routers.DefaultRouter()
router.register('foods', FoodViewSet, 'foods')
router.register('days', DayViewSet, 'days')
router.register('categories', CategoryViewSet, 'categories')
router.register('food-items', FoodItemViewSet, 'food-items')
router.register('daily-calorie-intake', DailyCalorieIntakeViewSet, 'daily-calorie-intake')

urlpatterns = router.urls