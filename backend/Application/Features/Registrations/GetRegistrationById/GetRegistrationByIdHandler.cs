namespace Application.Features.Registrations.GetRegistrationById;

using Application.Abstractions.Data;
using Application.Abstractions.Messaging;
using Application.Features.Registrations.Common;
using Domain.Common;
using Microsoft.EntityFrameworkCore;

public class GetRegistrationByIdHandler : IQueryHandler<GetRegistrationByIdQuery, Result<RegistrationResponse>>
{
    private readonly IAppDbContext _dbContext;

    public GetRegistrationByIdHandler(IAppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Result<RegistrationResponse>> HandleAsync(
        GetRegistrationByIdQuery query,
        CancellationToken cancellationToken = default)
    {
        var registration = await _dbContext.Registrations
            .AsNoTracking()
            .FirstOrDefaultAsync(r => r.Id == query.Id, cancellationToken);

        if (registration is null)
        {
            return Result<RegistrationResponse>.Failure(
                new Error("Registration.NotFound", $"Registration with id '{query.Id}' was not found."));
        }

        return Result<RegistrationResponse>.Success(RegistrationResponse.FromEntity(registration));
    }
}
