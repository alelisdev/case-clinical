import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateRoleFeaturePermissionInput } from './user-update-role-feature-permission.input'

@InputType()
export class UserUpdateRoleFeaturePermissionsInput {
  @Field(() => [UserUpdateRoleFeaturePermissionInput], {nullable: true }) 
  roleFeaturePermissions: UserUpdateRoleFeaturePermissionInput[]
}
