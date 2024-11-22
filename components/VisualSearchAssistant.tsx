"use client";

import React from "react";
import ImageUpload from "./ImageUpload";
import DescriptionDisplay from "./DescriptionDisplay";
import AudioPlayback from "./AudioPlayback";
import { Card, CardContent } from "@/components/ui/card";
import {useGenWav, useImageToText, useTextToSpeachLang, useTranslator, useUploadImage} from "@/hooks/api";
import LanguageSelector from "./LanguageSelector";
import { modal } from "@/app/constant";
import Image from "next/image";

export default function VisualSearchAssistant() {
  const [imageUrl, setImageUrl] = React.useState<string | null>(null);
  const [description, setDescription] = React.useState<string>("");
  const [language, setLanguage] = React.useState<string>("Xenova/mms-tts-eng");
  const [path, setPath] = React.useState<string| null>(null);
  const code = modal.find((lang) => lang.model === language)?.code || "en";
  const upload = useUploadImage();
  const iToText = useImageToText();
  const translator = useTranslator();
  const tts = useTextToSpeachLang();
  const wav = useGenWav();

  const handleImageUpload = async (file: File) => {
    const url = URL.createObjectURL(file);
    setImageUrl(url);

    const formData = new FormData();
    formData.append("image", file);

    try {
      upload.mutate(
        { form: formData },
        {
          onSuccess: (data) => {
            iToText.mutate(
              { url: data?.key },
              {
                onSuccess: (data) => {
                  translator.mutate(
                    { text: data[0].generated_text, code },
                    {
                      onSuccess: (data) => {
                        console.log("data-desc", data);
                        setDescription(data[0]?.translation_text);
                        console.log("lang", language, data);
                        tts.mutate({text: data[0]?.translation_text, modal: language}, {
                          onSuccess: (data) => {
                            wav.mutate({sampling_rate: data.sampling_rate, audio: data.audio, name: crypto.randomUUID()}, {
                              onSuccess: (data) => {
                                setPath(data.audio);
                              }
                            })
                          }
                        })
                      },
                    },
                  );
                },
              },
            );
          },
        },
      );
    } catch (error) {
      console.error("Error processing image:", error);
      setDescription("Failed to process image. Please try again.");
    }
  };
  console.log("upload data", upload?.data);

  const renderStatusMessage = () => {
    if (upload.isPending) {
      return <p>Please wait while we process your image...</p>;
    }
    if (iToText.isPending) {
      return <p>Processing image and extracting information, please wait...</p>;
    }
    if (translator.isPending) {
      return <p>Wait while we translate your text...</p>;
    }
    if (tts.isPending) {
      return <p>Wait while we process the audio...</p>;
    }
    if (wav.isPending) {
      return <p>Generating audio file, please wait...</p>;
    }
    return null;
  };


  return (
    <div className="w-full">
      <Card className="bg-white/90 backdrop-blur-sm shadow-xl rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
        <CardContent className="p-6 space-y-6">
          <LanguageSelector onLanguageChange={setLanguage} sideEffect={setPath} />
          <ImageUpload  onImageUpload={handleImageUpload} />
          {imageUrl && (
            <div className="mt-4 flex justify-center">
              <Image
                src={imageUrl}
                alt="Uploaded image"
                className="max-w-full max-h-[50vh] object-contain rounded-lg shadow-md transition-all duration-300 hover:scale-105"
              />
            </div>
          )}
          {renderStatusMessage()}
          {description && (
            <div className="space-y-4" key={crypto.randomUUID()}>
              <DescriptionDisplay description={description} />
              <AudioPlayback path={path!} />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
