# Visio - Visual search assistant

https://github.com/user-attachments/assets/7c5aee6a-90bb-4fdf-a9db-9a3e93ced2a2


> [!IMPORTANT]
>
>  Use a chromium base browser if video doesn't play


## Introduction

In today's fast-paced digital world, accessibility and efficiency are key. The Visual Search Assistant is a cutting-edge tool designed to revolutionize how we interact with visual content. This application allows users to upload an image and leverage advanced AI technologies to analyze and interpret the content within it. The system provides detailed descriptions of the image's context, enabling users to understand what is happening in the picture with ease.

Beyond textual analysis, the Visual Search Assistant stands out by offering multilingual support. Users can select their preferred language to receive a translated description of the image, ensuring inclusivity and accessibility for a global audience. To further enhance usability, the app integrates audio playback capabilities, allowing the description to be narrated in the selected language—ideal for users who prefer auditory feedback or those with visual impairments.

In addition to these features, the Visual Search Assistant introduces an interactive Question-and-Answer (Q&A) section. This feature allows users to upload an image and ask specific questions about its context. For example, users can inquire about objects in the image, activities taking place, or even details like text visible within the photo. This dynamic functionality ensures a more personalized and in-depth exploration of visual content, transforming how users interact with images and enhancing their overall experience.

## Project Workflow

The Visual Search Assistant operates through a series of coordinated steps that process an uploaded image, analyze its content, and produce outputs in text and audio formats. Below is a neutral description of the data flow:

1. Image Upload

    The workflow begins with the user uploading an image:

    - A form containing the image file is submitted.
    - The backend processes the upload and returns a unique key referencing the stored image.

2. Image-to-Text Conversion

    Using the unique image key:

    - The application sends a request to an AI model that extracts textual information from the image.
    - The response contains a description of the image's content in plain text format.

3. Text Translation

    The extracted text is then translated:

    - A request is sent to a translation model with the text and the target language code.
    - The response contains the translated text in the user-selected language.

4. Text-to-Speech Synthesis

    The translated text is converted into an audio format:

    - A request is sent to a text-to-speech model, including the translated text and the selected language configuration.
    - The response includes audio data and metadata, such as the sampling rate.

5. WAV File Generation

    The audio data is processed into a .wav file:

    - The audio data and sampling rate are sent to an endpoint that generates a .wav file.
    - The resulting file is stored and made available for playback or download.

## Project setup

> [!IMPORTANT]
>
>  I found out the best way to run the app with no issues, because of the intense resource this models use is to run it on gitpod. 

### Create your gitpod account set it up and download the extension for your browser by searching gitpod on your extension store.

### AWS setup
Please visit this like to learn how to get an overview of how to setup Aws and the environment variable in .env.example file. [AWS_SETUP](https://neon.tech/guides/next-upload-aws-s3)

### Fork the repo

Fork this repo and head to your fork

### Launch gitpod
If you have installed the extension correctly. when you open your fork of this repo you should a green button with Gitpod on it. click on it. this should take you to gitpod website. where the project would be setup for you. After the setup click on open with Vscode or your prefered editor. if you having issue with gitpod and vscode. go to this like to get how to properly set it up. [GITPOD SETUP](https://www.gitpod.io/docs/references/ides-and-editors/vscode). The repeat this step.

### Starting the app

Before starting the app, rename your `.env.example` file to `.env` file, and make sure the variables are set with the correct value. Then open yor terminal on vscode and type `npm run dev` this should start the app and offer to open up in a new browser window. when prompted, click yes.

## Enjoy the app
Enjoy!!!   
