from django.db import models
from django.utils.translation import gettext_lazy as _
import uuid

from users.models import CustomUser

class PatientMedicalRecord(models.Model):
    """
    Stores sensitive medical information and history for a patient.
    Separated from UserProfile for data privacy and access control.
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    patient = models.OneToOneField(
        CustomUser,
        on_delete=models.CASCADE,
        limit_choices_to={'user_type': 'patient'},
        related_name='medical_record',
        help_text=_('The patient associated with this medical record.')
    )
    date_of_birth = models.DateField(null=True, blank=True, help_text=_('Patient\'s date of birth.'))
    sex = models.CharField(
        max_length=10,
        choices=[('male', 'Male'), ('female', 'Female')],
        blank=True,
        help_text=_('Patient\'s sex.')
    )
    allergies = models.TextField(blank=True, help_text=_('Patient\'s known allergies.'))
    current_medications = models.TextField(blank=True, help_text=_('Currently prescribed medications.'))
    past_medical_history = models.TextField(blank=True, help_text=_('Significant past medical conditions and surgeries.'))
    family_medical_history = models.TextField(blank=True, help_text=_('Relevant family medical history.'))
    immunization_history = models.TextField(blank=True, help_text=_('Record of immunizations.'))
    blood_type = models.CharField(max_length=5, blank=True, help_text=_('Patient\'s blood type.'))
    height_cm = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True, help_text=_('Patient\'s height in centimeters.'))
    weight_kg = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True, help_text=_('Patient\'s weight in kilograms.'))
    created_by = models.ForeignKey(
        CustomUser,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='medical_records_created',
        help_text=_('The user who created this medical record.')
    )
    updated_by = models.ForeignKey(
        CustomUser,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='medical_records_updated',
        help_text=_('The last user who updated this medical record.')
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Medical Record for {self.patient.id}"

    class Meta:
        verbose_name = _('patient medical record')
        verbose_name_plural = _('patient medical records')