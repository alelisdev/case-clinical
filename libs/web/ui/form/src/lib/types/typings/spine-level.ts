
export enum SpineLevelState {
  Default = 'default',
  Disabled = 'disabled',
  Active = 'active'
}

export enum SpineGroup {
  Lumbar = 'lumbar',
  Thoracic = 'thoracic',
  Sacral = 'sacral',
  Cervical = 'cervical'
}

export interface ISpineLevel {
  id: string;
  label: string;
  imagePath: string;
  x: number;
  y: number;
  height: number;
  width: number;
  state: SpineLevelState;
  group: SpineGroup;
}
