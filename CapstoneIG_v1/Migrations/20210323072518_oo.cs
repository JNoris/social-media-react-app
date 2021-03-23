using Microsoft.EntityFrameworkCore.Migrations;

namespace CapstoneIG_v1.Migrations
{
    public partial class oo : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Bio",
                table: "ApplicationUser",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Bio",
                table: "ApplicationUser");
        }
    }
}
