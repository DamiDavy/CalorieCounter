from rest_framework import viewsets, permissions
from foods.models import Category, Food, FoodItem, Day, DailyCalorieIntake
from .serializers import FoodSerializer, CategorySerializer, FoodItemSerializer, DaySerializer, DailyCalorieIntakeSerializer
from rest_framework import filters

class CategoryViewSet(viewsets.ModelViewSet):
  queryset = Category.objects.all()
  permission_classes = [
    permissions.AllowAny
  ]
  serializer_class = CategorySerializer

class FoodViewSet(viewsets.ModelViewSet):
  queryset = Food.objects.all()
  permission_classes = [
    permissions.AllowAny
  ]
  serializer_class = FoodSerializer

  filter_backends = [filters.SearchFilter]
  search_fields = ['title']

class DayViewSet(viewsets.ModelViewSet):
  permission_classes = [
    permissions.IsAuthenticated
  ]
  serializer_class = DaySerializer

  def get_queryset(self):
    month = self.request.query_params.get('month')
    year = self.request.query_params.get('year')
    if month is not None and year is not None:
      return self.request.user.days.filter(month=month, year=year)
    return self.request.user.days.all()

  def perform_create(self, serializer):
    serializer.save(user=self.request.user)

class FoodItemViewSet(viewsets.ModelViewSet):
  queryset = FoodItem.objects.all()
  permission_classes = [
    permissions.IsAuthenticated
  ]
  serializer_class = FoodItemSerializer

  filter_backends = [filters.SearchFilter]
  search_fields = ['=date_for_search']
  # def get_queryset(self):
  #   date_id = int(self.request.query_params.get('date'))
  #   if date_id is not None:
  #     try:
  #       date = Day.objects.get(pk=date_id)
  #       return FoodItem.objects.filter(date=date)
  #     except Day.DoesNotExist:
  #       return 

class DailyCalorieIntakeViewSet(viewsets.ModelViewSet):
  queryset = DailyCalorieIntake.objects.all()
  permission_classes = [
    permissions.IsAuthenticated
  ]
  serializer_class = DailyCalorieIntakeSerializer

  filter_backends = [filters.SearchFilter]
  search_fields = ['=username']