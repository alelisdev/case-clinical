cube(`LegalCaseStats`, {
  sql: `
  SELECT
	LegalCase.id,
	AccidentType.name AS AccidentType,
	Firm.name AS Firm,
	Attorney.name AS Attorney
FROM
	LegalCase
	RIGHT JOIN AccidentType ON LegalCase.accidentTypeId= AccidentType.id
	LEFT JOIN Firm ON LegalCase.firmId= Firm.id
	LEFT JOIN Attorney ON LegalCase.attorneyId= Attorney.id
  `,
  measures: {
    count: {
      type: `count`,
      sql: `id`
    },
  },
  dimensions: {
    firm: {
      sql: `Firm`,
      type: `string`
    },
    accidentType: {
      sql: `AccidentType`,
      type: `string`
    },
    attorney: {
      sql: `Attorney`,
      type: `string`
    },

  }
})
