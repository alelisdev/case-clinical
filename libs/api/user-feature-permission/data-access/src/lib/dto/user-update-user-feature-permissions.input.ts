import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateUserFeaturePermissionInput } from './user-update-user-feature-permission.input'

@InputType()
export class UserUpdateUserFeaturePermissionsInput {
  @Field(() => [UserUpdateUserFeaturePermissionInput], {nullable: true }) 
  userFeaturePermissions: UserUpdateUserFeaturePermissionInput[]
}
