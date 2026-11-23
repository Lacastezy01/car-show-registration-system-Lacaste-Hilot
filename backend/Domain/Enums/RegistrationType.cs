namespace Domain.Enums;

public enum RegistrationType
{
    Exhibitor,
    Competitor,
    VIP
}

public static class RegistrationTypeExtensions
{
    public static decimal GetFee(this RegistrationType type) => type switch
    {
        RegistrationType.Exhibitor => 1500m,
        RegistrationType.Competitor => 2500m,
        RegistrationType.VIP => 5000m,
        _ => throw new ArgumentOutOfRangeException(nameof(type), $"Unknown registration type: {type}")
    };
}
