import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class ContactSettingInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  value?: string

  @Field({ nullable: true }) 
  iconUrl?: string

  @Field({ nullable: true }) 
  properties?: string

  @Field({ nullable: true }) 
  contactId?: string

  @Field({ nullable: true }) 
  integrationId?: string
}
