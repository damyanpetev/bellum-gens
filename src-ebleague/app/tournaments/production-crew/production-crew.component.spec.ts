import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionCrewComponent } from './production-crew.component';
import { IgxCardModule, IgxIconModule, IgxButtonModule } from 'igniteui-angular';
import { RouterTestingModule } from '@angular/router/testing';

describe('ProductionCrewComponent', () => {
  let component: ProductionCrewComponent;
  let fixture: ComponentFixture<ProductionCrewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductionCrewComponent ],
      imports: [
        IgxCardModule,
        IgxIconModule,
        IgxButtonModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductionCrewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});