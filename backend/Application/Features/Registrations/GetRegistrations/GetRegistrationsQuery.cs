namespace Application.Features.Registrations.GetRegistrations;

using Application.Abstractions.Messaging;
using Application.Features.Registrations.Common;
using Domain.Common;

public record GetRegistrationsQuery(
    string? ParticipantName = null,
    string? Type = null,
    string? Status = null,
    int Page = 1,
    int PageSize = 10
) : IQuery<Result<PagedResult<RegistrationResponse>>>;
