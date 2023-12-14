import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { FactureDetailComponent } from './facture-detail.component';

describe('Facture Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FactureDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: FactureDetailComponent,
              resolve: { facture: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(FactureDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load facture on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', FactureDetailComponent);

      // THEN
      expect(instance.facture).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
