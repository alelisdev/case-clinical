export const dataKeyWhiteList = [
  'dropdown',
  'enumeration',
  'grid-container',
  'horizontal',
  'table',
  'multi-select',
  'vertical',
  'carousel',
  'googlemap',
  'ag-grid',
  'kanban',
  'multicheckbox',
  'calendar',
  'timeline-stepper',
  'dropdown',
  'dropdown-button',
  'useModel',
]

export const essentialCustomValidators={
  'email':[{name:'email'}],
  'url':[{name:'url'}],
}

export const customValidationFields=[
  'date'
];

export const KeyEvents = [
  'keydown',
  'keypress',
  'focus',
  'blur',
  'keyup',
]

export const skipFields = [
  'align',
  'autoplay',
  'autoplayConfig',
  'autoSelect',
  'backgroundImage',
  'backgroundStyle',
  'fit-height',
  'bodyStyle',
  'border',
  'borderRadius',
  'breakpoints',
  'simpleMode',
  'centerlatitude',
  'centerlongitude',
  'color',
  'cols',
  'columnCount',
  'compact',
  'fold',
  'contextDataKey',
  'count',
  'currentIndex',
  'dark',
  'dataKey',
  'debounceValue',
  'defaultUrl',
  'groupKey',
  'direction',
  'displayMode',
  'divider',
  'effect',
  'elevation',
  'expanded',
  'featureName',
  'filterSource',
  'fit',
  'fontFamily',
  'fontSize',
  'fontWeight',
  'format',
  'formKey',
  'formWidth',
  'gap',
  'header',
  'headStyle',
  'height',
  'hideHeader',
  'hideLabel',
  'html',
  'icon',
  'iconUrl',
  'imageUrl',
  'items',
  'justifyContent',
  'labelProp',
  'labelStyle',
  'latitudeProp',
  'lgCount',
  'light',
  'limitTotoday',
  'lineHeight',
  'linkUrl',
  'longitudeProp',
  'loop',
  'maxValue',
  'mdCount',
  'minValue',
  'modelKey',
  'monthlyMode',
  'multiple',
  'objectFit',
  'padding',
  'paddingBottom',
  'paddingLeft',
  'paddingRight',
  'paddingTop',
  'paddingX',
  'paddingY',
  'paginationType',
  'path',
  'pull',
  'pulse',
  'allowSubtitle',
  'radius',
  'readonly',
  'readOnly',
  'require',
  'sentences',
  'showCheckBox',
  'showIcon',
  'showNavigation',
  'showNoDataLabel',
  'size',
  'sizeLimitInKB',
  'slot',
  'spacing',
  'spin',
  'stacked',
  'stripped',
  'submitAction',
  'submitOnSelect',
  'subtitle',
  'text',
  'title',
  'isAddBtn',
  'condensed',
  'toggleType',
  'url',
  'useDatakey',
  'useDataKey',
  'useExpression',
  'useModel',
  'valueProp',
  'variant',
  'weeklyMode',
  'width',
  'wrap',
  'xlCount',
  'startTime',
  'endTime',
  "documentIdKey",
  "filters",
  "sortOptions",
  "useDocumentId",
]

export const inputTypes = [
  'dropdown', 'input', 'number', 'enumeration', 'date', 'integer','url', 'textarea','rich-text', 'boolean'
]

