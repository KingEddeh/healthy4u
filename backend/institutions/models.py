from django.db import models
from django.utils.translation import gettext_lazy as _
import uuid

class HealthcareInstitution(models.Model):
    """
    Represents a healthcare institution (e.g., hospital, clinic).
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255, unique=True, help_text=_('Name of the healthcare institution.'))
    address = models.TextField(blank=True, help_text=_('Physical address of the institution.'))
    phone_number = models.CharField(max_length=20, blank=True, help_text=_('Contact phone number.'))
    email = models.EmailField(blank=True, help_text=_('Contact email address.'))
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = _('healthcare institution')
        verbose_name_plural = _('healthcare institutions')