
import { Injectable } from '@nestjs/common'
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'

import { AdminCreateCalendarTypeInput } from './dto/admin-create-calendar-type.input'
import { AdminListCalendarTypeInput } from './dto/admin-list-calendar-type.input'
import { AdminListUserCalendarInput } from '@case-clinical/api/user-calendar/data-access'
import { AdminUpdateCalendarTypeInput } from './dto/admin-update-calendar-type.input'

@Injectable()
export class ApiCalendarTypeDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminCalendarTypes(adminId: string, input?: AdminListCalendarTypeInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.calendarType.findMany({
      where: { 
            name: { 
                contains: input?.name
            }
          },
      take: input?.limit,
      skip: input?.skip , include: {userCalendars: true, } 
    })
  }

  async adminCountCalendarTypes(adminId: string, input?: AdminListCalendarTypeInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)

    const total = await this.data.calendarType.count(
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

  
  async adminCalendarTypeUserCalendars(adminId: string, input?: AdminListUserCalendarInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.userCalendar.findMany({
      where: { 
        AND: [
          { 
            name: { 
                contains: input?.name
            }
          },
          { calendarTypeId: input.calendarTypeId}
        ],
      },
      take: input?.limit,
      skip: input?.skip,
    })
  }

  
  async adminCountCalendarTypeUserCalendars(adminId: string, input?: AdminListUserCalendarInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)

    const total = await this.data.userCalendar.count({where: {calendarTypeId: input.calendarTypeId}})
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }



  async adminCalendarType(adminId: string, calendarTypeId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.calendarType.findUnique({ where: { id: calendarTypeId } , include: {userCalendars: true, } })
  }

  async adminCreateCalendarType(adminId: string, input: AdminCreateCalendarTypeInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.calendarType.create({
      data: { 
  userCalendars: {
                    createMany: {
                        data: {
                            ...input.userCalendars,
                        },
                    },
                },name: input.name, 

}
, include: {userCalendars: true, } 
    })
  }

  async adminUpdateCalendarType(adminId: string, calendarTypeId, input: AdminUpdateCalendarTypeInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.calendarType.update({
      where: { id: calendarTypeId },
      data: {
      name: input.name
}
, include: {userCalendars: true, } 
    })
  }

  async adminDeleteCalendarType(adminId: string, calendarTypeId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.calendarType.delete({ where: { id: calendarTypeId } })
  }
}

