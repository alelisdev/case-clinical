import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class LocationInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  locationName?: string

  @Field({ nullable: true }) 
  line1?: string

  @Field({ nullable: true }) 
  line2?: string

  @Field({ nullable: true }) 
  city?: string

  @Field({ nullable: true }) 
  state?: string

  @Field({ nullable: true }) 
  postalCode?: string

  @Field({ nullable: true }) 
  latitude?: number

  @Field({ nullable: true }) 
  longitude?: number

  @Field({ nullable: true }) 
  abbrev?: string

  @Field({ nullable: true }) 
  division?: string

  @Field({ nullable: true }) 
  country?: string

  @Field({ nullable: true }) 
  officePhone?: string

  @Field({ nullable: true }) 
  fax?: string

  @Field({ nullable: true }) 
  attentionTo?: string

  @Field({ nullable: true }) 
  placeOfServiceId?: string





}
