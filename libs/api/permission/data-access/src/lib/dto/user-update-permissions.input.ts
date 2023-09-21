import { Field, InputType } from '@nestjs/graphql'
import { UserUpdatePermissionInput } from './user-update-permission.input'

@InputType()
export class UserUpdatePermissionsInput {
  @Field(() => [UserUpdatePermissionInput], {nullable: true }) 
  permissions: UserUpdatePermissionInput[]
}
