
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateInsuranceTypeInput } from './dto/user-create-insurance-type.input'
import { UserListInsuranceTypeInput } from './dto/user-list-insurance-type.input'
import { UserUpdateInsuranceTypeInput } from './dto/user-update-insurance-type.input'
import { UserUpdateInsuranceTypesInput } from './dto/user-update-insurance-types.input'



@Injectable()
export class ApiInsuranceTypeDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userInsuranceTypes(userId: string, input?: UserListInsuranceTypeInput) {
    let name = input?.name ? input.name : undefined

    return this.data.insuranceType.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async userSelectInsuranceTypes(userId: string, input?: UserListInsuranceTypeInput) {
    let name = input?.name ? input.name : undefined

    return this.data.insuranceType.findMany({
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

  async userCountInsuranceTypes(userId: string, input?: UserListInsuranceTypeInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.insuranceType.count(
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

  async userInsuranceType(userId: string, insuranceTypeId) {

    return this.data.insuranceType.findUnique({ where: { id: insuranceTypeId } , include: {insurances: {include: {legalCase: true, insuranceType: true, insuranceSector: true}}}  })
  }

  async checkInsuranceTypeExist(insuranceTypeName: string) {
    try {
      return this.data.insuranceType.findMany({ where: { name: insuranceTypeName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateInsuranceType(userId: string, input: UserCreateInsuranceTypeInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const insuranceTypeData = await this.checkInsuranceTypeExist(input.name)

        if (insuranceTypeData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'InsuranceType', 'Create', input)

    let insuranceType = await this.data.insuranceType.create({
      data: { 
name: input.name, 

}
, include: {insurances: {include: {legalCase: true, insuranceType: true, insuranceSector: true}}} 
    })

    await this.data.logEvent(sendingUser, false, 'InsuranceType', 'Create', insuranceType)

    return insuranceType

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Insurance Type')
    }

  }


  
  

  async userUpdateInsuranceType(userId: string, insuranceTypeId: string, input: UserUpdateInsuranceTypeInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!insuranceTypeId) {
        throw new BadRequestException('Insurance Type Id is required')
      } else {

      const insuranceTypeData = await this.checkInsuranceTypeExist(input.name)

      if (insuranceTypeData.length > 0) {
        if (insuranceTypeData[0].id != insuranceTypeId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'InsuranceType', 'Update', input)

    let insuranceType = this.data.insuranceType.update({
      where: { id: insuranceTypeId },
      data: {
name: input.name, 

}
, include: {insurances: true} 
    })

    await this.data.logEvent(sendingUser, false, 'InsuranceType', 'Update', insuranceType)

    return insuranceType

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Insurance Type')
    }
  }

  async userUpdateInsuranceTypes(userId: string, input: UserUpdateInsuranceTypesInput): Promise<UpdateResult> {
    const total = input.insuranceTypes.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.insuranceTypes) {
      const inputData = input.insuranceTypes[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 

      }

      const insuranceTypeData = await this.checkInsuranceTypeExist(inputData.name)

      if (insuranceTypeData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.insuranceType.upsert({
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


  async userDeleteInsuranceType(userId: string, insuranceTypeId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!insuranceTypeId) {
        throw new BadRequestException('Insurance Type Id is required')
      } else {

        const insuranceCount = await this.data.insurance.count({ where: { insuranceTypeId: insuranceTypeId }})
        if(insuranceCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on an Insurance')
        }

        await this.data.logEvent(sendingUser, true, 'InsuranceType', 'Delete', insuranceTypeId)

        let insuranceType = this.data.insuranceType.delete({
          where: { id: insuranceTypeId }
        })

        await this.data.logEvent(sendingUser, false, 'InsuranceType', 'Delete', insuranceType)

        return insuranceType

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Insurance Type')
    }
  }
}

