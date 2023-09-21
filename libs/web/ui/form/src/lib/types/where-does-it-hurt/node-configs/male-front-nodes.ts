import { Gender } from '../../typings/gender';
import { Orientation } from '../../typings/body-region';
import { INode } from '../../typings/node.model';
import { MALE_FRONT_REGION_ID } from '../region-configs';

const headNodes: INode[] = [
  {
    id: 'head__head-skull',
    target: 'Head/skull pain',
    description: 'Head/skull pain',
    gender: Gender.Male,
    regionId: MALE_FRONT_REGION_ID.HEAD,
    orientation: Orientation.Front,
    positions: {
      default: {
        x: 136,
        y: 23,
      },
      zoomed: {
        x: 144,
        y: 216,
      }
    }
  },
  {
    id: 'head__ears',
    target: 'Ears pain',
    gender: Gender.Male,
    description: 'Ears pain',
    regionId: MALE_FRONT_REGION_ID.HEAD,
    orientation: Orientation.Front,
    positions: {
      default: {
        x: 151,
        y: 47,
      },
      zoomed: {
        x: 183,
        y: 295,
      }
    }
  },
  {
    id: 'head__cheek',
    target: 'Cheek pain',
    gender: Gender.Male,
    description: 'Cheek pain',
    regionId: MALE_FRONT_REGION_ID.HEAD,
    orientation: Orientation.Front,
    positions: {
      default: {
        x: 138,
        y: 65,
      },
      zoomed: {
        x: 148,
        y: 329,
      },
    }
  },
  {
    id: 'head__eyes',
    target: 'Eye pain',
    gender: Gender.Male,
    description: 'Eye pain',
    regionId: MALE_FRONT_REGION_ID.HEAD,
    orientation: Orientation.Front,
    positions: {
      default: {
        x: 132,
        y: 55,
      },
      zoomed: {
        x: 138,
        y: 304,
      }
    }
  },
  {
    id: 'head__nose',
    target: 'Nose pain',
    gender: Gender.Male,
    description: 'Nose pain',
    regionId: MALE_FRONT_REGION_ID.HEAD,
    orientation: Orientation.Front,
    positions: {
      default: {
        x: 121,
        y: 64,
      },
      zoomed: {
        x: 112,
        y: 331,
      }
    }
  },
  {
    id: 'head__teeth',
    target: 'Teeth pain',
    gender: Gender.Male,
    description: 'Teeth pain',
    regionId: MALE_FRONT_REGION_ID.HEAD,
    orientation: Orientation.Front,
    positions: {
      default: {
        x: 121,
        y: 77,
      },
      zoomed: {
        x: 111,
        y: 362,
      }
    }
  },
  {
    id: 'head__jaw',
    target: 'Jaw pain',
    gender: Gender.Male,
    description: 'Jaw pain',
    regionId: MALE_FRONT_REGION_ID.HEAD,
    orientation: Orientation.Front,
    positions: {
      default: {
        x: 134,
        y: 78,
      },
      zoomed: {
        x: 129,
        y: 376,
      }
    }
  },
  {
    id: 'head__neck',
    target: 'Neck pain',
    gender: Gender.Male,
    description: 'Neck pain',
    regionId: MALE_FRONT_REGION_ID.HEAD,
    orientation: Orientation.Front,
    positions: {
      default: {
        x: 100,
        y: 95,
      },
      zoomed: {
        x: 150,
        y: 402,
      }
    }
  }
];


