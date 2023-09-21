
import { Injectable } from '@nestjs/common'
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'

import { AdminCreateCalendarInput } from './dto/admin-create-calendar.input'
import { AdminListCalendarInput } from './dto/admin-list-calendar.input'
import { AdminListUserCalendarInput } from '@case-clinical/api/user-calendar/data-access'
import { AdminListAppointmentInput } from '@case-clinical/api/appointment/data-access'
import { AdminUpdateCalendarInput } from './dto/admin-update-calendar.input'

@Injectable()
export class ApiCalendarDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminCalendars(adminId: string, input?: AdminListCalendarInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.calendar.findMany({
      where: { 
            name: { 
                contains: input?.name
            }
          },
      take: input?.limit,
      skip: input?.skip , include: {userCalendars: true,appointments: true, } 
    })
  }

  async adminCountCalendars(adminId: string, input?: AdminListCalendarInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)

    const total = await this.data.calendar.count(
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

  
  async adminCalendarUserCalendars(adminId: string, input?: AdminListUserCalendarInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.userCalendar.findMany({
      where: { 
        AND: [
          { 
            name: { 
                contains: input?.name
            }
          },
        ],
      },
      take: input?.limit,
      skip: input?.skip,
    })
  }


  async adminCalendarAppointments(adminId: string, input?: AdminListAppointmentInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.appointment.findMany({
      where: { 
        AND: [
          { 
            name: { 
                contains: input?.name
            }
          },
        ],
      },
      take: input?.limit,
      skip: input?.skip,
    })
  }

  
  async adminCountCalendarUserCalendars(adminId: string, input?: AdminListUserCalendarInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)

    const total = await this.data.userCalendar.count({where: {calendarId: input.calendarId}})
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }


  async adminCalendar(adminId: string, calendarId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.calendar.findUnique({ where: { id: calendarId } , include: {userCalendars: true,appointments: true, } })
  }

  async adminCreateCalendar(adminId: string, input: AdminCreateCalendarInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.calendar.create({
      data: { 
  userCalendars: {
                    createMany: {
                        data: {
                            ...input.userCalendars,
                        },
                    },
                },  appointments: {
                    createMany: {
                        data: {
                            ...input.appointments,
                        },
                    },
                },name: input.name, 
color: input.color, 
visible: input.visible, 

}
, include: {userCalendars: true,appointments: true, } 
    })
  }

  async adminUpdateCalendar(adminId: string, calendarId, input: AdminUpdateCalendarInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.calendar.update({
      where: { id: calendarId },
      data: {
      name: input.name,
      color: input.color,
      visible: input.visible
}
, include: {userCalendars: true,appointments: true, } 
    })
  }

  async adminDeleteCalendar(adminId: string, calendarId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.calendar.delete({ where: { id: calendarId } })
  }
}

