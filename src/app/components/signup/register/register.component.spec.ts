import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports:[FormsModule]

      
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
   it('should enable button',() =>{
    const compiled = fixture.nativeElement as HTMLElement;
    const x =compiled.querySelector('#userDetail')?.ariaInvalid
   })

   it('should contain a "Submit" button with correct text', () =>{

    const button = fixture.debugElement.query(By.css('button'));
    expect(button.nativeElement.textContent.trim()).toBe('Register')
   })

   it('should have a valid email input field ', () => {
    const inputElements:HTMLInputElement =fixture.nativeElement.querySelector('#Email');
    expect(inputElements.type).toBe('email')
    expect(inputElements).toBeTruthy();
  });
});

