import {
  alignItemsSuffixes,
  bgSizeSuffixes,
  displays,
  flexDirectionSuffixes,
  flexSizeSuffixes,
  flexWrapSuffixes,
  gapSuffixes,
  justifyContentSuffixes,
  maxSuffixes,
  orderSupportClasses,
  positions,
  positionSuffixes,
  zIndexSuffixes,
} from './../../../formly-designer/src/lib/services/tailwind.service';
import { FormlyFieldConfig, FormlyTemplateOptions } from '@ngx-formly/core'
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {
  animationSuffixes,
  bgOpacitySuffixes,
  borderSizeSuffixes,
  colorSuffixes,
  dropShadowSuffixes,
  fontDecorations,
  fontFamilySuffixes,
  fontSizeSuffixes,
  fontWeightSuffixes,
  lineHeightSuffixes,
  opacitySuffixes,
  overflowSufixes,
  radiusSuffixes,
  shadowSizeSuffixes,
  sizingSufixes,
  spacingSuffixes,
  TailwindClassFilter,
  TailwindClassTitle,
  TailwindService,
  textAlignSuffixes
} from 'libs/web/ui/formly-designer/src/lib/services/tailwind.service'

export class WebUiFormField implements FormlyFieldConfig {
  static checkbox(key: string, templateOptions?: FormlyTemplateOptions, options?: any): FormlyFieldConfig {
    return this.field(key, 'checkbox', templateOptions, options)
  }

  static date(key: string, templateOptions?: FormlyTemplateOptions, options?: any): FormlyFieldConfig {
    delete templateOptions['isRequired'];
    delete templateOptions['maxDate'];
    delete templateOptions['placeholder'];
    return this.field(key, 'date', templateOptions, options);
    // return this.input(key, { ...templateOptions, type: 'date' }, { ...options })
  }

  static enum(key: string, templateOptions?: FormlyTemplateOptions, options?: any): FormlyFieldConfig {
    return {
      key,
      type: 'enumeration',
      templateOptions,
      ...options
    }
  }

  static datetime(key: string, templateOptions?: FormlyTemplateOptions, options?: any): FormlyFieldConfig {
    return this.input(key, { ...templateOptions, type: 'datetime-local' }, { ...options })
  }

  static email(key: string, templateOptions?: FormlyTemplateOptions, options?: any): FormlyFieldConfig {
    const defaults = {
      type: 'email',
      label: 'Email',
    }
    const defaultOptions = { validators: { validation: ['email'] } }

    return this.input(key, { ...defaults, ...templateOptions }, { ...defaultOptions, ...options })
  }

  static file(key: string, templateOptions?: FormlyTemplateOptions, options?: any): FormlyFieldConfig {
    return this.field(key, 'file-new', { ...templateOptions }, { ...options })
  }

  static simpleTypeahead(templateOptions?: FormlyTemplateOptions, options?: any): FormlyFieldConfig {
    return {
      type: 'simpleTypeahead',
      templateOptions,
      className: "w-full",
      ...options
    }
  }

  static whereDoesItHurt(key: string, templateOptions?: FormlyTemplateOptions, options?: any): FormlyFieldConfig {
    return this.field(key, 'where-does-it-hurt', templateOptions, options)
  }

  static classNames(templateOptions?: FormlyTemplateOptions, options?: any): FormlyFieldConfig {
    return {
      type: 'classes',
      templateOptions: {
        ...templateOptions,
      },
      ...options,
      className: "w-full"
    }
  }

  static colorElement = (key: string, title: string, className = 'w-full') => {
    return this.enum(key, { label: title, compact: true, values: colorSuffixes }, { className })
  }


  static flexDirectionElement = (className = 'w-full') => {
    return this.enum('direction', { label: 'Flex Direction', compact: true, values: flexDirectionSuffixes }, { className })
  }

  static flexWrapElement = (className = 'w-full') => {
    return this.enum('wrap', { label: 'Flex Wrap', compact: true, values: flexWrapSuffixes }, { className })
  }

  static flexSizeElement = (className = 'w-full') => {
    return this.enum('size', { label: 'Flex Size', compact: true, values: flexSizeSuffixes }, { className })
  }

  static justifyContentElement = (className = 'w-full') => {
    return this.enum('justify', { label: 'Justify Content', compact: true, values: justifyContentSuffixes }, { className })
  }

  static alignItemsElement = (className = 'w-full') => {
    return this.enum('items', { label: 'Align Items', compact: true, values: alignItemsSuffixes }, { className })
  }

  static gapElement = (className = 'w-full') => {
    return this.enum('gap', { label: 'Gap', compact: true, values: gapSuffixes }, { className })
  }

  static sizeElement = (key: string, title: string, className = 'w-full') => {
    return this.enum(key, { label: title, compact: true, values: sizingSufixes }, { className })
  }

  static maxWidthElement = (className = 'w-full') => {
    return this.enum('max', { label: 'MAX WIDTH', compact: true, values: maxSuffixes }, { className })
  }

