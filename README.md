# ServiceNow UI Action for DUO MFA

> ServiceNow (SNOW) UI Action to validate caller identity using DUO mobile multi factor authentication (MFA)



## Quick Start
> The quick start instructions are intended to get you going so you can demonstrate this functionality.  Please see the detailed installation instructions for production.

### Prerequisites
1.  Access to a ServiceNow instance
2.  Access to the [DUO Auth API](https://duo.com/docs/authapi)
    1.  DUO Auth API Integration Key
    2.  DUO Auth API Secret Key
    3.  DUO Auth API Host
3.  A machine that can be accessed by the MID using http port 3030
    1.  Theoretically this could be the ServiceNow MID Server
    2.  This machine should have Docker installed and be able to run linux containers

### Server Configuration

> This could be you MID server, if your MID server can support running Docker.

#### Install Docker on Server (Ubuntu 18.04 LTS)

Update software repos

```bash
sudo apt update
```

Install Docker

```bash
sudo apt install docker.io
```

Start the Docker service

```bash
sudo systemctl start docker
```

Configure Docker to auto start on reboot

```bash
sudo systemctl enable docker
```

#### Build and Run the DUO Auth API container

Clone this repo to the Server

```bash
git clone https://github.com/apleto/ServiceNow-DUO-Push-UI-Action.git

cd ServiceNow-DUO-Push-UI-Action/
```

Update the production config file with SQL server info

```bash
nano config/default.json

## UPDATE LINE 40 and save the file
"mssql": "mssql://<USERNAME>:<PASSWORD>@<MSSQL_SERVER>:1433/<DATABASE>"
```

Build the Docker image

```bash
sudo docker build -t duoauth:1.0.0 .
```

Run the container

```bash
sudo docker run -d -p 3030:3030 -e "IKEY=SHAWN" -e "SKEY=BOB" -e "HOST=asdf" duoauth:1.0.0
```

Make sure the container is running

```bash
sudo docker ps

CONTAINER ID        IMAGE                           COMMAND                  CREATED             STATUS              PORTS                              NAMES
07281b608bfb        duoauth  "docker-entrypoint.s…"   2 minutes ago       Up 2 minutes        3000/tcp, 0.0.0.0:3030->3030/tcp   gallant_mcclintock
```

Test the server
> Please not that if everything is working the "username" here will get a DUO push on their device.

```bash
curl -k -d '{"username": "<USERNAME>", "requested_by": "<USERNAME>"}' -H 'Content-Type: application/json' http://localhost:3030/auth

## result
{"result":"allow","status":"allow","status_msg":"Success. Logging you in..."}

```


#### ServiceNow Configuration


### Testing


## Help

If you need help or find an issue please let us know by creating an issue on GitHub [here](https://github.com/apleto/ServiceNow-DUO-Push-UI-Action/issues/new).
