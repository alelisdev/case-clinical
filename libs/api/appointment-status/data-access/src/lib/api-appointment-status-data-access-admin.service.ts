
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateAppointmentStatusInput } from './dto/admin-create-appointment-status.input'
import { AdminListAppointmentStatusInput } from './dto/admin-list-appointment-status.input'

import { AdminUpdateAppointmentStatusInput } from './dto/admin-update-appointment-status.input'

@Injectable()
export class ApiAppointmentStatusDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminAppointmentStatuses(adminId: string, input?: AdminListAppointmentStatusInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.appointmentStatus.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async adminCountAppointmentStatuses(adminId: string, input?: AdminListAppointmentStatusInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.appointmentStatus.count(
    {
      where: { 
            name: { 
                contains: name
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

  
  

  async adminAppointmentStatus(adminId: string, appointmentStatusId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.appointmentStatus.findUnique({ where: { id: appointmentStatusId } , include: {appointments: true} })
  }

  async checkAppointmentStatusExist(appointmentStatusName: string) {
    try {
      return this.data.appointmentStatus.findMany({ where: { name: appointmentStatusName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateAppointmentStatus(adminId: string, input: AdminCreateAppointmentStatusInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const appointmentStatusData = await this.checkAppointmentStatusExist(input.name)

      if (appointmentStatusData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.appointmentStatus.create({
          data: { 
    name: input.name, 

    }
    , include: {appointments: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateAppointmentStatus(adminId: string, appointmentStatusId, input: AdminUpdateAppointmentStatusInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.appointmentStatus.update({
      where: { id: appointmentStatusId },
      data: {
name: input.name, 

}
, include: {appointments: true} 
    })
  }

  async adminDeleteAppointmentStatus(adminId: string, appointmentStatusId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.appointmentStatus.delete({ where: { id: appointmentStatusId } })
  }
}

