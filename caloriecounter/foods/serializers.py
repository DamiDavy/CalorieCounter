from rest_framework import serializers
from foods.models import Category, Food, FoodItem, Day, DailyCalorieIntake

class FoodSerializer(serializers.ModelSerializer):
  class Meta:
    model = Food
    fields = '__all__'

class DaySerializer(serializers.ModelSerializer):
  class Meta:
    model = Day
    fields = '__all__'

  def create(self, validated_data):
    try:
      day = Day.objects.get(**validated_data)
      return day
    except Day.DoesNotExist:
      return Day.objects.create(**validated_data)

class CategorySerializer(serializers.ModelSerializer):
  foods = FoodSerializer(read_only=True, many=True)

  class Meta:
    model = Category
    fields = ('id', 'title', 'image', 'foods',)

class FoodItemSerializer(serializers.ModelSerializer):
  class Meta:
    model = FoodItem
    fields = '__all__'

class DailyCalorieIntakeSerializer(serializers.ModelSerializer):
  class Meta:
    model = DailyCalorieIntake
    fields = '__all__'

  # def create(self, validated_data):
  #   daily_calorie_intake, created = DailyCalorieIntake.objects.update_or_create(
  #       username=validated_data.get('username', None),
  #       defaults={'daily_calorie_intake': validated_data.get('daily_calorie_intake', None)})
  #   return daily_calorie_intake