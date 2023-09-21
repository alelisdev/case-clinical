import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateUserRoleInput } from './user-update-user-role.input'

@InputType()
export class UserUpdateUserRolesInput {
  @Field(() => [UserUpdateUserRoleInput], {nullable: true }) 
  userRoles: UserUpdateUserRoleInput[]
}
