from flask import Flask, request, jsonify
from langchain.prompts import PromptTemplate
from langchain.llms import CTransformers

app = Flask(__name__)

# Function to get response from LLama 2 model


def getLLamaresponse(input_text, blogs_style, no_words):
    llm = CTransformers(model="./llama-2-7b-chat.ggmlv3.q8_0.bin",
                        model_type='llama',
                        config={'max_new_tokens': 256, 'temperature': 0.01})
    template = """
    Write a comic script for a story named '{blogs_style}' in the {input_text} genre, within {no_words} words.
    """
    prompt = PromptTemplate(input_variables=["blogs_style", "input_text", "no_words"],
                            template=template)
    response = llm(prompt.format(blogs_style=blogs_style,
                                 input_text=input_text, no_words=no_words))
    return response


@app.route('/')
def index():
    return 'Welcome to the Comic Script Generator API'


@app.route('/generate_comic_script', methods=['POST'])
def generate_comic_script():
    data = request.json
    input_text = data.get('input_text')
    blogs_style = data.get('blogs_style')
    no_words = data.get('no_words')

    if not input_text or not blogs_style or not no_words:
        return jsonify({"error": "Please provide input_text, blogs_style, and no_words"}), 400

    try:
        response = getLLamaresponse(input_text, blogs_style, no_words)
        return jsonify({"comic_script": response})
    except Exception as e: 
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