  static spacingElement = (key: string, title: string, className = 'w-full') => {
    return this.enum(key, { label: title, compact: true, values: spacingSuffixes }, { className })
  }

  static opacityElement = (className = 'w-full') => {
    return this.enum('opacity', { label: 'Opacity', compact: true, values: opacitySuffixes }, { className })
  }

  static positionElement = (className = 'w-full') => {
    return this.enum('position', { label: 'Position', compact: true, values: positions }, { className })
  }

  static displayElement = (className = 'w-full') => {
    return this.enum('display', { label: 'Display', compact: true, values: displays }, { className })
  }

  static positionOffsetElement = (prefix: 'inset' | 'top' | 'right' | 'bottom' | 'left', className = "w-full") => {
    return this.enum(prefix, { label: prefix, compact: true, values: positionSuffixes }, { className: `${className} my-1` })
  }

  static animationElement = (className = 'w-full') => {
    return this.enum('animate', { label: 'Animation List', compact: true, values: animationSuffixes }, { className })
  }

  static radiusElement = (className = 'w-full') => {
    return this.enum('rounded', { label: 'RADIUS', compact: true, values: radiusSuffixes }, { className })
  }

  static lineHeightElement = (className = 'w-full') => {
    return this.enum('leading', { label: 'LINE HEIGHT', compact: true, values: lineHeightSuffixes }, { className })
  }

  static dropShadowElement = (className = 'w-full') => {
    return this.enum('drop-shadow', { label: 'DROP SHADOW', compact: true, values: dropShadowSuffixes }, { className })
  }

  static overflowElement = (className = 'w-full') => {
    return this.enum('overflow', { label: 'OVERFLOW', compact: false, values: overflowSufixes }, { className })
  }

  static zIndexElement = (className = 'w-full') => {
    return this.enum('z', { label: 'Z-INDEX', compact: true, values: zIndexSuffixes }, { className })
  }

  static orderElement = (className = 'w-full') => {
    return this.enum('order', { label: 'Order', compact: true, values: orderSupportClasses }, { className })
  }

  static shadowSizeElement = (className = 'w-full') => {
    return this.fieldGroup('shadow', '', [
      this.dropdown('size', { label: 'SHADOW', compact: true, items: shadowSizeSuffixes.map((el) => ({ id: el, title: el })) }, { className: 'w-full' })
    ], className, { compact: true, hideLabel: true })
  }

  static textAlignElement = (className = 'w-full') => {
    return this.fieldGroup('text', '', [
      this.enum('align', { label: 'TEXT ALIGN', compact: true, values: textAlignSuffixes }, { className: 'w-full' })
    ], className, { compact: true, hideLabel: true })
  }

  static fontWeightElement = (className = 'w-full') => {
    return this.fieldGroup('font', '', [
      this.dropdown('weight', { label: 'FONT WEIGHT', compact: true, items: fontWeightSuffixes.map((el) => ({ id: el, title: el })) }, { className: 'w-full' })
    ], className, { compact: true, hideLabel: true })
  }

  static fontFamilyElement = (className = 'w-full') => {
    return this.fieldGroup('font', '', [
      this.enum('family', { label: 'FONT FAMILY', compact: true, values: fontFamilySuffixes }, { className: 'w-full' })
    ], className, { compact: true, hideLabel: true })
  }

  static borderSizeElement = (className = 'w-full') => {
    return this.fieldGroup('border', '', [
      this.dropdown('size', { label: 'BORDER', compact: true, items: borderSizeSuffixes.map((el) => ({ id: el, title: el })) }, { className: 'w-full' })
    ], className, { compact: true, hideLabel: true })
  }

  static bgOpacityElement = (className = 'w-full') => {
    return this.fieldGroup('bg', '', [
      this.enum('opacity', { label: 'BG OPACITY', compact: true, values: bgOpacitySuffixes }, { className: 'w-full' })
    ], className, { compact: true, hideLabel: true })
  }

  static bgSizeElement = (className = 'w-full') => {
    return this.fieldGroup('bg', '', [
      this.enum('size', { label: 'BG SIZE', compact: true, values: bgSizeSuffixes }, { className: 'w-full' })
    ], className, { compact: true, hideLabel: true })
  }

  static spacingLayout = (variant: 'm' | 'p', padding = true) => {
    return this.fieldRow([
      this.spacingElement(`${variant}t`, '', 'w-20'),
      this.fieldRow([
        this.spacingElement(`${variant}l`, '', 'w-20 mt-5'),
        // this.picture('https://windframe.devwares.com/editor-margin.svg', 55, 55),
        this.picture(padding ? 'assets/images/editor-padding.svg' : 'assets/images/editor-margin.svg'),
        this.spacingElement(`${variant}r`, '', 'w-20 mt-5'),
      ], 'flex flex-row items-center justify-center gap-1'),
      this.spacingElement(`${variant}b`, '', 'w-20 mt-5'),
      this.fieldRow([
        this.spacingElement(`${variant}y`, 'Y-AXIS', 'w-1/2 pr-1'),
        this.spacingElement(`${variant}x`, 'X-AXIS', 'w-1/2 pl-1'),
      ])
    ], 'flex flex-col items-center scale-100')
  }

