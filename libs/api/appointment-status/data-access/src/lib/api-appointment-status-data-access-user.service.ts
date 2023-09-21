
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateAppointmentStatusInput } from './dto/user-create-appointment-status.input'
import { UserListAppointmentStatusInput } from './dto/user-list-appointment-status.input'
import { UserUpdateAppointmentStatusInput } from './dto/user-update-appointment-status.input'
import { UserUpdateAppointmentStatusesInput } from './dto/user-update-appointment-statuses.input'



@Injectable()
export class ApiAppointmentStatusDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userAppointmentStatuses(userId: string, input?: UserListAppointmentStatusInput) {
    let name = input?.name ? input.name : undefined

    return this.data.appointmentStatus.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async userSelectAppointmentStatuses(userId: string, input?: UserListAppointmentStatusInput) {
    let name = input?.name ? input.name : undefined

    return this.data.appointmentStatus.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async userCountAppointmentStatuses(userId: string, input?: UserListAppointmentStatusInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.appointmentStatus.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userAppointmentStatus(userId: string, appointmentStatusId) {

    return this.data.appointmentStatus.findUnique({ where: { id: appointmentStatusId } , include: {appointments: {include: { location: true, patient: true, clinicalProvider: {include:{clinicalProviderSpecialties:true}}, legalCase: true, appointmentStatus: true }}}  })
  }

  async checkAppointmentStatusExist(appointmentStatusName: string) {
    try {
      return this.data.appointmentStatus.findMany({ where: { name: appointmentStatusName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateAppointmentStatus(userId: string, input: UserCreateAppointmentStatusInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const appointmentStatusData = await this.checkAppointmentStatusExist(input.name)

        if (appointmentStatusData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'AppointmentStatus', 'Create', input)

    let appointmentStatus = await this.data.appointmentStatus.create({
      data: { 
name: input.name, 

}
, include: {appointments: true} 
    })

    await this.data.logEvent(sendingUser, false, 'AppointmentStatus', 'Create', appointmentStatus)

    return appointmentStatus

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Appointment Status')
    }

  }


  
  

  async userUpdateAppointmentStatus(userId: string, appointmentStatusId: string, input: UserUpdateAppointmentStatusInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!appointmentStatusId) {
        throw new BadRequestException('Appointment Status Id is required')
      } else {

      const appointmentStatusData = await this.checkAppointmentStatusExist(input.name)

      if (appointmentStatusData.length > 0) {
        if (appointmentStatusData[0].id != appointmentStatusId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'AppointmentStatus', 'Update', input)

    let appointmentStatus = this.data.appointmentStatus.update({
      where: { id: appointmentStatusId },
      data: {
name: input.name, 

}
, include: {appointments: {include: { location: true, patient: true, clinicalProvider: {include:{clinicalProviderSpecialties:true}}, legalCase: true, appointmentStatus: true }}} 
    })

    await this.data.logEvent(sendingUser, false, 'AppointmentStatus', 'Update', appointmentStatus)

    return appointmentStatus

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Appointment Status')
    }
  }

  async userUpdateAppointmentStatuses(userId: string, input: UserUpdateAppointmentStatusesInput): Promise<UpdateResult> {
    const total = input.appointmentStatuses.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.appointmentStatuses) {
      const inputData = input.appointmentStatuses[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 

      }

      const appointmentStatusData = await this.checkAppointmentStatusExist(inputData.name)

      if (appointmentStatusData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.appointmentStatus.upsert({
            where: { id: inputData.id || '' },
            create: data,
            update: data,
          })

          if (result.id === inputData.id) updated.push(result)
          else {
            created.push(result)
          }
        } catch (error) {
          failed.push(inputData)
        }
      }
    }

    return {
      total,
      created: JSON.stringify(created),
      updated: JSON.stringify(updated),
      failed: JSON.stringify(failed),
    }
  }


  async userDeleteAppointmentStatus(userId: string, appointmentStatusId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!appointmentStatusId) {
        throw new BadRequestException('Appointment Status Id is required')
      } else {

        const appointmentCount = await this.data.appointment.count({ where: { appointmentStatusId: appointmentStatusId }})
        if(appointmentCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on an Appointment')
        }

        await this.data.logEvent(sendingUser, true, 'AppointmentStatus', 'Delete', appointmentStatusId)

        let appointmentStatus = this.data.appointmentStatus.delete({
          where: { id: appointmentStatusId }
        })

        await this.data.logEvent(sendingUser, false, 'AppointmentStatus', 'Delete', appointmentStatus)

        return appointmentStatus

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Appointment Status')
    }
  }
}

