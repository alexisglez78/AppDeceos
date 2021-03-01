import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';
import { DeseosService } from '../../services/deseos.service';
import { Lista } from '../../models/lista.model';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent {

  @ViewChild( IonList) lista: IonList;
  @Input() terminada = true ;
  constructor(public deseosService: DeseosService, private router: Router, private alert: AlertController) { }

  listaSeleccionada(lista: Lista){
    const listaId = lista.id;

    console.log(this.terminada);
    if (this.terminada ){
      this.router.navigateByUrl(`/tabs/tab2/agregar/${listaId}`);
    }else{
      this.router.navigateByUrl(`/tabs/tab1/agregar/${listaId}`);
  }

  }

  borrarLista(lista: Lista){
  this.deseosService.borrarLista(lista);

  }
  updateLista(lista: Lista){
    this.presentAlertPrompt(lista);
  }


  async presentAlertPrompt(lista: Lista) {
    const alert = await this.alert.create({
      cssClass: 'my-custom-class',
      header: 'Modificar pendiente',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          value: lista.titulo,
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
            this.lista.closeSlidingItems();
          }
        }, {
          text: 'Actualizar',
          handler: (data) => {
           lista.titulo = data.titulo;
           this.deseosService.guardarStorage();
           this.lista.closeSlidingItems();
          //  this.deseosService.modificarLista(id, data.titulo);

          }
        }
      ]
    });

    await alert.present();
  }

}
