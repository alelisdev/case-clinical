import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateInjuryInput } from './user-update-injury.input'

@InputType()
export class UserUpdateInjuriesInput {
  @Field(() => [UserUpdateInjuryInput], {nullable: true }) 
  injuries: UserUpdateInjuryInput[]
}
