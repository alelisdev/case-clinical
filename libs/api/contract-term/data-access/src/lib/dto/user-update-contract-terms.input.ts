import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateContractTermInput } from './user-update-contract-term.input'

@InputType()
export class UserUpdateContractTermsInput {
  @Field(() => [UserUpdateContractTermInput], {nullable: true }) 
  contractTerms: UserUpdateContractTermInput[]
}
