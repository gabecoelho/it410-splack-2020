# Splack

## Events

- message sent
- message posted
- message read
- channel created
- channel joined
- channel left
- channel archived
- channel info updated
- client synced
- user authenticated
- user logged out
- user info updated
- user account created
- user account deleted
- comment posted / deleted / updated

## Commands

- post a message
- update a message
- delete a message
- comment on a message
- update a comment
- delete a comment
- mark as read
- create channel
- join channel
- leave channel
- archive channel
- update channel
- load channel
- load posts by date range
- authenticate user
- logout user
- create new user
- delete user

## Entities:

channel
- id (number)
- name (string)
- description (string)
- number of members (number)

user
- email (string)
- name (string)
- password (string)
- avatar

message
- id (number)
- text (string)
- channel id (number)
- author user id (string)
- date posted (date-time)
- date updated (date-time)

comment
- id (number)
- message id (number)
- text (string)
- author user id (string)
- date posted (date-time)
- date updated (date-time)

## Value Objects:

avatar
- url (string)
-
