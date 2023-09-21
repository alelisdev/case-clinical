import { Injectable } from '@angular/core';
import { isString } from 'lodash';
import { Observable } from 'rxjs';
import classList from './tailwind-classes-util/classList'
import parseClassList from './tailwind-classes-util/parseClassList'

export interface TailwindClassFilter {
  advanced?: boolean,
  customClasses?: boolean,
  background?: {
    image?: boolean,
    color?: boolean
  },
  colors?: boolean,
  size?: {
    width?: boolean,
    height?: boolean
  },
  margin?: boolean,
  padding?: boolean,
  fontStyle?: boolean,
  decoration?: boolean,
  display?: {
    enabled?: boolean,
    flexDirection?: boolean,
    flexWrap?: boolean,
    gap?: boolean,
    flexSize?: boolean,
  },
  position?: boolean,
}

export interface TailwindClassTitle {
  advanced?: string,
  colors?: string,
  size?: string,
  margin?: string,
  padding?: string,
  fontStyle?: string,
  decoration?: string,
  display?: string
}

export const colorSuffixes = [
  'black', 'white', 'primary',
  'amber-50', 'amber-100', 'amber-200', 'amber-300', 'amber-400', 'amber-500', 'amber-600', 'amber-700', 'amber-800', 'amber-900',
  'blue-50', 'blue-100', 'blue-200', 'blue-300', 'blue-400', 'blue-500', 'blue-600', 'blue-700', 'blue-800', 'blue-900',
  'cyan-50', 'cyan-100', 'cyan-200', 'cyan-300', 'cyan-400', 'cyan-500', 'cyan-600', 'cyan-700', 'cyan-800', 'cyan-900',
  'fuchsia-50', 'fuchsia-100', 'fuchsia-200', 'fuchsia-300', 'fuchsia-400', 'fuchsia-500', 'fuchsia-600', 'fuchsia-700', 'fuchsia-800', 'fuchsia-900',
  'gray-50', 'gray-100', 'gray-200', 'gray-300', 'gray-400', 'gray-500', 'gray-600', 'gray-700', 'gray-800', 'gray-900',
  'green-50', 'green-100', 'green-200', 'green-300', 'green-400', 'green-500', 'green-600', 'green-700', 'green-800', 'green-900',
  'indigo-50', 'indigo-100', 'indigo-200', 'indigo-300', 'indigo-400', 'indigo-500', 'indigo-600', 'indigo-700', 'indigo-800', 'slate-900',
  'lime-50', 'lime-100', 'lime-200', 'lime-300', 'lime-400', 'lime-500', 'lime-600', 'lime-700', 'lime-800', 'lime-900',
  'neutral-50', 'neutral-100', 'neutral-200', 'neutral-300', 'neutral-400', 'neutral-500', 'neutral-600', 'neutral-700', 'neutral-800', 'neutral-900',
  'orange-50', 'orange-100', 'orange-200', 'orange-300', 'orange-400', 'orange-500', 'orange-600', 'orange-700', 'orange-800', 'orange-900',
  'pink-50', 'pink-100', 'pink-200', 'pink-300', 'pink-400', 'pink-500', 'pink-600', 'pink-700', 'pink-800', 'pink-900',
  'purple-50', 'purple-100', 'purple-200', 'purple-300', 'purple-400', 'purple-500', 'purple-600', 'purple-700', 'purple-800', 'purple-900',
  'red-50', 'red-100', 'red-200', 'red-300', 'red-400', 'red-500', 'red-600', 'red-700', 'red-800', 'red-900',
  'rose-50', 'rose-100', 'rose-200', 'rose-300', 'rose-400', 'rose-500', 'rose-600', 'rose-700', 'rose-800', 'rose-900',
  'sky-50', 'sky-100', 'sky-200', 'sky-300', 'sky-400', 'sky-500', 'sky-600', 'sky-700', 'sky-800', 'sky-900',
  'slate-50', 'slate-100', 'slate-200', 'slate-300', 'slate-400', 'slate-500', 'slate-600', 'slate-700', 'slate-800', 'slate-900',
  'stone-50', 'stone-100', 'stone-200', 'stone-300', 'stone-400', 'stone-500', 'stone-600', 'stone-700', 'stone-800', 'stone-900',
  'teal-50', 'teal-100', 'teal-200', 'teal-300', 'teal-400', 'teal-500', 'teal-600', 'teal-700', 'teal-800', 'teal-900',
  'yellow-50', 'yellow-100', 'yellow-200', 'yellow-300', 'yellow-400', 'yellow-500', 'yellow-600', 'yellow-700', 'yellow-800', 'yellow-900',
  'zinc-50', 'zinc-100', 'zinc-200', 'zinc-300', 'zinc-400', 'zinc-500', 'zinc-600', 'zinc-700', 'zinc-800', 'zinc-900',
  'emerald-50', 'emerald-100', 'emerald-200', 'emerald-300', 'emerald-400', 'emerald-500', 'emerald-600', 'emerald-700', 'emerald-800', 'emerald-900',
  // 'rose-50', 'rose-100', 'rose-200', 'rose-300', 'rose-400', 'rose-500', 'rose-600', 'rose-700', 'rose-800', 'rose-900',
  // 'violet-50', 'violet-100', 'violet-200', 'violet-300', 'violet-400', 'violet-500', 'violet-600', 'violet-700', 'violet-800', 'violet-900',
]

