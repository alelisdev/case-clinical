export const fafsaSubmissionFields = [
    {
      "name": "name",
      "null_percentage": 0,
      type: 'string',
formula: null,

    },
{
      "name": "dateSubmitted",
      "null_percentage": 0,
      
      type: 'Datetime',
      min: '01/15/2021',
      max: '01/15/2022',
      format: '%Y-%m-%dT%H:%M:%SZ',
      formula: null,

    },
{
      "name": "studentId",
      "null_percentage": 0,
      
    type: 'Custom List',
    values:[],
    selectionStyle: 'random',
    distribution: null,
    formula: null,

    },
{
      "name": "schoolId",
      "null_percentage": 0,
      
    type: 'Custom List',
    values:[],
    selectionStyle: 'random',
    distribution: null,
    formula: null,

    }
  ];