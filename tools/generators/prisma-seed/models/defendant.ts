export const defendantFields = [
    {
      "name": "name",
      "null_percentage": 0,
      type: 'string',
formula: null,

    },
{
      "name": "serviceDate",
      "null_percentage": 0,
      
      type: 'Datetime',
      min: '01/17/2021',
      max: '01/17/2022',
      format: '%Y-%m-%dT%H:%M:%SZ',
      formula: null,

    },
{
      "name": "dateServed",
      "null_percentage": 0,
      
      type: 'Datetime',
      min: '01/17/2021',
      max: '01/17/2022',
      format: '%Y-%m-%dT%H:%M:%SZ',
      formula: null,

    },
{
      "name": "notes",
      "null_percentage": 0,
      type: 'string',
formula: null,

    },
{
      "name": "spoilationExists",
      "null_percentage": 0,
      type: 'string',
formula: null,

    },
{
      "name": "legalCaseId",
      "null_percentage": 0,
      
    type: 'Custom List',
    values:[],
    selectionStyle: 'random',
    distribution: null,
    formula: null,

    },
{
      "name": "defendantId",
      "null_percentage": 0,
      
    type: 'Custom List',
    values:[],
    selectionStyle: 'random',
    distribution: null,
    formula: null,

    },
{
      "name": "attorneyId",
      "null_percentage": 0,
      
    type: 'Custom List',
    values:[],
    selectionStyle: 'random',
    distribution: null,
    formula: null,

    }
  ];