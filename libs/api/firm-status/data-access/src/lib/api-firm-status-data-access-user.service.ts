
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateFirmStatusInput } from './dto/user-create-firm-status.input'
import { UserListFirmStatusInput } from './dto/user-list-firm-status.input'
import { UserUpdateFirmStatusInput } from './dto/user-update-firm-status.input'
import { UserUpdateFirmStatusesInput } from './dto/user-update-firm-statuses.input'



@Injectable()
export class ApiFirmStatusDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userFirmStatuses(userId: string, input?: UserListFirmStatusInput) {
    let name = input?.name ? input.name : undefined

    return this.data.firmStatus.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async userSelectFirmStatuses(userId: string, input?: UserListFirmStatusInput) {
    let name = input?.name ? input.name : undefined

    return this.data.firmStatus.findMany({
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

  async userCountFirmStatuses(userId: string, input?: UserListFirmStatusInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.firmStatus.count(
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

  async userFirmStatus(userId: string, firmStatusId) {

    return this.data.firmStatus.findUnique({ where: { id: firmStatusId } , include: {firms: {include: {firmStatus: true, eula: true}}}  })
  }

  async checkFirmStatusExist(firmStatusName: string) {
    try {
      return this.data.firmStatus.findMany({ where: { name: firmStatusName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateFirmStatus(userId: string, input: UserCreateFirmStatusInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const firmStatusData = await this.checkFirmStatusExist(input.name)

        if (firmStatusData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'FirmStatus', 'Create', input)

    let firmStatus = await this.data.firmStatus.create({
      data: { 
name: input.name, 
blackListed: input.blackListed, 
active: input.active, 
statusColor: input.statusColor, 

}
, include: {firms: {include: {firmStatus: true, eula: true}}} 
    })

    await this.data.logEvent(sendingUser, false, 'FirmStatus', 'Create', firmStatus)

    return firmStatus

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Firm Status')
    }

  }


  
  

  async userUpdateFirmStatus(userId: string, firmStatusId: string, input: UserUpdateFirmStatusInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!firmStatusId) {
        throw new BadRequestException('Firm Status Id is required')
      } else {

      const firmStatusData = await this.checkFirmStatusExist(input.name)

      if (firmStatusData.length > 0) {
        if (firmStatusData[0].id != firmStatusId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'FirmStatus', 'Update', input)

    let firmStatus = this.data.firmStatus.update({
      where: { id: firmStatusId },
      data: {
name: input.name, 
blackListed: input.blackListed, 
active: input.active, 
statusColor: input.statusColor, 

}
, include: {firms: true} 
    })

    await this.data.logEvent(sendingUser, false, 'FirmStatus', 'Update', firmStatus)

    return firmStatus

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Firm Status')
    }
  }

  async userUpdateFirmStatuses(userId: string, input: UserUpdateFirmStatusesInput): Promise<UpdateResult> {
    const total = input.firmStatuses.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.firmStatuses) {
      const inputData = input.firmStatuses[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 
blackListed: inputData.blackListed, 
active: inputData.active, 
statusColor: inputData.statusColor, 

      }

      const firmStatusData = await this.checkFirmStatusExist(inputData.name)

      if (firmStatusData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.firmStatus.upsert({
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


  async userDeleteFirmStatus(userId: string, firmStatusId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!firmStatusId) {
        throw new BadRequestException('Firm Status Id is required')
      } else {

        const firmCount = await this.data.firm.count({ where: { firmStatusId: firmStatusId }})
        if(firmCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Firm')
        }

        await this.data.logEvent(sendingUser, true, 'FirmStatus', 'Delete', firmStatusId)

        const firmsCount = await this.data.firm.count({
          where: { firmStatusId }
        })
  
        if(firmsCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it has reference at other place')
        }
        
        let firmStatus = this.data.firmStatus.delete({
          where: { id: firmStatusId }
        })

        await this.data.logEvent(sendingUser, false, 'FirmStatus', 'Delete', firmStatus)

        return firmStatus

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Firm Status')
    }
  }
}

