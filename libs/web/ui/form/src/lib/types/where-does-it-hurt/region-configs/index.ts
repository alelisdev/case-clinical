import { maleFrontRegions, MALE_FRONT_REGION_ID } from './male-front-regions';
import { femaleFrontRegions,  } from './female-front-regions';
import { maleBackRegions, MALE_BACK_REGION_ID } from './male-back-regions';

export const regions = [
  ...maleFrontRegions,
  ...maleBackRegions,
  ...femaleFrontRegions
];

export {
  MALE_FRONT_REGION_ID,
  MALE_BACK_REGION_ID
};
