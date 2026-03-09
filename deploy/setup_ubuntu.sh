#!/bin/bash

# Exit on error
set -e

DOMAIN="travel.mxlhhfamily.com"
WEB_ROOT="/var/www/$DOMAIN"

echo "Starting setup for $DOMAIN..."

# 1. Update system and install Nginx
echo "Updating system and installing Nginx..."
sudo apt update
sudo apt install -y nginx

# 2. Create web root directory
echo "Creating web root directory at $WEB_ROOT..."
sudo mkdir -p $WEB_ROOT/dist
# Set permissions (adjust user if needed, default to current user for easier uploads, then www-data for Nginx)
sudo chown -R $USER:$USER $WEB_ROOT
sudo chmod -R 755 $WEB_ROOT

# 3. Configure Nginx
echo "Configuring Nginx..."
CONFIG_FILE="/etc/nginx/sites-available/$DOMAIN"

# Write the Nginx configuration
sudo tee $CONFIG_FILE > /dev/null <<EOF
server {
    listen 80;
    server_name $DOMAIN;

    root $WEB_ROOT/dist;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    location / {
        try_files \$uri \$uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }
}
EOF

# 4. Enable the site
echo "Enabling site..."
if [ -L "/etc/nginx/sites-enabled/$DOMAIN" ]; then
    echo "Site already enabled."
else
    sudo ln -s $CONFIG_FILE /etc/nginx/sites-enabled/
fi

# Remove default site if it exists (optional, but good practice to avoid conflicts on port 80 if it's the only site)
# sudo rm -f /etc/nginx/sites-enabled/default

# 5. Test and Restart Nginx
echo "Testing Nginx configuration..."
sudo nginx -t

echo "Restarting Nginx..."
sudo systemctl restart nginx

echo "Setup complete! Now you can upload your 'dist' folder to $WEB_ROOT/dist"
