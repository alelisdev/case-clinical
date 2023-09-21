import { ApiCheck, AssertionBuilder, EnvironmentVariable } from '@checkly/cli/constructs'
import { JwtService } from '@nestjs/jwt'

const jwtService = new JwtService({secret: process.env.JWT_SECRET})
const adminUser = process.env.MONITOR_SERVICE_USER
export const serviceToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhZG1pbiIsImlhdCI6MTY3ODczMjE5MX0.QLlmTXqvgJaCTPjxO-wfFkqt_GEgjt9T5d6OwADRlpw'
jwtService.sign({userId: adminUser})
console.log(serviceToken)
