export interface LangService {
  setLang(lang: string): Promise<void>;
  getLang(): Promise<string>;
}
