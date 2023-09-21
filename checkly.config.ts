import { defineConfig } from '@checkly/cli'
import { smsChannel, emailChannel } from './alert-channels'

export default defineConfig({
 projectName: 'Case Clinical Monitoring',
 logicalId: 'case-clinical-2-monitoring-1',
 repoUrl: 'https://github.com/schemadriven/case-clinical-2',
 checks: {
   activated: true,
   muted: false,
   runtimeId: '2022.10',
   frequency: 5,
   locations: ['us-east-1', 'us-west-1'],
   tags: ['website', 'api'],
   alertChannels: [smsChannel, emailChannel],
   checkMatch: '**/__checks__/*.check.ts',
   ignoreDirectoriesMatch: [],
   browserChecks: {
     frequency: 10,
     testMatch: '**/tests/*.spec.ts',
   },
 },
 cli: {
   runLocation: 'us-east-1',
 }
})