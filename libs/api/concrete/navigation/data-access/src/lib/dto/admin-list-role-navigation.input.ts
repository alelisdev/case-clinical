import { Field,InputType } from '@nestjs/graphql'

@InputType()
export class AdminListRoleNavigationInput {
  @Field({ nullable: true })
  roleId?: string
}
