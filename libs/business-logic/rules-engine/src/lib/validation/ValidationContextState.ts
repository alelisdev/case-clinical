/**
 * Use this enumeration to determine the state of the Validation Context.
 */
export enum ValidationContextState {
  /**
   * Indicates that no rules have been evaluated by the validation context.
   */
  NotEvaluated = 'NotEvaluated',

  /** Use to indicate that all rules evaluated without any violations. */
  Success = 'Success',

  /** Use to indicate that one or more evaluated rules contain violations. */
  Failure = 'Failure',
}
