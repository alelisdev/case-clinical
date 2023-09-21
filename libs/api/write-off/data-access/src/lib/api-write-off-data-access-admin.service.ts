
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateWriteOffInput } from './dto/admin-create-write-off.input'
import { AdminListWriteOffInput } from './dto/admin-list-write-off.input'
import { AdminListCaseAccountInput } from '@case-clinical/api/case-account/data-access'
import { AdminListWriteOffStatusInput } from '@case-clinical/api/write-off-status/data-access'
import { AdminUpdateWriteOffInput } from './dto/admin-update-write-off.input'

@Injectable()
export class ApiWriteOffDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminWriteOffs(adminId: string, input?: AdminListWriteOffInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.writeOff.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip , include: {account: true, writeOffStatus: true}
    })
  }

  async adminCountWriteOffs(adminId: string, input?: AdminListWriteOffInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.writeOff.count(
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

  
  

  async adminWriteOff(adminId: string, writeOffId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.writeOff.findUnique({ where: { id: writeOffId } , include: {account: true, writeOffStatus: true} })
  }

  async checkWriteOffExist(writeOffName: string) {
    try {
      return this.data.writeOff.findMany({ where: { name: writeOffName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateWriteOff(adminId: string, input: AdminCreateWriteOffInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const writeOffData = await this.checkWriteOffExist(input.name)

      if (writeOffData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.writeOff.create({
          data: { 
      
                account: 
                input.accountId != null
                ? {
                        connect:  { 
                            id: input.accountId
                        }
                    }: undefined,  
                writeOffStatus: 
                input.writeOffStatusId != null
                ? {
                        connect:  { 
                            id: input.writeOffStatusId
                        }
                    }: undefined,name: input.name, 
amount: input.amount, 
createdBy: input.createdBy, 
dateCreated: input.dateCreated, 

    }
    , include: {account: true, writeOffStatus: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateWriteOff(adminId: string, writeOffId, input: AdminUpdateWriteOffInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.writeOff.update({
      where: { id: writeOffId },
      data: {
  
                account: 
                input.accountId != null
                ? {
                        connect:  { 
                            id: input.accountId
                        }
                    }: undefined,  
                writeOffStatus: 
                input.writeOffStatusId != null
                ? {
                        connect:  { 
                            id: input.writeOffStatusId
                        }
                    }: undefined,name: input.name, 
amount: input.amount, 
createdBy: input.createdBy, 
dateCreated: input.dateCreated, 

}
, include: {account: true, writeOffStatus: true} 
    })
  }

  async adminDeleteWriteOff(adminId: string, writeOffId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.writeOff.delete({ where: { id: writeOffId } })
  }
}

