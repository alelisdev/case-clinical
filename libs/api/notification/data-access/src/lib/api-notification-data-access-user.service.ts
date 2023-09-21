
import { Injectable } from '@nestjs/common'
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { UserCreateNotificationInput } from './dto/user-create-notification.input'
import { UserListNotificationInput } from './dto/user-list-notification.input'
import { UserUpdateNotificationInput } from './dto/user-update-notification.input'


@Injectable()
export class ApiNotificationDataAccessUserService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async userNotifications(userId: string, input?: UserListNotificationInput) {

    return this.data.notification.findMany({
      where: {
            AND: [{
            name: { contains: input?.name },
            appointmentId: input.appointmentId,
            userId: input.userId,}]
          },
      take: input?.limit,
      skip: input?.skip ,include: { user: true, appointment: true }
    })
  }


  async userCountNotifications(userId: string, input?: UserListNotificationInput): Promise<CorePaging> {

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

  async userNotification(userId: string, notificationId) {

    return this.data.notification.findUnique({ where: { id: notificationId } ,include: { user: true, appointment: true } })
  }

  async userCreateNotification(userId: string, input: UserCreateNotificationInput) {

    return this.data.notification.create({
      data: {

                user:
                input.userId != null
                ? {
                        connect:  {
                            id: input?.userId
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




  async userUpdateNotification(userId: string, notificationId: string, input: UserUpdateNotificationInput) {

    return this.data.notification.update({
      where: { id: notificationId },
      data: {
      name: input.name,
      title: input.title,
      description: input.description,
      type: input.type,
      icon: input.icon,
      image: input.image,
      appointmentId: input.appointmentId,
      link: input.link,
      useRouter: input.useRouter,
      time: input.time,
      read: input.read,
      userId: input.userId
}
,include: { user: true, appointment: true, }
    })
  }

  async userDeleteNotification(userId: string, notificationId: string) {
    return this.data.notification.delete({ where: { id: notificationId } })
  }
}

