namespace Application.Features.Registrations.GetRegistrations;

using Domain.Enums;
using FluentValidation;

public class GetRegistrationsValidator : AbstractValidator<GetRegistrationsQuery>
{
    public GetRegistrationsValidator()
    {
        RuleFor(x => x.Page)
            .GreaterThanOrEqualTo(1)
            .WithMessage("Page must be greater than or equal to 1.");

        RuleFor(x => x.PageSize)
            .InclusiveBetween(1, 50)
            .WithMessage("PageSize must be between 1 and 50.");

        RuleFor(x => x.ParticipantName)
            .MaximumLength(150)
            .When(x => !string.IsNullOrEmpty(x.ParticipantName))
            .WithMessage("Participant name must not exceed 150 characters.");

        RuleFor(x => x.Type)
            .Must(type => string.IsNullOrEmpty(type) || Enum.TryParse<RegistrationType>(type, true, out _))
            .WithMessage("Invalid registration type. Allowed values are Exhibitor, Competitor, VIP.");

        RuleFor(x => x.Status)
            .Must(status => string.IsNullOrEmpty(status) || Enum.TryParse<Status>(status, true, out _))
            .WithMessage("Invalid status. Allowed values are Pending, Confirmed, CheckedIn, Cancelled.");
    }
}
