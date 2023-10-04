from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import StudentSerializer
from .models import Student
from django.http.response import JsonResponse
from rest_framework.response import Response
from django.http.response import Http404

class StudentView(APIView):

    def get_student(self, pk):
        try:
            student = Student.objects.get(studentId=pk)
        except Student.DoesNotExist():
            raise Http404
        
    def get(self, resquest, pk=None):
        if pk:
            data = self.get_student(pk)
            serializer = StudentSerializer(data)
        else:
            data = Student.objects.all()
            serializer = StudentSerializer(data, many=True)
        return Response(serializer.data)
    
    def post (self, request):
        data = request.data
        serializer = StudentSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse (" Estudante Cadastrado com Sucesso!", safe=False)
        return JsonResponse ("O cadastro de Estudante Falhou!", safe=False)
    
    def patch (self, request, pk=None):
        student_to_update = Student.objects.get(studentId = pk)
        serializer = StudentSerializer(instance=student_to_update, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse (" Registro atualizado com sucesso!", safe=False)
        return JsonResponse ("A atualização do cadastro Falhou!", safe=False)
    
    def delete (self, request, pk=None):
        student_to_delete = Student.objects.get(studentId = pk)
        student_to_delete.delete()
        return JsonResponse ("Registro excluído com sucesso!", safe=False)