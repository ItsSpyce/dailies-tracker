import { RewardService, images } from '@dailies-tracker/ui';
import * as app from '@/internal/main/App';

function getAvailableRewards() {
  return app.GetAvailableRewards();
}

function addReward(name: string, cost: number, imageBase64: string) {
  return app.CreateReward(name, cost, imageBase64);
}

function deleteReward(id: number) {
  return app.DeleteReward(id);
}

function convertImageUrlToBase64(imageUrl: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.onerror = reject;
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', imageUrl);
    xhr.responseType = 'blob';
    xhr.send();
  });
}

// TODO: switch this to an atom probably
export async function rewardService(): Promise<RewardService> {
  const rewards = await getAvailableRewards();
  if (rewards.length === 0) {
    await addReward(
      'Primos',
      400,
      await convertImageUrlToBase64(images.Primos)
    );
    await addReward('ARExp', 200, await convertImageUrlToBase64(images.ARExp));
    await addReward(
      'Cleaning Points',
      150,
      await convertImageUrlToBase64(images.CleanPoints)
    );
    await addReward(
      'Creative Points',
      150,
      await convertImageUrlToBase64(images.CreativePoints)
    );
    await addReward(
      'Health',
      100,
      await convertImageUrlToBase64(images.HealthPoints)
    );
  }
  return {
    getAvailableRewards,
    addReward,
    deleteReward,
  };
}
