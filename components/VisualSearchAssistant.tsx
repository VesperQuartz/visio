"use client";

import React from "react";
import { match } from "ts-pattern";
import ImageUpload from "./ImageUpload";
import DescriptionDisplay from "./DescriptionDisplay";
import AudioPlayback from "./AudioPlayback";
import { Card, CardContent } from "@/components/ui/card";
import { useImageToText, useTranslator, useUploadImage } from "@/hooks/api";
import LanguageSelector from "./LanguageSelector";
import { modal } from "@/app/constant";

export default function VisualSearchAssistant() {
  const [imageUrl, setImageUrl] = React.useState<string | null>(null);
  const [description, setDescription] = React.useState<string>("");
  const [language, setLanguage] = React.useState<string>("Xenova/speecht5_tts");
  const code = modal.find((lang) => lang.model === language)?.code || "en";
  const upload = useUploadImage();
  const iToText = useImageToText();
  const translator = useTranslator();

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

  return (
    <div className="w-full">
      <Card className="bg-white/90 backdrop-blur-sm shadow-xl rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
        <CardContent className="p-6 space-y-6">
          <LanguageSelector onLanguageChange={setLanguage} />
          <ImageUpload onImageUpload={handleImageUpload} />
          {imageUrl && (
            <div className="mt-4 flex justify-center">
              <img
                src={imageUrl}
                alt="Uploaded image"
                className="max-w-full max-h-[50vh] object-contain rounded-lg shadow-md transition-all duration-300 hover:scale-105"
              />
            </div>
          )}
          {match(upload.isPending)
            .with(true, () => (
              <p>Please wait while we processing your image...</p>
            ))
            .with(false, () =>
              match(iToText.isPending)
                .with(true, () => (
                  <p>
                    Processing image and extracting information, please wait...
                  </p>
                ))
                .with(false, () =>
                  match(translator.isPending)
                    .with(true, () => <p>Wait while we translate your text</p>)
                    .with(false, () => null)
                    .exhaustive(),
                )
                .exhaustive(),
            )
            .exhaustive()}
          {description && (
            <div className="space-y-4" key={crypto.randomUUID()}>
              <DescriptionDisplay description={description} />
              <AudioPlayback text={description} />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
