
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListTeamInput } from './dto/user-list-team.input'

@Injectable()
export class ApiTeamDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicTeams(input?: UserListTeamInput) {
    let name = input?.name ? input.name : undefined

    return this.data.team.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async publicSelectTeams(input?: UserListTeamInput) {
    let name = input?.name ? input.name : undefined

    return this.data.team.findMany({
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

  async publicCountTeams(input?: UserListTeamInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.team.count(
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

  async publicTeam(teamId) {

    return this.data.team.findUnique({ where: { id: teamId } , include: {teamUsers: true}  })
  }
}


