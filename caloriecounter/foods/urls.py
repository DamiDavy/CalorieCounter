from rest_framework import routers
from .api import FoodViewSet, DayViewSet

router = routers.DefaultRouter()
router.register('api/foods', FoodViewSet, 'foods')
router.register('api/days', DayViewSet, 'days')

urlpatterns = router.urls