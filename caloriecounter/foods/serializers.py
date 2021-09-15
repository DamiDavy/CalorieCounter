from rest_framework import serializers
from foods.models import Category, Food, Day

class FoodSerializer(serializers.ModelSerializer):
  class Meta:
    model = Food
    fields = '__all__'

class DaySerializer(serializers.ModelSerializer):
  class Meta:
    model = Day
    fields = '__all__'