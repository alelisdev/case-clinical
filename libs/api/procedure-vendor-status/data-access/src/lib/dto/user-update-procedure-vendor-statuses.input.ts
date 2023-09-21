import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateProcedureVendorStatusInput } from './user-update-procedure-vendor-status.input'

@InputType()
export class UserUpdateProcedureVendorStatusesInput {
  @Field(() => [UserUpdateProcedureVendorStatusInput], {nullable: true }) 
  procedureVendorStatuses: UserUpdateProcedureVendorStatusInput[]
}