const rightArmNodes: INode[] = [
  {
    id: 'right_shoulder',
    target: 'Right shoulder pain',
    orientation: Orientation.Front,
    description: 'Right shoulder pain',
    gender: Gender.Male,
    regionId: MALE_FRONT_REGION_ID.RIGHT_ARM,
    positions: {
      default: {
        x: 54,
        y: 124,
      },
      zoomed: {
        x: 133,
        y: 183,
      }
    }
  },
  {
    id: 'right_upper-arm',
    target: 'Right upper arm pain',
    orientation: Orientation.Front,
    description: 'Right upper arm pain',
    gender: Gender.Male,
    regionId: MALE_FRONT_REGION_ID.RIGHT_ARM,
    positions: {
      default: {
        x: 50,
        y: 172
      },
      zoomed: {
        x: 135,
        y: 262,
      }
    }
  },
  {
    id: 'right__elbow-pain',
    target: 'Right elbow pain',
    orientation: Orientation.Front,
    gender: Gender.Male,
    description: 'Right elbow pain',
    regionId: MALE_FRONT_REGION_ID.RIGHT_ARM,
    positions: {
      default: {
        x: 42,
        y: 218
      },
      zoomed: {
        x: 125,
        y: 330,
      }
    }
  },
  {
    id: 'right__right-formarm',
    target: 'Right forearm pain',
    description: 'Right forearm pain',
    orientation: Orientation.Front,
    gender: Gender.Male,
    regionId: MALE_FRONT_REGION_ID.RIGHT_ARM,
    positions: {
      default: {
        x: 42,
        y: 256
      },
      zoomed: {
        x: 114,
        y: 394,
      }
    }
  },
  {
    id: 'right__wrist',
    target: 'Right wrist pain',
    description: 'Right wrist pain',
    orientation: Orientation.Front,
    gender: Gender.Male,
    regionId: MALE_FRONT_REGION_ID.RIGHT_ARM,
    positions: {
      default: {
        x: 35,
        y: 295,
      },
      zoomed: {
        x: 110,
        y: 460,
      }
    }
  }
];

const rightHandNodes: INode[] = [
  {
    id: 'right__wrist',
    target: 'Right wrist pain',
    description: 'Right wrist pain',
    orientation: Orientation.Front,
    gender: Gender.Male,
    regionId: MALE_FRONT_REGION_ID.RIGHT_HAND,
    positions: {
      default: {
        x: 35,
        y: 295
      },
      zoomed: {
        x: 133,
        y: 222,
      }
    }
  },
  {
    id: 'right__hand',
    target: 'Right hand pain',
    orientation: Orientation.Front,
    description: 'Right hand pain',
    gender: Gender.Male,
    regionId: MALE_FRONT_REGION_ID.RIGHT_HAND,
    positions: {
      default: {
        x: 33,
        y: 319
      },
      zoomed: {
        x: 123,
        y: 292
      }
    }

  },
  {
    id: 'right__thumb',
    target: 'Right thumb pain',
    orientation: Orientation.Front,
    description: 'Right thumb pain',
    gender: Gender.Male,
    regionId: MALE_FRONT_REGION_ID.RIGHT_HAND,
    positions: {
      default: {
        x: 8,
        y: 326
      },
      zoomed: {
        x: 43,
        y: 322,
      }
    }
  },
  {
    id: 'right__index',
    target: 'Right index finger pain',
    description: 'Right index pain',
    orientation: Orientation.Front,
    gender: Gender.Male,
    regionId: MALE_FRONT_REGION_ID.RIGHT_HAND,
    positions: {
      default: {
        x: 11,
        y: 355
      },
      zoomed: {
        x: 67,
        y: 399
      }
    }
  },
  {
    id: 'right__middle',
    target: 'Right middle finger pain',
    description: 'Right index finger pain',
    orientation: Orientation.Front,
    gender: Gender.Male,
    regionId: MALE_FRONT_REGION_ID.RIGHT_HAND,
    positions: {
      default: {
        x: 22,
        y: 362
      },
      zoomed: {
        x: 93,
        y: 425,
      }
    }
  },
  {
    id: 'right__ring',
    target: 'Right ring finger pain',
    description: 'Right ring finger pain',
    orientation: Orientation.Front,
    gender: Gender.Male,
    regionId: MALE_FRONT_REGION_ID.RIGHT_HAND,
    positions: {
      default: {
        x: 33,
        y: 357
      },
      zoomed: {
        x: 123,
        y: 416,
      }
    }
  },
  {
    id: 'right__pinkie',
    target: 'Right pinkie finger pain',
    description: 'Right pinkie finger pain',
    orientation: Orientation.Front,
    gender: Gender.Male,
    regionId: MALE_FRONT_REGION_ID.RIGHT_HAND,
    positions: {
      default: {
        x: 41,
        y: 350
      },
      zoomed: {
        x: 148,
        y: 392,
      }
    }
  }
];

