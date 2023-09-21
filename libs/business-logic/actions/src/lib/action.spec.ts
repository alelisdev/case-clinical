import { IsTrue } from '@schema-driven/rules-engine';
import { Action } from '../lib/Action';
import { ActionResult } from './action-result';

class MyAction extends Action {
  isTestAction = true;
  performAction() {
    this.isTestAction = true;
  }
  start() {
    this.isTestAction = true;
  }
  audit() {
    this.isTestAction = true;
  }
  preValidateAction() {
    this.isTestAction = true;
  }
  postValidateAction() {
    this.isTestAction = true;
  }
  preExecuteAction() {
    this.isTestAction = true;
  }
  postExecuteAction() {
    this.isTestAction = true;
  }
  finish() {
    this.isTestAction = true;
  }
  // performAction() {}
  // preValidateAction() {}
  validateActionResult(): ActionResult {
    return this.actionResult;
  }

  validateAction() {
    return this.validationContext.renderRules();
  }
}

class invalidAction extends MyAction {
  actionIsGood = false;
  constructor() {
    super()
  }

  preValidateAction() {
    this.validationContext.addRule(
      new IsTrue('ActionIsGoodRule', 'Sorry, the action is not good.', this.actionIsGood, true)
    );
  }

  performAction() {
    // should never get here with invalid rules;
    this.actionIsGood = true;
  }

  validateActionResult(): ActionResult {
    if (this.validationContext.isValid === false) {
      this.actionResult = ActionResult.Fail;
    }
    return this.actionResult;
  }
}


let testAction: MyAction;
describe('Action', () => {
  beforeEach(() => {
    testAction = new MyAction();
  });

  it('should create an instance', () => {
    expect(testAction).toBeTruthy();
  });

  it('should call preValidateAction when executed', () => {
    jest.spyOn(testAction, 'preValidateAction');
    testAction.execute();
    expect(testAction.preValidateAction).toBeCalled();
  });

  it('should call performAction when executed', () => {
    jest.spyOn(testAction, 'performAction');
    testAction.execute();
    expect(testAction.performAction).toBeCalled();
  });

  it('should call validateActionResult when executed', () => {
    jest.spyOn(testAction, 'validateActionResult');
    testAction.execute();
    expect(testAction.validateActionResult).toBeCalled();
  });

  it('should return default action result', () => {
    testAction.execute();
    expect(testAction.actionResult).toEqual(ActionResult.Unknown);
  });

  it('should not [perform] action with invalid rules', () => {
    const action = new invalidAction();
    action.preValidateAction();
    action.evaluateRules();

    expect(action.allowExecution).toEqual(false);
    expect(action.actionIsGood).toEqual(false);
    expect(action.validationContext.isValid).toEqual(false);
  });
});
