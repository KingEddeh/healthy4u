from django.db import models
from django.utils.translation import gettext_lazy as _
import uuid

from users.models import CustomUser
from institutions.models import HealthcareInstitution

class Appointment(models.Model):
    """
    Manages patient appointments with healthcare institutions/staff.
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    patient = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        related_name='appointments_as_patient',
        limit_choices_to={'user_type': 'patient'},
        help_text=_('The patient booking the appointment.')
    )
    institution = models.ForeignKey(
        HealthcareInstitution,
        on_delete=models.CASCADE,
        related_name='appointments',
        help_text=_('The healthcare institution where the appointment is scheduled.')
    )
    staff = models.ForeignKey(
        CustomUser,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='appointments_as_staff',
        limit_choices_to={'user_type': 'staff'},
        help_text=_('The healthcare staff member for the appointment.')
    )
    appointment_date_time = models.DateTimeField(help_text=_('Date and time of the appointment.'))
    reason = models.TextField(blank=True, help_text=_('Reason for the appointment.'))

    STATUS_CHOICES = (
        ('scheduled', 'Scheduled'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
        ('rescheduled', 'Rescheduled'),
    )
    status = models.CharField(
        max_length=15,
        choices=STATUS_CHOICES,
        default='scheduled',
        help_text=_('Current status of the appointment.')
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Appointment for {self.patient.id} at {self.institution.name} on {self.appointment_date_time.strftime('%Y-%m-%d %H:%M')}"

    class Meta:
        verbose_name = _('appointment')
        verbose_name_plural = _('appointments')
        ordering = ['appointment_date_time']