  static colorLayout = () => {
    return this.fieldRow([
      // this.fieldGroup('bg', "", [
      //   this.colorElement('color', 'BG COLOR', 'w-full'),
      // ], "w-1/2 pr-1", { compact: true, hideLabel: true }),
      this.fieldGroup('border', "", [
        this.colorElement('color', 'BORDER', 'w-full'),
      ], "w-1/2 pr-0.5", { compact: true, hideLabel: true }),
      this.fieldGroup('shadow', "", [
        this.colorElement('color', 'SHADOW', 'w-full'),
      ], "w-1/2 pl-0.5", { compact: true, hideLabel: true }),
      // colorElement('accent', 'ACCENT', 'w-1/2 pl-0.5'),
      // colorElement('decoration', 'TEXT DECOR', 'w-1/2 pl-1'),
    ], 'scale-100')
  }

  static fontStyleLayout = () => {
    return this.fieldRow([
      ...fontDecorations.map(el => {
        return this.checkbox(el.class, { label: el.title }, { className: 'w-full' })
      }),
      this.fieldGroup('text', "", [
        this.colorElement('color', 'COLOR', 'w-full'),
      ], "w-1/2 pr-0.5", { compact: true, hideLabel: true }),
      this.textAlignElement('w-1/2 pl-0.5'),
      this.fieldGroup('text', "", [
        this.dropdown('size', { label: 'SIZE', compact: true, items: fontSizeSuffixes.map((el) => ({ id: el, title: el })) }, {
          className: 'w-full'
        })
      ], 'w-1/2 pr-0.5'),
      this.fontWeightElement('w-1/2 pl-0.5'),
      this.lineHeightElement('w-1/2 pr-0.5'),
      this.fontFamilyElement('w-1/2 pl-0.5'),
    ], 'scale-100', { compact: true })
  }

  static displayLayout = (display: {
    flexDirection?: boolean,
    flexWrap?: boolean,
    gap?: boolean,
    flexSize?: boolean,
  }) => {
    const allFields = []
    const flexFields = [];
    if (display.flexDirection) {
      flexFields.push(
        this.flexDirectionElement('w-1/2 px-0.5 mb-2'),
      )
    }

    if (display.flexWrap) {
      flexFields.push(
        this.flexWrapElement('w-1/2 px-0.5 mb-2'),
      )
    }

    flexFields.push(
      this.flexSizeElement('w-1/2 px-0.5 mb-2'),
    )

    allFields.push(
      this.fieldGroup('flex', "", flexFields, 'w-full pb-2 mb-2', {}, true),
      this.displayElement('w-1/2 px-0.5 mb-2'),
      this.justifyContentElement('w-1/2 px-0.5 mb-2'),
      this.alignItemsElement('w-1/2 px-0.5 mb-2'),
    )

    if (display.gap) {
      allFields.push(
        this.gapElement('w-1/2 px-0.5 mb-2'),
      )
    }
    allFields.push(
      this.opacityElement('w-1/2 px-0.5'),
      this.overflowElement('w-1/2 px-0.5'),
      this.zIndexElement('w-1/2 px-0.5'),
      this.orderElement('w-1/2 px-0.5'),
    )
    return this.fieldRow(allFields, 'w-full scale-x-100 pb-2')
  }

  static sizeLayout = (size: { width?: boolean, height?: boolean }) => {
    if (size.width && size.height) {
      return this.fieldRow([
        this.sizeElement('w', 'WIDTH', 'w-1/2 px-0.5'),
        this.sizeElement('h', 'HEIGHT', 'w-1/2 px-0.5'),
        this.maxWidthElement('w-1/2 px-0.5'),
      ], 'scale-100')
    } else {
      if (size.width) {
        return this.fieldRow([
          this.sizeElement('w', 'WIDTH', 'w-full'),
          this.maxWidthElement('w-1/2 px-0.5'),
        ], 'scale-100')
      } else {
        return this.fieldRow([
          this.sizeElement('h', 'HEIGHT', 'w-full'),
        ], 'scale-100')
      }
    }
  }


