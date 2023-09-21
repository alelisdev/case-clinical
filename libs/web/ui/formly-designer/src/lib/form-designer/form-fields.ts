export const formFields = [
  {
    name: 'LA Icon',
    type: 'Static',
    template: JSON.stringify(
      {
        type: "icon",
        templateOptions: {
          icon: 'hippo',
          size: '2x',
        },
        className: "w-auto h-auto text-amber-300"
      }
    )
  },
  {
    name: 'Circle Progress',
    type: 'Static',
    template: JSON.stringify(
      {
        type: "circle-progress",
        templateOptions: {
        },
        className: "w-auto h-auto"
      }
    )
  },
  {
    name: 'DescriptionList',
    type: 'Static',
    template: JSON.stringify(
      {
        type: "description-list",
        templateOptions: {
          "title": "Title",
          "subtitle": "Subtitle",
          "stripped": true,
          "compact": false,
        },
        className: "w-full"
      }
    )
  },
  {
    name: 'Divider',
    type: 'Static',
    template: JSON.stringify(
      {
        type: "divider",
        templateOptions: {
        },
        className: "w-full"
      }
    )
  },
  {
    name: 'Navs',
    type: 'Static',
    template: JSON.stringify(
      {
        type: "navs",
        templateOptions: {
        },
        className: "w-full"
      }
    )
  },
  {
    name: 'Embed',
    type: 'Static',
    template: JSON.stringify(
      {
        type: "embed",
        templateOptions: {
        },
        className: "w-full"
      }
    )
  },
  {
    name: 'Heading',
    type: 'Static',
    template: JSON.stringify(
      {
        type: "heading",
        templateOptions: {
          "title": "Heading",
          "subtitle": "SubTitle",
        },
        className: "w-full px-1"
      }
    )
  },
  {
    name: 'Label',
    type: 'Static',
    template: JSON.stringify(
      {
        type: "label",
        templateOptions: {
          "dataKey": 'dataKey',
          "label": "Label",
        },
        className: "w-full sm:w-1/2 md:w-1/4 px-1"
      }
    )
  },
  {
    name: 'Link',
    type: 'Static',
    template: JSON.stringify(
      {
        type: "link",
        templateOptions: {
        },
        className: "w-full"
      }
    )
  },
  {
    name: 'Paragraph',
    type: 'Static',
    template: JSON.stringify(
      {
        type: "paragraph",
        templateOptions: {
          html: "Your paragraph",
        },
        className: "text-xl text-red-800 font-normal leading-normal"
      }
    )
  },
  {
    name: 'Picture',
    type: 'Static',
    template: JSON.stringify(
      {
        type: "picture",
        templateOptions: {
          width: 300,
          height: 300,
          url: 'https://dummyimage.com/300x300/222222/fff'
        },
        className: "w-auto h-auto"
      }
    )
  },
  // Label Field
  {
    name: 'Title',
    type: 'Static',
    template: JSON.stringify(
      {
        type: "title",
        templateOptions: {
          "title": "Title",
        },
        className: "w-full sm:w-1/2 md:w-1/4 px-1"
      }
    )
  },

  {
    name: 'Boolean',
    type: 'Basic',
    template: JSON.stringify(
      {
        "key": "checked",
        type: "boolean",
        templateOptions: {
          "label": "Checked",
        },
        className: "w-full sm:w-1/2 md:w-1/4 px-1"
      }
    )
  },
  {
    name: 'Date',
    type: 'Basic',
    template: JSON.stringify(
      {
        "key": "date",
        type: "date",
        templateOptions: {
          "label": "Date",
          "limitTotoday": false
        },
        className: "w-full sm:w-1/2 md:w-1/4 px-1"
      }
    )
  },
  {
    name: 'Time',
    type: 'Basic',
    template: JSON.stringify(
      {
        "key": "time",
        type: "time",
        templateOptions: {
          "label": "Time",
        },
        className: "w-full sm:w-1/2 md:w-1/4 px-1"
      }
    )
  },
  {
    name: 'DateTime',
    type: 'Basic',
    template: JSON.stringify(
      {
        "key": "dateTime",
        type: "datetime",
        templateOptions: {
          "label": "DateTime",
          datepickerOptions: {
            min: '2019-09-10'
          },
          // datepickerOptions: {
          //   max: ''
          // },
        },
        className: "w-full sm:w-1/2 md:w-1/4 px-1"
      }
    )
  },
  {
    name: 'Radio',
    type: 'Basic',
    template: JSON.stringify(
      {
        "key": "radio",
        type: "radio",
        templateOptions: {
          "label": "Radio",
          options: [
            {
              label: 'Male',
              value: 'm',
            },
            {
              label: 'Female',
              value: 'f',
            },
          ]
        },
        className: "w-full sm:w-1/2 md:w-1/4 px-1"
      }
    )
  },
  {
    name: 'Toggle Button',
    type: 'Basic',
    template: JSON.stringify(
      {
        "key": "toggle",
        type: "toggle",
        templateOptions: {
          options: [
            {
              icon: 'hippo',
              label: 'toggle',
            }
          ]
        },
        className: "w-full sm:w-1/2 md:w-1/4 px-1"
      }
    )
  },
  {
    name: 'MultiCheckbox',
    type: 'Basic',
    template: JSON.stringify(
      {
        "key": "multicheck",
        type: "multicheckbox",
        templateOptions: {
          "label": "Category",
          options: [
            {
              label: 'Clothes',
              value: 1,
            },
            {
              label: 'Food',
              value: 2,
            },
          ]
        },
        className: "w-full sm:w-1/2 md:w-1/4 px-1"
      }
    )
  },
  {
    name: 'Dropdown',
    type: 'Basic',
    template: JSON.stringify(
      {
        "key": "dropdown",
        type: "dropdown",
        templateOptions: {
          "label": "Dropdown",
        },
        className: "w-full sm:w-1/2 md:w-1/4 px-1"
      }
    )
  },

  // Input Field
  {
    name: 'Input',
    type: 'Basic',
    template: JSON.stringify(
      {
        "key": "input",
        type: "input",
        templateOptions: {
          "label": "Input",
        },
        className: "w-full sm:w-1/2 md:w-1/4 px-1"
      }
    )
  },
  // Integer Field
  {
    name: 'Integer',
    type: 'Basic',
    template: JSON.stringify(
      {
        "key": "integer",
        type: "integer",
        templateOptions: {
          "label": "Integer"
        },
        className: "w-full sm:w-1/2 md:w-1/4 px-1"
      }
    )
  },
  {
    name: 'MaskedInput',
    type: 'Basic',
    template: JSON.stringify(
      {
        "key": "maskedInput",
        type: "masked-input",
        templateOptions: {
          "label": "Masked Input",
          "mask": "(000) 000-0000"  // Default is phoneNumber mask
        },
        className: "w-full sm:w-1/2 md:w-1/4 px-1"
      }
    )
  },
  {
    name: 'MultiSelect',
    type: 'Basic',
    template: JSON.stringify(
      {
        "key": "multiSelect",
        type: "multi-select",
        templateOptions: {
          "label": "MultiSelect",
        },
        className: "w-full sm:w-1/2 md:w-1/4 px-1"
      }
    )
  },
  // Number Field
  {
    name: 'Number',
    type: 'Basic',
    template: JSON.stringify(
      {
        "key": "number",
        type: "number",
        templateOptions: {
          "label": "Number"
        },
        className: "w-full sm:w-1/2 md:w-1/4 px-1"
      }
    )
  },
  {
    name: 'Password',
    type: 'Basic',
    template: JSON.stringify(
      {
        "key": "password",
        type: "password",
        templateOptions: {
          "label": "Password",
        },
        className: "w-full sm:w-1/2 md:w-1/4 px-1"
      }
    )
  },
  {
    name: 'TextArea',
    type: 'Basic',
    template: JSON.stringify(
      {
        "key": "textArea",
        type: "textarea",
        templateOptions: {
          "label": "Text Area",
          "cols": 1,
          "rows": 3,
        },
        className: "w-full sm:w-1/2 md:w-1/4 px-1"
      }
    )
  },
  {
    name: 'Address Picker',
    type: 'Advanced',
    template: JSON.stringify(
      {
        "key": "address",
        type: "Address-picker",
        templateOptions: {
          "label": "Address",
          "showMap": false,
          "only US": false
        },
        className: "w-full sm:w-1/2 md:w-1/4 px-1"
      }
    )
  },
  {
    name: 'Ring Central',
    type: 'Advanced',
    template: JSON.stringify(
      {
        type: "ring-central",
        templateOptions: {
        },
        className: "w-auto h-auto"
      }
    )
  },
  {
    name: 'Signature Pad',
    type: 'Advanced',
    template: JSON.stringify(
      {
        "key": "signature",
        type: "signature-pad",
        templateOptions: {
          "label": "Sign",
        },
        className: "w-full"
      }
    )
  },
  {
    name: 'File Viewer',
    type: 'Advanced',
    template: JSON.stringify(
      {
        "key": "fileViewer",
        type: "file-viewer",
        templateOptions: {
          "label": "File Viewer",
        },
        className: "w-full"
      }
    )
  },
  {
    name: 'File Preview',
    type: 'Advanced',
    template: JSON.stringify(
      {
        type: "file-preview",
        templateOptions: {

        },
        className: "w-full"
      }
    )
  },
  {
    name: 'Financial Gauge',
    type: 'Advanced',
    template: JSON.stringify(
      {
        type: "financial-gauge",
        templateOptions: {

        },
        className: "w-full"
      }
    )
  },
  {
    name: 'WeatherWidget',
    type: 'Advanced',
    template: JSON.stringify(
      {
        type: "weather",
        templateOptions: {
          "city": "Chicago",
          "Show Details": false
        },
        className: "w-full"
      }
    )
  },
  {
    name: 'Horoscope',
    type: 'Advanced',
    template: JSON.stringify(
      {
        type: "horoscope",
        templateOptions: {
        },
        className: "w-full"
      }
    )
  },
  {
    name: 'Color Picker',
    type: 'Advanced',
    template: JSON.stringify(
      {
        "key": "color",
        type: "color-picker",
        templateOptions: {
          "label": "Color",
        },
        className: "w-full sm:w-1/2 md:w-1/4 px-1"
      }
    )
  },
  {
    name: 'Currency',
    type: 'Advanced',
    template: JSON.stringify(
      {
        "key": "amount",
        type: "currency",
        templateOptions: {
          "label": "Amount"
        },
        className: "w-full sm:w-1/2 md:w-1/4 px-1"
      }
    )
  },
  {
    name: 'Email',
    type: 'Advanced',
    template: JSON.stringify(
      {
        "key": "email",
        type: "email",
        templateOptions: {
          "label": "Email",
        },
        className: "w-full sm:w-1/2 md:w-1/4 px-1"
      }
    )
  },
  {
    name: 'File',
    type: 'Advanced',
    template: JSON.stringify(
      {
        "key": "fileAlias",
        type: "file-new",
        templateOptions: {
          "multiple": false,
          "label": "File",
        },
        className: "w-full sm:w-1/2 md:w-1/4 px-1"
      }
    )
  },
  {
    name: 'Enumeration',
    type: 'Advanced',
    template: JSON.stringify(
      {
        "key": "enum",
        type: "enumeration",
        templateOptions: {
          "label": "Enumeration",
          "dataKey": "",
        },
        className: "w-full sm:w-1/2 md:w-1/4 px-1"
      }
    )
  },
  {
    name: 'Grid',
    type: 'Advanced',
    template: JSON.stringify(
      {
        type: "grid",
        templateOptions: {
          "formKey": "",
        },
        className: "w-full"
      }
    )
  },
  {
    name: 'Json Editor',
    type: 'Advanced',
    template: JSON.stringify(
      {
        "key": "json",
        type: "json-editor",
        templateOptions: {
          "label": "Json Editor",
        },
        className: "w-full sm:w-1/2 md:w-1/4 px-1"
      }
    )
  },
  {
    name: 'MarkDown',
    type: 'Advanced',
    template: JSON.stringify(
      {
        "key": "markdown",
        type: "markdown",
        templateOptions: {
          "label": "Markdown"
        },
        className: "w-full sm:w-1/2 md:w-1/4 px-1"
      }
    )
  },
  {
    name: 'Where Does It Hurt',
    type: 'Advanced',
    template: JSON.stringify(
      {
        type: "where-does-it-hurt",
        templateOptions: {
          label: "Pain Location",
        },
        className: "w-full"
      }
    )
  },
  {
    name: 'MusicWidget',
    type: 'Advanced',
    template: JSON.stringify(
      {
        type: "music-widget",
        templateOptions: {
          title: "Windows Music Player",
        },
        className: "w-full"
      }
    )
  },
  {
    name: 'Contact',
    type: 'Advanced',
    template: JSON.stringify(
      {
        key: "contact",
        type: "contact",
        templateOptions: {
        },
        className: "w-full"
      }
    )
  },
  {
    name: 'RichText',
    type: 'Advanced',
    template: JSON.stringify(
      {
        key: "richText",
        type: "rich-text",
        templateOptions: {
          label: "Rich Text"
        },
        className: "w-full sm:w-1/2 md:w-1/4 px-1"
      }
    )
  },

  {
    name: 'SelectForm',
    type: 'Advanced',
    template: JSON.stringify(
      {
        "key": "selectForm",
        type: "select-form",
        templateOptions: {
          "label": "Select Form",
          "variant": "accident-type",
          "placeholder": "Select",
        },
        className: "w-full sm:w-1/2 md:w-1/4 px-1"
      }
    )
  },
  {
    name: 'WebForm',
    type: 'Advanced',
    template: JSON.stringify(
      {
        type: "web-form",
        templateOptions: {
          "variant": "lead",
        },
        className: "w-full px-1"
      }
    )
  },
  {
    name: 'Formly Modal',
    type: 'Advanced',
    template: JSON.stringify(
      {
        type: "formly-modal",
        templateOptions: {
        },
        className: "w-full px-1"
      }
    )
  },
  // {
  //   name: 'Typeahead',
  //   type: 'Advanced',
  //   template: JSON.stringify(
  //     {
  //       "key": "key",
  //       type: "typeahead",
  //       templateOptions: {
  //         "label": "Label",
  //         "formKey": "",
  //         "submitOnSelect": false,
  //         "placeholder": "Select",
  //         "dataKey": "",
  //         "valuePath": "id",
  //         "searchPath": "name",
  //         "dataPaths": []
  //       },
  //       className: "w-full"
  //     }
  //   )
  // },
  {
    name: 'Url',
    type: 'Advanced',
    template: JSON.stringify(
      {
        "key": "url",
        type: "url",
        templateOptions: {
          "label": 'Url',
        },
        className: "w-full sm:w-1/2 md:w-1/4 px-1"
      }
    )
  },
  {
    name: 'Svg View',
    type: 'Advanced',
    template: JSON.stringify(
      {
        type: "svg-view",
        templateOptions: {
        },
        className: "w-full sm:w-1/2 md:w-1/4 px-1"
      }
    )
  },
  {
    name: 'Pagination',
    type: 'Advanced',
    template: JSON.stringify(
      {
        type: "pagination",
        templateOptions: {
        },
        className: "w-full"
      }
    )
  },
  {
    name: 'Ag Grid',
    type: 'Wrapper',
    template: JSON.stringify({
      wrappers: [
        "ag-grid"
      ],
      templateOptions: {
        backgroundStyle: 'transparent'
      },
      className: "w-full",
    })
  },
  {
    name: 'Ag Grid Column',
    type: 'Wrapper',
    template: JSON.stringify({
      wrappers: [
        "ag-grid-column"
      ],
      templateOptions: {
        backgroundStyle: 'transparent'
      },
      className: "w-full",
    })
  },
  {
    name: 'Button',
    type: 'Wrapper',
    template: JSON.stringify({
      wrappers: [
        "button"
      ],
      templateOptions: {
        backgroundStyle: 'transparent'
      },
      className: "w-full",
    })
  },
  {
    name: 'Calendar',
    type: 'Wrapper',
    template: JSON.stringify({
      wrappers: [
        "calendar"
      ],
      templateOptions: {
      },
      className: "w-full",
    })
  },
  // Card Wrapper
  {
    name: 'Card',
    type: 'Wrapper',
    template: JSON.stringify({
      wrappers: [
        "card"
      ],
      templateOptions: {
        "title": "Card Title",
      },
      className: "w-full",
    })
  },
  {
    name: 'Carousel',
    type: 'Wrapper',
    template: JSON.stringify({
      wrappers: [
        "carousel"
      ],
      templateOptions: {
      },
      className: "w-full",
    })
  },
  {
    name: 'Center',
    type: 'Wrapper',
    template: JSON.stringify({
      wrappers: [
        "center"
      ],
      templateOptions: {
      },
      className: "w-full",
    })
  },
  // Collapse Wrapper
  {
    name: 'Collapse',
    type: 'Wrapper',
    template: JSON.stringify({
      wrappers: [
        "collapse"
      ],
      templateOptions: {
        "title": "Collapse Title",
      },
      className: "w-full",
    })
  },
  {
    name: 'Container',
    type: 'Wrapper',
    template: JSON.stringify({
      wrappers: [
        "container"
      ],
      templateOptions: {
        backgroundStyle: 'transparent'
      },
      className: "w-full",
    })
  },
  {
    name: 'Description',
    type: 'Wrapper',
    template: JSON.stringify({
      wrappers: [
        "description"
      ],
      templateOptions: {
        title: "Title",
        subtitle: "Subtitle",
      },
      className: "w-full",
    })
  },
  {
    name: 'Dropdown Button',
    type: 'Wrapper',
    template: JSON.stringify({
      wrappers: [
        "dropdown-button"
      ],
      templateOptions: {
        backgroundStyle: 'transparent'
      },
      className: "w-full",
    })
  },
  {
    name: 'FieldGroup',
    type: 'Wrapper',
    template: JSON.stringify({
      key: 'group1',
      wrappers: [
        "group"
      ],
      templateOptions: {
      },
      className: "w-full",
    })
  },
  {
    name: 'Full Height',
    type: 'Wrapper',
    template: JSON.stringify({
      wrappers: [
        "full-height"
      ],
      templateOptions: {
      },
      className: "w-full",
    })
  },
  {
    name: 'Flexbox',
    type: 'Wrapper',
    template: JSON.stringify({
      wrappers: [
        "flexbox"
      ],
      templateOptions: {
      },
      className: "w-full",
    })
  },
  {
    name: 'Google Map',
    type: 'Wrapper',
    template: JSON.stringify({
      wrappers: [
        "googlemap"
      ],
      templateOptions: {
        centerlongitude: '-79.189453125',
        centerlatitude: '36.98500309285596',
      },
      className: "w-full",
    })
  },
  {
    name: 'Grid Container',
    type: 'Wrapper',
    template: JSON.stringify({
      wrappers: [
        "grid-container"
      ],
      templateOptions: {
      },
      className: "w-full",
    })
  },
  {
    name: 'Group',
    type: 'Wrapper',
    template: JSON.stringify({
      wrappers: [
        "group"
      ],
      templateOptions: {
      },
      className: "w-full",
    })
  },
  {
    name: 'Horizontal',
    type: 'Wrapper',
    template: JSON.stringify({
      wrappers: ['horizontal'],
      templateOptions: {},
      className: "w-full items-center",
    })
  },
  {
    name: 'Kanban',
    type: 'Wrapper',
    template: JSON.stringify({
      wrappers: [
        "kanban"
      ],
      templateOptions: {
      },
      className: "w-full items-start",
    })
  },
  {
    name: 'Modal',
    type: 'Wrapper',
    template: JSON.stringify({
      wrappers: [
        "modal"
      ],
      templateOptions: {
      },
      className: "w-full",
    })
  },
  {
    name: 'Nav Bar',
    type: 'Wrapper',
    template: JSON.stringify({
      wrappers: [
        "navbar"
      ],
      templateOptions: {
      },
      className: "w-full",
    })
  },
  {
    name: 'OverviewHeader',
    type: 'Wrapper',
    template: JSON.stringify({
      wrappers: [
        "overview-header"
      ],
      templateOptions: {
      },
      className: "w-full",
    })
  },
  {
    name: 'Repeat',
    type: 'Wrapper',
    template: JSON.stringify({
      "key": "tasks",
      "isArray": true,
      type: 'repeat',
      wrappers: ['card'],
      templateOptions: {
        title: 'Tasks'
      },
      "fieldArray": {

      },
      className: "w-full",
    })
  },
  {
    name: 'Router',
    type: 'Wrapper',
    template: JSON.stringify({
      wrappers: [
        "router"
      ],
      templateOptions: {
      },
      className: "w-full no-underline",
    })
  },
  // Stepper Wrapper
  {
    name: 'Stepper',
    type: 'Wrapper',
    template: JSON.stringify({
      wrappers: ["stepper"],
      templateOptions: {
      },
      className: "w-full",
    })
  },
  {
    name: 'Step',
    type: 'Wrapper',
    template: JSON.stringify({
      wrappers: [
        "step"
      ],
      templateOptions: {
        "label": 'Step'
      },
      className: "w-full",
    })
  },
  {
    name: 'Split',
    type: 'Wrapper',
    template: JSON.stringify({
      wrappers: [
        "split"
      ],
      templateOptions: {
      },
      className: "w-full",
    })
  },
  {
    name: 'Table of Contents',
    type: 'Wrapper',
    template: JSON.stringify({
      wrappers: [
        "table-of-contents"
      ],
      templateOptions: {

      },
      className: "w-full",
    })
  },
  {
    name: 'Table Content Section',
    type: 'Wrapper',
    template: JSON.stringify({
      wrappers: [
        "table-of-contents-section"
      ],
      templateOptions: {

      },
      className: "w-full",
    })
  },
  {
    name: 'Timeline Stepper',
    type: 'Wrapper',
    template: JSON.stringify({
      wrappers: ['timeline-stepper'],
      templateOptions: {},
      className: "w-full",
    })
  },
  {
    name: 'Timeline Step',
    type: 'Wrapper',
    template: JSON.stringify({
      wrappers: ['timeline-step'],
      templateOptions: {},
      className: "w-full",
    })
  },
  {
    name: 'ToolTip',
    type: 'Wrapper',
    template: JSON.stringify({
      wrappers: [
        "tooltip"
      ],
      templateOptions: {
      },
      className: "w-full",
    })
  },
  {
    name: 'Table',
    type: 'Wrapper',
    template: JSON.stringify({
      wrappers: [
        "table"
      ],
      templateOptions: {
      },
      className: "w-full",
    })
  },
  {
    name: 'TableRow',
    type: 'Wrapper',
    template: JSON.stringify({
      wrappers: [
        "table-row"
      ],
      templateOptions: {
      },
      className: "w-full",
    })
  },
  {
    name: 'TableColumn',
    type: 'Wrapper',
    template: JSON.stringify({
      wrappers: [
        "table-column"
      ],
      templateOptions: {
      },
      className: "w-full",
    })
  },
  // Tabs Wrapper
  {
    name: 'Tabs',
    type: 'Wrapper',
    template: JSON.stringify({
      wrappers: [
        "tabs"
      ],
      templateOptions: {
      },
      className: "w-full",
    })
  },
  // Tab Wrapper
  {
    name: 'Tab',
    type: 'Wrapper',
    template: JSON.stringify({
      wrappers: [
        "tab"
      ],
      templateOptions: {
        "label": 'Tab',
        "icon": "user",
        "badge": 0
      },
      className: "w-full",
    })
  },
  {
    name: 'Vertical',
    type: 'Wrapper',
    template: JSON.stringify({
      wrappers: [
        "vertical"
      ],
      templateOptions: {
      },
      className: "w-full items-start",
    })
  },
  {
    name: 'Overview',
    type: 'Dashboard',
    template: JSON.stringify({
      type: "overview",
      templateOptions: {
        "title": "Due Tasks",
        "summary": 567,
        "subtitle": "Completed",
        "subsummary": 134,
        "color": "#0000ff"
      },
      className: "w-full",
    })
  },
  {
    name: 'Angular Chart',
    type: 'Dashboard',
    template: JSON.stringify({
      type: "ag-chart",
      templateOptions: {
      },
      className: "w-full",
    })
  },
  {
    name: 'Line Chart',
    type: 'Dashboard',
    template: JSON.stringify({
      type: "chart",
      templateOptions: {
      },
      className: "w-full",
    })
  },
  {
    name: 'Bar Chart',
    type: 'Dashboard',
    template: JSON.stringify({
      type: "bar-chart",
      templateOptions: {
      },
      className: "w-full",
    })
  },
  {
    name: 'Column Chart',
    type: 'Dashboard',
    template: JSON.stringify({
      type: "column-chart",
      templateOptions: {
      },
      className: "w-full",
    })
  },
  {
    name: 'Area Chart',
    type: 'Dashboard',
    template: JSON.stringify({
      type: "area-chart",
      templateOptions: {
      },
      className: "w-full",
    })
  },
  {
    name: 'Pie Chart',
    type: 'Dashboard',
    template: JSON.stringify({
      type: "pie-chart",
      templateOptions: {
      },
      className: "w-full",
    })
  },
  {
    name: 'PolarArea Chart',
    type: 'Dashboard',
    template: JSON.stringify({
      type: "polar-area-chart",
      templateOptions: {
      },
      className: "w-full",
    })
  },
  {
    name: 'Radar Chart',
    type: 'Dashboard',
    template: JSON.stringify({
      type: "radar-chart",
      templateOptions: {
      },
      className: "w-full",
    })
  },
  {
    name: 'Radial Chart',
    type: 'Dashboard',
    template: JSON.stringify({
      type: "radial-chart",
      templateOptions: {
      },
      className: "w-full",
    })
  },
  {
    name: 'Timeline Chart',
    type: 'Dashboard',
    template: JSON.stringify({
      type: "time-line",
      templateOptions: {
      },
      className: "w-full",
    })
  },
  {
    name: 'Rating Bar',
    type: 'Basic',
    template: JSON.stringify(
      {
        type: "ratingbar",
        templateOptions: {
          max: 5,
          rating: 3.14
        },
        className: "w-full"
      }
    )
  },
]
