
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateHealthInsuranceInput } from './dto/user-create-health-insurance.input'
import { UserListHealthInsuranceInput } from './dto/user-list-health-insurance.input'
import { UserUpdateHealthInsuranceInput } from './dto/user-update-health-insurance.input'
import { UserUpdateHealthInsurancesInput } from './dto/user-update-health-insurances.input'



@Injectable()
export class ApiHealthInsuranceDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userHealthInsurances(userId: string, input?: UserListHealthInsuranceInput) {
    let name = input?.name ? input.name : undefined

    return this.data.healthInsurance.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async userSelectHealthInsurances(userId: string, input?: UserListHealthInsuranceInput) {
    let name = input?.name ? input.name : undefined

    return this.data.healthInsurance.findMany({
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

  async userCountHealthInsurances(userId: string, input?: UserListHealthInsuranceInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.healthInsurance.count(
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

  async userHealthInsurance(userId: string, healthInsuranceId) {

    return this.data.healthInsurance.findUnique({ where: { id: healthInsuranceId }  })
  }

  async checkHealthInsuranceExist(healthInsuranceName: string) {
    try {
      return this.data.healthInsurance.findMany({ where: { name: healthInsuranceName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateHealthInsurance(userId: string, input: UserCreateHealthInsuranceInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const healthInsuranceData = await this.checkHealthInsuranceExist(input.name)

        if (healthInsuranceData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'HealthInsurance', 'Create', input)

    let healthInsurance = await this.data.healthInsurance.create({
      data: { 
name: input.name, 
healthInsuranceKind: input.healthInsuranceKind, 
identificationGroupNumber: input.identificationGroupNumber, 
mediCalNumber: input.mediCalNumber, 
medicareNumber: input.medicareNumber, 
policyNumber: input.policyNumber, 

}

    })

    await this.data.logEvent(sendingUser, false, 'HealthInsurance', 'Create', healthInsurance)

    return healthInsurance

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Health Insurance')
    }

  }


  
  

  async userUpdateHealthInsurance(userId: string, healthInsuranceId: string, input: UserUpdateHealthInsuranceInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!healthInsuranceId) {
        throw new BadRequestException('Health Insurance Id is required')
      } else {

      const healthInsuranceData = await this.checkHealthInsuranceExist(input.name)

      if (healthInsuranceData.length > 0) {
        if (healthInsuranceData[0].id != healthInsuranceId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'HealthInsurance', 'Update', input)

    let healthInsurance = this.data.healthInsurance.update({
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

    await this.data.logEvent(sendingUser, false, 'HealthInsurance', 'Update', healthInsurance)

    return healthInsurance

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Health Insurance')
    }
  }

  async userUpdateHealthInsurances(userId: string, input: UserUpdateHealthInsurancesInput): Promise<UpdateResult> {
    const total = input.healthInsurances.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.healthInsurances) {
      const inputData = input.healthInsurances[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 
healthInsuranceKind: inputData.healthInsuranceKind, 
identificationGroupNumber: inputData.identificationGroupNumber, 
mediCalNumber: inputData.mediCalNumber, 
medicareNumber: inputData.medicareNumber, 
policyNumber: inputData.policyNumber, 
legalCaseId: inputData.legalCaseId, 

      }

      const healthInsuranceData = await this.checkHealthInsuranceExist(inputData.name)

      if (healthInsuranceData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.healthInsurance.upsert({
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


  async userDeleteHealthInsurance(userId: string, healthInsuranceId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!healthInsuranceId) {
        throw new BadRequestException('Health Insurance Id is required')
      } else {


        await this.data.logEvent(sendingUser, true, 'HealthInsurance', 'Delete', healthInsuranceId)

        let healthInsurance = this.data.healthInsurance.delete({
          where: { id: healthInsuranceId }
        })

        await this.data.logEvent(sendingUser, false, 'HealthInsurance', 'Delete', healthInsurance)

        return healthInsurance

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Health Insurance')
    }
  }
}

