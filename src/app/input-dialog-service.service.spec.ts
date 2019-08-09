import { TestBed } from '@angular/core/testing';
import { GroceriesServiceService } from './groceries-service.service';
import { InputDialogServiceService } from './input-dialog-service.service';

describe('InputDialogServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InputDialogServiceService = TestBed.get(InputDialogServiceService);
    expect(service).toBeTruthy();
  });
});
