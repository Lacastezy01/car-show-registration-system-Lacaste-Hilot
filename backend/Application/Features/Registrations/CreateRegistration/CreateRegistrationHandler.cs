namespace Application.Features.Registrations.CreateRegistration;

using Application.Abstractions.Data;
using Application.Abstractions.Messaging;
using Application.Features.Registrations.Common;
using Domain.Common;
using Domain.Entities;
using Domain.Enums;
using Microsoft.EntityFrameworkCore;

public class CreateRegistrationHandler : ICommandHandler<CreateRegistrationCommand, Result<RegistrationResponse>>
{
    private readonly IAppDbContext _dbContext;

    public CreateRegistrationHandler(IAppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Result<RegistrationResponse>> HandleAsync(
        CreateRegistrationCommand command,
        CancellationToken cancellationToken = default)
    {
        var trimmedPlate = command.PlateNumber.Trim();
        var plateExists = await _dbContext.Registrations
            .AnyAsync(r => r.PlateNumber.ToLower() == trimmedPlate.ToLower(), cancellationToken);

        if (plateExists)
        {
            return Result<RegistrationResponse>.Failure(
                new Error("Registration.Conflict", $"A registration with plate number '{command.PlateNumber}' already exists."));
        }

        var existingNumbers = await _dbContext.Registrations
            .Select(r => r.RegistrationNumber)
            .ToListAsync(cancellationToken);

        int maxSeq = 0;
        foreach (var num in existingNumbers)
        {
            if (num.StartsWith("CS27-", StringComparison.OrdinalIgnoreCase) &&
                int.TryParse(num[5..], out int seq) &&
                seq > maxSeq)
            {
                maxSeq = seq;
            }
        }

        var nextRegistrationNumber = $"CS27-{(maxSeq + 1):D4}";
        var fee = command.RegistrationType.GetFee();

        var registration = new Registration
        {
            Id = Guid.NewGuid(),
            RegistrationNumber = nextRegistrationNumber,
            RegistrationDate = DateTime.UtcNow,
            ParticipantName = command.ParticipantName.Trim(),
            ContactNumber = command.ContactNumber.Trim(),
            Email = command.Email.Trim(),
            Address = command.Address.Trim(),
            CarMakeModel = command.CarMakeModel.Trim(),
            PlateNumber = trimmedPlate,
            RegistrationType = command.RegistrationType,
            Status = Status.Pending,
            RegistrationFee = fee,
            AmountPaid = command.AmountPaid
        };

        await _dbContext.Registrations.AddAsync(registration, cancellationToken);
        await _dbContext.SaveChangesAsync(cancellationToken);

        return Result<RegistrationResponse>.Success(RegistrationResponse.FromEntity(registration));
    }
}
