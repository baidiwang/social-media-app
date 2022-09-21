'use strict'
const { faker } = require('@faker-js/faker');
const {db, models: {User, Photo, Post, Message, Comment, Like} } = require('../server/db')
const crypto = require('crypto');
/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  // Creating Users
  const users = await Promise.all([
    User.create({ id: crypto.randomUUID() ,username: 'cody', password: '123', avatar: faker.image.avatar(), email: 'cody@hotmail.com', bio: faker.random.words(10)}),
    User.create({ id: crypto.randomUUID() ,username: 'murphy', password: '123', avatar: faker.image.avatar(), email: 'murphy@hotmail.com', bio: faker.random.words(10)}),
    User.create({id: crypto.randomUUID() ,username: 'didi', password: 'didi', avatar: faker.image.avatar(), email: 'didi@hotmail.com', bio: faker.random.words(10)}),
    User.create({id: crypto.randomUUID() ,username: 'chris', password: 'chris', avatar: faker.image.avatar(), email: 'chris@hotmail.com', bio: faker.random.words(10)}),
    User.create({id: crypto.randomUUID() ,username: 'baidi', password: 'baidi', avatar: faker.image.avatar(), email: 'baidi@hotmail.com', bio: faker.random.words(10)}),
    User.create({id: crypto.randomUUID() ,username: 'erik', password: 'eric', avatar: faker.image.avatar(), email: 'ericblaney@gmail.com', bio: faker.random.words(10)})
  ]);
  //creating posts
  const posts = await Promise.all([
    Post.create({body: faker.random.words(20), userId: users[0].id}),
    Post.create({body: faker.random.words(20), userId: users[0].id}),
    Post.create({body: faker.random.words(20), userId: users[1].id}),
    Post.create({body: faker.random.words(20), userId: users[1].id}),
    Post.create({body: faker.random.words(20), userId: users[2].id}),
    Post.create({body: faker.random.words(20), userId: users[2].id}),
    Post.create({body: faker.random.words(20), userId: users[3].id}),
    Post.create({body: faker.random.words(20), userId: users[3].id}),
    Post.create({body: faker.random.words(20), userId: users[4].id}),
    Post.create({body: faker.random.words(20), userId: users[4].id}),
    Post.create({body: faker.random.words(20), userId: users[5].id}),
    Post.create({body: faker.random.words(20), userId: users[5].id}),
    Post.create({body: faker.random.words(20), userId: users[5].id}),
    Post.create({body: faker.random.words(20), userId: users[5].id})
  ]);
  //creating likes
  const likes = await Promise.all([
    Like.create({userId: users[0].id, postId: 13}),
    Like.create({userId: users[1].id, postId: 13}),
    Like.create({userId: users[2].id, postId: 13}),
    Like.create({userId: users[2].id, postId: 12}),
    Like.create({userId: users[3].id, postId: 12}),
    Like.create({userId: users[3].id, postId: 11}),
    Like.create({userId: users[0].id, postId: 11}),
    Like.create({userId: users[0].id, postId: 10}),
    Like.create({userId: users[1].id, postId: 10}),
    Like.create({userId: users[1].id, postId: 9}),
    Like.create({userId: users[0].id, postId: 9}),
    Like.create({userId: users[1].id, postId: 8}),
    Like.create({userId: users[2].id, postId: 8}),
    Like.create({userId: users[4].id, postId: 7}),
    Like.create({userId: users[4].id, postId: 6}),
    Like.create({userId: users[5].id, postId: 3}),
    Like.create({userId: users[5].id, postId: 2}),
    Like.create({userId: users[5].id, postId: 1}),
  ]);
  //creating comments
  const comments = await Promise.all([
    Comment.create({body: faker.random.words(20), userId: users[0].id, postId: 13}),
    Comment.create({body: faker.random.words(20), userId: users[5].id, postId: 13}),
    Comment.create({body: faker.random.words(20), userId: users[0].id, postId: 12}),
    Comment.create({body: faker.random.words(20), userId: users[0].id, postId: 11}),
    Comment.create({body: faker.random.words(20), userId: users[0].id, postId: 10}),
    Comment.create({body: faker.random.words(20), userId: users[0].id, postId: 9}),
    Comment.create({body: faker.random.words(20), userId: users[0].id, postId: 8}),
    Comment.create({body: faker.random.words(20), userId: users[0].id, postId: 7}),
    Comment.create({body: faker.random.words(20), userId: users[0].id, postId: 6}),
    Comment.create({body: faker.random.words(20), userId: users[0].id, postId: 5}),
    Comment.create({body: faker.random.words(20), userId: users[0].id, postId: 4}),
  ]);
  //creating photos
  const photos = await Promise.all([
    Photo.create({photoUrl: faker.image.cats(240, 240, true), userId:  users[0].id, postId: 1}),
    Photo.create({photoUrl: faker.image.cats(240, 240, true), userId:  users[0].id, postId: 1}),
    Photo.create({photoUrl: faker.image.cats(240, 240, true), userId:  users[0].id, postId: 1}),
    Photo.create({photoUrl: faker.image.cats(240, 240, true), userId:  users[0].id, postId: 1}),
    Photo.create({photoUrl: faker.image.cats(240, 240, true), userId:  users[0].id, postId: 1}),
    Photo.create({photoUrl: faker.image.cats(240, 240, true), userId:  users[0].id, postId: 1}),
    Photo.create({photoUrl: faker.image.cats(240, 240, true), userId:  users[0].id, postId: 1}),
    Photo.create({photoUrl: faker.image.cats(240, 240, true), userId:  users[0].id, postId: 1}),
    Photo.create({photoUrl: faker.image.cats(240, 240, true), userId:  users[0].id, postId: 1}),
    Photo.create({photoUrl: faker.image.cats(240, 240, true), userId:  users[0].id, postId: 1}),
    Photo.create({photoUrl: faker.image.cats(240, 240, true), userId:  users[0].id, postId: 1}),
    Photo.create({photoUrl: faker.image.cats(240, 240, true), userId:  users[0].id, postId: 1}),
    Photo.create({photoUrl: faker.image.cats(240, 240, true), userId:  users[0].id, postId: 1}),
  ]);
  const messages = await Promise.all([
    Message.create({text: faker.random.words(10), receiverId:  users[0].id, senderId:  users[1].id}),
    Message.create({text: faker.random.words(10), receiverId:  users[1].id, senderId:  users[0].id}),
    Message.create({text: faker.random.words(10), receiverId:  users[0].id, senderId:  users[1].id}),
    Message.create({text: faker.random.words(10), receiverId:  users[1].id, senderId:  users[0].id}),
    Message.create({text: faker.random.words(10), receiverId:  users[0].id, senderId:  users[1].id}),
    Message.create({text: faker.random.words(10), receiverId: users[3].id, senderId: users[2].id}),
    Message.create({text: faker.random.words(10), receiverId:  users[2].id, senderId: users[3].id}),
    Message.create({text: faker.random.words(10), receiverId: users[3].id, senderId: users[2].id}),
    Message.create({text: faker.random.words(10), receiverId: users[2].id, senderId: users[3].id}),
    Message.create({text: faker.random.words(10), receiverId: users[5].id, senderId: users[4].id}),
    Message.create({text: faker.random.words(10), receiverId: users[4].id, senderId: users[5].id}),
    Message.create({text: faker.random.words(10), receiverId: users[5].id, senderId: users[4].id}),
    Message.create({text: faker.random.words(10), receiverId: users[4].id, senderId: users[5].id}),
  ]);
  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
  return {
    users: {
      cody: users[0],
      murphy: users[1],
      didi: users[2],
      chris: users[3],
      erik: users[5],
      baidi: users[4]
    },
    messages,
    photos,
    comments,
    likes,
    posts
  }
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
