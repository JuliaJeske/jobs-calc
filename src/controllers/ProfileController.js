const Profile = require('../model/Profile')

module.exports = {
  index(req, res) {
    return res.render("profile", {
      profile: Profile.get()
    })
  },
  update(req, res) {
    const data = req.body
    const weeksPerYear = 52 //semanas por ano
    const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12 //semanas sem ferias
    const weekTotalHours = data["hours-per-day"] * data["days-per-week"] //total de horas trabalhadas

    const monthlyTotalHours = weekTotalHours * weeksPerMonth //horas trabalhadas por mes
    const valueHour = data["monthly-budget"] / monthlyTotalHours //valor da minha hora

    Profile.update({

      ...Profile.get(),
      ...req.body,
      "value-hour": valueHour

    })


    return res.redirect('/profile')
  },
}