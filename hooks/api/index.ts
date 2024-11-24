import {
  imageToText,
  genTextToSpeech,
  getWavAudio,
  uploadImage,
  genTextToSpeechLang,
  getTranslation, getAnswer,
} from "@/app/services";
import { useMutation} from "@tanstack/react-query";

export const useTextToSpeach = () => {
  return useMutation({
    mutationKey: ["text-to-speech"],
    mutationFn: ({ text }: { text: string }) => genTextToSpeech({ text }),
  });
};

export const useTextToSpeachLang = () => {
  return useMutation({
    mutationKey: ["text-to-speech-lang"],
    mutationFn: ({ text, modal }: { text: string; modal: string }) =>
      genTextToSpeechLang({ text, modal }),
  });
};

export const useGenWav = () => {
  return useMutation({
    mutationKey: ["gen-wav"],
    mutationFn: ({
      sampling_rate,
      audio,
      name,
    }: {
      sampling_rate: number;
      audio: Float32Array;
      name: string;
    }) => getWavAudio({ sampling_rate, audio, name }),
  });
};

export const useImageToText = () => {
  return useMutation({
    mutationKey: ["image-to-text"],
    mutationFn: ({ url }: { url: string }) => imageToText({ url }),
  });
};

export const useUploadImage = () => {
  return useMutation({
    mutationKey: ["upload-image"],
    mutationFn: ({ form }: { form: FormData }) => uploadImage({ form }),
  });
};

export const useTranslator = () => {
  return useMutation({
    mutationKey: ["translator"],
    mutationFn: ({ text, code }: { text: string; code: string }) =>
      getTranslation({ text, code }),
  });
};

export const useGetAnswer = () => {
  return useMutation({
    mutationKey: ["qa__"],
    mutationFn: ({ text, key }: { text: string; key: string }) => getAnswer({ key, text})
  })
}