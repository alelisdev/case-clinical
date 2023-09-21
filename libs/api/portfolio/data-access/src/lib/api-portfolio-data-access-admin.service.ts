
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreatePortfolioInput } from './dto/admin-create-portfolio.input'
import { AdminListPortfolioInput } from './dto/admin-list-portfolio.input'

import { AdminUpdatePortfolioInput } from './dto/admin-update-portfolio.input'

@Injectable()
export class ApiPortfolioDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminPortfolios(adminId: string, input?: AdminListPortfolioInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.portfolio.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async adminCountPortfolios(adminId: string, input?: AdminListPortfolioInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.portfolio.count(
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

  
  

  async adminPortfolio(adminId: string, portfolioId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.portfolio.findUnique({ where: { id: portfolioId } , include: {caseAccounts: true} })
  }

  async checkPortfolioExist(portfolioName: string) {
    try {
      return this.data.portfolio.findMany({ where: { name: portfolioName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreatePortfolio(adminId: string, input: AdminCreatePortfolioInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const portfolioData = await this.checkPortfolioExist(input.name)

      if (portfolioData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.portfolio.create({
          data: { 
    name: input.name, 

    }
    , include: {caseAccounts: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdatePortfolio(adminId: string, portfolioId, input: AdminUpdatePortfolioInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.portfolio.update({
      where: { id: portfolioId },
      data: {
name: input.name, 

}
, include: {caseAccounts: true} 
    })
  }

  async adminDeletePortfolio(adminId: string, portfolioId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.portfolio.delete({ where: { id: portfolioId } })
  }
}

