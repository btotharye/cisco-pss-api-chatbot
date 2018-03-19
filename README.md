# cisco-pss-api-chatbot
A chatbot built in react to interact with the Cisco partner API's

# Setup/Installation
Ensure docker and docker-compose are installed and then perform the following:

1. Clone the repo - `git clone https://github.com/btotharye/cisco-pss-api-chatbot.git`
2. Copy the .env.default to a .env file and put in your secret keys, the keys used are the Cisco PSS API keys which can be created at https://devs.cisco.com/site/support-apis/  - `cp .env.default .env`
3. CD into the new dir - `cd react-eplus-bot`
4. Bring up the project - `docker-compose up -d --build --remove-orphans`
5. Verify the application now loads at http://localhost
