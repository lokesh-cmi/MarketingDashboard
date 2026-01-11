#!/bin/bash

# Google Analytics Setup Helper Script
# This script helps you configure Google Analytics integration

echo "================================================"
echo "Google Analytics Integration Setup"
echo "================================================"
echo ""

# Check if .env.local exists
if [ -f ".env.local" ]; then
    echo "✓ .env.local file exists"
    echo ""
    echo "Current configuration:"
    cat .env.local
    echo ""
else
    echo "✗ .env.local file not found"
    echo ""
    read -p "Would you like to create .env.local from template? (y/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        cp env.template .env.local
        echo "✓ Created .env.local from template"
        echo ""
        echo "Please edit .env.local and add your GA4 Property ID"
        echo "Format: GOOGLE_ANALYTICS_PROPERTY_ID=properties/YOUR_PROPERTY_ID"
        echo ""
    fi
fi

# Check if service account file exists
if [ -f "service-account/google-analytics-account.json" ]; then
    echo "✓ Service account file exists"
    
    # Extract service account email
    SERVICE_EMAIL=$(grep -o '"client_email": "[^"]*' service-account/google-analytics-account.json | cut -d'"' -f4)
    echo "  Email: $SERVICE_EMAIL"
    echo ""
else
    echo "✗ Service account file not found at service-account/google-analytics-account.json"
    echo ""
fi

echo "================================================"
echo "Next Steps:"
echo "================================================"
echo ""
echo "1. Edit .env.local and add your GA4 Property ID"
echo "   Find it at: https://analytics.google.com/ → Admin → Property Settings"
echo ""
echo "2. Add the service account email to your GA4 property:"
echo "   - Go to Google Analytics → Admin"
echo "   - Click 'Property Access Management'"
echo "   - Add user with 'Viewer' role"
if [ ! -z "$SERVICE_EMAIL" ]; then
    echo "   - Email: $SERVICE_EMAIL"
fi
echo ""
echo "3. Restart the dev server:"
echo "   npm run dev"
echo ""
echo "================================================"
echo "For more details, see QUICKSTART.md"
echo "================================================"
