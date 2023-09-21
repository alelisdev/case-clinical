import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateContactSettingInput } from '@case-clinical/api/contact-setting/data-access' 


@InputType()
export class AdminUpdateIntegrationInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [UserUpdateContactSettingInput], { nullable: true }) 
  contactSettings?: UserUpdateContactSettingInput[]


}