
import { Injectable } from '@nestjs/common'
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { UserCreateCalendarTypeInput } from './dto/user-create-calendar-type.input'
import { UserListCalendarTypeInput } from './dto/user-list-calendar-type.input'
import { UserUpdateCalendarTypeInput } from './dto/user-update-calendar-type.input'
import { UserListUserCalendarInput } from '@case-clinical/api/user-calendar/data-access'

@Injectable()
export class ApiCalendarTypeDataAccessUserService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async userCalendarTypes(userId: string, input?: UserListCalendarTypeInput) {

    return this.data.calendarType.findMany({
      where: {
            AND: [{
            name: { contains: input?.name },
            }]
          },
      take: input?.limit,
      skip: input?.skip , include: {userCalendars: true, } 
    })
  }


  async userCountCalendarTypes(userId: string, input?: UserListCalendarTypeInput): Promise<CorePaging> {

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

  async userCalendarType(userId: string, calendarTypeId) {

    return this.data.calendarType.findUnique({ where: { id: calendarTypeId } , include: {userCalendars: true, }  })
  }

  async userCreateCalendarType(userId: string, input: UserCreateCalendarTypeInput) {

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

  
  async userCalendarTypeUserCalendars(userId: string, input?: UserListUserCalendarInput) {

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

  
  async userCountCalendarTypeUserCalendars(userId: string, input?: UserListUserCalendarInput): Promise<CorePaging> {

    const total = await this.data.userCalendar.count({where: {calendarTypeId: input.calendarTypeId}})
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }



  async userUpdateCalendarType(userId: string, calendarTypeId: string, input: UserUpdateCalendarTypeInput) {

    return this.data.calendarType.update({
      where: { id: calendarTypeId },
      data: {
      name: input.name
}
, include: {userCalendars: true, } 
    })
  }

  async userDeleteCalendarType(userId: string, calendarTypeId: string) {
    return this.data.calendarType.delete({ where: { id: calendarTypeId } })
  }
}