export const flexDirectionSuffixes = [
  'row', 'row-reverse', 'col', 'col-reverse'
]

export const flexWrapSuffixes = [
  'wrap', 'wrap-reverse', 'nowrap'
]

export const flexSizeSuffixes = [
  '1', 'auto', 'initial', 'none'
]

export const orderSupportClasses = [
  '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', 'first', 'last', 'none',
]

export const justifyContentSuffixes = [
  'start', 'end', 'center', 'between', 'around', 'evenly'
]

export const maxSuffixes = [
  'w-xs',
  'w-sm',
  'w-md',
  'w-lg',
  'w-xl',
  'w-2xl',
  'w-3xl',
  'w-4xl',
  'w-5xl',
  'w-6xl',
  'w-full',
]

export const gapSuffixes = [
  '0', '0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '5', '6', '7', '8', '9', '10', '11', '12', '14', '16', '20', '24', '28', '32', '36', '40', '44', '48', '52', '60', '64', '72', '80', '96'
]

export const alignItemsSuffixes = [
  'start', 'end', 'center', 'baseline', 'stretch'
]

export const sizingSufixes = [
  'full', '1/2', '1/3', '1/4', '0', 'auto', 'px', '2/3', '2/4', '3/4', '1/5', '2/5', '3/5', '4/5', '1/6', '2/6', '3/6', '4/6', '5/6', '1/12',
  '2/12', '3/12', '4/12', '5/12', '6/12', '7/12', '8/12', '9/12', '10/12', '11/12', 'screen', 'min', 'max', '0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4',
  '5', '6', '7', '8', '9', '10', '11', '12', '14', '20', '24', '28', '32', '36', '40', '44', '48', '52', '56', '60', '64', '72', '80', '96'
]

export const dropShadowSuffixes = [
  'sm', 'md', 'lg', 'xl', '2xl', 'none',
]

export const spacingSuffixes = [
  'auto', '0', '0.5', '1', '1.5', '2', '2.5', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '14', '16', '20', '24', '28', '32', '36', '40', '44', '48', '52', '56', '60', '64', '72', '80', '96',
]

export const animationSuffixes = [
  'none', 'spin', 'ping', 'pulse', 'bounce',
]

export const opacitySuffixes = [
  '0', '5', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55', '60', '65', '70', '75', '80', '85', '90', '95', '100'
]

export const bgOpacitySuffixes = opacitySuffixes.map(el => `opacity-${el}`);

export const radiusSuffixes = [
  'none', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full', 't-md', 'r-md', 'l-md', 'b-md', 't-lg', 'r-lg', 'l-lg', 'b-lg', 't-xl', 'r-xl', 'l-xl'
]

