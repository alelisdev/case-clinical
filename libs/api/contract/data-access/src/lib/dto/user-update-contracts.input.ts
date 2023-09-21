import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateContractInput } from './user-update-contract.input'

@InputType()
export class UserUpdateContractsInput {
  @Field(() => [UserUpdateContractInput], {nullable: true }) 
  contracts: UserUpdateContractInput[]
}
