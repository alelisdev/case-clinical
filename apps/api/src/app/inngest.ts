import { User } from "@case-clinical/api/user/data-access";
import { LegalCase } from "@case-clinical/api/legal-case/data-access";

import { Inngest } from "inngest";

type UserCreateApplyForPchCoverageEvent = {
    name: "UserRequested.Create.ApplyForPCH",
    data: LegalCase,
    user: User 
  }


type Events = {
    "UserRequested.Create.ApplyForPCH": UserCreateApplyForPchCoverageEvent;
  }
  
export const inngest = new Inngest<Events>({ name: "Case Clinical", eventKey: process.env.INNGEST_SOURCE_API_KEY });

export const ApplyForPchCoverageFunction = inngest.createFunction(
    { name: "Apply for PCH Coverage for Legal Case" },
    { event: "UserRequested.Create.ApplyForPCH" },
    async ({ event }) => {
      // Call the backend with the event in the step function
      console.log(event)
      return event;
    },
  );

export default ApplyForPchCoverageFunction;
// const rootPath = join(__dirname, '..', 'web')
