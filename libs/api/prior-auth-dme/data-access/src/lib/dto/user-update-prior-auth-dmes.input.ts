import { Field, InputType } from '@nestjs/graphql'
import { UserUpdatePriorAuthDmeInput } from './user-update-prior-auth-dme.input'

@InputType()
export class UserUpdatePriorAuthDmesInput {
  @Field(() => [UserUpdatePriorAuthDmeInput], {nullable: true }) 
  priorAuthDmes: UserUpdatePriorAuthDmeInput[]
}
