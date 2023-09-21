cube(`Attorney`, {
  sql: `SELECT * FROM dbo."Attorney"`,

  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started
  },

  joins: {
    LegalCase: {
      relationship: `hasMany`,
      sql: `${CUBE}.id=${LegalCase.attorneyid}`
    },
  },

  measures: {
    count: {
      type: `count`,
      drillMembers: [id, name, firmid, attorneystatusid, attorneytypeid, title, firstname, lastname, city, createdbyid, createdat, datecreated, updatedat]
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

    firmid: {
      sql: `${CUBE}."firmId"`,
      type: `string`
    },

    attorneystatusid: {
      sql: `${CUBE}."attorneyStatusId"`,
      type: `string`
    },

    attorneytypeid: {
      sql: `${CUBE}."attorneyTypeId"`,
      type: `string`
    },

    title: {
      sql: `title`,
      type: `string`
    },

    firstname: {
      sql: `${CUBE}."firstName"`,
      type: `string`
    },

    lastname: {
      sql: `${CUBE}."lastName"`,
      type: `string`
    },

    address: {
      sql: `address`,
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

    email: {
      sql: `email`,
      type: `string`
    },

    direct: {
      sql: `direct`,
      type: `string`
    },

    fax: {
      sql: `fax`,
      type: `string`
    },

    cellphone: {
      sql: `${CUBE}."cellPhone"`,
      type: `string`
    },

    barnumber: {
      sql: `${CUBE}."barNumber"`,
      type: `string`
    },

    barstate: {
      sql: `${CUBE}."barState"`,
      type: `string`
    },

    donotdisturb: {
      sql: `${CUBE}."doNotDisturb"`,
      type: `string`
    },

    temp: {
      sql: `temp`,
      type: `string`
    },

    createdbyid: {
      sql: `${CUBE}."createdById"`,
      type: `string`
    },

    removed: {
      sql: `removed`,
      type: `string`
    },

    migsource: {
      sql: `${CUBE}."migSource"`,
      type: `string`
    },

    entity: {
      sql: `entity`,
      type: `string`
    },

    firmnolongerneeded: {
      sql: `${CUBE}."firmNolongerNeeded"`,
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
