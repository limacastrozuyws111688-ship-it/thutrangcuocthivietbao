import { GoogleGenAI, Modality } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

let audioContext: AudioContext | null = null;

async function getAudioContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioContext.state === 'suspended') {
    await audioContext.resume();
  }
  return audioContext;
}

export async function speakText(text: string, voice: 'Kore' | 'Zephyr' | 'Puck' | 'Charon' | 'Fenrir' = 'Kore') {
  try {
    // Clean text: limited length and no markdown, preserve punctuation for better prosody
    const cleanText = text.substring(0, 2000)
      .replace(/[*#_`]/g, '')
      .replace(/\\"/g, '"');
    
    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-tts-preview",
      contents: [{ 
        parts: [{ 
          text: `Hãy đóng vai một biên tập viên truyền hình chuyên nghiệp. Hãy đọc văn bản tiếng Việt sau đây một cách rành mạch, diễn cảm với giọng đọc bản tin chuẩn. YÊU CẦU: Không dịch bất kỳ từ nào sang tiếng Anh, không bỏ sót từ, không tự ý thêm bớt. Cần giữ âm điệu tiếng Việt tự nhiên nhất: ${cleanText}` 
        }] 
      }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: voice },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (base64Audio) {
      const binaryString = atob(base64Audio);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      
      const audioBuffer = bytes.buffer;
      const int16Array = new Int16Array(audioBuffer);
      const float32Array = new Float32Array(int16Array.length);
      for (let i = 0; i < int16Array.length; i++) {
        float32Array[i] = int16Array[i] / 32768.0;
      }

      const ctx = await getAudioContext();
      const buffer = ctx.createBuffer(1, float32Array.length, 24000);
      buffer.getChannelData(0).set(float32Array);

      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(ctx.destination);
      source.start();
      
      return source;
    }
  } catch (error) {
    console.error("Gemini TTS Error Details:", error);
    throw error;
  }
}
