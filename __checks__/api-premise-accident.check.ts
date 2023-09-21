

import {ApiCheck,AssertionBuilder} from '@checkly/cli/constructs'
import * as path from 'path'
import {readFileSync} from 'fs'
import {serviceToken} from './setup'


new ApiCheck('cli-premise-accident-check', {name: 'PremiseAccident API',
  activated: true,
  localSetupScript: readFileSync(path.join(__dirname, 'setup.ts'), 'utf-8'),
  localTearDownScript: readFileSync(path.join(__dirname, 'teardown.ts'), 'utf-8'),
  request: {
    method: 'GET',
    url: 'https://admin-service-uat.caseclinical.com/graphql',
    skipSsl: false,
    followRedirects: true,
    
    headers: [
       {
         key: 'Authorization',
         value: 'Bearer ' + serviceToken
       }
    ],

  bodyType: 'GRAPHQL',
  body: `
query UserPremiseAccidents {
  items: userPremiseAccidents(input: {}) {
    name
  }
  count: userCountPremiseAccidents(input: {}) {
    total
  }
}
    `,
  assertions: [
        AssertionBuilder.jsonBody('$.items').notEmpty()
    ]
  }
})
