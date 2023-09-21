
import {ActionBase} from '@schema-driven/foundation'
import {ContactBusinessProviderService} from './../contact.business-provider.service'

/**
 * A helper class to provide the action with required dependencies and
 * starting the execution of the action life-cycle pipeline.
 */
export abstract class ContactBusinessActionBase<T> extends ActionBase<T> {
  showRuleMessages = true
  hideRuleMessages = false

  businessProvider!: ContactBusinessProviderService
  // override loggingService!: ILoggingService;
  // override actionName: string;

  constructor(actionName: string) {
    super()
    this.actionName = actionName
  }

  /**
   * Use the [Do] method to perform the action. Also uses [inversion of control]
   * and provides the action the same instance of the [service context] and
   * [logging service].
   */
  Do(businessProvider: ContactBusinessProviderService) {this.businessProvider = businessProvider
    this.serviceContext = businessProvider.serviceContext
    this.loggingService = businessProvider.loggingService

    this.execute()
    return this.response
  }
}


