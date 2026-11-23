namespace Api.Features.Registrations;

using Api.Common.Extensions;
using Api.Common.Filters;
using Application.Abstractions.Messaging;
using Application.Features.Registrations.Common;
using Application.Features.Registrations.CreateRegistration;
using Application.Features.Registrations.GetRegistrationById;
using Application.Features.Registrations.GetRegistrations;
using Application.Features.Registrations.GetRegistrationSummary;
using Domain.Common;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;

public static class RegistrationEndpoints
{
    public static IEndpointRouteBuilder MapRegistrationEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/registrations")
            .WithTags("Registrations");

        // 1. POST /api/registrations - Create a new registration
        group.MapPost("/", async (
            CreateRegistrationCommand command,
            ICommandHandler<CreateRegistrationCommand, Result<RegistrationResponse>> handler,
            CancellationToken cancellationToken) =>
        {
            var result = await handler.HandleAsync(command, cancellationToken);
            return result.IsSuccess
                ? Results.Created($"/api/registrations/{result.Value!.Id}", result.Value)
                : result.ToProblemDetails();
        })
        .AddEndpointFilter<ValidationFilter<CreateRegistrationCommand>>()
        .WithName("CreateRegistration")
        .WithSummary("Make a new registration")
        .Produces<RegistrationResponse>(StatusCodes.Status201Created)
        .ProducesValidationProblem(StatusCodes.Status400BadRequest)
        .ProducesProblem(StatusCodes.Status409Conflict);

        // 2. GET /api/registrations/summary - KPI totals for dashboard
        group.MapGet("/summary", async (
            IQueryHandler<GetRegistrationSummaryQuery, Result<RegistrationSummaryResponse>> handler,
            CancellationToken cancellationToken) =>
        {
            var result = await handler.HandleAsync(new GetRegistrationSummaryQuery(), cancellationToken);
            return result.IsSuccess
                ? Results.Ok(result.Value)
                : result.ToProblemDetails();
        })
        .WithName("GetRegistrationSummary")
        .WithSummary("KPI totals for the dashboard")
        .Produces<RegistrationSummaryResponse>(StatusCodes.Status200OK);

        // 3. GET /api/registrations - Show all registrations (paged & filtered)
        group.MapGet("/", async (
            [AsParameters] GetRegistrationsQuery query,
            IQueryHandler<GetRegistrationsQuery, Result<PagedResult<RegistrationResponse>>> handler,
            CancellationToken cancellationToken) =>
        {
            var result = await handler.HandleAsync(query, cancellationToken);
            return result.IsSuccess
                ? Results.Ok(result.Value)
                : result.ToProblemDetails();
        })
        .AddEndpointFilter<ValidationFilter<GetRegistrationsQuery>>()
        .WithName("GetRegistrations")
        .WithSummary("Show all registrations (paged and filtered)")
        .Produces<PagedResult<RegistrationResponse>>(StatusCodes.Status200OK)
        .ProducesValidationProblem(StatusCodes.Status400BadRequest);

        // 4. GET /api/registrations/{id:guid} - Find registration by ID
        group.MapGet("/{id:guid}", async (
            Guid id,
            IQueryHandler<GetRegistrationByIdQuery, Result<RegistrationResponse>> handler,
            CancellationToken cancellationToken) =>
        {
            var result = await handler.HandleAsync(new GetRegistrationByIdQuery(id), cancellationToken);
            return result.IsSuccess
                ? Results.Ok(result.Value)
                : result.ToProblemDetails();
        })
        .WithName("GetRegistrationById")
        .WithSummary("Find registration by ID")
        .Produces<RegistrationResponse>(StatusCodes.Status200OK)
        .ProducesProblem(StatusCodes.Status404NotFound);

        return app;
    }
}
