
import { Injectable } from '@nestjs/common'
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { UserCreateUserCalendarInput } from './dto/user-create-user-calendar.input'
import { UserListUserCalendarInput } from './dto/user-list-user-calendar.input'
import { UserUpdateUserCalendarInput } from './dto/user-update-user-calendar.input'


@Injectable()
export class ApiUserCalendarDataAccessUserService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async userUserCalendars(userId: string, input?: UserListUserCalendarInput) {

    return this.data.userCalendar.findMany({
      where: {
            AND: [{
            name: { contains: input?.name },
userId: input?.userId,
teamId: input?.teamId,
calendarId: input?.calendarId,}]
          },
      take: input?.limit,
      skip: input?.skip ,include: { user: true, team: true, calendar: true }
    })
  }


  async userCountUserCalendars(userId: string, input?: UserListUserCalendarInput): Promise<CorePaging> {

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

  async userUserCalendar(userId: string, userCalendarId) {

    return this.data.userCalendar.findUnique({ where: { id: userCalendarId } ,include: { calendarType: true, user: true, team: true, calendar: true } })
  }

  async userCreateUserCalendar(userId: string, input: UserCreateUserCalendarInput) {

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

  
  

  async userUpdateUserCalendar(userId: string, userCalendarId: string, input: UserUpdateUserCalendarInput) {

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

  async userDeleteUserCalendar(userId: string, userCalendarId: string) {
    return this.data.userCalendar.delete({ where: { id: userCalendarId } })
  }
}

