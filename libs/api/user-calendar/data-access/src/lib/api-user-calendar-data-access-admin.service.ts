
import { Injectable } from '@nestjs/common'
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'

import { AdminCreateUserCalendarInput } from './dto/admin-create-user-calendar.input'
import { AdminListUserCalendarInput } from './dto/admin-list-user-calendar.input'

import { AdminUpdateUserCalendarInput } from './dto/admin-update-user-calendar.input'

@Injectable()
export class ApiUserCalendarDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminUserCalendars(adminId: string, input?: AdminListUserCalendarInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.userCalendar.findMany({
      where: { 
            name: { 
                contains: input?.name
            }
          },
      take: input?.limit,
      skip: input?.skip ,include: { calendarType: true, user: true, team: true, calendar: true }
    })
  }

  async adminCountUserCalendars(adminId: string, input?: AdminListUserCalendarInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)

    const total = await this.data.userCalendar.count(
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

  
  

  async adminUserCalendar(adminId: string, userCalendarId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.userCalendar.findUnique({ where: { id: userCalendarId } ,include: { calendarType: true, user: true, team: true, calendar: true }})
  }

  async adminCreateUserCalendar(adminId: string, input: AdminCreateUserCalendarInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.userCalendar.create({
      data: { 
  
            calendarType: 
            input.calendarTypeId != null
            ? {
                    connect:  { 
                        id: input.calendarTypeId
                    }
                }: undefined,  
            user: 
            input.userId != null
            ? {
                    connect:  { 
                        id: input.userId
                    }
                }: undefined,  
            team: 
            input.teamId != null
            ? {
                    connect:  { 
                        id: input.teamId
                    }
                }: undefined,  
            calendar: 
            input.calendarId != null
            ? {
                    connect:  { 
                        id: input.calendarId
                    }
                }: undefined,name: input.name, 

}
,include: { calendarType: true, user: true, team: true, calendar: true }
    })
  }

  async adminUpdateUserCalendar(adminId: string, userCalendarId, input: AdminUpdateUserCalendarInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.userCalendar.update({
      where: { id: userCalendarId },
      data: {
      name: input.name,
      calendarTypeId: input.calendarTypeId,
      userId: input.userId,
      teamId: input.teamId,
      calendarId: input.calendarId
}
,include: { calendarType: true, user: true, team: true, calendar: true }
    })
  }

  async adminDeleteUserCalendar(adminId: string, userCalendarId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.userCalendar.delete({ where: { id: userCalendarId } })
  }
}

