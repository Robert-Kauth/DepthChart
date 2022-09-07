## Users
### Sign Up
* As an unregistered and unauthorized user, I want to be able to sign up for the website via a sign-up form.
   * When I'm on the `/signup` page:
      * I would like to be able to enter my email, username, and preferred password on a clearly laid out form.
      * I would like the website to log me in upon successful completion of the sign-up form.
         * So that I can seamlessly access the site's functionality
   * When I enter invalid data on the sign-up form:
      * I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password).
         * So that I can try again without needing to refill forms I entered valid data into.
### Log in
* As a registered and unauthorized user, I want to be able to log in to the website via a log-in form.
   * When I'm on the `/login` page:
       * I would like to be able to enter my email and password on a clearly laid out form.
       * I would like the website to log me in upon successful completion of the log-in form.
            * So that I can seamlessly access the site's functionality
   * When I enter invalid data on the log-up form:
      * I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password).
          * So that I can try again without needing to refill forms I entered valid data into.
### Demo User
* As an unregistered and unauthorized user, I would like an easy to find and clear demo user button on both the `/signup` and `/login` pages to allow me to visit the site as a guest without signing up or logging in.
   * When I'm on either the `/signup` or `/login` pages:
      * I can click on a Demo User button to log me in and allow me access as a normal user.
         * So that I can test the site's features and functionality without needing to stop and enter credentials.
### Log Out
* As a logged in user, I want to log out via an easy to find log out button on the navigation bar.
   * While on any page of the site:
      * I can log out of my account and be redirected to a page displaying APIs.
         * So that I can easily log out to keep my information secure.
## Servers
### Viewing Servers
* As a logged in user, I want to be able to view a list of my servers on a side bar when I log in
   * When I am on the `/` page:
      * I can view names of team servers I am a member of
* As a logged in user, I want to be select a specific team server
     * When I am on the `/servers/:server_id` page
        * I can read its description, channels, and messages
        <!-- * I can create a new message that will be posted in the servers channel default channel -->
### Creating Servers
* As a logged in user, I want to create a new team server
  * When I am on the `/` page:
    * I can create a new team server by clicking a button that brings up a modal form which allows me to create a new team server
  * When I am on the `/servers/:server_id`:
    *  I can create a new team server by clicking a button that brings up a modal form which allows me to create a new team server

### Updating Servers
* As a logged in user, I want to be able to update the information of a server I own
  * When I am on the `/servers/:server_id`:
    * I can click a button that allows me to update the server information

### Deleting Servers
* As a logged in user, I want to be able to delete servers that I own
  * When I am on the `/servers/:server_id`:
    * I can click a button to delete servers, and all associated channels/messages

## Channels
### Create Channels
* As a logged in user, I want to be able to create custom channels in a team server I own
  * As a memeber of a server, I want to be able to create custom channels
    * When I'm on the `/servers/:server_id` page:
      * I can create a new channel for that server

### Viewing Channels
* As a logged in user, I want to be able to view all the channels for a specific server
  * When I'm on the `/` page:
    * I can see and click on servers I am a member of to view their channels
      * So I can see an organized list of channels and quickly navigate to one
  * When I'm on the `/servers/:server_id` page:
    * I can see all the channels associated with a server
      * So I can click on a specific channel and view all the associated messages

### Update Channels
* As a logged in user, I want to be able to update the names of channels in a server to which I belong
  * When I'm on the `/servers/:server_id` page:
    * I can edit the channels belonging to that server

### Delete Channel
* As a logged in user that owns the server I want to be able to delete the channels that have been created
  * When I'm on the `/servers/:server_id` page:
    * I can click "Delete" to delete a channel that was previously created
      * So I can easily delete channels

## Messages
### Create Messages
* As a logged in user, I want to be able to create Messages
  * When I'm on the `/` page I can select a friend/online user to send a message to:
    * So I can easily message my friends or online users
      * When I'm on the `/server/:serverid` page I can enter a message at the bottom of the selected channels message feed to:
        * So I easily broadcast messages to the entire channel

### Viewing Messages
* As a logged in user, I want to be able to view all my Messages
  * When I'm on the `/` page:
    * I can see all my message threads
      * So I can an keep up with all the message threads I am a member of
  * When I am on the `/server/:serverid` page I can:
    * View all messages of an associated server channel

### Update Messages
* As a logged in user, I want to be able to modify a message I have created
  * When I'm on the `/` page:
    * I can edit message I have written
      * So I can fix any typos or add anything new that comes to mind
    * When I am on the `/server/:serverid` page:
      * I can edit messages I have written
        * So I can fix any typos or add anything new that comes to mind

### Delete Messages
* As a logged in user I want to be able to delete the messages I've created
  * When I'm on the `/` page:
    * I can click delete on a message I have created
      * So I can delete the message in a specific thread

## Chat
### Create Chat
* As a logged in user, I want to be able to initiate a chat with another user
  * When I'm on the `/` page:
    * I can click on a online user to start a chat
      * So I can easily communicate with another user
  * When I am on the `/server/:serverid` page:
    * I can click on a online user to start a new chat
### Viewing Chats
* As a logged in user, I want to be able to view the chat threads I am a member of
  * When I'm on the `/` page:
    * I can view all of the chat threads I am a member of

### Update Chats
* As a logged in user, I want to be able to modify a message sent in a chat
  * When I'm on the `/` page:
    * I can click edit so I can:
      * So I can update the message content

### Delete Chats
* As a logged in user, I want to be able to delete a message sent in a chat
  * When I am on the `/` page:
    * I can click on a chat thread to delete it
