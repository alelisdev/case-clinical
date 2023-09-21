
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListWriteOffInput } from './dto/user-list-write-off.input'

@Injectable()
export class ApiWriteOffDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicWriteOffs(input?: UserListWriteOffInput) {
    let name = input?.name ? input.name : undefined

    return this.data.writeOff.findMany({
      where: {
            AND: [{
            name: { contains: name },
            accountId: input.accountId,
writeOffStatusId: input.writeOffStatusId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {account: true, writeOffStatus: true}
    })
  }

  async publicSelectWriteOffs(input?: UserListWriteOffInput) {
    let name = input?.name ? input.name : undefined

    return this.data.writeOff.findMany({
      where: {
            AND: [{
            name: { contains: name },
            accountId: input.accountId,
writeOffStatusId: input.writeOffStatusId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async publicCountWriteOffs(input?: UserListWriteOffInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.writeOff.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            accountId: input.accountId,
writeOffStatusId: input.writeOffStatusId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async publicWriteOff(writeOffId) {

    return this.data.writeOff.findUnique({ where: { id: writeOffId } , include: {account: true, writeOffStatus: true}  })
  }
}


