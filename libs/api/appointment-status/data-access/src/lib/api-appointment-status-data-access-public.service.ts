
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListAppointmentStatusInput } from './dto/user-list-appointment-status.input'

@Injectable()
export class ApiAppointmentStatusDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicAppointmentStatuses(input?: UserListAppointmentStatusInput) {
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

  async publicSelectAppointmentStatuses(input?: UserListAppointmentStatusInput) {
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

  async publicCountAppointmentStatuses(input?: UserListAppointmentStatusInput): Promise<CorePaging> {

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

  async publicAppointmentStatus(appointmentStatusId) {

    return this.data.appointmentStatus.findUnique({ where: { id: appointmentStatusId } , include: {appointments: true}  })
  }
}


