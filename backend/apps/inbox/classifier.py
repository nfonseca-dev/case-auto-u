import os
import google.generativeai as genai
import json
import environ
from enum import Enum
import spacy
from django.conf import settings

environ.Env.read_env(settings.BASE_DIR / '.env')

env = environ.Env()
env.read_env()


class EmailClassification(str, Enum):
    PRODUCTIVE = "Produtivo"
    UNPRODUCTIVE = "Improdutivo"


API_KEY = os.getenv("GEMINI_API_KEY")

if not API_KEY:
    raise ValueError("API_KEY environment variable not found.")

genai.configure(api_key=API_KEY)

classification_schema = {
    "type": "object",
    "properties": {
        "classification": {
            "type": "string",
            "description": "The classification of the email. Must be either 'Productive' or 'Unproductive'.",
            "enum": [EmailClassification.PRODUCTIVE.value, EmailClassification.UNPRODUCTIVE.value],
        },
        "suggestedReply": {
            "type": "string",
            "description": "A concise and professional reply based on the email content and classification. If the email is unproductive, the reply can be a simple acknowledgment.",
        },
    },
    "required": ["classification", "suggestedReply"],
}


def classify_and_suggest_reply(email_content: str):
    """
    Classifies an email and suggests a reply using the Gemini API.
    """
    nlp = spacy.load("pt_core_news_sm")
    doc = nlp(email_content)

    lemmatized_tokens = [
        token.lemma_ for token in doc if not token.is_stop and not token.is_punct and not token.is_space
    ]
    processed_content = " ".join(lemmatized_tokens)

    named_entities = [{"text": ent.text, "label": ent.label_}
                      for ent in doc.ents]

    prompt = f"""
    You are an expert email assistant. Your task is to analyze an email and perform two actions:
    1. Classify the email into one of two categories:
       - 'Productive': Emails that require a specific action or response (e.g., technical support requests, open case updates, system questions, meeting requests).
       - 'Unproductive': Emails that do not require immediate action (e.g., congratulations, thank you messages, FYI announcements, newsletters).
    2. Suggest a concise, professional, and helpful reply based on the email's content and classification. If the email is unproductive, the reply can be a simple acknowledgment or a polite closing.

    Analyze the following email content and provide the classification and suggested reply in the specified JSON format.

    Original Email Content:
    ---
    {email_content}
    ---
    Processed Content (Lemmatized):
    ---
    {processed_content}
    ---
    Named Entities:
    ---
    {json.dumps(named_entities, ensure_ascii=False)}
    ---
    """

    try:
        model = genai.GenerativeModel(
            model_name="gemini-1.5-flash",
            generation_config=genai.GenerationConfig(
                response_mime_type="application/json",
                response_schema=classification_schema,
            )
        )
        response = model.generate_content(prompt)
        parsed_response = json.loads(response.text)
        if parsed_response["classification"] not in [e.value for e in EmailClassification]:
            raise ValueError("Invalid classification value received from AI.")

        if not isinstance(parsed_response["suggestedReply"], str):
            raise ValueError(
                "Invalid suggested reply format received from AI.")

        return {
            "classification": parsed_response["classification"],
            "suggestedReply": parsed_response["suggestedReply"]
        }

    except Exception as e:
        raise RuntimeError(
            "Failed to get a valid response from the AI model.") from e
