import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class VendorLocationInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string


  @Field({ nullable: true }) 
  vendorId?: string
}
