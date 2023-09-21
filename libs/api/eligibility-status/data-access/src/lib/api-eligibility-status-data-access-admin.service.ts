
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateEligibilityStatusInput } from './dto/admin-create-eligibility-status.input'
import { AdminListEligibilityStatusInput } from './dto/admin-list-eligibility-status.input'

import { AdminUpdateEligibilityStatusInput } from './dto/admin-update-eligibility-status.input'

@Injectable()
export class ApiEligibilityStatusDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminEligibilityStatuses(adminId: string, input?: AdminListEligibilityStatusInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.eligibilityStatus.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async adminCountEligibilityStatuses(adminId: string, input?: AdminListEligibilityStatusInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.eligibilityStatus.count(
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

  
  

  async adminEligibilityStatus(adminId: string, eligibilityStatusId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.eligibilityStatus.findUnique({ where: { id: eligibilityStatusId } , include: {eligibilityRequests: true} })
  }

  async checkEligibilityStatusExist(eligibilityStatusName: string) {
    try {
      return this.data.eligibilityStatus.findMany({ where: { name: eligibilityStatusName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateEligibilityStatus(adminId: string, input: AdminCreateEligibilityStatusInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const eligibilityStatusData = await this.checkEligibilityStatusExist(input.name)

      if (eligibilityStatusData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.eligibilityStatus.create({
          data: { 
    name: input.name, 

    }
    , include: {eligibilityRequests: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateEligibilityStatus(adminId: string, eligibilityStatusId, input: AdminUpdateEligibilityStatusInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.eligibilityStatus.update({
      where: { id: eligibilityStatusId },
      data: {
name: input.name, 

}
, include: {eligibilityRequests: true} 
    })
  }

  async adminDeleteEligibilityStatus(adminId: string, eligibilityStatusId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.eligibilityStatus.delete({ where: { id: eligibilityStatusId } })
  }
}

