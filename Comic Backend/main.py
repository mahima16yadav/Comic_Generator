from flask import Flask, request, jsonify
from langchain_community.llms import CTransformers
from langchain.prompts import PromptTemplate
import requests
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

# Function to generate image using AI Text-to-Image Generator API


def generate_image(inputs):
    url = "https://ai-text-to-image-generator-api.p.rapidapi.com/3D"
    headers = {
        "x-rapidapi-key": "5fb2e8304emsh3d4ccb034bc2450p1ef989jsn5608b3200459",
        "x-rapidapi-host": "ai-text-to-image-generator-api.p.rapidapi.com",
        "Content-Type": "application/json"
    }
    payload = {"inputs": inputs}
    response = requests.post(url, json=payload, headers=headers)
    if response.status_code == 200:
        return response.json().get('url')
    else:
        return None

# Function to generate comic script using LLama 2 model


def getLLamaresponse(input_text, blogs_style, no_words):
    llm = CTransformers(model="./llama-2-7b-chat.ggmlv3.q8_0.bin",
                        model_type='llama',
                        config={'max_new_tokens': 256, 'temperature': 0.01})
    template = """
    Write a comic script dialaugue for a story named '{blogs_style}' in the {input_text} genre, within {no_words} words.
    """
    prompt = PromptTemplate(input_variables=["blogs_style", "input_text", "no_words"],
                            template=template)
    response = llm(prompt.format(blogs_style=blogs_style,
                                 input_text=input_text, no_words=no_words))
    return response


@app.route('/generate', methods=['POST'])
def generate():
    # Extracting the input text from the POST request
    data = request.json
    input_text = data.get('input_text')
    blogs_style = data.get('blogs_style')
    no_words = data.get('no_words')

    if not input_text or not blogs_style or not no_words:
        return jsonify({"error": "Please provide input_text, blogs_style, and no_words"}), 400

    try:
        # Generate comic script
        llm_response = getLLamaresponse(input_text, blogs_style, no_words)

        # Generate image
        image_url = generate_image(input_text)

        return jsonify({"comic_script": llm_response, "image_url": image_url})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
