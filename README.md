# ToonTales: Real-time Comic Generator

Welcome to **ToonTales** – an innovative AI-powered platform that revolutionizes comic creation. ToonTales effortlessly transforms your text prompts into captivating comic strips, bringing your ideas to life in vibrant illustrations. Whether you're an experienced comic book artist, a storyteller, or a beginner, ToonTales is the perfect platform for expressing your creativity.

## Problem Definition

ToonTales addresses the need for an intuitive text-to-text and text-to-image comic generation application. It enables users to effortlessly convert their ideas into visually appealing comics, enhancing creativity and self-expression.

## Key Features

- **Text-to-Comic Conversion**: Create unique comic panels instantly by entering text prompts.
- **AI Illustrations**: Access a rich library of AI-generated illustrations to enhance your comics.
- **Instant Downloads**: Download your comic scripts instantly for further use.
- **User-friendly Interface**: Ensures effortless navigation and seamless interaction for users of all experience levels.

## Tech Stack

- **Frontend**: React – Dynamic user interface development and seamless interaction.
- **Backend**: Python – Base Language
  - **Flask**: For its simplicity and efficiency in building our backend.
- **Text Generation**: LLAMA2 (llama-2-7b-chat.ggmlv3.q8_0) – Powerful text generation for prompt-driven image creation.
- **Image Generation**: Rapid API – To easily integrate AI services, like text-to-image conversion.

## How to Access the Text-to-Image API Key

Access the text-to-image API key using this link: [AI Text to Image Generator API](https://rapidapi.com/bussinesonline250/api/ai-text-to-image-generator-api/playground/apiendpoint_c703285f-1e22-4c31-befe-45d4af94868d)

## Running the Backend

To run the backend, use the following command:

```sh
python main.py
```

Check the API with the help of Postman. Here is an example response:

```json
{
    "comic_script": "\n(The cat is sitting on a windowsill, looking out at the birds outside)\n\nCat: \"Oh, look at those silly birds outside. They think they're so free.\"\nMouse: \"Yeah, I know what you mean. It's like they have no worries in the world.\"\nCat: \"Exactly! And we mice have to deal with their pesky droppings everywhere.\"\nMouse: \"Ugh, don't even get me started on that. But hey, at least we have each other.\"\nCat: \"That's true. We may not be able to fly or sing like birds, but we have our own special talents.\"\nMouse: \"Like what?\"\nCat: \"Well, for one thing, we can fit through tiny holes and sneak up on those pesky birds whenever we want.\"\nMouse: \"Haha, that's true! And I bet they never see it coming!\"",
    "image_url": "https://storage.googleapis.com/face-10b17.appspot.com/1717910438325_3D.jpg?GoogleAccessId=face-10b17%40appspot.gserviceaccount.com&Expires=1717914038&Signature=VN%2FaqDg4XGHwexBU3qaCW7rtcpKFrhe4QSYmDsZWyhalk1AYStxH5VWWMwgxW4B5euUF7NFtbWCmSuPizj2JT898lNpI%2F22tmFHjF0GsZkXYmIEdzIqHuKvxdWyUrt6yo8dUnOGgMzQDn4v0%2BN6cLaDCBo3njI7JUvmfI1y6XlJWfuZYRdgoJDcLnX0OCjTYim16mzhOSbRAkfuIfjo40RibloQ7FIxBWt0z6BMbIqPALnm5n4H%2BywJANVPjCOiuu6w%2FLluivoqFiXzw3OZsDmOTtSnEuUGROrhRzu5ZX3jB99Vuv3jgxYbDunvjTncqyK6lLt0R0tEEVlT71fWEOA%3D%3D"
}
```

## Running the Frontend

To run the frontend, use the following command:

```sh
npm start
```

## Additional Information

For a seamless experience, ensure that all dependencies are properly installed and configured. For any assistance, refer to the detailed documentation provided in the project repository.

---

Enjoy creating your unique comics with **ToonTales**! Unleash your creativity and bring your stories to life like never before.
