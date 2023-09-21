import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateFeaturePermissionInput } from './user-update-feature-permission.input'

@InputType()
export class UserUpdateFeaturePermissionsInput {
  @Field(() => [UserUpdateFeaturePermissionInput], {nullable: true }) 
  featurePermissions: UserUpdateFeaturePermissionInput[]
}
