import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { GroceriesServiceService } from './groceries-service.service';
import { Component } from '@angular/core';


@Injectable()
export class InputDialogServiceService {

  constructor(public alertController: AlertController, public dataService: GroceriesServiceService) { 
  }
  
async showPrompt(item?, index?) {
  const alert = await this.alertController.create({
    header: item ? 'Edit Item!': 'Add Item',
    message: item? 'Please edit item...': "Please enter item.",
    inputs: [
      {
        name: 'name',
        type: 'text',
        placeholder: 'Name',
        value: item ? item.name : null
      },
      {
        name: 'quantity',
        type: 'number',
        placeholder: 'Quantity',
        value: item ? item.quantity : null
      }
    ],
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Confirm Cancel');
        }
      }, {
        text: 'Ok',
        handler: (item) => {
          console.log('Confirm Ok', item);
          if (index !== undefined) {
            this.dataService.editItem(item, index);
          }
          else {
            this.dataService.addItem(item);
          }
        }
      }
    ]
  });
  await alert.present();
}
}
