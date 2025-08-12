# Poly_Chat_AI

The project is the result of some daily frustration i had when using chat GPT for personal use:
The inability to go backward in a conversation, the idea that messages gets lost over time in a sea of messages histories, and a sea of blurry conversations, the confusion of not knowing which model to use.
The primary idea here is to build a chat GPT which a UI and functions that allows me to guide and organise the convesations a bit more. so i can navigate and go back to information that i found important and do not want to loose.



## DB schema

I'm starting with a minimal schema for my db:
user,
topic linked through the user id,
conversation linked through the topic id,
messages linked to, 