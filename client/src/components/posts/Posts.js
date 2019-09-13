import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import PostItem from './PostItem'
import Item from './PostItem'
import PostForm from './PostForm'
import { getPosts } from '../../actions/post'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
}))

const Posts = ({ getPosts, post: { posts, loading } }) => {
  const classes = useStyles()
  useEffect(() => {
    getPosts()
  }, [getPosts])

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className={classes.root}>
        <div>
          <h1 className="large text-primary">Jobs</h1>
          <p className="lead">
            <i className="fas fa-user" /> Welcome to the community
          </p>
        </div>
        <div className="posts">
          {posts.map(post => (
            <PostItem key={post._id} post={post} />
          ))}
        </div>
      </div>
    </Fragment>
  )
}

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  post: state.post
})

export default connect(
  mapStateToProps,
  { getPosts }
)(Posts)
