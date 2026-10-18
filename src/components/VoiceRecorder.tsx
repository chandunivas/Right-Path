import React, { useState, useEffect, useRef } from "react";
import { Mic, Languages, AlertCircle, Square, Volume2 } from "lucide-react";
import { AZ_LANGUAGES, getLanguageOption } from "../data/languages";

interface VoiceRecorderProps {
  onTranscript: (text: string) => void;
  inputLanguage?: string;
  onInputLanguageChange?: (langName: string) => void;
}

export const VoiceRecorder: React.FC<VoiceRecorderProps> = ({
  onTranscript,
  inputLanguage = "Telugu",
  onInputLanguageChange,
}) => {
  const [isListening, setIsListening] = useState(false);
  const [selectedLangName, setSelectedLangName] = useState(inputLanguage);
  const [transcript, setTranscript] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const recognitionRef = useRef<any>(null);
  const isListeningRef = useRef<boolean>(false);
  const explicitlyStoppedRef = useRef<boolean>(false);
  
  // Track accumulated text across speech recognition session restarts
  const finalTranscriptRef = useRef<string>("");
  const interimTranscriptRef = useRef<string>("");

  // Store onTranscript in a ref so state updates in parent do NOT break or restart recording
  const onTranscriptRef = useRef(onTranscript);
  useEffect(() => {
    onTranscriptRef.current = onTranscript;
  }, [onTranscript]);

  useEffect(() => {
    if (inputLanguage && inputLanguage !== selectedLangName) {
      setSelectedLangName(inputLanguage);
    }
  }, [inputLanguage]);

  const activeLangOption = getLanguageOption(selectedLangName);

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setErrorMsg("Voice recognition is not natively supported in this browser window. You can also type your query directly.");
      return;
    }

    let recognition: any;
    try {
      recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = activeLangOption.code;
    } catch (e) {
      console.error("SpeechRecognition initialization error:", e);
      setErrorMsg("Speech recognition could not be initialized.");
      return;
    }

    recognition.onresult = (event: any) => {
      let currentInterim = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcriptChunk = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          const chunkTrimmed = transcriptChunk.trim();
          const currentFinal = finalTranscriptRef.current.trim();
          if (chunkTrimmed) {
            if (!currentFinal) {
              finalTranscriptRef.current = chunkTrimmed;
            } else if (!currentFinal.toLowerCase().endsWith(chunkTrimmed.toLowerCase())) {
              finalTranscriptRef.current = `${currentFinal} ${chunkTrimmed}`;
            }
          }
        } else {
          currentInterim += transcriptChunk;
        }
      }

      interimTranscriptRef.current = currentInterim;
      const combined = (finalTranscriptRef.current + " " + currentInterim).replace(/\s+/g, " ").trim();
      setTranscript(combined);
      
      if (onTranscriptRef.current) {
        onTranscriptRef.current(combined);
      }
    };

    recognition.onerror = (event: any) => {
      console.warn("Speech recognition notice:", event.error);
      if (event.error === "no-speech") {
        // Normal silence during speech; do not abort listening mode
        return;
      }
      if (event.error === "not-allowed" || event.error === "service-not-allowed") {
        explicitlyStoppedRef.current = true;
        isListeningRef.current = false;
        setIsListening(false);
        setErrorMsg("Microphone permission denied. Please allow microphone access in your browser site settings.");
      }
    };

    recognition.onend = () => {
      // Auto-reconnect seamlessly if user hasn't explicitly clicked STOP
      if (!explicitlyStoppedRef.current && isListeningRef.current) {
        setTimeout(() => {
          if (!explicitlyStoppedRef.current && isListeningRef.current && recognitionRef.current) {
            try {
              recognitionRef.current.start();
            } catch (e) {
              console.warn("Speech recognition auto-reconnect notice:", e);
            }
          }
        }, 120);
      } else {
        setIsListening(false);
      }
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (_) {}
      }
    };
  }, [activeLangOption.code]);

  const toggleListening = () => {
    setErrorMsg(null);
    if (!recognitionRef.current) {
      setErrorMsg("Voice input is not supported in this browser.");
      return;
    }

    if (isListening) {
      // User explicitly clicked STOP
      explicitlyStoppedRef.current = true;
      isListeningRef.current = false;
      try {
        recognitionRef.current.stop();
      } catch (_) {}
      setIsListening(false);
    } else {
      // User clicked START
      explicitlyStoppedRef.current = false;
      isListeningRef.current = true;
      finalTranscriptRef.current = "";
      interimTranscriptRef.current = "";
      setTranscript("");

      try {
        recognitionRef.current.lang = activeLangOption.code;
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err: any) {
        console.error("Failed to start speech recognition:", err);
        setErrorMsg("Failed to access microphone. Please check browser permissions.");
        isListeningRef.current = false;
        setIsListening(false);
      }
    }
  };

  const handleSelectLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    setSelectedLangName(newLang);
    if (onInputLanguageChange) {
      onInputLanguageChange(newLang);
    }
    if (isListening) {
      explicitlyStoppedRef.current = true;
      isListeningRef.current = false;
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (_) {}
      }
      setIsListening(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 w-full py-2">
      {/* Round Circular Voice Mic Symbol Button */}
      <div className="relative flex flex-col items-center justify-center">
        {/* Pulsing Aura Rings when listening */}
        {isListening && (
          <>
            <div className="absolute -inset-4 rounded-full bg-red-500/30 animate-ping pointer-events-none"></div>
            <div className="absolute -inset-8 rounded-full bg-red-500/15 animate-pulse pointer-events-none"></div>
          </>
        )}

        <button
          type="button"
          onClick={toggleListening}
          className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full flex flex-col items-center justify-center transition-all duration-300 shadow-xl cursor-pointer relative z-10 ${
            isListening
              ? "bg-gradient-to-tr from-red-600 via-rose-600 to-red-500 text-white ring-8 ring-red-200/80 scale-105 shadow-red-500/40"
              : "bg-gradient-to-tr from-emerald-600 via-teal-600 to-emerald-500 hover:from-emerald-500 hover:to-teal-500 text-white shadow-emerald-500/30 hover:scale-105 active:scale-95"
          }`}
          title={
            isListening
              ? "Click to STOP voice recording"
              : `Click circular microphone to speak in ${activeLangOption.name}`
          }
        >
          {isListening ? (
            <Square className="w-8 h-8 fill-current text-white shrink-0" />
          ) : (
            <Mic className="w-10 h-10 text-white shrink-0 animate-bounce" />
          )}
          <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider mt-1">
            {isListening ? "STOP" : "SPEAK"}
          </span>
        </button>
      </div>

      {/* Language Selector & Equalizer Visualizer */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
        <div className="relative flex items-center">
          <Languages className="w-4 h-4 text-slate-500 absolute left-3 pointer-events-none" />
          <select
            value={selectedLangName}
            onChange={handleSelectLanguage}
            className="pl-9 pr-3 py-2 text-xs font-bold bg-white hover:bg-slate-50 text-slate-800 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden cursor-pointer shadow-xs"
            title="Select Speaking Input Language"
          >
            {AZ_LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.name}>
                {lang.flag} {lang.name} ({lang.nativeName})
              </option>
            ))}
          </select>
        </div>

        {isListening && (
          <div className="flex items-center gap-2 px-3.5 py-1.5 bg-red-50 text-red-700 rounded-xl text-xs font-bold border border-red-200">
            <Volume2 className="w-4 h-4 text-red-600 animate-pulse" />
            <span>Mic Listening: Speak now in {activeLangOption.name}</span>
          </div>
        )}
      </div>

      {errorMsg && (
        <div className="max-w-md w-full flex items-center gap-2 text-xs text-amber-800 bg-amber-50 p-3 rounded-xl border border-amber-200">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {isListening && transcript && (
        <div className="max-w-xl w-full text-xs text-slate-700 bg-emerald-50/80 p-3 rounded-xl border border-emerald-200 text-center">
          <span className="text-slate-500 font-semibold block text-[10px] uppercase tracking-wider mb-1">Live Spoken Transcript</span>
          "<span className="text-slate-900 font-bold">{transcript}</span>"
        </div>
      )}
    </div>
  );
};
