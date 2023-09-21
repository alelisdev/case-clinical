import { Orientation, RegionTarget } from '../../typings/body-region';
import { Gender } from '../../typings/gender';
import { IRegion } from '../../typings/region.model';

export const MALE_BACK_REGION_ID = {
  HEAD: 'MALE_BACK_HEAD_ID',
  RIGHT_ARM: 'MALE_BACK_RIGHT_ARM_ID',
  RIGHT_HAND: 'MALE_BACK_RIGHT_HAND_ID',
  LEFT_HAND: 'MALE_BACK_LEFT_HAND_ID',
  LEFT_ARM: 'FRONT_LEFT_ARM_ID',
  CHEST: 'FRONT_CHEST_ID',
  WAIST: 'FRONT_WAIST_ID',
  RIGHT_LEG: 'FRONT_RIGHT_LEG_ID',
  LEFT_LEG: 'FRONT_LEFT_LEG_ID'
};

export const maleBackRegions: IRegion[] = [
  {
    id: MALE_BACK_REGION_ID.HEAD,
    target: RegionTarget.Head,
    gender: Gender.Male,
    label: 'Head',
    orientation: Orientation.Back,
    x: 85,
    y: 0,
    width: 75,
    height: 100
  },
  {
    id: MALE_BACK_REGION_ID.LEFT_ARM,
    gender: Gender.Male,
    label: 'Left arm',
    target: RegionTarget.LeftArm,
    orientation: Orientation.Back,
    x: 0,
    y: 100,
    width: 60,
    height: 198
  },
  {
    id: MALE_BACK_REGION_ID.LEFT_HAND,
    target: RegionTarget.LeftHand,
    gender: Gender.Male,
    label: 'Left hand',
    orientation: Orientation.Back,
    x: 0,
    y: 300,
    width: 60,
    height: 80
  },
  {
    id: MALE_BACK_REGION_ID.RIGHT_HAND,
    target: RegionTarget.RightHand,
    label: 'Right hand',
    gender: Gender.Male,
    orientation: Orientation.Back,
    x: 180,
    y: 300,
    width: 52,
    height: 80
  },
  {
    id: MALE_BACK_REGION_ID.RIGHT_ARM,
    target: RegionTarget.RightArm,
    label: 'Right arm',
    gender: Gender.Male,
    orientation: Orientation.Back,
    x: 180,
    y: 100,
    width: 50,
    height: 198
  },
  {
    id: MALE_BACK_REGION_ID.CHEST,
    target: RegionTarget.Chest,
    label: 'Chest',
    gender: Gender.Male,
    orientation: Orientation.Back,
    x: 65,
    y: 100,
    width: 110,
    height: 150
  },
  {
    id: MALE_BACK_REGION_ID.WAIST,
    target: RegionTarget.Waist,
    label: 'Waist',
    gender: Gender.Male,
    orientation: Orientation.Back,
    x: 65,
    y: 250,
    width: 110,
    height: 80
  },
  {
    id: MALE_BACK_REGION_ID.RIGHT_LEG,
    target: RegionTarget.RightLeg,
    label: 'Right leg',
    gender: Gender.Male,
    orientation: Orientation.Back,
    x: 120,
    y: 330,
    width: 60,
    height: 290
  },
  {
    id: MALE_BACK_REGION_ID.LEFT_LEG,
    target: RegionTarget.LeftLeg,
    label: 'Left leg',
    gender: Gender.Male,
    orientation: Orientation.Back,
    x: 60,
    y: 330,
    width: 60,
    height: 290
  }
];
