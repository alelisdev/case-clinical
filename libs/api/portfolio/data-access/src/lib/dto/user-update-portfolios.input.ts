import { Field, InputType } from '@nestjs/graphql'
import { UserUpdatePortfolioInput } from './user-update-portfolio.input'

@InputType()
export class UserUpdatePortfoliosInput {
  @Field(() => [UserUpdatePortfolioInput], {nullable: true }) 
  portfolios: UserUpdatePortfolioInput[]
}
