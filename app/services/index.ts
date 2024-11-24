const logError = (error: unknown, context: string) => {
  console.error(`Error in ${context}:`, error);
};

export const genTextToSpeech = async ({ text }: { text: string }) => {
  try {
    const response = await fetch("/api/text-to-speech", {
      method: "POST",
      body: JSON.stringify({ text }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Text-to-Speech API responded with ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();
    return data as { audio: Float32Array; sampling_rate: number };
  } catch (error) {
    logError(error, "genTextToSpeech");
    throw error; // Re-throw the error for higher-level handling
  }
};

export const genTextToSpeechLang = async ({ text, modal }: { text: string; modal: string }) => {
  try {
    const response = await fetch("/api/text-to-speech-lang", {
      method: "POST",
      body: JSON.stringify({ text, modal }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Text-to-Speech (Lang) API responded with ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();
    return data as { audio: Float32Array; sampling_rate: number };
  } catch (error) {
    logError(error, "genTextToSpeechLang");
    throw error;
  }
};

export const getWavAudio = async ({ audio, sampling_rate, name }: { audio: Float32Array; sampling_rate: number; name: string }) => {
  try {
    const response = await fetch("/api/speech-to-audio", {
      method: "POST",
      body: JSON.stringify({ sampling_rate, audio, name }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Speech-to-Audio API responded with ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();
    return data as { audio: string };
  } catch (error) {
    logError(error, "getWavAudio");
    throw error;
  }
};

export const uploadImage = async ({ form }: { form: FormData }) => {
  try {
    const response = await fetch("/api/image", {
      method: "POST",
      body: form,
    });
    if (!response.ok) {
      throw new Error(`Image Upload API responded with ${response.status}: ${response.statusText}`);
    }
    const json = await response.json();
    return json as { key: string };
  } catch (error) {
    logError(error, "uploadImage");
    throw error;
  }
};

export const imageToText = async ({ url }: { url: string }) => {
  try {
    const response = await fetch("/api/image-to-text", {
      method: "POST",
      body: JSON.stringify({ url }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Image-to-Text API responded with ${response.status}: ${response.statusText}`);
    }
    return (await response.json()) as Array<{ generated_text: string }>;
  } catch (error) {
    logError(error, "imageToText");
    throw error;
  }
};

export const getTranslation = async ({ text, code }: { text: string; code: string }) => {
  try {
    const response = await fetch("/api/translator", {
      method: "POST",
      body: JSON.stringify({ text, code }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Translation API responded with ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();
    return data as Array<{ translation_text: string }>;
  } catch (error) {
    logError(error, "getTranslation");
    throw error;
  }
};

export const getAnswer = async ({ text, key }: { text: string; key: string }) => {
  try {
    const response = await fetch("/api/qa-assistant", {
      method: "POST",
      body: JSON.stringify({ text, key }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`QA API responded with ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();
    return data as Array<{ answer: string }>;
  } catch (error) {
    logError(error, "getAnswer");
    throw error;
  }
};
