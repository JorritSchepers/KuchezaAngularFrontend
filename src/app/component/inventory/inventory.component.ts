import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TokenModel } from '../../model/token.model';
import { Router } from '@angular/router';
import { InventoryApi } from 'src/app/api/inventory.api';
import { InventoryModel } from 'src/app/model/inventory.model';

@Component({
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})

export class InventoryComponent {
  inventory: InventoryModel;

  constructor(private inventoryApi: InventoryApi) {
    this.getInventory();
  }

  private getInventory(): void {
    this.inventory = this.inventoryApi.getInventory();
  }
}
