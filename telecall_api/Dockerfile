FROM debian:buster-slim

WORKDIR /var/www/html/
#COPY composer.lock composer.json /var/www/

ENV DEBIAN_FRONTEND noninteractive
ENV APT_KEY_DONT_WARN_ON_DANGEROUS_USAGE=1
ENV NODE_VERSION=12.14.0
RUN apt-get update && \
    apt-get install wget curl ca-certificates rsync -y
RUN wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash
ENV NVM_DIR=/root/.nvm
RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" &&  nvm use v${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}
RUN cp /root/.nvm/versions/node/v${NODE_VERSION}/bin/node /usr/bin/
RUN cp /root/.nvm/versions/node/v${NODE_VERSION}/bin/npm /usr/bin/
RUN /root/.nvm/versions/node/v${NODE_VERSION}/bin/npm install  leasot@latest -g

RUN apt-get update --fix-missing \
	&& apt-get upgrade -y \
	&& apt-get dist-upgrade -y \
    && apt-get -y install apt-transport-https wget gnupg2

RUN wget -q http://packages.sury.org/php/apt.gpg -O- | apt-key add -  
RUN echo "deb http://packages.sury.org/php/ buster main" | tee /etc/apt/sources.list.d/php.list 
RUN apt-get update

RUN	apt-get install -y build-essential \
    nginx curl \
    php7.3-common php7.3-cli php7.3-zip php7.3-gd \
    php7.3-iconv php7.3-simplexml php7.3-xmlreader \
    php7.3-fpm php7.3-memcache php7.3-memcached \
    php7.3-json php7.3-opcache php7.3-bcmath \ 
    php7.3-mysql php7.3-curl php7.3-mbstring php7.3-xml php7.3-sqlite3 \
    libpng-dev libjpeg62-turbo-dev \
    libfreetype6-dev locales \
    zip jpegoptim optipng pngquant gifsicle \
    vim unzip git telnet mariadb-client 


RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN sed -i -e"s/worker_processes  1/worker_processes 5/" /etc/nginx/nginx.conf && \
sed -i -e"s/keepalive_timeout\s*65/keepalive_timeout 2/" /etc/nginx/nginx.conf && \
sed -i -e"s/keepalive_timeout 2/keepalive_timeout 2;\n\tclient_max_body_size 100m/" /etc/nginx/nginx.conf 

RUN sed -i -e "s/;cgi.fix_pathinfo=1/cgi.fix_pathinfo=0/g" /etc/php/7.3/fpm/php.ini && \
sed -i -e "s/upload_max_filesize\s*=\s*2M/upload_max_filesize = 100M/g" /etc/php/7.3/fpm/php.ini && \
sed -i -e "s/post_max_size\s*=\s*8M/post_max_size = 100M/g" /etc/php/7.3/fpm/php.ini && \
sed -i -e "s/;daemonize\s*=\s*yes/daemonize = no/g" /etc/php/7.3/fpm/php-fpm.conf && \
sed -i -e "s/;catch_workers_output\s*=\s*yes/catch_workers_output = yes/g" /etc/php/7.3/fpm/pool.d/www.conf && \
sed -i -e "s/pm.max_children = 5/pm.max_children = 9/g" /etc/php/7.3/fpm/pool.d/www.conf && \
sed -i -e "s/pm.start_servers = 2/pm.start_servers = 3/g" /etc/php/7.3/fpm/pool.d/www.conf && \
sed -i -e "s/pm.min_spare_servers = 1/pm.min_spare_servers = 2/g" /etc/php/7.3/fpm/pool.d/www.conf && \
sed -i -e "s/pm.max_spare_servers = 3/pm.max_spare_servers = 4/g" /etc/php/7.3/fpm/pool.d/www.conf && \
sed -i -e "s/pm.max_requests = 500/pm.max_requests = 200/g" /etc/php/7.3/fpm/pool.d/www.conf && \
sed -i -e "s/listen = \/run\/php\/php7.3-fpm.sock/listen = 127.0.0.1:9001/g" /etc/php/7.3/fpm/pool.d/www.conf

RUN sed -i -e "s/;listen.mode = 0660/listen.mode = 0750/g" /etc/php/7.3/fpm/pool.d/www.conf && \
find /etc/php/7.3/cli/conf.d/ -name "*.ini" -exec sed -i -re 's/^(\s*)#(.*)/\1;\2/g' {} \;

COPY ./ /var/www/html/

#CMD composer install && php artisan key:generate && php artisan cache:clear && composer dump-autoload && service php7.3-fpm start && nginx -g "daemon off;"
CMD php artisan serve --host=0.0.0.0 --port=8000
