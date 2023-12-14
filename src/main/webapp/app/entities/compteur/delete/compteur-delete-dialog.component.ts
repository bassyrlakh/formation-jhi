import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ICompteur } from '../compteur.model';
import { CompteurService } from '../service/compteur.service';

@Component({
  standalone: true,
  templateUrl: './compteur-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class CompteurDeleteDialogComponent {
  compteur?: ICompteur;

  constructor(
    protected compteurService: CompteurService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.compteurService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
