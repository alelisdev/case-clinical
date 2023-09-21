import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateTenantInput } from './user-update-tenant.input'

@InputType()
export class UserUpdateTenantsInput {
  @Field(() => [UserUpdateTenantInput], { nullable: true })
  tenants: UserUpdateTenantInput[]
}
