import { Field, InputType } from '@nestjs/graphql'

import { UserCreateVendorInput } from '@case-clinical/api/vendor/data-access' 


@InputType()
export class UserCreateVendorTypeInput {

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [UserCreateVendorInput], { nullable: true }) 
  vendors?: UserCreateVendorInput[]


}
