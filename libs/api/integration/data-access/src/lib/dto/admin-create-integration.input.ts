import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateContactSettingInput } from '@case-clinical/api/contact-setting/data-access' 


@InputType()
export class AdminCreateIntegrationInput {

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [AdminCreateContactSettingInput], { nullable: true }) 
  contactSettings?: AdminCreateContactSettingInput[]


}