import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Language {
  id: string;
  name: string;
  version: string;
}

interface LanguageSelectorProps {
  languages: Language[];
  selectedLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

export function LanguageSelector({
  languages,
  selectedLanguage,
  onLanguageChange,
}: LanguageSelectorProps) {
  return (
    <div className="relative inline-block">
      <select
        value={selectedLanguage.id}
        onChange={(e) => {
          const selected = languages.find(lang => lang.id === e.target.value);
          if (selected) onLanguageChange(selected);
        }}
        className={cn(
          "appearance-none w-[200px] px-4 py-2 pr-8 rounded-md border border-input",
          "bg-background text-foreground focus:outline-none focus:ring-2",
          "focus:ring-ring focus:border-input cursor-pointer"
        )}
      >
        {languages.map((language) => (
          <option key={language.id} value={language.id}>
            {language.name} ({language.version})
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-50 pointer-events-none" />
    </div>
  );
}