  static classesSelect(
    key: string,
    title: '',
    tailwindService: TailwindService,
    classNameDeleted: (newClassName: string) => void,
    classNameAdded: (newClassName: string) => void,
    narrow: boolean,
    filter?: TailwindClassFilter,
    titles?: TailwindClassTitle,
    templateOptions?: FormlyTemplateOptions,
    options?: any,
  ): FormlyFieldConfig {
    const defaultFilter: TailwindClassFilter = {
      advanced: true,
      background: {
        color: true,
        image: false,
      },
      colors: true,
      size: {
        width: true,
        height: true,
      },
      margin: true,
      padding: true,
      fontStyle: true,
      decoration: true,
      display: {
        enabled: true,
        flexDirection: false,
        flexWrap: false,
        gap: false,
        flexSize: true,
      },
      position: true,
    }

    const defaultTitle = {
      advanced: 'Advanced',
      colors: 'Colors',
      size: 'Width and Height',
      margin: 'Margin',
      padding: "Padding",
      fontStyle: 'Font Style',
      decoration: 'Decoration',
      display: 'Display'
    }

    const fields = []
    if (!filter) {
      filter = defaultFilter;
    } else {
      filter = { ...defaultFilter, ...filter, background: { ...defaultFilter.background, ...filter.background }, size: { ...defaultFilter.size, ...filter.size } }
    }

    if (!titles) {
      titles = defaultTitle
    } else {
      titles = { ...defaultTitle, ...titles }
    }

    const panelClassName = 'w-full'

    let backgroundCollapse = null;
    let advancedCollapse = null;

    if (filter.advanced) {
      advancedCollapse = this.collapse(titles.advanced, [
        this.classNames({
          valueRemoved: (newClassName: string) => {
            classNameDeleted(newClassName)
          },
          classNameList: 'w-full'
        }, {
          expressionProperties: {
            'templateOptions.classNameList': (model: any) => {
              return tailwindService.generateClassName(model[key]);
            }
          }
        }),
        this.simpleTypeahead({
          placeholder: "Type class to add", source: tailwindService.filterClasses(filter), onChange: ($event) => {
            classNameAdded($event);
          }
        }, {
          className: 'mb-3 mt-2'
        })
      ], panelClassName, false)
    }

    // Custom Classes
    fields.push(this.collapse('Extra Classes', [
      this.repeat('extraClasses', { label: "Extra Classes", hideLabel: true }, this.fieldRow([
        this.input('class', { label: 'Name', hideLabel: false, required: true }, { className: 'px-0.5' })
      ]))
    ], 'w-full', true))

    if (filter.background.image || filter.background.color) {
      const _backgroundFields = []
      if (filter.background.image) {
        _backgroundFields.push(
          this.fieldGroup('backgroundImage', "", [
            WebUiFormField.textarea('image', { label: 'Background Image' }, { className: 'w-full px-0.5' }),
            WebUiFormField.number('opacity', { label: 'Background Image Opacity', min: 0, max: 1 }, { className: 'w-full px-0.5', defaultValue: 0 }),
            WebUiFormField.enum('size', { label: 'Image Size', values: ['auto', 'cover', 'contain'] }, { className: 'w-1/2 px-0.5', defaultValue: 'cover' }),
            WebUiFormField.enum('position', { label: 'Image Position', values: ['center', 'top', 'right', 'bottom', 'left'] }, { className: 'w-1/2 px-0.5', defaultValue: 'center' }),
          ], 'w-full', {}, true),
        )
      }

      if (filter.background.color) {
        _backgroundFields.push(
          this.fieldGroup(key, "", [
            this.tabs([
              this.tab('Normal', [
                this.fieldGroup('bg', "", [
                  this.colorElement('color', 'BG COLOR', 'w-full'),
                ], "w-1/2 px-0.5", { compact: true, hideLabel: true }),
                this.bgOpacityElement('w-1/2 px-0.5'),
              ]),
              this.tab('Hover', [
                this.fieldGroup('hover', "", [
                  this.fieldGroup('bg', "", [
                    this.colorElement('color', 'BG COLOR', 'w-full px-0.5'),
                  ], "w-1/2 px-0.5", { compact: true, hideLabel: true }),
                  this.bgOpacityElement('w-1/2 px-0.5'),
                  // this.bgSizeElement('w-1/2 px-0.5'),
                ], "w-full", { compact: true, hideLabel: true })
              ],),
            ])
          ], 'w-full', {}, true)
        )
      }

      backgroundCollapse = this.collapse('Background', _backgroundFields, panelClassName, true)
    }

    if (filter.display.enabled) {
      fields.push(
        this.collapse(titles.display, [
          this.tabs([
            this.tab('ALL', [
              this.displayLayout(filter.display),
            ]),
            this.tab('SM', [
              this.fieldGroup('sm', "", [
                this.displayLayout(filter.display),
              ])
            ]),
            this.tab('MD', [
              this.fieldGroup('md', "", [
                this.displayLayout(filter.display),
              ])
            ]),
            this.tab('LG', [
              this.fieldGroup('lg', "", [
                this.displayLayout(filter.display),
              ])
            ]),
          ])
        ], 'w-full', true)
      )
    }

    if (filter.colors) {
      fields.push(
        this.collapse(titles.colors, [
          this.tabs([
            this.tab('Normal', [
              this.colorLayout()
            ]),
            this.tab('Hover', [
              this.fieldGroup('hover', "", [
                this.colorLayout()
              ])
            ]),
          ])
        ], 'w-full', true),
      )
    }

    const allowSize = filter.size.height || filter.size.width;
    let sizeTitle = "";
    if (filter.size.height && filter.size.width) {
      sizeTitle = titles.size;
    } else {
      if (filter.size.width) {
        sizeTitle = 'Width';
      } else {
        sizeTitle = 'Height'
      }
    }
    if (allowSize) {
      fields.push(
        this.collapse(sizeTitle, [
          this.tabs([
            this.tab('ALL', [
              this.sizeLayout(filter.size)
            ]),
            this.tab('SM', [
              this.fieldGroup('sm', "", [
                this.sizeLayout(filter.size)
              ])
            ]),
            this.tab('MD', [
              this.fieldGroup('md', "", [
                this.sizeLayout(filter.size)
              ])
            ]),
            this.tab('LG', [
              this.fieldGroup('lg', "", [
                this.sizeLayout(filter.size)
              ])
            ]),
            this.tab('XL', [
              this.fieldGroup('xl', "", [
                this.sizeLayout(filter.size)
              ])
            ]),
          ], 'full_width_underline')
        ], 'w-full', true),
      )
    }

    if (filter.margin) {
      fields.push(
        this.collapse(titles.margin, [
          this.tabs([
            this.tab('ALL', [
              this.spacingLayout('m', false)
            ]),
            this.tab('SM', [
              this.fieldGroup('sm', "", [
                this.spacingLayout('m', false)
              ])
            ]),
            this.tab('MD', [
              this.fieldGroup('md', "", [
                this.spacingLayout('m', false)
              ])
            ]),
            this.tab('LG', [
              this.fieldGroup('lg', "", [
                this.spacingLayout('m', false)
              ])
            ]),
          ])
        ], panelClassName, true),
      )
    }

    if (filter.padding) {
      fields.push(
        this.collapse(titles.padding, [
          this.tabs([
            this.tab('ALL', [
              this.spacingLayout('p')
            ]),
            this.tab('SM', [
              this.fieldGroup('sm', "", [
                this.spacingLayout('p')
              ])
            ]),
            this.tab('MD', [
              this.fieldGroup('md', "", [
                this.spacingLayout('p')
              ])
            ]),
            this.tab('LG', [
              this.fieldGroup('lg', "", [
                this.spacingLayout('p')
              ])
            ]),
          ])
        ], panelClassName, true),
      )
    }

    if (filter.fontStyle) {
      fields.push(
        this.collapse(titles.fontStyle, [
          this.tabs([
            this.tab('Normal', [
              this.fontStyleLayout()
            ]),
            this.tab('Hover', [
              this.fieldGroup('hover', "", [
                this.fontStyleLayout()
              ])
            ]),
          ])
        ], 'w-full', true),
      )
    }

    if (filter.decoration) {
      fields.push(
        this.collapse(titles.decoration, [
          this.tabs([
            this.tab('Normal', [
              this.fieldRow([
                this.radiusElement('w-1/2 pr-0.5'),
                this.shadowSizeElement('w-1/2 pl-0.5'),
                this.borderSizeElement('w-1/2 pr-0.5'),
                this.dropShadowElement('w-1/2 pl-0.5'),
              ], 'scale-x-100 pb-2')
            ]),
            this.tab('Hover', [
              this.fieldGroup('hover', "", [
                this.fieldRow([
                  this.radiusElement('w-1/2 pr-0.5'),
                  this.shadowSizeElement('w-1/2 pl-0.5'),
                  this.borderSizeElement('w-1/2 pr-0.5'),
                  this.dropShadowElement('w-1/2 pl-0.5'),
                ], 'scale-x-100 pb-2')
              ])
            ]),
          ])
        ], 'w-full', true)
      )
    }

    if (filter.position) {
      fields.push(
        this.collapse('Position', [
          this.tabs([
            this.tab('ALL', [
              this.fieldRow([
                this.positionElement('w-full'),
                this.positionOffsetElement('top', 'w-1/2 pr-0.5'),
                this.positionOffsetElement('bottom', 'w-1/2 pl-0.5'),
                this.positionOffsetElement('left', 'w-1/2 pr-0.5'),
                this.positionOffsetElement('right', 'w-1/2 pl-0.5'),
              ], 'w-full scale-x-100 pb-2'),
            ]),
            this.tab('SM', [
              this.fieldGroup('sm', "", [
                this.fieldRow([
                  this.positionElement('w-full'),
                  this.positionOffsetElement('top', 'w-1/2 pr-0.5'),
                  this.positionOffsetElement('bottom', 'w-1/2 pl-0.5'),
                  this.positionOffsetElement('left', 'w-1/2 pr-0.5'),
                  this.positionOffsetElement('right', 'w-1/2 pl-0.5'),
                ], 'w-full scale-x-100 pb-2'),
              ])
            ]),
            this.tab('MD', [
              this.fieldGroup('md', "", [
                this.fieldRow([
                  this.positionElement('w-full'),
                  this.positionOffsetElement('top', 'w-1/2 pr-0.5'),
                  this.positionOffsetElement('bottom', 'w-1/2 pl-0.5'),
                  this.positionOffsetElement('left', 'w-1/2 pr-0.5'),
                  this.positionOffsetElement('right', 'w-1/2 pl-0.5'),
                ], 'w-full scale-x-100 pb-2'),
              ])
            ]),
            this.tab('LG', [
              this.fieldGroup('lg', "", [
                this.fieldRow([
                  this.positionElement('w-full'),
                  this.positionOffsetElement('top', 'w-1/2 pr-0.5'),
                  this.positionOffsetElement('bottom', 'w-1/2 pl-0.5'),
                  this.positionOffsetElement('left', 'w-1/2 pr-0.5'),
                  this.positionOffsetElement('right', 'w-1/2 pl-0.5'),
                ], 'w-full scale-x-100 pb-2'),
              ])
            ]),
          ])
        ], 'w-full', true)
      )
    }

    fields.push(
      this.collapse('Print', [
        this.fieldGroup('print', '', [
          this.displayElement('w-full px-0.5')
        ])
      ], 'w-full', true)
    )

    const _fields = []

    if (advancedCollapse) _fields.push(advancedCollapse);
    if (backgroundCollapse) _fields.push(backgroundCollapse);
    _fields.push(WebUiFormField.fieldGroup(key, title, fields, 'w-full', {}, true))

    return WebUiFormField.fieldRow(_fields)
  }

