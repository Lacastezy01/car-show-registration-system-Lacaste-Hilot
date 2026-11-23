namespace Application.Features.Registrations.GetRegistrationById;

using Application.Abstractions.Messaging;
using Application.Features.Registrations.Common;
using Domain.Common;

public record GetRegistrationByIdQuery(Guid Id) : IQuery<Result<RegistrationResponse>>;
