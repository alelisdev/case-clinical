
import { Injectable } from '@nestjs/common'
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { UserCreateCalendarInput } from './dto/user-create-calendar.input'
import { UserListCalendarInput } from './dto/user-list-calendar.input'
import { UserUpdateCalendarInput } from './dto/user-update-calendar.input'
import { UserListUserCalendarInput } from '@case-clinical/api/user-calendar/data-access'
import { UserListAppointmentInput } from '@case-clinical/api/appointment/data-access'

@Injectable()
export class ApiCalendarDataAccessUserService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async userCalendars(userId: string, input?: UserListCalendarInput) {

    return this.data.calendar.findMany({
      where: {
            AND: [{
            name: { contains: input?.name },
            }]
          },
      take: input?.limit,
      skip: input?.skip , include: {userCalendars: true,appointments: true, } 
    })
  }


  async userCountCalendars(userId: string, input?: UserListCalendarInput): Promise<CorePaging> {

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

  async userCalendar(userId: string, calendarId) {

    return this.data.calendar.findUnique({ where: { id: calendarId } , include: {userCalendars: true,appointments: true, }  })
  }

  async userCreateCalendar(userId: string, input: UserCreateCalendarInput) {

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

  
  async userCalendarUserCalendars(userId: string, input?: UserListUserCalendarInput) {

    return this.data.userCalendar.findMany({
      where: { 
        AND: [
            { 
            name: { 
                contains: input?.name
            }
          },
          { calendarId: input.calendarId}
        ],
      },
      take: input?.limit,
      skip: input?.skip,
    })
  }


  async userCalendarAppointments(userId: string, input?: UserListAppointmentInput) {

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

  
  // async userCountCalendarUserCalendars(userId: string, input?: UserListUserCalendarInput): Promise<CorePaging> {

  //   const total = await this.data.userCalendar.count({where: {calendarId: input.calendarId}})
  //   return {
  //     limit: input?.limit,
  //     skip: input?.skip,
  //     total,
  //   }
  // }


  async userUpdateCalendar(userId: string, calendarId: string, input: UserUpdateCalendarInput) {

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

  async userDeleteCalendar(userId: string, calendarId: string) {
    return this.data.calendar.delete({ where: { id: calendarId } })
  }
}

