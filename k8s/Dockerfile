FROM nginx:alpine

COPY ftprod-default-manager-app /usr/share/nginx/html/front
COPY ftprod-default-cms-app /usr/share/nginx/html/content
COPY brief-report-app /usr/share/nginx/html/brief-report-app
# COPY ftprod-crm-app /usr/share/nginx/html/crm-app
COPY ftprod-media-app /usr/share/nginx/html/media-app
COPY smart-brain-admin /usr/share/nginx/html/smart-brain-admin
COPY default-fhir-app /usr/share/nginx/html/fhir-app

COPY nginx.conf /etc/nginx/conf.d/default.conf
