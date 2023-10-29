<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Ionic Storage</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <h1>Países favoritos</h1>
        <ion-grid>
          <ion-row>
            <ion-col>
              <ion-select v-model="seleccionado" fill="outline" interface="action-sheet" placeholder="Seleccione un país">
                <ion-select-option v-for="(pais, i) in paises" :value="pais" :key="i">{{ pais }}</ion-select-option>
              </ion-select>
              <ion-button fill="outline" expand="block" @click="agregar">Agregar a la lista</ion-button>
            </ion-col>
          </ion-row>
        </ion-grid>
        <template v-if="lista.length!=0">
          <h1>Lista de favoritos</h1>
          <!-- Se invoca al método eliminarLista para borrar un elemento de la lista-->
          <ion-button color="danger" @click="eliminarLista">Borrar lista</ion-button>
          <ion-list>
          <!-- Se recorre el arreglo para mostrar los países que están en la lista -->
          <ion-item v-for="(fav, i) in lista" :key="i">
          <ion-label>{{ fav }}</ion-label>
          <!-- Se invoca al método eliminarLista para borrar un elemento de la lista-->
          <ion-button @click="eliminarFavorito(i)">Borrar</ion-button>
          </ion-item>
          </ion-list>
          </template>
      </ion-content>
    </ion-page>
  </template>
  
  <script>
  import {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonSelect, IonSelectOption,
    IonGrid, IonRow, IonCol, IonList, IonItem, IonButton, IonLabel
  } from '@ionic/vue';
  
  // Importación del storage
  import { Storage } from '@ionic/storage';
  
  export default {
    name: 'EjemploDos',
    components: {
      IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonSelect, IonSelectOption,
      IonGrid, IonRow, IonCol, IonList, IonItem, IonButton, IonLabel
    },
    data() {
      return {
        paises: ['España', 'Francia', 'Portugal', 'Italia'],
        seleccionado: null,
        // Se inicia el Storage como variable para que pueda ser utilizada en todos los métodos
        store: new Storage(),
        // Variable para guardar los países que se van seleccionando
        favoritos: [],
        // Variable para guardar los países almacenados en el Storage
        lista: []
      };
    },
    methods: {
      // Inicializa el almacenamiento
      async iniciarStorage() {
        await this.store.create();
      },
      // Guardar datos en el storage
      async agregar() {
        if (this.seleccionado !== null) {
          // Agregar el país al arreglo de favoritos
          this.favoritos.push(this.seleccionado);
          // Guardar el arreglo en el storage
          await this.store.set('paises', JSON.stringify(this.favoritos));
          // Limpiar país seleccionado
          this.seleccionado = null;
          // Leer datos
          this.leer();
        }
      },
      // Leer los datos en el storage
      async leer() {
        // Recuperar datos del storage
        let datos = await this.store.get('paises');
        if (datos) {
          this.lista = JSON.parse(datos);
        } else {
          this.lista = [];
        }
      },
      // Eliminar un elemento
      async eliminarFavorito(i) {
        this.favoritos.splice(i, 1);
        await this.store.set('paises', JSON.stringify(this.favoritos));
        this.leer();
      },
      // Eliminar todos los elementos
      async eliminarLista() {
        await this.store.remove('paises');
        this.favoritos = [];
        this.leer();
      }
    },
    // Ejecutar métodos cuando el componente se esté mostrando
    ionViewWillEnter() {
      this.iniciarStorage();
      this.leer();
    }
  };
  </script>