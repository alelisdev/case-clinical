import { Field, InputType } from '@nestjs/graphql'

import { UserCreateContactSettingInput } from '@case-clinical/api/contact-setting/data-access' 


@InputType()
export class UserCreateIntegrationInput {

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [UserCreateContactSettingInput], { nullable: true }) 
  contactSettings?: UserCreateContactSettingInput[]


}
