namespace Application.Features.Registrations.GetRegistrationSummary;

using Application.Abstractions.Messaging;
using Domain.Common;

public record GetRegistrationSummaryQuery() : IQuery<Result<RegistrationSummaryResponse>>;
