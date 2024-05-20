import { Route, Controller } from '../router';

@Controller('rewardService')
export class RewardService {
  @Route()
  getAvailableRewards() {
    return [];
  }

  @Route()
  addReward(description: string, realm: string, rewards: any[]) {
    return {};
  }

  @Route()
  deleteReward(id: number) {
    return;
  }

  @Route()
  getAvailableRealms() {
    return [];
  }

  @Route()
  addRealm(realm: string) {
    return;
  }

  @Route()
  addRealms(realms: string[]) {
    return;
  }

  @Route()
  deleteRealm(realm: string) {
    return;
  }
}
