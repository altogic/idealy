# [Idealy](https://idealy.io/)

Idealy is an application used for comprehensive feedback management. It enables you to gather, analyze, and manage feedback effectively to hear your users' voices and continuously improve.

![picture alt](./public/hero.png 'Preview image of Idealy.io')

## Features

- **Announcements:** Keep your users informed about the latest updates and announcements.
- **Roadmap:** Plan and visualize the future direction of your product, and share it with your users.
- **User Management:** Easily manage user accounts, permissions, and access levels to ensure a secure and personalized experience.
- **Efficient Feedback Collection and Management:** Collect and manage your feedback effectively.
- **Categorize and Prioritize:** Categorize feedback by labeling and determine priority levels.
- **Filter and Search Feedback:** Easily find and analyze feedback over time using search and filtering capabilities.
- **Update Feedback Status:** Track the status of feedback and label them with different statuses such as completed, awaiting response, under review, etc.

## Installation

1. Clone this repository: `git clone https://github.com/altogic/idealy.git`
2. Create `.env` file like `.env.example` and fill it with your own values
3. Your second client key must be run only for realtime updates

![picture alt](./public/client-key.png 'Preview image of Idealy.io')

4. This project runs with wildcards subdomains, so you need to configure your local development server
5. Edit your `/etc/hosts` file and add this line: `127.0.0.1 idealy.com`
   You can use any subdomain you want, but you shouldn't any existing domain.
6. Install a web server like [nginx](https://www.nginx.com/) or [apache](https://httpd.apache.org/)

For Linux:

`sudo apt-get update`

`sudo apt-get install nginx`

If you prefer Apache,
`sudo apt-get install apache2`

Installing Nginx For macOS, follow the instructions [here](https://www.javatpoint.com/installing-nginx-on-mac)

8. Configure your web server to serve your project

```
sudo nano /opt/homebrew/etc/nginx/nginx.conf
```

After opening it, modify the file to the following:

```
server {
    listen 80;
    listen [::]:80;
    listen 443 ssl;
    server_name *.idealy.com idealy.com www.idealy.com;
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection ‘upgrade’;
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

9. Install `dnsmasq` to resolve wildcard subdomains

```
brew install dnsmasq

```

10. Configure `dnsmasq` to resolve wildcard subdomains

`sudo nano /opt/homebrew/dnsmasq.conf`

After opening it, modify the file to the following:

```
# Add domains which you want to force to an IP address here.
# The example below send any host in *.local.company.com and *.lan to a local
# webserver.
address=/idealy.com/127.0.0.1
address=/lan/127.0.0.1
local=/node1/
# Don't read /etc/resolv.conf or any other configuration files.
no-resolv
# Never forward plain names (without a dot or domain part)
domain-needed
# Never forward addresses in the non-routed address spaces.
bogus-priv
```

11. Start `dnsmasq`

```
sudo brew services start dnsmasq
```

12. Add your base url to your project in Altogic

![picture alt](./public/base-url.png 'Preview image of Idealy.io')

13. Navigate to the project directory: `cd idealy`

14. Install the required dependencies by running the command: `npm install`

15. Start the application by running the command: `npm start`

16. Open your browser and go to `http://idealy.com` to experience Idealy!

If you want to use another subdomain, you can change it in the `.next.config` file , `/etc/hosts`, nginx and dnsmasq configuration files.
