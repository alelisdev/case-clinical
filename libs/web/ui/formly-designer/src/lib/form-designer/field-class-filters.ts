import { TailwindClassFilter } from './../services/tailwind.service';

export const fieldVsFilters: Record<string, TailwindClassFilter> = {
  'boolean': {
    advanced: true,
    colors: false,
    size: {
      width: true,
      height: true,
    },
    margin: true,
    padding: true,
    fontStyle: false,
    decoration: false,
  },
  'container': {
    advanced: true,
    background: {
      image: true,
      color: true,
    },
    colors: true,
    size: {
      width: true,
      height: true,
    },
    margin: true,
    padding: true,
    fontStyle: false,
    decoration: false,

  },
  'date': {
    advanced: true,
    colors: false,
    size: {
      width: true,
      height: true,
    },
    margin: true,
    padding: true,
    fontStyle: false,
    decoration: false,

  },
  'date-time': {
    advanced: true,
    colors: false,
    size: {
      width: true,
      height: true,
    },
    margin: true,
    padding: true,
    fontStyle: false,
    decoration: false,

  },
  'description-list': {
    background: {
      image: false,
      color: false,
    },
    position: false,
    advanced: true,
    colors: false,
    size: {
      width: true,
      height: false,
    },
    margin: true,
    padding: false,
    fontStyle: false,
    decoration: false,

  },
  'divider': {
    background: {
      image: false,
      color: false,
    },
    position: false,
    advanced: true,
    colors: false,
    size: {
      width: false,
      height: false,
    },
    margin: true,
    padding: false,
    fontStyle: false,
    decoration: false,

  },
  'embed': {
    background: {
      image: false,
      color: false,
    },
    position: true,
    advanced: true,
    colors: false,
    size: {
      width: true,
      height: true,
    },
    margin: true,
    padding: false,
    fontStyle: false,
    decoration: false,

  },
  'grid': {
    advanced: true,
    colors: false,
    size: {
      width: true,
      height: true,
    },
    margin: true,
    padding: true,
    fontStyle: false,
    decoration: true,

  },
  'grid-container': {
    advanced: true,
    background: {
      image: true,
      color: true,
    },
    colors: true,
    size: {
      width: true,
      height: true,
    },
    margin: true,
    padding: true,
    decoration: true,
    display: {
      enabled: true,
      flexWrap: false,
      gap: true,
    }
  },
  'horizontal': {
    advanced: true,
    background: {
      image: true,
      color: true,
    },
    colors: true,
    size: {
      width: true,
      height: true,
    },
    margin: true,
    padding: true,
    decoration: true,
    display: {
      enabled: true,
      flexWrap: true,
      gap: true,
    }
  },
  'input': {
    advanced: true,
    colors: false,
    size: {
      width: true,
      height: false,
    },
    margin: true,
    padding: true,
    fontStyle: false,
    decoration: false,

  },

  'integer': {
    advanced: true,
    colors: false,
    size: {
      width: true,
      height: true,
    },
    margin: true,
    padding: true,
    fontStyle: false,
    decoration: false,

  },
  'icon': {
    background: {
      image: false,
      color: true,
    },
    advanced: true,
    colors: false,
    size: {
      width: false,
      height: false,
    },
    margin: true,
    padding: true,
    fontStyle: true,
    decoration: true,
    position: false,
  },
  'masked-input': {
    advanced: true,
    colors: false,
    size: {
      width: true,
      height: true,
    },
    margin: true,
    padding: true,
    fontStyle: false,
    decoration: false,

  },
  'number': {
    advanced: true,
    colors: false,
    size: {
      width: true,
      height: true,
    },
    margin: true,
    padding: true,
    fontStyle: false,
    decoration: false,

  },
  'paragraph': {
    advanced: true,
    colors: true,
    size: {
      width: true,
      height: true,
    },
    margin: true,
    padding: true,
    fontStyle: true,
    decoration: true,

  },
  'picture': {
    advanced: true,
    colors: true,
    size: {
      width: true,
      height: true,
    },
    margin: true,
    padding: true,
    fontStyle: false,
    decoration: true,

  },
  'router': {
    advanced: true,
    colors: false,
    size: {
      width: true,
      height: true,
    },
    margin: true,
    padding: false,
    decoration: true,

  },
  'textarea': {
    advanced: true,
    colors: false,
    size: {
      width: true,
      height: false,
    },
    margin: true,
    padding: true,
    fontStyle: false,
    decoration: false,

  },
  'text-list': {
    advanced: true,
    colors: false,
    size: {
      width: true,
      height: true,
    },
    margin: true,
    padding: true,
    fontStyle: true,
    decoration: false,

  },
  'flexbox': {
    advanced: true,
    colors: true,
    size: {
      width: true,
      height: true,
    },
    margin: true,
    padding: true,
    decoration: true,
    display: {
      enabled: true,
      flexDirection: true,
      flexWrap: true,
      gap: true
     }
  },
  'vertical': {
    advanced: true,
    display: {
      enabled: true,
      gap: true
    },
    background: {
      image: true,
      color: true,
    },
    colors: true,
    size: {
      width: true,
      height: true,
    },
    margin: true,
    padding: true,
    decoration: true,
  },
  'ag-chart': {
    advanced: true,
    display: {
      enabled: false,
      gap: true
    },
    background: {
      image: false,
      color: false,
    },
    colors: false,
    size: {
      width: true,
      height: true,
    },
    margin: true,
    padding: false,
    decoration: false,
    fontStyle: false,
    position: false,
  },
}
