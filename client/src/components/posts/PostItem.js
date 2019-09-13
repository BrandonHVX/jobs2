import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import { connect } from 'react-redux'
import { addLike, removeLike, deletePost } from '../../actions/post'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Collapse from '@material-ui/core/Collapse'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import { red } from '@material-ui/core/colors'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ShareIcon from '@material-ui/icons/Share'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import DeleteIcon from '@material-ui/icons/Delete'

import Badge from '@material-ui/core/Badge'

import InsertCommentIcon from '@material-ui/icons/InsertComment'

const classes = makeStyles(theme => ({
  card: {
    maxWidth: 345,
    margin: '90px'
  },
  media: {
    height: 0,
    padding: '20px',
    paddingTop: '56.25%' // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  avatar: {
    backgroundColor: red[500]
  }
}))

const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: {
    _id,
    text,
    jobtitle,
    jobtype,
    company,
    location,
    name,
    avatar,
    user,
    likes,
    comments,
    date
  },
  showActions
}) => (
  <div className="cards">
    <Card>
      {' '}
      <Link to={`/posts/${_id}`}>
        <CardHeader
          className="post-header"
          action={location}
          title={jobtitle}
          subheader={company}
        >
          {location}
        </CardHeader>
        <CardContent style={{ color: 'black' }}>
          {' '}
          <p>{text}</p>
        </CardContent>
      </Link>
      <CardActions style={{ zIndex: 10 }} disableSpacing>
        {showActions && (
          <Fragment>
            <div>
              <IconButton
                className="post-links"
                aria-label="show 4 new mails"
                color="inherit"
              >
                <Badge
                  color="secondary"
                  badgeContent={likes.length > 0 && <span>{likes.length}</span>}
                >
                  {' '}
                  <FavoriteIcon onClick={() => addLike(_id)} />{' '}
                </Badge>
              </IconButton>

              <IconButton aria-label="show 4 new mails" color="inherit">
                <Badge
                  color="secondary"
                  badgeContent={
                    comments.length > 0 && <span>{comments.length}</span>
                  }
                >
                  <InsertCommentIcon style={{ color: 'black' }} />
                </Badge>
              </IconButton>
              <IconButton aria-label="show 4 new mails">
                {!auth.loading && user === auth.user._id && (
                  <DeleteIcon
                    style={{
                      fontSize: '26px',
                      paddingBottom: '5px'
                    }}
                    onClick={() => deletePost(_id)}
                  />
                )}{' '}
              </IconButton>
            </div>
          </Fragment>
        )}{' '}
        <IconButton style={{ fontSize: '10px', marginLeft: 'auto' }}>
          {' '}
          Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
        </IconButton>
      </CardActions>
    </Card>
  </div>
)

PostItem.defaultProps = {
  showActions: true
}

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  showActions: PropTypes.bool
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(
  mapStateToProps,
  { addLike, removeLike, deletePost }
)(PostItem)