export const fontSizeSuffixes = [
  'xs', 'sm', 'md', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl', '9xl'
]

export const shadowSizeSuffixes = [
  'sm', 'md', 'lg', 'xl', '2xl', 'inner'
]

export const borderSizeSuffixes = [
  '0', '1', '2', '4', '8', 'x-2', 'x-4', 'x-8', 'y-2', 'y-4', 'y-8', 't-2', 'r-2', 'b-2', 'b-4', 'l-2', 't-4', 'r-4', 'l-4', 't-8', 'r-8', 'l-8', 'b-8'
]

export const fontWeightSuffixes = [
  'thin', 'extralight', 'light', 'normal', 'medium', 'semibold', 'bold'
]

export const lineHeightSuffixes = [
  '3', '4', '5', '6', '7', '8', '9', '10', 'none', 'tight', 'snug', 'normal', 'relaxed'
]

export const fontFamilySuffixes = [
  'sans', 'serif', 'mono', 'cursive', 'poppins'
]

export const overflowSufixes = [
  'auto', 'hidden', 'clip', 'visible', 'scroll', 'x-auto', 'y-auto', 'x-hidden', 'y-hidden', 'x-clip', 'y-clip', 'x-visible', 'y-visible', 'x-scroll', 'y-scroll'
]

export const positions = [
  'absolute', 'relative', 'sticky', 'fixed', 'static'
]

export const displays = [
  'hidden', 'block'
];

export const positionSuffixes = [
  '0', 'px', '0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '5', '6'
]

export const bgSizeSuffixes = [
  'cover', 'auto', 'contain'
]

export const zIndexSuffixes = [
  "49",
  "60",
  "70",
  "80",
  "90",
  "99",
  "999",
  "9999",
  "99999"
]

export const fontDecorations = [
  {
    class: 'italic',
    title: 'Italic',
  },
  {
    class: 'overline',
    title: 'Overline',
  },
  {
    class: 'underline',
    title: 'Underline',
  },
  {
    class: 'line-through',
    title: 'Line-Through',
  },
]

export const textAlignSuffixes = [
  'left', 'center', 'right', 'justify'
]

@Injectable()
export class TailwindService {

  populated = false;
  backgroundClasses = [];
  colorClasses = [];
  widthClasses = [];
  maxWidthClasses = [];
  heightClasses = [];
  marginClasses = []
  paddingClasses = [];
  fontStyleClasses = [];
  decorationClasses = [];


  displayClasses = [];
  flexDirectionClasses = [];
  flexWrapClasses = [];
  gapClasses = [];

