import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginDialogComponent } from './login-dialog.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ServiceWorkerModule } from '@angular/service-worker';
import { IgxDialogModule, IgxButtonModule, IgxIconModule, IgxDividerModule, IgxCheckboxModule } from '@infragistics/igniteui-angular';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { LoginButtonsComponent } from '../login-buttons/login-buttons.component';

describe('LoginDialogComponent', () => {
  let component: LoginDialogComponent;
  let fixture: ComponentFixture<LoginDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginDialogComponent, LoginButtonsComponent ],
      imports: [
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        NoopAnimationsModule,
        ServiceWorkerModule.register('', {enabled: false}),
        IgxDialogModule,
        IgxButtonModule,
        IgxIconModule,
        IgxDividerModule,
        IgxCheckboxModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
