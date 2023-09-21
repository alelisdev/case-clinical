
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListSettingInput } from './dto/user-list-setting.input'

@Injectable()
export class ApiSettingDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicSettings(input?: UserListSettingInput) {
    let name = input?.name ? input.name : undefined

    return this.data.setting.findMany({
      where: {
            AND: [{
            name: { contains: name },
            userId: input.userId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {user: true}
    })
  }

  async publicSelectSettings(input?: UserListSettingInput) {
    let name = input?.name ? input.name : undefined

    return this.data.setting.findMany({
      where: {
            AND: [{
            name: { contains: name },
            userId: input.userId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async publicCountSettings(input?: UserListSettingInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.setting.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            userId: input.userId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async publicSetting(settingId) {

    return this.data.setting.findUnique({ where: { id: settingId } , include: {user: true}  })
  }
}


