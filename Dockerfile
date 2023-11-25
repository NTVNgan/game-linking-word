# Copyright (C) 2023 Xebus.  All rights reserved.
#
# This software is the confidential and proprietary information of Xebus
# or one of its subsidiaries.  You shall not disclose this confidential
# information and shall use it only in accordance with the terms of the
# license agreement or other applicable agreement you entered into with 
# Xebus.
#
# XEBUS MAKES NO REPRESENTATIONS OR WARRANTIES ABOUT THE SUITABILITY OF
# THE SOFTWARE, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO
# THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
# PURPOSE, OR NON-INFRINGEMENT.  XEBUS SHALL NOT BE LIABLE FOR ANY 
# LOSSES OR DAMAGES SUFFERED BY LICENSEE AS A RESULT OF USING, MODIFYING
# OR DISTRIBUTING THIS SOFTWARE OR ITS DERIVATIVES.

FROM node:lts-alpine

# Install simple http server for serving static content.
#
# @todo: Replace later with nginx.
RUN npm install -g http-server

# Define the working directory of the Web application.
WORKDIR /usr/src/app

# Copy both 'package.json' and 'package-lock.json'

COPY package*.json ./

# Install project dependencies.
RUN npm install

# Copy project files and folders to the application's directory.
COPY . .

# Build the Web app for production with minification.
RUN npm run build

# Expose the port numbers that the Web app listens on.
EXPOSE 8080

# Run the Web app.
CMD [ "http-server", "dist" ]
