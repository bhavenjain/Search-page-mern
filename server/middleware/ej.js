import fs from 'fs'
import Search from '../models/main.js'

const files = './middleware/file.json'

fs.readFile(files, 'utf8', async (err, jsonString) => {
  if (err) {
    console.log('File read failed:', err)
    return
  }
  try {
    const data = JSON.parse(jsonString)
    for (var i = 0; i < data.length; i++) {
      // console.log(data[i].Title)

      const search = new Search({
        title: data[i].Title,
        source: data[i].Source,
        frequency: data[i].Frequency,
        unit: data[i].Unit,
        description: data[i].Description
      })
      await search.save()
    }
  } catch (err) {
    console.log(`Error: ${err}`)
  }
})
