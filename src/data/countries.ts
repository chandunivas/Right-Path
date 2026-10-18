export interface CountryInfo {
  code: string;
  name: string;
  flag: string;
  defaultCurrency: string;
  languages: { code: string; name: string }[];
  states: string[];
}

export const COUNTRIES: CountryInfo[] = [
  {
    code: "IN",
    name: "India",
    flag: "🇮🇳",
    defaultCurrency: "INR (₹)",
    languages: [
      { code: "English", name: "English" },
      { code: "Hindi", name: "Hindi (हिंदी)" },
      { code: "Tamil", name: "Tamil (தமிழ்)" },
      { code: "Telugu", name: "Telugu (తెలుగు)" },
      { code: "Bengali", name: "Bengali (বাংলা)" },
      { code: "Marathi", name: "Marathi (मराठी)" },
      { code: "Gujarati", name: "Gujarati (ગુજરાતી)" },
      { code: "Kannada", name: "Kannada (கன்னட)" },
      { code: "Malayalam", name: "Malayalam (മലയാളം)" },
      { code: "Punjabi", name: "Punjabi (ਪੰਜਾਬੀ)" },
    ],
    states: [
      "Andhra Pradesh",
      "Assam",
      "Bihar",
      "Delhi",
      "Gujarat",
      "Haryana",
      "Karnataka",
      "Kerala",
      "Madhya Pradesh",
      "Maharashtra",
      "Punjab",
      "Rajasthan",
      "Tamil Nadu",
      "Telangana",
      "Uttar Pradesh",
      "West Bengal",
      "Other State/UT",
    ],
  },
  {
    code: "US",
    name: "United States",
    flag: "🇺🇸",
    defaultCurrency: "USD ($)",
    languages: [
      { code: "English", name: "English" },
      { code: "Spanish", name: "Spanish (Español)" },
    ],
    states: [
      "California",
      "New York",
      "Texas",
      "Florida",
      "Illinois",
      "Pennsylvania",
      "Ohio",
      "Georgia",
      "Washington",
      "Other State",
    ],
  },
  {
    code: "GB",
    name: "United Kingdom",
    flag: "🇬🇧",
    defaultCurrency: "GBP (£)",
    languages: [
      { code: "English", name: "English" },
      { code: "Welsh", name: "Welsh" },
    ],
    states: ["England", "Scotland", "Wales", "Northern Ireland"],
  },
  {
    code: "CA",
    name: "Canada",
    flag: "🇨🇦",
    defaultCurrency: "CAD ($)",
    languages: [
      { code: "English", name: "English" },
      { code: "French", name: "French (Français)" },
    ],
    states: [
      "Ontario",
      "Quebec",
      "British Columbia",
      "Alberta",
      "Manitoba",
      "Nova Scotia",
      "Other Province",
    ],
  },
  {
    code: "AU",
    name: "Australia",
    flag: "🇦🇺",
    defaultCurrency: "AUD ($)",
    languages: [{ code: "English", name: "English" }],
    states: [
      "New South Wales",
      "Victoria",
      "Queensland",
      "Western Australia",
      "South Australia",
      "Tasmania",
    ],
  },
];
