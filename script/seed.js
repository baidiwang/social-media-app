'use strict'

const {db, models: {User} } = require('../server/db')

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  // Creating Users
  const users = await Promise.all([
    User.create({ username: 'cody', password: '123', avatar: faker.image.avatar(), email: 'cody@hotmail.com', bio: faker.random.words(10)}),
    User.create({ username: 'murphy', password: '123', avatar: faker.image.avatar(), email: 'murphy@hotmail.com', bio: faker.random.words(10)}),
    User.create({username: 'didi', password: 'didi', avatar: faker.image.avatar(), email: 'didi@hotmail.com', bio: faker.random.words(10)}),
    User.create({username: 'chris', password: 'chris', avatar: faker.image.avatar(), email: 'chris@hotmail.com', bio: faker.random.words(10)}),
    User.create({username: 'baidi', password: 'baidi', avatar: faker.image.avatar(), email: 'baidi@hotmail.com', bio: faker.random.words(10)}),
    User.create({username: 'erik', password: 'erik', avatar: faker.image.avatar(), email: 'erik@hotmail.com', bio: faker.random.words(10)})
  ]);
  //creating posts
  const posts = await Promise.all([
    Post.create({body: faker.random.words(20), userId: 1}),
    Post.create({body: faker.random.words(20), userId: 1}),
    Post.create({body: faker.random.words(20), userId: 2}),
    Post.create({body: faker.random.words(20), userId: 2}),
    Post.create({body: faker.random.words(20), userId: 3}),
    Post.create({body: faker.random.words(20), userId: 3}),
    Post.create({body: faker.random.words(20), userId: 4}),
    Post.create({body: faker.random.words(20), userId: 4}),
    Post.create({body: faker.random.words(20), userId: 5}),
    Post.create({body: faker.random.words(20), userId: 5}),
    Post.create({body: faker.random.words(20), userId: 5}),
    Post.create({body: faker.random.words(20), userId: 6}),
    Post.create({body: faker.random.words(20), userId: 6}),
    Post.create({body: faker.random.words(20), userId: 6})
  ]);
  //creating likes
  const likes = await Promise.all([
    Like.create({userId: 1, postId: 13}),
    Like.create({userId: 2, postId: 13}),
    Like.create({userId: 3, postId: 13}),
    Like.create({userId: 3, postId: 12}),
    Like.create({userId: 4, postId: 12}),
    Like.create({userId: 4, postId: 11}),
    Like.create({userId: 1, postId: 11}),
    Like.create({userId: 1, postId: 10}),
    Like.create({userId: 2, postId: 10}),
    Like.create({userId: 2, postId: 9}),
    Like.create({userId: 1, postId: 9}),
    Like.create({userId: 2, postId: 8}),
    Like.create({userId: 3, postId: 8}),
    Like.create({userId: 5, postId: 7}),
    Like.create({userId: 5, postId: 6}),
    Like.create({userId: 6, postId: 3}),
    Like.create({userId: 6, postId: 2}),
    Like.create({userId: 6, postId: 1}),
  ]);
  //creating comments
  const comments = await Promise.all([
    Comment.create({body: faker.random.words(20), userId: 1, postId: 13}),
    Comment.create({body: faker.random.words(20), userId: 6, postId: 13}),
    Comment.create({body: faker.random.words(20), userId: 1, postId: 12}),
    Comment.create({body: faker.random.words(20), userId: 1, postId: 11}),
    Comment.create({body: faker.random.words(20), userId: 1, postId: 10}),
    Comment.create({body: faker.random.words(20), userId: 1, postId: 9}),
    Comment.create({body: faker.random.words(20), userId: 1, postId: 8}),
    Comment.create({body: faker.random.words(20), userId: 1, postId: 7}),
    Comment.create({body: faker.random.words(20), userId: 1, postId: 6}),
    Comment.create({body: faker.random.words(20), userId: 1, postId: 5}),
    Comment.create({body: faker.random.words(20), userId: 1, postId: 4}),
  ]);
  //creating photos
  const photos = await Promize.all([
    Photo.create({photoUrl: faker.images.cats(240, 240, true), userId: 1, postId: 1}),
    Photo.create({photoUrl: faker.images.cats(240, 240, true), userId: 1, postId: 1}),
    Photo.create({photoUrl: faker.images.cats(240, 240, true), userId: 1, postId: 1}),
    Photo.create({photoUrl: faker.images.cats(240, 240, true), userId: 1, postId: 1}),
    Photo.create({photoUrl: faker.images.cats(240, 240, true), userId: 1, postId: 1}),
    Photo.create({photoUrl: faker.images.cats(240, 240, true), userId: 1, postId: 1}),
    Photo.create({photoUrl: faker.images.cats(240, 240, true), userId: 1, postId: 1}),
    Photo.create({photoUrl: faker.images.cats(240, 240, true), userId: 1, postId: 1}),
    Photo.create({photoUrl: faker.images.cats(240, 240, true), userId: 1, postId: 1}),
    Photo.create({photoUrl: faker.images.cats(240, 240, true), userId: 1, postId: 1}),
    Photo.create({photoUrl: faker.images.cats(240, 240, true), userId: 1, postId: 1}),
    Photo.create({photoUrl: faker.images.cats(240, 240, true), userId: 1, postId: 1}),
    Photo.create({photoUrl: faker.images.cats(240, 240, true), userId: 1, postId: 1}),
  ]);
  const messages = await Promise.all([
    Message.create({text: faker.randomw.words(10), receiverId: 1, senderId: 2}),
    Message.create({text: faker.randomw.words(10), receiverId: 2, senderId: 1}),
    Message.create({text: faker.randomw.words(10), receiverId: 1, senderId: 2}),
    Message.create({text: faker.randomw.words(10), receiverId: 2, senderId: 1}),
    Message.create({text: faker.randomw.words(10), receiverId: 1, senderId: 2}),
    Message.create({text: faker.randomw.words(10), receiverId: 4, senderId: 3}),
    Message.create({text: faker.randomw.words(10), receiverId: 3, senderId: 4}),
    Message.create({text: faker.randomw.words(10), receiverId: 4, senderId: 3}),
    Message.create({text: faker.randomw.words(10), receiverId: 3, senderId: 4}),
    Message.create({text: faker.randomw.words(10), receiverId: 6, senderId: 5}),
    Message.create({text: faker.randomw.words(10), receiverId: 5, senderId: 6}),
    Message.create({text: faker.randomw.words(10), receiverId: 6, senderId: 5}),
    Message.create({text: faker.randomw.words(10), receiverId: 5, senderId: 6}),
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
