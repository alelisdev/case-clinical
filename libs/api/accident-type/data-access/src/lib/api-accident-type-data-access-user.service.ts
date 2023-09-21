
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateAccidentTypeInput } from './dto/user-create-accident-type.input'
import { UserListAccidentTypeInput } from './dto/user-list-accident-type.input'
import { UserUpdateAccidentTypeInput } from './dto/user-update-accident-type.input'
import { UserUpdateAccidentTypesInput } from './dto/user-update-accident-types.input'



@Injectable()
export class ApiAccidentTypeDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userAccidentTypes(userId: string, input?: UserListAccidentTypeInput) {
    let name = input?.name ? input.name : undefined

    return this.data.accidentType.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async userSelectAccidentTypes(userId: string, input?: UserListAccidentTypeInput) {
    let name = input?.name ? input.name : undefined

    return this.data.accidentType.findMany({
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

  async userCountAccidentTypes(userId: string, input?: UserListAccidentTypeInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.accidentType.count(
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

  async userAccidentType(userId: string, accidentTypeId) {

    return this.data.accidentType.findUnique({ where: { id: accidentTypeId } , include: {legalCases: true, requiredFields: {include: {accidentType: true, medLevel: true}}}  })
  }

  async checkAccidentTypeExist(accidentTypeName: string) {
    try {
      return this.data.accidentType.findMany({ where: { name: accidentTypeName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateAccidentType(userId: string, input: UserCreateAccidentTypeInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const accidentTypeData = await this.checkAccidentTypeExist(input.name)

        if (accidentTypeData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }

    await this.data.logEvent(sendingUser, true, 'AccidentType', 'Create', input)

    let accidentType = await this.data.accidentType.create({
      data: { 
          name: input.name, 
      }
      , include: {legalCases: true, requiredFields: true} 
    })

    await this.data.logEvent(sendingUser, false, 'AccidentType', 'Create', accidentType)

    return accidentType

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Accident Type')
    }

  }


  
  

  async userUpdateAccidentType(userId: string, accidentTypeId: string, input: UserUpdateAccidentTypeInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!accidentTypeId) {
        throw new BadRequestException('Accident Type Id is required')
      } else {

      const accidentTypeData = await this.checkAccidentTypeExist(input.name)

      if (accidentTypeData.length > 0) {
        if (accidentTypeData[0].id != accidentTypeId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'AccidentType', 'Update', input)

    let accidentType = this.data.accidentType.update({
      where: { id: accidentTypeId },
      data: {
name: input.name, 

}
, include: {legalCases: true, requiredFields: {include: {accidentType: true, medLevel: true}}} 
    })

    await this.data.logEvent(sendingUser, false, 'AccidentType', 'Update', accidentType)

    return accidentType

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Accident Type')
    }
  }

  async userUpdateAccidentTypes(userId: string, input: UserUpdateAccidentTypesInput): Promise<UpdateResult> {
    const total = input.accidentTypes.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.accidentTypes) {
      const inputData = input.accidentTypes[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 

      }

      const accidentTypeData = await this.checkAccidentTypeExist(inputData.name)

      if (accidentTypeData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.accidentType.upsert({
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


  async userDeleteAccidentType(userId: string, accidentTypeId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!accidentTypeId) {
        throw new BadRequestException('Accident Type Id is required')
      } else {

        const legalCaseCount = await this.data.legalCase.count({ where: { accidentTypeId: accidentTypeId }})
        if(legalCaseCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Legal Case')
        }


        const requiredFieldCount = await this.data.requiredField.count({ where: { accidentTypeId: accidentTypeId }})
        if(requiredFieldCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Required Field')
        }

        await this.data.logEvent(sendingUser, true, 'AccidentType', 'Delete', accidentTypeId)

        let accidentType = this.data.accidentType.delete({
          where: { id: accidentTypeId }
        })

        await this.data.logEvent(sendingUser, false, 'AccidentType', 'Delete', accidentType)

        return accidentType

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Accident Type')
    }
  }
}

