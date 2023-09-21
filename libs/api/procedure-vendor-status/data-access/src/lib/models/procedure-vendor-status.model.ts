import { Field, ObjectType } from '@nestjs/graphql'

import { ProcedureVendor } from '@case-clinical/api/procedure-vendor/data-access' 


@ObjectType()
export class ProcedureVendorStatus {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [ProcedureVendor], { nullable: true }) 
  procedureVendors?: ProcedureVendor[]


}
