
import { Injectable } from '@nestjs/common'
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'

import { AdminCreateNotificationInput } from './dto/admin-create-notification.input'
import { AdminListNotificationInput } from './dto/admin-list-notification.input'

import { AdminUpdateNotificationInput } from './dto/admin-update-notification.input'

@Injectable()
export class ApiNotificationDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminNotifications(adminId: string, input?: AdminListNotificationInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.notification.findMany({
      where: {
            name: {
                contains: input?.name
            }
          },
      take: input?.limit,
      skip: input?.skip ,include: { user: true, appointment: true }
    })
  }

  async adminCountNotifications(adminId: string, input?: AdminListNotificationInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)

    const total = await this.data.notification.count(
    {
      where: {
            name: {
                contains: input?.name
            }
          }
        }
        )

    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }




  async adminNotification(adminId: string, notificationId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.notification.findUnique({ where: { id: notificationId } ,include: { user: true, appointment: true }})
  }

  async adminCreateNotification(adminId: string, input: AdminCreateNotificationInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.notification.create({
      data: {

                user:
                input.userId != null
                ? {
                        connect:  {
                            id: input.userId
                        }
                    }: undefined,name: input.name,
                    appointment: input.appointmentId ? { connect: { id: input.appointmentId } } : undefined,
title: input.title,
description: input.description,
type: input.type,
icon: input.icon,
image: input.image,
link: input.link,
useRouter: input.useRouter,
time: input.time,
read: input.read,

}
,include: { user: true, appointment: true }
    })
  }

  async adminUpdateNotification(adminId: string, notificationId, input: AdminUpdateNotificationInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.notification.update({
      where: { id: notificationId },
      data: {
      name: input.name,
      title: input.title,
      description: input.description,
      type: input.type,
      icon: input.icon,
      image: input.image,
      link: input.link,
      useRouter: input.useRouter,
      time: input.time,
      read: input.read,
      userId: input.userId
}
,include: { user: true, appointment: true }
    })
  }

  async adminDeleteNotification(adminId: string, notificationId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.notification.delete({ where: { id: notificationId } })
  }
}

