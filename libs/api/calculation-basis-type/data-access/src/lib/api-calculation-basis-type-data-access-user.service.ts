
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateCalculationBasisTypeInput } from './dto/user-create-calculation-basis-type.input'
import { UserListCalculationBasisTypeInput } from './dto/user-list-calculation-basis-type.input'
import { UserUpdateCalculationBasisTypeInput } from './dto/user-update-calculation-basis-type.input'
import { UserUpdateCalculationBasisTypesInput } from './dto/user-update-calculation-basis-types.input'



@Injectable()
export class ApiCalculationBasisTypeDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userCalculationBasisTypes(userId: string, input?: UserListCalculationBasisTypeInput) {
    let name = input?.name ? input.name : undefined

    return this.data.calculationBasisType.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async userSelectCalculationBasisTypes(userId: string, input?: UserListCalculationBasisTypeInput) {
    let name = input?.name ? input.name : undefined

    return this.data.calculationBasisType.findMany({
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

  async userCountCalculationBasisTypes(userId: string, input?: UserListCalculationBasisTypeInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.calculationBasisType.count(
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

  async userCalculationBasisType(userId: string, calculationBasisTypeId) {

    return this.data.calculationBasisType.findUnique({ where: { id: calculationBasisTypeId } , include: {contracts: {include: {organization: true, billingOrganization: true, template: true, vendor: true, reconciliationPeriodType: true, calculationBasisType: true, process: true}}}  })
  }

  async checkCalculationBasisTypeExist(calculationBasisTypeName: string) {
    try {
      return this.data.calculationBasisType.findMany({ where: { name: calculationBasisTypeName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateCalculationBasisType(userId: string, input: UserCreateCalculationBasisTypeInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const calculationBasisTypeData = await this.checkCalculationBasisTypeExist(input.name)

        if (calculationBasisTypeData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'CalculationBasisType', 'Create', input)

    let calculationBasisType = await this.data.calculationBasisType.create({
      data: { 
name: input.name, 

}
, include: {contracts: true} 
    })

    await this.data.logEvent(sendingUser, false, 'CalculationBasisType', 'Create', calculationBasisType)

    return calculationBasisType

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Calculation Basis Type')
    }

  }


  
  

  async userUpdateCalculationBasisType(userId: string, calculationBasisTypeId: string, input: UserUpdateCalculationBasisTypeInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!calculationBasisTypeId) {
        throw new BadRequestException('Calculation Basis Type Id is required')
      } else {

      const calculationBasisTypeData = await this.checkCalculationBasisTypeExist(input.name)

      if (calculationBasisTypeData.length > 0) {
        if (calculationBasisTypeData[0].id != calculationBasisTypeId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'CalculationBasisType', 'Update', input)

    let calculationBasisType = this.data.calculationBasisType.update({
      where: { id: calculationBasisTypeId },
      data: {
name: input.name, 

}
, include: {contracts: {include: {organization: true, billingOrganization: true, template: true, vendor: true, reconciliationPeriodType: true, calculationBasisType: true, process: true}}} 
    })

    await this.data.logEvent(sendingUser, false, 'CalculationBasisType', 'Update', calculationBasisType)

    return calculationBasisType

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Calculation Basis Type')
    }
  }

  async userUpdateCalculationBasisTypes(userId: string, input: UserUpdateCalculationBasisTypesInput): Promise<UpdateResult> {
    const total = input.calculationBasisTypes.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.calculationBasisTypes) {
      const inputData = input.calculationBasisTypes[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 

      }

      const calculationBasisTypeData = await this.checkCalculationBasisTypeExist(inputData.name)

      if (calculationBasisTypeData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.calculationBasisType.upsert({
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


  async userDeleteCalculationBasisType(userId: string, calculationBasisTypeId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!calculationBasisTypeId) {
        throw new BadRequestException('Calculation Basis Type Id is required')
      } else {

        const contractCount = await this.data.contract.count({ where: { calculationBasisTypeId: calculationBasisTypeId }})
        if(contractCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Contract')
        }

        await this.data.logEvent(sendingUser, true, 'CalculationBasisType', 'Delete', calculationBasisTypeId)

        let calculationBasisType = this.data.calculationBasisType.delete({
          where: { id: calculationBasisTypeId }
        })

        await this.data.logEvent(sendingUser, false, 'CalculationBasisType', 'Delete', calculationBasisType)

        return calculationBasisType

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Calculation Basis Type')
    }
  }
}

