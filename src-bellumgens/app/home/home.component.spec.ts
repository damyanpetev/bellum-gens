import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { IgxInputGroupModule,
  IgxIconModule,
  IgxAvatarModule,
  IgxProgressBarModule,
  IgxDividerModule,
  IgxButtonModule,
  IgxDialogModule,
  IgxCarouselModule} from 'igniteui-angular';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BellumGensModule } from 'src-common/components/components.module';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        NoopAnimationsModule,
        RouterTestingModule,
        ServiceWorkerModule.register('', {enabled: false}),
        IgxInputGroupModule,
        IgxIconModule,
        IgxAvatarModule,
        IgxDividerModule,
        IgxProgressBarModule,
        IgxButtonModule,
        IgxCarouselModule,
        IgxDialogModule,
        BellumGensModule
      ],
      declarations: [
        HomeComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
