using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FinalProject.Migrations
{
    /// <inheritdoc />
    public partial class createdlanguagesandgender : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "created_at",
                table: "professionals");

            migrationBuilder.AddColumn<string>(
                name: "gender",
                table: "professionals",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "languages",
                columns: table => new
                {
                    language_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    language_name = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_languages", x => x.language_id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "professional_languages",
                columns: table => new
                {
                    professional_id = table.Column<long>(type: "bigint", nullable: false),
                    language_id = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_professional_languages", x => new { x.professional_id, x.language_id });
                    table.ForeignKey(
                        name: "FK_professional_languages_languages_language_id",
                        column: x => x.language_id,
                        principalTable: "languages",
                        principalColumn: "language_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_professional_languages_professionals_professional_id",
                        column: x => x.professional_id,
                        principalTable: "professionals",
                        principalColumn: "professional_id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_languages_language_name",
                table: "languages",
                column: "language_name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_professional_languages_language_id",
                table: "professional_languages",
                column: "language_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "professional_languages");

            migrationBuilder.DropTable(
                name: "languages");

            migrationBuilder.DropColumn(
                name: "gender",
                table: "professionals");

            migrationBuilder.AddColumn<DateTime>(
                name: "created_at",
                table: "professionals",
                type: "timestamp",
                nullable: false,
                defaultValueSql: "CURRENT_TIMESTAMP");
        }
    }
}
