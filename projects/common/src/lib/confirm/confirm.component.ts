import { Component, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { IDialogEventArgs, IgxComboModule, IgxDialogComponent, IgxDialogModule, IgxSimpleComboComponent } from '@infragistics/igniteui-angular';

@Component({
    selector: 'bg-confirm',
    templateUrl: './confirm.component.html',
    styleUrls: ['./confirm.component.css'],
    standalone: true,
    imports: [IgxDialogModule, IgxComboModule]
})
export class ConfirmComponent {
  @Input()
  public title = '';

  @Output()
  public ok = new EventEmitter<any>();

  @Output()
  public cancel = new EventEmitter<IDialogEventArgs>();

  @ViewChild(IgxDialogComponent, { static: true })
  public dialog: IgxDialogComponent;

  private confirmEntity: any;

  constructor() { }

  public okClicked() {
    this.ok.emit(this.confirmEntity);
    this.dialog.close();
  }

  public cancelClicked(args: IDialogEventArgs) {
    this.cancel.emit(args);
    this.dialog.close();
  }

  public onClose() {
    this.confirmEntity = null;
  }

  public open(entity?) {
    const test: IgxSimpleComboComponent = null;

    this.confirmEntity = entity;
    this.dialog.open({ modal: !!test.displayValue, closeOnEscape: !!test.value});
  }
}


