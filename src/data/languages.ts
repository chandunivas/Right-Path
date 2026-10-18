export interface LanguageOption {
  code: string; // e.g. "hi-IN" or "en-US"
  name: string; // e.g. "Hindi"
  nativeName: string; // e.g. "हिंदी"
  flag?: string;
}

export const AZ_LANGUAGES: LanguageOption[] = [
  { code: "af-ZA", name: "Afrikaans", nativeName: "Afrikaans", flag: "🇿🇦" },
  { code: "sq-AL", name: "Albanian", nativeName: "Shqip", flag: "🇦🇱" },
  { code: "am-ET", name: "Amharic", nativeName: "አማርኛ", flag: "🇪🇹" },
  { code: "ar-SA", name: "Arabic", nativeName: "العربية", flag: "🇸🇦" },
  { code: "hy-AM", name: "Armenian", nativeName: "Հայերեն", flag: "🇦🇲" },
  { code: "az-AZ", name: "Azerbaijani", nativeName: "Azərbaycan", flag: "🇦🇿" },
  { code: "eu-ES", name: "Basque", nativeName: "Euskara", flag: "🇪🇸" },
  { code: "bn-IN", name: "Bengali", nativeName: "বাংলা", flag: "🇮🇳" },
  { code: "bs-BA", name: "Bosnian", nativeName: "Bosanski", flag: "🇧🇦" },
  { code: "bg-BG", name: "Bulgarian", nativeName: "Български", flag: "🇧🇬" },
  { code: "my-MM", name: "Burmese (Myanmar)", nativeName: "မြန်မာစာ", flag: "🇲🇲" },
  { code: "ca-ES", name: "Catalan", nativeName: "Català", flag: "🇪🇸" },
  { code: "zh-CN", name: "Chinese (Simplified)", nativeName: "中文 (简体)", flag: "🇨🇳" },
  { code: "zh-HK", name: "Chinese (Cantonese)", nativeName: "粵語 (香港)", flag: "🇭🇰" },
  { code: "hr-HR", name: "Croatian", nativeName: "Hrvatski", flag: "🇭🇷" },
  { code: "cs-CZ", name: "Czech", nativeName: "Čeština", flag: "🇨🇿" },
  { code: "da-DK", name: "Danish", nativeName: "Dansk", flag: "🇩🇰" },
  { code: "nl-NL", name: "Dutch", nativeName: "Nederlands", flag: "🇳🇱" },
  { code: "en-US", name: "English (US)", nativeName: "English (US)", flag: "🇺🇸" },
  { code: "en-GB", name: "English (UK)", nativeName: "English (UK)", flag: "🇬🇧" },
  { code: "en-IN", name: "English (India)", nativeName: "English (India)", flag: "🇮🇳" },
  { code: "et-EE", name: "Estonian", nativeName: "Eesti", flag: "🇪🇪" },
  { code: "tl-PH", name: "Filipino (Tagalog)", nativeName: "Wikang Filipino", flag: "🇵🇭" },
  { code: "fi-FI", name: "Finnish", nativeName: "Suomi", flag: "🇫🇮" },
  { code: "fr-FR", name: "French", nativeName: "Français", flag: "🇫🇷" },
  { code: "gl-ES", name: "Galician", nativeName: "Galego", flag: "🇪🇸" },
  { code: "ka-GE", name: "Georgian", nativeName: "ქართული", flag: "🇬🇪" },
  { code: "de-DE", name: "German", nativeName: "Deutsch", flag: "🇩🇪" },
  { code: "el-GR", name: "Greek", nativeName: "Ελληνικά", flag: "🇬🇷" },
  { code: "gu-IN", name: "Gujarati", nativeName: "ગુજરાતી", flag: "🇮🇳" },
  { code: "he-IL", name: "Hebrew", nativeName: "עברית", flag: "🇮🇱" },
  { code: "hi-IN", name: "Hindi", nativeName: "हिंदी", flag: "🇮🇳" },
  { code: "hu-HU", name: "Hungarian", nativeName: "Magyar", flag: "🇭🇺" },
  { code: "is-IS", name: "Icelandic", nativeName: "Íslenska", flag: "🇮🇸" },
  { code: "id-ID", name: "Indonesian", nativeName: "Bahasa Indonesia", flag: "🇮🇩" },
  { code: "it-IT", name: "Italian", nativeName: "Italiano", flag: "🇮🇹" },
  { code: "ja-JP", name: "Japanese", nativeName: "日本語", flag: "🇯🇵" },
  { code: "jw-ID", name: "Javanese", nativeName: "Basa Jawa", flag: "🇮🇩" },
  { code: "kn-IN", name: "Kannada", nativeName: "ಕನ್ನಡ", flag: "🇮🇳" },
  { code: "kk-KZ", name: "Kazakh", nativeName: "Қазақ тілі", flag: "🇰🇿" },
  { code: "km-KH", name: "Khmer", nativeName: "ភាសាខ្មែរ", flag: "🇰🇭" },
  { code: "ko-KR", name: "Korean", nativeName: "한국어", flag: "🇰🇷" },
  { code: "lo-LA", name: "Lao", nativeName: "ພາສາລາວ", flag: "🇱🇦" },
  { code: "lv-LV", name: "Latvian", nativeName: "Latviešu", flag: "🇱🇻" },
  { code: "lt-LT", name: "Lithuanian", nativeName: "Lietuvių", flag: "🇱🇹" },
  { code: "mk-MK", name: "Macedonian", nativeName: "Makedonski", flag: "🇲🇰" },
  { code: "ms-MY", name: "Malay", nativeName: "Bahasa Melayu", flag: "🇲🇾" },
  { code: "ml-IN", name: "Malayalam", nativeName: "മലയാളം", flag: "🇮🇳" },
  { code: "mr-IN", name: "Marathi", nativeName: "मराठी", flag: "🇮🇳" },
  { code: "mn-MN", name: "Mongolian", nativeName: "Монгол", flag: "🇲🇳" },
  { code: "ne-NP", name: "Nepali", nativeName: "नेपाली", flag: "🇳🇵" },
  { code: "nb-NO", name: "Norwegian", nativeName: "Norsk", flag: "🇳🇴" },
  { code: "fa-IR", name: "Persian (Farsi)", nativeName: "فارسی", flag: "🇮🇷" },
  { code: "pl-PL", name: "Polish", nativeName: "Polski", flag: "🇵🇱" },
  { code: "pt-BR", name: "Portuguese (Brazil)", nativeName: "Português (Brasil)", flag: "🇧🇷" },
  { code: "pt-PT", name: "Portuguese (Portugal)", nativeName: "Português (Portugal)", flag: "🇵🇹" },
  { code: "pa-IN", name: "Punjabi", nativeName: "ਪੰਜਾਬੀ", flag: "🇮🇳" },
  { code: "ro-RO", name: "Romanian", nativeName: "Română", flag: "🇷🇴" },
  { code: "ru-RU", name: "Russian", nativeName: "Русский", flag: "🇷🇺" },
  { code: "sr-RS", name: "Serbian", nativeName: "Српски", flag: "🇷🇸" },
  { code: "si-LK", name: "Sinhala", nativeName: "සිංහල", flag: "🇱🇰" },
  { code: "sk-SK", name: "Slovak", nativeName: "Slovenčina", flag: "🇸🇰" },
  { code: "sl-SI", name: "Slovenian", nativeName: "Slovenščina", flag: "🇸🇮" },
  { code: "so-SO", name: "Somali", nativeName: "Soomaali", flag: "🇸🇴" },
  { code: "es-ES", name: "Spanish", nativeName: "Español", flag: "🇪🇸" },
  { code: "sw-KE", name: "Swahili", nativeName: "Kiswahili", flag: "🇰🇪" },
  { code: "sv-SE", name: "Swedish", nativeName: "Svenska", flag: "🇸🇪" },
  { code: "ta-IN", name: "Tamil", nativeName: "தமிழ்", flag: "🇮🇳" },
  { code: "te-IN", name: "Telugu", nativeName: "తెలుగు", flag: "🇮🇳" },
  { code: "th-TH", name: "Thai", nativeName: "ไทย", flag: "🇹🇭" },
  { code: "tr-TR", name: "Turkish", nativeName: "Türkçe", flag: "🇹🇷" },
  { code: "uk-UA", name: "Ukrainian", nativeName: "Українська", flag: "🇺🇦" },
  { code: "ur-PK", name: "Urdu", nativeName: "اردو", flag: "🇵🇰" },
  { code: "uz-UZ", name: "Uzbek", nativeName: "O‘zbekcha", flag: "🇺🇿" },
  { code: "vi-VN", name: "Vietnamese", nativeName: "Tiếng Việt", flag: "🇻🇳" },
  { code: "cy-GB", name: "Welsh", nativeName: "Cymraeg", flag: "🏴󠁧󠁢󠁷󠁬󠁳 red;" },
  { code: "xh-ZA", name: "Xhosa", nativeName: "isiXhosa", flag: "🇿🇦" },
  { code: "yi", name: "Yiddish", nativeName: "ייִדיש", flag: "✡️" },
  { code: "zu-ZA", name: "Zulu", nativeName: "isiZulu", flag: "🇿🇦" },
];

/**
 * Returns BCP-47 speech code (e.g., 'hi-IN') for a given language name or code
 */
export function getSpeechLanguageCode(langNameOrCode: string): string {
  if (!langNameOrCode) return "en-US";
  const normalized = langNameOrCode.toLowerCase().trim();

  const found = AZ_LANGUAGES.find(
    (l) =>
      l.name.toLowerCase() === normalized ||
      l.code.toLowerCase() === normalized ||
      l.nativeName.toLowerCase() === normalized ||
      l.name.toLowerCase().includes(normalized) ||
      normalized.includes(l.name.toLowerCase())
  );

  return found ? found.code : "en-US";
}

/**
 * Returns LanguageOption for a given name or code
 */
export function getLanguageOption(langNameOrCode: string): LanguageOption {
  const code = getSpeechLanguageCode(langNameOrCode);
  return AZ_LANGUAGES.find((l) => l.code === code) || AZ_LANGUAGES[18]; // English (US)
}
