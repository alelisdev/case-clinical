// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  api: '/api',
  graphql: '/graphql',
  port: 3000,
  production: false,
  apiHost: 'http://localhost:3000',
  graphql_http :'http://localhost:3000/graphql',
  graphql_ws : 'ws://localhost:3000/graphql',
  email_api: 'https://email-service-uat.caseclinical.com/mail/v1',
  matrix_chat_url: 'https://chat-service-uat.caseclinical.com',
  matrix_url: 'https://matrix-uat.caseclinical.com',
  dicom_base_url: 'https://dicom-viewer-uat.caseclinical.com/',
  cubejs_url: "http://localhost:3000/cubejs-api/v1",
  inactivityTime: 1800000,
  inactivityAfterNotification: 60000
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error'  // Included with Angular CLI.
