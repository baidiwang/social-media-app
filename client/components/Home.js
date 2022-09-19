//landing page / newsfeed

import React from 'react'
import {connect} from 'react-redux'
import PostCreateForm from './PostCreateForm'
import { Link } from 'react-router-dom'
/**
 * COMPONENT
 */
export const Home = ({username, posts}) => {
  return (
    <div>
      <h3>Welcome, {username}</h3>
      <PostCreateForm />
      <ul>
      {
        posts.map(post => {
          return (
            <li key={post.id}>
              <p><Link to={`/profile/${post.user.id}`}>{post.user.username}</Link></p>
              <p>{post.body}</p>
              <p>{post.date}</p>
              <ul>
              {
                post.photos? post.photos.map(photo => {
                  return (
                    <li key={photo.id}>
                      <img src={photo.photoUrl} width='200' height='200' />
                    </li>
                  )
                }): null
              }
              </ul>
            </li>
          )
        })
      }
      </ul>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    username: state.auth.username,
     posts: state.posts
  }
}

export default connect(mapState)(Home)
