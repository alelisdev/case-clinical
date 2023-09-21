
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListPatientTreatmentStatusInput } from './dto/user-list-patient-treatment-status.input'

@Injectable()
export class ApiPatientTreatmentStatusDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicPatientTreatmentStatuses(input?: UserListPatientTreatmentStatusInput) {
    let name = input?.name ? input.name : undefined

    return this.data.patientTreatmentStatus.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async publicSelectPatientTreatmentStatuses(input?: UserListPatientTreatmentStatusInput) {
    let name = input?.name ? input.name : undefined

    return this.data.patientTreatmentStatus.findMany({
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

  async publicCountPatientTreatmentStatuses(input?: UserListPatientTreatmentStatusInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.patientTreatmentStatus.count(
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

  async publicPatientTreatmentStatus(patientTreatmentStatusId) {

    return this.data.patientTreatmentStatus.findUnique({ where: { id: patientTreatmentStatusId } , include: {legalCases: true}  })
  }
}


