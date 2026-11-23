namespace Application.Features.Registrations.GetRegistrationSummary;

using Application.Abstractions.Data;
using Application.Abstractions.Messaging;
using Domain.Common;
using Domain.Enums;
using Microsoft.EntityFrameworkCore;

public class GetRegistrationSummaryHandler : IQueryHandler<GetRegistrationSummaryQuery, Result<RegistrationSummaryResponse>>
{
    private readonly IAppDbContext _dbContext;

    public GetRegistrationSummaryHandler(IAppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Result<RegistrationSummaryResponse>> HandleAsync(
        GetRegistrationSummaryQuery query,
        CancellationToken cancellationToken = default)
    {
        var registrations = await _dbContext.Registrations
            .AsNoTracking()
            .ToListAsync(cancellationToken);

        var totalRegistrations = registrations.Count;
        var confirmed = registrations.Count(r => r.Status == Status.Confirmed);
        var checkedIn = registrations.Count(r => r.Status == Status.CheckedIn);
        var pending = registrations.Count(r => r.Status == Status.Pending);
        var cancelled = registrations.Count(r => r.Status == Status.Cancelled);

        // Cancelled registrations are excluded from money totals
        var active = registrations.Where(r => r.Status != Status.Cancelled).ToList();
        var totalFees = active.Sum(r => r.RegistrationFee);
        var totalPayments = active.Sum(r => r.AmountPaid);
        var uncollectedPayments = totalFees - totalPayments;

        var summary = new RegistrationSummaryResponse(
            totalRegistrations,
            confirmed,
            checkedIn,
            pending,
            cancelled,
            totalFees,
            totalPayments,
            uncollectedPayments
        );

        return Result<RegistrationSummaryResponse>.Success(summary);
    }
}
