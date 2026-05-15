from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL_NAME = "blue-dot-ai"


@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()

    user_message = data.get("message")

    try:
        response = requests.post(
            OLLAMA_URL,
            json={
                "model": MODEL_NAME,
                "prompt": user_message,
                "stream": False
            }
        )

        result = response.json()

        return jsonify({
            "reply": result["response"]
        })

    except Exception as e:
        return jsonify({
            "reply": f"Backend Error: {str(e)}"
        })


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)