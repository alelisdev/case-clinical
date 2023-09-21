import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateProcedureVendorInput } from './user-update-procedure-vendor.input'

@InputType()
export class UserUpdateProcedureVendorsInput {
  @Field(() => [UserUpdateProcedureVendorInput], {nullable: true }) 
  procedureVendors: UserUpdateProcedureVendorInput[]
}
