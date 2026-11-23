namespace Application.Features.Registrations.Common;

using Domain.Entities;
using Domain.Enums;

public record RegistrationResponse(
    Guid Id,
    string RegistrationNumber,
    DateTime RegistrationDate,
    string ParticipantName,
    string ContactNumber,
    string Email,
    string Address,
    string CarMakeModel,
    string PlateNumber,
    RegistrationType RegistrationType,
    Status Status,
    decimal RegistrationFee,
    decimal AmountPaid,
    PaymentStatus PaymentStatus
)
{
    public static RegistrationResponse FromEntity(Registration registration) => new(
        registration.Id,
        registration.RegistrationNumber,
        registration.RegistrationDate,
        registration.ParticipantName,
        registration.ContactNumber,
        registration.Email,
        registration.Address,
        registration.CarMakeModel,
        registration.PlateNumber,
        registration.RegistrationType,
        registration.Status,
        registration.RegistrationFee,
        registration.AmountPaid,
        registration.PaymentStatus
    );
}