const leftArmNodes: INode[] = [
  {
    id: 'left_shoulder',
    target: 'Left shoulder pain',
    orientation: Orientation.Front,
    gender: Gender.Male,
    regionId: MALE_FRONT_REGION_ID.LEFT_ARM,
    description: 'Left shoulder pain',
    positions: {
      default: {
        x: 193,
        y: 132
      },
      zoomed: {
        x: 116,
        y: 179,
      }
    }
  },
  {
    id: 'right_upper-arm',
    target: 'Left upper arm pain',
    description: 'Left upper arm pain',
    orientation: Orientation.Front,
    gender: Gender.Male,
    regionId: MALE_FRONT_REGION_ID.LEFT_ARM,
    positions: {
      default: {
        x: 194,
        y: 174
      },
      zoomed: {
        x: 117,
        y: 243,
      }
    }
  },
  {
    id: 'left__elbow-pain',
    target: 'Left elbow pain',
    description: 'Left elbow pain',
    orientation: Orientation.Front,
    gender: Gender.Male,
    regionId: MALE_FRONT_REGION_ID.LEFT_ARM,
    positions: {
      default: {
        x: 195,
        y: 219
      },
      zoomed: {
        x: 116,
        y: 315,
      }
    }
  },
  {
    id: 'left__forearm',
    target: 'Left forearm pain',
    description: 'Left forearm pain',
    orientation: Orientation.Front,
    gender: Gender.Male,
    regionId: MALE_FRONT_REGION_ID.LEFT_ARM,
    positions: {
      default: {
        x: 196,
        y: 256
      },
      zoomed: {
        x: 112,
        y: 389,
      }
    }
  },
  {
    id: 'left__wrist',
    target: 'Left wrist pain',
    description: 'Left wrist pain',
    orientation: Orientation.Front,
    gender: Gender.Male,
    regionId: MALE_FRONT_REGION_ID.LEFT_ARM,
    positions: {
      default: {
        x: 199,
        y: 298
      },
      zoomed: {
        x: 116,
        y: 461,
      }
    }
  }
];


const leftHandNodes: INode[] = [
  {
    id: 'left__wrist',
    target: 'Left wrist pain',
    description: 'Left wrist pain',
    orientation: Orientation.Front,
    gender: Gender.Male,
    regionId: MALE_FRONT_REGION_ID.LEFT_HAND,
    positions: {
      default: {
        x: 199,
        y: 298
      },
      zoomed: {
        x: 92,
        y: 232,
      }
    }
  },
  {
    id: 'left__hand',
    target: 'Left hand pain',
    description: 'Left hand pain',
    orientation: Orientation.Front,
    gender: Gender.Male,
    regionId: MALE_FRONT_REGION_ID.LEFT_HAND,
    positions: {
      default: {
        x: 200,
        y: 326
      },
      zoomed: {
        x: 97,
        y: 291
      }
    }

  },
  {
    id: 'left__thumb',
    target: 'Left thumb pain',
    description: 'Left thumb pain',
    orientation: Orientation.Front,
    gender: Gender.Male,
    regionId: MALE_FRONT_REGION_ID.LEFT_HAND,
    positions: {
      default: {
        x: 226,
        y: 332
      },
      zoomed: {
        x: 174,
        y: 326,
      }
    }
  },
  {
    id: 'left__index',
    target: 'Left index finger pain',
    description: 'Left index pain',
    orientation: Orientation.Front,
    gender: Gender.Male,
    regionId: MALE_FRONT_REGION_ID.LEFT_HAND,
    positions: {
      default: {
        x: 218,
        y: 360
      },
      zoomed: {
        x: 146,
        y: 407
      }
    }
  },
  {
    id: 'left__middle',
    target: 'Left middle finger pain',
    description: 'Left index finger pain',
    orientation: Orientation.Front,
    gender: Gender.Male,
    regionId: MALE_FRONT_REGION_ID.LEFT_HAND,
    positions: {
      default: {
        x: 209,
        y: 368
      },
      zoomed: {
        x: 122,
        y: 425,
      }
    }
  },
  {
    id: 'left__ring',
    target: 'Left ring finger pain',
    description: 'Left ring finger pain',
    orientation: Orientation.Front,
    gender: Gender.Male,
    regionId: MALE_FRONT_REGION_ID.LEFT_HAND,
    positions: {
      default: {
        x: 198,
        y: 360
      },
      zoomed: {
        x: 93,
        y: 419,
      }
    }
  },
  {
    id: 'left__pinkie',
    target: 'Left pinkie finger pain',
    description: 'Left pinkie finger pain',
    orientation: Orientation.Front,
    gender: Gender.Male,
    regionId: MALE_FRONT_REGION_ID.LEFT_HAND,
    positions: {
      default: {
        x: 190,
        y: 354
      },
      zoomed: {
        x: 66,
        y: 390,
      }
    }
  }
];

