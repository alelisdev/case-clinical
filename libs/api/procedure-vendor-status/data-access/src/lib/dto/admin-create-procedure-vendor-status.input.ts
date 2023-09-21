import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateProcedureVendorInput } from '@case-clinical/api/procedure-vendor/data-access' 


@InputType()
export class AdminCreateProcedureVendorStatusInput {

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [AdminCreateProcedureVendorInput], { nullable: true }) 
  procedureVendors?: AdminCreateProcedureVendorInput[]


}