  populateTailwindClasses = () => {

    this.backgroundClasses = [
      ...colorSuffixes.map((el) => {
        return `bg-${el}`
      }),
      ...bgOpacitySuffixes.map((el) => `bg-${el}`),
      // ...bgSizeSuffixes.map((el) => `bg-${el}`),
    ]
    this.colorClasses = [
      ...colorSuffixes.map((el) => {
        return `border-${el}`
      }),
      ...colorSuffixes.map((el) => {
        return `shadow-${el}`
      }),
    ]

    this.widthClasses = sizingSufixes.map((el) => {
      return `w-${el}`
    }),

      this.maxWidthClasses = maxSuffixes.map((el) => {
        return `max-${el}`
      }),

      this.heightClasses = sizingSufixes.map((el) => {
        return `h-${el}`
      }),

      this.marginClasses = [
        ...spacingSuffixes.map((el) => {
          return `mt-${el}`
        }),
        ...spacingSuffixes.map((el) => {
          return `mr-${el}`
        }),
        ...spacingSuffixes.map((el) => {
          return `mb-${el}`
        }),
        ...spacingSuffixes.map((el) => {
          return `ml-${el}`
        }),
        ...spacingSuffixes.map((el) => {
          return `mx-${el}`
        }),
        ...spacingSuffixes.map((el) => {
          return `my-${el}`
        }),
      ]

    this.paddingClasses = [
      ...spacingSuffixes.map((el) => {
        return `pt-${el}`
      }),
      ...spacingSuffixes.map((el) => {
        return `pr-${el}`
      }),
      ...spacingSuffixes.map((el) => {
        return `pb-${el}`
      }),
      ...spacingSuffixes.map((el) => {
        return `pl-${el}`
      }),
      ...spacingSuffixes.map((el) => {
        return `px-${el}`
      }),
      ...spacingSuffixes.map((el) => {
        return `py-${el}`
      }),
    ]

    this.fontStyleClasses = [
      ...colorSuffixes.map((el) => {
        return `text-${el}`
      }),
      ...lineHeightSuffixes.map((el) => {
        return `leading-${el}`
      }),
      ...fontSizeSuffixes.map((el) => (`text-${el}`)),
      ...textAlignSuffixes.map((el) => (`text-${el}`)),
      ...fontWeightSuffixes.map((el) => (`font-${el}`)),
      ...fontFamilySuffixes.map((el) => (`font-${el}`)),
      ...fontDecorations.map((el) => el.class),
    ]

    this.decorationClasses = [
      ...borderSizeSuffixes.map((el) => `border-${el}`),
      ...radiusSuffixes.map((el) => `rounded-${el}`),
      ...shadowSizeSuffixes.map((el) => `shadow-${el}`),
      ...dropShadowSuffixes.map((el) => `drop-shadow-${el}`),
    ]

    this.flexDirectionClasses = flexDirectionSuffixes.map((el) => `flex-${el}`)
    this.flexWrapClasses = flexWrapSuffixes.map((el) => `flex-${el}`)
    this.gapClasses = gapSuffixes.map((el) => `gap-${el}`)

    this.displayClasses = [
      ...flexSizeSuffixes.map((el) => `flex-${el}`),
      ...justifyContentSuffixes.map((el) => `justify-${el}`),
      ...alignItemsSuffixes.map((el) => `items-${el}`),
      ...overflowSufixes.map((el) => `overflow-${el}`),
      ...opacitySuffixes.map((el) => `opacity-${el}`),
      ...displays.map((el) => el),
      ...positions,
      ...zIndexSuffixes.map((el) => `z-${el}`),
      ...orderSupportClasses.map((el) => `order-${el}`),
    ]
  }

  splitClassName(className: string) {
    const innerClassName = [];
    const outerClassName = [];

    className?.split(' ').map((cls) => {
      if (cls.trim().length === 0) return;
      if (cls.includes('flex-wrap')) {
        innerClassName.push(cls);
      }
      else if (cls.includes('bg-')) {
        innerClassName.push(cls);
      } else if (cls.includes('p-') || cls.includes('px-') || cls.includes('py-') || cls.includes('pt-') || cls.includes('pr-') || cls.includes('pb-') || cls.includes('pl-')) {
        innerClassName.push(cls);
      } else if (cls.includes('gap') || cls.includes('items') || cls.includes('justify')) {
        innerClassName.push(cls);
      } else if(cls.startsWith('rounded')) {
        innerClassName.push(cls);
      } else {
        outerClassName.push(cls);
      }
    })

    return {
      innerClass: innerClassName.join(' '),
      outerClass: outerClassName.join(' ')
    }
  }

  delete_null_properties = (test, recurse) => {
    for (const i in test) {
      if (test[i] === null || undefined || (isString(test[i]) && test[i].trim().length === 0)) {
        delete test[i];
      } else if (recurse && typeof test[i] === 'object') {
        this.delete_null_properties(test[i], recurse);
      }
    }
  }

