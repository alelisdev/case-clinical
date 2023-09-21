import { Field, InputType } from '@nestjs/graphql'

import { UserCreateProcedureVendorInput } from '@case-clinical/api/procedure-vendor/data-access' 


@InputType()
export class UserCreateProcedureVendorStatusInput {

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [UserCreateProcedureVendorInput], { nullable: true }) 
  procedureVendors?: UserCreateProcedureVendorInput[]


}
