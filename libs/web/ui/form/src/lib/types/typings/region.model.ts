import { Orientation, RegionTarget } from './body-region';
import { Gender } from './gender';

export interface IRegion {
  id: string;
  label: string;
  orientation: Orientation;
  target: RegionTarget;
  gender: Gender;
  x: number;
  y: number;
  width: number;
  height: number;
}
