
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateEligibilityRequestInput } from './dto/admin-create-eligibility-request.input'
import { AdminListEligibilityRequestInput } from './dto/admin-list-eligibility-request.input'
import { AdminListEligibilityStatusInput } from '@case-clinical/api/eligibility-status/data-access'
import { AdminUpdateEligibilityRequestInput } from './dto/admin-update-eligibility-request.input'

@Injectable()
export class ApiEligibilityRequestDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminEligibilityRequests(adminId: string, input?: AdminListEligibilityRequestInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.eligibilityRequest.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip , include: {elegibilityStatus: true}
    })
  }

  async adminCountEligibilityRequests(adminId: string, input?: AdminListEligibilityRequestInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.eligibilityRequest.count(
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

  
  

  async adminEligibilityRequest(adminId: string, eligibilityRequestId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.eligibilityRequest.findUnique({ where: { id: eligibilityRequestId } , include: {elegibilityStatus: true} })
  }

  async checkEligibilityRequestExist(eligibilityRequestName: string) {
    try {
      return this.data.eligibilityRequest.findMany({ where: { name: eligibilityRequestName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateEligibilityRequest(adminId: string, input: AdminCreateEligibilityRequestInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const eligibilityRequestData = await this.checkEligibilityRequestExist(input.name)

      if (eligibilityRequestData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.eligibilityRequest.create({
          data: { 
      
                elegibilityStatus: 
                input.eligibilityStatusId != null
                ? {
                        connect:  { 
                            id: input.eligibilityStatusId
                        }
                    }: undefined,name: input.name, 
taxID: input.taxID, 
dateOfBirth: input.dateOfBirth, 
memberRegistrationNumber: input.memberRegistrationNumber, 

    }
    , include: {elegibilityStatus: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateEligibilityRequest(adminId: string, eligibilityRequestId, input: AdminUpdateEligibilityRequestInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.eligibilityRequest.update({
      where: { id: eligibilityRequestId },
      data: {
  
                elegibilityStatus: 
                input.eligibilityStatusId != null
                ? {
                        connect:  { 
                            id: input.eligibilityStatusId
                        }
                    }: undefined,name: input.name, 
taxID: input.taxID, 
dateOfBirth: input.dateOfBirth, 
memberRegistrationNumber: input.memberRegistrationNumber, 

}
, include: {elegibilityStatus: true} 
    })
  }

  async adminDeleteEligibilityRequest(adminId: string, eligibilityRequestId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.eligibilityRequest.delete({ where: { id: eligibilityRequestId } })
  }
}