  // From ClassObject To Form Model
  classObject2FormModel = (obj: any) => {

    for (const i in obj) {
      const value = obj[i];
      if (positions.includes(i)) {
        delete obj[i];
        obj['position'] = i;
        continue;
      } else if (displays.includes(i)) {
        delete obj[i];
        obj['display'] = i;
        continue;
      }

      switch (i) {
        case 'extraClasses':
          obj[i] = (value as string[])?.map(el => ({ class: el }));
          break;
        case 'flex':
          switch (typeof value) {
            // If this is only one string value;
            case 'string':
              if (flexDirectionSuffixes.includes(value)) {
                obj[i] = { direction: value }
              } else if (flexWrapSuffixes.includes(value)) {
                obj[i] = { wrap: value }
              } else {
                obj[i] = { size: value }
              }
              break;
            // If this is array
            case 'object':
              // eslint-disable-next-line no-case-declarations
              const textObj = {}
              for (const textKey in value) {
                if (flexDirectionSuffixes.includes(value[textKey])) {
                  textObj['direction'] = value[textKey];
                } else if (flexWrapSuffixes.includes(value)) {
                  textObj['wrap'] = value[textKey]
                } else {
                  textObj['size'] = value[textKey]
                }
              }
              obj[i] = textObj;
              break;
            default:
              break;
          }
          break;
        case 'text':
          switch (typeof value) {
            // If this is only one string value;
            case 'string':
              if (fontSizeSuffixes.includes(value)) {
                obj[i] = { size: value }
              } else if (textAlignSuffixes.includes(value)) {
                obj[i] = { align: value }
              } else {
                obj[i] = { color: value }
              }
              break;
            // If this is array
            case 'object':
              // eslint-disable-next-line no-case-declarations
              const textObj = {}
              for (const textKey in value) {
                if (fontSizeSuffixes.includes(value[textKey])) {
                  textObj['size'] = value[textKey];
                } else if (textAlignSuffixes.includes(value)) {
                  textObj['align'] = value[textKey]
                } else {
                  textObj['color'] = value[textKey]
                }
              }
              obj[i] = textObj;
              break;
            default:
              break;
          }
          break;
        case 'shadow':
          switch (typeof value) {
            // If this is only one string value;
            case 'string':
              if (shadowSizeSuffixes.includes(value)) {
                obj[i] = { size: value }
              } else {
                obj[i] = { color: value }
              }
              break;
            // If this is array
            case 'object':
              // eslint-disable-next-line no-case-declarations
              const textObj = {}
              for (const textKey in value) {
                if (shadowSizeSuffixes.includes(value[textKey])) {
                  textObj['size'] = value[textKey];
                } else {
                  textObj['color'] = value[textKey]
                }
              }
              obj[i] = textObj;
              break;
            default:
              break;
          }
          break;
        case 'border':
          switch (typeof value) {
            // If this is only one string value;
            case 'string':
              if (borderSizeSuffixes.includes(value)) {
                obj[i] = { size: value }
              } else {
                obj[i] = { color: value }
              }
              break;
            // If this is array
            case 'object':
              // eslint-disable-next-line no-case-declarations
              const textObj = {}
              for (const textKey in value) {
                if (borderSizeSuffixes.includes(value[textKey])) {
                  textObj['size'] = value[textKey];
                } else {
                  textObj['color'] = value[textKey]
                }
              }
              obj[i] = textObj;
              break;
            default:
              break;
          }
          break;
        case 'font':
          switch (typeof value) {
            // If this is only one string value;
            case 'string':
              if (fontFamilySuffixes.includes(value)) {
                obj[i] = { family: value }
              } else {
                obj[i] = { weight: value }
              }
              break;
            // If this is array
            case 'object':
              // eslint-disable-next-line no-case-declarations
              const textObj = {}
              for (const textKey in value) {
                if (fontFamilySuffixes.includes(value[textKey])) {
                  textObj['family'] = value[textKey];
                } else {
                  textObj['weight'] = value[textKey]
                }
              }
              obj[i] = textObj;
              break;
            default:
              break;
          }
          break;
        case 'bg':
          switch (typeof value) {
            // If this is only one string value;
            case 'string':
              if (bgOpacitySuffixes.includes(value)) {
                obj[i] = { opacity: value }
              } else if (bgSizeSuffixes.includes(value)) {
                obj[i] = { size: value }
              } else {
                obj[i] = { color: value }
              }
              break;
            // If this is array
            case 'object':
              // eslint-disable-next-line no-case-declarations
              const textObj = {}
              for (const textKey in value) {
                if (bgOpacitySuffixes.includes(value[textKey])) {
                  textObj['opacity'] = value[textKey];
                } else if (bgSizeSuffixes.includes(value[textKey])) {
                  textObj['size'] = value[textKey]
                } else {
                  textObj['color'] = value[textKey]
                }
              }
              obj[i] = textObj;
              break;

            default:
              break;
          }
          break;
        default:
          if (typeof obj[i] === 'object') {
            this.classObject2FormModel(obj[i]);
          }
          break;
      }
    }
  }

