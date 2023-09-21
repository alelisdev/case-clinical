import { SmsAlertChannel, EmailAlertChannel } from '@checkly/cli/constructs'

const sendDefaults = {
  sendFailure: true,
  sendRecovery: true,
  sendDegraded: false,
}

export const smsChannel = new SmsAlertChannel('sms-channel-1', {
  phoneNumber: '8607291467',
  ...sendDefaults
})

export const emailChannel = new EmailAlertChannel('email-channel-1', {
  address: 'michael@pchipa.com',
  ...sendDefaults
})

module.exports = {
  smsChannel,
  emailChannel
}