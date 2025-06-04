const settingColl = require("../database/models/settings.js")

async function setSetting() {
  try {
    const existestSetting = await settingColl.find()
    if (existestSetting && existestSetting.length === 0) {
      const setting = new settingColl({})
      const saved = await setting.save()
    }
  }catch(err) {
    console.log("You are offline.")
  }
}

module.exports = setSetting