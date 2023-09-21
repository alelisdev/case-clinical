

import {ApiCheck,AssertionBuilder} from '@checkly/cli/constructs'
import * as path from 'path'
import {readFileSync} from 'fs'
import {serviceToken} from './setup'


new ApiCheck('cli-case-pre-problem-check', {name: 'CasePreProblem API',
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
query UserCasePreProblems {
  items: userCasePreProblems(input: {}) {
    name
  }
  count: userCountCasePreProblems(input: {}) {
    total
  }
}
    `,
  assertions: [
        AssertionBuilder.jsonBody('$.items').notEmpty()
    ]
  }
})
