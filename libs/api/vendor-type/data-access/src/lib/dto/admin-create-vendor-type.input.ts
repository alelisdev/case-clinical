import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateVendorInput } from '@case-clinical/api/vendor/data-access' 


@InputType()
export class AdminCreateVendorTypeInput {

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [AdminCreateVendorInput], { nullable: true }) 
  vendors?: AdminCreateVendorInput[]


}