namespace Application.Features.Registrations.GetRegistrations;

using Application.Abstractions.Data;
using Application.Abstractions.Messaging;
using Application.Features.Registrations.Common;
using Domain.Common;
using Domain.Enums;
using Microsoft.EntityFrameworkCore;

public class GetRegistrationsHandler : IQueryHandler<GetRegistrationsQuery, Result<PagedResult<RegistrationResponse>>>
{
    private readonly IAppDbContext _dbContext;

    public GetRegistrationsHandler(IAppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Result<PagedResult<RegistrationResponse>>> HandleAsync(
        GetRegistrationsQuery query,
        CancellationToken cancellationToken = default)
    {
        var queryable = _dbContext.Registrations.AsNoTracking();

        // Filter by ParticipantName (contains, case-insensitive)
        if (!string.IsNullOrWhiteSpace(query.ParticipantName))
        {
            var search = query.ParticipantName.Trim().ToLower();
            queryable = queryable.Where(r => r.ParticipantName.ToLower().Contains(search));
        }

        // Filter by RegistrationType
        if (!string.IsNullOrWhiteSpace(query.Type) &&
            Enum.TryParse<RegistrationType>(query.Type.Trim(), true, out var parsedType))
        {
            queryable = queryable.Where(r => r.RegistrationType == parsedType);
        }

        // Filter by Status
        if (!string.IsNullOrWhiteSpace(query.Status) &&
            Enum.TryParse<Status>(query.Status.Trim(), true, out var parsedStatus))
        {
            queryable = queryable.Where(r => r.Status == parsedStatus);
        }

        // Sort by RegistrationDate descending (newest first)
        queryable = queryable.OrderByDescending(r => r.RegistrationDate);

        var totalCount = await queryable.CountAsync(cancellationToken);
        var totalPages = totalCount == 0 ? 0 : (int)Math.Ceiling((double)totalCount / query.PageSize);

        var items = await queryable
            .Skip((query.Page - 1) * query.PageSize)
            .Take(query.PageSize)
            .ToListAsync(cancellationToken);

        var responseItems = items.Select(RegistrationResponse.FromEntity).ToList();

        var pagedResult = new PagedResult<RegistrationResponse>(
            responseItems,
            query.Page,
            query.PageSize,
            totalCount,
            totalPages
        );

        return Result<PagedResult<RegistrationResponse>>.Success(pagedResult);
    }
}
