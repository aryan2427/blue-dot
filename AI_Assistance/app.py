from flask import Flask, request, jsonify
from flask_cors import CORS
import ollama

app = Flask(__name__)

CORS(app)

# LOAD KNOWLEDGE BASE
with open("knowledge.txt", "r", encoding="utf-8") as f:
    knowledge_base = f.read()

@app.route('/chat', methods=['POST'])
def chat():

    try:

        data = request.get_json()

        user_message = data.get("message")

        # STRONG SYSTEM PROMPT
        prompt = f"""
You are Blue Dot Economy AI Assistant.

You MUST answer ONLY using the provided knowledge.

If answer is not available in knowledge,
say:
"I don't have information about that in the Blue Dot knowledge base."

KNOWLEDGE BASE:
{knowledge_base}

USER QUESTION:
{user_message}
"""

        response = ollama.chat(
            model='bluedot-ai',
            messages=[
                {
                    'role': 'user',
                    'content': prompt
                }
            ]
        )

        ai_reply = response['message']['content']

        return jsonify({
            "response": ai_reply
        })

    except Exception as e:

        return jsonify({
            "response": str(e)
        }), 500


if __name__ == '__main__':
    app.run(debug=True)