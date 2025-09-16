from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .classifier import classify_and_suggest_reply

from PyPDF2 import PdfReader


class ClassifyEmailView(APIView):
    def post(self, request):
        text_content = ""
        if "text" in request.data:
            text_content = request.data.get("text", "").strip()

        elif "file" in request.FILES:
            uploaded_file = request.FILES["file"]
            filename = uploaded_file.name.lower()

            if filename.endswith(".txt"):
                text_content = uploaded_file.read().decode("utf-8", errors="ignore")

            elif filename.endswith(".pdf"):
                pdf_reader = PdfReader(uploaded_file)
                text_content = ""
                for page in pdf_reader.pages:
                    text_content += page.extract_text() or ""

            else:
                return Response(
                    {"erro": "Formato de arquivo não suportado. Apenas .txt e .pdf são permitidos."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

        if not text_content:
            return Response(
                {"erro": "Nenhum conteúdo para classificar."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        result = classify_and_suggest_reply(text_content)
        return Response(result, status=status.HTTP_200_OK)
