
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListPortfolioInput,
  ApiPortfolioDataAccessPublicService,
  Portfolio,
} from '@case-clinical/api/portfolio/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiPortfolioFeaturePublicResolver {
  constructor(private readonly service: ApiPortfolioDataAccessPublicService) {}
           
  @Query(() => [Portfolio], { nullable: true })
  publicPortfolios(
    @Args({ name: 'input', type: () => UserListPortfolioInput, nullable: true }) input?: UserListPortfolioInput,
  ) {
    return this.service.publicPortfolios(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountPortfolios(
    @Args({ name: 'input', type: () => UserListPortfolioInput, nullable: true }) input?: UserListPortfolioInput,
  ) {
    return this.service.publicCountPortfolios(input)
  }

  @Query(() => [Portfolio], { nullable: true })
  publicSelectPortfolios(
    @Args({ name: 'input', type: () => UserListPortfolioInput, nullable: true }) input?: UserListPortfolioInput,
  ) {
    return this.service.publicSelectPortfolios(input)
  }

  @Query(() => Portfolio, { nullable: true })
  publicPortfolio(@Args('portfolioId') portfolioId: string) {
    return this.service.publicPortfolio(portfolioId)
  }
}
