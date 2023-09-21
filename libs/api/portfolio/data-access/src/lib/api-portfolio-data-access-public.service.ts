
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListPortfolioInput } from './dto/user-list-portfolio.input'

@Injectable()
export class ApiPortfolioDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicPortfolios(input?: UserListPortfolioInput) {
    let name = input?.name ? input.name : undefined

    return this.data.portfolio.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async publicSelectPortfolios(input?: UserListPortfolioInput) {
    let name = input?.name ? input.name : undefined

    return this.data.portfolio.findMany({
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

  async publicCountPortfolios(input?: UserListPortfolioInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.portfolio.count(
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

  async publicPortfolio(portfolioId) {

    return this.data.portfolio.findUnique({ where: { id: portfolioId } , include: {caseAccounts: true}  })
  }
}


