import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core'
import {
  dataKeyWhiteList,
  skipFields,
  KeyEvents,
  inputTypes,
  customFunctions,
  essentialCustomValidators,
} from './constants'
import { Entity } from '../Entity'
import { EventIngestService } from './../../../../../services/src/lib/event-ingeste.service'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { FormService } from '../../../../form/src/lib/form.service'
import { isString } from 'lodash'
import { selectFormVariants } from '../select-form-variants'
import { Subject, takeUntil } from 'rxjs'
import { fieldVsFilters } from './field-class-filters'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { TailwindClassFilter, TailwindClassTitle, TailwindService } from '../services/tailwind.service'
import { validationItems } from '../types/validation-items'
import { gridVariants } from '../grid-variants'
import { webFormVariants } from '../web-form-variants'

@Component({
  styleUrls: ['./web-ui-form-field-edit.component.scss'],
  selector: 'ui-form-field-edit',
  template: `
    <ui-context-provider class="w-full">
      <form
        [formGroup]="formService.form"
        class="rounded-sm overflow-hidden mb-2"
        novalidate
        (ngSubmit)="submit(formModel)"
      >
        <div>
          <formly-form
            [fields]="fields"
            [form]="formService.form"
            [model]="formModel"
            [options]="options"
          ></formly-form>
        </div>
        <ui-button [label]="'Save'" class="my-1 px-1" [disabled]="!formService.form.valid" type="submit"></ui-button>
        <ui-button [label]="'Cancel'" type="button" class="my-1 px-1" (click)="close.emit()"></ui-button>
      </form>
    </ui-context-provider>
  `,
})
export class WebUiFormFieldEditComponent implements OnInit, OnChanges, OnDestroy {
  @Input() model: Entity = null
  @Input() narrow = false
  @Input() autoSubmit = true
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() close = new EventEmitter<void>()
  @Output() save = new EventEmitter<any>()
  private _unsubscribeAll = new Subject()

  fields: any[]
  formModel: any = {}

  validationOptions = []

  options = {
    formState: {
      mainModel: this.model,
    },
  }

