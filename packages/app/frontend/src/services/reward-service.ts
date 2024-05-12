import { RewardService, images } from '@dailies-tracker/ui';
import * as rewardServiceImpl from '@/internal/main/RewardService';

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
  const rewards = await rewardServiceImpl.GetAvailableRewards();
  if (rewards.length === 0) {
    const createdRewards = await Promise.all([
      rewardServiceImpl.CreateReward({
        type: 'Primos',
        count: 400,
        imageBase64: await convertImageUrlToBase64(images.Primos),
        id: 0,
      }),
      rewardServiceImpl.CreateReward({
        type: 'ARExp',
        count: 200,
        imageBase64: await convertImageUrlToBase64(images.ARExp),
        id: 0,
      }),
      rewardServiceImpl.CreateReward({
        type: 'Cleaning Points',
        count: 150,
        imageBase64: await convertImageUrlToBase64(images.CleanPoints),
        id: 0,
      }),
      rewardServiceImpl.CreateReward({
        type: 'Creative Points',
        count: 150,
        imageBase64: await convertImageUrlToBase64(images.CreativePoints),
        id: 0,
      }),
      rewardServiceImpl.CreateReward({
        type: 'Health',
        count: 100,
        imageBase64: await convertImageUrlToBase64(images.HealthPoints),
        id: 0,
      }),
    ]);
    console.log('Created rewards', createdRewards);
  } else {
    console.log('Existing rewards', rewards);
  }
  return {
    getAvailableRewards() {
      return rewardServiceImpl.GetAvailableRewards();
    },
    addReward(type: string, count: number, imageBase64: string) {
      return rewardServiceImpl.CreateReward({
        type,
        count,
        imageBase64,
        id: 0,
      });
    },
    deleteReward(id: number) {
      return rewardServiceImpl.DeleteReward(id);
    },
    async claimDailyRewards() {
      //
    },
    setupForNewDay() {
      return rewardServiceImpl.SetupRewardsForToday();
    },
  };
}
