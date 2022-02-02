import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-cms-edit-node-toolbar',
  templateUrl: './edit-bar.component.html',
  styleUrls: ['./edit-bar.component.scss'],
  providers: []
})
export class EditBarComponent {

  @Output()
  edit: EventEmitter<void> = new EventEmitter();

  @Output()
  delete: EventEmitter<void> = new EventEmitter();

  @Output()
  editTitle: EventEmitter<void> = new EventEmitter();

  @Output()
  move: EventEmitter<void> = new EventEmitter();

  @Output()
  moveDown: EventEmitter<void> = new EventEmitter();

  @Output()
  moveUp: EventEmitter<void> = new EventEmitter();


  _edit() {
    this.edit.emit();
  }

  _delete() {
    this.delete.emit();
  }

  _editTitle() {
    this.editTitle.emit();
  }

  _move() {
    this.move.emit();
  }

  _moveUp() {
    this.moveUp.emit();
  }

  _moveDown() {
    this.moveDown.emit();
  }

}
