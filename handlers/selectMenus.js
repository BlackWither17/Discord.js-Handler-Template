const fs = require('fs');
const chalk = require('chalk')
var AsciiTable = require('ascii-table')
var table = new AsciiTable()
table.setHeading('Select Menus', 'Stats').setBorder('|', '=', "0", "0")

module.exports = (client) => {
    fs.readdirSync('./selectMenus/').filter((file) => file.endsWith('.js')).forEach((file) => {
        const selectMenus = require(`../selectMenus/${file}`)
        client.selectMenus.set(selectMenus.id, selectMenus)
		table.addRow(selectMenus.id, '✅')
    })
		console.log(chalk.grey(table.toString()))
};
