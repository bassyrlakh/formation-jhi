import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { CompteurDetailComponent } from './compteur-detail.component';

describe('Compteur Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompteurDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: CompteurDetailComponent,
              resolve: { compteur: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(CompteurDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load compteur on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', CompteurDetailComponent);

      // THEN
      expect(instance.compteur).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
