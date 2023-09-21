import { ApiCoreDataAccessService, CorePaging, CorePagingInput } from '@case-clinical/api/core/data-access';
import { Injectable } from '@nestjs/common'
import { Novu } from '@novu/node';
import { UserCreateNovuNotificationInput } from './dto/user-create-novu-notification.input';
import { UserListNovuNotificationInput } from './dto/user-list-novu-notification.input';
import { formatRelativeTime } from '@case-clinical/shared/util/helpers';

@Injectable()
export class ApiNovuNotificationDataAccessService {
  private novu: Novu

  constructor(private readonly data: ApiCoreDataAccessService) {
    this.novu = new Novu(process.env.NOVU_API_KEY);
  }

  async userNovuNotifications(userId: string, input: UserListNovuNotificationInput) {
    const notifications = await this.data.novuNotification.findMany({
      where: { userId, tag: input.tag ? { contains: input.tag } : undefined, read: input.read },
      orderBy: { createdAt: 'desc' },
      include: { appointment: { include: { appointmentStatus: true, clinicalProvider: true, patient: true, location: true } } },
      take: input?.limit,
      skip: input?.skip
    });
    return notifications.map((notification) => {
      return {
        ...notification,
        when: formatRelativeTime(new Date(notification.createdAt))
      }
    })
  }

