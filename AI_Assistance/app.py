from flask import Flask, request, jsonify
from flask_cors import CORS
import ollama

app = Flask(__name__)

# ENABLE CORS
CORS(app)

# LOAD KNOWLEDGE BASE
with open("knowledge.txt", "r", encoding="utf-8") as f:
    knowledge_base = f.read()


@app.route('/chat', methods=['POST'])
def chat():

    try:

        # GET USER MESSAGE
        data = request.get_json()

        user_message = data.get("message")

        print("USER:", user_message)

        # SYSTEM PROMPT
        system_prompt = f"""
You are Blue Dot Economy AI Assistant.

You are an expert on:
- Blue Dot Economy DPGs
- Signal DPG
- Aggregator DPG
- Ecosystem Facilitator DPG
- Local discovery failure
- Employment ecosystems
- Digital Public Infrastructure
- Schema-driven configuration
- Government ecosystem coordination

STRICT RULES:
- Answer ONLY from the provided knowledge base.
- Never invent information.
- Never hallucinate.
- Keep responses concise and accurate.
- Use bullet points when useful.
- If information is unavailable, say:
  "This information is not available in the Blue Dot knowledge base."

KNOWLEDGE BASE:
{knowledge_base}
"""

        # OLLAMA RESPONSE
        response = ollama.chat(
            model='bluedot-ai',
            messages=[
                {
                    'role': 'system',
                    'content': system_prompt
                },
                {
                    'role': 'user',
                    'content': user_message
                }
            ]
        )

        ai_reply = response['message']['content']

        print("AI:", ai_reply)

        return jsonify({
            "response": ai_reply
        })

    except Exception as e:

        print("ERROR:", str(e))

        return jsonify({
            "response": str(e)
        }), 500


if __name__ == '__main__':
    app.run(
        debug=True,
        threaded=True
    )