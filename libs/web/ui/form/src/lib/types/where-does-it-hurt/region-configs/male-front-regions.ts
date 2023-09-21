import { Orientation, RegionTarget } from '../../typings/body-region';
import { Gender } from '../../typings/gender';
import { IRegion } from '../../typings/region.model';

export const MALE_FRONT_REGION_ID = {
  NECK: 'Neck',
  HEAD: 'Head',
  CHEST: 'Chest',
  ABDOMEN: 'Abdomen',
  GROIN: 'Hip/ Groin',
  RIGHT_SHOULDER: 'Shoulder',
  LEFT_SHOULDER: 'Shoulder',
  RIGHT_FOREARM: 'Forearm ',
  LEFT_FOREARM: 'Forearm ',
  RIGHT_ARM: 'Arm',
  LEFT_ARM: 'Arm',
  RIGHT_HAND: 'Hand',
  LEFT_HAND: 'Hand',


  WAIST: 'MALE_FRONT_WAIST_ID',
  RIGHT_LEG: 'MALE_FRONT_RIGHT_LEG_ID',
  LEFT_LEG: 'MALE_FRONT_LEFT_LEG_ID',
  RIGHT_ANKLE: 'Ankle',
  LEFT_ANKLE: 'Ankle',
  LEFT_FOOT: 'MALE_FRONT_LEFT_FOOT_ID',
  RIGHT_FOOT: 'MALE_FRONT_RIGHT_FOOT_ID'
};

export const maleFrontRegions: IRegion[] = [
  {
    id: MALE_FRONT_REGION_ID.HEAD,
    target: RegionTarget.Head,
    label: 'Head',
    gender: Gender.Male,
    orientation: Orientation.Front,
    x: 85,
    y: 0,
    width: 75,
    height: 100
  },
  {
    id: MALE_FRONT_REGION_ID.RIGHT_ARM,
    gender: Gender.Male,
    label: 'Right arm',
    target: RegionTarget.RightArm,
    orientation: Orientation.Front,
    x: 0,
    y: 100,
    width: 60,
    height: 198
  },
  {
    id: MALE_FRONT_REGION_ID.RIGHT_HAND,
    target: RegionTarget.RightHand,
    label: 'Right hand',
    gender: Gender.Male,
    orientation: Orientation.Front,
    x: 0,
    y: 300,
    width: 60,
    height: 80
  },
  {
    id: MALE_FRONT_REGION_ID.LEFT_HAND,
    target: RegionTarget.LeftHand,
    label: 'Left hand',
    gender: Gender.Male,
    orientation: Orientation.Front,
    x: 180,
    y: 300,
    width: 52,
    height: 80
  },
  {
    id: MALE_FRONT_REGION_ID.LEFT_ARM,
    target: RegionTarget.LeftArm,
    gender: Gender.Male,
    label: 'Left arm',
    orientation: Orientation.Front,
    x: 180,
    y: 100,
    width: 50,
    height: 198
  },
  {
    id: MALE_FRONT_REGION_ID.CHEST,
    target: RegionTarget.Chest,
    label: 'Chest',
    gender: Gender.Male,
    orientation: Orientation.Front,
    x: 65,
    y: 100,
    width: 110,
    height: 150
  },
  {
    id: MALE_FRONT_REGION_ID.WAIST,
    target: RegionTarget.Waist,
    label: 'Waist',
    gender: Gender.Male,
    orientation: Orientation.Front,
    x: 65,
    y: 250,
    width: 110,
    height: 80
  },
  {
    id: MALE_FRONT_REGION_ID.RIGHT_LEG,
    target: RegionTarget.RightLeg,
    label: 'Right leg',
    gender: Gender.Male,
    orientation: Orientation.Front,
    x: 120,
    y: 330,
    width: 60,
    height: 290
  },
  {
    id: MALE_FRONT_REGION_ID.LEFT_LEG,
    target: RegionTarget.LeftLeg,
    label: 'Left leg',
    gender: Gender.Male,
    orientation: Orientation.Front,
    x: 60,
    y: 330,
    width: 60,
    height: 290
  }
];
