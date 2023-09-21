
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateOrganizationInput } from './dto/admin-create-organization.input'
import { AdminListOrganizationInput } from './dto/admin-list-organization.input'

import { AdminUpdateOrganizationInput } from './dto/admin-update-organization.input'

@Injectable()
export class ApiOrganizationDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminOrganizations(adminId: string, input?: AdminListOrganizationInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.organization.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async adminCountOrganizations(adminId: string, input?: AdminListOrganizationInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.organization.count(
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

  
  

  async adminOrganization(adminId: string, organizationId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.organization.findUnique({ where: { id: organizationId } , include: {contracts: true, liensHeld: true, facilityFeeSchedules: true, feeSchedules: true} })
  }

  async checkOrganizationExist(organizationName: string) {
    try {
      return this.data.organization.findMany({ where: { name: organizationName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateOrganization(adminId: string, input: AdminCreateOrganizationInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const organizationData = await this.checkOrganizationExist(input.name)

      if (organizationData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.organization.create({
          data: { 
    name: input.name, 

    }
    , include: {contracts: true, liensHeld: true, facilityFeeSchedules: true, feeSchedules: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateOrganization(adminId: string, organizationId, input: AdminUpdateOrganizationInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.organization.update({
      where: { id: organizationId },
      data: {
name: input.name, 

}
, include: {contracts: true, liensHeld: true, facilityFeeSchedules: true, feeSchedules: true} 
    })
  }

  async adminDeleteOrganization(adminId: string, organizationId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.organization.delete({ where: { id: organizationId } })
  }
}

