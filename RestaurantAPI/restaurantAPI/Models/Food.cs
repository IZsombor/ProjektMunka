using System;
using System.Collections.Generic;

namespace restaurantAPI.Models;

public partial class Food
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public int? Price { get; set; }

    public int? Weight { get; set; }

    public byte[]? Picture { get; set; }
}
