
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateProcessInput } from './dto/admin-create-process.input'
import { AdminListProcessInput } from './dto/admin-list-process.input'

import { AdminUpdateProcessInput } from './dto/admin-update-process.input'

@Injectable()
export class ApiProcessDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminProcesses(adminId: string, input?: AdminListProcessInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.process.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async adminCountProcesses(adminId: string, input?: AdminListProcessInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.process.count(
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

  
  

  async adminProcess(adminId: string, processId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.process.findUnique({ where: { id: processId } , include: {contracts: true} })
  }

  async checkProcessExist(processName: string) {
    try {
      return this.data.process.findMany({ where: { name: processName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateProcess(adminId: string, input: AdminCreateProcessInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const processData = await this.checkProcessExist(input.name)

      if (processData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.process.create({
          data: { 
    name: input.name, 

    }
    , include: {contracts: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateProcess(adminId: string, processId, input: AdminUpdateProcessInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.process.update({
      where: { id: processId },
      data: {
name: input.name, 

}
, include: {contracts: true} 
    })
  }

  async adminDeleteProcess(adminId: string, processId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.process.delete({ where: { id: processId } })
  }
}

