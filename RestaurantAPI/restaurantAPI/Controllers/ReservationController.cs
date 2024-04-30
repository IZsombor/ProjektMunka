using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using restaurantAPI.Models;
using restaurantAPI.Models.Dtos;

namespace restaurantAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationController : ControllerBase
    {
        private readonly RestaurantContext restaurantContext;

        public ReservationController(RestaurantContext reservation)
        {
            this.restaurantContext = reservation;
        }

        [HttpPost("{tableNumber}")]
        public async Task<ActionResult> Post(int tableNumber)
        {
            if (tableNumber == 0)
            {
                return BadRequest();
            }


            var reservations = new Reservation
            {
                Id = tableNumber,

            };

            await restaurantContext.Reservations.AddAsync(reservations);
            await restaurantContext.SaveChangesAsync();
            return StatusCode(201, new { result = "Sikeres asztal hozzáadás!", obj = reservations });

        }

        [HttpPut("{tableNumber}/{userId}")]
        public async Task<ActionResult> Put(int tableNumber, string userId, UpdateReservationsDto updateReservations)
        {
            //userId = "b1e9fb3f-6a0c-46f9-baa1-0f74f1ff368userId9";
            var existingReservation = await restaurantContext.Reservations.FirstOrDefaultAsync(x => x.Id == tableNumber);

            if (existingReservation == null)
            {
                return BadRequest();
            }

            _ = existingReservation.Time1 == null || existingReservation.Time1 == "" || existingReservation.Time1 == userId ? existingReservation.Time1 = updateReservations.Time1 : existingReservation.Time1 = existingReservation.Time1;
            _ = existingReservation.Time2 == null || existingReservation.Time2 == "" || existingReservation.Time2 == userId ? existingReservation.Time2 = updateReservations.Time2 : existingReservation.Time2 = existingReservation.Time2;
            _ = existingReservation.Time3 == null || existingReservation.Time3 == "" || existingReservation.Time3 == userId ? existingReservation.Time3 = updateReservations.Time3 : existingReservation.Time3 = existingReservation.Time3;
            _ = existingReservation.Time4 == null || existingReservation.Time4 == "" || existingReservation.Time4 == userId ? existingReservation.Time4 = updateReservations.Time4 : existingReservation.Time4 = existingReservation.Time4;
            _ = existingReservation.Time5 == null || existingReservation.Time5 == "" || existingReservation.Time5 == userId ? existingReservation.Time5 = updateReservations.Time5 : existingReservation.Time5 = existingReservation.Time5;
            _ = existingReservation.Time6 == null || existingReservation.Time6 == "" || existingReservation.Time6 == userId ? existingReservation.Time6 = updateReservations.Time6 : existingReservation.Time6 = existingReservation.Time6;
            _ = existingReservation.Time7 == null || existingReservation.Time7 == "" || existingReservation.Time7 == userId ? existingReservation.Time7 = updateReservations.Time7 : existingReservation.Time7 = existingReservation.Time7;
            _ = existingReservation.Time8 == null || existingReservation.Time8 == "" || existingReservation.Time8 == userId ? existingReservation.Time8 = updateReservations.Time8 : existingReservation.Time8 = existingReservation.Time8;
            _ = existingReservation.Time9 == null || existingReservation.Time9 == "" || existingReservation.Time9 == userId ? existingReservation.Time9 = updateReservations.Time9 : existingReservation.Time9 = existingReservation.Time9;
            _ = existingReservation.Time10 == null || existingReservation.Time10 == "" || existingReservation.Time10 == userId ? existingReservation.Time10 = updateReservations.Time10 : existingReservation.Time10 = existingReservation.Time10;
            _ = existingReservation.Time11 == null || existingReservation.Time11 == "" || existingReservation.Time11 == userId ? existingReservation.Time11 = updateReservations.Time11 : existingReservation.Time11 = existingReservation.Time11;
            _ = existingReservation.Time12 == null || existingReservation.Time12 == "" || existingReservation.Time12 == userId ? existingReservation.Time12 = updateReservations.Time12 : existingReservation.Time12 = existingReservation.Time12;

            restaurantContext.Reservations.Update(existingReservation);
            await restaurantContext.SaveChangesAsync();

            return StatusCode(200, new { result = "Sikeres foglalás frissítés!", obj = existingReservation });
        }

        [HttpGet]
        //[Authorize(Roles = "ADMIN,USER")]
        public async Task<ActionResult> Get()
        {
            var reservation = await restaurantContext.Reservations.ToListAsync();

            if (reservation == null)
            {
                return BadRequest();
            }

            return StatusCode(200, new { result = "Sikeres lekérdezés", obj = reservation });
        }
    }
}