const chestNodes: INode[] = [
  {
    id: 'chest_sternum',
    target: 'Chest/Sternum pain',
    description: 'Chest/Sternum pain',
    orientation: Orientation.Front,
    gender: Gender.Male,
    regionId: MALE_FRONT_REGION_ID.CHEST,
    positions: {
      default: {
        x: 121,
        y: 137
      },
      zoomed: {
        x: 119,
        y: 247,
      }
    }
  },
  {
    id: 'chest_rib',
    target: 'Rib pain',
    description: 'Rib pain',
    orientation: Orientation.Front,
    gender: Gender.Male,
    regionId: MALE_FRONT_REGION_ID.CHEST,
    positions: {
      default: {
        x: 154,
        y: 205
      },
      zoomed: {
        x: 206,
        y: 370,
      }
    }
  },
  {
    id: 'chest_abdomen',
    target: 'Abdomen pain',
    description: 'Abdomen pain',
    orientation: Orientation.Front,
    gender: Gender.Male,
    regionId: MALE_FRONT_REGION_ID.CHEST,
    positions: {
      default: {
        x: 121,
        y: 239
      },
      zoomed: {
        x: 117,
        y: 398,
      }
    }
  }
];

const waistNodes: INode[] = [
  {
    id: 'left_hip',
    target: 'Left hip pain',
    description: 'Left hip pain',
    orientation: Orientation.Front,
    gender: Gender.Male,
    regionId: MALE_FRONT_REGION_ID.WAIST,
    positions: {
      default: {
        x: 160,
        y: 268
      },
      zoomed: {
        x: 201,
        y: 245,
      }
    }
  },
  {
    id: 'right_hip',
    target: 'Right hip pain',
    description: 'Right hip pain',
    orientation: Orientation.Front,
    gender: Gender.Male,
    regionId: MALE_FRONT_REGION_ID.WAIST,
    positions: {
      default: {
        x: 74,
        y: 267
      },
      zoomed: {
        x: 38,
        y: 242,
      }
    }
  },
  {
    id: 'pelvic',
    target: 'Pelvic pain',
    description: 'Pelvic pain',
    orientation: Orientation.Front,
    gender: Gender.Male,
    regionId: MALE_FRONT_REGION_ID.WAIST,
    positions: {
      default: {
        x: 148,
        y: 303
      },
      zoomed: {
        x: 172,
        y: 263,
      }
    }
  },
  {
    id: 'groin',
    target: 'Groin pain',
    description: 'Pelvic pain',
    orientation: Orientation.Front,
    gender: Gender.Male,
    regionId: MALE_FRONT_REGION_ID.WAIST,
    positions: {
      default: {
        x: 122,
        y: 313
      },
      zoomed: {
        x: 116,
        y: 319,
      }
    }
  }
];

