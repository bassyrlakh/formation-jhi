import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ICompteur } from 'app/entities/compteur/compteur.model';
import { CompteurService } from 'app/entities/compteur/service/compteur.service';
import { IFacture } from '../facture.model';
import { FactureService } from '../service/facture.service';
import { FactureFormService, FactureFormGroup } from './facture-form.service';

@Component({
  standalone: true,
  selector: 'jhi-facture-update',
  templateUrl: './facture-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class FactureUpdateComponent implements OnInit {
  isSaving = false;
  facture: IFacture | null = null;

  compteursSharedCollection: ICompteur[] = [];

  editForm: FactureFormGroup = this.factureFormService.createFactureFormGroup();

  constructor(
    protected factureService: FactureService,
    protected factureFormService: FactureFormService,
    protected compteurService: CompteurService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  compareCompteur = (o1: ICompteur | null, o2: ICompteur | null): boolean => this.compteurService.compareCompteur(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ facture }) => {
      this.facture = facture;
      if (facture) {
        this.updateForm(facture);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const facture = this.factureFormService.getFacture(this.editForm);
    if (facture.id !== null) {
      this.subscribeToSaveResponse(this.factureService.update(facture));
    } else {
      this.subscribeToSaveResponse(this.factureService.create(facture));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFacture>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(facture: IFacture): void {
    this.facture = facture;
    this.factureFormService.resetForm(this.editForm, facture);

    this.compteursSharedCollection = this.compteurService.addCompteurToCollectionIfMissing<ICompteur>(
      this.compteursSharedCollection,
      facture.compteur,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.compteurService
      .query()
      .pipe(map((res: HttpResponse<ICompteur[]>) => res.body ?? []))
      .pipe(
        map((compteurs: ICompteur[]) =>
          this.compteurService.addCompteurToCollectionIfMissing<ICompteur>(compteurs, this.facture?.compteur),
        ),
      )
      .subscribe((compteurs: ICompteur[]) => (this.compteursSharedCollection = compteurs));
  }
}
