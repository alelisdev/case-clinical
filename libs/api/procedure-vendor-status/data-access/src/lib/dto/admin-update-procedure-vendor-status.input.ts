import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateProcedureVendorInput } from '@case-clinical/api/procedure-vendor/data-access' 


@InputType()
export class AdminUpdateProcedureVendorStatusInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [UserUpdateProcedureVendorInput], { nullable: true }) 
  procedureVendors?: UserUpdateProcedureVendorInput[]


}