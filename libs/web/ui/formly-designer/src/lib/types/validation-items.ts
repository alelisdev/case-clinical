export const validationItems = [
  {
    id: 'required',
    title: 'Required',
    default: false,
    requreMessage: false,
    type: 'bool'
  },
  {
    id: 'minLength',
    title: 'Min Length',
    default: 2,
    requreMessage: false,
    type: 'int',
  },
  {
    id: 'maxLength',
    title: 'Max Length',
    default: 10,
    requreMessage: false,
    type: 'int'
  },
  {
    id: 'min',
    title: 'Min',
    default: 1,
    requreMessage: false,
    type: 'int'
  },
  {
    id: 'max',
    title: 'Max',
    default: 999,
    requreMessage: false,
    type: 'int'
  },
  {
    id: 'pattern',
    title: 'Pattern',
    default: '.*',
    requreMessage: true,
    type: 'string'
  },
]
