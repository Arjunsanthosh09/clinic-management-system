from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    RoleViewSet, StaffViewSet, SpecializationViewSet, DoctorViewSet,
    MembershipViewSet, PatientViewSet, AppointmentViewSet, ConsultationViewSet,
    MedicineCategoryViewSet, MedicineViewSet, MedicinePrescriptionViewSet,
    LabTestCategoryViewSet, LabTestViewSet, LabTestPrescriptionViewSet,
    MedicineStockViewSet, staff_login, dashboard_stats
)

router = DefaultRouter()
router.register(r'roles', RoleViewSet, basename='roles')
router.register(r'staff', StaffViewSet, basename='staff')
router.register(r'specializations', SpecializationViewSet, basename='specializations')
router.register(r'doctors', DoctorViewSet, basename='doctors')
router.register(r'memberships', MembershipViewSet, basename='memberships')
router.register(r'patients', PatientViewSet, basename='patients')
router.register(r'appointments', AppointmentViewSet, basename='appointments')
router.register(r'consultations', ConsultationViewSet, basename='consultations')
router.register(r'medicine-categories', MedicineCategoryViewSet, basename='medicine-categories')
router.register(r'medicines', MedicineViewSet, basename='medicines')
router.register(r'prescriptions/medicine', MedicinePrescriptionViewSet, basename='medicine-prescriptions')
router.register(r'labtest-categories', LabTestCategoryViewSet, basename='labtest-categories')
router.register(r'labtests', LabTestViewSet, basename='labtests')
router.register(r'prescriptions/labtest', LabTestPrescriptionViewSet, basename='labtest-prescriptions')
router.register(r'inventory/medicine', MedicineStockViewSet, basename='medicine-inventory')

urlpatterns = [
    path('', include(router.urls)),
    path('auth/login/', staff_login, name='staff_login'),
    path('dashboard/stats/', dashboard_stats, name='dashboard_stats'),
]
