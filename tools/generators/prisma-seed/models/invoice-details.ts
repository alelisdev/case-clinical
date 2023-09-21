export const invoiceDetailsFields = [
    {
      "name": "invoiceId",
      "null_percentage": 0,
      
    type: 'Custom List',
    values:[],
    selectionStyle: 'random',
    distribution: null,
    formula: null,

    },
{
      "name": "dateOfService",
      "null_percentage": 0,
      
      type: 'Datetime',
      min: '01/02/2021',
      max: '01/02/2022',
      format: '%Y-%m-%dT%H:%M:%SZ',
      formula: null,

    },
{
      "name": "providerName",
      "null_percentage": 0,
      type: 'string',
formula: null,

    },
{
      "name": "procedureDescription",
      "null_percentage": 0,
      type: 'string',
formula: null,

    },
{
      "name": "quantity",
      "null_percentage": 0,
      type: 'string',
formula: null,

    },
{
      "name": "charges",
      "null_percentage": 0,
      type: 'string',
formula: null,

    },
{
      "name": "lineTotal",
      "null_percentage": 0,
      type: 'string',
formula: null,

    }
  ];