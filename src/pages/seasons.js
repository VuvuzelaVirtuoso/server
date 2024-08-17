const shortid = require('shortid')

function list(templates, season, req, res) {
  season.getSeasons().then(seasons => {
    const html = templates.season.list({
      user: req.user,
      seasons: seasons.toReversed(),
    })

    res.send(html)
  }).catch(err => {
    console.error(err)
    res.sendStatus(500)
  })
}

function create(templates, req, res) {
  if (!req.user || !req.user.isAdmin) {
    res.sendStatus(403)
    return
  }

  const html = templates.season.edit({
    user: req.user,
    verb: 'Create',
    csrfToken: req.csrfToken()
  })

  res.send(html)
}

function edit(templates, season, req, res) {
  if (!req.user || !req.user.isAdmin) {
    res.sendStatus(403)
    return
  }

  const id = req.params.id

  season.getSeason(id).then(season => {
    const html = templates.season.edit({
      user: req.user,
      verb: 'Edit',
      season: season,
      csrfToken: req.csrfToken()
    })

    res.send(html)
  }).catch(err => {
    console.error(err)
    res.sendStatus(500)
  })
}

function start(templates, season, division, req, res) {
  if (!req.user || !req.user.isAdmin) {
    res.sendStatus(403)
    return
  }
  const season_id = req.params.id
  division.getDivisions().then(divisions => {

    const divisionIds = divisions.map(_division => {
      return _division.id
    })

    season.startSeason(divisionIds, season_id).then(() => {
      res.redirect('/seasons')
    }).catch(err => {
      console.error(err)
      res.status(500).send({status:500, message: 'Error Starting Season', error:err})
    })
  })
}

function post(season, req, res) {
  if (!req.user || !req.user.isAdmin) {
    res.sendStatus(403)
    return
  }

  const s = req.body
  const id = s.id ? s.id : shortid.generate()
  s.id = id
  s.active = s.active == 'on' ? true : false
  s.registration_open = s.registration_open == 'on' ? true : false
  s.activity_check = s.activity_check == 'on' ? true : false

  season.saveSeason(s).then(() => {
    res.redirect('/seasons')
  }).catch(err => {
    console.error(err)
    res.sendStatus(500)
  })
}

function remove(season, req, res) {
  if (!req.user || !req.user.isAdmin) {
    res.sendStatus(403)
    return
  }

  season.deleteSeason(req.body.id).then(() => {
    res.redirect('/seasons')
  }).catch(err => {
    console.error(err)
    res.sendStatus(500)
  })
}

module.exports = (templates, season, division) => {
  return {
    list: {
      route: '/seasons',
      handler: list.bind(null, templates, season)
    },
    create: {
      route: '/seasons/create',
      handler: create.bind(null, templates),
    },
    edit: {
      route: '/seasons/:id/edit',
      handler: edit.bind(null, templates, season),
    },
    post: {
      route: '/seasons/edit',
      handler: post.bind(null, season)
    },
    remove: {
      route: '/seasons/delete',
      handler: remove.bind(null, season)
    },
    start: {
      route: '/seasons/:id/start',
      handler: start.bind(null, templates, season, division)
    }
  }
}
