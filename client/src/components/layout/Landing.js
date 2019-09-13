import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Login from '../auth/Login'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import cooljobs from '../../img/COOLJOBS.png'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginTop: '200px'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',

    color: theme.palette.text.secondary
  }
}))

const Landing = ({ isAuthenticated }) => {
  const classes = useStyles()
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />
  }

  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <div className={classes.root}>
            <Grid
              style={{ backgroundColor: '#0d94c5bf' }}
              container
              spacing={3}
            >
              <Grid item xs={12} sm={6}>
                <img src={cooljobs} style={{ width: '200px' }} />
                <p className="lead">
                  Create a developer profile/portfolio, share posts and get help
                  from other developers
                </p>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Login />
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </section>
  )
}

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(Landing)
