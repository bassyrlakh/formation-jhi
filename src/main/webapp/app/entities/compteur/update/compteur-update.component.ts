import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IClient } from 'app/entities/client/client.model';
import { ClientService } from 'app/entities/client/service/client.service';
import { ICompteur } from '../compteur.model';
import { CompteurService } from '../service/compteur.service';
import { CompteurFormService, CompteurFormGroup } from './compteur-form.service';

@Component({
  standalone: true,
  selector: 'jhi-compteur-update',
  templateUrl: './compteur-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class CompteurUpdateComponent implements OnInit {
  isSaving = false;
  compteur: ICompteur | null = null;

  clientsSharedCollection: IClient[] = [];

  editForm: CompteurFormGroup = this.compteurFormService.createCompteurFormGroup();

  constructor(
    protected compteurService: CompteurService,
    protected compteurFormService: CompteurFormService,
    protected clientService: ClientService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  compareClient = (o1: IClient | null, o2: IClient | null): boolean => this.clientService.compareClient(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ compteur }) => {
      this.compteur = compteur;
      if (compteur) {
        this.updateForm(compteur);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const compteur = this.compteurFormService.getCompteur(this.editForm);
    if (compteur.id !== null) {
      this.subscribeToSaveResponse(this.compteurService.update(compteur));
    } else {
      this.subscribeToSaveResponse(this.compteurService.create(compteur));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICompteur>>): void {
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

  protected updateForm(compteur: ICompteur): void {
    this.compteur = compteur;
    this.compteurFormService.resetForm(this.editForm, compteur);

    this.clientsSharedCollection = this.clientService.addClientToCollectionIfMissing<IClient>(
      this.clientsSharedCollection,
      compteur.client,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.clientService
      .query()
      .pipe(map((res: HttpResponse<IClient[]>) => res.body ?? []))
      .pipe(map((clients: IClient[]) => this.clientService.addClientToCollectionIfMissing<IClient>(clients, this.compteur?.client)))
      .subscribe((clients: IClient[]) => (this.clientsSharedCollection = clients));
  }
}
