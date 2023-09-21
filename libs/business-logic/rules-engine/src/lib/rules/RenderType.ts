/**
 * Use to indicate how the rule-set is rendered.
 */
export enum RenderType {
  /**
   * Use to indicate the rule rendering stops when a rule's evaluation is false - rule contains violations.
   */
  ExitOnFirstFalseEvaluation = 'ExitOnFirstFalseEvaluation',

  /**
   * Use to indicate the rule rendering stops when a rule's evaluation is true (no rule violations).
   */
  ExitOnFirstTrueEvaluation = 'ExitOnFirstTrueEvaluation',

  /**
   * Use to indicate that all rules of the rule set are rendered - returns all rule results.
   */
  EvaluateAllRules = 'EvaluateAllRules',
}
