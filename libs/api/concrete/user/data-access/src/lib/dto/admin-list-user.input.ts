import { Field,InputType } from '@nestjs/graphql'
import { CorePagingInput } from '@case-clinical/api/core/data-access'

@InputType()
export class AdminListUserInput extends CorePagingInput {
  @Field({ nullable: true }) 
  name?: string


  @Field({ nullable: true }) 
  firmId?: string  

  @Field({ nullable: true }) 
  userId?: string  

  
  @Field({ nullable: true }) 
  vendorId?: string  




  @Field({ nullable: true }) 
  intakeId?: string  


  @Field({ nullable: true }) 
  emailId?: string  


  @Field({ nullable: true }) 
  settingId?: string  


  @Field({ nullable: true }) 
  userRoleId?: string  


  @Field({ nullable: true }) 
  userCalendarId?: string  


  @Field({ nullable: true }) 
  documentId?: string  


  @Field({ nullable: true }) 
  assignedDocumentId?: string  


  @Field({ nullable: true }) 
  messageId?: string  


  @Field({ nullable: true }) 
  chatId?: string  


  @Field({ nullable: true }) 
  navigationId?: string  


  @Field({ nullable: true }) 
  notificationId?: string  


  @Field({ nullable: true }) 
  shortcutId?: string  


  @Field({ nullable: true }) 
  teamUserId?: string  


  @Field({ nullable: true }) 
  taskItemId?: string  

}