  async userCountNovuNotifications(userId: string, input?: UserListNovuNotificationInput): Promise<CorePaging> {
    const total = await this.data.novuNotification.count({ where: { userId, tag: input.tag ? { contains: input.tag } : undefined, read: input.read }, orderBy: { createdAt: 'desc' }, });
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userCreateNovuNotification(userId: string, input: UserCreateNovuNotificationInput) {
    return this.data.novuNotification.create({
      data: {
        name: input.name,
        description: input.description,
        read: input.read ?? false,
        appointmentId: input.appointmentId,
        redirectLink: input.redirectLink,
        tag: input.tag,
        userId: input.userId,
      },
      include: { appointment: true }
    })
  }

  async subscribeNovNotification(userId: string, notificationId: string) {
    const result = await this.data.novuNotification.update({
      where: {
        id: notificationId
      },
      data: {

      },
      include: {
        user: true
      }
    })
    return 0;
  }

  async unsubscribeNovNotification(userId: string, notificationId: string) {
    const result = await this.data.novuNotification.update({
      where: {
        id: notificationId
      },
      data: {
      },
      include: {
        user: true
      }
    })
    return 0;
  }

  async updateReadStatus(notificationId: string) {
    const result = await this.data.novuNotification.update({
      where: {
        id: notificationId
      },
      data: {
        read: true
      },
      include: {
        user: true,
        appointment: true,
      }
    })
    return 0;
  }

  async createSubscriber(userId: string, firstName: string, lastName: string, email: string) {
    await this.novu.subscribers.identify(userId, {
      email,
      firstName,
      lastName,
      // phone: user.phone ?? "",
      // avatar: user.avatarUrl ?? "",
    });
    // Send Greeting Notification To New User, user.id = subscriberId
    this.sendGreetingNotification(userId, email)
  }

  async sendNewUserSignupNotification(email: string) {
    const notification = await this.data.novuNotification.findFirst({
      where: {
        id: 'newusersignup'
      },
      include: {
        user: true
      }
    })
  }

  async sendGreetingNotification(subscriberId: string, email: string) {
    this.novu.trigger('greeting', {
      to: subscriberId,
      payload: {}
    });
  }

  async triggerNotification(subscriberId: string) {
    const novu = new Novu(process.env.NOVU_API_KEY);

    novu.trigger('logisticsfusenotification', {
      to: {
        subscriberId: subscriberId
      },
      payload: {

      }
    });
  }

  async sendAppointmentCheckInRequest(receiverId: string, patientEmail: string, appointmentId: string, patientName: string, apptDate: Date, time: string, location: string) {
    // Send In-App Message and Email Notification to Patient
    this.novu.trigger('appointmentConfirm', {
      to: {
        subscriberId: receiverId,
        email: patientEmail
      },
      payload: {
        id: appointmentId,
        patientName,
        apptDate: apptDate?.toISOString().slice(0, 10),
        time,
        location,
      }
    });

    // Record Notification Details to DB
    this.userCreateNovuNotification(receiverId, {
      name: `patient_appointment_confirmation_${receiverId}_${appointmentId}`,
      description: `
        Recieved appointment checkIn request with ${patientName} at ${apptDate?.toISOString().slice(0, 10)} : ${time} on ${location}
      `,
      read: false,
      appointmentId: appointmentId,
      tag: 'Appointment_CheckIn_Request',
      redirectLink: `/appointments/${appointmentId}/checkIn`,
      userId: receiverId,
    })
  }

  async informAppointmentConfirmed(receiverId: string, patientEmail: string, appointmentId: string, patientName: string, providerName: string, apptDate: Date, time: string, location: string) {
    // Send In-App Message and Email Notification to Patient
    this.novu.trigger('informappointmentconfirmed', {
      to: {
        subscriberId: receiverId,
        email: patientEmail
      },
      payload: {
        patientName,
        providerName,
        apptDate: apptDate?.toISOString().slice(0, 10),
        time,
        location,
      }
    });

    // Record Notification Details to DB
    this.userCreateNovuNotification(receiverId, {
      name: `patient_appointment_confirmation_${receiverId}_${appointmentId}`,
      description: `
        Recieved appointment checkIn request with ${patientName} at ${apptDate?.toISOString().slice(0, 10)} : ${time} on ${location}
      `,
      read: false,
      tag: 'Appointment_CheckIn_Request',
      appointmentId,
      redirectLink: `/appointments/${appointmentId}/checkIn`,
      userId: receiverId,
    })
  }

  async informAppointmentCancelled(receiverId: string, patientEmail: string, appointmentId: string, providerName: string, apptDate: Date, time: string, location: string) {
    // Send In-App Message and Email Notification to Patient
    this.novu.trigger('appointmentCancel', {
      to: {
        subscriberId: receiverId,
        email: patientEmail
      },
      payload: {
        id: appointmentId,
        providerName,
        apptDate: apptDate?.toISOString().slice(0, 10),
        time,
        location,
      }
    });

    // Record Notification Details to DB
    this.userCreateNovuNotification(receiverId, {
      name: `patient_appointment_cancel_${receiverId}_${appointmentId}`,
      description: `
        Cancelled appointment with ${providerName} at ${apptDate?.toISOString().slice(0, 10)} : ${time} on ${location}
      `,
      read: false,
      appointmentId,
      redirectLink: `/appointments`,
      tag: 'Appointment_Cancelled',
      userId: receiverId,
    })
  }

  async sendAppointmentRescheduleNotification(receiverId: string, proivderEmail: string, appointmentId: string, patientName: string, apptDate: Date, time: string, location: string) {
    console.log('sendAppointmentRescheduleNotification')
    // Send In-App Message and Email Notification to Patient
    this.novu.trigger('appointmentreschedule', {
      to: {
        subscriberId: receiverId,
        email: proivderEmail
      },
      payload: {
        id: appointmentId,
        patientName,
        apptDate: apptDate?.toISOString().slice(0, 10),
        time,
        location,
      }
    });

    // Record Notification Details to DB
    this.userCreateNovuNotification(receiverId, {
      name: `provider_reschedule_appointment_${receiverId}_${appointmentId}`,
      description: `
        Reschedule request came from ${patientName} at ${apptDate?.toISOString().slice(0, 10)} : ${time} on ${location}
      `,
      read: false,
      appointmentId,
      redirectLink: `/appointments`,
      tag: 'Reschedule_Requested',
      userId: receiverId,
    })
  }

  async sendAppointmentCheckInNotification(receiverId: string, patientEmail: string, appointmentId: string, providerName: string, apptDate: Date, time: string, location: string) {
    // Send In-App Message and Email Notification to Patient
    this.novu.trigger('appointmentCheckIn', {
      to: {
        subscriberId: receiverId,
        email: patientEmail
      },
      payload: {
        id: appointmentId,
        providerName,
        apptDate: apptDate?.toISOString().slice(0, 10),
        time,
        location,
      }
    });

    // Record Notification Details to DB
    this.userCreateNovuNotification(receiverId, {
      name: `provider_checkedIn_appointment_${receiverId}_${appointmentId}`,
      description: `
        Appointment has been checked from ${providerName} at ${apptDate?.toISOString().slice(0, 10)} : ${time} on ${location}
      `,
      read: false,
      appointmentId,
      redirectLink: `/appointments`,
      tag: 'Medical_Records_Request',
      userId: receiverId,
    })
  }

  async sendAppointmentNotifyNotification(receiverId: string, patientEmail: string, appointmentId: string, patientName: string, apptDate: Date, time: string, location: string) {
    // Send In-App Message and Email Notification to Patient
    this.novu.trigger('appointmentNotify', {
      to: {
        subscriberId: receiverId,
        email: patientEmail
      },
      payload: {
        id: appointmentId,
        patientName,
        apptDate: apptDate?.toISOString().slice(0, 10),
        time,
        location,
      }
    });

    // Record Notification Details to DB
    this.userCreateNovuNotification(receiverId, {
      name: `vendor_appointment_notify_${receiverId}_${appointmentId}`,
      description: `
        Recieved new appointment request with ${patientName} at ${apptDate?.toISOString().slice(0, 10)} : ${time} on ${location}
      `,
      read: false,
      appointmentId,
      redirectLink: `/appointments`,
      tag: 'Appointment_Notify',
      userId: receiverId,
    })
  }

  // Send confirm request to patient
  async confirmRequest(patientId: string, patientEmail: string, appointmentId: string, providerName: string, apptDate: Date, time: string, location: string) {
    // Send In-App Message and Email Notification to Patient
    this.novu.trigger('confirmrequest', {
      to: {
        subscriberId: patientId,
        email: patientEmail
      },
      payload: {
        providerName,
        id: appointmentId,
        apptDate: apptDate?.toISOString().slice(0, 10),
        time,
        location,
      }
    });

    // Record Notification Details to DB
    this.userCreateNovuNotification(patientId, {
      name: `appointment_confirmation_request_${patientId}_${appointmentId}`,
      description: `
        Recieved new appointment confirmation request with ${providerName} at ${apptDate?.toISOString().slice(0, 10)} : ${time} on ${location}
      `,
      read: false,
      appointmentId,
      redirectLink: `/appointments/${appointmentId}/confirm`,
      tag: 'Appointment_Confirm_Request',
      userId: patientId,
    })
  }
}
