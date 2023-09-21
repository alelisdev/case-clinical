

import {ApiCheck,AssertionBuilder} from '@checkly/cli/constructs'
import * as path from 'path'
import {readFileSync} from 'fs'
import {serviceToken} from './setup'


new ApiCheck('cli-prior-authorization-procedure-code-check', {name: 'PriorAuthorizationProcedureCode API',
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
query UserPriorAuthorizationProcedureCodes {
  items: userPriorAuthorizationProcedureCodes(input: {}) {
    name
  }
  count: userCountPriorAuthorizationProcedureCodes(input: {}) {
    total
  }
}
    `,
  assertions: [
        AssertionBuilder.jsonBody('$.items').notEmpty()
    ]
  }
})