  static image(key: string, templateOptions?: FormlyTemplateOptions, options?: any): FormlyFieldConfig {
    return this.field(key, 'image', { ...templateOptions }, { ...options })
  }

  static fileViewer(templateOptions?: FormlyTemplateOptions): FormlyFieldConfig {
    return {
      templateOptions: { ...templateOptions, type: 'file-viewer' },
    }
  }

  static filePreview(templateOptions?: FormlyTemplateOptions): FormlyFieldConfig {
    return {
      templateOptions: { ...templateOptions, type: 'file-preview' },
    }
  }

  static stepper(
    templateOptions?: FormlyTemplateOptions,
    fieldGroup: FormlyFieldConfig[] = [],
    fieldGroupClassName: string = 'max-w-3xl mx-auto',
  ): FormlyFieldConfig {
    return {
      templateOptions: { ...templateOptions, type: 'stepper', formClass: fieldGroupClassName },
      fieldGroup: fieldGroup,
    }
  }

  static fieldRow(
    fieldGroup: FormlyFieldConfig[] = [],
    fieldGroupClassName: string = 'flex flex-wrap',
    templateOptions?: any,
    options?: any,
  ): FormlyFieldConfig {
    return {
      fieldGroup,
      fieldGroupClassName,
      ...options,
      templateOptions,
    }
  }

