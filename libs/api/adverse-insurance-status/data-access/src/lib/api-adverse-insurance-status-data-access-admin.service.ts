
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateAdverseInsuranceStatusInput } from './dto/admin-create-adverse-insurance-status.input'
import { AdminListAdverseInsuranceStatusInput } from './dto/admin-list-adverse-insurance-status.input'

import { AdminUpdateAdverseInsuranceStatusInput } from './dto/admin-update-adverse-insurance-status.input'

@Injectable()
export class ApiAdverseInsuranceStatusDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminAdverseInsuranceStatuses(adminId: string, input?: AdminListAdverseInsuranceStatusInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.adverseInsuranceStatus.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async adminCountAdverseInsuranceStatuses(adminId: string, input?: AdminListAdverseInsuranceStatusInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.adverseInsuranceStatus.count(
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

  
  

  async adminAdverseInsuranceStatus(adminId: string, adverseInsuranceStatusId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.adverseInsuranceStatus.findUnique({ where: { id: adverseInsuranceStatusId } , include: {legalCases: true} })
  }

  async checkAdverseInsuranceStatusExist(adverseInsuranceStatusName: string) {
    try {
      return this.data.adverseInsuranceStatus.findMany({ where: { name: adverseInsuranceStatusName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateAdverseInsuranceStatus(adminId: string, input: AdminCreateAdverseInsuranceStatusInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const adverseInsuranceStatusData = await this.checkAdverseInsuranceStatusExist(input.name)

      if (adverseInsuranceStatusData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.adverseInsuranceStatus.create({
          data: { 
    name: input.name, 

    }
    , include: {legalCases: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateAdverseInsuranceStatus(adminId: string, adverseInsuranceStatusId, input: AdminUpdateAdverseInsuranceStatusInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.adverseInsuranceStatus.update({
      where: { id: adverseInsuranceStatusId },
      data: {
name: input.name, 

}
, include: {legalCases: true} 
    })
  }

  async adminDeleteAdverseInsuranceStatus(adminId: string, adverseInsuranceStatusId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.adverseInsuranceStatus.delete({ where: { id: adverseInsuranceStatusId } })
  }
}

