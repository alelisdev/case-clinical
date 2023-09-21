cube(`Firm`, {
  sql: `SELECT * FROM dbo."Firm"`,

  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started
  },

  joins: {
    LegalCase: {
      relationship: `hasMany`,
      sql: `${CUBE}.id=${LegalCase.firmid}`
    },
    Attorney: {
      relationship: `hasMany`,
      sql: `${CUBE}.id=${Attorney.firmid}`
    },
  },

  measures: {
    count: {
      type: `count`,
      drillMembers: [id, name, firmstatusid, firmname, city, country, createdby, eulaid, createdat, datecreated, updatedat]
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

    firmstatusnote: {
      sql: `${CUBE}."firmStatusNote"`,
      type: `string`
    },

    firmstatusid: {
      sql: `${CUBE}."firmStatusId"`,
      type: `string`
    },

    firmname: {
      sql: `${CUBE}."firmName"`,
      type: `string`
    },

    address: {
      sql: `address`,
      type: `string`
    },

    address2: {
      sql: `address2`,
      type: `string`
    },

    city: {
      sql: `city`,
      type: `string`
    },

    state: {
      sql: `state`,
      type: `string`
    },

    zip: {
      sql: `zip`,
      type: `string`
    },

    country: {
      sql: `country`,
      type: `string`
    },

    office: {
      sql: `office`,
      type: `string`
    },

    fax: {
      sql: `fax`,
      type: `string`
    },

    webaddress: {
      sql: `${CUBE}."webAddress"`,
      type: `string`
    },

    email: {
      sql: `email`,
      type: `string`
    },

    rating: {
      sql: `rating`,
      type: `string`
    },

    notes: {
      sql: `notes`,
      type: `string`
    },

    donotdisturb: {
      sql: `${CUBE}."doNotDisturb"`,
      type: `string`
    },

    invoiceonly: {
      sql: `${CUBE}."invoiceOnly"`,
      type: `string`
    },

    reductionnotes: {
      sql: `${CUBE}."reductionNotes"`,
      type: `string`
    },

    deceased: {
      sql: `deceased`,
      type: `string`
    },

    createdby: {
      sql: `${CUBE}."createdBy"`,
      type: `string`
    },

    eulaid: {
      sql: `${CUBE}."eulaId"`,
      type: `string`
    },

    createdat: {
      sql: `${CUBE}."createdAt"`,
      type: `time`
    },

    datecreated: {
      sql: `${CUBE}."dateCreated"`,
      type: `time`
    },

    updatedat: {
      sql: `${CUBE}."updatedAt"`,
      type: `time`
    }
  },

  dataSource: `default`
});
