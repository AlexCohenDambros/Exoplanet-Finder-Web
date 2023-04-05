using API.Repository.User;
using API.Service.User;
using Microsoft.Data.SqlClient;
using System.Data;
using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddTransient<IDbConnection>((sp) => new SqlConnection(builder.Configuration.GetConnectionString("conString")));
builder.Services.AddSingleton<UserService, IUserService>();
builder.Services.AddSingleton<UserRepository, IUserReporitory>();
builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
    options.JsonSerializerOptions.IgnoreNullValues = true;
});
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
