import { LangService } from '@dailies-tracker/ui';
import * as app from '@/internal/main/App';

export async function langService(): Promise<LangService> {
  return {
    async getLang(): Promise<string> {
      return await app.GetLocale();
    },
    async setLang(lang: string): Promise<void> {
      await app.SetLocale(lang);
    },
  };
}
