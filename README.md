# FoxBook

Deployed Demo: https://dashboard.heroku.com/apps/frozen-everglades-64057

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
- Menggunakan `DayJS` untuk melihat sudah berapa lama Story atau Comment di post
- Menggunakan `nodemailer`

PS, Because I made this simple readme at 3am, maybe theres some features that I dont mention. sorry for that.