export const customFunctions = {
  file: [
    {
      name: 'clickedLink',
      template: `(item) => {console.log('clicked item', item)}`
    },
    {
      name: 'onChange',
      template: '(file) => {  }'
    },
    {
      name: 'delete',
      template: '(d) => {}'
    }
  ],
  toggle: [
    {
      name: 'valueChanged',
      template: `(value, form, model) => { console.log('valueChanged: value = ', value) }`
    }
  ],
  dropdown: [
    {
      name: 'valueChanged',
      template: `(value, valueObject, contextData, form) => { console.log('valueChanged: value = ', value) }`
    }
  ],
  boolean: [
    {
      name: 'valueChanged',
      template: `(value, form) => { console.log('valueChanged: value = ', value) }`
    }
  ],
  calendar: [
    {
      name: 'selectedDate',
      template: `(date) => { console.log('Date Clicked: date = ', date)}`
    },
    {
      name: 'dateRangeChanged',
      template: `(dateRange) => { console.log('dateRange = ', dateRange)}`
    }
  ],
  multicheckbox: [
    {
      name: 'valueChanged',
      template: `(value) => { console.log('valueChanged: value = ', value) }`
    }
  ],
  date: [
    {
      name: 'valueChanged',
      template: `(value) => { console.log('valueChanged: value = ', value) }`
    }
  ],
  input: [
    {
      name: 'valueChanged',
      template: `(value) => { console.log('valueChanged: value = ', value) }`
    }
  ],
  integer: [
    {
      name: 'valueChanged',
      template: `(value) => { console.log('valueChanged: value = ', value) }`
    }
  ],

  password: [
    {
      name: 'valueChanged',
      template: `(value) => { console.log('valueChanged: value = ', value) }`
    }
  ],
  modal: [
    {
      name: 'modalCreated',
      template: `(controller: ModalController) => { }`
    },
    {
      name: 'submit',
      template: `(model) => { alert(JSON.stringify(model)) }`
    }
  ],
  'formly-modal': [
    {
      name: 'modalCreated',
      template: `(controller: FormlyModalController) => { }`
    },
    {
      name: 'submit',
      template: `(model) => { alert(JSON.stringify(model)) }`
    }
  ],
  number: [
    {
      name: 'valueChanged',
      template: `(value, form, model) => { console.log(value); form.patchValue({  }); }`
    }
  ],
  currency: [
    {
      name: 'valueChanged',
      template: `(value, form, model) => { console.log(value); form.patchValue({  }); }`
    }
  ],
  'select-form': [
    {
      name: 'valueChanged',
      template: `(value) => { alert(value) }`
    }
  ],
  'web-form': [
    {
      name: 'save',
      template: `(value) => { alert(value) }`
    },
    {
      name: 'cancel',
      template: `() => { }`
    },
  ],
  "anatomical-model": [
    {
      name: 'selectedBodyPart',
      template: `(part, side) => { alert(JSON.stringify({ part, side })) }`
    }
  ],
  'button': [
    {
      name: 'click',
      template: `(contextData) => {console.log('clicked, contextData = ', contextData)}`
    }
  ],
  'dropdown-button': [
    {
      name: 'menuSelected',
      template: `(selectedMenu, contextData) => {  }`
    }
  ],
  'kanban': [
    {
      name: 'cardGroupChanged',
      template:  `(movingCardData: any, newGroupId: string, newGroupName: string) => {  }`
    }
  ],
  'pagination': [
    {
      name: 'skipChange',
      template: `(skip) => { console.log('skipChanged, ', skip) }`
    },
    {
      name: 'onPageSelected',
      template: `(limit, pageIndex) => { console.log('skipChanged, ', skip) }`
    }
  ],
  'file-viewer': [
    {
      name: 'documentSubmit',
      template: `(d) => {console.log('signature', d)}`
    }
  ],
  'Address-picker': [
    {
      name: 'locationPicked',
      template: `(addressDetail, form) => { const { line1, line2, city, state, postalCode, country, lat, lng } = addressDetail; form.patchValue({  }); }`
    }
  ],
  'multi-select': [
    {
      name: 'valueChanged',
      template: `(values, valueObjs) => { console.log(value); }`
    }
  ],
'table': [
    {
      name: 'selectionChanged',
      template: `(selectedValues) => {  }`
    }
  ],
  'tabs': [
    {
      name: 'selectionChanged',
      template: `(tabIndex: number) => {  }`
    }
  ],
  'ratingbar': [
    {
      name: 'valueChanged',
      template: `(value, form) => { console.log(value); }`
    }
  ],
  'where-does-it-hurt': [
    {
      name: 'specialtiesSelected',
      template: `(specialties) => { console.log(specialties); }`
    },
  ],
  'masked-input':[
    {
      name: 'valueChanged',
      template: `(value, form) => { console.log(value); }`
    }],
  'file-new':[
    {
      name: 'onChange',
      template: `(value, field) => { console.log(value); }`
    }],

}
