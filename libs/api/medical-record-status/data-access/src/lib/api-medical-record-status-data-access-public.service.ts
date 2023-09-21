
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListMedicalRecordStatusInput } from './dto/user-list-medical-record-status.input'

@Injectable()
export class ApiMedicalRecordStatusDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicMedicalRecordStatuses(input?: UserListMedicalRecordStatusInput) {
    let name = input?.name ? input.name : undefined

    return this.data.medicalRecordStatus.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async publicSelectMedicalRecordStatuses(input?: UserListMedicalRecordStatusInput) {
    let name = input?.name ? input.name : undefined

    return this.data.medicalRecordStatus.findMany({
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

  async publicCountMedicalRecordStatuses(input?: UserListMedicalRecordStatusInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.medicalRecordStatus.count(
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

  async publicMedicalRecordStatus(medicalRecordStatusId) {

    return this.data.medicalRecordStatus.findUnique({ where: { id: medicalRecordStatusId } , include: {appointments: true}  })
  }
}