const rightLegNodes: INode[] = [
  {
    id: 'right_thigh',
    target: 'Right thigh pain',
    description: 'Right thigh pain',
    orientation: Orientation.Front,
    gender: Gender.Male,
    regionId: MALE_FRONT_REGION_ID.RIGHT_LEG,
    positions: {
      default: {
        x: 71,
        y: 341
      },
      zoomed: {
        x: 123,
        y: 168,
      }
    }
  },
  {
    id: 'right_knee',
    target: 'Right knee pain',
    description: 'Right knee pain',
    orientation: Orientation.Front,
    gender: Gender.Male,
    regionId: MALE_FRONT_REGION_ID.RIGHT_LEG,
    positions: {
      default: {
        x: 96,
        y: 445
      },
      zoomed: {
        x: 129,
        y: 296,
      }
    }
  },
  {
    id: 'right_shin',
    target: 'Right shin pain',
    description: 'Right shin pain',
    orientation: Orientation.Front,
    gender: Gender.Male,
    regionId: MALE_FRONT_REGION_ID.RIGHT_LEG,
    positions: {
      default: {
        x: 87,
        y: 510
      },
      zoomed: {
        x: 111,
        y: 387,
      }
    }
  },
  {
    id: 'right_calf',
    target: 'Right calf pain',
    description: 'Right calf pain',
    orientation: Orientation.Front,
    gender: Gender.Male,
    regionId: MALE_FRONT_REGION_ID.RIGHT_LEG,
    positions: {
      default: {
        x: 108,
        y: 505
      },
      zoomed: {
        x: 153,
        y: 377,
      }
    }
  },
  {
    id: 'right_ankle',
    target: 'Right ankle pain',
    description: 'Right ankle pain',
    orientation: Orientation.Front,
    gender: Gender.Male,
    regionId: MALE_FRONT_REGION_ID.RIGHT_LEG,
    positions: {
      default: {
        x: 102,
        y: 560
      },
      zoomed: {
        x: 145,
        y: 468,
      }
    }
  },
  {
    id: 'right_foot',
    target: 'Right foot pain',
    description: 'Right foot pain',
    orientation: Orientation.Front,
    gender: Gender.Male,
    regionId: MALE_FRONT_REGION_ID.RIGHT_LEG,
    positions: {
      default: {
        x: 103,
        y: 593
      },
      zoomed: {
        x: 142,
        y: 507,
      }
    }
  },
  {
    id: 'right_big_toe',
    target: 'Right big toe pain',
    description: 'Right big toe pain',
    orientation: Orientation.Front,
    gender: Gender.Male,
    regionId: MALE_FRONT_REGION_ID.RIGHT_LEG,
    positions: {
      default: {
        x: 113,
        y: 610
      },
      zoomed: {
        x: 159,
        y: 534,
      }
    }
  },
  {
    id: 'right_second_toe',
    target: 'Right second toe pain',
    description: 'Right second toe pain',
    orientation: Orientation.Front,
    gender: Gender.Male,
    regionId: MALE_FRONT_REGION_ID.RIGHT_LEG,
    positions: {
      default: {
        x: 107,
        y: 615
      },
      zoomed: {
        x: 143,
        y: 538,
      }
    }
  },
  {
    id: 'right_third_toe',
    target: 'Right third toe pain',
    description: 'Right third toe pain',
    orientation: Orientation.Front,
    gender: Gender.Male,
    regionId: MALE_FRONT_REGION_ID.RIGHT_LEG,
    positions: {
      default: {
        x: 96,
        y: 613
      },
      zoomed: {
        x: 136,
        y: 539,
      }
    }
  },
  {
    id: 'right_fourth_toe',
    target: 'Right fourth toe pain',
    description: 'Right fourth toe pain',
    orientation: Orientation.Front,
    gender: Gender.Male,
    regionId: MALE_FRONT_REGION_ID.RIGHT_LEG,
    positions: {
      default: {
        x: 95,
        y: 611
      },
      zoomed: {
        x: 129,
        y: 537,
      }
    }
  },
  {
    id: 'right_fifth_toe',
    target: 'Right fifth toe pain',
    description: 'Right fifth toe pain',
    orientation: Orientation.Front,
    gender: Gender.Male,
    regionId: MALE_FRONT_REGION_ID.RIGHT_LEG,
    positions: {
      default: {
        x: 86,
        y: 611
      },
      zoomed: {
        x: 120,
        y: 538,
      }
    }
  }
];

