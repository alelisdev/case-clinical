import { Orientation, RegionTarget } from '../../typings/body-region';
import { Gender } from '../../typings/gender';
import { IRegion } from '../../typings/region.model';

export const femaleFrontRegions: IRegion[] = [
  {
    id: 'front__head',
    label: 'Head',
    target: RegionTarget.Head,
    gender: Gender.Female,
    orientation: Orientation.Front,
    x: 85,
    y: 0,
    width: 75,
    height: 100
  },
  {
    id: 'front__right-arm',
    label: 'Right arm',
    target: RegionTarget.RightArm,
    gender: Gender.Female,
    orientation: Orientation.Front,
    x: 10,
    y: 100,
    width: 60,
    height: 198
  },
  {
    id: 'front__right-hand',
    label: 'Right hand',
    target: RegionTarget.RightHand,
    gender: Gender.Female,
    orientation: Orientation.Front,
    x: 0,
    y: 300,
    width: 60,
    height: 80
  },
  {
    id: 'front__left-hand',
    label: 'Left hand',
    target: RegionTarget.LeftHand,
    gender: Gender.Female,
    orientation: Orientation.Front,
    x: 180,
    y: 300,
    width: 52,
    height: 80
  },
  {
    id: 'front__left-arm',
    label: 'Left arm',
    target: RegionTarget.LeftArm,
    gender: Gender.Female,
    orientation: Orientation.Front,
    x: 170,
    y: 100,
    width: 50,
    height: 198
  },
  {
    id: 'front__chest',
    label: 'Chest',
    target: RegionTarget.Chest,
    gender: Gender.Female,
    orientation: Orientation.Front,
    x: 75,
    y: 100,
    width: 90,
    height: 150
  },
  {
    id: 'front__waist',
    label: 'Waist',
    target: RegionTarget.Waist,
    gender: Gender.Female,
    orientation: Orientation.Front,
    x: 65,
    y: 250,
    width: 110,
    height: 80
  },
  {
    id: 'front__right-leg',
    label: 'Right leg',
    target: RegionTarget.RightLeg,
    gender: Gender.Female,
    orientation: Orientation.Front,
    x: 120,
    y: 330,
    width: 60,
    height: 290
  },
  {
    id: 'front__left-leg',
    label: 'Left leg',
    target: RegionTarget.LeftLeg,
    gender: Gender.Female,
    orientation: Orientation.Front,
    x: 60,
    y: 330,
    width: 60,
    height: 290
  },
  {
    id: 'back__left-hand',
    label: 'Left hand',
    target: RegionTarget.LeftHand,
    gender: Gender.Female,
    orientation: Orientation.Front,
    x: 300,
    y: 300,
    width: 60,
    height: 74
  },
  {
    id: 'back__left-arm',
    label: 'Left arm',
    target: RegionTarget.LeftArm,
    gender: Gender.Female,
    orientation: Orientation.Front,
    x: 320,
    y: 100,
    width: 50,
    height: 198
  }
];
