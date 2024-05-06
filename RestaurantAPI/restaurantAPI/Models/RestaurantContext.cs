using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Scaffolding.Internal;

namespace restaurantAPI.Models;

public partial class RestaurantContext : DbContext
{
    public RestaurantContext()
    {
    }

    public RestaurantContext(DbContextOptions<RestaurantContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Food> Foods { get; set; }

    public virtual DbSet<Reservation> Reservations { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseMySql("server=localhost;database=restaurant;user=root;sslmode=none", Microsoft.EntityFrameworkCore.ServerVersion.Parse("10.4.28-mariadb"));

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .UseCollation("utf8_general_ci")
            .HasCharSet("utf8");

        modelBuilder.Entity<Food>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("foods");

            entity.Property(e => e.Id).HasColumnType("int(11)");
            entity.Property(e => e.Name).HasMaxLength(20);
            entity.Property(e => e.Price).HasColumnType("int(11)");
            entity.Property(e => e.Weight).HasColumnType("int(11)");
        });

        modelBuilder.Entity<Reservation>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("reservations");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnType("int(1)");
            entity.Property(e => e.Time1).HasMaxLength(36);
            entity.Property(e => e.Time10).HasMaxLength(36);
            entity.Property(e => e.Time11).HasMaxLength(36);
            entity.Property(e => e.Time12).HasMaxLength(36);
            entity.Property(e => e.Time2).HasMaxLength(36);
            entity.Property(e => e.Time3).HasMaxLength(36);
            entity.Property(e => e.Time4).HasMaxLength(36);
            entity.Property(e => e.Time5).HasMaxLength(36);
            entity.Property(e => e.Time6).HasMaxLength(36);
            entity.Property(e => e.Time7).HasMaxLength(36);
            entity.Property(e => e.Time8).HasMaxLength(36);
            entity.Property(e => e.Time9).HasMaxLength(36);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
