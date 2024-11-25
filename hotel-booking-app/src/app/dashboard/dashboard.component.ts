import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importa CommonModule

/**
 * @fileoverview
 * Componente para el Dashboard, donde los usuarios pueden ver y realizar reservas de habitaciones.
 * Permite gestionar las fechas de las reservas y navegar a otras páginas como perfil y reservas.
 */

/**
 * Componente para el Dashboard.
 * Muestra las habitaciones disponibles, permite seleccionar fechas y realizar reservas.
 */
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule], // Asegúrate de que CommonModule esté incluido
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  
  /**
   * Fecha mínima disponible para la reserva, calculada como la fecha actual.
   */
  minDate: string;

  /**
   * Arreglo con las habitaciones disponibles en el hotel.
   * Cada habitación tiene un ID, nombre, descripción, precio, imagen y una fecha seleccionada para la reserva.
   */
  rooms = [
    {
      id: 1,
      name: 'Habitación 101',
      description: 'Habitación con vista al mar',
      price: 100,
      image: 'https://images.mirai.com/INFOROOMS/100377926/GEe1lJbqZ4nh3FPX9vKs/GEe1lJbqZ4nh3FPX9vKs_original.jpg',
      selectedDate: null as string | null,  // Permite null o un string
    },
    {
      id: 2,
      name: 'Habitación 102',
      description: 'Habitación con vista al jardín',
      price: 80,
      image: 'https://images.mirai.com/INFOROOMS/100377926/iMoSTVry2RUN8ztTXive/iMoSTVry2RUN8ztTXive_original.jpg',
      selectedDate: null as string | null,
    },
    {
      id: 3,
      name: 'Habitación 103',
      description: 'Habitación estándar',
      price: 60,
      image: 'https://images.mirai.com/INFOROOMS/100377926/v9txb3gzIkeHPJqNCYWG/v9txb3gzIkeHPJqNCYWG_original.jpg',
      selectedDate: null as string | null,
    },
  ];

  /**
   * Constructor del componente, inicializa la fecha mínima de reserva.
   * @param {Router} router - El servicio Router para la navegación.
   */
  constructor(private router: Router) {
    this.minDate = this.getTodayDate(); // Calcula la fecha mínima al inicializar el componente
  }

  /**
   * Calcula la fecha de hoy en formato "YYYY-MM-DD".
   * @returns {string} La fecha actual en formato "YYYY-MM-DD".
   */
  getTodayDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Mes en formato 2 dígitos
    const day = String(today.getDate()).padStart(2, '0'); // Día en formato 2 dígitos
    return `${year}-${month}-${day}`;
  }

  /**
   * Maneja la selección de fecha de una habitación.
   * @param {Event} event - El evento que contiene el valor de la fecha seleccionada.
   * @param {any} room - La habitación seleccionada.
   */
  onDateSelect(event: Event, room: any) {
    const input = event.target as HTMLInputElement;
    room.selectedDate = input.value; // Guarda la fecha seleccionada
  }

  /**
   * Realiza la reserva para una habitación seleccionada.
   * Verifica si se ha seleccionado una fecha válida y almacena la reserva en localStorage.
   * @param {any} room - La habitación seleccionada para la reserva.
   */
  makeReservation(room: any) {
    if (!room || !room.selectedDate) {
      alert('Por favor, selecciona una fecha válida para continuar.');
      return;
    }

    const newReservation = {
      id: room.id,
      name: room.name,
      description: room.description,
      price: room.price,
      reservedAt: new Date().toISOString(), // Fecha actual
      selectedDate: room.selectedDate, // Fecha elegida por el usuario
    };

    const storedReservations = JSON.parse(localStorage.getItem('reservations') || '[]');
    localStorage.setItem('reservations', JSON.stringify([...storedReservations, newReservation]));

    alert(`Reserva realizada para: ${room.name} en la fecha: ${room.selectedDate}`);
  }

  /**
   * Cierra la sesión y redirige al usuario al login.
   */
  logout() {
    this.router.navigate(['/login']);
  }

  /**
   * Redirige al usuario a la página de perfil.
   */
  goToPerfil() {
    this.router.navigate(['/perfil']);
  }

  /**
   * Redirige al usuario a la página de reservas.
   */
  goToReservas() {
    this.router.navigate(['/reservas']);
  }
}
