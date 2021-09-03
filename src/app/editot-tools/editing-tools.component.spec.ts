import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditingToolsComponent } from './editing-tools.component';

describe('EditotToolsComponent', () => {
  let component: EditingToolsComponent;
  let fixture: ComponentFixture<EditingToolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditingToolsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditingToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
