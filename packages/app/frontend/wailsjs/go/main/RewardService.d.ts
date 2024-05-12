// Cynhyrchwyd y ffeil hon yn awtomatig. PEIDIWCH Â MODIWL
// This file is automatically generated. DO NOT EDIT
import {main} from '../models';

export function ClaimBonusRewards():Promise<void>;

export function ClaimCommissionRewards(arg1:Array<number>):Promise<void>;

export function CreateReward(arg1:main.Reward):Promise<main.Reward>;

export function DeleteReward(arg1:number):Promise<void>;

export function GetAvailableRewards():Promise<Array<main.Reward>>;

export function GetRewardIdsFromRewards(arg1:Array<main.Reward>):Promise<Array<string>>;

export function GetRewardsFromIds(arg1:Array<string>):Promise<Array<main.Reward>>;

export function GetRewardsFromRewardsString(arg1:string):Promise<Array<main.Reward>>;

export function SetupRewardsForToday():Promise<Array<main.Reward>>;
