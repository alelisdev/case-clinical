import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateContractedRateKindInput } from './user-update-contracted-rate-kind.input'

@InputType()
export class UserUpdateContractedRateKindsInput {
  @Field(() => [UserUpdateContractedRateKindInput], {nullable: true }) 
  contractedRateKinds: UserUpdateContractedRateKindInput[]
}