  static group(
    fieldGroup: FormlyFieldConfig[] = [],
    fieldGroupClassName: string = 'flex flex-wrap',
    templateOptions?: any,
    options?: any,
  ): FormlyFieldConfig {
    return {
      fieldGroup,
      templateOptions,
      wrappers: ['group'],
      ...options,
      className: fieldGroupClassName
    }
  }

  static fieldGroup(
    key: string,
    label: string,
    fieldGroup: FormlyFieldConfig[] = [],
    fieldGroupClassName: string = 'flex flex-wrap',
    options?: any,
    compact?: boolean,
    hideLabel?: boolean,
  ): FormlyFieldConfig {
    return {
      key,
      fieldGroup,
      wrappers: ['form-field'],
      templateOptions: {
        label: label,
        compact,
        hideLabel,
      },
      ...options,
      className: fieldGroupClassName,
    }
  }

  static field(
    key: string,
    type?: string,
    templateOptions: FormlyTemplateOptions = {},
    config: FormlyFieldConfig = {

    },
  ): FormlyFieldConfig {
    return {
      key,
      type,
      templateOptions: {
        ...templateOptions,
      },
      ...config,
    }
  }

  static hidden(
    key: string,
    templateOptions: FormlyTemplateOptions = {

    },
    config: FormlyFieldConfig = {
      hide: true
    },
  ): FormlyFieldConfig {
    return this.field(key, 'input', templateOptions, config)
  }

  static empty(

  ): FormlyFieldConfig {
    return {}
  }

  static input(
    key: string,
    templateOptions: FormlyTemplateOptions = {

    },
    config: FormlyFieldConfig = {

    },
  ): FormlyFieldConfig {
    return this.field(key, 'input', templateOptions, config)
  }

  static boolean(
    key: string,
    templateOptions: FormlyTemplateOptions = {

    },
    config: FormlyFieldConfig = {

    },
  ): FormlyFieldConfig {
    return this.field(key, 'boolean', templateOptions, config)
  }

