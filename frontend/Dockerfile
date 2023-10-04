FROM ubuntu/apache2
WORKDIR /var/www/html
RUN a2enmod rewrite
RUN service apache2 restart
COPY /dist/ ./
COPY .htaccess ./
COPY 000-default.conf /etc/apache2/sites-available
