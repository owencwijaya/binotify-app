FROM php:7.4-apache
RUN apt-get update && apt-get install && docker-php-ext-install mysqli && docker-php-ext-enable mysqli
WORKDIR /usr/src/
EXPOSE 8000
CMD ["php","-S", "0.0.0.0:8000"]