
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateOrganizationInput } from './dto/user-create-organization.input'
import { UserListOrganizationInput } from './dto/user-list-organization.input'
import { UserUpdateOrganizationInput } from './dto/user-update-organization.input'
import { UserUpdateOrganizationsInput } from './dto/user-update-organizations.input'



@Injectable()
export class ApiOrganizationDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userOrganizations(userId: string, input?: UserListOrganizationInput) {
    let name = input?.name ? input.name : undefined

    return this.data.organization.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async userSelectOrganizations(userId: string, input?: UserListOrganizationInput) {
    let name = input?.name ? input.name : undefined

    return this.data.organization.findMany({
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

  async userCountOrganizations(userId: string, input?: UserListOrganizationInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.organization.count(
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

  async userOrganization(userId: string, organizationId) {

    return this.data.organization.findUnique({ where: { id: organizationId } , include: {contracts: {include: {organization: true, billingOrganization: true, template: true, vendor: true, reconciliationPeriodType: true, calculationBasisType: true, process: true}}, liensHeld: true, facilityFeeSchedules: {include: {organization: true, specialty: true}}, feeSchedules: {include: {organization: true, specialty: true}}}  })
  }

  async checkOrganizationExist(organizationName: string) {
    try {
      return this.data.organization.findMany({ where: { name: organizationName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateOrganization(userId: string, input: UserCreateOrganizationInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const organizationData = await this.checkOrganizationExist(input.name)

        if (organizationData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'Organization', 'Create', input)

    let organization = await this.data.organization.create({
      data: { 
name: input.name, 

}
, include: {contracts: true, liensHeld: true, facilityFeeSchedules: true, feeSchedules: true} 
    })

    await this.data.logEvent(sendingUser, false, 'Organization', 'Create', organization)

    return organization

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Organization')
    }

  }


  
  

  async userUpdateOrganization(userId: string, organizationId: string, input: UserUpdateOrganizationInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!organizationId) {
        throw new BadRequestException('Organization Id is required')
      } else {

      const organizationData = await this.checkOrganizationExist(input.name)

      if (organizationData.length > 0) {
        if (organizationData[0].id != organizationId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'Organization', 'Update', input)

    let organization = this.data.organization.update({
      where: { id: organizationId },
      data: {
name: input.name, 

}
, include: {contracts: true, liensHeld: true, facilityFeeSchedules: true, feeSchedules: true} 
    })

    await this.data.logEvent(sendingUser, false, 'Organization', 'Update', organization)

    return organization

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Organization')
    }
  }

  async userUpdateOrganizations(userId: string, input: UserUpdateOrganizationsInput): Promise<UpdateResult> {
    const total = input.organizations.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.organizations) {
      const inputData = input.organizations[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 

      }

      const organizationData = await this.checkOrganizationExist(inputData.name)

      if (organizationData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.organization.upsert({
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


  async userDeleteOrganization(userId: string, organizationId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!organizationId) {
        throw new BadRequestException('Organization Id is required')
      } else {

        const contractCount = await this.data.contract.count({ where: { organizationId: organizationId }})
        if(contractCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Contract')
        }

        const facilityFeeScheduleCount = await this.data.facilityFeeSchedule.count({ where: { organizationId: organizationId }})
        if(facilityFeeScheduleCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Facility Fee Schedule')
        }

        const feeScheduleCount = await this.data.feeSchedule.count({ where: { organizationId: organizationId }})
        if(feeScheduleCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Fee Schedule')
        }

        await this.data.logEvent(sendingUser, true, 'Organization', 'Delete', organizationId)

        let organization = this.data.organization.delete({
          where: { id: organizationId }
        })

        await this.data.logEvent(sendingUser, false, 'Organization', 'Delete', organization)

        return organization

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Organization')
    }
  }
}

