// hello-api.check.ts

import { ApiCheck, AssertionBuilder } from '@checkly/cli/constructs'
import * as path from 'path'
import { readFileSync } from 'fs'
import { serviceToken } from './setup'


new ApiCheck('hello-api-1', {
  name: 'Hello API',
  activated: true,
  localSetupScript: readFileSync(path.join(__dirname, 'setup.ts'), 'utf-8'),
  localTearDownScript: readFileSync(path.join(__dirname, 'teardown.ts'), 'utf-8'),
  maxResponseTime: 30,
  degradedResponseTime: 10,
  request: {
    method: 'GET',
    url: 'https://admin-service-uat.caseclinical.com/graphql',
    skipSsl: false,
    followRedirects: true,
    
    headers: [
       {
         key: 'Authorization',
         value: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhZG1pbiIsImlhdCI6MTY3ODczMjE5MX0.QLlmTXqvgJaCTPjxO-wfFkqt_GEgjt9T5d6OwADRlpw'
       }
    ],

  bodyType: 'GRAPHQL',
  body: `
    query UserWriteOffs {
    items: userWriteOffs(input: {}) {
      name
    }
    count: userCountWriteOffs(input: {}) {
      total
    }
    }
    `,
  assertions: [
        AssertionBuilder.jsonBody('$.items').notEmpty()
    ]
  }
})
