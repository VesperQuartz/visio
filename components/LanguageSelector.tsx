import { modal } from "@/app/constant";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LanguageSelectorProps {
  onLanguageChange: (language: string) => void;
}

export default function LanguageSelector({
  onLanguageChange,
}: LanguageSelectorProps) {
  return (
    <div className="flex items-center space-x-2">
      <label
        htmlFor="language-select"
        className="text-sm font-medium text-gray-700"
      >
        Select Language:
      </label>
      <Select
        onValueChange={onLanguageChange}
        defaultValue="Xenova/speecht5_tts"
      >
        <SelectTrigger className="w-[180px]" id="language-select">
          <SelectValue placeholder="Select a language" />
        </SelectTrigger>
        <SelectContent>
          {modal.map((lang) => (
            <SelectItem key={lang.code} value={lang.model}>
              {lang.lang}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
