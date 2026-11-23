namespace Application.Features.Registrations.CreateRegistration;

using Domain.Enums;
using FluentValidation;

public class CreateRegistrationValidator : AbstractValidator<CreateRegistrationCommand>
{
    public CreateRegistrationValidator()
    {
        RuleFor(x => x.ParticipantName)
            .NotEmpty().WithMessage("'Participant Name' must not be empty.")
            .MaximumLength(150).WithMessage("Participant name must not exceed 150 characters.");

        RuleFor(x => x.ContactNumber)
            .NotEmpty().WithMessage("'Contact Number' must not be empty.")
            .Matches(@"^09\d{9}$").WithMessage("Contact number must follow the Philippine mobile format 09XXXXXXXXX (11 digits).");

        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("'Email' must not be empty.")
            .EmailAddress().WithMessage("A valid email address is required.")
            .MaximumLength(200).WithMessage("Email must not exceed 200 characters.");

        RuleFor(x => x.Address)
            .NotEmpty().WithMessage("'Address' must not be empty.")
            .MaximumLength(300).WithMessage("Address must not exceed 300 characters.");

        RuleFor(x => x.CarMakeModel)
            .NotEmpty().WithMessage("'Car Make Model' must not be empty.")
            .MaximumLength(100).WithMessage("Car make and model must not exceed 100 characters.");

        RuleFor(x => x.PlateNumber)
            .NotEmpty().WithMessage("'Plate Number' must not be empty.")
            .MaximumLength(15).WithMessage("Plate number must not exceed 15 characters.");

        RuleFor(x => x.RegistrationType)
            .IsInEnum().WithMessage("Invalid registration type. Allowed values are Exhibitor, Competitor, VIP.");

        RuleFor(x => x.AmountPaid)
            .GreaterThanOrEqualTo(0)
            .WithMessage("Amount paid must be 0 or more.")
            .Must((cmd, amount) =>
            {
                if (!Enum.IsDefined(typeof(RegistrationType), cmd.RegistrationType))
                    return true;

                var fee = cmd.RegistrationType.GetFee();
                return amount <= fee;
            })
            .WithMessage((cmd, _) =>
            {
                var fee = Enum.IsDefined(typeof(RegistrationType), cmd.RegistrationType)
                    ? cmd.RegistrationType.GetFee()
                    : 0m;
                return $"Amount paid cannot be more than the fee ({fee:N0}).";
            });
    }
}