  static code(
    key: string,
    templateOptions: FormlyTemplateOptions = {

    },
    config: FormlyFieldConfig = {

    },
  ): FormlyFieldConfig {
    return this.field(key, 'code', templateOptions, config)
  }

  static multiSelect(
    key: string,
    templateOptions: FormlyTemplateOptions = {

    },
    config: FormlyFieldConfig = {

    },
  ): FormlyFieldConfig {
    return this.field(key, 'multi-select', templateOptions, config)
  }

  static cardHolder(
    key: string,
    templateOptions: FormlyTemplateOptions = {

    },
    config: FormlyFieldConfig = {

    },
  ): FormlyFieldConfig {
    return this.field(key, 'card_holder', templateOptions, config)
  }

  static divider(): FormlyFieldConfig {
    return {
      type: 'divider',
      className: 'w-full'
    }
  }

  static markdown(
    key: string,
    templateOptions: FormlyTemplateOptions = {

    },
    config: FormlyFieldConfig = {

    },
  ): FormlyFieldConfig {
    return this.field(key, 'markdown', templateOptions, config)
  }

  static grid(
    key: string,
    templateOptions: FormlyTemplateOptions = {},
    config: FormlyFieldConfig = {},
  ): FormlyFieldConfig {
    return this.field(key, 'grid', templateOptions, config)
  }

  static repeat(
    key: string,
    templateOptions: FormlyTemplateOptions = {},
    config: FormlyFieldConfig = {},
    className: string = "w-full flex flex-row",
  ): FormlyFieldConfig {
    return {
      key,
      type: 'repeat',
      templateOptions,
      className: className,
      fieldArray: {
        fieldGroup: [
          config
        ],
      },
    }
  }

  static validation(
    key: string,
    templateOptions: FormlyTemplateOptions = {},
    className: string = "w-full flex flex-row",
  ): FormlyFieldConfig {
    return {
      key,
      type: 'validation',
      templateOptions,
      className: className,
    }
  }

  static expression(
    key: string,
    templateOptions: FormlyTemplateOptions = {},
    className: string = "w-full flex flex-row",
  ): FormlyFieldConfig {
    return {
      key,
      type: 'expression',
      templateOptions,
      className: className,
    }
  }

  static callbackExpression(
    key: string,
    templateOptions: FormlyTemplateOptions = {},
    className: string = "w-full flex flex-row",
  ): FormlyFieldConfig {
    return {
      key,
      type: 'callback-expression',
      templateOptions,
      className: className,
    }
  }

  static multicheckbox(key: string, templateOptions?: FormlyTemplateOptions, options?: any): FormlyFieldConfig {
    return this.field(key, 'multicheckbox', templateOptions, options)
  }

  static number(key: string, templateOptions?: FormlyTemplateOptions, options?: any): FormlyFieldConfig {
    return this.input(key, { ...templateOptions, type: 'number' }, { ...options })
  }

  static integer(key: string, templateOptions?: FormlyTemplateOptions, options?: any): FormlyFieldConfig {
    return this.input(key, { ...templateOptions, type: 'integer' }, { ...options })
  }

  static colorPicker(key: string, templateOptions?: FormlyTemplateOptions, options?: any): FormlyFieldConfig {
    // return this.input(key, { ...templateOptions, type: 'color-picker' }, { ...options })
    return this.field(key, 'color-picker', templateOptions, options)
  }

  static currency(key: string, templateOptions?: FormlyTemplateOptions, options?: any): FormlyFieldConfig {
    return this.input(key, { ...templateOptions, type: 'currency' }, { ...options })
  }

  static password(key: string, templateOptions?: FormlyTemplateOptions, options?: any): FormlyFieldConfig {
    const defaults = {
      label: 'Password',
      type: 'password',
      minLength: 8,
      required: true,
    }

    return this.input(key, { ...defaults, ...templateOptions }, options)
  }

  static radio(key: string, templateOptions?: FormlyTemplateOptions, options?: any): FormlyFieldConfig {
    return this.field(key, 'radio', templateOptions, options)
  }

  static oneOf(optionKey: string, optionTitle: string, titles: string[], options: FormlyFieldConfig[]): FormlyFieldConfig[] {
    return [
      this.radio(optionKey, {
        label: optionTitle,
        options: titles.map((title, index) => ({ label: title, value: index }))
      },
        { className: 'w-full px-1', defaultValue: 0 }),
      ...options.map((config, index) => ({
        ...config,
        hideExpression: (model: any) => { return model[optionKey] !== index }
      })),
    ]
  }

  static toggle(key: string, templateOptions?: FormlyTemplateOptions, options?: any): FormlyFieldConfig {
    return this.field(key, 'toggle', templateOptions, options)
  }

  static url(key: string, templateOptions?: FormlyTemplateOptions, options?: any): FormlyFieldConfig {
    return this.field(key, 'url', templateOptions, options)
  }

