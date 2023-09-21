
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListFirmInput } from './dto/user-list-firm.input'

@Injectable()
export class ApiFirmDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicFirms(input?: UserListFirmInput) {
    let name = input?.name ? input.name : undefined

    return this.data.firm.findMany({
      where: {
            AND: [{
            name: { contains: name },
            firmStatusId: input.firmStatusId,
eulaId: input.eulaId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {firmStatus: true, eula: true}
    })
  }

  async publicSelectFirms(input?: UserListFirmInput) {
    let name = input?.name ? input.name : undefined

    return this.data.firm.findMany({
      where: {
            AND: [{
            name: { contains: name },
            firmStatusId: input.firmStatusId,
eulaId: input.eulaId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async publicCountFirms(input?: UserListFirmInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.firm.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            firmStatusId: input.firmStatusId,
eulaId: input.eulaId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async publicFirm(firmId) {

    return this.data.firm.findUnique({ where: { id: firmId } , include: {firmStatus: true, eula: true, attorneys: true, legalCases: true}  })
  }
}


