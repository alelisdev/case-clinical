import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateRolePermissionInput } from './user-update-role-permission.input'

@InputType()
export class UserUpdateRolePermissionsInput {
  @Field(() => [UserUpdateRolePermissionInput], {nullable: true }) 
  rolePermissions: UserUpdateRolePermissionInput[]
}
