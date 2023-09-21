import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateContractKindInput } from './user-update-contract-kind.input'

@InputType()
export class UserUpdateContractKindsInput {
  @Field(() => [UserUpdateContractKindInput], {nullable: true }) 
  contractKinds: UserUpdateContractKindInput[]
}
