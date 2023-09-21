import { Gender } from './gender';
import { Orientation } from './body-region';
import { IPosition } from './position.model';

export interface INode {
  id: string;
  target: string;
  gender: Gender;
  orientation: Orientation;
  regionId: string;
  description?: string;
  width?: number;
  height?: number;
  positions: {
    default?: IPosition;
    zoomed: IPosition;
  };
}
