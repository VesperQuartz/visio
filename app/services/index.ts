export const genTextToSpeech = async ({ text }: { text: string }) => {
  const response = await fetch("/api/text-to-speech", {
    method: "POST",
    body: JSON.stringify({ text }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data as { audio: Float32Array; sampling_rate: number };
};

export const genTextToSpeechLang = async ({
  text,
  modal,
}: {
  text: string;
  modal: string;
}) => {
  const response = await fetch("/api/text-to-speech-lang", {
    method: "POST",
    body: JSON.stringify({ text, modal }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data as { audio: Float32Array; sampling_rate: number };
};

export const getWavAudio = async ({
  sampling_rate,
  audio,
  name,
}: {
  audio: Float32Array;
  sampling_rate: number;
  name: string;
}) => {
  const response = await fetch("/api/speech-to-audio", {
    method: "POST",
    body: JSON.stringify({ sampling_rate, audio, name }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data as { audio: string };
};

export const uploadImage = async ({ form }: { form: FormData }) => {
  const response = await fetch("/api/image", {
    method: "POST",
    body: form,
  });
  const json = await response.json();
  return json as { key: string };
};

export const imageToText = async ({ url }: { url: string }) => {
  const response = await fetch("/api/image-to-text", {
    method: "POST",
    body: JSON.stringify({ url }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return (await response.json()) as Array<{ generated_text: string }>;
};

export const getTranslation = async ({
  text,
  code,
}: {
  text: string;
  code: string;
}) => {
  const response = await fetch("/api/translator", {
    method: "POST",
    body: JSON.stringify({ text, code }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data as Array<{ translation_text: string }>;
};