  // From Form Model to Tailwind Class List
  formModel2ClassObject = (obj: any) => {
    const newObject = {}
    for (const i in obj) {
      const value = obj[i];
      if (value === false) {
        delete obj[i];
        continue;
      }

      switch (i) {
        case 'extraClasses':
          newObject[i] = (value as any[])?.map((el => el.class));
          break;
        case 'position':
        case 'display':
          newObject[value] = true;
          break;
        case 'bg':
        case 'flex':
        case 'font':
        case 'border':
        case 'shadow':
        case 'text':
          switch (typeof value) {
            // If this is only one string value;
            case 'string':
              newObject[i] = value;
              break;
            // If this is object
            case 'object':
              // eslint-disable-next-line no-case-declarations
              const textValues = []
              for (const textKey in value) {
                textValues.push(value[textKey]);
              }
              newObject[i] = textValues;
              break;
            default:
              break;
          }
          break;
        default:
          if (typeof obj[i] === 'object') {
            newObject[i] = this.formModel2ClassObject(obj[i]);
          } else {
            newObject[i] = value;
          }
          break;
      }
    }
    return newObject;
  }

  generateClassName = (classObject: any) => {
    this.delete_null_properties(classObject, true)
    const newClassObject = this.formModel2ClassObject(classObject);
    const className = classList(newClassObject);
    return className;
  }

  parseClassName = (className: string) => {
    if (!className || className.length === 0) return {}
    const classObject = parseClassList(className);
    this.classObject2FormModel(classObject)
    return classObject;
  }

  standaloneClasses() {
    return [
      ...fontDecorations.map(el => el.class),
      ...positions,
    ]
  }

  filterClasses = (filter: TailwindClassFilter = null) => {
    if (!this.populated) {
      this.populateTailwindClasses();
      this.populated = true;
    }


    return new Observable((resolver) => {
      if (!filter) {
        resolver.next([
          ...this.colorClasses,
          ...this.widthClasses,
          ...this.heightClasses,
          ...this.marginClasses,
          ...this.paddingClasses,
          ...this.fontStyleClasses,
          ...this.decorationClasses,
          ...this.displayClasses,
          ...orderSupportClasses
        ]);
        resolver.complete();
      } else {
        const classes = []
        if (filter.background.color) {
          classes.push(
            ...this.backgroundClasses
          )
        }
        if (filter.colors) {
          classes.push(
            ...this.colorClasses
          )
        }
        if (filter.size.width) {
          classes.push(
            ...this.widthClasses,
            ...this.maxWidthClasses,
          )
        }
        if (filter.size.height) {
          classes.push(
            ...this.heightClasses
          )
        }
        if (filter.margin) {
          classes.push(
            ...this.marginClasses
          )
        }
        if (filter.padding) {
          classes.push(
            ...this.paddingClasses
          )
        }
        if (filter.fontStyle) {
          classes.push(
            ...this.fontStyleClasses
          )
        }
        if (filter.decoration) {
          classes.push(
            ...this.decorationClasses
          )
        }
        if (filter.display.enabled) {
          classes.push(
            ...this.displayClasses
          )
          if (filter.display.flexDirection) {
            classes.push(
              ...this.flexDirectionClasses
            )
          }
          if (filter.display.flexWrap) {
            classes.push(
              ...this.flexWrapClasses
            )
          }
          if (filter.display.gap) {
            classes.push(
              ...this.gapClasses
            )
          }
        }
        resolver.next(classes);
        resolver.complete();
      }
    })
  }
}
