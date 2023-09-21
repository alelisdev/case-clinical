
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateAgreementTypeInput } from './dto/user-create-agreement-type.input'
import { UserListAgreementTypeInput } from './dto/user-list-agreement-type.input'
import { UserUpdateAgreementTypeInput } from './dto/user-update-agreement-type.input'
import { UserUpdateAgreementTypesInput } from './dto/user-update-agreement-types.input'



@Injectable()
export class ApiAgreementTypeDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userAgreementTypes(userId: string, input?: UserListAgreementTypeInput) {
    let name = input?.name ? input.name : undefined

    return this.data.agreementType.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async userSelectAgreementTypes(userId: string, input?: UserListAgreementTypeInput) {
    let name = input?.name ? input.name : undefined

    return this.data.agreementType.findMany({
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

  async userCountAgreementTypes(userId: string, input?: UserListAgreementTypeInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.agreementType.count(
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

  async userAgreementType(userId: string, agreementTypeId) {

    return this.data.agreementType.findUnique({ where: { id: agreementTypeId } , include: {caseAccounts: {include :{legalCase: true, location: true, vendor: true, accountStatus: true, procedureType: true, contract: true, portfolio: true, procedureVendor: true}}}  })
  }

  async checkAgreementTypeExist(agreementTypeName: string) {
    try {
      return this.data.agreementType.findMany({ where: { name: agreementTypeName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateAgreementType(userId: string, input: UserCreateAgreementTypeInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const agreementTypeData = await this.checkAgreementTypeExist(input.name)

        if (agreementTypeData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'AgreementType', 'Create', input)

    let agreementType = await this.data.agreementType.create({
      data: { 
name: input.name, 

}
, include: {caseAccounts: true} 
    })

    await this.data.logEvent(sendingUser, false, 'AgreementType', 'Create', agreementType)

    return agreementType

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Agreement Type')
    }

  }


  
  

  async userUpdateAgreementType(userId: string, agreementTypeId: string, input: UserUpdateAgreementTypeInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!agreementTypeId) {
        throw new BadRequestException('Agreement Type Id is required')
      } else {

      const agreementTypeData = await this.checkAgreementTypeExist(input.name)

      if (agreementTypeData.length > 0) {
        if (agreementTypeData[0].id != agreementTypeId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'AgreementType', 'Update', input)

    let agreementType = this.data.agreementType.update({
      where: { id: agreementTypeId },
      data: {
name: input.name, 

}
, include: {caseAccounts: {include :{legalCase: true,location: true, vendor: true, accountStatus: true, procedureType: true, contract: true, portfolio: true, procedureVendor: true}}} 
    })

    await this.data.logEvent(sendingUser, false, 'AgreementType', 'Update', agreementType)

    return agreementType

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Agreement Type')
    }
  }

  async userUpdateAgreementTypes(userId: string, input: UserUpdateAgreementTypesInput): Promise<UpdateResult> {
    const total = input.agreementTypes.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.agreementTypes) {
      const inputData = input.agreementTypes[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 

      }

      const agreementTypeData = await this.checkAgreementTypeExist(inputData.name)

      if (agreementTypeData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.agreementType.upsert({
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


  async userDeleteAgreementType(userId: string, agreementTypeId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!agreementTypeId) {
        throw new BadRequestException('Agreement Type Id is required')
      } else {

        const caseAccountCount = await this.data.caseAccount.count({ where: { agreementTypeId: agreementTypeId }})
        if(caseAccountCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Case Account')
        }

        await this.data.logEvent(sendingUser, true, 'AgreementType', 'Delete', agreementTypeId)

        let agreementType = this.data.agreementType.delete({
          where: { id: agreementTypeId }
        })

        await this.data.logEvent(sendingUser, false, 'AgreementType', 'Delete', agreementType)

        return agreementType

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Agreement Type')
    }
  }
}

