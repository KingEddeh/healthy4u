# QR Code Medical Information System

The SiguraDok app includes a comprehensive QR code system for sharing and scanning medical information securely.

## Features

### QR Code Generation
- **Automatic Generation**: QR codes are automatically generated when users visit the QR page
- **Medical Data Encoding**: Encodes essential medical information including:
  - Patient identification (name, email, ID)
  - Basic vitals (blood type, height, weight, DOB, sex)
  - Medical history (allergies, medications, past medical history)
  - Family medical history and immunizations
  - Timestamp for data freshness

### QR Code Scanning
- **Camera Integration**: Uses device camera to scan QR codes
- **Real-time Scanning**: Live camera feed with visual scanning frame
- **Data Validation**: Validates that scanned codes contain proper SiguraDok medical data
- **Error Handling**: Provides feedback for invalid or non-medical QR codes

### Security & Privacy
- **Local Storage**: All data remains on the user's device
- **Timestamp Validation**: Each QR code includes generation timestamp
- **Data Validation**: Strict validation ensures only proper medical QR codes are processed

## Usage

### Generating QR Codes
1. Navigate to the QR Code page from the home dashboard
2. Ensure your medical profile is complete
3. QR code will auto-generate on page load
4. Use "Generate New Code" to create fresh QR codes

### Sharing QR Codes
- **Share Button**: Uses native device sharing (when supported)
- **Download Button**: Downloads QR code as PNG image
- **File Naming**: Auto-generated filenames with timestamps

### Scanning QR Codes
1. Click "Scan QR Code" button from QR page
2. Allow camera permissions when prompted
3. Point camera at a SiguraDok medical QR code
4. View decoded medical information in structured format

### Medical Information Display
- **Patient Details**: Name, email, basic information
- **Vital Statistics**: Blood type, height, weight, DOB
- **Medical History**: Expandable sections for:
  - Allergies (highlighted in red)
  - Current medications (blue background)
  - Past medical history (gray background)
  - Family medical history (purple background)
  - Immunization history (green background)

## Technical Implementation

### Technology Stack
- **QR Generation**: `qrcode` npm package
- **QR Scanning**: `qr-scanner` npm package
- **Camera Access**: WebRTC getUserMedia API
- **State Management**: Pinia store (`qr-store.ts`)

### File Structure
```
src/
├── components/
│   └── QRScanner.vue          # Camera scanner component
├── pages/
│   ├── QRPage.vue             # QR generation and management
│   └── QRScannerPage.vue      # Scanner interface with data display
├── stores/
│   └── qr-store.ts            # QR data management and validation
└── types/
    └── data.ts                # TypeScript interfaces
```

### Data Format
QR codes encode JSON with the following structure:
```typescript
{
  id: string;                    // User ID
  name: string;                  // Full name
  email: string;                 // Contact email
  emergency_contact: {           // Medical record data
    date_of_birth: string;
    sex: string;
    blood_type: string;
    allergies: string;
    current_medications: string;
    // ... additional medical fields
  };
  timestamp: string;             // ISO timestamp
}
```

## Browser Compatibility

### QR Generation
- ✅ All modern browsers
- ✅ Mobile and desktop
- ✅ Works offline

### QR Scanning
- ✅ Chrome/Edge/Safari (desktop & mobile)
- ✅ Firefox (with camera permissions)
- ⚠️ Requires HTTPS in production
- ⚠️ Requires camera permissions

### Sharing
- ✅ Mobile browsers with Web Share API
- ✅ Fallback download for unsupported browsers
- ✅ Native app integration on supported platforms

## Error Handling

### Common Issues
1. **No Camera**: Shows error message, provides manual entry option
2. **Invalid QR Code**: Validates data structure before processing
3. **Permission Denied**: Clear instructions for enabling camera access
4. **Network Issues**: All operations work offline with local data

### User Feedback
- Real-time notifications for all operations
- Clear success/error messaging
- Visual feedback during scanning process
- Loading states for async operations

## Future Enhancements

### Planned Features
- **Emergency Mode**: Quick access to critical medical info
- **Multiple Profiles**: Family member medical QR codes
- **Encryption**: Additional security layer for sensitive data
- **Expiration**: Time-limited QR codes for enhanced security
- **Healthcare Provider Integration**: Direct integration with medical systems

### Technical Improvements
- **PWA Integration**: Offline-first capabilities
- **Background Sync**: Auto-update QR codes
- **Bulk Operations**: Generate multiple QR codes
- **Analytics**: Usage tracking and insights
