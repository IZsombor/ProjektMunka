using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using restaurantAPI.Models;
using restaurantAPI.Models.Dtos;

namespace restaurantAPI.Controllers
{
    [Route("foods")]
    [ApiController]
    public class FoodController : ControllerBase
    {
        private readonly RestaurantContext restaurantContext;
        private readonly MemoryStream memoryStream;

        public FoodController(RestaurantContext restaurantContext, MemoryStream memoryStream)
        {
            this.restaurantContext = restaurantContext;
            this.memoryStream = memoryStream;
        }

        [HttpPost]
        public async Task<ActionResult> Post(AddFoodDto addFoodDto)
        {
            if (addFoodDto == null)
            {
                return BadRequest();
            }

            var food = new Food
            {
                Name = addFoodDto.Name,
                Price = addFoodDto.Price,
                Weight = addFoodDto.Weight
            };

            await restaurantContext.Foods.AddAsync(food);
            await restaurantContext.SaveChangesAsync();
            return StatusCode(201, new { result = "Sikeres étel hozzáadás!", obj = food });

        }


        [HttpGet]
        //[Authorize(Roles = "ADMIN,USER")]
        public async Task<ActionResult> Get()
        {
            var foods = await restaurantContext.Foods.Select(x => new { x.Id, x.Name, x.Price, x.Weight }).ToListAsync();

            if (foods == null)
            {
                return BadRequest();
            }

            return StatusCode(200, new { result = "Sikeres lekérdezés", obj = foods });
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> Get(int id)
        {
            var food = await restaurantContext.Foods.FirstOrDefaultAsync(x => x.Id == id);

            if (food == null)
            {
                return BadRequest();
            }
            return StatusCode(200, new { result = "Sikeres étel lekérdezés", obj = food.Id, food.Name, food.Price, food.Weight });
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var food = await restaurantContext.Foods.FirstOrDefaultAsync(x => x.Id == id);

            if (food == null)
            {
                return BadRequest();
            }

            restaurantContext.Foods.Remove(food);
            await restaurantContext.SaveChangesAsync();

            return StatusCode(200, new { result = "Sikeres törlés", obj = food.Id, food.Name, food.Price, food.Weight });
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, UpdateFoodDto updateFoodDto)
        {
            var existingFood = await restaurantContext.Foods.FirstOrDefaultAsync(x => x.Id == id);

            if (existingFood == null)
            {
                return BadRequest();
            }

            existingFood.Name = updateFoodDto.Name;
            existingFood.Price = updateFoodDto.Price;
            existingFood.Weight = updateFoodDto.Weight;

            restaurantContext.Foods.Update(existingFood);
            await restaurantContext.SaveChangesAsync();

            return StatusCode(200, new { result = "Sikeres étel frissítés!", obj = existingFood });
        }

        [HttpPut("upload/{foodId}")]
        public async Task<ActionResult> UpLoadPicture(int foodId, IFormFile pictureByteCode)
        {
            var existingFood = await restaurantContext.Foods.FirstOrDefaultAsync(x => x.Id.Equals(foodId));

            if (existingFood != null && pictureByteCode != null && pictureByteCode.Length > 0)
            {
                await pictureByteCode.CopyToAsync(memoryStream);
                var imageData = memoryStream.ToArray();

                existingFood.Picture = imageData;

                restaurantContext.Foods.Update(existingFood);
                await restaurantContext.SaveChangesAsync();

                return StatusCode(200, new { ressult = "Sikeres kép frissítés!" });
            }

            return BadRequest();
        }
    }
}
