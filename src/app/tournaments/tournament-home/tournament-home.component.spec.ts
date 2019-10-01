import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentHomeComponent } from './tournament-home.component';
import { FormsModule } from '@angular/forms';
import { IgxIconModule, IgxDividerModule, IgxInputGroupModule, IgxSelectModule } from 'igniteui-angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ServiceWorkerModule } from '@angular/service-worker';
import { RouterTestingModule } from '@angular/router/testing';

describe('TournamentHomeComponent', () => {
  let component: TournamentHomeComponent;
  let fixture: ComponentFixture<TournamentHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        ServiceWorkerModule.register('', {enabled: false}),
        IgxIconModule,
        IgxDividerModule,
        IgxInputGroupModule,
        IgxSelectModule
      ],
      declarations: [ TournamentHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
