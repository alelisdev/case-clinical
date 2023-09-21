cube(`AccidentType`, {
  sql: `SELECT * FROM dbo."AccidentType"`,

  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started
  },

  joins: {
    LegalCase: {
      relationship: `hasMany`,
      sql: `${CUBE}.id=${LegalCase.accidenttypeid}`
    },
  },

  measures: {
    count: {
      type: `count`,
      drillMembers: [id, name, createdat, updatedat]
    }
  },

  dimensions: {
    id: {
      sql: `id`,
      type: `string`,
      primaryKey: true
    },

    name: {
      sql: `name`,
      type: `string`
    },

    createdat: {
      sql: `${CUBE}."createdAt"`,
      type: `time`
    },

    updatedat: {
      sql: `${CUBE}."updatedAt"`,
      type: `time`
    }
  },

  dataSource: `default`
});
