<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Ionic Storage</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <h1>Promedio</h1>
        <ion-grid>
          <ion-row>
            <ion-col>
              <ion-input fill="outline" label="30%" placeholder="Nota 1" v-model="nota1"></ion-input>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col>
              <ion-input fill="outline" label="70%" placeholder="Nota 2" v-model="nota2"></ion-input>
            </ion-col>
          </ion-row>
          <ion-row v-show="(nota1 > 0 && nota2 > 0)">
            <ion-col>
              <ion-button fill="outline" expand="block" @click="calcularPromedio">Calcular Promedio</ion-button>
            </ion-col>
          </ion-row>
        </ion-grid>
        <ion-alert :is-open="alertState" header="Respuesta" :message="alertMessage" @didDismiss="alertState = false"></ion-alert>
      </ion-content>
    </ion-page>
  </template>
  
  <script>
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonButton, IonInput, IonAlert } from '@ionic/vue';
  import { Storage } from '@ionic/storage';

  export default {
    name: 'EjemploUno',
    components: {
      IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonButton, IonInput, IonAlert
    },
    data() {
      return {
        nota1: 0,         // Variables para capturar las notas del ion-input
        nota2: 0,
        alertMessage: '', // Variable para guardar el mensaje del ion-alert
        alertState: false // Variable para controlar la visibilidad del ion-alert
      }
    },
    methods: {
      async calcularPromedio(){
        // Iniciar storage
        let storage = new Storage()
        // Crear storage
        await storage.create()
        // Guardar notas en el Storage
        await storage.set('nota1', this.nota1)
        await storage.set('nota2', this.nota2)
        // Obtener notas del storage
        let n1 = await storage.get('nota1')
        let n2 = await storage.get('nota2')
        // Calcular promedio
        this.alertMessage = 'Su promedio es: '+(n1*0.3 + n2*0.7).toFixed(2)
        // Mostrar la alerta
        this.alertState = true
        }
    }
  }
  </script>
    