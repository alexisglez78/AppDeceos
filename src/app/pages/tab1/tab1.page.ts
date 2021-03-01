import { Component, OnInit } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { Router } from '@angular/router';
import { AlertController} from '@ionic/angular';
import { star} from 'ionicons/icons';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public deseosService: DeseosService, private router: Router, private alert: AlertController) {
  // this.lista = deseosService;
  console.log(deseosService.listas);
  }

  OnInit(){
    console.log('listo');
  }

  agregarLista(){
    // this.router.navigateByUrl('/tabs/agregar');
    this.presentAlertPrompt();

  }
  onClick(){
  this.presentAlert();
  }
  async presentAlert() {
    const alert = await this.alert.create({
      cssClass: 'my-custom-class',
      header: 'Hey¡¡¡',
      subHeader: 'Te amo <3',
      message: 'Nunca lo olvides.',
      buttons: [{text: 'cancel',
      handler: () => {
        console.log('Confirm Cancel');
      }
    }]
      
    });

    await alert.present();
  }
  // listaSeleccionada(lista: Lista){
  //   console.log(lista);
  //   const listaId = lista.id;
  //   this.router.navigateByUrl(`/tabs/agregar/${listaId}`);
  // }
  async presentAlertPrompt() {
    const alert = await this.alert.create({
      cssClass: 'my-custom-class',
      header: 'Nueva Lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          placeholder: 'Nombre de la lista'
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
          text: 'Crear',
          handler: (data) => {
            console.log(data);
            if (data.titulo.lenght > 0){
            return;
            }
            const listaId = this.deseosService.crearLista(data.titulo);
            this.router.navigateByUrl(`/tabs/tab1/agregar/${listaId}`);

          }
        }
      ]
    });

    await alert.present();
  }
}
