const { contextBridge, ipcRenderer } = require('electron/renderer');

contextBridge.exposeInMainWorld('commissionService', {
  getCommissions(unixDate: string) {
    return ipcRenderer.invoke('commissionService:getCommissions', unixDate);
  },
  addCommission(description: string, realm: string, rewards: any[]) {
    return ipcRenderer.invoke(
      'commissionService:addCommission',
      description,
      realm,
      rewards
    );
  },
  deleteCommission(id: number) {
    return ipcRenderer.invoke('commissionService:deleteCommission', id);
  },
  getAvailableRealms() {
    return ipcRenderer.invoke('commissionService:getAvailableRealms');
  },
  addRealm(realm: string) {
    return ipcRenderer.invoke('commissionService:addRealm', realm);
  },
  addRealms(realms: string[]) {
    return ipcRenderer.invoke('commissionService:addRealms', realms);
  },
  deleteRealm(realm: string) {
    return ipcRenderer.invoke('commissionService:deleteRealm', realm);
  },
});
contextBridge.exposeInMainWorld('claimsService', {
  setupClaimsForToday() {
    return ipcRenderer.invoke('claimsService:setupClaimsForToday');
  },
  claimCommissionForToday(commissionId: number) {
    return ipcRenderer.invoke(
      'claimsService:claimCommissionForToday',
      commissionId
    );
  },
  claimDailyBonusForToday() {
    return ipcRenderer.invoke('claimsService:claimDailyBonusForToday');
  },
  isTodaysBonusClaimed() {
    return ipcRenderer.invoke('claimsService:isTodaysBonusClaimed');
  },
  clearTodaysClaims() {
    return ipcRenderer.invoke('claimsService:clearTodaysClaims');
  },
});
contextBridge.exposeInMainWorld('rewardService', {
  getAvailableRewards() {
    return ipcRenderer.invoke('rewardService:getAvailableRewards');
  },
  addReward(description: string, amount: number, imageBase64: string) {
    return ipcRenderer.invoke(
      'rewardService:addReward',
      description,
      amount,
      imageBase64
    );
  },
  deleteReward(id: number) {
    return ipcRenderer.invoke('rewardService:deleteReward', id);
  },
  updateReward(reward: any) {
    return ipcRenderer.invoke('rewardService:updateReward', reward);
  },
});
