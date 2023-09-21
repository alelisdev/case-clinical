
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListTeamRoleInput } from './dto/user-list-team-role.input'

@Injectable()
export class ApiTeamRoleDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicTeamRoles(input?: UserListTeamRoleInput) {
    let name = input?.name ? input.name : undefined

    return this.data.teamRole.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async publicSelectTeamRoles(input?: UserListTeamRoleInput) {
    let name = input?.name ? input.name : undefined

    return this.data.teamRole.findMany({
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

  async publicCountTeamRoles(input?: UserListTeamRoleInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.teamRole.count(
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

  async publicTeamRole(teamRoleId) {

    return this.data.teamRole.findUnique({ where: { id: teamRoleId } , include: {teamUsers: true}  })
  }
}


