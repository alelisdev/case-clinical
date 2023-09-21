import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateRoleInput } from './user-update-role.input'

@InputType()
export class UserUpdateRolesInput {
  @Field(() => [UserUpdateRoleInput], {nullable: true }) 
  roles: UserUpdateRoleInput[]
}