  static select(key: string, templateOptions?: FormlyTemplateOptions, options?: any): FormlyFieldConfig {
    return this.field(key, 'select', templateOptions, options)
  }

  static select2Dropdown(key: string, templateOptions?: FormlyTemplateOptions, options?: any): FormlyFieldConfig {
    const to = (templateOptions?.options as any[]) ?? [];
    const items = to.map(el => ({ id: el.value, title: el.label }));
    return this.field(key, 'dropdown', {
      ...templateOptions,
      items,
    }, options)
  }

  static selectSearch2SelectForm(key: string, templateOptions?: FormlyTemplateOptions, options?: any): FormlyFieldConfig {
    console.log({
      key,
      type: 'select-form',
      templateOptions: {
        label: templateOptions?.label,
        variant: templateOptions?.modelName,
        placeholder: "Select",
      },
      ...options
    })
    return {
      key,
      type: 'select-form',
      templateOptions: {
        label: templateOptions?.label,
        variant: templateOptions?.modelName,
        placeholder: "Select",
      },
      ...options
    }
  }

  static selectForm(type: string, key: string, templateOptions?: FormlyTemplateOptions, options?: any): FormlyFieldConfig {
    return this.field(key, type + '-select', templateOptions, options)
  }

  static dropdown(key: string, templateOptions?: FormlyTemplateOptions, options?: any): FormlyFieldConfig {
    return this.field(key, 'dropdown1', templateOptions, options)
  }

  static typeahead(key: string, templateOptions: FormlyTemplateOptions = {}, options: any = {}): FormlyFieldConfig {
    const defaultTemplateOptions = {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      mapFn() { },
    }

    return this.field(key, 'typeahead', templateOptions, options)
  }

  static jsonEditor(key: string, templateOptions: FormlyTemplateOptions = {}, options: any = {}): FormlyFieldConfig {
    return this.field(key, 'json-editor', templateOptions, options)
  }

  static textarea(key: string, templateOptions?: FormlyTemplateOptions, options?: any): FormlyFieldConfig {
    const defaultTemplateOptions = { rows: 5 }

    return this.field(key, 'textarea', { ...defaultTemplateOptions, ...templateOptions }, options)
  }

  static template(template: string): FormlyFieldConfig {
    return { type: 'formly-template', template }
  }

  static time(key: string, templateOptions?: FormlyTemplateOptions, options?: any): FormlyFieldConfig {
    return this.input(key, { ...templateOptions, type: 'time' }, { ...options })
  }



  static card(title: string, fieldGroup: FormlyFieldConfig[] = [],): FormlyFieldConfig {
    return {
      fieldGroup,
      templateOptions: {
        title: title,
      },
      wrappers: ['card'],
      className: 'w-full'
    }
  }

  static collapse(title: string, fieldGroup: FormlyFieldConfig[] = [], className = 'w-full', closed = false): FormlyFieldConfig {
    return {
      fieldGroup,
      templateOptions: {
        title: title,
        closed,
      },
      wrappers: ['collapse'],
      className
    }
  }

  static tabs(fieldGroup: FormlyFieldConfig[] = [], format = 'pills', narrow = false): FormlyFieldConfig {
    return {
      fieldGroup,
      wrappers: ['tabs'],
      className: 'w-full',
      templateOptions: {
        format,
        narrow,
      }
    }
  }

  static tab(label: string, fieldGroup: FormlyFieldConfig[] = [],): FormlyFieldConfig {
    return {
      fieldGroup,
      templateOptions: {
        label: label,
      },
      wrappers: ['tab'],
      className: 'w-full'
    }
  }

  static heading(title: string, subtitle: string): FormlyFieldConfig {
    return {
      type: 'heading',
      templateOptions: {
        title,
        subtitle
      },
      className: 'w-full'
    }
  }

  static title(title: string): FormlyFieldConfig {
    return {
      type: 'title',
      templateOptions: {
        title
      },
      className: "w-full"
    }
  }

  static paragraph(templateOptions: any, config: any): FormlyFieldConfig {
    return {
      type: 'paragraph',
      templateOptions,
      ...config
    }
  }

  static picture(url: string): FormlyFieldConfig {
    return {
      type: 'picture',
      templateOptions: {
        url,
      },
      className: "w-13 h-13"
    }
  }

  /*
{
 key: 'address',
 wrappers: ['panel'],
 templateOptions: { label: 'Address' },
 fieldGroup: [{
   key: 'town',
   type: 'input',
   templateOptions: {
     required: true,
     type: 'text',
     label: 'Town',
   },
 }],
},
];
*/
  static section(
    key: string,
    wrappers: string[],
    templateOptions?: FormlyTemplateOptions,
    fieldGroup: FormlyFieldConfig[] = [],
  ): FormlyFieldConfig {
    return {
      key,
      wrappers,
      templateOptions,
      fieldGroup,
    }
  }
}
