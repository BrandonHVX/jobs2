import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import PostItem from '../posts/PostItem'
import ViewItem from '../posts/ViewItem'
import CommentForm from '../post/CommentForm'
import CommentItem from '../post/CommentItem'
import { getPost } from '../../actions/post'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'

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

const Post = ({ getPost, post: { post, loading }, match }) => {
  useEffect(() => {
    getPost(match.params.id)
  }, [getPost, match.params.id])
  const classes = useStyles()
  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      {' '}
      <Link to="/posts" className="btn">
        Back To Posts
      </Link>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>
              <ViewItem post={post} showActions={false} />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>
              <CommentForm postId={post._id} />
              <div className="comments">
                {post.comments.map(comment => (
                  <CommentItem
                    key={comment._id}
                    comment={comment}
                    postId={post._id}
                  />
                ))}
              </div>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Fragment>
  )
}

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  post: state.post
})

export default connect(
  mapStateToProps,
  { getPost }
)(Post)