const leftLegNodes: INode[] = [
  {
    id: 'left_thigh',
    target: 'Left thigh pain',
    description: 'Left thigh pain',
    orientation: Orientation.Front,
    gender: Gender.Male,
    regionId: MALE_FRONT_REGION_ID.LEFT_LEG,
    positions: {
      default: {
        x: 149,
        y: 367
      },
      zoomed: {
        x: 113,
        y: 172,
      }
    }
  },
  {
    id: 'left_knee',
    target: 'Left knee pain',
    description: 'Left knee pain',
    orientation: Orientation.Front,
    gender: Gender.Male,
    regionId: MALE_FRONT_REGION_ID.LEFT_LEG,
    positions: {
      default: {
        x: 143,
        y: 446
      },
      zoomed: {
        x: 107,
        y: 292,
      }
    }
  },
  {
    id: 'left_shin',
    target: 'Left shin pain',
    description: 'Left shin pain',
    orientation: Orientation.Front,
    gender: Gender.Male,
    regionId: MALE_FRONT_REGION_ID.LEFT_LEG,
    positions: {
      default: {
        x: 153,
        y: 519
      },
      zoomed: {
        x: 125,
        y: 380,
      }
    }
  },
  {
    id: 'left_calf',
    target: 'Left calf pain',
    description: 'Left calf pain',
    orientation: Orientation.Front,
    gender: Gender.Male,
    regionId: MALE_FRONT_REGION_ID.LEFT_LEG,
    positions: {
      default: {
        x: 132,
        y: 514
      },
      zoomed: {
        x: 84,
        y: 380,
      }
    }
  },
  {
    id: 'left_ankle',
    target: 'Left ankle pain',
    description: 'Left ankle pain',
    orientation: Orientation.Front,
    gender: Gender.Male,
    regionId: MALE_FRONT_REGION_ID.LEFT_LEG,
    positions: {
      default: {
        x: 145,
        y: 568
      },
      zoomed: {
        x: 95,
        y: 468,
      }
    }
  },
  {
    id: 'left_foot',
    target: 'Left foot pain',
    description: 'Left foot pain',
    orientation: Orientation.Front,
    gender: Gender.Male,
    regionId: MALE_FRONT_REGION_ID.LEFT_LEG,
    positions: {
      default: {
        x: 138,
        y: 589
      },
      zoomed: {
        x: 89,
        y: 508,
      }
    }
  },
  {
    id: 'left_big_toe',
    target: 'Left big toe pain',
    description: 'Left big toe pain',
    orientation: Orientation.Front,
    gender: Gender.Male,
    regionId: MALE_FRONT_REGION_ID.LEFT_LEG,
    positions: {
      default: {
        x: 131,
        y: 614
      },
      zoomed: {
        x: 76,
        y: 534,
      }
    }
  },
  {
    id: 'left_second_toe',
    target: 'Left second toe pain',
    description: 'Left second toe pain',
    orientation: Orientation.Front,
    gender: Gender.Male,
    regionId: MALE_FRONT_REGION_ID.LEFT_LEG,
    positions: {
      default: {
        x: 138,
        y: 613
      },
      zoomed: {
        x: 90,
        y: 538,
      }
    }
  },
  {
    id: 'left_third_toe',
    target: 'Left third toe pain',
    description: 'Left third toe pain',
    orientation: Orientation.Front,
    gender: Gender.Male,
    regionId: MALE_FRONT_REGION_ID.LEFT_LEG,
    positions: {
      default: {
        x: 144,
        y: 613
      },
      zoomed: {
        x: 99,
        y: 539,
      }
    }
  },
  {
    id: 'left_fourth_toe',
    target: 'Left fourth toe pain',
    description: 'Left fourth toe pain',
    orientation: Orientation.Front,
    gender: Gender.Male,
    regionId: MALE_FRONT_REGION_ID.LEFT_LEG,
    positions: {
      default: {
        x: 151,
        y: 614
      },
      zoomed: {
        x: 106,
        y: 538,
      }
    }
  },
  {
    id: 'left_fifth_toe',
    target: 'Left fifth toe pain',
    description: 'Left fifth toe pain',
    orientation: Orientation.Front,
    gender: Gender.Male,
    regionId: MALE_FRONT_REGION_ID.LEFT_LEG,
    positions: {
      default: {
        x: 156,
        y: 614
      },
      zoomed: {
        x: 114,
        y: 536,
      }
    }
  }
];

export const maleFrontNodes = [
  ...headNodes,
  ...rightArmNodes,
  ...rightHandNodes,
  ...leftArmNodes,
  ...leftHandNodes,
  ...chestNodes,
  ...waistNodes,
  ...rightLegNodes,
  ...leftLegNodes
];
