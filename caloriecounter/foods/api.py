from rest_framework import viewsets, permissions
from foods.models import Category, Food, Day
from .serializers import FoodSerializer, DaySerializer

class FoodViewSet(viewsets.ModelViewSet):
  queryset = Food.objects.all()
  permission_classes = [
    permissions.AllowAny
  ]
  serializer_class = FoodSerializer

class DayViewSet(viewsets.ModelViewSet):
  permission_classes = [
    permissions.IsAuthenticated
  ]
  serializer_class = DaySerializer

  def get_queryset(self):
    return self.request.user.days.all()

  def perform_create(self, serializer):
    serializer.save(user=self.request.user)