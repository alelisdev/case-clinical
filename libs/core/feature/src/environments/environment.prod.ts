export const environment = {
  api: '/api',
  graphql: '/graphql',
  production: true,
  port: 443,
  apiHost: 'https://case-clinical-api.azurewebsites.net',
  graphql_http :'https://case-clinical-api.azurewebsites.net/graphql',
  graphql_ws : 'wss://case-clinical-api.azurewebsites.net/graphql',
  email_api: 'https://email-service.caseclinical.com/mail/v1',
  matrix_chat_url: 'https://chat-service.caseclinical.com',
  matrix_url: 'https://matrix.caseclinical.com',
  dicom_base_url: 'https://dicom-viewer-uat.caseclinical.com/',
  inactivityTime: 1800000,
  inactivityAfterNotification: 60000
}
