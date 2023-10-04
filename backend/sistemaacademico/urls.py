from django.urls import path
from .views import StudentView

urlpatterns = [
    path('sistemaacademico/', StudentView.as_view()),
    path('sistemaacademico/<int:pk>/', StudentView.as_view()),
]
