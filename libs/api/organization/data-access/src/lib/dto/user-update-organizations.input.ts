import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateOrganizationInput } from './user-update-organization.input'

@InputType()
export class UserUpdateOrganizationsInput {
  @Field(() => [UserUpdateOrganizationInput], {nullable: true }) 
  organizations: UserUpdateOrganizationInput[]
}
