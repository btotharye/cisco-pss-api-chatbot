# cisco-pss-api-chatbot
A chatbot built in react to interact with the Cisco partner API's, based on https://lucasbassetti.com.br/react-simple-chatbot

# Setup/Installation
Ensure docker and docker-compose are installed and then perform the following:

1. Clone the repo - `git clone https://github.com/btotharye/cisco-pss-api-chatbot.git`
2. Copy the .env.default to a .env file and put in your secret keys, the keys used are the Cisco PSS API keys which can be created at https://devs.cisco.com/site/support-apis/  - `cp .env.default .env`
3. CD into the new dir - `cd cisco-pss-api-chatbot`
4. Bring up the project - `docker-compose up -d --build --remove-orphans`
5. Verify the application now loads at http://localhost

## Customization
# Modify Bot Colors/Font
To modify the colors of the bot you can modify the `src/config/chatstyles.js` file please see https://lucasbassetti.com.br/react-simple-chatbot/#/docs/themes for more information.

# Modify Bot Image
You can modify the image of the bot by uploading your image file as bot.jpg and putting it in the `https://github.com/btotharye/cisco-pss-api-chatbot/tree/master/src/assets/images` folder.  This is imported in from file `src/App.js` if you want to modify the file name, etc.

# Chatbot Workflow
![Workflow Screenshot](workflow.png?raw=true)

# TO DO/Enhancements
* Add in Service Request info based on serial
* Bug lookup information
* End of Life/Support Information

# Screenshots
![Screenshot Processing](bot_ss1.JPG?raw=true)

![Screenshot Results](bot_ss2.JPG?raw=true)

# Chat/Help
Feel free to join chat for questions or enhancement requests:

https://geek-slack-invite.herokuapp.com/

## Donate

If you liked this project, you can donate to support it and new features

[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=brianhh1230%40gmail%2ecom&lc=US&item_name=Geeked%20Out%20Solutions&no_note=0&cn=Add%20special%20instructions%20to%20the%20seller%3a&no_shipping=1&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donateCC_LG%2egif%3aNonHosted)
