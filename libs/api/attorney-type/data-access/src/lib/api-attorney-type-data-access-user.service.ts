
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateAttorneyTypeInput } from './dto/user-create-attorney-type.input'
import { UserListAttorneyTypeInput } from './dto/user-list-attorney-type.input'
import { UserUpdateAttorneyTypeInput } from './dto/user-update-attorney-type.input'
import { UserUpdateAttorneyTypesInput } from './dto/user-update-attorney-types.input'



@Injectable()
export class ApiAttorneyTypeDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userAttorneyTypes(userId: string, input?: UserListAttorneyTypeInput) {
    let name = input?.name ? input.name : undefined

    return this.data.attorneyType.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async userSelectAttorneyTypes(userId: string, input?: UserListAttorneyTypeInput) {
    let name = input?.name ? input.name : undefined

    return this.data.attorneyType.findMany({
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

  async userCountAttorneyTypes(userId: string, input?: UserListAttorneyTypeInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.attorneyType.count(
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

  async userAttorneyType(userId: string, attorneyTypeId) {

    return this.data.attorneyType.findUnique({ where: { id: attorneyTypeId } , include: {attorneys: {include: {firm: true, attorneyStatus: true, attorneyType: true}}}  })
  }

  async checkAttorneyTypeExist(attorneyTypeName: string) {
    try {
      return this.data.attorneyType.findMany({ where: { name: attorneyTypeName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateAttorneyType(userId: string, input: UserCreateAttorneyTypeInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const attorneyTypeData = await this.checkAttorneyTypeExist(input.name)

        if (attorneyTypeData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'AttorneyType', 'Create', input)

    let attorneyType = await this.data.attorneyType.create({
      data: { 
name: input.name, 

}
, include: {attorneys: true} 
    })

    await this.data.logEvent(sendingUser, false, 'AttorneyType', 'Create', attorneyType)

    return attorneyType

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Attorney Type')
    }

  }


  
  

  async userUpdateAttorneyType(userId: string, attorneyTypeId: string, input: UserUpdateAttorneyTypeInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!attorneyTypeId) {
        throw new BadRequestException('Attorney Type Id is required')
      } else {

      const attorneyTypeData = await this.checkAttorneyTypeExist(input.name)

      if (attorneyTypeData.length > 0) {
        if (attorneyTypeData[0].id != attorneyTypeId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'AttorneyType', 'Update', input)

    let attorneyType = this.data.attorneyType.update({
      where: { id: attorneyTypeId },
      data: {
name: input.name, 

}
, include: {attorneys: true} 
    })

    await this.data.logEvent(sendingUser, false, 'AttorneyType', 'Update', attorneyType)

    return attorneyType

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Attorney Type')
    }
  }

  async userUpdateAttorneyTypes(userId: string, input: UserUpdateAttorneyTypesInput): Promise<UpdateResult> {
    const total = input.attorneyTypes.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.attorneyTypes) {
      const inputData = input.attorneyTypes[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 

      }

      const attorneyTypeData = await this.checkAttorneyTypeExist(inputData.name)

      if (attorneyTypeData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.attorneyType.upsert({
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


  async userDeleteAttorneyType(userId: string, attorneyTypeId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!attorneyTypeId) {
        throw new BadRequestException('Attorney Type Id is required')
      } else {

        const attorneyCount = await this.data.attorney.count({ where: { attorneyTypeId: attorneyTypeId }})
        if(attorneyCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on an Attorney')
        }

        await this.data.logEvent(sendingUser, true, 'AttorneyType', 'Delete', attorneyTypeId)

        let attorneyType = this.data.attorneyType.delete({
          where: { id: attorneyTypeId }
        })

        await this.data.logEvent(sendingUser, false, 'AttorneyType', 'Delete', attorneyType)

        return attorneyType

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Attorney Type')
    }
  }
}

