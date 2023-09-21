
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateInsuranceSectorInput } from './dto/user-create-insurance-sector.input'
import { UserListInsuranceSectorInput } from './dto/user-list-insurance-sector.input'
import { UserUpdateInsuranceSectorInput } from './dto/user-update-insurance-sector.input'
import { UserUpdateInsuranceSectorsInput } from './dto/user-update-insurance-sectors.input'



@Injectable()
export class ApiInsuranceSectorDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userInsuranceSectors(userId: string, input?: UserListInsuranceSectorInput) {
    let name = input?.name ? input.name : undefined

    return this.data.insuranceSector.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async userSelectInsuranceSectors(userId: string, input?: UserListInsuranceSectorInput) {
    let name = input?.name ? input.name : undefined

    return this.data.insuranceSector.findMany({
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

  async userCountInsuranceSectors(userId: string, input?: UserListInsuranceSectorInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.insuranceSector.count(
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

  async userInsuranceSector(userId: string, insuranceSectorId) {

    return this.data.insuranceSector.findUnique({ where: { id: insuranceSectorId } , include: {insurances: {include: {legalCase: true, insuranceType: true, insuranceSector: true}}}  })
  }

  async checkInsuranceSectorExist(insuranceSectorName: string) {
    try {
      return this.data.insuranceSector.findMany({ where: { name: insuranceSectorName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateInsuranceSector(userId: string, input: UserCreateInsuranceSectorInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const insuranceSectorData = await this.checkInsuranceSectorExist(input.name)

        if (insuranceSectorData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'InsuranceSector', 'Create', input)

    let insuranceSector = await this.data.insuranceSector.create({
      data: { 
name: input.name, 

}
, include: {insurances: {include: {legalCase: true, insuranceType: true, insuranceSector: true}}} 
    })

    await this.data.logEvent(sendingUser, false, 'InsuranceSector', 'Create', insuranceSector)

    return insuranceSector

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Insurance Sector')
    }

  }


  
  

  async userUpdateInsuranceSector(userId: string, insuranceSectorId: string, input: UserUpdateInsuranceSectorInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!insuranceSectorId) {
        throw new BadRequestException('Insurance Sector Id is required')
      } else {

      const insuranceSectorData = await this.checkInsuranceSectorExist(input.name)

      if (insuranceSectorData.length > 0) {
        if (insuranceSectorData[0].id != insuranceSectorId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'InsuranceSector', 'Update', input)

    let insuranceSector = this.data.insuranceSector.update({
      where: { id: insuranceSectorId },
      data: {
name: input.name, 

}
, include: {insurances: true} 
    })

    await this.data.logEvent(sendingUser, false, 'InsuranceSector', 'Update', insuranceSector)

    return insuranceSector

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Insurance Sector')
    }
  }

  async userUpdateInsuranceSectors(userId: string, input: UserUpdateInsuranceSectorsInput): Promise<UpdateResult> {
    const total = input.insuranceSectors.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.insuranceSectors) {
      const inputData = input.insuranceSectors[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 

      }

      const insuranceSectorData = await this.checkInsuranceSectorExist(inputData.name)

      if (insuranceSectorData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.insuranceSector.upsert({
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


  async userDeleteInsuranceSector(userId: string, insuranceSectorId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!insuranceSectorId) {
        throw new BadRequestException('Insurance Sector Id is required')
      } else {

        const insuranceCount = await this.data.insurance.count({ where: { insuranceSectorId: insuranceSectorId }})
        if(insuranceCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on an Insurance')
        }

        await this.data.logEvent(sendingUser, true, 'InsuranceSector', 'Delete', insuranceSectorId)

        let insuranceSector = this.data.insuranceSector.delete({
          where: { id: insuranceSectorId }
        })

        await this.data.logEvent(sendingUser, false, 'InsuranceSector', 'Delete', insuranceSector)

        return insuranceSector

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Insurance Sector')
    }
  }
}

