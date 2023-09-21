import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateVendorInput } from '@case-clinical/api/vendor/data-access' 


@InputType()
export class UserUpdateVendorTypeInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [UserUpdateVendorInput], { nullable: true }) 
  vendors?: UserUpdateVendorInput[]


}