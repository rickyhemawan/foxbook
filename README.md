# FoxBook

## Models
- User (email, password, username)
- Story (UserId, title, content)
- Comment (StoryId, UserId, content)

## Features

- User bisa Sign in, Log in Logout
- User bisa buat Story ( semacam status facebook)
- Banyak User bisa comment di Story
- User bisa edit profilenya

- Story bisa di Comment oleh banyak User

## Relations
Story can have multiple Comments
Comments can have multiple Users
Users can have multiple Story