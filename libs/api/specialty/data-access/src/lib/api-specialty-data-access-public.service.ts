
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListSpecialtyInput } from './dto/user-list-specialty.input'

@Injectable()
export class ApiSpecialtyDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicSpecialties(input?: UserListSpecialtyInput) {
    let name = input?.name ? input.name : undefined

    return this.data.specialty.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async publicSelectSpecialties(input?: UserListSpecialtyInput) {
    let name = input?.name ? input.name : undefined

    return this.data.specialty.findMany({
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

  async publicCountSpecialties(input?: UserListSpecialtyInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.specialty.count(
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

  async publicSpecialty(specialtyId) {

    return this.data.specialty.findUnique({ where: { id: specialtyId } , include: {clinicalProviderSpecialties: true, facilityFeeSchedules: true, feeSchedules: true}  })
  }
}


