import STANDALONE_CLASSES from './constants/standaloneClasses';
import ADJUSTABLE_CLASSES from './constants/adjustableClasses';
import RESPONSIVE_PREFIXES from './constants/responsivePrefixes';
import STATE_VARIANT_PREFIXES from './constants/stateVariantPrefixes';

const FLATTENED_STANDALONE_CLASSES = STANDALONE_CLASSES.reduce(
  (a, b) => [...a, ...b],
  []
);

const ADJUSTABLE_CLASS_KEYS = Object.keys(ADJUSTABLE_CLASSES);

const isPrefix = (val: any) => {
  return (
    RESPONSIVE_PREFIXES.includes(val) || STATE_VARIANT_PREFIXES.includes(val)
  );
};

const isValidTailwindClass = (val: any) => {
  return (
    FLATTENED_STANDALONE_CLASSES.includes(val) ||
    ADJUSTABLE_CLASS_KEYS.includes(val)
  );
};

const classNameRegex = /^-?[a-z:]+-/;

const isClassnameStart = (val: string) => {
  return val.match(classNameRegex) && val.split(classNameRegex);
};

export default function _parseClasses(classList: string) {
  const extraClasses: string[] = [];
  const parsedClasses = classList
    .split(' ')
    .reduce((a: any, b: any) => {
      if(b.trim().length === 0) return a;
      if([ 'flex' ].includes(b)) return a;

      if(b.includes(':')) {
        const keys = b.split(':');
        if(FLATTENED_STANDALONE_CLASSES.includes(keys[keys.length-1])) {
          if(keys.length === 3) {
            return [
              ...a,
              {
                [keys[0]]: {
                  [keys[1]]: {
                    [keys[2]]: true,
                  },
                },
              },
            ];
          } else if(keys.length === 2) {
            return [
              ...a,
              {
                [keys[0]]: {
                  [keys[1]]: true
                },
              },
            ];
          }
        }
      } else {
        if(FLATTENED_STANDALONE_CLASSES.includes(b)) {
          return [...a, { [b]: true }];
        }
      }

      const isCompleteAdjustableClass = ADJUSTABLE_CLASS_KEYS.includes(b);

      if (isCompleteAdjustableClass) {
        return [...a, { [b]: true }];
      }

      if (!isClassnameStart(b)) {
        extraClasses.push(b);
        return a;
      }

      const key = b.match(classNameRegex)[0];
      const value = b.split(classNameRegex)[1];

      const trim = (val: any) => val.slice(0, -1);

      if (key.includes(':')) {
        const keys = key.split(':');
        if (keys.length === 2) {
          if (isPrefix(keys[0])) {
            return [
              ...a,
              {
                [keys[0]]: {
                  [trim(keys[1])]: value,
                },
              },
            ];
          } else {
            extraClasses.push(b);
            return a;
          }
        } else if (keys.length === 3) {
          return [
            ...a,
            {
              [keys[0]]: {
                [keys[1]]: {
                  [trim(keys[2])]: value,
                },
              },
            },
          ];
        }
        return [...a, { [trim(key)]: value }];
      }

      if (isValidTailwindClass(trim(key))) {
        return [...a, { [trim(key)]: value }];
      } else {
        extraClasses.push(b);
        return a;
      }
    }, [])
    .reduce(mergeSubObject, {});
  return  { ...parsedClasses, extraClasses };
}

function mergeSubObject(obj: any, subobj: any) {
  const key = Object.keys(subobj)[0];
  if (obj[key] && obj[key] instanceof Array) {
    return { ...obj, [key]: [...obj[key], subobj[key]] };
  } else if (obj[key]) {
    if(['xs', 'sm', 'md', 'lg', 'hover', 'print'].includes(key)) {
      return { ...obj, [key]: { ...obj[key], ...subobj[key]} };
    } else {
      return { ...obj, [key]: [obj[key], subobj[key]] };
    }
  } else {
    return { ...obj, [key]: subobj[key] };
  }
}
