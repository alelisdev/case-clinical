import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { distinctUntilChanged, tap } from 'rxjs';
import { MailboxComponent } from '../mailbox.component';
import { MailboxService } from '../mailbox.service';
import { MailLabelNew } from '../mailbox.types';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector     : 'mailbox-settings',
    templateUrl  : './settings.component.html',
    encapsulation: ViewEncapsulation.None
})
export class MailboxSettingsComponent implements OnInit
{
    labels: MailLabelNew[];
    labelsForm: FormGroup;

    /**
     * Constructor
     */
    constructor(
        public mailboxComponent: MailboxComponent,
        private _formBuilder: FormBuilder,
        public _mailboxService: MailboxService
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Create the labels form
        this.labelsForm = this._formBuilder.group({
            labels  : this._formBuilder.array([]),
            newLabel: this._formBuilder.group({
                title: ['']
            })
        });

        // Labels
        this._mailboxService.labels$.subscribe((labels: MailLabelNew[]) => {
                (this.labelsForm.get('labels') as FormArray).controls = [];
                // Get the labels
                this.labels = labels;

                // Iterate through the labels
                labels.forEach((label) => {

                    // Create a label form group
                    const labelFormGroup = this._formBuilder.group({
                        id   : [label.id],
                        title: [label.display_name]
                    });

                    // Add the label form group to the labels form array
                    (this.labelsForm.get('labels') as FormArray).push(labelFormGroup);
                });
            });
            this.labelsForm.get('newLabel.title').valueChanges.pipe(
                distinctUntilChanged(),
                tap((val) => {
                    if(val) {
                        this.labelsForm.get('newLabel.title').patchValue(val.trimLeft());
                    }
                })
              ).subscribe();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Add a label
     */
    addLabel(): void
    {
        // Add label to the server
        this._mailboxService.addLabel(this.labelsForm.get('newLabel').value).subscribe();

        // Reset the new label form
        this.labelsForm.get('newLabel').markAsPristine();
        this.labelsForm.get('newLabel').markAsUntouched();
        this.labelsForm.get('newLabel.title').reset();
        this.labelsForm.get('newLabel.title').clearValidators();
        this.labelsForm.get('newLabel.title').updateValueAndValidity();        
    }

    /**
     * Delete a label
     */
    deleteLabel(id: string): void
    {
        this._mailboxService.deleteLabel(id).subscribe();
    }

    /**
     * Update labels
     */

    updateLabels(label) {
        this._mailboxService.updateLabel(label.value).subscribe();
    }

    labelKeyup(labelControl: FormControl) {
        const val = labelControl.get('title').value;
        if(val) {
            labelControl.get('title').setValue(val.trimLeft());
        }
    }
}
