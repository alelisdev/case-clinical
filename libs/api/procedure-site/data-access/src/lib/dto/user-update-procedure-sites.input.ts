import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateProcedureSiteInput } from './user-update-procedure-site.input'

@InputType()
export class UserUpdateProcedureSitesInput {
  @Field(() => [UserUpdateProcedureSiteInput], {nullable: true }) 
  procedureSites: UserUpdateProcedureSiteInput[]
}
