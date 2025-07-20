from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.utils.translation import gettext_lazy as _
import uuid

from institutions.models import HealthcareInstitution

class CustomUserManager(BaseUserManager):

    def create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError(_('The Email must be set'))
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError(_('Superuser must have is_staff=True.'))
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(_('Superuser must have is_superuser=True.'))
        return self.create_user(email, password, **extra_fields)


class CustomUser(AbstractUser):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    username = None # We are using email as the unique identifier
    email = models.EmailField(_('email address'), unique=True)
    USER_TYPE_CHOICES = (
        ('patient', 'Patient'),
        ('staff', 'Healthcare Staff'),
        ('lgu', 'Local Government Unit'),
    )
    user_type = models.CharField(
        max_length=10,
        choices=USER_TYPE_CHOICES,
        default='patient',
        help_text=_('Designates whether this user is a patient or healthcare staff.')
    )
    healthcare_institutions = models.ManyToManyField(
        HealthcareInstitution,
        blank=True, # Allow LGU users to not be linked if they oversee all, or staff to not be linked initially
        related_name='lgu_staff_and_staff_members', # Update related_name
        help_text=_('The healthcare institutions this user is associated with (for staff) or oversees (for LGU).')
    )
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.id

    class Meta:
        verbose_name = _('user profile')
        verbose_name_plural = _('user profiles')