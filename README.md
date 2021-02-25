# FoxBook

Deployed Demo: https://frozen-everglades-64057.herokuapp.com/

If you want to run this locally
- Change the `PORT` of `app.js` into any port (`3000` recommended)

Run locally with these commands
```
npm install
npx sequelize-cli db:create
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
node app.js <or> npm start <or> nodemon app.js
```

## Models
- User (email, password, username)
- Story (UserId, title, content)
- Comment (StoryId, UserId, content)

## Main Features

- User able to Sign in, Sign Up, Sign Out
- User can create / delete their Story
- User can create / delete their Comment
- 1 or Many user can comment on the Story
- User may edit or delete their account
- Just like FaceBook but simpler :)

## Relations
- Story can have multiple Comments
- Comments can have multiple Users
- Users can have multiple Story
- So the relation is Many to Many with `Comment` as the pivot table

## Validations
- Email must be unique
- Cant access stories or comments without authentication
- Cant make an empty story
- Cant make an empty comment


## Additional Features
- Using `DayJS` for showing how long the Story or the Comment has been created.
- Using `nodemailer` to send the Story to your registered email, (if you wanted ofc)

PS, Because I made this simple readme at 3am, maybe theres some features that I dont mention. sorry for that.