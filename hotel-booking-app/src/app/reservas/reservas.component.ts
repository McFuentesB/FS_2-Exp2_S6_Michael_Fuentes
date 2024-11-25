import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

/**
 * @fileoverview
 * Componente para gestionar las reservas de habitaciones del hotel.
 * Permite visualizar, cancelar y navegar entre las reservas existentes.
 */

/**
 * Componente de reservas que permite gestionar las reservas de habitaciones.
 * - Carga las reservas almacenadas en el almacenamiento local.
 * - Permite cancelar una reserva.
 * - Navega al dashboard del administrador.
 */
@Component({
  selector: 'app-reservas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent implements OnInit {
  
  /**
   * Lista de reservas del usuario, cargada desde el almacenamiento local.
   */
  reservations: any[] = []; 

  /**
   * Lista de habitaciones disponibles para reservas.
   */
  rooms = [
    {
      id: 1,
      name: 'Habitación 101',
      description: 'Habitación con vista al mar',
      price: 100,
      image: 'https://images.mirai.com/INFOROOMS/100377926/GEe1lJbqZ4nh3FPX9vKs/GEe1lJbqZ4nh3FPX9vKs_original.jpg',
      selectedDate: null,
    },
    {
      id: 2,
      name: 'Habitación 102',
      description: 'Habitación con vista al jardín',
      price: 80,
      image: 'https://images.mirai.com/INFOROOMS/100377926/iMoSTVry2RUN8ztTXive/iMoSTVry2RUN8ztTXive_original.jpg',
      selectedDate: null,
    },
    {
      id: 3,
      name: 'Habitación 103',
      description: 'Habitación estándar',
      price: 60,
      image: 'https://images.mirai.com/INFOROOMS/100377926/v9txb3gzIkeHPJqNCYWG/v9txb3gzIkeHPJqNCYWG_original.jpg',
      selectedDate: null,
    },
  ];

  constructor(private storageService: StorageService,
              private router: Router) {}

  /**
   * Método de ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Carga las reservas almacenadas desde el localStorage.
   */
  ngOnInit(): void {
    this.loadReservations();
  }

  /**
   * Carga las reservas desde el almacenamiento local.
   * Si existen reservas almacenadas, las carga en la propiedad `reservations`.
   * Si no existen reservas, inicializa la propiedad como un array vacío.
   */
  loadReservations() {
    const storedReservations = this.storageService.get('reservations');
    if (storedReservations) {
      this.reservations = storedReservations;
    } else {
      this.reservations = [];
    }
  }

  /**
   * Cancela una reserva específica.
   * Elimina la reserva de la lista de reservas y actualiza el almacenamiento local.
   * 
   * @param id Identificador de la reserva a cancelar.
   */
  cancelReservation(id: string) {
    this.reservations = this.reservations.filter(reservation => reservation.id !== id);
    this.storageService.save('reservations', this.reservations);
  }

  /**
   * Navega al dashboard del administrador.
   * Se utiliza el router de Angular para redirigir al usuario al dashboard.
   */
  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  /**
   * Obtiene la imagen asociada a la habitación reservada.
   * 
   * @param reservationId Identificador de la reserva para la cual se desea obtener la imagen de la habitación.
   * @returns La URL de la imagen de la habitación si se encuentra; de lo contrario, devuelve una cadena vacía.
   */
  getRoomImage(reservationId: number): string {
    const room = this.rooms.find(room => room.id === reservationId);
    return room ? room.image : ''; // Devuelve la imagen de la habitación si la encuentra, o una cadena vacía si no.
  }
}
