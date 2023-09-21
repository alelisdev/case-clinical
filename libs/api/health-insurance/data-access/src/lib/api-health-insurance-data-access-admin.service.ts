
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateHealthInsuranceInput } from './dto/admin-create-health-insurance.input'
import { AdminListHealthInsuranceInput } from './dto/admin-list-health-insurance.input'

import { AdminUpdateHealthInsuranceInput } from './dto/admin-update-health-insurance.input'

@Injectable()
export class ApiHealthInsuranceDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminHealthInsurances(adminId: string, input?: AdminListHealthInsuranceInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.healthInsurance.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async adminCountHealthInsurances(adminId: string, input?: AdminListHealthInsuranceInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.healthInsurance.count(
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

  
  

  async adminHealthInsurance(adminId: string, healthInsuranceId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.healthInsurance.findUnique({ where: { id: healthInsuranceId } })
  }

  async checkHealthInsuranceExist(healthInsuranceName: string) {
    try {
      return this.data.healthInsurance.findMany({ where: { name: healthInsuranceName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateHealthInsurance(adminId: string, input: AdminCreateHealthInsuranceInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const healthInsuranceData = await this.checkHealthInsuranceExist(input.name)

      if (healthInsuranceData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.healthInsurance.create({
          data: { 
    name: input.name, 
healthInsuranceKind: input.healthInsuranceKind, 
identificationGroupNumber: input.identificationGroupNumber, 
mediCalNumber: input.mediCalNumber, 
medicareNumber: input.medicareNumber, 
policyNumber: input.policyNumber, 

    }
    
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateHealthInsurance(adminId: string, healthInsuranceId, input: AdminUpdateHealthInsuranceInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.healthInsurance.update({
      where: { id: healthInsuranceId },
      data: {
name: input.name, 
healthInsuranceKind: input.healthInsuranceKind, 
identificationGroupNumber: input.identificationGroupNumber, 
mediCalNumber: input.mediCalNumber, 
medicareNumber: input.medicareNumber, 
policyNumber: input.policyNumber, 

}

    })
  }

  async adminDeleteHealthInsurance(adminId: string, healthInsuranceId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.healthInsurance.delete({ where: { id: healthInsuranceId } })
  }
}

