import { Field, InputType } from '@nestjs/graphql'
import { UserUpdatePriorAuthorizationImplantInput } from './user-update-prior-authorization-implant.input'

@InputType()
export class UserUpdatePriorAuthorizationImplantsInput {
  @Field(() => [UserUpdatePriorAuthorizationImplantInput], {nullable: true }) 
  priorAuthorizationImplants: UserUpdatePriorAuthorizationImplantInput[]
}