  constructor(
    public formService: FormService,
    private tailwindService: TailwindService,
    private ingestService: EventIngestService,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.model) {
      console.log(changes.model)
      this.populate()
    }
  }

  ngOnInit(): void {
    if (this.model) {
      this.populate()
    }

    if (this.autoSubmit) {
      this.ingestService.eventTriggered$.pipe(takeUntil(this._unsubscribeAll)).subscribe(() => {
        console.log('Ingested Submit Action Triggered')
        this.submit(this.formModel)
      })

      this.formService.form.valueChanges.pipe(takeUntil(this._unsubscribeAll)).subscribe(() => {
        console.log('total form changed')
        this.ingestService.requireEventTrigger()
      })
    }
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null)
    this._unsubscribeAll.complete()
  }

  populate() {
    console.log(this.model)
    this.validationOptions = []
    this.formModel = {}
    if (this.narrow) {
      this.fields = [
        WebUiFormField.tabs(
          [
            WebUiFormField.tab('Layout', this.generateLayoutFields()),
            WebUiFormField.tab('Validation', this.generateValidationFields()),
            WebUiFormField.tab('Expression', this.generateExpressionFields()),
          ],
          'pills',
          true,
        ),
      ]
    } else {
      this.fields = [
        WebUiFormField.tabs([
          WebUiFormField.tab('Layout', this.generateLayoutFields()),
          WebUiFormField.tab('Validation', this.generateValidationFields()),
          WebUiFormField.tab('Expression', this.generateExpressionFields()),
        ]),
      ]
    }
  }

  generateStyleField(
    formKey = 'className',
    classFilter: TailwindClassFilter = null,
    filterTitle: TailwindClassTitle = null,
  ) {
    this.formModel['backgroundImage'] = this.model.getValue('backgroundImage')
    const classesSelectField = WebUiFormField.classesSelect(
      formKey,
      '',
      this.tailwindService,
      (removedClassName: string) => {
        const classObject = this.tailwindService.parseClassName(removedClassName)
        const setNullRecursively = (obj: any) => {
          const key = Object.keys(obj)[0]
          console.log('classesSelectField:', key)
          //
          const value = obj[key]
          if (isString(value)) {
            obj[key] = null
          } else if (value === true || value === false) {
            obj[key] = false
          } else {
            setNullRecursively(value)
          }
        }
        setNullRecursively(classObject)

        this.formService.form.patchValue(
          {
            [formKey]: {
              ...classObject,
            },
          },
          { onlySelf: false },
        )
      },
      (newClassName: string) => {
        if (!newClassName || newClassName.length === 0) return
        const newClassObject = this.tailwindService.parseClassName(newClassName)
        this.formService.form.patchValue({
          [formKey]: newClassObject,
        })
      },
      this.narrow,
      classFilter,
      filterTitle,
      {},
      { className: 'w-full' },
    )
    console.log('SelectField:', classesSelectField)
    if(formKey === 'titleStyle'){
      classesSelectField.fieldGroup[0].fieldGroup?.splice(2,1)
      classesSelectField.fieldGroup[0].fieldGroup?.splice(0,1)
    }
    
    return WebUiFormField.fieldRow([classesSelectField], 'w-full', { compact: true, hideLabel: true })
  }

  generateClassNameSelector() {
    if (this.model.ClassName.length > 0) {
      this.formModel['className'] = this.tailwindService.parseClassName(this.model.ClassName)
    }
    const classFilter = fieldVsFilters[this.model.type]
    return this.generateStyleField('className', classFilter)
  }

  generateAgChartFields(): FormlyFieldConfig[] {
    const palette = this.model.getValue('palette')
    this.formModel = {
      ...this.formModel,
      label: this.model.getValue('label'),
      dataKey: this.model.getValue('dataKey'),
      useDatakey: true,
      palette: palette
        ? {
          fills: palette.fills ? palette.fills.map((el) => ({ color: el })) : [],
          strokes: palette.strokes ? palette.strokes.map((el) => ({ color: el })) : [],
        }
        : {
          fills: [{ color: '#ff0000' }],
          strokes: [{ color: '#ff0000' }],
        },
      chartTitle: this.model.getValue('chartTitle'),
      chartSubtitle: this.model.getValue('chartSubtitle'),
      autoSize: this.model.getValue('autoSize') ?? true,
      useTimeSeries: this.model.getValue('useTimeSeries') ?? false,
      series: this.model.getValue('series'),
      axes: this.model.getValue('axes'),
      width: this.model.getValue('width') ?? 500,
      height: this.model.getValue('height') ?? 300,
      nomalizedTo: this.model.getValue('normalizedTo') ?? false,
      legend: this.model.getValue('legend') ?? {
        enabled: true,
        position: 'bottom',
      },
      padding: this.model.getValue('padding'),
      className: this.model.ClassName,
    }
    return [
      WebUiFormField.input('label', { label: 'Name', required: true }, { defaultValue: 'Angular Chart', className: 'w-full px-0.5' }),
      WebUiFormField.input('dataKey', { label: 'Data Key', required: true }, { className: 'w-full px-0.5' }),
      WebUiFormField.collapse('Title', [
        WebUiFormField.fieldGroup(
          'chartTitle',
          '',
          [
            WebUiFormField.input('text', { label: 'Text', required: true }, { defaultValue: "Ag Chart", className: 'w-1/2 px-0.5' }),
            WebUiFormField.number('fontSize', { label: 'FontSize' }, { defaultValue: 18, className: 'w-1/2 px-0.5' }),
          ],
          'w-full',
        ),
      ], 'w-full'),
      WebUiFormField.collapse('Sub Title', [
        WebUiFormField.fieldGroup(
          'chartSubtitle',
          '',
          [
            WebUiFormField.input('text', { label: 'Text', required: true }, { defaultValue: 'Chart Details', className: 'w-1/2 px-0.5' }),
            WebUiFormField.number('fontSize', { label: 'FontSize' }, { defaultValue: 15, className: 'w-1/2 px-0.5' }),
          ],
          'w-full',
        ),
      ], 'w-full'),
      WebUiFormField.collapse('Pallete', [
        WebUiFormField.fieldGroup(
          'palette',
          '',
          [
            WebUiFormField.repeat(
              'fills',
              { label: 'Fill Colors', required: true },
              WebUiFormField.colorPicker('color', {}, { className: 'w-full' }),
              'w-full',
            ),
            WebUiFormField.repeat(
              'strokes',
              { label: 'Stroke Colors', required: true },
              WebUiFormField.colorPicker('color', {}, { className: 'w-full' }),
              'w-full',
            ),
          ],
          'w-full px-1',
        )
      ], 'w-full'),
      WebUiFormField.boolean('useTimeSeries', { label: 'Use Time-Series Data?' }, { className: 'w-full px-0.5' }),
      WebUiFormField.collapse('Sizing', [
        WebUiFormField.boolean('autoSize', { label: 'Auto Size' }, { className: 'w-full px-0.5' }),
        WebUiFormField.number(
          'width',
          { label: 'Chart Width' },
          { className: 'w-1/2 px-0.5', hideExpression: 'model.autoSize' },
        ),
        WebUiFormField.number(
          'height',
          { label: 'Chart Height' },
          { className: 'w-1/2 px-0.5', hideExpression: 'model.autoSize' },
        )
      ], 'w-full'),
      WebUiFormField.collapse('Series', [
        WebUiFormField.repeat(
          'series',
          { label: '', narrow: true, title: 'Series', hideLabel: true, },
          WebUiFormField.fieldRow([
            WebUiFormField.dropdown(
              'type',
              {
                label: 'Type',
                required: true,
                items: [
                  { id: 'area', title: 'area' },
                  { id: 'bar', title: 'bar' },
                  { id: 'column', title: 'column' },
                  { id: 'histogram', title: 'histogram' },
                  { id: 'line', title: 'line' },
                  { id: 'pie', title: 'pie' },
                  { id: 'scatter', title: 'scatter' },
                ],
              },
              { className: 'w-1/2', defaultValue: 'line' },
            ),
            WebUiFormField.boolean(
              'stacked',
              { label: 'Stacked' },
              {
                className: 'w-1/2 mt-7 px-0.5',
                hideExpression: 'model.type !== "bar" && model.type !== "column" && model.type !== "area"',
              },
            ),
            WebUiFormField.boolean(
              'normalizedTo',
              { label: 'Normalized' },
              {
                className: 'w-1/2 mt-7 px-0.5',
                hideExpression: 'model.type !== "bar" && model.type !== "column" && model.type !== "area"',
              },
            ),
            WebUiFormField.input('xKey', { label: 'XKey', required: true }, { className: 'w-1/2 px-0.5' }),
            WebUiFormField.input('yKey', { label: 'YKey', required: true }, { className: 'w-1/2 px-0.5' }),
            WebUiFormField.input('yName', { label: 'YName' }, { className: 'w-1/2 px-0.5' }),
            WebUiFormField.fieldGroup(
              'label',
              '',
              [
                WebUiFormField.boolean('enabled', { label: 'Enable Label?' }, { className: 'w-full' }),
                WebUiFormField.colorPicker(
                  'color',
                  { label: 'Color' },
                  { className: 'w-full', hideExpression: '!model.enabled' },
                ),
                WebUiFormField.code(
                  'formatter',
                  { label: 'Formatter', narrow: this.narrow },
                  {
                    className: 'w-full',
                    hideExpression: '!model.enabled',
                    defaultValue: '({ value }) => { return value; }',
                  },
                ),
              ],
              'w-full',
            ),
            WebUiFormField.fieldGroup(
              'tooltip',
              '',
              [
                WebUiFormField.boolean('enabled', { label: 'Enable Tooltip?' }, { className: 'w-full' }),
                WebUiFormField.code(
                  'renderer',
                  { label: 'Renderer', narrow: this.narrow },
                  {
                    className: 'w-full',
                    hideExpression: '!model.enabled',
                    defaultValue: `({ yValue, xValue }) => { return { title: xValue, content: yValue; };}`,
                  },
                ),
              ],
              'w-full',
            ),
          ]),
          'w-full px-1',
        ),
      ], 'w-full'),
      WebUiFormField.collapse('Axes', [
        WebUiFormField.repeat(
          'axes',
          { label: '', narrow: this.narrow },
          WebUiFormField.fieldRow([
            WebUiFormField.dropdown(
              'type',
              {
                label: 'Type',
                required: true,
                items: [
                  { id: 'category', title: 'category' },
                  { id: 'groupedCategory', title: 'groupedCategory' },
                  { id: 'number', title: 'number' },
                  { id: 'time', title: 'time' },
                ],
              },
              { className: 'w-full', default: 'category' },
            ),
            WebUiFormField.dropdown(
              'position',
              {
                label: 'Position',
                required: true,
                items: [
                  { id: 'left', title: 'Left' },
                  { id: 'right', title: 'Right' },
                  { id: 'bottom', title: 'Bottom' },
                  { id: 'top', title: 'Top' },
                ],
              },
              { className: 'w-full' },
            ),
            WebUiFormField.fieldGroup(
              'title',
              '',
              [
                WebUiFormField.boolean('enabled', { label: 'Enable Title' }, { className: 'w-full' }),
                WebUiFormField.input(
                  'text',
                  { label: 'Text', required: true },
                  { className: 'w-full', hideExpression: '!model.enabled' },
                ),
              ],
              'w-1/2',
            ),
            WebUiFormField.fieldGroup(
              'label',
              '',
              [
                WebUiFormField.boolean('enabled', { label: 'Enable Label?' }, { className: 'w-full' }),
                // WebUiFormField.dropdown('fontWeight', { label: 'Font weight', required: true, items: [
                //   { id: 'bold', title: 'Bold' },
                //   { id: 'normal', title: 'Normal' },
                // ] }, { className: 'w-1/6', hideExpression: '!model.enabled' }),
                WebUiFormField.colorPicker(
                  'color',
                  { label: 'Color' },
                  { className: 'w-full', hideExpression: '!model.enabled' },
                ),
                WebUiFormField.code(
                  'formatter',
                  { label: 'Formatter', narrow: this.narrow },
                  {
                    className: 'w-full',
                    hideExpression: '!model.enabled',
                    defaultValue: '({ value }) => { return value; }',
                  },
                ),
              ],
              'w-full',
            ),
          ]),
        )
      ], 'w-full'),
      WebUiFormField.collapse('Legend', [
        WebUiFormField.fieldGroup(
          'legend',
          '',
          [
            WebUiFormField.boolean('enabled', { label: 'Enable Legend' }, { className: 'w-full' }),
            WebUiFormField.dropdown(
              'position',
              {
                label: '',
                required: true,
                items: [
                  { id: 'left', title: 'Left' },
                  { id: 'right', title: 'Right' },
                  { id: 'bottom', title: 'Bottom' },
                  { id: 'top', title: 'Top' },
                ],
              },
              { className: 'w-full', hideExpression: '!model.enabled' },
            ),
          ],
          'w-full',
        )
      ], 'w-full'),
      WebUiFormField.collapse('Padding', [
        WebUiFormField.fieldGroup(
          'padding',
          '',
          [
            WebUiFormField.spacingElement('mt', '', 'w-20 m-auto'),
            WebUiFormField.fieldRow([
              WebUiFormField.spacingElement('ml', '', 'w-20 mt-5'),
              WebUiFormField.picture('assets/images/editor-padding.svg'),
              WebUiFormField.spacingElement('mr', '', 'w-20 mt-5'),
            ], 'flex flex-row items-center justify-center gap-1'),
            WebUiFormField.spacingElement('mb', '', 'w-20 mt-5 mr-auto ml-auto'),
            WebUiFormField.fieldRow([
              WebUiFormField.spacingElement('my', 'Y-AXIS', 'w-1/2 pr-1'),
              WebUiFormField.spacingElement('mx', 'X-AXIS', 'w-1/2 pl-1'),
            ])
          ], 'flex flex-col items-center scale-100',
        )
      ], 'w-full'),
      WebUiFormField.divider(),
      this.generateClassNameSelector(),
    ]
  }

  generateChartFields(): FormlyFieldConfig[] {
    this.formModel = {
      ...this.formModel,
      feedMode: this.model.getValue('feedMode') ?? 0,
      dataKey: this.model.getValue('dataKey'),
      cubeQuery: this.model.getValue('cubeQuery') ?? {
        measures: ['Customer.count'],
        timeDimensions: [
          {
            dimension: 'Customer.createdat',
            granularity: 'day',
          },
        ],
        order: {
          'Customer.createdat': 'asc',
        },
      },
    }

    return [
      WebUiFormField.dropdown(
        'feedMode',
        {
          label: 'Data Feed Mode',
          value: this.model.getValue('feedMode') ?? 0,
          items: [
            {
              id: 0,
              title: 'Using Sample Data',
            },
            {
              id: 1,
              title: 'Using dataKey',
            },
          ],
        },
        {
          className: 'w-full',
        },
      ),
      WebUiFormField.input(
        'dataKey',
        { label: 'DataKey', required: true },
        {
          className: 'w-full px-0.5',
          hideExpression: 'model.feedMode !== 1',
        },
      ),
    ]
  }

  generateLayoutFields(): FormlyFieldConfig[] {
    let _fields = []
    if (this.model.requireKey) {

      if (this.model.type !== 'grid') {
        _fields.push(
          ...WebUiFormField.oneOf(
            'useModel',
            'Choose Key Binding Option',
            ['Use Model', 'Use Context Data'],
            [
              WebUiFormField.input('key', { label: 'Key', required: true }, { className: 'w-full px-0.5' }),
              WebUiFormField.input(
                'contextDataKey',
                { label: 'Context Data Key', required: false },
                { className: 'w-full px-0.5' },
              ),
            ],
          )
        )
        this.formModel['key'] = this.model.Key
        this.formModel['useModel'] = this.model.getValue('useModel')
        this.formModel['contextDataKey'] = this.model.getValue('contextDataKey')
      }
    }

    if (inputTypes?.includes(this.model.type)) {
      this.formModel['readonly'] = this.model.getValue('readonly')
      this.formModel['hideLabel'] = this.model.getValue('hideLabel')
      this.formModel['compact'] = this.model.getValue('compact')

      _fields.push(
        WebUiFormField.boolean('readonly', { label: 'Readonly?' }, { className: 'w-full px-0.5', defaultValue: false }),
        WebUiFormField.boolean('compact', { label: 'Compact?' }, { className: 'w-full px-0.5', defaultValue: false }),
        WebUiFormField.boolean(
          'hideLabel',
          { label: 'Hide Label?' },
          { className: 'w-full px-0.5', defaultValue: false },
        ),
      )
    }

    // Use dataKey?
    if (dataKeyWhiteList.includes(this.model.type)) {
      const dataKey = this.model.getValue('dataKey')
      if (dataKey) {
        this.formModel['dataKey'] = dataKey
        this.formModel['useDatakey'] = true
      }
      _fields.push(
        WebUiFormField.boolean(
          'useDatakey',
          {
            label: 'Use Datakey?',
          },
          { className: 'w-full px-0.5' },
        ),
      )
      _fields.push(
        WebUiFormField.input(
          'dataKey',
          {
            required: true,
          },
          {
            className: 'w-full px-0.5',
            hideExpression: '!model.useDatakey',
          },
        ),
      )
    }

    switch (this.model.type) {
      case 'button':
        this.formModel['submitButton'] = this.model.getValue('submitButton')
        this.formModel['title'] = this.model.getValue('title')
        this.formModel['stopPropagation'] = this.model.getValue('stopPropagation')
        this.formModel['className'] = this.model.ClassName;
        return [
          WebUiFormField.input('title', { label: 'Name' }, { className: 'w-full px-0.5' }),
          WebUiFormField.boolean('submitButton', { label: 'Submit Button?' }, { className: 'w-full px-0.5' }),
          WebUiFormField.boolean('stopPropagation', { label: 'Stop Propagation?' }, { className: 'w-full px-0.5', defaultValue: true }),
          this.generateClassNameSelector(),
        ]
      case 'svg-view':
        this.formModel['svgText'] = this.model.getValue('svgText')
        this.formModel['title'] = this.model.getValue('title')
        this.formModel['className'] = this.model.ClassName;
        return [
          WebUiFormField.code('svgText', { label: 'Svg Text', narrow: true, required: true }, { className: 'w-full px-0.5' }),
          this.generateClassNameSelector(),
        ]
      case 'collapse':
        this.formModel = {
          title: this.model.getValue('title'),
          closed: this.model.getValue('closed'),
          allowSubtitle: this.model.getValue('allowSubtitle'),
          subtitle: this.model.getValue('subtitle'),
          className: this.model.ClassName,
        }
        return [
          WebUiFormField.input('title', { label: 'Title', required: true }, { className: 'w-full px-0.5' }),
          WebUiFormField.boolean('closed', { label: 'Closed' }, { className: 'w-full px-0.5', defaultValue: false }),
          WebUiFormField.boolean('allowSubtitle', { label: 'AllowSubtitle' }, { className: 'w-full px-0.5', defaultValue: false }),
          WebUiFormField.input('subtitle', { label: 'Sub Title', required: true }, { className: 'w-full px-0.5', hideExpression: '!model.allowSubtitle' }),

          this.generateClassNameSelector(),
        ]
      case 'financial-gauge':{
        const titleStyle = this.model.getValue('titleStyle') ?? ''
        const className = this.model.ClassName ?? ''
        this.formModel = {
          title: this.model.getValue('title'),
          mode: this.model.getValue('mode'),
          roundTo: this.model.getValue('roundTo'),
          useKey: this.model.getValue('useKey'),
          value: this.model.getValue('value'),
          valueKey: this.model.getValue('valueKey'),
          titleStyle: this.tailwindService.parseClassName(titleStyle),
          className: this.tailwindService.parseClassName(className),
        }
        return [
          ...WebUiFormField.oneOf(
            'useKey',
            'Choose Value Binding Mode',
            ['Direct Value', 'Use DataKey'],
            [
              WebUiFormField.number(
                'value',
                {
                  required: true,
                  label: 'Value',
                },
                {
                  className: 'w-full px-0.5',
                  defaultValue: 0.5
                },
              ),
              WebUiFormField.input(
                'valueKey',
                { label: 'Input DataKey', required: true },
                { className: 'w-full px-0.5' },
              ),
            ],
          ),
          WebUiFormField.dropdown(
            'mode',
            {
              label: 'Mode',
              required: true,
              items: [
                { id: 'default', title: 'Default' },
                { id: 'reverse', title: 'Reverse' },
              ],
            },
            { className: 'w-full px-0.5', defaultValue: 'default' },
          ),
          WebUiFormField.input('title', { label: 'Title' }, { className: 'w-full px-0.5' }),
          WebUiFormField.number('roundTo', { label: 'Round To', required: true }, { className: 'w-full px-0.5', defaultValue: 2 }),
          this.generateStyleField(
            'titleStyle',
            {
              advanced: false,
              display: {
                enabled: false,
              },
              background: {
                image: false,
                color: false,
              },
              position: false,
              decoration: false,
              size: {
                width: false,
                height: false,
              },
              padding: false,
              margin: false,
              colors: false,
              fontStyle: true,
            },
            { fontStyle: 'Title Style' },
          ),
          this.generateStyleField(
            'className',
            {
              advanced: true,
              display: {
                enabled: false,
              },
              decoration: false,
              size: {
                width: true,
                height: true,
              },
              padding: false,
              margin: true,
              colors: false,
              fontStyle: false,
            },
            { fontStyle: 'Title Margin' },
          ),
          //this.generateClassNameSelector(),
        ]}
      case 'full-height':
        this.formModel = {
          distanceFromBottom: this.model.getValue('distanceFromBottom'),
          className: this.model.ClassName,
        }
        return [
          WebUiFormField.number('distanceFromBottom', { label: 'Distance From Bottom(px)', required: true }, { className: 'w-full px-0.5', defaultValue: 10 }),
          this.generateClassNameSelector(),
        ]
      case 'table-of-contents-section': {
        this.formModel = {
          label: this.model.getValue('label'),
          className: this.model.ClassName,
        }

        return [
          WebUiFormField.input('label', { label: 'Title', required: true }, { className: 'w-full px-0.5', defaultValue: 'Section' }),
          this.generateClassNameSelector(),
        ]
      }
      case 'file-viewer':
        this.formModel = {
          document: this.model.getValue('document'),
          signatureBoxName: this.model.getValue('signatureBoxName'),
          redirectUrlAfterSignature: this.model.getValue('redirectUrlAfterSignature'),
          ownerName: this.model.getValue('ownerName'),
          signerName: this.model.getValue('signerName'),
          signerInitials: this.model.getValue('signerInitials'),
        }

        return [
          WebUiFormField.input(
            'document',
            { label: 'Document Observable DataKey', required: true },
            { className: 'w-full px-0.5' },
          ),
          WebUiFormField.input('signatureBoxName', { label: 'Signature Box Name' }, { className: 'w-full px-0.5' }),
          WebUiFormField.input(
            'redirectUrlAfterSignature',
            { label: 'RedirectUrl After Signature' },
            { className: 'w-full px-0.5' },
          ),
          WebUiFormField.input('ownerName', { label: 'Owner Name' }, { className: 'w-full px-0.5' }),
          WebUiFormField.input('signerName', { label: 'Signer Name' }, { className: 'w-full px-0.5' }),
          WebUiFormField.input('signerInitials', { label: 'Signer Initials' }, { className: 'w-full px-0.5' }),
          this.generateClassNameSelector(),
        ]
      case 'file-preview':
        this.formModel = {
          documentKey: this.model.getValue('documentKey'),
          modeOptions: this.model.getValue('modeOptions'),
          className: this.model.ClassName
        }
        return [
          WebUiFormField.input(
            'documentKey',
            { label: 'Document Observable DataKey', required: true },
            { className: 'w-full px-0.5' },
          ),
          this.generateClassNameSelector(),
          WebUiFormField.dropdown(
            'modeOptions',
            {
              label: 'Mode Options',
              value: this.model.getValue('modeOptions'),
              required: true,
              items: [
                { id: 'default', title: 'default' },
                { id: 'edit', title: 'edit' },
                { id: 'avatar', title: 'avatar' },
                { id: 'gallery', title: 'gallery' },
              ],
            },
            { className: 'w-full px-0.5', defaultValue: 'edit' },
          ),
        ]
      case 'modal':
        this.formModel['hideToggle'] = this.model.getValue('hideToggle')
        this.formModel['title'] = this.model.getValue('title')
        this.formModel['modelKey'] = this.model.getValue('modelKey')
        this.formModel['hideSave'] = this.model.getValue('hideSave')
        this.formModel['className'] = this.model.ClassName;
        return [
          WebUiFormField.input('title', { label: 'Name' }, { className: 'w-full px-0.5' }),
          WebUiFormField.input('modelKey', { label: 'modelKey' }, { className: 'w-full px-0.5' }),
          WebUiFormField.boolean(
            'hideToggle',
            { label: 'Hide Toggle' },
            { className: 'w-full px-0.5', defaultValue: false },
          ),
          WebUiFormField.boolean(
            'hideSave',
            { label: 'Hide Save Button?' },
            { className: 'w-full px-0.5', defaultValue: false },
          ),
          this.generateClassNameSelector(),
        ]
      case 'formly-modal':
        this.formModel['formName'] = this.model.getValue('formName')
        this.formModel['hideSave'] = this.model.getValue('hideSave')
        this.formModel['title'] = this.model.getValue('title')
        this.formModel['className'] = this.model.ClassName;
        return [
          WebUiFormField.input('title', { label: 'Name' }, { className: 'w-full px-0.5' }),
          WebUiFormField.input('formName', { label: 'Form Name', required: true }, { className: 'w-full px-0.5' }),
          WebUiFormField.boolean(
            'hideSave',
            { label: 'Hide Save Button?' },
            { className: 'w-full px-0.5', defaultValue: false },
          ),
          this.generateClassNameSelector(),
        ]
      case 'horoscope':
        this.formModel['signOptions'] = this.model.getValue('signOptions')
        this.formModel['useKey'] = this.model.getValue('useKey')
        this.formModel['date'] = this.model.getValue('date')
        this.formModel['dateKey'] = this.model.getValue('dateKey')
        return [
          WebUiFormField.dropdown(
            'signOptions',
            {
              label: 'Sign Options',
              value: this.model.getValue('signOptions'),
              required: true,
              items: [
                { id: 'aries', title: 'aries' },
                { id: 'taurus', title: 'taurus' },
                { id: 'gemini', title: 'gemini' },
                { id: 'cancer', title: 'cancer' },
                { id: 'leo', title: 'leo' },
                { id: 'virgo', title: 'virgo' },
                { id: 'libra', title: 'libra' },
                { id: 'scorpio', title: 'scorpio' },
                { id: 'sagittarius', title: 'sagittarius' },
                { id: 'capricorn', title: 'capricorn' },
                { id: 'aquarius', title: 'aquarius' },
                { id: 'pisces', title: 'pisces' },
              ],
            },
            { className: 'w-full', defaultValue: 'cancer' },
          ),
          ...WebUiFormField.oneOf(
            'useKey',
            'Choose Input Option',
            ['Direct Value', 'Use DataKey'],
            [
              WebUiFormField.date(
                'date',
                {
                  required: true,
                  label: 'Select Date',
                },
                {
                  className: 'w-full',
                  expressionProperties: {},
                },
              ),
              WebUiFormField.input(
                'dateKey',
                { label: 'Input DataKey', required: true },
                { className: 'w-full px-0.5' },
              ),
            ],
          ),
          // WebUiFormField.radio('useKey', { options: [{ title: 'Direct Value', value: 0 }, { title: 'Use DataKey', value: 1 }] }, { className: 'w-full px-0.5', defaultValue: 0 }),
          this.generateClassNameSelector(),
        ]
      case 'circle-progress':
        this.formModel = {
          radius: this.model.getValue('radius'),
          percent: this.model.getValue('percent'),
          stroke: this.model.getValue('stroke'),
          outerStrokeColor: this.model.getValue('outerStrokeColor'),
          innerStrokeColor: this.model.getValue('innerStrokeColor'),
          imageSrc: this.model.getValue('imageSrc'),
          imageWidth: this.model.getValue('imageWidth'),
          dataKey: this.model.getValue('dataKey'),
          imageHeight: this.model.getValue('imageHeight'),
          useDatakey: this.model.getValue('useDatakey'),
          title: this.model.getValue('title'),
          className: this.model.ClassName,
        }
        return [
          WebUiFormField.input(
            'title',
            { label: 'Title', required: true },
            { className: 'w-full px-0.5'},
          ),
          WebUiFormField.number(
            'radius',
            { label: 'Radius', required: true },
            { className: 'w-full px-0.5', defaultValue: 50 },
          ),
          WebUiFormField.boolean(
            'useDatakey',
            { label: 'Use Data Key?' },
            { className: 'w-full px-0.5', defaultValue: false },
          ),
          WebUiFormField.input(
            'dataKey',
            { label: 'DataKey', required: true },
            { className: 'w-full px-0.5', hideExpression: (model) => model.useDatakey === false },
          ),
          WebUiFormField.number(
            'percent',
            { label: 'Percent', required: true, min: 0, max: 100 },
            { className: 'w-full px-0.5', defaultValue: 80, hideExpression: (model) => model.useDatakey === true },
          ),
          WebUiFormField.number(
            'stroke',
            { label: 'Stroke', required: true },
            { className: 'w-full px-0.5', defaultValue: 10 },
          ),
          WebUiFormField.colorPicker(
            'outerStrokeColor',
            { label: 'OuterStrokeColor', required: true },
            { className: 'w-full px-0.5', defaultValue: 'FF0000' },
          ),
          WebUiFormField.colorPicker(
            'innerStrokeColor',
            { label: 'innerStrokeColor', required: true },
            { className: 'w-full px-0.5', defaultValue: '222222' },
          ),
          WebUiFormField.input(
            'imageSrc',
            { label: 'ImageSrc', required: true },
            { className: 'w-full px-0.5', defaultValue: 'assets/icons/icon-01.png' },
          ),
          WebUiFormField.number(
            'imageWidth',
            { label: 'ImageWidth', required: true },
            { className: 'w-full px-0.5', defaultValue: 30 },
          ),
          WebUiFormField.number(
            'imageHeight',
            { label: 'ImageHeight', required: true },
            { className: 'w-full px-0.5', defaultValue: 38 },
          ),
          this.generateClassNameSelector(),
        ]
      case 'pagination':
        this.formModel['limit'] = this.model.getValue('limit')
        this.formModel['skip'] = this.model.getValue('skip')
        this.formModel['total'] = this.model.getValue('total')
        this.formModel['useKey'] = this.model.getValue('useKey')
        this.formModel['paginationKey'] = this.model.getValue('paginationKey')
        this.formModel['showPages'] = this.model.getValue('showPages')
        this.formModel['title'] = this.model.getValue('title')

        return [
          WebUiFormField.input('title', { label: 'Title', required: true }, { className: 'w-full px-0.5', defaultValue: 'Items' }),
          ...WebUiFormField.oneOf(
            'useKey',
            'Select Input Option',
            ['Use DataKey', 'Use Direct Input'],
            [
              WebUiFormField.input(
                'paginationKey',
                { label: 'DataKey', required: true },
                { className: 'w-full px-0.5' },
              ),
              WebUiFormField.fieldRow([
                WebUiFormField.number('limit', { label: 'Limit' }, { className: 'w-full px-0.5', defaultValue: 1 }),
                WebUiFormField.number('skip', { label: 'Skip' }, { className: 'w-full px-0.5', defaultValue: 1 }),
                WebUiFormField.number('total', { label: 'Total' }, { className: 'w-full px-0.5', defaultValue: 1 }),
              ]),
            ],
          ),
          WebUiFormField.boolean(
            'showPages',
            { label: 'ShowPages' },
            { className: 'w-full px-0.5', defaultValue: true },
          ),
        ]
      case 'typeahead':
        this.formModel = {
          ...this.formModel,
          key: this.model.Key,
          label: this.model.getValue('label'),
          useKey: this.model.getValue('useKey'),
          sourceKey: this.model.getValue('sourceKey'),
          labelProp: this.model.getValue('labelProp'),
          valueProp: this.model.getValue('valueProp'),
          options: this.model.getValue('options'),
          multiple: this.model.getValue('multiple'),
          placeholder: this.model.getValue('placeholder'),
        }
        return [
          WebUiFormField.input('key', { label: 'Key', required: true }, { className: 'w-full px-0.5' }),
          WebUiFormField.input('label', { label: 'Label', required: true }, { className: 'w-full px-0.5' }),
          WebUiFormField.input(
            'placeholder',
            { label: 'Placeholder', required: true },
            { className: 'w-full px-0.5', defaultValue: 'Select' },
          ),
          WebUiFormField.boolean('multiple', { label: 'Multiple', required: true }, { className: 'w-full px-0.5' }),
          ...WebUiFormField.oneOf(
            'useKey',
            'Select Source Type',
            ['Use DataKey', 'Direct Values'],
            [
              WebUiFormField.fieldRow([
                WebUiFormField.input('sourceKey', { label: 'Source', required: true }, { className: 'w-full px-0.5' }),
                WebUiFormField.input(
                  'valueProp',
                  { label: 'Value Prop', required: true },
                  { className: 'w-full px-0.5', defaultValue: 'id' },
                ),
                WebUiFormField.input(
                  'labelProp',
                  { label: 'Label Prop', required: true },
                  { className: 'w-full px-0.5', defaultValue: 'name' },
                ),
              ]),
              WebUiFormField.fieldRow([
                WebUiFormField.repeat(
                  'options',
                  { label: 'Options', narrow: this.narrow },
                  WebUiFormField.fieldRow([
                    WebUiFormField.input('id', { label: 'Value', required: true }, { className: 'w-1/2 px-0.5' }),
                    WebUiFormField.input('name', { label: 'Label', required: true }, { className: 'w-1/2 px-0.5' }),
                  ]),
                  'w-full px-0.5',
                ),
              ]),
            ],
          ),
          WebUiFormField.divider(),
          this.generateClassNameSelector(),
        ]
      case 'ag-chart':
        return this.generateAgChartFields()
      case 'bar-chart':
        this.formModel = {
          ...this.formModel,
          stacked: this.model.getValue('stacked'),
        }
        _fields = [
          WebUiFormField.boolean('stacked', { label: 'Stacked' }, { className: 'w-full px-0.5' }),
          ...this.generateChartFields(),
          this.generateClassNameSelector(),
        ]
        return _fields
      case 'carousel':

        this.formModel = {
          ...this.formModel,
          effect: this.model.getValue('effect'),
          breakpoints: this.model.getValue('breakpoints'),
          paginationType: this.model.getValue('paginationType'),
          direction: this.model.getValue('direction'),
          loop: this.model.getValue('loop'),
          showNavigation: this.model.getValue('showNavigation'),
          autoplay: this.model.getValue('autoplay'),
          dataKey: this.model.getValue('dataKey'),
          useDatakey: this.model.getValue('dataKey') ? true : false,
        }

        _fields = [
          WebUiFormField.boolean(
            'useDatakey',
            {
              label: 'Use Datakey?',
            },
            { className: 'w-full px-0.5' },
          ),
          WebUiFormField.input(
            'dataKey',
            {
              required: true,
            },
            {
              className: 'w-full px-0.5',
              hideExpression: '!model.useDatakey',
            },
          ),
          WebUiFormField.boolean(
            'autoplay',
            {
              label: 'Auto Play',
            },
            { className: 'w-full px-0.5', defaultValue: false },
          ),

          WebUiFormField.enum(
            'effect',
            {
              label: 'Effect',
              values: [
                'slide',
                'cards',
                'coverflow',
                // 'creative',
                'cube',
                'fade',
                'flip',
              ],
            },
            { className: 'w-full px-0.5', defaultValue: 'slide' },
          ),
          WebUiFormField.enum(
            'paginationType',
            {
              label: 'Pagination Type',
              values: ['bullets', 'fraction', 'progressbar'],
            },
            { className: 'w-full px-0.5', defaultValue: 'bullets' },
          ),
          WebUiFormField.boolean(
            'showNavigation',
            {
              label: 'Show Navigation?',
            },
            { className: 'w-full px-0.5', defaultValue: false },
          ),

          WebUiFormField.fieldGroup('breakpoints', 'Breakpoints', [
            WebUiFormField.tabs(
              [
                WebUiFormField.tab('ALL', [
                  WebUiFormField.fieldGroup(
                    'all',
                    '',
                    [
                      WebUiFormField.number(
                        'slidesPerView',
                        { label: 'Slides Count', compact: true },
                        { className: 'w-1/2 px-0.5', defaultValue: 1.2 },
                      ),
                      WebUiFormField.number(
                        'spaceBetween',
                        { label: 'Space', compact: true },
                        { className: 'w-1/2 px-0.5', defaultValue: 10 },
                      ),
                    ],
                    '',
                    {},
                    true,
                    true,
                  ),
                ]),
                WebUiFormField.tab('SM', [
                  WebUiFormField.fieldGroup(
                    'sm',
                    '',
                    [
                      WebUiFormField.number(
                        'slidesPerView',
                        { label: 'Slides Count', compact: true },
                        { className: 'w-1/2 px-0.5', defaultValue: 1.2 },
                      ),
                      WebUiFormField.number(
                        'spaceBetween',
                        { label: 'Space', compact: true },
                        { className: 'w-1/2 px-0.5', defaultValue: 10 },
                      ),
                    ],
                    '',
                    {},
                    true,
                    true,
                  ),
                ]),
                WebUiFormField.tab('MD', [
                  WebUiFormField.fieldGroup(
                    'md',
                    '',
                    [
                      WebUiFormField.number(
                        'slidesPerView',
                        { label: 'Slides Count', compact: true },
                        { className: 'w-1/2 px-0.5', defaultValue: 1.2 },
                      ),
                      WebUiFormField.number(
                        'spaceBetween',
                        { label: 'Space', compact: true },
                        { className: 'w-1/2 px-0.5', defaultValue: 10 },
                      ),
                    ],
                    '',
                    {},
                    true,
                    true,
                  ),
                ]),
                WebUiFormField.tab('LG', [
                  WebUiFormField.fieldGroup(
                    'lg',
                    '',
                    [
                      WebUiFormField.number(
                        'slidesPerView',
                        { label: 'Slides Count', compact: true },
                        { className: 'w-1/2 px-0.5', defaultValue: 1.2 },
                      ),
                      WebUiFormField.number(
                        'spaceBetween',
                        { label: 'Space', compact: true },
                        { className: 'w-1/2 px-0.5', defaultValue: 10 },
                      ),
                    ],
                    '',
                    {},
                    true,
                    true,
                  ),
                ]),
                WebUiFormField.tab('XL', [
                  WebUiFormField.fieldGroup(
                    'xl',
                    '',
                    [
                      WebUiFormField.number(
                        'slidesPerView',
                        { label: 'Slides Count', compact: true },
                        { className: 'w-1/2 px-0.5', defaultValue: 1.2 },
                      ),
                      WebUiFormField.number(
                        'spaceBetween',
                        { label: 'Space', compact: true },
                        { className: 'w-1/2 px-0.5', defaultValue: 10 },
                      ),
                    ],
                    '',
                    {},
                    true,
                    true,
                  ),
                ]),
              ],
              'full_width_underline',
            ),
          ]),
        ]
        break
      case 'area-chart':
      case 'chart':
        this.formModel = {
          ...this.formModel,
        }
        _fields = [...this.generateChartFields()]
        break
      case 'pie-chart':
        _fields.push(
          WebUiFormField.repeat(
            'data',
            { label: 'Chart Values' },
            WebUiFormField.fieldRow([
              WebUiFormField.input('label', { label: 'Label', required: true }, { className: 'w-1/2 px-0.5' }),
              WebUiFormField.number('value', { label: 'Value', required: true }, { className: 'w-1/2 px-0.5' }),
            ]),
          ),
        )
        this.formModel['data'] = this.model.getValue('data')
        break
      case 'divider': {
        const borderStyle = this.model.getValue('borderStyle') ?? ''

        this.formModel = {
          borderStyle: this.tailwindService.parseClassName(borderStyle),
        }

        return [
          this.generateStyleField(
            'borderStyle',
            {
              background: {
                image: false,
                color: false,
              },
              advanced: false,
              display: {
                enabled: false,
              },
              decoration: false,
              size: {
                width: false,
                height: false,
              },
              padding: false,
              margin: false,
              colors: true,
              position: false,
              fontStyle: false,
            },
            { colors: 'Border Color' },
          ),
          this.generateClassNameSelector(),
        ]
      }
      case 'embed':
        this.formModel = {
          iFrame: !!this.model.getValue('url'),
          url: this.model.getValue('url'),
          html: this.model.getValue('html'),
        }
        _fields = [
          WebUiFormField.boolean('iFrame', { label: 'Embed Link?' }, { className: 'w-full px-0.5' }),
          WebUiFormField.url(
            'url',
            { label: 'Url', required: true },
            { className: 'w-full px-0.5', hideExpression: '!model.iFrame' },
          ),
          WebUiFormField.code(
            'html',
            { label: 'Content Html', required: true },
            { className: 'w-full', hideExpression: 'model.iFrame' },
          ),
          this.generateClassNameSelector(),
        ]
        return _fields
      case 'custom-component':
        this.formModel = {
          dataFeedMode: this.model.getValue('dataFeedMode'),
          datakey: this.model.getValue('datakey'),
          data: this.model.getValue('data'),
          className: this.model.ClassName,
        }
        _fields = [

          ...WebUiFormField.oneOf('dataFeedMode', 'Select Data Feed Mode', ['No Data', 'Use DataKey', 'Custom Data'], [
            WebUiFormField.empty(),
            WebUiFormField.input('datakey', { label: 'DataKey', required: true }, { className: 'w-full px-0.5' }),
            WebUiFormField.jsonEditor('data', { label: 'Custom Data', required: true }, { className: 'w-full px-0.5' }),
          ]),
          this.generateClassNameSelector()
        ]
        return _fields;
      case 'timeline-stepper': {
        this.formModel = {
          ...this.formModel,
          displayMode: this.model.getValue('displayMode'),
          milestoneDateKey: this.model.getValue('milestoneDateKey'),
          className: this.model.ClassName,
        }
        _fields.push(
          WebUiFormField.dropdown('displayMode', {
            label: 'Display Mode', required: true, items: [
              { title: 'Default', id: 'default' },
              { title: 'Milestone', id: 'milestone' },
              { title: 'Progress', id: 'progress' },
            ]
          }, { className: 'w-full px-0.5', defaultValue: 'default' }),
          WebUiFormField.input('milestoneDateKey', { label: 'Milestone Date Key', required: true }, { className: 'w-full px-0.5', hideExpression: 'model.displayMode !== "milestone" || !model.useDatakey' }),
          WebUiFormField.colorPicker(
            'color',
            { label: 'Color', required: true },
            { className: 'w-full px-0.5', defaultValue: 'FF0000' },
          ),
          this.generateClassNameSelector(),
        )
        return _fields;
      }
      case 'heading': {
        const titleStyle = this.model.getValue('titleStyle') ?? ''
        const subTitleStyle = this.model.getValue('subTitleStyle') ?? ''
        const className = this.model.ClassName ?? ''

        this.formModel = {
          ...this.formModel,
          title: this.model.getValue('title'),
          subtitle: this.model.getValue('subtitle'),
          titleStyle: this.tailwindService.parseClassName(titleStyle),
          subTitleStyle: this.tailwindService.parseClassName(subTitleStyle),
          className: this.tailwindService.parseClassName(className),
        }
        return [
          WebUiFormField.input('title', { label: 'Title', required: true }, { className: 'w-full px-0.5' }),
          this.generateStyleField(
            'titleStyle',
            {
              advanced: false,
              display: {
                enabled: false,
              },
              decoration: false,
              size: {
                width: false,
                height: false,
              },
              background: {
                image: false,
                color: false,
              },
              position: false,
              padding: false,
              margin: false,
              colors: false,
              fontStyle: true,
            },
            { fontStyle: 'Title Style' },
          ),
          WebUiFormField.textarea('subtitle', { label: 'Subtitle', required: true }, { className: 'w-full px-0.5' }),
          this.generateStyleField(
            'subTitleStyle',
            {
              advanced: false,
              display: {
                enabled: false,
              },
              background: {
                image: false,
                color: false,
              },
              position: false,
              decoration: false,
              size: {
                width: false,
                height: false,
              },
              padding: false,
              margin: false,
              colors: false,
              fontStyle: true,
            },
            { fontStyle: 'Subtitle Style' },
          ),
          this.generateStyleField(
            'className',
            {
              advanced: false,
              display: {
                enabled: false,
              },
              decoration: false,
              size: {
                width: true,
                height: true,
              },
              padding: false,
              margin: true,
              colors: false,
              fontStyle: false,
            },
            { fontStyle: 'Heading Margin' },
          ),
        ]
      }
      case 'link':
        this.formModel = {
          preview_src: this.model.getValue('preview_src'),
          data_src: this.model.getValue('data_src'),
          data_sub_html: this.model.getValue('data_sub_html'),
          height: this.model.getValue('height'),
          pinterest_text: this.model.getValue('pinterest_text'),
          tweet_text: this.model.getValue('tweet_text'),
        }
        if (this.model.getValue('responsive')) {
          const responsiveSegments = this.model.getValue('responsive').split(',')
          if (responsiveSegments.length > 0) {
            const formValue = []
            responsiveSegments.map((el) => {
              const splits = el.split(' ')
              if (splits.length > 1) {
                formValue.push({ url: splits[0].trim(), size: Number(splits[1]) })
              }
            })
            this.formModel['responsive'] = formValue
          }
        }
        _fields = [
          WebUiFormField.number('height', { label: 'Embed Height', required: true }, { className: 'w-full px-0.5' }),
          WebUiFormField.textarea(
            'preview_src',
            { label: 'Preview Source', required: true },
            { className: 'w-full px-0.5' },
          ),
          WebUiFormField.textarea('data_src', { label: 'Data Source', required: true }, { className: 'w-full px-0.5' }),
          WebUiFormField.textarea(
            'pinterest_text',
            { label: 'pinterest text', required: true },
            { className: 'w-full px-0.5' },
          ),
          WebUiFormField.textarea(
            'tweet_text',
            { label: 'tweet text', required: true },
            { className: 'w-full px-0.5' },
          ),
          WebUiFormField.repeat(
            'responsive',
            { label: 'Responsive', narrow: this.narrow },
            WebUiFormField.fieldRow([
              WebUiFormField.url('url', { label: 'Url', required: true }, { className: 'flex-1 px-0.5' }),
              WebUiFormField.number('size', { label: 'Screen Size', required: true }, { className: 'w-50 px-0.5' }),
            ]),
            'w-full',
          ),
          WebUiFormField.textarea(
            'data_sub_html',
            { label: 'Title', required: true },
            { className: 'w-full px-0.5', defaultValue: 'Title' },
          ),
          this.generateClassNameSelector(),
        ]
        return _fields;
      case 'paragraph':
        this.formModel['html'] = this.model.getValue('html')
        this.formModel['useExpression'] = this.model.getValue('useExpression')
        this.formModel['allowEllipse'] = this.model.getValue('allowEllipse')
        this.formModel['ellipseCount'] = this.model.getValue('ellipseCount')
        this.formModel['className'] = this.model.ClassName
        return [
          WebUiFormField.boolean('allowEllipse', { label: "Allow Ellipse" }, { className: 'w-full px-0.5', defaultValue: false }),
          WebUiFormField.number('ellipseCount', { label: "", required: true, hideLabel: true }, { className: 'w-full px-0.5', defaultValue: 2, hideExpression: 'model.allowEllipse === false' }),
          WebUiFormField.boolean('useExpression', { label: "Use Expression" }, { className: 'w-full px-0.5', defaultValue: false }),
          WebUiFormField.textarea(
            'html',
            {
              label: 'Html',
              required: true,
              placeholder:
                'Please input html to show. You can use brackets to use data, for example "username: {name}"',
            },
            { className: 'w-full px-0.5', hideExpression: 'model.useExpression' },
          ),
          this.generateClassNameSelector(),
        ]
      case 'googlemap':
        this.formModel = {
          ...this.formModel,
          datakeyForCenLat: this.model.getValue('datakeyForCenLat'),
          useDatakeyForCenLat: this.model.getValue('useDatakeyForCenLat'),
          useDatakeyForCenLtd: this.model.getValue('useDatakeyForCenLtd'),
          datakeyForCenLtd: this.model.getValue('datakeyForCenLtd'),
          centerlatitude: this.model.getValue('centerlatitude'),
          centerlongitude: this.model.getValue('centerlongitude'),
          latitudeProp: this.model.getValue('latitudeProp'),
          longitudeProp: this.model.getValue('longitudeProp'),
          iconUrl: this.model.getValue('iconUrl'),
          useLocationDirection: this.model.getValue('useLocationDirection'),
          startLatitudeProp: this.model.getValue('startLatitudeProp'),
          startLongitudeProp: this.model.getValue('startLongitudeProp'),
          endLatitudeProp: this.model.getValue('endLatitudeProp'),
          endLongitudeProp: this.model.getValue('endLongitudeProp'),
          fit: this.model.getValue('fit'),
          className: this.model.ClassName,
        }
        _fields.push(
          WebUiFormField.boolean(
            'useDatakeyForCenLat',
            { label: 'use datakey for enter lat?' },
            { className: 'w-full px-0.5', defaultValue: false },
          ),
          WebUiFormField.boolean(
            'fit',
            { label: 'Fit Height?' },
            { className: 'w-full px-0.5', defaultValue: false },
          ),
          WebUiFormField.number(
            'centerlatitude',
            { label: 'Center Lat', required: false },
            {
              className: 'w-full px-0.5',
              defaultValue: '36.98500309285596',
              hideExpression: 'model.useDatakeyForCenLat',
            },
          ),
          WebUiFormField.input(
            'datakeyForCenLat',
            { label: 'Latitude key', required: false },
            { className: 'w-full px-0.5', defaultValue: 'latitude', hideExpression: '!model.useDatakeyForCenLat' },
          ),
          WebUiFormField.boolean(
            'useDatakeyForCenLtd',
            { label: 'use datakey for enter ltd?' },
            { className: 'w-full px-0.5', defaultValue: false },
          ),
          WebUiFormField.number(
            'centerlongitude',
            { label: 'Center Lng', required: false },
            {
              className: 'w-full px-0.5',
              defaultValue: '-79.189453125',
              hideExpression: 'model.useDatakeyForCenLtd',
            },
          ),
          WebUiFormField.input(
            'datakeyForCenLtd',
            { label: 'Latitude key', required: false },
            { className: 'w-full px-0.5', defaultValue: 'longitude', hideExpression: '!model.useDatakeyForCenLtd' },
          ),
          WebUiFormField.textarea(
            'iconUrl',
            { label: 'Map Markder Url', required: false },
            { className: 'w-full px-0.5' },
          ),
          WebUiFormField.input(
            'latitudeProp',
            { label: 'Latitude Prop', required: false },
            { className: 'w-full px-0.5', defaultValue: 'latitude' },
          ),
          WebUiFormField.input(
            'longitudeProp',
            { label: 'Longitude Prop', required: false },
            { className: 'w-full px-0.5', defaultValue: 'longitude' },
          ),
          WebUiFormField.boolean(
            'useLocationDirection',
            { label: 'use Direction?' },
            { className: 'w-full px-0.5', defaultValue: false },
          ),
          WebUiFormField.input(
            'startLatitudeProp',
            { label: 'Start Latitude Prop', required: false },
            { className: 'w-full px-0.5', defaultValue: 'latitude', hideExpression: '!model.useLocationDirection', },

          ),
          WebUiFormField.input(
            'startLongitudeProp',
            { label: 'Start Longitude Prop', required: false },
            { className: 'w-full px-0.5', defaultValue: 'longitude', hideExpression: '!model.useLocationDirection', },
          ),
          WebUiFormField.input(
            'endLatitudeProp',
            { label: 'End Latitude Prop', required: false },
            { className: 'w-full px-0.5', defaultValue: 'latitude', hideExpression: '!model.useLocationDirection', },
          ),
          WebUiFormField.input(
            'endLongitudeProp',
            { label: 'End Longitude Prop', required: false },
            { className: 'w-full px-0.5', defaultValue: 'longitude', hideExpression: '!model.useLocationDirection', },
          ),
          this.generateClassNameSelector(),
        );
        return _fields;
      case 'ag-grid':
        this.formModel['autoHeight'] = this.model.getValue('autoHeight');
        this.formModel['showSideBar'] = this.model.getValue('showSideBar');
        this.formModel['enableChart'] = this.model.getValue('enableChart');
        this.formModel['columns'] = this.model.getValue('columns');
        this.formModel['chartType'] = this.model.getValue('chartType');
        this.formModel['theme'] = this.model.getValue('theme');
        this.formModel['className'] = this.model.ClassName
        _fields.push(
          WebUiFormField.dropdown(
            'theme',
            {
              label: 'Theme',
              required: true,
              items: [
                { id: 'ag-theme-alpine', title: 'Alpine' },
                { id: 'ag-theme-alpine-dark', title: 'Alpine Dark' },
                { id: 'ag-theme-balham', title: 'Balham' },
                { id: 'ag-theme-balham-dark', title: 'Balham Dark' },
                { id: 'ag-theme-material', title: 'Material' },
              ],
            },
            { className: 'w-full px-0.5', defaultValue: 'ag-theme-alpine' },
          ),
          WebUiFormField.boolean('autoHeight', { label: 'Auto Height', }, { defaultValue: false, className: 'w-full px-0.5' }),
          WebUiFormField.boolean('showSideBar', { label: 'Show Sidebar', }, { defaultValue: false, className: 'w-full px-0.5' }),
          WebUiFormField.boolean('enableChart', { label: 'Show Chart', }, { defaultValue: false, className: 'w-full px-0.5' }),
          WebUiFormField.fieldRow([
            WebUiFormField.dropdown('chartType', {
              label: 'Chart Type', required: true, items: [
                { id: 'groupedColumn', title: 'Grouped Column' },
                { id: 'stackedColumn', title: 'Stacked Column' },
                { id: 'normalizedColumn', title: 'Normalized Column' },
                { id: 'groupedBar', title: 'Grouped Bar' },
                { id: 'stackedBar', title: 'Stacked Bar' },
                { id: 'normalizedBar', title: 'Normalized Bar' },
                { id: 'line', title: 'Line' },
                { id: 'scatter', title: 'Scatter' },
                { id: 'bubble', title: 'Bubble' },
                { id: 'pie', title: 'Pie' },
                { id: 'doughnut', title: 'Doughnut' },
                { id: 'area', title: 'Area' },
                { id: 'stackedArea', title: 'Stacked Area' },
                { id: 'normalizedArea', title: 'Normalized Area' },
              ]
            }, { className: 'w-full', defaultValue: 'line' }),
            WebUiFormField.repeat('columns', { label: 'Category Columns' }, WebUiFormField.input('name', { hideLabel: true, compact: true }, { className: 'w-full' }), 'w-full'),
          ], 'w-full', {}, { hideExpression: '!model.enableChart' }),
          this.generateClassNameSelector(),
        )
        return _fields;
      case 'ag-grid-column': {
        this.formModel = {
          headerName: this.model.getValue('headerName'),
          field: this.model.getValue('field'),
          // width: this.model.getValue('width'),
          editible: this.model.getValue('editible'),
          hide: this.model.getValue('hide'),
          sort: this.model.getValue('sort'),
          filter: this.model.getValue('filter'),
        };
        return [
          WebUiFormField.input(
            'field',
            { label: 'Field', required: true },
            { className: 'w-full px-0.5' },
          ),
          WebUiFormField.input(
            'headerName',
            { label: 'Header', },
            { className: 'w-full px-0.5' },
          ),
          WebUiFormField.boolean(
            'editible',
            { label: 'Editible', },
            { className: 'w-full px-0.5', defaultValue: false },
          ),
          WebUiFormField.boolean(
            'hide',
            { label: 'Hide', },
            { className: 'w-full px-0.5', defaultValue: false },
          ),
          WebUiFormField.boolean(
            'sort',
            { label: 'Sort', },
            { className: 'w-full px-0.5', defaultValue: true },
          ),
          WebUiFormField.dropdown(
            'filter',
            {
              label: 'Filter',
              items: [
                { id: 'agTextColumnFilter', title: 'Text' },
                { id: 'agTextNumberFilter', title: 'Number' },
                { id: 'agDateColumnFilter', title: 'Date' },
                { id: 'agSetColumnFilter', title: 'Boolean' },
              ],
            },
            { className: 'w-full px-0.5', defaultValue: 'agTextColumnFilter' },
          ),
        ];
      }
      case 'kanban': {
        this.formModel['groupKey'] = this.model.getValue('groupKey')
        this.formModel['groupIdProp'] = this.model.getValue('groupIdProp')
        this.formModel['modalFormNames'] = this.model.getValue('modalFormNames')
        this.formModel['showSubmitButton'] = this.model.getValue('showSubmitButton')
        this.formModel['className'] = this.model.ClassName;
        _fields.push(
          WebUiFormField.boolean('showSubmitButton', { label: 'Show Submit Button' }, { className: 'w-full px-0.5' }),
          WebUiFormField.input('groupKey', { label: 'Group Field' }, { className: 'w-full px-0.5' }),
          WebUiFormField.input('groupIdProp', { label: 'Group ID Prop', required: true }, { className: 'w-full px-0.5', defaultValue: 'id' }),
          WebUiFormField.repeat('modalFormNames', { label: 'Modal Form Names', narrow: true }, WebUiFormField.fieldRow([
            WebUiFormField.input('groupKey', { label: 'Group Name', required: true }, { className: 'w-full px-0.5' }),
            WebUiFormField.input('formName', { label: 'Form Name', required: true }, { className: 'w-full px-0.5' }),
            WebUiFormField.number('order', { label: 'Order', required: true }, { className: 'w-full px-0.5', defaultValue: 0 }),
          ]), 'w-full'),
          this.generateClassNameSelector(),
        )
        return _fields;
      }
      case 'overview':
        _fields = [
          WebUiFormField.input('title', { label: 'Title', required: true }, { className: 'w-full px-0.5' }),
          WebUiFormField.input('summary', { label: 'Summary', required: true }, { className: 'w-full px-0.5' }),
          WebUiFormField.colorPicker('color', { label: 'Color' }, { className: 'w-full' }),
          WebUiFormField.boolean('allowSubcontent', { label: 'Define sub content' }, { className: 'w-full px-0.5' }),
          WebUiFormField.input(
            'subtitle',
            { label: 'Sub Title', required: true },
            { className: 'w-full px-0.5', hideExpression: '!model.allowSubcontent' },
          ),
          WebUiFormField.number(
            'subsummary',
            { label: 'Sub Summary', required: true },
            { className: 'w-full px-0.5', hideExpression: '!model.allowSubcontent' },
          ),
          WebUiFormField.input('className', { label: 'ClassName', required: false }, { className: 'w-full px-0.5' }),
        ]
        this.formModel = {
          ...this.formModel,
          allowSubcontent: this.model.getValue('subtitle'),
          title: this.model.getValue('title'),
          summary: this.model.getValue('summary'),
          subtitle: this.model.getValue('subtitle'),
          subsummary: this.model.getValue('subsummary'),
          color: this.model.getValue('color'),
          className: this.model.ClassName,
        }
        return _fields
      case 'description-list':
        this.formModel = {
          title: this.model.getValue('title'),
          subtitle: this.model.getValue('subtitle'),
          varient: this.model.getValue('varient'),
          gridCols: this.model.getValue('gridCols'),
          data: this.model.getValue('data'),
          condensed: this.model.getValue('condensed'),
          className: this.model.ClassName,
        }

        _fields.push(
          WebUiFormField.boolean('condensed', { label: 'Condensed' }, { className: 'w-full px-0.5' }),
          WebUiFormField.input('title', { label: 'Title', required: true }, { className: 'w-full px-0.5', hideExpression: 'model.condensed' }),
          WebUiFormField.input('subtitle', { label: 'SubTitle', required: true }, { className: 'w-full px-0.5', hideExpression: 'model.condensed' }),
          WebUiFormField.dropdown(
            'varient',
            {
              label: 'Varients',
              required: true,
              items: [
                { id: 'left-aligned', title: 'Left-aligned' },
                { id: 'left-aligned-dark', title: 'Left-aligned on dark' },
                { id: 'left-aligned-card', title: 'Left-aligned in card' },
                { id: 'left-aligned-stripped', title: 'Left-aligned striped' },
                { id: 'multi-column', title: 'Multi-column' },
                // { id: 'narrow-with-hidden-labels', title: 'Narrow with hidden labels' },
                // { id: 'left-align-with-inline-actions', title: 'Left-aligned with inline actions' }
              ],
            },
            { className: this.narrow ? 'w-full px-0.5' : 'w-1/3 px-0.5', defaultValue: 'left-aligned' },
          ),
          WebUiFormField.dropdown('gridCols', {
            label: 'Column Count', required: true, items: [
              { id: 1, title: '1' },
              { id: 2, title: '2' },
              { id: 3, title: '3' },
              { id: 4, title: '4' },
              { id: 5, title: '5' },
              { id: 6, title: '6' },
              { id: 7, title: '7' },
              { id: 8, title: '8' },
              { id: 9, title: '9' },
              { id: 10, title: '10' },
              { id: 11, title: '11' },
              { id: 12, title: '12' },
            ]
          }, { className: 'w-full px-0.5', hideExpression: 'model.varient !== "multi-column"', defaultValue: 2 }),
          WebUiFormField.repeat(
            'data',
            {
              label: 'Data List',
              narrow: this.narrow,
            },
            WebUiFormField.fieldRow(
              [
                WebUiFormField.input(
                  'title',
                  { label: 'Title', required: true },
                  { className: this.narrow ? 'w-full px-0.5' : 'w-1/3 px-0.5' },
                ),
                WebUiFormField.input(
                  'dataKey',
                  { label: 'DataKey', required: true },
                  { className: this.narrow ? 'w-full px-0.5' : 'w-1/3 px-0.5' },
                ),
                // WebUiFormField.dropdown('type', { label: 'Type', required: true, items: [{ id: 'Text', title: 'Text' }, { id: 'Number', title: 'Number' }, { id: 'Date', title: 'Date' }] }, { className: 'w-1/3 px-0.5' })
                WebUiFormField.dropdown(
                  'format',
                  {
                    label: 'Format',
                    required: true,
                    items: [
                      { id: 'normal', title: 'normal' },
                      { id: 'date', title: 'date' },
                      { id: 'currency', title: 'currency' },
                    ],
                  },
                  { className: this.narrow ? 'w-full px-0.5' : 'w-1/3 px-0.5', defaultValue: 'normal' },
                ),
              ],
              'w-full',
            ),
          ),
          this.generateClassNameSelector(),
        )
        return _fields;
      case 'description':
        this.formModel = {
          title: this.model.getValue('title'),
          subtitle: this.model.getValue('subtitle'),
          varient: this.model.getValue('varient'),
          gridCols: this.model.getValue('gridCols'),
          condensed: this.model.getValue('condensed'),
          className: this.model.ClassName,
        }

        _fields.push(
          WebUiFormField.boolean('condensed', { label: 'Condensed' }, { className: 'w-full px-0.5' }),
          WebUiFormField.input('title', { label: 'Title', required: true }, { className: 'w-full px-0.5', hideExpression: 'model.condensed' }),
          WebUiFormField.input('subtitle', { label: 'SubTitle', required: true }, { className: 'w-full px-0.5', hideExpression: 'model.condensed' }),
          WebUiFormField.dropdown(
            'varient',
            {
              label: 'Varients',
              required: true,
              items: [
                { id: 'left-aligned', title: 'Left-aligned' },
                { id: 'left-aligned-dark', title: 'Left-aligned on dark' },
                { id: 'left-aligned-card', title: 'Left-aligned in card' },
                { id: 'left-aligned-stripped', title: 'Left-aligned striped' },
                { id: 'multi-column', title: 'Multi-column' },
                // { id: 'narrow-with-hidden-labels', title: 'Narrow with hidden labels' },
                // { id: 'left-align-with-inline-actions', title: 'Left-aligned with inline actions' }
              ],
            },
            { className: this.narrow ? 'w-full px-0.5' : 'w-1/3 px-0.5', defaultValue: 'left-aligned' },
          ),
          WebUiFormField.dropdown('gridCols', {
            label: 'Column Count', required: true, items: [
              { id: 1, title: '1' },
              { id: 2, title: '2' },
              { id: 3, title: '3' },
              { id: 4, title: '4' },
              { id: 5, title: '5' },
              { id: 6, title: '6' },
              { id: 7, title: '7' },
              { id: 8, title: '8' },
              { id: 9, title: '9' },
              { id: 10, title: '10' },
              { id: 11, title: '11' },
              { id: 12, title: '12' },
            ]
          }, { className: 'w-full px-0.5', hideExpression: 'model.varient !== "multi-column"', defaultValue: 2 }),
          this.generateClassNameSelector(),
        )
        return _fields;
      case 'title': {
        const titleStyle = this.model.getValue('titleStyle') ?? ''
        const className = this.model.ClassName ?? ''

        this.formModel = {
          ...this.formModel,
          title: this.model.getValue('title'),
          titleStyle: this.tailwindService.parseClassName(titleStyle),
          className: this.tailwindService.parseClassName(className),
        }
        return [
          WebUiFormField.input('title', { label: 'Title', required: true }, { className: 'w-full px-0.5' }),
          this.generateStyleField(
            'titleStyle',
            {
              advanced: false,
              display: {
                enabled: false,
              },
              background: {
                image: false,
                color: false,
              },
              position: false,
              decoration: false,
              size: {
                width: false,
                height: false,
              },
              padding: false,
              margin: false,
              colors: false,
              fontStyle: true,
            },
            { fontStyle: 'Title Style' },
          ),
          this.generateStyleField(
            'className',
            {
              advanced: true,
              display: {
                enabled: false,
              },
              decoration: false,
              size: {
                width: true,
                height: true,
              },
              padding: false,
              margin: true,
              colors: false,
              fontStyle: false,
            },
            { fontStyle: 'Title Margin' },
          ),
        ]
      }
      default:
        break
    }

    const validationTemplateOptionKeys = validationItems.map((el) => el.id)
    const expressionTemplateOptionKeys = KeyEvents
    const customFunctionKeys = customFunctions[this.model.type]?.map((el) => el.name) ?? []

    this.model.TemplateOptionKeys.map((templateOption) => {
      const value = this.model.getValue(templateOption)
      const valueType = typeof value

      if (validationTemplateOptionKeys.includes(templateOption)) {
        const validatinOption = { key: templateOption, value }
        const validationMessage = this.model.getValidationMessage(templateOption)
        if (validationMessage) {
          validatinOption['message'] = validationMessage
        }
        this.validationOptions.push({
          rule: validatinOption,
        })
        return
      }

      // Class and Style Expressions
      if (['styleExpression', 'classExpression'].includes(templateOption)) return;

      if (customFunctionKeys.includes(templateOption)) return

      if (expressionTemplateOptionKeys.includes(templateOption)) {
        return
      }

      if (skipFields.includes(templateOption)) {
        return
      }

      switch (valueType) {
        case 'string':
          _fields.push(
            WebUiFormField.input(
              templateOption,
              {
                label: Entity.capitalizeFirstLetter(templateOption),
                required: true,
              },
              { className: 'w-full px-0.5' },
            ),
          )
          break
        case 'number':
          _fields.push(
            WebUiFormField.number(
              templateOption,
              { label: Entity.capitalizeFirstLetter(templateOption), required: true },
              { className: 'w-full px-0.5' },
            ),
          )
          break
        case 'boolean':
          _fields.push(
            WebUiFormField.checkbox(
              templateOption,
              { label: Entity.capitalizeFirstLetter(templateOption), required: true },
              { className: 'w-full px-0.5' },
            ),
          )
          break
        case 'object':
          break
        default:
          break
      }
      this.formModel[templateOption] = this.model.getValue(templateOption)
    })


    // Add type-specific input fields
    switch (this.model.type) {
      case 'grid':
        _fields.push(
          WebUiFormField.input('key', { label: 'Key' }, { className: 'w-full px-0.5' }),
          WebUiFormField.input('title', { label: 'Title', required: true }, { className: 'w-full px-0.5' }),
          WebUiFormField.boolean(
            'readOnly',
            { label: 'Read Only' },
            { className: 'w-full px-0.5', defaultValue: false },
          ),
          WebUiFormField.dropdown(
            'variant',
            {
              label: 'Variant',
              value: this.model.getValue('variant'),
              items: gridVariants.map((el) => ({
                id: el,
                title: el,
              })),
            },
            { className: 'w-full px-0.5' },
          ),
        )
        this.formModel['title'] = this.model.getValue('title')
        this.formModel['readOnly'] = this.model.getValue('readOnly')
        this.formModel['variant'] = this.model.getValue('variant')
        this.formModel['key'] = this.model.Key
        // this.formModel['dataKey'] = this.model.Key
        break
      case 'label':
        _fields.push(
          WebUiFormField.input('dataKey', { label: 'Key', required: true }, { className: 'w-full px-0.5' }),
          WebUiFormField.dropdown(
            'format',
            {
              label: 'Format',
              value: this.model.getValue('format'),
              items: [
                { id: 'normal', title: 'normal' },
                { id: 'date', title: 'date' },
                { id: 'currency', title: 'currency' },
                { id: 'percent', title: 'percent' },
                { id: 'dateTime', title: 'date-time' },
              ],
            },
            { className: 'w-full px-0.5', defaultValue: 'normal' },
          ),
        )

        this.formModel['useDatakey'] = true
        this.formModel['format'] = this.model.getValue('format')
        this.formModel['dataKey'] = this.model.getValue('dataKey')
        break
      case 'input':
        _fields.push(
          WebUiFormField.boolean(
            'isBankNumber',
            { label: 'Bank Number?' },
            { className: 'w-full px-0.5', defaultValue: false },
          ),
          WebUiFormField.integer('debounce', { label: 'Debounce Value', required: true }, { className: 'w-full px-0.5', defaultValue: 100 }),
        )
        this.formModel['isBankNumber'] = this.model.getValue('isBankNumber')
        this.formModel['debounce'] = this.model.getValue('debounce')
        break;
      case 'textarea':
        _fields.push(
          WebUiFormField.boolean(
            'Unlimited Length',
            { label: 'Unlimited Length?' },
            { className: 'w-full px-0.5', defaultValue: false },
          ))
        this.formModel['unlimitedLength'] = this.model.getValue('unlimitedLength')

        break;
      case 'weather':
        WebUiFormField.boolean('simpleMode', { label: 'Simple Mode' }, { className: 'w-full px-0.5', defaultValue: false }),
        this.formModel['simpleMode'] = this.model.getValue('simpleMode')
        break;
      case 'password':
        _fields.push(
          WebUiFormField.boolean(
            'passwordStrength',
            { label: 'Allow strong password?', required: false },
            { className: 'w-full px-0.5', defaultValue: false },
          ),
          WebUiFormField.input(
            'passwordKey',
            { label: 'Password Key?', required: false },
            { className: 'w-full px-0.5', defaultValue: "" },
          ),
        )
        this.formModel['passwordStrength'] = this.model.getValue('passwordStrength')
        this.formModel['passwordKey'] = this.model.getValue('passwordKey')
        break
      case 'date':
        _fields.push(
          WebUiFormField.boolean(
            'limitTotoday',
            { label: 'Limit to Today?' },
            { className: 'w-full px-0.5', defaultValue: false },
          ),
          WebUiFormField.boolean(
            'fromToday',
            { label: 'From Today?' },
            { className: 'w-full px-0.5', defaultValue: false },
          ),
        )
        this.formModel['limitTotoday'] = this.model.getValue('limitTotoday')

        this.formModel['fromToday'] = this.model.getValue('fromToday')
        break
      case 'select-form':
        _fields.push(
          WebUiFormField.boolean(
            'readOnly',
            { label: 'Read Only' },
            { className: 'w-full px-0.5', defaultValue: false },
          ),
          WebUiFormField.dropdown(
            'variant',
            {
              label: 'Variant',
              value: this.model.getValue('variant'),
              items: selectFormVariants.map((el) => ({
                id: el,
                title: el,
              })),
            },
            { className: 'w-full px-0.5' },
          ),
        )
        this.formModel['variant'] = this.model.getValue('variant')
        this.formModel['readOnly'] = this.model.getValue('readOnly')
        break
      case 'web-form':
        _fields.push(
          WebUiFormField.dropdown(
            'variant',
            {
              label: 'Variant',
              value: this.model.getValue('variant'),
              items: webFormVariants.map((el) => ({
                id: el,
                title: el,
              })),
            },
            { className: 'w-full px-0.5' },
          ),
        )
        this.formModel['variant'] = this.model.getValue('variant')
        break;
      // case 'tooltip':
      //   this.formModel['content'] = this.model.getValue('content')
      //   _fields.push(
      //     WebUiFormField.textarea(
      //       'content',
      //       { label: 'Tooltip Content', required: true },
      //       { className: 'w-full px-0.5', defaultValue: 'Empty tooltip content' },
      //     ),
      //   )
      //   break
      case 'signature-pad':
        this.formModel = {
          ...this.formModel,
          width: this.model.getValue('width'),
          height: this.model.getValue('height'),
        }
        _fields.push(
          WebUiFormField.number(
            'width',
            { label: 'Width', required: true },
            { className: 'w-full px-0.5', defaultValue: 300 },
          ),
          WebUiFormField.number(
            'height',
            { label: 'Height', required: true },
            { className: 'w-full px-0.5', defaultValue: 300 },
          ),
        )
        break
      case 'range':
        this.formModel['minValue'] = this.model.getValue('minValue')
        this.formModel['maxValue'] = this.model.getValue('maxValue')
        _fields.push(WebUiFormField.number('minValue', { label: 'Min Value' }, { className: 'w-full px-0.5' }))
        _fields.push(WebUiFormField.number('maxValue', { label: 'Max Value' }, { className: 'w-full px-0.5' }))
        break
      case 'rich-text':
        _fields.push(
          WebUiFormField.number(
            'height',
            { label: 'Height', required: true },
            { className: 'w-full px-0.5', defaultValue: 300 },
          ),
        )
        this.formModel['height'] = this.model.getValue('height')
        break
      case 'router':
        _fields.push(
          WebUiFormField.boolean(
            'isAbsoluteUrl',
            { label: 'Absolute Url?' },
            { className: 'w-full px-0.5', defaultValue: false },
          ),
          WebUiFormField.textarea('url', { label: 'Link Url', required: true }, { className: 'w-full px-0.5' }),
        )
        this.formModel['url'] = this.model.getValue('url')
        this.formModel['isAbsoluteUrl'] = this.model.getValue('isAbsoluteUrl')
        break
      case 'navbar':
        _fields.push(
          WebUiFormField.boolean('showIcon', { label: 'Show Icon?' }, { className: 'w-full px-0.5' }),
          WebUiFormField.boolean('dark', { label: 'Dark Mode?' }, { className: 'w-full px-0.5' }),
          WebUiFormField.repeat(
            'data',
            { label: 'Options', narrow: this.narrow },
            WebUiFormField.fieldRow([
              WebUiFormField.input(
                'icon',
                { label: 'Icon', required: false },
                { className: this.narrow ? 'w-full px-0.5' : 'w-1/3 px-0.5' },
              ),
              WebUiFormField.input(
                'title',
                { label: 'Title', required: true },
                { className: this.narrow ? 'w-full px-0.5' : 'w-1/3 px-0.5' },
              ),
              WebUiFormField.input(
                'link',
                { label: 'Link', required: true },
                { className: this.narrow ? 'w-full px-0.5' : 'w-1/3 px-0.5' },
              ),
            ]),
          ),
        )
        this.formModel = {
          ...this.formModel,
          showIcon: this.model.getValue('showIcon'),
          dark: this.model.getValue('dark'),
          direction: this.model.getValue('direction'),
          data: this.model.getValue('data'),
        }
        break
      case 'navs':
        _fields.push(
          WebUiFormField.boolean('showIcon', { label: 'Show Icon?' }, { className: 'w-full px-0.5' }),
          WebUiFormField.enum(
            'direction',
            { label: 'Direction', values: ['Horizontal', 'Vertical'] },
            { className: 'w-full px-0.5', defaultValue: 'Vertical' },
          ),
          WebUiFormField.repeat(
            'data',
            { label: 'Options', narrow: this.narrow },
            WebUiFormField.fieldRow([
              WebUiFormField.input(
                'icon',
                { label: 'Icon', required: false },
                { className: this.narrow ? 'w-full px-0.5' : 'w-1/3 px-0.5' },
              ),
              WebUiFormField.input(
                'title',
                { label: 'Title', required: true },
                { className: this.narrow ? 'w-full px-0.5' : 'w-1/3 px-0.5' },
              ),
              WebUiFormField.input(
                'link',
                { label: 'Link', required: true },
                { className: this.narrow ? 'w-full px-0.5' : 'w-1/3 px-0.5' },
              ),
            ]),
          ),
        )
        this.formModel = {
          ...this.formModel,
          showIcon: this.model.getValue('showIcon'),
          direction: this.model.getValue('direction'),
          data: this.model.getValue('data'),
        }
        break
      case 'ratingbar':
        this.formModel = {
          useRatingBarDatakey: this.model.getValue('useRatingBarDatakey'),
          ratingKey: this.model.getValue('ratingKey'),
          rating: this.model.getValue('rating'),
          max: this.model.getValue('max'),
          readOnly: this.model.getValue('readOnly'),
          key: this.model.getValue('key')
        }

        _fields.push(
          WebUiFormField.input('key', { label: 'Key', required: true }, { className: 'w-full px-0.5' }),
          WebUiFormField.boolean(
            'useRatingBarDatakey',
            { label: 'Use Data Key?' },
            { className: 'w-full px-0.5', defaultValue: false },
          ),
          WebUiFormField.input(
            'ratingKey',
            { label: 'DataKey', required: true },
            { className: 'w-full px-0.5', hideExpression: (model) => model.useRatingBarDatakey === false },
          ),
          WebUiFormField.number(
            'rating',
            { label: 'Rating', required: true },
            {
              className: 'w-full px-0.5',
              defaultValue: 5,
              hideExpression: (model) => model.useRatingBarDatakey === true,
            },
          ),
          WebUiFormField.input(
            'max',
            { label: 'Max Rating', required: true },
            { className: 'w-full px-0.5', defaultValue: 5 },
          ),
          WebUiFormField.boolean(
            'readOnly',
            { label: 'ReadOnly?' },
            { className: 'w-full px-0.5', defaultValue: true },
          ),
        )
        break
      case 'tabs':
        this.formModel['format'] = this.model.getValue('format')
        this.formModel['currentIndex'] = this.model.getValue('currentIndex')

        _fields.push(
          WebUiFormField.integer(
            'currentIndex',
            { label: 'Current Tab Index' },
            { className: 'w-full px-0.5', defaultValue: 0 },
          ),
          WebUiFormField.dropdown(
            'format',
            {
              label: 'Format',
              required: true,
              items: [
                { id: 'underline', title: 'Tabs with underline' },
                { id: 'underline_icon', title: 'Tabs with underline and icons' },
                { id: 'pills', title: 'Tabs in pills' },
                { id: 'pills_gray', title: 'Tabs in pills on gray' },
                { id: 'pills_brand', title: 'Tabs in pills with brand color' },
                { id: 'full_width_underline', title: 'Full-width tabs with underline' },
                { id: 'bar_underline', title: 'Bar with underline' },
                { id: 'underline_badge', title: 'Tabs with underline and badges' },
              ],
            },
            { className: 'w-full px-0.5', defaultValue: 'underline' },
          ),
        )
        break
      case 'stepper':
        this.formModel['currentIndex'] = this.model.getValue('currentIndex')
        _fields.push(
          WebUiFormField.integer(
            'currentIndex',
            { label: 'Current Tab Index' },
            { className: 'w-full px-0.5', defaultValue: 0 },
          ),
        )
        break
      case 'radio':
        _fields.push(
          WebUiFormField.boolean(
            'hideLabel',
            { label: 'Hide Label?' },
            { className: 'w-full px-0.5', defaultValue: false },
          ),
          WebUiFormField.boolean('compact', { label: 'Compact?' }, { className: 'w-full px-0.5', defaultValue: false }),
          WebUiFormField.repeat(
            'options',
            { label: 'Options', required: true },
            WebUiFormField.fieldRow([
              WebUiFormField.input('label', { label: 'Label', rquired: true }, { className: 'w-1/2 px-0.5' }),
              WebUiFormField.input('value', { label: 'Value', rquired: true }, { className: 'w-1/2 px-0.5' }),
            ]),
          ),
        )
        this.formModel['hidelabel'] = this.model.getValue('hidelabel')
        this.formModel['options'] = this.model.getValue('options')
        break

      case 'toggle':
        this.formModel['format'] = this.model.getValue('format')
        this.formModel['size'] = this.model.getValue('size')
        this.formModel['borderRadius'] = this.model.getValue('borderRadius')
        this.formModel['gap'] = this.model.getValue('gap')
        this.formModel['options'] = this.model.getValue('options')
        this.formModel['label'] = this.model.getValue('label')
        this.formModel['hideLabel'] = this.model.getValue('hideLabel')
        this.formModel['compact'] = this.model.getValue('compact')

        _fields.push(
          WebUiFormField.boolean(
            'hideLabel',
            { label: 'Hide Label?' },
            { className: 'w-full px-0.5', defaultValue: true },
          ),
          WebUiFormField.input('label', { label: "Label", }, { className: 'w-full px-0.5', hideExpression: 'model.hideLabel' }),
          WebUiFormField.boolean(
            'compact',
            { label: 'Compact  ?' },
            { className: 'w-full px-0.5', defaultValue: true },
          ),
          WebUiFormField.dropdown(
            'format',
            {
              label: 'Format',
              required: true,
              items: [
                { id: 'onlyicon', title: 'Icon' },
                { id: 'text', title: 'Text' },
                { id: 'both', title: 'Both' },
              ],
            },
            { className: 'w-full px-0.5', defaultValue: 'text' },
          ),
          WebUiFormField.dropdown(
            'size',
            {
              label: 'Size',
              required: true,
              items: [
                { id: 'auto', title: 'auto' },
                { id: 'full', title: 'full' },
              ],
            },
            { className: 'w-full px-0.5', defaultValue: 'auto' },
          ),
          WebUiFormField.number(
            'borderRadius',
            { label: 'Border Radius' },
            { className: 'w-full px-0.5', defaultValue: 0 },
          ),
          WebUiFormField.number(
            'gap',
            { label: 'Gap', required: true },
            { className: 'w-full mt-2 px-0.5', defaultValue: 3 },
          ),

          WebUiFormField.repeat(
            'options',
            { label: 'Options', required: true },
            WebUiFormField.fieldRow([
              WebUiFormField.input('icon', { label: 'Icon', rquired: true }, { className: 'w-1/3 px-0.5' }),
              WebUiFormField.input('text', { label: 'Text', rquired: true }, { className: 'w-1/3 px-0.5' }),
              WebUiFormField.input('value', { label: 'Value', rquired: true }, { className: 'w-1/3 px-0.5' }),
            ]),
          ),
        )

        break

      case 'table':
        _fields.push(
          WebUiFormField.boolean('showCheckBox', { label: 'Allow Multi Select', required: true }, { className: "w-full px-0.5", defaultValue: false }),
          WebUiFormField.input('headStyle', { label: 'Table Head Style', }, { className: 'w-full px-0.5' }),
          WebUiFormField.input('bodyStyle', { label: 'Table Body Style', }, { className: 'w-full px-0.5' }),
          WebUiFormField.repeat(
            'header',
            { label: 'Table Header', narrow: this.narrow },
            WebUiFormField.fieldRow([
              WebUiFormField.input(
                'title',
                { label: 'Title', required: true },
                { className: this.narrow ? 'w-full px-0.5' : 'w-1/3 px-0.5' },
              ),
              WebUiFormField.input(
                'min-width',
                { label: 'Min Width', },
                { className: this.narrow ? 'w-full px-0.5' : 'w-1/3 px-0.5' },
              ),
            ]),
          ),
        )

        this.formModel['showCheckBox'] = this.model.getValue('showCheckBox');
        this.formModel['header'] = this.model.getValue('header')
        this.formModel['headStyle'] = this.model.getValue('headStyle')
        this.formModel['bodyStyle'] = this.model.getValue('bodyStyle')
        break;
      case 'table-column':
        this.formModel['title'] = this.model.getValue('title')
        _fields.push(
          WebUiFormField.input('title', { label: 'Column Title', required: true }, { className: 'w-full px-0.5' }),
        )
        break
      case 'music-widget':
        _fields.push(
          WebUiFormField.repeat(
            'items',
            {
              label: 'Audio List',
              narrow: this.narrow,
            },
            WebUiFormField.fieldRow(
              [
                WebUiFormField.input(
                  'url',
                  { label: 'URL', narrow: this.narrow, required: true },
                  { className: 'w-full px-0.5' },
                ),
                WebUiFormField.input('title', { label: 'Title', required: false }, { className: 'w-full px-0.5' }),
                WebUiFormField.input('cover', { label: 'CoverImage', required: false }, { className: 'w-full px-0.5' }),
              ],
              'w-full',
            ),
          ),
        )
        this.formModel['items'] = this.model.getValue('items')
        break
      case 'multicheckbox':
        this.formModel['readOnly'] = this.model.getValue('readOnly')

        _fields.push(
          WebUiFormField.boolean(
            'readOnly',
            { label: 'Read Only' },
            { className: 'w-full px-0.5', defaultValue: false },
          ),
          WebUiFormField.boolean(
            'hideLabel',
            { label: 'Hide Label?' },
            { className: 'w-full px-0.5', defaultValue: false },
          ),
          WebUiFormField.integer(
            'columnCount',
            { label: 'Column Count?' },
            { className: 'w-full px-0.5', defaultValue: 1 }
          ),
          WebUiFormField.boolean('compact', { label: 'Compact?' }, { className: 'w-full px-0.5', defaultValue: false }),
          WebUiFormField.repeat(
            'options',
            { label: 'Options', required: false },
            WebUiFormField.fieldRow([
              WebUiFormField.input('label', { label: 'Label', rquired: true }, { className: 'w-1/2 px-0.5' }),
              WebUiFormField.input('value', { label: 'Value', rquired: true }, { className: 'w-1/2 px-0.5' }),
            ]),
          ),
        )
        this.formModel = {
          ...this.formModel,
          hidelabel: this.model.getValue('hidelabel'),
          columnCount: this.model.getValue('columnCount'),
          options: this.model.getValue('options'),
          readOnly: this.model.getValue('readOnly')
        }
        break

      case 'multi-select':

        _fields.push(
          WebUiFormField.input(
            'label',
            { label: 'Label', required: true },
            { className: 'w-full px-0.5', defaultValue: '' },
          ),
          WebUiFormField.boolean(
            'multiple',
            { label: 'Multiple?', required: true },
            { className: 'w-full px-0.5', defaultValue: true },
          ),
          WebUiFormField.boolean(
            'isAddBtn',
            { label: 'Add Btn?', required: true },
            { className: 'w-full px-0.5', defaultValue: true },
          ),
          WebUiFormField.boolean(
            'autoSelect',
            { label: 'Auto Select?', required: true },
            { className: 'w-full px-0.5', defaultValue: false },
          ),
          WebUiFormField.input(
            'valueProp',
            { label: 'Value Prop', required: true },
            { className: 'w-full px-0.5', defaultValue: 'id' },
          ),
          WebUiFormField.input(
            'labelProp',
            { label: 'Label Prop', required: true },
            { className: 'w-full px-0.5', defaultValue: 'title' },
          ),
          WebUiFormField.repeat(
            'items',
            {
              label: 'Item List',
            },
            WebUiFormField.fieldRow(
              [
                WebUiFormField.input('id', { label: 'Value', required: true }, { className: 'w-1/2 px-0.5' }),
                WebUiFormField.input('name', { label: 'Title', required: true }, { className: 'w-1/2 px-0.5' }),
              ],
              'w-full',
            ),
          ),
        )

        this.formModel = {
          ...this.formModel,
          labelProp: this.model.getValue('labelProp'),
          valueProp: this.model.getValue('valueProp'),
          autoSelect: this.model.getValue('autoSelect'),
          label: this.model.getValue('label'),
          multiple: this.model.getValue('multiple'),
          isAddBtn: this.model.getValue('isAddBtn'),
          items: this.model.getValue('items')
        }
        break
      case 'dropdown':
        this.formModel['labelProp'] = this.model.getValue('labelProp')
        this.formModel['valueProp'] = this.model.getValue('valueProp')
        this.formModel['autoSelect'] = this.model.getValue('autoSelect')
        this.formModel['items'] = this.model.getValue('items')
        _fields.push(
          WebUiFormField.boolean(
            'autoSelect',
            { label: 'Auto Select?', required: true },
            { className: 'w-full px-0.5', defaultValue: false },
          ),
          WebUiFormField.input(
            'valueProp',
            { label: 'Value Prop', required: true },
            { className: 'w-full px-0.5', defaultValue: 'id' },
          ),
          WebUiFormField.input(
            'labelProp',
            { label: 'Label Prop', required: true },
            { className: 'w-full px-0.5', defaultValue: 'title' },
          ),
          WebUiFormField.repeat(
            'items',
            {
              label: 'Item List',
            },
            WebUiFormField.fieldRow(
              [
                WebUiFormField.input('id', { label: 'Value', required: true }, { className: 'w-1/2 px-0.5' }),
                WebUiFormField.input('title', { label: 'Title', required: true }, { className: 'w-1/2 px-0.5' }),
              ],
              'w-full',
            ),
          ),
        )
        break
      case 'filter-container':
        this.formModel['filterSource'] = this.model.getValue('filterSource')
        this.formModel['filters'] = this.model.getValue('filters')
        this.formModel['sortOptions'] = this.model.getValue('sortOptions')
        _fields = _fields.concat([
          WebUiFormField.input(
            'filterSource',
            { label: 'Filter Source', required: true },
            { className: 'w-full px-0.5' },
          ),
          WebUiFormField.repeat(
            'filters',
            { label: 'Filters' },
            WebUiFormField.fieldRow(
              [
                WebUiFormField.input(
                  'filterKey',
                  { label: 'FilterKey', required: true },
                  { className: 'w-1/5 px-0.5' },
                ),
                WebUiFormField.input('title', { label: 'Filter Title', required: true }, { className: 'w-1/5 px-0.5' }),
                WebUiFormField.input('dataKey', { label: 'Data Key', required: true }, { className: 'w-1/5 px-0.5' }),
                WebUiFormField.input(
                  'valueProp',
                  { label: 'Value Prop', required: true },
                  { className: 'w-1/5 px-0.5' },
                ),
                WebUiFormField.input(
                  'labelProp',
                  { label: 'Label Prop', required: true },
                  { className: 'w-1/5 px-0.5' },
                ),
                // WebUiFormField.divider()
              ],
              'w-full',
            ),
          ),
          WebUiFormField.repeat(
            'sortOptions',
            { label: 'Sort Options' },
            WebUiFormField.fieldRow(
              [
                WebUiFormField.input('title', { label: 'Title', required: true }, { className: 'w-1/2 px-0.5' }),
                WebUiFormField.input(
                  'expression',
                  { label: 'Sort Expression', required: true },
                  { className: 'w-1/2 px-0.5' },
                ),
              ],
              'w-full',
            ),
          ),
        ])
        break
      case 'repeat':
        _fields.push(WebUiFormField.input('title', { label: 'Title', required: true }, { className: 'w-full px-0.5' }))
        _fields.push(WebUiFormField.boolean('readonly', { label: 'Read Only', required: true }, { className: 'w-full px-0.5' }))
        _fields.push(WebUiFormField.boolean('fold', { label: 'Fold', required: true }, { className: 'w-full px-0.5', defaultValue: false }))
        this.formModel = {
          ...this.formModel,
          title: this.model.getValue('title'),
          fold: this.model.getValue('fold'),
          readonly: this.model.getValue('readonly'),
        }
        break
      case 'card':
        this.formModel['light'] = this.model.getValue('light')
        this.formModel['title'] = this.model.getValue('title')
        this.formModel['condensed'] = this.model.getValue('condensed')
        this.formModel['hideHeader'] = this.model.getValue('hideHeader')
        _fields.push(
          WebUiFormField.boolean('condensed', { label: 'Condensed' }, { className: 'w-full px-0.5' }),
          WebUiFormField.boolean('hideHeader', { label: 'Hide Header?' }, { className: 'w-full px-0.5', hideExpression: 'model.condensed' }),
          WebUiFormField.input('title', { label: 'Title', required: true }, { className: 'w-full px-0.5', hideExpression: 'model.condensed' }),
          WebUiFormField.boolean('light', { label: 'Highight background' }, { className: 'w-full px-0.5' }),
        )
        break
      case 'picture':
        _fields.push(
          ...WebUiFormField.oneOf(
            'useDocumentId',
            'Select Type',
            ['Use Direct Link', 'Use Document Id'],
            [
              WebUiFormField.textarea(
                'url',
                {
                  label: 'Source',
                  required: true,
                  placeholder:
                    'Please input image url. you can use brackets to access the context data like {avatarUrl}',
                },
                { className: 'w-full' },
              ),
              WebUiFormField.input(
                'documentIdKey',
                { label: 'Document Id DataKey', required: true },
                { className: 'w-full px-0.5' },
              ),
            ],
          ),
          WebUiFormField.textarea(
            'defaultUrl',
            { label: 'DefaultUrl', required: true, placeholder: 'Default Image' },
            { className: 'w-full', defaultValue: 'https://dummyimage.com/300x300/222222/fff' },
          ),
          WebUiFormField.number('width', { label: 'Picture Width', required: false }, { className: 'w-full mt-2' }),
          WebUiFormField.number('height', { label: 'Picture Height', required: false }, { className: 'w-full mt-2' }),
          WebUiFormField.enum(
            'objectFit',
            { label: 'Object Fit', values: ['contain', 'cover', 'fill', 'none', 'scale-down'] },
            { className: 'w-full mt-2', defaultValue: 'cover' },
          ),
        )

        this.formModel['useDocumentId'] = this.model.getValue('useDocumentId')
        this.formModel['documentIdKey'] = this.model.getValue('documentIdKey')
        this.formModel['url'] = this.model.getValue('url')
        this.formModel['height'] = this.model.getValue('height')
        this.formModel['width'] = this.model.getValue('width')
        this.formModel['objectFit'] = this.model.getValue('objectFit')
        this.formModel['defaultUrl'] = this.model.getValue('defaultUrl')
        break
      case 'bar-chart':
      case 'column-chart':
        _fields.push(WebUiFormField.boolean('stacked', { label: 'Stacked' }, { className: 'w-full px-0.5' }))
        this.formModel['stacked'] = this.model.getValue('stacked')
        break
      case 'overview-header':
        _fields.push(
          WebUiFormField.textarea(
            'title',
            {
              label: 'Title',
              required: true,
              placeholder: 'Please input title. You can use brackets to use data, for example "username: {name}"',
            },
            { className: 'w-full px-0.5' },
          ),
          WebUiFormField.input('feature', { label: 'Feature Name', required: true }, { className: 'w-full px-0.5' }),
          WebUiFormField.code(
            'submitAction',
            { label: 'Delete Action', required: true },
            {
              className: 'w-full',
              defaultValue: `(item) => {}`,
            },
          ),
        )
        this.formModel['html'] = this.model.getValue('html')
        this.formModel['feature'] = this.model.getValue('feature')
        this.formModel['submitAction'] = this.model.getValue('submitAction')
        break
      case 'icon':
        _fields.push(
          WebUiFormField.input(
            'icon',
            { label: 'Icon Name', required: true },
            { className: 'w-full mb-2', defaultValue: 'hippo' },
          ),
          // WebUiFormField.input('title', { label: 'Title' }, { className: 'w-full mb-2' }),
          WebUiFormField.enum(
            'size',
            {
              label: 'Size',
              values: ['xs', 'lg', 'sm', 'lx', '1x', '2x', '3x', '4x', '5x', '6x', '7x', '8x', '9x', '10x'],
            },
            { className: 'w-full mb-2', defaultValue: 'lx' },
          ),
          // WebUiFormField.enum('pull', { label: 'Pull', values: ["left","right" ] }, { className: 'w-full mb-2', defaultValue: 'lx' }),
          WebUiFormField.boolean('spin', { label: 'Spin' }, { className: 'w-full mb-2', defaultValue: false }),
          WebUiFormField.boolean('pulse', { label: 'Pulse' }, { className: 'w-full mb-2', defaultValue: false }),
          WebUiFormField.boolean('border', { label: 'Border' }, { className: 'w-full mb-2', defaultValue: false }),
        )
        this.formModel = {
          ...this.formModel,
          icon: this.model.getValue('icon'),
          // title: this.model.getValue('title'),
          size: this.model.getValue('size'),
          pull: this.model.getValue('pull'),
          spin: this.model.getValue('spin'),
          pulse: this.model.getValue('pulse'),
          border: this.model.getValue('border'),
        }
        break
      case 'file-new':

        _fields.push(
          WebUiFormField.boolean(
            'multiple',
            { label: 'Multiple' },
            { className: 'w-full px-0.5', defaultValue: false },
          ),
          WebUiFormField.boolean(
            'unlimitedSize',
            { label: 'Unlimited Size' },
            { className: 'w-full px-0.5', defaultValue: false },
          ),
          WebUiFormField.boolean(
            'readOnly',
            { label: 'Read Only' },
            { className: 'w-full px-0.5', defaultValue: false },
          ),
          WebUiFormField.boolean(
            'dragDropFile',
            { label: 'Drag and Drop' },
            { className: 'w-full px-0.5', defaultValue: false },
          ),
          WebUiFormField.input('featureName', { label: "Feature Name", reqiured: false }, { className: 'w-full px-0.5' }),
          WebUiFormField.number(
            'sizeLimitInKB',
            { label: 'Size of Limit File(KB)', required: true },
            { className: 'w-full px-0.5', defaultValue: 500 },
          ),
          WebUiFormField.textarea('path', { label: 'Path' }, { className: 'w-full px-0.5' }),
          // WebUiFormField.dropdown('allowedExtensions', {
          //   label: 'Allowed Extensions',
          //   value: this.model.getValue('allowedExtensions'),
          //   required: true,
          //   items: [
          //     { id: '1', title: 'Custom Files(*.png,*.jpg,*.gif,*.pdf)' },
          //     { id: '2', title: 'All Files(*.*)' },
          //   ]
          // }, { className: 'w-full px-0.5', default: 'category' }),
          WebUiFormField.multiSelect(
            'allowedExtensions',
            {
              multiple: true,
              label: 'Allowed Extensions',
              items: [
                {
                  label: 'PNG',
                  value: 'png',
                },
                {
                  label: 'JPG',
                  value: 'jpg',
                },
                {
                  label: 'PDF',
                  value: 'pdf',
                },
                {
                  label: 'DOC',
                  value: 'doc',
                },
                {
                  label: 'DOCX',
                  value: 'docx',
                },
                {
                  label: 'XLS',
                  value: 'xls',
                },
                {
                  label: 'XLSX',
                  value: 'xlsx',
                },
                {
                  label: 'DCM',
                  value: 'dcm',
                },
              ],
            },
            { className: 'w-full px-0.5' },
          ),
        )
        this.formModel = {
          ...this.formModel,
          multiple: this.model.getValue('multiple'),
          unlimitedSize: this.model.getValue('unlimitedSize'),
          sizeLimitInKB: this.model.getValue('sizeLimitInKB'),
          allowedExtensions: this.model.getValue('allowedExtensions'),
          featureName: this.model.getValue('featureName'),
          path: this.model.getValue('path'),
          readOnly: this.model.getValue('readOnly'),
          dragDropFile: this.model.getValue('dragDropFile')
        }
        break
      case 'grid-container':
        _fields = _fields.concat([
          WebUiFormField.number(
            'count',
            { label: 'SM:Grid Item Count', required: true },
            { className: 'w-full mt-2 px-0.5', defaultValue: 3 },
          ),
          WebUiFormField.number(
            'mdCount',
            { label: 'MDGrid Item Count', required: true },
            { className: 'w-full mt-2 px-0.5', defaultValue: 3 },
          ),
          WebUiFormField.number(
            'lgCount',
            { label: 'LG:Grid Item Count', required: true },
            { className: 'w-full mt-2 px-0.5', defaultValue: 3 },
          ),
          WebUiFormField.number(
            'xlCount',
            { label: 'XL:Grid Item Count', required: true },
            { className: 'w-full mt-2 px-0.5', defaultValue: 3 },
          ),
          WebUiFormField.number(
            'gap',
            { label: 'Spacing', required: true },
            { className: 'w-full mt-2 px-0.5', defaultValue: 10 },
          ),
          WebUiFormField.boolean(
            'showNoDataLabel',
            { label: 'Show No Data Label?' },
            { className: 'w-full  px-0.5', defaultValue: false },
          ),
        ])
        this.formModel = {
          ...this.formModel,
          gap: this.model.getValue('gap'),
          count: this.model.getValue('count'),
          mdCount: this.model.getValue('mdCount'),
          lgCount: this.model.getValue('lgCount'),
          xlCount: this.model.getValue('xlCount'),
          showNoDataLabel: this.model.getValue('showNoDataLabel'),
        }
        break

      case 'number':
        _fields.push(
          WebUiFormField.input('maxValue', { label: 'Max Value', required: false }, { className: 'w-full px-1' }),
          WebUiFormField.boolean(
            'positive',
            { label: 'Positive', required: true },
            { className: 'w-full px-1', defaultValue: false },
          ),
        )
        this.formModel['maxValue'] = this.model.getValue('maxValue')
        this.formModel['positive'] = this.model.getValue('positive')
        break
      case 'split':
        {
          this.formModel = {
            ...this.formModel,
            title:this.model.getValue('title'),
            splitCount:this.model.getValue('splitCount'),
            viewHeader:this.model.getValue('viewHeader'),
            headerLists:this.model.getValue('headerLists'),

          }
          _fields.push(
            WebUiFormField.input('title', { label: 'Name' }, { className: 'w-full px-0.5' }),
            WebUiFormField.number('splitCount', { label: 'Split Count' }, { className: 'w-full px-0.5', defaultValue: 2 }),
            WebUiFormField.boolean(
              'viewHeader',
              { label: 'View Header' },
              { className: 'w-full px-0.5', defaultValue: false },
            ),
            WebUiFormField.repeat(
              'headerLists',
              {
                label: 'Header Title List', hideExpression: '!model.viewHeader'
              },
              WebUiFormField.fieldRow(
                [
                  WebUiFormField.input('title', { label: 'Title', required: true }, { className: 'w-full px-0.5', defaultValue: 'Title' }),
                ],
                'w-full',
              ),
            )
          )

        }
        break

      case 'vertical':
        {
          _fields.push(
            WebUiFormField.input('title', { label: 'Name' }, { className: 'w-full px-0.5' }),
            WebUiFormField.boolean(
              'divider',
              { label: 'Show Divider?' },
              { className: 'w-full px-0.5', defaultValue: false },
            ),
            WebUiFormField.boolean(
              'showNoDataLabel',
              { label: 'Show no data text?' },
              { className: 'w-full px-0.5', defaultValue: false },
            ),
          )
          this.formModel['divider'] = this.model.getValue('divider')
          this.formModel['title'] = this.model.getValue('title')
          this.formModel['showNoDataLabel'] = this.model.getValue('showNoDataLabel')
        }
        break
      case 'group':
      case 'flexbox':
      case 'horizontal':
        {
          _fields.push(WebUiFormField.input('title', { label: 'Name' }, { className: 'w-full px-0.5' }))
          this.formModel['title'] = this.model.getValue('title')
        }
        break
      case 'calendar':
        {
          _fields.push(
            WebUiFormField.boolean(
              'simpleMode',
              {
                label: 'Simple Mode?',
              },
              {
                className: 'w-full px-0.5',
              },
            ),
            WebUiFormField.radio(
              'displayMode',
              {
                label: 'Select Display Mode',
                hideLabel: true,
                options: [
                  { value: 0, label: 'All' },
                  { value: 1, label: 'Month View' },
                  { value: 2, label: 'Week View' },
                  { value: 3, label: 'Day View' },
                  { value: 4, label: 'List View' },
                ],
              },
              { className: 'w-full px-0.5', defaultValue: 0, },
            ),
            WebUiFormField.time('startTime', { label: 'Start Time', required: true }, { className: 'w-full px-0.5', defaultValue: '12:00' }),
            WebUiFormField.time('endTime', { label: 'End Time', required: true }, { className: 'w-full px-0.5', defaultValue: '23:00' }),
          )
          this.formModel['displayMode'] = this.model.getValue('displayMode')
          this.formModel['startTime'] = this.model.getValue('startTime')
          this.formModel['endTime'] = this.model.getValue('endTime')
        }
        break
      default:
        break
    }

    _fields.push(this.generateClassNameSelector())
    return _fields
  }

  generateValidationFields(): FormlyFieldConfig[] {
    const dateValidatorOptions = () => {
      return WebUiFormField.fieldGroup(
        'options',
        '',
        [
          WebUiFormField.dropdown(
            'operator',
            {
              label: 'Date Validation Type',
              items: [
                { id: 'Before', title: 'Before' },
                { id: 'After', title: 'After' },
                { id: 'Between', title: 'Between' },
              ],
            },
            { className: this.narrow ? 'w-full px-0.5' : 'w-1/3 pl-4', defaultValue: 'Before' },
          ),
          WebUiFormField.date(
            'startDate',
            {
              required: true,
              label: 'Start Date',
            },
            {
              className: this.narrow ? 'w-full px-0.5' : 'w-1/3 pl-4',
              expressionProperties: {},
            },
          ),
          WebUiFormField.date(
            'endDate',
            { required: true, label: 'End Date' },
            { className: this.narrow ? 'w-full px-0.5' : 'w-1/3 pl-4', hideExpression: 'model.operator!=="Between"' },
          ),
        ],
        'flex-1',
      )
    }

    if (this.validationOptions.length > 0) {
      this.formModel['validations'] = this.validationOptions
    }

    this.formModel['validators'] = this.model.filterCustomValidators()

    return [
      WebUiFormField.repeat(
        'validations',
        { label: 'Built-in validations', narrow: this.narrow },
        WebUiFormField.validation('rule', { narrow: this.narrow }, 'w-full'),
        'w-full flex flex-row',
      ),
      WebUiFormField.repeat(
        'validators',
        { label: 'Custom validations', narrow: this.narrow },
        WebUiFormField.fieldRow([
          WebUiFormField.dropdown(
            'name',
            { label: 'Type', items: [{ id: 'date', title: 'Date' }] },
            { className: 'w-1/4', defaultValue: 'date' },
          ),
          dateValidatorOptions(),
        ]),
        'w-full flex flex-row',
      ),
    ]
  }

  generateExpressionFields(): FormlyFieldConfig[] {
    this.formModel['hideExpression'] = this.model.HideExpression
    this.formModel['customHideExpression'] = this.model.CustomHideExpression

    if (this.model.HideExpression) {
      this.formModel['useHideExpression'] = true
      this.formModel['useDefaultHideExpression'] = 0
    } else if (this.model.CustomHideExpression) {
      this.formModel['useHideExpression'] = true
      this.formModel['useDefaultHideExpression'] = 1
    }

    // Style Expression
    const styleExpression = this.model.getValue('styleExpression');
    if (styleExpression) {
      this.formModel['styleExpression'] = styleExpression;
      this.formModel['useStyleExpression'] = true;
    }

    // Class Expression
    const classExpression = this.model.getValue('classExpression');
    if (classExpression) {
      this.formModel['classExpression'] = classExpression;
      this.formModel['useClassExpression'] = true;
    }

    const expressionValues = this.model.Expressions
    const customFunctionTemplates = customFunctions[this.model.type] ?? []

    if (expressionValues) {
      const expressionModel = Object.entries(expressionValues).map(([key, value], index) => {
        return { expression: { key, value } }
      })
      this.formModel['expressions'] = expressionModel
    }

    this.formModel['hooks'] = this.model.Hooks
    this.formModel['keyevents'] = this.model.KeyEvents



    const _fields = [
      WebUiFormField.boolean(
        'useHideExpression',
        {
          label: 'Define hide expression?',
        },
        {
          className: 'w-full px-0.5',
        },
      ),
      WebUiFormField.radio(
        'useDefaultHideExpression',
        {
          label: 'Hide Expression Options',
          hideLabel: true,
          options: [
            { value: 0, label: 'Default Hide Expression' },
            { value: 1, label: 'Custom Hide Expression' },
          ],
        },
        { className: 'w-full px-0.5', defaultValue: 0, hideExpression: '!model.useHideExpression' },
      ),
      WebUiFormField.code(
        'hideExpression',
        {
          label: 'Default Hide Expression',
          required: false,
          narrow: this.narrow,
          default: `(model: any, formState: any, field: FormlyFieldConfig) => { return true }`,
        },
        {
          hideExpression: '!model.useHideExpression || model.useDefaultHideExpression===1',
          className: this.narrow ? 'w-full' : 'w-2/3',
        },
      ),
      WebUiFormField.code(
        'customHideExpression',
        {
          label: 'Custom Hide Expression',
          required: false,
          narrow: this.narrow,
          compact: this.narrow,
          default: `(contextData) => { return true; }`,
        },
        {
          hideExpression: '!model.useHideExpression || model.useDefaultHideExpression===0',
          className: this.narrow ? 'w-full' : 'w-2/3',
        },
      ),
      WebUiFormField.boolean('useStyleExpression', { label: 'Use Style Expression' }, { className: 'w-full' }),
      WebUiFormField.code('styleExpression', { label: 'Style Expression', narrow: true, required: true }, { className: 'w-full', defaultValue: '(contextData) => {return ""}', hideExpression: '!model.useStyleExpression' }),
      WebUiFormField.boolean('useClassExpression', { label: 'Use Class Expression' }, { className: 'w-full' }),
      WebUiFormField.code('classExpression', { label: 'Class Expression', narrow: true, required: true }, { className: 'w-full', defaultValue: '(contextData) => {return ""}', hideExpression: '!model.useClassExpression' }),
      WebUiFormField.repeat(
        'expressions',
        { label: 'Field Expressions', narrow: this.narrow },
        WebUiFormField.expression('expression', { narrow: this.narrow }, 'w-full'),
        'w-full flex flex-row px-0.5',
      ),
      WebUiFormField.repeat(
        'keyevents',
        {
          label: 'Key Events',
          narrow: this.narrow,
        },
        WebUiFormField.callbackExpression(
          'keyevent',
          {
            items: KeyEvents,
            narrow: this.narrow,
            defaultContent: '(field: FormlyFieldConfig, event?: any) => {\n\n}',
          },
          'w-full',
        ),
        'w-full flex flex-row',
      ),

      WebUiFormField.repeat(
        'hooks',
        { label: 'Hooks', narrow: this.narrow },
        WebUiFormField.callbackExpression(
          'hook',
          {
            items: ['onInit', 'afterViewChecked', 'onDestroy'],
            narrow: this.narrow,
          },
          'w-full',
        ),
        'w-full flex flex-row px-0.5',
      ),
    ]

    if (customFunctionTemplates.length > 0) {
      this.formModel['customFunctions'] = this.model.CustomFunctions

      _fields.push(
        WebUiFormField.repeat(
          'customFunctions',
          {
            label: 'Custom Functions',
            narrow: this.narrow,
          },
          WebUiFormField.callbackExpression(
            'func',
            {
              narrow: this.narrow,
              items: customFunctionTemplates.map((el) => el.name),
              defaultContent: customFunctionTemplates.map((el) => el.template),
            },
            'w-full',
          ),
          'w-full flex flex-row',
        ),
      )
    }


    return _fields
  }

  doSubmitChartFormData(formData) {
    const feedMode = formData['feedMode']
    this.model.deleteValue('dataKey')
    this.model.deleteValue('cubeQuery')
    this.model.setValue('feedMode', feedMode)
    switch (feedMode) {
      case 0: // Using sample data
        break
      case 1: // Using dataKey
        this.model.setValue('dataKey', formData['dataKey'])
        break
      case 2: // Using cubeQuery;
        this.model.setValue('cubeQuery', formData['cubeQuery'])
        break
      default:
        break
    }
    this.saveClassName(formData['className'])
  }

  saveClassName(value: any) {
    if (!value) {
      this.model.ClassName = ''
    } else {
      this.model.ClassName = this.tailwindService.generateClassName(value)
    }
  }

  submit(formData) {
    console.log({ formData })
    if (!this.formService.form.valid) return

    switch (this.model.type) {
      case 'area-chart':
      case 'chart': // This means line-chart
        this.doSubmitChartFormData(formData)
        this.save.emit(this.model)
        return
      case 'bar-chart':
        this.doSubmitChartFormData(formData)
        this.model.setValue('stacked', formData['stacked'])
        this.save.emit(this.model)
        return
      case 'embed':
        this.model.deleteValue('url')
        this.model.deleteValue('html')
        if (formData['iFrame']) {
          this.model.setValue('url', formData['url'])
        } else {
          this.model.setValue('html', formData['html'])
        }
        this.model.setValue('height', formData['height'])
        this.saveClassName(formData['className'])
        this.save.emit(this.model)
        return
      case 'divider': {
        const { borderStyle, className } = formData
        this.model.setValues({
          borderStyle: this.tailwindService.generateClassName(borderStyle),
        })
        this.model.ClassName = this.tailwindService.generateClassName(className)
        this.save.emit(this.model)
        return
      }
      case 'heading': {
        const { title, subtitle, titleStyle, subTitleStyle, className } = formData
        this.model.setValues({
          title,
          subtitle,
          titleStyle: this.tailwindService.generateClassName(titleStyle),
          subTitleStyle: this.tailwindService.generateClassName(subTitleStyle),
        })
        this.model.ClassName = this.tailwindService.generateClassName(className)
        this.save.emit(this.model)
        return
      }

      case 'link':
        this.model.setValue('preview_src', formData['preview_src'])
        this.model.setValue('data_src', formData['data_src'])
        this.model.setValue('data_sub_html', formData['data_sub_html'])
        this.model.setValue('height', formData['height'])
        this.model.setValue('pinterest_text', formData['pinterest_text'])
        this.model.setValue('tweet_text', formData['tweet_text'])
        if (formData['responsive']) {
          const responsiveSegments = formData['responsive'].map((el) => {
            return `${el.url} ${el.size}`
          })
          this.model.setValue('responsive', responsiveSegments.join(','))
        }
        this.saveClassName(formData['className'])
        this.save.emit(this.model)
        return
      case 'overview':
        this.model.setValue('title', formData['title'])
        this.model.setValue('summary', formData['summary'])
        this.model.setValue('color', formData['color'])
        if (formData['allowSubcontent']) {
          this.model.setValue('subtitle', formData['subtitle'])
          this.model.setValue('subsummary', formData['subsummary'])
        } else {
          this.model.deleteValue('subtitle')
          this.model.deleteValue('subsummary')
        }
        this.model.ClassName = formData['className']
        this.save.emit(this.model)
        return
      case 'financial-gauge':  
      case 'title':
        {
          const { title, titleStyle, className } = formData
          this.model.setValues({
            title,
            titleStyle: this.tailwindService.generateClassName(titleStyle),
          })
          this.model.ClassName = this.tailwindService.generateClassName(className)
          this.save.emit(this.model)
        }
        return

      case 'dropdown':
      default:
        break
    }

    console.log({ formData })
    if (this.formService.form.valid) {
      Object.entries(formData).map(([key, value]) => {
        switch (key) {
          case 'key':
            this.model.Key = String(value)
            break
          case 'labelStyle':
            this.model.setValue(key, this.tailwindService.generateClassName(value))
            break
          case 'className':
            this.saveClassName(value)
            break
          case 'hideExpression':
            if (formData['useHideExpression'] && formData['useDefaultHideExpression'] === 0)
              this.model.HideExpression = String(value)
            else {
              this.model.HideExpression = null
            }
            break
          case 'customHideExpression':
            if (formData['useHideExpression'] && formData['useDefaultHideExpression'] === 1)
              this.model.CustomHideExpression = String(value)
            else {
              this.model.CustomHideExpression = null
            }
            break
          case 'validations':
            // remove existing validation data
            this.model.clearValidations()
              ; (value as Array<any>).map((validation) => {
                const validationItem = validation['rule']
                if (validationItem.message && validationItem.message.length > 0) {
                  this.model.setValidationMessage(validationItem.key, validationItem.message)
                }

                this.model.setValue(validationItem.key, validationItem.value)
              })
            break

          case 'validators':
            {
              this.model.clearValidators()

              let tempValidators = []

              if (!this.model.Validators || (this.model.Validators && this.model.Validators.length == 0)) {
                if (!essentialCustomValidators[this.model.type]) {
                  tempValidators = []
                } else {
                  tempValidators = essentialCustomValidators[this.model.type]
                }
              }
              if (value && (value as any[]).length > 0) this.model.Validators = tempValidators.concat(value as any[])
              else if (tempValidators.length > 0) this.model.Validators = tempValidators
              break
            }
          case 'expressions':
            // eslint-disable-next-line no-case-declarations
            const expressions = {}
              ; (value as Array<any>).map((validation) => {
                const validationItem = validation['expression']
                expressions[validationItem.key] = validationItem.value
              })
            this.model.Expressions = expressions
            break
          case 'keyevents':
            this.model.KeyEvents = value as any[]
            break
          case 'customFunctions':
            {
              let temp = this.model.KeyEvents
              let tempCustomFunctions = value as any[]
              this.model.CustomFunctions = tempCustomFunctions
              this.model.KeyEvents = temp
              tempCustomFunctions = null
              temp = null
              break
            }
          case 'hooks':
            this.model.Hooks = value as any[]
            break
          case 'palette':
            // eslint-disable-next-line no-case-declarations
            const palette = formData['palette']
            this.model.setValue('palette', {
              fills: palette.fills.map((el) => el.color),
              strokes: palette.strokes.map((el) => el.color),
            })
            break
          case 'dataKey':
            if (formData['useDatakey']) this.model.setValue(key, value)
            else this.model.deleteValue(key)
            break
          case 'styleExpression':
            if (formData['useStyleExpression']) this.model.setValue(key, value)
            else this.model.deleteValue(key)
            break
          case 'classExpression':
            if (formData['useClassExpression']) this.model.setValue(key, value)
            else this.model.deleteValue(key)
            break
          case 'useDatakey':
          case 'useHideExpression':
          case 'useDefaultHideExpression':
          case "useStyleExpression":
          case "useClassExpression":
            break
          default:
            this.model.setValue(key, value)
            break
        }
      })

      this.save.emit(this.model)
    }
  }
}
