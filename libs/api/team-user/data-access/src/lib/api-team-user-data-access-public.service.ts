
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListTeamUserInput } from './dto/user-list-team-user.input'

@Injectable()
export class ApiTeamUserDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicTeamUsers(input?: UserListTeamUserInput) {
    let name = input?.name ? input.name : undefined

    return this.data.teamUser.findMany({
      where: {
            AND: [{
            name: { contains: name },
            teamId: input.teamId,
userId: input.userId,
teamRoleId: input.teamRoleId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {team: true, user: true, teamRole: true}
    })
  }

  async publicSelectTeamUsers(input?: UserListTeamUserInput) {
    let name = input?.name ? input.name : undefined

    return this.data.teamUser.findMany({
      where: {
            AND: [{
            name: { contains: name },
            teamId: input.teamId,
userId: input.userId,
teamRoleId: input.teamRoleId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async publicCountTeamUsers(input?: UserListTeamUserInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.teamUser.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            teamId: input.teamId,
userId: input.userId,
teamRoleId: input.teamRoleId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async publicTeamUser(teamUserId) {

    return this.data.teamUser.findUnique({ where: { id: teamUserId } , include: {team: true, user: true, teamRole: true}  })
  }
}


