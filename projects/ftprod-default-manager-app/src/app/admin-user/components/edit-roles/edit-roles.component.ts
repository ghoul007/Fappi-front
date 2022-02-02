import {Component, Input} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {RoleResource, RoleService, SetRolesDto} from 'fappi-common-model';
import {UXMessageService} from 'fappi-ng-material-kit';

@Component({
  selector: 'app-edit-roles',
  templateUrl: './edit-roles.component.html',
  styleUrls: ['./edit-roles.component.scss']
})
export class EditRolesViewComponent {

  roleForm: FormGroup;
  // id of the element that old roles
  @Input()
  refererId: string;
  allRoles: RoleResource[];

  constructor(private fb: FormBuilder, private roleService: RoleService, private router: Router,
              private route: ActivatedRoute, private uxMessageService: UXMessageService) {

    this.roleService.findAll().subscribe(allRoles => {
        this.allRoles = allRoles;
        this.roleService.findRolesOf(this.refererId).subscribe(roles => {
            this.initForm(roles);

          },
          (err) => this.uxMessageService.handleError(err)
        );
      },
      (err) => this.uxMessageService.handleError(err)
    );
  }

  initForm(roles: RoleResource[]) {
    this.roleForm = this.fb.group({
      roles: this.fb.array([])
    });

    for (const role of this.allRoles) {
      const group: FormGroup = this.fb.group({
        selected: this.fb.control(this.isInRole(roles, role), Validators.required),
        id: role.id,
        name: role.name,
      });
      (this.roleForm.get('roles') as FormArray).push(group);
    }
  }

  getRoleFormArray(): any[] {
    const fc: FormArray = this.roleForm.get('roles') as FormArray;
    if (!fc || !fc.controls) {
      return [];
    }
    const fg = fc.controls as FormGroup[];

    const toReturn: any[] = [];

    for (const fgone of fg) {
      toReturn.push(fgone);
    }
    return toReturn;
    /*    console.log(typeof fg);
        if (!(this.roleForm.get('roles') as FormArray)) {
          return [];
        }
        return (this.roleForm.get('roles') as FormArray).controls || [];*/
  }

  onSubmitForm() {
    const rolesValues = this.roleForm.get('roles') as FormArray;
    const roles = new SetRolesDto();

    for (const rolesValue of rolesValues.controls) {
      if (rolesValue.get('selected').value) {
        // The name is used as id
        roles.selectedRoles.push(rolesValue.get('name').value);
      }
    }

    this.roleService.saveRolesOf(this.refererId, roles).subscribe((ret) => {
        this.uxMessageService.handleSuccess('Roles saved');
      },
      (err) => this.uxMessageService.handleError(err)
    );
  }

  back() {
    window.history.back();
  }


  isInRole(roles, role) {
    return roles.map((e) => {
      return e.id;
    }).indexOf(role.id) >= 0;
  }
}
