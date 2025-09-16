from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .classifier import classify_and_suggest_reply

class ClassifyEmailView(APIView):
    def post(self, request):
        email_content = request.data.get("email_content", "")
        if not email_content:
            return Response({"error": "Email content is required."}, status=status.HTTP_400_BAD_REQUEST)
        
        result = classify_and_suggest_reply(email_content)
        return Response(result, status=status.HTTP_200_OK)
